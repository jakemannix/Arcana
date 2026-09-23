import { type EditorState, type Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { codeFolding, foldService, unfoldEffect } from '@codemirror/language';
import { tokenize } from './translator';

const declaration = /^(?:(?:noncomputable|ineffable)\s+)?(?:theorem|lemma|def|abbrev|spell|charm|ritual|byname)\s/u;
const boundary = /^(?:(?:noncomputable|ineffable)\s+)?(?:theorem|lemma|def|abbrev|spell|charm|ritual|byname|namespace|sanctum|end|seal|variable|familiar|section|chamber|import|beckon)\b/u;

const codeCache = new WeakMap<EditorState, { syntax: string; content: string }>();
function codeOutsideLiterals(state: EditorState): { syntax: string; content: string } {
  const cached = codeCache.get(state);
  if (cached !== undefined) return cached;
  const tokens = tokenize(state.doc.toString());
  const syntax = tokens.map(token => {
    if (['comment', 'string', 'char'].includes(token.kind)) return token.text.replace(/[^\n]/g, ' ');
    if (token.kind === 'ident') return token.text.replace(/«[^»]*»/gu, text => text.replace(/[^\n]/g, ' '));
    return token.text;
  }).join('');
  const content = tokens.map(token => token.kind === 'comment' ? token.text.replace(/[^\n]/g, ' ') : token.text).join('');
  const code = { syntax, content };
  codeCache.set(state, code);
  return code;
}

/** Fold only the implementation, keeping comments before the next declaration independent. */
export function proofFoldRange(state: EditorState, lineStart: number): { from: number; to: number } | null {
  const start = state.doc.lineAt(lineStart), code = codeOutsideLiterals(state);
  if (!declaration.test(code.syntax.slice(start.from, start.to))) return null;
  let from = -1, to = start.to;
  const closers: Record<string, string> = { '(': ')', '[': ']', '{': '}', '⟨': '⟩',
    '⟪': '⟫', '⟮': '⟯', '⧼': '⧽', '⦉': '⦊', '⦃': '⦄' };
  const stack: string[] = [];
  for (let number = start.number; number <= state.doc.lines; number++) {
    const line = state.doc.line(number), text = code.syntax.slice(line.from, line.to);
    if (number > start.number && boundary.test(text)) break;
    if (from < 0) {
      for (let i = 0; i < text.length; i++) {
        const character = text[i];
        if (!stack.length && (text.startsWith(':=', i) || character === '⇰')) {
          from = line.from + i + (character === '⇰' ? 1 : 2); break;
        }
        if (closers[character]) stack.push(closers[character]);
        else if (character === stack.at(-1)) stack.pop();
      }
    }
    if (code.content.slice(line.from, line.to).trim()) to = line.to;
  }
  return from >= 0 && to > from ? { from, to } : null;
}

/** Short-lived geometric sparks. No continuous background animation. */
export function sparkleAt(x: number, y: number, count = 16): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const field = document.createElement('div'); field.className = 'spark-field'; field.setAttribute('aria-hidden', 'true');
  field.style.left = `${x}px`; field.style.top = `${y}px`;
  for (let i = 0; i < count; i++) {
    const spark = document.createElement('i'), angle = (i / count) * Math.PI * 2, reach = 25 + Math.random() * 65;
    spark.className = i % 3 === 0 ? 'magic-spark star-spark' : 'magic-spark';
    spark.style.setProperty('--dx', `${Math.cos(angle) * reach}px`); spark.style.setProperty('--dy', `${Math.sin(angle) * reach}px`);
    spark.style.setProperty('--delay', `${Math.random() * 90}ms`); spark.style.setProperty('--spin', `${Math.random() * 180}deg`);
    field.append(spark);
  }
  document.body.append(field); setTimeout(() => field.remove(), 1000);
}
export function shimmer(element: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  element.classList.remove('spell-revealing'); void element.offsetWidth; element.classList.add('spell-revealing');
  setTimeout(() => element.classList.remove('spell-revealing'), 850);
}
export function spellFolding(arcane: boolean): Extension {
  return [foldService.of((state, start) => proofFoldRange(state, start)), codeFolding({
    placeholderDOM: (_view, onclick) => {
      const button = document.createElement('button'); button.type = 'button';
      button.className = arcane ? 'spell-seal' : 'proof-seal';
      button.textContent = arcane ? '✧ reveal enchantment' : '… reveal proof';
      button.setAttribute('aria-label', arcane ? 'Reveal folded spell body' : 'Reveal folded Lean proof');
      button.addEventListener('click', onclick);
      return button;
    },
  }), ...(arcane ? [EditorView.updateListener.of(update => {
    for (const transaction of update.transactions) for (const effect of transaction.effects) {
      if (!effect.is(unfoldEffect)) continue;
      // Measure only after CodeMirror has applied the unfold transaction.
      update.view.requestMeasure({ read: view => view.coordsAtPos(Math.min(effect.value.from, view.state.doc.length)), write: rect => {
        if (rect) sparkleAt(Math.min(rect.left + 65, window.innerWidth - 30), rect.top + 10, 12);
        shimmer(update.view.dom);
      } });
      return;
    }
  })] : [])];
}
