// Canvas top/middle baselines differ from the CSS line-box baseline used by inputs.
const offsets = new Map<string, number>();
export function baselineShift(fontFamily: string, weight: number, lineHeight: number, baseline: 'top' | 'middle' | 'dom' = 'top') {
  if(baseline==='dom')return 0;
  const key=JSON.stringify([fontFamily,weight,lineHeight,baseline]);
  if(offsets.has(key))return offsets.get(key)!;
  const size=100;
  const probe=document.createElement('div');
  probe.style.cssText=`position:fixed;left:-10000px;top:0;visibility:hidden;white-space:nowrap;padding:0;border:0;margin:0;font-family:${fontFamily};font-size:${size}px;font-weight:${weight};line-height:${lineHeight};`;
  probe.appendChild(document.createTextNode('Hg'));
  const marker=document.createElement('span');
  marker.style.cssText='display:inline-block;width:0;height:0;padding:0;margin:0;border:0;vertical-align:baseline;';
  probe.appendChild(marker);document.body.appendChild(probe);
  const domBaseline=marker.getBoundingClientRect().top-probe.getBoundingClientRect().top;
  probe.remove();
  const ctx=document.createElement('canvas').getContext('2d')!;
  ctx.font=`${weight} ${size}px ${fontFamily}`;
  ctx.textBaseline='alphabetic';const alphabetic=ctx.measureText('Hg').actualBoundingBoxAscent;
  ctx.textBaseline=baseline;const positioned=ctx.measureText('Hg').actualBoundingBoxAscent;
  const shift=(alphabetic-positioned+(baseline==='middle'?size/2:0)-domBaseline)/size;
  offsets.set(key,shift);return shift;
}
