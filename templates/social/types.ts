export type SocialValues = Record<string, unknown>;
export type SocialImages = Record<string, HTMLImageElement>;
export interface SocialArtwork {
  width: number;
  height: number;
  cacheKey?: (values: SocialValues) => string;
  prepareImages?: (values: SocialValues, priority?: import('@/lib/artworkQueue').ArtworkPriority) => Promise<SocialImages>;
  fonts?: boolean;
  prepare?: () => Promise<void>;
  optionalImages?: boolean;
  previewTime?: number;
  referenceDuration?: number;
  responsive?: boolean;
  background?: (values: SocialValues) => string;
  images: (values: SocialValues) => Record<string, string>;
  draw: (ctx: CanvasRenderingContext2D, values: SocialValues, images: SocialImages, seconds?: number, width?: number, height?: number) => void;
}
