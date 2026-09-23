---
type: decision
last_updated: 2026-09-22
tags: [doctrack/type/decision, doctrack/status/active, doctrack/audience/claude]
---
# Browser translation

Use a pure TypeScript port of the original Python toy and CodeMirror for both panes. A static Vite build keeps conversion local and avoids a server dependency. A Python backend would add hosting and latency without improving the requested editor. A Lean kernel or language server is a separate future integration: no checker is embedded, and successful round trips must never be presented as verified proofs.

Bundle both source texts with their key because spell text alone cannot reliably recover arbitrary renamed Lean identifiers. Reserve readable quoted names before lexicon allocation to repair the known collision. Original Python files remain unchanged.

See [[components/translator]] and [[features/editor]]; project map [[_project]].

## Checked library, unchecked edits (2026-09-23)
The graduate grimoire adds a local Lean/mathlib verification pipeline; the browser remains static. This preserves the lightweight editor while allowing genuine proof-checked originals. A generated catalog plus hashes ties badges to exact verified source; edits immediately lose the proof-check claim. See [[../features/graduate-grimoire]].
