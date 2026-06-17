"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Copy, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

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

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(t("footer.emailSubject"));
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`, "_blank");
  };

  const socials = [
    { icon: Instagram, href: "https://instagram.com/giulianna.dev",    label: "Instagram" },
    { icon: Linkedin,  href: "https://linkedin.com/in/giulianadirocco", label: "LinkedIn"  },
    { icon: Github,    href: "https://github.com/giuliannadr",           label: "GitHub"    },
  ];

  return (
    <footer id="contact" className="bg-[#CC1500] py-20 md:py-28 px-5 sm:px-8 lg:px-10 relative overflow-hidden">

      {/* Ghost "06" watermark */}
      <span
        className="absolute -top-4 -right-4 font-black text-white/[0.06] select-none pointer-events-none leading-none"
        style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(10rem, 30vw, 36rem)" }}
        aria-hidden
      >
        06
      </span>

      {/* ── HEADLINE ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 relative z-10"
      >
        <h2
          className="font-black uppercase leading-[0.82] text-white"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(4rem, 18vw, 18rem)", letterSpacing: "-0.03em" }}
        >
          {t("footer.titleLine1")} <br />
          {t("footer.titleLine2")}
        </h2>
      </motion.div>

      {/* ── CONTACT ROW ── */}
      <div className="border-t border-white/20 pt-10 mb-10 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-0">

          {/* Email + copy */}
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={handleEmailClick}
              className="font-semibold text-white/80 hover:text-white transition-colors text-base md:text-xl tracking-tight"
            >
              {email}
            </button>
            <button
              onClick={handleCopyEmail}
              className="p-2.5 border border-white/25 text-white/50 hover:bg-white hover:text-[#CC1500] transition-all duration-300"
              aria-label="Copiar email"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
            </button>
          </div>

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-[#CC1500] font-black text-[10px] uppercase tracking-[0.25em] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* ── SOCIAL ICONS ── */}
      <div className="flex gap-4 mb-16 relative z-10">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-11 h-11 border border-white/25 flex items-center justify-center text-white/50 hover:text-white hover:border-white hover:bg-white/12 transition-all duration-300"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>

      {/* ── COPYRIGHT ── */}
      <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/45" style={{ fontFamily: "Poppins, sans-serif" }}>
          © {new Date().getFullYear()} — GIULIANA DI ROCCO
        </p>
        <div className="flex items-center gap-8">
          <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.4em] text-white/45" style={{ fontFamily: "Poppins, sans-serif" }}>
            ARGENTINA
          </span>
          <a
            href="#home"
            className="text-[10px] font-black uppercase tracking-[0.4em] text-white/45 hover:text-white transition-colors flex items-center gap-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {t("footer.backToTop")} ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
