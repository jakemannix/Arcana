# Proposal: the AI Mathemagician

A chat companion for Arcana. You ask a math question. The Mathemagician answers by casting a spell: behind the scenes a model writes Lean, Lean checks it against mathlib, and the translator shows the checked result as Arcana. Explanations are written as real mathematics first, then retold in the grimoire's vocabulary. Every spell that Lean checks can join the spellbook, so the book grows as people ask questions.

This document is a plan for local work. It says what to build, what to reuse from this repository, and which rules must not bend.

## 1. What the reader sees

1. The reader types a question into a chat panel beside the existing editor, for example "Why is every group of order 5 cyclic?" or "What is 7⁻¹ modulo 11?"
2. The Mathemagician answers in three visible states:
   - **Casting.** Lean is checking. The spell pane fills as candidate text arrives, dimmed.
   - **Sealed.** Lean accepted the spell and the axiom audit passed. The spell brightens with the existing glimmer effect.
   - **Fizzled.** Lean did not accept any attempt. The reader sees what was tried and why it failed. `sorry` already reads `fizzle`.
3. Every answer shows, above the spell, **the claim in plain words**, so the reader can confirm that the spell proves what they asked.
4. The reader can switch any answer to the Mathematics view (the exact Lean) or to Side by side, as with the folios today.
5. Follow-up questions ("why does that step work?") are answered from the checked Lean: real mathematics first, then the magical retelling, with the glossary one click away.
6. A sealed spell has a button to **keep it** in the reader's spellbook. A curator can later **enshrine** it in the shared book.

## 2. Rules that do not bend

These follow from `AGENTS.md` and keep the chatbot honest.

- **Only Lean decides "sealed."** A model's claim that a proof works is never shown as checked. The browser's existing rule (`isCheckedSource`) extends to chat answers: sealed means Lean compiled this exact text in this session.
- **The axiom audit applies.** Only `propext`, `Classical.choice`, and `Quot.sound` are allowed. `sorry`, `admit`, custom axioms, and `native_decide` make a spell fizzle.
- **State the claim before the proof.** The largest risk is a correct proof of the wrong statement. Each answer restates its Lean statement in plain words, and the UI shows that restatement before the spell.
- **The magical text comes from the translator, not from the model.** The model writes Lean and proposes names. The spell the reader sees is `toSpell(lean, key)`, so it decodes back exactly, like every folio.
- **New names obey the lexicon rules.** Proposed names must be unique, must pass `nameLengthProblem` in `src/naming.ts`, and must follow the vocabulary conventions (runes for carriers, material components for terms, sparkle titles for spells, named sorcerers for named theorems).

## 3. Architecture

```text
Browser (Arcana UI + chat panel)
   │  question, session token
   ▼
Serverless API  ── from anyalignment-deploy: hosting, sign-in, the reader's own API key
   │
   ├─► Orchestrator: a Claude tool-use loop
   │      tools: lean_check, lean_eval, lexicon_lookup, propose_names, search_mathlib
   │
   ├─► Lean worker: a warm Lean REPL with the pinned toolchain and mathlib loaded
   │
   └─► Spellbook store: per-reader drafts; enshrined spells go through a PR
```

### 3.1 Browser

- Add a chat panel to `src/main.ts`, with the Magic, Side by side, and Mathematics modes that `src/presentation.ts` already provides.
- Reuse `src/translator.ts`, `src/naming.ts`, the glossary, and the `magic.ts` effects without changes. Translation can run in the browser as today, or in the API with the same module.
- Stream progress events (casting, attempt n, sealed, fizzled) from the API so the Casting state is live.

### 3.2 Serverless API (anyalignment-deploy)

anyalignment-deploy already provides serverless hosting, sign-in, and bring-your-own-key. Arcana needs from it only:

- An authenticated endpoint that accepts a question and the conversation so far and streams events back.
- The reader's API key, used for their requests only and never stored in the spellbook.
- Per-reader rate limits, and a cap on Lean worker time for each request.

### 3.3 Orchestrator

A Claude tool-use loop. The Anthropic TypeScript SDK (`@anthropic-ai/sdk`) and its tool runner fit the existing TypeScript code. Defaults to start from:

- Model `claude-opus-5`, adaptive thinking, streaming responses. Proofs are reasoning-heavy work, so tune the effort level on a sample of real questions rather than guessing.
- The stable part of the prompt first (the vocabulary, the rules in section 2, the tool definitions), so prompt caching can reuse it across questions.

The loop:

1. **Route** the question to one of three paths:
   - *Explain*: the answer is a mathematical explanation. It may cite existing folios and needs no new proof.
   - *Compute*: the answer is a value. Lean confirms it with `decide` or `norm_num`, or with `#eval` restricted as in 3.4.
   - *Prove*: the answer is a theorem with a proof.
2. **Formalize.** Write the Lean statement, plus the plain-words restatement for the reader.
3. **Cast.** Call `lean_check`. On an error, give the Lean message back to the model and try again, up to a fixed number of attempts and a fixed time budget.
4. **Audit.** `#print axioms` on each new declaration, using the same allow-list as `scripts/verify-grimoire.ts`.
5. **Name.** For each identifier the key does not know, the model proposes a spell name through `propose_names`. The tool rejects duplicates and names that fail `nameLengthProblem`, and the model tries again.
6. **Translate.** `toSpell` with the updated key. Check the round trip: `fromSpell(spell) === lean`.
7. **Explain.** Write the real mathematics, then a retelling that uses the grimoire's words for the same concepts. The retelling may not add claims that the mathematics does not contain.

