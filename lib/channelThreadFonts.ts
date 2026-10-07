import { asset } from './paths';
import { loadSocialFonts } from './socialAssets';

let fonts: Promise<void> | undefined;
export function loadChannelThreadFonts() {
  return fonts ??= Promise.all([
    loadSocialFonts(),
    ...[400, 500, 600, 700].map(weight => new FontFace('Barlow', 'url("' + asset('/social/channel-thread/Barlow-' + weight + '.woff2') + '")', { weight: String(weight) }).load().then(font => { document.fonts.add(font); })),
  ]).then(() => {}).catch(error => { fonts = undefined; throw error; });
}
