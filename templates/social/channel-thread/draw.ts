import type { SocialArtwork, SocialValues } from '../types';
import { loadChannelThreadFonts } from '@/lib/channelThreadFonts';
import { AVATAR, AVATAR_RISE, AVATAR_X, FADE, NAME_GAP, REF_H, REF_W, SIZE, TEXT_X, TIME_SIZE, messageCount, numberValue, read, scrollAt, threadColors, threadLayout, type ThreadLine } from './model';

const layouts = new WeakMap<SocialValues, ThreadLine[]>();
function linesFor(values: SocialValues) {
  let lines = layouts.get(values);
  if (!lines) { lines = threadLayout(values); layouts.set(values, lines); }
  return lines;
}
export const channelThreadArtwork: SocialArtwork = {
  width: 1280, height: 720, previewTime: 2.5,
  prepare: loadChannelThreadFonts, optionalImages: true,
  background: values => threadColors(values).background,
  images(values) {
    const images: Record<string, string> = {};
    if (values.showAvatars === 'Off') return images;
    for (let i = 1; i <= messageCount(values); i++) {
      const src = String(values['message' + i + '.avatar'] ?? '');
      if (src) images['avatar' + i] = src;
    }
    return images;
  },
  draw(ctx, values, images, seconds = 0) {
    const lines = linesFor(values);
    const time = seconds * Math.max(0, numberValue(values, 'speed', 1));
    const scroll = scrollAt(lines, time, values);
    const colors = threadColors(values);
    const face = values.fontFamily === 'Inter Tight' ? '"Inter Tight"' : values.fontFamily === 'System' ? 'Arial, sans-serif' : '"Barlow"';
    const size = numberValue(values, 'fontSize', SIZE);
    const spacing = numberValue(values, 'lineSpacing', 1);
    const scale = 720 / REF_H * numberValue(values, 'zoom', 100) / 100;
    const opacity = (y: number) => values.fadeHistory === 'Off' ? 1 : read(FADE, y);
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, 1280, 720); ctx.clip();
    ctx.translate((1280 - REF_W * scale) / 2, (720 - REF_H * scale) / 2); ctx.scale(scale, scale);
    ctx.letterSpacing = '0px'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    const width = REF_W - TEXT_X - 24;
    for (const line of lines) {
      const y = line.y - scroll, nameY = y - NAME_GAP * spacing;
      if (y < -80 || nameY > REF_H + 80 || time < line.opens) continue;
      // First visible group is already present; later groups trail the scroll by 3/30 s.
      const arrived = line === lines[0] && line.at === 0 || time >= Math.min(line.at, line.opens + 0.1);
      if (line.head && arrived) {
        if (values.showAvatars !== 'Off') {
          ctx.save(); ctx.globalAlpha = opacity(nameY - AVATAR_RISE + AVATAR / 2);
          ctx.beginPath(); ctx.roundRect(AVATAR_X, nameY - AVATAR_RISE, AVATAR, AVATAR, 8); ctx.clip();
          const image = images['avatar' + line.id];
          if (image) {
            const crop = Math.min(image.naturalWidth, image.naturalHeight);
            ctx.drawImage(image, (image.naturalWidth - crop) / 2, (image.naturalHeight - crop) / 2, crop, crop, AVATAR_X, nameY - AVATAR_RISE, AVATAR, AVATAR);
          } else {
            ctx.fillStyle = colors.accent; const alpha = ctx.globalAlpha; ctx.globalAlpha = alpha * 0.16;
            ctx.fillRect(AVATAR_X, nameY - AVATAR_RISE, AVATAR, AVATAR); ctx.globalAlpha = alpha;
            ctx.font = `600 ${AVATAR * 0.45}px ${face}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(Array.from(line.author)[0]?.toUpperCase() ?? '?', AVATAR_X + AVATAR / 2, nameY - AVATAR_RISE + AVATAR / 2);
          }
          ctx.restore();
        }
        ctx.globalAlpha = opacity(nameY); ctx.fillStyle = colors.text;
        ctx.font = `700 ${size}px ${face}`;
        const nameWidth = ctx.measureText(line.author).width;
        ctx.font = `500 ${TIME_SIZE * size / SIZE}px ${face}`;
        const timestamp = values.showTimestamps === 'Off' ? '' : line.timestamp;
        const timeWidth = Math.min(width * 0.55, ctx.measureText(timestamp).width);
        const maxName = Math.max(20, width - (timestamp ? timeWidth + 13.4 : 0));
        ctx.font = `700 ${size}px ${face}`;
        ctx.fillText(line.author, TEXT_X, nameY, maxName);
        if (timestamp) {
          ctx.fillStyle = colors.muted; ctx.font = `500 ${TIME_SIZE * size / SIZE}px ${face}`;
          ctx.fillText(timestamp, TEXT_X + Math.min(nameWidth, maxName) + 13.4, nameY, timeWidth);
        }
      }
      ctx.globalAlpha = opacity(y); ctx.fillStyle = colors.text;
      if (time >= line.at) {
        ctx.font = `400 ${size}px ${face}`;
        // A line remains a line, as in the source; longer edits fit inside the frame.
        const measured = ctx.measureText(line.text).width;
        if (measured > width) ctx.font = `400 ${size * width / measured}px ${face}`;
        ctx.fillText(line.text, TEXT_X, y);
      } else if (line.head && arrived && values.showTyping !== 'Off') {
        const step = Math.floor(((time - line.opens - 0.1 + 0.4) % 0.4) / 0.1);
        ctx.fillStyle = colors.muted;
        for (let i = 0; i < step; i++) { ctx.beginPath(); ctx.arc(TEXT_X + 3.3 + i * 8.4 + 2.5, y - 5.7, 2.5, 0, Math.PI * 2); ctx.fill(); }
      }
    }
    ctx.restore();
  },
};
