# SRM IST Trichy — In-Depth Tamil Clone & Agentic Chatbot

High-fidelity local clone of [srmtrichy.edu.in](https://srmtrichy.edu.in/) with zero change in style, featuring:
1. **Visual Clone Integrity**: 100% replica of the official SRM Institute of Science and Technology Tiruchirappalli portal, supporting all 33 routes and dynamic CMS content (Faculties, Programmes, Hero Banners, Leadership, Placements, Campus Life, Accreditations).
2. **In-Depth Tamil Translation Layer**: Instant bilingual on-screen wording translation with a comprehensive 200+ phrase dictionary (`public/srm-tamil-dict.js`), persistent toggle (`தமிழ் ⇄ EN`), and disk translation caching (`server/tamil-cache.json`).
3. **Tamil Agentic Chatbot (Web Scraping Method)**: Embedded interactive AI chatbot that scrapes official live pages and structured CMS endpoints to answer questions in natural Tamil with official source citations.
4. **Zero Credit Loss Architecture**: Runs purely locally with intelligent semantic matching, local structured knowledge bases, and free endpoints—no paid API keys or recurring credits required.

---

## Quick Start

```bash
cd ~/Projects/srm-trichy-tamil
node server/index.js
```

Open your browser at: **[http://localhost:3000](http://localhost:3000)**

---

## Features

- **Exact Styling & Layout**: Preserves SRM's typography (`Playfair Display`, `DM Sans`), color palette, and component design across all device viewports.
- **Bilingual Switcher (`தமிழ் ⇄ EN`)**: Floating pill button on the bottom left lets users effortlessly toggle between English and Tamil.
- **Tamil AI Chatbot**:
  - Located on the bottom right (`💬 தமிழ் AI`).
  - Interactive quick inquiry chips (Admissions, B.Tech Programs, Placements, Hostels, Contact, Leadership).
  - Web scraping extraction from live srmtrichy.edu.in routes and CMS endpoints.
  - Formatted Tamil answers with official contact details and source attribution.
- **Offline & Low-Latency Resilience**: Includes local snapshots of CMS endpoints (`server/data/`) so the portal renders flawlessly even if upstream Hostinger endpoints experience network latency.

---

## Project Structure

```
├── mirror/               # Cloned frontend static files & SPA index.html
│   └── assets/           # Original stylesheets, JavaScript bundles, and branding
├── public/               # Client-side scripts & styles
│   ├── srm-intercept.js  # CMS request proxy interceptor
│   ├── srm-tamil-dict.js # Comprehensive Tamil dictionary
│   ├── srm-tamil-widget.js # Tamil translation DOM engine & Chatbot UI
│   └── srm-tamil-widget.css # Chatbot styling matching SRM branding
├── server/               # Node.js backend
│   ├── index.js          # HTTP server, SPA router & CMS caching proxy
│   ├── scraper.js        # Web scraping engine with timeout protection
│   ├── chat.js           # Agentic query analyzer & Tamil response synthesizer
│   ├── translate.js      # Bilingual translation engine with disk caching
│   ├── data/             # Official SRM Trichy structured CMS snapshots
│   └── tamil-cache.json  # Persistent translation cache
└── README.md
```

