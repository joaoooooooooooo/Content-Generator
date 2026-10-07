import features from '../features.json';
import { common, placement, template } from '../shared';
export const featureTemplates = features.map(feature => template(`moonvine-${feature.value}`, feature.label, 'Features', [
  ...common,
  { key: 'feature', label: 'Report feature', type: 'select', options: features.filter(f => f.value !== 'paid').map(f => f.value), optionLabels: Object.fromEntries(features.map(f => [f.value, f.label])), default: feature.value },
  { key: 'scenario', label: 'Report scenario (sample data)', type: 'select', options: ['typical', 'growth', 'decline', 'busy', 'empty'], optionLabels: { typical: 'Typical · Apta Agency', growth: 'Growth · Superside', decline: 'Decline · Curio Digital', busy: 'Busy · Instrument', empty: 'Empty · Hlabs' }, default: 'typical' },
  { key: 'heading', label: 'Heading', type: 'text', multiline: true, default: 'A small to medium heading can go right here' },
  { key: 'tagline', label: 'Tagline', type: 'text', default: 'Your brand, in perspective.' },
  { key: 'headingSize', label: 'Heading size', type: 'slider', min: 20, max: 120, step: 1, default: 68, unit: 'px' },
  { key: 'taglineSize', label: 'Tagline size', type: 'slider', min: 10, max: 52, step: 1, default: 28, unit: 'px' },
  { key: 'logoSize', label: 'Logo size', type: 'slider', min: 80, max: 320, step: 1, default: 180, unit: 'px' },
  ...placement,
]));
