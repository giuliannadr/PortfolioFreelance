import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SPOTS_DARK } from "@/lib/textGradients";

interface Maintenance {
  price: string;
  es: string;
  en: string;
}
interface PlanContent {
  name: string;
  tag: string;
  price: string | null;
  originalPrice?: string | null;
  includes: string[];
}
interface Plan {
  id: string;
  accent: string;
  quote?: boolean;
  featured?: boolean;
  maintenance?: Maintenance;
  es: PlanContent;
  en: PlanContent;
}

const PLANS: Plan[] = [
  {
    id: "landing",
    accent: "#CC1500",
    maintenance: { price: "15.000", es: "Mantenimiento disponible · $15.000/mes", en: "Maintenance available · $15,000/mo" },
    es: {
      name: "Landing Page", tag: "Sitio Web", price: "150.000",
      includes: ["Diseño UI/UX exclusivo", "Desarrollo con código propio", "Deploy incluido en Vercel", "100% adaptada a mobile", "Formulario de contacto"],
    },
    en: {
      name: "Landing Page", tag: "Website", price: "150.000",
      includes: ["Custom UI/UX design", "Custom code development", "Deploy included on Vercel", "100% mobile responsive", "Contact form"],
    },
  },
  {
    id: "multiseccion",
    accent: "#7C3AED",
    featured: true,
    maintenance: { price: "15.000", es: "Mantenimiento disponible · $15.000/mes", en: "Maintenance available · $15,000/mo" },
    es: {
      name: "Multi-sección", tag: "Sitio Web", price: "180.000",
      includes: ["Todo lo de Landing", "Múltiples secciones", "Galería o portfolio", "Animaciones premium", "SEO optimizado"],
    },
    en: {
      name: "Multi-section", tag: "Website", price: "180.000",
      includes: ["Everything in Landing", "Multiple sections", "Gallery or portfolio", "Premium animations", "SEO optimized"],
    },
  },
  {
    id: "tienda",
    accent: "#06B6D4",
    maintenance: { price: "30.000", es: "Mantenimiento disponible · $30.000/mes", en: "Maintenance available · $30,000/mo" },
    es: {
      name: "Tienda Online", tag: "E-commerce", price: "360.000", originalPrice: "400.000",
      includes: ["Diseño UI/UX exclusivo", "Carrito de compras", "Pasarelas de pago", "Panel de administración", "Gestión de stock"],
    },
    en: {
      name: "Online Store", tag: "E-commerce", price: "360.000", originalPrice: "400.000",
      includes: ["Custom UI/UX design", "Shopping cart", "Payment gateways", "Admin panel", "Stock management"],
    },
  },
  {
    id: "custom",
    accent: "#10B981",
    quote: true,
    maintenance: { price: "30.000", es: "Mantenimiento disponible · $30.000/mes", en: "Maintenance available · $30,000/mo" },
    es: {
      name: "Sistemas & Webs a medida", tag: "A presupuestar", price: null,
      includes: ["Web apps complejas", "Sistemas de gestión", "Integraciones de APIs", "Bases de datos personalizadas"],
    },
    en: {
      name: "Custom Systems & Websites", tag: "Custom quote", price: null,
      includes: ["Complex web apps", "Management systems", "API integrations", "Custom databases"],
    },
  },
];

const BG_BLOBS = [
  { color: "#CC1500", w: 500, x: "90%", y: "20%", op: 0.08, cls: "blob-1" },
  { color: "#7C3AED", w: 400, x: "5%",  y: "55%", op: 0.07, cls: "blob-2" },
  { color: "#06B6D4", w: 280, x: "55%", y: "92%", op: 0.05, cls: "blob-1" },
];

