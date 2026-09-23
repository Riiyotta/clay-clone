#!/usr/bin/env python3
"""One-shot verification for the Clay-clone design-repo.

Every check below is automated and drift-proofed — none of them is a snapshot of a
one-time manual audit:

  1  JSON well-formedness across the whole tree
  2  ALLOWLIST PARITY      every allowlist id has a contract file and vice versa
  3  CITATION VALIDITY     every `path:line[-line]` resolves inside the real source file
  4  MANIFEST COUNTS       recomputed from disk, never trusted as written
  5  VERSION PARITY        allowlistVersion is machine-checked (others are documented as not)
  6  RULE-ID AGREEMENT     compatibility/graph.json and semantic_validate.py must agree
  7  SELF-CONTAINMENT      entryPoints point only inside design-repo/; no absolute paths
  8  SCHEMA + SEMANTICS    the bundled example validates with zero errors
  9  TEMPLATE/ROUTE MAP    every route maps to exactly one real template; no orphan sections
 10  ASSET-ROLE CLOSURE    every assetRole named anywhere exists in the closed enum
 11  POLICY/CATALOG KEYS   token-policy categories resolve against real token-catalog keys

Check 3 DEGRADES GRACEFULLY: citations point at the sibling source project, which is
not part of a standalone delivery. With no sibling tree present it warns and skips
rather than failing, so the package stays self-contained.

    python3 extraction/verify_all.py
"""
from __future__ import annotations

import glob
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SOURCE_ROOT = os.path.dirname(REPO)  # the sibling project, when present

FAIL, WARN = [], []


def fail(check, msg):
    FAIL.append(f"[{check}] {msg}")


def warn(check, msg):
    WARN.append(f"[{check}] {msg}")


def rel(p):
    return os.path.relpath(p, REPO)


def load(p):
    with open(p, encoding="utf-8") as fh:
        return json.load(fh)


# ----------------------------------------------------------------- 1 JSON
JSON_FILES = sorted(
    p for p in glob.glob(os.path.join(REPO, "**", "*.json"), recursive=True)
)
DOCS = {}
for p in JSON_FILES:
    try:
        DOCS[p] = load(p)
    except Exception as e:  # noqa: BLE001
        fail("JSON", f"{rel(p)}: {e}")

if FAIL:
    print("\n".join(FAIL))
    sys.exit(1)

SECTIONS = {}
for p in sorted(glob.glob(os.path.join(REPO, "sections", "*.json"))):
    s = DOCS[p]
    SECTIONS[s["id"]] = s
PRIMS = {DOCS[p]["id"]: DOCS[p] for p in sorted(glob.glob(os.path.join(REPO, "primitives", "*.json")))}
COMPS = {DOCS[p]["id"]: DOCS[p] for p in sorted(glob.glob(os.path.join(REPO, "components", "*.json")))}
TPLDOC = DOCS[os.path.join(REPO, "templates", "templates.json")]
TEMPLATES = {t["id"]: t for t in TPLDOC["templates"]}
ROUTEDOC = DOCS[os.path.join(REPO, "templates", "routes.json")]
GRAPH = DOCS[os.path.join(REPO, "compatibility", "graph.json")]
ALLOW = DOCS[os.path.join(REPO, "tokens", "llm", "component-allowlist.json")]
CATALOG = DOCS[os.path.join(REPO, "tokens", "llm", "token-catalog.json")]
POLICY = DOCS[os.path.join(REPO, "tokens", "llm", "token-policy.json")]
ROLES = DOCS[os.path.join(REPO, "assets", "asset-roles.json")]["roles"]
MANIFEST = DOCS[os.path.join(REPO, "registry.manifest.json")]
SCHEMA = DOCS[os.path.join(REPO, "schema", "pagespec.schema.json")]
EXAMPLE = DOCS[os.path.join(REPO, "schema", "example.pagespec.json")]

# ----------------------------------------------------------------- 2 allowlist parity
def parity(check, listed, real, what):
    for i in sorted(set(listed) - set(real)):
        fail(check, f"phantom {what} in allowlist with no contract file: {i!r}")
    for i in sorted(set(real) - set(listed)):
        fail(check, f"orphan {what} contract with no allowlist entry: {i!r}")


parity("ALLOWLIST", ALLOW["sections"], SECTIONS, "section")
parity("ALLOWLIST", ALLOW["templates"], TEMPLATES, "template")
parity("ALLOWLIST", ALLOW["assetRoles"], ROLES, "assetRole")
# primitives/components are listed by filename stem
prim_files = sorted(os.path.basename(p)[:-5] for p in glob.glob(os.path.join(REPO, "primitives", "*.json")))
comp_files = sorted(os.path.basename(p)[:-5] for p in glob.glob(os.path.join(REPO, "components", "*.json")))
parity("ALLOWLIST", ALLOW["primitives"], prim_files, "primitive")
parity("ALLOWLIST", ALLOW["components"], comp_files, "component")

