(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Hairline top scroll progress bar + subtle Hero orbital parallax (rAF throttled)
  const progressBar = document.querySelector('[data-scroll-progress]');
  const orbitRing = document.querySelector('[data-hero-orbit]');
  let scrollTicking = false;

  const onScrollFrame = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (progressBar) {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, scrollTop / maxScroll));
      progressBar.style.transform = `scaleX(${ratio})`;
    }
    if (orbitRing && !prefersReduced && scrollTop < 700) {
      orbitRing.style.transform = `translate3d(-50%, calc(-50% + ${(scrollTop * 0.14).toFixed(1)}px), 0)`;
    }
    scrollTicking = false;
  };

  const requestScrollUpdate = () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(onScrollFrame);
    }
  };

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  onScrollFrame();

  // 2. Optimized Hero Constellation Canvas (auto-pauses offscreen)
  const canvas = document.querySelector('[data-hero-canvas]');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let width = 0;
      let height = 0;
      let heroVisible = true;
      let rafId = null;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const nodeCount = window.innerWidth < 720 ? 20 : 34;
      const nodes = [];
      const pointer = { x: -999, y: -999 };

      const resize = () => {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resize();
      window.addEventListener('resize', resize, { passive: true });

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.36,
          vy: (Math.random() - 0.5) * 0.36,
          r: 1.2 + Math.random() * 1.7,
        });
      }

      canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
      }, { passive: true });

      canvas.parentElement.addEventListener('mouseleave', () => {
        pointer.x = -999;
        pointer.y = -999;
      });

      const tick = () => {
        if (!heroVisible) {
          rafId = null;
          return;
        }
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          const dxp = pointer.x - n.x;
          const dyp = pointer.y - n.y;
          const distP = Math.hypot(dxp, dyp);
          if (distP < 125 && distP > 1) {
            n.x += (dxp / distP) * 0.24;
            n.y += (dyp / distP) * 0.24;
          }

          for (let j = i + 1; j < nodes.length; j++) {
            const m = nodes[j];
            const dist = Math.hypot(n.x - m.x, n.y - m.y);
            if (dist < 112) {
              const alpha = (1 - dist / 112) * 0.22;
              ctx.strokeStyle = `rgba(147, 197, 253, ${alpha.toFixed(3)})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(m.x, m.y);
              ctx.stroke();
            }
          }

          ctx.fillStyle = 'rgba(191, 219, 254, 0.68)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }

        rafId = requestAnimationFrame(tick);
      };

      if ('IntersectionObserver' in window) {
        const heroObs = new IntersectionObserver((entries) => {
          heroVisible = entries[0]?.isIntersecting ?? true;
          if (heroVisible && !rafId) rafId = requestAnimationFrame(tick);
        });
        heroObs.observe(canvas.parentElement);
      }

      rafId = requestAnimationFrame(tick);
    }
  }

  // 3. Restrained Scroll Reveals + Staggered Wave Badges
  const revealEls = document.querySelectorAll('.motion-reveal, .stagger-group');
  document.querySelectorAll('.stagger-group').forEach((group) => {
    group.querySelectorAll('.tool-badge').forEach((badge, i) => {
      badge.style.setProperty('--i', String(i));
    });
  });

  if (!prefersReduced && 'IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -20px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // 4. One-tap Copy Email button in Contact section
  const copyBtn = document.querySelector('[data-copy-email]');
  if (copyBtn) {
    const email = copyBtn.getAttribute('data-copy-email') || 'mdrejoanabir@gmail.com';
    const textSpan = copyBtn.querySelector('[data-copy-text]');
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        const helper = document.createElement('textarea');
        helper.value = email;
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        helper.remove();
      }
      copyBtn.classList.add('is-copied');
      if (textSpan) textSpan.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.classList.remove('is-copied');
        if (textSpan) textSpan.textContent = 'Copy Email';
      }, 1800);
    });
  }

  // 6. Online CV Real Portrait Zoom Lightbox Modal
  const openModalBtn = document.querySelector('[data-open-photo]');
  const modal = document.querySelector('[data-photo-modal]');
  const closeModalBtn = document.querySelector('[data-close-photo]');

  if (openModalBtn && modal) {
    const openModal = () => {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    };
    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    };

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }
})();
