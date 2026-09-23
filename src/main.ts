import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState, Prec } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import { StreamLanguage, HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { Key, WORDS, RUNE_PATTERN, fromSpell, toSpell, type KeyData } from './translator';
import { folios, grimoireKey, isCheckedSource, provenance, type Folio } from './catalog';
import { foldAll, unfoldAll } from '@codemirror/language';
import { spellFolding, sparkleAt, shimmer } from './magic';
import { expand, LEAN_ABBREVIATIONS, SPELL_ABBREVIATIONS } from './glyphs';
import './style.css';

type Side = 'lean' | 'spell';
const initialFolio = folios.find(f => f.id === location.hash.slice(1)) ?? folios.find(f => f.id === 'first-isomorphism')!;
let selected: Folio | undefined = initialFolio;
let key = new Key(grimoireKey), updating = false;
const drafts = new Map<string, { lean: string; spell: string; key: KeyData }>();
let checkTimer: ReturnType<typeof setTimeout>;
let toastTimer: ReturnType<typeof setTimeout>;

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <header class="masthead">
    <a class="brand" href="./"><span class="brand-mark" aria-hidden="true">⟐</span><span><b>ARCANA</b></span></a>
    <span class="edition">THE GRADUATE GRIMOIRE <span>VOL. I</span></span>
    <button id="help" class="quiet-button" aria-expanded="false" aria-controls="help-panel">How to read this <span aria-hidden="true">?</span></button>
  </header>
  <main class="grimoire-layout">
    <aside class="contents" aria-label="Grimoire contents">
      <p class="eyebrow">THE COMMON ARTS</p>
      <nav id="cantrip-nav" aria-label="Shared cantrips"></nav>
      <div class="school-heading"><span aria-hidden="true">⟐</span><div><p class="eyebrow">SCHOOL OF</p><h1>Enchantment</h1></div></div>
      <p class="school-description">Groups, pacts, and the structure that survives a transformation.</p>
      <nav id="chapter-nav" aria-label="Enchantment lessons"></nav>
      <div class="contents-foot"><strong>Real mathematics. Written in Arcana.</strong><p>${folios.filter(f => f.school !== 'Cantrips').length} lessons · 1 shared foundation<br>${provenance.verification.declarationCount} checked declarations</p><a href="grimoire/axioms.txt" target="_blank" rel="noreferrer">Inspect the proof audit ↗</a></div>
    </aside>
    <div class="reading-desk">
      <section class="folio-introduction"><p class="eyebrow" id="folio-level"></p><h2 id="folio-title"></h2><p class="folio-subtitle" id="folio-subtitle"></p><p class="lede" id="folio-summary"></p></section>
      <section id="help-panel" class="help-panel" hidden>
        <h2>Two languages, one theorem</h2>
        <p>The left pane is Arcana: mathematical names and syntax translated into a consistent spell vocabulary. The right pane is the exact Lean source. Edit either pane to translate in both directions.</p>
        <p>Spell ingredients such as <code>jade✨cube</code> and <code>silver✨bell</code> are variables: the math pane calls them <code>x</code> and <code>y</code>. Their types and hypotheses say what they can do. Spell names and schools also have mathematical names on the right; the saved name key keeps the correspondence.</p>
        <p><strong>Carriers and their laws:</strong> runes such as <code>ᛰ</code>, <code>☥</code>, and <code>🌒</code> name the types inhabited by ingredients. A <strong>Veyr</strong> is a group; a <strong>Veyrath</strong> is a ring, whose addition forms a commutative group. A <strong>Veyrion</strong> is a field. <strong>Bound Veyr</strong> names a module, and <strong>Bound Veyrath</strong> names an algebra: “Bound” marks a scalar action, with both carriers written explicitly. “Harmonic” marks commutativity; “Chanted” distinguishes additive group notation. The Lean pane states the exact laws and hypotheses.</p>
        <p><strong>Typing carrier runes:</strong> <code>\\rune</code> gives ᛰ, <code>\\ankh</code> gives ☥, <code>\\moon</code> gives 🌒, and <code>\\othala</code> gives ᛟ. The full translation key below each folio pairs runes with their mathematical names.</p>
        <p>Every original folio was compiled against mathlib, translated, decoded, and compiled again. The proof audit rejects placeholders. Standard Lean axioms such as classical choice may occur. <strong>Your edits are drafts:</strong> the browser checks translation fidelity, but does not run Lean.</p>
        <p><strong>Typing glyphs:</strong> type a backslash and a short name, then a space or Tab. In the spell pane, <code>\\sp</code> gives ✨, <code>\\dag</code> gives †, and <code>\\merc</code> gives ☿. A backslash before any Lean symbol gives its spell glyph: <code>\\:</code> gives ⟡, <code>\\(</code> gives ⟪, <code>\\:=</code> gives ⇰, <code>\\0</code> gives ⊘, and <code>\\1</code> gives ☉. The Lean pane uses Lean's own shortcuts, such as <code>\\to</code> for → and <code>\\-1</code> for ⁻¹.</p>
        <p>Switching lessons keeps your drafts in this tab. Download to keep a copy with its name key; reloading the page loses unsaved drafts. Press Escape then Tab to leave an editor using the keyboard.</p>
      </section>
      <section class="mathematical-reading" aria-label="Mathematical meaning"><p class="eyebrow">BEHIND THE ENCHANTMENT</p><p id="meaning"></p><details><summary>Hypotheses & proof idea</summary><h3>What must be true</h3><p id="hypotheses"></p><h3>Why it works</h3><p id="proof-idea"></p></details><div id="prerequisites" class="prerequisites"></div></section>
      <section class="workspace" aria-label="Spell translation workspace">
        <div class="workspace-toolbar"><span id="folio-badge" class="folio-badge">Original folio</span><div class="toolbar-actions"><button id="restore" class="quiet-button">Restore original</button><button id="open" class="quiet-button">Open file</button><button id="download" class="quiet-button">Save grimoire ↓</button><input id="file" type="file" accept=".lean,.spell,.json" hidden /></div></div>
        <div class="pane-visibility" role="group" aria-label="Visible editor panes"><button id="toggle-spell" class="quiet-button" aria-controls="spell-pane" aria-expanded="true">Hide magic</button><button id="toggle-lean" class="quiet-button" aria-controls="lean-pane" aria-expanded="true">Hide math</button></div>
        <p id="panes-hidden" class="panes-hidden" hidden>Both panes are hidden. Show magic or math to return to your work.</p>
        <div class="editors">
          <section id="spell-pane" class="editor-pane spell-pane" aria-label="Arcana"><header class="pane-header"><div><span class="pane-index">01</span><h2>Arcana</h2><span class="language-label">.spell</span></div><div class="spell-actions"><button id="veil" class="copy-button" title="Fold all spell bodies">Veil</button><button id="reveal" class="copy-button" title="Reveal all spell bodies">Reveal</button><button class="copy-button" data-copy="spell" aria-label="Copy Arcana">Copy</button></div></header><div id="spell-editor" class="editor-host"></div><footer class="pane-footer"><span id="spell-count"></span><span>THE INCANTATION</span></footer></section>
          <section id="lean-pane" class="editor-pane lean-pane" aria-label="Lean source"><header class="pane-header"><div><span class="pane-index">02</span><h2>Lean + mathlib</h2><span class="language-label">.lean</span></div><button class="copy-button" data-copy="lean" aria-label="Copy Lean source">Copy</button></header><div id="lean-editor" class="editor-host"></div><footer class="pane-footer"><span id="lean-count"></span><span>THE MATHEMATICS</span></footer></section>
        </div>
        <div class="validation-bar"><div class="validation-copy"><span id="status-icon" aria-hidden="true">◇</span><div><strong id="status" role="status" aria-live="polite"></strong><span id="status-detail"></span></div></div><button id="check" class="cast-button">Check round trip <span aria-hidden="true">⟐</span></button></div>
      </section>
      <section class="reading-notes"><div><p class="eyebrow">WORDS OF POWER</p><p class="section-hint">The vocabulary used in this folio.</p><div id="concepts" class="concept-pairs"></div><details class="full-glossary"><summary>Full translation key for this folio</summary><div id="glossary"></div></details></div><div><p class="eyebrow">FROM THE GRAND ARCHIVE</p><p class="section-hint" id="version"></p><ul id="references"></ul><div class="source-downloads" id="source-downloads"></div></div></section>
    </div>
  </main>
  <footer class="page-footer"><span>PRECISE WORDS. CURIOUS MAGIC.</span><span>One school, a shared foundation, room to grow.</span></footer>
  <div id="toast" class="toast" role="status" hidden></div>
`;

const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;

const runePattern = new RegExp(RUNE_PATTERN, 'u');
const language = (side: Side) => StreamLanguage.define<{ depth: number }>({
  startState: () => ({ depth: 0 }),
  token(stream, state) {
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
    if (stream.match(/\d+|[⊘☉]/)) return 'number';
    if (side === 'spell' && stream.match(runePattern)) return 'variableName';
    if (stream.match(/(?:✨(?:[\p{L}_][\p{L}\p{N}\p{M}_'!?]*✨)+|[\p{L}_][\p{L}\p{N}\p{M}_'!?]*(?:✨[\p{L}_][\p{L}\p{N}\p{M}_'!?]*)+)/u)) return 'atom';
    const word = stream.match(/[\p{L}_][\p{L}\p{N}\p{M}_\u00a0'!?]*/u);
    if (word) {
      const text = (word as RegExpMatchArray)[0];
      if (side === 'lean' ? Object.hasOwn(WORDS, text) : Object.values(WORDS).includes(text)) return 'keyword';
      return 'variableName';
    }
    stream.next(); return 'operator';
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
  return EditorState.create({ doc, extensions: [spellFolding(side === 'spell'), basicSetup, glyphShortcuts(side), keymap.of([indentWithTab]), language(side), syntaxHighlighting(highlight), editorTheme,
      EditorView.contentAttributes.of({ 'aria-label': side === 'lean' ? 'Edit Lean source' : 'Edit spell text', spellcheck: 'false' }),
      EditorView.updateListener.of(update => { if (update.docChanged && !updating) translate(side); }),
    ] });
}
function makeEditor(side: Side, doc: string): EditorView {
  return new EditorView({ parent: $(`#${side}-editor`), state: editorState(side, doc) });
}
const lean = makeEditor('lean', initialFolio.lean);
const spell = makeEditor('spell', initialFolio.spell);
const editors = { lean, spell };
for (const side of ['spell', 'lean'] as const) {
  const button = $<HTMLButtonElement>(`#toggle-${side}`);
  button.addEventListener('click', () => {
    const pane = $(`#${side}-pane`);
    pane.hidden = !pane.hidden;
    button.textContent = `${pane.hidden ? 'Show' : 'Hide'} ${side === 'spell' ? 'magic' : 'math'}`;
    button.setAttribute('aria-expanded', String(!pane.hidden));
    const visibleCount = Number(!$('#spell-pane').hidden) + Number(!$('#lean-pane').hidden);
    $('.editors').classList.toggle('single-pane', visibleCount === 1);
    $('#panes-hidden').hidden = visibleCount > 0;
    // Keep both editors alive so drafts, folds, undo, and translation survive hiding.
    for (const editor of Object.values(editors)) editor.requestMeasure();
  });
}

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
function check(manual = false) {
  try {
    const decoded = fromSpell(value('spell'), key), exact = decoded === value('lean');
    const hasSource = value('lean').trim().length > 0;
    const verified = isCheckedSource(value('lean'), value('spell'), decoded, selected);
    $('#folio-badge').textContent = verified ? 'Original · Lean checked' : 'Draft · proof not checked';
    status(!hasSource ? 'The page awaits a spell' : !exact ? 'The translation needs attention' : verified ? 'This folio is Lean checked' : 'The translation holds · draft proof unchecked',
      !hasSource ? 'Write in either pane to begin.' : !exact ? 'The spell does not decode to the exact Lean text.' : verified ? 'mathlib v4.33.1 · original and decoded source compiled · exact round trip' : 'Round-trip check only. Run Lean locally to verify this edit.', exact && hasSource);
    if (manual && exact && hasSource) {
      $('.workspace').classList.remove('cast'); void $('.workspace').offsetWidth; $('.workspace').classList.add('cast');
      const rect = $('#check').getBoundingClientRect(); sparkleAt(rect.left + rect.width / 2, rect.top, 24); shimmer($('#spell-editor'));
      announce('Round trip complete. Every character returns.');
    }
  } catch (error) { status('Translation paused', message(error), false); }
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
  } catch (error) { status('Translation paused', message(error), false); }
  finally { updating = false; }
}
function renderFolio() {
  if (!selected) {
    $('#folio-level').textContent = 'PERSONAL GRIMOIRE'; $('#folio-title').textContent = 'Your own incantation';
    $('#folio-subtitle').textContent = 'An imported draft'; $('#folio-summary').textContent = 'Keep the text and its key together when you save your work.';
    $('.mathematical-reading').hidden = true; $('.reading-notes').hidden = true; $<HTMLButtonElement>('#restore').disabled = true;
  } else {
    $('.mathematical-reading').hidden = false; $('.reading-notes').hidden = false; $<HTMLButtonElement>('#restore').disabled = false;
    const entry = selected;
    $('#folio-level').textContent = entry.school + ' / ' + entry.level;
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
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-folio]')) {
    button.classList.toggle('active', button.dataset.folio === selected?.id);
    if (button.dataset.folio === selected?.id) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
  }
}
function selectFolio(id: string) {
  const next = folios.find(f => f.id === id); if (!next || next.id === selected?.id) return;
  if (selected) drafts.set(selected.id, { lean: value('lean'), spell: value('spell'), key: key.data() });
  selected = next; const draft = drafts.get(id);
  load(draft?.lean ?? next.lean, draft?.spell ?? next.spell, new Key(draft?.key ?? grimoireKey));
  history.replaceState(null, '', '#' + id); renderFolio(); foldAll(spell);
}
for (const [index, folio] of folios.entries()) {
  const button = document.createElement('button'); button.dataset.folio = folio.id;
  const number = document.createElement('span'), title = document.createElement('span');
  number.textContent = index ? String(index).padStart(2, '0') : '◇'; title.textContent = folio.title;
  button.append(number, title); button.addEventListener('click', () => selectFolio(folio.id));
  $(folio.school === 'Cantrips' ? '#cantrip-nav' : '#chapter-nav').append(button);
}
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
  const bundle = { format: 'lean-magic/v1', lean: value('lean'), spell: value('spell'), key: key.data() };
  const url = URL.createObjectURL(new Blob([JSON.stringify(bundle, null, 2) + '\n'], { type: 'application/json' }));
  const link = document.createElement('a'); link.href = url; link.download = 'grimoire.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000); announce('Grimoire saved with both texts and the name key.');
});
$('#open').addEventListener('click', () => $<HTMLInputElement>('#file').click());
$('#file').addEventListener('change', async () => {
  const input = $<HTMLInputElement>('#file'), file = input.files?.[0]; if (!file) return;
  try {
    if (file.size > 1_000_000) throw new Error('Choose a file smaller than 1 MB.');
    const text = await file.text();
    if (file.name.endsWith('.json')) {
      const bundle = JSON.parse(text) as { format: string; lean: string; spell: string; key: KeyData };
      if (bundle.format !== 'lean-magic/v1' || typeof bundle.lean !== 'string' || typeof bundle.spell !== 'string' || !bundle.key?.global || !bundle.key?.scoped) throw new Error('Choose a grimoire JSON downloaded from this editor.');
      const data = new Key(bundle.key);
      if (fromSpell(bundle.spell, data) !== bundle.lean) throw new Error('This grimoire’s text and name key do not match.');
      load(bundle.lean, bundle.spell, data);
    } else if (file.name.endsWith('.spell')) {
      const data = new Key(key.data()); load(fromSpell(text, data), text, data);
      announce('Spell opened with the current name key.');
    } else if (file.name.endsWith('.lean')) {
      const data = new Key(grimoireKey); load(text, toSpell(text, data), data);
    } else throw new Error('Choose a .lean, .spell, or grimoire .json file.');
    selected = undefined; renderFolio(); check();
  } catch (error) { announce(message(error)); }
  finally { input.value = ''; }
});
renderFolio(); counts(); check(); foldAll(spell);
