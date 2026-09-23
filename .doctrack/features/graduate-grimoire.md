---
type: feature
last_updated: 2026-09-23
tags: [doctrack/type/feature, doctrack/status/active, doctrack/audience/claude]
---
# Graduate grimoire

## User-directed intermediate deliverable
The user narrowed the immediate step to one substantial school for review, plus reusable cantrips. Enchantment/group theory is implemented: sixteen Enchantment folios, two Transmutation folios, and Cantrips, totaling 174 checked declarations. The user also asked for sparkly code folding after functionality; see [[editor]]. Do not proceed to build all schools before the user reviews this intermediate direction.

The longer objective remains a graduate grimoire across all eight schools, including group theory, real analysis, combinatorics, topology, linear analysis, complex analysis, algebraic geometry, manifolds, and “PDSs” (clarification still pending, irrelevant to this first school). This broader objective is not complete.

## Proof style
The user asked for explicit, teaching-style proofs. Prefer named `have` steps and `calc` chains, with `congrArg` for each rewrite inside a product, over one-line library calls or `simp`. Reuse earlier folios' spells (for example, Kernels uses Pacts' preservation laws). Give every new identifier a curated name in `grimoire/lexicon.json`, so no automatic filler words appear. The user now requests shared teaching comments. Preserve identical comments in both panes; comment visibility is a display effect, while saved and compiled sources keep them. Keep mathematical code unchanged during tutorial-only work.

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
- `math/Mathematics/GroupTheory/Cayley.lean`: imports Kernels and GroupActions. Builds the pacts from an action into `Function.End X` (the court) and into `Equiv.Perm X` by hand, proves the self-action has trivial kernel, reuses the Kernels injectivity criterion, and packages Cayley's theorem with `MonoidHom.ofInjective`. Free objects (primordials) and endomorphism objects (courts) are planned as mirror images.
- `math/Mathematics/GroupTheory/Permutations.lean`: actual S₃, two swaps, order 6 by decide, involution by library lemma, noncommutativity by evaluating both products at 0.

`grimoire/chapters.json` holds mathematical explanations, hypotheses, prerequisite IDs, and exact-revision source references. `grimoire/lexicon.json` curates concept and proof names; the translator allocates any additional unknown names reversibly.

Formal namespaces, declarations, and proof-local names are mathematical; spell names live in the translation key. The `namespaces` map aliases `Mathematics.GroupTheory` to `Arcana☿Enchantment`, while the global table translates declaration names and ingredient variables such as `x → jade✨cube`. Generated glossaries include used namespace aliases and ingredient variables. No automatically allocated names occur in the checked folios. See [[../decisions/mathematical-names]] for the naming rationale.

`npm run grimoire:verify` compiles originals, serializes/reloads the shared key, requires exact decoding, compiles decoded modules with decoded imports first, and audits all exported declarations via #print axioms. Only propext, Classical.choice, Quot.sound are accepted. It generates `src/grimoire.generated.json`, downloadable sources/bundles/key/audit in `public/grimoire/`, and `grimoire/README.md`. The catalog records source, spell, translator, table, lexicon, and metadata hashes. Tests catch stale artifacts. Ordinary frontend builds use these checked-in generated artifacts and do not download mathlib.

Use Nat.card carefully: it is zero for infinite types. Lagrange and orbit–stabilizer explanations explicitly describe finite-group interpretation and the extended formal convention. Orbit/coset correspondence is a set equivalence, not a group isomorphism when stabilizers are non-normal.

Related: [[editor]], [[../components/translator]], [[../decisions/browser-translation]].
- `math/Mathematics/CategoryTheory/ForgetfulAdjoints.lean` (Transmutation): the free monoid's universal property proved by induction on words (left adjoint of `forget MonCat`), the units construction built by hand with its universal property (right adjoint of `forget₂ GrpCat MonCat`), mathlib's `MonCat.adj` and `GrpCat.forget₂MonAdj`, and `Perm X ≃* Units (Function.End X)` linking back to Cayley's court.
- `math/Mathematics/CategoryTheory/Yoneda.lean` (Transmutation): the covariant Yoneda lemma built by hand (`transformationToElement`, `elementToTransformation`, both round trips by naturality and `map_id`), proved equal to mathlib's `coyonedaEquiv`, plus `FreeMonoid Unit` representing the forgetful functor and `Multiplicative ℤ` representing a group's elements.


## Finite groups and the Eightfold Way
The field exercises now cover C₆, C₄ versus Klein V₄, D₄ (square symmetries), D₅ acting faithfully on the regular pentagram, and Hamilton's Q₈. S₃ explicitly enumerates equilateral-triangle rotations and reflections. New modules: `CyclicComputations`, `KleinComputations`, `DihedralComputations`, `Pentagram`, `HamiltonQuaternions`, `EightfoldWay`.

`EightfoldWay` gives three abelian models alongside D₄/Q₈, computes cardinalities/powers/involution counts, transports involutions through an explicit equivalence, and proves all ten pairwise non-isomorphism claims. `order_eight_classification` quantifies over an arbitrary group with `Nat.card G = 8`; it specializes P3Group's full p³ classification at 2, deriving finiteness rather than assuming a multiplication table. The final spell plus pairwise distinctness establishes exactly five isomorphism classes.

P3Group is an unmodified pinned dependency at `822647a71aedace398cb886eb9a6b7993096e53b` (lixiang90/p3group; Apache 2.0 notices in source). It originally targeted Lean4.32.2 and compiles on our4.33.1 with only upstream style warnings. Keep mathlib's require block **last** in `math/lakefile.toml` so its transitive dependency pins take precedence. The axiom audit checks the transitive dependency on the full external proof, not only the local wrapper.

References may have `package: "P3Group"`; omitted package means mathlib. Verification rejects dirty or mismatched source trees for both, creates exact-revision links for either package, and records `dependencyRevisions`, `manifestHash`, `lakefileHash`, and `verifierHash`. Tests guard these provenance fields. All spell names are curated; there are no auto names. See [[../decisions/arcana-vocabulary]] and the human vocabulary guide for the five houses' magical names.


## Tutorial edition
Every folio has a `tutorial` object: motivation, four titled explanatory steps, and a guided experiment with a hint. `src/tutorial.ts` renders this as plain text in a collapsible walkthrough; the verifier includes it in the generated readable book. Shared Lean comments explain constructions and proof steps, and pass through unchanged into Arcana. The verifier explicitly checks identical comment token sequences in both sources. The tutorial pass preserves all non-comment mathematical tokens and all 174 declarations; only Cayley's explanatory composition-order sentence was corrected (k acts first in g*k).

Related: [[editor]] for the tutorial renderer and source-preserving comment visibility, [[../components/translator]] for adversarial custom-key validation.
