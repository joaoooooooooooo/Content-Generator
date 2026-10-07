import type { Template } from '@/lib/types';
export const socialTestimonial: Template = {
  meta: { id: 'social-testimonial', name: 'Testimonial', group: 'Social', kind: 'social', isNew: true, socialSize: { width: 1080, height: 1350 } },
  controls: [
    { key: 'postTheme', label: 'Post theme', type: 'toggle', options: ['Light', 'Dark'], default: 'Dark' },
    { key: 'heading', label: 'Testimonial', type: 'text', multiline: true, default: '"Working with Apta was fluid, collaborative and fun. They made me feel safe and understood."' },
    { key: 'headingSize', label: 'Heading size', type: 'slider', min: 40, max: 100, step: 1, unit: 'px', default: 76.002 },
    { key: 'clientSize', label: 'Client size', type: 'slider', min: 50, max: 150, step: 1, unit: '%', default: 100 },
    { key: 'showPhoto', label: 'Profile picture', type: 'toggle', options: ['On', 'Off'], default: 'On' },
    { key: 'clientName', label: 'Client name', type: 'text', default: 'Marcus Fung' },
    { key: 'clientRole', label: 'Client role', type: 'text', default: 'Executive Producer' },
    { key: 'clientPhoto', label: 'Client photo', type: 'upload', visibleWhen: { key: 'showPhoto', not: 'Off' }, default: '/social/testimonial/assets/client.png' },
  ],
  layerCount: () => 0,
  mediaCount: () => 0,
  transform: () => ({ x: 0, y: 0, scale: 1, rotation: 0, alpha: 1, depth: 0 }),
};
