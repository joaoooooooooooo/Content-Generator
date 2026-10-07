import type { Template } from '@/lib/types';
import { coverflowVariants } from '../../coverflow';

const ring = coverflowVariants.find((template) => template.meta.id === 'coverflow-03')!;
// Keep Coverflow Ring's own pose and loop behavior; author its placement at post scale.
const ringKeys = new Set(['count', 'cardSize', 'cornerRadius', 'speed', 'direction', 'centreGap', 'sideStep', 'turn', 'recede', 'depthScale', 'curve', 'fade']);
export const socialCoverflowRing: Template = {
  meta: { ...ring.meta, id: 'social-coverflow-ring', name: 'Coverflow Ring Post', group: 'Social', kind: 'social-motion', socialSize: { width: 1080, height: 1350 }, cardAspect: 4 / 5 },
  controls: [
    { key: 'postTheme', label: 'Post theme', type: 'toggle', options: ['Light', 'Dark'], default: 'Dark' },
    { key: 'heading', label: 'Heading', type: 'text', multiline: true, default: 'A small to medium heading can go right here' },
    { key: 'headingSize', label: 'Heading size', type: 'slider', min: 40, max: 110, step: 1, unit: 'px', default: 80 },
    ...ring.controls.filter((control) => ringKeys.has(control.key)).map((control) => ({
      ...control,
      label: control.key === 'cardSize' ? 'Card size' : control.label,
      default: control.key === 'cardSize' ? 360 : control.default,
    })),
  ],
  transform(frame, index, count, values, ctx) {
    const pose = ring.transform(frame, index, count, {
      axis: 'horizontal', shear: 55, vanish: 0, offset: { x: 0, y: 0 }, ...values,
    }, ctx);
    const scale = Math.min(ctx.width / 1080, ctx.height / 1350);
    return { ...pose, x: pose.x * scale, y: pose.y * scale + ctx.height * 0.25, scale: pose.scale * scale };
  },
};
