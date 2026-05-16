import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageSquarePlus } from "lucide-react";
import { ReviewForm } from "@/components/ui/ReviewForm";
import { fetchPublishedReviews, type Review as DynReview } from "@/lib/firebase";
import { SPOTS_DARK } from "@/lib/textGradients";

// ─── Static fallback reviews ──────────────────────────────────────────────────
const STATIC_REVIEWS = {
  es: [
    { key: "s1", name: "Camila Grondona", initial: "C", color: "#06B6D4", isStatic: true, text: "Pasar de un PDF en Canva a una web profesional cambió totalmente cómo nos ven los clientes. Giuliana logró una identidad digital con animaciones que realmente rompe lo convencional.", role: "UNIK — Estrategia de negocio" },
    { key: "s2", name: "Iara Rotela",     initial: "I", color: "#7C3AED", isStatic: true, text: "Buscábamos que el acceso a nuestro trabajo y el contacto por WhatsApp fuera directo y profesional. Giuliana nos dio una solución impecable que simplificó la llegada de nuevos clientes.", role: "UNIK — Directora Creativa" },
    { key: "s3", name: "Miri G.",         initial: "M", color: "#CC1500", isStatic: true, text: "Giuliana entendió de inmediato la calidez que quería transmitir. Desde que lanzamos la web, las consultas se volvieron más profesionales y el proceso de reservas es mucho más fluido.", role: "La Quinta Miri — Propietaria" },
  ],
  en: [
    { key: "s1", name: "Camila Grondona", initial: "C", color: "#06B6D4", isStatic: true, text: "Moving from a Canva PDF to a professional website totally changed how clients see us. Giuliana achieved a digital identity with animations that really breaks the mold.", role: "UNIK — Business Strategy" },
    { key: "s2", name: "Iara Rotela",     initial: "I", color: "#7C3AED", isStatic: true, text: "We wanted access to our work and WhatsApp contact to be direct and professional. Giuliana gave us a flawless solution that simplified the arrival of new clients.", role: "UNIK — Creative Director" },
    { key: "s3", name: "Miri G.",         initial: "M", color: "#CC1500", isStatic: true, text: "Giuliana immediately understood the warmth I wanted to convey. Since we launched the web, inquiries have become more professional and the booking process is much smoother.", role: "La Quinta Miri — Owner" },
  ],
};

const METRICS = [
  { num: "100%", color: "#CC1500", es: "Velocidad · Excelente",     en: "Speed · Excellent"       },
  { num: "1:1",  color: "#7C3AED", es: "Atención directa",          en: "Direct attention"         },
  { num: "∞",    color: "#06B6D4", es: "Web moderna · Garantizada", en: "Modern web · Guaranteed"  },
];

const PALETTE = ["#CC1500", "#7C3AED", "#06B6D4", "#EC4899", "#F59E0B", "#10B981"];
const colorFor = (name: string) =>
  PALETTE[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];

type CarouselItem = {
  key: string; name: string; initial: string; color: string; isStatic: boolean;
  id?: string; text?: string; role?: string;
};

// ─── Star icon ────────────────────────────────────────────────────────────────
const Star = ({ color }: { color: string }) => (
  <svg viewBox="0 0 12 12" style={{ width: 11, height: 11, fill: color }}>
    <path d="M6 0 7.35 4.15H12L8.25 6.75l1.35 4.1L6 8.25l-3.6 2.6 1.35-4.1L0 4.15h4.65Z" />
  </svg>
);

// ─── Review card ──────────────────────────────────────────────────────────────
const ReviewCard = ({
  item, lang, index,
}: { item: CarouselItem; lang: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col relative overflow-hidden h-full"
    style={{
      background: "rgba(255,255,255,0.04)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderTop: `2px solid ${item.color}`,
      boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
    }}
  >
    {/* Top glow */}
    <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
      style={{ background: `linear-gradient(to bottom, ${item.color}14, transparent)` }} />

    {/* Glass top highlight */}
    <div className="absolute top-0 left-6 right-6 h-px pointer-events-none"
      style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)" }} />

    <div className="p-6 lg:p-8 flex flex-col flex-1 relative">
      {/* Stars + decorative quote */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => <Star key={i} color={item.color} />)}
        </div>
        <span
          className="font-serif leading-none select-none"
          style={{ fontSize: "2.5rem", lineHeight: 1, color: `${item.color}35` }}
        >"</span>
      </div>

      {/* Quote text — readable body size, not huge */}
      <blockquote
        className="text-white/75 leading-relaxed flex-1 mb-6"
        style={{ fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)" }}
      >
        {item.text}
      </blockquote>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0"
          style={{ fontFamily: "Poppins, sans-serif", background: item.color }}
        >
          {item.initial}
        </div>
        {/* Name + role */}
        <div className="flex-1 min-w-0">
          <p className="font-black text-sm text-white leading-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            {item.name}
          </p>
          <p className="text-[8.5px] uppercase tracking-[0.28em] text-white/30 truncate mt-0.5">
            {item.role || (lang === "en" ? "Client" : "Cliente")}
          </p>
        </div>
        {/* Verified badge */}
        <span
          className="text-[7px] font-black uppercase tracking-[0.18em] px-2 py-1 shrink-0"
          style={{
            fontFamily: "Poppins, sans-serif",
            color: item.color,
            background: `${item.color}14`,
            border: `1px solid ${item.color}30`,
          }}
        >
          ✓ {lang === "en" ? "Verified" : "Verificado"}
        </span>
      </div>
    </div>
  </motion.div>
);

