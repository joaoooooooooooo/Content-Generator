import type { ControlDef } from '@/lib/types';
import { common, placement, template } from '../shared';
const sources=['Company websites','Industry directories','Industry publications','Portfolio pages','Editorial roundups'];
const counts=[16,13,13,9,8];
export const aiVisibilityTemplates=['sources','question'].map(variant=>{
  const controls:ControlDef[]=[...common,
    {key:'heading',label:'Heading',type:'text',multiline:true,default:'What we asked. 25 neutral buying questions, each asked to ChatGPT, Claude and Gemini, without naming Dyson.'},
    {key:'mutedText',label:'Muted phrase',type:'text',default:'25 neutral buying questions'},
    {key:'headingSize',label:'Heading size',type:'slider',min:24,max:90,step:1,default:54,unit:'px'},
    ...(variant==='sources'?sources.flatMap((label,i):ControlDef[]=>[
      {key:`source${i+1}`,label:`Source ${i+1}`,type:'text',default:label},
      {key:`sourceIcon${i+1}`,label:`Source ${i+1} icon`,type:'upload',default:''},
      {key:`answers${i+1}`,label:`Source ${i+1} answers`,type:'slider',min:0,max:100,step:1,default:counts[i]},
    ]):[
      {key:'questionLabel',label:'Question label',type:'text' as const,default:'Question example'},
      {key:'question',label:'Question',type:'text' as const,multiline:true,default:'\u201cWhich brands are known for vacuum cleaners, and which are easiest to evaluate for hair care.\u201d'},
    ]),
    {key:'takeaway',label:'Takeaway',type:'text',multiline:true,default:"Dyson.com wasn't among\nthe five most-cited sources."},
    ...placement,
  ];
  return template(`moonvine-ai-${variant}`,variant==='sources'?'Sources cited':'Question example','AI Visibility',controls);
});
