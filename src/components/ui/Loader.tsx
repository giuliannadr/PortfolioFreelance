import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Same gradient used in the hero headline — visual continuity on reveal
const HEAD_GRAD = "linear-gradient(120deg, #CC1500 0%, #ffffff 38%, #7C3AED 72%, #06B6D4 100%)";

export const Loader = ({ onDone }: { onDone: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setVisible(false), 1900);
    const t2 = setTimeout(() => { document.body.style.overflow = ""; onDone(); }, 2460);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        // Single dark panel — exits upward like a curtain rising
        <motion.div
          key="loader"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0A0A0A] select-none"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.58, ease: [0.76, 0, 0.24, 1] }}
        >

          {/* ── Name block ── */}
          <div className="flex flex-col items-center">

            {/* GIULIANA — gradient, Poppins black, same language as hero */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="block font-black uppercase leading-none"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "clamp(2.8rem, 12vw, 9rem)",
                  letterSpacing: "-0.04em",
                  backgroundImage: HEAD_GRAD,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                GIULIANA
              </motion.span>
            </div>

            {/* Di Rocco — Playfair italic, faded — same contrast pair as hero */}
            <div className="overflow-hidden -mt-1">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block font-serif italic font-light leading-none"
                style={{
                  fontSize: "clamp(1.8rem, 8vw, 6rem)",
                  letterSpacing: "-0.01em",
                  color: "rgba(255,255,255,0.20)",
                }}
              >
                Di Rocco
              </motion.span>
            </div>
          </div>

          {/* ── Progress bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            className="mt-10 relative overflow-hidden"
            style={{
              width: "min(160px, 38vw)",
              height: "1px",
              background: "rgba(255,255,255,0.07)",
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#CC1500]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "left", width: "100%" }}
              transition={{ duration: 1.25, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          {/* ── Role — tiny, barely visible, typographic detail ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-4 font-black uppercase tracking-[0.45em] text-[8px]"
            style={{ fontFamily: "Poppins, sans-serif", color: "rgba(255,255,255,0.12)" }}
          >
            Diseño & Desarrollo Web
          </motion.p>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
