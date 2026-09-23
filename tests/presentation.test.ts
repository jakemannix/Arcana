import { test, type TestContext } from 'node:test';
import assert from 'node:assert/strict';
import { createPresentationController, sampleGlyphs, textGlyphs, type PresentationMode } from '../src/presentation';

test('particle sampling keeps a bounded selection across the whole visible passage', () => {
  const passage = Array.from({ length: 10000 }, (_, index) => index);
  const sampled = sampleGlyphs(passage, 180);
  assert.equal(sampled.length, 180);
  assert.equal(sampled[0], 0);
  assert.ok(sampled.at(-1)! > 9900);
  assert.equal(new Set(sampled).size, 180);
  assert.deepEqual(sampleGlyphs(['a', 'b'], 180), ['a', 'b']);
  assert.deepEqual(sampleGlyphs(passage, 0), []);
});

test('animated glyph ranges preserve Unicode graphemes and cap long text nodes', () => {
  const source = 'ᛰ 🌒 e\u0301 🧙‍♀️ jade✨cube';
  const glyphs = textGlyphs(source);
  assert.ok(glyphs.some(glyph => glyph.text === '🌒'));
  assert.ok(glyphs.some(glyph => glyph.text === 'e\u0301'));
  assert.ok(glyphs.some(glyph => glyph.text === '🧙‍♀️'));
  for (const glyph of glyphs) assert.equal(source.slice(glyph.from, glyph.to), glyph.text);
  assert.equal(glyphs.map(glyph => glyph.text).join(''), source);
  assert.equal(textGlyphs('🌒'.repeat(100000), 180).length, 180);
});

class ElementStub extends EventTarget {
  dataset: Record<string, string> = {};
  attributes = new Map<string, string>();
  classes = new Set<string>();
  classList = { add: (value: string) => this.classes.add(value), remove: (value: string) => this.classes.delete(value) };
  buttons: ElementStub[] = [];
  focused = false;
  parentElement: ElementStub | null = null;
  setAttribute(name: string, value: string) { this.attributes.set(name, value); }
  querySelectorAll() { return this.buttons; }
  querySelector() { return null; }
  getBoundingClientRect() { return { top: 100, bottom: 120, left: 50, right: 100, width: 50, height: 20 }; }
  closest(selector: string) { return selector === '[data-transmute]' ? this : null; }
  focus() { this.focused = true; }
}

function setup(t: TestContext, reduced = true) {
  const root = new ElementStub(), controls = new ElementStub(), motion = Object.assign(new EventTarget(), { matches: reduced });
  controls.buttons = ['magic', 'parallel', 'math'].map(mode => { const button = new ElementStub(); button.dataset.mode = mode; return button; });
  const callbacks: PresentationMode[] = [], events: PresentationMode[] = [], frames = new Map<number, FrameRequestCallback>();
  let frameId = 0;
  const doc = Object.assign(new EventTarget(), {
    createTreeWalker: () => { throw new Error('Unexpected layout read'); },
    createRange: () => ({ setStart() {}, setEnd() {}, getBoundingClientRect: () => root.getBoundingClientRect() }),
  });
  doc.addEventListener('presentationchange', event => events.push((event as CustomEvent<PresentationMode>).detail));
  const globals = {
    window: Object.assign(new EventTarget(), { scrollBy() {} }), document: doc,
    matchMedia: () => motion, innerHeight: 800, innerWidth: 1200, NodeFilter: { SHOW_TEXT: 4 },
    getComputedStyle: () => ({ display: 'block', visibility: 'visible', overflowX: 'visible', overflowY: 'visible', color: '#fff', font: '16px monospace' }),
    requestAnimationFrame: (callback: FrameRequestCallback) => { frames.set(++frameId, callback); return frameId; },
    cancelAnimationFrame: (id: number) => frames.delete(id),
  };
  const restore: (() => void)[] = [];
  for (const [key, value] of Object.entries(globals)) {
    const old = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
    restore.push(() => { if (old) Object.defineProperty(globalThis, key, old); else Reflect.deleteProperty(globalThis, key); });
  }
  const controller = createPresentationController({ root: root as unknown as HTMLElement, controls: controls as unknown as HTMLElement, onChange: mode => callbacks.push(mode) });
  t.after(() => { controller.cancel(); for (const reset of restore) reset(); });
  return { root, controls, doc, controller, callbacks, events, frames };
}

test('reduced-motion view changes apply immediately and rapid switches retain the final mode', t => {
  const { root, controls, controller, callbacks, events, frames } = setup(t);
  assert.equal(controller.mode, 'parallel');
  controller.setMode('magic'); controller.setMode('math'); controller.setMode('magic'); controller.setMode('magic');
  assert.equal(controller.mode, 'magic');
  assert.equal(root.dataset.presentation, 'magic');
  assert.deepEqual(callbacks, ['parallel', 'magic', 'math', 'magic']);
  assert.deepEqual(events, callbacks);
  assert.equal(frames.size, 0);
  assert.equal(root.classes.size, 0);
  assert.deepEqual(controls.buttons.map(button => button.attributes.get('aria-pressed')), ['true', 'false', 'false']);
});

test('view controls support wrapping arrow navigation, Home, and End', t => {
  const { controls, controller } = setup(t);
  const press = (index: number, key: string) => controls.buttons[index]!.dispatchEvent(Object.assign(new Event('keydown', { cancelable: true }), { key }));
  press(0, 'ArrowLeft'); assert.equal(controller.mode, 'math'); assert.equal(controls.buttons[2]!.focused, true);
  press(2, 'ArrowRight'); assert.equal(controller.mode, 'magic');
  press(0, 'End'); assert.equal(controller.mode, 'math');
  press(2, 'Home'); assert.equal(controller.mode, 'magic');
});

test('failed source layout measurements never block a view change', t => {
  const { root, controller, frames } = setup(t, false);
  controller.setMode('magic');
  assert.equal(controller.mode, 'magic');
  assert.equal(root.classes.size, 0);
  assert.equal(frames.size, 0);
});

test('failed target measurements restore text after the transition has started', t => {
  const { root, controller, doc, frames } = setup(t, false);
  const textParent = new ElementStub(); textParent.parentElement = root;
  let reads = 0;
  doc.createTreeWalker = (() => {
    if (++reads > 1) throw new Error('Layout changed during animation');
    let visited = false;
    return { nextNode: () => { if (visited) return null; visited = true; return { parentElement: textParent, textContent: '🌒' }; } };
  }) as typeof doc.createTreeWalker;
  controller.setMode('magic');
  assert.equal(root.classes.has('presentation-changing'), true);
  while (frames.size) {
    const [id, callback] = frames.entries().next().value!;
    frames.delete(id); callback(0);
  }
  assert.equal(controller.mode, 'magic');
  assert.equal(root.classes.has('presentation-changing'), false);
});
