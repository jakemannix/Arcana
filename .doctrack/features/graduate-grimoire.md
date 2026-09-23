---
type: feature
last_updated: 2026-09-23
tags: [doctrack/type/feature, doctrack/status/active, doctrack/audience/claude]
---
# Graduate grimoire

## User-directed intermediate deliverable
The user narrowed the immediate step to one substantial school for review, plus reusable cantrips. Enchantment/group theory is implemented: nine folios plus Cantrips, totaling 55 checked declarations. The user also asked for sparkly code folding after functionality; see [[editor]]. Do not proceed to build all schools before the user reviews this intermediate direction.

The longer objective remains a graduate grimoire across all eight schools, including group theory, real analysis, combinatorics, topology, linear analysis, complex analysis, algebraic geometry, manifolds, and “PDSs” (clarification still pending, irrelevant to this first school). This broader objective is not complete.

## Proof style
The user asked for explicit, teaching-style proofs. Prefer named `have` steps and `calc` chains, with `congrArg` for each rewrite inside a product, over one-line library calls or `simp`. Reuse earlier folios' spells (for example, Kernels uses Pacts' preservation laws). Give every new identifier a curated name in `grimoire/lexicon.json`, so no automatic filler words appear. Keep proofs free of comments, because comments pass through translation unchanged.

## Source and verification
`math/lean-toolchain` pins Lean v4.33.1; `math/lake-manifest.json` pins mathlib 0df444a360eaa60ab8c11dca51a86af692955474. `math/Mathematics.lean` imports the whole book. Individual source modules:
- `math/Mathematics/Functions.lean`: thread composition, injectivity/surjectivity composition proved step by step, both equivalence inverse laws.
- `math/Mathematics/GroupTheory/Subgroups.lean`: subgroup closure, universal property derived from `Subgroup.mem_closure`, inverse/product closure, antisymmetry.
- `math/Mathematics/GroupTheory/Homomorphisms.lean`: homomorphisms and composition; derives f(1) = 1 and f(x⁻¹) = f(x)⁻¹ from multiplication alone; imports and uses Mathematics.Functions.injective_compose.
- `math/Mathematics/GroupTheory/Kernels.lean`: imports Homomorphisms. Kernel, conjugation closure by an explicit congrArg calc, normality built from it, trivial-kernel criterion proved in both directions.
- `math/Mathematics/GroupTheory/QuotientGroups.lean`: imports Homomorphisms. Why N ≤ ker f makes the lift well defined, quotient lift, uniqueness through representatives.
- `math/Mathematics/GroupTheory/FirstIsomorphism.lean`: imports QuotientGroups. Builds the quotient-to-range map by descent, proves injectivity and surjectivity by hand, packages it with `MulEquiv.ofBijective`, surjective variant.
- `math/Mathematics/GroupTheory/Lagrange.lean`: coset cardinality from G ≃ (G/H) × H, subgroup divisibility, order divisibility through the cyclic subgroup, power identity by calc.
- `math/Mathematics/GroupTheory/SimpleGroups.lean`: imports Lagrange. Defines `isSimpleGroupProperty` (nontrivial, and every normal subgroup is ⊥ or ⊤), proves it equals mathlib's `IsSimpleGroup`, proves that a group of prime order has only ⊥ and ⊤ as subgroups (normality unused), and concludes that it is simple.
- `math/Mathematics/GroupTheory/GroupActions.lean`: imports Lagrange. g·x = k·x iff g⁻¹k fixes x, orbit/coset equivalence, representative action, orbit–stabilizer cardinality from Lagrange's coset count.
- `math/Mathematics/GroupTheory/Permutations.lean`: actual S₃, two swaps, order 6 by decide, involution by library lemma, noncommutativity by evaluating both products at 0.

`grimoire/chapters.json` holds mathematical explanations, hypotheses, prerequisite IDs, and exact-revision source references. `grimoire/lexicon.json` curates concept and proof names; the translator allocates any additional unknown names reversibly.

Formal namespaces, declarations, and proof-local names are mathematical; spell names live in the translation key. The `namespaces` map aliases `Mathematics.GroupTheory` to `Arcana☿Enchantment`, while the global table translates declaration names and ingredient variables such as `x → jade✨cube`. Generated glossaries include used namespace aliases and ingredient variables. No automatically allocated names occur in the checked folios. See [[../decisions/mathematical-names]] for the rationale and compatibility boundary.

`npm run grimoire:verify` compiles originals, serializes/reloads the shared key, requires exact decoding, compiles decoded modules with decoded imports first, and audits all exported declarations via #print axioms. Only propext, Classical.choice, Quot.sound are accepted. It generates `src/grimoire.generated.json`, downloadable sources/bundles/key/audit in `public/grimoire/`, and `grimoire/README.md`. The catalog records source, spell, translator, table, lexicon, and metadata hashes. Tests catch stale artifacts. Ordinary frontend builds use these checked-in generated artifacts and do not download mathlib.

Use Nat.card carefully: it is zero for infinite types. Lagrange and orbit–stabilizer explanations explicitly describe finite-group interpretation and the extended formal convention. Orbit/coset correspondence is a set equivalence, not a group isomorphism when stabilizers are non-normal.

Related: [[editor]], [[../components/translator]], [[../decisions/browser-translation]].
