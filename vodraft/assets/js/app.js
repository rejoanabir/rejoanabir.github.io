// =========================================================================
// RELEASE CONFIG (Swap APK_DOWNLOAD_URL when publishing a live APK file)
// =========================================================================
const VODRAFT_CONFIG = {
  version: '1.0.0',
  packageId: 'com.vocal.text',
  apkFilename: 'Vodraft-v1.0.0-universal.apk',
  apkSize: '16.5 MB',
  apkSha256: 'bd07cc14e6a5fe7e149efb412f85754d904bf19e078ca1f8c7964e681938749e',
  apkDownloadUrl: 'https://github.com/rejoanabir/vodraft-releases/releases/latest/download/Vodraft-universal.apk',
};

// =========================================================================
// BRAND SPLIT-V LOGO SVG
// =========================================================================
function getLogoSVG(size = 26) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Vodraft Logo">
    <rect x="9" y="13" width="18" height="4.4" rx="2.2" fill="#2563EB"/>
    <rect x="12.5" y="20.5" width="15.5" height="4.4" rx="2.2" fill="#3B82F6"/>
    <rect x="16" y="28" width="13" height="4.4" rx="2.2" fill="#0284C7"/>
    <rect x="19.5" y="35.5" width="10.5" height="4.4" rx="2.2" fill="#4F46E5"/>
    <rect x="23" y="43" width="8" height="4.4" rx="2.2" fill="#2563EB"/>
    <path d="M51.5 13C47.5 13 44.5 16.2 42.6 21.4L34.4 44.2C33.3 47.4 31.6 49.6 29.2 50.6C33.4 51.8 38.2 49.6 40.8 43.8L51.8 18.8C53.2 15.6 53.1 13 51.5 13Z" fill="#0B1220"/>
    <circle cx="51.5" cy="14.2" r="2.2" fill="#0284C7"/>
  </svg>`;
}

const navLogoEl = document.getElementById('nav-logo');
const footerLogoEl = document.getElementById('footer-logo');
if (navLogoEl) navLogoEl.innerHTML = getLogoSVG(26);
if (footerLogoEl) footerLogoEl.innerHTML = getLogoSVG(22);

// =========================================================================
// HERO INTERACTIVE FLOATING PILL DEMO
// =========================================================================
let heroPillState = 'ready'; // 'listening' | 'polishing' | 'ready' | 'success'
let heroTimers = [];
const HERO_CLEAN_TEXT = 'Sure Maya, the v1.0 Android build is ready for review at 3:00 PM today.';

function renderHeroPill() {
  const slot = document.getElementById('hero-pill-slot');
  if (!slot) return;

  const isExpanded = heroPillState === 'ready' || heroPillState === 'success';
  const widthCls = isExpanded ? 'w-[300px] max-w-full' : 'w-[238px]';
  const ringCls = heroPillState === 'polishing'
    ? 'p-[1.5px] ai-shimmer-ring rounded-[25px] shadow-pill'
    : 'rounded-[24px] shadow-pill';

  let inner = '';
  if (heroPillState === 'listening') {
    inner = `
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-vermilion-text rec-dot"></span>
          <div class="flex items-center gap-[2.5px] h-4">
            <span class="wave-bar w-[2.5px] h-3 rounded-full bg-cobalt-600"></span>
            <span class="wave-bar w-[2.5px] h-4 rounded-full bg-vermilion-text"></span>
            <span class="wave-bar w-[2.5px] h-3.5 rounded-full bg-cobalt-600"></span>
            <span class="wave-bar w-[2.5px] h-4 rounded-full bg-aura-cyan"></span>
            <span class="wave-bar w-[2.5px] h-2.5 rounded-full bg-cobalt-600"></span>
          </div>
          <span class="font-display font-bold text-xs text-ink">Listening...</span>
        </div>
        <button id="hero-pill-stop" class="px-2.5 h-7 rounded-full bg-cobalt-600 hover:bg-cobalt-700 text-white text-[10px] font-bold">■ STOP</button>
      </div>`;
  } else if (heroPillState === 'polishing') {
    inner = `
      <div class="flex items-center gap-2">
        <span class="w-5 h-5 rounded-full ai-shimmer-ring flex items-center justify-center text-white text-[10px]">✦</span>
        <span class="font-display font-bold text-xs ai-text-shimmer">Polishing with AI...</span>
      </div>`;
  } else if (heroPillState === 'ready') {
    inner = `
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emeraldInk-text"></span>
        <span class="font-display font-bold text-xs text-ink">Ready to Insert</span>
      </div>
      <div class="mt-2 p-2.5 rounded-xl bg-alabaster border border-slate-200 text-xs text-ink font-medium leading-relaxed">
        ${HERO_CLEAN_TEXT}
      </div>
      <div class="mt-2.5 flex items-center gap-2">
        <button id="hero-pill-replay" class="px-3 h-8 rounded-full bg-alabaster hover:bg-mist border border-slate-200 text-[11px] font-semibold text-graphite">Replay</button>
        <button id="hero-pill-insert" class="flex-1 h-8 rounded-full bg-cobalt-600 hover:bg-cobalt-700 text-white text-xs font-bold shadow-sm transition">Insert Here</button>
      </div>`;
  } else if (heroPillState === 'success') {
    inner = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-emeraldInk-bg text-emeraldInk-text border border-emeraldInk-border flex items-center justify-center text-[11px] font-bold">✓</span>
          <span class="font-display font-bold text-xs text-emeraldInk-text">Inserted into WhatsApp</span>
        </div>
        <button id="hero-pill-replay" class="text-[11px] font-semibold text-cobalt-600 hover:underline">Run again</button>
      </div>`;
  }

  slot.innerHTML = `
    <div class="${widthCls} ${ringCls} transition-all duration-300">
      <div class="bg-white rounded-[23.5px] border border-slate-200 px-3.5 pt-2 pb-3">
        <div class="w-8 h-[3px] rounded-full bg-slate-300 mx-auto mb-2"></div>
        ${inner}
      </div>
    </div>`;

  const stopBtn = document.getElementById('hero-pill-stop');
  if (stopBtn) stopBtn.addEventListener('click', advanceHeroToPolish);
  const insertBtn = document.getElementById('hero-pill-insert');
  if (insertBtn) insertBtn.addEventListener('click', insertHeroText);
  const replayBtn = document.getElementById('hero-pill-replay');
  if (replayBtn) replayBtn.addEventListener('click', startHeroDemo);
}

