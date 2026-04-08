import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "giulianadiroccodev@gmail.com";
    const subject = encodeURIComponent(t('footer.emailSubject'));
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`;
    window.open(gmailUrl, "_blank");
  };

  const socialLinks = [
    { 
      icon: ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      href: "https://wa.me/5491128341223",
      label: "WhatsApp",
      action: null 
    },
    { icon: Linkedin, href: "https://linkedin.com/in/giulianadirocco", label: "LinkedIn", action: null },
    { icon: Github, href: "https://github.com/giuliannadr", label: "GitHub", action: null },
    { icon: Instagram, href: "https://instagram.com/giulianna.dev", label: "Instagram", action: null },
    { icon: Mail, href: "#", label: "Email", action: handleEmailClick },
  ];

  return (
    <footer
      id="contact"
      className="bg-card dark:bg-black w-full min-h-[80vh] pt-24 pb-10 flex justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-6xl px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
        
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#FF6F00] font-mono text-[12px] md:text-[13px] uppercase tracking-[0.5em] mt-10 mb-8"
        >
          {t('footer.status')}
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-foreground mb-12 tracking-tighter"
        >
          {t('footer.titleLine1')} <br />
          <span className="text-foreground/20 italic hover:text-[#FF6F00] transition-colors duration-500 cursor-default">
            {t('footer.titleLine2')}
          </span>
        </motion.h2>

        <motion.button 
          onClick={handleEmailClick}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-base md:text-xl text-foreground/60 hover:text-[#FF6F00] transition-colors duration-300 mb-16 font-light tracking-widest focus:outline-none truncate max-w-full"
        >
          giulianadiroccodev@gmail.com
        </motion.button>

        <div className="flex gap-3 md:gap-6 mb-12 md:mb-24">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              onClick={social.action ? social.action : undefined}
              target={social.action ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-[#FF6F00] hover:border-[#FF6F00]/50 hover:bg-[#FF6F00]/5 transition-all duration-300 group cursor-pointer"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>

        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center pt-10 border-t border-foreground/10 text-[11px] md:text-[12px] font-mono uppercase tracking-[0.15em] text-foreground/40">
          <div className="mb-4 md:mb-0 cursor-default text-[#FF6F00]">
            © {new Date().getFullYear()} — GIULIANA DI ROCCO
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
            <span className="cursor-default">{t('footer.location')}</span>
            <a 
              href="#home"
              className="hover:text-[#FF6F00] text-foreground/40 transition-colors italic cursor-pointer uppercase tracking-[0.15em] no-underline"
            >
              {t('footer.backToTop')} ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};