import { SearchIcon } from '../source/components/ui/icons';
import React from 'react';
import { RankItem } from '../source/features/Reports/components/rankEntities/components/rankItem';
import { FrameCard, FrameCardTop, FrameCardContent } from '../source/components/ui/frame-card';
import openai from './assets/openai.svg';
import gemini from './assets/gemini-color.svg';
import claude from './assets/claude.svg';
import company from './assets/company.svg';
import directory from './assets/directory.svg';
import publication from './assets/publication.svg';
import portfolio from './assets/portfolio.svg';
import editorial from './assets/editorial.svg';
import './ai-visibility.css';
const icons=[company,directory,publication,portfolio,editorial];
function MutedHeading({text,phrase}) {
  const index=phrase?text.indexOf(phrase):-1;
  return index<0?text:<>{text.slice(0,index)}<span className="ai-muted">{phrase}</span>{text.slice(index+phrase.length)}</>;
}
export function AIVisibilityPost({values:v,variant,width,height}) {
  const scale=Number(v.artworkSize??92)/92;
  const pos=v.artworkPosition??{x:0,y:0};
  const wide=width/height>=1.45;
  const sans=v.fontStyle==='Sans';
  return <article className="ai-surface" style={{width,height}}><div className={`ai-post ${wide?'ai-wide':''}`} style={{width,height}}>
    <header className="ai-intro">
      <div className="ai-providers"><span><img src={openai} alt="ChatGPT"/></span><span><img src={gemini} alt="Gemini"/></span><span className="ai-claude"><img src={claude} alt="Claude"/></span></div>
      <h1 data-ai-text="heading" style={{fontStyle:'normal',fontFamily:sans?'AI Geist Upright':'"Nib Pro"',fontWeight:sans?500:600,fontSize:Number(v.headingSize??54),letterSpacing:sans?-2.23:0,lineHeight:1.127}}><MutedHeading text={String(v.heading??'')} phrase={String(v.mutedText??'')}/></h1>
    </header>
    <div className="ai-body" style={{transform:`translate(${Number(pos.x)||0}%,${Number(pos.y)||0}%) scale(${scale})`,transformOrigin:'top left'}}>
      {variant==='sources'?<ol className="ai-ranking">{icons.map((icon,i)=>String(v[`source${i+1}`]??'').trim()?<RankItem key={i} className="ai-rank" imageSrc={v[`sourceIcon${i+1}`]||icon} imageKey={`sourceIcon${i+1}`} imageAlt="" label={<span data-ai-text={`source${i+1}`}>{v[`source${i+1}`]}</span>} value={Number(v[`answers${i+1}`]??0)} valueLabel="answers" fillPercentage={Number(v[`answers${i+1}`]??0)/Math.max(1,icons.reduce((sum,_,j)=>sum+(String(v[`source${j+1}`]??'').trim()?Number(v[`answers${j+1}`]??0):0),0))*100}/>:null)}</ol>:
        <FrameCard withFill className="ai-question"><FrameCardTop className="ai-question-top"><span className="ai-search" aria-hidden="true"><SearchIcon size={20}/></span><span data-ai-text="questionLabel">{v.questionLabel}</span></FrameCardTop><FrameCardContent className="ai-question-content"><p data-ai-text="question">{v.question}</p></FrameCardContent></FrameCard>}
      <FrameCard className="ai-takeaway"><FrameCardContent><p data-ai-text="takeaway">{String(v.takeaway??'').split(/(\b[\w-]+\.[a-z]{2,}\b)/i).map((part,i)=>i%2?<u key={i}>{part}</u>:part)}</p></FrameCardContent></FrameCard>
    </div>
  </div></article>;
}
