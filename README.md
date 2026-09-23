# Lean Magic · Enchantment

A browser grimoire of **real group theory**, presented in Arcane Lean. Eight Enchantment lessons share a foundational cantrip folio. The 40 definitions and theorems are compiled against a pinned mathlib release; their translated `.spell` sources are decoded and compiled again.

[Read the complete grimoire](grimoire/README.md) · [Proof dependency audit](public/grimoire/axioms.txt)

## Read and experiment

The browser opens on the first isomorphism theorem. Use the contents to explore generated subgroups, homomorphisms, kernels and normality, quotient descent and uniqueness, Lagrange's theorem, orbit–stabilizer, and the concrete permutation group S₃.

Each folio includes its mathematical meaning, hypotheses, proof idea, prerequisites, vocabulary, and upstream mathlib references pinned to the exact commit. Arcane source and ordinary Lean are editable side by side. Spell bodies start folded: click **reveal enchantment**, the gutter, or **Reveal** to open them with a brief glimmer. **Veil** folds them again. Reduced-motion preferences disable the effects.

Original folios show **Lean checked** only while their source exactly matches a verified original and the translation round-trips. Editing changes that status to **draft proof unchecked**. The browser does not run Lean; a successful translation does not prove an edited theorem. Standard Lean axioms (`propext`, `Classical.choice`, and `Quot.sound`) may occur; `sorry`, custom axioms, and native evaluation shortcuts are not used.

Arcane namespaces and field access use Mercury's **☿** glyph: `Rite☿Perfect` translates to `Function.Bijective`. Older spells using dots still import. Decimal points and literal text retain their original punctuation.

Drafts survive switching folios within a tab. Download a grimoire JSON bundle to retain both texts and the name key; reloads lose unsaved drafts. **Open file** accepts those bundles, `.lean`, or `.spell` (using the current key). Original source downloads are provided per folio. CodeMirror's search, undo, redo, indentation, and folding shortcuts are available. Escape followed by Tab leaves an editor.

## Run the browser locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open Vite's printed URL. `npm run build` creates static assets in `dist/`; `npm run preview` serves the result. No backend or API key is needed. Google Fonts have local font fallbacks.

## Reproduce the mathematics

Install [elan](https://github.com/leanprover/elan) first, then:

```sh
cd math
lake update
lake exe cache get
cd ..
npm run grimoire:verify
npm test
npm run build
```

Lean is pinned by `math/lean-toolchain` to **v4.33.1**. Mathlib is locked to **0df444a360eaa60ab8c11dca51a86af692955474** in `math/lake-manifest.json`. The verifier checks the dependency checkout, compiles the original project, translates every folio using one curated lexicon, reloads the serialized key, checks byte-for-byte decoding, and independently compiles the decoded modules with their own import path. It then inspects all 40 declarations with `#print axioms` and allows only the three standard axioms listed above.

Only after all checks pass does it generate the browser catalog, `.lean`/`.spell` downloads, bundles, key, audit, and readable book. `npm test` detects stale source, vocabulary, and metadata; validates all translations and prerequisite links; and tests folding boundaries and the edited-proof status. The 33 tests include the prototype's compatibility regressions and namespace glyph handling.

## Structure

- `math/Arcane/Cantrips.lean`: reusable function composition, injectivity, surjectivity, and equivalence lemmas. The Pacts module actually imports and uses these.
- `math/Arcane/Enchantment/*.lean`: eight substantive group-theory folios.
- `grimoire/chapters.json`: explanations, prerequisite graph, and mathlib source references.
- `grimoire/lexicon.json`: curated Arcane names for mathematical constructs and library lemmas.
- `scripts/verify-grimoire.ts`: reproducible build, translation, and proof audit.
- `src/grimoire.generated.json`: verified browser catalog and evidence hashes; do not edit manually.
- `src/translator.ts`: DOM-independent token translator, accepting the original Python sample format.
- `src/catalog.ts`: catalog types and conservative verification-status predicate.
- `src/main.ts`: book navigation, CodeMirror editing, draft retention, and import/export.
- `src/magic.ts`: proof-body folding, reveal glimmers, and finite-lived sparkle effects.
- `public/grimoire/`: downloadable sources, shared key, bundles, and axiom report.

Arcane Lean is a reversible presentation language, not a separate proof kernel. Its tokenizer supports these verified sources, not all possible Lean syntax extensions. The original Python prototype remains untouched in the parent directory.

The other schools remain future work. This release deliberately develops one school for review before expanding the graduate grimoire.
