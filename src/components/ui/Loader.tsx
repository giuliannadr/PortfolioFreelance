import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Each row uses the brand gradient at a shifted angle so they read as
// clearly different stripes while staying within the same palette.
const ROWS = [
  "linear-gradient(105deg, #CC1500 0%, #0A0A0A 35%, #7C3AED 70%, #06B6D4 100%)",
  "linear-gradient(115deg, #7C3AED 0%, #0A0A0A 38%, #06B6D4 68%, #CC1500 100%)",
  "linear-gradient(100deg, #06B6D4 0%, #0A0A0A 40%, #CC1500 72%, #7C3AED 100%)",
  "linear-gradient(120deg, #CC1500 0%, #0A0A0A 30%, #7C3AED 62%, #06B6D4 100%)",
  "linear-gradient(108deg, #D97706 0%, #0A0A0A 36%, #CC1500 65%, #EC4899 100%)",
  "linear-gradient(125deg, #7C3AED 0%, #0A0A0A 42%, #10B981 70%, #06B6D4 100%)",
  "linear-gradient(112deg, #CC1500 0%, #0A0A0A 28%, #7C3AED 60%, #06B6D4 100%)",
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
          {ROWS.map((gradient, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className="absolute left-0 right-0"
                style={{
                  top:        `${(i / N) * 100}%`,
                  height:     `${100 / N}%`,
                  background: gradient,
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
