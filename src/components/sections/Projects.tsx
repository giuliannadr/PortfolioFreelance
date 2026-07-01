import { ArrowUpRight, X, Eye, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SPOTS_DARK } from "@/lib/textGradients";

// iOS Safari + Android autoplay: the HTML attributes autoplay+muted+playsinline
// are natively respected. The only React-specific fix needed is forcing muted=true
// on the real DOM node via a callback ref (React doesn't apply the muted prop correctly).
const AutoplayVideo = ({ src, className }: { src: string; className?: string }) => (
  <video
    ref={(el) => { if (el) el.muted = true; }}
    src={src}
    muted
    loop
    playsInline
    autoPlay
    className={className}
  />
);

const BG = "#ffffff";
const BLOBS = [
  { color: "#CC1500", w: 420, x: "90%", y: "20%", op: 0.06, cls: "blob-1" },
  { color: "#7C3AED", w: 360, x: "5%",  y: "65%", op: 0.05, cls: "blob-2" },
  { color: "#D97706", w: 260, x: "55%", y: "90%", op: 0.04, cls: "blob-1" },
];
const headGrad = SPOTS_DARK; // usado en el modal (fondo oscuro)
const ACCENTS  = ["#CC1500", "#7C3AED", "#06B6D4", "#EC4899", "#D4A017"];

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image?: string;
  video?: string;
  liveUrl?: string;
  stack: string[];
  process?: string[];
}

