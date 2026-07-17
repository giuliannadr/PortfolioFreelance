import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageSquarePlus, ChevronLeft, ChevronRight } from "lucide-react";
import { ReviewForm } from "@/components/ui/ReviewForm";
import { fetchPublishedReviews, type Review as DynReview } from "@/lib/firebase";

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

const PALETTE = ["#CC1500", "#7C3AED", "#06B6D4", "#EC4899", "#F59E0B", "#10B981"];
const colorFor = (name: string) =>
  PALETTE[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];

type CarouselItem = {
  key: string; name: string; initial: string; color: string; isStatic: boolean;
  id?: string; text?: string; role?: string;
};

const Star = ({ color }: { color: string }) => (
  <svg viewBox="0 0 12 12" style={{ width: 11, height: 11, fill: color }}>
    <path d="M6 0 7.35 4.15H12L8.25 6.75l1.35 4.1L6 8.25l-3.6 2.6 1.35-4.1L0 4.15h4.65Z" />
  </svg>
);

// ─── Section ──────────────────────────────────────────────────────────────────
export const TrustSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";

  const [showForm,   setShowForm]   = useState(false);
  const [dynReviews, setDynReviews] = useState<DynReview[]>([]);
  const [hovBtn,     setHovBtn]     = useState(false);
  const [current,    setCurrent]    = useState(0);
  const [direction,  setDirection]  = useState(1);
  const [paused,     setPaused]     = useState(false);

  const ref = useRef<HTMLElement>(null);
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

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setCurrent(prev => (prev + dir + items.length) % items.length);
  }, [items.length]);

  // Auto-advance
  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [paused, go, items.length]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const item = items[current];

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

      <div className="max-w-7xl mx-auto w-full relative z-10">
      {/* Label */}
      <div className="flex items-center gap-5 mb-14">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25"
          style={{ fontFamily: "Poppins, sans-serif" }}>04</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25"
          style={{ fontFamily: "Poppins, sans-serif" }}>{t("trust.badge")}</span>
      </div>

      {/* Headline + leave a review button */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block font-black uppercase leading-[0.85]"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(1.85rem, 7vw, 5.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            <span className="mr-3" style={{ WebkitTextStroke: "1.2px rgba(255,255,255,0.9)", WebkitTextFillColor: "transparent", color: "transparent" }}>
              {lang === "en" ? "THEIR" : "SUS"}
            </span>
            <span className="text-white">
              {lang === "en" ? "WORDS." : "PALABRAS."}
            </span>
          </motion.h2>
        </div>

        <motion.button
          onClick={() => setShowForm(true)}
          onHoverStart={() => setHovBtn(true)}
          onHoverEnd={() => setHovBtn(false)}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-2.5 px-5 py-3 self-start sm:self-auto overflow-hidden shrink-0 rounded-full"
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

      {/* ── CAROUSEL ── */}
      <div
        className="max-w-3xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Card */}
        <div className="relative overflow-hidden" style={{ minHeight: 260 }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={item.key}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.045)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: `0 24px 60px -12px ${item.color}30, 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              {/* Top glow */}
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: item.color }} />
              <div className="absolute top-1.5 left-0 right-0 h-24 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, ${item.color}14, transparent)` }} />
              <div className="absolute top-1.5 left-6 right-6 h-px pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)" }} />

              <div className="p-8 md:p-12">
                {/* Stars + quote mark */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} color={item.color} />)}
                  </div>
                  <span className="font-serif leading-none select-none"
                    style={{ fontSize: "3rem", lineHeight: 1, color: `${item.color}35` }}>"</span>
                </div>

                {/* Quote */}
                <blockquote
                  className="text-white/80 leading-relaxed mb-8"
                  style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" }}
                >
                  {item.text}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-6"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black shrink-0"
                    style={{ fontFamily: "Poppins, sans-serif", background: item.color, fontSize: "0.9rem" }}
                  >
                    {item.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm text-white leading-tight"
                      style={{ fontFamily: "Poppins, sans-serif" }}>
                      {item.name}
                    </p>
                    <p className="text-[8.5px] uppercase tracking-[0.28em] text-white/30 truncate mt-0.5">
                      {item.role || (lang === "en" ? "Client" : "Cliente")}
                    </p>
                  </div>
                  <span
                    className="text-[7px] font-black uppercase tracking-[0.18em] px-2.5 py-1 shrink-0 rounded-full"
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
          </AnimatePresence>
        </div>

        {/* Controls: prev · dots · next */}
        {items.length > 1 && (
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/30 hover:border-white/30 hover:text-white transition-all duration-200"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 20 : 6,
                    height: 6,
                    background: i === current ? item.color : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/30 hover:border-white/30 hover:text-white transition-all duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
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