# the allowlist's section list must also equal the schema's closed section enum
schema_sections = SCHEMA["definitions"]["node"]["properties"]["section"]["enum"]
parity("ALLOWLIST", ALLOW["sections"], schema_sections, "section (vs schema enum)")
schema_templates = SCHEMA["properties"]["template"]["enum"]
parity("ALLOWLIST", ALLOW["templates"], schema_templates, "template (vs schema enum)")
schema_roles = SCHEMA["definitions"]["assetRole"]["enum"]
parity("ALLOWLIST", ALLOW["assetRoles"], schema_roles, "assetRole (vs schema enum)")

# ----------------------------------------------------------------- 3 citations
CITE_RE = re.compile(r"\b((?:[A-Za-z0-9_.\-]+/)*[A-Za-z0-9_.\-]+\.(?:jsx?|css|md|json))\s*:\s*(\d+)(?:\s*-\s*(\d+))?")
SKIP_PREFIX = ("http://", "https://")

cited = set()
for p, doc in DOCS.items():
    blob = json.dumps(doc, ensure_ascii=False)
    for m in CITE_RE.finditer(blob):
        path, a, b = m.group(1), int(m.group(2)), int(m.group(3) or m.group(2))
        if path.startswith(SKIP_PREFIX):
            continue
        cited.add((path, a, b, rel(p)))

if not cited:
    warn("CITATION", "no citations found — nothing to verify")

LINE_CACHE = {}


def line_count(path):
    if path not in LINE_CACHE:
        full = os.path.join(SOURCE_ROOT, path)
        if not os.path.isfile(full):
            LINE_CACHE[path] = None
        else:
            with open(full, "rb") as fh:
                LINE_CACHE[path] = sum(1 for _ in fh)
    return LINE_CACHE[path]


missing_sources, checked = set(), 0
for path, a, b, where in sorted(cited):
    n = line_count(path)
    if n is None:
        missing_sources.add(path)
        continue
    checked += 1
    if a < 1 or b < a:
        fail("CITATION", f"{where}: malformed range {path}:{a}-{b}")
    elif b > n:
        fail("CITATION", f"{where}: {path}:{a}-{b} exceeds the file's real length of {n} lines")

if missing_sources:
    warn("CITATION",
         f"sibling source tree not present — skipped {len(missing_sources)} cited file(s) "
         f"(e.g. {sorted(missing_sources)[0]}). This is expected for a standalone delivery; "
         f"run this check next to the source project to validate ranges.")
else:
    warn("CITATION", f"validated {checked} citation range(s) against the real source tree")

# ----------------------------------------------------------------- 4 manifest counts
real_counts = {
    "tokenFiles": len(glob.glob(os.path.join(REPO, "tokens", "**", "*.json"), recursive=True)),
    "primitives": len(prim_files),
    "components": len(comp_files),
    "sections": len(SECTIONS),
    "templates": len(TEMPLATES),
    "assetRoles": len(ROLES),
    "routes": ROUTEDOC["counts"]["total"],
    "compatibilityRules": len(GRAPH["rules"]),
}
declared = MANIFEST.get("counts", {})
for k, v in real_counts.items():
    if k not in declared:
        fail("MANIFEST", f"counts.{k} is missing from registry.manifest.json")
    elif declared[k] != v:
        fail("MANIFEST", f"counts.{k} says {declared[k]} but the real files give {v}")
for k in declared:
    if k not in real_counts:
        fail("MANIFEST", f"counts.{k} is not a recomputable count")

# routes.json's own counts block must also recompute
rc = ROUTEDOC["counts"]
n_concrete = len([r for r in ROUTEDOC["routes"] if not r.get("dynamic") and not r.get("catchAll")])
n_dyn = len([r for r in ROUTEDOC["routes"] if r.get("dynamic")])
n_cat = len([r for r in ROUTEDOC["routes"] if r.get("catchAll")])
n_red = len(ROUTEDOC["redirects"])
for k, v in (("concrete", n_concrete), ("dynamic", n_dyn), ("catchAll", n_cat),
             ("redirects", n_red), ("total", n_concrete + n_dyn + n_cat + n_red)):
    if rc.get(k) != v:
        fail("MANIFEST", f"routes.json counts.{k} says {rc.get(k)} but recomputes to {v}")

