'use client';

import { useState } from 'react';
import { getRendererInstance } from '@/lib/rendererInstance';
import { getTemplate } from '@/templates';
import { useSceneStore } from '@/store/useSceneStore';

export default function SocialExport() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const exportPng = async () => {
    setBusy(true); setError('');
    const templateId = useSceneStore.getState().activeTemplateId;
    let renderer = getRendererInstance();
    try {
      // The panel can mount before the dynamically imported stage is ready.
      const deadline = Date.now() + 5000;
      while (!renderer?.prepareFrame && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        renderer = getRendererInstance();
      }
      if (!renderer?.prepareFrame || useSceneStore.getState().activeTemplateId !== templateId) throw new Error('Preview is still loading. Please try again.');
      await renderer.prepareFrame?.();
      if (getRendererInstance() !== renderer) throw new Error('Template changed');
      const scene = useSceneStore.getState();
      renderer.setCaptureScale(scene.aspect === 'custom' ? scene.customW / scene.width : 1);
      renderer.renderFrame(0);
      const url = renderer.extractCanvas().toDataURL('image/png');
      if (!url) throw new Error('No image');
      const link = document.createElement('a');
      link.href = url;
      link.download = getTemplate(scene.activeTemplateId).meta.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.png';
      link.click();
      setError('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not export the post. Please try again.');
    } finally {
      setBusy(false);
      renderer?.setCaptureScale(1);
      renderer?.renderFrame(0);
    }
  };
  return <div className="social-export">
    {error && <span className="ctl-hint" role="alert">{error}</span>}
    <button className="btn solid" disabled={busy} onClick={exportPng}>{busy ? 'Preparing PNG...' : 'Export PNG'}</button>
  </div>;
}
