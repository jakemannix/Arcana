import { StateEffect, StateField, type EditorState, type Extension } from '@codemirror/state';
import { Decoration, EditorView, WidgetType, type DecorationSet } from '@codemirror/view';
import { tokenize } from './translator';

export interface CommentRange { from: number; to: number; block: boolean }

/** The translator's lexer keeps comment-like text inside literals untouched. */
export function commentRanges(state: EditorState): CommentRange[] {
  const ranges: CommentRange[] = [];
  let position = 0;
  for (const token of tokenize(state.doc.toString())) {
    const from = position, to = position += token.text.length;
    if (token.kind !== 'comment') continue;
    const first = state.doc.lineAt(from), last = state.doc.lineAt(to);
    const block = !state.sliceDoc(first.from, from).trim() && !state.sliceDoc(to, last.to).trim();
    ranges.push({ from: block ? first.from : from,
      to: block && last.number < state.doc.lines ? last.to + 1 : to, block });
  }
  return ranges;
}

export const commentVisibility = StateEffect.define<{ visible: boolean; allowReveal: boolean }>();
const revealComment = StateEffect.define<number>();

class HiddenComment extends WidgetType {
  constructor(readonly from: number) { super(); }
  eq(other: HiddenComment) { return this.from === other.from; }
  toDOM(view: EditorView) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'comment-seal'; button.textContent = '✧ read note';
    button.setAttribute('aria-label', 'Reveal this shared tutorial comment');
    button.addEventListener('click', () => view.dispatch({ effects: revealComment.of(this.from) }));
    return button;
  }
  ignoreEvent() { return true; }
}

interface CommentDisplay {
  visible: boolean;
  allowReveal: boolean;
  revealed: number[];
  decorations: DecorationSet;
}
function decorate(state: EditorState, display: Omit<CommentDisplay, 'decorations'>): CommentDisplay {
  return { ...display, decorations: display.visible ? Decoration.none : Decoration.set(
    commentRanges(state).filter(range => !display.revealed.includes(range.from)).map(range =>
      Decoration.replace({ block: range.block,
        widget: display.allowReveal ? new HiddenComment(range.from) : undefined,
      }).range(range.from, range.to)), true) };
}

export const commentDisplay = StateField.define<CommentDisplay>({
  create: state => decorate(state, { visible: true, allowReveal: true, revealed: [] }),
  update(display, transaction) {
    let next = { visible: display.visible, allowReveal: display.allowReveal,
      revealed: transaction.docChanged ? [] : display.revealed };
    let changed = transaction.docChanged;
    for (const effect of transaction.effects) {
      if (effect.is(commentVisibility)) { next = { ...effect.value, revealed: [] }; changed = true; }
      if (effect.is(revealComment) && next.allowReveal) {
        next = { ...next, revealed: [...next.revealed, effect.value] }; changed = true;
      }
    }
    return changed ? decorate(transaction.state, next) : display;
  },
  provide: field => [EditorView.decorations.from(field, display => display.decorations),
    EditorView.atomicRanges.of(view => view.state.field(field).decorations)],
});

export function tutorialComments(visible = true, allowReveal = true): Extension {
  return [commentDisplay.init(state => decorate(state, { visible, allowReveal, revealed: [] })),
    EditorView.baseTheme({
      '.comment-seal': { font: 'inherit', fontSize: '12px', color: '#b1bba9', background: '#a4b5910d',
        border: '1px dashed #a4b59145', borderRadius: '4px', padding: '2px 9px', cursor: 'pointer' },
      '.comment-seal:focus-visible': { outline: '2px solid #e0bd7d', outlineOffset: '2px' },
    })];
}

export function setCommentsVisible(view: EditorView, visible: boolean, allowReveal = true): void {
  view.dispatch({ effects: commentVisibility.of({ visible, allowReveal }) });
}
