/**
 * Machine interface to the Arcana translator for tools and agents.
 *
 *   arcana-cli lookup    {"identifiers": ["Function.Bijective", ...]}
 *   arcana-cli names     {"names": {"lean_component": "✨Spell✨Name✨", ...}}
 *   arcana-cli translate {"lean": "...", "names": {...}}
 *
 * Reads one JSON object on stdin and writes one JSON object on stdout. Every
 * command starts from the verified grimoire key and never modifies it: a
 * caller's names apply only to that call, and `translate` reports them with
 * any automatic names as `additions` so a draft can carry its own key.
 */
import { readFileSync } from 'node:fs';
import { grimoireKey } from '../src/catalog';
import { nameLengthProblem } from '../src/naming';
import { fromSpell, Key, type KeyData, type NameMap, toSpell } from '../src/translator';

const MAX_INPUT_BYTES = 256 * 1024;
const DECLARATION = /\b(?:theorem|lemma|def|abbrev|instance|structure|class|inductive)\s+([^\s:({[⦃]+)/gu;

interface NameProblem { lean: string; spell: string; problem: string }

const base = (): KeyData => structuredClone(grimoireKey as KeyData);

/** Names declared by the source, by their last component. */
function declaredNames(lean: string): Set<string> {
  return new Set([...lean.matchAll(DECLARATION)].map(match => match[1].split('.').at(-1)!));
}

function styleProblem(spell: string, declaration: boolean): string | undefined {
  if (!declaration) return undefined;
  const words = spell.split('✨').filter(Boolean);
  if (words.length > 1 && !(spell.startsWith('✨') && spell.endsWith('✨'))) {
    return 'multi-word spell names are framed with sparkles, as in ✨Faithful✨Weaving✨';
  }
  if (!/^\p{Lu}/u.test(words[0] ?? '')) return 'spell and ritual names begin with a capital letter';
  return undefined;
}

/** Validate proposed names against the grimoire key and each other. */
export function checkNames(names: NameMap, declarations = new Set<string>()): { accepted: NameMap; problems: NameProblem[] } {
  const data = base();
  const owners = new Map(Object.entries(data.global).map(([lean, spell]) => [spell, lean]));
  const accepted: NameMap = {};
  const problems: NameProblem[] = [];
  for (const [lean, spell] of Object.entries(names)) {
    const reject = (problem: string) => problems.push({ lean, spell, problem });
    if (typeof spell !== 'string' || !spell || !lean || lean.includes('.')) {
      reject('name one Lean identifier component (no dots) and a nonempty spell name');
      continue;
    }
    if (Object.hasOwn(data.global, lean)) {
      if (data.global[lean] !== spell) reject(`the grimoire already names ${lean} ${data.global[lean]}`);
      continue;
    }
    const owner = owners.get(spell) ?? Object.keys(accepted).find(name => accepted[name] === spell);
    if (owner !== undefined) { reject(`${spell} already names ${owner}`); continue; }
    const length = nameLengthProblem(spell);
    if (length) { reject(length); continue; }
    const style = styleProblem(spell, declarations.has(lean));
    if (style) { reject(style); continue; }
    try {
      new Key({ ...data, global: { ...data.global, ...accepted, [lean]: spell } });
      accepted[lean] = spell;
    } catch (error) {
      reject(error instanceof Error ? error.message : String(error));
    }
  }
  return { accepted, problems };
}

export function lookup(identifiers: string[]) {
  return identifiers.map(lean => {
    const key = new Key(base());
    const spell = key.name(lean.split('.'), '');
    const unknown = key.data().auto ?? [];
    return { lean, spell: unknown.length ? null : spell, unnamed: unknown };
  });
}

export function translate(lean: string, names: NameMap = {}) {
  const declarations = declaredNames(lean);
  const { accepted, problems } = checkNames(names, declarations);
  const data = base();
  const key = new Key({ ...data, global: { ...data.global, ...accepted } });
  const spell = toSpell(lean, key);
  let decoded: string | undefined;
  let error: string | undefined;
  try {
    decoded = fromSpell(spell, key);
  } catch (caught) {
    error = caught instanceof Error ? caught.message : String(caught);
  }
  const after = key.data();
  const automatic = Object.fromEntries((after.auto ?? []).map(name => [name, after.global[name]]));
  return {
    spell,
    roundTrip: decoded === lean,
    ...(error ? { error } : {}),
    problems,
    additions: { ...accepted, ...automatic },
    automatic: Object.entries(automatic).map(([name, image]) => ({
      lean: name, spell: image, role: declarations.has(name) ? 'declaration' : 'other',
    })),
  };
}

function run(command: string | undefined, input: Record<string, unknown>): unknown {
  switch (command) {
    case 'lookup':
      if (!Array.isArray(input.identifiers) || !input.identifiers.every(i => typeof i === 'string')) {
        throw new TypeError('lookup needs {"identifiers": [string, ...]}');
      }
      return { results: lookup(input.identifiers as string[]) };
    case 'names':
      if (!input.names || typeof input.names !== 'object') throw new TypeError('names needs {"names": {lean: spell}}');
      return checkNames(input.names as NameMap);
    case 'translate':
      if (typeof input.lean !== 'string') throw new TypeError('translate needs {"lean": string}');
      return translate(input.lean, (input.names ?? {}) as NameMap);
    default:
      throw new TypeError('usage: arcana-cli lookup|names|translate < request.json');
  }
}

function main(): number {
  const command = process.argv[2];
  try {
    const raw = readFileSync(0, 'utf8');
    if (Buffer.byteLength(raw) > MAX_INPUT_BYTES) throw new RangeError(`input exceeds ${MAX_INPUT_BYTES} bytes`);
    const input = raw.trim() ? JSON.parse(raw) : {};
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('input must be a JSON object');
    process.stdout.write(JSON.stringify(run(command, input)) + '\n');
    return 0;
  } catch (error) {
    process.stdout.write(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }) + '\n');
    return 2;
  }
}

if (process.argv[1] && /arcana-cli\.(?:ts|js|mjs)$/.test(process.argv[1])) process.exitCode = main();
