import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { checkNames, lookup, translate } from '../scripts/arcana-cli';
import { folios } from '../src/catalog';

test('translate reproduces every checked folio spell exactly and round-trips', () => {
  for (const folio of folios) {
    const result = translate(folio.lean);
    assert.equal(result.spell, folio.spell, folio.id);
    assert.equal(result.roundTrip, true, folio.id);
    assert.deepEqual(result.automatic, [], folio.id);
  }
});

test('lookup names known identifiers and reports unnamed components', () => {
  const [bijective, fresh] = lookup(['Function.Bijective', 'ZMod.inv_eq_of_mul_eq_one']);
  assert.equal(bijective.spell, 'Rite☿Perfect');
  assert.equal(fresh.spell, null);
  assert.deepEqual(fresh.unnamed, ['inv_eq_of_mul_eq_one']);
});

test('translate applies proposed names and reports automatic ones with roles', () => {
  const lean = 'theorem seven_inv : (7 : ZMod 11)⁻¹ = 8 := by\n  rw [ZMod.inv_eq_of_mul_eq_one 11 7 8 (by decide)]\n';
  const named = translate(lean, { seven_inv: '✨Seven✨Reversed✨' });
  assert.match(named.spell, /^spell ✨Seven✨Reversed✨ /);
  assert.equal(named.roundTrip, true);
  assert.deepEqual(named.automatic.map(a => a.lean), ['inv_eq_of_mul_eq_one']);
  const unnamed = translate(lean);
  assert.deepEqual(unnamed.automatic.map(a => [a.lean, a.role]),
    [['seven_inv', 'declaration'], ['inv_eq_of_mul_eq_one', 'other']]);
  assert.equal(unnamed.additions.seven_inv, unnamed.automatic[0].spell);
});

test('names enforces uniqueness, length, style and validity', () => {
  const { accepted, problems } = checkNames({
    fresh: '✨Fresh✨Rune✨',
    taken: 'Exchange',
    twice: '✨Fresh✨Rune✨',
    long: '✨A✨Very✨Long✨Name✨Indeed✨Yes✨',
    invalid: 'not valid!',
    'dotted.name': 'Door',
    add_comm: '✨Other✨Name✨',
  });
  assert.deepEqual(accepted, { fresh: '✨Fresh✨Rune✨' });
  const why = Object.fromEntries(problems.map(p => [p.lean, p.problem]));
  assert.match(why.taken, /already names add_comm/);
  assert.match(why.twice, /already names fresh/);
  assert.match(why.long, /content words/);
  assert.match(why.invalid, /invalid or reserved/);
  assert.match(why['dotted.name'], /no dots/);
  assert.match(why.add_comm, /already names add_comm Exchange/);
  const declared = checkNames({ my_thm: 'lowercase✨title', other: 'Sigil✨Door' }, new Set(['my_thm', 'other']));
  assert.equal(declared.problems.length, 2);
});

test('the command reads stdin JSON and reports errors without throwing', () => {
  const run = (command: string, input: string) => {
    try {
      return JSON.parse(execFileSync('npx', ['tsx', 'scripts/arcana-cli.ts', command], { input, encoding: 'utf8' }));
    } catch (error) {
      return JSON.parse((error as { stdout: string }).stdout);
    }
  };
  assert.equal(run('lookup', '{"identifiers": ["add_comm"]}').results[0].spell, 'Exchange');
  assert.match(run('lookup', '{"identifiers": 3}').error, /identifiers/);
  assert.match(run('translate', '[]').error, /JSON object/);
  assert.match(run('unknown', '{}').error, /usage/);
});
