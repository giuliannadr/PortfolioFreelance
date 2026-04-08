"use client";

import { useTranslation } from "react-i18next";

export const TopRightControls = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center">
      
      {/* Container Circular Perfecto */}
      <div className="
        relative flex items-center justify-center
        /* Dimensiones fijas para asegurar el círculo */
        w-11 h-11 md:w-12 md:h-12
        bg-zinc-800/60 backdrop-blur-[20px] 
        border border-white/20 
        shadow-[0_12px_40px_rgba(0,0,0,0.3)] rounded-full
        overflow-hidden
        /* Efectos de luz */
        before:absolute before:inset-0 
        before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_50%)] 
        after:absolute after:inset-0 
        after:bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.1),transparent_50%)]
      ">
        
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="
            relative z-10 flex items-center justify-center
            w-full h-full rounded-full font-bold text-[12px] md:text-sm
            text-white/80
            hover:bg-white/10
            hover:text-white
            transition-all duration-300 ease-out
          "
          aria-label="Toggle Language"
        >
          {i18n.language === "en" ? "ES" : "EN"}
        </button>
      </div>
    </div>
  );
};