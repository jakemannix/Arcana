export type PresentationMode = 'magic' | 'parallel' | 'math';
export const PRESENTATION_MODES: readonly PresentationMode[] = ['magic', 'parallel', 'math'];
const PARTICLE_LIMIT = 180;
const NODE_LIMIT = 1400;
const CHARACTER_LIMIT = 6000;
const DURATION = 2100;

export interface Glyph {
  text: string;
  x: number;
  y: number;
  color: string;
  font: string;
}

/** Evenly sample a bounded set, so long pages do not dominate the effect. */
export function sampleGlyphs<T>(items: readonly T[], limit: number): T[] {
  if (limit <= 0) return [];
  if (items.length <= limit) return [...items];
  return Array.from({ length: limit }, (_, index) => items[Math.floor(index * items.length / limit)]!);
}

/** Grapheme offsets keep runes, emoji, and combining marks intact in DOM ranges. */
export function textGlyphs(text: string, limit = Infinity): { text: string; from: number; to: number }[] {
  const segments = new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text);
  const glyphs = [];
  for (const { segment, index } of segments) {
    if (glyphs.length >= limit) break;
    glyphs.push({ text: segment, from: index, to: index + segment.length });
  }
  return glyphs;
}

function visibleGlyphs(root: HTMLElement): Glyph[] {
  const glyphs: Glyph[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let visited = 0, characters = 0;
  for (let node = walker.nextNode(); node && visited < NODE_LIMIT && characters < CHARACTER_LIMIT; node = walker.nextNode()) {
    visited++;
    const parent = node.parentElement;
    if (!parent || !node.textContent?.trim() || !parent.closest('[data-transmute]') || parent.closest('button, input, textarea, [aria-hidden="true"]')) continue;
    const bounds = parent.getBoundingClientRect();
    if (!bounds.width || !bounds.height || bounds.bottom < 0 || bounds.top > innerHeight || bounds.right < 0 || bounds.left > innerWidth) continue;
    let left = 0, right = innerWidth, top = 0, bottom = innerHeight;
    for (let ancestor: HTMLElement | null = parent; ancestor && ancestor !== root; ancestor = ancestor.parentElement) {
      const style = getComputedStyle(ancestor);
      if (style.visibility === 'hidden' || style.display === 'none') { right = 0; break; }
      const rect = ancestor.getBoundingClientRect();
      if (/(auto|scroll|hidden|clip)/.test(style.overflowX)) { left = Math.max(left, rect.left); right = Math.min(right, rect.right); }
      if (/(auto|scroll|hidden|clip)/.test(style.overflowY)) { top = Math.max(top, rect.top); bottom = Math.min(bottom, rect.bottom); }
    }
    if (right <= left || bottom <= top) continue;
    const style = getComputedStyle(parent), range = document.createRange();
    for (const glyph of textGlyphs(node.textContent, CHARACTER_LIMIT - characters)) {
      if (++characters > CHARACTER_LIMIT) break;
      if (!glyph.text.trim()) continue;
      range.setStart(node, glyph.from); range.setEnd(node, glyph.to);
      const rect = range.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.left < left || rect.right > right || rect.top < top || rect.bottom > bottom) continue;
      glyphs.push({ text: glyph.text, x: rect.left, y: rect.top, color: style.color, font: style.font });
    }
  }
  return sampleGlyphs(glyphs, PARTICLE_LIMIT);
}

interface PresentationOptions {
  root: HTMLElement;
  controls: HTMLElement;
  onChange: (mode: PresentationMode) => void;
}

