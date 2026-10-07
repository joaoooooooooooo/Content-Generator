import type { SocialArtwork } from '../types';
import { wrapText } from '../canvas';
export const testArtwork: SocialArtwork = {
  width: 1080, height: 1080, images: () => ({}),
  draw(ctx, values) {
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, 1080, 1080);
    const text = String(values.heading ?? '');
    let size = 91.8;
    ctx.letterSpacing = '0px';
    ctx.font = '700 ' + size + 'px Arial';
    let lines = wrapText(ctx, text, 864);
    while (lines.length * size * 1.2 > 864 && size > 1) {
      size *= 0.9; ctx.font = '700 ' + size + 'px Arial'; lines = wrapText(ctx, text, 864);
    }
    ctx.fillStyle = '#171717'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    lines.forEach((line, i) => ctx.fillText(line, 540, 540 + (i - (lines.length - 1) / 2) * size * 1.2));
  },
};
