const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
require('sucrase/register');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) {
  return resolve.call(this, request.startsWith('@/') ? path.join(__dirname, '..', request.slice(2)) : request, parent, ...rest);
};
const { templateList, defaultsFor } = require('../templates');
const { socialProperties } = require('../lib/socialProperties');
const { createPositions } = require('../templates/social/kpi/geometry');
const { particleControlGroups } = require('../templates/social/kpi/controls');
const timing = { duration: 12, fps: 30, width: 1080, height: 1312, easing: { id: 'linear' } };
for (const template of templateList.filter(t => t.meta.group === 'Social')) {
  const values = defaultsFor(template.meta.id);
  const snapshot = socialProperties(template, values, timing);
  assert.equal(snapshot.templateId, template.meta.id);
  assert.equal(snapshot.timing?.duration, template.meta.kind === 'social-motion' ? 12 : undefined);
  assert.deepEqual(JSON.parse(JSON.stringify(snapshot)), snapshot);
  for (const def of template.controls) {
    const keys = def.key.split('.');
    let copied = snapshot.properties;
    for (const key of keys) copied = copied[key];
    assert.deepEqual(copied, def.type === 'toggle' && def.options?.join(',') === 'On,Off' ? values[def.key] === 'On' : values[def.key], def.key);
  }
}
const kpi = templateList.find(t => t.meta.id === 'social-kpi');
const values = defaultsFor(kpi.meta.id);
const changed = socialProperties(kpi, { ...values, metric: '98%', 'shape.type': 'Box', 'material.opacity': 0 }, timing);
assert.equal(changed.properties.metric, '98%');
assert.equal(changed.properties.shape.type, 'Box');
assert.equal(changed.properties.material.opacity, 0);
assert.equal(new Set(kpi.controls.map(c => c.key)).size, kpi.controls.length);
const shapes = particleControlGroups.find(g => g.key === 'shape').controls.find(c => c.key === 'shape.type').options;
for (const shape of shapes) {
  const a = createPositions(shape, 500);
  createPositions('Box', 700); // another instance cannot affect the seed
  const b = createPositions(shape, 500);
  assert.deepEqual(a, b, shape + ' must reproduce the same geometry');
  assert.equal(a.length, 1500);
  assert.ok(a.every(Number.isFinite));
}
console.log('Social KPI: all 8 shapes are deterministic; all social properties round-trip, including nested controls and zero values.');
