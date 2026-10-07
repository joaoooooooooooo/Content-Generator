import * as THREE from 'three';
import { createPositions } from '@/templates/social/kpi/geometry';
import type { SocialValues } from '@/templates/social/types';

export const numberValue = (v: SocialValues, key: string, fallback = 0) => {
  const n = Number(v[key] ?? fallback); return Number.isFinite(n) ? n : fallback;
};
export const enabled = (v: SocialValues, key: string) => v[key] === 'On' || v[key] === true;
const radians = THREE.MathUtils.degToRad;

/** One reusable GL context. Fixed-step seeded physics makes random-access captures repeatable. */
export class KpiParticleScene {
  readonly scene = new THREE.Scene();
  readonly camera = new THREE.PerspectiveCamera(60, 1080 / 1312, 0.1, 1000);
  readonly renderer: THREE.WebGLRenderer;
  private geometry = new THREE.BufferGeometry();
  private texture: THREE.CanvasTexture;
  private material: THREE.PointsMaterial;
  private points: THREE.Points;
  private original = new Float32Array();
  private positions = new Float32Array();
  private velocities = new Float32Array();
  private drawPositions = new Float32Array();
  private shapeKey = '';
  private physicsKey = '';
  private step = 0;
  private seed = 1;
  private checkpoints = new Map<number, { positions: Float32Array; velocities: Float32Array; seed: number }>();
  private ray = new THREE.Raycaster();
  private plane = new THREE.Plane();
  private normal = new THREE.Vector3();
  private hit = new THREE.Vector3();
  private target = new THREE.Vector3();
  private fog = new THREE.Fog('#000000', 5, 18);

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    const circle = document.createElement('canvas'); circle.width = circle.height = 64;
    const ctx = circle.getContext('2d')!;
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(32, 32, 32, 0, Math.PI * 2); ctx.fill();
    this.texture = new THREE.CanvasTexture(circle);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.material = new THREE.PointsMaterial({ map: this.texture, alphaTest: 0.5, transparent: true, depthWrite: false, sizeAttenuation: true });
    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }
  private random() { this.seed = (Math.imul(this.seed, 1664525) + 1013904223) >>> 0; return this.seed / 4294967296; }
  private reset(v: SocialValues) {
    this.positions.set(this.original); this.seed = 92717; this.step = 0;
    const speed = numberValue(v, 'movement.speed', 0.1);
    for (let i = 0; i < this.velocities.length; i++) this.velocities[i] = (this.random() - 0.5) * speed;
  }
  private simulate(v: SocialValues, time: number) {
    const key = JSON.stringify(['speed', 'damping', 'returnForce', 'maxVelocity', 'restlessEnabled', 'restlessValue'].map(k => v['movement.' + k]));
    if (key !== this.physicsKey) { this.physicsKey = key; this.checkpoints.clear(); this.reset(v); }
    const end = Math.max(0, Math.floor(time * 60));
    if (end < this.step) {
      this.reset(v);
      const savedStep = Math.floor(end / 120) * 120;
      const saved = this.checkpoints.get(savedStep);
      if (saved) { this.positions.set(saved.positions); this.velocities.set(saved.velocities); this.seed = saved.seed; this.step = savedStep; }
    }
    const damping = numberValue(v, 'movement.damping', 0.78);
    const restore = numberValue(v, 'movement.returnForce', 0.045);
    const max = numberValue(v, 'movement.maxVelocity', 0.35);
    const restless = enabled(v, 'movement.restlessEnabled') ? numberValue(v, 'movement.restlessValue', 0.006) : 0;
    for (; this.step < end;) {
      for (let i = 0; i < this.positions.length; i++) {
        let velocity = this.velocities[i] * damping + (this.original[i] - this.positions[i]) * restore;
        if (restless) velocity += (this.random() - 0.5) * restless;
        this.velocities[i] = Math.max(-max, Math.min(max, velocity));
        this.positions[i] += this.velocities[i];
      }
      this.step++;
      if (this.step % 120 === 0 && !this.checkpoints.has(this.step)) {
        if (this.checkpoints.size >= 30) this.checkpoints.delete(this.checkpoints.keys().next().value!);
        this.checkpoints.set(this.step, { positions: this.positions.slice(), velocities: this.velocities.slice(), seed: this.seed });
      }
    }
    this.drawPositions.set(this.positions);
  }
  render(v: SocialValues, time: number, width: number, height: number, pointer?: THREE.Vector2, particleExport = false) {
    const n = (key: string, fallback = 0) => numberValue(v, key, fallback);
    const count = Math.max(500, Math.min(30000, Math.floor(n('shape.particleCount', 10000))));
    const shapeKey = String(v['shape.type']) + ':' + count;
    if (shapeKey !== this.shapeKey) {
      this.shapeKey = shapeKey; this.physicsKey = ''; this.checkpoints.clear();
      this.original = createPositions(String(v['shape.type'] ?? 'Torus'), count);
      this.positions = this.original.slice(); this.velocities = new Float32Array(count * 3); this.drawPositions = this.original.slice();
      this.geometry.dispose(); this.geometry = new THREE.BufferGeometry();
      this.geometry.setAttribute('position', new THREE.BufferAttribute(this.drawPositions, 3).setUsage(THREE.DynamicDrawUsage));
      this.points.geometry = this.geometry; this.points.frustumCulled = false;
    }
    this.simulate(v, time);
    const overscan = !particleExport && enabled(v, 'layout.horizontalOverflowVisible') ? n('layout.horizontalOverscan') / 1080 * width : 0;
    const renderWidth = Math.max(1, Math.round(width + overscan * 2));
    if (this.renderer.domElement.width !== renderWidth || this.renderer.domElement.height !== height) this.renderer.setSize(renderWidth, height, false);
    this.renderer.setClearColor(0, 0);
    this.scene.background = particleExport || enabled(v, 'material.transparentBackground') ? null : new THREE.Color(String(v['material.backgroundColor'] ?? '#000000'));
    this.fog.color.set(String(v['fog.color'] ?? '#000000'));
    this.fog.near = n('fog.near', 5); this.fog.far = Math.max(this.fog.near + 0.001, n('fog.far', 18));
    this.scene.fog = enabled(v, 'fog.enabled') && !(particleExport && enabled(v, 'exportOptions.removeFog')) ? this.fog : null;
    this.material.color.set(String(v['material.particleColor'] ?? '#777777'));
    this.material.size = n('material.particleSize', 0.035); this.material.opacity = n('material.opacity', 0.65);
    this.points.position.set(n('transform.x'), n('transform.y'), n('transform.z'));
    this.points.scale.setScalar(n('transform.scale', 1));
    const animate = enabled(v, 'animation.enabled');
    this.points.rotation.set(
      radians(n('transform.rotateX')) + (animate ? Math.sin(time * n('animation.xFrequency')) * n('animation.xAmount') : 0),
      radians(n('transform.rotateY')) + (animate ? Math.sin(time * n('animation.yFrequency')) * n('animation.yAmount') : 0),
      radians(n('transform.rotateZ')) + (animate ? Math.cos(time * n('animation.zFrequency')) * n('animation.zAmount') : 0),
    );
    this.target.set(n('camera.targetX'), n('camera.targetY'), n('camera.targetZ'));
    this.camera.position.set(n('camera.x'), n('camera.y'), n('camera.z', 7));
    // OrbitControls' default auto-rotation rate is 2π / 60 seconds at speed 1.
    if (enabled(v, 'orbit.autoRotate') && !enabled(v, 'orbit.lockRotation')) {
      this.camera.position.sub(this.target).applyAxisAngle(THREE.Object3D.DEFAULT_UP, -time * n('orbit.autoRotateSpeed') * Math.PI / 30).add(this.target);
    }
    this.camera.fov = n('camera.fov', 60); this.camera.aspect = renderWidth / height;
    this.camera.lookAt(this.target); this.camera.updateProjectionMatrix(); this.camera.updateMatrixWorld();
    this.points.updateMatrixWorld();
    // Pointer displacement is preview-only; export always evaluates the clean timeline frame.
    if (pointer && !particleExport && n('interaction.radius') > 0) {
      this.ray.setFromCamera(pointer, this.camera);
      this.camera.getWorldDirection(this.normal);
      this.plane.setFromNormalAndCoplanarPoint(this.normal, this.target);
      if (this.ray.ray.intersectPlane(this.plane, this.hit)) {
        this.points.worldToLocal(this.hit);
        const radius = n('interaction.radius'); const core = n('interaction.coreRadius');
        for (let i = 0; i < this.drawPositions.length; i += 3) {
          const dx = this.drawPositions[i] - this.hit.x, dy = this.drawPositions[i + 1] - this.hit.y, dz = this.drawPositions[i + 2] - this.hit.z;
          const distance = Math.hypot(dx, dy, dz);
          if (distance < 0.0001 || distance >= radius) continue;
          const force = n('interaction.strength') * Math.pow(1 - distance / radius, n('interaction.falloff')) + (core > distance ? n('interaction.coreStrength') * (1 - distance / core) : 0);
          const displacement = force * 8 / distance;
          this.drawPositions[i] += dx * displacement; this.drawPositions[i + 1] += dy * displacement; this.drawPositions[i + 2] += dz * displacement;
        }
      }
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
    return { canvas: this.renderer.domElement, overscan };
  }
  destroy() {
    this.checkpoints.clear(); this.geometry.dispose(); this.material.dispose(); this.texture.dispose(); this.renderer.dispose();
  }
}
