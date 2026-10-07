import { parseSymbol, symbolBounds, symbolPlacement, type SymbolData } from './symbol';
import type { SocialArtwork, SocialValues } from '../../social/types';
import { loadAnnounceTitleFonts } from '@/lib/announceTitleFonts';
import { REF_W as W, REF_H as H, MARK_PATH, PLANE_MAG, PLANE_RAKE, REFERENCE_DURATION, shotAt, sample, settle, clamp01, macroPan, hexToRgb, titleEntry, taglineArrival } from './model';

const text = (v: SocialValues, key: string, fallback = '') => String(v[key] ?? fallback);
const num = (v: SocialValues, key: string, fallback: number) => Number.isFinite(Number(v[key])) ? Number(v[key]) : fallback;
function line(ctx: CanvasRenderingContext2D, value: string, size: number, tracking: number, max: number, face: string) {
  ctx.font = `400 ${size}px ${face}`; ctx.letterSpacing = `${size * tracking}px`;
  size *= Math.min(1, max / Math.max(1, ctx.measureText(value).width));
  ctx.font = `400 ${size}px ${face}`; ctx.letterSpacing = `${size * tracking}px`;
  return { size, width: ctx.measureText(value).width };
}
export function textLines(value: string) {
  return value.replace(/\r\n?/g, '\n').split('\n').map(row => row.trim().split(/\s+/).filter(Boolean));
}
function block(ctx: CanvasRenderingContext2D, value: string, size: number, tracking: number, width: number, height: number, face: string) {
  const rows = textLines(value);
  let fitted = size;
  for (const words of rows) fitted = Math.min(fitted, line(ctx, words.join(' '), size, tracking, width, face).size);
  fitted = Math.min(fitted, height / Math.max(1, rows.length * 1.25));
  line(ctx, '', fitted, tracking, Infinity, face);
  return { rows, lineHeight: fitted * 1.25, count: rows.reduce((n, row) => n + row.length, 0) };
}
const paths = new Map<string, { data: SymbolData; paths: Path2D[] }>();
function mark(ctx: CanvasRenderingContext2D, v: SocialValues, x: number, y: number, size: number, angle: number, alpha = 1) {
  const source = text(v, 'symbolPath', MARK_PATH);
  if (!source || size <= 0 || alpha <= 0) return;
  let symbol = paths.get(source);
  if (!symbol) {
    const data = parseSymbol(source); if (!data) return;
    data.box = symbolBounds(data);
    try { symbol = { data, paths: data.shapes.map(shape => new Path2D(shape.d)) }; } catch { return; }
    if (paths.size > 16) paths.clear(); paths.set(source, symbol);
  }
  const placement = symbolPlacement(symbol.data.box, size);
  ctx.save(); ctx.translate(x, y); ctx.rotate(angle * Math.PI / 180);
  ctx.scale(placement.scale, placement.scale); ctx.translate(placement.x, placement.y);
  ctx.globalAlpha *= alpha; ctx.fillStyle = text(v, 'symbolColor', '#ffffff');
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
  symbol.data.shapes.forEach((shape, i) => ctx.fill(symbol.paths[i], shape.rule));
  ctx.restore();
}
// Rasterize the opening type once per value bag, then project horizontal strips
// through the reference's perspective plane. No DOM or Remotion player needed.
const planes = new WeakMap<SocialValues, HTMLCanvasElement>();
function rush(ctx: CanvasRenderingContext2D, v: SocialValues, value: string, size: number, face: string, f: number, width: number, height: number) {
  let plane = planes.get(v);
  if (!plane) {
    plane = document.createElement('canvas'); plane.width = 8192; plane.height = Math.ceil(size * 9) * 2;
    const p = plane.getContext('2d')!; p.scale(2, 2); p.font = `400 ${size * 6}px ${face}`; p.letterSpacing = `${size * 6 * -0.0666}px`;
    p.textAlign = 'center'; p.fillStyle = text(v, 'inkColor', '#ffffff'); p.fillText(value, plane.width / 4, plane.height / 4 + size * 2);
    planes.set(v, plane);
  }
  const scale = sample(PLANE_MAG, f) / 6, angle = sample(PLANE_RAKE, f) * Math.PI / 180, perspective = W * 0.36;
  for (let row = 0; row < plane.height; row += 2) {
    const y = (row - plane.height / 2) / 2, divisor = 1 - y * Math.sin(angle) / perspective;
    const next = 1 - (y + 1) * Math.sin(angle) / perspective;
    if (divisor <= 0.02 || next <= 0.02) continue;
    const yy = height / 2 + y * Math.cos(angle) * scale / divisor;
    const hh = (y + 1) * Math.cos(angle) * scale / next - y * Math.cos(angle) * scale / divisor;
    if (yy > height || yy + hh < 0) continue;
    const ww = plane.width / 2 * scale / divisor;
    ctx.drawImage(plane, 0, row, plane.width, 2, width / 2 - ww / 2, yy, ww, hh + 0.5);
  }
}
// Average shutter samples additively on a transparent buffer, avoiding the
// darkened overlapping cores produced by stacking translucent text directly.
const shutters = new WeakMap<SocialValues, { sample: HTMLCanvasElement; sum: HTMLCanvasElement }>();
function opening(ctx: CanvasRenderingContext2D, v: SocialValues, eyebrow: string, face: string, frame: number, isRush: boolean, width: number, height: number) {
  let buffers = shutters.get(v);
  if (!buffers) {
    const make = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
    buffers = { sample: make(), sum: make() }; shutters.set(v, buffers);
  }
  // Keep shutter buffers at the destination's pixel density, including exports.
  const transform = ctx.getTransform();
  const density = Math.max(1, Math.hypot(transform.a, transform.b), Math.hypot(transform.c, transform.d));
  width = Math.ceil(width * density) / density;
  height = Math.ceil(height * density) / density;
  for (const canvas of [buffers.sample, buffers.sum]) {
    if (canvas.width !== Math.ceil(width * density) || canvas.height !== Math.ceil(height * density)) { canvas.width = Math.ceil(width * density); canvas.height = Math.ceil(height * density); }
  }
  const target = buffers.sample.getContext('2d')!, sum = buffers.sum.getContext('2d')!;
  target.setTransform(density, 0, 0, density, 0, 0);
  sum.setTransform(density, 0, 0, density, 0, 0);
  sum.clearRect(0, 0, width, height); sum.globalCompositeOperation = 'lighter';
  const samples = isRush ? 20 : 12; sum.globalAlpha = 1 / samples;
  for (let i = 0; i < samples; i++) {
    const f = Math.max(isRush ? 0 : 18, Math.min(isRush ? 17.999 : 40.999, frame + (i / (samples - 1) - .5) * .8));
    target.clearRect(0, 0, width, height); target.save(); target.textBaseline = 'alphabetic'; target.textAlign = 'left'; target.fillStyle = text(v, 'inkColor', '#ffffff');
    const metric = line(target, eyebrow, 41.6, -.0666, W * .55, face);
    if (isRush) rush(target, v, eyebrow, metric.size, face, f, width, height);
    else {
      const scale = 1 + .53 * (1 - settle(f - 18, 18, .7605));
      target.translate(width / 2, height / 2 + 11.87); target.scale(scale, scale);
      let x = -metric.width / 2;
      Array.from(eyebrow).forEach((ch, index) => {
        const t = f - 35 - index * .215;
        target.fillText(ch, x + (t < 0 ? 0 : -2.1 * 3.2 ** t), 0); x += target.measureText(ch).width;
      });
    }
    target.restore(); sum.drawImage(buffers.sample, 0, 0, width, height);
  }
  ctx.drawImage(buffers.sum, 0, 0, width, height);
}
export const announceTitleArtwork: SocialArtwork = {
  width: W, height: H, responsive: true, referenceDuration: REFERENCE_DURATION, previewTime: 2.15, prepare: loadAnnounceTitleFonts,
  images: () => ({}), background: v => text(v, 'voidColor', '#100022'),
  draw(ctx, v, _images, seconds = 0, width = W, height = H) {
    const W = width, H = height;
    const f = Math.max(0, seconds * 30 * num(v, 'speed', 1)), shot = shotAt(f);
    const face = v.fontFamily === 'System' ? 'Arial' : v.fontFamily === 'Inter Tight' ? '"Inter Tight"' : '"Google Sans"';
    const eyebrow = text(v, 'eyebrow', 'Introducing'), title = text(v, 'title', 'Your next release'), tagline = text(v, 'tagline', 'A new way to bring your ideas to life.');
    ctx.save(); ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
    if (v.chipBackground !== 'Transparent') {
      const key = shot === 'rush' ? 'voidColor' : shot === 'field' ? 'fieldColor' : shot === 'paper' ? 'paperColor' : 'nightColor';
      ctx.fillStyle = text(v, key, '#000028'); ctx.fillRect(0, 0, W, H);
      if (shot === 'macro' || shot === 'close') {
        const rgb = hexToRgb(text(v, 'glowColor', '#08ff4b'));
        const glow = ctx.createRadialGradient(W / 2, H * .68, 0, W / 2, H * .68, 500);
        glow.addColorStop(0, `rgba(${rgb.join(',')},${clamp01(num(v, 'glowStrength', .139))})`); glow.addColorStop(1, 'transparent'); ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
      }
    }
    ctx.fillStyle = text(v, 'inkColor', '#ffffff');
    if (shot === 'rush' || shot === 'field') {
      opening(ctx, v, eyebrow, face, f, shot === 'rush', W, H);
    } else if (shot === 'paper') {
      const layout = block(ctx, title, 41.3, -.0563, W * .8, H * .8, face);
      let index = 0; ctx.fillStyle = text(v, 'titleColor', '#4800c9');
      layout.rows.forEach((words, row) => {
        let x = (W - ctx.measureText(words.join(' ')).width) / 2;
        const y = H / 2 + 15.4 + (row - (layout.rows.length - 1) / 2) * layout.lineHeight;
        words.forEach((word, i) => { const value = (i ? ' ' : '') + word, e = titleEntry(index++, layout.count), t = f - e.at;
          if (t >= 0) { ctx.globalAlpha = 1 - (1 - e.pop) * .79 ** t; ctx.fillText(value, x + e.travel * (1 - settle(t, 30, .82)), y); }
          x += ctx.measureText(value).width;
        });
      });
    } else if (shot === 'macro') {
      line(ctx, tagline, 487, -.015, Infinity, face);
      const pan = macroPan(f), rows = textLines(tagline);
      rows.forEach((words, row) => { const value = words.join(' '); ctx.fillText(value, W / 2 + pan - ctx.measureText(value).width * .505, H / 2 + 122 + (row - (rows.length - 1) / 2) * 487 * 1.25); });
      mark(ctx, v, W / 2 + 164 - pan, H / 2 + 60, 802 * 1.255 * num(v, 'symbolScale', 1), 2.9 * (f - 90) - 50);
    } else {
      const layout = block(ctx, tagline, 35, -.015, W * .88, H * .8, face);
      const slide = -417 * (1 - settle(f - 110, 30, .792));
      ctx.fillStyle = text(v, 'taglineColor', '#f2f8ff'); let index = 0;
      layout.rows.forEach((words, row) => {
        let x = (W - ctx.measureText(words.join(' ')).width) / 2 + slide;
        const y = H / 2 + 8.5 + (row - (layout.rows.length - 1) / 2) * layout.lineHeight;
        words.forEach((word, i) => { const value = (i ? ' ' : '') + word; if (f >= taglineArrival(index++, layout.count)) ctx.fillText(value, x, y); x += ctx.measureText(value).width; });
      });
      const life = 1 - clamp01((f - 134) / 5);
      const symbolSize = 60 * num(v, 'symbolScale', 1);
      mark(ctx, v, W - 20 - symbolSize / 2 + slide, H / 2 + 2, symbolSize * life, -30 * (1 - settle(f - 110, 30, .792)), life);
    }
    ctx.restore();
  },
};
