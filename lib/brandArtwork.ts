import { idbGet } from './assetDb';
import { SOCIAL_ASSET_PREFIX } from './socialAssets';
import { useSceneStore } from '@/store/useSceneStore';
import type { TextRegionCanvas } from './canvasTextEditing';
import type { SocialArtwork, SocialImages, SocialValues } from '@/templates/social/types';
import { asset } from './paths';
interface BrandAPI {
  prepare(values: SocialValues): Promise<unknown>;
  render(prepared: unknown, values: SocialValues, seconds: number, width: number, height: number): HTMLCanvasElement;
}
let ready: Promise<BrandAPI> | undefined;
function rendererReady(): Promise<BrandAPI> {
  if (ready) return ready;
  ready = new Promise<BrandAPI>((resolve, reject) => {
    const frame = document.createElement('iframe');
    frame.title = 'Moonvine artwork rendering surface'; frame.setAttribute('aria-hidden','true'); frame.tabIndex = -1;
    frame.style.cssText = 'position:fixed;left:0;top:0;width:1440px;height:2400px;opacity:0;pointer-events:none;z-index:-1;border:0';
    const timeout = setTimeout(() => { window.removeEventListener('message', receive); frame.remove(); ready=undefined; reject(new Error('Moonvine renderer did not load. Please retry.')); }, 30000);
    function receive(event: MessageEvent) {
      if(event.source!==frame.contentWindow || event.origin!==location.origin || event.data?.type!=='moonvine:ready')return;
      const api=(frame.contentWindow as Window & {moonvineRenderer?:BrandAPI}).moonvineRenderer;
      if(!api)return;
      clearTimeout(timeout);window.removeEventListener('message',receive);resolve(api);
    }
    window.addEventListener('message',receive);
    frame.src=asset('/brand-tools/index.html');document.body.appendChild(frame);
  });
  return ready;
}
const cache = new Map<string, Promise<SocialImages>>();
const resources = new WeakMap<SocialImages, { api: BrandAPI; prepared: unknown }>();
function resourceValues(id: string, values: SocialValues) {
  if(id==='moonvine-metric') {
    const {width,height}=useSceneStore.getState();
    return {...values,brandKind:'metric',canvasWidth:width,canvasHeight:height};
  }
  if(id.startsWith('moonvine-ai-')) {
    const {width,height}=useSceneStore.getState();
    return {...values,brandKind:'ai',variant:id.endsWith('question')?'question':'sources',canvasWidth:width,canvasHeight:height};
  }
  if (id.startsWith('moonvine-list-')) return {
    brandKind: 'list', variant: id.endsWith('cards') ? 'cards' : 'checklist', postTheme: values.postTheme, itemCount: values.itemCount ?? 4,
    ...Object.fromEntries(Array.from({length:id.endsWith('cards')?6:8},(_,i)=>i+1).flatMap(i=>[`item${i}`,`status${i}`]).map(key=>[key,values[key]])),
  };
  return id.startsWith('moonvine-citation')
    ? { brandKind: 'citation', animation: values.animation || 'orbit' }
    : { brandKind: 'post', feature: values.feature, scenario: values.scenario, postTheme: values.postTheme };
}
export function brandArtwork(id: string): SocialArtwork {
  return {
    width:1080, height:1350, responsive:true, previewTime:2,
    images:()=>({}),
    cacheKey:values=>JSON.stringify(resourceValues(id,values)),
    prepareImages:values=>{
      const source=resourceValues(id,values), key=JSON.stringify(source);
      const existing=cache.get(key);if(existing)return existing;
      const result=rendererReady().then(async api=>{
        const resolved={...source};
        if(id.startsWith('moonvine-ai-'))await Promise.all(Object.keys(resolved).filter(key=>key.startsWith('sourceIcon')).map(async key=>{
          const ref=String((resolved as SocialValues)[key]??'');
          if(!ref.startsWith(SOCIAL_ASSET_PREFIX))return;
          const blob=await idbGet(ref);if(!blob)throw new Error('The saved source icon is unavailable. Replace it in the Post panel.');
          (resolved as SocialValues)[key]=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(reader.error);reader.readAsDataURL(blob);});
        }));
        const prepared=await api.prepare(resolved);
        const images:SocialImages={};resources.set(images,{api,prepared});return images;
      }).catch(error=>{cache.delete(key);throw error;});
      if(cache.size>=24)cache.delete(cache.keys().next().value!);
      cache.set(key,result);return result;
    },
    draw:(ctx,values,images,seconds=0,width=1080,height=1350)=>{
      const resource=resources.get(images);if(!resource)return;
      // Compose at the final backing resolution. Reflow uses the real aspect,
      // with no portrait bitmap fitting or bars around the background.
      const transform=ctx.getTransform();
      const density=Math.hypot(transform.a,transform.b);
      const canvas=resource.api.render(resource.prepared,values,seconds,Math.round(width*density),Math.round(height*density));
      ctx.drawImage(canvas,0,0,width,height);
      (ctx.canvas as TextRegionCanvas).textRegions = (canvas as TextRegionCanvas).textRegions;
      (ctx.canvas as TextRegionCanvas).textTemplateId = id;
      ctx.canvas.dispatchEvent(new Event('canvas-text-regions', { bubbles: true }));
    },
  };
}
