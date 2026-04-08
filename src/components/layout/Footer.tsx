"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Copy, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const email = "giulianadiroccodev@gmail.com";
  const whatsappNumber = "5491128341223";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(t('footer.emailSubject'));
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`;
    window.open(gmailUrl, "_blank");
  };

  const socialLinks = [ 
    { icon: Instagram, href: "https://instagram.com/giulianna.dev", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/in/giulianadirocco", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/giuliannadr", label: "GitHub" },
    ];

  return (
    <footer id="contact" className="bg-card dark:bg-black w-full min-h-[70vh] pt-24 pb-10 flex justify-center items-center overflow-hidden transition-colors duration-500">
      <div className="w-full max-w-6xl px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
        
        {/* Badge de Disponibilidad */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {t('footer.status')}
        </motion.div>

        {/* Título */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-foreground mb-16 tracking-tighter leading-[0.9]"
        >
          {t('footer.titleLine1')} <br />
          <span className="text-foreground/20 italic hover:text-[#FF6F00] transition-all duration-500 cursor-default">
            {t('footer.titleLine2')}
          </span>
        </motion.h2>

        {/* Botones de Contacto Prioritarios */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full justify-center">
          
          {/* Email con opción de copiar */}
          <div className="group relative flex items-center bg-zinc-100 dark:bg-zinc-900/50 p-1.5 pl-5 rounded-2xl border border-transparent hover:border-[#FF6F00]/30 transition-all w-full sm:w-auto">
            <button 
              onClick={handleEmailClick}
              className="text-sm md:text-base text-foreground/80 hover:text-[#FF6F00] transition-colors font-semibold tracking-tight mr-4"
            >
              {email}
            </button>
            <button 
              onClick={handleCopyEmail}
              className="p-3 rounded-xl bg-background border border-foreground/5 hover:bg-[#FF6F00] hover:text-white transition-all shadow-sm"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          {/* WhatsApp con SVG Original */}
          <a 
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] rounded-2xl font-bold hover:bg-[#25D366] hover:text-white transition-all duration-300 w-full sm:w-auto justify-center shadow-lg shadow-[#25D366]/5 group"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 fill-[#25D366] group-hover:fill-white transition-colors"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WHATSAPP
          </a>
        </div>

        {/* Redes Secundarias */}
        <div className="flex gap-4 md:gap-6 mb-24">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-[#FF6F00] hover:border-[#FF6F00]/50 hover:bg-[#FF6F00]/5 transition-all duration-300 group"
            >
              <social.icon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center pt-10 border-t border-foreground/10 text-[11px] md:text-[12px] font-mono uppercase tracking-[0.15em] text-foreground/40">
          <div className="mb-4 md:mb-0 text-[#FF6F00] font-bold">
            © {new Date().getFullYear()} — GIULIANA DI ROCCO
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
            <span className="hidden md:block opacity-60">BASED IN ARGENTINA</span>
            <a href="#home" className="hover:text-[#FF6F00] transition-colors italic uppercase flex items-center gap-2">
              {t('footer.backToTop')} <span>↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};