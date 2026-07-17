import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const AboutSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const ref  = useRef<HTMLElement>(null);

  const badge = lang === "en" ? "About" : "Sobre mí";

  const principles = [
    {
      num: "01",
      color: "#CC1500",
      title: lang === "en" ? "Design that sells" : "Diseño que vende",
      body: lang === "en"
        ? "I don't design to look pretty. I design so your clients say yes. Every visual decision has a concrete purpose."
        : "No diseño para que quede bonito. Diseño para que tus clientes digan que sí. Cada decisión visual tiene un propósito concreto.",
    },
    {
      num: "02",
      color: "#7C3AED",
      title: lang === "en" ? "Direct attention" : "Atención directa",
      body: lang === "en"
        ? "You talk to me, not a team that doesn't know your business. I understand your idea first time, every time."
        : "Hablás conmigo, no con un equipo que no conoce tu negocio. Entiendo tu idea a la primera y la ejecuto con precisión.",
    },
    {
      num: "03",
      color: "#06B6D4",
      title: lang === "en" ? "I deliver on time" : "Entrego en tiempo",
      body: lang === "en"
        ? "I commit to real deadlines and I meet them. No excuses, no ghosting. Your project is my top priority."
        : "Me comprometo con fechas reales y las cumplo. Sin excusas, sin desapariciones. Tu proyecto tiene la misma prioridad que el mío.",
    },
  ];

  const metadata = [
    { label: lang === "en" ? "Role" : "Rol", value: lang === "en" ? "Full Stack Developer" : "Desarrolladora Full Stack" },
    { label: "Stack", value: "React · Node.js · TypeScript" },
    { label: lang === "en" ? "Projects" : "Proyectos", value: lang === "en" ? "11 delivered" : "11 entregados" },
    { label: lang === "en" ? "Response time" : "Tiempo de respuesta", value: "< 24 hs" },
    { label: lang === "en" ? "English" : "Inglés", value: lang === "en" ? "B2 / C1 Level" : "Nivel B2 / C1" },
    { label: lang === "en" ? "Location" : "Ubicación", value: "Buenos Aires, ARG" },
  ];

  return (
    <section ref={ref} id="about" className="bg-[#F5F4F0] py-20 md:py-32 px-5 sm:px-8 lg:px-10 relative overflow-hidden">

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #F5F4F0, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #F5F4F0, transparent)" }} />

      {/* Label */}
      <div className="flex items-center gap-5 mb-14 relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-mono text-[9px] text-[#CC1500] uppercase tracking-[0.25em]">
          <span>02</span>
          <span>//</span>
          <span>{lang === "en" ? "PROFILE" : "PERFIL"}</span>
        </div>
        <div className="h-px flex-1 bg-[#0A0A0A]/[0.08]" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0A0A0A]/25" style={{ fontFamily: "Poppins, sans-serif" }}>{badge}</span>
      </div>

      {/* Headline + narrative (order-1, top row) · Card (order-2 mobile, right column desktop) · Principles (order-3, bottom-left desktop) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-16 lg:gap-y-10 items-start max-w-7xl mx-auto w-full">

        <div className="order-1 lg:order-none lg:col-span-6 lg:col-start-2 lg:row-start-1 flex flex-col gap-6 select-none">
          <motion.h2
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block font-black uppercase leading-[0.85] text-[#0A0A0A]"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.3rem, 5.5vw, 4.8rem)", letterSpacing: "-0.02em" }}
          >
            <span className="mr-3 select-none" style={{ WebkitTextStroke: "1.2px #0A0A0A", WebkitTextFillColor: "transparent", color: "transparent" }}>
              {lang === "en" ? "ABOUT" : "SOBRE"}
            </span>
            <span className="text-[#0A0A0A]">
              {lang === "en" ? "ME." : "MÍ."}
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 text-sm md:text-[15px]"
          >
            <p className="font-medium text-[#0A0A0A]/75 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
              {lang === "en" ? (
                <>Hi! I'm <strong className="text-black font-black">Giuliana</strong>, a Full Stack Developer who builds custom websites and web apps for real businesses. I get involved in every project like it's my own.</>
              ) : (
                <>¡Hola! Soy <strong className="text-black font-black">Giuliana</strong>, Desarrolladora Full Stack especializada en crear webs y aplicaciones a medida para negocios reales. Me involucro en cada proyecto como si fuera propio.</>
              )}
            </p>
            <p className="text-[#0A0A0A]/55 leading-relaxed">
              {lang === "en"
                ? "I work with React, Node.js, TypeScript and relational databases, prioritizing clean code, performance and a user experience built to convert visitors into clients."
                : "Trabajo con React, Node.js, TypeScript y bases de datos relacionales, priorizando código limpio, performance y una experiencia de usuario pensada para convertir visitas en clientes."}
            </p>
          </motion.div>
        </div>

        <div className="order-2 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:row-span-2 flex flex-col justify-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[360px] mx-auto lg:mr-auto lg:ml-0 border border-[#0A0A0A]/[0.08] bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="h-1 w-full shrink-0" style={{ background: "linear-gradient(to right, #CC1500, #7C3AED, #06B6D4)" }} />

            <div className="w-full h-64 lg:h-[280px] overflow-hidden border-b border-[#0A0A0A]/[0.08] relative bg-[#0A0A0A]/5 shrink-0">
              <img src="/giuli-profile.jpeg?v=3" alt="Giuliana Di Rocco"
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.02) brightness(1.01)", objectPosition: "center 20%" }} />
            </div>

            <div className="px-5 pt-5 pb-4 flex flex-col gap-1 font-mono shrink-0">
              <div className="text-[14px] font-black uppercase text-[#0A0A0A] tracking-wider" style={{ fontFamily: "Poppins, sans-serif" }}>
                GIULIANA DI ROCCO
              </div>
              <div className="text-[9.5px] text-[#0A0A0A]/50 uppercase tracking-widest font-bold">
                {lang === "en" ? "FULL STACK DEVELOPER" : "DESARROLLADORA FULL STACK"}
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 font-mono border-t border-[#0A0A0A]/[0.05] bg-[#0A0A0A]/[0.01]">
              <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-[#0A0A0A]/[0.05]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#CC1500]" />
                <span className="text-[8px] font-black uppercase tracking-wider text-[#0A0A0A]/50">
                  {lang === "en" ? "PROFILE" : "PERFIL"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {metadata.map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[#0A0A0A]/35 uppercase text-[8px] tracking-wide">{item.label}</span>
                    <span className="text-[#0A0A0A]/85 font-medium text-[11px] truncate">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 py-3.5 border-t border-[#0A0A0A]/[0.06] bg-[#0A0A0A]/[0.02] flex items-center gap-2 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8.5px] font-black tracking-widest text-emerald-600 uppercase">
                {lang === "en" ? "AVAILABLE // OPEN TO PROJECTS" : "DISPONIBLE // NUEVOS PROYECTOS"}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="order-3 lg:order-none lg:col-span-6 lg:col-start-2 lg:row-start-2 flex flex-col justify-start">
          <div className="flex flex-col border-t border-[#0A0A0A]/[0.08]">
            {principles.map((pr, idx) => (
              <motion.div
                key={pr.num}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="py-4 border-b border-[#0A0A0A]/[0.08] flex flex-col md:flex-row gap-3 md:gap-7 items-start"
              >
                <span className="font-mono text-xs font-black tracking-wider shrink-0 md:pt-1" style={{ color: pr.color }}>{pr.num}</span>
                <div className="flex-1">
                  <h3 className="font-black uppercase text-[#0A0A0A]/85 text-xs md:text-sm tracking-wider mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {pr.title}
                  </h3>
                  <p className="text-[#0A0A0A]/50 text-xs md:text-[13px] leading-relaxed">
                    {pr.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
