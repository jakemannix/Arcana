---
project: lean-magic-editor
type: index
doctrack_version: "3.0.0"
last_updated: 2026-09-22
tags: [doctrack/type/index, doctrack/status/active, doctrack/audience/claude]
---
# Lean Magic browser editor

TypeScript/Vite static site in the `web/` subproject. See [[features/editor]], [[components/translator]], and [[decisions/browser-translation]]. Run and test commands are in `README.md`.

| Source file | Responsibility |
|---|---|
| src/main.ts | CodeMirror editors, synchronization, examples, import/export |
| src/style.css | Grimoire theme and responsive layouts |
| src/translator.ts | Tokenization and bidirectional conversion |
| src/tables.json | Original Python vocabulary |
| src/grimoire.key.json | Original custom name mappings |
| src/Schools.lean | Lean examples |
| src/Schools.spell | Python-generated golden fixture |
| tests/translator.test.ts | Compatibility and regression coverage |
| index.html | Entry point and metadata |
