import { ArrowUpRight, X, Eye, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

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

const BG = "#0F0F11";
const BLOBS = [
  { color: "#CC1500", w: 500, x: "15%", y: "20%", op: 0.04, cls: "blob-1" },
  { color: "#7C3AED", w: 550, x: "85%", y: "50%", op: 0.05, cls: "blob-2" },
  { color: "#06B6D4", w: 450, x: "25%", y: "85%", op: 0.04, cls: "blob-1" },
];

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

/* ── PROCESS OVERLAY (before/after) ──────────────────────────────────────── */
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
        className="fixed inset-0 z-[1100] bg-[#0F0F11] overflow-y-auto scrollbar-hide"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-[1110] w-10 h-10 flex items-center justify-center border border-white/10 bg-white/[0.02] text-white/40 hover:border-[#CC1500] hover:text-white transition-all rounded-lg"
        >
          <X size={17} />
        </button>

        <div className="px-5 sm:px-8 lg:px-10 pt-14 pb-24 max-w-5xl mx-auto">

          {/* ── Header ── */}
          <div className="flex items-center gap-3 mb-12 justify-center">
            <span className="font-mono text-[#CC1500] font-black text-xs uppercase tracking-wider">[PROCESS]</span>
            <span className="text-white/40 text-sm font-semibold uppercase">{project.title}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14 text-center"
          >
            <h2
              className="block font-black uppercase leading-[0.88] text-white"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.5rem, 8vw, 6rem)", letterSpacing: "-0.03em" }}
            >
              {project.title}
            </h2>
            <span
              className="block font-black uppercase text-white/15 leading-none mt-1"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.2rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              {lang === "en" ? "before & after." : "antes & después."}
            </span>
          </motion.div>

          {/* ── Two columns ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* ANTES */}
            <div>
              <h4 className="font-mono text-white/40 font-black text-xs uppercase tracking-wider mb-4 text-center">
                {lang === "en" ? "BEFORE" : "ANTES"}
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {before.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 + idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setLightboxIdx(idx)}
                    className="relative aspect-video bg-white/5 overflow-hidden border border-white/10 cursor-zoom-in hover:border-white/30 transition-all rounded-xl"
                  >
                    <img src={img} className="w-full h-full object-cover" alt="Before" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* DESPUÉS */}
            <div>
              <h4 className="font-mono text-emerald-500 font-black text-xs uppercase tracking-wider mb-4 text-center">
                {lang === "en" ? "AFTER" : "DESPUÉS"}
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {after.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.15 + idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setLightboxIdx(3 + idx)}
                    className="relative aspect-video bg-white/5 overflow-hidden border border-[#CC1500]/25 cursor-zoom-in hover:border-[#CC1500]/60 transition-all rounded-xl"
                  >
                    <img src={img} className="w-full h-full object-cover" alt="After" />
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
            <button className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-lg"><X size={20} /></button>
            <button onClick={prev} className="absolute left-4 md:left-8 w-11 h-11 flex items-center justify-center border border-white/8 hover:bg-white/10 text-white z-10 rounded-full"><ChevronLeft size={26} /></button>
            <button onClick={next} className="absolute right-4 md:right-8 w-11 h-11 flex items-center justify-center border border-white/8 hover:bg-white/10 text-white z-10 rounded-full"><ChevronRight size={26} /></button>
            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
              className="relative max-w-5xl w-full overflow-hidden border border-white/8 rounded-xl"
              onClick={e => e.stopPropagation()}
            >
              <img src={all[lightboxIdx]} className="w-full h-auto object-contain" alt="" />
              <div className="absolute bottom-4 left-4">
                <span
                  className={`px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-black border rounded ${lightboxIdx < 3 ? "bg-white/5 border-white/10 text-white/50" : "bg-[#CC1500] border-[#CC1500] text-white"}`}
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
  const blobY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const [hoveredId,  setHoveredId]  = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [processId,  setProcessId]  = useState<string | null>(null);
  const [showAll,    setShowAll]    = useState(false);

  const VISIBLE_COUNT = 6;

  const rawData = [
    { id: "nido", image: "./nido-mockup.png", liveUrl: "https://nidoapp.online", stack: ["Angular", ".NET 9", "C#", "PostgreSQL", "Clean Architecture", "OCR", "IA"] },
    { id: "hidrorescate",   image: "./hidrorescate-laptop.jpeg", liveUrl: "https://hidrorescate.com.ar/",         stack: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
    { id: "magicalduo",     image: "./magicalduo-mockup.png",    liveUrl: "https://themagicalduo.com/",           stack: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
    { id: "pulseguard",     image: "./pulseguard.png",   liveUrl: "https://pulseguard-frontend.vercel.app/",     stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Gemini AI"] },
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

  const visible      = showAll ? projects : projects.slice(0, VISIBLE_COUNT);
  const selected      = projects.find(p => p.id === selectedId);
  const processProj   = projects.find(p => p.id === processId);

  useEffect(() => {
    const locked = selectedId !== null || processId !== null;
    document.body.style.overflow = locked ? "hidden" : "unset";
    const nav = document.querySelector("nav") as HTMLElement | null;
    if (nav) nav.style.opacity = locked ? "0" : "1";
  }, [selectedId, processId]);

  return (
    <section ref={ref} id="projects" className="pt-14 md:pt-20 pb-20 md:pb-28 px-5 sm:px-8 lg:px-10 relative overflow-hidden" style={{ background: BG }}>

      {/* Edge fade top */}
      <div className="absolute inset-x-0 top-0 h-24 pointer-events-none z-10"
        style={{ background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-10"
        style={{ background: `linear-gradient(to top, ${BG}, transparent)` }} />

      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0" style={{ y: blobY }}>
          {BLOBS.map((b, i) => (
            <div key={i} className={`${b.cls} absolute blur-3xl`}
              style={{ background: b.color, width: b.w, height: b.w, left: b.x, top: b.y, opacity: b.op, transform: "translate(-50%,-50%)" }} />
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-20">

        {/* Label */}
        <div className="flex items-center gap-5 mb-14 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 font-mono text-[9px] text-[#CC1500] uppercase tracking-[0.25em]">
            <span>05</span>
            <span>//</span>
            <span>{t("projects.subtitle")}</span>
          </div>
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20" style={{ fontFamily: "Poppins, sans-serif" }}>{t("projects.subtitle")}</span>
        </div>

        {/* Title — stroke + solid, matching the Profesional pattern */}
        <div className="mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block font-black uppercase leading-[0.88]"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.3rem, 6vw, 5.5rem)", letterSpacing: "-0.02em" }}
          >
            <span className="mr-3" style={{ WebkitTextStroke: "1.2px rgba(255,255,255,0.9)", WebkitTextFillColor: "transparent", color: "transparent" }}>
              {lang === "en" ? "MY" : "MI"}
            </span>
            <span className="text-white">
              {lang === "en" ? "WORK." : "TRABAJO."}
            </span>
          </motion.h2>
        </div>

        {/* ── PROJECT GRID: package cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              const isHov = hoveredId === p.id;

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-40px" }}
                  onHoverStart={() => setHoveredId(p.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => setSelectedId(p.id)}
                  className="group relative border border-white/[0.08] hover:border-[#CC1500]/40 bg-white/[0.01] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer select-none"
                >
                  {/* Card header (PKG bar) */}
                  <div className="bg-white/[0.02] border-b border-white/[0.06] px-4 py-2.5 flex items-center justify-between font-mono text-[9px] text-white/40 uppercase tracking-wider shrink-0 select-none">
                    <span className="text-[#CC1500] font-bold">[PKG-{String(i + 1).padStart(2, "0")}]</span>
                    <span className="text-emerald-500 font-bold tracking-widest">{lang === "en" ? "LIVE" : "COMPLETO"}</span>
                  </div>

                  {/* Media */}
                  <div className="relative aspect-[16/10] bg-[#0A0A0A] overflow-hidden shrink-0 border-b border-white/[0.04]">
                    <motion.div className="w-full h-full" animate={{ scale: isHov ? 1.03 : 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                      {p.video
                        ? <AutoplayVideo src={p.video} className="w-full h-full object-cover" />
                        : p.image
                          ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                          : <div className="w-full h-full" style={{ background: `radial-gradient(ellipse 65% 80% at 28% 40%, #CC150030 0%, transparent 62%), #0A0A0A` }} />
                      }
                    </motion.div>
                    <div className="absolute inset-0 bg-[#0A0A0A]/20 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
                  </div>

                  {/* Tech-spec table */}
                  <div className="p-4 flex-1 flex flex-col justify-between font-mono text-[10px]">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-baseline py-1 border-b border-white/[0.04]">
                        <span className="text-white/30 uppercase text-[9px]">NAME</span>
                        <span className="text-white/80 font-bold tracking-wide truncate max-w-[65%]" style={{ fontFamily: "Poppins, sans-serif" }}>{p.title}</span>
                      </div>
                      <div className="flex justify-between items-baseline py-1 border-b border-white/[0.04]">
                        <span className="text-white/30 uppercase text-[9px]">SCOPE</span>
                        <span className="text-white/60 uppercase text-[9px] tracking-wider truncate max-w-[65%] text-right">{p.category}</span>
                      </div>
                      <div className="flex justify-between items-baseline py-1">
                        <span className="text-white/30 uppercase text-[9px]">STACK</span>
                        <span className="text-white/60 truncate max-w-[65%] text-right">{p.stack.slice(0, 3).join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.04] text-[8.5px] text-[#CC1500]/70 font-bold tracking-wider justify-end">
                      <span>{lang === "en" ? "VIEW DETAILS" : "VER DETALLES"}</span>
                      <ArrowUpRight size={10} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Show more / less */}
        {projects.length > VISIBLE_COUNT && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex justify-center"
          >
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="flex items-center gap-2.5 px-7 py-3.5 border border-white/10 text-white/40 hover:border-[#CC1500] hover:text-[#CC1500] transition-all duration-300 rounded-full"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.25em]">
                {showAll
                  ? (lang === "en" ? "Show less" : "Ver menos")
                  : (lang === "en" ? `Show more · ${projects.length - VISIBLE_COUNT} more` : `Ver más · ${projects.length - VISIBLE_COUNT} más`)}
              </span>
              <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={11} />
              </motion.span>
            </button>
          </motion.div>
        )}
      </div>

      {/* ── SLIDE-OUT SIDE DRAWER (project detail) ── */}
      <AnimatePresence>
        {selectedId && selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm pointer-events-auto"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[1001] w-full max-w-xl sm:max-w-2xl bg-[#0F0F11] border-l border-white/10 flex flex-col shadow-2xl pointer-events-auto overflow-hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/[0.08] shrink-0 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#CC1500] font-black uppercase text-[10px] tracking-widest">
                    [PKG-{String(projects.indexOf(selected) + 1).padStart(2, "0")}]
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="font-mono text-white/40 uppercase text-[9px] tracking-widest">{selected.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  {selected.process && (
                    <button
                      onClick={() => { setSelectedId(null); setProcessId(selected.id); }}
                      className="flex items-center gap-2 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border border-[#CC1500]/30 text-[#CC1500] hover:bg-[#CC1500] hover:text-white transition-all rounded-full"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <Eye size={11} /> {lang === "en" ? "Process" : "Proceso"}
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedId(null)}
                    className="w-8 h-8 flex items-center justify-center border border-white/10 bg-white/[0.02] text-white/40 hover:border-[#CC1500] hover:text-white transition-all rounded-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-6 md:p-8 flex flex-col gap-6">

                <div className="relative aspect-[16/10] bg-[#0A0A0A] overflow-hidden rounded-xl border border-white/[0.06] shrink-0">
                  {selected.video
                    ? <AutoplayVideo src={selected.video} className="w-full h-full object-cover" />
                    : selected.image
                      ? <img src={selected.image} className="w-full h-full object-cover" alt={selected.title} />
                      : <div className="w-full h-full" style={{ background: `radial-gradient(ellipse 80% 80% at 35% 45%, #CC150045 0%, transparent 60%), #0A0A0A` }} />
                  }
                </div>

                <div className="flex flex-col gap-3">
                  <h2
                    className="font-black uppercase tracking-tight text-white leading-none"
                    style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", letterSpacing: "-0.02em" }}
                  >
                    {selected.title}
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xl pt-2">{selected.longDescription}</p>
                </div>

                <div className="flex flex-col gap-6 pt-6 border-t border-white/[0.08]">
                  <div className="flex flex-col gap-2 bg-white/[0.01] border border-white/[0.06] p-5 rounded-xl font-mono text-xs">
                    <div className="flex justify-between items-baseline py-1.5 border-b border-white/[0.04]">
                      <span className="text-white/30 uppercase text-[9px]">PACKAGE CODE</span>
                      <span className="text-[#CC1500] font-black uppercase text-[10px]">[PKG-{String(projects.indexOf(selected) + 1).padStart(2, "0")}]</span>
                    </div>
                    <div className="flex justify-between items-baseline py-1.5 border-b border-white/[0.04]">
                      <span className="text-white/30 uppercase text-[9px]">CLASSIFICATION</span>
                      <span className="text-white/70 uppercase">{selected.category}</span>
                    </div>
                    <div className="flex justify-between items-baseline py-1.5 last:border-0 last:pb-0">
                      <span className="text-white/30 uppercase text-[9px]">DEPLOYMENT</span>
                      <span className="text-emerald-500 font-bold uppercase">VERCEL_PROD</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white/30 text-[9px] uppercase tracking-[0.25em] font-bold mb-3 font-mono">SPECIFICATION STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.stack.map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-white/5 text-[9px] text-white/50 font-black uppercase border border-white/5 flex items-center gap-2 rounded-full font-mono">
                          <div className="w-1 h-1 rounded-full bg-[#CC1500]" /> {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {selected.liveUrl && (
                      <a href={selected.liveUrl} target="_blank" rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-3 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-[#CC1500] hover:text-white transition-all group rounded-lg"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {lang === "en" ? "Visit site" : "Ver sitio"}
                        <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
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
