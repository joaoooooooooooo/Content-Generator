import { useSceneStore } from '@/store/useSceneStore';
import { getTemplate } from '@/templates';
import { prepareSocialArtwork, drawSocialArtwork } from './socialRenderer';
export async function exportPostPng(size:{width:number;height:number}) {
  const {activeTemplateId,values}=useSceneStore.getState();
  const images=await prepareSocialArtwork(activeTemplateId,values);
  const canvas=document.createElement('canvas');canvas.width=size.width;canvas.height=size.height;
  drawSocialArtwork(canvas,activeTemplateId,values,images,0);
  const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Could not export the post. Please retry.')),'image/png'));
  const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;
  link.download=getTemplate(activeTemplateId).meta.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.png';link.click();
  setTimeout(()=>URL.revokeObjectURL(url),30000);
}
