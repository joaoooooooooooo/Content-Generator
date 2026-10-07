const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
require('sucrase/register');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) {
  return resolve.call(this, request.startsWith('@/') ? path.join(__dirname, '..', request.slice(2)) : request, parent, ...rest);
};
const { defaultsFor, getTemplate } = require('../templates');
const { beatAt, dropOrder, solve, track, TRAVEL } = require('../templates/social/word-gather/model');
assert.equal(getTemplate('social-word-gather').meta.socialRenderer, 'canvas');
assert.equal(defaultsFor('social-word-gather').text, 'Every scene is yours to own.');
assert.deepEqual(dropOrder(5), [5,3,1,4,2]);
for(let n=0;n<100;n++) { const order=dropOrder(n); assert.equal(new Set(order).size,n); assert.ok(order.every(i=>i>=1&&i<=n)); }
assert.equal(beatAt(0),0); assert.equal(beatAt(10,0),0); assert.equal(beatAt(1,2),beatAt(2,1));
assert.ok(beatAt(10)>100, 'Long sentences must keep arriving after the reference ends');
assert.equal(track(TRAVEL,beatAt(10)-20-49),1);
const slots=solve([100,100,100],10,220); assert.equal(slots[0].baseline,slots[1].baseline);assert.ok(slots[2].baseline>slots[1].baseline);
assert.deepEqual(solve([],10,330),[]);
console.log('Word Gather: order, long-text completion, wrapping and timing passed');
