import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROWS = [
  "#CC1500", // red
  "#7C3AED", // purple
  "#06B6D4", // cyan
  "#D97706", // amber
  "#10B981", // green
  "#EC4899", // pink
  "#0A0A0A", // near-black
];

const N = ROWS.length;

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
          {ROWS.map((color, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className="absolute left-0 right-0"
                style={{
                  top:        `${(i / N) * 100}%`,
                  height:     `${100 / N}%`,
                  background: color,
                }}
                initial={{ x: fromLeft ? "-100%" : "100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 0.65,
                  delay:    i * 0.07,
                  ease:     [0.76, 0, 0.24, 1],
                }}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
