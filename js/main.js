/* ============================================================
   GM Studio — main.js
   - Inline header/footer injection (works with file:// too)
   - Cloudflare R2 media configuration
   - Theme, nav, filters, lightbox, form, scroll reveal
   ============================================================ */

/* ── CLOUDFLARE R2 CONFIG ───────────────────────────────────
   Set your R2 public bucket URL below.
   All images and videos are served from this base URL.
   Example: https://pub-xxxxxxxxxxxxxxxx.r2.dev
   Or your custom domain: https://media.gmstudio.in
   ──────────────────────────────────────────────────────────── */
const R2 = {
  baseUrl: 'https://pub-YOUR-R2-BUCKET-ID.r2.dev',  // ← Replace with your R2 public URL

  // Helper: returns full URL for a file in R2
  url(path) {
    return `${this.baseUrl}/${path}`;
  },

  // Helper: returns <img> tag string for an R2 image
  img(path, alt = '', cls = '') {
    return `<img src="${this.url(path)}" alt="${alt}" class="${cls}" loading="lazy" />`;
  },

  // Helper: returns YouTube/Vimeo embed or R2 video
  video(path) {
    // If it's a full http URL (YouTube/Vimeo), use as-is; otherwise load from R2
    if (path.startsWith('http')) return path;
    return this.url(path);
  }
};

/* ── HEADER HTML ─────────────────────────────────────────────
   Single source of truth. Edit nav links here once.
   ──────────────────────────────────────────────────────────── */
function getHeaderHTML() {
  return `
<nav id="main-nav">
  <a href="index.html" class="nav-logo">GM <span>Studio</span></a>

  <ul class="nav-links">
    <li><a href="portfolio.html">Portfolio</a></li>
    <li><a href="videos.html">Videos</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li>
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        <span class="theme-icon theme-icon--dark">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </span>
        <span class="theme-icon theme-icon--light">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </span>
      </button>
    </li>
  </ul>

  <div class="nav-right-mobile">
    <button class="theme-toggle" id="theme-toggle-mobile" aria-label="Toggle theme">
      <span class="theme-icon theme-icon--dark">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </span>
      <span class="theme-icon theme-icon--light">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        </svg>
      </span>
    </button>
    <button class="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="mobile-menu" id="mobile-menu">
  <a href="portfolio.html">Portfolio</a>
  <a href="videos.html">Videos</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
</div>`;
}

/* ── FOOTER HTML ─────────────────────────────────────────────
   Single source of truth. Edit footer content here once.
   ──────────────────────────────────────────────────────────── */
function getFooterHTML() {
  return `
<footer>
  <div class="footer-grid">
    <div>
      <div class="footer-logo">GM <span>Studio</span></div>
      <p class="footer-about">Mumbai-based photography studio founded by Gulshan Makhija. Specialising in landscape, street, wedding and product photography. Available for commissions worldwide.</p>
      <div class="social-links" style="margin-top:20px;">
        <a href="#" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="#" aria-label="YouTube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
        </a>
        <a href="#" aria-label="WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </a>
        <a href="#" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>

    <div class="footer-col">
      <h4>Navigate</h4>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="videos.html">Videos</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="portfolio.html">Landscape</a></li>
        <li><a href="portfolio.html">Street</a></li>
        <li><a href="portfolio.html">Wedding</a></li>
        <li><a href="portfolio.html">Product</a></li>
        <li><a href="videos.html">Videography</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Contact</h4>
      <ul>
        <li><a href="mailto:hello@gmstudio.in">hello@gmstudio.in</a></li>
        <li><a href="tel:+919876543210">+91 98765 43210</a></li>
        <li><a href="#">Mumbai, Maharashtra</a></li>
        <li><a href="#">India</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    <span>© 2026 GM Studio. All rights reserved. Founded by Gulshan Makhija.</span>
    <span style="font-size:.7rem;opacity:.45;">Hosted on Cloudflare · Media on R2</span>
  </div>
</footer>`;
}

/* ── INJECT HEADER + FOOTER ─────────────────────────────────
   Works with file://, Cloudflare Pages, Netlify — everywhere.
   No fetch() needed.
   ──────────────────────────────────────────────────────────── */
function injectComponents() {
  const hp = document.getElementById('header-placeholder');
  const fp = document.getElementById('footer-placeholder');
  if (hp) hp.innerHTML = getHeaderHTML();
  if (fp) fp.innerHTML = getFooterHTML();
}

