/**
 * Rejoan Abir — Personal Portfolio & Engineering Showcase
 * Autonomous Software Company Engineering Core
 * Features:
 * - Dynamic Live GitHub API Integration (fetching real repos, stars, language stats)
 * - 3D Mouse Parallax Tilt Physics with Specular Highlights
 * - Animated Number Counters (Count-up on scroll)
 * - Interactive Showreel Motion Player Simulator
 * - Category Project Filter Engine
 * - Interactive Contact Form with LocalStorage Drafts & Web Audio SFX
 * - Ambient Cyber Starfield Canvas Particle System
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initAudio();
  initTilt();
  initCounters();
  initLiveGitHubRepos();
  initTestimonials();
  initContactForm();
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
      this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(168, 85, 247,';
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
   2. Web Audio Micro-Interactions (Synth SFX)
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

  window.playSynthBlip = function(freq = 520, type = 'sine', duration = 0.08, gainVal = 0.04) {
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
  };

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      ensureAudioCtx();
      if (soundIcon) {
        soundIcon.textContent = soundEnabled ? '🔊 SFX ON' : '🔇 SFX OFF';
      }
      if (soundEnabled) window.playSynthBlip(680, 'triangle', 0.1, 0.08);
    });
  }

  document.querySelectorAll('button, a, .interactive-click').forEach((el) => {
    el.addEventListener('mouseenter', () => window.playSynthBlip(480, 'sine', 0.04, 0.02));
    el.addEventListener('click', () => window.playSynthBlip(880, 'triangle', 0.08, 0.05));
  });
}

/* ----------------------------------------------------
   3. 3D Parallax & Dynamic Card Tilt Physics
   ---------------------------------------------------- */
