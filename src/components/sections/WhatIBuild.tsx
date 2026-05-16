import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const BG = "#F8F7F5";

const CARDS = [
  { num: "01", accent: "#CC1500", es: { title: "Sitios Web & Landings", tag: "Tu primera impresión lo es todo", bullets: ["Diseño exclusivo adaptado a tu marca", "Optimizado para convertir visitas en clientes", "Visible en Google desde el día uno"] }, en: { title: "Websites & Landings", tag: "First impressions are everything", bullets: ["Custom design tailored to your brand", "Optimized to turn visits into clients", "Visible on Google from day one"] } },
  { num: "02", accent: "#7C3AED", es: { title: "Tiendas Online", tag: "Tu negocio abierto las 24 horas", bullets: ["Catálogo y pagos sin complicaciones", "Panel de gestión simple para vos", "Diseño que hace querer comprar"] }, en: { title: "Online Stores", tag: "Your business open 24/7", bullets: ["Catalog and payments without hassle", "Simple management panel for you", "Design that makes people want to buy"] } },
  { num: "03", accent: "#06B6D4", es: { title: "Paneles & Dashboards", tag: "Todo lo importante, a la vista", bullets: ["Visualizá tus datos en tiempo real", "Reportes automáticos sin esfuerzo", "Control total desde cualquier lugar"] }, en: { title: "Panels & Dashboards", tag: "Everything important, at a glance", bullets: ["Visualize your data in real time", "Automatic reports effortlessly", "Total control from anywhere"] } },
  { num: "04", accent: "#D97706", es: { title: "Sistemas a Medida", tag: "Automatizá lo que te quita tiempo", bullets: ["Flujos de trabajo 100% personalizados", "Integraciones con lo que ya usás", "Menos tareas manuales, más resultados"] }, en: { title: "Custom Systems", tag: "Automate what wastes your time", bullets: ["100% personalized workflows", "Integrations with what you already use", "Less manual tasks, more results"] } },
  { num: "05", accent: "#EC4899", es: { title: "Rediseños", tag: "Transformá lo que ya tenés", bullets: ["Web moderna sin perder tu esencia", "Mejor velocidad y experiencia", "Conservando lo que ya funciona bien"] }, en: { title: "Redesigns", tag: "Transform what you already have", bullets: ["Modern web without losing your essence", "Better speed and user experience", "Keeping what already works well"] } },
  { num: "06", accent: "#10B981", es: { title: "Web Apps", tag: "Cuando tu idea necesita más", bullets: ["Funcionalidades complejas hechas simples", "Usuarios, roles y permisos incluidos", "Crece con vos a largo plazo"] }, en: { title: "Web Apps", tag: "When your idea needs more", bullets: ["Complex functionality made simple", "Users, roles and permissions included", "Grows with you long term"] } },
];

const BLOBS = [
  { color: "#CC1500", w: 480, x: "88%", y: "25%", op: 0.09, cls: "blob-1" },
  { color: "#7C3AED", w: 420, x: "4%",  y: "55%", op: 0.08, cls: "blob-2" },
  { color: "#06B6D4", w: 340, x: "50%", y: "90%", op: 0.07, cls: "blob-1" },
  { color: "#EC4899", w: 260, x: "28%", y: "8%",  op: 0.06, cls: "blob-2" },
  { color: "#D97706", w: 220, x: "72%", y: "60%", op: 0.05, cls: "blob-1" },
];

/* Parent controls child bar via variants */
const cardVariants = {
  hidden:   { opacity: 0, y: 36 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as const } }),
};
const barVariants = {
  hidden:   { scaleX: 0 },
  visible:  { scaleX: 1, transition: { duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const } },
};

