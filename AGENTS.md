# ArcaneLean: intent and working notes

## What we are making

ArcaneLean lets someone read and write real Lean mathematics as a magical grimoire. Definitions become rituals, theorems become spells, proofs become their inner workings, and mathematical subjects give substance to schools of magic. The fun comes from discovering that the spell actually means something precise and works.

The core experience is a browser-based, side-by-side editor: Arcane on the left, ordinary Lean on the right, with reversible editing in either direction. A reader should be able to enjoy the magical language, inspect its mathematical meaning, and explore how the proof works. Preserve both the playful atmosphere and the ability to understand the mathematics.

The longer-term ambition is substantial graduate mathematics across multiple schools, drawing on mathlib: algebra, analysis, topology, geometry, and related subjects. The user explicitly chose an intermediate step of developing **one school deeply enough to judge the experience**. The current school is **Enchantment / group theory**. Continue from that scope; expansion into other schools should follow the user's direction.

## What makes a good addition

- Give a school a coherent mathematical progression. Enchantment currently develops subgroups, homomorphisms, kernels, quotients, the first isomorphism theorem, Lagrange, simple groups of prime order, orbit–stabilizer, and a concrete permutation example.
- Include mathematical meaning, hypotheses, proof ideas, prerequisites, and precise library references alongside the magical presentation. Substantial examples should reward opening their proofs.
- Extract shared foundations into **Cantrips** when multiple spells or schools need them. Make these useful imported lemmas and constructions; existing Pacts already uses the shared function-composition cantrips.
- Choose memorable, consistent magical names for mathematical concepts. Keep the shared vocabulary and serialized translation key coherent across folios.
- Get the functionality working, then polish the delight. The user specifically likes sparkles, glimmers, and IDE-style folding that reveals a spell's inner body.

## Mathematical and translation guarantees

Lean and mathlib provide the proof checking. Arcane is a reversible presentation language. A successful translation round trip means the text survived conversion; it does not establish that an edited proof is valid.

- Preserve the distinction between checked original folios and unchecked drafts. The static browser currently does not run Lean. Editing a checked example must never retain an unsupported proof-check claim.
- Shipped folios must compile as Lean, decode byte-for-byte from their Arcane representation using the saved key, and compile again from that decoded source.
- Keep the existing axiom audit: only `propext`, `Classical.choice`, and `Quot.sound` are allowed. Do not use `sorry`, `admit`, custom axioms, or native evaluation shortcuts to make a lesson appear verified.
- State hypotheses and mathematical caveats accurately. For example, `Nat.card` is zero on infinite types, and orbit/coset correspondence need not be a group isomorphism.
- Preserve strings, comments, quoted identifiers, whitespace, and literal glyphs through translation. Namespace conversion belongs in the lexer/translator.
- Arcane namespaces and field access use Mercury, **`☿`**: `Rite☿Perfect` corresponds to `Function.Bijective`. Continue accepting legacy dotted spells. Decimal points and punctuation inside literal text retain their meaning.
- Multi-word Arcane names use sparkles, **`✨Preserve✨the✨Binding✨`**, not TitleCase: capitalized words for spells, rituals, and namespaces; lowercase words for library functions; small words such as "the" and "of" in lower case. Frequent local hypothesis names stay single words (`sigilward`). The group inverse `⁻¹` is written as a dagger, `†`. Named theorems carry their discoverer's name, as in `✨Lagrange's✨Measure✨of✨the✨Coven✨` or `✨Noether's✨Unveiling✨of✨the✨Image✨`; the lesson text says who they were. Words about prime numbers build on `Indivisible` (`Nat.Prime`) and `primal` (`primalward`). The user wants the Arcane side to avoid looking mathematical or programmatic, so keep `:`, `/`, `{`, `}` and similar symbols replaced.
- Keep the translation key with exported drafts; it carries the information needed to reverse renamed identifiers.

## Interaction and visual character

Keep the grimoire welcoming and readable. Magic should help a reader explore the proof. Folding hides the body while retaining the complete statement and hypotheses. Reveal effects should be brief, respect reduced-motion preferences, and preserve keyboard access.

The user requested independent hide/show controls for the math and magic panes. Keep those controls accessible even when both panes are hidden. Hiding a pane should preserve its document, undo history, folding, and synchronization. Drafts currently survive folio navigation within a tab; a reload loses unsaved work, so avoid unnecessarily refreshing a user's active editor.

## Where to work and how to verify

This repository's root is the browser project (locally it was created inside `lean_magic/web`). The original Python implementation is preserved in `prototype/`; the TypeScript translator is the current implementation.

- Read `README.md` and the relevant `.doctrack/` notes before changing a subsystem. Update those notes when behavior or architecture changes.
- Mathematical sources: `math/Arcane/`; lesson explanations and vocabulary: `grimoire/chapters.json` and `grimoire/lexicon.json`.
- Translation: `src/translator.ts`; verification status: `src/catalog.ts`; editor: `src/main.ts`; folding/effects: `src/magic.ts`; styling: `src/style.css`.
- Use `npm ci` to install dependencies, `npm run dev` for the editor, `npm test` for regressions, and `npm run build` for TypeScript checking and the static bundle.
- After changing formal sources, translation, vocabulary, or lesson metadata, run `npm run grimoire:verify`, then the tests and build. The verifier regenerates `src/grimoire.generated.json`, `public/grimoire/`, and `grimoire/README.md`; do not hand-edit those outputs.
- Run direct `lake` commands from `math/`, where the pinned Lean toolchain and mathlib manifest live. See `README.md` for initial mathlib setup. Ordinary frontend builds use the checked-in catalog and need no Lean installation.
- Match verification effort to the change. Documentation-only changes need a content/diff review rather than rebuilding the mathematics.

GitHub is `jakemannix/ArcaneLean`, with the local remote named `github`. GitHub pushes and updates to the hosted site are separate operations. Hosting configuration is in `.openai/hosting.json`; preserve the current audience when deploying. Repository and site visibility should follow explicit user direction.
