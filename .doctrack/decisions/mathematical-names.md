---
type: decision
status: accepted
date: 2026-09-23
last_updated: 2026-09-23
tags: [doctrack/type/decision, doctrack/status/active, doctrack/audience/claude]
---
# Mathematical names and material components

The user wants mathematical module/declaration names in Lean and evocative spell names and ingredient variables in Arcana. Rename the actual formal sources into `Mathematics.Functions` and `Mathematics.GroupTheory`, with mathematical declaration and proof-local names. Keep magical titles in `grimoire/lexicon.json`. Do not create a cosmetic third representation that could show Lean text different from the compiled source.

Extend the serialized key with optional namespace-prefix aliases. A global `GroupTheory → Enchantment` substitution would also change mathlib imports; the contextual alias `Mathematics.GroupTheory → Arcana☿Enchantment` distinguishes the book's school from the library's subject. Continue using the existing global table for declaration and variable names.

Material components are lowercase identifiers joined with interior sparkles (`x → jade✨cube`, `y → silver✨bell`, `f → copper✨wire`). Keep framed sparkle names for spell titles and preserve mathematical variables/types on the Lean side. Consistent ingredient mappings across folios help readers follow proofs. Include them in the glossary, and keep the key with exported drafts. Current bundles retain the full key for exact decoding.

The formal module paths change; dependents must use the new imports. All 55 declarations must pass the original build, exact serialized-key decoding, decoded build, and axiom audit before regenerating checked catalog evidence. See [[../components/translator]], [[../features/graduate-grimoire]], and [[../features/editor]].
