import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

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
];

const StepCard = ({ number, stepKey, index, accent }: { number: string; stepKey: string; index: number; accent: string }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col"
    >
      {/* Node */}
      <div className="w-12 h-12 mb-5 flex items-center justify-center shrink-0 relative bg-[#F5F4F0] rounded-full z-10">
        <div
          className="w-full h-full rounded-full flex items-center justify-center border"
          style={{ borderColor: accent, backgroundColor: `${accent}15`, color: accent }}
        >
          <span className="font-mono text-xs font-black">{number}</span>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 bg-white/70 backdrop-blur-md border border-[#0A0A0A]/[0.06] rounded-2xl p-6 flex flex-col gap-2.5 shadow-[0_4px_20px_-4px_rgba(10,10,10,0.03)] transition-all duration-300 hover:shadow-[0_12px_30px_-6px_rgba(10,10,10,0.08)] hover:-translate-y-1">
        <span
          className="text-[8px] font-black uppercase tracking-[0.3em] px-2.5 py-1 self-start rounded-full"
          style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}30` }}
        >
          {t(`process.steps.${stepKey}.tags.0`)}
        </span>
        <h3
          className="font-black uppercase leading-tight text-[#0A0A0A]"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.05rem", letterSpacing: "-0.02em" }}
        >
          {t(`process.steps.${stepKey}.title`)}
        </h3>
        <p className="text-[#0A0A0A]/50 text-[13px] leading-relaxed">{t(`process.steps.${stepKey}.description`)}</p>
      </div>
    </motion.div>
  );
};

export const ProcessSection = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  return (
    <section ref={ref} className="py-20 md:py-28 px-5 sm:px-8 lg:px-10 relative overflow-hidden" style={{ background: BG }}>

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10" style={{ background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10" style={{ background: `linear-gradient(to top, ${BG}, transparent)` }} />

      {/* Blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: blobY }}>
        {BLOBS.map((b, i) => (
          <div key={i} className={`${b.cls} absolute blur-3xl`} style={{ background: b.color, width: b.w, height: b.w, left: b.x, top: b.y, opacity: b.op, transform: "translate(-50%,-50%)" }} />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Label */}
        <div className="flex items-center gap-5 mb-14 border-b border-[#0A0A0A]/8 pb-8">
          <div className="flex items-center gap-2 font-mono text-[9px] text-[#CC1500] uppercase tracking-[0.25em]">
            <span>03</span>
            <span>//</span>
            <span>{t("process.badge")}</span>
          </div>
          <div className="h-px flex-1 bg-[#0A0A0A]/8" />
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0A0A0A]/25" style={{ fontFamily: "Poppins, sans-serif" }}>{t("process.badge")}</span>
        </div>

        {/* Headline — one line, stroke word + solid word, matching the Profesional pattern */}
        <div className="mb-14 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block font-black uppercase leading-[0.85]"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            <span className="mr-3" style={{ WebkitTextStroke: "1.2px #0A0A0A", WebkitTextFillColor: "transparent", color: "transparent" }}>
              {t("process.title")}
            </span>
            <span className="text-[#0A0A0A]">
              {t("process.titleItalic")}
            </span>
          </motion.h2>
        </div>

        {/* Steps — compact 3-column grid, matching the Whatsnext pattern */}
        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="absolute top-6 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-[#CC1500] via-[#7C3AED] to-[#06B6D4] hidden md:block opacity-[0.25] origin-left"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map(({ number, key, accent }, i) => (
              <StepCard key={key} number={number} stepKey={key} index={i} accent={accent} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-2 text-[#0A0A0A]/40 text-[12px] italic"
        >
          <Check size={13} className="text-emerald-600 shrink-0" />
          {t("process.quote")}
        </motion.div>
      </div>
    </section>
  );
};