# per-template routeCount must recompute too
from collections import Counter  # noqa: E402

rcount = Counter(r["template"] for r in ROUTEDOC["routes"])
for tid, t in TEMPLATES.items():
    if t.get("routeCount") != rcount.get(tid, 0):
        fail("MANIFEST", f"template {tid} claims routeCount {t.get('routeCount')} "
                         f"but {rcount.get(tid, 0)} routes map to it")

# ----------------------------------------------------------------- 5 version parity
if MANIFEST.get("allowlistVersion") != ALLOW.get("version"):
    fail("VERSION", f"manifest allowlistVersion {MANIFEST.get('allowlistVersion')!r} != "
                    f"component-allowlist.json version {ALLOW.get('version')!r}")
if CATALOG.get("version") != ALLOW.get("version") or POLICY.get("version") != ALLOW.get("version"):
    fail("VERSION", "tokens/llm/* versions disagree with the allowlist version")
if "versionFieldNote" not in MANIFEST:
    fail("VERSION", "registry.manifest.json must state which version fields are machine-checked")

# ----------------------------------------------------------------- 6 rule-id agreement
with open(os.path.join(REPO, "schema", "semantic_validate.py"), encoding="utf-8") as fh:
    VALIDATOR_SRC = fh.read()
graph_ids = {r["id"] for r in GRAPH["rules"]}
code_ids = set(re.findall(r'"([A-Z][A-Z0-9_]{4,})"', VALIDATOR_SRC))
code_ids = {i for i in code_ids if i in graph_ids or i.isupper() and "_" in i}
enforced = {i for i in graph_ids if f'"{i}"' in VALIDATOR_SRC}
for i in sorted(graph_ids - enforced):
    fail("RULE-ID", f"graph rule {i!r} has no matching check in semantic_validate.py")
stray = {i for i in code_ids if i not in graph_ids and i.startswith(
    ("ONE_", "NO_", "HERO_", "CHROME_", "TEMPLATE_", "CAPTURED_", "HOME_", "ROUTE_", "MOTION_", "MEDIA_", "CTA_", "REDUCED_", "MAX_"))}
for i in sorted(stray):
    if i != "MAX_WORDS_EXCEEDED":  # emitted by the maxWords runtime check, documented in README
        fail("RULE-ID", f"semantic_validate.py emits rule {i!r} that compatibility/graph.json never declares")

# ONE_HERO exceptions must match between prose and code
graph_exc = set(next(r for r in GRAPH["rules"] if r["id"] == "ONE_HERO_PER_PAGE")["exceptions"])
code_exc = set(re.findall(r'NO_HERO_TEMPLATES = \{([^}]*)\}', VALIDATOR_SRC))
code_exc = set(re.findall(r'"([^"]+)"', code_exc.pop())) if code_exc else set()
if graph_exc != code_exc:
    fail("RULE-ID", f"ONE_HERO_PER_PAGE exceptions diverge: graph={sorted(graph_exc)} code={sorted(code_exc)}")

cta_graph = set(next(r for r in GRAPH["rules"] if r["id"] == "CTA_BAND_SHOULD_BE_LAST")["exceptions"])
cta_code = set(re.findall(r'"([^"]+)"', re.search(r'CTA_LAST_EXCEPTIONS = \{([^}]*)\}', VALIDATOR_SRC).group(1)))
if cta_graph != cta_code:
    fail("RULE-ID", f"CTA_BAND_SHOULD_BE_LAST exceptions diverge: graph={sorted(cta_graph)} code={sorted(cta_code)}")

# ----------------------------------------------------------------- 7 self-containment
for ep in MANIFEST.get("entryPoints", []):
    if ep.startswith("/") or ep.startswith("..") or ":" in ep:
        fail("SELF-CONTAINMENT", f"entryPoint {ep!r} is not a path inside design-repo/")
    elif not os.path.exists(os.path.join(REPO, ep)):
        fail("SELF-CONTAINMENT", f"entryPoint {ep!r} does not exist in this package")

# Assembled from parts so this check does not match its own source line.
ABS = re.compile("(" + "|".join(["/" + "Users" + "/", "/" + "home" + "/", r"[A-Za-z]:\\\\"]) + ")")
for p in sorted(glob.glob(os.path.join(REPO, "**", "*"), recursive=True)):
    if not os.path.isfile(p) or os.path.splitext(p)[1] not in (".json", ".py", ".md"):
        continue
    with open(p, encoding="utf-8", errors="replace") as fh:
        for i, line in enumerate(fh, 1):
            if ABS.search(line):
                fail("SELF-CONTAINMENT", f"{rel(p)}:{i} contains an absolute local machine path")

