import React from 'react';
import { Badge } from '../source/components/ui/badge';
import './metric.css';
export function metricChangeVariant(value) {
  const text=String(value??'').trim();
  return text.startsWith('+')?'success':/^[-\u2212]/.test(text)?'error':'label';
}
export function MetricPost({values:v,width,height}) {
  const sans=v.fontStyle==='Sans';
  const pos=v.artworkPosition??{x:0,y:0};
  return <article className="metric-surface" style={{width,height}}><div className={'metric-post '+(width/height>=1.45?'metric-wide':'')} style={{width,minHeight:height}}>
    <header className="metric-intro">
      {v.statusLabel&&<Badge variant="secondary" className="metric-status"><span data-ai-text="statusLabel">{v.statusLabel}</span></Badge>}
      <h1 data-ai-text="heading" style={{fontFamily:sans?'AI Geist Upright':'"Nib Pro"',fontWeight:sans?500:600,fontSize:Number(v.headingSize??70),letterSpacing:sans?-2.23:-1.4,lineHeight:sans?1.127:1.08}}>{v.heading}</h1>
      <p className="metric-description" data-ai-text="description">{v.description}</p>
    </header>
    <section className="metric-body ai-body" style={{transform:'translate('+(Number(pos.x)||0)+'%,'+(Number(pos.y)||0)+'%) scale('+Number(v.artworkSize??92)/92+')',transformOrigin:'top left'}}>
      <p className="metric-value" data-ai-text="metricValue">{v.metricValue}</p>
      <p className="metric-label" data-ai-text="metricLabel">{v.metricLabel}</p>
      <div className="metric-comparison">
        <Badge variant={metricChangeVariant(v.metricChange)} hideBackground className="metric-change"><span data-ai-text="metricChange">{v.metricChange}</span></Badge>
        <span className="metric-period" data-ai-text="metricPeriod">{v.metricPeriod}</span>
      </div>
    </section>
  </div></article>;
}
