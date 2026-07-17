# Portfolio Freelancer Redesign + Cross-Portfolio Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the Freelancer portfolio's navbar/footer/hero to match the Profesional portfolio's real design language (mostly beige `#F5F4F0` sections + dark `#0A0A0A` Hero/Trust/Footer/navbar), add the "Nido" academic project to both portfolios, and update outdated education copy (Técnica Universitaria en Desarrollo Web finished; Licenciatura en IA at UBP starting August 2026) across both repos.

**Architecture:** Two independent Vite/React/Tailwind repos, no shared package. Each task ports a specific component's JSX/Tailwind from the Profesional repo (reference, do not modify except where explicitly noted) into the Freelancer repo, or edits copy/data in place. No test suite exists in either repo (`package.json` only has `dev`/`build`/`preview` scripts) — verification steps use `npm run build` (TypeScript + Vite build must succeed) plus a visual check in the browser instead of unit tests.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, react-i18next, lucide-react.

---

## File Structure

**Freelancer repo** (`C:\Users\giuli\Documents\Portfolio_GiulianaDiRocco - Freelancer`):
- Modify: `src/index.css`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/sections/Hero.tsx`, `src/components/ProfileCard.tsx`, `src/components/sections/FAQSection.tsx`, `src/components/sections/ProcessSection.tsx`, `src/components/sections/UseCasesSection.tsx`, `src/components/sections/WhatIBuild.tsx`, `src/components/sections/AboutSection.tsx`, `src/components/sections/Projects.tsx`, `src/i18n.ts`
- Create: `public/CV_Giuliana_DiRocco_EN.pdf`, `public/CV_Giuliana_DiRocco_ES.pdf`, `public/nido-mockup.png` (copied assets)

**Profesional repo** (`C:\Users\giuli\Documents\Portfolio_GiulianaDiRocco - Profesional`):
- Modify: `src/data/projectsData.ts`, `src/i18n.ts`, `src/components/sections/AboutSection.tsx`, `src/components/sections/ExperienceSection.tsx`, `src/components/sections/Whatsnext.tsx`, `CLAUDE.md`
- Create: `public/nido-mockup.png` (copied asset)

---

## Task 1: Copy shared assets (Freelancer)

**Files:**
- Create: `public/CV_Giuliana_DiRocco_EN.pdf`
- Create: `public/CV_Giuliana_DiRocco_ES.pdf`
- Create: `public/nido-mockup.png`

- [ ] **Step 1: Copy CV PDFs from the Profesional repo (same person, same CV)**

```bash
cp "C:\Users\giuli\Documents\Portfolio_GiulianaDiRocco - Profesional\public\CV_Giuliana_DiRocco_EN.pdf" "C:\Users\giuli\Documents\Portfolio_GiulianaDiRocco - Freelancer\public\CV_Giuliana_DiRocco_EN.pdf"
cp "C:\Users\giuli\Documents\Portfolio_GiulianaDiRocco - Profesional\public\CV_Giuliana_DiRocco_ES.pdf" "C:\Users\giuli\Documents\Portfolio_GiulianaDiRocco - Freelancer\public\CV_Giuliana_DiRocco_ES.pdf"
```

- [ ] **Step 2: Copy the Nido mockup image into both repos' public folders**

```bash
cp "C:\Users\giuli\Downloads\MVP4 - PresentaciónComercial.png" "C:\Users\giuli\Documents\Portfolio_GiulianaDiRocco - Freelancer\public\nido-mockup.png"
cp "C:\Users\giuli\Downloads\MVP4 - PresentaciónComercial.png" "C:\Users\giuli\Documents\Portfolio_GiulianaDiRocco - Profesional\public\nido-mockup.png"
```

- [ ] **Step 3: Verify the 3 files exist**

Run: `ls "C:\Users\giuli\Documents\Portfolio_GiulianaDiRocco - Freelancer\public" | grep -E "CV_|nido"`
Expected: lists `CV_Giuliana_DiRocco_EN.pdf`, `CV_Giuliana_DiRocco_ES.pdf`, `nido-mockup.png`

- [ ] **Step 4: Commit**

```bash
cd "C:\Users\giuli\Documents\Portfolio_GiulianaDiRocco - Freelancer"
git add public/CV_Giuliana_DiRocco_EN.pdf public/CV_Giuliana_DiRocco_ES.pdf public/nido-mockup.png
git commit -m "chore: add CV PDFs and Nido mockup asset"
```

---

## Task 2: `index.css` — base font Poppins (Freelancer)

**Files:**
- Modify: `src/index.css:25`

- [ ] **Step 1: Change body font-family**

Old:
```css
  body {
    @apply antialiased;
    background-color: #ffffff;
    color: #0A0A0A;
    font-family: 'Inter', sans-serif;
  }
```

New:
```css
  body {
    @apply antialiased;
    background-color: #ffffff;
    color: #0A0A0A;
    font-family: 'Poppins', sans-serif;
  }
```

(No `@import` change needed — Poppins is already imported on line 5.)

- [ ] **Step 2: Verify build**

Run: `npm run build` (from the Freelancer repo root)
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: switch base font-family from Inter to Poppins to match Profesional"
```

---

## Task 3: Navbar — dark floating pill (Freelancer)

**Files:**
- Modify: `src/components/layout/Navbar.tsx` (full JSX replace, logic unchanged)

