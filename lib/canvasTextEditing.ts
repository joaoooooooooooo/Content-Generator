export interface TextRegion { key: string; kind?: 'image'; x: number; y: number; width: number; height: number; fontSize?: number; fontFamily?: string; fontWeight?: number; lineHeight?: number; letterSpacing?: number; baseline?: 'top' | 'middle' | 'dom' }
export type TextRegionCanvas = HTMLCanvasElement & { textRegions?: TextRegion[]; textTemplateId?: string };
export function hitText(regions: TextRegion[], x: number, y: number) {
  return [...regions].reverse().find(r => x >= r.x && x <= r.x+r.width && y >= r.y && y <= r.y+r.height);
}
