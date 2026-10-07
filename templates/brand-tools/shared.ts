import type { ControlDef, Template } from '@/lib/types';
export const common: ControlDef[] = [
  { key: 'fontStyle', label: 'Font', type: 'toggle', options: ['Serif', 'Sans'], default: 'Serif' },
  { key: 'postTheme', label: 'Post theme', type: 'toggle', options: ['Light', 'Dark'], default: 'Dark' },
];
export const placement: ControlDef[] = [
  { key: 'artworkSize', label: 'Artwork size', type: 'slider', min: 25, max: 200, step: 1, default: 92, unit: '%' },
  { key: 'artworkPosition', label: 'Artwork position', type: 'xypad', max: 100, default: { x: 0, y: 0 }, unit: '%' },
];
export function template(id: string, name: string, group: string, controls: ControlDef[], animated = false): Template {
  return {
    meta: { id, name, group, kind: animated ? 'social-motion' : 'social', socialRenderer: 'canvas', socialSize: { width: 1080, height: 1350 }, ...(animated ? { defaultDuration: 6 } : {}) },
    controls, layerCount: () => 0, mediaCount: () => 0,
    transform: () => ({ x: 0, y: 0, scale: 1, rotation: 0, alpha: 1, depth: 0 }),
  };
}
