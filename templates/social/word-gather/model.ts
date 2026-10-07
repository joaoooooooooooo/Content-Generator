// Adapted from SnapCN Word Gather (MIT); see LICENSE.snapcn.txt.
export const REF_W = 710;
export const REF_H = 388;
export const CENTRE_X = REF_W / 2;

export const LINE_CX = REF_W / 2 - 3.53;
export const CENTRE_Y = REF_H / 2;

export const RADIUS = 5.5;

export const END = 49;

export const BEATS = 39;
export const BEAT: readonly Pt[] = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [6, 5],
  [7, 6],
  [8, 7],
  [9, 8],
  [10, 9],
  [12, 10],
  [13, 11],
  [14, 12],
  [15, 13],
  [17, 14],
  [18, 15],
  [19, 16],
  [20, 17],
  [22, 18],
  [23, 19],
  [24, 20],
  [26, 21],
  [27, 22],
  [28, 23],
  [29, 24],
  [31, 25],
  [32, 26],
  [33, 27],
  [34, 28],
  [35, 29],
  [37, 30],
  [38, 31],
  [39, 32],
  [41, 33],
  [42, 34],
  [43, 35],
  [44, 36],
  [45, 37],
  [47, 38],
  [48, 39],
];

export type Pt = readonly [number, number];

export function track(table: readonly Pt[], at: number): number {
  const first = table[0];
  const last = table[table.length - 1];
  if (!first || !last) return 0;
  if (at <= first[0]) return first[1];
  if (at >= last[0]) return last[1];
  for (let i = 0; i < table.length - 1; i++) {
    const a = table[i];
    const b = table[i + 1];
    if (!a || !b) break;
    if (at <= b[0]) {
      const t = (at - a[0]) / (b[0] - a[0]);
      return a[1] + (b[1] - a[1]) * t;
    }
  }
  return last[1];
}

export const CAP = 35.82;
export const LINE_H = 48.18;

export const DROP = 5.77;

export const CAP_RATIO = 0.74909;

export const ASC = 0.9527;
export const LEADING = 1.2103;
export const TRACKING = -0.055;

export const SPACE_TRIM = -0.0549;

export const FIRST_AT = 20;
export const STAGGER = 1;

export const SETTLE = 4;

export const LEAD_RISE = 20.6;

export const TRAVEL: readonly Pt[] = [
  [0, 0],
  [1, 0.391],
  [2, 0.563],
  [3, 0.686],
  [4, 0.77],
  [5, 0.836],
  [6, 0.887],
  [7, 0.928],
  [8, 0.96],
  [9, 0.982],
  [10, 0.991],
  [12, 0.996],
  [14, 1],
];

export const LEAD_X: readonly Pt[] = [
  [10, 0],
  [11, 0.004],
  [12, 0.007],
  [13, 0.02],
  [14, 0.036],
  [15, 0.063],
  [16, 0.107],
  [17, 0.18],
  [18, 0.317],
  [19, 0.547],
  [20, 0.701],
  [21, 0.793],
  [22, 0.852],
  [23, 0.892],
  [24, 0.921],
  [25, 0.946],
  [26, 0.959],
  [27, 0.97],
  [28, 0.98],
  [29, 0.99],
  [30, 0.992],
  [31, 1],
];

export const LEAD_Y: readonly Pt[] = [
  [0, 0],
  [1, 0.131],
  [2, 0.211],
  [3, 0.27],
  [4, 0.329],
  [5, 0.35],
  [6, 0.391],
  [7, 0.411],
  [8, 0.4341],
  [9, 0.47],
  [10, 0.514],
  [11, 0.612],
  [12, 0.817],
  [13, 0.905],
  [14, 0.949],
  [15, 0.985],
  [16, 1],
];

export const SCALE: readonly Pt[] = [
  [0, 1.289],
  [18, 1.289],
  [19, 1.2798],
  [20, 1.2782],
  [21, 1.2727],
  [22, 1.264],
  [23, 1.2546],
  [24, 1.2414],
  [25, 1.2184],
  [26, 1.159],
  [27, 1.0689],
  [28, 1.0417],
  [29, 1.0275],
  [30, 1.0193],
  [31, 1.0132],
  [32, 1.0081],
  [33, 1.0064],
  [34, 1],
  [BEATS, 1],
];

export const SCATTER: readonly Pt[] = [
  [44.4, -59.2],
  [73.8, -1],
  [-31.7, -1.7],
  [12.4, 41],
  [96.2, -1.7],
];

export const ORDER: readonly number[] = [5, 3, 1, 4, 2];

export function dropOrder(n: number): number[] {
  const out: number[] = [];
  const seen = new Set<number>();
  const take = (i: number) => {
    if (i >= 1 && i <= n && !seen.has(i)) {
      seen.add(i);
      out.push(i);
    }
  };
  for (const seed of ORDER) take(seed <= n ? seed : ((seed - 1) % n) + 1);
  for (let i = 1; i <= n; i++) take(i);
  return out;
}

export function orderAt(k: number, n: number): number {
  return dropOrder(n)[k] ?? k + 1;
}

const MEASURE_FALLBACK = 0.52;

export function measureWords(
  words: string[],
  fontSize: number,
  weight: number,
  face: string,
): { widths: number[]; space: number } {
  const guess = {
    widths: words.map((w) => w.length * fontSize * MEASURE_FALLBACK),
    space: fontSize * 0.26,
  };
  if (typeof document === "undefined") return guess;
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return guess;
  ctx.font = `${weight} ${fontSize}px ${face}`;
  return {
    widths: words.map((w) => ctx.measureText(w).width),
    space: ctx.measureText(" ").width,
  };
}

export type Slot = { x: number; baseline: number };

export function solve(
  widths: number[],
  space: number,
  maxWidth: number,
): Slot[] {
  const lines: number[][] = [[]];
  let run = 0;
  for (let i = 0; i < widths.length; i++) {
    const w = widths[i] ?? 0;
    const line = lines[lines.length - 1] as number[];
    const add = (line.length ? space : 0) + w;
    if (line.length > 0 && run + add > maxWidth) {
      lines.push([i]);
      run = w;
    } else {
      line.push(i);
      run += add;
    }
  }
  const top = CENTRE_Y + CAP / 2 + DROP - ((lines.length - 1) * LINE_H) / 2;
  const out: Slot[] = [];
  lines.forEach((line, k) => {
    let total = 0;
    for (const i of line) total += widths[i] ?? 0;
    total += space * (line.length - 1);
    let x = LINE_CX - total / 2;
    for (const i of line) {
      out[i] = { x, baseline: top + k * LINE_H };
      x += (widths[i] ?? 0) + space;
    }
  });
  return out;
}


export function beatAt(seconds: number, speed = 1) {
  const frame = Math.max(0, seconds * 30 * speed);
  return frame > 48 ? 39 + (frame - 48) * 0.8 : track(BEAT, frame);
}
