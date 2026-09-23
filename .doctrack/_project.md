---
project: arcana
type: index
doctrack_version: "3.0.0"
last_updated: 2026-09-23
tags: [doctrack/type/index, doctrack/status/active, doctrack/audience/claude]
---
# Arcana browser editor

TypeScript/Vite browser project at the root of `jakemannix/Arcana`, with the GitHub repository tracked by the `origin` remote. See [[features/editor]], [[components/translator]], and [[decisions/browser-translation]]. Run and test commands are in `README.md`.

`AGENTS.md` is the entry point for future agents: it records the product intent, one-school-first scope, shared cantrips, mathematical guarantees, and the user's interaction and visual preferences.

| Source file | Responsibility |
|---|---|
| src/main.ts | CodeMirror editors, synchronization, examples, import/export |
| src/style.css | Grimoire theme and responsive layouts |
| src/translator.ts | Tokenization and bidirectional conversion |
| src/tables.json | Built-in syntax, vocabulary, symbols, and name allocation |
| tests/translator.test.ts | Exact translation and quoted-name regression coverage |
| index.html | Entry point and metadata |

## Graduate grimoire (2026-09-23)
The active product is now Enchantment/group theory, not the initial seven toy examples. See [[features/graduate-grimoire]] for every formal source module and verification flow. The broader multi-school goal remains pending user review of this intermediate chapter.

| Source file | Responsibility |
|---|---|
| src/catalog.ts | Verified library access and checked/draft status |
| src/magic.ts | Proof-body folding and reduced-motion-aware effects |
| src/grimoire.generated.json | Verified generated catalog |
| grimoire/chapters.json | Explanations and reference metadata |
| grimoire/lexicon.json | Curated mathematical Arcana vocabulary |
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

See [[decisions/arcana-vocabulary]] for the Arcana rename, rune carriers, and the user-selected Veyr family. The human-facing vocabulary and mathematical inheritance guide is `grimoire/VOCABULARY.md`. The npm package is `arcana`; the Lean package is `arcana_grimoire`; the downloadable translation key is `public/grimoire/arcana.key.json`.


The finite-group expansion adds six Enchantment folios, including the fully proved classification of order-eight groups. See [[features/graduate-grimoire]] for the pinned P3Group proof dependency, dependency precedence, provenance checks, and exact classification guarantees.


The tutorial edition adds guided readings and identical hideable source comments across all folios. [[features/editor]] covers the three animated reading views and source-preserving notes; [[components/translator]] covers fixes discovered by the two independent adversarial reviews. Core mathematics remains unchanged.
