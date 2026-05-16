import { motion } from "framer-motion";

const ROWS = [
  {
    es: { template: "Diseño genérico, igual al de miles de sitios",   code: "Diseño 100% único, solo para tu marca" },
    en: { template: "Generic design, same as thousands of others",    code: "100% unique design, built for your brand" },
  },
  {
    es: { template: "Funciones limitadas a las que la plataforma da", code: "Cualquier función que puedas imaginar" },
    en: { template: "Limited to what the platform allows",            code: "Any feature you can imagine" },
  },
  {
    es: { template: "Carga lenta por código excesivo e innecesario",  code: "Rendimiento optimizado al máximo" },
    en: { template: "Slow loading from bloated code",                 code: "Maximum performance, fully optimized" },
  },
  {
    es: { template: "SEO básico, poco configurable, techo muy bajo",  code: "SEO técnico real, profundo y sin límites" },
    en: { template: "Basic SEO, barely configurable",                 code: "Real technical SEO, no ceiling" },
  },
  {
    es: { template: "Pago mensual eterno — nunca es realmente tuya",  code: "Pagás una vez — es tuya para siempre" },
    en: { template: "Monthly fee forever — never truly yours",        code: "Pay once — yours forever" },
  },
  {
    es: { template: "Si la plataforma cierra, tu web desaparece",     code: "Vos controlás todo — sin intermediarios" },
    en: { template: "If the platform closes, your site disappears",   code: "You control everything, no middlemen" },
  },
];

export const WhyCodePanel = ({ lang }: { lang: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    className="relative overflow-hidden"
    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
  >
    {/* Red top accent */}
    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#CC1500]" />
    <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
      style={{ background: "linear-gradient(to bottom, rgba(204,21,0,0.10), transparent)" }} />

    {/* Panel title */}
    <div className="px-6 md:px-8 pt-7 pb-5 border-b relative"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <p className="text-[8px] font-black uppercase tracking-[0.45em] mb-1.5"
        style={{ fontFamily: "Poppins, sans-serif", color: "rgba(204,21,0,0.65)" }}>
        {lang === "en" ? "The real difference" : "La diferencia real"}
      </p>
      <h3 className="font-black uppercase text-white leading-none"
        style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1rem, 2.2vw, 1.35rem)", letterSpacing: "-0.02em" }}>
        {lang === "en" ? "Why code and not a template?" : "¿Por qué código y no una plantilla?"}
      </h3>
    </div>

    {/* Comparison grid: 2 columns, one row per feature */}
    <div className="grid grid-cols-2">

      {/* Column headers */}
      <div className="px-5 md:px-8 py-3 border-b border-r"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <p className="text-[7px] font-black uppercase tracking-[0.38em] text-white/30"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          Wix · WordPress · Shopify
        </p>
      </div>
      <div className="px-5 md:px-8 py-3 border-b"
        style={{ borderColor: "rgba(204,21,0,0.12)" }}>
        <p className="text-[7px] font-black uppercase tracking-[0.38em]"
          style={{ fontFamily: "Poppins, sans-serif", color: "rgba(204,21,0,0.65)" }}>
          {lang === "en" ? "Custom code" : "Código a medida"}
        </p>
      </div>

      {/* Feature rows */}
      {ROWS.map((row, i) => {
        const last = i === ROWS.length - 1;
        const content = lang === "en" ? row.en : row.es;
        return (
          <>
            {/* Template cell */}
            <motion.div
              key={`t${i}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="px-5 md:px-8 py-3.5 flex items-start gap-2.5 border-r"
              style={{
                borderColor: "rgba(255,255,255,0.05)",
                borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.04)",
                background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
              }}
            >
              <span className="shrink-0 mt-px text-[11px] font-black leading-none"
                style={{ fontFamily: "Poppins, sans-serif", color: "rgba(255,255,255,0.28)" }}>
                ✕
              </span>
              <p className="text-[0.77rem] leading-snug" style={{ color: "rgba(255,255,255,0.42)" }}>
                {content.template}
              </p>
            </motion.div>

            {/* Code cell */}
            <motion.div
              key={`c${i}`}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 + 0.05 }}
              className="px-5 md:px-8 py-3.5 flex items-start gap-2.5"
              style={{
                borderBottom: last ? "none" : "1px solid rgba(204,21,0,0.07)",
                background: i % 2 === 0 ? "rgba(204,21,0,0.03)" : "transparent",
              }}
            >
              <span className="shrink-0 mt-px text-[11px] font-black leading-none text-[#CC1500]"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                →
              </span>
              <p className="text-[0.77rem] leading-snug" style={{ color: "rgba(255,255,255,0.82)" }}>
                {content.code}
              </p>
            </motion.div>
          </>
        );
      })}
    </div>

    {/* Footer */}
    <div className="px-6 md:px-8 py-5 border-t flex items-start gap-3"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="w-[2px] shrink-0 self-stretch bg-[#CC1500]/40" />
      <p className="text-[0.73rem] leading-relaxed"
        style={{ fontFamily: "Poppins, sans-serif", color: "rgba(255,255,255,0.30)" }}>
        {lang === "en"
          ? "With code, almost anything you can imagine can be built. No templates, no limits — that's the real difference between a site that just exists and one that actually works for your business."
          : "Con código, casi todo lo que podés imaginar se puede construir. Sin plantillas, sin límites — esa es la diferencia real entre un sitio que simplemente existe y uno que trabaja de verdad para tu negocio."}
      </p>
    </div>
  </motion.div>
);
