'use client';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useSceneStore } from '@/store/useSceneStore';
import { useUIStore } from '@/store/useUIStore';
import { carouselSlides, type CarouselSlide } from '@/lib/carouselSlides';
import { addCarouselSlide, selectCarouselSlide, removeCarouselSlide } from '@/lib/carouselActions';
import { getTemplate } from '@/templates';
import { prepareSocialArtwork, drawSocialArtwork, socialArtwork } from '@/lib/socialRenderer';
function SlidePreview({slide,width,height}:{slide:CarouselSlide;width:number;height:number}) {
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{let alive=true;prepareSocialArtwork(slide.templateId,slide.values, 'background').then(images=>{
    if(alive&&ref.current)drawSocialArtwork(ref.current,slide.templateId,slide.values,images,socialArtwork(slide.templateId).previewTime??0);
  }).catch(()=>{});return()=>{alive=false;};},[slide.templateId,slide.values,width,height]);
  return <canvas ref={ref} width={Math.round(width*2)} height={Math.round(height*2)} style={{width,height}}/>;
}
export default function CarouselStage({children}:{children:ReactNode}) {
  const state=useSceneStore(useShallow(s=>({activeTemplateId:s.activeTemplateId,values:s.values,carouselSlides:s.carouselSlides,activeSlideId:s.activeSlideId,width:s.width,height:s.height,duration:s.duration})));
  const nav=useUIStore(s=>s.nav);
  const enabled=nav==='library'&&state.activeTemplateId.startsWith('moonvine-');
  const slides=carouselSlides(state),active=state.activeSlideId||'first';
  const container=useRef<HTMLDivElement>(null),live=useRef<HTMLDivElement>(null);
  const centered=useRef(false);
  const [size,setSize]=useState({width:360,height:450,gutter:24});
  useEffect(()=>{const node=container.current;if(!node)return;const resize=new ResizeObserver(()=>{
    const ratio=state.width/state.height;
    const height=Math.max(80,Math.min(node.clientHeight-96,(node.clientWidth*.68)/ratio));
    const width=height*ratio;
    setSize({width,height,gutter:Math.max(24,(node.clientWidth-width)/2)});
  });resize.observe(node);return()=>resize.disconnect();},[state.width,state.height,enabled]);
  useLayoutEffect(()=>{
    const stage=container.current,slide=live.current;
    if(!enabled||!stage||!slide){centered.current=false;return;}
    const viewport=stage.getBoundingClientRect(),frame=slide.getBoundingClientRect();
    const left=stage.scrollLeft+frame.left-viewport.left+frame.width/2-stage.clientWidth/2;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    stage.scrollTo({left,behavior:centered.current&&!reduced?'smooth':'instant'});
    centered.current=true;
  },[active,size,slides.length,enabled]);
  return <div ref={container} className={enabled?'carousel-stage':'carousel-stage-disabled'} style={enabled?{paddingInline:size.gutter}:undefined}>
    <div ref={live} className={enabled?'carousel-slide carousel-live':undefined} style={enabled?{order:Math.max(0,slides.findIndex(s=>s.id===active)),width:size.width,height:size.height}:undefined}>
      {children}
      {enabled&&<div className="carousel-slide-caption"><span>Slide {Math.max(0,slides.findIndex(s=>s.id===active))+1} - {getTemplate(state.activeTemplateId).meta.name}</span>{slides.length>1&&<button type="button" onClick={()=>removeCarouselSlide(active)} aria-label="Remove current slide">Remove</button>}</div>}
    </div>
    {enabled&&<>{slides.filter(s=>s.id!==active).map(slide=><div key={slide.id} className="carousel-slide" style={{order:slides.findIndex(s=>s.id===slide.id),width:size.width,height:size.height}}>
      <button type="button" className="carousel-slide-pick" aria-label={`Edit slide ${slides.findIndex(s=>s.id===slide.id)+1}: ${getTemplate(slide.templateId).meta.name}`} onClick={()=>selectCarouselSlide(slide.id)}><SlidePreview slide={slide} {...size}/></button>
      <div className="carousel-slide-caption">Slide {slides.findIndex(s=>s.id===slide.id)+1} - {getTemplate(slide.templateId).meta.name}</div>
    </div>)}
    <button type="button" className="carousel-add" style={{order:slides.length,width:size.width,height:size.height}} aria-label="Add carousel slide" onClick={()=>{addCarouselSlide();useUIStore.setState({leftCollapsed:false,tplCollapsed:false});}}><span aria-hidden="true">+</span></button>
    </>}
  </div>;
}
