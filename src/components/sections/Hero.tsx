"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue, useSpring, useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

// ── Typewriter ─────────────────────────────────────────────────────────────
const WORDS_ES = ["DISEÑADORA", "DESARROLLADORA", "CREADORA", "FREELANCER", "FRONTEND DEV"];
const WORDS_EN = ["DESIGNER", "DEVELOPER", "CREATOR", "FREELANCER", "FRONTEND DEV"];

const TypewriterWord = ({ lang }: { lang: string }) => {
  const words = lang === "en" ? WORDS_EN : WORDS_ES;
  const [wordIdx, setWordIdx]       = useState(0);
  const [charIdx, setCharIdx]       = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    if (!isDeleting && charIdx === current.length) {
      const t = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(t);
    }
    if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setCharIdx(i => isDeleting ? i - 1 : i + 1),
      isDeleting ? 42 : 88,
    );
    return () => clearTimeout(t);
  }, [charIdx, isDeleting, wordIdx, words]);

  return (
    <div className="flex items-center justify-center gap-2 my-5" style={{ height: 26 }}>
      <span className="text-[#CC1500]/50 font-mono text-sm select-none">{">"}</span>
      <span
        className="font-black uppercase text-white/60 text-[0.82rem] sm:text-[clamp(0.6rem,1vw,0.82rem)]"
        style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "0.38em", minWidth: "1ch" }}
      >
        {words[wordIdx].slice(0, charIdx)}
      </span>
      <span className="cursor-blink text-[#CC1500] font-mono text-sm select-none">_</span>
    </div>
  );
};


