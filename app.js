// ============ APP LOGIC ============
document.addEventListener('DOMContentLoaded', () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }
  const D = window.STARK_DATA;

  // ---------- NAV scrolled state ----------
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ---------- MOBILE nav toggle ----------
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    };
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  // ---------- COUNT-UP STATS ----------
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const obj = { v: 0 };
    if (window.gsap && window.ScrollTrigger) {
      ScrollTrigger.create({
        trigger: el, start: "top 85%", once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: target, duration: 2.2, ease: "power2.out",
            onUpdate: () => {
              const v = decimals ? obj.v.toFixed(decimals) : Math.floor(obj.v);
              el.innerHTML = `${prefix}${v.toLocaleString()}<span class="suffix">${suffix}</span>`;
            }
          });
        }
      });
    } else {
      el.innerHTML = `${prefix}${target.toLocaleString()}<span class="suffix">${suffix}</span>`;
    }
  });

  // ---------- HERO RPM readout (live ticking) ----------
  const rpmEl = document.querySelector('#rpm-num');
  if (rpmEl) {
    let base = 1750;
    setInterval(() => {
      const v = base + Math.round((Math.random() - 0.5) * 6);
      rpmEl.textContent = v.toLocaleString();
    }, 280);
  }
  const psiEl = document.querySelector('#psi-num');
  if (psiEl) {
    let base = 5870;
    setInterval(() => {
      const v = base + Math.round((Math.random() - 0.5) * 30);
      psiEl.textContent = v.toLocaleString();
    }, 320);
  }

  // ---------- HERO entry animation ----------
  if (window.gsap) {
    gsap.from('.hero-meta span', { opacity: 0, y: 12, duration: 0.6, stagger: 0.1, delay: 0.1, ease: "power2.out" });
    gsap.from('.hero h1', { opacity: 0, y: 24, duration: 1, delay: 0.3, ease: "power3.out" });
    gsap.from('.hero-sub', { opacity: 0, y: 16, duration: 0.8, delay: 0.6, ease: "power2.out" });
    gsap.from('.hero-cta > *', { opacity: 0, y: 12, duration: 0.6, stagger: 0.1, delay: 0.8, ease: "power2.out" });
    gsap.from('.hero-spec > div', { opacity: 0, y: 12, duration: 0.6, stagger: 0.08, delay: 1.0, ease: "power2.out" });
    gsap.from('.hero-readout', { opacity: 0, x: 24, duration: 1, delay: 0.4, ease: "power3.out" });
  }

  // ---------- SECTION reveals ----------
  // Use IntersectionObserver + CSS so sections stay visible even if
  // GSAP/ScrollTrigger fail to load or trigger positions go stale after
  // dynamic content (products, accessories) reflows the page.
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  revealEls.forEach(el => el.classList.add('reveal-init'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('reveal-in'));
  }
  // Safety net: ensure everything is visible after 2.5s no matter what
  setTimeout(() => revealEls.forEach(el => el.classList.add('reveal-in')), 2500);

  // ---------- COMPRESSORS catalog ----------
  const productsEl = document.getElementById('products');
  const filterEl = document.getElementById('filter-bar');
  const countEl = document.getElementById('filter-count');

  function typeBadge(types) {
    if (types.includes('seismic')) return { lbl: 'SEISMIC', t: 'seismic' };
    if (types.includes('breathing')) return { lbl: 'BREATHING AIR', t: 'breathing' };
    if (types.includes('diesel')) return { lbl: 'DIESEL', t: 'diesel' };
    if (types.includes('electric')) return { lbl: 'ELECTRIC', t: 'electric' };
    return { lbl: types[0].toUpperCase(), t: types[0] };
  }

  function renderProducts(filter = 'all') {
    const list = filter === 'all'
      ? D.compressors
      : D.compressors.filter(c => c.types.includes(filter));

    productsEl.innerHTML = list.map((p, i) => {
      const b = typeBadge(p.types);
      return `
        <div class="product" data-id="${p.id}" style="--i:${i}">
          <div class="head">
            <span class="model">MODEL · ${(i+1).toString().padStart(2,'0')}</span>
            <span class="badge" data-type="${b.t}">${b.lbl}</span>
          </div>
          <h4>${p.name}</h4>
          <div class="subtitle">${p.drive}</div>
          <div class="specs">
            <div><span class="lbl">Flow</span><span class="val hl">${p.flow}</span></div>
            <div><span class="lbl">Pressure</span><span class="val hl">${p.pressure}</span></div>
            <div><span class="lbl">Power</span><span class="val">${p.motor.split(',')[0]}</span></div>
            <div><span class="lbl">Weight</span><span class="val">${p.weight || '—'}</span></div>
          </div>
        </div>`;
    }).join('');

    countEl.textContent = `${list.length.toString().padStart(2,'0')} / ${D.compressors.length.toString().padStart(2,'0')} MODELS`;

    productsEl.querySelectorAll('.product').forEach(el => {
      el.addEventListener('click', () => openProduct(el.dataset.id));
    });

    // Animate product cards in via CSS class (avoids GSAP hiding them
    // permanently if something interrupts the tween).
    requestAnimationFrame(() => {
      [...productsEl.children].forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        el.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
        el.style.transitionDelay = `${Math.min(i, 12) * 0.04}s`;
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      });
    });
  }

  filterEl.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });

  renderProducts();

  // ---------- PRODUCT detail modal ----------
  const detailEl = document.getElementById('product-detail');

  const isMobileViewer = window.matchMedia('(max-width: 900px)').matches;

  function openProduct(id) {
    const p = D.compressors.find(c => c.id === id);
    if (!p) return;
    const b = typeBadge(p.types);
    detailEl.querySelector('.panel').innerHTML = `
      <button class="close" aria-label="Close">×</button>
      <div class="pd-meta">${b.lbl} · ${p.drive.toUpperCase()}</div>
      <h3>${p.name}</h3>
      <div class="pd-grid">
        <div class="pd-spec"><div class="lbl">Flow Rate</div><div class="val" style="color:var(--gold);font-family:var(--serif);font-style:italic;font-size:32px;">${p.flow}</div></div>
        <div class="pd-spec"><div class="lbl">Max Pressure</div><div class="val" style="color:var(--gold);font-family:var(--serif);font-style:italic;font-size:32px;">${p.pressure}</div></div>
        <div class="pd-spec"><div class="lbl">Power Plant</div><div class="val">${p.motor}</div></div>
        <div class="pd-spec"><div class="lbl">Drive</div><div class="val">${p.drive}</div></div>
        ${p.cylinders ? `<div class="pd-spec"><div class="lbl">Cylinders / Stages</div><div class="val">${p.cylinders}</div></div>`:''}
        ${p.lube ? `<div class="pd-spec"><div class="lbl">Lubrication</div><div class="val">${p.lube}</div></div>`:''}
        ${p.dim ? `<div class="pd-spec"><div class="lbl">Dimensions</div><div class="val">${p.dim}</div></div>`:''}
        ${p.weight ? `<div class="pd-spec"><div class="lbl">Weight</div><div class="val">${p.weight}</div></div>`:''}
      </div>
      <div class="pd-features">
        <h5>Standard Features</h5>
        <p>${p.features}</p>
      </div>
      ${p.options ? `<div class="pd-features"><h5>Options</h5><p>${p.options}</p></div>`:''}
      ${p.quote ? `<div class="pd-quote">"${p.quote}"</div>`:''}
      <div class="pd-actions">
        <a href="#contact" class="btn btn-primary">Request Quote <span class="arrow">→</span></a>
        ${p.spec ? (isMobileViewer
          ? `<a href="${encodeURIComponent(p.spec)}" target="_blank" rel="noopener" class="btn btn-ghost">Open Spec Sheet ↗</a>
             <a href="${encodeURIComponent(p.spec)}" download="${p.spec}" class="btn btn-ghost">Download PDF ↓</a>`
          : `<button class="btn btn-ghost spec-view-btn">View Spec Sheet ↓</button>
             <a href="${encodeURIComponent(p.spec)}" download="${p.spec}" class="btn btn-ghost">Download PDF ↓</a>`) : ''}
      </div>
      ${p.spec && !isMobileViewer ? `
      <div class="pd-spec-embed" style="display:none;">
        <div class="spec-embed-toolbar">
          <span>SPEC SHEET · ${p.name.toUpperCase()}</span>
          <a href="${encodeURIComponent(p.spec)}" download="${p.spec}" class="spec-dl-link">↓ DOWNLOAD</a>
        </div>
        <iframe src="${encodeURIComponent(p.spec)}" title="${p.name} Specification Sheet" loading="lazy"></iframe>
      </div>` : ''}
    `;
    detailEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    detailEl.querySelector('.close').addEventListener('click', closeProduct);
    const viewBtn = detailEl.querySelector('.spec-view-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', function() {
        const embed = detailEl.querySelector('.pd-spec-embed');
        const isOpen = embed.style.display !== 'none';
        embed.style.display = isOpen ? 'none' : 'block';
        this.textContent = isOpen ? 'View Spec Sheet ↓' : 'Hide Spec Sheet ↑';
      });
    }
  }
  function closeProduct() {
    detailEl.classList.remove('active');
    document.body.style.overflow = '';
  }
  detailEl.addEventListener('click', e => {
    if (e.target === detailEl) closeProduct();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProduct();
  });

  // ---------- AIR PURIFICATION table ----------
  const apEl = document.getElementById('ap-table-body');
  if (apEl) {
    apEl.innerHTML = D.airPurification.map(a => `
      <tr>
        <td class="model">${a.model}</td>
        <td>${a.flow}</td>
        <td>${a.volume}</td>
        <td>${a.chambers}</td>
        <td>${a.dim}</td>
        <td>${a.weight}</td>
      </tr>
    `).join('');
  }

  // ---------- ACCESSORIES ----------
  const accEl = document.getElementById('accessories-grid');
  if (accEl) {
    accEl.innerHTML = D.accessories.map(a => `
      <div class="acc-card">
        <div class="acc-sub">${a.cat}</div>
        <h4>${a.title}</h4>
        <ul>${a.lines.map(l => `<li>${l}</li>`).join('')}</ul>
      </div>
    `).join('');
  }

  // ---------- CUSTOMERS marquee ----------
  const mEl = document.getElementById('marquee');
  if (mEl) {
    const dup = [...D.customers, ...D.customers]; // double for seamless loop
    mEl.innerHTML = dup.map(c => `<span class="logo">${c}</span>`).join('');
  }

  // ---------- BEFORE/AFTER slider ----------
  const ba = document.getElementById('before-after');
  if (ba) {
    const before = ba.querySelector('.ba-before');
    const handle = ba.querySelector('.ba-handle');
    let dragging = false;
    function setPos(x) {
      const rect = ba.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = `${pct}%`;
    }
    ba.addEventListener('mousedown', e => { dragging = true; setPos(e.clientX); });
    window.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
    window.addEventListener('mouseup', () => dragging = false);
    ba.addEventListener('touchstart', e => { dragging = true; setPos(e.touches[0].clientX); }, {passive:true});
    window.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, {passive:true});
    window.addEventListener('touchend', () => dragging = false);
  }

  // ---------- CONTACT FORM ----------
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const success = document.getElementById('form-success');
      success.classList.add('active');
      form.reset();
      setTimeout(() => success.classList.remove('active'), 6000);
    });
  }

  // ---------- ANCHOR scrolling offset for fixed nav ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
