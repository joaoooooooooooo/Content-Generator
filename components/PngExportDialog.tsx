'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useShallow } from 'zustand/react/shallow';
import { useSceneStore } from '@/store/useSceneStore';
import { pngDimensions, PNG_RESOLUTIONS, type PngResolution } from '@/lib/pngDimensions';
import { exportPostPng } from '@/lib/exportPostPng';
import { exportCarousel } from '@/lib/exportCarousel';
export default function PngExportDialog({onClose,carousel=false}:{onClose:()=>void;carousel?:boolean}) {
  const scene=useSceneStore(useShallow(s=>({width:s.width,height:s.height,aspect:s.aspect,customW:s.customW,customH:s.customH})));
  const dialog=useRef<HTMLDialogElement>(null);
  const [resolution,setResolution]=useState<PngResolution>('1080p');
  const [busy,setBusy]=useState(false),[error,setError]=useState(''),[done,setDone]=useState(false);
  const size=pngDimensions(resolution,scene);
  useEffect(()=>{const node=dialog.current;node?.showModal();return()=>node?.close();},[]);
  const start=async()=>{
    setBusy(true);setError('');setDone(false);
    try {if(carousel)await exportCarousel(size);else await exportPostPng(size);setDone(true);}
    catch(error){setError(error instanceof Error?error.message:'Export failed. Please retry.');}
    finally{setBusy(false);}
  };
  return createPortal(<dialog ref={dialog} className="modal png-export-modal" aria-labelledby="png-export-title" onCancel={e=>{e.preventDefault();if(!busy)onClose();}} onClick={e=>{
    if(e.target!==e.currentTarget||busy)return;const rect=e.currentTarget.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)onClose();
  }}>
    <div className="modal-head"><span id="png-export-title">{carousel?'Export carousel':'Export'}</span><button type="button" className="icon-btn" aria-label="Close export" disabled={busy} onClick={onClose}>&times;</button></div>
    <div className="modal-body">
      <div className="ctl-row"><span className="ctl-label" id="png-resolution-label">Resolution</span><div className="ctl-input"><div className="pills pills-fit" role="group" aria-labelledby="png-resolution-label">
        {(Object.keys(PNG_RESOLUTIONS) as Array<keyof typeof PNG_RESOLUTIONS>).map(res=><button type="button" key={res} className={`pill ${resolution===res?'active':''}`} aria-pressed={resolution===res} disabled={busy} onClick={()=>{setResolution(res);setDone(false);}}>{res}</button>)}
        {scene.aspect==='custom'&&<button type="button" className={`pill ${resolution==='exact'?'active':''}`} aria-pressed={resolution==='exact'} disabled={busy} onClick={()=>{setResolution('exact');setDone(false);}} title="Exact canvas dimensions">{scene.customW}&times;{scene.customH}</button>}
      </div></div></div>
      <div className="ctl-hint">Output {size.width}&times;{size.height} px{carousel?' per slide':''}</div>
      {error&&<div className="export-error" role="alert">{error}</div>}
      {done&&<div className="ctl-hint" role="status">{carousel?'Numbered PNGs downloaded as a ZIP.':'PNG downloaded.'}</div>}
      <button type="button" className="btn primary full" disabled={busy} onClick={start}>{busy?'Exporting...':'Start export'}</button>
    </div>
  </dialog>,document.body);
}
