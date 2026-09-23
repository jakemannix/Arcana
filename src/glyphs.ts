import tables from './tables.json';

export type Abbreviations = Record<string, string>;

/** Backslash shortcuts in the style of Lean's editors: `\to` becomes →. */
export const LEAN_ABBREVIATIONS: Abbreviations = {
  to: '→', r: '→', l: '←', iff: '↔', mapsto: '↦', all: '∀', ex: '∃', fun: 'λ', and: '∧', or: '∨', not: '¬',
  ne: '≠', le: '≤', ge: '≥', in: '∈', notin: '∉', sub: '⊆', comp: '∘', x: '×', times: '×', cdot: '·', smul: '•',
  dvd: '∣', quot: '⧸', '-1': '⁻¹', inv: '⁻¹', '<': '⟨', '>': '⟩', bot: '⊥', top: '⊤', empty: '∅',
  N: 'ℕ', Z: 'ℤ', Q: 'ℚ', R: 'ℝ', C: 'ℂ', a: 'α', b: 'β', g: 'γ', s: 'σ', '|-': '⊢',
};

const syms: Abbreviations = { ...tables.syms, '.': '☿' };
const ascii = /^[\x21-\x7e]+$/;

/** Spell shortcuts: a backslash before any Lean symbol gives its spell glyph, plus a few named glyphs. */
export const SPELL_ABBREVIATIONS: Abbreviations = {
  ...Object.fromEntries(Object.entries(LEAN_ABBREVIATIONS).map(([abbr, glyph]) => [abbr, syms[glyph] ?? glyph])),
  ...Object.fromEntries(Object.entries(syms).filter(([lean]) => ascii.test(lean))),
  ...Object.fromEntries(Object.entries(tables.nums)),
  _: '▢', sp: '✨', dag: '†', merc: '☿', lang: '⦉', rang: '⦊', esc: '⟄',
  rune: 'ᛰ', ankh: '☥', moon: '🌒', othala: 'ᛟ',
};

export interface Expansion { from: number; insert: string }

/**
 * Decide how typing `typed` after the line text `before` expands a pending `\abbr`.
 * A whitespace key completes the longest match. Any other key expands at once when no
 * longer shortcut could still follow, or completes the shorter match that it ends.
 * `from` counts characters back from the cursor; `insert` replaces them and the typed key.
 */
export function expand(before: string, typed: string, table: Abbreviations): Expansion | null {
  const match = /\\([^\s\\]*)$/.exec(before);
  if (!match) return null;
  const abbr = match[1], known = (name: string) => Object.hasOwn(table, name);
  const longer = (name: string) => Object.keys(table).some(key => key.length > name.length && key.startsWith(name));
  const from = abbr.length + 1;
  if (/^\s$/.test(typed)) return known(abbr) ? { from, insert: table[abbr] + (typed === '\t' ? '' : typed) } : null;
  const candidate = abbr + typed;
  if (known(candidate) && !longer(candidate)) return { from, insert: table[candidate] };
  if (!known(candidate) && !longer(candidate) && known(abbr)) return { from, insert: table[abbr] + typed };
  return null;
}
