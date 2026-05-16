import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

// ── Comparison data ───────────────────────────────────────────────────────────
const ROWS = [
  {
    es: {
      template: "Diseño genérico, igual al de miles de sitios",
      code:     "100% único — diseñado solo para tu marca",
    },
    en: {
      template: "Generic design, same as thousands of others",
      code:     "100% unique — designed only for your brand",
    },
  },
  {
    es: {
      template: "Funciones limitadas a las que la plataforma permite",
      code:     "Cualquier función que puedas imaginar",
    },
    en: {
      template: "Functions limited to what the platform allows",
      code:     "Any feature you can imagine",
    },
  },
  {
    es: {
      template: "Carga lenta por código excesivo e innecesario",
      code:     "Rendimiento optimizado al máximo desde el día uno",
    },
    en: {
      template: "Slow loading from bloated, unnecessary code",
      code:     "Maximum performance, optimized from day one",
    },
  },
  {
    es: {
      template: "SEO básico, poco configurable y con techo bajo",
      code:     "SEO técnico real, profundo y sin limitaciones",
    },
    en: {
      template: "Basic SEO, barely configurable with a low ceiling",
      code:     "Real, deep technical SEO without limitations",
    },
  },
  {
    es: {
      template: "Pago mensual eterno — nunca es realmente tuya",
      code:     "Pagás una vez — es tuya para siempre",
    },
    en: {
      template: "Eternal monthly fee — never truly yours",
      code:     "Pay once — yours forever",
    },
  },
  {
    es: {
      template: "Dependés de la plataforma: si cierra, tu web desaparece",
      code:     "Vos controlás todo — sin intermediarios, sin riesgos",
    },
    en: {
      template: "Platform-dependent: if it closes, your site disappears",
      code:     "You control everything — no middlemen, no risks",
    },
  },
];

