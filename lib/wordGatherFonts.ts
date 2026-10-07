import { asset } from './paths';
import { loadSocialFonts } from './socialAssets';

let fonts: Promise<void> | undefined;
export function loadWordGatherFonts() {
  return fonts ??= Promise.all([
    loadSocialFonts(),
    ...[400, 500, 600].map(weight => new FontFace('Figtree', 'url("' + asset('/social/word-gather/Figtree-' + weight + '.woff2') + '")', { weight: String(weight) }).load().then(font => { document.fonts.add(font); })),
  ]).then(() => {}).catch(error => { fonts = undefined; throw error; });
}
