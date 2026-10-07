import type { Template } from './types';

export function socialProperties(template: Template, values: Record<string, unknown>, timing: { duration: number; fps: number; width: number; height: number; easing: unknown }) {
  const properties: Record<string, unknown> = {};
  for (const def of template.controls) {
    let value = values[def.key] ?? def.default;
    if (def.type === 'toggle' && def.options?.join(',') === 'On,Off') value = value === 'On';
    const [group, key] = def.key.split('.');
    if (key) {
      const nested = (properties[group] ??= {}) as Record<string, unknown>;
      nested[key] = value;
    } else properties[group] = value;
  }
  return { version: 1, templateId: template.meta.id, size: { width: timing.width, height: timing.height },
    ...(template.meta.kind === 'social-motion' ? { timing: { duration: timing.duration, fps: timing.fps, easing: timing.easing } } : {}), properties };
}