Keep the existing `menuItems` array, `handleNavClick`, `toggleLanguage`, and scroll-tracking `useEffect` exactly as they are (lines 8–57 of the current file) — only the returned JSX changes, plus one new import (`Download` icon) and a CV href.

- [ ] **Step 1: Replace the full file**

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

const menuItems = [
  { id: "home",     es: "Inicio",    en: "Home" },
  { id: "about",    es: "Sobre mí",  en: "About" },
  { id: "projects", es: "Proyectos", en: "Projects" },
  { id: "services", es: "Servicios", en: "Services" },
  { id: "faq",      es: "FAQ",       en: "FAQ" },
  { id: "contact",  es: "Contacto",  en: "Contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    window.history.pushState("", document.title, window.location.pathname);
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(lang === "en" ? "es" : "en");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) { setActiveSection("contact"); return; }
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop;
        if (window.scrollY >= top - window.innerHeight / 3) {
          if (menuItems.some(item => item.id === section.id)) {
            setActiveSection(section.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── FLOATING DESKTOP PILL NAVBAR ── */}
      <nav
        className={`hidden lg:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 h-14 items-center justify-between px-8 rounded-full transition-all duration-300 w-[90%] max-w-5xl backdrop-blur-md border ${
          scrolled
            ? "bg-[#0A0A0A]/85 border-white/10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]"
            : "bg-[#0A0A0A]/40 border-white/[0.06] shadow-sm"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="font-black tracking-tighter uppercase text-xs text-white hover:text-[#CC1500] transition-colors"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Giuliana Di Rocco
        </a>

        <div className="flex items-center gap-7">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`relative text-[10px] font-bold uppercase tracking-[0.25em] transition-all py-1 ${
                activeSection === item.id
                  ? "text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {item[lang]}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#CC1500] rounded-full"
                />
              )}
            </a>
          ))}

          <div className="flex items-center gap-5 border-l border-white/10 pl-6">
            <a
              href={lang === "en" ? "/CV_Giuliana_DiRocco_EN.pdf" : "/CV_Giuliana_DiRocco_ES.pdf"}
              download
              className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] bg-white text-[#0A0A0A] hover:bg-[#CC1500] hover:text-white px-3.5 py-1.5 transition-all duration-300 rounded-full"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <Download size={9} />
              CV
            </a>
            <button
              onClick={toggleLanguage}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#CC1500] transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── FLOATING MOBILE PILL NAVBAR ── */}
      <div
        className={`lg:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 h-12 flex items-center justify-between px-5 rounded-full transition-all duration-300 w-[90%] backdrop-blur-md border ${
          scrolled
            ? "bg-[#0A0A0A]/85 border-white/10 shadow-lg"
            : "bg-[#0A0A0A]/40 border-white/[0.06]"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="font-black tracking-tighter uppercase text-[10px] text-white"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Giuliana Di Rocco
        </a>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-[#CC1500] transition-colors"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button onClick={() => setIsOpen(true)} className="p-1 text-white hover:text-[#CC1500] transition-colors">
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-[100] bg-[#0A0A0A]/98 backdrop-blur-lg flex flex-col px-6 py-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span
                className="font-black tracking-tighter uppercase text-[11px] text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Giuliana Di Rocco
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center gap-1">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between py-4 border-b border-white/5 group"
                >
                  <span
                    className={`text-3xl font-black uppercase tracking-tighter transition-colors ${
                      activeSection === item.id ? "text-[#CC1500]" : "text-white/80 hover:text-[#CC1500]"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {item[lang]}
                  </span>
                  <span className="text-white/20 group-hover:text-[#CC1500] transition-colors text-xl">
                    →
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-4 mt-8">
              <a
                href={lang === "en" ? "/CV_Giuliana_DiRocco_EN.pdf" : "/CV_Giuliana_DiRocco_ES.pdf"}
                download
                className="inline-flex items-center justify-center gap-2 py-3.5 bg-white text-black hover:bg-[#CC1500] hover:text-white rounded-lg text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <Download size={11} />
                {lang === "en" ? "Download CV" : "Descargar CV"}
              </a>
              <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/20 text-center">
                © 2026 Giuliana Di Rocco
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds. No unused-import errors (`Download` is used twice, `Menu`/`X` still used).

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(navbar): replace fixed light navbar with dark floating pill navbar + CV button"
```

---

## Task 4: Hero — drop Playfair Display italic accents (Freelancer)

**Files:**
- Modify: `src/components/sections/Hero.tsx:75-79` (Highlight), `:258` (greeting), `:266-267` (name second line)

The Profesional Hero never uses `'Playfair Display'` — everything is plain Poppins uppercase. Port that plain treatment into 3 spots. Keep all copy/words/content — this is a typography-only change.

- [ ] **Step 1: Highlight component — remove italic serif styling**

Old (`Hero.tsx:75-79`):
```tsx
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <mark style={{ background: "rgba(204,21,0,0.28)", color: "#fff", padding: "2px 8px 4px", fontStyle: "italic", fontFamily: "'Playfair Display', serif", borderRadius: 0 }}>
    {children}
  </mark>
);
```

New:
```tsx
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <mark style={{ background: "rgba(204,21,0,0.28)", color: "#fff", padding: "2px 8px 4px", fontFamily: "Poppins, sans-serif", fontWeight: 600, borderRadius: 0 }}>
    {children}
  </mark>
);
```

- [ ] **Step 2: "Hello, I'm —" greeting — plain Poppins instead of italic Playfair**

Old (`Hero.tsx:258-262`):
```tsx
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.5 }}
            className="text-white/30 mb-2 mt-10 sm:mt-0"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(0.95rem,1.6vw,1.3rem)" }}>
            {lang === "en" ? "Hello, I'm —" : "Hola, soy —"}
          </motion.p>