/* ── PROCESS OVERLAY ──────────────────────────────────────── */
const ProcessOverlay = ({
  project, lang, onClose,
}: { project: Project; lang: string; onClose: () => void }) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const before = project.process?.slice(0, 3) ?? [];
  const after  = project.process?.slice(3)    ?? [];
  const all    = project.process ?? [];

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) setLightboxIdx((lightboxIdx - 1 + all.length) % all.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) setLightboxIdx((lightboxIdx + 1) % all.length);
  };

  return (
    <>
      <motion.div
        key="process-overlay"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[1100] bg-[#0A0A0A] overflow-y-auto scrollbar-hide"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-[1110] w-10 h-10 flex items-center justify-center border border-white/10 bg-[#0A0A0A] text-white/40 hover:border-[#CC1500] hover:text-white transition-all"
        >
          <X size={17} />
        </button>

        <div className="px-5 sm:px-8 lg:px-10 pt-14 pb-24">

          {/* ── Header ── */}
          <div className="flex items-center gap-5 mb-12 border-b border-white/[0.06] pb-7">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20" style={{ fontFamily: "Poppins, sans-serif" }}>01</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20" style={{ fontFamily: "Poppins, sans-serif" }}>
              {lang === "en" ? "Process" : "Proceso"}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <h2
              className="block font-black uppercase leading-[0.88]"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.03em", backgroundImage: headGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              {project.title}
            </h2>
            <span
              className="block font-serif italic font-light text-white/20 leading-none mt-1"
              style={{ fontSize: "clamp(1.8rem, 5vw, 4.5rem)" }}
            >
              {lang === "en" ? "before & after." : "antes & después."}
            </span>
          </motion.div>

          {/* ── Two columns ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">

            {/* ANTES */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {lang === "en" ? "Before" : "Antes"}
                </span>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </motion.div>

              <div className="grid grid-cols-2 gap-2">
                {before.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.22 + idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setLightboxIdx(idx)}
                    className={`group relative overflow-hidden bg-zinc-900 cursor-zoom-in ${idx === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
                  >
                    <img src={img} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" alt="" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/40 text-[9px] uppercase tracking-widest font-black" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {idx + 1} / {before.length}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* DESPUÉS */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="text-[9px] font-black uppercase tracking-[0.5em]" style={{ fontFamily: "Poppins, sans-serif", color: "#CC1500" }}>
                  {lang === "en" ? "After" : "Después"}
                </span>
                <div className="h-px flex-1" style={{ background: "rgba(204,21,0,0.18)" }} />
              </motion.div>

              <div className="grid grid-cols-2 gap-2">
                {after.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.28 + idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setLightboxIdx(3 + idx)}
                    className={`group relative overflow-hidden bg-zinc-900 cursor-zoom-in ${idx === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
                  >
                    <img src={img} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" alt="" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    {/* red accent top line */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.35 + idx * 0.09 }}
                      style={{ background: "#CC1500" }}
                    />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 bg-[#CC1500] text-white text-[9px] uppercase tracking-widest font-black" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {idx + 1} / {after.length}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1200] bg-black/97 backdrop-blur-2xl flex items-center justify-center p-4 md:p-14"
            onClick={() => setLightboxIdx(null)}
          >
            <button className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 text-white hover:bg-white/10"><X size={20} /></button>
            <button onClick={prev} className="absolute left-4 md:left-8 w-11 h-11 flex items-center justify-center border border-white/8 hover:bg-white/10 text-white z-10"><ChevronLeft size={26} /></button>
            <button onClick={next} className="absolute right-4 md:right-8 w-11 h-11 flex items-center justify-center border border-white/8 hover:bg-white/10 text-white z-10"><ChevronRight size={26} /></button>
            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
              className="relative max-w-5xl w-full overflow-hidden border border-white/8"
              onClick={e => e.stopPropagation()}
            >
              <img src={all[lightboxIdx]} className="w-full h-auto object-contain" alt="" />
              <div className="absolute bottom-4 left-4">
                <span
                  className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-black border ${lightboxIdx < 3 ? "bg-white/5 border-white/10 text-white/50" : "bg-[#CC1500] border-[#CC1500] text-white"}`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {lightboxIdx < 3
                    ? (lang === "en" ? "Before" : "Antes")
                    : (lang === "en" ? "After" : "Después")}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ── MAIN COMPONENT ───────────────────────────────────────── */
export const Projects = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const ref  = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  const [hoveredId,  setHoveredId]  = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [processId,  setProcessId]  = useState<string | null>(null);
  const [expanded,   setExpanded]   = useState(false);

  const rawData = [
    { id: "hidrorescate",   image: "./hidrorescate-laptop.jpeg", liveUrl: "https://hidrorescate.com.ar/",         stack: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
    { id: "magicalduo",     image: "./magicalduo-mockup.png",    liveUrl: "https://themagicalduo.com/",           stack: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
    { id: "pulseguard",     image: "./pulseguard.png",   liveUrl: "https://pulseguard-frontend.vercel.app/",     stack: ["Next.js", "TypeScript", "Tailwind CSS"] },
    { id: "muda",           image: "./muda-mockup.jpg",  liveUrl: "https://mudaagcy.com/",                       stack: ["React", "TypeScript", "Vite", "Supabase", "Cloudinary", "Vercel"] },
    { id: "emme",           image: "./emme-mockup.webp", liveUrl: "https://www.emmedigital.com.ar/",              stack: ["React.js", "TypeScript", "Framer Motion"] },
    { id: "unik",           image: "./unik-mockup.webp", liveUrl: "https://unik-kappa.vercel.app/",               stack: ["Next.js 15", "TypeScript", "Framer Motion"], process: ["./antes1.png","./antes2.png","./antes3.png","./despues1.png","./despues2.png","./despues3.png"] },
    { id: "la-quinta-miri", image: "./miri-mockup.webp", liveUrl: "https://laquintamiri.vercel.app/",            stack: ["React.js", "TypeScript", "EmailJS"] },
    { id: "inv-boda", image: "./boda.webp", liveUrl: "https://invitacion-muestra.vercel.app/",      stack: ["React.js", "Framer Motion", "Vite"] },
    { id: "inv-xv",   image: "./xv.webp",   liveUrl: "https://invitacion-xv-muestra.vercel.app/",   stack: ["React.js", "Framer Motion", "Vite"] },
  ];

  const projects: Project[] = rawData.map(p => {
    const key = p.id === "la-quinta-miri" ? "miri"
      : p.id === "inv-xv"   ? "invXv"
      : p.id === "inv-boda" ? "invBoda"
      : p.id;
    return {
      ...p,
      title:           t(`projects.items.${key}.title`),
      category:        t(`projects.items.${key}.category`),
      description:     t(`projects.items.${key}.description`),
      longDescription: t(`projects.items.${key}.longDescription`),
    } as Project;
  });

  const visibleProjects = expanded ? projects : projects.slice(0, 2);
  const selected      = projects.find(p => p.id === selectedId);
  const processProj   = projects.find(p => p.id === processId);

  useEffect(() => {
    const locked = selectedId !== null || processId !== null;
    document.body.style.overflow = locked ? "hidden" : "unset";
    const nav = document.querySelector("nav") as HTMLElement | null;
    if (nav) nav.style.opacity = locked ? "0" : "1";
  }, [selectedId, processId]);

  return (
    <section ref={ref} id="projects" className="bg-white pt-14 md:pt-20 pb-20 md:pb-28 px-5 sm:px-8 lg:px-10 relative overflow-hidden">

      {/* Edge fade top */}
      <div className="absolute inset-x-0 top-0 h-24 pointer-events-none z-10"
        style={{ background: `linear-gradient(to bottom, ${BG}, transparent)` }} />

      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0" style={{ y: blobY }}>
          {BLOBS.map((b, i) => (
            <div key={i} className={`${b.cls} absolute blur-3xl`}
              style={{ background: b.color, width: b.w, height: b.w, left: b.x, top: b.y, opacity: b.op, transform: "translate(-50%,-50%)" }} />
          ))}
        </motion.div>
      </div>

      {/* Label */}
      <div className="flex items-center gap-5 mb-14 relative z-20 border-b border-[#0A0A0A]/8 pb-8">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0A0A0A]/25" style={{ fontFamily: "Poppins, sans-serif" }}>05</span>
        <div className="h-px flex-1 bg-[#0A0A0A]/8" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0A0A0A]/25" style={{ fontFamily: "Poppins, sans-serif" }}>{t("projects.subtitle")}</span>
      </div>

      {/* Title */}
      <div className="mb-10 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block font-black uppercase leading-[0.88]"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(3rem, 9vw, 7.5rem)", letterSpacing: "-0.03em", color: "#0A0A0A" }}
        >
          {lang === "en" ? "My work." : "Mi trabajo."}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-serif italic font-light leading-[1.1]"
          style={{ fontSize: "clamp(1.8rem, 5vw, 4.5rem)", backgroundImage: "linear-gradient(110deg, #CC1500 0%, #ff4422 55%, #ff7744 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {lang === "en" ? "selected." : "seleccionado."}
        </motion.h2>
      </div>

      {/* ── PROJECT GRID: 1 col mobile · 2 col desktop ── */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-3">
        {visibleProjects.map((p, i) => {
          const accent  = ACCENTS[i % ACCENTS.length];
          const isLast  = i === visibleProjects.length - 1 && visibleProjects.length % 2 !== 0;
          const isHov   = hoveredId === p.id;

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setHoveredId(p.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => setSelectedId(p.id)}
              className={`group relative overflow-hidden cursor-pointer bg-[#0A0A0A] aspect-[16/9]${isLast ? " md:col-span-2 md:aspect-[32/9]" : ""}`}
            >
              {/* media */}
              <motion.div
                className="absolute inset-0"
                animate={{ scale: isHov ? 1.05 : 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {p.video
                  ? <AutoplayVideo src={p.video} className="w-full h-full object-cover" />
                  : p.image
                    ? <img src={p.image} alt="" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
                    : <div className="w-full h-full" style={{
                        background: `radial-gradient(ellipse 65% 80% at 28% 40%, ${accent}45 0%, transparent 62%),
                                     radial-gradient(ellipse 45% 55% at 72% 68%, ${accent}22 0%, transparent 55%),
                                     #0A0A0A`
                      }} />
                }
              </motion.div>

              {/* dark overlay */}
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: isHov ? 0.4 : 0.55 }}
                transition={{ duration: 0.4 }}
                style={{ background: "#0A0A0A" }}
              />

              {/* bottom gradient */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.25) 50%, transparent 100%)" }} />

              {/* accent top line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] origin-left z-10"
                animate={{ scaleX: isHov ? 1 : 0, opacity: isHov ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: accent }}
              />

              {/* number + category */}
              <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between z-10">
                <motion.span
                  animate={{ color: isHov ? accent : "rgba(255,255,255,0.35)" }}
                  transition={{ duration: 0.3 }}
                  className="font-black"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "0.58rem", letterSpacing: "0.18em" }}
                >
                  0{i + 1}
                </motion.span>
                <motion.span
                  animate={{ opacity: isHov ? 0.6 : 0.3 }}
                  transition={{ duration: 0.3 }}
                  className="text-[9px] font-black uppercase tracking-[0.3em] text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {p.category}
                </motion.span>
              </div>

              {/* ── Bottom content: desc expands above title on hover ── */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 z-10">

                {/* Extra (desc + buttons) — height 0→auto, pushes title up */}
                <AnimatePresence>
                  {isHov && (
                    <motion.div
                      key={`extra-${p.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-3">{p.description}</p>
                      <div className="flex items-center gap-3 mb-4">
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-[#CC1500] hover:text-white transition-all"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {lang === "en" ? "Visit site" : "Ver sitio"}
                            <ArrowUpRight size={11} />
                          </a>
                        )}
                        {p.process && (
                          <button
                            onClick={e => { e.stopPropagation(); setProcessId(p.id); }}
                            className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white/60 font-black text-[10px] uppercase tracking-widest hover:border-white/50 hover:text-white transition-all"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            <Eye size={11} />
                            {lang === "en" ? "Process" : "Proceso"}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Title — always visible, sits at bottom edge */}
                <h3
                  className="font-black tracking-tighter italic leading-none text-white"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.5rem, 2.8vw, 2.8rem)" }}
                >
                  {p.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Show More / Show Less Button */}
      <div className="flex justify-center mt-12 relative z-20">
        <button
          onClick={() => setExpanded(!expanded)}
          className="group flex items-center gap-2 px-8 py-4 bg-transparent border border-[#0A0A0A]/10 hover:border-[#CC1500] hover:text-[#CC1500] text-[#0A0A0A] font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-300"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {expanded 
            ? (lang === "en" ? "Show less" : "Ver menos")
            : (lang === "en" ? "Show more" : "Ver más")}
          {expanded ? <ChevronUp size={12} className="transition-transform group-hover:-translate-y-0.5" /> : <ChevronDown size={12} className="transition-transform group-hover:translate-y-0.5" />}
        </button>
      </div>

      {/* ── MODAL (project detail) ── */}
      <AnimatePresence>
        {selectedId && selected && (
          <>
            {/* Backdrop — independent fixed element, covers full viewport */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-[1000] bg-[#0A0A0A]/96 backdrop-blur-xl"
            />

            {/* Modal panel — centered flex container, no padding that clips backdrop */}
            <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1,    y: 0 }}
                exit={{ opacity: 0,  scale: 0.97,   y: 16 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="relative w-full max-w-5xl bg-[#111] border border-white/8 pointer-events-auto overflow-hidden max-h-[90vh] flex flex-col"
              >
                {/* Sticky modal header with close button — always visible, never scrolls away */}
                <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/[0.06] shrink-0">
                  <span
                    className="text-[#CC1500] font-black uppercase tracking-[0.4em] text-[10px]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {selected.category}
                  </span>
                  <div className="flex items-center gap-3">
                    {selected.process && (
                      <button
                        onClick={() => { setSelectedId(null); setProcessId(selected.id); }}
                        className="flex items-center gap-2 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border border-[#CC1500]/30 text-[#CC1500] hover:bg-[#CC1500] hover:text-white transition-all"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <Eye size={11} /> {lang === "en" ? "Process" : "Proceso"}
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedId(null)}
                      className="w-9 h-9 flex items-center justify-center border border-white/10 bg-white/[0.03] text-white/40 hover:border-[#CC1500] hover:text-white transition-all"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto scrollbar-hide flex-1">
                  <div className="flex flex-col lg:flex-row min-h-[420px]">
                    {/* media */}
                    <div className="relative lg:w-1/2 min-h-[260px] bg-[#0c0c0c] hidden lg:block">
                      {selected.video
                        ? <AutoplayVideo src={selected.video} className="w-full h-full object-cover" />
                        : selected.image
                          ? <img src={selected.image} className="w-full h-full object-cover" alt="" />
                          : (() => {
                              const idx = projects.findIndex(p => p.id === selected.id);
                              const ac = ACCENTS[idx] ?? "#CC1500";
                              return <div className="w-full h-full" style={{
                                background: `radial-gradient(ellipse 80% 80% at 35% 45%, ${ac}45 0%, transparent 60%),
                                             radial-gradient(ellipse 60% 60% at 70% 65%, ${ac}20 0%, transparent 55%),
                                             #0A0A0A`
                              }} />;
                            })()
                      }
                    </div>

                    {/* info */}
                    <motion.div
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                      className="lg:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-[#111]"
                    >
                      <h2
                        className="font-black tracking-tighter italic leading-[0.88] text-white mb-6"
                        style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                      >
                        {selected.title}
                      </h2>

                      <p className="text-white/50 text-base font-light leading-relaxed mb-8 max-w-md">{selected.longDescription}</p>

                      <div className="space-y-7">
                        <div>
                          <h4 className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-black mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {selected.stack.map(tech => (
                              <span key={tech} className="px-4 py-2 bg-white/5 text-[10px] text-white/40 font-black uppercase border border-white/5 flex items-center gap-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                                <div className="w-1 h-1 bg-[#CC1500]" /> {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        {selected.liveUrl && (
                          <a
                            href={selected.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-3 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-[#CC1500] hover:text-white transition-all group"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {lang === "en" ? "Visit site" : "Ver sitio"}
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ── PROCESS OVERLAY ── */}
      <AnimatePresence>
        {processId && processProj && (
          <ProcessOverlay
            project={processProj}
            lang={lang}
            onClose={() => setProcessId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
