const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
require('sucrase/register');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) {
  return resolve.call(this, request.startsWith('@/') ? path.join(__dirname, '..', request.slice(2)) : request, parent, ...rest);
};

const {getTemplate,defaultsFor}=require('../templates');
const {shotAt,settle,titleEntry,taglineArrival,REFERENCE_DURATION}=require('../templates/motion-chips/announce-title/model');
const {announceTitleArtwork:art}=require('../templates/motion-chips/announce-title/draw');
assert.equal(getTemplate('chip-announce-title').meta.group,'Motion Chips');
assert.deepEqual([0,18,41,80,110,169].map(shotAt),['rush','field','paper','macro','close','close']);
assert.equal(settle(0,30,.82),0);assert.equal(settle(30,30,.82),1);
for(let count=1;count<80;count++)for(let i=0;i<count;i++){
 assert.ok(titleEntry(i,count).at<=54);assert.ok(taglineArrival(i,count)<=136);
}
function context(){const calls=[];const validate=(...args)=>{for(const a of args)if(typeof a==='number')assert.ok(Number.isFinite(a));};
 const gradient={addColorStop:validate};
 return {getTransform:()=>({a:1,b:0,c:0,d:1}),setTransform:validate,calls,font:'',letterSpacing:'0px',globalAlpha:1,save(){},restore(){},beginPath(){},rect:validate,clip(){},translate:validate,rotate:validate,scale:validate,
 fillRect:validate,clearRect:validate,drawImage:validate,fill:validate,
 fillText(t,...args){validate(...args);calls.push(t)},measureText(t){return {width:t.length*parseFloat(this.font.split(' ')[1])*0.5}},createLinearGradient(){return gradient},createRadialGradient(){return gradient}};
}
global.Path2D=class{};global.document={createElement(){return {width:0,height:0,getContext:()=>context()}}};
const values={...defaultsFor('chip-announce-title'),speed:1};
for(let frame=0;frame<170;frame++){const ctx=context();art.draw(ctx,values,{},frame/30);}
for(const frame of [0,18,41,80,110,169]){const a=context(),b=context();art.draw(a,values,{},frame/30);art.draw(b,values,{},frame/30);assert.deepEqual(a.calls,b.calls);}
const long={...values,title:Array(50).fill('Launch').join(' '),tagline:Array(50).fill('Ready').join(' '),symbolPath:'',chipBackground:'Transparent'};
const title=context();art.draw(title,long,{},79/30);assert.equal(title.calls.length,50);
const tagline=context();art.draw(tagline,long,{},169/30);assert.equal(tagline.calls.length,50);
for(const duration of [REFERENCE_DURATION,14,30]){
 const seconds=duration*.5;assert.equal(shotAt(seconds*REFERENCE_DURATION/duration*30),'macro');
}
console.log('Announce Title: cuts, deterministic drawing, finite geometry, long-text completion and duration mapping passed.');

const {parseSymbol}=require('../templates/motion-chips/announce-title/symbol');
const svg=parseSymbol('<svg width="319" height="383" viewBox="0 0 319 383" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M290.846 249.379C308.413 299.032 318.175 342.753 318.175 376.24Z" fill="white"/></svg>');
assert.deepEqual(svg.box,[0,0,319,383]);assert.equal(svg.shapes[0].fill,'white');assert.equal(svg.shapes[0].rule,'evenodd');
assert.equal(parseSymbol('M0 0L100 100Z').box[2],100);
assert.equal(parseSymbol('<svg viewBox="0 0 0 100"><path d="M0 0Z"/></svg>'),null);
assert.equal(parseSymbol('<svg viewBox="0 0 100 100"><script>bad()</script></svg>'),null);
assert.equal(parseSymbol('<svg viewBox="-10 -20 319 383"><path d="M0 0Z"/><path d="M1 1Z"/></svg>').shapes.length,2);
console.log('SVG symbols: viewBox, white fill, even-odd cutouts, multiple paths, raw-path compatibility and invalid input passed.');

