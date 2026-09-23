(() => {
  'use strict';
  if (!document.documentElement.classList.contains('js')) return;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const stacked = window.matchMedia('(max-width: 860px)');

  /* ---------- 1. Split headings into lines for a reveal-on-scroll ---------- */
  function splitLines(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    const wordSpans = words.map((w, i) => {
      const s = document.createElement('span');
      s.textContent = w + (i < words.length - 1 ? '\u00A0' : '');
      s.style.display = 'inline-block';
      el.appendChild(s);
      return s;
    });
    // Group by visual line using offsetTop, then rebuild as masked lines.
    const lines = [];
    let currentTop = null;
    wordSpans.forEach(s => {
      const top = s.offsetTop;
      if (currentTop === null || Math.abs(top - currentTop) > 2) { lines.push([]); currentTop = top; }
      lines[lines.length - 1].push(s.textContent);
    });
    el.textContent = '';
    lines.forEach((words, i) => {
      const mask = document.createElement('span');
      mask.className = 'line-mask';
      const inner = document.createElement('span');
      inner.className = 'line-inner';
      inner.style.setProperty('--li', i);
      inner.textContent = words.join('');
      mask.appendChild(inner);
      el.appendChild(mask);
      el.appendChild(document.createTextNode(' '));
    });
  }

  const lineEls = $$('[data-lines]');
  if (!reduceMotion.matches) lineEls.forEach(splitLines);

  if ('IntersectionObserver' in window && lineEls.length) {
    const lineObs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); lineObs.unobserve(e.target); }
    }), { threshold: 0.4 });
    lineEls.forEach(el => lineObs.observe(el));
  } else {
    lineEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- 2. Dock header: giant wordmark fades, header wordmark takes over ---------- */
  const header = $('#site-header');
  window.setTimeout(() => header.classList.add('is-docked'), 1350);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => header.classList.toggle('is-scrolled', !e.isIntersecting), { threshold: 0 }).observe($('#top'));
  }

  /* ---------- 3. Ground colour per scene ---------- */
  const groundSections = $$('[data-ground]');
  if ('IntersectionObserver' in window && groundSections.length) {
    const body = document.body;
    const setGround = name => { body.className = body.className.replace(/\bgnd-\S+/g, '').trim(); body.classList.add(`gnd-${name}`); };
    setGround(groundSections[0].dataset.ground);
    const groundObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setGround(e.target.dataset.ground); });
    }, { rootMargin: '-49% 0px -49% 0px' });
    groundSections.forEach(s => groundObs.observe(s));
  }

  /* ---------- 4. Model: pinned scene, scroll scrubs through the four pairs ---------- */
  const track = $('#model-track');
  if (track && window.__personOrder && window.__modelSelect) {
    const order = window.__personOrder;
    let ticking = false;
    let active = false;

    function update() {
      ticking = false;
      if (stacked.matches) return;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const idx = Math.min(order.length - 1, Math.floor(progress * order.length));
      const id = order[idx];
      if (id !== track.dataset.current) {
        track.dataset.current = id;
        window.__modelSelect(id, { announce: false, scene: !reduceMotion.matches });
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !stacked.matches) {
          if (!active) { active = true; window.addEventListener('scroll', onScroll, { passive: true }); update(); }
        } else if (active) {
          active = false; window.removeEventListener('scroll', onScroll);
        }
      }, { threshold: 0 }).observe(track);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    stacked.addEventListener('change', () => { if (stacked.matches && active) { active = false; window.removeEventListener('scroll', onScroll); } });
  }
})();
