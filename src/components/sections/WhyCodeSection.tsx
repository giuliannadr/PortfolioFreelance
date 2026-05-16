import { motion } from "framer-motion";

// ── CSS-only mockups ──────────────────────────────────────────────────────────

/** Generic Wix/WP/Shopify template — blocky, boring, recognisable */
const TemplateMockup = () => (
  <div className="w-full h-full flex flex-col" style={{ background: "#f0eeec" }}>
    {/* Browser bar */}
    <div className="flex items-center gap-1.5 px-3 py-2 shrink-0" style={{ background: "#e4e2df", borderBottom: "1px solid #d4d2cf" }}>
      {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      <div className="ml-1.5 flex-1 h-1.5 rounded-full" style={{ background: "#c8c6c3" }} />
    </div>
    {/* Generic nav */}
    <div className="flex items-center justify-between px-3 py-2 shrink-0" style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
      <div className="h-2 w-10 rounded-sm" style={{ background: "#bbb" }} />
      <div className="flex gap-2">
        {[8,7,9].map((w, i) => <div key={i} className="h-1 rounded-full" style={{ background: "#ccc", width: w * 2 }} />)}
      </div>
    </div>
    {/* Generic hero - flat blue */}
    <div className="px-3 py-3 flex flex-col gap-1.5" style={{ background: "#4a90c4" }}>
      <div className="h-2.5 w-20 rounded-sm" style={{ background: "rgba(255,255,255,0.6)" }} />
      <div className="h-1.5 w-14 rounded-sm" style={{ background: "rgba(255,255,255,0.35)" }} />
      <div className="h-4 w-10 rounded-sm mt-1 flex items-center justify-center" style={{ background: "#fff" }}>
        <div className="h-1 w-6 rounded-full" style={{ background: "#4a90c4" }} />
      </div>
    </div>
    {/* Generic 3-col content */}
    <div className="px-3 pt-2 grid grid-cols-3 gap-1.5 flex-1">
      {[1,2,3].map(i => (
        <div key={i} className="flex flex-col gap-1 p-1.5 rounded-sm" style={{ background: "#fff", border: "1px solid #eee" }}>
          <div className="h-4 rounded-sm w-full" style={{ background: "#e8e8e8" }} />
          <div className="h-1 w-full rounded-full" style={{ background: "#ddd" }} />
          <div className="h-1 w-3/4 rounded-full" style={{ background: "#ddd" }} />
        </div>
      ))}
    </div>
  </div>
);

/** Premium custom-coded site — dark, unique, dynamic */
const CodeMockup = () => (
  <div className="w-full h-full flex flex-col" style={{ background: "#0A0A0A" }}>
    {/* Browser bar */}
    <div className="flex items-center gap-1.5 px-3 py-2 shrink-0" style={{ background: "#111" }}>
      {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      <div className="ml-1.5 flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
    </div>
    {/* Unique dark hero */}
    <div className="flex-1 px-3 pt-2 pb-1 flex flex-col justify-between relative overflow-hidden">
      {/* Blob accent */}
      <div className="absolute right-0 top-0 w-12 h-12 rounded-full blur-xl" style={{ background: "#CC1500", opacity: 0.35 }} />
      <div className="absolute left-1 bottom-2 w-8 h-8 rounded-full blur-xl" style={{ background: "#7C3AED", opacity: 0.25 }} />
      {/* Big gradient "name" text */}
      <div>
        <div className="h-3 w-16 rounded-sm mb-0.5"
          style={{ background: "linear-gradient(90deg, #CC1500, #fff, #7C3AED)", opacity: 0.9 }} />
        <div className="h-2 w-12 rounded-sm italic"
          style={{ background: "linear-gradient(90deg, #CC1500, #ff5533)", opacity: 0.7 }} />
      </div>
      {/* Cards row */}
      <div className="grid grid-cols-3 gap-1">
        {["#CC1500","#7C3AED","#06B6D4"].map((color, i) => (
          <div key={i} className="rounded-sm p-1" style={{ background: "rgba(255,255,255,0.04)", borderTop: `1.5px solid ${color}` }}>
            <div className="h-1.5 w-full rounded-full mb-0.5" style={{ background: `${color}60` }} />
            <div className="h-1 w-2/3 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Points ────────────────────────────────────────────────────────────────────
const TEMPLATE_POINTS = {
  es: [
    "Diseño genérico, igual al de miles de sitios",
    "Funciones limitadas a la plataforma",
    "Pago mensual eterno — nunca es tuya",
    "Si la plataforma cierra, tu web desaparece",
  ],
  en: [
    "Generic design, same as thousands of others",
    "Features limited to what the platform allows",
    "Monthly fee forever — never truly yours",
    "If the platform closes, your site vanishes",
  ],
};

const CODE_POINTS = {
  es: [
    "Diseño 100% único, solo para tu marca",
    "Cualquier función que puedas imaginar",
    "Pagás una vez — es tuya para siempre",
    "Vos controlás todo, sin intermediarios",
  ],
  en: [
    "100% unique design, built only for you",
    "Any feature you can imagine, no limits",
    "Pay once — it's yours forever",
    "You control everything, no middlemen",
  ],
};

// ── Panel component ───────────────────────────────────────────────────────────
export const WhyCodePanel = ({ lang }: { lang: string }) => {
  const tPoints = lang === "en" ? TEMPLATE_POINTS.en : TEMPLATE_POINTS.es;
  const cPoints = lang === "en" ? CODE_POINTS.en     : CODE_POINTS.es;

  return (
    <div className="relative">
      {/* Section mini-label */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-[#0A0A0A]/10" />
        <span className="text-[8px] font-black uppercase tracking-[0.45em] text-[#0A0A0A]/30"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          {lang === "en" ? "Why code and not a template?" : "¿Por qué código y no una plantilla?"}
        </span>
        <div className="h-px flex-1 bg-[#0A0A0A]/10" />
      </div>

      {/* Two cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {/* ── TEMPLATE card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col overflow-hidden border border-[#0A0A0A]/8"
          style={{ background: "#fff" }}
        >
          {/* Mockup preview */}
          <div className="relative h-36 overflow-hidden shrink-0">
            <TemplateMockup />
            {/* Desaturate + fade */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, #fff 100%)" }} />
            <div className="absolute inset-0" style={{ background: "rgba(240,238,236,0.25)" }} />
          </div>

          {/* Content */}
          <div className="px-5 pb-5 pt-3 flex flex-col gap-3 flex-1">
            {/* Badge */}
            <span className="text-[7px] font-black uppercase tracking-[0.4em] px-2 py-0.5 rounded-full self-start"
              style={{ fontFamily: "Poppins, sans-serif", background: "rgba(10,10,10,0.06)", color: "rgba(10,10,10,0.35)" }}>
              Wix · WordPress · Shopify
            </span>

            <h3 className="font-black uppercase leading-none text-[#0A0A0A]/40"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", letterSpacing: "-0.02em" }}>
              {lang === "en" ? "The template" : "La plantilla"}
            </h3>

            <ul className="space-y-2 mt-1">
              {tPoints.map((pt, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="shrink-0 text-[10px] font-black mt-0.5 text-[#0A0A0A]/25"
                    style={{ fontFamily: "Poppins, sans-serif" }}>✕</span>
                  <p className="text-[0.75rem] leading-snug text-[#0A0A0A]/40">{pt}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── CODE card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col overflow-hidden border border-[#CC1500]/20 relative"
          style={{ background: "#0A0A0A" }}
        >
          {/* Red top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#CC1500] z-10" />
          <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, rgba(204,21,0,0.12), transparent)" }} />

          {/* Mockup preview */}
          <div className="relative h-36 overflow-hidden shrink-0">
            <CodeMockup />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 50%, #0A0A0A 100%)" }} />
          </div>

          {/* Content */}
          <div className="px-5 pb-5 pt-3 flex flex-col gap-3 flex-1 relative">
            {/* Badge */}
            <span className="text-[7px] font-black uppercase tracking-[0.4em] px-2 py-0.5 rounded-full self-start"
              style={{ fontFamily: "Poppins, sans-serif", background: "rgba(204,21,0,0.15)", color: "#CC1500" }}>
              {lang === "en" ? "Custom code" : "Código a medida"}
            </span>

            <h3 className="font-black uppercase leading-none text-white"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", letterSpacing: "-0.02em" }}>
              {lang === "en" ? "The real thing" : "El código real"}
            </h3>

            <ul className="space-y-2 mt-1">
              {cPoints.map((pt, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 + 0.08 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="shrink-0 text-[11px] font-black mt-0.5 text-[#CC1500]"
                    style={{ fontFamily: "Poppins, sans-serif" }}>→</span>
                  <p className="text-[0.75rem] leading-snug text-white/75">{pt}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>

      {/* Closing note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-5 text-center text-[0.73rem] text-[#0A0A0A]/30"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {lang === "en"
          ? "With code, if you can imagine it — it can be built."
          : "Con código, si lo podés imaginar — se puede construir."}
      </motion.p>
    </div>
  );
};
