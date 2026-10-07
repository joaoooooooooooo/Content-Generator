import type { SocialArtwork } from '../types';
import { socialPostColors } from '../theme';
import { textBox } from '../canvas';
const root = '/social/testimonial/assets/';
export const testimonialArtwork: SocialArtwork = {
  width: 1080, height: 1350, fonts: true,
  background: (values) => socialPostColors(values.postTheme).background,
  images: (values) => ({
    quote: root + 'quote.svg', logo: root + 'logo.svg',
    ...(values.showPhoto !== 'Off' ? { photo: String(values.clientPhoto ?? root + 'client.png') } : {}),
  }),
  draw(ctx, values, images) {
    const colors = socialPostColors(values.postTheme);
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, 1080, 1350);
    // Preserve the brand graphics at their authored dimensions.
    ctx.save();
    ctx.filter = colors.graphicFilter;
    ctx.drawImage(images.quote, 111.9326, 95.0668);
    ctx.drawImage(images.logo, 121.6639, 1198.859);
    ctx.restore();
    const headingSize = Math.max(40, Math.min(100, Number(values.headingSize ?? 76.002)));
    const clientScale = Math.max(50, Math.min(150, Number(values.clientSize ?? 100))) / 100;
    const showPhoto = values.showPhoto !== 'Off';
    const clientHeight = 141.0374 * clientScale;
    ctx.fillStyle = colors.text;
    // Let larger headings grow downward; reserve space for the client and logo.
    const headingHeight = textBox(ctx, String(values.heading ?? ''), {
      x: 104.3176, y: 216.4356, width: 733,
      height: 1198.859 - 80 - clientHeight - 90 - 216.4356,
      size: headingSize, weight: 600, lineHeight: 92 * headingSize / 76.002,
    });
    const clientY = Math.max(766.1823, 216.4356 + headingHeight + 90);
    ctx.save();
    // One transform scales the photo, both text lines, and their spacing together.
    ctx.translate(111.9326, clientY);
    ctx.scale(clientScale, clientScale);
    if (showPhoto) {
      ctx.save();
      ctx.beginPath(); ctx.roundRect(0, 6.4531, 130.4399, 134.5843, 8.292); ctx.clip();
      const photo = images.photo;
      if (String(values.clientPhoto ?? root + 'client.png').endsWith('/social/testimonial/assets/client.png')) {
        ctx.drawImage(photo, -130.4399 * .0895, 6.4531 - 134.5843 * .0722, 130.4399 * 1.179, 134.5843 * 1.4288);
      } else {
        const scale = Math.max(130.4399 / photo.naturalWidth, 134.5843 / photo.naturalHeight);
        ctx.drawImage(photo, (130.4399 - photo.naturalWidth * scale) / 2, 6.4531 + (134.5843 - photo.naturalHeight * scale) / 2, photo.naturalWidth * scale, photo.naturalHeight * scale);
      }
      ctx.restore();
    }
    const textX = showPhoto ? 164.5773 : 0;
    const textWidth = (1080 - 2 * 111.9326) / clientScale - textX;
    textBox(ctx, String(values.clientName ?? ''), { x: textX, y: 0, width: textWidth, height: 86, size: 70.985, weight: 400, lineHeight: 86 });
    ctx.fillStyle = colors.secondary;
    textBox(ctx, String(values.clientRole ?? ''), { x: textX, y: 85.9297, width: textWidth, height: 55, size: 45.334, weight: 400, lineHeight: 55 });
    ctx.restore();
  },
};
