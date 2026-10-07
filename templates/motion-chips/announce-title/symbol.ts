export interface SymbolShape { d: string; fill?: string; rule: CanvasFillRule }
export interface SymbolData { box: [number, number, number, number]; shapes: SymbolShape[] }

export function symbolPlacement(box: SymbolData['box'], size: number) {
  const [x, y, width, height] = box;
  return { scale: size / Math.max(width, height), x: -x - width / 2, y: -y - height / 2 };
}

// Measure actual path geometry once when artwork changes. getBBox accounts for
// curve extrema and negative coordinates without assuming the viewBox is tight.
export function symbolBounds(data: SymbolData): SymbolData['box'] {
  if (typeof document === 'undefined' || !document.createElementNS || !document.body) return data.box;
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;opacity:0;pointer-events:none;overflow:hidden';
  for (const shape of data.shapes) {
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', shape.d);
    svg.appendChild(path);
  }
  document.body.appendChild(svg);
  try {
    const { x, y, width, height } = svg.getBBox();
    if ([x, y, width, height].every(Number.isFinite) && width > 0 && height > 0) return [x, y, width, height];
    return data.box;
  } catch { return data.box; }
  finally { svg.remove(); }
}

// Read path artwork as data only; never mount pasted SVG markup in the page.
export function parseSymbol(source: string): SymbolData | null {
  const value = source.trim();
  if (!value) return null;
  if (!value.startsWith('<')) return { box: [0, 0, 100, 100], shapes: [{ d: value, rule: 'nonzero' }] };
  const attributes = (tag: string) => {
    const result: Record<string, string> = {};
    for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)) result[match[1]] = match[3];
    return result;
  };
  const clean = value.replace(/<!--[\s\S]*?-->/g, '');
  const root = clean.match(/<svg\b[^>]*>/i);
  if (!root) return null;
  const attr = attributes(root[0]);
  const box = attr.viewBox ? attr.viewBox.trim().split(/[\s,]+/).map(Number) : [0, 0, Number.parseFloat(attr.width), Number.parseFloat(attr.height)];
  if (box.length !== 4 || !box.every(Number.isFinite) || box[2] <= 0 || box[3] <= 0) return null;
  const shapes: SymbolShape[] = [];
  for (const match of clean.matchAll(/<path\b[^>]*>/gi)) {
    const path = attributes(match[0]);
    if (!path.d || path.fill === 'none') continue;
    shapes.push({ d: path.d, fill: path.fill ?? attr.fill ?? 'black', rule: (path['fill-rule'] ?? attr['fill-rule']) === 'evenodd' ? 'evenodd' : 'nonzero' });
  }
  return shapes.length ? { box: box as SymbolData['box'], shapes } : null;
}
