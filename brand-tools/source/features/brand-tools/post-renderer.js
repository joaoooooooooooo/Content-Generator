import logoDark from "@/assets/Logo type - Dark.svg";
import logoLight from "@/assets/Logo type - Light.svg";
import { defaultAssetSettings, dimensions, postThemes, wrapText } from "./citation-renderer";
import { reportFeatures } from "./report-features";

export const postLogoSources = { dark: logoDark, light: logoLight };
export const initialPost = {
  heading: "A small to medium heading can go right here",
  tagline: "Your brand, in perspective.",
  headingSize: 68, taglineSize: 28, logoSize: 180,
  orientation: "portrait", theme: "dark", feature: "visibility", scenario: "typical",
  assetSettings: {},
};
export const postPlacementKey = (draft) => `${draft.feature}:${draft.orientation}`;
export const getPostPlacement = (draft) => draft.assetSettings[postPlacementKey(draft)] ?? defaultAssetSettings;

export function drawPost(canvas, draft, feature, logo, background) {
  const [width, height] = dimensions(draft.orientation);
  if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
  const ctx = canvas.getContext("2d");
  const theme = postThemes[draft.theme];
  const portrait = draft.orientation === "portrait";
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
  const backgroundPixel = ctx.getImageData(0, 0, 1, 1).data;
  if (feature) {
    const placement = getPostPlacement(draft);
    const featureWidth = (reportFeatures.find((item) => item.value === draft.feature)?.postWidth ?? 1100) * placement.size / 100;
    ctx.drawImage(feature, (portrait ? 220 : 470) + placement.x, (portrait ? 760 : 610) + placement.y, featureWidth, featureWidth * feature.height / feature.width);
    // Blend opaque pixels directly to the canvas's resolved background bytes.
    // An intermediate alpha mask rounds premultiplied RGB and can turn a flat
    // #111111 surface into #101010 bands, even when both backgrounds match.
    const fadeTop = Math.floor(height * 0.72);
    const fadeHeight = height - fadeTop;
    const fade = ctx.getImageData(0, fadeTop, width, fadeHeight);
    for (let row = 0; row < fadeHeight; row++) {
      const t = row / (fadeHeight - 1);
      const visibility = 1 - t * t * (3 - 2 * t);
      const rowEnd = (row + 1) * width * 4;
      for (let offset = row * width * 4; offset < rowEnd; offset += 4) {
        for (let channel = 0; channel < 3; channel++) {
          fade.data[offset + channel] = Math.round(backgroundPixel[channel] + (fade.data[offset + channel] - backgroundPixel[channel]) * visibility);
        }
      }
    }
    ctx.putImageData(fade, 0, fadeTop);
  }
  const left = 80;
  const logoY = 108;
  if (logo) ctx.drawImage(logo, left, logoY, draft.logoSize, draft.logoSize * logo.naturalHeight / logo.naturalWidth);
  ctx.textBaseline = "middle";
  const centerY = logoY + (logo ? draft.logoSize * logo.naturalHeight / logo.naturalWidth : 26) / 2;
  if (draft.tagline.trim()) {
    const ruleX = left + draft.logoSize + 26;
    ctx.fillStyle = theme.rule;
    ctx.fillRect(ruleX, centerY - 12, 1, 24);
    let taglineSize = draft.taglineSize;
    do { ctx.font = `400 ${taglineSize}px Geist, sans-serif`; if (ctx.measureText(draft.tagline).width <= width - ruleX - 104 || taglineSize <= 10) break; taglineSize--; } while (taglineSize > 0);
    ctx.fillText(draft.tagline, ruleX + 26, centerY);
  }
  let size = draft.headingSize;
  let lines;
  const maxHeight = portrait ? 330 : 245;
  do {
    ctx.font = `600 ${size}px "Nib Pro", Georgia, serif`;
    lines = wrapText(ctx, draft.heading, width - 160);
    if (lines.length * size * 1.05 <= maxHeight || size <= 20) break;
    size--;
  } while (size > 0);
  ctx.fillStyle = theme.foreground;
  ctx.textBaseline = "top";
  lines.forEach((line, index) => ctx.fillText(line, left, 180 + index * size * 1.05));
  return { overflow: lines.length * size * 1.05 > maxHeight };
}
