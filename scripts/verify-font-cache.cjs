const assert = require('node:assert/strict');
(async () => {
  const { createFontCache } = await import('../brand-tools/font-cache.js');
  class Element {
    constructor(family, children = []) { this.style = { fontFamily: family }; this.children = children; }
  }
  global.HTMLElement = Element;
  global.getComputedStyle = element => element.style;
  const calls = [];
  const fonts = createFontCache(async node => { calls.push(node); return node.style.fontFamily; });
  const report = new Element('Geist, sans-serif');
  const ai = new Element('"AI Geist Upright", sans-serif', [new Element('"Nib Pro"')]);
  assert.equal(await fonts(report), 'Geist, sans-serif');
  assert.equal(await fonts(ai), '"AI Geist Upright", sans-serif');
  await fonts(report);
  await fonts(new Element('sans-serif, "AI Geist Upright"', [new Element('"Nib Pro"')]));
  assert.equal(calls.length, 2, 'Reuse only captures with the same complete font set');
  await fonts(new Element('Geist, sans-serif', [new Element('Geist Mono')]));
  assert.equal(calls.length, 3, 'Include descendant font families');
  let attempts = 0;
  const retry = createFontCache(async () => { if (++attempts === 1) throw Error('font fetch'); return 'loaded'; });
  await assert.rejects(retry(report), /font fetch/);
  assert.equal(await retry(report), 'loaded');
  console.log('Font cache passed: template switches, font aliases, descendants, reuse, and retry.');
})().catch(error => { console.error(error); process.exitCode = 1; });
