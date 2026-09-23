import tables from './tables.json';

export type NameMap = Record<string, string>;
export interface KeyData { global: NameMap; scoped: Record<string, NameMap>; namespaces?: NameMap; auto?: string[] }
type Kind = 'ws' | 'comment' | 'string' | 'char' | 'num' | 'ident' | 'sym' | 'other' | 'esc';
export interface Token { kind: Kind; text: string }
const ESC = '⟄', NBSP = '\u00a0', SPARKLE = '✨';
export const NAMESPACE_SEPARATOR = '☿';
export const CARRIER_RUNES = ['ᛰ', '☥', '🌒', 'ᛟ', 'ᚨ', 'ᛒ', 'ᚷ', 'ᛞ', 'ᚱ', 'ᛋ', 'ᚠ', 'ᛗ', 'ᚫ', 'ᛖ', 'ᚹ', 'ᚾ', 'ᚢ', 'ᛉ'] as const;
export const RUNE_PATTERN = `(?:${CARRIER_RUNES.join('|')})`;
const runeSet = new Set<string>(CARRIER_RUNES);
const dictionary = (table: NameMap): NameMap => Object.assign(Object.create(null), table);
export const WORDS: NameMap = dictionary(tables.words);
const SYMS = dictionary({ ...tables.syms, '.': NAMESPACE_SEPARATOR }), NUMS = dictionary(tables.nums);
const inverse = (table: NameMap): NameMap => dictionary(Object.fromEntries(Object.entries(table).map(([k, v]) => [v, k])));
const INV_WORDS = inverse(WORDS), INV_SYMS = inverse(SYMS), INV_NUMS = dictionary({ ...inverse(NUMS), '▢': '_' });
const declarations = new Set(tables.declWords);
const component = String.raw`(?:«[^»]*»|[\p{L}\p{Nl}_][\p{L}\p{Nl}\p{N}\p{M}_'!?]*)`;
const word = String.raw`[\p{L}\p{Nl}_][\p{L}\p{Nl}\p{N}\p{M}_'!?]*`;
// Spell titles retain their framing sparkles; material components use jade✨cube.
const sparkled = `(?:${SPARKLE}(?:${word}${SPARKLE})+|${word}(?:${SPARKLE}${word})+)`;
const spellComponent = `(?:${sparkled}|${component.replace("_'!?", "_\u00a0'!?")}|${RUNE_PATTERN})`;
const ident = new RegExp(`^${component}(?:\\.${component})*`, 'u');
const spellIdent = new RegExp(`^${spellComponent}(?:[.${NAMESPACE_SEPARATOR}]${spellComponent})*`, 'u');
const simple = /^[\p{L}\p{Nl}_][\p{L}\p{Nl}\p{N}\p{M}_'!?]*(?: [\p{L}\p{Nl}_][\p{L}\p{Nl}\p{N}\p{M}_'!?]*)*$/u;
const legalName = new RegExp(`^(?:${RUNE_PATTERN}|${sparkled}|[\\p{L}\\p{Nl}_][\\p{L}\\p{Nl}\\p{N}\\p{M}_\\u00a0'!?]*)$`, 'u');
const glue = /^[\p{L}\p{Nl}\p{N}\p{M}_'!?\u00a0]/u;
const leanSymbols = [...new Set([...Object.keys(SYMS), ...tables.passSyms])].sort((a, b) => b.length - a.length);
const spellSymbols = [...new Set([...Object.keys(INV_SYMS), ...Object.keys(INV_NUMS), ...tables.passSyms])].sort((a, b) => b.length - a.length);

/** A lossless lexical pass; incomplete input is preserved while the user types. */
export function tokenize(source: string, spell = false): Token[] {
  const tokens: Token[] = [], symbols = spell ? spellSymbols : leanSymbols;
  let i = 0;
  const emit = (kind: Kind, length: number) => { tokens.push({ kind, text: source.slice(i, i + length) }); i += length; };
  while (i < source.length) {
    const rest = source.slice(i);
    let match: RegExpMatchArray | null;
    if ((match = /^[^\S\u00a0]+/u.exec(rest))) { emit('ws', match[0].length); continue; }
    if (rest.startsWith('--')) { const end = rest.indexOf('\n'); emit('comment', end < 0 ? rest.length : end); continue; }
    if (rest.startsWith('/-')) {
      let depth = 1, end = 2;
      while (end < rest.length && depth) {
        if (rest.startsWith('/-', end)) { depth++; end += 2; }
        else if (rest.startsWith('-/', end)) { depth--; end += 2; }
        else end++;
      }
      emit('comment', end); continue;
    }
    if ((match = /^r(#+)?"/.exec(rest))) {
      const close = '"' + (match[1] ?? ''), end = rest.indexOf(close, match[0].length);
      emit('string', end < 0 ? rest.length : end + close.length); continue;
    }
    if (rest.startsWith('"')) {
      let end = 1;
      while (end < rest.length) {
        if (rest[end] === '\\') end = Math.min(end + 2, rest.length);
        else if (rest[end++] === '"') break;
      }
      emit('string', end); continue;
    }
    if ((match = /^'(?:[^'\\]|\\(?:u\{[\da-fA-F]+\}|.))'/u.exec(rest))) { emit('char', match[0].length); continue; }
    if (rest.startsWith(ESC)) { const next = Array.from(rest.slice(1))[0] ?? ''; emit(spell ? 'esc' : 'other', spell ? 1 + next.length : 1); continue; }
    if ((match = /^(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/.exec(rest))) { emit('num', match[0].length); continue; }
    const symbol = symbols.find(s => rest.startsWith(s));
    if (symbol) { emit('sym', symbol.length); continue; }
    if ((match = (spell ? spellIdent : ident).exec(rest))) { emit('ident', match[0].length); continue; }
    emit('other', Array.from(rest)[0].length);
  }
  return tokens;
}

function components(name: string, spell = false): string[] {
  return name.match(spell ? /«[^»]*»|[^.☿]+/gu : /«[^»]*»|[^.]+/gu) ?? [];
}

export class Key {
  private global: NameMap;
  private scoped: Record<string, NameMap>;
  private used: Set<string>;
  private invGlobal: NameMap;
  private invScoped: Record<string, NameMap>;
  private namespaces: NameMap;
  private namespaceEntries: [string[], string[]][];
  private cursor = 0;
  private auto: string[];
  constructor(data: KeyData = { global: {}, scoped: {} }) {
    this.global = dictionary(data.global);
    this.scoped = Object.assign(Object.create(null), Object.fromEntries(Object.entries(data.scoped).map(([k, v]) => [k, dictionary(v)])));
    this.auto = [...(data.auto ?? [])];
    this.namespaces = dictionary(data.namespaces ?? {});
    const values = Object.values(this.global);
    if (new Set(values).size !== values.length) throw new Error('The key assigns the same spell word to multiple names.');
    if (values.some(v => !legalName.test(v) || Object.hasOwn(INV_WORDS, v))) throw new Error('The key contains an invalid or reserved spell word.');
    for (const [scope, map] of Object.entries(this.scoped)) {
      const scopedValues = Object.values(map);
      if (new Set(scopedValues).size !== scopedValues.length || scopedValues.some(v => !legalName.test(v) || values.includes(v) || Object.hasOwn(INV_WORDS, v))) throw new Error(`Invalid name mapping in ${scope}.`);
    }
    this.invGlobal = inverse(this.global);
    this.invScoped = Object.assign(Object.create(null), Object.fromEntries(Object.entries(this.scoped).map(([k, v]) => [k, inverse(v)])));
    this.namespaceEntries = Object.entries(this.namespaces).map(([lean, spell]) => {
      const source = components(lean), target = components(spell, true);
      if (source.length < 2 || source.join('.') !== lean || !source.every(c => new RegExp(`^${word}$`, 'u').test(c)) ||
          target.length < 2 || target.join(NAMESPACE_SEPARATOR) !== spell ||
          !target.every(c => legalName.test(c) && !Object.hasOwn(INV_WORDS, c))) {
        throw new Error(`Invalid namespace mapping: ${lean}.`);
      }
      return [source, target];
    });
    if (new Set(Object.values(this.namespaces)).size !== this.namespaceEntries.length) {
      throw new Error('The key assigns the same spell namespace to multiple namespaces.');
    }
    // A special path must not steal a path that already decodes to another Lean name.
    for (const [source, target] of this.namespaceEntries) {
      for (const scope of ['', ...Object.keys(this.scoped)]) {
        const decoded = target.map(c => this.invScoped[scope]?.[c] ?? this.invGlobal[c]);
        if (decoded.every(c => c !== undefined) && decoded.join('.') !== source.join('.')) {
          throw new Error(`Ambiguous namespace mapping: ${source.join('.')}.`);
        }
      }
    }
    this.used = new Set([...values, ...Object.values(WORDS), ...Object.values(this.scoped).flatMap(Object.values),
      ...this.namespaceEntries.flatMap(([, target]) => target)]);
  }
  private assign(name: string, image: string): string {
    this.global[name] = image; this.invGlobal[image] = name; this.used.add(image); return image;
  }
  /** Reserve all readable quoted names before automatic words can consume them. */
  reserveQuoted(tokens: Token[]): void {
    for (const token of tokens) if (token.kind === 'ident') for (const name of components(token.text)) {
      if (!name.startsWith('«') || Object.hasOwn(this.global, name)) continue;
      const inner = name.slice(1, -1), image = inner.replaceAll(' ', NBSP);
      if (simple.test(inner) && !this.used.has(image)) this.assign(name, image);
    }
  }
  word(name: string, scope: string, bare = true): string {
    if (name.startsWith('«')) {
      // Keep quotation where removing it would merge neighboring lexical tokens.
      if (!bare) return name;
      return this.global[name] ?? name;
    }
    const known = this.scoped[scope]?.[name] ?? this.global[name] ?? WORDS[name];
    if (known !== undefined) return known;
    while (this.cursor < tables.bases.length * tables.suffixes.length) {
      const n = this.cursor++, image = tables.bases[n % tables.bases.length] + tables.suffixes[Math.floor(n / tables.bases.length)];
      if (!this.used.has(image) && !Object.hasOwn(WORDS, image)) { this.auto.push(name); return this.assign(name, image); }
    }
    throw new Error('The spell lexicon is full. Start a new grimoire to use a fresh key.');
  }
  lean(word: string, scope: string): string {
    if (word.startsWith('«')) return word;
    return this.invScoped[scope]?.[word] ?? this.invGlobal[word] ?? INV_WORDS[word] ?? `«${word.replaceAll(NBSP, ' ')}»`;
  }
  name(parts: string[], scope: string, bare = true): string {
    const match = this.namespaceEntries.filter(([source]) => source.every((c, i) => parts[i] === c))
      .sort(([a], [b]) => b.length - a.length)[0];
    return [...(match?.[1] ?? []), ...parts.slice(match?.[0].length ?? 0).map(c => this.word(c, scope, bare))]
      .join(NAMESPACE_SEPARATOR);
  }
  leanName(parts: string[], scope: string): string[] {
    const match = this.namespaceEntries.filter(([, target]) => target.every((c, i) => parts[i] === c))
      .sort(([, a], [, b]) => b.length - a.length)[0];
    return [...(match?.[0] ?? []), ...parts.slice(match?.[1].length ?? 0).map(c => this.lean(c, scope))];
  }
  data(): KeyData {
    return { global: { ...this.global }, scoped: structuredClone(this.scoped),
      namespaces: { ...this.namespaces }, auto: [...this.auto] };
  }
}

export function toSpell(source: string, key: Key): string {
  const tokens = tokenize(source); key.reserveQuoted(tokens);
  let scope = '', pending = false, anon = 0;
  return tokens.map((token, i) => {
    const t = token.text;
    if (token.kind === 'num') return NUMS[t] ?? t;
    if (token.kind === 'ident') {
      if (t === '_') return '▢';
      const parts = components(t);
      if (declarations.has(parts[0]) && parts.length === 1) { pending = true; scope = `#${++anon}`; }
      else if (pending) { pending = false; if (!Object.hasOwn(WORDS, parts[0])) scope = parts[0]; }
      return key.name(parts, scope, !glue.test(tokens[i + 1]?.text ?? ''));
    }
    if (token.kind === 'sym') return SYMS[t] ?? t;
    if (token.kind === 'other' && (Object.hasOwn(INV_SYMS, t) || Object.hasOwn(INV_NUMS, t) || runeSet.has(t) || t === ESC || t === NBSP || t === SPARKLE)) return ESC + t;
    return t;
  }).join('');
}

export function fromSpell(source: string, key: Key): string {
  let scope = '', pending = false, anon = 0;
  return tokenize(source, true).map(({ kind, text: t }) => {
    if (kind === 'esc') return t.slice(1);
    if (kind === 'ident') {
      const parts = components(t, true);
      if (declarations.has(INV_WORDS[parts[0]]) && parts.length === 1) { pending = true; scope = `#${++anon}`; return INV_WORDS[t]; }
      let decoded = key.leanName(parts, scope);
      if (pending) { pending = false; if (!Object.hasOwn(WORDS, decoded[0])) { scope = decoded[0]; decoded = key.leanName(parts, scope); } }
      return decoded.join('.');
    }
    if (kind === 'sym') return INV_NUMS[t as keyof typeof INV_NUMS] ?? INV_SYMS[t] ?? t;
    return t;
  }).join('');
}
