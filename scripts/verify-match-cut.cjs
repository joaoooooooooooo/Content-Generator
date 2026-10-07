const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
require('sucrase/register');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(request,parent,...rest){return resolve.call(this,request.startsWith('@/')?path.join(__dirname,'..',request.slice(2)):request,parent,...rest)};
const {connectMatchCut,newMatchCut,matchCutWindow,resolveMatchCut}=require('../lib/matchCut');
const {resolveTrackTime,TRACK_END}=require('../lib/tracks');
const {useSceneStore:store}=require('../store/useSceneStore');
const action=store.getState();
action.setActiveTemplate('social-word-gather');action.setDuration(4);action.setFps(30);
const a=store.getState().activeTrackId;
action.addTrack('chip-announce-title');const b=store.getState().activeTrackId;
const config={...newMatchCut(b,30),durationFrames:30,easing:{id:'linear'},from:{x:25,y:60,size:20},to:{x:70,y:35,size:50}};
action.setMatchCut(a,config,120);
let tracks=store.getState().tracks;
assert.equal(tracks[0].outFrame,120);assert.equal(tracks[1].inFrame,120);assert.equal(store.getState().duration,8);
const win=matchCutWindow(tracks[0],tracks[1],240);assert.deepEqual(win,{cut:120,start:105,end:135,before:15,after:15});
const near=(a,b,tol=1e-6)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b}`);
function world(p,t,w,h){const x=(p.x/100-.5)*w,y=(p.y/100-.5)*h,r=t.rotation*Math.PI/180;return {x:t.x+(x*Math.cos(r)-y*Math.sin(r))*t.scale,y:t.y+(x*Math.sin(r)+y*Math.cos(r))*t.scale,size:p.size/100*Math.min(w,h)*t.scale}}
// Both content anchors follow the same path through the cut, for different
// aspect ratios, source/target scales, offsets and rotations.
for(const [width,height] of [[1080,608],[608,1080],[1080,1080]]) {
 const pair=tracks.map((t,i)=>({...t,transform:{x:i*90,y:i*-40,scale:1+i*.3,rotation:i*17}}));
 const outgoing=resolveMatchCut(pair[0],pair,120-1e-8,240,width,height);
 const incoming=resolveMatchCut(pair[1],pair,120,240,width,height);
 const left=world(config.from,outgoing,width,height),right=world(config.to,incoming,width,height);
 for(const key of ['x','y','size'])near(left[key],right[key]);
 for(const [i,f] of [[0,105],[1,134]]) {const p=resolveMatchCut(pair[i],pair,f,240,width,height);for(const key of ['x','y','scale','rotation'])near(p[key],pair[i].transform[key]);}
 const preview=[];
 for(let f=0;f<240;f++) {
   const active=pair.filter(t=>resolveTrackTime(t,f,240).active);
   assert.equal(active.length,1,'No blank or double frame at a cut');
   preview.push(resolveMatchCut(active[0],pair,f,240,width,height));
 }
 const restored=JSON.parse(JSON.stringify(pair));
 const exported=Array.from({length:240},(_,f)=>{const t=restored.find(t=>resolveTrackTime(t,f,240).active);return resolveMatchCut(t,restored,f,240,width,height)});
 assert.deepEqual(exported,preview,'Export uses the same deterministic match as preview');
}
assert.equal(resolveMatchCut(tracks[0],tracks,104,240,1080,608),null);
assert.equal(resolveMatchCut(tracks[1],tracks,135,240,1080,608),null);
const curved=tracks.map((t,i)=>i? t : {...t,matchCut:{...config,easing:{id:'custom',bezier:[.8,0,.9,1]}}});
assert.notDeepEqual(resolveMatchCut(tracks[0],tracks,115,240,1080,608),resolveMatchCut(curved[0],curved,115,240,1080,608));
assert.equal(matchCutWindow(tracks[0],{...tracks[1],inFrame:121},240),null);
assert.equal(resolveMatchCut(tracks[0],[tracks[0],{...tracks[1],visible:false}],115,240,1080,608),null);
assert.equal(resolveMatchCut(tracks[0],[tracks[0]],115,240,1080,608),null);
assert.equal(connectMatchCut(tracks,a,{...config,targetId:a},120,240),tracks);
assert.ok(matchCutWindow({...tracks[0],matchCut:{...config,durationFrames:10000}},tracks[1],240).before<=60);
// Store lifecycle: preserve timing in seconds across FPS changes, and scale
// preserve clip and transition timing when the timeline duration changes.
action.setFps(60);tracks=store.getState().tracks;
assert.equal(tracks[0].outFrame,240);assert.equal(tracks[1].inFrame,240);assert.equal(tracks[0].matchCut.durationFrames,60);
assert.equal(tracks[1].outFrame,480);
action.setDuration(16);tracks=store.getState().tracks;
assert.equal(tracks[0].outFrame,240);assert.equal(tracks[1].inFrame,240);assert.equal(tracks[0].matchCut.durationFrames,60);
action.patchTrack(a,{outFrame:260});assert.equal(store.getState().tracks.find(t=>t.id===b).inFrame,260);
action.patchTrack(b,{inFrame:240});assert.equal(store.getState().tracks.find(t=>t.id===a).outFrame,240);
tracks=store.getState().tracks;
const saved=JSON.parse(JSON.stringify({tracks,activeTrackId:a,fps:60,duration:16}));
action.hydrate(saved);assert.deepEqual(store.getState().tracks[0].matchCut,{...config,durationFrames:60});
action.duplicateTrack(a);assert.equal(store.getState().tracks.find(t=>t.id===store.getState().activeTrackId).matchCut,undefined);
action.removeTrack(b);assert.equal(store.getState().tracks.find(t=>t.id===a).matchCut,undefined);
console.log('Match cut: anchor/scale continuity, curve, endpoints, aspect ratios, preview/export parity, invalid links, duration/FPS retiming, save/load and deletion passed.');

// A middle layer can receive one match and send another without overlapping
// transition ranges, even when both requested durations exceed its length.
const chain=[
 {...tracks[0],id:'first',inFrame:0,outFrame:80,matchCut:{...config,targetId:'middle',durationFrames:300}},
 {...tracks[1],id:'middle',inFrame:80,outFrame:160,matchCut:{...config,targetId:'last',durationFrames:300}},
 {...tracks[1],id:'last',inFrame:160,outFrame:240,matchCut:undefined},
];
const firstRange=matchCutWindow(chain[0],chain[1],240),secondRange=matchCutWindow(chain[1],chain[2],240);
assert.ok(firstRange.end<=secondRange.start);
for(let frame=0;frame<240;frame++) {
 const active=chain.filter(t=>resolveTrackTime(t,frame,240).active);assert.equal(active.length,1);
 const transform=resolveMatchCut(active[0],chain,frame,240,1080,608);
 if(transform)for(const value of Object.values(transform))assert.ok(Number.isFinite(value));
}
const replaced=connectMatchCut(chain,'first',{...config,targetId:'last'},100,240);
assert.equal(replaced[1].matchCut,undefined,'An incoming edge has only one linked source');
console.log('Chained match cuts: finite transforms, non-overlapping ranges and unique incoming links passed.');
