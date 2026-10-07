import { TRACK_END, type MotionTrack } from './tracks';

// Once a scene contains multiple clips, no clip follows the scene end.
export function fixedClipWindows(tracks: MotionTrack[], totalFrames: number): MotionTrack[] {
  return tracks.map(track => track.outFrame === TRACK_END
    ? { ...track, outFrame: Math.max(track.inFrame + 1, totalFrames) } : track);
}

export function resizeClip(tracks: MotionTrack[], id: string, frames: number): MotionTrack[] {
  const clip = tracks.find(t => t.id === id);
  if (!clip) return tracks;
  const delta = Math.max(2, Math.round(frames)) - (clip.outFrame - clip.inFrame);
  // Preserve the duration of every following clip in a connected sequence.
  const following = new Set<string>();
  let source = clip;
  while (source.matchCut) {
    const target = tracks.find(t => t.id === source.matchCut!.targetId);
    if (!target || target.id === id || following.has(target.id) || target.inFrame !== source.outFrame) break;
    following.add(target.id);
    source = target;
  }
  return tracks.map(t => t.id === id ? { ...t, outFrame: t.outFrame + delta }
    : following.has(t.id) ? { ...t, inFrame: t.inFrame + delta, outFrame: t.outFrame + delta } : t);
}

export function clipsEnd(tracks: MotionTrack[]): number {
  return tracks.reduce((end, track) => Math.max(end, track.outFrame), 1);
}
