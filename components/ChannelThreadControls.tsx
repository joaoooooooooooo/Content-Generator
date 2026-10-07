'use client';
import { useSceneStore } from '@/store/useSceneStore';
import { messageControls, socialChannelThread } from '@/templates/social/channel-thread';
import { MAX_MESSAGES, MESSAGE_FIELDS, messageCount, numberValue, threadMessages } from '@/templates/social/channel-thread/model';
import { ControlRow, controlVisible } from './Controls';
import SocialPhotoControl from './SocialPhotoControl';

export default function ChannelThreadControls() {
  const values = useSceneStore(s => s.values);
  const duration = useSceneStore(s => s.duration);
  const setValue = useSceneStore(s => s.setValue);
  const count = messageCount(values);
  const messages = threadMessages(values);
  const lastArrival = messages[messages.length - 1]?.at ?? 0;
  const speed = numberValue(values, 'speed', 1);
  const fitDuration = () => useSceneStore.getState().setDuration(Math.min(60, Math.max(1, Math.ceil(lastArrival / Math.max(0.05, speed) + 1.2))));
  const patch = (updates: Record<string, unknown>) => {
    const s = useSceneStore.getState();
    s.patchTrack(s.activeTrackId, { values: { ...s.values, ...updates } });
  };
  const addMessage = () => {
    if (count >= MAX_MESSAGES) return;
    const previous = 'message' + count + '.', next = 'message' + (count + 1) + '.';
    const at = Math.min(60, lastArrival + 0.8);
    patch({ messageCount: count + 1, [next + 'author']: values[previous + 'author'],
      [next + 'timestamp']: values[previous + 'timestamp'], [next + 'avatar']: values[previous + 'avatar'],
      [next + 'text']: 'Your next message.', [next + 'at']: at, [next + 'opens']: Math.max(lastArrival, at - 0.4) });
    if (at / Math.max(0.05, speed) + 1 > duration) useSceneStore.getState().setDuration(Math.min(60, Math.ceil(at / Math.max(0.05, speed) + 1.2)));
  };
  const removeMessage = (index: number) => {
    if (count <= 1) return;
    const updates: Record<string, unknown> = { messageCount: count - 1 };
    for (let i = index; i < count; i++) for (const field of MESSAGE_FIELDS) updates[`message${i}.${field}`] = values[`message${i + 1}.${field}`];
    patch(updates);
  };
  const primary = new Set(['postTheme', 'speed']);
  const appearance = socialChannelThread.controls.filter(def => !def.key.includes('.') && def.key !== 'messageCount' && !primary.has(def.key));
  return <>
    <div className="ctl-section">
      {socialChannelThread.controls.filter(def => primary.has(def.key)).map(def => <ControlRow key={def.key} def={def} value={values[def.key] ?? def.default} onChange={value => setValue(def.key, value)} />)}
    </div>
    <div className="ctl-section">
      <div className="ctl-section-title">Conversation</div>
      <p className="ctl-hint">Consecutive messages with the same name, timestamp, and avatar share one header. Long messages shrink to fit one line.</p>
      {Array.from({ length: count }, (_, index) => {
        const prefix = 'message' + (index + 1) + '.';
        const effective = messages.find(message => message.id === index + 1);
        const adjusted = effective && (effective.at !== numberValue(values, prefix + 'at', 0) || effective.opens !== numberValue(values, prefix + 'opens', 0));
        return <details key={prefix} className="thread-message" open={index === 0 ? true : undefined}>
          <summary><span>Message {index + 1}</span><span className="thread-message-author">{String(values[prefix + 'author'] ?? '')}</span></summary>
          {messageControls[index].map(def => def.type === 'upload'
            ? <div key={def.key}><SocialPhotoControl def={def} />{values[def.key] && <button type="button" className="btn full" onClick={() => setValue(def.key, '')}>Use initial instead</button>}</div>
            : <ControlRow key={def.key} def={def} value={values[def.key] ?? def.default} onChange={value => setValue(def.key, value)} />)}
          {adjusted && <p className="ctl-hint" role="status">To keep the conversation in order, this row opens at {effective.opens.toFixed(2)}s and its words arrive at {effective.at.toFixed(2)}s.</p>}
          <button type="button" className="btn full" disabled={count === 1} aria-label={'Remove message ' + (index + 1)} onClick={() => removeMessage(index + 1)}>Remove message</button>
        </details>;
      })}
      <button type="button" className="btn full" disabled={count >= MAX_MESSAGES} onClick={addMessage}>Add message</button>
      {count >= MAX_MESSAGES && <p className="ctl-hint">Maximum of {MAX_MESSAGES} messages.</p>}
      <p className="ctl-hint">Row opens starts the scroll and typing pause. Words arrive ends the pause. Times are in seconds at 1× speed.</p>
      {speed > 0 && lastArrival / speed >= duration && <p className="ctl-hint" role="status">Some messages arrive after the clip ends. Increase the duration to include them.</p>}
      <button type="button" className="btn full" onClick={fitDuration}>Fit duration to messages</button>
    </div>
    <details className="ctl-section kpi-control-group"><summary className="ctl-section-title">Appearance and scrolling</summary>
      {appearance.filter(def => controlVisible(def, values)).map(def => <ControlRow key={def.key} def={def} value={values[def.key] ?? def.default} onChange={value => setValue(def.key, value)} />)}
    </details>
  </>;
}
