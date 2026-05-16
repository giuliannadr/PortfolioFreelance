import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const REVIEW_BTN_GRAD = [
  "radial-gradient(ellipse 90% 160% at 8% 50%, rgba(204,21,0,0.50), transparent 55%)",
  "radial-gradient(ellipse 80% 140% at 92% 50%, rgba(124,58,237,0.42), transparent 55%)",
  "radial-gradient(ellipse 60% 110% at 50% -15%, rgba(6,182,212,0.30), transparent 50%)",
  "#ffffff",
].join(", ");
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageSquarePlus } from "lucide-react";
import { ReviewForm } from "@/components/ui/ReviewForm";
import { fetchPublishedReviews, type Review as DynReview } from "@/lib/firebase";

// ─── Color palette for dynamic reviews ────────────────────────────────────────

const METRICS = [
  { num: "100%", color: "#CC1500", es: "Velocidad · Excelente",     en: "Speed · Excellent" },
  { num: "1:1",  color: "#7C3AED", es: "Atención directa",          en: "Direct attention"  },
  { num: "∞",    color: "#06B6D4", es: "Web moderna · Garantizada", en: "Modern web · Guaranteed" },
];

// Color palette for dynamic reviews (cycles deterministically by name)
const PALETTE = ["#CC1500", "#7C3AED", "#06B6D4", "#EC4899", "#F59E0B", "#10B981"];
const colorFor = (name: string) =>
  PALETTE[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTE.length];

// Unified carousel item
type CarouselItem = {
  key:      string;
  name:     string;
  initial:  string;
  color:    string;
  isStatic: boolean;
  // static
  id?:      string;
  // dynamic
  text?:    string;
  role?:    string;
};

export const TrustSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";

  const [idx,        setIdx]        = useState(0);
  const [showForm,   setShowForm]   = useState(false);
  const [dynReviews, setDynReviews] = useState<DynReview[]>([]);
  const [hovBtn,     setHovBtn]     = useState(false);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // ── fetch reviews ────────────────────────────────────────────────────────────
  const loadReviews = useCallback(() => {
    fetchPublishedReviews().then(setDynReviews).catch(() => {});
  }, []);

  useEffect(() => { loadReviews(); }, [loadReviews]);

  // ── build carousel items from Firebase only ───────────────────────────────
  const items = useMemo<CarouselItem[]>(() =>
    dynReviews.map(r => ({
      key:      r.id,
      name:     r.name,
      initial:  r.name.charAt(0).toUpperCase() || "?",
      color:    colorFor(r.name),
      isStatic: false,
      text:     r.comment,
      role:     r.role,
    })),
  [dynReviews]);

  // ── auto-advance ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(
      () => setIdx(p => (p + 1) % items.length),
      5500,
    );
    return () => clearInterval(timer);
  }, [items.length]);

  const safeIdx  = items.length > 0 ? Math.min(idx, items.length - 1) : 0;
  const cur      = items[safeIdx];
  const hasItems = items.length > 0;

  const quoteGrad = cur
    ? `linear-gradient(120deg, ${cur.color} 0%, #ffffff 45%, ${cur.color}99 100%)`
    : "linear-gradient(120deg, #CC1500 0%, #ffffff 45%, #CC150099 100%)";

  return (
    <section ref={ref} className="bg-[#0A0A0A] text-white py-20 md:py-32 px-5 sm:px-8 lg:px-10 relative" id="trust">

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, #0A0A0A, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10" style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }} />

      {/* Ambient blob — shifts color with active testimonial */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: blobY }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={cur?.key ?? "empty"}
            className="blob-2 absolute blur-3xl"
            style={{ background: cur?.color ?? "#CC1500", width: 520, height: 520, left: "78%", top: "38%", transform: "translate(-50%,-50%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.09 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
        <div className="blob-1 absolute blur-3xl" style={{ background: "#7C3AED", width: 300, height: 300, left: "6%", top: "72%", opacity: 0.05, transform: "translate(-50%,-50%)" }} />
      </motion.div>

      {/* Label */}
      <div className="flex items-center gap-5 mb-14 relative z-10">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25" style={{ fontFamily: "Poppins, sans-serif" }}>04</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25" style={{ fontFamily: "Poppins, sans-serif" }}>{t("trust.badge")}</span>
      </div>

      {/* Giant testimonial */}
      <div className="relative z-10 max-w-5xl mb-16">

        {/* Fixed-height quote area so controls below never jump */}
        <div className="min-h-[320px] sm:min-h-[360px]">
          {!hasItems ? (
            /* Empty state — shown while loading or no reviews yet */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col justify-center h-full py-10">
              <p className="font-black leading-none mb-4 select-none text-white/10" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(5rem,10vw,9rem)", lineHeight: 1 }} aria-hidden>"</p>
              <p className="font-black tracking-tighter text-white/15" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.5rem,3.2vw,2.8rem)" }}>
                {lang === "en" ? "Be the first to leave a review." : "Sé la primera en dejar una reseña."}
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45 }}
              >
                <p className="font-black leading-none mb-2 select-none" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(5rem, 10vw, 9rem)", lineHeight: 1, color: cur.color }} aria-hidden>"</p>

                <blockquote
                  className="font-black tracking-tighter leading-[1.05] mb-8"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(1.5rem, 3.2vw, 2.8rem)",
                    backgroundImage: quoteGrad,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {cur.text}
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 flex items-center justify-center text-white text-sm font-black" style={{ fontFamily: "Poppins, sans-serif", background: cur.color }}>
                    {cur.initial}
                  </div>
                  <div>
                    <p className="font-black text-sm text-white" style={{ fontFamily: "Poppins, sans-serif" }}>{cur.name}</p>
                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/30">{cur.role || (lang === "en" ? "Client" : "Cliente")}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className="flex items-center gap-4 mt-10">
          {/* Nav dots */}
          <div className="flex gap-2 flex-wrap">
            {items.map((item, i) => (
              <button
                key={item.key}
                onClick={() => setIdx(i)}
                className="h-[2px] transition-all duration-300"
                style={{ width: i === safeIdx ? 32 : 12, background: i === safeIdx ? cur.color : "rgba(255,255,255,0.15)" }}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>

          {/* Leave a review button */}
          <motion.button
            onClick={() => setShowForm(true)}
            onHoverStart={() => setHovBtn(true)}
            onHoverEnd={() => setHovBtn(false)}
            whileTap={{ scale: 0.97 }}
            className="group relative ml-auto inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#0A0A0A] font-black text-[9px] uppercase tracking-[0.3em] overflow-hidden"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <span
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{ opacity: hovBtn ? 1 : 0, background: REVIEW_BTN_GRAD }}
            />
            <span className="relative z-10 flex items-center gap-2.5">
              {lang === "en" ? "Leave a review" : "Dejar reseña"}
              <MessageSquarePlus size={13} />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Metrics */}
      <div className="relative z-10 border-t border-white/[0.06] pt-8 grid grid-cols-3 divide-x divide-white/[0.06]">
        {METRICS.map(({ num, color, es, en }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="py-6 px-3 sm:px-8 first:pl-0 last:pr-0 flex flex-col gap-1"
          >
            <p className="font-black leading-none" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.4rem, 5vw, 3rem)", color }}>{num}</p>
            <p className="text-white/25 leading-tight" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(0.55rem, 1.2vw, 0.65rem)", textTransform: "uppercase", letterSpacing: "0.3em" }}>{lang === "en" ? en : es}</p>
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
              // Refresh reviews so the new one appears immediately
              setTimeout(loadReviews, 800);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
