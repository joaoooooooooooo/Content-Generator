import type { SceneState } from '@/store/useSceneStore';
export interface CarouselSlide { id:string; templateId:string; values:Record<string,any>; duration?:number }
export function carouselSlides(state:Pick<SceneState,'carouselSlides'|'activeSlideId'|'activeTemplateId'|'values'|'duration'>):CarouselSlide[] {
  const slides=state.carouselSlides.length?state.carouselSlides:[{id:'first',templateId:state.activeTemplateId,values:state.values}];
  return slides.map(slide=>slide.id===(state.activeSlideId||'first')?{...slide,templateId:state.activeTemplateId,values:state.values,duration:state.duration}:slide);
}
