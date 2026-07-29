/* ============================================
   CodeGenz — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Lucide Icons ---- */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ---- Navbar Scroll Effect ---- */
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check

  /* ---- Scroll Reveal (Intersection Observer) ---- */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  /* ---- Mobile Menu ---- */
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  const openMenu = () => {
    mobileMenu.classList.add('active');
    menuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  };

  menuBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  menuOverlay?.addEventListener('click', closeMenu);

  // Close on link click inside mobile menu
  mobileMenu?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const navH = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- Counter Animation (Stats) ---- */
  const animateValue = (el, end, suffix) => {
    const duration = 2200;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      el.textContent = Math.floor(end * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const statsEl = document.getElementById('stats');
  let statsDone = false;

  if (statsEl) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsDone) {
          statsDone = true;
          document.querySelectorAll('.stat-number').forEach((el) => {
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            animateValue(el, target, suffix);
          });
          statsObserver.unobserve(statsEl);
        }
      },
      { threshold: 0.5 }
    );
    statsObserver.observe(statsEl);
  }

  /* ---- Active Nav Highlighting ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const h = section.offsetHeight;
      const id = section.id;

      if (scrollY >= top && scrollY < top + h) {
        navLinks.forEach((link) => {
          const isMatch = link.getAttribute('href') === '#' + id;
          link.classList.toggle('text-indigo-600', isMatch);
          link.classList.toggle('font-semibold', isMatch);
          link.classList.toggle('text-slate-500', !isMatch);
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  /* ---- Footer Year ---- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
