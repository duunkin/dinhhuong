(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  try {
    init();
  } catch (err) {
    // If anything fails, never leave content hidden behind a JS-only state.
    root.classList.remove('js');
    if (window.console) console.error(err);
  }

  function init() {
    const D = window.CareerModelData;
    if (!D) throw new Error('CareerModelData is missing');

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stacked = window.matchMedia('(max-width: 860px)');

    const personById = Object.fromEntries(D.person.map(p => [p.id, p]));
    const workById = Object.fromEntries(D.work.map(w => [w.id, w]));
    const relByPerson = Object.fromEntries(D.relationships.map(r => [r.personId, r]));
    const relByWork = Object.fromEntries(D.relationships.map(r => [r.workId, r]));
    const sourceById = Object.fromEntries(D.sources.map(s => [s.id, s]));

    const state = { personId: 'interests', careerId: 'architect' };

    /* ---------- Element references ---------- */
    const field = $('#field');
    const fieldSvg = $('#field-svg');
    const fieldPath = $('#field-path');
    const fieldMid = $('#field-mid');
    const fieldGrad = $('#field-grad');
    const personList = $('#person-list');
    const workList = $('#work-list');
    const reading = $('#reading');
    const live = $('#live');
    const careerTabs = $('#career-tabs');
    const careerPanel = $('#career-panel');
    const careerChips = $('#career-chips');
    const careerAttrs = $('#career-attrs');

    fieldPath.setAttribute('pathLength', '1');

    /* ---------- Build: model nodes ---------- */
    function makeNode(kind, item) {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `node node--${kind}`;
      btn.dataset[kind] = item.id;
      btn.setAttribute('aria-pressed', 'false');
      btn.innerHTML = '<span class="node-dot" aria-hidden="true"></span><span class="node-label"></span>';
      btn.querySelector('.node-label').textContent = item.label;
      li.appendChild(btn);
      return li;
    }
    D.person.forEach(p => personList.appendChild(makeNode('person', p)));
    D.work.forEach(w => workList.appendChild(makeNode('work', w)));

    personList.addEventListener('click', e => {
      const b = e.target.closest('[data-person]');
      if (b) select(b.dataset.person);
    });
    workList.addEventListener('click', e => {
      const b = e.target.closest('[data-work]');
      if (b) select(relByWork[b.dataset.work].personId);
    });

    /* ---------- Build: legend ---------- */
    const legendList = $('#legend-list');
    Object.entries(D.statuses).forEach(([key, s]) => {
      const li = document.createElement('li');
      li.className = 'status';
      li.dataset.status = key;
      li.innerHTML = '<span class="status-glyph" aria-hidden="true"></span><span><strong></strong><span class="legend-hint"></span></span>';
      li.querySelector('strong').textContent = s.label;
      li.querySelector('.legend-hint').textContent = s.hint;
      legendList.appendChild(li);
    });

    /* ---------- Build: sources ---------- */
    const sourceList = $('#source-list');
    D.sources.forEach(s => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = s.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = s.title;
      const hidden = document.createElement('span');
      hidden.className = 'sr-only';
      hidden.textContent = ' (mở trong tab mới)';
      a.appendChild(hidden);
      const pub = document.createElement('span');
      pub.textContent = s.publisher;
      li.append(a, pub);
      sourceList.appendChild(li);
    });

    /* ---------- Build: careers ---------- */
    Object.entries(D.careers).forEach(([id, c], i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'career-tab';
      btn.id = `tab-${id}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-controls', 'career-panel');
      btn.dataset.career = id;
      btn.textContent = c.label;
      careerTabs.appendChild(btn);
    });
    D.person.forEach(p => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip-btn';
      b.dataset.chip = p.id;
      b.setAttribute('aria-pressed', 'false');
      b.textContent = p.label;
      careerChips.appendChild(b);
    });
    careerChips.addEventListener('click', e => {
      const b = e.target.closest('[data-chip]');
      if (b) select(b.dataset.chip);
    });

    function renderCareer() {
      const c = D.careers[state.careerId];
      $('#career-name').textContent = c.label;
      $('#career-sub').textContent = c.subtitle;
      careerPanel.setAttribute('aria-labelledby', `tab-${state.careerId}`);
      $$('.career-tab', careerTabs).forEach(t => {
        const on = t.dataset.career === state.careerId;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      careerAttrs.textContent = '';
      D.work.forEach(w => {
        const rel = relByWork[w.id];
        const dt = document.createElement('dt');
        dt.innerHTML = '<span></span><small></small>';
        dt.firstChild.textContent = w.short;
        dt.querySelector('small').textContent = `Đặt cạnh: ${personById[rel.personId].short}`;

        const dd = document.createElement('dd');
        const ul = document.createElement('ul');
        c[w.id].forEach(text => {
          const li = document.createElement('li');
          li.textContent = text;
          ul.appendChild(li);
        });
        const q = document.createElement('p');
        q.className = 'attr-q';
        q.textContent = rel.question;
        dd.append(ul, q);

        const wrap = document.createElement('div');
        wrap.className = 'attr';
        wrap.dataset.person = rel.personId;
        wrap.append(dt, dd);
        careerAttrs.appendChild(wrap);
      });
      paintCareerLens();
    }

    function paintCareerLens() {
      $$('.attr', careerAttrs).forEach(a => a.classList.toggle('is-paired', a.dataset.person === state.personId));
      $$('.chip-btn', careerChips).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.chip === state.personId)));
    }

    careerTabs.addEventListener('click', e => {
      const t = e.target.closest('[data-career]');
      if (!t) return;
      state.careerId = t.dataset.career;
      renderCareer();
    });
    careerTabs.addEventListener('keydown', e => {
      const tabs = $$('.career-tab', careerTabs);
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      let n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      if (n === null) return;
      e.preventDefault();
      tabs[n].focus();
      state.careerId = tabs[n].dataset.career;
      renderCareer();
      tabs[n].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });

    /* ---------- Select a pair (from either side) ---------- */
    function select(personId, { announce = true } = {}) {
      const rel = relByPerson[personId];
      if (!rel) return;
      state.personId = personId;
      const person = personById[personId];
      const work = workById[rel.workId];
      const status = D.statuses[rel.status];

      $$('[data-person]', personList).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.person === personId)));
      $$('[data-work]', workList).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.work === rel.workId)));

      $('#pair-person').textContent = person.label;
      $('#pair-work').textContent = work.label;
      const st = $('#pair-status');
      st.dataset.status = rel.status;
      $('#pair-status-text').textContent = status.label;

      $('#reading-question').textContent = rel.question;
      $('#fact-person').textContent = rel.personText;
      $('#fact-work').textContent = rel.workText;
      $('#fact-basis').textContent = rel.basis;
      $('#fact-limit').textContent = rel.limit;

      const src = $('#fact-sources');
      src.textContent = '';
      rel.sources.forEach(id => {
        const s = sourceById[id];
        const a = document.createElement('a');
        a.href = s.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = s.title;
        const hidden = document.createElement('span');
        hidden.className = 'sr-only';
        hidden.textContent = ' (mở trong tab mới)';
        a.appendChild(hidden);
        src.appendChild(a);
      });

      if (!reduceMotion.matches) {
        reading.classList.remove('is-updated');
        void reading.offsetWidth; // restart the animation
        reading.classList.add('is-updated');
      }

      paintCareerLens();
      drawPath(true);
      if (announce) {
        live.textContent = `Đang xem: ${person.label} và ${work.label}. ${status.label}. ${rel.question}`;
      }
    }

    /* ---------- Connector geometry, measured from the real DOM ---------- */
    function drawPath(animate) {
      if (stacked.matches) return;
      const pDot = $('[data-person][aria-pressed="true"] .node-dot', personList);
      const wDot = $('[data-work][aria-pressed="true"] .node-dot', workList);
      if (!pDot || !wDot) return;

      const s = field.getBoundingClientRect();
      const a = pDot.getBoundingClientRect();
      const b = wDot.getBoundingClientRect();
      const x1 = a.left + a.width / 2 - s.left;
      const y1 = a.top + a.height / 2 - s.top;
      const x2 = b.left + b.width / 2 - s.left;
      const y2 = b.top + b.height / 2 - s.top;
      const mx = (x1 + x2) / 2;

      fieldPath.setAttribute('d', `M${x1.toFixed(1)} ${y1.toFixed(1)} C ${mx.toFixed(1)} ${y1.toFixed(1)}, ${mx.toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`);
      fieldGrad.setAttribute('x1', x1.toFixed(1));
      fieldGrad.setAttribute('x2', x2.toFixed(1));

      // Midpoint of a symmetric cubic sits at its centre.
      fieldMid.setAttribute('cx', mx.toFixed(1));
      fieldMid.setAttribute('cy', ((y1 + y2) / 2).toFixed(1));

      if (animate && !reduceMotion.matches) {
        fieldPath.classList.remove('is-drawing');
        void fieldPath.getBoundingClientRect();
        fieldPath.classList.add('is-drawing');
      }
    }

    if ('ResizeObserver' in window) new ResizeObserver(() => drawPath(false)).observe(field);
    window.addEventListener('resize', () => drawPath(false));
    stacked.addEventListener('change', () => drawPath(false));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => drawPath(false));

    /* Jump links from the lens list select that lens in the model. */
    $$('[data-jump-lens]').forEach(a => a.addEventListener('click', () => select(a.dataset.jumpLens, { announce: false })));

    /* ---------- Mobile menu ---------- */
    const header = $('#site-header');
    const menuBtn = $('#menu-btn');
    const menuPanel = $('#menu-panel');

    function setMenu(open) {
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
      menuPanel.hidden = !open;
      header.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      if (open) $('a', menuPanel).focus();
    }
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    menuPanel.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
    header.addEventListener('click', e => { if (e.target === header) setMenu(false); });
    document.addEventListener('keydown', e => {
      if (menuBtn.getAttribute('aria-expanded') !== 'true') return;
      if (e.key === 'Escape') { setMenu(false); menuBtn.focus(); return; }
      if (e.key === 'Tab') {
        const items = [menuBtn, ...$$('a', menuPanel)];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    stacked.addEventListener('change', e => { if (!e.matches) setMenu(false); });

    /* ---------- Header shadow, current section, reveal, steps ---------- */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => header.classList.toggle('is-scrolled', !e.isIntersecting), { threshold: 0 })
        .observe($('#top'));

      const links = $$('a[href^="#"]', $('.nav'));
      const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          links.forEach(l => {
            if (l.getAttribute('href') === `#${entry.target.id}`) l.setAttribute('aria-current', 'true');
            else l.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('main > section[id]').forEach(s => spy.observe(s));

      const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); reveal.unobserve(entry.target); }
      }), { threshold: 0.2 });
      $$('.reveal').forEach(el => reveal.observe(el));

      const steps = $$('.step');
      const paintSteps = () => {
        const mid = window.innerHeight * 0.55;
        let reached = -1;
        steps.forEach((s, i) => { if (s.getBoundingClientRect().top <= mid) reached = i; });
        steps.forEach((s, i) => {
          s.classList.toggle('is-reached', i <= reached);
          s.classList.toggle('is-done', i < reached);
        });
      };
      const stepObs = new IntersectionObserver(paintSteps, { rootMargin: '0px 0px -45% 0px', threshold: [0, 1] });
      steps.forEach(s => stepObs.observe(s));
      paintSteps();
    } else {
      $$('.reveal').forEach(el => el.classList.add('is-in'));
      $$('.step').forEach(s => s.classList.add('is-reached', 'is-done'));
    }

    /* ---------- Initial render ---------- */
    renderCareer();
    select(state.personId, { announce: false });
  }
})();
