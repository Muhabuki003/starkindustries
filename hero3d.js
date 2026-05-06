// ============ HERO 3D SCENE ============
// Parametric "compressor" — stacked cylinders (5-stage radial), rotating, with particle field

(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || !window.THREE) return;

  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Heavy WebGL scene crashes low-memory mobile devices (especially iOS Safari).
  // Skip it entirely on mobile — the CSS grid background is enough.
  if (isMobile) {
    canvas.style.display = 'none';
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power', failIfMajorPerformanceCaveat: false });
  } catch (err) {
    canvas.style.display = 'none';
    return;
  }
  if (!renderer) { canvas.style.display = 'none'; return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0A0A1A, 8, 28);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0.4, 9);

  // Lights
  const ambient = new THREE.AmbientLight(0x4a5a7a, 0.6);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xD4A017, 1.2);
  keyLight.position.set(4, 6, 5);
  scene.add(keyLight);

  const blueRim = new THREE.PointLight(0x3030ff, 2.5, 15);
  blueRim.position.set(-4, 0, 3);
  scene.add(blueRim);

  const fillLight = new THREE.DirectionalLight(0x6080ff, 0.5);
  fillLight.position.set(-3, -2, 4);
  scene.add(fillLight);

  // ============ COMPRESSOR ASSEMBLY ============
  const compressor = new THREE.Group();
  scene.add(compressor);

  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x2a3140, metalness: 0.85, roughness: 0.35
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xD4A017, metalness: 0.9, roughness: 0.25, emissive: 0x2a1a00, emissiveIntensity: 0.2
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x101426, metalness: 0.7, roughness: 0.5
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x00008B, metalness: 0.6, roughness: 0.3, emissive: 0x000040, emissiveIntensity: 0.4
  });

  // Central crank shaft housing (vertical cylinder)
  const housing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.6, 2.2, 32),
    steelMat
  );
  compressor.add(housing);

  // Top cap with bolts
  const topCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.65, 0.55, 0.18, 32),
    darkMat
  );
  topCap.position.y = 1.18;
  compressor.add(topCap);

  // Bottom base
  const baseCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.85, 0.25, 32),
    darkMat
  );
  baseCap.position.y = -1.2;
  compressor.add(baseCap);

  // Mounting plate (square, larger)
  const plate = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.1, 2.4),
    steelMat
  );
  plate.position.y = -1.4;
  compressor.add(plate);

  // Bolts on top cap
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const bolt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.06, 6),
      goldMat
    );
    bolt.position.set(Math.cos(a) * 0.55, 1.27, Math.sin(a) * 0.55);
    compressor.add(bolt);
  }

  // Mounting plate corner bolts
  [[-1.05,-1.05],[1.05,-1.05],[-1.05,1.05],[1.05,1.05]].forEach(([x,z]) => {
    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.14, 6),
      goldMat
    );
    m.position.set(x, -1.3, z);
    compressor.add(m);
  });

  // 5 cylinder/piston stages — radial
  const stagePivot = new THREE.Group();
  compressor.add(stagePivot);
  const stageCount = 5;
  const stageRadii = [0.42, 0.36, 0.30, 0.24, 0.18];
  const stageLengths = [1.2, 1.05, 0.9, 0.75, 0.6];

  for (let i = 0; i < stageCount; i++) {
    const a = (i / stageCount) * Math.PI * 2;
    const r = stageRadii[i];
    const L = stageLengths[i];

    // cylinder body
    const cyl = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, L, 24),
      steelMat
    );
    cyl.rotation.z = Math.PI / 2;
    cyl.position.set(Math.cos(a) * (0.55 + L/2), Math.sin(i * 0.3) * 0.05, Math.sin(a) * (0.55 + L/2));
    cyl.lookAt(0, cyl.position.y, 0);
    cyl.rotateX(Math.PI / 2);
    stagePivot.add(cyl);

    // cooling fins (rings)
    for (let f = 0; f < 6; f++) {
      const t = (f - 2.5) / 6;
      const fin = new THREE.Mesh(
        new THREE.TorusGeometry(r * 1.18, 0.03, 8, 24),
        darkMat
      );
      const along = t * L;
      fin.position.set(
        Math.cos(a) * (0.55 + L/2 + along),
        Math.sin(i * 0.3) * 0.05,
        Math.sin(a) * (0.55 + L/2 + along)
      );
      fin.lookAt(0, fin.position.y, 0);
      fin.rotateY(Math.PI / 2);
      stagePivot.add(fin);
    }

    // outer cap with gold ring
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 1.15, r, 0.1, 24),
      goldMat
    );
    cap.position.set(
      Math.cos(a) * (0.55 + L + 0.05),
      Math.sin(i * 0.3) * 0.05,
      Math.sin(a) * (0.55 + L + 0.05)
    );
    cap.lookAt(0, cap.position.y, 0);
    cap.rotateX(Math.PI / 2);
    stagePivot.add(cap);

    // discharge tube curving back to housing top
    const tubeStart = new THREE.Vector3(
      Math.cos(a) * (0.55 + L + 0.05),
      Math.sin(i * 0.3) * 0.05 + 0.1,
      Math.sin(a) * (0.55 + L + 0.05)
    );
    const tubeEnd = new THREE.Vector3(0, 1.05, 0);
    const mid1 = new THREE.Vector3(tubeStart.x * 0.8, 0.6, tubeStart.z * 0.8);
    const mid2 = new THREE.Vector3(tubeStart.x * 0.3, 0.95, tubeStart.z * 0.3);
    const curve = new THREE.CubicBezierCurve3(tubeStart, mid1, mid2, tubeEnd);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 24, 0.04, 8, false),
      blueMat
    );
    stagePivot.add(tube);
  }

  // Top discharge collector (gold ring)
  const collector = new THREE.Mesh(
    new THREE.TorusGeometry(0.35, 0.06, 12, 24),
    goldMat
  );
  collector.rotation.x = Math.PI / 2;
  collector.position.y = 1.0;
  compressor.add(collector);

  // Pressure gauge on side
  const gaugeBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.08, 24),
    darkMat
  );
  gaugeBody.rotation.z = Math.PI / 2;
  gaugeBody.position.set(0.78, 0.5, 0);
  compressor.add(gaugeBody);

  const gaugeFace = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.16, 0.02, 24),
    new THREE.MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.1, roughness: 0.6 })
  );
  gaugeFace.rotation.z = Math.PI / 2;
  gaugeFace.position.set(0.83, 0.5, 0);
  compressor.add(gaugeFace);

  const needle = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, 0.12, 0.005),
    new THREE.MeshStandardMaterial({ color: 0xD4A017, emissive: 0xD4A017, emissiveIntensity: 0.6 })
  );
  needle.position.set(0.84, 0.5, 0);
  needle.rotation.z = -0.4;
  compressor.add(needle);

  compressor.scale.setScalar(1.05);

  // ============ PARTICLE FIELD ============
  const particleCount = isMobile ? 800 : 2200;
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    // distributed in a torus volume around the compressor
    const r = 2.5 + Math.random() * 6;
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 6;
    positions[i * 3]     = Math.cos(theta) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * r - 1;
    velocities[i] = 0.0008 + Math.random() * 0.002;
    sizes[i] = Math.random() * 1.5 + 0.3;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // texture for soft round particle
  const pCanvas = document.createElement('canvas');
  pCanvas.width = pCanvas.height = 64;
  const pCtx = pCanvas.getContext('2d');
  const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.4, 'rgba(180,200,255,0.4)');
  grad.addColorStop(1, 'rgba(0,0,139,0)');
  pCtx.fillStyle = grad;
  pCtx.fillRect(0,0,64,64);
  const pTex = new THREE.CanvasTexture(pCanvas);

  const pMat = new THREE.PointsMaterial({
    size: 0.06,
    map: pTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    color: 0x9bb6ff
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // gold accent particles (fewer, brighter)
  const goldCount = isMobile ? 80 : 200;
  const gPos = new Float32Array(goldCount * 3);
  for (let i = 0; i < goldCount; i++) {
    const r = 1.8 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    gPos[i*3]   = Math.cos(theta) * r;
    gPos[i*3+1] = (Math.random() - 0.5) * 5;
    gPos[i*3+2] = Math.sin(theta) * r - 1;
  }
  const gGeo = new THREE.BufferGeometry();
  gGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
  const gMat = new THREE.PointsMaterial({
    size: 0.09, map: pTex, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false, color: 0xD4A017
  });
  const gPoints = new THREE.Points(gGeo, gMat);
  scene.add(gPoints);

  // ============ ANIMATION ============
  let mouseX = 0, mouseY = 0;
  let targetRotX = 0, targetRotY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  });

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  let rafId = null;
  let lost = false;
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    lost = true;
    if (rafId) cancelAnimationFrame(rafId);
  });
  canvas.addEventListener('webglcontextrestored', () => {
    lost = false;
    tick();
  });

  let t = 0;
  function tick() {
    if (lost) return;
    t += 0.01;
    const speed = reduced ? 0 : 1;

    stagePivot.rotation.y -= 0.008 * speed;
    compressor.rotation.y += 0.0015 * speed;

    // mouse parallax
    targetRotX += ((-mouseY * 0.15) - targetRotX) * 0.04;
    targetRotY += ((mouseX * 0.2) - targetRotY) * 0.04;
    compressor.rotation.x = targetRotX;
    camera.position.x = targetRotY * 0.5;
    camera.lookAt(0, 0, 0);

    // needle wiggle
    needle.rotation.z = -0.4 + Math.sin(t * 4) * 0.08;

    // particles drift up
    const arr = pGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      arr[i*3 + 1] += velocities[i] * speed;
      if (arr[i*3 + 1] > 3.5) arr[i*3 + 1] = -3.5;
    }
    pGeo.attributes.position.needsUpdate = true;

    // gold particles slow rotation
    gPoints.rotation.y += 0.0005 * speed;
    points.rotation.y += 0.0002 * speed;

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  }
  tick();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    } else if (!rafId && !lost) {
      tick();
    }
  });

  // entry animation
  compressor.scale.setScalar(0);
  if (window.gsap) {
    gsap.to(compressor.scale, {
      x: 1.05, y: 1.05, z: 1.05,
      duration: 1.6, ease: "power3.out", delay: 0.2
    });
    gsap.from(compressor.rotation, {
      y: -Math.PI, duration: 2, ease: "power3.out", delay: 0.2
    });
  } else {
    compressor.scale.setScalar(1.05);
  }
})();