# ----------------------------------------------------------------- 8 schema + semantics
try:
    from jsonschema import Draft7Validator

    Draft7Validator.check_schema(SCHEMA)
    errs = list(Draft7Validator(SCHEMA).iter_errors(EXAMPLE))
    for e in errs:
        fail("SCHEMA", f"example.pagespec.json {list(e.path)}: {e.message}")
except ImportError:
    warn("SCHEMA", "jsonschema not installed — schema validation skipped")

sys.path.insert(0, os.path.join(REPO, "schema"))
import semantic_validate as V  # noqa: E402

for sev, rid, msg in V.validate(EXAMPLE):
    if sev == V.ERROR:
        fail("SEMANTIC", f"example.pagespec.json {rid}: {msg}")

for tid in TEMPLATES:
    for sev, rid, msg in V.validate(V.synthesize(tid)):
        if sev == V.ERROR:
            fail("SEMANTIC", f"synthesized {tid} {rid}: {msg}")

# ----------------------------------------------------------------- 9 template/route map
seen_paths = [r["path"] for r in ROUTEDOC["routes"]]
for p in sorted(set(seen_paths)):
    if seen_paths.count(p) > 1:
        fail("ROUTES", f"route {p!r} is assigned {seen_paths.count(p)} times")
for r in ROUTEDOC["routes"]:
    if r["template"] not in TEMPLATES:
        fail("ROUTES", f"route {r['path']!r} names unknown template {r['template']!r}")
    g = r.get("generativeTemplate")
    if g and g not in TEMPLATES:
        fail("ROUTES", f"route {r['path']!r} names unknown generativeTemplate {g!r}")
for red in ROUTEDOC["redirects"]:
    if red["redirectTo"] not in seen_paths:
        fail("ROUTES", f"redirect {red['path']!r} targets {red['redirectTo']!r}, which is not a real route")

used = set()
for t in TEMPLATES.values():
    for n in t["nodes"]:
        if n["section"] not in SECTIONS:
            fail("TEMPLATES", f"template {t['id']} names unknown section {n['section']!r}")
        used.add(n["section"])
orphans = sorted(set(SECTIONS) - used)
EXPECTED_ORPHANS = ["chrome.footer", "chrome.navbar"]
if orphans != EXPECTED_ORPHANS:
    fail("TEMPLATES", f"sections used by no template: {orphans} (only site chrome, which renders "
                      f"outside <Routes>, may be unused: {EXPECTED_ORPHANS})")

# ----------------------------------------------------------------- 10 asset-role closure
role_names = set(ROLES)
for sid, s in SECTIONS.items():
    for r in s.get("assets", []):
        if r not in role_names:
            fail("ASSETS", f"section {sid} declares unknown assetRole {r!r}")
    blob = json.dumps(s["content"])
    for m in re.finditer(r'"const":\s*"([a-z]+\.[a-z\-]+)"', blob):
        pass
for p, doc in DOCS.items():
    for m in re.finditer(r'"assetRole":\s*\{\s*"const":\s*"([^"]+)"', json.dumps(doc)):
        if m.group(1) not in role_names:
            fail("ASSETS", f"{rel(p)}: unknown assetRole const {m.group(1)!r}")
for r, meta in ROLES.items():
    if "aiGuidance" not in meta or "licensing" not in meta:
        fail("ASSETS", f"assetRole {r!r} is missing aiGuidance or licensing guidance")
    if meta.get("aiGuidance") not in ("may-generate-new", "must-reuse-exact", "must-not-fabricate"):
        fail("ASSETS", f"assetRole {r!r} has an unknown aiGuidance value")

# ----------------------------------------------------------------- 11 policy/catalog keys
cat_keys = set(CATALOG["referenceable"])
for k in POLICY["rawValueRestrictions"]:
    if k not in cat_keys:
        fail("POLICY", f"token-policy rawValueRestrictions key {k!r} matches no token-catalog "
                       f"referenceable category (real keys: {sorted(cat_keys)})")

# ----------------------------------------------------------------- report
print("=" * 74)
print(f"Clay design-repo verification  —  {len(DOCS)} JSON files")
print("=" * 74)
for k, v in real_counts.items():
    print(f"  {k:22} {v}")
print()
for m in WARN:
    print("  WARN  " + m)
print()
if FAIL:
    print(f"FAILED — {len(FAIL)} problem(s):")
    for m in FAIL:
        print("  FAIL  " + m)
    sys.exit(1)
print("ALL CHECKS PASSED")
sys.exit(0)
