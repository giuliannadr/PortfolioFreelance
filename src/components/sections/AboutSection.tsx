import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-12 md:py-24 w-full relative">
      <div className="max-w-7xl mx-auto px-3 md:px-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0">
          
          {/* --- FOTO DESKTOP (Se mantiene a la izquierda) --- */}
          <motion.div 
            className="hidden md:block relative w-[400px] lg:w-[460px] overflow-visible z-0 md:pt-10 md:pl-10"
          >
            <motion.img 
              src="/profile1.png" 
              className="h-auto object-contain object-bottom cursor-pointer"
              animate={{ scale: 1.30, x: -60, y: -10 }}
              whileHover={{ y: -30, rotate: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>

          {/* --- CONTENEDOR PRINCIPAL --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:max-w-xl md:-ml-20 pt-10 pb-10 px-6 sm:px-8 md:pt-12 md:pb-14 md:px-12 rounded-[2.5rem] shadow-2xl bg-zinc-800/70 md:bg-zinc-800/60 backdrop-blur-[24px] border border-white/10 relative z-10"
          >
            {/* --- FOTO INTEGRADA (Solo Mobile) --- */}
            <div className="flex md:hidden items-center gap-4 mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-2 border-[#FF6F00] p-0.5 overflow-hidden bg-zinc-900">
                  <img 
                    src="/profile1.png" 
                    className="w-full h-full object-cover object-top" 
                    alt="Profile Avatar"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#FF6F00] border-2 border-[#27272a] rounded-full"></div>
              </div>
              <div>
                <span className="text-[#FF6F00] text-[10px] font-bold uppercase tracking-[0.3em]">
                  {t('about.badge')}
                </span>
                <h3 className="text-white font-bold text-lg">Giuliana Di Rocco</h3>
              </div>
            </div>

            <div className="relative z-10 space-y-6 md:space-y-8">
              
              {/* TÍTULOS DESKTOP */}
              <div className="space-y-2">
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

              {/* CUERPO DE TEXTO */}
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
                <div className="flex gap-8 md:gap-12">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{t('about.stats.exp')}</p>
                    <p className="text-[9px] font-bold uppercase text-white/40 tracking-wider">{t('about.stats.expLabel')}</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{t('about.stats.dedication')}</p>
                    <p className="text-[9px] font-bold uppercase text-white/40 tracking-wider">{t('about.stats.dedicationLabel')}</p>
                  </div>
                </div>

               
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};