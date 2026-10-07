import { MetricPost } from './metric/MetricPost';
import { AIVisibilityPost } from './ai-visibility/AIVisibilityPost';
import { ListItem } from './list/ListItem';
import { renderList } from './list/render-list';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { toCanvas } from 'html-to-image';
import { ReportFeature } from './source/features/brand-tools/ReportFeature';
import { reportFeatures } from './source/features/brand-tools/report-features';
import { postLogoSources } from './source/features/brand-tools/post-renderer';
import { createCitationAnimation } from './citation-animation';
import { renderResponsive } from './responsive-renderer';
import './source/styles/index.css';
const host = document.getElementById('root');
const root = createRoot(host);
const listItems = new Map();
const reports = new Map(), animations = new Map(), logos = new Map();
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let captureQueue = Promise.resolve();
async function loadImage(src) { const img=new Image();img.src=src;await img.decode();return img; }
function reportImage(feature, theme, scenario) {
  const key=JSON.stringify([feature.value,theme,scenario]);
  if(reports.has(key))return reports.get(key);
  const capture=captureQueue.catch(()=>{}).then(async()=>{
    document.documentElement.className=theme==='dark'?'dark':'';
    flushSync(()=>root.render(<div className="report-document font-sans text-foreground" style={{width:feature.width,padding:4}}><ReportFeature value={feature.value} scenario={scenario}/></div>));
    await document.fonts.ready;
    await Promise.all([...host.querySelectorAll('img')].map(img=>img.decode()));
    await sleep(1800);
    const node=host.firstElementChild;
    const canvas=await toCanvas(node,{pixelRatio:2,preferredFontFormat:'woff2',includeStyleProperties:[...getComputedStyle(node)].filter(name=>!name.startsWith('--'))});
    return {canvas,background:getComputedStyle(document.documentElement).getPropertyValue('--background').trim()};
  });
  captureQueue=capture;
  const result=capture.catch(error=>{reports.delete(key);throw error;});
  if(reports.size>=24)reports.delete(reports.keys().next().value);
  reports.set(key,result);return result;
}
const fonts=Promise.all([document.fonts.load('600 98px "Nib Pro"'),document.fonts.load('400 28px Geist'),document.fonts.load('500 98px Geist')]);
window.moonvineRenderer = {
  async prepare(values) {
    await fonts;
    if(values.brandKind==='ai'||values.brandKind==='metric') {
      const capture=captureQueue.catch(()=>{}).then(async()=>{
        document.documentElement.className=values.postTheme==='Light'?'':'dark';
        const scale=Math.min(values.canvasWidth,values.canvasHeight)/1080;
        const width=values.canvasWidth/scale,height=values.canvasHeight/scale;
        const Post=values.brandKind==='metric'?MetricPost:AIVisibilityPost;
        flushSync(()=>root.render(<Post values={values} variant={values.variant} width={width} height={height}/>));
        await document.fonts.ready;
        await Promise.all([...host.querySelectorAll('img')].map(img=>img.decode()));
        const node=host.firstElementChild,layout=node.firstElementChild;
        const fit=Math.min(1,height/layout.scrollHeight);
        layout.style.transform=`scale(${fit})`;layout.style.transformOrigin='top center';
        const box=node.getBoundingClientRect();
        const regions=[...node.querySelectorAll('[data-ai-text]')].map(element=>{
          const rect=element.getBoundingClientRect(),style=getComputedStyle(element),fontSize=parseFloat(style.fontSize),textScale=fit*(element.closest('.ai-body')?Number(values.artworkSize??92)/92:1);
          return {key:element.dataset.aiText,x:(rect.x-box.x)/width,y:(rect.y-box.y)/height,width:rect.width/width,height:rect.height/height,fontSize:fontSize*textScale/width,fontFamily:style.fontFamily.includes('Nib')?'Nib Pro':'Geist',fontWeight:Number(style.fontWeight),lineHeight:parseFloat(style.lineHeight)/fontSize,letterSpacing:(parseFloat(style.letterSpacing)||0)*textScale/width,baseline:'dom'};
        });
        const canvas=await toCanvas(node,{pixelRatio:2,preferredFontFormat:'woff2',includeStyleProperties:[...getComputedStyle(node)].filter(name=>!name.startsWith('--'))});
        for(const element of node.querySelectorAll('[data-ai-image]')) {
          const rect=element.getBoundingClientRect();
          regions.push({key:element.dataset.aiImage,kind:'image',x:(rect.x-box.x)/width,y:(rect.y-box.y)/height,width:rect.width/width,height:rect.height/height});
        }
        canvas.textRegions=regions;
        return {kind:'ai',canvas};
      });captureQueue=capture;return capture;
    }
    if(values.brandKind==='list') {
      const capture=captureQueue.catch(()=>{}).then(async()=>{
        document.documentElement.className=values.postTheme==='Light'?'':'dark';
        const items=[];
        for(let i=1;i<=Math.min(values.variant==='cards'?6:8,Math.max(1,Number(values.itemCount??4)));i++) {
          if(!String(values[`item${i}`]??'').trim())continue;
          const itemCacheKey=JSON.stringify([values.variant,values.postTheme,i,values[`item${i}`],values[`status${i}`]]);
          if(listItems.has(itemCacheKey)){items.push(listItems.get(itemCacheKey));continue;}
          flushSync(()=>root.render(<div className="list-capture"><ListItem variant={values.variant} text={values[`item${i}`]} status={values[`status${i}`]||'Good shape'}/></div>));
          await document.fonts.ready;
          await Promise.all([...host.querySelectorAll('img')].map(img=>img.decode()));
          const captured=await toCanvas(host.firstElementChild,{pixelRatio:2,preferredFontFormat:'woff2',includeStyleProperties:[...getComputedStyle(host.firstElementChild)].filter(name=>!name.startsWith('--'))});
          const textNode=host.querySelector('[data-list-text]');
          const box=textNode.getBoundingClientRect(), container=host.firstElementChild.getBoundingClientRect(), style=getComputedStyle(textNode);
          captured.textBox={x:box.x-container.x,y:box.y-container.y,width:box.width,height:box.height,fontSize:parseFloat(style.fontSize),lineHeight:parseFloat(style.lineHeight)/parseFloat(style.fontSize),letterSpacing:parseFloat(style.letterSpacing)||0};
          captured.itemKey=`item${i}`;items.push(captured);
          if(listItems.size>=64)listItems.delete(listItems.keys().next().value);
          listItems.set(itemCacheKey,captured);
        }
        return {kind:'list',variant:values.variant,items,background:getComputedStyle(document.documentElement).getPropertyValue('--background').trim(),output:document.createElement('canvas')};
      });
      captureQueue=capture;
      return capture;
    }
    if(values.brandKind==='citation') {
      const key=values.animation||'orbit';
      if(!animations.has(key))animations.set(key,createCitationAnimation(key).catch(error=>{animations.delete(key);throw error;}));
      return {kind:'citation',animation:await animations.get(key),tint:document.createElement('canvas'),output:document.createElement('canvas')};
    }
    const theme=values.postTheme==='Light'?'light':'dark';
    const feature=reportFeatures.find(item=>item.value===values.feature)||reportFeatures[0];
    if(!logos.has(theme))logos.set(theme,loadImage(postLogoSources[theme]).catch(error=>{logos.delete(theme);throw error;}));
    const [captured,logo]=await Promise.all([reportImage(feature,theme,values.scenario||'typical'),logos.get(theme)]);
    return {kind:'post',...captured,logo,output:document.createElement('canvas')};
  },
  render(prepared,values,seconds,width,height) {
    if(prepared.kind==='ai')return prepared.canvas;
    if(prepared.kind==='list')return renderList(prepared.output,values,prepared,width,height);
    return renderResponsive(prepared.output,values,prepared,seconds,width,height);
  },
};
window.addEventListener('pagehide',()=>{for(const pending of animations.values())pending.then(animation=>animation.dispose()).catch(()=>{});});
parent.postMessage({type:'moonvine:ready'},location.origin);