const Card = ({ card, index, lang }: { card: typeof CARDS[0]; index: number; lang: string }) => {
  const c = lang === "en" ? card.en : card.es;
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: `0 24px 60px ${card.accent}35, 0 8px 24px ${card.accent}20`,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      className="group relative flex flex-col gap-5 p-7 cursor-default overflow-hidden border border-[#0A0A0A]/8 bg-white"
    >
      {/* Hover background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 90% 90% at 50% 50%, ${card.accent}18 0%, transparent 70%)` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Top accent bar — parent-driven */}
      <motion.div variants={barVariants} className="absolute top-0 left-0 right-0 h-[2.5px] origin-left" style={{ background: card.accent }} />

      {/* Glow under bar on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-8 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${card.accent}30, transparent)` }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Ghost number */}
      <span className="absolute right-4 bottom-2 font-black text-[#0A0A0A]/[0.04] select-none pointer-events-none leading-none" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(4rem, 8vw, 7rem)", letterSpacing: "-0.05em" }} aria-hidden>{card.num}</span>

      <div className="relative flex items-start justify-between">
        <span className="font-black leading-none" style={{ fontFamily: "Poppins, sans-serif", fontSize: "0.65rem", letterSpacing: "0.14em", color: card.accent }}>{card.num}</span>
        <motion.div
          className="w-6 h-6 border border-[#0A0A0A]/12 flex items-center justify-center text-[#0A0A0A]/25"
          whileHover={{ rotate: 45, borderColor: `${card.accent}80`, color: card.accent }}
          transition={{ duration: 0.25 }}
        >
          <ArrowUpRight size={12} />
        </motion.div>
      </div>

      <div className="relative">
        <h3 className="font-black uppercase leading-none text-[#0A0A0A] mb-1.5 group-hover:text-[#0A0A0A] transition-colors" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1rem, 1.9vw, 1.35rem)", letterSpacing: "-0.025em" }}>{c.title}</h3>
        <p className="font-serif italic text-[#0A0A0A]/40 group-hover:text-[#0A0A0A]/70 transition-colors duration-300" style={{ fontSize: "0.85rem" }}>{c.tag}</p>
      </div>

      <ul className="relative space-y-2 mt-auto">
        {c.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[#0A0A0A]/40 group-hover:text-[#0A0A0A]/65 transition-colors duration-300">
            <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ background: card.accent }} />
            <span className="text-[0.78rem] leading-snug">{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export const WhatIBuild = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  /* Gradient title for light section: starts/ends with dark so it's readable on light bg */
  const headGrad   = "linear-gradient(120deg, #CC1500 0%, #0A0A0A 32%, #7C3AED 65%, #06B6D4 100%)";
  const italicGrad = "linear-gradient(110deg, #CC1500 0%, #b01000 55%, #ff5533 100%)";

  return (
    <section ref={ref} id="what-i-build" className="py-20 md:py-32 px-5 sm:px-8 lg:px-10 relative" style={{ background: BG }}>

      {/* Section edge fades — hide blob cutoff at boundaries */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10" style={{ background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10" style={{ background: `linear-gradient(to top, ${BG}, transparent)` }} />

      {/* Blobs — outside z-10 so they show under the fades */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: blobY }}>
        {BLOBS.map((b, i) => (
          <div key={i} className={`${b.cls} absolute blur-3xl`} style={{ background: b.color, width: b.w, height: b.w, left: b.x, top: b.y, opacity: b.op, transform: "translate(-50%,-50%)" }} />
        ))}
      </motion.div>

      {/* Label */}
      <div className="flex items-center gap-5 mb-14 relative z-20">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0A0A0A]/30" style={{ fontFamily: "Poppins, sans-serif" }}>02</span>
        <div className="h-px flex-1 bg-[#0A0A0A]/12" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0A0A0A]/30" style={{ fontFamily: "Poppins, sans-serif" }}>{lang === "en" ? "What I build" : "Lo que construyo"}</span>
      </div>

      {/* Headline — gradient on light bg */}
      <div className="mb-14 relative z-20 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block font-black uppercase leading-[0.88]"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)", letterSpacing: "-0.03em", backgroundImage: headGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {lang === "en" ? "What I can build" : "Lo que puedo construir"}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-serif italic font-light leading-[1.1]"
          style={{ fontSize: "clamp(1.8rem, 5vw, 5rem)", backgroundImage: italicGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {lang === "en" ? "for your business." : "para tu negocio."}
        </motion.h2>
      </div>

      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CARDS.map((card, i) => <Card key={card.num} card={card} index={i} lang={lang} />)}
      </div>
    </section>
  );
};