export const ServicesSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const ref  = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const handleWA = (planName: string) => {
    const msg = lang === "en"
      ? `Hi! I'm interested in the "${planName}" plan. I'd like to know more.`
      : `¡Hola! Me interesa el plan "${planName}". Me gustaría saber más.`;
    window.open(`https://wa.me/5491150403408?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section ref={ref} id="services" className="bg-[#0A0A0A] text-white py-20 md:py-32 px-5 sm:px-8 lg:px-10 relative">

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0A0A0A, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }} />

      {/* Blobs */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ y: blobY }}>
        {BG_BLOBS.map((b, i) => (
          <div key={i} className={`${b.cls} absolute blur-3xl`}
            style={{ background: b.color, width: b.w, height: b.w, left: b.x, top: b.y, opacity: b.op, transform: "translate(-50%,-50%)" }} />
        ))}
      </motion.div>

      {/* Label */}
      <div className="flex items-center gap-5 mb-14 relative z-20 border-b border-white/[0.05] pb-8">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25"
          style={{ fontFamily: "Poppins, sans-serif" }}>06</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          {lang === "en" ? "Investment" : "Inversión"}
        </span>
      </div>

      {/* Headline */}
      <div className="mb-16 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block font-black uppercase leading-[0.85]"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(3rem, 9vw, 8rem)",
            letterSpacing: "-0.03em",
            backgroundImage: SPOTS_DARK,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {lang === "en" ? "Prices" : "Precios"}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-serif italic font-light leading-[1.05] text-white/20"
          style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
        >
          {lang === "en" ? "clear & direct." : "claros y directos."}
        </motion.h2>
      </div>

      {/* Pricing grid — 1 col / 2 col sm+ */}
      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {PLANS.map((plan, i) => {
          const c = lang === "en" ? plan.en : plan.es;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
                borderTop: `2px solid ${plan.featured ? plan.accent : `${plan.accent}55`}`,
              }}
            >
              {/* Top glow */}
              <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, ${plan.accent}18, transparent)` }} />
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 70% 50% at 20% 15%, ${plan.accent}14, transparent)` }} />

              <div className="relative p-6 lg:p-8 flex flex-col flex-1">

                {/* Tag + badge row */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[8px] font-black uppercase tracking-[0.28em] px-2.5 py-1"
                    style={{ fontFamily: "Poppins, sans-serif", color: plan.accent, background: `${plan.accent}15`, border: `1px solid ${plan.accent}30` }}
                  >
                    {c.tag}
                  </span>
                  {c.originalPrice && (
                    <span className="text-[8px] font-black uppercase tracking-[0.18em] px-2 py-1"
                      style={{ fontFamily: "Poppins, sans-serif", color: "#D97706", background: "rgba(217,119,6,0.15)", border: "1px solid rgba(217,119,6,0.35)" }}>
                      PROMO
                    </span>
                  )}
                  {plan.featured && !c.originalPrice && (
                    <span className="text-[8px] font-black uppercase tracking-[0.18em] px-2 py-1"
                      style={{ fontFamily: "Poppins, sans-serif", color: plan.accent, background: `${plan.accent}20`, border: `1px solid ${plan.accent}40` }}>
                      {lang === "en" ? "Popular" : "Popular"}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-3">
                  {plan.quote ? (
                    <p className="font-black text-white leading-none"
                      style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", letterSpacing: "-0.02em" }}>
                      {lang === "en" ? "Custom quote" : "A presupuestar"}
                    </p>
                  ) : (
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-white/30 font-black text-base" style={{ fontFamily: "Poppins, sans-serif" }}>$</span>
                      <span className="font-black text-white leading-none"
                        style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em" }}>
                        {c.price}
                      </span>
                      <span className="text-white/30 font-black text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>ARS</span>
                      {c.period && (
                        <span className="text-white/35 font-black text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>{c.period}</span>
                      )}
                    </div>
                  )}
                  {c.originalPrice && (
                    <p className="text-white/22 text-sm line-through mt-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                      $ {c.originalPrice} ARS
                    </p>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-black uppercase text-white leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", letterSpacing: "-0.01em" }}>
                  {c.name}
                </h3>

                {/* Divider */}
                <div className="h-px w-full my-5" style={{ background: "rgba(255,255,255,0.07)" }} />

                {/* Includes list */}
                <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                  {c.includes.map((item, ii) => (
                    <li key={ii} className="flex items-start gap-2.5">
                      <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${plan.accent}20`, border: `1px solid ${plan.accent}45` }}>
                        <Check size={7} style={{ color: plan.accent }} strokeWidth={3} />
                      </div>
                      <span className="text-white/50 text-[11.5px] leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Maintenance note */}
                {plan.maintenance && (
                  <div className="flex items-center gap-2 mb-4 py-2.5 px-3"
                    style={{ background: `${plan.accent}08`, border: `1px solid ${plan.accent}20` }}>
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: plan.accent }} />
                    <span className="text-[9px] font-black uppercase tracking-[0.18em]"
                      style={{ fontFamily: "Poppins, sans-serif", color: `${plan.accent}99` }}>
                      {lang === "en" ? plan.maintenance.en : plan.maintenance.es}
                    </span>
                  </div>
                )}

                {/* CTA button */}
                <button
                  onClick={() => handleWA(c.name)}
                  className="flex items-center justify-center gap-2 py-3 font-black text-[10px] uppercase tracking-widest transition-all duration-300 group/btn hover:gap-3"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    background: plan.featured ? plan.accent : "rgba(255,255,255,0.06)",
                    color: plan.featured ? "#fff" : "rgba(255,255,255,0.5)",
                    border: plan.featured ? "none" : "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  {plan.quote
                    ? (lang === "en" ? "Request a quote" : "Pedir presupuesto")
                    : (lang === "en" ? "Get started" : "Empezar")}
                  <ArrowUpRight size={11} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-20 text-white/18 text-[10.5px] leading-relaxed max-w-2xl"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {lang === "en"
          ? "* Prices do not include the annual domain or external hosting if the project cannot be deployed on Vercel. Landing pages and multi-section sites include deployment. Prices in Argentine pesos."
          : "* Los precios no incluyen el dominio anual ni hosting externo en caso de que el proyecto no pueda deployarse en Vercel. Las landing pages y sitios multi-sección incluyen el deploy. Precios en pesos argentinos."}
      </motion.p>
    </section>
  );
};
