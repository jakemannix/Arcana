import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve, delimiter } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Key, CARRIER_RUNES, toSpell, fromSpell, tokenize } from '../src/translator';
import chapters from '../grimoire/chapters.json';
import schools from '../grimoire/schools.json';
import lexicon from '../grimoire/lexicon.json';

const root = fileURLToPath(new URL('../', import.meta.url));
const math = join(root, 'math'), decodedRoot = join(math, 'decoded');
const output = join(root, 'public/grimoire');
const sha = (text: string) => createHash('sha256').update(text).digest('hex');
const read = (path: string) => readFileSync(path, 'utf8');
const write = (path: string, text: string) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, text); };
const run = (command: string, args: string[], cwd = math, env = process.env) =>
  execFileSync(command, args, { cwd, env, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
const dependencies = {
  mathlib: { repository: 'leanprover-community/mathlib4', source: 'Mathlib' },
  P3Group: { repository: 'lixiang90/p3group', source: 'P3Group' },
};
const folioIds = new Set(chapters.map(chapter => chapter.id));
if (folioIds.size !== chapters.length) throw new Error('Duplicate folio ID.');
for (const chapter of chapters) {
  if (chapter.school !== 'Cantrips' && !schools.some(school => school.name === chapter.school &&
      school.subschools.some(subschool => subschool.id === chapter.subschool))) {
    throw new Error(`Unknown school or subschool: ${chapter.id}`);
  }
  for (const prerequisite of chapter.prerequisites) {
    if (!folioIds.has(prerequisite)) throw new Error(`Missing prerequisite: ${chapter.id} → ${prerequisite}`);
  }
}
const manifest = JSON.parse(read(join(math, 'lake-manifest.json')));
const dependencyRevisions = Object.fromEntries(Object.entries(dependencies).map(([name, dependency]) => {
  const pin = manifest.packages.find((p: { name: string }) => p.name === name)?.rev as string | undefined;
  if (!pin) throw new Error(`Missing dependency pin: ${name}`);
  const directory = join(math, '.lake/packages', name);
  const checkout = run('git', ['rev-parse', 'HEAD'], directory).trim();
  const changes = run('git', ['status', '--porcelain', '--untracked-files=all', '--', dependency.source], directory).trim();
  if (checkout !== pin || changes) throw new Error(`Installed ${name} does not match its clean pinned source.`);
  return [name, pin];
}));
const pin = dependencyRevisions.mathlib;
console.log(run('lake', ['build']));
const leanPath = run('lake', ['env', 'printenv', 'LEAN_PATH']).trim();
const lean = run('lake', ['env', 'which', 'lean']).trim();
const env = { ...process.env, LEAN_PATH: [decodedRoot, ...leanPath.split(delimiter).map(p => resolve(math, p))].join(delimiter) };
const key = new Key(lexicon);
const sources = chapters.map(chapter => ({ ...chapter, lean: read(join(math, chapter.file)) }));
const translated = sources.map(chapter => ({ ...chapter, spell: toSpell(chapter.lean, key) }));
const keyText = JSON.stringify(key.data(), null, 2) + '\n';
const reloaded = new Key(JSON.parse(keyText));
const declarationsOf = (source: string) => {
  const code = tokenize(source).map(token => ['comment', 'string', 'char'].includes(token.kind)
    ? token.text.replace(/[^\n]/g, ' ') : token.text).join('');
  const namespace = code.match(/^namespace (\S+)/m)?.[1];
  if (!namespace) throw new Error('A folio must declare its mathematical namespace.');
  return Array.from(code.matchAll(/^(?:noncomputable )?(?:def|abbrev|theorem) (\w+)/gm), match => namespace + '.' + match[1]);
};
const declarations: string[] = [];
for (const chapter of translated) {
  const decoded = fromSpell(chapter.spell, reloaded);
  if (decoded !== chapter.lean) throw new Error(`Round-trip failure: ${chapter.id}`);
  const comments = (source: string, spell = false) => tokenize(source, spell).filter(t => t.kind === 'comment').map(t => t.text);
  if (JSON.stringify(comments(chapter.lean)) !== JSON.stringify(comments(chapter.spell, true))) {
    throw new Error(`Shared comments differ between panes: ${chapter.id}`);
  }
  const forbidden = tokenize(decoded).filter(t => t.kind === 'ident' && ['sorry', 'admit', 'axiom', 'unsafe', 'native_decide'].includes(t.text));
  if (forbidden.length) throw new Error(`Forbidden proof escape: ${chapter.id}`);
  declarations.push(...declarationsOf(decoded));
  const path = join(decodedRoot, chapter.file);
  write(path, decoded);
  const result = run(lean, ['-DwarningAsError=true', path, '-o', path.replace(/\.lean$/, '.olean')], decodedRoot, env);
  if (result.trim()) console.log(result);
  console.log(`Checked decoded Arcana: ${chapter.id}`);
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
write(join(output, 'arcana.key.json'), keyText);
const entries = translated.map(chapter => {
  const references = chapter.references.map(ref => {
    const packageName = ('package' in ref ? ref.package : 'mathlib') as keyof typeof dependencies;
    const dependency = dependencies[packageName];
    if (!dependency) throw new Error(`Unknown reference package: ${packageName}`);
    const path = join(math, '.lake/packages', packageName, ref.path);
    if (!existsSync(path)) throw new Error(`Missing reference: ${ref.path}`);
    const lines = read(path).split('\n');
    const candidates = lines.flatMap((text, index) => {
      const declared = text.match(/(?:def|theorem|lemma|structure|abbrev) ([\w.']+)(?:[\s:{(]|$)/)?.[1]?.replace(/^_root_\./, '');
      return declared && (declared === ref.symbol || ref.symbol.endsWith('.' + declared))
        ? [{ name: declared, line: index + 1 }] : [];
    });
    const qualified = candidates.filter(candidate => candidate.name === ref.symbol);
    // A pinned file is more helpful than a confident link to the wrong namespaced theorem.
    const line = qualified.length === 1 ? qualified[0].line : candidates.length === 1 ? candidates[0].line : 0;
    return { ...ref, url: `https://github.com/${dependency.repository}/blob/${dependencyRevisions[packageName]}/${ref.path}${line ? '#L' + line : ''}` };
  });
  const identifiers = tokenize(chapter.lean).filter(t => t.kind === 'ident').map(t => t.text);
  const namespaces = key.data().namespaces ?? {};
  const namespaceNames = Object.keys(namespaces).sort((a, b) => b.length - a.length);
  const usedNamespaces = new Set<string>();
  const used = new Set(identifiers.flatMap(name => {
    const prefix = namespaceNames.find(namespace => name === namespace || name.startsWith(namespace + '.'));
    if (!prefix) return name.split('.');
    usedNamespaces.add(prefix);
    return name.slice(prefix.length + 1).split('.').filter(Boolean);
  }));
  const glossary = Object.entries({ ...JSON.parse(read(join(root, 'src/tables.json'))).words,
    ...key.data().global, ...namespaces })
    .filter(([name, arcane]) => (used.has(name) || usedNamespaces.has(name)) &&
      (!/^[a-zα-ω]$/u.test(name) || chapter.concepts.includes(name) ||
        (typeof arcane === 'string' && (CARRIER_RUNES.some(rune => rune === arcane) ||
          (arcane.includes('✨') && !arcane.startsWith('✨'))))))
    .map(([lean, arcane]) => ({ lean, arcane }));
  const stem = chapter.id;
  write(join(output, `${stem}.lean`), chapter.lean);
  write(join(output, `${stem}.spell`), chapter.spell);
  write(join(output, `${stem}.json`), JSON.stringify({ format: 'arcana/v1', lean: chapter.lean, spell: chapter.spell, key: key.data() }, null, 2) + '\n');
  return { ...chapter, references, glossary, sourceHash: sha(chapter.lean), spellHash: sha(chapter.spell), declarations: declarationsOf(chapter.lean) };
});
const catalog = { format: 'arcana-grimoire/v1', schools, schoolsHash: sha(read(join(root, 'grimoire/schools.json'))), mathlibRevision: pin, dependencyRevisions,
  manifestHash: sha(read(join(math, 'lake-manifest.json'))), lakefileHash: sha(read(join(math, 'lakefile.toml'))),
  verifierHash: sha(read(join(root, 'scripts/verify-grimoire.ts'))), leanToolchain: read(join(math, 'lean-toolchain')).trim(),
  translatorHash: sha(read(join(root, 'src/translator.ts'))), tablesHash: sha(read(join(root, 'src/tables.json'))),
  metadataHash: sha(read(join(root, 'grimoire/chapters.json'))), lexiconHash: sha(read(join(root, 'grimoire/lexicon.json'))),
  key: key.data(), verification: { originalBuild: true, decodedBuild: true, axiomAudit: true, declarationCount: declarations.length }, entries };
write(join(root, 'src/grimoire.generated.json'), JSON.stringify(catalog, null, 2) + '\n');
const tutorialMarkdown = (tutorial: { motivation: string; steps: { title: string; body: string }[];
  experiment: { prompt: string; hint: string } }) =>
  `**A guided reading.** ${tutorial.motivation}\n\n` +
  tutorial.steps.map((step, index) => `${index + 1}. **${step.title}** ${step.body}`).join('\n\n') +
  `\n\n**Try it yourself.** ${tutorial.experiment.prompt}\n\n<details><summary>A hint</summary>\n\n${tutorial.experiment.hint}\n\n</details>\n\n`;
const book = '# Arcana · The grimoire\n\n' + (entries.length - 1) + ' lessons across ' + schools.map(school => school.name + ' (' + school.subject.toLowerCase() + ')').join(', ') + ', with shared cantrips. All ' + declarations.length + ' declarations compile against Lean/mathlib v4.33.1, with the pinned P3Group classification library for the Eightfold Way. Every Arcana source decodes exactly and is compiled again. Browser edits are not checked by Lean.\n\n' + entries.map(entry => `## ${entry.title}\n\n*${entry.subtitle}*\n\n${entry.summary}\n\n**Mathematical meaning.** ${entry.meaning}\n\n**Hypotheses.** ${entry.hypotheses}\n\n**Proof idea.** ${entry.proofIdea}\n\n` + tutorialMarkdown(entry.tutorial) + '```text\n' + entry.spell + '```\n\n' + `[Lean source](../math/${entry.file}) · [Arcana source](../public/grimoire/${entry.id}.spell)\n\n` + entry.references.map(ref => `[${ref.symbol}](${ref.url})`).join(' · ') + '\n').join('\n');
write(join(root, 'grimoire/README.md'), book);
console.log(`Verified ${entries.length} folios and ${declarations.length} declarations against mathlib ${pin}.`);
