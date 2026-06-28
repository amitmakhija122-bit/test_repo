/* ============================================================
   GM Studio — components.js
   Injects header + footer into every page using inline HTML.
   ✅ Works with file://  ✅ Works on Cloudflare Pages / Netlify
   To update nav or footer: edit the strings below ONCE here.
   ============================================================ */

(function () {

  /* ── HEADER HTML ─────────────────────────────────────────── */
  const HEADER = `
<nav id="main-nav">
  <a href="index.html" class="nav-logo">GM <span>Studio</span></a>

  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
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
    <button class="theme-toggle theme-toggle--mobile" id="theme-toggle-mobile" aria-label="Toggle theme">
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
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div class="mobile-menu" id="mobile-menu">
  <a href="index.html">Home</a>
  <a href="portfolio.html">Portfolio</a>
  <a href="videos.html">Videos</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
</div>`;

  /* ── FOOTER HTML ─────────────────────────────────────────── */
  const FOOTER = `
<footer>
  <div class="footer-grid">
    <div>
      <div class="footer-logo">GM <span>Studio</span></div>
      <p class="footer-about">Mumbai-based photography studio founded by Gulshan Makhija. Specialising in landscape, street, wedding and product photography. Available for commissions worldwide.</p>
      <div class="social-links" style="margin-top:20px;">
        <a href="#" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
        <a href="#" aria-label="YouTube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
          </svg>
        </a>
        <a href="#" aria-label="WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
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
        <li><span style="color:var(--text-muted)">Mumbai, Maharashtra, India</span></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 GM Studio. Founded by Gulshan Makhija.</span>
    <span style="font-size:.7rem;opacity:.5;">Made with ♥ in Mumbai</span>
  </div>
</footer>`;

  /* ── INJECT ───────────────────────────────────────────────── */
  function inject() {
    const h = document.getElementById('header-placeholder');
    const f = document.getElementById('footer-placeholder');
    if (h) h.innerHTML = HEADER;
    if (f) f.innerHTML = FOOTER;

    // Mark active nav link
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  // Run immediately if DOM ready, else wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
