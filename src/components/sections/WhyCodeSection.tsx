import { motion } from "framer-motion";

const ROWS = [
  {
    es: { template: "Diseño genérico, igual al de miles",   code: "Diseño 100% único, solo para tu marca" },
    en: { template: "Generic design, same as thousands",    code: "100% unique design, built for your brand" },
  },
  {
    es: { template: "Funciones limitadas a la plataforma", code: "Cualquier función que imagines" },
    en: { template: "Features limited by the platform",    code: "Any feature you can imagine" },
  },
  {
    es: { template: "Carga lenta por código innecesario",  code: "Rendimiento optimizado al máximo" },
    en: { template: "Slow loading from bloated code",      code: "Maximum performance, fully optimized" },
  },
  {
    es: { template: "Pago mensual eterno — nunca es tuya", code: "Pagás una vez — es tuya para siempre" },
    en: { template: "Monthly fee forever — never yours",   code: "Pay once — yours forever" },
  },
  {
    es: { template: "Si la plataforma cierra, desaparece", code: "Vos controlás todo, sin intermediarios" },
    en: { template: "Platform closes? Your site's gone",   code: "You control everything — no middlemen" },
  },
];

export const WhyCodePanel = ({ lang }: { lang: string }) => {
  const headGrad   = "linear-gradient(120deg, #CC1500 0%, #ffffff 35%, #7C3AED 70%, #06B6D4 100%)";
  const italicGrad = "linear-gradient(110deg, #CC1500 0%, #b01000 50%, #ff5533 100%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Red top bar */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#CC1500]" />
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(204,21,0,0.10), transparent)" }} />

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute blur-3xl rounded-full"
          style={{ background: "#CC1500", width: 300, height: 300, right: -60, top: -60, opacity: 0.07 }} />
        <div className="absolute blur-3xl rounded-full"
          style={{ background: "#7C3AED", width: 240, height: 240, left: -40, bottom: -40, opacity: 0.06 }} />
      </div>

      <div className="relative px-6 md:px-10 pt-10 pb-8">

        {/* ── Title ── */}
        <div className="mb-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[8px] font-black uppercase tracking-[0.5em] text-white/30 mb-3"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {lang === "en" ? "The real difference" : "La diferencia real"}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="block font-serif italic font-light leading-[1.1]"
            style={{
              fontSize: "clamp(1.3rem, 3vw, 2.6rem)",
              backgroundImage: italicGrad,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {lang === "en" ? "and not a template?" : "y no una plantilla?"}
          </motion.span>
        </div>

        {/* ── Comparison table ── */}
        <div className="border border-white/[0.06] overflow-hidden">

          {/* Column headers */}
          <div className="grid grid-cols-2 border-b border-white/[0.06]">
            <div className="px-5 py-3 border-r border-white/[0.06]">
              <p className="text-[7.5px] font-black uppercase tracking-[0.38em] text-white/25"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                Wix · WordPress · Shopify
              </p>
            </div>
            <div className="px-5 py-3" style={{ background: "rgba(204,21,0,0.05)" }}>
              <p className="text-[7.5px] font-black uppercase tracking-[0.38em]"
                style={{ fontFamily: "Poppins, sans-serif", color: "rgba(204,21,0,0.8)" }}>
                {lang === "en" ? "Custom code" : "Código a medida"}
              </p>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => {
            const isLast = i === ROWS.length - 1;
            const c = lang === "en" ? row.en : row.es;
            return (
              <div
                key={i}
                className="grid grid-cols-2"
                style={{ borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.04)" }}
              >
                {/* Template cell */}
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-3 px-5 py-4 border-r border-white/[0.06]"
                  style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.012)" : "transparent" }}
                >
                  <span className="shrink-0 w-4 h-4 rounded-full border border-white/15 flex items-center justify-center">
                    <span className="text-[8px] font-black text-white/30" style={{ fontFamily: "Poppins, sans-serif" }}>✕</span>
                  </span>
                  <p className="text-[0.75rem] leading-snug text-white/38">{c.template}</p>
                </motion.div>

                {/* Code cell */}
                <motion.div
                  initial={{ opacity: 0, x: 6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 + 0.05 }}
                  className="flex items-center gap-3 px-5 py-4"
                  style={{ background: i % 2 === 1 ? "rgba(204,21,0,0.03)" : "transparent" }}
                >
                  <span className="shrink-0 w-4 h-4 rounded-full border border-[#CC1500]/40 flex items-center justify-center">
                    <span className="text-[8px] font-black text-[#CC1500]" style={{ fontFamily: "Poppins, sans-serif" }}>→</span>
                  </span>
                  <p className="text-[0.75rem] leading-snug text-white/80">{c.code}</p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-5 text-white/25 text-[0.72rem] leading-relaxed"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {lang === "en"
            ? "With code, if you can imagine it — it can be built. No templates, no limits."
            : "Con código, si lo podés imaginar — se puede construir. Sin plantillas, sin límites."}
        </motion.p>
      </div>
    </motion.div>
  );
};
