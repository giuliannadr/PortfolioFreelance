import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

// ── CSS-only mockups (zero images, instant load) ──────────────────────────────

const MenuMockup = ({ accent }: { accent: string }) => (
  <div className="w-full h-full flex flex-col" style={{ background: "#1a1a1a" }}>
    <div className="flex items-center justify-between px-3 py-2" style={{ background: "#111" }}>
      <div className="flex gap-1.5">
        {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      </div>
      <div className="h-1.5 w-20 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
    </div>
    <div className="px-3 pt-2 pb-1">
      <div className="h-2 w-16 rounded-full mb-1" style={{ background: accent, opacity: 0.8 }} />
      <div className="h-1 w-10 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
    </div>
    <div className="px-3 grid grid-cols-2 gap-1.5 mt-1">
      {[1,2,3,4].map(i => (
        <div key={i} className="rounded" style={{ background: "rgba(255,255,255,0.06)", padding: "6px" }}>
          <div className="h-5 rounded mb-1" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="h-1 w-8 rounded-full mb-0.5" style={{ background: "rgba(255,255,255,0.25)" }} />
          <div className="h-1 w-5 rounded-full" style={{ background: accent, opacity: 0.7 }} />
        </div>
      ))}
    </div>
  </div>
);

const TurnosMockup = ({ accent }: { accent: string }) => (
  <div className="w-full h-full flex flex-col" style={{ background: "#f8f7f5" }}>
    <div className="flex items-center justify-between px-3 py-2" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="flex gap-1.5">
        {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      </div>
      <div className="h-1.5 w-20 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }} />
    </div>
    <div className="px-3 pt-2">
      <div className="flex justify-between mb-2">
        {["L","M","X","J","V","S","D"].map(d => (
          <div key={d} className="text-[6px] font-black" style={{ color: "rgba(0,0,0,0.3)", fontFamily: "Poppins, sans-serif" }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-2">
        {Array.from({length:14}).map((_,i) => (
          <div key={i} className="h-3 rounded-sm flex items-center justify-center text-[5px] font-black"
            style={{ background: i===3 ? accent : i===8 ? `${accent}30` : "rgba(0,0,0,0.05)", color: i===3 ? "#fff" : "rgba(0,0,0,0.4)", fontFamily: "Poppins,sans-serif" }}>
            {i+1}
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {["10:00","11:30","14:00"].map((t,i) => (
          <div key={t} className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: i===1 ? accent : "rgba(0,0,0,0.05)" }}>
            <div className="w-1 h-1 rounded-full" style={{ background: i===1 ? "#fff" : accent }} />
            <span className="text-[6px] font-black" style={{ color: i===1 ? "#fff" : "rgba(0,0,0,0.5)", fontFamily: "Poppins,sans-serif" }}>{t}</span>
            {i===1 && <span className="ml-auto text-[5px] font-black text-white/70" style={{ fontFamily: "Poppins,sans-serif" }}>RESERVADO</span>}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PortfolioMockup = ({ accent }: { accent: string }) => (
  <div className="w-full h-full flex flex-col" style={{ background: "#0d0d0d" }}>
    <div className="flex items-center justify-between px-3 py-2" style={{ background: "#080808" }}>
      <div className="flex gap-1.5">
        {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      </div>
      <div className="h-1.5 w-20 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
    </div>
    <div className="px-3 pt-2 flex-1">
      <div className="h-1.5 w-14 rounded-full mb-0.5" style={{ background: "rgba(255,255,255,0.6)" }} />
      <div className="h-1 w-8 rounded-full mb-2" style={{ background: accent, opacity: 0.8 }} />
      <div className="grid grid-cols-3 gap-1">
        {[1.4, 1, 1.8, 1, 1.6, 1.2].map((h, i) => (
          <div key={i} className="rounded-sm" style={{ height: `${h * 18}px`, background: i%2===0 ? `${accent}40` : "rgba(255,255,255,0.07)" }} />
        ))}
      </div>
    </div>
  </div>
);

const LandingMockup = ({ accent }: { accent: string }) => (
  <div className="w-full h-full flex flex-col" style={{ background: "#fff" }}>
    <div className="flex items-center justify-between px-3 py-2" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="flex gap-1.5">
        {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      </div>
      <div className="h-1.5 w-20 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }} />
    </div>
    <div className="flex-1 px-3 pt-2 flex flex-col justify-between pb-2">
      <div>
        <div className="h-2 w-20 rounded-full mb-1" style={{ background: "rgba(0,0,0,0.7)" }} />
        <div className="h-1 w-16 rounded-full mb-1" style={{ background: "rgba(0,0,0,0.2)" }} />
        <div className="h-1 w-12 rounded-full mb-2" style={{ background: "rgba(0,0,0,0.15)" }} />
        <div className="h-4 w-14 rounded flex items-center justify-center" style={{ background: accent }}>
          <div className="h-1 w-8 rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[1,2,3].map(i => (
          <div key={i} className="rounded p-1" style={{ background: "rgba(0,0,0,0.04)", border: `1px solid ${accent}30` }}>
            <div className="h-1 w-full rounded-full mb-0.5" style={{ background: accent, opacity: 0.6 }} />
            <div className="h-1 w-3/4 rounded-full" style={{ background: "rgba(0,0,0,0.15)" }} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TiendaMockup = ({ accent }: { accent: string }) => (
  <div className="w-full h-full flex flex-col" style={{ background: "#fafafa" }}>
    <div className="flex items-center justify-between px-3 py-2" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="flex gap-1.5">
        {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      </div>
      <div className="h-1.5 w-20 rounded-full" style={{ background: "rgba(0,0,0,0.08)" }} />
    </div>
    <div className="px-3 pt-2 grid grid-cols-2 gap-1.5">
      {[1,2,3,4].map(i => (
        <div key={i} className="rounded overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="h-8" style={{ background: i%2===0 ? `${accent}25` : "rgba(0,0,0,0.05)" }} />
          <div className="p-1">
            <div className="h-1 w-full rounded-full mb-0.5" style={{ background: "rgba(0,0,0,0.2)" }} />
            <div className="h-1 w-8 rounded-full" style={{ background: accent, opacity: 0.8 }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BeautyMockup = ({ accent }: { accent: string }) => (
  <div className="w-full h-full flex flex-col" style={{ background: "#1a1015" }}>
    <div className="flex items-center justify-between px-3 py-2" style={{ background: "#120e12" }}>
      <div className="flex gap-1.5">
        {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      </div>
      <div className="h-1.5 w-20 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
    </div>
    <div className="px-3 pt-2">
      <div className="h-1.5 w-16 rounded-full mb-0.5" style={{ background: "rgba(255,255,255,0.7)" }} />
      <div className="h-1 w-10 rounded-full mb-2" style={{ background: accent, opacity: 0.7 }} />
      <div className="grid grid-cols-3 gap-1 mb-2">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="rounded-sm" style={{ height: "22px", background: i%3===0 ? `${accent}50` : "rgba(255,255,255,0.06)" }} />
        ))}
      </div>
      <div className="h-4 rounded flex items-center justify-center" style={{ background: accent }}>
        <div className="h-1 w-10 rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
      </div>
    </div>
  </div>
);

// ── Use case data ─────────────────────────────────────────────────────────────
const CASES = [
  {
    accent: "#CC1500",
    Mockup: MenuMockup,
    emoji: "🍽️",
    es: { who: "Restaurantes · Bares · Cafeterías", title: "Menú digital", hook: "Tus clientes escanean un QR y ven el menú actualizado al instante. Sin impresiones, sin llamadas, sin confusión." },
    en: { who: "Restaurants · Bars · Cafés", title: "Digital menu", hook: "Customers scan a QR and see your updated menu instantly. No printing, no calls, no confusion." },
  },
  {
    accent: "#7C3AED",
    Mockup: TurnosMockup,
    emoji: "📅",
    es: { who: "Peluquerías · Spas · Médicos · Coaches", title: "Gestión de turnos", hook: "Tus clientes reservan su turno solos, cualquier hora. Vos te olvidás de los mensajes de WhatsApp a las 11pm." },
    en: { who: "Hair salons · Spas · Doctors · Coaches", title: "Booking system", hook: "Clients book appointments on their own, any time. You forget about WhatsApp messages at 11pm." },
  },
  {
    accent: "#06B6D4",
    Mockup: PortfolioMockup,
    emoji: "📸",
    es: { who: "Fotógrafos · Diseñadores · Artistas", title: "Portfolio creativo", hook: "Tu trabajo merece una vitrina a la altura. Una web que impresione antes de que abran la primera foto." },
    en: { who: "Photographers · Designers · Artists", title: "Creative portfolio", hook: "Your work deserves a proper showcase. A site that impresses before they open the first photo." },
  },
  {
    accent: "#EC4899",
    Mockup: BeautyMockup,
    emoji: "💅",
    es: { who: "Maquilladores · Nail art · Estilistas", title: "Beauty studio web", hook: "Galería de trabajos, precios, turnos online y redes en un solo lugar. Tu marca, profesional y lista para crecer." },
    en: { who: "MUAs · Nail techs · Stylists", title: "Beauty studio site", hook: "Portfolio, pricing, bookings and socials in one place. Your brand, professional and ready to grow." },
  },
  {
    accent: "#D97706",
    Mockup: TiendaMockup,
    emoji: "🛍️",
    es: { who: "Tiendas · Floristerías · Artesanías", title: "Tienda online", hook: "Vendés mientras dormís. Catálogo, carrito y pagos, todo integrado. Sin comisiones de terceros." },
    en: { who: "Shops · Florists · Crafts", title: "Online store", hook: "You sell while you sleep. Catalog, cart and payments, all integrated. No third-party commissions." },
  },
  {
    accent: "#10B981",
    Mockup: LandingMockup,
    emoji: "🎯",
    es: { who: "Coaches · Nutricionistas · Entrenadores", title: "Landing de servicios", hook: "Una página que explica lo que hacés, por qué sos la mejor opción y que convierte a visitantes en clientes." },
    en: { who: "Coaches · Nutritionists · Trainers", title: "Services landing page", hook: "A page that explains what you do, why you're the best option and turns visitors into clients." },
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export const UseCasesSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="bg-[#0A0A0A] text-white py-20 md:py-32 px-5 sm:px-8 lg:px-10 relative overflow-hidden" id="use-cases">

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, #0A0A0A, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10" style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }} />

      {/* Ambient blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: blobY }}>
        <div className="blob-1 absolute blur-3xl" style={{ background: "#CC1500", width: 400, height: 400, left: "90%", top: "20%", opacity: 0.07, transform: "translate(-50%,-50%)" }} />
        <div className="blob-2 absolute blur-3xl" style={{ background: "#7C3AED", width: 350, height: 350, left: "5%", top: "70%", opacity: 0.06, transform: "translate(-50%,-50%)" }} />
      </motion.div>

      {/* Label */}
      <div className="flex items-center gap-5 mb-14 relative z-10">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25" style={{ fontFamily: "Poppins, sans-serif" }}>03</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/25" style={{ fontFamily: "Poppins, sans-serif" }}>
          {lang === "en" ? "Made for you" : "Hecho para vos"}
        </span>
      </div>

      {/* Headline */}
      <div className="mb-14 relative z-10 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-black uppercase leading-[0.88] block"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.5rem, 6vw, 6.5rem)", letterSpacing: "-0.03em", backgroundImage: "linear-gradient(118deg, #CC1500 0%, #ffffff 35%, #7C3AED 70%, #06B6D4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {lang === "en" ? "Does this sound" : "¿Te suena"}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic font-light leading-[1.05] block"
          style={{ fontSize: "clamp(2rem, 5vw, 5.5rem)", backgroundImage: "linear-gradient(110deg, #ff4422 0%, #CC1500 45%, #ff7755 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          {lang === "en" ? "like you?" : "familiar?"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-white/40 max-w-xl"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(0.85rem, 1.4vw, 1rem)", lineHeight: 1.7 }}
        >
          {lang === "en"
            ? "Each project is different, but the goal is always the same: a site that works for you while you focus on your business."
            : "Cada proyecto es distinto, pero el objetivo siempre es el mismo: una web que trabaje por vos mientras te enfocás en tu negocio."}
        </motion.p>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CASES.map((c, i) => {
          const content = lang === "en" ? c.en : c.es;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group flex flex-col overflow-hidden border"
              style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.025)" }}
            >
              {/* Mockup preview */}
              <div className="relative h-36 overflow-hidden">
                <c.Mockup accent={c.accent} />
                {/* Gradient overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, transparent 60%, #0A0A0A 100%)` }} />
                {/* Accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: c.accent }} />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{c.emoji}</span>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/25" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {content.who}
                  </p>
                </div>

                <h3
                  className="font-black uppercase leading-none"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "-0.02em", color: c.accent }}
                >
                  {content.title}
                </h3>

                <p className="text-white/45 text-sm leading-relaxed flex-1">
                  {content.hook}
                </p>

                <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-[1px] flex-1" style={{ background: c.accent, opacity: 0.4 }} />
                  <span className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ fontFamily: "Poppins, sans-serif", color: c.accent }}>
                    {lang === "en" ? "I can build this" : "Puedo hacerte esto"}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 mt-14 text-center"
      >
        <p className="text-white/30 text-sm mb-5" style={{ fontFamily: "Poppins, sans-serif" }}>
          {lang === "en" ? "Don't see your industry? I can still help." : "¿No ves tu rubro? También puedo ayudarte."}
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {lang === "en" ? "Let's talk" : "Hablemos"} →
        </a>
      </motion.div>
    </section>
  );
};