function clearHeroTimers() {
  heroTimers.forEach(t => clearTimeout(t));
  heroTimers = [];
}

function startHeroDemo() {
  clearHeroTimers();
  const inputEl = document.getElementById('hero-input-field');
  if (inputEl) {
    inputEl.textContent = 'Listening over WhatsApp...';
    inputEl.className = 'flex-1 rounded-2xl bg-alabaster border border-cobalt-300 px-3.5 py-2.5 text-xs text-cobalt-600 min-h-[40px] leading-snug';
  }
  heroPillState = 'listening';
  renderHeroPill();
  heroTimers.push(setTimeout(advanceHeroToPolish, 1800));
}

function advanceHeroToPolish() {
  clearHeroTimers();
  heroPillState = 'polishing';
  renderHeroPill();
  heroTimers.push(setTimeout(() => {
    heroPillState = 'ready';
    renderHeroPill();
  }, 1100));
}

function insertHeroText() {
  clearHeroTimers();
  const inputEl = document.getElementById('hero-input-field');
  if (inputEl) {
    inputEl.textContent = HERO_CLEAN_TEXT;
    inputEl.className = 'flex-1 rounded-2xl bg-white border border-emeraldInk-border px-3.5 py-2.5 text-xs text-ink font-medium min-h-[40px] leading-snug';
  }
  heroPillState = 'success';
  renderHeroPill();
}

const heroTryBtn = document.getElementById('hero-try-pill-btn');
if (heroTryBtn) heroTryBtn.addEventListener('click', startHeroDemo);

const heroSendBtn = document.getElementById('hero-send-msg');
if (heroSendBtn) {
  heroSendBtn.addEventListener('click', () => {
    const inputEl = document.getElementById('hero-input-field');
    const bubble = document.getElementById('hero-sent-bubble');
    if (!inputEl || !bubble) return;

    const txt = inputEl.textContent.trim();
    if (!txt || txt.startsWith('Tap ') || txt.startsWith('Listening')) {
      startHeroDemo();
      return;
    }
    bubble.textContent = txt;
    bubble.classList.remove('hidden');
    inputEl.textContent = 'Message sent! Tap "Try Live Pill Demo" again.';
    inputEl.className = 'flex-1 rounded-2xl bg-alabaster border border-slate-200 px-3.5 py-2.5 text-xs text-steel min-h-[40px] leading-snug';
  });
}