```

New:
```tsx
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.5 }}
            className="text-white/30 mb-2 mt-10 sm:mt-0 font-mono tracking-widest text-[10px] uppercase">
            {lang === "en" ? "Hello, I'm —" : "Hola, soy —"}
          </motion.p>
```

- [ ] **Step 3: Name second line ("Di Rocco") — plain Poppins uppercase instead of italic Playfair**

Old (`Hero.tsx:282-299`):
```tsx
            <div className="overflow-hidden">
              <motion.h1 initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[clamp(2rem,13vw,3.4rem)] sm:text-[clamp(2.4rem,10vw,13rem)]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                  lineHeight: 0.92,
                  backgroundImage: line2Gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                Di Rocco
              </motion.h1>
            </div>
```

New:
```tsx
            <div className="overflow-hidden">
              <motion.h1 initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[clamp(2rem,13vw,3.4rem)] sm:text-[clamp(2.4rem,10vw,13rem)] font-light uppercase"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.92,
                  backgroundImage: line2Gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                DI ROCCO
              </motion.h1>
            </div>
```

Note: text content changes from `Di Rocco` to `DI ROCCO` (uppercase) to match the all-caps treatment used everywhere else in both Heroes — the `uppercase` class alone would already render it visually uppercase, but the literal string is capitalized too for consistency with how `GIULIANA` is written above it.

- [ ] **Step 4: Verify build and no remaining Playfair usage in Hero.tsx**

Run: `npm run build`
Run: `grep -n "Playfair" "src/components/sections/Hero.tsx"`
Expected: build succeeds; grep returns no matches.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "style(hero): drop Playfair Display italic accents to match Profesional's plain Poppins treatment"
```

---

## Task 5: ProfileCard — swap orange accent for site red (Freelancer)

**Files:**
- Modify: `src/components/ProfileCard.tsx:52-53,83,86,89,92,98`

Every `#FF6F00` becomes `#CC1500` (the red accent used everywhere else in both portfolios). No structural change.

- [ ] **Step 1: Replace all 6 occurrences**

Old (`ProfileCard.tsx:50-54`):
```tsx
        {/* Decoración Naranja - Fijo */}
        <div className="flex-none flex items-center gap-2 mb-3 sm:mb-4">
          <span className="w-3 h-3 bg-[#FF6F00] rounded-full" />
          <span className="w-8 h-[3px] bg-[#FF6F00] rounded-full" />
        </div>
```

New:
```tsx
        {/* Decoración Roja - Fijo */}
        <div className="flex-none flex items-center gap-2 mb-3 sm:mb-4">
          <span className="w-3 h-3 bg-[#CC1500] rounded-full" />
          <span className="w-8 h-[3px] bg-[#CC1500] rounded-full" />
        </div>
```

Old (`ProfileCard.tsx:81-100`, the 5 icon links):
```tsx
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform" />
            </a>
            <a href="https://linkedin.com/in/giulianadirocco" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform" />
            </a>
            <a href="https://github.com/giuliannadr" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform" />
            </a>
            <a href="https://instagram.com/giulianna.dev" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform" />
            </a>
            <button
              onClick={handleEmailClick}
              className="cursor-pointer focus:outline-none"
            >
              <HiOutlineMail className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform" />
            </button>
```

New: same block with every `text-[#FF6F00]` replaced by `text-[#CC1500]` (5 occurrences, no other changes).

- [ ] **Step 2: Verify build**

Run: `npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/components/ProfileCard.tsx
git commit -m "style(profile-card): swap orange accent for site-wide red to match palette"
```

---

## Task 6: Beige value alignment — `#F8F7F5` → `#F5F4F0` (Freelancer)

**Files:**
- Modify: `src/components/sections/FAQSection.tsx`, `src/components/sections/ProcessSection.tsx`, `src/components/sections/UseCasesSection.tsx`, `src/components/sections/WhatIBuild.tsx`