/** Switch presentation without touching either editor's document or state. */
export function createPresentationController({ root, controls, onChange }: PresentationOptions) {
  let mode: PresentationMode = 'magic';
  let generation = 0, frame = 0, timer: ReturnType<typeof setTimeout> | undefined;
  let overlay: HTMLElement | undefined;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const buttons = [...controls.querySelectorAll<HTMLButtonElement>('[data-mode]')];
  const cancel = () => {
    generation++;
    cancelAnimationFrame(frame); clearTimeout(timer);
    overlay?.remove(); overlay = undefined;
    root.classList.remove('presentation-changing');
  };
  const apply = (next: PresentationMode) => {
    mode = next; root.dataset.presentation = next;
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.mode === next));
    onChange(next);
    document.dispatchEvent(new CustomEvent<PresentationMode>('presentationchange', { detail: next }));
  };
  const setMode = (next: PresentationMode) => {
    if (next === mode) { cancel(); return; }
    cancel();
    let source: Glyph[] = [];
    if (!motion.matches) { try { source = visibleGlyphs(root); } catch { /* A layout read must never prevent a view change. */ } }
    const workspace = root.querySelector<HTMLElement>('.workspace');
    const previous = workspace?.getBoundingClientRect();
    const anchorWorkspace = previous && previous.top < innerHeight && previous.bottom > 0;
    if (source.length) root.classList.add('presentation-changing');
    try { apply(next); } catch (error) { cancel(); throw error; }
    // Removing the explanation above a visible editor should not pull it away.
    if (anchorWorkspace && workspace) window.scrollBy(0, workspace.getBoundingClientRect().top - previous.top);
    if (!source.length) return;
    const current = generation;
    // CodeMirror measures the newly revealed pane before we sample its letters.
    frame = requestAnimationFrame(() => { frame = requestAnimationFrame(() => {
      if (current !== generation) return;
      try {
      const target = visibleGlyphs(root);
      if (!target.length) { cancel(); return; }
      overlay = document.createElement('div'); overlay.className = 'transmutation-field'; overlay.setAttribute('aria-hidden', 'true');
      const count = Math.min(PARTICLE_LIMIT, Math.max(source.length, target.length));
      for (let index = 0; index < count; index++) {
        const from = source[Math.floor(index * source.length / count)]!, to = target[Math.floor(index * target.length / count)]!;
        const particle = document.createElement('span'), before = document.createElement('span'), after = document.createElement('span');
        particle.className = 'transmutation-glyph'; before.className = 'glyph-before'; after.className = 'glyph-after';
        before.textContent = from.text; after.textContent = to.text;
        before.style.color = from.color; before.style.font = from.font; after.style.color = to.color; after.style.font = to.font;
        particle.style.left = `${from.x}px`; particle.style.top = `${from.y}px`;
        particle.style.setProperty('--heap-x', `${innerWidth * (.2 + Math.random() * .6) - from.x}px`);
        particle.style.setProperty('--heap-y', `${Math.min(innerHeight - 48, from.y + 100 + Math.random() * 190) - from.y}px`);
        particle.style.setProperty('--target-x', `${to.x - from.x}px`); particle.style.setProperty('--target-y', `${to.y - from.y}px`);
        particle.style.setProperty('--tumble', `${Math.random() * 480 - 240}deg`);
        particle.append(before, after); overlay.append(particle);
      }
      document.body.append(overlay);
      timer = setTimeout(cancel, DURATION);
      } catch { cancel(); }
    }); });
  };
  for (const button of buttons) {
    button.addEventListener('click', () => setMode(button.dataset.mode as PresentationMode));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (buttons.indexOf(button) + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
      buttons[index]!.focus(); setMode(buttons[index]!.dataset.mode as PresentationMode);
    });
  }
  motion.addEventListener('change', cancel);
  window.addEventListener('resize', cancel);
  // Reading, navigation, and editing take priority over a decorative transition.
  root.addEventListener('pointerdown', event => { if (!(event.target as Element).closest('#presentation-controls')) cancel(); }, true);
  root.addEventListener('keydown', event => { if (!(event.target as Element).closest('#presentation-controls')) cancel(); }, true);
  window.addEventListener('wheel', cancel, { passive: true });
  window.addEventListener('touchmove', cancel, { passive: true });
  document.addEventListener('visibilitychange', cancel);
  apply(mode);
  return { get mode() { return mode; }, setMode, cancel };
}
