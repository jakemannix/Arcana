---
type: feature
files: [src/main.ts, src/style.css, index.html]
last_updated: 2026-09-22
tags: [doctrack/type/feature, doctrack/status/active, doctrack/audience/claude]
---
# Browser editor

Two CodeMirror 6 instances with StreamLanguage highlighting. An update listener converts edits to the other pane under a reentrancy guard. Conversion uses a cloned key and commits it after success. Example/file loads replace editor states to reset history. Round-trip checks are debounced 160ms; manual checks animate only successful nonempty translations. Never represent this as Lean proof verification; see [[decisions/browser-translation]].

Seven school examples plus the complete source. File input accepts Lean, spell, or `lean-magic/v1` JSON bundles. Bundles contain `lean`, `spell`, and `key`; imports verify matching text/key before replacing the draft. Standalone spell imports use the current key. Imports capped at 1 MB. Downloads preserve both texts and the key; no persistence or backend. New examples replace the current draft. UI uses textContent for imported error messages and notes.

Depends on [[components/translator]]. Project map: [[_project]].
