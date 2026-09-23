import { Key, type KeyData } from './translator';

export interface Draft { lean: string; spell: string; key: KeyData }

/** Saving is lossless even while one editor contains an unfinished translation. */
export function serializeDraft(draft: Draft): string {
  return JSON.stringify({ format: 'arcana/v1', ...draft }, null, 2) + '\n';
}

export function parseDraft(text: string): Draft {
  const bundle = JSON.parse(text) as { format?: unknown; lean?: unknown; spell?: unknown; key?: KeyData } | null;
  if (!bundle || bundle.format !== 'arcana/v1' || typeof bundle.lean !== 'string' ||
      typeof bundle.spell !== 'string' || !bundle.key?.global || !bundle.key?.scoped) {
    throw new Error('Choose a grimoire JSON downloaded from this editor.');
  }
  const key = new Key(bundle.key);
  // Translation validity is checked after loading, independently of retaining the draft.
  return { lean: bundle.lean, spell: bundle.spell, key: key.data() };
}
