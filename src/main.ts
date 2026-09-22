import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { indentWithTab } from '@codemirror/commands';
import { StreamLanguage, HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { Key, WORDS, fromSpell, toSpell, type KeyData } from './translator';
import initialKey from './grimoire.key.json';
import schools from './Schools.lean?raw';
import './style.css';

type Side = 'lean' | 'spell';
const schoolInfo: Record<string, { name: string; description: string }> = {
  Divination: { name: 'Detect Thoughts', description: 'Every natural number reveals its parity.' },
  Abjuration: { name: 'Shield', description: 'Distinct numbers must stand on opposite sides.' },
  Conjuration: { name: 'Plane Shift', description: 'Compose three journeys. Their grouping changes nothing.' },
  Enchantment: { name: 'Command', description: 'Two opposing bounds compel equality.' },
  Evocation: { name: 'Scorching Ray', description: 'An inductive spark grows into an exponential flame.' },
  Necromancy: { name: 'Speak with Dead', description: 'Summon a witness from an existential proof.' },
  Transmutation: { name: 'Alter Self', description: 'Three turns restore a triple to its original form.' },
};
const examples = Object.fromEntries(Object.keys(schoolInfo).map(school => [school,
  schools.match(new RegExp(`namespace ${school}\\n[\\s\\S]*?end ${school}`))![0] + '\n',
]));
let key = new Key(initialKey), activeSchool = 'Divination', updating = false;
let checkTimer: ReturnType<typeof setTimeout>;
let toastTimer: ReturnType<typeof setTimeout>;

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <header class="masthead">
    <a class="brand" href="./" aria-label="Lean Magic home"><span class="brand-mark" aria-hidden="true">⟐</span><span>LEAN <b>MAGIC</b></span></a>
    <span class="edition">AN INTERACTIVE GRIMOIRE <span>VOL. I</span></span>
    <button id="help" class="quiet-button" aria-expanded="false" aria-controls="help-panel">How it works <span aria-hidden="true">?</span></button>
  </header>
  <main>
    <section class="introduction">
      <div><p class="eyebrow">THE SCRIBE’S DESK</p><h1>Every proof is a spell.</h1><p class="lede">Write in either language. Watch the other take shape.</p></div>
      <div class="chapter-number" aria-hidden="true">⟒<span>LOGIC INTO LORE</span></div>
    </section>
    <section id="help-panel" class="help-panel" hidden>
      <h2>A little formal magic</h2>
      <p>Both panes are editable. Lean keywords, symbols, and names translate into a shared spell vocabulary. Comments and strings stay intact. Unknown spell names become quoted Lean names.</p>
      <p><strong>Check round trip</strong> checks that the spell decodes to the exact Lean text. It does not check that a theorem is true or a proof compiles. This editor has no Lean compiler attached.</p>
      <p>Download a grimoire to keep both texts and their name key together. You can reopen that file here. Work stays in this tab until you download it. Press Escape, then Tab to move keyboard focus out of an editor.</p>
    </section>
    <section class="workspace" aria-label="Spell translation workspace">
      <div class="workspace-toolbar">
        <div class="chapter-select"><label for="school">OPEN GRIMOIRE</label><select id="school">${Object.entries(schoolInfo).map(([school, info]) => `<option value="${school}">${school} · ${info.name}</option>`).join('')}<option value="All">All schools</option></select></div>
        <div class="toolbar-actions"><button id="open" class="quiet-button">Open file</button><button id="download" class="quiet-button">Download grimoire <span aria-hidden="true">↓</span></button><input id="file" type="file" accept=".lean,.spell,.json" hidden /></div>
      </div>
      <div class="editors">
        <section class="editor-pane lean-pane" aria-label="Lean source">
          <header class="pane-header"><div><span class="pane-index">01</span><h2>Lean source</h2><span class="language-label">.lean</span></div><button class="copy-button" data-copy="lean" aria-label="Copy Lean source">Copy</button></header>
          <div id="lean-editor" class="editor-host"></div>
          <footer class="pane-footer"><span id="lean-count"></span><span>THE PROOF</span></footer>
        </section>
        <section class="editor-pane spell-pane" aria-label="Spell text">
          <header class="pane-header"><div><span class="pane-index">02</span><h2>Spell text</h2><span class="language-label">.spell</span></div><button class="copy-button" data-copy="spell" aria-label="Copy spell text">Copy</button></header>
          <div id="spell-editor" class="editor-host"></div>
          <footer class="pane-footer"><span id="spell-count"></span><span>THE INCANTATION</span></footer>
        </section>
      </div>
      <div class="validation-bar"><div class="validation-copy"><span id="status-icon" aria-hidden="true">◇</span><div><strong id="status" role="status" aria-live="polite">Preparing the grimoire…</strong><span id="status-detail">Translation check only · Lean proof not checked</span></div></div><button id="check" class="cast-button">Check round trip <span aria-hidden="true">⟐</span></button></div>
    </section>
    <section class="below-desk">
      <div class="field-note"><p class="eyebrow">MARGIN NOTES / <span id="school-label"></span></p><h2 id="example-name"></h2><p id="example-description"></p></div>
      <div class="lexicon"><p class="eyebrow">A FEW WORDS OF POWER</p><div class="word-pairs"><div><code>theorem</code><span>↝</span><strong>spell</strong></div><div><code>by omega</code><span>↝</span><strong>cast oracle</strong></div><div><code>rfl</code><span>↝</span><strong>mirror</strong></div><div><code>sorry</code><span>↝</span><strong>fizzle</strong></div></div></div>
    </section>
  </main>
  <footer class="page-footer"><span>PRECISE WORDS. CURIOUS MAGIC.</span><span>Lean 4 ↔ Spellcast <span class="footer-diamond">◇</span> Runs in your browser</span></footer>
  <div id="toast" class="toast" role="status" hidden></div>
`;

const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
$('#school').setAttribute('value', activeSchool);
$<HTMLSelectElement>('#school').value = activeSchool;

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

function editorState(side: Side, doc: string): EditorState {
  return EditorState.create({ doc, extensions: [basicSetup, keymap.of([indentWithTab]), language(side), syntaxHighlighting(highlight), editorTheme,
      EditorView.contentAttributes.of({ 'aria-label': side === 'lean' ? 'Edit Lean source' : 'Edit spell text', spellcheck: 'false' }),
      EditorView.updateListener.of(update => { if (update.docChanged && !updating) translate(side); }),
    ] });
}
function makeEditor(side: Side, doc: string): EditorView {
  return new EditorView({ parent: $(`#${side}-editor`), state: editorState(side, doc) });
}
const lean = makeEditor('lean', examples[activeSchool]);
const spell = makeEditor('spell', toSpell(examples[activeSchool], key));
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
function check(manual = false) {
  try {
    const decoded = fromSpell(value('spell'), key), exact = decoded === value('lean');
    const hasSource = value('lean').trim().length > 0;
    status(!hasSource ? 'The page awaits a spell' : exact ? 'The translation holds' : 'The translation needs attention',
      !hasSource ? 'Write in either pane to begin.' : exact ? 'Exact round trip · Lean proof not checked' : 'The spell does not decode to the exact Lean text. Undo your edit or load an example.', exact && hasSource);
    if (manual && exact && hasSource) {
      $('.workspace').classList.remove('cast'); void $('.workspace').offsetWidth; $('.workspace').classList.add('cast');
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
function note(school: string) {
  const info = schoolInfo[school];
  $('#school-label').textContent = school.toUpperCase();
  $('#example-name').textContent = info?.name ?? (school === 'All' ? 'The collected schools' : 'Your own incantation');
  $('#example-description').textContent = info?.description ?? (school === 'All' ? 'Seven schools, nine spells, one language of proof.' : 'Keep the text and its key together when you save your work.');
}
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
$('#school').addEventListener('change', () => {
  activeSchool = $<HTMLSelectElement>('#school').value;
  const source = activeSchool === 'All' ? schools : examples[activeSchool];
  const data = new Key(initialKey); load(source, toSpell(source, data), data); note(activeSchool);
});
$('#help').addEventListener('click', () => {
  $('#help-panel').hidden = !$('#help-panel').hidden;
  $('#help').setAttribute('aria-expanded', String(!$('#help-panel').hidden));
});
$('#check').addEventListener('click', () => check(true));
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
      const data = new Key(initialKey); load(text, toSpell(text, data), data);
    } else throw new Error('Choose a .lean, .spell, or grimoire .json file.');
    $<HTMLSelectElement>('#school').selectedIndex = -1; note('Personal grimoire');
  } catch (error) { announce(message(error)); }
  finally { input.value = ''; }
});
note(activeSchool); counts(); check();
