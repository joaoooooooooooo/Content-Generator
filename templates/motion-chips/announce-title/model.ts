// Adapted from SnapCN Announce Title (MIT). See LICENSE.snapcn.txt.
export const REF_W = 802;
export const REF_H = 450;
export function settle(t: number, span: number, decay: number): number {
  if (t <= 0) return 0;
  if (t >= span) return 1;
  return (1 - decay ** t) / (1 - decay ** span);
}
export function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
export function sample(table: readonly (readonly [number, number])[], p: number) {
  if (p <= table[0][0]) return table[0][1];
  const last = table[table.length - 1];
  if (p >= last[0]) return last[1];
  for (let i = 1; i < table.length; i++) {
    const [x1, y1] = table[i];
    if (p <= x1) {
      const [x0, y0] = table[i - 1];
      return y0 + ((y1 - y0) * (p - x0)) / (x1 - x0);
    }
  }
  return last[1];
}
export const MARK_PATH =
  "M15.757 15.459c-3.324 0.816 -6.07 2.966 -7.563 5.911 -1.194 2.388 -1.174 1.672 -1.174 24.66 0 19.982 0.02 21.077 0.378 22.132 0.955 2.926 2.946 4.498 6.588 5.215 1.99 0.398 2.528 0.657 3.702 1.732 1.055 0.975 1.473 2.169 1.473 4.219 0.02 2.408 0.836 3.901 2.647 4.856l1.035 0.537 19.505 0.06c17.574 0.06 19.624 0.02 20.739 -0.259 1.493 -0.418 2.647 -1.333 3.403 -2.766l0.537 -1.015 0.06 -6.269c0.04 -3.443 0.04 -6.807 0 -7.444l-0.06 -1.194 -0.617 0.995c-0.717 1.174 -2.01 2.289 -3.383 2.906l-0.975 0.458 -16.121 0.06c-11.763 0.04 -16.42 -0 -17.216 -0.159 -2.548 -0.557 -5.135 -2.408 -6.468 -4.657 -1.294 -2.189 -1.314 -2.548 -1.254 -16.44l0.06 -12.439 0.478 -1.154c0.876 -2.209 2.926 -4.18 5.374 -5.155l1.115 -0.458 16.519 -0.06c16.101 -0.04 16.539 -0.04 17.813 0.358 1.592 0.498 2.966 1.473 3.941 2.826l0.736 1.035 0.06 -6.648c0.06 -7.304 -0.06 -8.319 -1.115 -9.832 -0.597 -0.876 -1.95 -1.811 -3.025 -2.11 -0.438 -0.119 -9.096 -0.199 -23.386 -0.179 -18.37 0.02 -22.908 0.06 -23.804 0.279zM79.665 31.819c-6.508 3.901 -11.902 7.185 -11.981 7.304 -0.08 0.119 -0.139 5.055 -0.1 10.947l0.04 10.748 2.886 1.811c1.592 0.995 4.14 2.587 5.672 3.523 1.533 0.935 5.632 3.463 9.096 5.613 3.463 2.15 6.488 3.901 6.707 3.901 0.219 -0 0.537 -0.139 0.697 -0.318 0.279 -0.279 0.318 -2.806 0.318 -24.958 0 -15.544 -0.08 -24.839 -0.199 -25.157 -0.139 -0.398 -0.318 -0.517 -0.736 -0.517 -0.358 0.02 -4.617 2.448 -12.399 7.105z";
export const SPARK_RAMP: readonly (readonly [number, string])[] = [
  [0, "#0365f3"],
  [0.17, "#1c5cf1"],
  [0.31, "#3a54ec"],
  [0.41, "#554ce5"],
  [0.52, "#7041cb"],
  [0.62, "#9b3894"],
  [0.72, "#ca3068"],
  [0.83, "#e2284c"],
  [0.93, "#e71d32"],
  [1, "#e91927"],
];
export const PLANE_MAG: readonly (readonly [number, number])[] = [
  [2, 52.6],
  [3, 43.7],
  [4, 36.3],
  [5, 30.2],
  [6, 25.1],
  [7, 19.8],
  [8, 16.1],
  [9, 13.6],
  [10, 11.75],
  [11, 10.4],
  [12, 9.3],
  [13, 8.45],
  [14, 7.5],
  [15, 6.35],
  [16, 5.2],
  [17, 4.0],
];
export const PLANE_RAKE: readonly (readonly [number, number])[] = [
  [5, 81],
  [7, 68],
  [9, 55],
  [11, 41],
  [13, 31],
  [15, 20],
  [17, 14],
];
export const TITLE_ENTRY: readonly (readonly [number, number, number])[] = [
  [41, 143, 0.39],
  [48, 87, 0.46],
  [54, 88, 0.29],
];
export function macroPan(frame: number): number {
  const t = frame - 90;
  return -(78.8 * (1 - 0.81 ** t) + 6.03 * (1.255 ** t - 1));
}
export const TINT_RAMP: readonly (readonly [number, string])[] = [
  [0, "#8a2447"],
  [0.24, "#842647"],
  [0.33, "#722e57"],
  [0.5, "#58406d"],
  [0.66, "#434e90"],
  [0.76, "#3654ab"],
  [0.85, "#2f5ed1"],
  [1, "#3266e5"],
];
export function hexToRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export const REFERENCE_DURATION = 170 / 30;
export function shotAt(frame: number) { return frame < 18 ? 'rush' : frame < 41 ? 'field' : frame < 80 ? 'paper' : frame < 110 ? 'macro' : 'close'; }
export function titleEntry(index: number, count: number) {
 const extra = Math.max(0,index-2); const entry=TITLE_ENTRY[index-extra];
 const at=entry[0]+extra*6;
 return { at:41+(at-41)*Math.min(1,13/Math.max(13,13+Math.max(0,count-3)*6)),travel:entry[1],pop:entry[2] };
}
export function taglineArrival(index: number, count: number) { return 111.5+(count-1-index)*Math.min(2.833,24/Math.max(1,count-1)); }

