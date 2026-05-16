import { motion } from "framer-motion";
import { XCircle, Paintbrush, Code2, Zap, BadgeCheck, ShieldCheck, Globe } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const TEMPLATE_POINTS = {
  es: [
    "Diseño genérico, igual al de miles de sitios",
    "Funciones limitadas a la plataforma",
    "Carga lenta por código innecesario",
    "Pago mensual eterno — nunca es realmente tuya",
    "Si la plataforma cierra, tu web desaparece",
  ],
  en: [
    "Generic design, same as thousands of others",
    "Features limited to what the platform allows",
    "Slow loading from bloated, unnecessary code",
    "Monthly fee forever — never truly yours",
    "Platform closes? Your site disappears too",
  ],
};

const CODE_POINTS: {
  icon: React.ElementType;
  color: string;
  bg: string;
  es: string;
  en: string;
}[] = [
  { icon: Paintbrush,  color: "#CC1500", bg: "rgba(204,21,0,0.12)",   es: "Diseño 100% único, creado solo para tu marca",    en: "100% unique design, built only for your brand" },
  { icon: Code2,       color: "#7C3AED", bg: "rgba(124,58,237,0.12)", es: "Cualquier función que puedas imaginar",            en: "Any feature you can imagine, no limits" },
  { icon: Zap,         color: "#06B6D4", bg: "rgba(6,182,212,0.12)",  es: "Rendimiento optimizado al máximo",                en: "Maximum performance, fully optimized" },
  { icon: BadgeCheck,  color: "#10B981", bg: "rgba(16,185,129,0.12)", es: "Pagás una vez — es tuya para siempre",            en: "Pay once — it's yours forever" },
  { icon: ShieldCheck, color: "#D97706", bg: "rgba(217,119,6,0.12)",  es: "Vos controlás todo — sin depender de nadie",      en: "You control everything — no dependencies" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export const WhyCodePanel = ({ lang }: { lang: string }) => {
  const tPoints = lang === "en" ? TEMPLATE_POINTS.en : TEMPLATE_POINTS.es;
  const headGrad   = "linear-gradient(120deg, #CC1500 0%, #0A0A0A 32%, #7C3AED 65%, #06B6D4 100%)";
  const italicGrad = "linear-gradient(110deg, #CC1500 0%, #b01000 50%, #ff5533 100%)";

  return (
    <div className="relative">

      {/* ── Title ── */}
      <div className="mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="block font-black uppercase leading-[0.88]"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)",
            letterSpacing: "-0.03em",
            backgroundImage: headGrad,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {lang === "en" ? "Why code" : "¿Por qué código"}
        </motion.h3>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-serif italic font-light leading-[1.1]"
          style={{
            fontSize: "clamp(1.2rem, 3vw, 2.5rem)",
            backgroundImage: italicGrad,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {lang === "en" ? "and not a template?" : "y no una plantilla?"}
        </motion.span>
      </div>

      {/* ── Two cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* TEMPLATE card — light, boring, crossed out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col bg-white border border-[#0A0A0A]/8 overflow-hidden"
        >
          {/* Card header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#0A0A0A]/6"
            style={{ background: "rgba(10,10,10,0.02)" }}>
            <div className="w-7 h-7 rounded-full border border-[#0A0A0A]/10 flex items-center justify-center shrink-0">
              <Globe size={13} className="text-[#0A0A0A]/30" />
            </div>
            <div>
              <p className="text-[7.5px] font-black uppercase tracking-[0.38em] text-[#0A0A0A]/30 leading-none mb-0.5"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                Wix · WordPress · Shopify
              </p>
              <p className="text-[0.8rem] font-black uppercase text-[#0A0A0A]/40 leading-none"
                style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "-0.01em" }}>
                {lang === "en" ? "With a template" : "Con una plantilla"}
              </p>
            </div>
          </div>

          {/* Points */}
          <ul className="flex flex-col flex-1 divide-y divide-[#0A0A0A]/[0.05]">
            {tPoints.map((pt, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="flex items-center gap-3 px-5 py-3.5"
              >
                <XCircle size={16} className="shrink-0" style={{ color: "rgba(204,21,0,0.35)" }} />
                <p className="text-[0.78rem] leading-snug text-[#0A0A0A]/45">{pt}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CODE card — dark, colorful, vibrant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col overflow-hidden border border-[#CC1500]/20 relative"
          style={{ background: "#0A0A0A" }}
        >
          {/* Red accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#CC1500]" />
          <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(204,21,0,0.10), transparent)" }} />

          {/* Ambient blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute blur-2xl rounded-full"
              style={{ background: "#7C3AED", width: 160, height: 160, right: -30, bottom: -20, opacity: 0.15 }} />
            <div className="absolute blur-2xl rounded-full"
              style={{ background: "#06B6D4", width: 120, height: 120, left: -20, top: "50%", opacity: 0.10 }} />
          </div>

          {/* Card header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.07] relative">
            <div className="w-7 h-7 rounded-full border border-[#CC1500]/40 flex items-center justify-center shrink-0"
              style={{ background: "rgba(204,21,0,0.12)" }}>
              <Code2 size={13} style={{ color: "#CC1500" }} />
            </div>
            <div>
              <p className="text-[7.5px] font-black uppercase tracking-[0.38em] leading-none mb-0.5"
                style={{ fontFamily: "Poppins, sans-serif", color: "rgba(204,21,0,0.7)" }}>
                {lang === "en" ? "Custom code" : "Código a medida"}
              </p>
              <p className="text-[0.8rem] font-black uppercase text-white leading-none"
                style={{ fontFamily: "Poppins, sans-serif", letterSpacing: "-0.01em" }}>
                {lang === "en" ? "With real code" : "Con código real"}
              </p>
            </div>
          </div>

          {/* Points */}
          <ul className="flex flex-col flex-1 divide-y divide-white/[0.05] relative">
            {CODE_POINTS.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 + 0.08 }}
                  className="flex items-center gap-3 px-5 py-3.5"
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: pt.bg, border: `1px solid ${pt.color}40` }}>
                    <Icon size={13} style={{ color: pt.color }} />
                  </div>
                  <p className="text-[0.78rem] leading-snug text-white/80">
                    {lang === "en" ? pt.en : pt.es}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      {/* Closing note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-5 text-center text-[0.73rem] text-[#0A0A0A]/35"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {lang === "en"
          ? "With code, if you can imagine it — it can be built."
          : "Con código, si lo podés imaginar — se puede construir."}
      </motion.p>
    </div>
  );
};
