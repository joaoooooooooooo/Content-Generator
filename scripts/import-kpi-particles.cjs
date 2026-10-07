// One-time adapter for a supplied Framer ParticleCloud source file.
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(process.argv[2], 'utf8');
const start = source.indexOf('addPropertyControls(ParticleCloud, {');
let schema;
vm.runInNewContext(source.slice(start), {
  ParticleCloud: {},
  ControlType: Object.fromEntries(['Enum', 'Object', 'Number', 'Color', 'Boolean', 'String'].map(k => [k, k])),
  addPropertyControls: (_, value) => { schema = value; },
});
const groups = Object.entries(schema).map(([group, def]) => ({
  key: group, label: def.title,
  controls: Object.entries(def.controls || { value: def }).map(([key, item]) => ({
    key: def.controls ? `${group}.${key}` : group, label: item.title,
    type: ({ Enum: 'select', Number: 'slider', Color: 'color', Boolean: 'toggle', String: 'text' })[item.type],
    default: item.type === 'Boolean' ? (item.defaultValue ? 'On' : 'Off') : item.defaultValue,
    ...(item.type === 'Boolean' ? { options: ['On', 'Off'] } : item.options ? { options: item.options } : {}),
    ...(item.min !== undefined ? { min: item.min, max: item.max, step: item.step } : {}),
    ...(group === 'material' && key === 'backgroundColor' ? { visibleWhen: { key: 'material.transparentBackground', equals: 'Off' } } : {}),
  })),
}));
fs.mkdirSync('templates/social/kpi', { recursive: true });
fs.writeFileSync('templates/social/kpi/controls.ts', `import type { ControlDef } from '@/lib/types';\n\n// Original Framer control ranges and defaults; the KPI preset overrides appearance.\nexport const particleControlGroups: { key: string; label: string; controls: ControlDef[] }[] = [\n${groups.map(g => `  { key: '${g.key}', label: '${g.label}', controls: [\n${g.controls.map(c => '    ' + JSON.stringify(c) + ',').join('\n')}\n  ] },`).join('\n')}\n];\n`);
let geometry = source.slice(source.indexOf('function createPositions('), start);
geometry = geometry.replace('function createPositions(shapeType: string, count: number)', 'export function createPositions(shapeType: string, count: number)');
geometry = geometry.replace('    switch (shapeType)', '    seed = 73421\n    switch (shapeType)').replaceAll('Math.random()', 'random()');
fs.writeFileSync('templates/social/kpi/geometry.ts', `// Shape equations from the supplied ParticleCloud; seeded for repeatable frames.\nlet seed = 73421;\nfunction random() { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }\n\n${geometry}`);
