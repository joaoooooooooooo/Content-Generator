import * as PIXI from 'pixi.js';
import { loadSocialFonts, loadSocialImages } from './socialAssets';
import { drawCoverflowHeading } from '@/templates/social/coverflow-ring/draw';
import type { SocialImages, SocialValues } from '@/templates/social/types';

// The title is rasterized only on content/size changes, never once per animation frame.
export class SocialMotionHeader {
  readonly sprite = new PIXI.Sprite();
  onDirty?: () => void;
  private images?: SocialImages;
  private loading?: Promise<void>;
  private canvas?: HTMLCanvasElement;
  private texture?: PIXI.Texture;
  private key = '';
  constructor() { this.sprite.visible = false; }
  async prepare() {
    if (this.images) return;
    if (!this.loading) this.loading = Promise.all([
      loadSocialFonts(),
      loadSocialImages({ whiteLogo: '/social/shared/logos/apta-logo-white.svg', blackLogo: '/social/shared/logos/apta-logo-black.svg' }),
    ]).then(([, images]) => { this.images = images; this.onDirty?.(); })
      .finally(() => { this.loading = undefined; });
    await this.loading;
  }
  update(enabled: boolean, values: SocialValues, width: number, height: number, resolution = 1) {
    this.sprite.visible = enabled && !!this.images;
    if (!enabled) return;
    if (!this.images) {
      if (!this.loading) void this.prepare().catch(() => { /* export reports loading errors */ });
      return;
    }
    const key = JSON.stringify([width, height, resolution, values.heading, values.headingSize, values.postTheme]);
    if (key === this.key) return;
    const w = Math.max(1, Math.round(width * resolution)), h = Math.max(1, Math.round(height * resolution));
    const resized = !this.canvas || this.canvas.width !== w || this.canvas.height !== h;
    if (resized) { this.canvas = document.createElement('canvas'); this.canvas.width = w; this.canvas.height = h; }
    drawCoverflowHeading(this.canvas!, values, this.images);
    if (resized || !this.texture) {
      const previous = this.texture;
      this.texture = PIXI.Texture.from(this.canvas!);
      this.sprite.texture = this.texture;
      previous?.destroy(true);
    } else this.texture.source.update();
    this.sprite.width = width; this.sprite.height = height;
    this.key = key;
  }
  destroy() { this.texture?.destroy(true); this.images = undefined; }
}
