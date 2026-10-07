import { resolveEasing, type EasingSpec } from './easing';
import { trackWindow, type MotionTrack, type TrackTransform } from './tracks';

// Coordinates are percentages of the untransformed layer canvas; size is a
// percentage of its shorter edge. They survive aspect and export size changes.
export interface MatchPoint { x: number; y: number; size: number }
export interface MatchCut {
  targetId: string;
  durationFrames: number;
  easing: EasingSpec;
  from: MatchPoint;
  to: MatchPoint;
}
export const DEFAULT_MATCH_POINT: MatchPoint = { x: 50, y: 50, size: 100 };
export function newMatchCut(targetId: string, fps: number): MatchCut {
  return { targetId, durationFrames: Math.max(2, Math.round(fps * .6)),
    easing: { id: 'custom', bezier: [.42, 0, .58, 1] },
    from: { ...DEFAULT_MATCH_POINT }, to: { ...DEFAULT_MATCH_POINT } };
}

export function matchCutWindow(source: MotionTrack, target: MotionTrack, total: number) {
  const config = source.matchCut;
  if (!config || config.targetId !== target.id || source.id === target.id) return null;
  const a = trackWindow(source, total), b = trackWindow(target, total);
  if (a.outFrame !== b.inFrame || a.length < 2 || b.length < 2) return null;
  const duration = Math.max(2, Math.round(config.durationFrames));
  if (!Number.isFinite(duration)) return null;
  // Half a window per edge leaves room for another match cut on that layer.
  const before = Math.min(Math.floor(duration / 2), Math.floor(a.length / 2));
  const after = Math.min(Math.ceil(duration / 2), Math.floor(b.length / 2));
  return { cut: b.inFrame, start: b.inFrame - before, end: b.inFrame + after, before, after };
}

/** Align the pair atomically. No duration changes or overlapping clip windows. */
export function connectMatchCut(tracks: MotionTrack[], sourceId: string, config: MatchCut, cut: number, total: number): MotionTrack[] {
  const source = tracks.find(t => t.id === sourceId), target = tracks.find(t => t.id === config.targetId);
  if (!source || !target || source === target || !Number.isFinite(cut)) return tracks;
  const a = trackWindow(source, total), b = trackWindow(target, total);
  const min = a.inFrame + 2, max = b.outFrame - 2;
  if (min > max) return tracks;
  const boundary = Math.max(min, Math.min(max, Math.round(cut)));
  return tracks.map(track => {
    // Only one outgoing layer can be linked to an incoming edge.
    const clean = track.matchCut?.targetId === target.id ? { ...track, matchCut: undefined } : track;
    if (track.id === sourceId) return { ...clean, outFrame: boundary, matchCut: config };
    if (track.id === target.id) return { ...clean, inFrame: boundary };
    return clean;
  });
}

function pointInScene(point: MatchPoint, transform: TrackTransform, width: number, height: number) {
  const x = (point.x / 100 - .5) * width, y = (point.y / 100 - .5) * height;
  const angle = transform.rotation * Math.PI / 180, c = Math.cos(angle), s = Math.sin(angle);
  return { x: transform.x + (x * c - y * s) * transform.scale,
    y: transform.y + (x * s + y * c) * transform.scale,
    size: Math.max(.001, point.size * Math.min(width, height) / 100 * transform.scale) };
}

/** Shared deterministic path for preview, scrubbing and every export frame. */
export function resolveMatchCut(track: MotionTrack, tracks: MotionTrack[], frame: number, total: number, width: number, height: number): TrackTransform | null {
  for (const source of tracks) {
    const config = source.matchCut;
    if (!config || (source.id !== track.id && config.targetId !== track.id)) continue;
    const target = tracks.find(t => t.id === config.targetId);
    if (!target || !source.visible || !target.visible || source.opacity <= 0 || target.opacity <= 0) continue;
    const window = matchCutWindow(source, target, total);
    if (!window || frame < window.start || frame >= window.end) continue;
    const outgoing = frame < window.cut;
    if ((outgoing ? source.id : target.id) !== track.id) continue;
    const from = pointInScene(config.from, source.transform, width, height);
    const to = pointInScene(config.to, target.transform, width, height);
    const progress = (frame - window.start) / Math.max(1, window.end - window.start - 1);
    const eased = resolveEasing(config.easing)(progress);
    const x = from.x + (to.x - from.x) * eased, y = from.y + (to.y - from.y) * eased;
    const size = Math.exp(Math.log(from.size) + (Math.log(to.size) - Math.log(from.size)) * eased);
    const point = outgoing ? config.from : config.to;
    const scale = Math.max(.001, Math.min(100, size / Math.max(.001, point.size * Math.min(width, height) / 100)));
    const base = { ...track.transform, x: 0, y: 0, scale };
    const offset = pointInScene(point, base, width, height);
    return { ...base, x: x - offset.x, y: y - offset.y };
  }
  return null;
}
