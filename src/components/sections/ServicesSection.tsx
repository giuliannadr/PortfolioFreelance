import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Info, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDollarRate } from "@/lib/useDollarRate";

interface Maintenance {
  price: string;
  includesEs: string[];
  includesEn: string[];
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

const MAINT_INCLUDES = {
  basic: {
    es: [
      "Cambios de textos e imágenes",
      "Agregar o quitar secciones",
      "Actualización de meta tags y SEO on-page",
      "Respuesta en menos de 24 hs",
    ],
    en: [
      "Text & image updates",
      "Add or remove sections",
      "Meta tags & on-page SEO updates",
      "Response within 24 hours",
    ],
  },
  full: {
    es: [
      "Todo lo del plan básico",
      "Cambios más complejos o nuevas funcionalidades",
      "Informe mensual de Google Search Console",
      "Monitoreo de velocidad y Core Web Vitals",
      "Respuesta prioritaria",
    ],
    en: [
      "Everything in basic",
      "Complex changes or new features",
      "Monthly Google Search Console report",
      "Speed & Core Web Vitals monitoring",
      "Priority response time",
    ],
  },
};

const PLANS: Plan[] = [
  {
    id: "landing",
    accent: "#CC1500",
    maintenance: { price: "15.000", includesEs: MAINT_INCLUDES.basic.es, includesEn: MAINT_INCLUDES.basic.en },
    es: {
      name: "Landing Page", tag: "Sitio Web", price: "220.000", originalPrice: "260.000",
      includes: [
        "Diseño UI/UX exclusivo (sin plantillas)",
        "Hasta 6 secciones en una sola página",
        "Formulario de contacto funcional",
        "100% responsive — mobile first",
        "Hosting gratuito permanente en Vercel",
        "Dominio propio conectado",
      ],
    },
    en: {
      name: "Landing Page", tag: "Website", price: "220.000", originalPrice: "260.000",
      includes: [
        "Custom UI/UX design (no templates)",
        "Up to 6 sections on a single page",
        "Functional contact form",
        "100% responsive — mobile first",
        "Free permanent hosting on Vercel",
        "Custom domain connected",
      ],
    },
  },
  {
    id: "multiseccion",
    accent: "#7C3AED",
    featured: true,
    maintenance: { price: "20.000", includesEs: MAINT_INCLUDES.basic.es, includesEn: MAINT_INCLUDES.basic.en },
    es: {
      name: "Multi-sección", tag: "Sitio Web", price: "350.000", originalPrice: "400.000",
      includes: [
        "Todo lo de Landing Page",
        "Múltiples páginas con navegación propia",
        "Galería o portfolio interactivo",
        "Animaciones premium (Framer Motion)",
        "SEO técnico completo (meta, sitemap, OG)",
        "Performance optimizada para Google",
      ],
    },
    en: {
      name: "Multi-section", tag: "Website", price: "350.000", originalPrice: "400.000",
      includes: [
        "Everything in Landing Page",
        "Multiple pages with own navigation",
        "Interactive gallery or portfolio",
        "Premium animations (Framer Motion)",
        "Full technical SEO (meta, sitemap, OG)",
        "Performance optimized for Google",
      ],
    },
  },
  {
    id: "tienda",
    accent: "#06B6D4",
    maintenance: { price: "40.000", includesEs: MAINT_INCLUDES.full.es, includesEn: MAINT_INCLUDES.full.en },
    es: {
      name: "Tienda Online", tag: "E-commerce", price: "550.000", originalPrice: "650.000",
      includes: [
        "Diseño UI/UX exclusivo",
        "Catálogo con filtros y búsqueda",
        "Carrito y checkout completo",
        "Pagos con Mercado Pago y/o Stripe",
        "Panel admin propio — sin Shopify ni comisiones",
        "Gestión de stock y pedidos",
        "SEO optimizado para páginas de producto",
      ],
    },
    en: {
      name: "Online Store", tag: "E-commerce", price: "550.000", originalPrice: "650.000",
      includes: [
        "Custom UI/UX design",
        "Catalog with filters and search",
        "Cart and full checkout",
        "Payments via Mercado Pago and/or Stripe",
        "Custom admin panel — no Shopify, no fees",
        "Stock and order management",
        "SEO optimized product pages",
      ],
    },
  },
  {
    id: "custom",
    accent: "#10B981",
    quote: true,
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

/** Parse "150.000" → 150000, convert to USD, format nicely */
function convertToUSD(arsStr: string, rate: number): string {
  const num = parseFloat(arsStr.replace(/\./g, "").replace(",", "."));
  const usd = num / rate;
  // Format with no decimals if whole, else 2 decimals
  return usd % 1 === 0 ? usd.toFixed(0) : usd.toFixed(0);
}

type Currency = "ARS" | "USD";

const BG_BLOBS = [
  { color: "#CC1500", w: 500, x: "90%", y: "20%", op: 0.08, cls: "blob-1" },
  { color: "#7C3AED", w: 400, x: "5%",  y: "55%", op: 0.07, cls: "blob-2" },
  { color: "#06B6D4", w: 280, x: "55%", y: "92%", op: 0.05, cls: "blob-1" },
];

export const ServicesSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const ref  = useRef<HTMLElement>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [currency, setCurrency] = useState<Currency>("ARS");
  const { rate, loading: rateLoading, error: rateError, lastUpdate } = useDollarRate();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  /** Format a price string based on selected currency */
  const formatPrice = (arsPrice: string): string => {
    if (currency === "ARS" || !rate) return arsPrice;
    return convertToUSD(arsPrice, rate);
  };

  const currencyLabel = currency === "ARS" ? "ARS" : "USD";
  const currencySymbol = currency === "ARS" ? "$" : "US$";

  /** Format the last update time */
  const formatLastUpdate = (): string => {
    if (!lastUpdate) return "";
    try {
      const d = new Date(lastUpdate);
      return d.toLocaleTimeString(lang === "en" ? "en-US" : "es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

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
            fontSize: "clamp(2.3rem, 7vw, 6rem)",
            letterSpacing: "-0.03em",
          }}
        >
          <span className="mr-3" style={{ WebkitTextStroke: "1.2px rgba(255,255,255,0.9)", WebkitTextFillColor: "transparent", color: "transparent" }}>
            {lang === "en" ? "PRICING" : "PRECIOS"}
          </span>
          <span className="text-white">
            {lang === "en" ? "MADE SIMPLE." : "SIN VUELTAS."}
          </span>
        </motion.h2>
      </div>

      {/* Currency toggle */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex flex-wrap items-center gap-4 mb-10"
      >
        {/* Toggle pill */}
        <div
          className="relative flex"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {(["ARS", "USD"] as Currency[]).map((cur) => (
            <button
              key={cur}
              onClick={() => {
                if (cur === "USD" && !rate) return;
                setCurrency(cur);
              }}
              className="relative px-5 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300"
              style={{
                fontFamily: "Poppins, sans-serif",
                color: currency === cur ? "#fff" : "rgba(255,255,255,0.25)",
                background: currency === cur ? "rgba(255,255,255,0.08)" : "transparent",
                cursor: cur === "USD" && !rate ? "not-allowed" : "pointer",
                opacity: cur === "USD" && !rate ? 0.3 : 1,
              }}
            >
              {cur}
              {currency === cur && (
                <motion.div
                  layoutId="currency-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "#fff" }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Rate info */}
        <AnimatePresence mode="wait">
          {rateLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <RefreshCw size={10} className="animate-spin" style={{ color: "rgba(255,255,255,0.25)" }} />
              <span
                className="text-[9px] font-medium"
                style={{ fontFamily: "Poppins, sans-serif", color: "rgba(255,255,255,0.25)" }}
              >
                {lang === "en" ? "Loading rate..." : "Cargando cotización..."}
              </span>
            </motion.div>
          )}
          {!rateLoading && !rateError && rate && (
            <motion.div
              key="rate"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#10B981", boxShadow: "0 0 6px #10B98166" }}
              />
              <span
                className="text-[9px] font-medium"
                style={{ fontFamily: "Poppins, sans-serif", color: "rgba(255,255,255,0.3)" }}
              >
                {lang === "en" ? "Blue dollar" : "Dólar blue"}: ${rate.toLocaleString("es-AR")}
                {formatLastUpdate() && (
                  <span style={{ color: "rgba(255,255,255,0.15)" }}>
                    {" · "}
                    {lang === "en" ? "Updated" : "Act."} {formatLastUpdate()}
                  </span>
                )}
              </span>
            </motion.div>
          )}
          {!rateLoading && rateError && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#EF4444" }}
              />
              <span
                className="text-[9px] font-medium"
                style={{ fontFamily: "Poppins, sans-serif", color: "rgba(255,255,255,0.25)" }}
              >
                {lang === "en" ? "Rate unavailable" : "Cotización no disponible"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pricing grid — 1 col / 2 col sm / 4 col xl */}
      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {PLANS.map((plan, i) => {
          const c = lang === "en" ? plan.en : plan.es;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-2xl"
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
                      <span className="text-white/30 font-black text-base" style={{ fontFamily: "Poppins, sans-serif" }}>{currencySymbol}</span>
                      <motion.span
                        key={`${plan.id}-price-${currency}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-black text-white leading-none"
                        style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", letterSpacing: "-0.03em" }}
                      >
                        {formatPrice(c.price!)}
                      </motion.span>
                      <span className="text-white/30 font-black text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>{currencyLabel}</span>
                      {c.period && (
                        <span className="text-white/35 font-black text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>{c.period}</span>
                      )}
                    </div>
                  )}
                  {c.originalPrice && (
                    <p className="text-white/22 text-sm line-through mt-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {currencySymbol} {formatPrice(c.originalPrice)} {currencyLabel}
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
                  <div className="relative mb-4">
                    <div className="flex items-center gap-2 py-2.5 px-3"
                      style={{ background: `${plan.accent}08`, border: `1px solid ${plan.accent}20` }}>
                      <div className="w-1 h-1 rounded-full shrink-0" style={{ background: plan.accent }} />
                      <span className="flex-1 text-[9px] font-black uppercase tracking-[0.18em]"
                        style={{ fontFamily: "Poppins, sans-serif", color: `${plan.accent}99` }}>
                        {lang === "en"
                          ? `Maintenance · ${currencySymbol}${formatPrice(plan.maintenance.price)}/mo`
                          : `Mantenimiento · ${currencySymbol}${formatPrice(plan.maintenance.price)}/mes`}
                      </span>
                      <button
                        onMouseEnter={() => setTooltip(plan.id)}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={() => setTooltip(plan.id)}
                        onBlur={() => setTooltip(null)}
                        className="shrink-0 outline-none"
                        aria-label={lang === "en" ? "Maintenance info" : "Info sobre mantenimiento"}
                      >
                        <Info size={11} style={{ color: `${plan.accent}80` }} />
                      </button>
                    </div>
                    <AnimatePresence>
                      {tooltip === plan.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.18 }}
                          className="absolute bottom-full left-0 right-0 mb-2 z-50 p-3"
                          style={{
                            background: "#161616",
                            border: `1px solid ${plan.accent}30`,
                            boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px ${plan.accent}15`,
                          }}
                        >
                          <p className="text-[8.5px] font-black uppercase tracking-[0.2em] mb-2"
                            style={{ fontFamily: "Poppins, sans-serif", color: plan.accent }}>
                            {lang === "en" ? "Optional · Highly recommended" : "Opcional · Muy recomendable"}
                          </p>
                          <ul className="flex flex-col gap-1">
                            {(lang === "en" ? plan.maintenance.includesEn : plan.maintenance.includesEs).map((item, ii) => (
                              <li key={ii} className="flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full shrink-0" style={{ background: plan.accent }} />
                                <span className="text-white/50 text-[10px] leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
          ? `* Prices do not include the annual domain or external hosting if the project cannot be deployed on Vercel. Landing pages and multi-section sites include deployment.${currency === "USD" ? " Prices converted from ARS using the Blue Dollar rate. Values are approximate." : " Prices in Argentine pesos."}`
          : `* Los precios no incluyen el dominio anual ni hosting externo en caso de que el proyecto no pueda deployarse en Vercel. Las landing pages y sitios multi-sección incluyen el deploy.${currency === "USD" ? " Precios convertidos desde ARS usando la cotización del dólar blue. Los valores son aproximados." : " Precios en pesos argentinos."}`}
      </motion.p>
    </section>
  );
};
