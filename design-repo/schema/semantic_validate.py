#!/usr/bin/env python3
"""Semantic validation for Clay-clone PageSpecs.

Everything JSON Schema structurally cannot express. The rule ids below are the same
strings used in compatibility/graph.json; extraction/verify_all.py fails the run if
the two sets ever diverge.

The single most important check here is TEMPLATE_NODE_SEQUENCE_MATCH: nodes[] is
cross-referenced against the PageSpec's DECLARED `template`, not validated in
isolation. A spec that contradicts its own template must not pass.

Usage:
    python3 semantic_validate.py [pagespec.json ...]      # defaults to example.pagespec.json
"""
from __future__ import annotations

import glob
import json
import os
import sys

# Repo root derived from this file's own location — never a hardcoded absolute path.
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

ERROR, WARN = "error", "warn"

FORBIDDEN_MOTION = {"scroll-reveal", "fade-up", "scroll-progress-scrub", "hero-entrance", "parallax"}
FALLBACKS = {"static-no-motion", "instant-state-change", "poster-only", "paused-track"}

# ONE_HERO_PER_PAGE exceptions — templates that genuinely compose no hero-category node.
# Kept in sync with compatibility/graph.json by extraction/verify_all.py.
NO_HERO_TEMPLATES = {"page.not-found", "page.contact", "page.captured-plate"}
CTA_LAST_EXCEPTIONS = {"page.pricing"}
MOTION_BUDGET = 4
MOTION_BUDGET_EXCEPTIONS = {"page.home", "page.captured-plate"}
CAPTURED_TEMPLATE = "page.captured-plate"
AUTO_SPLICED_INTO_CAPTURE = {"product.faq"}


