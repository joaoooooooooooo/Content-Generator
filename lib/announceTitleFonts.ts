import { asset } from './paths';
import { loadSocialFonts } from './socialAssets';
let fonts: Promise<void> | undefined;
export function loadAnnounceTitleFonts() {
  return fonts ??= Promise.all([loadSocialFonts(), new FontFace('Google Sans', `url("${asset('/motion-chips/announce-title/GoogleSans-400.woff2')}")`, { weight: '400' }).load().then(font => { document.fonts.add(font); })]).then(() => {}).catch(error => { fonts = undefined; throw error; });
}
