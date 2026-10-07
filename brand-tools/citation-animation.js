import { createTimelineStepper } from './timeline';
import { RuntimeLoader } from '@rive-app/react-webgl2';
import wasm from '@rive-app/webgl2/rive.wasm?url';
import { animations } from './source/features/brand-tools/citation-renderer';
RuntimeLoader.setWasmUrl(wasm);
const files = new Map();
export async function createCitationAnimation(animation) {
  const runtime = await RuntimeLoader.awaitInstance();
  const option = animations.find(item => item.value === animation) || animations[0];
  if (!files.has(option.src)) files.set(option.src, fetch(option.src).then(response => {
    if (!response.ok) throw new Error('Citation artwork could not load.');
    return response.arrayBuffer();
  }).then(buffer => runtime.load(new Uint8Array(buffer), undefined, false)).catch(error => { files.delete(option.src); throw error; }));
  const file = await files.get(option.src);
  const canvas = document.createElement('canvas');
  canvas.width = 1084; canvas.height = animation === 'orbit' ? 892 : 1084;
  const renderer = runtime.makeRenderer(canvas, true);
  let artboard, machine, model;
  let globalModels = [];
  function reset() {
    renderer.bindContext?.(); machine?.delete(); artboard?.delete(); model?.delete?.();
    globalModels.forEach(model => model.delete()); globalModels = [];
    artboard = option.artboard ? file.artboardByName(option.artboard) : file.defaultArtboard();
    const definition = artboard.stateMachineByName('State Machine 1');
    if (!definition) throw new Error('Citation animation state machine is missing.');
    machine = new runtime.StateMachineInstance(definition, artboard);
    const viewModel = file.defaultArtboardViewModel(artboard);
    model = viewModel?.defaultInstance() || viewModel?.instance();
    if (model) {
      artboard.bindViewModelInstance(model); machine.bindViewModelInstance(model);
      for (const name of ['Stroke Color', 'Point Color']) { const color=model.color(name); if(color)color.value=0xfff2f3eb; }
      const thickness=model.number('Stroke Thickness'); if(thickness)thickness.value=1;
      const points=model.number('Point Size'); if(points)points.value=8;
      model.trigger('animationStart')?.trigger();
    }
    for (const name of file.globalViewModelNames()) {
      const instance = file.viewModelByName(name)?.defaultInstance();
      if (instance) { globalModels.push(instance); artboard.setGlobalViewModelInstance(name, instance); machine.setGlobalViewModelInstance(name, instance); }
    }
    machine.advanceAndApply(0);
  }
  reset();
  const seek = createTimelineStepper(reset, dt => { machine.advanceAndApply(dt); });
  return {
    frame(seconds) {
      seek(seconds);
      // The shipped WebGL offscreen renderer exposes clear(), not beginFrame().
      renderer.clear(); renderer.save();
      renderer.align(runtime.Fit.contain, runtime.Alignment.center, { minX:0,minY:0,maxX:canvas.width,maxY:canvas.height }, artboard.bounds);
      artboard.draw(renderer); renderer.restore(); renderer.flush(); runtime.resolveAnimationFrame();
      return canvas;
    },
    dispose() { renderer.bindContext?.(); machine?.delete(); artboard?.delete(); model?.delete?.(); globalModels.forEach(model => model.delete()); renderer.delete(); },
  };
}
