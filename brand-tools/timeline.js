// Quantize to the same 120 Hz simulation steps regardless of preview/export fps.
// Rewinding recreates state; repeated requests for the same frame do no work.
export function createTimelineStepper(reset, advance) {
  let tick = 0;
  return seconds => {
    const target = Math.max(0, Math.round((Number(seconds) || 0) * 120));
    if (target < tick) { reset(); tick = 0; }
    while (tick < target) { advance(1 / 120); tick++; }
  };
}
