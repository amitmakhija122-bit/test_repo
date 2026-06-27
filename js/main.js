/* ============================================================
   Aryan Sharma Photography — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── ACTIVE NAV LINK ──────────────────────────────────────
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // ── HAMBURGER MENU ───────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
      // animate bars
      const bars = hamburger.querySelectorAll('span');
      if (hamburger.classList.contains('open')) {
        bars[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
        bars[1].style.cssText = 'opacity:0';
        bars[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
      } else {
        bars.forEach(b => b.style.cssText = '');
      }
    });
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(b => b.style.cssText = '');
      })
    );
  }

  // ── NAV SCROLL SHADOW ────────────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 20
        ? '0 2px 24px rgba(0,0,0,.5)' : '';
    });
  }

  // ── PORTFOLIO FILTER ─────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const photoCards = document.querySelectorAll('.photo-card[data-cat], .masonry-item[data-cat]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      photoCards.forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'fadeIn .35s ease forwards';
        }
      });
    });
  });

  // ── LIGHTBOX ─────────────────────────────────────────────
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lb-img');
  const lbCaption  = document.getElementById('lb-caption');
  const lbClose    = document.getElementById('lb-close');

  if (lightbox) {
    document.querySelectorAll('[data-lightbox]').forEach(el => {
      el.addEventListener('click', () => {
        const src     = el.dataset.lightbox;
        const caption = el.dataset.caption || '';
        if (src) {
          lbImg.src       = src;
          lbCaption.textContent = caption;
        } else {
          // placeholder — show a grey box
          lbImg.src = '';
          lbCaption.textContent = caption || 'Photo';
        }
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLb = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };
    lbClose?.addEventListener('click', closeLb);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
  }

  // ── CONTACT FORM ─────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  const toast       = document.getElementById('toast');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        contactForm.reset();
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 3800);
        }
      }, 1400);
    });
  }

  // ── SCROLL-REVEAL ────────────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(22px)';
      el.style.transition = 'opacity .55s ease, transform .55s ease';
      io.observe(el);
    });
  }

  // ── COUNTER ANIMATION ────────────────────────────────────
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  if (statNums.length && 'IntersectionObserver' in window) {
    const countIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const end   = parseInt(el.dataset.count, 10);
        const suf   = el.dataset.suffix || '';
        let current = 0;
        const step  = Math.ceil(end / 60);
        const tick  = setInterval(() => {
          current = Math.min(current + step, end);
          el.innerHTML = current + '<span>' + suf + '</span>';
          if (current >= end) clearInterval(tick);
        }, 22);
        countIO.unobserve(el);
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => countIO.observe(el));
  }

  // ── REVEALED CLASS RESET (for transition) ───────────────
  document.addEventListener('animationend', () => {});
});

// CSS keyframes injected via JS for fadeIn used in filter
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }
  .revealed { opacity:1 !important; transform:translateY(0) !important; }
`;
document.head.appendChild(style);
