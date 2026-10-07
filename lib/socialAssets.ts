import { asset } from './paths';
import { idbGet } from './assetDb';
import type { SocialImages } from '@/templates/social/types';

export const SOCIAL_ASSET_PREFIX = 'social-asset:';
const images = new Map<string, Promise<HTMLImageElement>>();
let fonts: Promise<void> | undefined;

export function loadSocialFonts(): Promise<void> {
  if (!fonts) fonts = Promise.all([
    new FontFace('Inter Tight', 'url("' + asset('/social/shared/fonts/InterTight-Latin.woff2') + '")', { weight: '100 900', unicodeRange: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD' }).load(),
    new FontFace('Inter Tight', 'url("' + asset('/social/shared/fonts/InterTight-LatinExt.woff2') + '")', { weight: '100 900', unicodeRange: 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF' }).load(),
  ]).then((loaded) => { loaded.forEach((font) => document.fonts.add(font)); }).catch((error) => { fonts = undefined; throw error; });
  return fonts;
}

export function loadSocialImage(source: string): Promise<HTMLImageElement> {
  const existing = images.get(source);
  if (existing) return existing;
  const pending = (async () => {
    let url = asset(source);
    let objectUrl: string | undefined;
    if (source.startsWith(SOCIAL_ASSET_PREFIX)) {
      const blob = await idbGet(source);
      if (!blob) throw new Error('The saved client photo is unavailable. Please upload it again.');
      objectUrl = URL.createObjectURL(blob); url = objectUrl;
    }
    try {
      const img = new Image(); img.crossOrigin = 'anonymous'; img.src = url;
      await img.decode(); return img;
    } finally { if (objectUrl) URL.revokeObjectURL(objectUrl); }
  })().catch((error) => { images.delete(source); throw error; });
  images.set(source, pending);
  return pending;
}

export async function loadSocialImages(sources: Record<string, string>, optional = false): Promise<SocialImages> {
  const entries = await Promise.all(Object.entries(sources).map(async ([key, source]) => {
    try { return [key, await loadSocialImage(source)] as const; }
    catch (error) { if (!optional) throw error; return null; }
  }));
  return Object.fromEntries(entries.filter((entry) => entry !== null));
}
