---
project: lean-magic-editor
type: index
doctrack_version: "3.0.0"
last_updated: 2026-09-23
tags: [doctrack/type/index, doctrack/status/active, doctrack/audience/claude]
---
# Lean Magic browser editor

TypeScript/Vite static site in the local `web/` subproject, which is the root of the GitHub repository `jakemannix/ArcaneLean`. The `github` remote preserves the existing development history. Original Python sources and fixtures are bundled unchanged in `prototype/`. See [[features/editor]], [[components/translator]], and [[decisions/browser-translation]]. Run and test commands are in `README.md`.

`AGENTS.md` is the entry point for future agents: it records the product intent, one-school-first scope, shared cantrips, mathematical guarantees, and the user's interaction and visual preferences.

| Source file | Responsibility |
|---|---|
| src/main.ts | CodeMirror editors, synchronization, examples, import/export |
| src/style.css | Grimoire theme and responsive layouts |
| src/translator.ts | Tokenization and bidirectional conversion |
| src/tables.json | Original Python vocabulary |
| src/grimoire.key.json | Original custom name mappings |
| src/Schools.lean | Lean examples |
| src/Schools.spell | Python-generated golden fixture |
| tests/translator.test.ts | Compatibility and regression coverage |
| index.html | Entry point and metadata |

## Graduate grimoire (2026-09-23)
The active product is now Enchantment/group theory, not the initial seven toy examples. See [[features/graduate-grimoire]] for every formal source module and verification flow. The broader multi-school goal remains pending user review of this intermediate chapter.

| Source file | Responsibility |
|---|---|
| src/catalog.ts | Verified library access and checked/draft status |
| src/magic.ts | Proof-body folding and reduced-motion-aware effects |
| src/grimoire.generated.json | Verified generated catalog |
| grimoire/chapters.json | Explanations and reference metadata |
| grimoire/lexicon.json | Curated mathematical Arcane vocabulary |
| scripts/verify-grimoire.ts | Lean build, decoded compilation, axiom audit, artifact generation |
| tests/grimoire.test.ts | Provenance, round-trip, folding, and status regression checks |
| math/Mathematics.lean | Whole-book Lean imports |
| math/Mathematics/Functions.lean | Function composition and equivalence foundations |
| math/Mathematics/GroupTheory/Subgroups.lean | Generated subgroups and closure |
| math/Mathematics/GroupTheory/Homomorphisms.lean | Homomorphism laws and composition |
| math/Mathematics/GroupTheory/Kernels.lean | Kernels, normality, and injectivity |
| math/Mathematics/GroupTheory/QuotientGroups.lean | Quotient lifts and uniqueness |
| math/Mathematics/GroupTheory/FirstIsomorphism.lean | Quotient-to-range isomorphism |
| math/Mathematics/GroupTheory/Lagrange.lean | Subgroup and element orders |
| math/Mathematics/GroupTheory/SimpleGroups.lean | Simplicity of groups of prime order |
| math/Mathematics/GroupTheory/GroupActions.lean | Orbit–stabilizer correspondence |
| math/Mathematics/GroupTheory/Permutations.lean | The symmetric group on three elements |

See [[decisions/mathematical-names]] for mathematical Lean naming, namespace aliases in saved keys, and material-component spell variables.