// =========================================================================
// INTERACTIVE AI CLEANUP SCENARIOS
// =========================================================================
const SCENARIOS = {
  meeting: {
    app: 'WhatsApp',
    raw: '"Um, hey Sarah, I wanted to I wanted to ask if we can meet at five, no wait, six thirty at the office? So yeah, let me know."',
    clean: 'Hey Sarah, I wanted to ask if we can meet at 6:30 at the office? Let me know.',
    tags: ['Stutter removed', 'Mid-sentence correction', 'Fillers stripped', 'Time preserved (6:30)'],
    note: 'Llama 3.1 8B Instant · Smart Cleaner ON',
  },
  search: {
    app: 'YouTube Search Bar',
    raw: '"Uh, best noise cancelling headphones 2026 review."',
    clean: 'best noise cancelling headphones 2026 review',
    tags: ['Context-Aware Search ON', 'Trailing period stripped', 'Filler removed'],
    note: 'Auto-detected YouTube search bar via Accessibility',
  },
  email: {
    app: 'Gmail Compose',
    raw: '"That that\'s great news! Please send the 3.5 MB deck to alex@studio.io before 10:30, uh, tomorrow morning."',
    clean: "That's great news! Please send the 3.5 MB deck to alex@studio.io before 10:30 tomorrow morning.",
    tags: ['Stutter fixed (that that\'s → that\'s)', 'Decimal 3.5 kept', 'Email & time preserved'],
    note: 'Preserves numbers, decimals, URLs & emails',
  },
};

let activeScenario = 'meeting';
let demoCleanerOn = true;

function renderScenario(animate = false) {
  const s = SCENARIOS[activeScenario];
  const appBadge = document.getElementById('scenario-app-badge');
  const rawEl = document.getElementById('scenario-raw');
  const cleanEl = document.getElementById('scenario-clean');
  const noteEl = document.getElementById('scenario-note');
  const tagsEl = document.getElementById('scenario-tags');

  if (appBadge) appBadge.textContent = s.app;
  if (rawEl) rawEl.textContent = s.raw;
  if (cleanEl) {
    cleanEl.textContent = demoCleanerOn ? s.clean : s.raw.replace(/^"|"$/g, '');
  }
  if (noteEl) {
    noteEl.textContent = demoCleanerOn ? s.note : 'AI Cleaner OFF — Raw unedited transcription';
  }
  if (tagsEl) {
    tagsEl.innerHTML = s.tags
      .map(t => `<span class="px-2.5 py-1 rounded-lg bg-alabaster border border-slate-200">${t}</span>`)
      .join('');
  }

  document.querySelectorAll('.scenario-btn').forEach(btn => {
    const active = btn.dataset.scenario === activeScenario;
    btn.className = `scenario-btn px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
      active ? 'bg-cobalt-600 text-white shadow-sm' : 'text-graphite hover:text-ink hover:bg-alabaster'
    }`;
  });

  const toggle = document.getElementById('toggle-demo-cleaner');
  if (toggle) {
    toggle.setAttribute('aria-checked', String(demoCleanerOn));
    toggle.className = `w-9 h-5 rounded-full p-0.5 transition-colors ${demoCleanerOn ? 'bg-cobalt-600' : 'bg-slate-300'}`;
    if (toggle.firstElementChild) {
      toggle.firstElementChild.className = `block w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${demoCleanerOn ? 'translate-x-4' : 'translate-x-0'}`;
    }
  }

  if (animate) {
    [rawEl, cleanEl].forEach(el => {
      if (!el) return;
      el.classList.remove('scenario-swap');
      void el.offsetWidth;
      el.classList.add('scenario-swap');
    });
  }
}

document.querySelectorAll('.scenario-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    activeScenario = btn.dataset.scenario;
    renderScenario(true);
  });
});

const toggleCleanerBtn = document.getElementById('toggle-demo-cleaner');
if (toggleCleanerBtn) {
  toggleCleanerBtn.addEventListener('click', () => {
    demoCleanerOn = !demoCleanerOn;
    renderScenario(true);
  });
}

// =========================================================================
// FAQ ACCORDION
// =========================================================================
const FAQS = [
  {
    q: 'Why does Vodraft request Accessibility permission?',
    a: 'Vodraft Input Helper uses Android Accessibility solely to insert your dictated text directly into the active text box (ACTION_SET_TEXT / ACTION_PASTE) and detect search bars like YouTube or Chrome for Context-Aware Search Formatting. It never reads passwords or private screens.',
  },
  {
    q: 'Do I have to pay for a Groq API key?',
    a: 'No. Groq offers a generous 100% free tier with no credit card required, and Vodraft guides you through grabbing a key in 30 seconds. If you prefer zero setup, tap Skip during onboarding to use Android’s free Built-in Speech Recognizer.',
  },
  {
    q: 'Does the floating pill close my keyboard or lose my cursor?',
    a: 'Never. Vodraft renders its floating overlay pill with Android WindowManager FLAG_NOT_FOCUSABLE, so your keyboard stays open and text focus remains locked on your active app while you speak.',
  },
  {
    q: 'What happens if my internet drops mid-dictation?',
    a: 'You can switch instantly to the Native Built-in engine or rely on Vodraft’s offline rule-based speech cleaner. And with 3-tier universal insertion, even if an app blocks direct paste, your cleaned text is safely copied to your clipboard.',
  },
];

