'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { useSceneStore } from '@/store/useSceneStore';
import CanvasSourceIcon from './CanvasSourceIcon';
import { getTemplate } from '@/templates';
import { useCanvasTextSelection } from '@/store/useCanvasTextSelection';
import { baselineShift } from '@/lib/textBaseline';
import { asset } from '@/lib/paths';
import type { TextRegion, TextRegionCanvas } from '@/lib/canvasTextEditing';

// Native transparent text fields put the caret/selection directly over rendered text.
// The renderer remains the visible text source, including during typing and export.
export default function CanvasTextEditor({ stageRef }: { stageRef: RefObject<HTMLDivElement | null> }) {
  const templateId=useSceneStore(s=>s.activeTemplateId);
  const trackId=useSceneStore(s=>s.activeTrackId);
  const values=useSceneStore(s=>s.values);
  const setValue=useSceneStore(s=>s.setValue);
  const [geometry,setGeometry]=useState<{left:number;top:number;width:number;height:number;regions:TextRegion[]}|null>(null);
  const [fontsReady,setFontsReady]=useState(false);
  const select=useCanvasTextSelection(s=>s.select);
  const active=useRef<string|null>(null);
  const enabled=templateId.startsWith('moonvine-');
  useEffect(()=>{
    const fonts=[new FontFace('Canvas Geist',`url("${asset('/Geist-Variable.woff2')}")`,{weight:'100 900'}),new FontFace('Canvas Nib',`url("${asset('/NibPro-SemiBold.woff2')}")`,{weight:'600'})];
    let disposed=false;
    Promise.all(fonts.map(font=>font.load())).then(loaded=>{if(!disposed){loaded.forEach(font=>document.fonts.add(font));setFontsReady(true);}}).catch(()=>{});
    return()=>{disposed=true;fonts.forEach(font=>document.fonts.delete(font));};
  },[]);
  useEffect(()=>{
    active.current=null;select(null);setGeometry(null);
    const stage=stageRef.current;if(!stage||!enabled)return;
    let previous='';
    const update=()=>{
      const canvas=stage.querySelector<TextRegionCanvas>('canvas');if(!canvas||canvas.textTemplateId!==templateId)return;
      const {left,top,width,height}=canvas.getBoundingClientRect();
      const next={left,top,width,height,regions:canvas.textRegions??[]};
      const signature=JSON.stringify(next);if(signature===previous)return;previous=signature;
      setGeometry(old=>{
        // Keep an emptied field editable until focus leaves it.
        const missing=old?.regions.find(r=>r.key===active.current&&!next.regions.some(n=>n.key===r.key));
        return missing?{...next,regions:[...next.regions,missing]}:next;
      });
    };
    const resize=new ResizeObserver(update);resize.observe(stage);
    stage.addEventListener('canvas-text-regions',update);
    window.addEventListener('resize',update);window.addEventListener('scroll',update,true);update();
    return()=>{select(null);resize.disconnect();stage.removeEventListener('canvas-text-regions',update);window.removeEventListener('resize',update);window.removeEventListener('scroll',update,true);};
  },[stageRef,templateId,trackId,enabled]);
  if(!enabled||!geometry||!fontsReady)return null;
  const fields=getTemplate(templateId).controls;
  return createPortal(<>{geometry.regions.map(region=>{
    if(region.kind==='image')return <CanvasSourceIcon key={`${trackId}:${region.key}`} field={region.key} label={fields.find(f=>f.key===region.key)?.label??'source icon'} style={{position:'fixed',zIndex:31,left:geometry.left+region.x*geometry.width,top:geometry.top+region.y*geometry.height,width:region.width*geometry.width,height:region.height*geometry.height}}/>;
    const fontSize=(region.fontSize??.04)*geometry.width;
    const fontFamily=region.fontFamily==='Nib Pro'?'"Canvas Nib", Georgia, serif':'"Canvas Geist", sans-serif';
    const shift=baselineShift(fontFamily,region.fontWeight??400,region.lineHeight??1.127,region.baseline)*fontSize;
    return <textarea key={`${trackId}:${templateId}:${region.key}`} className="canvas-inline-text"
      aria-label={fields.find(f=>f.key===region.key)?.label??region.key}
      spellCheck={false} value={String(values[region.key]??'')}
      onFocus={()=>{active.current=region.key;select(region.key);}}
      onBlur={()=>{active.current=null;select(null);}}
      onChange={event=>{setValue(region.key,event.target.value);event.currentTarget.scrollTop=0;event.currentTarget.scrollLeft=0;}}
      onKeyDown={event=>{event.stopPropagation();if(event.key==='Escape'){event.preventDefault();event.currentTarget.blur();}}}
      style={{position:'fixed',zIndex:30,left:geometry.left+region.x*geometry.width,top:geometry.top+region.y*geometry.height+shift,width:Math.max(16,region.width*geometry.width),height:Math.max(fontSize*(region.lineHeight??1.127),region.height*geometry.height)+4,fontFamily,fontSize,fontWeight:region.fontWeight??400,lineHeight:region.lineHeight??1.127,letterSpacing:(region.letterSpacing??0)*geometry.width,caretColor:values.postTheme==='Light'?'#141414':'#fff'}} />;
  })}</>,document.body);
}
