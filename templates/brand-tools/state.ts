// Migrate saved pixel offsets to the position pad without resizing the canvas.
export function migrateBrandValues(id: string, saved: Record<string, any>): Record<string, any> {
  if (!id.startsWith('moonvine-')) return saved;
  const position = (value: Record<string, any>) => ({
    x: (Number(value.artworkX ?? -46) + 46) / 10.8,
    y: (Number(value.artworkY ?? -154) + 154) / (saved.orientation === 'Landscape' ? 10.8 : 13.5),
  });
  const values = { ...saved };
  if (!values.artworkPosition && ('artworkX' in values || 'artworkY' in values)) values.artworkPosition = position(values);
  if (values._placements) {
    const placements: Record<string, any> = {};
    for (const [key, raw] of Object.entries(values._placements)) {
      const item = raw as Record<string, any>;
      const [feature, orientation] = key.split(':');
      if (orientation && orientation !== saved.orientation) continue;
      placements[feature] = { artworkSize: item.artworkSize ?? 92, artworkPosition: item.artworkPosition ?? position(item) };
    }
    values._placements = placements;
  }
  return values;
}