Tools:

| Tool | Does | Returns |
|---|---|---|
| `lean_check` | Elaborates a Lean snippet in the warm REPL, with the grimoire's imports available | messages, errors, goals, new declarations |
| `lean_eval` | Evaluates a pure expression, with no IO | value, or error |
| `lexicon_lookup` | Maps Lean names to spell names and back, from the saved key | pairs |
| `propose_names` | Checks and reserves new spell names | accepted names, or the reasons they were refused |
| `search_mathlib` | Finds candidate lemmas by name or statement shape | declaration names and types |

### 3.4 Lean worker

- **Same pins as the book.** Lean `v4.33.1` from `math/lean-toolchain` and the mathlib commit in `math/lake-manifest.json`. The prebuilt mathlib cache is about 6.5 GB on disk.
- **Warm process.** Use the Lean REPL (`leanprover-community/repl`) with `Mathlib` and the book's `Mathematics` modules imported once. Each question then elaborates in seconds instead of re-importing mathlib.
- **Isolation. This is not optional.** Lean can run arbitrary code through `#eval` of `IO` actions, `run_cmd`, and `IO.Process`. The worker must:
  - run with no network access and a read-only file system;
  - have hard CPU-time and memory limits for each request;
  - refuse snippets that contain `IO`, `run_cmd`, `run_elab`, `#eval` of non-pure terms, `native_decide`, `unsafe`, `extern`, `implemented_by`, or `import` beyond the allowed list, before they reach Lean.
- **Hosting.** Serverless functions are a poor fit for a multi-gigabyte warm process. Run the worker as a long-lived container, one or more per region, behind the API. For local work, run it as a child process of the dev server.

### 3.5 Spellbook store

- **Reader drafts.** Each sealed answer is stored as an `arcana/v1` bundle (Lean, spell, and key, as `src/drafts.ts` writes today), plus an answer record: the question, the plain-words claim, the axiom list, and the Lean and mathlib pins. Keep the answer record separate, or add it as a new format version; do not change `arcana/v1` in place.
- **Enshrining.** A curator promotes a draft to the shared book by opening a PR that adds it as a folio. `npm run grimoire:verify` then rechecks everything, exactly as for hand-written folios. The shared book changes only through that path.
- **Lexicon growth.** Names accepted for a reader's draft stay in that draft's key. They enter `grimoire/lexicon.json` only when the spell is enshrined.

## 4. What already exists

| Need | Existing piece |
|---|---|
| Lean ↔ spell translation, reversible | `src/translator.ts` (`toSpell`, `fromSpell`, `Key`) |
| Name rules | `src/naming.ts`, and the vocabulary in `grimoire/VOCABULARY.md` |
| Checked and draft status | `src/catalog.ts` (`isCheckedSource`) |
| Compile, decode, recompile, axiom audit | `scripts/verify-grimoire.ts` |
| Reading modes, glimmers, folding | `src/presentation.ts`, `src/magic.ts` |
| Drafts and bundles | `src/drafts.ts` |
| A curated library to cite and import | `math/Mathematics/` (29 folios, 280 declarations) |

## 5. Milestones

1. **Local Lean worker.** REPL process with mathlib and `Mathematics` imported; the `lean_check` and `lean_eval` tools; the isolation filter; a small test set of snippets that must pass, fail, or be refused.
2. **Local orchestrator.** A Node dev server with the tool loop. A command-line harness that turns a question into a sealed or fizzled bundle, with no UI yet.
3. **Chat panel.** Streaming states in the existing editor, the plain-words claim, and "keep this spell" into local drafts.
4. **Evaluation set.** About 50 questions at Enchantment level (group theory, divisibility, small computations), each with the expected route and a check of the claim. Measure the seal rate, false seals (should be zero), time, and cost per answer before widening the scope.
5. **Hosted.** Move the API onto anyalignment-deploy, with sign-in, the reader's own key, rate limits, and the Lean worker as a container.
6. **Enshrining.** A curator flow that turns a kept spell into a folio PR.
7. **Widen the scope** school by school, starting where mathlib is deepest (Enchantment, Transmutation, Divination).

## 6. Risks

| Risk | Mitigation |
|---|---|
| Proves the wrong statement | Plain-words claim shown first; the reader confirms; evaluation checks claims, not only seals |
| Low seal rate on open questions | Routing to Explain or Compute; honest fizzles; scope limited to one school at first |
| Lean runs untrusted code | Filter before Lean; sandbox with no network, a read-only file system, and CPU and memory limits |
| Slow answers | Warm REPL; live Casting state; time budget for each request |
| Cost | The reader's own key; prompt caching of the stable prefix; effort tuned on the evaluation set |
| Lexicon sprawl | Naming rules enforced by the tool; names enter the shared lexicon only through enshrining |
| mathlib drift | The worker pins the same toolchain and mathlib commit as the book; upgrade both together |

## 7. Open questions

1. Should enshrining need a human curator every time, or may spells that pass verification and match an evaluation-style claim check merge on their own?
2. Should chat answers be able to *import* each other (a reader's later spell citing their earlier one), or only import the shared book?
3. How much of the Lean should a reader in Magic mode see while it is Casting: nothing, the attempts, or only the final spell?
4. Should the Mathemagician speak in character (a wizard's voice) in the retelling, or stay neutral with magical vocabulary only?
