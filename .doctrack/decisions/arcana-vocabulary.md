---
type: decision
status: accepted
date: 2026-09-23
last_updated: 2026-09-23
tags: [doctrack/type/decision, doctrack/status/active, doctrack/audience/claude]
---
# Arcana vocabulary

The user renamed the product/repository to Arcana, requested cryptic rune carriers, and explicitly selected the invented Veyr family for structure names. The earlier independent Binding/Weave/Prism/Attunement/Loom proposal was rejected because the names were bland and did not expose inheritance or actions.

Use runes for abstract carriers and lowercase material components for term variables. A carrier's rune is independent of its structures: `G → ᛰ`, `H → ☥`, `X → 🌒`, `R → ᚱ`, `M → ᛗ`, `F → ᚠ`, `A → ᚫ`. The lexicon uses distinct runes so global mappings remain reversible even when several types appear together.

The shared root encodes a mnemonic family: Group → Veyr, Ring → Veyrath, Field → Veyrion; Module → Bound Veyr and Algebra → Bound Veyrath expose external scalar action. Harmonic marks commutativity; Chanted distinguishes additive notation; Inner marks substructures. A ring has an additive commutative group, not generally a multiplicative group on its entire carrier. Lean supports semiring modules/algebras, so the explicit hypotheses remain authoritative. `grimoire/VOCABULARY.md` explains the family without adding new mathematical lessons.

Current non-syntactic structure names override the historical default words in `grimoire/lexicon.json`. Keep `src/tables.json` and the original key/fixtures stable, so old saved bundles still interpret their original vocabulary. The internal `lean-magic/v1` bundle identifier stays compatible; current branding, npm package, Lean package, and downloadable key use Arcana. The actual Lean namespace remains `Mathematics`, translated as `Arcana` by the current key.

Related: [[mathematical-names]], [[../components/translator]], [[../features/editor]], [[../features/graduate-grimoire]].
