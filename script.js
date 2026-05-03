/* ============================================================
   ANAS MEHMOOD — PORTFOLIO SCRIPT (v7)
   Sidebar + two-page · Sand & Ink palette · NO orange
   3D: undulating wireframe (ink + gold) on home + sidebar wireframe
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. LOADER ---------- */
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.add('loaded');
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('done');
    }, 1700);
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
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- 3. ACTIVE NAV TRACKING ---------- */
  const navLinks = document.querySelectorAll('.side-nav a[data-link]');
  const sectionIds = Array.from(navLinks).map((a) => a.getAttribute('href').slice(1));
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function setActiveNav(id) {
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    const navIO = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveNav(visible[0].target.id);
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    sections.forEach((s) => navIO.observe(s));
  }

  /* ---------- 4. MOBILE SIDEBAR ---------- */
  const burger  = document.getElementById('mobileBurger');
  const sidebar = document.getElementById('sidebar');
  if (burger && sidebar) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      sidebar.classList.toggle('open');
    });
    sidebar.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        sidebar.classList.remove('open');
      });
    });
  }

  /* ---------- 5. CARD MOUSE-TILT ---------- */
  const tiltEls = document.querySelectorAll('[data-tilt]');
  const canHover = window.matchMedia('(hover: hover)').matches;
  const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canHover && !reduced) {
    tiltEls.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top)  / r.height;
        const rx = (0.5 - y) * 8;
        const ry = (x - 0.5) * 10;
        el.style.transform =
          `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px) translateZ(6px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------- 6. THREE.JS — HOME HERO PLANE (ink + gold) ---------- */
  const bg = document.getElementById('bgCanvas');
  if (bg && typeof THREE !== 'undefined' && !reduced) {
    let renderer, scene, camera, mesh, particles, raf;
    const heroEl = bg.parentElement;

    function init() {
      const w = heroEl.clientWidth;
      const h = heroEl.clientHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
      camera.position.set(0, 1.6, 7.5);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        canvas: bg,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h, false);
      renderer.setClearColor(0x000000, 0);

      // Wireframe topographic plane — cream wireframe on near-black bg
      const planeGeo = new THREE.PlaneGeometry(14, 9, 38, 24);
      const planeMat = new THREE.MeshBasicMaterial({
        color: 0xecebe0,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });
      mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = -Math.PI / 2.6;
      mesh.position.y = -1.2;
      scene.add(mesh);

      // Floating gold yellow particles (the only colored accent)
      const N = 80;
      const positions = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 14;
        positions[i * 3 + 1] = Math.random() * 5 + 0.5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xf7d774,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);
    }

    let mouseX = 0, mouseY = 0;
    function onMouseMove(e) {
      const r = heroEl.getBoundingClientRect();
      mouseX = ((e.clientX - r.left) / r.width)  - 0.5;
      mouseY = ((e.clientY - r.top)  / r.height) - 0.5;
    }
    heroEl.addEventListener('mousemove', onMouseMove, { passive: true });

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = performance.now() * 0.0006;

      if (mesh) {
        const positions = mesh.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          const z = Math.sin(x * 0.55 + t * 1.4) * 0.45
                  + Math.cos(y * 0.75 + t * 1.1) * 0.35;
          positions.setZ(i, z);
        }
        positions.needsUpdate = true;
        mesh.rotation.z = mouseX * 0.06;
      }
      if (particles) {
        particles.rotation.y = t * 0.18;
        particles.position.y = Math.sin(t * 0.8) * 0.2;
      }
      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (1.6 + mouseY * -0.4 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    function start() { if (!raf) animate(); }
    function stop()  { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    function onResize() {
      const w = heroEl.clientWidth;
      const h = heroEl.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    window.addEventListener('resize', onResize);

    if ('IntersectionObserver' in window) {
      const heroIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) start(); else stop(); });
      }, { threshold: 0 });
      heroIO.observe(heroEl);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });

    try { init(); start(); }
    catch (err) { console.warn('Hero 3D failed:', err); bg.style.display = 'none'; }
  }

  /* ---------- 7. THREE.JS — SIDEBAR WIREFRAME ICOSAHEDRON ---------- */
  const sb = document.getElementById('sidebar3d');
  if (sb && typeof THREE !== 'undefined' && !reduced) {
    let r2, s2, c2, m2, raf2;

    function initSb() {
      const w = sb.parentElement.clientWidth;
      const h = sb.clientHeight || 130;
      s2 = new THREE.Scene();
      c2 = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      c2.position.z = 4.2;
      r2 = new THREE.WebGLRenderer({ canvas: sb, alpha: true, antialias: true });
      r2.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      r2.setSize(w, h, false);
      r2.setClearColor(0x000000, 0);

      // Wireframe icosahedron in cream/yellow on dark sidebar
      const g  = new THREE.IcosahedronGeometry(1.2, 1);
      const wg = new THREE.WireframeGeometry(g);
      const mt = new THREE.LineBasicMaterial({
        color: 0xf4d35e,
        transparent: true,
        opacity: 0.5,
      });
      m2 = new THREE.LineSegments(wg, mt);
      s2.add(m2);
    }
    function animateSb() {
      raf2 = requestAnimationFrame(animateSb);
      const t = performance.now() * 0.0004;
      if (m2) {
        m2.rotation.y = t * 1.4;
        m2.rotation.x = Math.sin(t) * 0.5;
      }
      r2.render(s2, c2);
    }
    function startSb() { if (!raf2) animateSb(); }
    function stopSb()  { if (raf2) { cancelAnimationFrame(raf2); raf2 = null; } }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopSb(); else startSb();
    });

    try { initSb(); startSb(); }
    catch (err) { console.warn('Sidebar 3D failed:', err); sb.style.display = 'none'; }
  }
})();
