import JSZip from 'jszip';
import { useSceneStore } from '@/store/useSceneStore';
import { carouselSlides } from './carouselSlides';
import { prepareSocialArtwork, drawSocialArtwork, socialArtwork } from './socialRenderer';
export async function exportCarousel(size?:{width:number;height:number}) {
  const state=useSceneStore.getState();
  const slides=carouselSlides(state);
  const width=size?.width ?? (state.aspect==='custom'?state.customW:Math.round(state.width*1080/Math.min(state.width,state.height)));
  const height=size?.height ?? (state.aspect==='custom'?state.customH:Math.round(state.height*1080/Math.min(state.width,state.height)));
  const zip=new JSZip();
  for(const [index,slide] of slides.entries()) {
    const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
    const images=await prepareSocialArtwork(slide.templateId,slide.values);
    drawSocialArtwork(canvas,slide.templateId,slide.values,images,socialArtwork(slide.templateId).previewTime??0);
    const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Could not render slide '+(index+1))),'image/png'));
    zip.file(`slide-${String(index+1).padStart(2,'0')}.png`,blob);
  }
  const url=URL.createObjectURL(await zip.generateAsync({type:'blob'}));
  const link=document.createElement('a');link.href=url;link.download='carousel.zip';link.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
}
