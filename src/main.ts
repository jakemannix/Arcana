import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState, Prec } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import { StreamLanguage, HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { Key, WORDS, RUNE_PATTERN, numericPattern, fromSpell, toSpell } from './translator';
import { folios, schools, grimoireKey, isCheckedSource, provenance, type Folio } from './catalog';
import { foldAll, unfoldAll } from '@codemirror/language';
import { spellFolding, sparkleAt, shimmer } from './magic';
import { expand, LEAN_ABBREVIATIONS, SPELL_ABBREVIATIONS } from './glyphs';
import { createPresentationController, type PresentationMode } from './presentation';
import { tutorialComments, setCommentsVisible } from './comments';
import { renderTutorial } from './tutorial';
import { parseDraft, serializeDraft, type Draft } from './drafts';
import './style.css';

type Side = 'lean' | 'spell';
const initialFolio = folios.find(f => f.id === location.hash.slice(1)) ?? folios.find(f => f.id === 'first-isomorphism')!;
let selected: Folio | undefined = initialFolio;
let key = new Key(grimoireKey), updating = false;
const drafts = new Map<string, Draft>();
let personalDraft: Draft | undefined;
let presentationMode: PresentationMode = 'magic';
let notesVisible = true;
let checkTimer: ReturnType<typeof setTimeout>;
let toastTimer: ReturnType<typeof setTimeout>;

const app = document.querySelector<HTMLDivElement>('#app')!;
app.dataset.presentation = presentationMode;
app.innerHTML = `
  <header class="masthead">
    <h1 class="brand-title"><a class="brand" href="./"><span class="brand-mark" aria-hidden="true">⟐</span><span><b>ARCANA</b></span></a></h1>
    <span class="edition">THE GRADUATE GRIMOIRE <span>VOL. I</span></span>
    <div id="presentation-controls" class="presentation-controls" role="group" aria-label="Reading view"><button type="button" data-mode="magic" aria-pressed="true">✧ Magic</button><button type="button" data-mode="parallel" aria-pressed="false">Side by side</button><button type="button" data-mode="math" aria-pressed="false">Mathematics</button></div>
    <button id="help" class="quiet-button" aria-expanded="false" aria-controls="help-panel">How to read this <span aria-hidden="true">?</span></button>
  </header>
  <main class="grimoire-layout">
    <aside class="contents" aria-label="Grimoire contents">
      <p class="eyebrow">THE COMMON ARTS</p>
      <nav id="cantrip-nav" aria-label="Shared cantrips"></nav>
      ${schools.map(school => `
      <details class="school" data-school="${school.name}" ${school.name === initialFolio.school ? 'open' : ''}>
        <summary class="school-heading"><span aria-hidden="true">${school.sigil}</span><div><p class="eyebrow">SCHOOL OF</p><h2><span data-magical>${school.name}</span><span data-only="math">${school.subject}</span></h2></div></summary>
        <p class="school-description" data-mathematical>${school.description}</p>
        ${school.subschools.map(subschool => `
          ${school.subschools.length > 1 ? `<h3 class="subschool-heading"><span data-magical>${subschool.title}</span><span data-only="math">${subschool.subject}</span></h3>` : ''}
          <nav id="${subschool.id}-nav" aria-label="${subschool.title} lessons"></nav>`).join('')}
      </details>`).join('')}
      <button id="personal-draft" class="quiet-button personal-draft" hidden>Return to personal draft</button>
      <div class="contents-foot" data-mathematical><strong>Real mathematics. Written in Arcana.</strong><p>${folios.filter(f => f.school !== 'Cantrips').length} lessons · 1 shared foundation<br>${provenance.verification.declarationCount} checked declarations</p><a href="grimoire/axioms.txt" target="_blank" rel="noreferrer">Inspect the proof audit ↗</a></div>
    </aside>
    <div class="reading-desk">
      <section class="folio-introduction" data-transmute><p class="eyebrow" id="folio-level" data-mathematical></p><h2 id="folio-title" data-magical></h2><p class="folio-subtitle" id="folio-subtitle" data-mathematical></p><p class="lede" id="folio-summary" data-mathematical></p></section>
      <section id="help-panel" class="help-panel" hidden>
        <div data-only="magic"><h2>Reading a grimoire</h2><p>Choose a folio, unfold an enchantment, and try changing its ingredients. Use Veil and Reveal to close or open the spell bodies. The other reading views uncover the workings behind the words.</p><p>Type <code>\\sp</code> for ✨, <code>\\dag</code> for †, <code>\\merc</code> for ☿, or <code>\\rune</code> for ᛰ. Space or Tab completes a glyph.</p><p>Original folios are checked. Your edits remain unchecked drafts. Switching folios keeps them in this tab; save a grimoire before reloading. Press Escape, then Tab to leave the editor.</p></div>
        <div data-only="math"><h2>Reading a proof</h2><p>The editor contains the complete source of the selected folio. Open the proof folds to inspect its steps, and use the tutorial to work through its definitions and hypotheses. Type Lean shortcuts such as <code>\\to</code> for →.</p><p>Original folios were compiled and audited. Edits are drafts: this browser checks translation fidelity but does not run Lean. Save before reloading; folio navigation keeps drafts in this tab. Press Escape, then Tab to leave the editor.</p></div>
        <div data-only="parallel">
        <h2>Two languages, one theorem</h2>
        <p>The left pane is Arcana: mathematical names and syntax translated into a consistent spell vocabulary. The right pane is the exact Lean source. Edit either pane to translate in both directions.</p>
        <p>Spell ingredients such as <code>jade✨cube</code> and <code>silver✨bell</code> are variables: the math pane calls them <code>x</code> and <code>y</code>. Their types and hypotheses say what they can do. Spell names and schools also have mathematical names on the right; the saved name key keeps the correspondence.</p>
        <p><strong>Carriers and their laws:</strong> runes such as <code>ᛰ</code>, <code>☥</code>, and <code>🌒</code> name the types inhabited by ingredients. A <strong>Veyr</strong> is a group; a <strong>Veyrath</strong> is a ring, whose addition forms a commutative group. A <strong>Veyrion</strong> is a field. <strong>Bound Veyr</strong> names a module, and <strong>Bound Veyrath</strong> names an algebra: “Bound” marks a scalar action, with both carriers written explicitly. “Harmonic” marks commutativity; “Chanted” distinguishes additive group notation. The Lean pane states the exact laws and hypotheses.</p>
        <p><strong>Typing carrier runes:</strong> <code>\\rune</code> gives ᛰ, <code>\\ankh</code> gives ☥, <code>\\moon</code> gives 🌒, and <code>\\othala</code> gives ᛟ. The full translation key below each folio pairs runes with their mathematical names.</p>
        <p><strong>Reading numbers:</strong> the spell pane writes each digit as 〇一二三四五六七八九: <code>三</code> is 3, <code>六</code> is 6, and <code>二四</code> is 24. Type a backslash before any digit to insert its kanji. Digits keep their positions, so leading zeros and decimal places return exactly in Lean. Text inside quotes and comments stays literal.</p>
        <p>Every original folio was compiled against mathlib, translated, decoded, and compiled again. The proof audit rejects placeholders. Standard Lean axioms such as classical choice may occur. <strong>Your edits are drafts:</strong> the browser checks translation fidelity, but does not run Lean.</p>
        <p><strong>Typing glyphs:</strong> type a backslash and a short name, then a space or Tab. In the spell pane, <code>\\sp</code> gives ✨, <code>\\dag</code> gives †, and <code>\\merc</code> gives ☿. A backslash before any Lean symbol gives its spell glyph: <code>\\:</code> gives ⟡, <code>\\(</code> gives ⟪, <code>\\:=</code> gives ⇰, <code>\\0</code> gives 〇, and <code>\\1</code> gives 一. The Lean pane uses Lean's own shortcuts, such as <code>\\to</code> for → and <code>\\-1</code> for ⁻¹.</p>
        <p>Switching lessons keeps your drafts in this tab. Download to keep a copy with its name key; reloading the page loses unsaved drafts. Press Escape then Tab to leave an editor using the keyboard.</p>
        </div>
      </section>
      <section class="mathematical-reading" data-mathematical data-transmute aria-label="Mathematical meaning"><p class="eyebrow">BEHIND THE ENCHANTMENT</p><p id="meaning"></p><details><summary>Hypotheses & proof idea</summary><h3>What must be true</h3><p id="hypotheses"></p><h3>Why it works</h3><p id="proof-idea"></p></details><div id="prerequisites" class="prerequisites"></div></section>
      <section id="tutorial" class="tutorial" data-mathematical data-transmute></section>
      <section class="workspace" aria-label="Spell translation workspace">
        <div class="workspace-toolbar"><span id="folio-badge" class="folio-badge">Original folio</span><div class="toolbar-actions"><button id="restore" class="quiet-button">Restore original</button><button id="open" class="quiet-button">Open file</button><button id="download" class="quiet-button">Save grimoire ↓</button><input id="file" type="file" accept=".lean,.spell,.json" hidden /></div></div>
        <div class="comment-toolbar" data-mathematical><button id="toggle-notes" class="quiet-button" aria-controls="spell-editor lean-editor" aria-pressed="true">Hide notes</button><span>Shared notes stay in your saved source.</span></div>
        <div class="editors">
          <section id="spell-pane" class="editor-pane spell-pane" data-magical aria-label="Arcana"><header class="pane-header"><div><span class="pane-index">01</span><h2>Arcana</h2><span class="language-label">.spell</span></div><div class="spell-actions"><button id="veil" class="copy-button" title="Fold all spell bodies">Veil</button><button id="reveal" class="copy-button" title="Reveal all spell bodies">Reveal</button><button class="copy-button" data-copy="spell" aria-label="Copy Arcana">Copy</button></div></header><div id="spell-editor" class="editor-host" data-transmute></div><footer class="pane-footer"><span id="spell-count"></span><span>THE INCANTATION</span></footer></section>
          <section id="lean-pane" class="editor-pane lean-pane" data-mathematical aria-label="Lean source"><header class="pane-header"><div><span class="pane-index">02</span><h2>Lean + mathlib</h2><span class="language-label">.lean</span></div><button class="copy-button" data-copy="lean" aria-label="Copy Lean source">Copy</button></header><div id="lean-editor" class="editor-host" data-transmute></div><footer class="pane-footer"><span id="lean-count"></span><span>THE MATHEMATICS</span></footer></section>
        </div>
        <div class="validation-bar"><div class="validation-copy"><span id="status-icon" aria-hidden="true">◇</span><div><strong id="status" role="status" aria-live="polite"></strong><span id="status-detail"></span></div></div><button id="check" class="cast-button">Check round trip <span aria-hidden="true">⟐</span></button></div>
      </section>
      <section class="reading-notes" data-mathematical data-transmute><div data-only="parallel"><p class="eyebrow">WORDS OF POWER</p><p class="section-hint">The vocabulary used in this folio.</p><div id="concepts" class="concept-pairs"></div><details class="full-glossary"><summary>Full translation key for this folio</summary><div id="glossary"></div></details></div><div><p class="eyebrow">FROM THE GRAND ARCHIVE</p><p class="section-hint" id="version"></p><ul id="references"></ul><div class="source-downloads" id="source-downloads"></div></div></section>
    </div>
  </main>
  <footer class="page-footer"><span>PRECISE WORDS. CURIOUS MAGIC.</span><span>Six schools. Many paths through the grimoire.</span></footer>
  <div id="toast" class="toast" role="status" hidden></div>
`;

const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;

const runePattern = new RegExp(RUNE_PATTERN, 'u');
const language = (side: Side) => StreamLanguage.define<{ depth: number; projection: boolean }>({
  startState: () => ({ depth: 0, projection: false }),
  token(stream, state) {
    const projection = !stream.sol() && state.projection;
    state.projection = false;
    if (state.depth || stream.match('/-')) {
      if (!state.depth) state.depth = 1;
      while (!stream.eol()) {
        if (stream.match('/-')) state.depth++;
        else if (stream.match('-/')) { if (!--state.depth) break; }
        else stream.next();
      }
      return 'comment';
    }
    if (stream.match('--')) { stream.skipToEnd(); return 'comment'; }
    if (stream.match(/"(?:[^"\\]|\\.)*"?/)) return 'string';
    if (stream.match(/«[^»]*»/)) return 'variableName';
    if (side === 'spell' && stream.match('⟄')) { stream.next(); return 'operator'; }
    if (stream.match(numericPattern(side === 'spell', projection))) return 'number';
    if (stream.match('...') || stream.match('..')) return 'operator';
    if (side === 'spell' && stream.match(runePattern)) return 'variableName';
    if (stream.match(/(?:✨(?:[\p{L}_][\p{L}\p{N}\p{M}_'!?]*✨)+|[\p{L}_][\p{L}\p{N}\p{M}_'!?]*(?:✨[\p{L}_][\p{L}\p{N}\p{M}_'!?]*)+)/u)) return 'atom';
    const word = stream.match(/[\p{L}_][\p{L}\p{N}\p{M}_'!?]*/u);
    if (word) {
      const text = (word as RegExpMatchArray)[0];
      if (side === 'lean' ? Object.hasOwn(WORDS, text) : Object.values(WORDS).includes(text)) return 'keyword';
      return 'variableName';
    }
    state.projection = stream.next() === (side === 'spell' ? '☿' : '.');
    return 'operator';
  },
});
const highlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#91b7cb' },
  { tag: tags.variableName, color: '#e4dcc7' },
  { tag: tags.atom, color: '#ecd29a' },
  { tag: tags.number, color: '#d1b57d' },
  { tag: tags.string, color: '#9ebd9a' },
  { tag: tags.comment, color: '#83948f', fontStyle: 'italic' },
  { tag: tags.operator, color: '#b0b8b3' },
]);
const editorTheme = EditorView.theme({
  '&': { height: '100%', color: '#e4dcc7', backgroundColor: 'transparent', fontSize: '15px' },
  '.cm-content': { fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace', padding: '22px 0 50px', caretColor: '#e0bd7d' },
  '.cm-line': { padding: '0 20px 0 10px' },
  '.cm-scroller': { overflow: 'auto', lineHeight: '1.9' },
  '.cm-gutters': { backgroundColor: 'transparent', color: '#687878', border: 'none', padding: '22px 8px 0 10px', minWidth: '36px' },
  '.cm-activeLineGutter, .cm-activeLine': { backgroundColor: '#ffffff04' },
  '&.cm-focused': { outline: 'none' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': { backgroundColor: '#46666e70' },
  '.cm-cursor': { borderLeftColor: '#e0bd7d' },
  '.cm-tooltip': { backgroundColor: '#233236', borderColor: '#54605a', color: '#ede5d0' },
  '.cm-panels': { backgroundColor: '#182529', color: '#ede5d0' },
}, { dark: true });

/** Replace a pending backslash shortcut, such as `\sp` for ✨, as the user types. */
function glyphShortcuts(side: Side) {
  const table = side === 'spell' ? SPELL_ABBREVIATIONS : LEAN_ABBREVIATIONS;
  const apply = (view: EditorView, from: number, to: number, typed: string) => {
    if (from !== to || !view.state.selection.main.empty) return false;
    const line = view.state.doc.lineAt(from), expansion = expand(line.text.slice(0, from - line.from), typed, table);
    if (!expansion) return false;
    const start = from - expansion.from;
    view.dispatch({ changes: { from: start, to, insert: expansion.insert }, selection: { anchor: start + expansion.insert.length }, userEvent: 'input.type' });
    return true;
  };
  return Prec.highest([EditorView.inputHandler.of(apply), keymap.of([{ key: 'Tab', run: view => apply(view, view.state.selection.main.head, view.state.selection.main.head, '\t') }])]);
}

function editorState(side: Side, doc: string): EditorState {
  return EditorState.create({ doc, extensions: [tutorialComments(notesVisible && presentationMode !== 'magic', presentationMode !== 'magic'), spellFolding(side === 'spell'), basicSetup, glyphShortcuts(side), keymap.of([indentWithTab]), language(side), syntaxHighlighting(highlight), editorTheme,
      EditorView.contentAttributes.of({ 'aria-label': side === 'lean' ? 'Edit Lean source' : 'Edit spell text', spellcheck: 'false' }),
      EditorView.updateListener.of(update => { if (update.docChanged && !updating) { invalidateCheck(); counts(); translate(side); } }),
    ] });
}
function makeEditor(side: Side, doc: string): EditorView {
  return new EditorView({ parent: $(`#${side}-editor`), state: editorState(side, doc) });
}
const lean = makeEditor('lean', initialFolio.lean);
const spell = makeEditor('spell', initialFolio.spell);
const editors = { lean, spell };

const value = (side: Side) => editors[side].state.doc.toString();
function replace(side: Side, text: string, reset = false) {
  const view = editors[side];
  if (reset) {
    // Loading a file/example starts a fresh history; ordinary translations retain it.
    view.setState(editorState(side, text));
    return;
  }
  if (value(side) !== text) view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
}
function status(message: string, detail: string, ok: boolean) {
  $('#status').textContent = message; $('#status-detail').textContent = detail;
  $('#status-icon').textContent = ok ? '✧' : '◇';
  $('.validation-bar').classList.toggle('success', ok);
}
function counts() {
  for (const side of ['lean', 'spell'] as const) $(`#${side}-count`).textContent = `${editors[side].state.doc.lines} lines · ${value(side).length.toLocaleString()} characters`;
}
function invalidateCheck() {
  clearTimeout(checkTimer);
  $('#folio-badge').textContent = 'Draft · proof not checked';
  status('Draft · checking translation', 'Changes have not been proof checked.', false);
}
function check(manual = false) {
  try {
    const decoded = fromSpell(value('spell'), key), exact = decoded === value('lean');
    const hasSource = value('lean').trim().length > 0;
    const verified = isCheckedSource(value('lean'), value('spell'), decoded, selected);
    $('#folio-badge').textContent = verified ? (presentationMode === 'magic' ? 'Original · checked' : 'Original · Lean checked') : 'Draft · proof not checked';
    const magic = presentationMode === 'magic';
    status(!hasSource ? 'The page awaits a spell' : !exact ? 'The translation needs attention' : verified ? (magic ? 'The original enchantment is checked' : 'This folio is Lean checked') : 'The translation holds · draft proof unchecked',
      !hasSource ? 'Write in a visible pane to begin.' : !exact ? (magic ? 'The spell does not return to its original form.' : 'The spell does not decode to the exact Lean text.') : verified ? (magic ? 'Original and recovered folio verified · every character returns' : 'mathlib v4.33.1 · original and decoded source compiled · exact round trip') : (magic ? 'The words return faithfully. Changes have not been proof checked.' : 'Round-trip check only. Run Lean locally to verify this edit.'), exact && hasSource);
    if (manual && exact && hasSource) {
      $('.workspace').classList.remove('cast'); void $('.workspace').offsetWidth; $('.workspace').classList.add('cast');
      const rect = $('#check').getBoundingClientRect(); sparkleAt(rect.left + rect.width / 2, rect.top, 24); shimmer($('#spell-editor'));
      announce('Round trip complete. Every character returns.');
    }
  } catch (error) { invalidateCheck(); status('Translation paused', message(error), false); }
}
function message(error: unknown) { return error instanceof Error ? error.message : 'Unable to translate this text.'; }
function translate(side: Side) {
  try {
    updating = true;
    const nextKey = new Key(key.data());
    const translated = side === 'lean' ? toSpell(value('lean'), nextKey) : fromSpell(value('spell'), nextKey);
    replace(side === 'lean' ? 'spell' : 'lean', translated);
    key = nextKey;
    counts(); clearTimeout(checkTimer); checkTimer = setTimeout(() => check(), 160);
  } catch (error) { invalidateCheck(); status('Translation paused', message(error), false); }
  finally { updating = false; }
}
function renderFolio() {
  renderTutorial($('#tutorial'), selected?.tutorial);
  if (!selected) {
    $('#folio-level').textContent = 'PERSONAL GRIMOIRE'; $('#folio-title').textContent = 'Your own incantation';
    $('#folio-subtitle').textContent = 'An imported draft'; $('#folio-summary').textContent = 'Keep the text and its key together when you save your work.';
    $('.mathematical-reading').hidden = true; $('.reading-notes').hidden = true; $<HTMLButtonElement>('#restore').disabled = true;
  } else {
    $('.mathematical-reading').hidden = false; $('.reading-notes').hidden = false; $<HTMLButtonElement>('#restore').disabled = false;
    const entry = selected;
    const school = schools.find(school => school.name === entry.school);
    const subschool = school?.subschools.find(subschool => subschool.id === entry.subschool);
    $('#folio-level').textContent = [entry.school, subschool?.subject, entry.level].filter(Boolean).join(' / ');
    const contents = document.querySelector<HTMLDetailsElement>(`[data-school="${entry.school}"]`);
    if (contents) contents.open = true;
    $('#folio-title').textContent = entry.title; $('#folio-subtitle').textContent = entry.subtitle;
    $('#folio-summary').textContent = entry.summary; $('#meaning').textContent = entry.meaning;
    $('#hypotheses').textContent = entry.hypotheses; $('#proof-idea').textContent = entry.proofIdea;
    $('#version').textContent = 'Lean + mathlib v4.33.1 · pinned source references';
    $('#prerequisites').replaceChildren();
    if (entry.prerequisites.length) {
      $('#prerequisites').append('Builds on: ');
      for (const id of entry.prerequisites) { const folio = folios.find(f => f.id === id)!; const link = document.createElement('button'); link.textContent = folio.title; link.addEventListener('click', () => selectFolio(id)); $('#prerequisites').append(link); }
    }
    for (const selector of ['#concepts', '#glossary']) {
      $(selector).replaceChildren();
      for (const pair of entry.glossary.filter(p => selector === '#glossary' || entry.concepts.includes(p.lean))) {
        const row = document.createElement('div'), arcane = document.createElement('strong'), original = document.createElement('code');
        arcane.textContent = pair.arcane; original.textContent = pair.lean; row.append(arcane, original); $(selector).append(row);
      }
    }
    $('#references').replaceChildren();
    for (const reference of entry.references) { const item = document.createElement('li'), link = document.createElement('a'); link.textContent = reference.symbol; link.href = reference.url; link.target = '_blank'; link.rel = 'noreferrer'; item.append(link); $('#references').append(item); }
    $('#source-downloads').replaceChildren();
    for (const [extension, label] of [['spell', 'Arcana source'], ['lean', 'Lean source'], ['json', 'Original bundle']]) { const link = document.createElement('a'); link.href = 'grimoire/' + entry.id + '.' + extension; link.download = entry.id + '.' + extension; link.textContent = label + ' ↓'; $('#source-downloads').append(link); }
  }
  $<HTMLButtonElement>('#personal-draft').disabled = !selected;
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-folio]')) {
    button.classList.toggle('active', button.dataset.folio === selected?.id);
    if (button.dataset.folio === selected?.id) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
  }
}
function saveCurrentDraft() {
  const draft = { lean: value('lean'), spell: value('spell'), key: key.data() };
  if (selected) drafts.set(selected.id, draft);
  else personalDraft = draft;
  $('#personal-draft').hidden = !personalDraft;
  $<HTMLButtonElement>('#personal-draft').disabled = !selected;
}
function selectFolio(id: string) {
  const next = folios.find(f => f.id === id); if (!next || next.id === selected?.id) return;
  saveCurrentDraft();
  selected = next; const draft = drafts.get(id);
  load(draft?.lean ?? next.lean, draft?.spell ?? next.spell, new Key(draft?.key ?? grimoireKey));
  history.replaceState(null, '', '#' + id); renderFolio(); foldAll(spell);
}
const lessonsSoFar = new Map<string, number>();
for (const folio of folios) {
  const button = document.createElement('button'); button.dataset.folio = folio.id;
  const number = document.createElement('span'), title = document.createElement('span');
  const index = (lessonsSoFar.get(folio.school) ?? 0) + 1; lessonsSoFar.set(folio.school, index);
  number.textContent = folio.school === 'Cantrips' ? '◇' : String(index).padStart(2, '0');
  title.textContent = folio.title; title.dataset.magical = '';
  const mathematicalTitle = document.createElement('span'); mathematicalTitle.textContent = folio.subtitle; mathematicalTitle.dataset.only = 'math';
  button.append(mathematicalTitle);
  button.prepend(number, title); button.addEventListener('click', () => selectFolio(folio.id));
  $(folio.school === 'Cantrips' ? '#cantrip-nav' : `#${folio.subschool}-nav`).append(button);
}
$('#personal-draft').addEventListener('click', () => {
  if (!personalDraft || !selected) return;
  saveCurrentDraft(); selected = undefined;
  load(personalDraft.lean, personalDraft.spell, new Key(personalDraft.key)); renderFolio();
  history.replaceState(null, '', location.pathname + location.search);
});
$('#restore').addEventListener('click', () => { if (!selected) return; drafts.delete(selected.id); load(selected.lean, selected.spell, new Key(grimoireKey)); foldAll(spell); announce('Original checked folio restored.'); });
function load(leanText: string, spellText: string, data: Key) {
  updating = true;
  try { key = data; replace('lean', leanText, true); replace('spell', spellText, true); }
  finally { updating = false; }
  clearTimeout(checkTimer); counts(); check();
}
function announce(text: string) {
  $('#toast').textContent = text; $('#toast').hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 3200);
}
$('#help').addEventListener('click', () => {
  $('#help-panel').hidden = !$('#help-panel').hidden;
  $('#help').setAttribute('aria-expanded', String(!$('#help-panel').hidden));
});
$('#check').addEventListener('click', () => check(true));
$('#veil').addEventListener('click', () => foldAll(spell));
$('#reveal').addEventListener('click', () => unfoldAll(spell));
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) button.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(value(button.dataset.copy as Side)); announce('Copied to your clipboard.'); }
  catch { announce('Clipboard unavailable. Select the text in the editor to copy it.'); }
});
$('#download').addEventListener('click', () => {
  const bundle = serializeDraft({ lean: value('lean'), spell: value('spell'), key: key.data() });
  const url = URL.createObjectURL(new Blob([bundle], { type: 'application/json' }));
  const link = document.createElement('a'); link.href = url; link.download = 'grimoire.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000); announce('Grimoire saved with both texts and the name key.');
});
$('#open').addEventListener('click', () => $<HTMLInputElement>('#file').click());
$('#file').addEventListener('change', async () => {
  const input = $<HTMLInputElement>('#file'), file = input.files?.[0]; if (!file) return;
  try {
    if (file.size > 1_000_000) throw new Error('Choose a file smaller than 1 MB.');
    const text = await file.text();
    let imported: Draft;
    if (file.name.endsWith('.json')) {
      imported = parseDraft(text);
    } else if (file.name.endsWith('.spell')) {
      const data = new Key(key.data()); const decoded = fromSpell(text, data);
      imported = { lean: decoded, spell: text, key: data.data() };
      announce('Spell opened with the current name key.');
    } else if (file.name.endsWith('.lean')) {
      const data = new Key(grimoireKey); const encoded = toSpell(text, data);
      imported = { lean: text, spell: encoded, key: data.data() };
    } else throw new Error('Choose a .lean, .spell, or grimoire .json file.');
    saveCurrentDraft(); selected = undefined; personalDraft = imported;
    load(imported.lean, imported.spell, new Key(imported.key)); renderFolio(); check();
    $('#personal-draft').hidden = false;
    history.replaceState(null, '', location.pathname + location.search);
  } catch (error) { announce(message(error)); }
  finally { input.value = ''; }
});
renderFolio(); counts(); check(); foldAll(spell);
function refreshComments() {
  const magicOnly = presentationMode === 'magic';
  for (const view of Object.values(editors)) setCommentsVisible(view, notesVisible && !magicOnly, !magicOnly);
  $('#toggle-notes').textContent = notesVisible ? 'Hide notes' : 'Show notes';
  $('#toggle-notes').setAttribute('aria-pressed', String(notesVisible));
}
$('#toggle-notes').addEventListener('click', () => { notesVisible = !notesVisible; refreshComments(); });
document.addEventListener('presentationchange', refreshComments);
createPresentationController({ root: app, controls: $('#presentation-controls'), onChange: mode => {
  presentationMode = mode;
  $('.editors').classList.toggle('single-pane', mode !== 'parallel');
  $('#check').firstChild!.textContent = mode === 'magic' ? 'Test the enchantment ' : 'Check round trip ';
  $('#download').textContent = mode === 'math' ? 'Save bundle ↓' : 'Save grimoire ↓';
  for (const editor of Object.values(editors)) editor.requestMeasure();
  check();
} });
