"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const menuItems = [
  { id: "home",     es: "Inicio",    en: "Home" },
  { id: "about",    es: "Sobre mí",  en: "About" },
  { id: "projects", es: "Proyectos", en: "Projects" },
  { id: "services", es: "Servicios", en: "Services" },
  { id: "faq",      es: "FAQ",       en: "FAQ" },
  { id: "contact",  es: "Contacto",  en: "Contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    window.history.pushState("", document.title, window.location.pathname);
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(lang === "en" ? "es" : "en");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) { setActiveSection("contact"); return; }
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const top = (section as HTMLElement).offsetTop;
        if (window.scrollY >= top - window.innerHeight / 3) {
          if (menuItems.some(item => item.id === section.id)) {
            setActiveSection(section.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── FLOATING DESKTOP PILL NAVBAR ── */}
      <nav
        className={`hidden lg:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 h-14 items-center justify-between px-8 rounded-full transition-all duration-300 w-[90%] max-w-5xl backdrop-blur-md border ${
          scrolled
            ? "bg-[#0A0A0A]/85 border-white/10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]"
            : "bg-[#0A0A0A]/40 border-white/[0.06] shadow-sm"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="font-black tracking-tighter uppercase text-xs text-white hover:text-[#CC1500] transition-colors"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Giuliana Di Rocco
        </a>

        <div className="flex items-center gap-7">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`relative text-[10px] font-bold uppercase tracking-[0.25em] transition-all py-1 ${
                activeSection === item.id
                  ? "text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {item[lang]}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#CC1500] rounded-full"
                />
              )}
            </a>
          ))}

          <div className="flex items-center border-l border-white/10 pl-6">
            <button
              onClick={toggleLanguage}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#CC1500] transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── FLOATING MOBILE PILL NAVBAR ── */}
      <div
        className={`lg:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 h-12 flex items-center justify-between px-5 rounded-full transition-all duration-300 w-[90%] backdrop-blur-md border ${
          scrolled
            ? "bg-[#0A0A0A]/85 border-white/10 shadow-lg"
            : "bg-[#0A0A0A]/40 border-white/[0.06]"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="font-black tracking-tighter uppercase text-[10px] text-white"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Giuliana Di Rocco
        </a>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-[#CC1500] transition-colors"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button onClick={() => setIsOpen(true)} className="p-1 text-white hover:text-[#CC1500] transition-colors">
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-[100] backdrop-blur-lg flex flex-col px-6 py-8"
            style={{ background: "rgba(10,10,10,0.98)" }}
          >
            <div className="flex justify-between items-center mb-12">
              <span
                className="font-black tracking-tighter uppercase text-[11px] text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Giuliana Di Rocco
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center gap-1">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between py-4 border-b border-white/5 group"
                >
                  <span
                    className={`text-3xl font-black uppercase tracking-tighter transition-colors ${
                      activeSection === item.id ? "text-[#CC1500]" : "text-white/80 hover:text-[#CC1500]"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {item[lang]}
                  </span>
                  <span className="text-white/20 group-hover:text-[#CC1500] transition-colors text-xl">
                    →
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-4 mt-8">
              <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/20 text-center">
                © 2026 Giuliana Di Rocco
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
