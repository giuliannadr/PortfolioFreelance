import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const SERVICES = [
  { key: "web",         num: "01", accent: "#CC1500" },
  { key: "store",       num: "02", accent: "#7C3AED" },
  { key: "systems",     num: "03", accent: "#06B6D4" },
  { key: "maintenance", num: "04", accent: "#D97706" },
];

const BG_BLOBS = [
  { color: "#CC1500", w: 500, x: "90%", y: "20%", op: 0.08, cls: "blob-1" },
  { color: "#7C3AED", w: 400, x: "5%",  y: "55%", op: 0.07, cls: "blob-2" },
  { color: "#06B6D4", w: 280, x: "55%", y: "92%", op: 0.05, cls: "blob-1" },
];

const CTA_BLOBS = [
  { color: "#CC1500", w: 340, x: "80%", y: "40%", op: 0.22 },
  { color: "#7C3AED", w: 280, x: "18%", y: "60%", op: 0.16 },
  { color: "#D97706", w: 200, x: "50%", y: "110%", op: 0.12 },
  { color: "#06B6D4", w: 180, x: "88%", y: "8%",  op: 0.10 },
];

const SVC_BLOB_GRAD = [
  "radial-gradient(ellipse 90% 160% at 8% 50%, rgba(204,21,0,0.50), transparent 55%)",
  "radial-gradient(ellipse 80% 140% at 92% 50%, rgba(124,58,237,0.42), transparent 55%)",
  "radial-gradient(ellipse 60% 110% at 50% -15%, rgba(6,182,212,0.30), transparent 50%)",
  "#ffffff",
].join(", ");

const ServiceCtaBtn = ({ lang, onClick }: { lang: string; onClick: () => void }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileTap={{ scale: 0.97 }}
      className="relative z-10 flex items-center gap-3 bg-white text-[#0A0A0A] font-black text-[10px] uppercase tracking-[0.3em] px-10 py-5 group overflow-hidden mb-4"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <span
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: hov ? 1 : 0, background: SVC_BLOB_GRAD }}
      />
      <span className="relative z-10 flex items-center gap-3">
        {lang === "en" ? "Write on WhatsApp" : "Escribime por WhatsApp"}
        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </motion.button>
  );
};

export const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const ref  = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const headGrad = "linear-gradient(120deg, #CC1500 0%, #ffffff 38%, #7C3AED 72%, #D97706 100%)";
  const ctaGrad  = "linear-gradient(120deg, #CC1500 0%, #0A0A0A 35%, #7C3AED 68%, #06B6D4 100%)";

  const handleGeneral = () => {
    const msg = lang === "en"
      ? "Hi! I'd like to request a quote for a project."
      : "¡Hola! Me gustaría solicitar un presupuesto para un proyecto.";
    window.open(`https://wa.me/5491150403408?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section ref={ref} id="services" className="bg-[#0A0A0A] text-white py-20 md:py-32 px-5 sm:px-8 lg:px-10 relative">

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0A0A0A, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }} />

      {/* Background blobs */}
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
          style={{ fontFamily: "Poppins, sans-serif" }}>{t("services.badge")}</span>
      </div>

      {/* Headline */}
      <div className="mb-16 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block font-black uppercase leading-[0.85]"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.03em", backgroundImage: headGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {t("services.title")}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-serif italic font-light leading-[1.05] text-white/20"
          style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}
        >
          {t("services.titleItalic")}
        </motion.h2>
      </div>

      {/* 2×2 Service Cards */}
      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.05] mb-20">
        {SERVICES.map(({ key, num, accent }, i) => {
          const details = t(`services.items.${key}.details`, { returnObjects: true }) as string[];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[#0A0A0A] p-8 lg:p-10 relative"
              style={{ borderTop: `2px solid ${accent}28` }}
            >
              {/* Hover radial glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 65% 55% at 25% 25%, ${accent}0C, transparent)` }}
              />

              {/* Number row */}
              <div className="flex items-center gap-3 mb-7">
                <span className="font-black leading-none shrink-0"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", color: accent }}>
                  {num}
                </span>
                <div className="h-px flex-1" style={{ background: `${accent}28` }} />
              </div>

              {/* Title */}
              <h3
                className="font-black uppercase text-white leading-none mb-4"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.25rem, 2.8vw, 2rem)", letterSpacing: "-0.02em" }}
              >
                {t(`services.items.${key}.title`)}
              </h3>

              {/* Description */}
              <p className="text-white/35 text-sm leading-relaxed mb-7">
                {t(`services.items.${key}.description`)}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {details.map((d, di) => (
                  <span
                    key={di}
                    className="text-[9px] font-black uppercase tracking-[0.18em] px-3 py-1.5 border"
                    style={{ fontFamily: "Poppins, sans-serif", color: accent, borderColor: `${accent}35` }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Container — blobs clipped inside with overflow-hidden */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 overflow-hidden flex flex-col items-center text-center px-8 py-16 md:py-20"
        style={{ background: "#F8F7F5" }}
      >
        {/* Blobs clipped inside the box */}
        {CTA_BLOBS.map((b, i) => (
          <div
            key={i}
            className="absolute blur-3xl pointer-events-none"
            style={{ background: b.color, width: b.w, height: b.w, left: b.x, top: b.y, opacity: b.op, transform: "translate(-50%,-50%)", borderRadius: "50%" }}
          />
        ))}

        {/* Badge */}
        <div className="relative z-10 flex items-center gap-4 mb-8">
          <div className="h-px w-10" style={{ background: "rgba(10,10,10,0.12)" }} />
          <span
            className="text-[9px] font-black uppercase tracking-[0.5em]"
            style={{ fontFamily: "Poppins, sans-serif", color: "rgba(10,10,10,0.35)" }}
          >
            {t("services.cta.badge")}
          </span>
          <div className="h-px w-10" style={{ background: "rgba(10,10,10,0.12)" }} />
        </div>

        {/* Headline */}
        <div className="relative z-10 mb-3">
          <h3
            className="font-black uppercase leading-none"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.03em", backgroundImage: ctaGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            {t("services.cta.title")}
          </h3>
        </div>

        {/* Subtext */}
        <p
          className="relative z-10 text-[#0A0A0A]/40 leading-relaxed mb-10 text-sm"
          style={{ maxWidth: "min(440px, 88vw)" }}
        >
          {lang === "en"
            ? "Tell me about your idea. I'll get back to you in less than 24 hours."
            : "Contame tu idea. Te respondo en menos de 24 horas."}
        </p>

        {/* Button */}
        <ServiceCtaBtn lang={lang} onClick={handleGeneral} />

        <span
          className="relative z-10 text-[9px] font-black uppercase tracking-[0.4em]"
          style={{ fontFamily: "Poppins, sans-serif", color: "rgba(10,10,10,0.20)" }}
        >
          {lang === "en" ? "No commitment. Just a conversation." : "Sin compromiso. Solo una charla."}
        </span>
      </motion.div>

    </section>
  );
};
