import type { ControlDef, Template } from '@/lib/types';
import { DEFAULT_SYMBOL } from './defaultSymbol';
import { REFERENCE_DURATION } from './model';
export const announceTitle: Template = {
  meta: { id: 'chip-announce-title', name: 'Announce Title', group: 'Motion Chips', kind: 'social-motion', socialRenderer: 'canvas', socialSize: { width: 1080, height: 608 }, defaultDuration: REFERENCE_DURATION, defaultFps: 30, defaultEasing: { id: 'linear' }, isNew: true },
  controls: [
    { key: 'chipBackground', label: 'Layer background', type: 'toggle', options: ['Solid', 'Transparent'], default: 'Solid' },
    { key: 'eyebrow', label: 'Intro text', type: 'text', default: 'Introducing' },
    { key: 'title', label: 'Title', type: 'text', multiline: true, default: 'September Wrapped' },
    { key: 'tagline', label: 'Tagline', type: 'text', multiline: true, default: 'A new way to bring \nyour ideas to life.' },
    { key: 'fontFamily', label: 'Typeface', type: 'select', options: ['Google Sans', 'Inter Tight', 'System'], default: 'Google Sans' },
    { key: 'speed', label: 'Playback speed', type: 'slider', min: 1, max: 3, step: 0.05, default: 1.1 },
    ...[
      ['voidColor', 'Opening background', '#000000'], ['fieldColor', 'Intro background', '#000000'],
      ['paperColor', 'Title background', '#000000'], ['titleColor', 'Title color', '#a7a7a7'],
      ['nightColor', 'Closing background', '#030303'], ['glowColor', 'Glow color', '#5a5a5a'],
      ['taglineColor', 'Tagline color', '#f2f8ff'], ['inkColor', 'Intro and close-up text', '#f5f5f5'],
    ].map(([key, label, value]): ControlDef => ({ key, label, type: 'color', default: value })),
    { key: 'glowStrength', label: 'Glow strength', type: 'slider', min: 0, max: 0.5, step: 0.001, default: 0.139 },
    { key: 'symbolPath', label: 'Symbol SVG or path', type: 'text', multiline: true, default: DEFAULT_SYMBOL },
    { key: 'symbolColor', label: 'Symbol color', type: 'color', default: '#ffffff' },
    { key: 'symbolScale', label: 'Symbol scale', type: 'slider', min: 0, max: 2, step: 0.05, default: 1.05 },
  ],
  layerCount: () => 0, mediaCount: () => 0,
  transform: () => ({ x: 0, y: 0, scale: 1, rotation: 0, alpha: 1, depth: 0 }),
};
