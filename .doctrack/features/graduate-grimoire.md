---
type: feature
last_updated: 2026-09-23
tags: [doctrack/type/feature, doctrack/status/active, doctrack/audience/claude]
---
# Graduate grimoire

## User-directed intermediate deliverable
The user narrowed the immediate step to one substantial school for review, plus reusable cantrips. Enchantment/group theory is implemented: eight folios plus Cantrips, totaling 40 checked declarations. The user also asked for sparkly code folding after functionality; see [[editor]]. Do not proceed to build all schools before the user reviews this intermediate direction.

The longer objective remains a graduate grimoire across all eight schools, including group theory, real analysis, combinatorics, topology, linear analysis, complex analysis, algebraic geometry, manifolds, and “PDSs” (clarification still pending, irrelevant to this first school). This broader objective is not complete.

## Source and verification
`math/lean-toolchain` pins Lean v4.33.1; `math/lake-manifest.json` pins mathlib 0df444a360eaa60ab8c11dca51a86af692955474. `math/Arcane.lean` imports the whole book. Individual source modules:
- `math/Arcane/Cantrips.lean`: thread composition, injectivity/surjectivity composition, equivalence inverse.
- `math/Arcane/Enchantment/Circles.lean`: subgroup closure, universal property, inverse/product closure.
- `math/Arcane/Enchantment/Pacts.lean`: homomorphisms and composition; imports and uses Cantrips.faithful_thread.
- `math/Arcane/Enchantment/Kernels.lean`: kernel, conjugation closure, normality, trivial-kernel criterion.
- `math/Arcane/Enchantment/Descent.lean`: quotient lift and uniqueness by quotient induction.
- `math/Arcane/Enchantment/FirstIsomorphism.lean`: quotient-kernel equivalence to range, representative computation, bijectivity, surjective variant.
- `math/Arcane/Enchantment/Lagrange.lean`: coset cardinality, subgroup divisibility, order divisibility, cardinal power identity.
- `math/Arcane/Enchantment/Orbits.lean`: orbit/coset equivalence, representative action, orbit–stabilizer cardinality.
- `math/Arcane/Enchantment/Permutations.lean`: actual S₃, two swaps, order 6, involution and noncommutativity verified by decide.

`grimoire/chapters.json` holds mathematical explanations, hypotheses, prerequisite IDs, and exact-revision source references. `grimoire/lexicon.json` curates concept and proof names; the translator allocates any additional unknown names reversibly.

`npm run grimoire:verify` compiles originals, serializes/reloads the shared key, requires exact decoding, compiles decoded modules with decoded imports first, and audits all exported declarations via #print axioms. Only propext, Classical.choice, Quot.sound are accepted. It generates `src/grimoire.generated.json`, downloadable sources/bundles/key/audit in `public/grimoire/`, and `grimoire/README.md`. The catalog records source, spell, translator, table, lexicon, and metadata hashes. Tests catch stale artifacts. Ordinary frontend builds use these checked-in generated artifacts and do not download mathlib.

Use Nat.card carefully: it is zero for infinite types. Lagrange and orbit–stabilizer explanations explicitly describe finite-group interpretation and the extended formal convention. Orbit/coset correspondence is a set equivalence, not a group isomorphism when stabilizers are non-normal.

Related: [[editor]], [[../components/translator]], [[../decisions/browser-translation]].