def _load(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as fh:
        return json.load(fh)


def load_repo():
    secs = {}
    for f in sorted(glob.glob(os.path.join(REPO, "sections", "*.json"))):
        with open(f, encoding="utf-8") as fh:
            s = json.load(fh)
        secs[s["id"]] = s
    tpl = {t["id"]: t for t in _load("templates/templates.json")["templates"]}
    graph = _load("compatibility/graph.json")
    roles = set(_load("assets/asset-roles.json")["roles"])
    return secs, tpl, graph, roles


SECTIONS, TEMPLATES, GRAPH, ASSET_ROLES = load_repo()
ADJACENCY_OK = {tuple(p) for r in GRAPH["rules"] if r["id"] == "NO_ADJACENT_SAME_CATEGORY"
                for p in r["exceptions"]}


# --------------------------------------------------------------------------- words
def _count_words(text):
    return len([w for w in str(text).split() if w.strip()])


def _walk_words(value, schema, path, out):
    """Enforce maxWords wherever a section contract declares one."""
    if not isinstance(schema, dict):
        return
    if schema.get("type") == "object" or "properties" in schema:
        if not isinstance(value, dict):
            return
        for k, sub in (schema.get("properties") or {}).items():
            if k in value:
                _walk_words(value[k], sub, f"{path}.{k}", out)
        return
    if schema.get("type") == "array":
        if not isinstance(value, list):
            return
        for i, item in enumerate(value):
            _walk_words(item, schema.get("items") or {}, f"{path}[{i}]", out)
        return
    if "maxWords" in schema and isinstance(value, str):
        n = _count_words(value)
        if n > schema["maxWords"]:
            out.append((ERROR, "MAX_WORDS_EXCEEDED",
                        f"{path}: {n} words exceeds maxWords {schema['maxWords']}"))


# --------------------------------------------------------------------------- media
def _walk_media(value, path, out):
    if isinstance(value, dict):
        if "assetRole" in value:
            if value["assetRole"] not in ASSET_ROLES:
                out.append((ERROR, "MEDIA_MUST_DECLARE_ASSET_ROLE",
                            f"{path}: unknown assetRole {value['assetRole']!r}"))
            if "ref" not in value:
                out.append((ERROR, "MEDIA_MUST_DECLARE_ASSET_ROLE",
                            f"{path}: media object has no `ref`"))
        for k, v in value.items():
            _walk_media(v, f"{path}.{k}", out)
    elif isinstance(value, list):
        for i, v in enumerate(value):
            _walk_media(v, f"{path}[{i}]", out)


# --------------------------------------------------------------------------- main
def validate(spec):
    """Return a list of (severity, rule_id, message)."""
    out = []
    tid = spec.get("template")
    tpl = TEMPLATES.get(tid)
    if tpl is None:
        out.append((ERROR, "TEMPLATE_NODE_SEQUENCE_MATCH", f"unknown template {tid!r}"))
        return out

    nodes = spec.get("nodes") or []
    ids = [n.get("section") for n in nodes]

    # ---- TEMPLATE_NODE_SEQUENCE_MATCH (cross-reference nodes[] against `template`)
    allowed = {n["section"]: n for n in tpl["nodes"]}
    order = [n["section"] for n in tpl["nodes"]]
    for i, sid in enumerate(ids):
        if sid not in allowed:
            out.append((ERROR, "TEMPLATE_NODE_SEQUENCE_MATCH",
                        f"nodes[{i}] {sid!r} is not part of template {tid!r} "
                        f"(template lists: {', '.join(order)})"))
    for n in tpl["nodes"]:
        if n["required"] and n["section"] not in ids:
            out.append((ERROR, "TEMPLATE_NODE_SEQUENCE_MATCH",
                        f"template {tid!r} requires section {n['section']!r}, which is missing"))
        if not n.get("repeatable", False) and ids.count(n["section"]) > 1:
            out.append((ERROR, "TEMPLATE_NODE_SEQUENCE_MATCH",
                        f"section {n['section']!r} is not repeatable in template {tid!r} "
                        f"but appears {ids.count(n['section'])} times"))
    # order must be a subsequence of the template's own order (repeats collapse)
    seq, cursor = [s for s in ids if s in allowed], 0
    dedup = []
    for s in seq:
        if not dedup or dedup[-1] != s:
            dedup.append(s)
    for s in dedup:
        try:
            cursor = order.index(s, cursor) + 1
        except ValueError:
            out.append((ERROR, "TEMPLATE_NODE_SEQUENCE_MATCH",
                        f"node order violates template {tid!r}: {s!r} appears out of sequence "
                        f"(template order: {', '.join(order)})"))
            break

    # ---- chrome
    for i, sid in enumerate(ids):
        if SECTIONS.get(sid, {}).get("category") == "chrome":
            out.append((ERROR, "CHROME_IS_NOT_A_PAGE_NODE",
                        f"nodes[{i}] {sid!r} is site chrome; Navbar and Footer render once "
                        f"outside <Routes> and are never page nodes"))

    # ---- heroes
    heroes = [(i, s) for i, s in enumerate(ids) if SECTIONS.get(s, {}).get("category") == "hero"]
    if len(heroes) > 1:
        out.append((ERROR, "ONE_HERO_PER_PAGE",
                    f"{len(heroes)} hero sections: {', '.join(s for _, s in heroes)}"))
    if not heroes and tid not in NO_HERO_TEMPLATES:
        out.append((ERROR, "ONE_HERO_PER_PAGE",
                    f"template {tid!r} has no hero node and is not an exempt hero-less template"))
    if heroes and tid in NO_HERO_TEMPLATES:
        out.append((ERROR, "ONE_HERO_PER_PAGE",
                    f"template {tid!r} is declared hero-less but nodes[{heroes[0][0]}] is a hero"))
    if heroes and heroes[0][0] != 0:
        out.append((ERROR, "HERO_MUST_BE_FIRST",
                    f"hero {heroes[0][1]!r} is at index {heroes[0][0]}, not 0"))

    # ---- one-per-page, keyed on (section, variant)
    seen = {}
    for i, n in enumerate(nodes):
        sid = n.get("section")
        c = SECTIONS.get(sid, {}).get("constraints", {})
        key = (sid, n.get("variant"))
        seen[key] = seen.get(key, 0) + 1
        if c.get("onePerPage") and seen[key] > 1:
            out.append((ERROR, "ONE_PER_PAGE_RESPECTED",
                        f"{sid!r} (variant={n.get('variant')!r}) is onePerPage but appears {seen[key]} times"))
        mx = c.get("maxPerPage")
        if mx and seen[key] > mx:
            out.append((ERROR, "ONE_PER_PAGE_RESPECTED",
                        f"{sid!r} exceeds maxPerPage {mx} (appears {seen[key]} times)"))
        if c.get("homeRouteOnly") and tid != "page.home":
            out.append((ERROR, "HOME_ONLY_SECTIONS",
                        f"{sid!r} is home-only but appears on template {tid!r}"))
        if c.get("routeOnly") and spec.get("route") not in c["routeOnly"]:
            out.append((ERROR, "ROUTE_ONLY_SECTIONS",
                        f"{sid!r} is restricted to {c['routeOnly']} but route is {spec.get('route')!r}"))

    # ---- captured binding
    for i, sid in enumerate(ids):
        cap = SECTIONS.get(sid, {}).get("category") == "captured"
        if cap and tid != CAPTURED_TEMPLATE:
            out.append((ERROR, "CAPTURED_SECTIONS_ARE_TEMPLATE_BOUND",
                        f"nodes[{i}] {sid!r} is a captured plate section and may only appear on {CAPTURED_TEMPLATE!r}"))
        if tid == CAPTURED_TEMPLATE and not cap and sid not in AUTO_SPLICED_INTO_CAPTURE:
            out.append((ERROR, "CAPTURED_SECTIONS_ARE_TEMPLATE_BOUND",
                        f"nodes[{i}] {sid!r} is not a captured section and is not one of the "
                        f"AUTO()-spliced replacements permitted on {CAPTURED_TEMPLATE!r}"))

    # ---- motion
    moving = 0
    for i, n in enumerate(nodes):
        sid = n.get("section")
        m = n.get("motion") or {}
        contract = SECTIONS.get(sid, {}).get("motion", {})
        pat = m.get("pattern")
        if pat in FORBIDDEN_MOTION:
            out.append((ERROR, "NO_SCROLL_REVEAL",
                        f"nodes[{i}] {sid!r}: motion pattern {pat!r} does not exist on the source site"))
        if m.get("reducedMotionFallback") not in FALLBACKS:
            out.append((ERROR, "REDUCED_MOTION_FALLBACK_REQUIRED",
                        f"nodes[{i}] {sid!r}: missing or unknown reducedMotionFallback "
                        f"{m.get('reducedMotionFallback')!r}"))
        if contract:
            if pat != contract.get("pattern"):
                out.append((ERROR, "NO_SCROLL_REVEAL",
                            f"nodes[{i}] {sid!r}: motion pattern {pat!r} contradicts the measured "
                            f"contract pattern {contract.get('pattern')!r}"))
            if m.get("reducedMotionFallback") != contract.get("reducedMotionFallback"):
                out.append((ERROR, "REDUCED_MOTION_FALLBACK_REQUIRED",
                            f"nodes[{i}] {sid!r}: reducedMotionFallback {m.get('reducedMotionFallback')!r} "
                            f"contradicts the measured contract {contract.get('reducedMotionFallback')!r}"))
        if pat and pat != "none":
            moving += 1
    if moving > MOTION_BUDGET and tid not in MOTION_BUDGET_EXCEPTIONS:
        out.append((WARN, "MOTION_BUDGET",
                    f"{moving} moving nodes exceeds the budget of {MOTION_BUDGET}"))

    # ---- content: maxWords + asset roles
    for i, n in enumerate(nodes):
        sid = n.get("section")
        sec = SECTIONS.get(sid)
        if not sec:
            continue
        _walk_words(n.get("content") or {}, sec["content"], f"nodes[{i}].content", out)
        _walk_media(n.get("content") or {}, f"nodes[{i}].content", out)

    # ---- rhythm (warn)
    cta = {"conversion.cta-band", "conversion.product-cta-panel"}
    for i, sid in enumerate(ids):
        if sid in cta and i != len(ids) - 1 and tid not in CTA_LAST_EXCEPTIONS:
            out.append((WARN, "CTA_BAND_SHOULD_BE_LAST",
                        f"{sid!r} is at index {i} of {len(ids) - 1}; it should close the page"))
    for i in range(1, len(ids)):
        a, b = ids[i - 1], ids[i]
        ca = SECTIONS.get(a, {}).get("category")
        cb = SECTIONS.get(b, {}).get("category")
        if ca and ca == cb and (a, b) not in ADJACENCY_OK:
            out.append((WARN, "NO_ADJACENT_SAME_CATEGORY",
                        f"nodes[{i-1}]..[{i}] {a!r} then {b!r} share category {ca!r} "
                        f"and are not a recorded real adjacency"))
    return out


# --------------------------------------------------------------------------- helpers
def _sample(schema):
    """Smallest value satisfying a content sub-schema — used to synthesize controls."""
    if "const" in schema:
        return schema["const"]
    if "enum" in schema:
        return schema["enum"][0]
    t = schema.get("type")
    if t == "array":
        item = schema.get("items") or {}
        n = schema.get("minItems", 1)
        return [_sample(item) for _ in range(max(1, n))]
    if t == "object" or "properties" in schema:
        o = {}
        for k in schema.get("required", []):
            o[k] = _sample((schema.get("properties") or {}).get(k, {"type": "string"}))
        return o
    if t == "number":
        return 0
    if t == "integer":
        return 0
    if t == "boolean":
        return False
    return "x"


def synthesize(template_id):
    """Build a minimal, conformant PageSpec for a real template (control fixture)."""
    tpl = TEMPLATES[template_id]
    route = "/"
    if template_id == "page.home":
        route = "/"
    elif template_id == "page.pricing":
        route = "/pricing"
    elif template_id == "page.not-found":
        route = "*"
    else:
        route = "/" + template_id.split(".", 1)[1]
    nodes = []
    for n in tpl["nodes"]:
        if not n["required"]:
            continue
        sec = SECTIONS[n["section"]]
        m = sec["motion"]
        node = {"section": n["section"], "content": _sample(sec["content"]),
                "motion": {k: v for k, v in m.items() if k in
                           ("pattern", "trigger", "durationMs", "easing", "reducedMotionFallback")}}
        nodes.append(node)
    return {"$schema": "./pagespec.schema.json", "pageSpecVersion": "1.0.0", "route": route,
            "template": template_id, "theme": "light", "title": tpl["name"], "nodes": nodes}


def main(argv):
    paths = argv[1:] or [os.path.join(HERE, "example.pagespec.json")]
    bad = 0
    for p in paths:
        with open(p, encoding="utf-8") as fh:
            spec = json.load(fh)
        res = validate(spec)
        errs = [r for r in res if r[0] == ERROR]
        warns = [r for r in res if r[0] == WARN]
        print(f"{os.path.basename(p)}: {len(errs)} error(s), {len(warns)} warning(s)")
        for sev, rid, msg in res:
            print(f"  [{sev}] {rid}: {msg}")
        bad += len(errs)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
