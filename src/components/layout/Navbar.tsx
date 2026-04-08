"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, LayoutGroup } from "framer-motion";
import { Menu, X, Home, User, Folder, Mail, ArrowRight, ShieldCheck, Briefcase } from "lucide-react";

const menuItems = [
  { id: "home", label: "Inicio", icon: <Home size={20} />, href: "#home" },
  { id: "about", label: "Sobre mí", icon: <User size={20} />, href: "#about" },
  { id: "trust", label: "Confianza", icon: <ShieldCheck size={20} />, href: "#trust" },
  { id: "projects", label: "Proyectos", icon: <Folder size={20} />, href: "#projects" },
  { id: "services", label: "Servicios", icon: <Briefcase size={20} />, href: "#services" },
  { id: "contact", label: "Contacto", icon: <Mail size={20} />, href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionIds = menuItems.map(item => item.id);
    
    const handleScroll = () => {
      // 1. Detección de Final de Página (Para el Footer/Contacto)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // 2. Lógica normal para el resto de secciones
      const sections = document.querySelectorAll("section[id]");
      let currentSection = activeSection;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - window.innerHeight / 3) {
          if (sectionIds.includes(section.id)) {
            currentSection = section.id;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // ... (mouseX, mouseY y springConfig se mantienen igual que antes)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isOpen) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.35);
    mouseY.set((e.clientY - centerY) * 0.35);
  };

  return (
    <LayoutGroup>
      {/* --- DESKTOP NAVBAR --- */}
      <nav className="hidden md:block fixed top-0 left-1/2 z-50 mt-6 -translate-x-1/2 bg-zinc-800/60 backdrop-blur-[20px] border border-white/20 shadow-lg rounded-full overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_50%)] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.1),transparent_50%)]">
        <div className="relative flex items-center gap-6 px-6 py-2">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a key={item.id} href={item.href} className="relative group">
                {isActive && (
                  <motion.span 
                    layoutId="activeGlow" 
                    className="absolute inset-0 rounded-full bg-[#FF6F00]/20 blur-md scale-125" 
                  />
                )}
                <span className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${isActive ? "bg-[#FF6F00] text-white scale-110" : "text-zinc-400 hover:text-white"}`}>
                  {item.icon}
                </span>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-tighter">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* --- MOBILE BUBBLE MENU --- */}
      <div className="md:hidden fixed top-4 left-6 z-[500]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="bubble"
              ref={containerRef}
              layoutId="glass-panel"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
              style={{ x: springX, y: springY }}
              onClick={() => setIsOpen(true)}
              className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.3)] cursor-pointer overflow-hidden bg-zinc-800/60 backdrop-blur-[20px] border border-white/20 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_50%)] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.1),transparent_50%)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Menu className="text-white relative z-10" size={22} />
            </motion.div>
          ) : (
            <React.Fragment key="open-panel">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-[8px] z-[-1]"
              />
              <motion.div
                layoutId="glass-panel"
                className="text-white p-6 rounded-[2.5rem] shadow-[0_24px_64px_rgba(0,0,0,0.4)] w-[280px] bg-zinc-900/85 backdrop-blur-[30px] border border-white/10 overflow-hidden"
                initial={{ scale: 0.9, opacity: 0, x: -20, y: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, x: -20, y: -20 }}
              >
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10 relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6F00]">Navegación</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={18} className="text-white/40" />
                  </button>
                </div>
                <nav className="flex flex-col gap-2 relative z-10">
                  {menuItems.map((item, i) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${activeSection === item.id ? "bg-white/10" : "bg-white/0 hover:bg-white/5"}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`${activeSection === item.id ? "text-[#FF6F00]" : "text-white/60"} group-hover:text-[#FF6F00] transition-colors`}>
                          {item.icon}
                        </span>
                        <span className={`font-semibold ${activeSection === item.id ? "text-white" : "text-white/70"}`}>
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#FF6F00]" />
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
};