/* ── THEME ───────────────────────────────────────────────────*/
function setupTheme() {
  const saved = localStorage.getItem('gm-theme') || 'dark';
  applyTheme(saved);

  document.addEventListener('click', e => {
    if (!e.target.closest('#theme-toggle, #theme-toggle-mobile')) return;
    const cur  = document.documentElement.dataset.theme || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('gm-theme', next);
  });
}
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
}

/* ── NAV ─────────────────────────────────────────────────────*/
function setupNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || href.endsWith('/' + page)) a.classList.add('active');
  });

  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Hamburger
  document.addEventListener('click', e => {
    const btn  = e.target.closest('.hamburger');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    const open = menu.classList.toggle('open');
    const bars = btn.querySelectorAll('span');
    if (open) {
      bars[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
      bars[1].style.cssText = 'opacity:0';
      bars[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
    } else {
      bars.forEach(b => b.style.cssText = '');
    }
  });

  // Close on link click
  document.addEventListener('click', e => {
    if (!e.target.closest('#mobile-menu a')) return;
    const menu = document.getElementById('mobile-menu');
    const btn  = document.querySelector('.hamburger');
    if (menu) menu.classList.remove('open');
    if (btn)  btn.querySelectorAll('span').forEach(b => b.style.cssText = '');
  });
}

/* ── PORTFOLIO FILTER ────────────────────────────────────────*/
function setupFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-cat]');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(c => {
        const show = cat === 'all' || c.dataset.cat === cat;
        c.style.display = show ? '' : 'none';
        if (show) c.style.animation = 'fadeIn .35s ease forwards';
      });
    });
  });
}

/* ── LIGHTBOX ────────────────────────────────────────────────*/
function setupLightbox() {
  const lb      = document.getElementById('lightbox');
  const caption = document.getElementById('lb-caption');
  const lbImg   = document.getElementById('lb-img');
  const closeBtn= document.getElementById('lb-close');
  if (!lb) return;

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.dataset.lightbox;
      const cap = el.dataset.caption || '';
      if (lbImg) {
        if (src) {
          // If it's an R2 path (not full URL), build full URL
          lbImg.src = src.startsWith('http') ? src : R2.url(src);
          lbImg.style.display = 'block';
          lbImg.previousElementSibling && (lbImg.previousElementSibling.style.display = 'none');
        }
      }
      if (caption) caption.textContent = cap;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  if (closeBtn) closeBtn.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ── CONTACT FORM ────────────────────────────────────────────*/
function setupContactForm() {
  const form  = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig; btn.disabled = false;
      form.reset();
      if (toast) { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3800); }
    }, 1400);
  });
}

/* ── SCROLL REVEAL ───────────────────────────────────────────*/
function setupScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('revealed')); return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

/* ── COUNTERS ────────────────────────────────────────────────*/
function setupCounters() {
  const els = document.querySelectorAll('.stat-num[data-count]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = parseInt(el.dataset.count), suf = el.dataset.suffix || '';
      let cur = 0; const step = Math.ceil(end / 55);
      const t = setInterval(() => {
        cur = Math.min(cur + step, end);
        el.innerHTML = cur + '<span>' + suf + '</span>';
        if (cur >= end) clearInterval(t);
      }, 20);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
}

/* ── R2 MEDIA LOADER ─────────────────────────────────────────
   Finds all elements with data-r2-src and loads from R2.
   Usage in HTML:
     <img data-r2-src="photos/wedding-01.jpg" alt="Wedding" />
     <video data-r2-src="videos/film.mp4" controls />
   ──────────────────────────────────────────────────────────── */
function loadR2Media() {
  document.querySelectorAll('[data-r2-src]').forEach(el => {
    const path = el.dataset.r2Src;
    if (!path) return;
    const full = R2.url(path);
    if (el.tagName === 'IMG')   el.src = full;
    if (el.tagName === 'VIDEO') el.src = full;
    if (el.tagName === 'SOURCE') el.src = full;
    // For background images
    if (el.dataset.r2Bg) el.style.backgroundImage = `url(${full})`;
  });
}

/* ── FADE KEYFRAME ───────────────────────────────────────────*/
const _s = document.createElement('style');
_s.textContent = '@keyframes fadeIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}';
document.head.appendChild(_s);

/* ── BOOT ────────────────────────────────────────────────────*/
document.addEventListener('DOMContentLoaded', () => {
  injectComponents();   // ← inject header + footer first (synchronous, no fetch)
  setupTheme();
  setupNav();
  setupFilters();
  setupLightbox();
  setupContactForm();
  setupScrollReveal();
  setupCounters();
  loadR2Media();
});

/* ── EXPORT R2 for use in page scripts ───────────────────────*/
window.R2 = R2;
