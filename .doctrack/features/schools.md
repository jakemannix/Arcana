---
type: feature
last_updated: 2026-09-24
tags: [doctrack/type/feature, doctrack/status/active, doctrack/audience/claude]
---
# Schools and subschools

The user expanded the [[graduate-grimoire]] beyond its first deep group-theory chapter. Preserve the existing proofs and tutorials while adding coherent introductory paths with computations, meaningful proofs, precise hypotheses, and shared hideable teaching comments.

## Curriculum

| School | Subschool | Content |
|---|---|---|
| Enchantment | The Veyr houses | Existing group theory and finite computations |
| Transmutation | The changing arts | Existing adjunctions and Yoneda |
| Transmutation | Chains & echoes | Chain complexes, boundaries and cycles, quotient homology |
| Illusion | The imaginary arts | Complex arithmetic, conjugation, complex differentiation |
| Phantasms | Forms from sigils | Affine polynomial zero loci and vanishing ideals |
| Divination | Augury | Probability models and expectations |
| Divination | Scrying | Descriptive statistics and variance |
| Divination | Arithmancy | Prime arithmetic and modular computation |
| Necromancy | The fading arts | Real geometric limits, epsilon-N convergence, derivatives |
| Necromancy | Bound echoes | Continuous linear maps and operator bounds, with Enchantment |

These are foundations, not complete graduate courses. The algebraic chain-complex example does not claim a topological realization or a construction of singular homology. Phantasms introduces classical affine algebraic sets, not schemes. Descriptive statistics is distinguished from probabilistic sampling and statistical inference. Necromancy does not claim PDE results or completeness hypotheses that its operator estimates do not need.

## Catalog and navigation

`grimoire/schools.json` is the ordered registry of school names, mathematical subjects, descriptions, sigils, and subschools. Every non-Cantrip folio in `grimoire/chapters.json` has a matching `school` and `subschool`. The verifier rejects missing groups and prerequisites and records the registry and its source hash in the generated catalog. Regression checks ensure every group contains lessons, every folio is reachable exactly once, and the prerequisite graph has no cycles.

The [[editor]] renders school headings as native keyboard-accessible disclosure controls. The selected folio's school opens initially and on navigation, including prerequisite links. Mathematical labels replace magical labels in Mathematics mode; shared descriptions and tutorials remain hidden in Magic. Subschool IDs are stable navigation targets; display names can change independently.

The [[../components/translator|translator]] remains shared across all schools. New mathematical namespaces have explicit spell aliases, all added identifiers are curated, and saved keys retain the correspondence. The same original/decoded compilation and standard-axiom audit covers every new folio.

## Real and functional analysis modules

- `math/Mathematics/RealAnalysis/Limits.lean`: geometric decay's initial value and recurrence, convergence for 0 ≤ r < 1, its epsilon-N form, the half-decay example, positivity at every finite index, the derivative of squaring, and continuity.
- `math/Mathematics/FunctionalAnalysis/Operators.lean`: scalar multiples of the identity as continuous linear maps; addition preservation; a norm-based perturbation estimate; exact scaling norm under nontriviality; composition norm bound; exact halving of errors. No completeness or finite-dimensionality is assumed.

Source references in each folio resolve against the pinned Mathlib checkout, not moving documentation URLs. Follow [[graduate-grimoire]] for generation and proof auditing.

## Verified expansion
The full book has 29 folios and 280 audited declarations: 10 new folios contribute 106 declarations. Independent cross-reviews checked the topology and Divination arguments, the real/functional analysis hypotheses, and navigation coverage. The translator review exposed escaped-Mercury and ellipsis edge cases while fixing chained tuple projections; the preceding-token rule preserves numeric literals in these cases.

## Additional formal modules

- `math/Mathematics/AlgebraicTopology/ChainComplexes.lean`: kernels and images in a genuine chain complex, chain-map preservation, and rational triple differential computations.
- `math/Mathematics/AlgebraicTopology/Homology.lean`: quotient by boundaries, explicit equivalence to ℚ, equality and nonzero classes, the bridge to Mathlib H₁, and induced-map functoriality.
- `math/Mathematics/ComplexAnalysis/ComplexArithmetic.lean`: imaginary-unit powers, rotations, conjugation, squared modulus, and exact complex computations.
- `math/Mathematics/ComplexAnalysis/Holomorphic.lean`: entire squaring and exponential-of-square functions, their derivatives, and evaluation at i.
- `math/Mathematics/AlgebraicGeometry/AffineZeroLoci.lean`: zero loci, vanishing ideals, their Galois connection, evaluation kernels, complex coordinate axes, and multiplicity forgotten by solution sets.
- `math/Mathematics/Probability.lean`: a normalized finite PMF, event probabilities, a real integral expectation, and independent paired draws.
- `math/Mathematics/Statistics.lean`: finite sample mean and empirical variance, centering and shift laws, second moments, least-squares minimization, exact observations, and corrected sample variance caveat.
- `math/Mathematics/NumberTheory.lean`: congruence preservation, prime factor arguments, Fermat, exponent reduction, inverses, and counterexamples without hypotheses.
