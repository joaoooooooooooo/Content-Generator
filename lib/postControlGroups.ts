import type { ControlDef } from '@/lib/types';
export function postControlGroup(def:ControlDef) {
  const source=/^(?:sourceIcon|source|answers)(\d+)$/.exec(def.key);if(source)return `Source ${source[1]}`;
  const item=/^(?:item|status)(\d+)$/.exec(def.key);if(item)return `Item ${item[1]}`;
  if(['artworkSize','artworkPosition','animation'].includes(def.key))return 'Artwork';
  if(['author','authorSize','attribution','attributionSize','showAuthorDetails'].includes(def.key))return 'Author';
  if(['question','questionLabel'].includes(def.key))return 'Question';
  if(['metricValue','metricLabel','metricChange','metricPeriod'].includes(def.key))return 'Metric';
  if(def.key==='takeaway')return 'Takeaway';
  if(['feature','scenario'].includes(def.key))return 'Report';
  if(['tagline','taglineSize','logoSize'].includes(def.key))return 'Brand';
  return 'Text';
}
export function groupPostControls(controls:ControlDef[]) {
  const groups=new Map<string,ControlDef[]>();
  for(const control of controls){const name=postControlGroup(control);groups.set(name,[...(groups.get(name)??[]),control]);}
  return [...groups].map(([name,controls])=>({name,controls}));
}
