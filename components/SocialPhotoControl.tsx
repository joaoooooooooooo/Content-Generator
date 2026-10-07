'use client';
import { useState } from 'react';
import { saveSourceIcon } from '@/lib/sourceIconUpload';
import { idbPut } from '@/lib/assetDb';
import { SOCIAL_ASSET_PREFIX } from '@/lib/socialAssets';
import { useSceneStore } from '@/store/useSceneStore';
import type { ControlDef } from '@/lib/types';

export default function SocialPhotoControl({ def }: { def: ControlDef }) {
  const isIcon = def.key.startsWith('sourceIcon');
  const value = useSceneStore((s) => s.values[def.key]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const upload = async (file?: File) => {
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp', ...(def.key.startsWith('sourceIcon')?['image/svg+xml']:[])].includes(file.type)) { setError(isIcon?'Choose a PNG, JPG, WebP, or SVG image.':'Choose a PNG, JPG, or WebP image.'); return; }
    if (file.size > 20 * 1024 * 1024) { setError('Choose an image smaller than 20 MB.'); return; }
    setBusy(true); setError('');
    const trackId = useSceneStore.getState().activeTrackId;
    const templateId = useSceneStore.getState().activeTemplateId;
    try {
      let id:string;
      if(def.key.startsWith('sourceIcon'))id=await saveSourceIcon(file);
      else {const decoded=await createImageBitmap(file);decoded.close();id=SOCIAL_ASSET_PREFIX+crypto.randomUUID();await idbPut(id,file);}
      const current = useSceneStore.getState();
      if (current.activeTrackId === trackId && current.activeTemplateId === templateId) current.setValue(def.key, id);
    } catch { setError('Could not save the photo. Please try another image.'); }
    finally { setBusy(false); }
  };
  return <div className="ctl-section">
    <div className="ctl-row">
      <label className="ctl-label" htmlFor={'social-' + def.key}>{def.label}</label>
      <div className="ctl-input"><label className="upload">
        <input id={'social-' + def.key} type="file" accept={def.key.startsWith('sourceIcon')?"image/png,image/jpeg,image/webp,image/svg+xml":"image/png,image/jpeg,image/webp"} disabled={busy} onChange={(e) => { void upload(e.target.files?.[0]); e.target.value = ''; }} />
        <span>{busy ? 'Saving...' : isIcon ? 'Replace icon...' : 'Replace photo...'}</span>
      </label></div>
    </div>
    {value !== def.default && <button className="btn full" disabled={busy} onClick={() => useSceneStore.getState().setValue(def.key, def.default)}>{isIcon ? 'Reset icon' : 'Reset photo'}</button>}
    {error && <div className="ctl-hint" role="alert">{error}</div>}
  </div>;
}