// ── Vertical side scroller ─────────────────────────────────────────────────
const SIDE_ITEMS = ["DISEÑO WEB","DESARROLLO","REACT","NEXT.JS","TYPESCRIPT","FIGMA","UI/UX","BRANDING","MOTION","FRONTEND","ARGENTINA"];
const SideScroller = ({ reverse = false, side }: { reverse?: boolean; side: "left" | "right" }) => {
  const triple = [...SIDE_ITEMS, ...SIDE_ITEMS, ...SIDE_ITEMS];
  return (
    <div className="hidden lg:flex absolute top-0 bottom-0 flex-col items-center overflow-hidden pointer-events-none" style={{ [side]: 0, width: 28, zIndex: 5 }}>
      <motion.div className="flex flex-col items-center"
        animate={{ y: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"] }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}>
        {triple.map((item, i) => (
          <span key={i} className="font-black uppercase text-white/[0.07] block"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: 7, letterSpacing: "0.4em", writingMode: "vertical-lr", transform: side === "left" ? "rotate(180deg)" : "none", marginTop: 14, marginBottom: 14 }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ── Highlight mark ─────────────────────────────────────────────────────────
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <mark style={{ background: "rgba(204,21,0,0.28)", color: "#fff", padding: "2px 8px 4px", fontFamily: "Poppins, sans-serif", fontWeight: 600, borderRadius: 0 }}>
    {children}
  </mark>
);

// ── Live time ──────────────────────────────────────────────────────────────
const BuenosAiresTime = () => {
  const [t, setT] = useState("");
  useEffect(() => {
    const update = () => setT(new Date().toLocaleTimeString("es-AR", { timeZone: "America/Argentina/Buenos_Aires", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-white/30 text-[9px] tracking-widest tabular-nums">{t}</span>;
};

// ── Multi-color blobs ──────────────────────────────────────────────────────
const BLOBS = [
  { color: "#CC1500", cls: "blob-1", w: 440, x: "70%",  y: "40%", op: 0.10 },
  { color: "#7C3AED", cls: "blob-2", w: 380, x: "10%",  y: "50%", op: 0.09 },
  { color: "#06B6D4", cls: "blob-1", w: 300, x: "52%",  y: "5%",  op: 0.07 },
  { color: "#D97706", cls: "blob-2", w: 260, x: "32%",  y: "82%", op: 0.07 },
  { color: "#EC4899", cls: "blob-1", w: 220, x: "18%",  y: "15%", op: 0.06 },
];

// ── Floating dots ──────────────────────────────────────────────────────────
const DOTS = [
  { top: "20%", left: "65%", size: 4, delay: 0,   dur: 4.2, color: "#CC1500" },
  { top: "63%", left: "78%", size: 3, delay: 1.2, dur: 5.1, color: "#7C3AED" },
  { top: "38%", left: "87%", size: 5, delay: 0.6, dur: 3.8, color: "#06B6D4" },
  { top: "55%", left: "58%", size: 3, delay: 1.8, dur: 4.6, color: "#D97706" },
  { top: "80%", left: "70%", size: 4, delay: 0.3, dur: 5.5, color: "#EC4899" },
];

// ── Hero proj button with blob hover ──────────────────────────────────────
const BLOB_GRAD = [
  "radial-gradient(ellipse 90% 160% at 8% 50%, rgba(204,21,0,0.50), transparent 55%)",
  "radial-gradient(ellipse 80% 140% at 92% 50%, rgba(124,58,237,0.42), transparent 55%)",
  "radial-gradient(ellipse 60% 110% at 50% -15%, rgba(6,182,212,0.30), transparent 50%)",
  "#ffffff",
].join(", ");

const HeroProjBtn = ({ lang }: { lang: string }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href="#projects"
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileTap={{ scale: 0.97 }}
      className="group relative w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2.5 px-7 py-4 bg-white text-[#0A0A0A] font-black text-[9px] uppercase tracking-[0.3em] overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <span
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: hov ? 1 : 0, background: BLOB_GRAD }}
      />
      <span className="relative z-10 flex items-center gap-2.5">
        {lang === "en" ? "View work" : "Ver proyectos"}
        <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </motion.a>
  );
};

// ── Hero ───────────────────────────────────────────────────────────────────
export const Hero = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";

  // Mouse position for light effect (0-100 range)
  const [lx, setLx] = useState(50);
  const [ly, setLy] = useState(50);

  // Parallax motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

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

  const blobX = useSpring(useTransform(rawX, [-1, 1], [-25, 25]), { stiffness: 25, damping: 25 });
  const blobY = useSpring(useTransform(rawY, [-1, 1], [-25, 25]), { stiffness: 25, damping: 25 });
  const ringX = useSpring(useTransform(rawX, [-1, 1], [-15, 15]), { stiffness: 40, damping: 25 });
  const ringY = useSpring(useTransform(rawY, [-1, 1], [-15, 15]), { stiffness: 40, damping: 25 });
  const dotsX = useSpring(useTransform(rawX, [-1, 1], [-8, 8]),   { stiffness: 60, damping: 25 });
  const dotsY = useSpring(useTransform(rawY, [-1, 1], [-8, 8]),   { stiffness: 60, damping: 25 });

  // ── TEXT LIGHTING: each light source at a fixed position, shifts with cursor ──
  // Purple left, Red right, Cyan top, Amber bottom, Pink top-left
  const line1Gradient = `
    radial-gradient(ellipse 55% 90% at ${10 + lx * 0.10}% ${50 + ly * 0.06}%, rgba(124,58,237,0.95) 0%, transparent 52%),
    radial-gradient(ellipse 60% 80% at ${78 + lx * 0.07}% ${38 + ly * 0.10}%, rgba(204,21,0,0.95) 0%, transparent 52%),
    radial-gradient(ellipse 50% 70% at ${50 + lx * 0.04}% ${2 + ly * 0.15}%,  rgba(6,182,212,0.85) 0%, transparent 45%),
    radial-gradient(ellipse 40% 55% at ${38 - lx * 0.06}% ${90 - ly * 0.08}%, rgba(217,119,6,0.80) 0%, transparent 42%),
    radial-gradient(ellipse 35% 50% at ${15 + lx * 0.05}% ${12 + ly * 0.09}%, rgba(236,72,153,0.75) 0%, transparent 38%),
    linear-gradient(rgba(255,255,255,1), rgba(255,255,255,1))
  `;

  const line2Gradient = `
    radial-gradient(ellipse 55% 90% at ${10 + lx * 0.10}% ${50 + ly * 0.06}%, rgba(180,80,255,0.75) 0%, transparent 50%),
    radial-gradient(ellipse 60% 80% at ${78 + lx * 0.07}% ${38 + ly * 0.10}%, rgba(255,60,20,0.85) 0%, transparent 52%),
    radial-gradient(ellipse 50% 70% at ${50 + lx * 0.04}% ${2 + ly * 0.15}%,  rgba(6,182,212,0.60) 0%, transparent 45%),
    radial-gradient(ellipse 40% 55% at ${38 - lx * 0.06}% ${90 - ly * 0.08}%, rgba(251,146,60,0.65) 0%, transparent 42%),
    linear-gradient(rgba(204,21,0,1), rgba(204,21,0,1))
  `;

  const whatsappUrl = `https://wa.me/5491150403408?text=${encodeURIComponent(
    lang === "en"
      ? "Hi! I saw your portfolio and I'd love to talk about a project I have in mind."
      : "¡Hola! Vi tu portfolio y me gustaría hablar sobre un proyecto que tengo en mente."
  )}`;

  return (
    <>
      <section id="home" className="relative bg-[#0A0A0A] min-h-screen flex flex-col pt-14 overflow-hidden">

        <SideScroller side="left" />
        <SideScroller side="right" reverse />

        {/* ── MULTI-COLOR BLOBS — always visible, parallax only on lg+ ── */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ x: blobX, y: blobY, zIndex: 1 }}>
          {BLOBS.map((blob, i) => (
            <div key={i}
              className={`${blob.cls} absolute blur-3xl`}
              style={{ background: blob.color, width: blob.w, height: blob.w, left: blob.x, top: blob.y, opacity: blob.op, transform: "translate(-50%,-50%)" }}
            />
          ))}
        </motion.div>

        {/* ── RINGS ── */}
        <motion.div className="hidden lg:block absolute pointer-events-none"
          style={{ x: ringX, y: ringY, right: "-8%", top: "50%", translateY: "-50%", zIndex: 2 }}>
          <motion.div style={{ width: "min(55vw,620px)", height: "min(55vw,620px)", border: "1px solid rgba(204,21,0,0.09)", borderRadius: "50%" }}
            animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 90, ease: "linear" }} />
          <motion.div style={{ position: "absolute", inset: "14%", border: "1px solid rgba(124,58,237,0.06)", borderRadius: "50%" }}
            animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }} />
          <motion.div style={{ position: "absolute", inset: "30%", border: "1px solid rgba(6,182,212,0.07)", borderRadius: "50%" }}
            animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }} />
          <div style={{ position: "absolute", inset: "49.6%", background: "#CC1500", borderRadius: "50%" }} />
        </motion.div>

        {/* ── FLOATING DOTS (each its blob color) ── */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ x: dotsX, y: dotsY, zIndex: 3 }}>
          {DOTS.map((dot, i) => (
            <motion.div key={i} className="absolute rounded-full"
              style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, background: dot.color }}
              animate={{ y: [0, -14, 0], opacity: [0.4, 0.75, 0.4] }}
              transition={{ repeat: Infinity, duration: dot.dur, delay: dot.delay, ease: "easeInOut" }} />
          ))}
        </motion.div>

        {/* ── TOP META ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="relative z-10 px-5 sm:px-12 lg:px-16 pt-5 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/35" style={{ fontFamily: "Poppins, sans-serif" }}>
              {lang === "en" ? "Available" : "Disponible"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <BuenosAiresTime />
            <span className="text-white/15 text-[9px]">·</span>
            <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/25" style={{ fontFamily: "Poppins, sans-serif" }}>ARG</span>
          </div>
        </motion.div>

        {/* ── MAIN CONTENT — centered ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-6">

          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38, duration: 0.5 }}
            className="text-white/30 mb-2 mt-10 sm:mt-0 font-mono tracking-widest text-[10px] uppercase">
            {lang === "en" ? "Hello, I'm —" : "Hola, soy —"}
          </motion.p>

          {/* ── MIXED-FONT NAME with LIGHT EFFECT ── */}
          <div className="mb-1 mt-6 sm:mt-0">
            <div className="overflow-hidden">
              <motion.h1 initial={{ y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="block font-black uppercase text-[clamp(2.8rem,17vw,4.5rem)] sm:text-[clamp(3.2rem,12vw,16rem)]"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.84,
                  backgroundImage: line1Gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                GIULIANA
              </motion.h1>
            </div>
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
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mt-4 sm:mt-0">
            <TypewriterWord lang={lang} />
          </motion.div>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ delay: 0.72, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-white/12 my-7 origin-center w-full" style={{ maxWidth: "min(500px,80vw)" }} />

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.82, duration: 0.55 }}
            className="text-white/50 leading-relaxed mb-10 text-[0.72rem] sm:text-[clamp(1rem,1.9vw,1.25rem)]"
            style={{ maxWidth: "min(580px,88vw)" }}>
            {lang === "en" ? (
              <>I design and develop{" "}<Highlight>digital experiences</Highlight>{" "}that are functional, beautiful, and built to convert.</>
            ) : (
              <>Diseño y desarrollo{" "}<Highlight>experiencias digitales</Highlight>{" "}que son funcionales, bellas y pensadas para convertir.</>
            )}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.92, duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 mb-12 w-full sm:w-auto px-2 sm:px-0">
            <HeroProjBtn lang={lang} />
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-white/18 text-white/50 font-black text-[9px] uppercase tracking-[0.3em] hover:border-[#CC1500] hover:text-white transition-all duration-300"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              {lang === "en" ? "Let's talk" : "Hablemos"}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] sm:tracking-[0.45em] text-white/35" style={{ fontFamily: "Poppins, sans-serif" }}>
              {lang === "en" ? "Web Design & Development" : "Diseño & Desarrollo Web"}
            </span>
            <div className="hidden sm:block h-px w-6 bg-white/15" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] sm:tracking-[0.45em] text-white/35" style={{ fontFamily: "Poppins, sans-serif" }}>
              React · Next.js · TypeScript
            </span>
          </motion.div>
        </div>
      </section>
    </>
  );
};
