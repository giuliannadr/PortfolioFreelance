import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Palette, Database, Layout, ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

const services = [
  {
    title: "Diseño y Desarrollo Web",
    subtitle: "Tu presencia profesional",
    description: "Creamos sitios web que combinan una estética cuidada con una técnica sólida. La mejor forma de presentar tu trabajo.",
    details: [
      "Diseño de interfaz exclusivo (UI/UX)",
      "Optimización para buscadores (SEO)",
      "Adaptabilidad total a móviles",
      "Velocidad de carga ultra rápida"
    ],
    icon: <Palette size={20} />,
    theme: "white",
    size: "md:col-span-2 col-span-2",
  },
  {
    title: "Tienda Digital",
    subtitle: "Ventas 24/7",
    description: "Convertimos tu catálogo en una máquina de ventas online fácil de usar.",
    details: [
      "Pasarelas de pago (Mercado Pago/Stripe)",
      "Gestión de stock e inventario",
      "Panel de administración fácil",
      "Reportes de ventas mensuales"
    ],
    icon: <Layout size={20} />,
    theme: "orange",
    size: "md:col-span-1 col-span-1",
  },
  {
    title: "Sistemas a Medida",
    subtitle: "Gestión Inteligente",
    description: "Automatizamos procesos de tu empresa con herramientas personalizadas.",
    details: [
      "Bases de datos relacionales",
      "Automatización de reportes",
      "Paneles de control internos",
      "Seguridad de datos avanzada"
    ],
    icon: <Database size={20} />,
    theme: "orange",
    size: "md:col-span-1 col-span-1",
  },
  {
    title: "Mantenimiento",
    subtitle: "Soporte Técnico",
    description: "Nos ocupamos de que tu web esté siempre segura, rápida y funcionando correctamente.",
    details: [
      "Backups diarios preventivos",
      "Actualización de parches de seguridad",
      "Soporte técnico prioritario",
      "Monitoreo de tiempo en línea"
    ],
    icon: <Code2 size={20} />,
    theme: "white",
    size: "md:col-span-2 col-span-2",
  }
];

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<null | typeof services[0]>(null);
  
  // FUNCIÓN DE WHATSAPP ACTUALIZADA
  const handleContact = (title: string) => {
    const phoneNumber = "5491128341223"; // Formato internacional para Argentina
    let message = "";

    if (title === "Presupuesto General") {
      message = "¡Hola! Estuve viendo tu web y me gustaría solicitar un presupuesto general para un proyecto.";
    } else {
      message = `¡Hola! Me interesa obtener un presupuesto específico para el servicio de: ${title}.`;
    }

    const wpUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(wpUrl, '_blank');
  };

  return (
    <section id="services" className="relative py-12 md:py-24 z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6 text-white text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="h-[2px] w-8 bg-[#FF6F00]" />
              <span className="text-[#FF6F00] text-[10px] font-bold uppercase tracking-[0.4em]">Propuesta</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85]">
              Servicios <br />
              <span className="italic font-serif font-light opacity-20">Estratégicos</span>
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
                ¿Tenés un proyecto en mente?
              </span>
              <h4 className="text-lg md:text-2xl font-bold tracking-tight text-white italic font-serif leading-none">
                Solicitar presupuesto <span className="text-white/10 md:text-white/20 group-hover:text-[#FF6F00]/40 transition-colors duration-700">— ahora</span>
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
          {services.map((service, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedService(service)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`
                ${service.size} relative group overflow-hidden cursor-pointer
                rounded-[1.5rem] md:rounded-[3.5rem] flex flex-col justify-between
                transition-all duration-500
                ${service.size.includes('col-span-2') 
                  ? 'min-h-[200px] md:min-h-[380px] p-5 md:p-10' 
                  : 'min-h-[145px] md:min-h-[380px] p-4 md:p-10'
                } 
                ${service.theme === 'orange' 
                  ? 'bg-[#FF6F00] text-white shadow-lg shadow-orange-900/20' 
                  : 'bg-[#FDFDFD] text-[#0A0A0A] shadow-md'}
              `}
            >
              <div className="relative z-10">
                <div className={`w-6 h-6 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-8 ${service.theme === 'orange' ? 'bg-white/20' : 'bg-[#0A0A0A] text-white'}`}>
                  {React.cloneElement(service.icon as React.ReactElement, { size: 14, className: "md:w-6 md:h-6" })}
                </div>
                <h3 className={`font-bold tracking-tighter italic font-serif leading-[0.9] ${service.size.includes('md:col-span-2') ? 'text-2xl md:text-5xl' : 'text-base md:text-4xl'} [text-wrap:balance] break-words`}>
                  {service.title}
                </h3>
              </div>
              <div className="relative z-10 flex items-center justify-between mt-4 md:mt-auto md:pt-6">
                <p className={`text-[9px] md:text-base font-bold uppercase tracking-widest opacity-40 ${!service.size.includes('col-span-2') ? 'hidden md:block' : 'block'}`}>
                  Detalles
                </p>
                <div className="p-1.5 md:p-3 rounded-full bg-current/10 group-hover:rotate-45 transition-transform duration-500">
                  <ArrowUpRight size={12} className="md:w-[18px] md:h-[18px]" />
                </div>
              </div>
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </motion.div>
          ))}
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {selectedService && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedService(null)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]" />
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-xl rounded-[2.5rem] overflow-hidden pointer-events-auto relative shadow-2xl">
                  <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
                    <X size={20} />
                  </button>
                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-[#FF6F00] text-white">{selectedService.icon}</div>
                      <div>
                        <span className="text-[#FF6F00] text-[10px] font-bold uppercase tracking-widest">{selectedService.subtitle}</span>
                        <h3 className="text-3xl font-bold text-white italic font-serif">{selectedService.title}</h3>
                      </div>
                    </div>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed">{selectedService.description}</p>
                    <div className="space-y-4 mb-10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">¿Qué incluye?</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedService.details?.map((detail, i) => (
                          <div key={i} className="flex items-center gap-3 text-white/80">
                            <CheckCircle2 size={16} className="text-[#FF6F00] shrink-0" />
                            <span className="text-sm font-medium">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* BOTÓN DEL MODAL: ENVÍA EL SERVICIO ESPECÍFICO */}
                    <button onClick={() => handleContact(selectedService.title)} className="w-full bg-white text-black py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#FF6F00] hover:text-white transition-all duration-500 flex items-center justify-center gap-3">
                      Solicitar presupuesto <ArrowUpRight size={18} />
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