import { textBox } from '../canvas';
import { socialPostColors } from '../theme';
import type { SocialValues } from '../types';

export function drawKpiText(ctx: CanvasRenderingContext2D, values: SocialValues) {
  const x = Number(values.textX ?? 29) * 10.8;
  const y = Number(values.textY ?? 33.8) * 13.12;
  const width = Math.max(1, Math.min(Number(values.textWidth ?? 49) * 10.8, 1080 - x));
  const size = Number(values.metricSize ?? 116);
  ctx.fillStyle = socialPostColors(values.postTheme).text;
  const metricHeight = textBox(ctx, String(values.metric ?? '20+'), {
    x, y, width, height: Math.min(size * 1.5, 1312 - y), size, weight: 600, lineHeight: size * 1.12,
  });
  const descriptionY = y + metricHeight + 9;
  const descriptionSize = Number(values.descriptionSize ?? 58);
  textBox(ctx, String(values.description ?? ''), {
    x, y: descriptionY, width, height: Math.max(1, 1312 - descriptionY - 60),
    size: descriptionSize, weight: 400, lineHeight: descriptionSize * 1.3, tracking: 0,
  });
}
