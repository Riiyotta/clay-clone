#!/usr/bin/env python3
"""Adversarial suite: every rule in this repo must actually reject a bad instance.

Also asserts the CONTROL case — all 19 real templates and the unmutated bundled
example produce zero errors. A validator that rejects everything is as broken as
one that rejects nothing.

    python3 schema/tests/adversarial_test.py
"""
from __future__ import annotations

import copy
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SCHEMA_DIR = os.path.dirname(HERE)
REPO = os.path.dirname(SCHEMA_DIR)
sys.path.insert(0, SCHEMA_DIR)

import semantic_validate as V  # noqa: E402

try:
    from jsonschema import Draft7Validator
except ImportError:  # pragma: no cover
    print("FAIL: jsonschema is required (pip install jsonschema)")
    sys.exit(2)

SCHEMA = json.load(open(os.path.join(SCHEMA_DIR, "pagespec.schema.json"), encoding="utf-8"))
EXAMPLE = json.load(open(os.path.join(SCHEMA_DIR, "example.pagespec.json"), encoding="utf-8"))
VALIDATOR = Draft7Validator(SCHEMA)


def schema_errors(spec):
    return [e.message for e in VALIDATOR.iter_errors(spec)]


def semantic_errors(spec):
    return [f"{r[1]}: {r[2]}" for r in V.validate(spec) if r[0] == V.ERROR]


def ex(**_):
    return copy.deepcopy(EXAMPLE)


# --------------------------------------------------------------- mutations
MUTATIONS = []


def mutation(layer, rule):
    def deco(fn):
        MUTATIONS.append((fn.__name__, layer, rule, fn))
        return fn
    return deco


# ---- schema layer
@mutation("schema", "closed template enum")
def m_unknown_template():
    s = ex(); s["template"] = "page.landing-splash"; return s


@mutation("schema", "required field present")
def m_missing_title():
    s = ex(); del s["title"]; return s


@mutation("schema", "closed section enum (invented type alias)")
def m_invented_section():
    s = ex(); s["nodes"][1]["section"] = "hero.splash"; return s


@mutation("schema", "motion.reducedMotionFallback required")
def m_missing_fallback():
    s = ex(); del s["nodes"][0]["motion"]["reducedMotionFallback"]; return s


@mutation("schema", "motion object is closed (additionalProperties:false)")
def m_invented_motion_field():
    s = ex(); s["nodes"][0]["motion"]["inventedAnimation"] = "swoopIn"; return s


@mutation("schema", "closed reducedMotionFallback enum")
def m_bad_fallback_value():
    s = ex(); s["nodes"][0]["motion"]["reducedMotionFallback"] = "fade-instead"; return s


@mutation("schema", "content contract is closed (additionalProperties:false)")
def m_extra_content_field():
    s = ex(); s["nodes"][0]["content"]["backgroundVideo"] = "hero.mp4"; return s


@mutation("schema", "node object is closed")
def m_extra_node_field():
    s = ex(); s["nodes"][0]["className"] = "bg-red-500"; return s


@mutation("schema", "pageSpecVersion is pinned")
def m_bad_version():
    s = ex(); s["pageSpecVersion"] = "2.0.0"; return s


@mutation("schema", "closed assetRole enum")
def m_invented_asset_role():
    s = ex()
    s["nodes"][0]["content"]["media"] = {"assetRole": "hero.background", "ref": "x.avif"}
    return s


@mutation("schema", "media fields must be objects, not bare strings")
def m_bare_media_string():
    s = ex(); s["nodes"][0]["content"]["media"] = "/assets/img/hero.avif"; return s


@mutation("schema", "closed motion.pattern enum blocks invented patterns")
def m_invented_motion_pattern():
    s = ex(); s["nodes"][0]["motion"]["pattern"] = "scroll-reveal"; return s


@mutation("schema", "closed theme")
def m_bad_theme():
    s = ex(); s["theme"] = "dark"; return s


# ---- structural layer
@mutation("structural", "ONE_PER_PAGE_RESPECTED / ONE_HERO_PER_PAGE")
def m_duplicate_hero():
    s = ex(); s["nodes"].insert(1, copy.deepcopy(s["nodes"][0])); return s


@mutation("structural", "TEMPLATE_NODE_SEQUENCE_MATCH: required node removed")
def m_remove_required():
    s = ex()
    s["nodes"] = [n for n in s["nodes"] if n["section"] != "content.centred-intro-cards"]
    return s


@mutation("structural", "HERO_MUST_BE_FIRST")
def m_hero_not_first():
    s = ex(); s["nodes"][0], s["nodes"][1] = s["nodes"][1], s["nodes"][0]; return s


@mutation("structural", "TEMPLATE_NODE_SEQUENCE_MATCH: node from another template")
def m_foreign_node():
    s = ex()
    s["nodes"].insert(2, {"section": "pricing.plan-grid",
                          "content": V._sample(V.SECTIONS["pricing.plan-grid"]["content"]),
                          "motion": {k: v for k, v in V.SECTIONS["pricing.plan-grid"]["motion"].items()
                                     if k in ("pattern", "trigger", "durationMs", "easing", "reducedMotionFallback")}})
    return s


