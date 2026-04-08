import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export const TopRightControls = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-3">
      
      {/* Container con efecto Glossmorphism Gris igual a la Navbar */}
      <div className="
        relative flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2
        /* ESTILO CLONADO */
        bg-zinc-800/60 backdrop-blur-[20px] 
        border border-white/20 
        shadow-[0_12px_40px_rgba(0,0,0,0.3)] rounded-full
        overflow-hidden
        /* PUNTOS DE LUZ */
        before:absolute before:inset-0 
        before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_50%)] 
        after:absolute after:inset-0 
        after:bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.1),transparent_50%)]
      ">
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            relative z-10 flex items-center justify-center
            w-8 h-8 md:w-9 md:h-9 rounded-full
            text-white/80
            hover:bg-white/10
            hover:text-white
            transition-all duration-300 ease-out
          "
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <Moon className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>

        {/* Separator - Ajustado para que combine con el gris oscuro */}
        <div className="relative z-10 w-[1px] h-4 md:h-5 bg-white/20 mx-0.5 md:mx-1" />

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="
            relative z-10 flex items-center justify-center
            w-8 h-8 md:w-9 md:h-9 rounded-full font-bold text-[12px] md:text-sm
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