const {symbolPlacement,symbolBounds}=require('../templates/motion-chips/announce-title/symbol');
for(const box of [[0,0,319,383],[100,200,319,383],[-450,-200,1000,40],[20,80,10,900]]) {
 const p=symbolPlacement(box,60);
 assert.equal((box[0]+box[2]/2+p.x)*p.scale,0);
 assert.equal((box[1]+box[3]/2+p.y)*p.scale,0);
 assert.ok(Math.abs(Math.max(box[2],box[3])*p.scale-60)<1e-9);
}
const previousDocument=global.document;let removed=false;
global.document={body:{appendChild(){}},createElementNS(ns,name){return {style:{},setAttribute(){},appendChild(){},getBBox:()=>({x:50,y:-30,width:80,height:120}),remove(){removed=true}}}};
assert.deepEqual(symbolBounds({box:[0,0,500,500],shapes:[{d:'M0 0Z',rule:'evenodd'}]}),[50,-30,80,120]);
assert.equal(removed,true);global.document=previousDocument;
assert.equal(getTemplate('chip-announce-title').controls.find(c=>c.key==='symbolColor').type,'color');
console.log('Symbol placement: padded, negative, wide and tall bounds stay centered at a consistent size.');

const {textLines}=require('../templates/motion-chips/announce-title/draw');
assert.deepEqual(textLines('A new way to bring\nyour ideas to life.'),[['A','new','way','to','bring'],['your','ideas','to','life.']]);
assert.deepEqual(textLines('First\r\n\r\nThird'),[['First'],[],['Third']]);
for(const [width,height] of [[802,450],[802,1425],[802,802],[1800,450]]) {
 for(const [key,frame] of [['title',79],['tagline',169]]) {
  const ctx=context(), positions=[], backgrounds=[];
  ctx.fillText=(value,x,y)=>positions.push({value,x,y,width:ctx.measureText(value).width});
  ctx.fillRect=(...args)=>backgrounds.push(args);
  ctx.clip=()=>{throw Error('Unexpected hidden artwork clip');};
  art.draw(ctx,{...values,[key]:'A new way to bring\nyour ideas to life.',symbolPath:''},{},frame/30,width,height);
  assert.equal(new Set(positions.map(p=>p.y)).size,2);
  assert.ok(positions.every(p=>p.x>=0&&p.x+p.width<=width&&p.y>0&&p.y<height));
  assert.deepEqual(backgrounds[0],[0,0,width,height]);
 }
}
assert.equal(art.responsive,true);
console.log('Responsive layouts: portrait, square and wide canvases fill fully; manual line breaks preserve separate centered rows without a fixed clip.');

const preset=defaultsFor('chip-announce-title');
assert.equal(preset.title,'September Wrapped');assert.equal(preset.speed,1.1);assert.equal(preset.symbolScale,1.05);
assert.equal(preset.tagline,'A new way to bring \nyour ideas to life.');
assert.deepEqual(getTemplate('chip-announce-title').meta.socialSize,{width:1080,height:608});
const scene=require('../store/useSceneStore').useSceneStore;scene.getState().setFps(60);scene.getState().setActiveTemplate('chip-announce-title');
assert.equal(scene.getState().fps,30);assert.equal(scene.getState().duration,170/30);assert.equal(scene.getState().easing.id,'linear');

// Opening shutter buffers must track export density without changing layout.
for (const frame of [8, 25]) {
 const ctx=context();ctx.getTransform=()=>({a:4,b:0,c:0,d:4});let output;
 ctx.drawImage=(canvas,...args)=>{output={canvas,args}};
 art.draw(ctx,{...values},{},frame/30);
 assert.equal(output.canvas.width,802*4);assert.equal(output.canvas.height,450*4);
 assert.deepEqual(output.args,[0,0,802,450]);
}
const {sceneBackgroundAlpha}=require('../lib/chipBackground');
const transparentTrack={templateId:'chip-announce-title',values:{chipBackground:'Transparent'}};
assert.equal(sceneBackgroundAlpha({tracks:[transparentTrack],background:{alpha:100}}),0);
assert.equal(sceneBackgroundAlpha({tracks:[{...transparentTrack,values:{chipBackground:'Solid'}}],background:{alpha:100}}),100);
assert.equal(sceneBackgroundAlpha({tracks:[transparentTrack,transparentTrack],background:{alpha:65}}),65);
for(const frame of [8,25,60,90,140]) {
 const ctx=context();let fills=0;ctx.fillRect=()=>fills++;
 art.draw(ctx,{...values,chipBackground:'Transparent'},{},frame/30);
 assert.equal(fills,0);
}
console.log('Opening export density and transparent chip/scene background checks passed.');
