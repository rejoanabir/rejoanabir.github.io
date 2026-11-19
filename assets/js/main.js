/**
 * Veltus Studio - Interactive Motion Graphics & Portfolio Script
 * Engineered with GSAP, Web Audio API, and Canvas Particles
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initAudio();
  initTilt();
  initAnimations();
  initProjectFilters();
  initShowreelModal();
  initClipboard();
  initMobileMenu();
});

/* ----------------------------------------------------
   1. Interactive Ambient Cyber Particle Canvas
   ---------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById('bg-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 55);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4 - 0.2;
      this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(37, 99, 235,';
      this.alpha = Math.random() * 0.5 + 0.2;
      this.alphaChange = (Math.random() - 0.5) * 0.01;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha += this.alphaChange;
      if (this.alpha <= 0.1 || this.alpha >= 0.7) this.alphaChange *= -1;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.fillStyle = `${this.color}${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ----------------------------------------------------
   2. Futuristic Web Audio Micro-Interactions (Synth SFX)
   ---------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  const soundToggle = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');

  function ensureAudioCtx() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSynthBlip(freq = 520, type = 'sine', duration = 0.08, gainVal = 0.04) {
    if (!soundEnabled) return;
    try {
      ensureAudioCtx();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, audioCtx.currentTime + duration);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      ensureAudioCtx();
      if (soundIcon) {
        soundIcon.textContent = soundEnabled ? '🔊 SFX ON' : '🔇 SFX OFF';
      }
      if (soundEnabled) playSynthBlip(680, 'triangle', 0.1, 0.08);
    });
  }

  // Attach micro-sounds to interactive buttons & links
  document.querySelectorAll('button, a, .interactive-click').forEach((el) => {
    el.addEventListener('mouseenter', () => playSynthBlip(480, 'sine', 0.04, 0.02));
    el.addEventListener('click', () => playSynthBlip(880, 'triangle', 0.08, 0.05));
  });
}

/* ----------------------------------------------------
   3. 3D Parallax & Card Tilt Physics
   ---------------------------------------------------- */
function initTilt() {
  const mascotCard = document.getElementById('hero-mascot-card');
  const heroSection = document.getElementById('hero-section');

  if (mascotCard && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 14;
      const rotateY = (x / rect.width) * 14;

      mascotCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      mascotCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      mascotCard.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    heroSection.addEventListener('mouseenter', () => {
      mascotCard.style.transition = 'transform 0.1s ease-out';
    });
  }

  // 3D tilt on project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 10;
      const rotateY = (x / rect.width) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });
}

/* ----------------------------------------------------
   4. GSAP & Kinetic Scroll Animations (Progressive Enhancement)
   ---------------------------------------------------- */
function initAnimations() {
  if (typeof gsap === 'undefined') return;

  // Ensure ticking works even in background or throttled tabs
  gsap.ticker.lagSmoothing(1000, 16);

  // Animate from initial state to full visibility
  gsap.fromTo('#hero-eyebrow', { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'opacity,transform' });
  gsap.fromTo('#hero-title', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: 'power3.out', clearProps: 'opacity,transform' });
  gsap.fromTo('#hero-subtitles', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.2, ease: 'power2.out', clearProps: 'opacity,transform' });
  gsap.fromTo('.hero-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.3, stagger: 0.1, ease: 'back.out(1.5)', clearProps: 'opacity,transform' });
  gsap.fromTo('.hero-cta-btn', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.4, stagger: 0.1, ease: 'power2.out', clearProps: 'opacity,transform' });
  gsap.fromTo('#hero-mascot-card', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.9, delay: 0.2, ease: 'back.out(1.4)', clearProps: 'opacity,transform' });

  // ScrollTrigger reveals
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('#showreel-container', 
      { opacity: 0, y: 30 }, 
      {
        scrollTrigger: {
          trigger: '#showreel-section',
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'opacity,transform'
      }
    );

    gsap.fromTo('.project-card', 
      { opacity: 0, y: 30 }, 
      {
        scrollTrigger: {
          trigger: '#projects-section',
          start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'opacity,transform'
      }
    );

    gsap.fromTo('.skill-card', 
      { opacity: 0, scale: 0.9 }, 
      {
        scrollTrigger: {
          trigger: '#skills-section',
          start: 'top 80%',
        },
        opacity: 1,
        scale: 1,
        stagger: 0.06,
        duration: 0.5,
        ease: 'back.out(1.5)',
        clearProps: 'opacity,transform'
      }
    );
  }
}

/* ----------------------------------------------------
   5. Project Category Filter Tabs
   ---------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('bg-cyan-400', 'text-black', 'border-cyan-400', 'shadow-cyan');
        b.classList.add('bg-slate-900/60', 'text-slate-300', 'border-white/10');
      });
      btn.classList.add('bg-cyan-400', 'text-black', 'border-cyan-400', 'shadow-cyan');
      btn.classList.remove('bg-slate-900/60', 'text-slate-300', 'border-white/10');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
   6. Interactive Showreel Modal & Video Simulator
   ---------------------------------------------------- */
function initShowreelModal() {
  const openBtns = document.querySelectorAll('.open-showreel-modal');
  const modal = document.getElementById('showreel-modal');
  const closeBtn = document.getElementById('close-showreel-modal');
  const modalCanvas = document.getElementById('modal-showreel-canvas');

  if (!modal) return;

  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    startShowreelCanvas();
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  openBtns.forEach((btn) => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Simulated live cyber UI waveform loop inside modal
  let simAnimId = null;
  function startShowreelCanvas() {
    if (!modalCanvas) return;
    const ctx = modalCanvas.getContext('2d');
    modalCanvas.width = modalCanvas.clientWidth || 800;
    modalCanvas.height = modalCanvas.clientHeight || 450;

    let tick = 0;
    function renderLoop() {
      if (modal.classList.contains('hidden')) {
        cancelAnimationFrame(simAnimId);
        return;
      }
      ctx.fillStyle = 'rgba(7, 10, 18, 0.25)';
      ctx.fillRect(0, 0, modalCanvas.width, modalCanvas.height);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#00f0ff';
      ctx.beginPath();
      const centerY = modalCanvas.height / 2;
      for (let x = 0; x < modalCanvas.width; x += 3) {
        const y = centerY + Math.sin(x * 0.02 + tick * 0.05) * 35 * Math.cos(x * 0.01 + tick * 0.02);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second harmonic wave
      ctx.strokeStyle = '#2563eb';
      ctx.beginPath();
      for (let x = 0; x < modalCanvas.width; x += 4) {
        const y = centerY + Math.cos(x * 0.015 - tick * 0.04) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      tick++;
      simAnimId = requestAnimationFrame(renderLoop);
    }
    renderLoop();
  }
}

/* ----------------------------------------------------
   7. Clipboard Copy with Neon Toast Notification
   ---------------------------------------------------- */
function initClipboard() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'Veltusstudio@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied: ${email}`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  }

  function showToast(text) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ----------------------------------------------------
   8. Mobile Navigation Toggle
   ---------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }
}
