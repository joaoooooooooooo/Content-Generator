'use client';

import { useState } from 'react';
import { getTemplate } from '@/templates';
import { useSceneStore } from '@/store/useSceneStore';
import { matchCutWindow, newMatchCut, type MatchCut, type MatchPoint } from '@/lib/matchCut';
import { trackWindow, type MotionTrack } from '@/lib/tracks';
import EasingCurveEditor from './EasingCurveEditor';

export function supportsMatchCut(track: MotionTrack) {
  const meta = getTemplate(track.templateId).meta;
  return meta.engine !== 'webgl' && (meta.group === 'Motion Chips' || !meta.kind || meta.kind === 'motion');
}

export default function MatchCutPanel({ track, onClose }: { track: MotionTrack; onClose: () => void }) {
  const tracks = useSceneStore(s => s.tracks);
  const fps = useSceneStore(s => s.fps);
  const duration = useSceneStore(s => s.duration);
  const setMatchCut = useSceneStore(s => s.setMatchCut);
  const patchTrack = useSceneStore(s => s.patchTrack);
  const setFrame = useSceneStore(s => s.setFrame);
  const setPlaying = useSceneStore(s => s.setPlaying);
  const candidates = tracks.filter(t => t.id !== track.id && supportsMatchCut(t));
  const [targetId, setTargetId] = useState(track.matchCut?.targetId ?? candidates[0]?.id ?? '');
  const target = candidates.find(t => t.id === targetId);
  const total = Math.round(duration * fps);
  const sourceWindow = trackWindow(track, total);
  const targetWindow = target ? trackWindow(target, total) : null;
  const saved = track.matchCut;
  const current = saved ?? newMatchCut(targetId, fps);
  const linkedTarget = tracks.find(t => t.id === saved?.targetId);
  const window = linkedTarget ? matchCutWindow(track, linkedTarget, total) : null;
  const defaultCut = targetWindow && sourceWindow.outFrame === targetWindow.inFrame ? sourceWindow.outFrame
    : Math.round((sourceWindow.inFrame + (targetWindow?.outFrame ?? total)) / 2);
  const [cutSeconds, setCutSeconds] = useState(defaultCut / fps);
  const cut = saved && window ? window.cut : Math.round(cutSeconds * fps);
  const canConnect = supportsMatchCut(track) && targetWindow && cut >= sourceWindow.inFrame + 2 && cut <= targetWindow.outFrame - 2;
  const update = (patch: Partial<MatchCut>) => patchTrack(track.id, { matchCut: { ...current, ...patch } });
  const seek = (frame: number) => { setPlaying(false); setFrame(Math.max(0, Math.min(total - 1, frame))); };

  const pointFields = (side: 'from' | 'to', label: string) => (
    <fieldset className="match-cut-point">
      <legend>{label}</legend>
      {(['x', 'y', 'size'] as const).map(key => (
        <label key={key}>{key === 'size' ? 'Size' : key.toUpperCase()} %
          <input type="number" step={.1} min={key === 'size' ? .1 : -200} max={key === 'size' ? 1000 : 300}
            value={current[side][key]} onChange={e => {
              if (!e.target.value || !Number.isFinite(e.target.valueAsNumber)) return;
              const value = Math.max(key === 'size' ? .1 : -200, Math.min(key === 'size' ? 1000 : 300, e.target.valueAsNumber));
              update({ [side]: { ...current[side], [key]: value } as MatchPoint });
            }} />
        </label>
      ))}
    </fieldset>
  );

  return <section className="match-cut-panel" aria-label="Match cut transition">
    <div className="match-cut-heading"><strong>Match cut · {track.name}</strong><button type="button" className="tl-add-track" onClick={onClose}>Close</button></div>
    {!supportsMatchCut(track) ? <p>Match cuts are available for Motion Chips and 2D motion layers.</p> : <>
      <div className="match-cut-fields">
        <label>Incoming layer<select value={targetId} onChange={e => setTargetId(e.target.value)}>
          {!candidates.length && <option value="">Add another 2D layer first</option>}
          {candidates.map(t => <option key={t.id} value={t.id}>{t.name} · {getTemplate(t.templateId).meta.name}</option>)}
        </select></label>
        <label>Cut at (seconds)<input type="number" min={0} max={duration} step={1 / fps}
          value={saved && window ? window.cut / fps : cutSeconds} onChange={e => {
            if (!Number.isFinite(e.target.valueAsNumber)) return;
            setCutSeconds(e.target.valueAsNumber);
            if (saved) setMatchCut(track.id, saved, Math.round(e.target.valueAsNumber * fps));
          }} /></label>
        <button type="button" className="tl-add-track" disabled={!canConnect} onClick={() => {
          setMatchCut(track.id, { ...current, targetId }, cut);
          seek(cut);
        }}>{saved ? 'Connect layers' : 'Add match cut'}</button>
        {saved && <button type="button" className="tl-add-track" onClick={() => patchTrack(track.id, { matchCut: undefined })}>Remove transition</button>}
      </div>
      <p className="ctl-hint">Connect ends this layer and starts the incoming layer at the cut. Clip duration stays the same.</p>
      {!canConnect && target && <p role="status">Choose a cut with at least two frames on each side.</p>}
      {saved && <>
        {!window && <p role="status">The layer edges no longer meet. Connect layers to restore the match cut.</p>}
        <div className="match-cut-options">
          <div>
            <label className="match-cut-duration">Transition duration (seconds)<input type="number" min={2 / fps} max={duration} step={1 / fps}
              value={current.durationFrames / fps} onChange={e => {
                if (Number.isFinite(e.target.valueAsNumber)) update({ durationFrames: Math.max(2, Math.min(total, Math.round(e.target.valueAsNumber * fps))) });
              }} /></label>
            {pointFields('from', 'Outgoing content')}
            {pointFields('to', 'Incoming content')}
            <p className="ctl-hint">Set the center and size of the content to match on each layer. X and Y are percentages of its canvas; size is a percentage of the shorter edge. Use 50, 50, 100 to match whole layers.</p>
            {window && <div className="match-cut-fields">
              <button type="button" className="tl-add-track" onClick={() => seek(window.cut - 1)}>View outgoing</button>
              <button type="button" className="tl-add-track" onClick={() => seek(window.cut)}>View incoming</button>
              <span className="ctl-hint">{((window.end - window.start) / fps).toFixed(2)}s across the cut (limited by layer lengths)</span>
            </div>}
          </div>
          <div className="match-cut-curve"><span className="eyebrow">Transition curve</span><EasingCurveEditor spec={current.easing} onChange={easing => update({ easing })} /></div>
        </div>
      </>}
    </>}
  </section>;
}
