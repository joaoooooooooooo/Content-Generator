const assert = require('node:assert/strict');
const path = require('node:path');
const Module = require('node:module');
require('sucrase/register');
const resolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) {
  return resolve.call(this, request.startsWith('@/') ? path.join(__dirname, '..', request.slice(2)) : request, parent, ...rest);
};

// Model Pixi's actual Texture.from resource-identity cache without a browser/GPU.
const cache=new Map(), textures=[], draws=[];
class Texture {
 constructor(canvas){this.destroyed=false;this.source={update:()=>{assert.ok(!this.destroyed,'A live chip must never update a destroyed texture');}};textures.push(this);}
 static from(canvas,skipCache=false){if(!skipCache&&cache.has(canvas))return cache.get(canvas);const t=new Texture(canvas);if(!skipCache)cache.set(canvas,t);return t;}
 destroy(){this.destroyed=true;}
}
class Sprite {anchor={set(){}};destroy(){};}
const artwork={width:802,height:450,referenceDuration:170/30,images:()=>({}),background:()=> '#000',draw:(ctx,values,images,seconds)=>draws.push(seconds)};
const originalLoad=Module._load;
Module._load=function(request,parent,...rest){
 if(request==='pixi.js')return {Texture,Sprite};
 if(request==='./socialRenderer'&&parent?.filename.endsWith('motionChipLayer.ts'))return {socialArtwork:()=>artwork,prepareSocialArtwork:async()=>({})};
 return originalLoad.call(this,request,parent,...rest);
};
global.document={createElement:()=>({width:0,height:0,getContext:()=>({resetTransform(){},clearRect(){},fillRect(){},save(){},translate(){},scale(){},restore(){}})})};
const {MotionChipLayer}=require('../lib/motionChipLayer');
(async()=>{
 const layer=new MotionChipLayer(()=>{}), values={chipBackground:'Solid'};
 await layer.prepare('chip-announce-title',values);
 layer.draw('chip-announce-title',values,1,960,540,1,14);
 const preview=layer.sprite.texture;
 // Export at a different resolution, then render all frames on the same texture.
 for(let frame=0;frame<420;frame++){
   layer.draw('chip-announce-title',values,frame/30,960,540,2,14);
   assert.ok(!layer.sprite.texture.destroyed);
   assert.equal(layer.sprite.visible,true);
 }
 assert.equal(preview.destroyed,true);
 assert.notEqual(layer.sprite.texture,preview);
 assert.equal(textures.length,2,'Do not allocate a texture on every frame');
 assert.ok(draws.at(-1)>draws[1],'Export must advance animation time');
 const exported=layer.sprite.texture;
 layer.draw('chip-announce-title',values,2,960,540,1,14);
 assert.equal(exported.destroyed,true);assert.ok(!layer.sprite.texture.destroyed);
 // A second export and return must work too, including transparent layers.
 values.chipBackground='Transparent';
 layer.draw('chip-announce-title',values,3,960,540,2,14);
 layer.draw('chip-announce-title',values,4,960,540,1,14);
 assert.ok(!layer.sprite.texture.destroyed);
 layer.destroy();assert.ok(textures.every(t=>t.destroyed));
 console.log('Motion Chip export: resolution changes, 420 animated frames, preview restoration, repeated export and cleanup passed.');
})().catch(e=>{console.error(e);process.exit(1)});
