import type { Template } from '@/lib/types';
export const socialTest: Template = {
  meta: { id: 'social-test', name: 'Test', group: 'Social', kind: 'social', isNew: true, socialSize: { width: 1080, height: 1080 } },
  controls: [{ key: 'heading', label: 'Heading', type: 'text', default: 'Test' }],
  layerCount: () => 0,
  mediaCount: () => 0,
  transform: () => ({ x: 0, y: 0, scale: 1, rotation: 0, alpha: 1, depth: 0 }),
};
