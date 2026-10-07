import type { ControlDef, Template } from '@/lib/types';
import { MAX_MESSAGES, defaultArrival, defaultOpening } from './model';

const text = ['Launch video by Thursday?', 'We have nothing shot.', 'Already done.', 'Built it out of snapcn.'];
export const messageControls: ControlDef[][] = Array.from({ length: MAX_MESSAGES }, (_, index) => {
  const prefix = 'message' + (index + 1) + '.';
  return [
    { key: prefix + 'author', label: 'Name', type: 'text', default: index < 2 ? 'rhea' : 'sam' },
    { key: prefix + 'timestamp', label: 'Timestamp', type: 'text', default: index < 2 ? '9:41 AM' : '9:42 AM' },
    { key: prefix + 'avatar', label: 'Avatar', type: 'upload', default: '/social/channel-thread/' + (index < 2 ? 'rhea' : 'sam') + '.jpg' },
    { key: prefix + 'text', label: 'Message', type: 'text', default: text[index] ?? 'Your next message.' },
    { key: prefix + 'opens', label: 'Row opens', type: 'slider', min: 0, max: 60, step: 0.01, unit: 's', default: defaultOpening(index) },
    { key: prefix + 'at', label: 'Words arrive', type: 'slider', min: 0, max: 60, step: 0.01, unit: 's', default: defaultArrival(index) },
  ];
});
export const socialChannelThread: Template = {
  meta: { id: 'social-channel-thread', name: 'Channel Thread', group: 'Motion Chips', kind: 'social-motion', socialRenderer: 'canvas',
    socialSize: { width: 1280, height: 720 }, defaultDuration: 4, isNew: true },
  controls: [
    { key: 'chipBackground', label: 'Layer background', type: 'toggle', options: ['Solid', 'Transparent'], default: 'Solid' },
    { key: 'postTheme', label: 'Post theme', type: 'toggle', options: ['Light', 'Dark'], default: 'Dark' },
    { key: 'fontFamily', label: 'Typeface', type: 'select', options: ['Barlow', 'Inter Tight', 'System'], default: 'Barlow' },
    { key: 'speed', label: 'Playback speed', type: 'slider', min: 0, max: 3, step: 0.05, unit: '×', default: 1 },
    { key: 'zoom', label: 'Thread scale', type: 'slider', min: 50, max: 150, step: 1, unit: '%', default: 100 },
    { key: 'fontSize', label: 'Text size', type: 'slider', min: 16, max: 44, step: 0.1, unit: 'px', default: 31.2 },
    { key: 'lineSpacing', label: 'Line spacing', type: 'slider', min: 0.7, max: 1.6, step: 0.05, unit: '×', default: 1 },
    { key: 'showAvatars', label: 'Avatars', type: 'toggle', options: ['On', 'Off'], default: 'On' },
    { key: 'showTimestamps', label: 'Timestamps', type: 'toggle', options: ['On', 'Off'], default: 'On' },
    { key: 'showTyping', label: 'Typing dots', type: 'toggle', options: ['On', 'Off'], default: 'On' },
    { key: 'autoScroll', label: 'Auto scroll', type: 'toggle', options: ['On', 'Off'], default: 'On' },
    { key: 'scrollSpeed', label: 'Scroll speed', type: 'slider', min: 0.25, max: 3, step: 0.05, unit: '×', default: 1, visibleWhen: { key: 'autoScroll', equals: 'On' } },
    { key: 'scrollAnchor', label: 'Scroll anchor', type: 'slider', min: 35, max: 90, step: 1, unit: '%', default: 219.48 / 354 * 100, visibleWhen: { key: 'autoScroll', equals: 'On' } },
    { key: 'fadeHistory', label: 'Fade older messages', type: 'toggle', options: ['On', 'Off'], default: 'On' },
    { key: 'palette', label: 'Colors', type: 'select', options: ['Theme', 'Custom'], default: 'Theme' },
    ...[
      ['backgroundColor', 'Background', '#070a09'], ['textColor', 'Text', '#f5f5f5'],
      ['timestampColor', 'Timestamp', '#989a99'], ['accentColor', 'Avatar accent', '#77c9a8'],
    ].map(([key, label, value]): ControlDef => ({ key, label, type: 'color', default: value, visibleWhen: { key: 'palette', equals: 'Custom' } })),
    { key: 'messageCount', label: 'Messages', type: 'slider', min: 1, max: MAX_MESSAGES, step: 1, default: 4 },
    ...messageControls.flat(),
  ],
  layerCount: () => 0,
  mediaCount: () => 0,
  transform: () => ({ x: 0, y: 0, scale: 1, rotation: 0, alpha: 1, depth: 0 }),
};
