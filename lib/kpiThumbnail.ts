import { KpiParticleScene } from './kpiParticleScene';
import { loadSocialFonts } from './socialAssets';
import { drawKpiText } from '@/templates/social/kpi/draw';
import { socialKpi } from '@/templates/social/kpi';

// All thumbnail mounts share one context and one cached image, including Strict Mode.
let ready: Promise<HTMLCanvasElement> | undefined;
let scene: KpiParticleScene | undefined;
export function kpiThumbnail() {
  return ready ??= loadSocialFonts().then(() => {
    scene ??= new KpiParticleScene();
    const values = Object.fromEntries(socialKpi.controls.map(def => [def.key, def.default]));
    const canvas = document.createElement('canvas'); canvas.width = 216; canvas.height = 262;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const image = scene.render(values, 0, canvas.width, canvas.height);
    ctx.drawImage(image.canvas, -image.overscan, 0);
    ctx.scale(canvas.width / 1080, canvas.height / 1312); drawKpiText(ctx, values);
    return canvas;
  }).catch(error => { ready = undefined; throw error; });
}
