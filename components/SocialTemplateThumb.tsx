'use client';
import { useEffect, useRef } from 'react';
import type { Template } from '@/lib/types';
import { defaultsFor } from '@/templates';

export default function SocialTemplateThumb({ template }: { template: Template }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let active = true;
    let started = false;
    const values = defaultsFor(template.meta.id);
    const paint = () => {
      if (started || !active) return;
      started = true;
      if (template.meta.id === 'social-kpi') {
        import('@/lib/kpiThumbnail').then(({ kpiThumbnail }) => kpiThumbnail()).then(image => {
          if (active && canvas.current) canvas.current.getContext('2d')?.drawImage(image, 0, 0, canvas.current.width, canvas.current.height);
        }).catch(() => { /* The template remains selectable if WebGL is unavailable. */ });
        return;
      }
      import('@/lib/socialRenderer').then(async ({ prepareSocialArtwork, drawSocialArtwork, socialArtwork }) => {
        const images = await prepareSocialArtwork(template.meta.id, values, 'background');
        if (active && canvas.current) drawSocialArtwork(canvas.current, template.meta.id, values, images, socialArtwork(template.meta.id).previewTime);
      }).catch(() => { /* Keep the labelled template card available if its assets cannot load. */ });
    };
    // Report captures are more expensive than canvas-only thumbnails. Prepare
    // visible cards, sharing their results with the stage through the cache.
    let observer: IntersectionObserver | undefined;
    if (template.meta.id.startsWith('moonvine-') && canvas.current && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer?.disconnect();
          paint();
        }
      });
      observer.observe(canvas.current);
    } else paint();
    return () => { active = false; observer?.disconnect(); };
  }, [template.meta.id]);
  const size = template.meta.socialSize ?? { width: 1080, height: 1080 };
  return <div className="tpl-thumb social-template-thumb" aria-hidden="true"><canvas ref={canvas} width={216} height={Math.round(216 * size.height / size.width)} /></div>;
}
