// A normalized design space keeps type proportional to the shorter canvas edge,
// while margins, text columns, artwork, and fades reflow to the actual aspect.
export function brandLayout(width, height) {
  const scale = Math.min(width, height) / 1080;
  const w = width / scale, h = height / scale;
  const split = w / h >= 1.45;
  const margin = 80;
  return { scale, width: w, height: h, margin, split,
    textWidth: split ? w * 0.46 - margin : w - margin * 2,
    headingTop: 180, headingHeight: Math.min(h * 0.27, 430),
    artworkX: split ? w * 0.51 : w * 0.16,
    artworkY: split ? h * 0.24 : h * 0.46,
    artworkWidth: split ? w * 0.59 : w * 0.94,
  };
}
export function positionFor(values) {
  if (values.artworkPosition && Number.isFinite(values.artworkPosition.x) && Number.isFinite(values.artworkPosition.y)) return values.artworkPosition;
  // Preserve offsets in older saved posts that used separate pixel controls.
  return { x: ((Number(values.artworkX ?? -46)) + 46) / 10.8, y: ((Number(values.artworkY ?? -154)) + 154) / 13.5 };
}
