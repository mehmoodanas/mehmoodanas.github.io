/**
 * Small progressive-enhancement script. The site is fully usable without it:
 * it only adds the mobile menu, active-section highlighting, scroll reveals,
 * the copy-email button and the gentle tilt on the hero decoration.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ─────────────────────────── Header: scrolled state + menu ────────────────── */
function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const button = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!header) return;

  const onScroll = () => header.toggleAttribute('data-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (!button || !nav) return;

  const setOpen = (open: boolean, returnFocus = false) => {
    header.toggleAttribute('data-open', open);
    button.setAttribute('aria-expanded', String(open));
    if (!open && returnFocus) button.focus();
  };

  button.addEventListener('click', () => setOpen(!header.hasAttribute('data-open')));

  nav.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.hasAttribute('data-open')) setOpen(false, true);
  });

  document.addEventListener('click', (event) => {
    if (header.hasAttribute('data-open') && !header.contains(event.target as Node)) {
      setOpen(false);
    }
  });

  window.matchMedia('(min-width: 56rem)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

/* ───────────────────────────── Active section in the nav ───────────────────── */
function initScrollSpy(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-nav] a[data-section]'),
  );
  if (!links.length) return;

  const sections = links
    .map((link) => document.getElementById(link.dataset.section!))
    .filter((el): el is HTMLElement => el !== null);
  if (!sections.length) return;

  const setActive = (id: string | null) => {
    links.forEach((link) => {
      if (link.dataset.section === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  // The current section is the last one whose top edge has passed a line 45% down the viewport.
  // Computed from geometry on scroll (throttled with rAF) so it is correct after clicks,
  // deep links and fast scrolling.
  let frame = 0;
  const update = () => {
    frame = 0;
    const line = window.innerHeight * 0.45;
    let current: HTMLElement | null = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) current = section;
    }
    setActive(current ? current.id : null);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  update();
}

/* ───────────────────────────────── Scroll reveal ──────────────────────────── */
function initReveal(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  if (!items.length) return;

  if (!('IntersectionObserver' in window) || prefersReducedMotion.matches) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((item) => observer.observe(item));
}

/* ─────────────────────────────────── Copy email ───────────────────────────── */
function initCopy(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
    const text = button.dataset.copy ?? '';
    const label = button.querySelector<HTMLElement>('[data-copy-label]');
    const status = document.querySelector<HTMLElement>('[data-copy-status]');
    const original = label?.textContent ?? '';
    let timer: number | undefined;

    const announce = (message: string, ok: boolean) => {
      if (status) status.textContent = message;
      if (label) label.textContent = ok ? 'Copied' : 'Couldn’t copy. Select the address';
      button.toggleAttribute('data-copied', ok);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (label) label.textContent = original;
        button.removeAttribute('data-copied');
        if (status) status.textContent = '';
      }, ok ? 2600 : 5000);
    };

    button.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
        await navigator.clipboard.writeText(text);
        announce('Email address copied to the clipboard.', true);
      } catch {
        // Never claim success when copying failed.
        announce(`Could not copy automatically. The address is ${text}.`, false);
      }
    });
  });
}

/* ──────────────────────── Hero decoration: gentle pointer tilt ────────────── */
function initTilt(): void {
  const stage = document.querySelector<HTMLElement>('[data-tilt-stage]');
  if (!stage) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!canHover.matches || prefersReducedMotion.matches) return;

  let frame = 0;
  const update = (x: number, y: number) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      stage.style.setProperty('--px', x.toFixed(3));
      stage.style.setProperty('--py', y.toFixed(3));
    });
  };

  const hero = stage.closest<HTMLElement>('[data-hero]') ?? stage;
  hero.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
    const y = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
    update(Math.max(-1, Math.min(1, x * 2)), Math.max(-1, Math.min(1, y * 2)));
  });
  hero.addEventListener('pointerleave', () => update(0, 0));

  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) update(0, 0);
  });
}

/* Smooth scrolling is switched on only after the page has loaded and web fonts have settled;
   otherwise a link such as /#projects animates towards a position that then moves. */
function enableSmoothScroll(): void {
  if (prefersReducedMotion.matches) return;
  const on = () => document.documentElement.classList.add('smooth-scroll');
  const ready = () => {
    const fonts = document.fonts?.ready ?? Promise.resolve();
    fonts.then(() => window.setTimeout(on, 100));
  };
  if (document.readyState === 'complete') ready();
  else window.addEventListener('load', ready, { once: true });
}

initHeader();
enableSmoothScroll();
initScrollSpy();
initReveal();
initCopy();
initTilt();
