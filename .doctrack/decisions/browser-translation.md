---
type: decision
last_updated: 2026-09-22
tags: [doctrack/type/decision, doctrack/status/active, doctrack/audience/claude]
---
# Browser translation

Use a pure TypeScript translator and CodeMirror for both panes. A static Vite build keeps conversion local and avoids a server dependency. A Python backend would add hosting and latency without improving the requested editor. A Lean kernel or language server is a separate future integration: no checker is embedded, and successful round trips must never be presented as verified proofs.

Bundle both source texts with their key because spell text alone cannot reliably recover arbitrary renamed Lean identifiers. Preserve quoted identifiers verbatim to prevent collisions with keywords and allocated vocabulary. Current bundles use `arcana/v1`. The user explicitly requested removal of the Python prototype and backward compatibility, so no retired formats, aliases, or fixtures are maintained.

See [[components/translator]] and [[features/editor]]; project map [[_project]].

## Checked library, unchecked edits (2026-09-23)
The graduate grimoire adds a local Lean/mathlib verification pipeline; the browser remains static. This preserves the lightweight editor while allowing genuine proof-checked originals. A generated catalog plus hashes ties badges to exact verified source; edits immediately lose the proof-check claim. See [[../features/graduate-grimoire]].
