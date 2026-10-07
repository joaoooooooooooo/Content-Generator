'use client';
import { useRef, useState, type CSSProperties } from 'react';
import { useSceneStore } from '@/store/useSceneStore';
import { saveSourceIcon } from '@/lib/sourceIconUpload';
export default function CanvasSourceIcon({field,label,style}:{field:string;label:string;style:CSSProperties}) {
  const input=useRef<HTMLInputElement>(null);
  const [busy,setBusy]=useState(false),[error,setError]=useState('');
  const upload=async(file?:File)=>{
    if(!file)return;
    const {activeTrackId,activeTemplateId}=useSceneStore.getState();setBusy(true);setError('');
    try {const id=await saveSourceIcon(file);const state=useSceneStore.getState();if(state.activeTrackId===activeTrackId&&state.activeTemplateId===activeTemplateId)state.setValue(field,id);}
    catch(error){setError(error instanceof Error?error.message:'Could not save the icon.');}
    finally{setBusy(false);}
  };
  return <><button type="button" aria-label={`Change ${label}`} title={`Change ${label}`} disabled={busy} className="canvas-source-icon" style={style} onClick={()=>input.current?.click()}/>
    <input ref={input} type="file" hidden accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={e=>{void upload(e.target.files?.[0]);e.target.value='';}}/>
    {error&&<div role="alert" style={{...style,width:240,height:'auto',background:'var(--card)',padding:8}}>{error}</div>}</>;
}
