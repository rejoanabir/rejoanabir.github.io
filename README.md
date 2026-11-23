# Abir. — Personal Portfolio (`rejoanabir.xyz`)

Personal portfolio, Vodraft product page, and online/PDF CV for **Md Rejoan Abir (Abir)** — aspiring software engineer building practical Android and AI apps.

- **Live Site:** https://rejoanabir.xyz
- **Vodraft Download Page:** https://rejoanabir.xyz/vodraft/
- **Online CV:** https://rejoanabir.xyz/resume.html

## Structure

```text
├── CNAME                          # Custom domain (rejoanabir.xyz)
├── .nojekyll                      # Serve static assets directly on GitHub Pages
├── index.html                     # Main portfolio page
├── resume.html                    # Online CV with photo zoom modal & PDF CV link
├── robots.txt                     # Search engine crawl rules
├── sitemap.xml                    # XML sitemap for rejoanabir.xyz
├── assets/
│   ├── Md-Rejoan-Abir-CV.pdf      # Selectable-text A4 PDF CV
│   ├── css/styles.css             # Responsive Swiss editorial & motion styles
│   ├── js/motion.js               # Scroll progress, constellation canvas, copy email, CV lightbox
│   └── img/                       # Optimized WebP/SVG assets & Open Graph card
└── vodraft/                       # Integrated Vodraft for Android download landing page
```

## Local Preview

```bash
python3 -m http.server 8090
```

Then open `http://localhost:8090`.
