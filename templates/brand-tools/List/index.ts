import type { ControlDef } from '@/lib/types';
import { common, placement, template } from '../shared';
const checklist = ['llms.txt file: found.', 'FAQs: on 9 of 10 pages checked.', 'llms.txt file: found.', 'llms.txt file: found.'];
const cards = ['LLM.txt Missing', 'FAQs: on 9 of 10 pages checked.', 'Structured data: on 10 of 10.', 'Accessibility score: 100/100.'];
export const listTemplates = ['checklist', 'cards'].map(variant => {
  const items = Array.from({ length: variant === 'cards' ? 6 : 8 }, (_, i) => (variant === 'cards' ? cards : checklist)[i] ?? `List item ${i + 1}`);
  const controls: ControlDef[] = [
    ...common,
    { key: 'itemCount', label: 'Items', type: 'slider', min: 1, max: variant === 'cards' ? 6 : 8, step: 1, default: 4 },
    { key: 'heading', label: 'Heading', type: 'text', multiline: true, default: 'The checklist, fully complete.' },
    { key: 'headingSize', label: 'Heading size', type: 'slider', min: 20, max: 140, step: 1, default: 101.41, unit: 'px' },
    ...items.flatMap((item, index): ControlDef[] => [
      { key: `item${index + 1}`, label: `Item ${index + 1}`, type: 'text', multiline: true, default: item },
      ...(variant === 'cards' ? [
        { key: `status${index + 1}`, label: `Item ${index + 1} status`, type: 'select' as const, options: ['Not Detected', 'Good shape'], default: index < 2 ? 'Not Detected' : 'Good shape' },
      ] : []),
    ]),
    ...placement,
  ];
  return template(`moonvine-list-${variant}`, variant === 'cards' ? 'List 02 - Status cards' : 'List 01 - Checklist', 'List', controls);
});