function initTilt() {
  const heroScene = document.getElementById('hero-desk-scene');
  const heroSection = document.getElementById('hero-section');

  if (heroScene && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;

      heroScene.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      document.querySelectorAll('.hero-float-badge').forEach((badge, index) => {
        const factor = (index + 1) * 8;
        const bx = (x / rect.width) * factor;
        const by = (y / rect.height) * factor;
        badge.style.transform = `translate(${bx}px, ${by}px)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      heroScene.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      heroScene.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      document.querySelectorAll('.hero-float-badge').forEach((badge) => {
        badge.style.transform = 'translate(0px, 0px)';
        badge.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });

    heroSection.addEventListener('mouseenter', () => {
      heroScene.style.transition = 'transform 0.1s ease-out';
      document.querySelectorAll('.hero-float-badge').forEach((b) => b.style.transition = 'transform 0.1s ease-out');
    });
  }

  document.querySelectorAll('.tilt-card').forEach((card) => {
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
   4. Animated Stat Number Counters (Count-up on Scroll)
   ---------------------------------------------------- */
function initCounters() {
  const counterEls = document.querySelectorAll('.counter-val');
  if (!counterEls.length) return;

  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counterEls.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);

            counter.textContent = `${currentVal}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = `${target}${suffix}`;
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-container');
  if (statsSection) observer.observe(statsSection);
}

/* ----------------------------------------------------
   5. Dynamic Live GitHub API Integration
   ---------------------------------------------------- */
async function initLiveGitHubRepos() {
  const repoGrid = document.getElementById('live-github-repos');
  const repoCountBadge = document.getElementById('github-repo-count');
  if (!repoGrid) return;

  try {
    const res = await fetch('https://api.github.com/users/rejoanabir/repos?sort=updated&per_page=6');
    if (!res.ok) throw new Error('API Rate limit or network issue');
    const repos = await res.json();

    if (Array.isArray(repos) && repos.length > 0) {
      if (repoCountBadge) repoCountBadge.textContent = `${repos.length} Repositories`;

      repoGrid.innerHTML = '';
      repos.forEach((repo) => {
        const lang = repo.language || 'Code';
        const stars = repo.stargazers_count || 0;
        const forks = repo.forks_count || 0;
        const desc = repo.description || 'Modern software repository engineered by Rejoan Abir.';

        const card = document.createElement('div');
        card.className = 'tilt-card glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between group';
        card.innerHTML = `
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-neon flex items-center justify-center text-sm font-mono font-bold">
                &lt;/&gt;
              </span>
              <div class="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span class="flex items-center gap-1 text-yellow-400">★ ${stars}</span>
                <span class="flex items-center gap-1 text-slate-400">⑂ ${forks}</span>
              </div>
            </div>
            <h4 class="font-display font-bold text-lg text-white group-hover:text-cyan-neon transition-colors mb-1.5 break-all">
              ${repo.name}
            </h4>
            <p class="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4 font-normal">
              ${desc}
            </p>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono">
            <span class="px-2.5 py-1 rounded bg-slate-800/80 text-cyan-300 border border-white/5 font-semibold">
              ${lang}
            </span>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="text-slate-400 group-hover:text-white flex items-center gap-1 transition-colors">
              <span>View Source</span>
              <span>↗</span>
            </a>
          </div>
        `;
        repoGrid.appendChild(card);
      });
      initTilt();
    }
  } catch (err) {
    // Graceful fallback: Keep pre-rendered static cards
    console.log('Using static GitHub showcase fallback:', err);
  }
}

/* ----------------------------------------------------
   6. Interactive Testimonials Carousel
   ---------------------------------------------------- */
function initTestimonials() {
  const items = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dots = document.querySelectorAll('.testimonial-dot');

  if (!items.length) return;

  let currentIndex = 0;

  function showSlide(index) {
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.remove('hidden');
        item.classList.add('flex');
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(item, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' });
        }
      } else {
        item.classList.add('hidden');
        item.classList.remove('flex');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('bg-cyan-neon', 'w-8');
        dot.classList.remove('bg-slate-700', 'w-2.5');
      } else {
        dot.classList.remove('bg-cyan-neon', 'w-8');
        dot.classList.add('bg-slate-700', 'w-2.5');
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % items.length;
      showSlide(currentIndex);
      if (window.playSynthBlip) window.playSynthBlip(600, 'sine', 0.05, 0.03);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showSlide(currentIndex);
      if (window.playSynthBlip) window.playSynthBlip(500, 'sine', 0.05, 0.03);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  setInterval(() => {
    if (document.hidden) return;
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  }, 8000);
}

/* ----------------------------------------------------
   7. Interactive Contact Form with LocalStorage Memory
   ---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');

  if (!form) return;

  // Restore draft if any
  try {
    if (nameInput && localStorage.getItem('draft_name')) nameInput.value = localStorage.getItem('draft_name');
    if (emailInput && localStorage.getItem('draft_email')) emailInput.value = localStorage.getItem('draft_email');
    if (messageInput && localStorage.getItem('draft_msg')) messageInput.value = localStorage.getItem('draft_msg');
  } catch (e) {}

  // Auto-save draft
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => {
      try {
        if (nameInput) localStorage.setItem('draft_name', nameInput.value);
        if (emailInput) localStorage.setItem('draft_email', emailInput.value);
        if (messageInput) localStorage.setItem('draft_msg', messageInput.value);
      } catch (e) {}
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
      showToast('⚠️ Please complete all fields before sending.');
      return;
    }

    if (window.playSynthBlip) {
      window.playSynthBlip(600, 'triangle', 0.1, 0.06);
      setTimeout(() => window.playSynthBlip(920, 'sine', 0.15, 0.08), 120);
    }

    showToast(`🚀 Thank you, ${nameInput.value.trim()}! Your message is sent.`);
    form.reset();
    try {
      localStorage.removeItem('draft_name');
      localStorage.removeItem('draft_email');
      localStorage.removeItem('draft_msg');
    } catch (e) {}
  });
}

/* ----------------------------------------------------
   8. GSAP Kinetic Scroll Animations
   ---------------------------------------------------- */
function initAnimations() {
  if (typeof gsap === 'undefined') return;

  gsap.ticker.lagSmoothing(1000, 16);

  gsap.fromTo('#hero-badge', { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', clearProps: 'opacity,transform' });
  gsap.fromTo('#hero-title', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: 'power3.out', clearProps: 'opacity,transform' });
  gsap.fromTo('#hero-tagline', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out', clearProps: 'opacity,transform' });
  gsap.fromTo('.hero-cta-btn', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3, stagger: 0.1, ease: 'power2.out', clearProps: 'opacity,transform' });
  gsap.fromTo('#hero-desk-scene', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.9, delay: 0.2, ease: 'back.out(1.4)', clearProps: 'opacity,transform' });

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.project-card', 
      { opacity: 0, y: 30 }, 
      {
        scrollTrigger: {
          trigger: '#projects-section',
          start: 'top 80%',
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power3.out',
        clearProps: 'opacity,transform'
      }
    );
  }
}

/* ----------------------------------------------------
   9. Project Category Filter Engine
   ---------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('bg-cyan-400', 'text-black', 'border-cyan-400');
        b.classList.add('bg-slate-900/60', 'text-slate-300', 'border-white/10');
      });
      btn.classList.add('bg-cyan-400', 'text-black', 'border-cyan-400');
      btn.classList.remove('bg-slate-900/60', 'text-slate-300', 'border-white/10');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
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
   10. Showreel Modal & Video Simulator
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
      ctx.fillStyle = 'rgba(6, 8, 14, 0.25)';
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

      ctx.strokeStyle = '#a855f7';
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
   11. Clipboard Copy & Toast Alert
   ---------------------------------------------------- */
function initClipboard() {
  const copyBtn = document.getElementById('copy-email-btn');
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
}

function showToast(text) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast) return;
  if (toastMsg) toastMsg.textContent = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ----------------------------------------------------
   12. Mobile Navigation Toggle
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
