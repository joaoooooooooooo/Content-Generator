import { markText } from './text-regions';
import { brandLayout, positionFor } from './layout';
import { postThemes, wrapText } from './source/features/brand-tools/citation-renderer';
const bounds = {
  orbit: { x: 56, y: 35, width: 993, height: 817 },
  'stepper-1': { x: 465, y: 411, width: 619, height: 619 },
  'stepper-2': { x: 398, y: 337, width: 686, height: 693 },
  'stepper-3': { x: 531, y: 478, width: 553, height: 553 },
  'stepper-4': { x: 532, y: 479, width: 552, height: 552 },
};
function setFont(ctx, size, sans, tagline = false) {
  ctx.font = sans ? `500 ${size}px Geist, sans-serif` : tagline ? `400 ${size}px Geist, sans-serif` : `600 ${size}px "Nib Pro", Georgia, serif`;
  ctx.letterSpacing = sans ? '-2.23px' : '0px';
}
export function fittedText(ctx, text, size, width, height, sans, lineHeight = 1.05) {
  if (sans) lineHeight = 1.127;
  let lines;
  do {
    setFont(ctx, size, sans);
    lines = wrapText(ctx, String(text ?? ''), width);
    if (lines.length * size * lineHeight <= height || size <= 20) break;
    size--;
  } while (size > 0);
  return { lines, size, sans, lineHeight, height: lines.length * size * lineHeight, overflow: lines.length * size * lineHeight > height };
}
export function textTypography(text, designWidth) {
  return {fontSize:text.size/designWidth,fontFamily:text.sans?'Geist':'Nib Pro',fontWeight:text.sans?500:600,lineHeight:text.lineHeight,letterSpacing:(text.sans?-2.23:0)/designWidth};
}
export function paintText(ctx, text, x, y) {
  setFont(ctx, text.size, text.sans);
  ctx.textBaseline = 'top';
  text.lines.forEach((line, i) => ctx.fillText(line, x, y + i * text.size * text.lineHeight));
}
export function renderResponsive(canvas, values, prepared, seconds, width, height) {
  width = Math.max(1, Math.round(width)); height = Math.max(1, Math.round(height));
  if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
  canvas.textRegions = [];
  const ctx = canvas.getContext('2d');
  const layout = brandLayout(width, height);
  const { scale, width: w, height: h, margin, textWidth, headingTop, headingHeight } = layout;
  const theme = postThemes[values.postTheme === 'Light' ? 'light' : 'dark'];
  const background = prepared.background || theme.background;
  const sans = values.fontStyle === 'Sans';
  ctx.resetTransform(); ctx.clearRect(0, 0, width, height); ctx.fillStyle = background; ctx.fillRect(0, 0, width, height);
  ctx.save(); ctx.scale(scale, scale);
  const position = positionFor(values);
  const dx = position.x / 100 * w, dy = position.y / 100 * h;
  const artworkScale = Number(values.artworkSize ?? 92) / 92;
  let overflow = false;
  if (prepared.kind === 'citation') {
    const source = prepared.animation.frame(seconds);
    const b = bounds[values.animation] || bounds.orbit;
    const artWidth = (layout.split ? w * 0.56 : w * 0.92) * artworkScale;
    const k = artWidth / b.width;
    const x = (layout.split ? w * 0.49 : w * 0.21) + dx;
    const y = (layout.split ? h * 0.22 : h * 0.46) + dy;
    // Tint on a separate transparent layer so the canvas background stays opaque.
    const tint = prepared.tint;
    if (tint.width !== source.width || tint.height !== source.height) { tint.width = source.width; tint.height = source.height; }
    const tc = tint.getContext('2d');tc.clearRect(0,0,tint.width,tint.height);tc.drawImage(source,0,0);
    tc.globalCompositeOperation='source-in';tc.fillStyle=theme.foreground;tc.fillRect(0,0,tint.width,tint.height);tc.globalCompositeOperation='source-over';
    ctx.drawImage(tint, x-b.x*k, y-b.y*k, source.width*k, source.height*k);
    const quote = fittedText(ctx, values.quote, Number(values.quoteSize ?? 98), textWidth - 18, Math.min(h * 0.32, 480), sans);
    ctx.fillStyle = theme.foreground;paintText(ctx,quote,margin+18,108);
    markText(canvas,'quote',margin+18,108,textWidth-18,quote.height,w,h,textTypography(quote,w));
    overflow = quote.overflow;
    if (values.showAuthorDetails !== 'Off') {
      let y = Math.max(108 + quote.height + 64, Math.min(h * 0.38, 650));
      const top = y;
      for (const [key, text, size] of [['author', values.author, Number(values.authorSize ?? 36)], ['attribution', values.attribution, Number(values.attributionSize ?? 25)]]) {
        if (!String(text ?? '').trim()) continue;
        const block=fittedText(ctx,text,size,textWidth-36,Math.max(24,h-margin-y),sans,1.15);
        paintText(ctx,block,margin+36,y);markText(canvas,key,margin+36,y,textWidth-36,block.height,w,h,textTypography(block,w));y+=block.height+9;overflow ||= block.overflow;
      }
      if (y>top) {ctx.fillStyle=theme.rule;ctx.fillRect(margin+18,top+3,1,y-top-9);}
      overflow ||= y>h-margin;
    }
  } else {
    const heading=fittedText(ctx,values.heading,Number(values.headingSize??68),textWidth,headingHeight,sans);
    const artWidth=layout.artworkWidth*artworkScale*(values.feature==='answer-summary'?900/1100:1);
    const y=layout.split?layout.artworkY:Math.max(layout.artworkY,headingTop+heading.height+50);
    ctx.drawImage(prepared.canvas,layout.artworkX+dx,y+dy,artWidth,artWidth*prepared.canvas.height/prepared.canvas.width);
    // Full-bleed background and bottom fade follow the selected canvas height.
    const fade=ctx.createLinearGradient(0,h*.72,0,h);fade.addColorStop(0,'transparent');fade.addColorStop(1,background);
    ctx.fillStyle=fade;ctx.fillRect(0,h*.72,w,h*.28);
    const logo=prepared.logo, logoWidth=Number(values.logoSize??180);
    const logoHeight=logoWidth*logo.naturalHeight/logo.naturalWidth;
    ctx.drawImage(logo,margin,108,logoWidth,logoHeight);
    if (String(values.tagline??'').trim()) {
      const ruleX=margin+logoWidth+26, center=108+logoHeight/2;
      let size=Number(values.taglineSize??28);
      do {setFont(ctx,size,sans,true);if(ctx.measureText(values.tagline).width<=w-ruleX-margin-26||size<=10)break;size--;}while(size>0);
      ctx.fillStyle=theme.rule;ctx.fillRect(ruleX,center-12,1,24);ctx.textBaseline='middle';ctx.fillText(values.tagline,ruleX+26,center);markText(canvas,'tagline',ruleX+26,center-size/2,w-ruleX-margin-26,size,w,h,{baseline:'middle',fontSize:size/w,fontFamily:'Geist',fontWeight:sans?500:400,lineHeight:1,letterSpacing:(sans?-2.23:0)/w});
    }
    ctx.fillStyle=theme.foreground;paintText(ctx,heading,margin,headingTop);markText(canvas,'heading',margin,headingTop,textWidth,heading.height,w,h,textTypography(heading,w));overflow=heading.overflow;
  }
  ctx.restore();
  if (overflow) throw new Error('Text exceeds this layout. Shorten the text or reduce its size.');
  return canvas;
}
