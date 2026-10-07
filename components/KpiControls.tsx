'use client';
import { useSceneStore } from '@/store/useSceneStore';
import { socialKpi } from '@/templates/social/kpi';
import { particleControlGroups } from '@/templates/social/kpi/controls';
import { ControlRow, controlVisible } from './Controls';

export default function KpiControls() {
  const values = useSceneStore(s => s.values);
  const setValue = useSceneStore(s => s.setValue);
  return <>{particleControlGroups.map(group => <details className="ctl-section kpi-control-group" key={group.key}>
    <summary className="ctl-section-title">{group.label === 'Export PNG' ? 'Particle PNG export' : group.label}</summary>
    {group.key === 'interaction' && <p className="ctl-hint">Move over the preview to repel particles. Pointer interaction is not recorded in exports.</p>}
    {group.key === 'exportOptions' && <p className="ctl-hint">Show a button on the preview to download particles on a transparent background. Use the timeline export for the complete post.</p>}
    {socialKpi.controls.filter(def => (def.key === group.key || def.key.startsWith(group.key + '.')) && controlVisible(def, values)).map(def =>
      <ControlRow key={def.key} def={def} value={values[def.key] ?? def.default} onChange={value => setValue(def.key, value)} />)}
  </details>)}</>;
}
