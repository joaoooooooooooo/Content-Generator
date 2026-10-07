import type { ControlDef } from '@/lib/types';
import { common, placement, template } from '../shared';
const controls: ControlDef[] = [...common,
  {key:'statusLabel',label:'Status label',type:'text',default:'Good'},
  {key:'heading',label:'Heading',type:'text',multiline:true,default:"Weekly interactions with the client's social posts stayed close to the recent baseline."},
  {key:'headingSize',label:'Heading size',type:'slider',min:24,max:100,step:1,default:70,unit:'px'},
  {key:'description',label:'Description',type:'text',multiline:true,default:"The LinkedIn post was Apta Agency's most visible owned update this week."},
  {key:'metricValue',label:'Metric value',type:'text',default:'+234%'},
  {key:'metricLabel',label:'Metric label',type:'text',default:'Website Impressions'},
  {key:'metricChange',label:'Change',type:'text',default:'+12 %'},
  {key:'metricPeriod',label:'Comparison period',type:'text',default:'Vs Last Week'},
  ...placement,
];
export const metricTemplates = [template('moonvine-metric','Metric overview','Metric',controls)];
