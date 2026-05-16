import { motion } from "framer-motion";

// ── Comparison data ───────────────────────────────────────────────────────────
const ROWS = [
  {
    es: { template: "Diseño genérico, igual al de miles de sitios",  code: "Diseño 100% único, solo para tu marca" },
    en: { template: "Generic design, same as thousands of others",   code: "100% unique design, only for your brand" },
  },
  {
    es: { template: "Funciones limitadas a las que la plataforma da", code: "Cualquier función que puedas imaginar" },
    en: { template: "Functions limited to what the platform offers",  code: "Any feature you can imagine" },
  },
  {
    es: { template: "Carga lenta por código excesivo e innecesario", code: "Rendimiento optimizado al máximo" },
    en: { template: "Slow loading from bloated, unnecessary code",   code: "Maximum performance, optimized" },
  },
  {
    es: { template: "SEO básico, poco configurable, techo muy bajo", code: "SEO técnico real, profundo y sin límites" },
    en: { template: "Basic SEO, barely configurable, low ceiling",   code: "Real, deep technical SEO, no ceiling" },
  },
  {
    es: { template: "Pago mensual eterno — nunca es realmente tuya", code: "Pagás una vez — es tuya para siempre" },
    en: { template: "Eternal monthly fee — never truly yours",       code: "Pay once — yours forever" },
  },
  {
    es: { template: "Si la plataforma cierra, tu web desaparece",    code: "Vos controlás todo — sin intermediarios" },
    en: { template: "If the platform closes, your site disappears",  code: "You control everything — no middlemen" },
  },
];

// ── Panel component (no section wrapper — floats inside UseCasesSection) ─────
export const WhyCodePanel = ({ lang }: { lang: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    className="relative overflow-hidden border border-[#0A0A0A]/10"
    style={{ background: "#0A0A0A" }}
  >
    {/* Red top accent bar */}
    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#CC1500]" />

    {/* Subtle red glow from top */}
    <div
      className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
      style={{ background: "linear-gradient(to bottom, rgba(204,21,0,0.10), transparent)" }}
    />

    {/* Panel header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 md:px-8 pt-7 pb-5 border-b border-white/[0.06] relative">
      <div>
        <p
          className="text-[8px] font-black uppercase tracking-[0.45em] text-[#CC1500]/60 mb-1"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {lang === "en" ? "The real difference" : "La diferencia real"}
        </p>
        <h3
          className="font-black uppercase text-white leading-none"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1rem, 2.2vw, 1.35rem)", letterSpacing: "-0.02em" }}
        >
          {lang === "en" ? "Why code and not a template?" : "¿Por qué código y no una plantilla?"}
        </h3>
      </div>
      <p className="text-white/25 text-[0.72rem] max-w-xs text-right hidden sm:block" style={{ fontFamily: "Poppins, sans-serif", lineHeight: 1.6 }}>
        {lang === "en"
          ? "A template costs less upfront. You pay the difference every day."
          : "Una plantilla cuesta menos al inicio. Pagás la diferencia todos los días."}
      </p>
    </div>

    {/* Two-column comparison */}
    <div className="grid md:grid-cols-2">

      {/* TEMPLATE column */}
      <div className="px-6 md:px-8 py-5 md:border-r border-white/[0.04] border-b md:border-b-0 border-white/[0.04]">
        <p
          className="text-[7.5px] font-black uppercase tracking-[0.4em] text-white/20 mb-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {lang === "en" ? "Template / Wix / Shopify" : "Plantilla / Wix / Shopify"}
        </p>
        <div className="space-y-0">
          {ROWS.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-2.5 py-2.5 border-b border-white/[0.04] last:border-b-0"
            >
              <span className="shrink-0 text-[10px] text-white/18 mt-0.5 font-black w-3 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>×</span>
              <p className="text-[0.75rem] leading-snug text-white/22">
                {lang === "en" ? row.en.template : row.es.template}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CODE column */}
      <div className="px-6 md:px-8 py-5 relative">
        {/* Subtle red radial in this column */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 100% 50%, rgba(204,21,0,0.06), transparent)" }}
        />
        <p
          className="text-[7.5px] font-black uppercase tracking-[0.4em] text-[#CC1500]/50 mb-4 relative"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {lang === "en" ? "Custom code" : "Código a medida"}
        </p>
        <div className="space-y-0 relative">
          {ROWS.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 + 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-2.5 py-2.5 border-b border-[#CC1500]/08 last:border-b-0"
            >
              <span className="shrink-0 text-[#CC1500] text-[10px] mt-0.5 font-black w-3 text-center leading-none" style={{ fontFamily: "Poppins, sans-serif" }}>→</span>
              <p className="text-[0.75rem] leading-snug text-white/65">
                {lang === "en" ? row.en.code : row.es.code}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Footer quote */}
    <div className="px-6 md:px-8 py-5 border-t border-white/[0.05]">
      <div className="flex items-start gap-3">
        <div className="w-[2px] shrink-0 self-stretch bg-[#CC1500]/35" />
        <p className="text-white/28 text-[0.73rem] leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
          {lang === "en"
            ? "With code, almost anything you can imagine can be built. No templates, no limits — that's the real difference between a site that just exists and one that actually works for your business."
            : "Con código, casi todo lo que podés imaginar se puede construir. Sin plantillas, sin límites — esa es la diferencia real entre un sitio que simplemente existe y uno que trabaja de verdad para tu negocio."}
        </p>
      </div>
    </div>
  </motion.div>
);
