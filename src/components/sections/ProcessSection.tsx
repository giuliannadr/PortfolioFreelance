import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, PencilRuler, Sparkles, GraduationCap } from 'lucide-react';
import { useTranslation } from "react-i18next";

export const ProcessSection = () => {
  const { t } = useTranslation();

  const stepsData = [
    { number: "01", key: "step1", icon: <Coffee className="w-5 h-5" /> },
    { number: "02", key: "step2", icon: <PencilRuler className="w-5 h-5" /> },
    { number: "03", key: "step3", icon: <Sparkles className="w-5 h-5" /> },
    { number: "04", key: "step4", icon: <GraduationCap className="w-5 h-5" /> }
  ];

  return (
    <section className="py-24 w-full relative">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#FF6F00] text-[10px] font-bold uppercase tracking-[0.4em] block mb-6"
            >
              {t('process.badge')}
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-white">
              {t('process.title')} <br /> 
              <span className="text-[#FF6F00] italic font-light font-serif whitespace-nowrap">
                {t('process.titleItalic')}
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-[260px] leading-relaxed border-l border-[#FF6F00]/30 pl-6 italic mb-2">
            {t('process.quote')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent md:-translate-x-1/2" />

          <div className="space-y-20 md:space-y-0">
            {stepsData.map((step, index) => {
              // Obtenemos los tags como array desde i18next
              const tags = t(`process.steps.${step.key}.tags`, { returnObjects: true }) as string[];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className={`relative group flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-start md:items-center gap-10 md:gap-12 md:h-[200px] pl-24 md:pl-0`} 
                >
                  {/* Contenido */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="relative">
                      <span className="text-6xl md:text-[100px] font-black text-[#FF6F00]/10 dark:text-[#FF6F00]/[0.05] absolute -top-8 md:-top-12 left-0 md:left-auto md:right-0 group-hover:text-[#FF6F00]/20 transition-colors duration-700 select-none">
                        {step.number}
                      </span>
                      
                      <div className="relative z-10 space-y-4">
                        <h3 className="text-xl font-bold tracking-tight uppercase text-white">
                          {t(`process.steps.${step.key}.title`)}
                        </h3>
                        
                        <p className={`text-zinc-400 leading-relaxed text-sm max-w-sm ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}>
                          {t(`process.steps.${step.key}.description`)}
                        </p>

                        <div className={`flex flex-wrap gap-2 pt-1 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                          {tags.map((tag, i) => (
                            <span key={i} className="text-[10px] tracking-widest text-[#FF6F00]/60 font-bold uppercase italic">
                              {tag} {i !== tags.length - 1 && "—"}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nodo Icono */}
                  <div className="absolute left-0 md:relative md:left-auto z-20 top-0 md:top-auto">
                    <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-[#FF6F00] shadow-xl md:group-hover:scale-110 md:group-hover:rotate-6 transition-all duration-500 overflow-hidden bg-zinc-800/60 backdrop-blur-[20px] border border-white/20">
                      <div className="relative z-10">{step.icon}</div>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};