let openFaq = 0;

function renderFaqs() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  list.innerHTML = FAQS.map((item, idx) => {
    const isOpen = openFaq === idx;
    return `
      <div class="rounded-2xl border transition ${isOpen ? 'bg-alabaster border-cobalt-200' : 'bg-white border-slate-200'}">
        <button data-faq-idx="${idx}" aria-expanded="${isOpen}" class="w-full px-5 py-4 text-left flex items-center justify-between gap-4">
          <span class="font-display font-bold text-sm sm:text-base text-ink">${item.q}</span>
          <span class="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-ink shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}">+</span>
        </button>
        ${isOpen ? `<div class="px-5 pb-5 text-sm text-graphite leading-relaxed">${item.a}</div>` : ''}
      </div>
    `;
  }).join('');
}

const faqListEl = document.getElementById('faq-list');
if (faqListEl) {
  faqListEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-faq-idx]');
    if (!btn) return;
    const idx = Number(btn.dataset.faqIdx);
    openFaq = openFaq === idx ? -1 : idx;
    renderFaqs();
  });
}

// =========================================================================
// DOWNLOAD & LEGAL MODALS
// =========================================================================
const backdrop = document.getElementById('modal-backdrop');
const modalCard = document.getElementById('modal-card');
let dlTimer = null;

