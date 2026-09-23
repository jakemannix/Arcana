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

Keep `IsSimpleGroup → Simple Veyr` distinct from `Nat.Prime → Indivisible`: simple groups need not have prime order. The separately defined simplicity property retains its Unbreakable Veyr spell name.

Non-syntactic structure names live in `grimoire/lexicon.json`; alternate defaults have been removed from `src/tables.json`. The user explicitly dropped backward compatibility and the Python prototype. Bundles use `arcana/v1`; branding, npm package, Lean package, and downloadable key use Arcana. The actual Lean namespace remains `Mathematics`, translated as `Arcana` by the current key.

Related: [[mathematical-names]], [[../components/translator]], [[../features/editor]], [[../features/graduate-grimoire]].
