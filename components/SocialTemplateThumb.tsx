'use client';
import { useEffect, useRef } from 'react';
import type { Template } from '@/lib/types';
import { defaultsFor } from '@/templates';

export default function SocialTemplateThumb({ template }: { template: Template }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let active = true;
    const values = defaultsFor(template.meta.id);
    if (template.meta.id === 'social-kpi') {
      import('@/lib/kpiThumbnail').then(({ kpiThumbnail }) => kpiThumbnail()).then(image => {
        if (active && canvas.current) canvas.current.getContext('2d')?.drawImage(image, 0, 0, canvas.current.width, canvas.current.height);
      }).catch(() => { /* The template remains selectable if WebGL is unavailable. */ });
      return () => { active = false; };
    }
    import('@/lib/socialRenderer').then(async ({ prepareSocialArtwork, drawSocialArtwork, socialArtwork }) => {
      const images = await prepareSocialArtwork(template.meta.id, values);
      if (active && canvas.current) drawSocialArtwork(canvas.current, template.meta.id, values, images, socialArtwork(template.meta.id).previewTime);
    }).catch(() => { /* Keep the labelled template card available if its assets cannot load. */ });
    return () => { active = false; };
  }, [template.meta.id]);
  const size = template.meta.socialSize ?? { width: 1080, height: 1080 };
  return <div className="tpl-thumb social-template-thumb" aria-hidden="true"><canvas ref={canvas} width={216} height={Math.round(216 * size.height / size.width)} /></div>;
}
