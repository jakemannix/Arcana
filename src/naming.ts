/** Spell-side names stay short enough to read at a glance. */
export const MAX_CONTENT_WORDS = 4;
export const MAX_LETTERS = 28;
const SMALL_WORDS = new Set(['the', 'of', 'a', 'an', 'to', 'and', 'is', 'are', 'in', 'upon', 'as', 'at', 'by',
  'from', 'with', 'into', 'through', 'within', 'without', 'has', 'no', 'not']);

/** Explain why a spell-side name is too long, or return undefined when it is fine. */
export function nameLengthProblem(name: string): string | undefined {
  const words = name.split('✨').filter(Boolean);
  const content = words.filter(word => !SMALL_WORDS.has(word.toLowerCase())).length;
  const letters = words.join('').length;
  if (content > MAX_CONTENT_WORDS) return `${name} has ${content} content words; the limit is ${MAX_CONTENT_WORDS}.`;
  if (letters > MAX_LETTERS) return `${name} has ${letters} letters; the limit is ${MAX_LETTERS}.`;
  return undefined;
}
