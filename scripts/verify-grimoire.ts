import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve, delimiter } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Key, toSpell, fromSpell, tokenize } from '../src/translator';
import chapters from '../grimoire/chapters.json';
import lexicon from '../grimoire/lexicon.json';

const root = fileURLToPath(new URL('../', import.meta.url));
const math = join(root, 'math'), decodedRoot = join(math, 'decoded');
const output = join(root, 'public/grimoire');
const sha = (text: string) => createHash('sha256').update(text).digest('hex');
const read = (path: string) => readFileSync(path, 'utf8');
const write = (path: string, text: string) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, text); };
const run = (command: string, args: string[], cwd = math, env = process.env) =>
  execFileSync(command, args, { cwd, env, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
const pin = JSON.parse(read(join(math, 'lake-manifest.json'))).packages.find((p: { name: string }) => p.name === 'mathlib').rev as string;
const checkout = run('git', ['rev-parse', 'HEAD'], join(math, '.lake/packages/mathlib')).trim();
run('git', ['diff', '--exit-code', 'HEAD', '--', 'Mathlib'], join(math, '.lake/packages/mathlib'));
if (checkout !== pin) throw new Error('Installed mathlib does not match lake-manifest.json.');
console.log(run('lake', ['build']));
const leanPath = run('lake', ['env', 'printenv', 'LEAN_PATH']).trim();
const lean = run('lake', ['env', 'which', 'lean']).trim();
const env = { ...process.env, LEAN_PATH: [decodedRoot, ...leanPath.split(delimiter).map(p => resolve(math, p))].join(delimiter) };
const key = new Key(lexicon);
const sources = chapters.map(chapter => ({ ...chapter, lean: read(join(math, chapter.file)) }));
// Reserve readable quoted names across the whole book before allocating anything.
for (const source of sources) key.reserveQuoted(tokenize(source.lean));
const translated = sources.map(chapter => ({ ...chapter, spell: toSpell(chapter.lean, key) }));
const keyText = JSON.stringify(key.data(), null, 2) + '\n';
const reloaded = new Key(JSON.parse(keyText));
const declarations: string[] = [];
for (const chapter of translated) {
  const decoded = fromSpell(chapter.spell, reloaded);
  if (decoded !== chapter.lean) throw new Error(`Round-trip failure: ${chapter.id}`);
  const forbidden = tokenize(decoded).filter(t => t.kind === 'ident' && ['sorry', 'admit', 'axiom', 'unsafe', 'native_decide'].includes(t.text));
  if (forbidden.length) throw new Error(`Forbidden proof escape: ${chapter.id}`);
  const namespace = decoded.match(/^namespace (\S+)/m)![1];
  declarations.push(...Array.from(decoded.matchAll(/^(?:noncomputable )?(?:def|abbrev|theorem) (\w+)/gm), match => namespace + '.' + match[1]));
  const path = join(decodedRoot, chapter.file);
  write(path, decoded);
  const result = run(lean, ['-DwarningAsError=true', path, '-o', path.replace(/\.lean$/, '.olean')], decodedRoot, env);
  if (result.trim()) console.log(result);
  console.log(`Checked decoded Arcane: ${chapter.id}`);
}
const audit = translated.map(c => `import ${c.file.replace(/\.lean$/, '').replaceAll('/', '.')}`).join('\n') + '\n\n' + declarations.map(d => `#print axioms ${d}`).join('\n') + '\n';
write(join(decodedRoot, 'Audit.lean'), audit);
const axioms = run(lean, ['Audit.lean'], decodedRoot, env);
const allowedAxioms = new Set(['propext', 'Classical.choice', 'Quot.sound']);
for (const match of axioms.matchAll(/\[([^\]]*)\]/g)) for (const name of match[1].split(',').map(s => s.trim()).filter(Boolean)) {
  if (!allowedAxioms.has(name)) throw new Error('Unexpected proof dependency: ' + name);
}
if (axioms.split('\n').filter(line => /depends on axioms|does not depend on any axioms/.test(line)).length !== declarations.length) throw new Error('Incomplete axiom audit.');
write(join(output, 'axioms.txt'), axioms);
write(join(output, 'arcane.key.json'), keyText);
const entries = translated.map(chapter => {
  const references = chapter.references.map(ref => {
    const path = join(math, '.lake/packages/mathlib', ref.path);
    if (!existsSync(path)) throw new Error(`Missing reference: ${ref.path}`);
    const name = ref.symbol.split('.').at(-1)!;
    const lines = read(path).split('\n');
    const line = lines.findIndex(text => new RegExp(`(?:def|theorem|lemma|structure|abbrev) ${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:[\\s:{(]|$)`).test(text)) + 1;
    return { ...ref, url: `https://github.com/leanprover-community/mathlib4/blob/${pin}/${ref.path}${line ? '#L' + line : ''}` };
  });
  const used = new Set(tokenize(chapter.lean).filter(t => t.kind === 'ident').flatMap(t => t.text.split('.')));
  const glossary = Object.entries({ ...JSON.parse(read(join(root, 'src/tables.json'))).words, ...key.data().global })
    .filter(([name]) => used.has(name) && (!/^[a-zα-ω]$/u.test(name) || chapter.concepts.includes(name)))
    .map(([lean, arcane]) => ({ lean, arcane }));
  const stem = chapter.id;
  write(join(output, `${stem}.lean`), chapter.lean);
  write(join(output, `${stem}.spell`), chapter.spell);
  write(join(output, `${stem}.json`), JSON.stringify({ format: 'lean-magic/v1', lean: chapter.lean, spell: chapter.spell, key: key.data() }, null, 2) + '\n');
  return { ...chapter, references, glossary, sourceHash: sha(chapter.lean), spellHash: sha(chapter.spell), declarations: Array.from(chapter.lean.matchAll(/^(?:noncomputable )?(?:def|abbrev|theorem) (\w+)/gm), match => chapter.lean.match(/^namespace (\S+)/m)![1] + '.' + match[1]) };
});
const catalog = { format: 'arcane-grimoire/v1', mathlibRevision: pin, leanToolchain: read(join(math, 'lean-toolchain')).trim(),
  translatorHash: sha(read(join(root, 'src/translator.ts'))), tablesHash: sha(read(join(root, 'src/tables.json'))),
  metadataHash: sha(read(join(root, 'grimoire/chapters.json'))), lexiconHash: sha(read(join(root, 'grimoire/lexicon.json'))),
  key: key.data(), verification: { originalBuild: true, decodedBuild: true, axiomAudit: true, declarationCount: declarations.length }, entries };
write(join(root, 'src/grimoire.generated.json'), JSON.stringify(catalog, null, 2) + '\n');
const book = '# Enchantment · The graduate grimoire\n\nEight lessons in group theory, with shared cantrips. All ' + declarations.length + ' declarations compile against Lean/mathlib v4.33.1. Every Arcane source decodes exactly and is compiled again. Browser edits are not checked by Lean.\n\n' + entries.map(entry => `## ${entry.title}\n\n*${entry.subtitle}*\n\n${entry.summary}\n\n**Mathematical meaning.** ${entry.meaning}\n\n**Hypotheses.** ${entry.hypotheses}\n\n**Proof idea.** ${entry.proofIdea}\n\n` + '```text\n' + entry.spell + '```\n\n' + `[Lean source](../math/${entry.file}) · [Arcane source](../public/grimoire/${entry.id}.spell)\n\n` + entry.references.map(ref => `[${ref.symbol}](${ref.url})`).join(' · ') + '\n').join('\n');
write(join(root, 'grimoire/README.md'), book);
console.log(`Verified ${entries.length} folios and ${declarations.length} declarations against mathlib ${pin}.`);
