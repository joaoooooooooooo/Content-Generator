// html-to-image embeds only font families used by the captured subtree.
// Cache by that set, not by the document: templates use different aliases.
export function createFontCache(embedFonts) {
  const cache = new Map();
  return function fontCSS(node) {
    const families = new Set();
    function visit(element) {
      const family = element.style.fontFamily || getComputedStyle(element).fontFamily;
      family.split(',').forEach(value => families.add(value.trim().replace(/["']/g, '')));
      for (const child of element.children) {
        if (child instanceof HTMLElement) visit(child);
      }
    }
    visit(node);
    const key = JSON.stringify([...families].sort());
    if (!cache.has(key)) {
      const pending = Promise.resolve().then(() => embedFonts(node, { preferredFontFormat: 'woff2' }));
      cache.set(key, pending);
      pending.catch(() => { if (cache.get(key) === pending) cache.delete(key); });
    }
    return cache.get(key);
  };
}
