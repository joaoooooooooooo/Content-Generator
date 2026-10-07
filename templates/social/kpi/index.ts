import type { Template } from '@/lib/types';
import { particleControlGroups } from './controls';

// Reference image: 1982 × 2408, with the copy inset at 29% of the post width.
const appearance: Record<string, string | number> = {
  'shape.type': 'Torus', 'shape.particleCount': 1500,
  'material.particleColor': '#777777', 'material.opacity': 0.65,
  'material.particleSize': 0.09, 'material.backgroundColor': '#000000',
  'fog.color': '#000000', 'fog.near': 5, 'fog.far': 18,
  'camera.z': 11, 'camera.fov': 60, 'transform.scale': 1.35,
  'layout.horizontalOverflowVisible': 'Off',
  'orbit.autoRotateSpeed': 0.3, 'exportOptions.showButton': 'Off',
};
export const socialKpi: Template = {
  meta: { id: 'social-kpi', name: 'KPI Particles', group: 'Social', kind: 'social-motion', socialRenderer: 'particles', isNew: true, socialSize: { width: 1080, height: 1312 } },
  controls: [
    { key: 'postTheme', label: 'Post theme', type: 'toggle', options: ['Light', 'Dark'], default: 'Dark' },
    { key: 'metric', label: 'Metric', type: 'text', default: '20+' },
    { key: 'description', label: 'Metric description', type: 'text', multiline: true, default: 'Small heading\nabout the kpi goes\nright here' },
    { key: 'metricSize', label: 'Metric size', type: 'slider', min: 40, max: 240, step: 1, default: 116, unit: 'px' },
    { key: 'descriptionSize', label: 'Description size', type: 'slider', min: 20, max: 100, step: 1, default: 58, unit: 'px' },
    { key: 'textX', label: 'Text X', type: 'slider', min: 0, max: 80, step: 1, default: 29, unit: '%' },
    { key: 'textY', label: 'Text Y', type: 'slider', min: 0, max: 80, step: 0.1, default: 33.8, unit: '%' },
    { key: 'textWidth', label: 'Text width', type: 'slider', min: 10, max: 100, step: 1, default: 49, unit: '%' },
    { key: 'speed', label: 'Playback speed', type: 'slider', min: 0, max: 3, step: 0.05, default: 1, unit: '×' },
    ...particleControlGroups.flatMap(group => group.controls.map(control => ({ ...control, default: appearance[control.key] ?? control.default }))),
    ...['X', 'Y', 'Z'].map(axis => ({ key: 'camera.target' + axis, label: 'Target ' + axis, type: 'slider' as const, min: -40, max: 40, step: 0.1, default: 0 })),
  ],
  layerCount: () => 0,
  mediaCount: () => 0,
  transform: () => ({ x: 0, y: 0, scale: 1, rotation: 0, alpha: 1, depth: 0 }),
};
