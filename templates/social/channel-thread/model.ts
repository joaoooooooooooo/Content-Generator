// Layout and measured motion adapted from SnapCN Channel Thread (MIT).
// Copyright (c) 2026 Sri Nath (snap-cn). See LICENSE.snapcn.txt.
import type { SocialValues } from '../types';

export const MAX_MESSAGES = 12;
export const REF_W = 638;
export const REF_H = 354;
export const NAME_GAP = 37.59;
export const MSG_GAP = 46.01;
export const GROUP_GAP = 69;
export const START_Y = 158.9;
export const ANCHOR = 219.48;
export const AVATAR = 70;
export const AVATAR_X = 119.5;
export const AVATAR_RISE = 28;
export const TEXT_X = 202;
export const SIZE = 31.2;
export const TIME_SIZE = 24.9;
export const SCROLL: readonly (readonly [number, number])[] = [
  [0, 0], [0.0167, 0.004], [0.05, 0.016], [0.0833, 0.044], [0.1167, 0.093],
  [0.15, 0.178], [0.1833, 0.289], [0.2167, 0.398], [0.25, 0.486], [0.2833, 0.557],
  [0.3167, 0.616], [0.35, 0.663], [0.3833, 0.702], [0.4167, 0.737], [0.45, 0.767],
  [0.4833, 0.791], [0.5167, 0.814], [0.55, 0.834], [0.5833, 0.852], [0.6167, 0.867],
  [0.65, 0.881], [0.6917, 0.893], [0.7167, 0.903], [0.75, 0.912], [0.7833, 0.919], [1.1, 1],
];
export const FADE: readonly (readonly [number, number])[] = [
  [10, 0.098], [25, 0.125], [40, 0.149], [55, 0.216], [70, 0.357],
  [85, 0.518], [100, 0.651], [115, 0.843], [140, 0.98], [175, 1],
];
export function read(table: readonly (readonly [number, number])[], x: number) {
  if (x <= table[0][0]) return table[0][1];
  for (let i = 1; i < table.length; i++) {
    const [end, value] = table[i], [start, previous] = table[i - 1];
    if (x <= end) return previous + (value - previous) * (x - start) / (end - start);
  }
  return table[table.length - 1][1];
}
export function numberValue(values: SocialValues, key: string, fallback: number) {
  const n = Number(values[key] ?? fallback); return Number.isFinite(n) ? n : fallback;
}
export function messageCount(values: SocialValues) {
  return Math.max(1, Math.min(MAX_MESSAGES, Math.round(numberValue(values, 'messageCount', 4))));
}
export function defaultArrival(index: number) { return ([0, 12, 60, 84][index] ?? 84 + (index - 3) * 24) / 30; }
export function defaultOpening(index: number) { return ([0, 12, 37, 72][index] ?? 72 + (index - 3) * 24) / 30; }
export const MESSAGE_FIELDS = ['author', 'timestamp', 'avatar', 'text', 'at', 'opens'] as const;
export interface ThreadMessage {
  id: number; author: string; timestamp: string; avatar: string; text: string; at: number; opens: number;
}
export interface ThreadLine extends ThreadMessage { y: number; nameY: number; head: boolean; }

export function threadMessages(values: SocialValues): ThreadMessage[] {
  const messages: ThreadMessage[] = [];
  let lastArrival = 0;
  for (let index = 0; index < messageCount(values); index++) {
    const key = 'message' + (index + 1) + '.';
    const text = String(values[key + 'text'] ?? '').trim().replace(/\s*\n\s*/g, ' ');
    if (!text) continue;
    // Keep hand-edited timings chronological, including opens <= arrival.
    const at = Math.max(lastArrival, numberValue(values, key + 'at', defaultArrival(index)), 0);
    const opens = Math.max(lastArrival, Math.min(at, numberValue(values, key + 'opens', defaultOpening(index))));
    messages.push({ id: index + 1, text, author: String(values[key + 'author'] ?? ''),
      timestamp: String(values[key + 'timestamp'] ?? ''), avatar: String(values[key + 'avatar'] ?? ''), at, opens });
    lastArrival = at;
  }
  return messages;
}
export function threadLayout(values: SocialValues): ThreadLine[] {
  const messages = threadMessages(values);
  const lines: ThreadLine[] = [];
  let last = START_Y - NAME_GAP;
  const spacing = Math.max(0.5, numberValue(values, 'lineSpacing', 1));
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i], previous = messages[i - 1];
    const head = !previous || message.author !== previous.author || message.timestamp !== previous.timestamp || message.avatar !== previous.avatar;
    const nameY = head ? (i === 0 ? last : last + GROUP_GAP * spacing) : 0;
    const y = head ? nameY + NAME_GAP * spacing : last + MSG_GAP * spacing;
    lines.push({ ...message, head, nameY, y }); last = y;
  }
  return lines;
}
export function scrollAt(lines: readonly ThreadLine[], seconds: number, values: SocialValues) {
  if (values.autoScroll === 'Off') return 0;
  let scroll = 0, target = 0;
  const anchor = numberValue(values, 'scrollAnchor', ANCHOR / REF_H * 100) / 100 * REF_H;
  const speed = Math.max(0.1, numberValue(values, 'scrollSpeed', 1));
  for (const line of lines) {
    const want = Math.max(0, line.y - anchor), step = want - target; target = want;
    if (step <= 0) continue;
    scroll += step * read(SCROLL, (seconds - line.opens) * (step / MSG_GAP) ** 0.68 * speed);
  }
  return scroll;
}
export function threadColors(values: SocialValues) {
  if (values.palette === 'Custom') return { background: String(values.backgroundColor ?? '#070a09'), text: String(values.textColor ?? '#f5f5f5'), muted: String(values.timestampColor ?? '#989a99'), accent: String(values.accentColor ?? '#77c9a8') };
  return values.postTheme === 'Light'
    ? { background: '#f7f7f5', text: '#171b19', muted: '#666e69', accent: '#23815e' }
    : { background: '#070a09', text: '#f5f5f5', muted: '#989a99', accent: '#77c9a8' };
}
