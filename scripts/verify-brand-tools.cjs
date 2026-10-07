const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
require('sucrase/register');
const root = path.resolve(__dirname,'..');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request,parent,isMain,options) {
  request=request.replace(/\?url$/, '');
  if(request.startsWith('@/'))request=path.join(parent?.filename.includes(path.join('brand-tools','source'))?path.join(root,'brand-tools/source'):root,request.slice(2));
  return originalResolve.call(this,request,parent,isMain,options);
};
for(const extension of ['.riv','.svg'])require.extensions[extension]=(module,file)=>{module.exports=file;};
const {catalogTemplateList,templateGroups,templates,defaultsFor}=require('../templates');
const {useSceneStore,ASPECTS}=require('../store/useSceneStore');
const {buildScenePartial}=require('../lib/scenePersist');
const {migrateBrandValues}=require('../templates/brand-tools/state');
const {reportScenarios}=require('../brand-tools/source/features/Reports/report-scenarios');
const {renderResponsive}=require('../brand-tools/responsive-renderer');
assert.equal(catalogTemplateList.length,27);
assert.deepEqual(templateGroups.map(g=>[g.group,g.items.length]),[['Features',17],['Citation',5],['List',2],['AI Visibility',2],['Metric',1]]);
assert(templates.carousel);
assert.deepEqual(reportScenarios.map(s=>s.id).sort(),['busy','decline','empty','growth','typical']);
for(const template of catalogTemplateList) {
  assert(!template.controls.some(c=>['orientation','artworkX','artworkY'].includes(c.key)));
  assert.equal(template.controls.find(c=>c.key==='artworkPosition').type,'xypad');
  assert.deepEqual(template.controls.find(c=>c.key==='fontStyle').options,['Serif','Sans']);
  assert.equal(defaultsFor(template.meta.id).fontStyle,'Serif');
  assert.equal(template.meta.kind,template.meta.group==='Citation'?'social-motion':'social');
}
const state=()=>useSceneStore.getState();
state().setCustomDims(1920,1080);
for(const template of catalogTemplateList) {
  state().setActiveTemplate(template.meta.id);
  assert.equal(state().customW,1920);assert.equal(state().customH,1080);
  assert.equal(state().playing,template.meta.group==='Citation');
}
state().setActiveTemplate('moonvine-visibility');
state().setValue('heading','Saved responsive post');
state().setValue('fontStyle','Sans');
state().setValue('artworkPosition',{x:25,y:-15});
state().setValue('feature','answer-summary');
assert.deepEqual(state().values.artworkPosition,{x:0,y:0});
state().setValue('feature','visibility');
assert.deepEqual(state().values.artworkPosition,{x:25,y:-15});
state().setAspect('1:1');
assert.deepEqual(state().values.artworkPosition,{x:25,y:-15});
const saved=JSON.parse(JSON.stringify(buildScenePartial(state())));
state().resetScene();state().hydrate(saved);
assert.equal(state().values.fontStyle,'Sans');
assert.equal(state().aspect,'1:1');assert.equal(state().values.heading,'Saved responsive post');
state().saveCustomPreset('Responsive post');const preset=state().customPresets.at(-1);
state().setCustomDims(800,1600);state().setActiveTemplate('moonvine-citation');state().applyCustomPreset(preset.id);
assert.equal(state().customW,800);assert.equal(state().customH,1600);assert.equal(state().playing,false);
state().blankScene();state().applyCustomPreset(preset.id);assert.equal(state().tracks.length,1);
state().setActiveTemplate('moonvine-citation');state().setValue('artworkSize',150);
state().setValue('animation','stepper-2');assert.equal(state().values.artworkSize,92);
state().setValue('animation','orbit');assert.equal(state().values.artworkSize,150);
const legacy=migrateBrandValues('moonvine-visibility',{artworkX:62,artworkY:-19,orientation:'Portrait'});
assert.deepEqual(legacy.artworkPosition,{x:10,y:10});
// Exercise actual responsive composition with an instrumented canvas, not a browser.
function fakeCanvas() {
  const calls=[];
  const ctx={calls,resetTransform(){},clearRect(){},save(){},restore(){},scale(){},drawImage(...args){calls.push(['image',...args]);},fillRect(...args){calls.push(['rect',...args]);},fillText(...args){calls.push(['text',...args,this.font,this.letterSpacing]);},measureText(text){return {width:String(text).length*(parseFloat(this.font?.match(/([\d.]+)px/)?.[1]||'24'))*.48+Math.max(0,String(text).length-1)*parseFloat(this.letterSpacing||'0')};},createLinearGradient(){return {addColorStop(){}};}};
  return {width:0,height:0,getContext:()=>ctx};
}
const sizes=[...Object.values(ASPECTS).map(([w,h])=>[Math.round(w/h*1080),1080]),[1080,1350],[1350,1080],[1080,1920],[2400,600],[600,2400],[1573,921]];
let compositions=0;
for(const [width,height] of sizes)for(const postTheme of ['Light','Dark'])for(const citation of [false,true])for(const fontStyle of ['Serif','Sans']) {
  const canvas=fakeCanvas();const times=[];
  const prepared=citation?{kind:'citation',animation:{frame(t){times.push(t);return {width:1084,height:892};}},tint:fakeCanvas()}:{kind:'post',canvas:{width:1000,height:650},logo:{naturalWidth:400,naturalHeight:80},background:postTheme==='Light'?'#fff':'#111'};
  const values={...defaultsFor(citation?'moonvine-citation':'moonvine-visibility'),postTheme,fontStyle};
  renderResponsive(canvas,values,prepared,1.5,width,height);
  assert.equal(canvas.width,width);assert.equal(canvas.height,height);
  assert.deepEqual(canvas.getContext().calls[0],['rect',0,0,width,height],'Background must fill the entire selected canvas');
  const textCalls=canvas.getContext().calls.filter(c=>c[0]==='text');
  assert(textCalls.length);
  for(const call of textCalls){
    assert.equal(call[5],fontStyle==='Sans'?'-2.23px':'0px');
    if(fontStyle==='Sans')assert.match(call[4],/^500 [\d.]+px Geist, sans-serif$/);
  }
  if(fontStyle==='Sans'){
    const lines=textCalls.filter(c=>c[1]!==values.tagline);
    if(lines.length>1 && lines[0][4]===lines[1][4])assert(Math.abs(lines[1][3]-lines[0][3]-parseFloat(lines[0][4].split(' ')[1])*1.127)<1e-6);
  }
  if(citation)assert.deepEqual(times,[1.5],'Timeline time must reach the live asset');
  compositions++;
}
let referenced=0;
function checkAssets(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);if(entry.isDirectory()){checkAssets(file);continue;}
  if(!/\.(tsx?|jsx?|css)$/.test(file))continue;
  for(const m of fs.readFileSync(file,'utf8').matchAll(/["'(](\/(?:report-logos|report-media)\/[^"')]+|\/NibPro-SemiBold\.woff2)/g)){assert(fs.existsSync(path.join(root,'public',m[1])),m[1]);referenced++;}
}}
checkAssets(path.join(root,'brand-tools/source'));
console.log(`Passed: 17 Features, 5 animated Citation templates, canvas size preservation, XY persistence/migration, ${compositions} responsive compositions, ${referenced} asset references. No browser used.`);

const {createTimelineStepper}=require('../brand-tools/timeline');
function simulate(frames) { let time=0,resets=0;const seek=createTimelineStepper(()=>{time=0;resets++;},dt=>{time+=dt;});for(const frame of frames)seek(frame);return {time,resets}; }
assert.equal(simulate([1]).time,simulate([.04,.08,.2,.5,1]).time);
assert.equal(simulate([1]).time,simulate([1/30,2/30,.5,1]).time);
assert.equal(simulate([1,0,.5]).resets,1);
assert.equal(simulate([1,0,.5]).time,simulate([.5]).time);
assert.equal(simulate([.5,.5,.5]).time,simulate([.5]).time);
console.log('Animation stepping passed: equal results across frame cadences, rewind, loop, and paused frames.');

const {VISIBLE_NAV_SECTIONS,sectionForProject}=require('../lib/navSections');
assert.deepEqual(VISIBLE_NAV_SECTIONS.map(s=>s.id),['projects','library']);
assert.equal(sectionForProject('mockup').href,'/mockup','Hidden navigation must not corrupt existing device project links');
console.log('Navigation passed: only Projects and Library are visible; saved device project routes remain valid.');

const {renderList}=require('../brand-tools/list/render-list');
const {brandArtwork}=require('../lib/brandArtwork');
let listCompositions=0;
for(const variant of ['checklist','cards']) {
  const id=`moonvine-list-${variant}`;
  const values=defaultsFor(id);
  const art=brandArtwork(id);
  assert.notEqual(art.cacheKey(values),art.cacheKey({...values,item1:'Edited item'}));
  if(variant==='cards')assert.notEqual(art.cacheKey(values),art.cacheKey({...values,status1:'Good shape'}));
  state().setActiveTemplate(id);state().setValue('item1','Saved checklist item');
  const project=JSON.parse(JSON.stringify(buildScenePartial(state())));
  state().resetScene();state().hydrate(project);
  assert.equal(state().values.item1,'Saved checklist item');
  for(const [width,height] of sizes)for(const fontStyle of ['Sans','Serif'])for(const postTheme of ['Light','Dark']) {
    const canvas=fakeCanvas();
    const itemCount=variant==='cards'?6:8;
    const items=Array.from({length:itemCount},(_,i)=>({width:variant==='cards'?899.134:1608.558,height:variant==='cards'?(i===0?365:461):175.936}));
    renderList(canvas,{...values,fontStyle,postTheme},{variant,items,background:'#141414'},width,height);
    assert.deepEqual(canvas.getContext().calls[0],['rect',0,0,width,height]);
    const drawn=canvas.getContext().calls.filter(c=>c[0]==='image');
    assert.equal(drawn.length,itemCount);
    assert.equal(canvas.textRegions.length,itemCount+1);
    for(const c of drawn) {
      assert(c.slice(2).every(Number.isFinite));
      assert(c[2]>=0 && c[3]>=0 && c[2]+c[4]<=width/(Math.min(width,height)/1080)+1 && c[3]+c[5]<=height/(Math.min(width,height)/1080)+1,'Default list must fit the selected canvas');
    }
    listCompositions++;
  }
  const empty=fakeCanvas();renderList(empty,values,{variant,items:[],background:'#141414'},1080,1350);
}
for(const file of ['check-circle.png','check.svg','warning.svg','success.svg'])assert(fs.statSync(path.join(root,'brand-tools/list/assets',file)).size>0);
console.log(`List passed: ${listCompositions} compositions, editable item/status cache invalidation, saved content, empty lists, and four local Figma assets.`);

const {hitText}=require('../lib/canvasTextEditing');
assert(!catalogTemplateList.some(t=>t.meta.id==='moonvine-paid'));
assert(templates['moonvine-paid'],'Keep old saved projects readable');
for(const [variant,max] of [['checklist',8],['cards',6]]) {
  const id=`moonvine-list-${variant}`;
  const template=templates[id];
  assert.equal(template.controls.find(c=>c.key==='itemCount').max,max);
  assert(!template.controls.some(c=>/^number/.test(c.key)));
  assert.equal(template.controls.filter(c=>/^item\d+$/.test(c.key)).length,max);
  state().setActiveTemplate(id);state().setValue('itemCount',max);state().setValue(`item${max}`,'Last saved item');
  const saved=JSON.parse(JSON.stringify(buildScenePartial(state())));
  state().resetScene();state().hydrate(saved);
  assert.equal(state().values.itemCount,max);assert.equal(state().values[`item${max}`],'Last saved item');
}
const textCanvas=fakeCanvas();
renderResponsive(textCanvas,defaultsFor('moonvine-citation'),{kind:'citation',animation:{frame(){return {width:1084,height:892};}},tint:fakeCanvas()},0,1080,1350);
for(const region of textCanvas.textRegions)assert.equal(hitText(textCanvas.textRegions,region.x+region.width/2,region.y+region.height/2)?.key,region.key);
assert.deepEqual(textCanvas.textRegions.map(r=>r.key),['quote','author','attribution']);
assert.equal(hitText(textCanvas.textRegions,-1,-1),undefined);
console.log('Feedback checks passed: list limits and saved items, no number fields, Paid Search hidden, Serif defaults, and citation text hit testing.');

const {useCanvasTextSelection}=require('../store/useCanvasTextSelection');
useCanvasTextSelection.getState().select('heading');assert.equal(useCanvasTextSelection.getState().key,'heading');
useCanvasTextSelection.getState().select('item2');assert.equal(useCanvasTextSelection.getState().key,'item2');
useCanvasTextSelection.getState().select(null);assert.equal(useCanvasTextSelection.getState().key,null);
const previousDocument=global.document;
let probes=0;
global.document={body:{appendChild(){probes++;}},createTextNode(){return {};},createElement(tag){
  if(tag==='canvas')return {getContext(){return {textBaseline:'alphabetic',measureText(){return {actualBoundingBoxAscent:this.textBaseline==='alphabetic'?75:this.textBaseline==='top'?-15:35};}};}};
  return {style:{},appendChild(){},remove(){},getBoundingClientRect(){return {top:tag==='span'?85:0};}};
}};
try {
  const {baselineShift}=require('../lib/textBaseline');
  assert.equal(baselineShift('test font',500,1.127,'top'),.05);
  assert.equal(baselineShift('test font',500,1.127,'middle'),.05);
  assert.equal(baselineShift('test font',400,1.333,'dom'),0);
  baselineShift('test font',500,1.127,'top');assert.equal(probes,2,'Measure once per font and baseline, not per keystroke');
} finally {global.document=previousDocument;}
console.log('Selection sync and measured canvas/CSS baseline conversion passed.');

require.extensions['.css']=()=>{};
// Phosphor's CJS entry has a .js suffix inside a type:module package; Vite handles
// it, but the Node-only component check needs to load that entry as CJS explicitly.
const iconPath=require.resolve('@phosphor-icons/react');
const iconModule=new Module(iconPath,module);iconModule.filename=iconPath;iconModule.paths=Module._nodeModulePaths(path.dirname(iconPath));
iconModule._compile(fs.readFileSync(iconPath,'utf8'),iconPath);require.cache[iconPath]=iconModule;
const React=require('react');global.React=React; // Sucrase's test-only classic JSX transform.
const {renderToStaticMarkup}=require('react-dom/server');
const {AIVisibilityPost}=require('../brand-tools/ai-visibility/AIVisibilityPost');
for(const variant of ['sources','question']) {
  const id=`moonvine-ai-${variant}`,values=defaultsFor(id);
  assert.equal(values.fontStyle,'Serif');
  const html=renderToStaticMarkup(React.createElement(AIVisibilityPost,{variant,values,width:1080,height:1350}));
  assert(html.includes('data-ai-text="heading"'));assert(html.includes('data-ai-text="takeaway"'));
  assert(html.includes('ai-muted'));assert(html.includes('<u>Dyson.com</u>'));
  if(variant==='sources')assert.equal((html.match(/class="[^"]*ai-rank"/g)||[]).length,5);
  else assert(html.includes('data-ai-text="question"'));
  const artwork=brandArtwork(id);
  assert.notEqual(artwork.cacheKey(values),artwork.cacheKey({...values,heading:'Edited'}));
  const before=artwork.cacheKey(values);state().setCustomDims(1920,1080);assert.notEqual(artwork.cacheKey(values),before);state().setCustomDims(1080,1350);
  state().setActiveTemplate(id);state().setValue('takeaway','Saved AI takeaway');
  const saved=JSON.parse(JSON.stringify(buildScenePartial(state())));state().resetScene();state().hydrate(saved);
  assert.equal(state().values.takeaway,'Saved AI takeaway');
}
console.log('AI Visibility: both component trees render, inline fields, logos, muted phrase, sizing cache and saved text verified.');

const sourceDefaults=defaultsFor('moonvine-ai-sources');
const renderSources=values=>renderToStaticMarkup(React.createElement(AIVisibilityPost,{variant:'sources',values,width:1080,height:1350}));
const fewer=renderSources({...sourceDefaults,source1:'',source3:'  '});
assert.equal((fewer.match(/class="[^"]*ai-rank"/g)||[]).length,3);
assert(!fewer.includes('data-ai-image="sourceIcon1"'));assert(!fewer.includes('data-ai-text="source3"'));
const customIcon='data:image/png;base64,dGVzdA==';
assert(renderSources({...sourceDefaults,sourceIcon2:customIcon}).includes(customIcon));
assert(renderSources({...sourceDefaults,fontStyle:'Sans'}).includes('AI Geist Upright'));
assert(renderSources({...sourceDefaults,fontStyle:'Sans'}).includes('font-style:normal'));
assert.equal((renderSources(sourceDefaults).match(/data-ai-image=/g)||[]).length,5);
state().setActiveTemplate('moonvine-ai-sources');state().setValue('sourceIcon2','social-asset:test-source-icon');
const iconSaved=JSON.parse(JSON.stringify(buildScenePartial(state())));state().resetScene();state().hydrate(iconSaved);
assert.equal(state().values.sourceIcon2,'social-asset:test-source-icon');
console.log('AI source fixes: blank rows hidden, five icon hit targets, custom images, upright Sans, and saved icon references verified.');

const {carouselSlides}=require('../lib/carouselSlides');
const {addCarouselSlide,selectCarouselSlide,removeCarouselSlide}=require('../lib/carouselActions');
const {groupPostControls}=require('../lib/postControlGroups');
const sourceGroups=groupPostControls(templates['moonvine-ai-sources'].controls);
assert.deepEqual(sourceGroups.find(g=>g.name==='Source 1').controls.map(c=>c.key),['source1','sourceIcon1','answers1']);
for(const template of catalogTemplateList){const groups=groupPostControls(template.controls);assert.equal(groups.flatMap(g=>g.controls).length,template.controls.length);}
state().resetScene();state().setActiveTemplate('moonvine-ai-sources');state().setValue('heading','First slide');state().setValue('sourceIcon1','social-asset:kept');
state().setCustomDims(1080,1350);
addCarouselSlide();const secondId=state().activeSlideId;
state().setActiveTemplate('moonvine-list-cards');state().setValue('heading','Second slide');
selectCarouselSlide('first');assert.equal(state().values.heading,'First slide');assert.equal(state().values.sourceIcon1,'social-asset:kept');
selectCarouselSlide(secondId);assert.equal(state().values.heading,'Second slide');assert.equal(state().activeTemplateId,'moonvine-list-cards');
const savedCarousel=JSON.parse(JSON.stringify(buildScenePartial(state())));
state().resetScene();state().hydrate(savedCarousel);
assert.equal(carouselSlides(state()).length,2);assert.equal(state().values.heading,'Second slide');
selectCarouselSlide('first');assert.equal(state().values.heading,'First slide');
removeCarouselSlide('first');assert.equal(state().activeSlideId,secondId);assert.equal(state().values.heading,'Second slide');
removeCarouselSlide(secondId);assert.equal(carouselSlides(state()).length,1,'The last slide cannot be deleted');
state().hydrate({activeTemplateId:'moonvine-visibility',values:defaultsFor('moonvine-visibility'),tracks:[]});assert.equal(state().carouselSlides.length,0,'Old projects must not inherit another project carousel');
state().resetScene();
console.log('Carousel checks passed: independent templates/content/icons, switching, deletion, save/restore, old-project isolation, and grouped properties.');
const {useHistoryStore}=require('../store/useHistoryStore');
state().resetScene();const stopHistory=useHistoryStore.getState().start();
addCarouselSlide();assert.equal(carouselSlides(state()).length,2);
useHistoryStore.getState().undo();assert.equal(carouselSlides(state()).length,1);
useHistoryStore.getState().redo();assert.equal(carouselSlides(state()).length,2);
stopHistory();useHistoryStore.getState().reset();state().resetScene();
console.log('Carousel undo/redo passed.');

const {MetricPost,metricChangeVariant}=require('../brand-tools/metric/MetricPost');
for(const [label,variant] of [['+12%','success'],[' + 12 % ','success'],['-12%','error'],['\u221212%','error'],['12%','label'],['','label']])assert.equal(metricChangeVariant(label),variant);
const metricDefaults=defaultsFor('moonvine-metric');
for(const fontStyle of ['Serif','Sans'])for(const postTheme of ['Light','Dark'])for(const metricChange of ['+12%','-12%','12%']) {
  const values={...metricDefaults,fontStyle,postTheme,metricChange};
  const html=renderToStaticMarkup(React.createElement(MetricPost,{values,width:1080,height:1350}));
  for(const key of ['statusLabel','heading','description','metricValue','metricLabel','metricChange','metricPeriod'])assert(html.includes('data-ai-text="'+key+'"'));
  assert(html.includes(metricChange.startsWith('+')?'text-success-foreground':metricChange.startsWith('-')?'text-destructive-foreground':'text-muted-foreground'));
}
const metricArtwork=brandArtwork('moonvine-metric');
assert.notEqual(metricArtwork.cacheKey(metricDefaults),metricArtwork.cacheKey({...metricDefaults,metricChange:'-8%'}));
assert.deepEqual(groupPostControls(templates['moonvine-metric'].controls).find(g=>g.name==='Metric').controls.map(c=>c.key),['metricValue','metricLabel','metricChange','metricPeriod']);
console.log('Metric passed: editable text, theme/font variants, automatic positive/negative/neutral badges, rendering cache and grouped controls.');
