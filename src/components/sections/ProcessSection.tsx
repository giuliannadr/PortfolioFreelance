import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

const BG = "#F5F4F0";

const STEPS = [
  { number: "01", key: "step1", accent: "#CC1500" },
  { number: "02", key: "step2", accent: "#7C3AED" },
  { number: "03", key: "step3", accent: "#06B6D4" },
];

const BLOBS = [
  { color: "#7C3AED", w: 460, x: "4%",  y: "28%", op: 0.08, cls: "blob-2" },
  { color: "#CC1500", w: 400, x: "94%", y: "55%", op: 0.08, cls: "blob-1" },
  { color: "#D97706", w: 320, x: "50%", y: "92%", op: 0.06, cls: "blob-2" },
  { color: "#06B6D4", w: 260, x: "70%", y: "8%",  op: 0.06, cls: "blob-1" },
  { color: "#EC4899", w: 220, x: "25%", y: "70%", op: 0.05, cls: "blob-2" },
];

const StepRow = ({ number, stepKey, index, accent }: { number: string; stepKey: string; index: number; accent: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "start 0.28"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-[44px_1fr] lg:grid-cols-[60px_1fr_auto] gap-6 lg:gap-16 py-10 border-b border-[#0A0A0A]/8"
    >
      {/* Step num + animated connector */}
      <div className="flex flex-col items-center pt-1">
        <span className="font-black leading-none" style={{ fontFamily: "Poppins, sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: accent }}>{number}</span>
        {index < 2 && (
          <div className="mt-3 w-px bg-[#0A0A0A]/10" style={{ height: 44 }}>
            <motion.div className="w-full origin-top h-full" style={{ scaleY: lineScaleY, background: accent }} />
          </div>
        )}
      </div>

      <div className="pb-2">
        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-black uppercase leading-none text-[#0A0A0A] mb-3"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.3rem, 3.2vw, 2.4rem)", letterSpacing: "-0.03em" }}
        >
          {t(`process.steps.${stepKey}.title`)}
        </motion.h3>
        <p className="text-[#0A0A0A]/45 text-base leading-relaxed max-w-xl">{t(`process.steps.${stepKey}.description`)}</p>
      </div>

      <div className="hidden lg:flex items-center">
        <motion.span
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
          className="text-[8px] font-black uppercase tracking-[0.35em] px-4 py-2 border"
          style={{ fontFamily: "Poppins, sans-serif", color: accent, borderColor: `${accent}40` }}
        >
          {t(`process.steps.${stepKey}.tags.0`)}
        </motion.span>
      </div>
    </motion.div>
  );
};

export const ProcessSection = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  const italicGrad = "linear-gradient(110deg, #CC1500 0%, #b01000 55%, #ff5533 100%)";

  return (
    <section ref={ref} className="py-20 md:py-32 px-5 sm:px-8 lg:px-10 relative" style={{ background: BG }}>

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10" style={{ background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10" style={{ background: `linear-gradient(to top, ${BG}, transparent)` }} />

      {/* Blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: blobY }}>
        {BLOBS.map((b, i) => (
          <div key={i} className={`${b.cls} absolute blur-3xl`} style={{ background: b.color, width: b.w, height: b.w, left: b.x, top: b.y, opacity: b.op, transform: "translate(-50%,-50%)" }} />
        ))}
      </motion.div>

      {/* Label */}
      <div className="flex items-center gap-5 mb-14 relative z-20 border-b border-[#0A0A0A]/8 pb-8">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0A0A0A]/30" style={{ fontFamily: "Poppins, sans-serif" }}>03</span>
        <div className="h-px flex-1 bg-[#0A0A0A]/8" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0A0A0A]/30" style={{ fontFamily: "Poppins, sans-serif" }}>{t("process.badge")}</span>
      </div>

      {/* Headline — gradient on light bg */}
      <div className="mb-16 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block font-black uppercase leading-[0.85]"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.03em", color: "#0A0A0A" }}
        >
          {t("process.title")}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-serif italic font-light leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)", backgroundImage: italicGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {t("process.titleItalic")}
        </motion.h2>
      </div>

      <div className="relative z-20">
        {STEPS.map(({ number, key, accent }, i) => (
          <StepRow key={key} number={number} stepKey={key} index={i} accent={accent} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-20 mt-14 text-[#0A0A0A]/35 text-sm italic leading-relaxed border-l-2 border-[#CC1500]/40 pl-5 max-w-sm"
      >
        {t("process.quote")}
      </motion.p>
    </section>
  );
};
