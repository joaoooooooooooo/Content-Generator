const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const Module=require('node:module');
require('sucrase/register');
const root=path.resolve(__dirname,'..');
const source=path.join(root,'brand-tools/source');
const originalResolve=Module._resolveFilename;
Module._resolveFilename=function(request,parent,isMain,options){
 request=request.replace(/\?url$/,'');
 if(request.startsWith('@/'))request=path.join(source,request.slice(2));
 return originalResolve.call(this,request,parent,isMain,options);
};
for(const ext of ['.riv','.wasm'])require.extensions[ext]=(module,file)=>{module.exports=file;};
const {RuntimeLoader}=require('@rive-app/webgl2');
const wasm=fs.readFileSync(path.join(root,'node_modules/@rive-app/webgl2/rive.wasm'));
RuntimeLoader.setWasmBinary(wasm.buffer.slice(wasm.byteOffset,wasm.byteOffset+wasm.byteLength));
async function verify(){
 const runtime=await RuntimeLoader.awaitInstance();
 // Real WASM, real artboards, real bindings. Only GPU drawing is replaced;
 // the adapter must use the methods present on the shipped offscreen renderer.
 assert.match(String(runtime.makeRenderer),/WebGL/);
 const runtimeSource=fs.readFileSync(path.join(root,'node_modules/@rive-app/webgl2/rive.js'),'utf8');
 assert(runtimeSource.includes('this.clear=function'), 'Review renderer contract if the runtime changes');
 let cleared=0,drawn=0;
 const realMakeRenderer=runtime.makeRenderer;
 const realFlush=runtime.resolveAnimationFrame;
 const realFetch=global.fetch;
 const realDocument=global.document;
 runtime.makeRenderer=()=>({clear(){cleared++;},save(){},restore(){},align(){},flush(){},delete(){}});
 runtime.resolveAnimationFrame=()=>{};
 global.document={createElement(tag){assert.equal(tag,'canvas');return {width:0,height:0};}};
 global.fetch=async file=>{const bytes=fs.readFileSync(file);return {ok:true,arrayBuffer:async()=>bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)};};
 // Artboard.draw expects a native GPU renderer; count it while retaining all
 // native state-machine advances, view-model bindings, rewind, and cleanup.
 const realLoad=runtime.load;
 runtime.load=async(...args)=>{
  const file=await realLoad(...args);
  for(const method of ['defaultArtboard','artboardByName']) {
   const get=file[method].bind(file);
   file[method]=(...a)=>{const artboard=get(...a);artboard.draw=()=>{drawn++;};return artboard;};
  }
  return file;
 };
 try{
  const {createCitationAnimation}=require('../brand-tools/citation-animation');
  for(const name of ['orbit','stepper-1','stepper-2','stepper-3','stepper-4']){
   const animation=await createCitationAnimation(name);
   for(const time of [0,.5,2,2,0,1]) {
    const canvas=animation.frame(time);
    assert.equal(canvas.width,1084);assert.equal(canvas.height,name==='orbit'?892:1084);
   }
   animation.dispose();
  }
  assert.equal(cleared,30);assert.equal(drawn,30);
  for(const name of ['moonvine orbit.riv','moonvine_stepper.riv']){
   const original=path.resolve(root,'../MVDS/src/assets/rive files',name);
   if(fs.existsSync(original))assert.deepEqual(fs.readFileSync(path.join(source,'assets/rive files',name)),fs.readFileSync(original));
  }
  console.log('Citation runtime passed: five real Rive artboards, bindings, advance, pause, rewind, cleanup, and 30 adapter draws using clear(). GPU/browser rendering not tested.');
 }finally{
  runtime.makeRenderer=realMakeRenderer;runtime.resolveAnimationFrame=realFlush;runtime.load=realLoad;
  global.fetch=realFetch;global.document=realDocument;
 }
}
verify().catch(error=>{console.error(error);process.exitCode=1;});
