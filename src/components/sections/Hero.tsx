"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();

  const whatsappNumber = "5491128341223"; 
  const message = encodeURIComponent("¡Hola! Vi tu portfolio y me gustaría hablar sobre una idea que tengo.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section id="home" className="w-full pt-4 lg:pt-10 pr-6 sm:pr-8">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center lg:text-left max-w-full lg:max-w-[650px]"
      >
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF6F00]/20 bg-[#FF6F00]/5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6F00] mx-auto lg:mx-0">
          <Sparkles size={12} className="animate-pulse" />
          {t('hero.badge')}
        </div>

        {/* Title Container */}
        <h1 className="font-black tracking-tighter text-zinc-900 dark:text-white mb-8 leading-[0.9] flex flex-col">
          {/* Título Superior */}
          <span className="block whitespace-nowrap text-[clamp(1.8rem,5vw,4rem)] uppercase">
            {t('hero.title1')}
          </span>
          
          {/* Frase Naranja: Forzada a una línea con escalado automático */}
          <span 
            className="text-[#FF6F00] italic font-light font-serif whitespace-nowrap transition-all duration-[1500ms] ease-in-out hover:brightness-125 cursor-pointer block leading-[1.1] text-[clamp(1.5rem,4.5vw,5rem)]"
          >
            {t('hero.title2')}
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-xl text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-12 leading-relaxed mx-auto lg:mx-0 font-medium italic">
          "{t('hero.description')}"
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
          <a
            href="#projects"
            className="group px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-2xl hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-black/5"
          >
            {t('hero.viewWork')} 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative overflow-hidden
              px-10 py-5 bg-transparent 
              border-2 border-zinc-100 dark:border-zinc-800 
              text-zinc-800 dark:text-zinc-200 
              font-bold rounded-2xl 
              transition-all duration-500 ease-in-out
              text-center
              hover:border-[#FF6F00]/50 
              hover:bg-[#FF6F00]/5 
              hover:text-[#FF6F00] 
              hover:scale-[1.02]
              hover:shadow-[0_0_20px_rgba(255,111,0,0.1)]
              before:absolute before:inset-0
              before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
              before:translate-x-[-150%]
              hover:before:translate-x-[150%]
              before:transition-transform before:duration-700 before:ease-in-out
            "
          >
            <span className="relative z-10">
              {t('hero.contact')}
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};