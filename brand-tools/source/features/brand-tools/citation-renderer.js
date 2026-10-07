import orbitSource from "@/assets/rive files/moonvine orbit.riv?url";
import stepperSource from "@/assets/rive files/moonvine_stepper.riv?url";

export const animations = [
  { value: "orbit", label: "Orbit", src: orbitSource },
  { value: "stepper-1", label: "Stepper 01", src: stepperSource, artboard: "Artboard" },
  { value: "stepper-2", label: "Stepper 02", src: stepperSource, artboard: "Artboard 2" },
  { value: "stepper-3", label: "Stepper 03", src: stepperSource, artboard: "Artboard 3" },
  { value: "stepper-4", label: "Stepper 04", src: stepperSource, artboard: "Artboard 4" },
];

// Visible structural bounds in the source surfaces (not the padded artboards).
// Keep these fixed through playback so entrance motion never causes rescaling.
const artworkBounds = {
  orbit: { x: 56, y: 35, width: 993, height: 817 },
  "stepper-1": { x: 465, y: 411, width: 619, height: 619 },
  "stepper-2": { x: 398, y: 337, width: 686, height: 693 },
  "stepper-3": { x: 531, y: 478, width: 553, height: 553 },
  "stepper-4": { x: 532, y: 479, width: 552, height: 552 },
};

export const defaultAssetSettings = { size: 92, x: -46, y: -154 };
export const postThemes = {
  dark: { background: "#1b1b1b", foreground: "#f2f3eb", rule: "#8b8c86" },
  light: { background: "#f2f3eb", foreground: "#1b1b1b", rule: "#8b8c86" },
};
export const assetSettingLimits = { size: [25, 200], x: [-1350, 1350], y: [-1350, 1350] };

export function assetSettingsKey(draft) {
  return `${draft.animation}:${draft.orientation}`;
}

export function getAssetSettings(draft) {
  return draft.assetSettings?.[assetSettingsKey(draft)] ?? defaultAssetSettings;
}

export function getArtworkPlacement(draft) {
  const bounds = artworkBounds[draft.animation] ?? artworkBounds.orbit;
  const settings = getAssetSettings(draft);
  const scale = Math.min(993 / bounds.width, 817 / bounds.height) * settings.size / 100;
  const landscape = draft.orientation === "landscape";
  // Match Orbit's original visual center, then apply the selected asset's offsets.
  const centerX = (landscape ? 698 : 288) + 993 / 2;
  const centerY = (landscape ? 572 : 754) + 817 / 2;
  return {
    scale,
    x: centerX - (bounds.x + bounds.width / 2) * scale + settings.x,
    y: centerY - (bounds.y + bounds.height / 2) * scale + settings.y,
  };
}

export const initialCitation = {
  quote: "The easiest way to destroy trust is to pretend certainty.",
  author: "Tom Conlon",
  attribution: "Moonvine",
  showAuthorDetails: true,
  orientation: "portrait",
  theme: "dark",
  animation: "orbit",
  quoteSize: 98,
  authorSize: 36,
  attributionSize: 25,
  duration: 6,
  assetSettings: {},
};

export function dimensions(orientation) {
  return orientation === "landscape" ? [1350, 1080] : [1080, 1350];
}

export function wrapText(context, text, width) {
  const lines = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/)) {
      const candidate = line ? `${line} ${word}` : word;
      if (context.measureText(candidate).width <= width) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      line = "";
      // Split unbroken URLs / long words instead of clipping the export.
      for (const character of word) {
        if (line && context.measureText(line + character).width > width) {
          lines.push(line);
          line = "";
        }
        line += character;
      }
    }
    lines.push(line);
  }
  return lines;
}

export function drawCitation(canvas, draft, artwork) {
  const [width, height] = dimensions(draft.orientation);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const context = canvas.getContext("2d");
  const theme = postThemes[draft.theme] ?? postThemes.dark;
  context.clearRect(0, 0, width, height);
  const portrait = draft.orientation === "portrait";
  const x = portrait ? 98 : 108;
  const top = portrait ? 115 : 104;
  const textWidth = portrait ? 900 : 920;
  const maxQuoteHeight = 350;
  let size = draft.quoteSize;
  let lines;
  do {
    context.font = `600 ${size}px "Nib Pro", Georgia, serif`;
    lines = wrapText(context, draft.quote, textWidth);
    if (lines.length * size * 1.0482 <= maxQuoteHeight || size <= 20) break;
    size -= 1;
  } while (size > 0);

  // The artwork is behind the text and clipped by the canvas, as in Figma.
  if (artwork) {
    const placement = getArtworkPlacement(draft);
    context.drawImage(artwork, placement.x, placement.y, artwork.width * placement.scale, artwork.height * placement.scale);
    // Tint the artwork's alpha so theme changes also update paused frames,
    // without restarting Rive or waiting for its next animation frame.
    context.globalCompositeOperation = "source-in";
    context.fillStyle = theme.foreground;
    context.fillRect(0, 0, width, height);
  }
  context.globalCompositeOperation = "destination-over";
  context.fillStyle = theme.background;
  context.fillRect(0, 0, width, height);
  context.globalCompositeOperation = "source-over";
  context.fillStyle = theme.foreground;
  context.textBaseline = "top";
  lines.forEach((line, index) => context.fillText(line, x, top + index * size * 1.0482));
  const authorTop = Math.max(portrait ? 511 : 500, top + lines.length * size * 1.0482 + 64);
  let y = authorTop;
  const authorDetails = draft.showAuthorDetails !== false
    ? [[draft.author, draft.authorSize], [draft.attribution, draft.attributionSize]]
    : [];
  for (const [text, fontSize] of authorDetails) {
    if (!text.trim()) continue;
    context.font = `600 ${fontSize}px "Nib Pro", Georgia, serif`;
    for (const line of wrapText(context, text, textWidth - 24)) {
      context.fillText(line, x + 18, y);
      y += fontSize * 1.15;
    }
    y += 9;
  }
  if (y > authorTop) {
    context.fillStyle = theme.rule;
    context.fillRect(x, authorTop + 3, 1, Math.max(67, y - authorTop - 9));
  }
  return { fittedSize: size, overflow: lines.length * size * 1.0482 > maxQuoteHeight || y > height - 72 };
}

export function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function videoMimeType() {
  if (typeof MediaRecorder === "undefined") return null;
  return ["video/mp4;codecs=avc1.42001f", "video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"]
    .find((type) => MediaRecorder.isTypeSupported(type)) ?? null;
}
