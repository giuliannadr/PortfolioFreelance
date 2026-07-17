"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Linkedin, Github, Instagram, Copy, Check, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const BLOBS = [
  { color: "#CC1500", w: 400, x: "20%", y: "30%", op: 0.05, cls: "blob-1" },
  { color: "#7C3AED", w: 450, x: "80%", y: "60%", op: 0.06, cls: "blob-2" },
];

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const [copied, setCopied] = useState(false);
  const email = "giulianadiroccodev@gmail.com";

  const whatsappUrl = `https://wa.me/5491150403408?text=${encodeURIComponent(
    lang === "en"
      ? "Hi Giuli! I saw your portfolio and I'd like to talk about a project I have in mind."
      : "¡Hola Giuli! Vi tu portfolio y me gustaría que hablemos de mi proyecto."
  )}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(t("footer.emailSubject"));
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`, "_blank");
  };

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);

  const [lx, setLx] = useState(50);
  const [ly, setLy] = useState(50);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const blobX = useSpring(useTransform(rawX, [-1, 1], [-20, 20]), { stiffness: 30, damping: 25 });
  const blobY = useSpring(useTransform(rawY, [-1, 1], [-20, 20]), { stiffness: 30, damping: 25 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      setLx(nx * 100);
      setLy(ny * 100);
      rawX.set((nx - 0.5) * 2);
      rawY.set((ny - 0.5) * 2);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [rawX, rawY]);

  const gradient = `
    radial-gradient(ellipse 60% 80% at ${72 + lx * 0.08}% ${38 + ly * 0.10}%, rgba(204,21,0,1) 0%, transparent 55%),
    radial-gradient(ellipse 45% 70% at ${15 + lx * 0.06}% ${58 + ly * 0.08}%, rgba(124,58,237,0.9) 0%, transparent 50%),
    radial-gradient(ellipse 40% 55% at ${50 + lx * 0.04}% ${10 + ly * 0.12}%, rgba(6,182,212,0.6) 0%, transparent 45%),
    linear-gradient(rgba(255,255,255,1), rgba(255,255,255,1))
  `;

  const headline = `${t("footer.titleLine1")} ${t("footer.titleLine2")}`;

  const socials = [
    { icon: Instagram, href: "https://instagram.com/giulianna.dev",     label: "Instagram" },
    { icon: Linkedin,  href: "https://linkedin.com/in/giulianadirocco", label: "LinkedIn"  },
    { icon: Github,    href: "https://github.com/giuliannadr",          label: "GitHub"    },
  ];

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative bg-[#0A0A0A] py-28 md:py-40 px-5 sm:px-8 lg:px-10 flex flex-col items-center justify-center text-center"
    >
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #0A0A0A, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0" style={{ x: blobX, y: blobY, scale: blobScale }}>
          {BLOBS.map((b, i) => (
            <div key={i}
              className={`${b.cls} absolute blur-3xl`}
              style={{ background: b.color, width: b.w, height: b.w, left: b.x, top: b.y, opacity: b.op, transform: "translate(-50%,-50%)" }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center gap-4 mb-10"
      >
        <div className="h-px w-12 bg-white/15" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30" style={{ fontFamily: "Poppins, sans-serif" }}>
          {t("footer.status")}
        </span>
        <div className="h-px w-12 bg-white/15" />
      </motion.div>

      <div className="relative z-10 mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-black uppercase leading-none"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(1.8rem, 10vw, 9rem)",
            letterSpacing: "-0.04em",
            paddingBottom: "0.12em",
            backgroundImage: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {headline}
        </motion.h2>
      </div>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10 inline-flex items-center gap-3 bg-white text-[#0A0A0A] font-black text-[10px] uppercase tracking-[0.3em] px-10 py-5 mb-12"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        WhatsApp
        <ArrowUpRight size={14} />
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-0 border border-white/10 overflow-hidden w-full sm:w-auto max-w-[min(460px,90vw)] sm:max-w-none"
      >
        <button
          onClick={handleEmailClick}
          className="group flex items-center justify-between sm:justify-start gap-3 px-5 py-3.5 text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 border-b sm:border-b-0 sm:border-r border-white/10"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {email}
          </span>
        </button>

        <button
          onClick={handleCopyEmail}
          className="group flex items-center justify-between sm:justify-start gap-3 px-5 py-3.5 text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 border-b sm:border-b-0 sm:border-r border-white/10"
          aria-label="Copiar email"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ fontFamily: "Poppins, sans-serif" }}>
            {copied ? (lang === "en" ? "Copied!" : "¡Copiado!") : (lang === "en" ? "Copy email" : "Copiar email")}
          </span>
          <motion.div animate={{ scale: copied ? 1.2 : 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          </motion.div>
        </button>

        <div className="flex">
          {socials.map(({ icon: Icon, href, label }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`flex flex-1 sm:flex-none items-center justify-center px-4 py-3.5 text-white/30 hover:text-white hover:bg-white/5 transition-all duration-300 ${i < socials.length - 1 ? "border-r border-white/10" : ""}`}
            >
              <Icon size={13} />
            </a>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 border-t border-white/[0.07] px-5 sm:px-8 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50" style={{ fontFamily: "Poppins, sans-serif" }}>
            © {new Date().getFullYear()} — GIULIANA DI ROCCO
          </p>
          <div className="flex items-center gap-8">
            <span className="hidden md:block text-[9px] font-black uppercase tracking-[0.4em] text-white/50" style={{ fontFamily: "Poppins, sans-serif" }}>
              {t("footer.location")}
            </span>
            <a
              href="#home"
              className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50 hover:text-white transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("footer.backToTop")} ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
