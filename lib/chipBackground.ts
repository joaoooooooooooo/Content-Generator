import { getTemplate } from '@/templates';
import type { SceneState } from '@/store/useSceneStore';

// A standalone transparent chip must also clear the editor's scene backdrop.
// Layered compositions retain their independently configured scene background.
export function sceneBackgroundAlpha(s: Pick<SceneState, 'tracks' | 'background'>): number {
  const track = s.tracks.length === 1 ? s.tracks[0] : undefined;
  if (track && getTemplate(track.templateId)?.meta.group === 'Motion Chips' && track.values.chipBackground === 'Transparent') return 0;
  return s.background.alpha ?? 100;
}
