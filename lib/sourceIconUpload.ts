import { idbPut } from './assetDb';
import { SOCIAL_ASSET_PREFIX } from './socialAssets';
export async function saveSourceIcon(file:File) {
  if(!['image/png','image/jpeg','image/webp','image/svg+xml'].includes(file.type))throw new Error('Choose a PNG, JPG, WebP, or SVG image.');
  if(file.size>20*1024*1024)throw new Error('Choose an image smaller than 20 MB.');
  const url=URL.createObjectURL(file);
  try {const image=new Image();image.src=url;await image.decode();} finally {URL.revokeObjectURL(url);}
  const id=SOCIAL_ASSET_PREFIX+crypto.randomUUID();await idbPut(id,file);return id;
}
