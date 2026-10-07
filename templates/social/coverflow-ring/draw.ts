import { socialPostColors } from '../theme';
import { textBox } from '../canvas';
import type { SocialImages, SocialValues } from '../types';

// Transparent title layer: shared by the live renderer, catalogue, and video export.
export function drawCoverflowHeading(canvas: HTMLCanvasElement, values: SocialValues, images: SocialImages) {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scale = Math.min(canvas.width / 1080, canvas.height / 1350);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height * 0.11);
  ctx.scale(scale, scale);
  const light = values.postTheme === 'Light';
  const logo = light ? images.blackLogo : images.whiteLogo;
  const logoWidth = 104;
  ctx.drawImage(logo, -logoWidth / 2, 0, logoWidth, logoWidth * logo.naturalHeight / logo.naturalWidth);
  const size = Math.max(40, Math.min(110, Number(values.headingSize ?? 80)));
  ctx.fillStyle = socialPostColors(values.postTheme).text;
  textBox(ctx, String(values.heading ?? ''), { x: -400, y: 120, width: 800, height: 350, size, weight: 600, lineHeight: size * 1.2, align: 'center' });
  ctx.restore();
}