@mutation("structural", "TEMPLATE_NODE_SEQUENCE_MATCH: declared template contradicts nodes[]")
def m_template_mismatch():
    """The single most repeated bug class: nodes[] valid in isolation, wrong for `template`."""
    s = ex(); s["template"] = "page.legal"; return s


@mutation("structural", "TEMPLATE_NODE_SEQUENCE_MATCH: nodes reordered out of template sequence")
def m_out_of_sequence():
    s = ex()
    s["nodes"] = [s["nodes"][0], s["nodes"][4], s["nodes"][1], s["nodes"][2], s["nodes"][3], s["nodes"][5]]
    return s


@mutation("structural", "CHROME_IS_NOT_A_PAGE_NODE")
def m_chrome_as_node():
    s = ex()
    s["nodes"].insert(0, {"section": "chrome.navbar",
                          "content": V._sample(V.SECTIONS["chrome.navbar"]["content"]),
                          "motion": {k: v for k, v in V.SECTIONS["chrome.navbar"]["motion"].items()
                                     if k in ("pattern", "trigger", "durationMs", "easing", "reducedMotionFallback")}})
    return s


@mutation("structural", "CAPTURED_SECTIONS_ARE_TEMPLATE_BOUND")
def m_captured_on_live_template():
    s = ex()
    s["nodes"].insert(1, {"section": "captured.art-plate",
                          "content": V._sample(V.SECTIONS["captured.art-plate"]["content"]),
                          "motion": {k: v for k, v in V.SECTIONS["captured.art-plate"]["motion"].items()
                                     if k in ("pattern", "trigger", "durationMs", "easing", "reducedMotionFallback")}})
    return s


@mutation("structural", "HOME_ONLY_SECTIONS")
def m_home_only_elsewhere():
    s = ex()
    s["nodes"].insert(1, {"section": "social.logo-marquee",
                          "content": V._sample(V.SECTIONS["social.logo-marquee"]["content"]),
                          "motion": {k: v for k, v in V.SECTIONS["social.logo-marquee"]["motion"].items()
                                     if k in ("pattern", "trigger", "durationMs", "easing", "reducedMotionFallback")}})
    return s


@mutation("structural", "ROUTE_ONLY_SECTIONS")
def m_route_only_wrong_route():
    s = V.synthesize("page.pricing"); s["route"] = "/plans"; return s


@mutation("structural", "ONE_HERO_PER_PAGE: hero added to a hero-less template")
def m_hero_on_heroless_template():
    s = V.synthesize("page.contact")
    s["nodes"].insert(0, copy.deepcopy(EXAMPLE["nodes"][0]))
    return s


# ---- runtime layer
@mutation("runtime", "MAX_WORDS_EXCEEDED on a top-level field")
def m_maxwords_title():
    s = ex()
    s["nodes"][0]["content"]["title"] = " ".join(["word"] * 40)
    return s


@mutation("runtime", "MAX_WORDS_EXCEEDED inside an array item")
def m_maxwords_nested():
    s = ex()
    s["nodes"][1]["content"]["cards"][0]["body"] = " ".join(["word"] * 120)
    return s


@mutation("runtime", "NO_SCROLL_REVEAL: motion contradicts the measured contract")
def m_motion_contradicts_contract():
    s = ex()
    s["nodes"][0]["motion"]["pattern"] = "marquee-linear"
    s["nodes"][0]["motion"]["reducedMotionFallback"] = "paused-track"
    return s


# --------------------------------------------------------------- runner
def main():
    print("=" * 74)
    print("CONTROLS — must produce ZERO errors")
    print("=" * 74)
    fails = []

    se = schema_errors(EXAMPLE)
    sm = semantic_errors(EXAMPLE)
    ok = not se and not sm
    print(f"  {'PASS' if ok else 'FAIL'}  example.pagespec.json            schema={len(se)} semantic={len(sm)}")
    if not ok:
        fails.append(("control", "example.pagespec.json", se + sm))

    for tid in sorted(V.TEMPLATES):
        spec = V.synthesize(tid)
        se, sm = schema_errors(spec), semantic_errors(spec)
        ok = not se and not sm
        print(f"  {'PASS' if ok else 'FAIL'}  {tid:32} schema={len(se)} semantic={len(sm)}")
        if not ok:
            fails.append(("control", tid, se + sm))

    print()
    print("=" * 74)
    print("MUTATIONS — every one must be REJECTED")
    print("=" * 74)
    for name, layer, rule, fn in MUTATIONS:
        spec = fn()
        se, sm = schema_errors(spec), semantic_errors(spec)
        rejected = bool(se or sm)
        by = "schema" if se else "semantic"
        print(f"  {'PASS' if rejected else 'FAIL'}  [{layer:10}] {name:34} rejected-by={by if rejected else 'NOTHING'}  ({rule})")
        if not rejected:
            fails.append(("mutation", name, ["NOT REJECTED"]))

    print()
    print("=" * 74)
    total = 1 + len(V.TEMPLATES) + len(MUTATIONS)
    if fails:
        print(f"FAILED: {len(fails)} of {total} cases")
        for kind, what, msgs in fails:
            print(f"  {kind} {what}:")
            for m in msgs[:6]:
                print(f"     {m}")
        return 1
    print(f"OK: {total} cases — {1 + len(V.TEMPLATES)} controls clean, {len(MUTATIONS)} mutations all rejected")
    return 0


if __name__ == "__main__":
    sys.exit(main())
