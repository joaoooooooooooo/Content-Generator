'use client';
import { useState } from 'react';
import { useSceneStore } from '@/store/useSceneStore';
import PngExportDialog from './PngExportDialog';
export default function SocialExport() {
  const [open,setOpen]=useState(false);
  const carousel=useSceneStore(s=>s.carouselSlides.length>1);
  return <div className="social-export"><button type="button" className="btn solid" onClick={()=>setOpen(true)}>{carousel?'Export carousel PNGs':'Export PNG'}</button>{open&&<PngExportDialog carousel={carousel} onClose={()=>setOpen(false)}/>}</div>;
}
