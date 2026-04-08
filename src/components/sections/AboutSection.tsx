import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-12 md:py-24 w-full relative">
      <div className="max-w-7xl mx-auto px-3 md:px-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-center">
          
          {/* FOTO DESKTOP - Sin cambios */}
          <motion.div className="hidden md:block relative w-[400px] lg:w-[460px] overflow-visible rounded-[2.5rem] rounded-tl-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-0 md:pt-10 md:pl-10">
            <motion.img 
              src="/profile1.png" 
              className="h-auto object-contain object-bottom cursor-pointer"
              animate={{ scale: 1.30, x: -60, y: -10 }}
              whileHover={{ y: -30, rotate: -4 }}
            />
          </motion.div>

          <motion.div className="w-full md:max-w-xl md:-ml-20 pt-6 pb-8 px-6 sm:px-8 md:pt-8 md:pb-12 md:px-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl bg-zinc-800/70 md:bg-zinc-800/60 backdrop-blur-[20px] md:backdrop-blur-[24px] border border-white/10 relative z-10">
            <div className="relative z-10 space-y-5 md:space-y-7">
              
              {/* TÍTULOS */}
              <div className="space-y-1 md:space-y-2">
                <span className="hidden md:block text-[#FF6F00] text-[10px] font-bold uppercase tracking-[0.4em]">
                  {t('about.badge')}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight text-white">
                  {t('about.title')} <br />
                  <span className="text-[#FF6F00] italic font-light font-serif">
                    {t('about.titleItalic')}
                  </span>
                </h2>
              </div>

              {/* CUERPO DE TEXTO - CORREGIDO */}
              <div className="space-y-4 text-white/80 text-base md:text-lg leading-relaxed font-light">
                <p>
                  <Trans 
                    i18nKey="about.p1"
                    components={[
                      <span key="0" className="text-white font-medium" />, 
                      <b key="1"><i /></b>
                    ]}
                  />
                </p>
                <p>
                  <Trans 
                    i18nKey="about.p2"
                    components={[
                      <span key="0" />, 
                      <b key="1"><i /></b>
                    ]}
                  />
                </p>
              </div>

              {/* STATS */}
              <div className="pt-6 border-t border-white/10 flex flex-row items-center justify-between">
                <div className="flex gap-6 md:gap-10">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{t('about.stats.exp')}</p>
                    <p className="text-[9px] font-bold uppercase text-white/40 tracking-wider">{t('about.stats.expLabel')}</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{t('about.stats.dedication')}</p>
                    <p className="text-[9px] font-bold uppercase text-white/40 tracking-wider">{t('about.stats.dedicationLabel')}</p>
                  </div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="p-3 rounded-full bg-[#FF6F00]/10 text-[#FF6F00] border border-[#FF6F00]/20"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};