import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2, Palette, Database, Layout, ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

const SERVICE_CONFIG = {
  web: { 
    icon: <Palette size={20} />, 
    theme: "white", 
    size: "md:col-span-2 col-span-2",
    titleClass: "text-2xl md:text-5xl" 
  },
  store: { 
    icon: <Layout size={20} />, 
    theme: "orange", 
    size: "md:col-span-1 col-span-1",
    titleClass: "text-base md:text-4xl" // Tamaño estándar para español
  },
  systems: { 
    icon: <Database size={20} />, 
    theme: "orange", 
    size: "md:col-span-1 col-span-1",
    titleClass: "text-base md:text-4xl" 
  },
  maintenance: { 
    icon: <Code2 size={20} />, 
    theme: "white", 
    size: "md:col-span-2 col-span-2",
    titleClass: "text-2xl md:text-5xl" 
  }
};

export const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  
  const handleContact = (title: string) => {
    const phoneNumber = "5491128341223";
    let message = title === "Presupuesto General" 
      ? "¡Hola! Estuve viendo tu web y me gustaría solicitar un presupuesto general para un proyecto."
      : `¡Hola! Me interesa obtener un presupuesto específico para el servicio de: ${title}.`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const serviceKeys = Object.keys(SERVICE_CONFIG);

  return (
    <section id="services" className="relative py-12 md:py-24 z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6 text-white text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="h-[2px] w-8 bg-[#FF6F00]" />
              <span className="text-[#FF6F00] text-[10px] font-bold uppercase tracking-[0.4em]">
                {t('services.badge')}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85]">
              {t('services.title')} <br />
              <span className="italic font-serif font-light opacity-20">{t('services.titleItalic')}</span>
            </h2>
          </div>
        </div>

        {/* CTA SUPERIOR */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-16" 
        >
          <button 
            onClick={() => handleContact("Presupuesto General")}
            className="w-full group relative overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 py-6 md:py-8 px-6 md:px-10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col md:flex-row items-center justify-between transition-all duration-700 ease-out hover:bg-white/[0.06]"
          >
            <div className="absolute inset-0 bg-[#FF6F00]/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700" />
            <div className="flex flex-col items-center md:items-start relative z-10 text-center md:text-left">
              <span className="text-[#FF6F00] text-[9px] md:text-[10px] font-bold uppercase tracking-[0.5em] mb-2 opacity-80">
                {t('services.cta.badge')}
              </span>
              <h4 className="text-lg md:text-2xl font-bold tracking-tight text-white italic font-serif leading-none">
                {t('services.cta.title')} <span className="text-white/10 md:text-white/20 group-hover:text-[#FF6F00]/40 transition-colors duration-700">{t('services.cta.faded')}</span>
              </h4>
            </div>
            <div className="mt-5 md:mt-0 relative z-10 flex items-center gap-3 py-3 px-6 rounded-full bg-white/5 border border-white/5 group-hover:bg-white/10 transition-all duration-700">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white">WhatsApp</span>
              <ArrowUpRight size={16} className="text-[#25D366]" />
            </div>
          </button>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 items-start md:items-stretch md:auto-rows-fr"> 
          {serviceKeys.map((key) => {
            const config = SERVICE_CONFIG[key as keyof typeof SERVICE_CONFIG];
            const title = t(`services.items.${key}.title`);
            
            // Lógica condicional para el idioma inglés en la tienda
            const isEnglish = i18n.language === 'en';
            const finalTitleClass = (key === 'store' && isEnglish) 
              ? "text-[1.3rem] md:text-[1.8rem]" 
              : config.titleClass;

            return (
              <motion.div
                key={key}
                onClick={() => setSelectedKey(key)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`
                  ${config.size} relative group overflow-hidden cursor-pointer
                  rounded-[1.5rem] md:rounded-[3.5rem] flex flex-col justify-between
                  transition-all duration-500
                  ${config.size.includes('col-span-2') 
                    ? 'min-h-[200px] md:min-h-[380px] p-5 md:p-10' 
                    : 'min-h-[145px] md:min-h-[380px] p-4 md:p-10'
                  } 
                  ${config.theme === 'orange' 
                    ? 'bg-[#FF6F00] text-white shadow-lg shadow-orange-900/20' 
                    : 'bg-[#FDFDFD] text-[#0A0A0A] shadow-md'}
                `}
              >
                <div className="relative z-10">
                  <div className={`w-6 h-6 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-8 ${config.theme === 'orange' ? 'bg-white/20' : 'bg-[#0A0A0A] text-white'}`}>
                    {React.cloneElement(config.icon as React.ReactElement, { size: 14, className: "md:w-6 md:h-6" })}
                  </div>
                  <h3 className={`font-bold tracking-tighter italic font-serif leading-[0.9] [text-wrap:balance] break-words ${finalTitleClass}`}>
                    {title}
                  </h3>
                </div>

                <div className="relative z-10 flex items-center justify-between mt-4 md:mt-auto md:pt-6">
                  <p className={`text-[9px] md:text-base font-bold uppercase tracking-widest opacity-40 ${!config.size.includes('col-span-2') ? 'hidden md:block' : 'block'}`}>
                    {t('projects.labels.viewProcess')}
                  </p>
                  <div className="p-1.5 md:p-3 rounded-full bg-current/10 group-hover:rotate-45 transition-transform duration-500">
                    <ArrowUpRight size={12} className="md:w-[18px] md:h-[18px]" />
                  </div>
                </div>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
              </motion.div>
            );
          })}
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {selectedKey && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedKey(null)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]" />
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-xl rounded-[2.5rem] overflow-hidden pointer-events-auto relative shadow-2xl">
                  <button onClick={() => setSelectedKey(null)} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
                    <X size={20} />
                  </button>
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-[#FF6F00] text-white">
                        {SERVICE_CONFIG[selectedKey as keyof typeof SERVICE_CONFIG].icon}
                      </div>
                      <div>
                        <span className="text-[#FF6F00] text-[10px] font-bold uppercase tracking-widest">
                          {t(`services.items.${selectedKey}.subtitle`)}
                        </span>
                        <h3 className="text-3xl font-bold text-white italic font-serif">
                          {t(`services.items.${selectedKey}.title`)}
                        </h3>
                      </div>
                    </div>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed">
                      {t(`services.items.${selectedKey}.description`)}
                    </p>
                    <div className="space-y-4 mb-10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
                        {t('services.modal.includes')}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(t(`services.items.${selectedKey}.details`, { returnObjects: true }) as string[]).map((detail, i) => (
                          <div key={i} className="flex items-center gap-3 text-white/80">
                            <CheckCircle2 size={16} className="text-[#FF6F00] shrink-0" />
                            <span className="text-sm font-medium">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleContact(t(`services.items.${selectedKey}.title`))} 
                      className="w-full bg-white text-black py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#FF6F00] hover:text-white transition-all duration-500 flex items-center justify-center gap-3"
                    >
                      {t('services.modal.button')} <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};