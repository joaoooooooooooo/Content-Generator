import React from 'react';
import { Badge } from '../source/components/ui/badge';
import { FrameCard, FrameCardTop, FrameCardContent } from '../source/components/ui/frame-card';
import circle from './assets/check-circle.png';
import check from './assets/check.svg';
import warning from './assets/warning.svg';
import success from './assets/success.svg';
import './list.css';

export function ListItem({ text, status, variant }) {
  if (variant === 'checklist') return <div className="list-check-row">
    <span className="list-check-icon"><img src={circle} width="43.984" height="43.984" alt=""/><img className="list-check-mark" src={check} alt=""/></span>
    <span data-list-text>{text}</span>
  </div>;
  const good = status === 'Good shape';
  return <FrameCard withFill className="list-status-card">
    <FrameCardTop className="list-status-top">
      <Badge variant={good ? 'success' : 'warning'} className="list-status-badge" data-status={good ? 'good' : 'missing'}><img src={good ? success : warning} alt=""/>{status}</Badge>
    </FrameCardTop>
    <FrameCardContent className="list-status-content"><span data-list-text>{text}</span></FrameCardContent>
  </FrameCard>;
}
