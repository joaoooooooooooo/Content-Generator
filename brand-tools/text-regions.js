// Normalized bounds shared by the canvas renderer and the editor overlay.
export function markText(canvas, key, x, y, width, height, designWidth, designHeight, typography = {}) {
  (canvas.textRegions ??= []).push({key,x:x/designWidth,y:y/designHeight,width:width/designWidth,height:Math.max(24,height)/designHeight,...typography});
}
