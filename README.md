# Lean Magic

A TypeScript browser grimoire that translates Lean source into spell text and back. Both CodeMirror panes are editable, with syntax highlighting, school examples, exact round-trip checks, and downloadable bundles containing both texts and their shared name key.

## Run locally

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. Requires Node.js 22 or newer. Build a static site with `npm run build`; serve `dist/` with any static web host (or `npm run preview`). No server-side runtime or API key is needed. Fonts load from Google Fonts with local fallbacks.

## Use

- Edit either pane; the other updates immediately.
- Choose a school to load its example. This replaces the current draft; download it first if you want to keep it.
- **Check round trip** verifies that decoding the spell reproduces the Lean text exactly. It does **not** run Lean, check theorem validity, or reject `sorry`.
- **Download grimoire** saves a JSON bundle with the Lean, spell, and name key. **Open file** reopens that bundle or a `.lean` / `.spell` file. Standalone spell files use the current key; keep the JSON bundle for reliable recovery of custom names.
- Work is held in memory in the current tab. Reloading loses unsaved edits.
- Standard CodeMirror undo, redo, search, selection, and indentation shortcuts are available. Escape followed by Tab lets keyboard users leave the editor.

## Implementation

- `src/translator.ts`: tokenizer, name-key management, and pure conversion functions; no DOM dependency.
- `src/tables.json`: dictionary tables ported from the original `../spellcast.py`.
- `src/main.ts`: CodeMirror setup, paired editor updates, example loading, file import/export, and status feedback.
- `src/style.css`: responsive grimoire interface, with reduced-motion support.
- `src/Schools.lean`, `src/Schools.spell`, `src/grimoire.key.json`: original sample fixtures.
- `tests/translator.test.ts`: golden compatibility and edge-case tests. Run `npm test`.

Readable quoted names are reserved before automatic name assignment and stored in the key, fixing the Python toy's `«ember»` collision. Existing sample output remains byte-for-byte compatible. The original Python source is unchanged. The tokenizer is a practical lexical translator, not Lean's full extensible parser; custom syntax may require extensions. The UI checks and reports round-trip mismatches.

Deployment metadata is in `.openai/hosting.json`; the app can also be built and hosted independently of Sites.
