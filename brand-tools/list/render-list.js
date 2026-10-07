import { markText } from '../text-regions';
import { brandLayout, positionFor } from '../layout';
import { fittedText, paintText, textTypography } from '../responsive-renderer';

export function renderList(canvas, values, prepared, width, height) {
  canvas.width = Math.max(1, Math.round(width)); canvas.height = Math.max(1, Math.round(height));
  canvas.textRegions=[];
  const ctx = canvas.getContext('2d');
  const layout = brandLayout(canvas.width, canvas.height);
  const { width:w, height:h, scale, split } = layout;
  const cards = prepared.variant === 'cards';
  ctx.fillStyle = prepared.background; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.save(); ctx.scale(scale,scale);
  const margin = cards ? 101.16 : 126.48;
  const textWidth = split ? w*.44-margin : w-margin-126.48;
  const top = cards ? 146 : 175;
  const heading = fittedText(ctx, values.heading, Number(values.headingSize ?? 101.41), textWidth, Math.min(300,h*.28), values.fontStyle !== 'Serif');
  ctx.fillStyle = values.postTheme === 'Light' ? '#141414' : '#ffffff';
  paintText(ctx,heading,margin,top);
  markText(canvas,'heading',margin,top,textWidth,heading.height,w,h,textTypography(heading,w));
  const naturalWidth = cards ? 934 : 804.279;
  const gap = cards ? 25 : 32.892;
  const columns = cards ? 2 : 1;
  const columnHeights = [0,0];
  const positions = prepared.items.map((item,index)=>{
    const column=index%columns;
    const position={x:column*(449.567+30),y:columnHeights[column]};
    columnHeights[column]+=item.height/2+gap;
    return position;
  });
  const naturalHeight=Math.max(...columnHeights)-gap;
  const baseX=split?w*.51:cards?79.42:126.48;
  const baseY=split?Math.max(150,h*.2):Math.max(473.45,top+heading.height+90);
  const availableWidth=split?w-baseX-80:w-baseX-(cards?70:149);
  const fit=Math.min(availableWidth/naturalWidth,Math.max(1,h-baseY-90)/Math.max(1,naturalHeight));
  const k=fit*Number(values.artworkSize??92)/92;
  const pos=positionFor(values);
  prepared.items.forEach((item,index)=>{
    const p=positions[index];
    ctx.save();
    if(!cards){ctx.shadowColor='rgba(0,0,0,.25)';ctx.shadowBlur=30.073*k;ctx.shadowOffsetY=3.57*k;}
    ctx.drawImage(item,baseX+p.x*k+pos.x/100*w,baseY+p.y*k+pos.y/100*h,item.width/2*k,item.height/2*k);
    const textBox=item.textBox??{x:0,y:0,width:item.width/2,height:item.height/2,fontSize:36,lineHeight:1.3333,letterSpacing:0};
    markText(canvas,item.itemKey??`item${index+1}`,baseX+(p.x+textBox.x)*k+pos.x/100*w,baseY+(p.y+textBox.y)*k+pos.y/100*h,textBox.width*k,textBox.height*k,w,h,{fontSize:textBox.fontSize*k/w,fontFamily:'Geist',baseline:'dom',fontWeight:400,lineHeight:textBox.lineHeight,letterSpacing:textBox.letterSpacing*k/w});
    ctx.restore();
  });
  ctx.restore();
  if(heading.overflow)throw new Error('Shorten the list heading or reduce its size.');
  return canvas;
}
