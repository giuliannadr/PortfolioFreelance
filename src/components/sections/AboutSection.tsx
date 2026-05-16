import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SPOTS_DARK } from "@/lib/textGradients";

const BLOBS = [
  { color: "#CC1500", w: 480, x: "88%", y: "28%", op: 0.09, cls: "blob-1" },
  { color: "#7C3AED", w: 360, x: "4%",  y: "66%", op: 0.07, cls: "blob-2" },
  { color: "#EC4899", w: 260, x: "46%", y: "95%", op: 0.05, cls: "blob-1" },
];

const PILLARS = [
  { num: "01", color: "#CC1500", es: { title: "Diseño que vende", body: "No diseño para que quede bonito. Diseño para que tus clientes digan que sí. Cada decisión visual tiene un propósito concreto." }, en: { title: "Design that sells", body: "I don't design to look pretty. I design so your clients say yes. Every visual decision has a concrete purpose." } },
  { num: "02", color: "#7C3AED", es: { title: "Atención directa", body: "Hablás conmigo, no con un equipo que no conoce tu negocio. Entiendo tu idea a la primera y la ejecuto con precisión." }, en: { title: "Direct attention", body: "You talk to me, not a team that doesn't know your business. I understand your idea first time, every time." } },
  { num: "03", color: "#06B6D4", es: { title: "Entrego en tiempo", body: "Me comprometo con fechas reales y las cumplo. Sin excusas, sin desapariciones. Tu proyecto tiene la misma prioridad que el mío." }, en: { title: "I deliver on time", body: "I commit to real deadlines and I meet them. No excuses, no ghosting. Your project is my top priority." } },
];

export const AboutSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const headGrad   = SPOTS_DARK;
  const italicGrad = "linear-gradient(110deg, #ff4422 0%, #CC1500 45%, #ff7755 100%)";

  const headline = lang === "en" ? "Why work" : "Por qué trabajar";
  const italic   = lang === "en" ? "with me?" : "conmigo.";
  const badge    = lang === "en" ? "Why me" : "Por qué yo";
  const quote    = lang === "en"
    ? "I treat every project like it's my own."
    : "Me involucro como si el proyecto fuera mío.";

  return (
    <section ref={ref} id="about" className="bg-[#0A0A0A] text-white py-20 md:py-32 px-5 sm:px-8 lg:px-10 relative">

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, #0A0A0A, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10" style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }} />

      {/* Blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: blobY }}>
        {BLOBS.map((b, i) => (
          <div key={i} className={`${b.cls} absolute blur-3xl`}
            style={{ background: b.color, width: b.w, height: b.w, left: b.x, top: b.y, opacity: b.op, transform: "translate(-50%,-50%)" }} />
        ))}
      </motion.div>

      {/* Label */}
      <div className="flex items-center gap-5 mb-14 relative z-10">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25" style={{ fontFamily: "Poppins, sans-serif" }}>02</span>
        <div className="h-px flex-1 bg-white/[0.07]" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25" style={{ fontFamily: "Poppins, sans-serif" }}>{badge}</span>
      </div>

      {/* Headline */}
      <div className="mb-14 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block font-black uppercase leading-[0.88]"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.5rem, 6vw, 6.5rem)", letterSpacing: "-0.03em", backgroundImage: headGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {headline}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-serif italic font-light leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 5.5rem)", backgroundImage: italicGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {italic}
        </motion.h2>
      </div>

      {/* Photo + Quote + Identity — centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex justify-center mb-14"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-8">
          {/* Circular photo */}
          <div className="relative shrink-0">
            <div
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden"
              style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.08), 0 0 0 4px rgba(204,21,0,0.25)" }}
            >
              <img
                src="/giuli-profile.jpeg?v=2"
                alt="Giuliana Di Rocco"
                className="w-full h-full object-cover object-center"
                style={{ filter: "contrast(1.08) saturate(1.1) brightness(1.02)" }}
              />
            </div>
            {/* Availability dot */}
            <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#0A0A0A] flex items-center justify-center" style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.08)" }}>
              <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Quote + identity stacked */}
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <p
              className="font-serif italic text-white/60 leading-snug"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)" }}
            >
              "{quote}"
            </p>
            {/* Identity — right below the quote */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1">
              <span className="font-black text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                Giuliana Di Rocco
              </span>
              <span className="text-white/15">·</span>
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30" style={{ fontFamily: "Poppins, sans-serif" }}>
                {lang === "en" ? "Web Dev Tech. · UNLAM" : "Tec. Desarrollo Web · UNLAM"}
              </span>
              <span className="text-white/15">·</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {lang === "en" ? "Available" : "Disponible"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pillars — side by side */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
        {PILLARS.map((p, i) => {
          const c = lang === "en" ? p.en : p.es;
          return (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 md:px-8 first:md:pl-0 last:md:pr-0"
            >
              {/* Top accent bar */}
              <motion.div
                className="h-[2px] w-8 mb-6 origin-left"
                style={{ background: p.color }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              />
              <span className="block font-black mb-3 leading-none" style={{ fontFamily: "Poppins, sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", color: p.color }}>{p.num}</span>
              <h3 className="font-black uppercase leading-none text-white mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1rem, 2vw, 1.35rem)", letterSpacing: "-0.02em" }}>{c.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{c.body}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
