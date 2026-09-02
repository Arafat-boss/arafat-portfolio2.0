# 🚀 Md. Arafat Sarker — Modern Full-Stack Portfolio 2.0

<div align="center">

  [![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Native_Driver-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

  <p align="center">
    A high-performance, aesthetically rich personal portfolio website built with <strong>Next.js 16 (Turbopack)</strong>, <strong>React 19</strong>, <strong>Tailwind CSS v4</strong>, <strong>GSAP</strong>, and dynamic <strong>MongoDB</strong> backend integration.
  </p>

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-architecture--folder-structure">Architecture</a> •
    <a href="#-api-endpoints">API Routes</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-environment-variables">Environment Setup</a> •
    <a href="#-author">Author</a>
  </p>
</div>

---

## 🌟 Project Overview

This repository houses the personal developer portfolio of **MD. ARAFAT SARKER** (Full-Stack Developer • MERN & Next.js Specialist). The web application is engineered to deliver a seamless blend of modern glassmorphism UI, interactive canvas graphics, smooth GSAP micro-animations, and live database connectivity for content management.

---

## ✨ Key Features

### 1. 🎯 Dynamic Hero & Interactive Graphics
- **Particle Canvas System**: Custom HTML5 Canvas background with cursor-interactive physics and ambient particle animations.
- **Preloader Screen**: Smooth initial loading animation that coordinates page asset readiness before revealing the hero section.
- **Micro-Interactions & Confetti Explosion**: Interactive CTA buttons featuring particle burst effects on user click.

### 2. 📊 Live Stats Counter
- **Animated Count-Up**: Viewport-triggered numerical count-ups displaying completed projects, tools mastered, and client metrics.

### 3. 🛠️ Technologies & Skills Showcase
- **Single-Row Responsive Alignment**: Featured core stack (React, Next.js, TypeScript, Tailwind, Node.js, Express, MongoDB, Figma) organized in a clean, unified row on desktop.
- **Real Brand Icons**: 100% authentic, high-resolution vector brand icons powered by `react-icons` and custom SVG paths (e.g., official Next.js black badge, Figma 5-color emblem).
- **Expandable 32+ Skills View**: Filterable category tabs (*Languages, Frontend, Backend, Database, Tools, Design*) with live dynamic data fetched from MongoDB.

### 4. 💼 Selected Work & Real Projects
- **Interactive Project Cards**: Showcases live full-stack projects featuring real-time image previews, live demo links, source code repositories, and technical stack badges.

### 5. 🖼️ Interactive Project Showcase Gallery (Lightbox Modal)
- **Touch & Drag Carousel**: Smooth pointer/touch drag-to-scroll functionality with autoplay and responsive breakpoints.
- **Viewport-Centered Modal**: Fullscreen high-resolution preview popup rendered via **React Portal (`createPortal`)** to guarantee true viewport centering, independent of scroll position or parent transforms.
- **Keyboard Navigation**: Full support for `ArrowLeft`, `ArrowRight`, and `Escape` keys.

### 6. 💼 Services & Process Workflow
- **Service Offerings**: Clear breakdown of full-stack engineering, frontend UI/UX architecture, API development, and cloud deployments.
- **Structured 4-Step Process**: Clean roadmap demonstrating development from discovery to deployment.

### 7. 💬 Client Testimonials
- **Horizontal Scroll Carousel**: Smooth client review slider showcasing authentic feedback from international clients.
- **Clean Typography Layout**: Streamlined review cards with star ratings, quote highlights, client name, position, company, and location.

### 8. 📬 Real-time Contact Form & Database Persistence
- **Direct MongoDB Integration**: Form submissions with client-side validation and asynchronous submission to the database.
- **Interactive Status Feedback**: Success alerts and live feedback for prospective clients.

### 9. 🌓 Seamless Dark & Light Mode
- **Persistent Theme Switching**: Theme provider with local storage persistence and smooth CSS custom variable transitions.
- **Neumorphic Buttons**: Tactile soft-embossed buttons in both light and dark themes.

---

## 🛠️ Tech Stack

| Domain | Technology / Library | Purpose |
|---|---|---|
| **Core Framework** | **Next.js 16.3.3 (Turbopack)** | App Router, Server Components, Route Handlers, SSR/SSG |
| **UI Library** | **React 19.2.8** | Component architecture & Hooks |
| **Language** | **TypeScript 5.x** | Static type safety and data models |
| **Styling** | **Tailwind CSS v4** | Modern utility-first CSS framework |
| **Animations** | **GSAP 3.15 + @gsap/react** | ScrollTrigger animations, smooth transitions, split text |
| **Database** | **MongoDB (Official Driver 7.6)** | Connection pooling, dynamic skill/project/testimonial storage |
| **Icons** | **Simple Icons / Tabler / FA6** | `react-icons` for exact brand vectors |
| **Canvas** | **HTML5 2D Canvas Engine** | Interactive floating particle background |

---

## 📂 Architecture & Folder Structure

```text
2026-arafat/
├── app/
│   ├── api/                     # Next.js Server Route Handlers
│   │   ├── contact/route.ts     # POST: Save client contact form data
│   │   ├── projects/route.ts    # GET: Fetch featured projects & gallery items
│   │   ├── skills/route.ts      # GET: Fetch categorized skills
│   │   └── testimonials/route.ts# GET: Fetch client testimonials
│   ├── components/              # UI Components
│   │   ├── ButtonExplosion.tsx  # Particle burst effect on CTA buttons
│   │   ├── ContactSection.tsx   # Contact form with database integration
│   │   ├── GSAPProvider.tsx     # ScrollTrigger & GSAP context provider
│   │   ├── Hero.tsx             # Hero section with intro & social links
│   │   ├── Icons.tsx            # Authentic brand icon renderer
│   │   ├── Navbar.tsx           # Fixed glassmorphism navigation header
│   │   ├── ParticleBackground.tsx # Interactive background canvas
│   │   ├── Preloader.tsx        # Initial loading screen
│   │   ├── ProjectGallery.tsx   # Mockups carousel & portaled lightbox modal
│   │   ├── SelectedWork.tsx     # Featured projects grid
│   │   ├── StatsCounter.tsx     # Animated numeric counter
│   │   ├── TechSkills.tsx       # Single-row & expandable skill grid
│   │   ├── Testimonials.tsx     # Client review slider
│   │   └── ThemeToggle.tsx      # Dark/light mode switcher
│   ├── globals.css              # Global styles, variables & neumorphic classes
│   ├── layout.tsx               # Root layout, fonts, and meta tags
│   └── page.tsx                 # Main application page
├── lib/
│   ├── data/                    # Static fallback data & site configurations
│   │   ├── services.ts          # Services & process data
│   │   └── siteConfig.ts        # Personal bio, social links, navigation
│   ├── db/                      # Database helper modules
│   │   └── contact.ts           # Contact collection operations
│   ├── types/                   # TypeScript interfaces & types
│   │   ├── project.ts           # Project & Gallery types
│   │   ├── site.ts              # SiteConfig & Navigation types
│   │   ├── skill.ts             # SkillItem & Category types
│   │   └── testimonial.ts       # Testimonial interface
│   └── mongodb.ts               # MongoDB Client connection with caching
├── public/                      # Static assets, mockups, manifest, icons
├── package.json                 # Project dependencies and scripts
└── next.config.ts               # Next.js configuration
```

---

## 📡 API Endpoints

The application utilizes Next.js App Router Route Handlers connected directly to MongoDB:

| Endpoint | Method | Query Params | Description |
|---|---|---|---|
| `/api/skills` | `GET` | `?category=All` | Returns all categorized tech skills from `skills` collection |
| `/api/projects` | `GET` | `?type=gallery` | Returns projects or gallery mockups from `projects`/`Gellary` collection |
| `/api/testimonials` | `GET` | — | Returns client testimonials from `testimonials` collection |
| `/api/contact` | `POST` | — | Validates and stores incoming contact form inquiries into `contacts` collection |

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher
- **npm**, **pnpm**, or **yarn**
- **MongoDB Database**: Local instance or MongoDB Atlas connection string

### 1. Clone the Repository
```bash
git clone https://github.com/Arafat-boss/arafat-portfolio2.0.git
cd 2026-arafat
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your MongoDB credentials:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=portfolio
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Environment Variables

| Variable | Required | Description | Example |
|---|---|---|---|
| `MONGODB_URI` | **Yes** | MongoDB connection URI string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `MONGODB_DB` | No | Database name (defaults to `portfolio`) | `portfolio` |

---

## 👤 Author

**Md. Arafat Sarker**
- **Role**: Full-Stack Developer (MERN & Next.js Specialist)
- **GitHub**: [@Arafat-boss](https://github.com/Arafat-boss)
- **LinkedIn**: [Md. Arafat Sarker](https://www.linkedin.com/in/md-arafat-sarker/)
- **Facebook**: [Arraf Ja](https://www.facebook.com/Arraf.Ja/)
- **Email**: mmarafatu@gmail.com
- **Location**: Dhaka, Bangladesh (Working Worldwide)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
