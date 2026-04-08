import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="home" className="w-full pt-4 lg:pt-10">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center lg:text-left max-w-full lg:max-w-[700px]"
      >
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF6F00]/20 bg-[#FF6F00]/5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6F00] mx-auto lg:mx-0">
          <Sparkles size={12} className="animate-pulse" />
          {t('hero.badge')}
        </div>

        {/* Title: Ajuste dinámico de tamaño */}
   {/* Title: Ajustado para que el inglés no desborde */}
<h1 className="font-black tracking-tighter text-zinc-900 dark:text-white mb-8 leading-[0.85] flex flex-col">
  
  {/* Title 1: Bajamos de 8vw a 6vw */}
  <span className="block whitespace-nowrap text-[clamp(2rem,5.5vw,4.5rem)] uppercase">
    {t('hero.title1')}
  </span>
  
  {/* Title 2: Bajamos el máximo de 6.5rem a 5.5rem para que "Digital Essence" entre cómodo */}
  <span className="text-[#FF6F00] italic font-light font-serif whitespace-nowrap transition-all duration-[1500ms] ease-in-out hover:brightness-125 cursor-pointer text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[1.1]">
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
            href="#contact"
            className="px-10 py-5 bg-transparent border-2 border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-center"
          >
            {t('hero.contact')}
          </a>
        </div>
      </motion.div>
    </section>
  );
};