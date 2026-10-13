/* ----------------------------------------------------------------
   for1337.github.io — v9 hero 3D wireframe scene
   Three.js (MIT) via importmap. Renders a low-poly wireframe
   landscape behind the hero content: a moving grid + a few
   floating wireframe boxes. Terminal-green palette to match
   the rest of the site. No particles, no shaders, no rainbow.
   ---------------------------------------------------------------- */

import * as THREE from 'three';

(() => {
  'use strict';

  // Bail if reduced motion is preferred or WebGL unavailable.
  const reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  let gl = null;
  try {
    gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  } catch (e) {
    gl = null;
  }
  if (!gl) {
    // WebGL not available — leave the canvas empty, the hero
    // content above is fully readable on its own.
    canvas.style.display = 'none';
    return;
  }

  // ----- scene setup -----

  const renderer = new THREE.WebGLRenderer({
    canvas,
    context: gl,
    antialias: true,
    alpha: true,
    powerPreference: 'low-power'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0); // transparent

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a0a0a, 12, 38);

  const camera = new THREE.PerspectiveCamera(
    55,
    canvas.clientWidth / Math.max(canvas.clientHeight, 1),
    0.1,
    100
  );
  camera.position.set(0, 4.5, 12);
  camera.lookAt(0, 0, 0);

  // ----- palette (terminal green + dim grid) -----
  const ACCENT = 0x5af78e;
  const ACCENT_DIM = 0x1a3d2a;
  const ACCENT_FAINT = 0x123524;

  // ----- floor grid (one big grid, slowly drifting) -----
  const gridSize = 60;
  const gridDivs = 30;
  const grid = new THREE.GridHelper(gridSize, gridDivs, ACCENT, ACCENT_FAINT);
  grid.position.y = -2;
  grid.material.transparent = true;
  grid.material.opacity = 0.4;
  scene.add(grid);

  // a second grid offset half a cell for visual depth
  const grid2 = new THREE.GridHelper(gridSize, gridDivs, ACCENT_FAINT, ACCENT_FAINT);
  grid2.position.y = -2.001;
  grid2.material.transparent = true;
  grid2.material.opacity = 0.3;
  scene.add(grid2);

  // ----- floating wireframe boxes (kept at the edges, not over the content) -----
  const boxes = [];
  const boxCount = 5;
  const boxGeom = new THREE.BoxGeometry(1, 1, 1);
  const boxEdges = new THREE.EdgesGeometry(boxGeom);
  for (let i = 0; i < boxCount; i++) {
    const mat = new THREE.LineBasicMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.18 + Math.random() * 0.12
    });
    const line = new THREE.LineSegments(boxEdges, mat);
    const scale = 0.5 + Math.random() * 0.7;
    line.scale.set(scale, scale, scale);
    // Push boxes to the sides: x in [-12..-6] U [+6..+12]
    const side = Math.random() < 0.5 ? -1 : 1;
    line.position.set(
      side * (6 + Math.random() * 6),
      Math.random() * 4 - 0.5,
      (Math.random() - 0.5) * 6
    );
    line.userData = {
      baseY: line.position.y,
      phase: Math.random() * Math.PI * 2,
      rotSpeed: { x: 0.003 + Math.random() * 0.005, y: 0.005 + Math.random() * 0.005 }
    };
    scene.add(line);
    boxes.push(line);
  }

  // ----- a single large wireframe "shell" far in the back -----
  const shellGeom = new THREE.IcosahedronGeometry(3.5, 1);
  const shellEdges = new THREE.EdgesGeometry(shellGeom);
  const shell = new THREE.LineSegments(
    shellEdges,
    new THREE.LineBasicMaterial({ color: ACCENT_DIM, transparent: true, opacity: 0.25 })
  );
  shell.position.set(-7, 2, -10);
  scene.add(shell);

  // ----- resize -----
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight || 600;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // ----- animation -----
  let t = 0;
  let rafId = 0;
  function frame() {
    rafId = requestAnimationFrame(frame);
    if (reducedMotion) {
      // one frame is enough under reduced motion
      renderer.render(scene, camera);
      cancelAnimationFrame(rafId);
      return;
    }
    t += 0.01;
    grid.position.z = (t * 0.5) % (gridSize / gridDivs);
    grid2.position.z = (t * 0.5 + 0.5) % (gridSize / gridDivs);
    for (const b of boxes) {
      b.rotation.x += b.userData.rotSpeed.x;
      b.rotation.y += b.userData.rotSpeed.y;
      b.position.y = b.userData.baseY + Math.sin(t * 0.8 + b.userData.phase) * 0.6;
    }
    shell.rotation.x += 0.0015;
    shell.rotation.y += 0.0025;
    camera.position.x = Math.sin(t * 0.15) * 0.6;
    camera.position.z = 12 + Math.cos(t * 0.2) * 0.4;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  frame();

  // ----- pause when hero is offscreen (perf) -----
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          if (!rafId) frame();
        } else {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      }
    });
    obs.observe(canvas);
  }
})();
