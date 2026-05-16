import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const N = 7;

const ACCENT_COLORS = ["#CC1500", "#7C3AED", "#06B6D4", "#D97706", "#CC1500", "#7C3AED", "#06B6D4"];

export const Loader = ({ onDone }: { onDone: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setVisible(false), 1400);
    const t2 = setTimeout(() => { document.body.style.overflow = ""; onDone(); }, 1950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[999] overflow-hidden pointer-events-none"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.52, ease: [0.76, 0, 0.24, 1] }}
        >
          {Array.from({ length: N }).map((_, i) => {
            const fromLeft = i % 2 === 0;
            const accent   = ACCENT_COLORS[i];
            return (
              <motion.div
                key={i}
                className="absolute left-0 right-0 overflow-hidden"
                style={{
                  top:    `${(i / N) * 100}%`,
                  height: `${100 / N}%`,
                  background: "#0A0A0A",
                }}
                initial={{ x: fromLeft ? "-100%" : "100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 0.65,
                  delay:    i * 0.08,
                  ease:     [0.76, 0, 0.24, 1],
                }}
              >
                {/* leading edge accent line */}
                <motion.div
                  className="absolute top-0 bottom-0 w-[3px]"
                  style={{
                    [fromLeft ? "right" : "left"]: 0,
                    background: accent,
                    opacity: 0.7,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.65, delay: i * 0.08, times: [0, 0.4, 1] }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
