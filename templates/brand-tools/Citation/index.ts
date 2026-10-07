import { common, placement, template } from '../shared';
const artwork = [ ['orbit', 'Orbit'], ['stepper-1', 'Stepper 01'], ['stepper-2', 'Stepper 02'], ['stepper-3', 'Stepper 03'], ['stepper-4', 'Stepper 04'] ];
export const citationTemplates = artwork.map(([animation, name]) => template(
  animation === 'orbit' ? 'moonvine-citation' : `moonvine-citation-${animation}`, name, 'Citation', [
    ...common,
    { key: 'quote', label: 'Quote', type: 'text', multiline: true, default: 'The easiest way to destroy trust is to pretend certainty.' },
    { key: 'author', label: 'Author', type: 'text', default: 'Tom Conlon' },
    { key: 'attribution', label: 'Attribution', type: 'text', default: 'Moonvine' },
    { key: 'showAuthorDetails', label: 'Author details', type: 'toggle', options: ['On', 'Off'], default: 'On' },
    { key: 'animation', label: 'Artwork', type: 'select', options: artwork.map(([id]) => id), optionLabels: Object.fromEntries(artwork), default: animation },
    { key: 'quoteSize', label: 'Quote size', type: 'slider', min: 48, max: 120, step: 1, default: 98, unit: 'px' },
    { key: 'authorSize', label: 'Author size', type: 'slider', min: 20, max: 52, step: 1, default: 36, unit: 'px' },
    { key: 'attributionSize', label: 'Attribution size', type: 'slider', min: 16, max: 36, step: 1, default: 25, unit: 'px' },
    ...placement,
  ], true,
));
