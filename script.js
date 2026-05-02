/* ============================================================
   ANAS MEHMOOD — PORTFOLIO SCRIPT (v4.2)
   Vanilla JS + Three.js wireframe (warm colors, no cyan)
   + mouse-tracking 3D tilt on [data-tilt] cards
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. LOADER ---------- */
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.add('loaded');
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('done');
    }, 1900);
  });

  /* ---------- 2. SCROLL REVEALS ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- 3. HEADER HIDE ON SCROLL DOWN ---------- */
  const header = document.getElementById('header');
  let lastScroll = 0;
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const cur = window.scrollY;
        if (cur > lastScroll && cur > 200) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
        lastScroll = cur;
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 4. MOBILE BURGER MENU ---------- */
  const burger   = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- 5. 3D MOUSE-TILT FOR CARDS ---------- */
  // Apply rotateX/rotateY based on mouse position over the card.
  // Only on devices with hover (skip touch — already handled in CSS).
  const tiltEls = document.querySelectorAll('[data-tilt]');
  const canHover = window.matchMedia('(hover: hover)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canHover && !reducedMotion) {
    tiltEls.forEach((el) => {
      el.style.transformStyle = 'preserve-3d';
      el.style.willChange = 'transform';

      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;   // 0..1
        const y = (e.clientY - r.top)  / r.height;  // 0..1
        const rx = (0.5 - y) * 8;   // up/down tilt — max 8deg
        const ry = (x - 0.5) * 10;  // left/right tilt — max 10deg
        el.style.transform =
          `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px) translateZ(8px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------- 6. THREE.JS HERO SCENE ---------- */
  // Bigger wireframe icosahedron + warm particle cloud + secondary torus.
  // Pauses when hero offscreen for performance.
  const canvas = document.getElementById('heroCanvas');
  const heroSection = document.getElementById('home');

  if (canvas && heroSection && typeof THREE !== 'undefined' && !reducedMotion) {
    let renderer, scene, camera, mainMesh, secondaryMesh, particles, raf, isVisible = true;

    function init() {
      const w = heroSection.clientWidth;
      const h = heroSection.clientHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h, false);
      renderer.setClearColor(0x000000, 0);

      // 1. Main wireframe icosahedron — bigger, more detail, terracotta
      const mainGeo  = new THREE.IcosahedronGeometry(2.4, 1);
      const mainWire = new THREE.WireframeGeometry(mainGeo);
      const mainMat  = new THREE.LineBasicMaterial({
        color: 0xc4694b,
        transparent: true,
        opacity: 0.45,
      });
      mainMesh = new THREE.LineSegments(mainWire, mainMat);
      scene.add(mainMesh);

      // 2. Secondary smaller torus knot — adds depth + 3D feel
      const torusGeo  = new THREE.TorusKnotGeometry(0.8, 0.15, 64, 8, 2, 3);
      const torusWire = new THREE.WireframeGeometry(torusGeo);
      const torusMat  = new THREE.LineBasicMaterial({
        color: 0xd4a574,
        transparent: true,
        opacity: 0.32,
      });
      secondaryMesh = new THREE.LineSegments(torusWire, torusMat);
      secondaryMesh.position.set(2.5, -1.4, 1);
      secondaryMesh.scale.set(0.9, 0.9, 0.9);
      scene.add(secondaryMesh);

      // 3. Particle dust — warm palette (terracotta + honey + cream)
      const N = 240;
      const positions = new Float32Array(N * 3);
      const colors    = new Float32Array(N * 3);
      const palette = [
        new THREE.Color(0xc4694b), // terracotta
        new THREE.Color(0xd4a574), // honey
        new THREE.Color(0xe8d4b0), // cream
      ];
      for (let i = 0; i < N; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 16;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
      });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);
    }

    let mouseX = 0, mouseY = 0;
    function onMouseMove(e) {
      const r = heroSection.getBoundingClientRect();
      mouseX = ((e.clientX - r.left) / r.width)  - 0.5;
      mouseY = ((e.clientY - r.top)  / r.height) - 0.5;
    }
    heroSection.addEventListener('mousemove', onMouseMove, { passive: true });

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = performance.now() * 0.0003;

      if (mainMesh) {
        mainMesh.rotation.y = t * 1.4 + mouseX * 0.4;
        mainMesh.rotation.x = Math.sin(t) * 0.4 + mouseY * 0.25;
      }
      if (secondaryMesh) {
        secondaryMesh.rotation.y = -t * 2.2;
        secondaryMesh.rotation.x = t * 1.6 + mouseY * 0.3;
        secondaryMesh.position.x = 2.5 + Math.sin(t * 2) * 0.25;
      }
      if (particles) {
        particles.rotation.y = t * 0.5;
        particles.rotation.x = mouseY * 0.08;
      }

      renderer.render(scene, camera);
    }

    function start() {
      if (raf) return;
      animate();
    }
    function stop() {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }

    function onResize() {
      const w = heroSection.clientWidth;
      const h = heroSection.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    window.addEventListener('resize', onResize);

    // Pause render when hero offscreen
    if ('IntersectionObserver' in window) {
      const heroIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) start(); else stop();
        });
      }, { threshold: 0 });
      heroIO.observe(heroSection);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (isVisible) start();
    });

    try {
      init();
      start();
    } catch (err) {
      console.warn('Three.js init failed:', err);
      canvas.style.display = 'none';
    }
  }
})();