function triggerApkDownload() {
  if (!VODRAFT_CONFIG.apkDownloadUrl) return;
  const a = document.createElement('a');
  a.href = VODRAFT_CONFIG.apkDownloadUrl;
  a.download = VODRAFT_CONFIG.apkFilename;
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function openDownloadModal() {
  if (!backdrop || !modalCard) return;

  clearInterval(dlTimer);
  backdrop.classList.remove('hidden');

  // Trigger download synchronously on the user click gesture so mobile browsers allow it
  if (VODRAFT_CONFIG.apkDownloadUrl) {
    triggerApkDownload();
  }

  modalCard.innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-xl bg-alabaster border border-slate-200 flex items-center justify-center">${getLogoSVG(24)}</div>
        <div>
          <h3 class="font-display font-bold text-base text-ink">Download Vodraft v${VODRAFT_CONFIG.version}</h3>
          <p class="font-mono text-[11px] text-steel">${VODRAFT_CONFIG.packageId} · ${VODRAFT_CONFIG.apkSize} · Android 8.0–15</p>
        </div>
      </div>
      <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-alabaster hover:bg-mist text-graphite flex items-center justify-center font-bold" aria-label="Close modal">✕</button>
    </div>

    <div id="dl-progress-box" class="p-4 rounded-2xl bg-alabaster border border-slate-200 space-y-2.5">
      <div class="flex items-center justify-between text-xs font-semibold">
        <span id="dl-status-text" class="text-ink">Starting signed APK download...</span>
        <span id="dl-pct" class="font-mono text-cobalt-600">0%</span>
      </div>
      <div class="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
        <div id="dl-bar" class="h-full bg-cobalt-600 rounded-full transition-all duration-200" style="width: 0%"></div>
      </div>
      <p class="font-mono text-[10px] text-steel truncate" title="${VODRAFT_CONFIG.apkSha256}">SHA-256: ${VODRAFT_CONFIG.apkSha256}</p>
    </div>

    <div class="mt-4 space-y-2 text-xs text-graphite">
      <p class="font-display font-bold text-ink text-xs uppercase tracking-wider">Quick 3-Step Setup After Install</p>
      <p><strong class="text-ink">1.</strong> Open Vodraft &amp; sign in with Google or Email OTP.</p>
      <p><strong class="text-ink">2.</strong> Paste a free Groq API key (30s) or tap Skip for Built-in.</p>
      <p><strong class="text-ink">3.</strong> Drag the <strong class="text-cobalt-600">Vodraft</strong> Quick Settings Tile into your notification shade.</p>
    </div>

    <div class="mt-5 flex items-center justify-between gap-2">
      ${VODRAFT_CONFIG.apkDownloadUrl ? `<a href="${VODRAFT_CONFIG.apkDownloadUrl}" download="${VODRAFT_CONFIG.apkFilename}" rel="noopener noreferrer" class="px-4 py-2.5 rounded-full bg-alabaster hover:bg-mist border border-slate-200 text-cobalt-700 text-xs font-bold transition">Download Again</a>` : '<span></span>'}
      <button id="modal-done-btn" class="px-5 py-2.5 rounded-full bg-cobalt-600 hover:bg-cobalt-700 text-white text-xs font-bold transition">Done</button>
    </div>
  `;

  let pct = 0;
  dlTimer = setInterval(() => {
    pct = Math.min(100, pct + 25);
    const bar = document.getElementById('dl-bar');
    const pctEl = document.getElementById('dl-pct');
    const txtEl = document.getElementById('dl-status-text');
    if (bar) bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';

    if (pct >= 100) {
      clearInterval(dlTimer);
      if (txtEl) {
        txtEl.innerHTML = VODRAFT_CONFIG.apkDownloadUrl
          ? `<span class="text-emeraldInk-text">✓ ${VODRAFT_CONFIG.apkFilename} download started (${VODRAFT_CONFIG.apkSize})</span>`
          : `<span class="text-emeraldInk-text">✓ ${VODRAFT_CONFIG.apkFilename} ready (demo preview)</span>`;
      }
    }
  }, 180);

  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('modal-done-btn')?.addEventListener('click', closeModal);
}

function openLegalModal(kind) {
  if (!backdrop || !modalCard) return;

  clearInterval(dlTimer);
  backdrop.classList.remove('hidden');
  const isPriv = kind === 'privacy';
  modalCard.innerHTML = `
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-display font-bold text-lg text-ink">${isPriv ? 'Privacy Policy' : 'Terms of Service'}</h3>
      <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-alabaster text-graphite flex items-center justify-center font-bold" aria-label="Close modal">✕</button>
    </div>
    <p class="text-sm text-graphite leading-relaxed">
      ${isPriv
        ? 'Vodraft encrypts local API keys and authentication tokens using hardware-backed Android Keystore (AES-256-GCM) and isolates account preferences per email in Supabase. Voice audio is processed only when you explicitly start dictation and is never used for ad targeting.'
        : 'Vodraft is provided for personal and productivity dictation on Android 8.0–15. Users connecting a Groq API key agree to Groq’s API usage limits. Signing out immediately wipes cached local secrets from device storage.'}
    </p>
    <div class="mt-5 flex justify-end">
      <button id="modal-done-btn" class="px-5 py-2.5 rounded-full bg-ink text-white text-xs font-bold">Close</button>
    </div>
  `;
  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('modal-done-btn')?.addEventListener('click', closeModal);
}

function closeModal() {
  clearInterval(dlTimer);
  if (backdrop) backdrop.classList.add('hidden');
}

if (backdrop) {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && backdrop && !backdrop.classList.contains('hidden')) {
    closeModal();
  }
});

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-open-download]')) openDownloadModal();
  const legalBtn = e.target.closest('[data-open-legal]');
  if (legalBtn) openLegalModal(legalBtn.dataset.openLegal);
});

// =========================================================================
// WAITLIST FORM
// =========================================================================
const waitlistForm = document.getElementById('play-waitlist-form');
if (waitlistForm) {
  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inp = document.getElementById('waitlist-email');
    const msg = document.getElementById('waitlist-msg');
    if (!inp || !msg) return;

    msg.textContent = `✓ We'll notify ${inp.value.trim()} when Vodraft launches on Google Play.`;
    msg.classList.remove('hidden');
    inp.value = '';
  });
}

// =========================================================================
// MOBILE MENU
// =========================================================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}

// =========================================================================
// SAAS MOTION GRAPHICS CONTROLLER (Scroll Progress, Spotlight, Reveals)
// =========================================================================
window.addEventListener('scroll', () => {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
  bar.style.width = pct + '%';
}, { passive: true });

const heroSec = document.getElementById('top');
const spotlight = document.getElementById('hero-spotlight');
if (heroSec && spotlight) {
  heroSec.addEventListener('mousemove', (e) => {
    const rect = heroSec.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.background = `radial-gradient(520px circle at ${x}% ${y}%, rgba(37,99,235,0.09), transparent 65%)`;
    spotlight.style.opacity = '1';
  });
  heroSec.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
  });
}

const revealEls = document.querySelectorAll('.reveal-on-scroll');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// =========================================================================
// INIT
// =========================================================================
renderHeroPill();
renderScenario(false);
renderFaqs();