Pure value substitution — find every literal `#F8F7F5` in these 4 files and replace with `#F5F4F0` (Profesional's exact beige). No structural change.

- [ ] **Step 1: Find every occurrence**

Run: `grep -rn "F8F7F5" src/components/sections/FAQSection.tsx src/components/sections/ProcessSection.tsx src/components/sections/UseCasesSection.tsx src/components/sections/WhatIBuild.tsx`

- [ ] **Step 2: Replace each occurrence found in Step 1** (use the Edit tool per file, `replace_all: true` with `old_string: "F8F7F5"`, `new_string: "F5F4F0"` — safe because `F8F7F5` doesn't appear as a substring of any other token in these files)

- [ ] **Step 3: Verify build and no remaining old value**

Run: `npm run build`
Run: `grep -rn "F8F7F5" src/components/sections/`
Expected: build succeeds; grep returns no matches.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/FAQSection.tsx src/components/sections/ProcessSection.tsx src/components/sections/UseCasesSection.tsx src/components/sections/WhatIBuild.tsx
git commit -m "style: align beige section background to Profesional's exact #F5F4F0 value"
```

---

## Task 7: Footer — dark mouse-reactive redesign (Freelancer)

**Files:**
- Modify: `src/components/layout/Footer.tsx` (full replace)

Port Profesional's dark mouse-gradient footer pattern. Keep Freelancer's existing behavior: WhatsApp as the primary CTA (not email — WhatsApp is the audience's preferred channel throughout this site), the "click email to open Gmail compose" interaction, the copy-to-clipboard button, and the same 3 socials (Instagram, LinkedIn, GitHub). Reuses existing i18n keys `footer.titleLine1`, `footer.titleLine2`, `footer.status`, `footer.location`, `footer.backToTop`, `footer.emailSubject` — no i18n changes needed.

- [ ] **Step 1: Replace the full file**

```tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Linkedin, Github, Instagram, Copy, Check, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const BLOBS = [
  { color: "#CC1500", w: 400, x: "20%", y: "30%", op: 0.05, cls: "blob-1" },
  { color: "#7C3AED", w: 450, x: "80%", y: "60%", op: 0.06, cls: "blob-2" },
];

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const [copied, setCopied] = useState(false);
  const email = "giulianadiroccodev@gmail.com";

  const whatsappUrl = `https://wa.me/5491150403408?text=${encodeURIComponent(
    lang === "en"
      ? "Hi Giuli! I saw your portfolio and I'd like to talk about a project I have in mind."
      : "¡Hola Giuli! Vi tu portfolio y me gustaría que hablemos de mi proyecto."
  )}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(t("footer.emailSubject"));
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`, "_blank");
  };

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);

  const [lx, setLx] = useState(50);
  const [ly, setLy] = useState(50);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const blobX = useSpring(useTransform(rawX, [-1, 1], [-20, 20]), { stiffness: 30, damping: 25 });
  const blobY = useSpring(useTransform(rawY, [-1, 1], [-20, 20]), { stiffness: 30, damping: 25 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      setLx(nx * 100);
      setLy(ny * 100);
      rawX.set((nx - 0.5) * 2);
      rawY.set((ny - 0.5) * 2);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [rawX, rawY]);

  const gradient = `
    radial-gradient(ellipse 60% 80% at ${72 + lx * 0.08}% ${38 + ly * 0.10}%, rgba(204,21,0,1) 0%, transparent 55%),
    radial-gradient(ellipse 45% 70% at ${15 + lx * 0.06}% ${58 + ly * 0.08}%, rgba(124,58,237,0.9) 0%, transparent 50%),
    radial-gradient(ellipse 40% 55% at ${50 + lx * 0.04}% ${10 + ly * 0.12}%, rgba(6,182,212,0.6) 0%, transparent 45%),
    linear-gradient(rgba(255,255,255,1), rgba(255,255,255,1))
  `;

  const headline = `${t("footer.titleLine1")} ${t("footer.titleLine2")}`;

  const socials = [
    { icon: Instagram, href: "https://instagram.com/giulianna.dev",     label: "Instagram" },
    { icon: Linkedin,  href: "https://linkedin.com/in/giulianadirocco", label: "LinkedIn"  },
    { icon: Github,    href: "https://github.com/giuliannadr",          label: "GitHub"    },
  ];

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative bg-[#0A0A0A] py-28 md:py-40 px-5 sm:px-8 lg:px-10 flex flex-col items-center justify-center text-center"
    >
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0A0A0A, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0" style={{ x: blobX, y: blobY, scale: blobScale }}>
          {BLOBS.map((b, i) => (
            <div key={i}
              className={`${b.cls} absolute blur-3xl`}
              style={{ background: b.color, width: b.w, height: b.w, left: b.x, top: b.y, opacity: b.op, transform: "translate(-50%,-50%)" }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center gap-4 mb-10"
      >
        <div className="h-px w-12 bg-white/15" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30" style={{ fontFamily: "Poppins, sans-serif" }}>
          {t("footer.status")}
        </span>
        <div className="h-px w-12 bg-white/15" />
      </motion.div>

      <div className="relative z-10 mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-black uppercase leading-none"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(1.8rem, 10vw, 9rem)",
            letterSpacing: "-0.04em",
            paddingBottom: "0.12em",
            backgroundImage: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {headline}
        </motion.h2>
      </div>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10 inline-flex items-center gap-3 bg-white text-[#0A0A0A] font-black text-[10px] uppercase tracking-[0.3em] px-10 py-5 mb-12"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        WhatsApp
        <ArrowUpRight size={14} />
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-0 border border-white/10 overflow-hidden w-full sm:w-auto max-w-[min(460px,90vw)] sm:max-w-none"
      >
        <button
          onClick={handleEmailClick}
          className="group flex items-center justify-between sm:justify-start gap-3 px-5 py-3.5 text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 border-b sm:border-b-0 sm:border-r border-white/10"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {email}
          </span>
        </button>

        <button
          onClick={handleCopyEmail}
          className="group flex items-center justify-between sm:justify-start gap-3 px-5 py-3.5 text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 border-b sm:border-b-0 sm:border-r border-white/10"
          aria-label="Copiar email"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {copied ? (lang === "en" ? "Copied!" : "¡Copiado!") : (lang === "en" ? "Copy email" : "Copiar email")}
          </span>
          <motion.div animate={{ scale: copied ? 1.2 : 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          </motion.div>
        </button>

        <div className="flex">
          {socials.map(({ icon: Icon, href, label }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`flex flex-1 sm:flex-none items-center justify-center px-4 py-3.5 text-white/30 hover:text-white hover:bg-white/5 transition-all duration-300 ${i < socials.length - 1 ? "border-r border-white/10" : ""}`}
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 border-t border-white/[0.07] px-5 sm:px-8 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50" style={{ fontFamily: "Poppins, sans-serif" }}>
            © {new Date().getFullYear()} — GIULIANA DI ROCCO
          </p>
          <div className="flex items-center gap-8">
            <span className="hidden md:block text-[9px] font-black uppercase tracking-[0.4em] text-white/50" style={{ fontFamily: "Poppins, sans-serif" }}>
              {t("footer.location")}
            </span>
            <a
              href="#home"
              className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50 hover:text-white transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("footer.backToTop")} ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat(footer): replace solid-red footer with dark mouse-reactive footer matching Profesional"
```

---

## Task 8: Add Nido to Freelancer's Projects section

**Files:**
- Modify: `src/components/sections/Projects.tsx:246-256`, `src/i18n.ts` (`projects.items` block, both EN ~line 88+ and ES ~line 303+)

- [ ] **Step 1: Add Nido to `rawData` in `Projects.tsx`**

Old (`Projects.tsx:253-256`):
```tsx
    { id: "la-quinta-miri", image: "./miri-mockup.webp", liveUrl: "https://laquintamiri.vercel.app/",            stack: ["React.js", "TypeScript", "EmailJS"] },
    { id: "inv-boda", image: "./boda.webp", liveUrl: "https://invitacion-muestra.vercel.app/",      stack: ["React.js", "Framer Motion", "Vite"] },
    { id: "inv-xv",   image: "./xv.webp",   liveUrl: "https://invitacion-xv-muestra.vercel.app/",   stack: ["React.js", "Framer Motion", "Vite"] },
  ];
```

New:
```tsx
    { id: "la-quinta-miri", image: "./miri-mockup.webp", liveUrl: "https://laquintamiri.vercel.app/",            stack: ["React.js", "TypeScript", "EmailJS"] },
    { id: "inv-boda", image: "./boda.webp", liveUrl: "https://invitacion-muestra.vercel.app/",      stack: ["React.js", "Framer Motion", "Vite"] },
    { id: "inv-xv",   image: "./xv.webp",   liveUrl: "https://invitacion-xv-muestra.vercel.app/",   stack: ["React.js", "Framer Motion", "Vite"] },
    { id: "nido", image: "./nido-mockup.png", liveUrl: "https://nidoapp.online", stack: ["Angular", ".NET 9", "C#", "PostgreSQL", "Clean Architecture", "OCR", "IA"] },
  ];
```

- [ ] **Step 2: Add the `nido` translation block to `i18n.ts` (EN)**

Insert into the EN `projects.items` object (near `hidrorescate`, around line 88-94 of `i18n.ts`):

```ts
      nido: {
        "title": "Nido",
        "category": "Final Degree Project",
        "description": "A home management platform with AI-powered recipes, shared finances and OCR receipt scanning — built as a final degree project.",
        "longDescription": "Nido centralizes a shared household's pantry, recipes, chores and finances in one place. I worked on the backend and the go-to-market communication strategy as part of an 8-person team, shipping the MVP in about 2 months. It features AI recipe recommendations, an in-recipe cooking assistant chat, automatic receipt scanning via OCR, price comparison across supermarkets, and a Telegram bot for notifications."
      },
```

- [ ] **Step 3: Add the `nido` translation block to `i18n.ts` (ES)**

Insert into the ES `projects.items` object (near `hidrorescate`, around line 303+ of `i18n.ts`, mirroring the EN insertion point):

```ts
      nido: {
        "title": "Nido",
        "category": "Proyecto Final de Carrera",
        "description": "Plataforma de gestión del hogar con recetas asistidas por IA, finanzas compartidas y escaneo OCR de tickets — desarrollada como proyecto final de carrera.",
        "longDescription": "Nido centraliza la alacena, las recetas, las tareas y las finanzas de un hogar compartido en un solo lugar. Trabajé en el backend y en la estrategia de comunicación del lanzamiento como parte de un equipo de 8 personas, entregando el MVP en aproximadamente 2 meses. Incluye recomendación de recetas con IA, un chat asistente de cocina dentro de cada receta, escaneo automático de tickets por OCR, comparación de precios entre supermercados y un bot de Telegram para notificaciones."
      },
```

- [ ] **Step 4: Verify build and render**

Run: `npm run build`
Expected: build succeeds (no missing i18n key warnings at runtime — verify visually in Task 12).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Projects.tsx src/i18n.ts
git commit -m "feat(projects): add Nido final degree project"
```

---

## Task 9: Education copy — Freelancer

**Files:**
- Modify: `src/components/sections/AboutSection.tsx:15,130`

- [ ] **Step 1: Update the STATS array entry**

Old (`AboutSection.tsx:15`):
```tsx
  { es: "UNLAM · Egreso jul. 2026",  en: "UNLAM · Graduating Jul. 2026", color: "#06B6D4" },
```

New:
```tsx
  { es: "Técnica en Desarrollo Web · UNLaM",  en: "Web Dev Technician · UNLaM", color: "#06B6D4" },
```

- [ ] **Step 2: Update the identity line**

Old (`AboutSection.tsx:130`):
```tsx
              {lang === "en" ? "Web Developer · UNLAM · Jul. 2026" : "Desarrolladora Web · UNLAM · Jul. 2026"}
```

New:
```tsx
              {lang === "en" ? "Web Dev Technician · UNLaM" : "Técnica en Desarrollo Web · UNLaM"}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/AboutSection.tsx
git commit -m "content: update education copy — Técnica en Desarrollo Web (UNLaM) finished"
```

---

## Task 10: Education copy — Profesional, `AboutSection.tsx` + `ExperienceSection.tsx`

**Files:**
- Modify: `src/components/sections/AboutSection.tsx:19-20,42-43`, `src/components/sections/ExperienceSection.tsx:37,39`

- [ ] **Step 1: `AboutSection.tsx` — `principles[0].body`**

Old (`AboutSection.tsx:17-20`):
```tsx
      title: lang === "en" ? "Academic Base" : "Base Académica",
      body: lang === "en"
        ? "Degree in Web Development at UNLaM. 18 out of 20 subjects completed with an 8.72 GPA. Graduating in July 2026. Specialized in backend engineering, database modeling, and software architectures."
        : "Tecnicatura en Desarrollo Web en la UNLaM. 18 de 20 materias aprobadas con promedio de 8.72. Egreso estimado en julio 2026. Formación sólida en backend, bases de datos y arquitectura de software.",
```

New:
```tsx
      title: lang === "en" ? "Academic Base" : "Base Académica",
      body: lang === "en"
        ? "Universitary Technician in Web Development from UNLaM, finished with an 8.72 GPA. Starting a Bachelor's in Artificial Intelligence at UBP in August 2026. Solid foundation in backend engineering, database modeling, and software architectures."
        : "Técnica Universitaria en Desarrollo Web en la UNLaM, finalizada con un promedio de 8.72. Comienzo la Licenciatura en Inteligencia Artificial en la UBP en agosto de 2026. Formación sólida en backend, bases de datos y arquitectura de software.",
```

- [ ] **Step 2: `AboutSection.tsx` — `metadata` Degree/Graduation fields**

Old (`AboutSection.tsx:40-44`):
```tsx
  const metadata = [
    { label: lang === "en" ? "GPA" : "Promedio", value: "8.72 / 10" },
    { label: lang === "en" ? "Graduation" : "Graduación", value: lang === "en" ? "July 2026" : "Julio 2026" },
    { label: lang === "en" ? "Degree" : "Carrera", value: lang === "en" ? "Web Development (UNLaM)" : "Desarrollo Web (UNLaM)" },
```

New:
```tsx
  const metadata = [
    { label: lang === "en" ? "GPA" : "Promedio", value: "8.72 / 10" },
    { label: lang === "en" ? "Degree" : "Título", value: lang === "en" ? "Web Dev Technician (UNLaM)" : "Técnica en Desarrollo Web (UNLaM)" },
    { label: lang === "en" ? "Next" : "Próximo", value: lang === "en" ? "AI Bachelor's (UBP) — Aug 2026" : "Lic. en IA (UBP) — Ago 2026" },
```

(This swaps the "Graduation" row — now meaningless since the degree is finished — for a "Next" row pointing at the upcoming UBP degree. The 6-item `metadata` array keeps its length; only these first 3 entries change, the remaining 3 — Startup/English/Location — stay as-is.)

- [ ] **Step 3: `ExperienceSection.tsx` — timeline entry 3 (`ctx`, `to`)**

Old (`ExperienceSection.tsx:36-39`):
```tsx
    to:   { es: "Jul 2026", en: "Jul 2026" },
    role: { es: "Tecnicatura en Desarrollo Web", en: "Web Development Degree" },
    ctx:  { es: "UNLaM · 18/20 materias",            en: "UNLaM · 18/20 subjects"     },
```

New:
```tsx
    to:   { es: "Jul 2026", en: "Jul 2026" },
    role: { es: "Técnica Universitaria en Desarrollo Web", en: "Web Dev Technician Degree" },
    ctx:  { es: "UNLaM · Finalizada",            en: "UNLaM · Finished"     },
```

- [ ] **Step 4: Verify build**

Run: `npm run build` (from the Profesional repo root)

- [ ] **Step 5: Commit**

```bash
cd "C:\Users\giuli\Documents\Portfolio_GiulianaDiRocco - Profesional"
git add src/components/sections/AboutSection.tsx src/components/sections/ExperienceSection.tsx
git commit -m "content: update education copy — Técnica en Desarrollo Web finished, Lic. IA (UBP) starting Aug 2026"
```

---

## Task 11: Education copy — Profesional, `Whatsnext.tsx` + `i18n.ts` + `CLAUDE.md`

**Files:**
- Modify: `src/components/sections/Whatsnext.tsx:20-21`, `src/i18n.ts:16,22,25-26,48-49,301,307,310-311,333-335`, `CLAUDE.md`

Note: `i18n.ts` lines 270-275 / 555-560 (`whatsNext.items.utn`/`utnSub`) already correctly say "Licenciatura en Inteligencia Artificial" / "UBP — Universidad Blas Pascal · Inicio: agosto 2026" — **no change needed there**, it was already updated in a prior session. Station 1's body text in `Whatsnext.tsx` is the piece still describing the degree as in-progress.

- [ ] **Step 1: `Whatsnext.tsx` — Station 1 body (degree now finished, not "estimated")**

Old (`Whatsnext.tsx:19-22`):
```tsx
      body: {
        es: "18 de 20 materias aprobadas con promedio de 8.72. Egreso estimado en julio 2026.",
        en: "18 out of 20 subjects completed with an 8.72 GPA. Graduating in July 2026.",
      },
```

New:
```tsx
      body: {
        es: "Técnica Universitaria en Desarrollo Web finalizada con promedio de 8.72.",
        en: "Universitary Technician in Web Development finished with an 8.72 GPA.",
      },
```

- [ ] **Step 2: `i18n.ts` — `about.p1` (EN line 22, ES line 307)**

Old (EN, line 22):
```ts
      p1: "Hi! I'm <0>Giuliana</0>. I'm a Web Development graduate from UNLaM (8.72 GPA). I build software that solves real, day-to-day problems and delivers actual business value.",
```

New:
```ts
      p1: "Hi! I'm <0>Giuliana</0>. I'm a Universitary Technician in Web Development from UNLaM (8.72 GPA), starting a Bachelor's in AI at UBP in August 2026. I build software that solves real, day-to-day problems and delivers actual business value.",
```

Old (ES, line 307):
```ts
      p1: "¡Hola! Soy <0>Giuliana</0>. Me gradué en Desarrollo Web en la UNLaM con un promedio de 8.72. Escribo código para resolver problemas reales del día a día y aportar valor tangible.",
```

New:
```ts
      p1: "¡Hola! Soy <0>Giuliana</0>. Soy Técnica Universitaria en Desarrollo Web (UNLaM, promedio 8.72) y en agosto de 2026 empiezo la Licenciatura en Inteligencia Artificial en la UBP. Escribo código para resolver problemas reales del día a día y aportar valor tangible.",
```

- [ ] **Step 3: `i18n.ts` — `profileCard.role` (EN line 16, ES line 301)**

Old (EN, line 16):
```ts
      role: "Hi! I'm Giuliana — a Full Stack Developer with a GPA of 8.72 and 13 production projects shipped."
```

New:
```ts
      role: "Hi! I'm Giuliana — a Full Stack Developer, Web Dev Technician (UNLaM, 8.72 GPA), with 13 production projects shipped."
```

Old (ES, line 301):
```ts
      role: "¡Hola! Soy Giuliana — Desarrolladora Full Stack con promedio 8.72 y 13 proyectos en producción."
```

New:
```ts
      role: "¡Hola! Soy Giuliana — Desarrolladora Full Stack, Técnica en Desarrollo Web (UNLaM, promedio 8.72), con 13 proyectos en producción."
```

- [ ] **Step 4: `i18n.ts` — `trust.metrics.modern.tooltip` (EN lines 48-50, ES lines 333-335)**

Old (EN):
```ts
        modern: {
          label: "GPA",
          value: "8.72",
          tooltip: "18 of 20 subjects completed at Universidad Nacional de La Matanza, graduating July 2026."
        }
```

New:
```ts
        modern: {
          label: "GPA",
          value: "8.72",
          tooltip: "Universitary Technician in Web Development, finished at Universidad Nacional de La Matanza."
        }
```

Old (ES):
```ts
        modern: {
          label: "Promedio",
          value: "8.72",
          tooltip: "18 de 20 materias promocionadas en la Universidad Nacional de La Matanza, egreso julio 2026."
        }
```

New:
```ts
        modern: {
          label: "Promedio",
          value: "8.72",
          tooltip: "Técnica Universitaria en Desarrollo Web finalizada en la Universidad Nacional de La Matanza."
        }
```

Leave `about.stats` (EN lines 25-26, ES lines 310-311 — `exp: "8.72"`, `expLabel: "GPA"/"Promedio"`) unchanged — the label/value pair itself carries no "in progress" claim.

- [ ] **Step 5: `CLAUDE.md` — update the profile section**

Old (`CLAUDE.md:20-28`):
```markdown
## Perfil profesional de Giuliana
- Junior Full Stack Developer especializada en React, Node.js y TypeScript
- Estudiante avanzada UNLaM (18/20 materias, promedio 8.72, egreso estimado 2025)
- Experiencia freelance desde enero 2025
- Mentora técnica desde 2024
- Inglés B2/C1
- GitHub: github.com/giuliannadr
- Portfolio: dev.giulianadirocco.com
- LinkedIn: linkedin.com/in/giulianadirocco
```

New:
```markdown
## Perfil profesional de Giuliana
- Junior Full Stack Developer especializada en React, Node.js y TypeScript
- Técnica Universitaria en Desarrollo Web — UNLaM (finalizada, promedio 8.72)
- Comienza la Licenciatura en Inteligencia Artificial en la UBP (Universidad Blas Pascal) en agosto de 2026
- Experiencia freelance desde enero 2025
- Mentora técnica desde 2024
- Inglés B2/C1
- GitHub: github.com/giuliannadr
- Portfolio: dev.giulianadirocco.com
- LinkedIn: linkedin.com/in/giulianadirocco
```

- [ ] **Step 6: Verify build**

Run: `npm run build`

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/Whatsnext.tsx src/i18n.ts CLAUDE.md
git commit -m "content: finish rolling out finished-degree copy across Whatsnext, i18n and CLAUDE.md"
```

---

## Task 12: Nido + PulseGuard fix — Profesional's `projectsData.ts` + `i18n.ts`

**Files:**
- Modify: `src/data/projectsData.ts:16,32` (new line), `src/i18n.ts` (academic `items`, both languages)

- [ ] **Step 1: Fix PulseGuard — remove `inProgress: true`**

Old (`projectsData.ts:16`):
```ts
  { id: "pulseguard",     image: "./pulseguard.png",            liveUrl: "https://pulseguard-frontend.vercel.app/",        githubUrl: "https://github.com/giuliannadr/pulseguard-frontend", githubBackendUrl: "https://github.com/giuliannadr/pulseguard-backend", type: "professional", inProgress: true,  stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Gemini AI"] },
```

New:
```ts
  { id: "pulseguard",     image: "./pulseguard.png",            liveUrl: "https://pulseguard-frontend.vercel.app/",        githubUrl: "https://github.com/giuliannadr/pulseguard-frontend", githubBackendUrl: "https://github.com/giuliannadr/pulseguard-backend", type: "professional",                   stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Gemini AI"] },
```

- [ ] **Step 2: Add Nido as the 4th academic project**

Old (`projectsData.ts:32`):
```ts
  { id: "nlp",            image: "./ExamGenerator.png",                                                                    githubUrl: "https://github.com/varelafacu/NLPExamGenerator.git",                                                                               type: "academic",                       stack: [".NET 9", "C#", "EF Core", "NLP", "SQL Server", "LINQ", "Clean Architecture"] },
];
```

New:
```ts
  { id: "nlp",            image: "./ExamGenerator.png",                                                                    githubUrl: "https://github.com/varelafacu/NLPExamGenerator.git",                                                                               type: "academic",                       stack: [".NET 9", "C#", "EF Core", "NLP", "SQL Server", "LINQ", "Clean Architecture"] },
  { id: "nido",            image: "./nido-mockup.png",           liveUrl: "https://nidoapp.online",                        githubUrl: "https://github.com/nicolassbon/nido-frontend.git", githubBackendUrl: "https://github.com/nicolassbon/nido-backend.git", type: "academic",                       stack: ["Angular", ".NET 9", "C#", "PostgreSQL", "Clean Architecture", "OCR", "IA"] },
];
```

- [ ] **Step 3: Add the `nido` translation block to `i18n.ts` (EN, near `nlp` around line 127-132)**

```ts
        nido: {
          title: "Nido",
          category: "Home Management Platform",
          description: "Home management platform with AI-assisted recipes, shared finances, chore tracking and OCR receipt scanning.",
          longDescription: "Final degree project developed with an 8-person team, shipping the MVP in about 2 months. I worked on the backend and the go-to-market communication strategy. Nido centralizes a shared household's pantry, recipes, chores and finances, with AI recipe recommendations, an in-recipe cooking assistant chat, automatic receipt scanning via OCR, and price comparison across supermarkets."
        },
```

- [ ] **Step 4: Add the `nido` translation block to `i18n.ts` (ES, near `nlp` around line 412-417)**

```ts
        nido: {
          title: "Nido",
          category: "Plataforma de Gestión del Hogar",
          description: "Plataforma de gestión del hogar con recetas asistidas por IA, finanzas compartidas, gestión de tareas y escaneo OCR de tickets.",
          longDescription: "Proyecto final de carrera desarrollado en equipo de 8 personas, con MVP entregado en aproximadamente 2 meses. Trabajé en el backend y en la estrategia de comunicación del lanzamiento. Nido centraliza la alacena, las recetas, las tareas y las finanzas de un hogar compartido, con recomendación de recetas por IA, un chat asistente de cocina dentro de cada receta, escaneo automático de tickets por OCR y comparación de precios entre supermercados."
        },
```

- [ ] **Step 5: Verify build**

Run: `npm run build`

- [ ] **Step 6: Commit**

```bash
git add src/data/projectsData.ts src/i18n.ts
git commit -m "feat(projects): add Nido academic project, fix PulseGuard inProgress flag"
```

---

## Task 13: Visual verification (both repos)

- [ ] **Step 1: Start the Freelancer dev server**

Run: `npm run dev` (from the Freelancer repo root)

- [ ] **Step 2: Check in browser** — navbar (desktop pill + mobile), Hero (no serif italics), Footer (dark, mouse-reactive), Nido project card, About section education copy, both ES/EN via the language toggle.

- [ ] **Step 3: Start the Profesional dev server**

Run: `npm run dev` (from the Profesional repo root)

- [ ] **Step 4: Check in browser** — Nido card under the academic tab in Projects, PulseGuard no longer shows an "in progress" badge, About/Experience/Whatsnext/i18n education copy in both ES/EN.

- [ ] **Step 5: Report back to the user** with a summary of what was verified and any visual issues found, before considering the work done.

---

## Self-Review Notes

- **Spec coverage:** Task 1 covers asset copying. Tasks 2-7 cover the global design-system port (index.css, Navbar, Hero, ProfileCard, beige alignment, Footer) from spec section 1-2. Tasks 8 and 12 cover Nido in both repos + the PulseGuard fix from spec section 3. Tasks 9-11 cover the education copy from spec section 4 in both repos. Task 13 covers the spec's verification section. All spec sections have corresponding tasks.
- **Type consistency:** `Project` interface in Freelancer's `Projects.tsx` (`id, title, category, description, longDescription, image?, video?, liveUrl?, stack, process?`) is respected by the Task 8 `rawData` addition (no new fields introduced). `RawProject` type in Profesional's `projectsData.ts` (`id, image?, liveUrl?, githubUrl?, githubBackendUrl?, type, inProgress?, stack, process?`) is respected by the Task 12 addition.
- **No placeholders:** every task shows exact before/after code or exact shell commands; no "TBD" or "similar to Task N" shortcuts remain.
