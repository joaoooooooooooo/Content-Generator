const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
require('sucrase/register');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) {
  return resolve.call(this, request.startsWith('@/') ? path.join(__dirname, '..', request.slice(2)) : request, parent, ...rest);
};


const { useSceneStore } = require('../store/useSceneStore');
const { getTemplate } = require('../templates');
const { TRACK_END, resolveTrackTime } = require('../lib/tracks');
const actions = useSceneStore.getState();
actions.setActiveTemplate('coverflow-03'); actions.setDuration(8);
const id = useSceneStore.getState().activeTrackId;
const template = getTemplate('coverflow-03');
function pose(seconds, duration) {
 const s=useSceneStore.getState(), t=s.tracks[0];
 const time=resolveTrackTime(t,seconds*s.fps,duration*s.fps);
 assert.equal(time.active,true);
 return template.transform(time.localFrame,0,t.values.count,t.values,{width:s.width,height:s.height,fps:s.fps,totalFrames:time.localTotal,duration:time.localTotal/s.fps,ease:x=>x,easedPhase:x=>x});
}
const halfway=pose(4,8);
// Reproduce the existing project's shortened layer, without selecting it again.
actions.patchTrack(id,{outFrame:157}); actions.setFrame(120); actions.setDuration(14);
let s=useSceneStore.getState(); assert.equal(s.frame,210); assert.equal(s.tracks[0].outFrame,TRACK_END);
assert.deepEqual(pose(7,14),halfway);
for(let f=0;f<420;f++) assert.equal(resolveTrackTime(s.tracks[0],f,420).active,true);
assert.notDeepEqual(pose(10,14),pose(12,14));
const end=template.transform(420,0,s.values.count,s.values,{width:s.width,height:s.height,fps:30,totalFrames:420,duration:14,ease:x=>x,easedPhase:x=>x});
assert.deepEqual(end,pose(0,14));
actions.setDuration(7); assert.equal(useSceneStore.getState().frame,105);
actions.addTrack('coverflow-03'); const second=useSceneStore.getState().activeTrackId;
actions.patchTrack(second,{inFrame:30,outFrame:150,fade:6}); actions.setDuration(14);
s=useSceneStore.getState(); const layer=s.tracks.find(t=>t.id===second);
assert.equal(layer.inFrame,30);assert.equal(layer.outFrame,150);assert.equal(layer.fade,6);
assert.equal(s.tracks[0].outFrame,210);
console.log('Duration: 8-to-14 second motion stretches, stays active, closes its loop, while timeline resizing preserves composition windows.');
