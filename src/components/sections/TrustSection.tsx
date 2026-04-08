import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Heart, ShieldCheck, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TrustSection = () => {
  const { t } = useTranslation();
  const [testimonyIndex, setTestimonyIndex] = useState(0);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  // Definimos la estructura de datos que NO cambia (IDs, Iconos, Iniciales)
  const testimonialsData = [
    { id: "miri", name: "Miriam Di Rocco", initial: "M" },
    { id: "camila", name: "Camila", initial: "C" },
    { id: "iara", name: "Iara", initial: "I" }
  ];

  const metricsData = [
    { key: "speed", icon: <Zap className="w-4 h-4" /> },
    { key: "direct", icon: <Heart className="w-4 h-4" /> },
    { key: "modern", icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonyIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonialsData.length]);

  const current = testimonialsData[testimonyIndex];

  return (
    <section className="w-full relative py-32" id="trust">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        
        {/* IZQUIERDA: Frase y Métricas */}
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.span className="text-[#FF6F00] text-[10px] font-bold uppercase tracking-[0.3em] block opacity-80">
              {t('trust.badge')}
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight text-white">
              {t('trust.title')} <br />
              <span className="text-white/30 italic font-light">{t('trust.titleFaded')}</span>
            </motion.h2>
            <p className="text-white/60 text-base max-w-sm leading-relaxed">
              {t('trust.description')}
            </p>
          </div>

          {/* MÉTRICAS */}
          <div className="flex flex-row gap-3 w-full">
            {metricsData.map((item, i) => (
              <div 
                key={i} 
                className="relative flex-1 min-w-0" 
                onMouseEnter={() => setHoveredMetric(i)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                <AnimatePresence>
                  {hoveredMetric === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: 8, x: "-50%" }}
                      className="absolute bottom-full mb-3 left-1/2 w-44 p-3 bg-zinc-900 border border-white/10 rounded-xl shadow-xl z-50 pointer-events-none"
                    >
                      <p className="text-[10px] leading-snug text-white/80 text-center">
                        {t(`trust.metrics.${item.key}.tooltip`)}
                      </p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-zinc-900" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative py-4 px-2 rounded-2xl overflow-hidden flex flex-col items-center justify-center min-h-[110px] w-full bg-zinc-800/60 backdrop-blur-[20px] border border-white/10 transition-all duration-300 hover:border-[#FF6F00]/40">
                  <div className="relative z-10 text-[#FF6F00] mb-2">{item.icon}</div>
                  <div className="relative z-10 text-sm md:text-base font-bold tracking-tight mb-0.5 text-center truncate w-full px-1 text-white">
                    {t(`trust.metrics.${item.key}.value`)}
                  </div>
                  <div className="relative z-10 text-[8px] font-bold uppercase tracking-widest text-white/40 text-center">
                    {t(`trust.metrics.${item.key}.label`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DERECHA: Testimonios */}
        <div className="relative min-h-[350px] flex items-center w-full">
          <AnimatePresence mode="wait">
            <motion.div 
              key={current.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden p-8 rounded-[2.5rem] w-full bg-zinc-800/60 backdrop-blur-[20px] border border-white/20 shadow-2xl"
            >
              <div className="relative z-10">
                <MessageSquare className="w-8 h-8 text-[#FF6F00] opacity-40 mb-6" />
                <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-white/90 mb-8 min-h-[120px]">
                  "{t(`trust.testimonials.${current.id}.text`)}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF6F00] flex items-center justify-center text-white text-sm font-bold shadow-[0_0_15px_rgba(255,111,0,0.3)]">
                    {current.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{current.name}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">
                      {t(`trust.testimonials.${current.id}.role`)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};