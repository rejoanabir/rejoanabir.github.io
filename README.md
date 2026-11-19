# Veltus Studio — Motion Graphics Portfolio Website

An ultra-modern, high-performance portfolio website engineered for **Veltus Studio** (`ANDROID DEV • MOBILE UI/UX • AI-POWERED APPS • CREATIVE TECH`), built with **HTML5, Tailwind CSS, GSAP 3 (GreenSock), Web Audio API, and HTML5 Canvas Particles**.

Styled directly from the cyberpunk / street-art aesthetic of the reference artwork with electric cyan neon accents, dark midnight-navy obsidian themes, graffiti doodles, sticker badges, and a custom 3D companion robot mascot.

---

## 🚀 Key Features

1. **Brand & Identity**:
   - Integrated geometric metallic-silver and electric-blue **Veltus Studio** 3D logo mark.
   - Street-art graffiti doodle typography (`Syne`, `Permanent Marker`, `Caveat`, `JetBrains Mono`).
   - Angled sticker badges: `"TURN APPS INTO EXPERIENCES!"`, `"CLEAN CODE • ZERO COMPROMISE"`, `"60 FPS FLUID"`.

2. **3D Cyberpunk Robot Mascot**:
   - Custom-rendered 3D chibi companion robot mascot with matte deep-navy and brushed metallic-silver body, glowing electric-cyan visor eyes, LED headphones, and illuminated "V" chest badge.
   - Dynamic 3D mouse parallax tilt physics and floating idle animation.
   - Floating speech bubble: *"LET'S BUILD SOMETHING EXTRAORDINARY!"*.

3. **Featured Showreel & Interactive Motion Player**:
   - Neon-framed 16:9 cyberpunk studio showreel banner with glowing waveform telemetry.
   - Interactive fullscreen modal player with live synthesized audio waveforms.
   - Ready for dropping in your custom MP4 video walkthroughs or YouTube embeds anytime.

4. **Curated Project Showcase**:
   - **Glyph**: Atmospheric Android AI companion app in Kotlin with local file attachments and live web search.
   - **VeltPulse**: Flagship Android performance dashboard with responsive telemetry and Material 3 Compose UI.
   - **Showcase 03 (Project Nexus)**: AGSL Shaders & Kinetic Motion placeholder.
   - **Showcase 04 (Project Aura)**: On-Device Edge Intelligence prototype placeholder.
   - Interactive category filter pills: `All Projects (4)`, `Android Apps`, `AI Systems`, `Creative Tech`.

5. **Tools & Skills Matrix**:
   - Interactive glowing skill cards with authentic SVG marks for: Kotlin, Jetpack Compose, Android SDK, GitHub Actions CI/CD, AI Integration, Custom Visual UI Systems, Coroutines & Flow, and Clean Architecture.

6. **Micro-Interactions & Audio Feedback**:
   - Built-in Web Audio API synthesizer generating subtle futuristic blips on button hovers and clicks.
   - Top-bar sound toggle (`🔊 SFX ON` / `🔇 SFX OFF`).
   - One-click contact email copy button (`Veltusstudio@gmail.com`) with instant neon toast alert.

7. **Motion Graphics Architecture**:
   - Smooth 60fps hardware-accelerated animations via GSAP 3 and ScrollTrigger.
   - Canvas particle starfield background reacting to motion.
   - Full support for `prefers-reduced-motion` accessibility.

---

## 📁 Project Structure

```
Portfolio Website/
├── index.html                   # Core single-page portfolio
├── assets/
│   ├── css/
│   │   └── styles.css           # Custom neon glows, sticker styles, keyframes
│   ├── js/
│   │   └── main.js              # GSAP animations, 3D tilt, canvas particles, audio synth
│   └── images/
│       ├── veltus_logo.jpg      # Official metallic Veltus Studio 3D logo
│       ├── veltus_robot_mascot.jpg # Custom 3D cyberpunk companion robot mascot
│       ├── showreel_banner.jpg  # 16:9 cinematic studio showreel banner
│       ├── glyph_preview.jpg    # Glyph Android AI companion app mockup
│       └── veltpulse_preview.jpg# VeltPulse mobile performance engine mockup
└── README.md                    # Documentation
```

---

## ⚡ Running Locally

To preview the website in your browser:

### Option 1: Python Built-in Server
```bash
python3 -m http.server 8088
```
Then visit `http://localhost:8088` in your browser.

### Option 2: Node / PNPM
```bash
pnpm dlx serve .
```

---

## 🎬 Customizing Your Showreel

To replace the simulated motion player with your real MP4 video or YouTube reel:
Open `index.html` and locate `<div id="showreel-modal">`. Replace `<canvas id="modal-showreel-canvas">` with:
```html
<video controls autoplay class="w-full h-full object-cover">
  <source src="assets/videos/your_reel.mp4" type="video/mp4">
</video>
```
Or insert an iframe for YouTube/Vimeo.