// ── Row item ──────────────────────────────────────────────────────────────────
const CompareRow = ({
  row, index, lang, side,
}: {
  row: typeof ROWS[0];
  index: number;
  lang: string;
  side: "template" | "code";
}) => {
  const text  = lang === "en" ? row.en[side] : row.es[side];
  const isCode = side === "code";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.07 + (isCode ? 0.04 : 0), ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-3 py-3.5 border-b last:border-b-0"
      style={{ borderColor: isCode ? "rgba(204,21,0,0.12)" : "rgba(255,255,255,0.04)" }}
    >
      <span
        className="shrink-0 mt-0.5 text-[11px] font-black w-4 text-center leading-none"
        style={{ color: isCode ? "#CC1500" : "rgba(255,255,255,0.18)", fontFamily: "Poppins, sans-serif" }}
      >
        {isCode ? "→" : "×"}
      </span>
      <p
        className="text-sm leading-snug"
        style={{ color: isCode ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.22)" }}
      >
        {text}
      </p>
    </motion.div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
export const WhyCodeSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const ref  = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const headGrad   = "linear-gradient(118deg, #CC1500 0%, #ffffff 30%, #7C3AED 65%, #06B6D4 100%)";
  const italicGrad = "linear-gradient(110deg, #CC1500 0%, #b01000 50%, #ff5533 100%)";

  return (
    <section
      ref={ref}
      className="bg-[#0A0A0A] text-white py-20 md:py-32 px-5 sm:px-8 lg:px-10 relative overflow-hidden"
    >
      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0A0A0A, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }} />

      {/* Blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: blobY }}>
        <div className="blob-1 absolute blur-3xl" style={{ background: "#CC1500", width: 480, height: 480, left: "88%", top: "25%", opacity: 0.07, transform: "translate(-50%,-50%)", borderRadius: "50%" }} />
        <div className="blob-2 absolute blur-3xl" style={{ background: "#7C3AED", width: 380, height: 380, left: "4%",  top: "65%", opacity: 0.06, transform: "translate(-50%,-50%)", borderRadius: "50%" }} />
        <div className="blob-1 absolute blur-3xl" style={{ background: "#06B6D4", width: 280, height: 280, left: "50%", top: "92%", opacity: 0.05, transform: "translate(-50%,-50%)", borderRadius: "50%" }} />
      </motion.div>

      {/* Section label */}
      <div className="flex items-center gap-5 mb-14 relative z-20">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25" style={{ fontFamily: "Poppins, sans-serif" }}>
          {lang === "en" ? "Why code" : "Por qué código"}
        </span>
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25" style={{ fontFamily: "Poppins, sans-serif" }}>
          {lang === "en" ? "vs templates" : "vs plantillas"}
        </span>
      </div>

      {/* Headline */}
      <div className="mb-16 relative z-20 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block font-black uppercase leading-[0.88]"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)", letterSpacing: "-0.03em", backgroundImage: headGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {lang === "en" ? "Not all websites" : "No todas las webs"}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-serif italic font-light leading-[1.1]"
          style={{ fontSize: "clamp(1.8rem, 5vw, 5rem)", backgroundImage: italicGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {lang === "en" ? "are equal." : "son iguales."}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-white/40 max-w-2xl"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(0.85rem, 1.4vw, 1rem)", lineHeight: 1.75 }}
        >
          {lang === "en"
            ? "A Wix or template site costs less upfront — but you pay that difference every day in lost clients, poor Google ranking, and a site that can't grow with your business."
            : "Un sitio en Wix o plantilla puede costar menos al inicio — pero pagás esa diferencia todos los días en clientes perdidos, mala posición en Google y un sitio que no puede crecer con tu negocio."}
        </motion.p>
      </div>

      {/* Comparison grid */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl">

        {/* TEMPLATE card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col border border-white/[0.05]"
          style={{ background: "#111" }}
        >
          {/* Card header */}
          <div className="px-6 py-5 border-b border-white/[0.05]">
            <p className="text-[8px] font-black uppercase tracking-[0.45em] text-white/20 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
              {lang === "en" ? "Template / Wix / Shopify" : "Plantilla / Wix / Shopify"}
            </p>
            <h3 className="font-black uppercase text-white/20 leading-none" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "-0.02em" }}>
              {lang === "en" ? "The cheap option" : "La opción barata"}
            </h3>
          </div>
          {/* Rows */}
          <div className="px-6 py-4 flex-1">
            {ROWS.map((row, i) => (
              <CompareRow key={i} row={row} index={i} lang={lang} side="template" />
            ))}
          </div>
        </motion.div>

        {/* CODE card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col border border-[#CC1500]/20 relative overflow-hidden"
          style={{ background: "#0f0f0f" }}
        >
          {/* Red top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#CC1500]" />

          {/* Subtle red glow top */}
          <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(204,21,0,0.12), transparent)" }} />

          {/* Card header */}
          <div className="px-6 py-5 border-b border-[#CC1500]/12 relative">
            <p className="text-[8px] font-black uppercase tracking-[0.45em] text-[#CC1500]/70 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
              {lang === "en" ? "Custom code" : "Código a medida"}
            </p>
            <h3 className="font-black uppercase text-white leading-none" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "-0.02em" }}>
              {lang === "en" ? "The real investment" : "La inversión real"}
            </h3>
          </div>
          {/* Rows */}
          <div className="px-6 py-4 flex-1 relative">
            {ROWS.map((row, i) => (
              <CompareRow key={i} row={row} index={i} lang={lang} side="code" />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Closing statement */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-20 mt-14 max-w-2xl"
      >
        <div className="flex items-start gap-4">
          <div className="w-[2px] shrink-0 self-stretch bg-[#CC1500]/40" />
          <p className="text-white/30 text-sm leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
            {lang === "en"
              ? "With code, almost anything you can imagine can be built. No templates, no limits. That's the real difference between a site that just \"exists\" and one that actually works for your business."
              : "Con código, casi todo lo que podés imaginar se puede construir. Sin plantillas, sin límites. Esa es la diferencia real entre un sitio que simplemente \"existe\" y uno que trabaja de verdad para tu negocio."}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
