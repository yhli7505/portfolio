(() => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const yearEl = document.querySelector('#year');
  const copyButtons = Array.from(document.querySelectorAll('.copy-btn'));
  const copyToast = document.querySelector('#copy-toast');
  const heroNameEl = document.querySelector('#hero-name');
  const heroSloganEl = document.querySelector('#hero-slogan');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let heroTyped = false;

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const typeText = (el, speed, delay = 0) =>
    new Promise((resolve) => {
      if (!el) {
        resolve();
        return;
      }

      const source = (el.getAttribute('data-type-text') || el.textContent || '').trim();
      if (!source) {
        resolve();
        return;
      }

      if (prefersReducedMotion) {
        el.textContent = source;
        resolve();
        return;
      }

      const chars = Array.from(source);
      el.textContent = '';
      let index = 0;

      const run = () => {
        el.textContent += chars[index];
        index += 1;

        if (index >= chars.length) {
          resolve();
          return;
        }

        setTimeout(run, speed);
      };

      setTimeout(run, delay);
    });

  const runHeroTypewriter = async () => {
    if (heroTyped) return;
    heroTyped = true;

    await typeText(heroNameEl, 170, 90);
    await typeText(heroSloganEl, 70, 130);
  };

  if (!prefersReducedMotion) {
    if (heroNameEl) heroNameEl.textContent = '';
    if (heroSloganEl) heroSloganEl.textContent = '';
  }

  const toggleHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 16);
  };

  toggleHeader();
  window.addEventListener('scroll', toggleHeader, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });
  }

  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');

        if (entry.target.classList.contains('hero-left')) {
          runHeroTypewriter();
        }

        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((el) => revealObserver.observe(el));

  setTimeout(() => {
    if (!heroTyped) {
      runHeroTypewriter();
    }
  }, 1200);

  const sections = Array.from(document.querySelectorAll('.section-anchor'));
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('is-active', active);
        });
      });
    },
    {
      threshold: 0.55,
      rootMargin: '-10% 0px -20% 0px'
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const counterEls = Array.from(document.querySelectorAll('[data-counter]'));
  const animateCounter = (el) => {
    const target = Number(el.getAttribute('data-counter'));
    const decimals = Number(el.getAttribute('data-decimals') || 0);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1150;
    const start = performance.now();

    const update = (now) => {
      const ratio = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      const value = target * eased;

      el.textContent = `${value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}${suffix}`;

      if (ratio < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.66 }
  );

  counterEls.forEach((el) => counterObserver.observe(el));

  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'readonly');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (_) {
      ok = false;
    }

    document.body.removeChild(textarea);
    return ok;
  };

  const showCopyToast = (message) => {
    if (!copyToast) return;

    copyToast.textContent = message;
    copyToast.classList.add('is-visible');

    clearTimeout(showCopyToast.timer);
    showCopyToast.timer = setTimeout(() => {
      copyToast.classList.remove('is-visible');
    }, 1200);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {
        return fallbackCopy(text);
      }
    }

    return fallbackCopy(text);
  };

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.getAttribute('data-copy') || '';
      const ok = await copyText(text);

      if (!ok) {
        showCopyToast('复制失败');
        return;
      }

      showCopyToast('已复制');
    });
  });
})();