// ─── Section ──────────────────────────────────────────────────────────────────
export const TrustSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";

  const [showForm,   setShowForm]   = useState(false);
  const [dynReviews, setDynReviews] = useState<DynReview[]>([]);
  const [hovBtn,     setHovBtn]     = useState(false);

  const ref = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const loadReviews = useCallback(() => {
    fetchPublishedReviews().then(setDynReviews).catch(() => {});
  }, []);

  useEffect(() => { loadReviews(); }, [loadReviews]);

  const items = useMemo<CarouselItem[]>(() => {
    if (dynReviews.length > 0) {
      return dynReviews.map(r => ({
        key: r.id, name: r.name, initial: r.name.charAt(0).toUpperCase() || "?",
        color: colorFor(r.name), isStatic: false, text: r.comment, role: r.role,
      }));
    }
    return STATIC_REVIEWS[lang === "en" ? "en" : "es"];
  }, [dynReviews, lang]);

  return (
    <section ref={ref} className="bg-[#0A0A0A] text-white pt-16 pb-10 md:pt-24 md:pb-14 px-5 sm:px-8 lg:px-10 relative" id="trust">

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0A0A0A, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }} />

      {/* Ambient blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: blobY }}>
        <div className="blob-2 absolute blur-3xl"
          style={{ background: "#7C3AED", width: 480, height: 480, left: "80%", top: "35%", opacity: 0.08, transform: "translate(-50%,-50%)" }} />
        <div className="blob-1 absolute blur-3xl"
          style={{ background: "#CC1500", width: 320, height: 320, left: "8%", top: "65%", opacity: 0.06, transform: "translate(-50%,-50%)" }} />
      </motion.div>

      {/* Label */}
      <div className="flex items-center gap-5 mb-14 relative z-10">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25"
          style={{ fontFamily: "Poppins, sans-serif" }}>04</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25"
          style={{ fontFamily: "Poppins, sans-serif" }}>{t("trust.badge")}</span>
      </div>

      {/* Headline + leave a review button */}
      <div className="mb-12 relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block font-black uppercase leading-[0.85]"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(1.85rem, 9vw, 8rem)",
              letterSpacing: "-0.03em",
              backgroundImage: SPOTS_DARK,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {lang === "en" ? "What they" : "Lo que dicen"}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block font-serif italic font-light leading-[1.05] text-white/20"
            style={{ fontSize: "clamp(1.2rem, 6vw, 5.5rem)" }}
          >
            {lang === "en" ? "say." : "mis clientes."}
          </motion.h2>
        </div>

        {/* Leave a review button — next to headline */}
        <motion.button
          onClick={() => setShowForm(true)}
          onHoverStart={() => setHovBtn(true)}
          onHoverEnd={() => setHovBtn(false)}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-2.5 px-5 py-3 self-start sm:self-auto overflow-hidden shrink-0"
          style={{
            fontFamily: "Poppins, sans-serif",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hovBtn ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
          <span className="relative z-10 flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.3em] text-white/45 group-hover:text-white/75 transition-colors duration-300">
            {lang === "en" ? "Leave a review" : "Dejar una reseña"}
            <MessageSquarePlus size={12} />
          </span>
        </motion.button>
      </div>

      {/* ── MOBILE: horizontal scroll carousel ── */}
      <div
        ref={carouselRef}
        className="md:hidden relative z-10 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5"
        style={{ WebkitOverflowScrolling: "touch", paddingBottom: "4px" }}
      >
        {items.map((item, i) => (
          <div
            key={item.key}
            className="snap-start shrink-0"
            style={{ width: "80vw" }}
          >
            <ReviewCard item={item} lang={lang} index={i} />
          </div>
        ))}
        <div className="shrink-0 w-5" />
      </div>

      {/* ── DESKTOP: 3-column grid ── */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 relative z-10">
        {items.map((item, i) => (
          <ReviewCard key={item.key} item={item} lang={lang} index={i} />
        ))}
      </div>

      {/* Metrics */}
      <div className="relative z-10 border-t border-white/[0.06] mt-12 pt-8 grid grid-cols-3 divide-x divide-white/[0.06]">
        {METRICS.map(({ num, color, es, en }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="py-6 px-3 sm:px-8 first:pl-0 last:pr-0 flex flex-col gap-1"
          >
            <p className="font-black leading-none"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.4rem, 5vw, 3rem)", color }}>
              {num}
            </p>
            <p className="text-white/25 leading-tight"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(0.55rem, 1.2vw, 0.65rem)", textTransform: "uppercase", letterSpacing: "0.3em" }}>
              {lang === "en" ? en : es}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Review form overlay */}
      <AnimatePresence>
        {showForm && (
          <ReviewForm
            lang={lang}
            onClose={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false);
              setTimeout(loadReviews, 800);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
