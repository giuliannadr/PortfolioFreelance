import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { WhyCodePanel } from "./WhyCodeSection";

const BG = "#F5F4F0";

// ── CSS-only mockups (zero images, instant load) ──────────────────────────────

const MenuMockup = ({ accent }: { accent: string }) => (
  <div className="w-full h-full flex flex-col" style={{ background: "#1a1a1a" }}>
    {/* Browser bar */}
    <div className="flex items-center gap-1.5 px-3 py-1.5 shrink-0" style={{ background: "#111" }}>
      {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      <div className="h-1.5 flex-1 rounded-full ml-1" style={{ background: "rgba(255,255,255,0.07)" }} />
    </div>
    {/* Nav */}
    <div className="flex items-center justify-between px-3 py-1.5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="h-2 w-10 rounded-full" style={{ background: accent, opacity: 0.9 }} />
      <div className="flex gap-2">
        {[14,10,12].map((w,i) => <div key={i} className="h-1 rounded-full" style={{ width: w, background: "rgba(255,255,255,0.2)" }} />)}
      </div>
    </div>
    {/* Category chips */}
    <div className="flex gap-1 px-3 pt-1.5 pb-1 shrink-0">
      {[accent, "rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)"].map((bg, i) => (
        <div key={i} className="h-3 rounded-full px-1.5 flex items-center" style={{ background: bg, minWidth: i===0?28:20 }}>
          <div className="h-0.5 w-full rounded-full" style={{ background: i===0?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.25)" }} />
        </div>
      ))}
    </div>
    {/* Menu items */}
    <div className="px-3 grid grid-cols-2 gap-1.5 flex-1 pb-1.5">
      {[1,2,3,4].map(i => (
        <div key={i} className="rounded flex flex-col overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="h-6" style={{ background: i%2===0 ? `${accent}25` : "rgba(255,255,255,0.06)" }} />
          <div className="p-1 flex flex-col gap-0.5">
            <div className="h-1 w-full rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
            <div className="flex items-center justify-between">
              <div className="h-1 w-5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
              <div className="h-1 w-4 rounded-full" style={{ background: accent, opacity: 0.8 }} />
            </div>
          </div>
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
    {/* Browser bar */}
    <div className="flex items-center gap-1.5 px-3 py-1.5 shrink-0" style={{ background: "#080808" }}>
      {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      <div className="h-1.5 flex-1 rounded-full ml-1" style={{ background: "rgba(255,255,255,0.06)" }} />
    </div>
    {/* Nav */}
    <div className="flex items-center justify-between px-3 py-1.5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="h-1.5 w-8 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />
      <div className="flex gap-2">
        {[10,10,10].map((w,i) => <div key={i} className="h-1 rounded-full" style={{ width: w, background: "rgba(255,255,255,0.15)" }} />)}
      </div>
    </div>
    {/* Hero */}
    <div className="px-3 pt-2 pb-1 shrink-0">
      <div className="h-2.5 w-20 rounded-full mb-1" style={{ background: "rgba(255,255,255,0.75)" }} />
      <div className="h-1 w-14 rounded-full mb-0.5" style={{ background: "rgba(255,255,255,0.2)" }} />
      <div className="h-2.5 w-10 rounded flex items-center justify-center mt-1.5" style={{ background: accent }}>
        <div className="h-0.5 w-6 rounded-full" style={{ background: "rgba(255,255,255,0.8)" }} />
      </div>
    </div>
    {/* Grid */}
    <div className="px-3 pb-1.5 grid grid-cols-3 gap-1 flex-1">
      {[28,22,32,18,26,20].map((h, i) => (
        <div key={i} className="rounded-sm overflow-hidden" style={{ height: h, background: i%2===0 ? `${accent}35` : "rgba(255,255,255,0.07)" }} />
      ))}
    </div>
  </div>
);

const LandingMockup = ({ accent }: { accent: string }) => (
  <div className="w-full h-full flex flex-col" style={{ background: "#fff" }}>
    {/* Browser bar */}
    <div className="flex items-center gap-1.5 px-3 py-1.5 shrink-0" style={{ background: "#f5f5f5", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      <div className="h-1.5 flex-1 rounded-full ml-1" style={{ background: "rgba(0,0,0,0.08)" }} />
    </div>
    {/* Nav */}
    <div className="flex items-center justify-between px-3 py-1.5 shrink-0" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="h-1.5 w-10 rounded-full" style={{ background: accent, opacity: 0.8 }} />
      <div className="flex gap-2">
        {[10,10,10].map((w,i) => <div key={i} className="h-1 rounded-full" style={{ width: w, background: "rgba(0,0,0,0.15)" }} />)}
      </div>
    </div>
    {/* Hero */}
    <div className="px-3 pt-2 pb-1 shrink-0">
      <div className="h-2.5 w-24 rounded-full mb-1" style={{ background: "rgba(0,0,0,0.75)" }} />
      <div className="h-1 w-20 rounded-full mb-0.5" style={{ background: "rgba(0,0,0,0.18)" }} />
      <div className="h-1 w-16 rounded-full mb-2" style={{ background: "rgba(0,0,0,0.12)" }} />
      <div className="h-3.5 w-12 rounded flex items-center justify-center" style={{ background: accent }}>
        <div className="h-0.5 w-7 rounded-full" style={{ background: "rgba(255,255,255,0.85)" }} />
      </div>
    </div>
    {/* Trust + services */}
    <div className="px-3 pb-1.5 flex flex-col gap-1 flex-1 justify-end">
      <div className="flex gap-1">
        {[1,2,3].map(i => (
          <div key={i} className="flex-1 rounded p-1" style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}>
            <div className="w-3 h-3 rounded-full mb-0.5" style={{ background: `${accent}30` }} />
            <div className="h-1 w-full rounded-full mb-0.5" style={{ background: "rgba(0,0,0,0.2)" }} />
            <div className="h-1 w-2/3 rounded-full" style={{ background: "rgba(0,0,0,0.1)" }} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TiendaMockup = ({ accent }: { accent: string }) => (
  <div className="w-full h-full flex flex-col" style={{ background: "#fafafa" }}>
    {/* Browser bar */}
    <div className="flex items-center gap-1.5 px-3 py-1.5 shrink-0" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      <div className="h-1.5 flex-1 rounded-full ml-1" style={{ background: "rgba(0,0,0,0.08)" }} />
    </div>
    {/* Nav with cart */}
    <div className="flex items-center justify-between px-3 py-1.5 shrink-0" style={{ background:"#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="h-1.5 w-10 rounded-full" style={{ background: accent, opacity: 0.9 }} />
      <div className="flex items-center gap-1.5">
        {[10,10].map((w,i) => <div key={i} className="h-1 rounded-full" style={{ width: w, background: "rgba(0,0,0,0.15)" }} />)}
        {/* Cart icon */}
        <div className="w-3.5 h-3.5 rounded-sm flex items-center justify-center" style={{ background: `${accent}15`, border:`1px solid ${accent}40` }}>
          <div className="w-1.5 h-1.5 rounded-sm" style={{ background: accent, opacity: 0.7 }} />
        </div>
      </div>
    </div>
    {/* Products */}
    <div className="px-3 pt-1.5 pb-1.5 grid grid-cols-2 gap-1.5 flex-1">
      {[1,2,3,4].map(i => (
        <div key={i} className="rounded overflow-hidden flex flex-col" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}>
          <div className="h-7 flex items-end px-1 pb-0.5" style={{ background: i%2===0 ? `${accent}20` : "rgba(0,0,0,0.05)" }}>
            <div className="h-1 w-3 rounded-full" style={{ background: i%2===0 ? accent : "rgba(0,0,0,0.15)", opacity: 0.7 }} />
          </div>
          <div className="px-1 pt-0.5 pb-1 flex flex-col gap-0.5">
            <div className="h-1 w-full rounded-full" style={{ background: "rgba(0,0,0,0.2)" }} />
            <div className="flex items-center justify-between">
              <div className="h-1 w-4 rounded-full" style={{ background: accent, opacity: 0.9 }} />
              <div className="h-2 w-5 rounded flex items-center justify-center" style={{ background: accent }}>
                <div className="h-0.5 w-3 rounded-full" style={{ background: "rgba(255,255,255,0.9)" }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InvitacionMockup = ({ accent }: { accent: string }) => (
  <div className="w-full h-full flex flex-col" style={{ background: "#fdf8f2" }}>
    {/* Browser bar */}
    <div className="flex items-center gap-1.5 px-3 py-1.5 shrink-0" style={{ background: "#f5ede0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      {["#ff5f57","#ffbd2e","#28ca42"].map(c => <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
      <div className="h-1.5 flex-1 rounded-full ml-1" style={{ background: "rgba(0,0,0,0.08)" }} />
    </div>
    {/* Accent line */}
    <div className="w-full h-0.5 shrink-0" style={{ background: `linear-gradient(to right, transparent, ${accent}90, transparent)` }} />
    {/* Monogram + names */}
    <div className="flex flex-col items-center pt-2 pb-1 shrink-0">
      <div className="w-5 h-5 rounded-full flex items-center justify-center mb-0.5" style={{ border: `1px solid ${accent}55` }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent, opacity: 0.8 }} />
      </div>
      <div className="h-2 rounded-full mb-0.5" style={{ background: "rgba(0,0,0,0.55)", width: 68 }} />
      <div className="h-1 w-8 rounded-full" style={{ background: accent, opacity: 0.4 }} />
    </div>
    {/* Date divider */}
    <div className="flex items-center justify-center gap-1.5 mb-2 shrink-0 px-3">
      <div className="h-px flex-1" style={{ background: `${accent}30` }} />
      <span className="text-[5px] font-black tracking-widest" style={{ color: accent, fontFamily: "Poppins, sans-serif", opacity: 0.8 }}>14 · 06 · 2026</span>
      <div className="h-px flex-1" style={{ background: `${accent}30` }} />
    </div>
    {/* Countdown boxes */}
    <div className="flex justify-center gap-1.5 px-3 mb-2 shrink-0">
      {[{ n: "23", l: "días" }, { n: "14", l: "horas" }, { n: "36", l: "min" }].map(({ n, l }) => (
        <div key={l} className="flex flex-col items-center gap-0.5">
          <div className="w-8 h-7 rounded flex items-center justify-center" style={{ background: `${accent}15`, border: `1px solid ${accent}40` }}>
            <span className="text-[10px] font-black" style={{ color: accent, fontFamily: "Poppins, sans-serif" }}>{n}</span>
          </div>
          <span className="text-[4.5px] uppercase tracking-widest" style={{ color: "rgba(0,0,0,0.28)", fontFamily: "Poppins, sans-serif" }}>{l}</span>
        </div>
      ))}
    </div>
    {/* RSVP button */}
    <div className="flex justify-center flex-1 items-end pb-2.5">
      <div className="h-4 w-16 rounded-full flex items-center justify-center" style={{ background: accent }}>
        <div className="h-0.5 w-8 rounded-full" style={{ background: "rgba(255,255,255,0.85)" }} />
      </div>
    </div>
  </div>
);


// ── Use case data ─────────────────────────────────────────────────────────────
const CASES = [
  {
    accent: "#CC1500",
    Mockup: MenuMockup,
    es: { service: "Sitio Web", who: "Restaurantes · Bares · Cafeterías", title: "Menú digital", hook: "Tus clientes escanean un QR y ven el menú actualizado al instante. Sin impresiones, sin llamadas, sin confusión." },
    en: { service: "Website", who: "Restaurants · Bars · Cafés", title: "Digital menu", hook: "Customers scan a QR and see your updated menu instantly. No printing, no calls, no confusion." },
  },
  {
    accent: "#7C3AED",
    Mockup: TurnosMockup,
    es: { service: "Web App", who: "Peluquerías · Spas · Médicos · Coaches", title: "Gestión de turnos", hook: "Tus clientes reservan su turno solos, cualquier hora. Vos te olvidás de los mensajes de WhatsApp a las 11pm." },
    en: { service: "Web App", who: "Hair salons · Spas · Doctors · Coaches", title: "Booking system", hook: "Clients book appointments on their own, any time. You forget about WhatsApp messages at 11pm." },
  },
  {
    accent: "#06B6D4",
    Mockup: PortfolioMockup,
    es: { service: "Portfolio", who: "Fotógrafos · Diseñadores · Artistas", title: "Portfolio creativo", hook: "Tu trabajo merece una vitrina a la altura. Una web que impresione antes de que abran la primera foto." },
    en: { service: "Portfolio", who: "Photographers · Designers · Artists", title: "Creative portfolio", hook: "Your work deserves a proper showcase. A site that impresses before they open the first photo." },
  },
  {
    accent: "#C084FC",
    Mockup: InvitacionMockup,
    es: { service: "Sitio Web", who: "Bodas · Quinceañeras · Cumpleaños · Eventos", title: "Invitación digital", hook: "Elegante, interactiva y sin imprimir nada. Los invitados confirman asistencia desde el link y vos tenés todo organizado en un solo lugar." },
    en: { service: "Website", who: "Weddings · Quinceañeras · Birthdays · Events", title: "Digital invitation", hook: "Elegant, interactive and paperless. Guests confirm attendance from the link and you have everything organized in one place." },
  },
  {
    accent: "#D97706",
    Mockup: TiendaMockup,
    es: { service: "Tienda Online", who: "Tiendas · Floristerías · Artesanías", title: "Tienda online", hook: "Vendés mientras dormís. Catálogo, carrito y pagos, todo integrado. Sin comisiones de terceros." },
    en: { service: "Online Store", who: "Shops · Florists · Crafts", title: "Online store", hook: "You sell while you sleep. Catalog, cart and payments, all integrated. No third-party commissions." },
  },
  {
    accent: "#10B981",
    Mockup: LandingMockup,
    es: { service: "Landing Page", who: "Coaches · Nutricionistas · Entrenadores", title: "Landing de servicios", hook: "Una página que explica lo que hacés, por qué sos la mejor opción y que convierte visitas en clientes." },
    en: { service: "Landing Page", who: "Coaches · Nutritionists · Trainers", title: "Services landing", hook: "A page that explains what you do, why you're the best option and turns visitors into clients." },
  },
];

const BLOBS = [
  { color: "#CC1500", w: 500, x: "90%", y: "20%", op: 0.07 },
  { color: "#7C3AED", w: 400, x: "4%",  y: "60%", op: 0.06 },
  { color: "#06B6D4", w: 320, x: "52%", y: "88%", op: 0.05 },
  { color: "#EC4899", w: 240, x: "30%", y: "5%",  op: 0.04 },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const } }),
};

// ── Shared card inner content ─────────────────────────────────────────────────
const CardInner = ({ c, content, lang }: {
  c: typeof CASES[0];
  content: { service: string; who: string; title: string; hook: string };
  lang: string;
}) => (
  <>
    {/* Mockup preview */}
    <div className="relative h-36 overflow-hidden shrink-0">
      <c.Mockup accent={c.accent} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 55%, #ffffff 100%)" }} />
      <div className="absolute top-0 left-0 right-0 h-[2.5px]" style={{ background: c.accent }} />
    </div>

    {/* Content */}
    <div className="relative px-5 pb-5 pt-3 flex flex-col gap-2 flex-1">
      <div className="flex items-center justify-between">
        <span
          className="text-[7px] font-black uppercase tracking-[0.35em] px-2 py-0.5 rounded-full"
          style={{ fontFamily: "Poppins, sans-serif", background: `${c.accent}15`, color: c.accent }}
        >
          {content.service}
        </span>
      </div>
      <p className="text-[8px] font-black uppercase tracking-[0.25em] text-[#0A0A0A]/30"
        style={{ fontFamily: "Poppins, sans-serif" }}>
        {content.who}
      </p>
      <h3
        className="font-black uppercase leading-none"
        style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.05rem, 2vw, 1.3rem)", letterSpacing: "-0.02em", color: "#0A0A0A" }}
      >
        {content.title}
      </h3>
      <p className="text-[#0A0A0A]/45 text-[0.8rem] leading-relaxed flex-1">
        {content.hook}
      </p>
      {/* Hover CTA line — desktop only */}
      <div className="hidden md:flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="h-[1px] flex-1" style={{ background: c.accent, opacity: 0.35 }} />
        <span className="text-[7px] font-black uppercase tracking-[0.3em]"
          style={{ fontFamily: "Poppins, sans-serif", color: c.accent }}>
          {lang === "en" ? "I can build this" : "Puedo hacerte esto"}
        </span>
      </div>
    </div>
  </>
);

// ── Component ─────────────────────────────────────────────────────────────────
export const UseCasesSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const ref = useRef<HTMLElement>(null);

  // ── Mobile carousel state ──────────────────────────────────────────────────
  const [activeIdx, setActiveIdx]   = useState(0);
  const [cardW,     setCardW]       = useState(0);
  const containerRef  = useRef<HTMLDivElement>(null);
  const touchStartX   = useRef(0);
  const touchStartT   = useRef(0);
  const isPausedRef   = useRef(false);
  const resumeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => setActiveIdx(Math.max(0, Math.min(CASES.length - 1, idx)));

  // Measure card width from container
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setCardW(containerRef.current.offsetWidth - 40);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-advance (pauses while user is swiping)
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPausedRef.current) setActiveIdx(i => (i + 1) % CASES.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartT.current = Date.now();
    isPausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dt = Date.now() - touchStartT.current;
    if (Math.abs(dx) > 40 || (Math.abs(dx) > 15 && dt < 250)) {
      if (dx > 0) goTo(activeIdx + 1);
      else goTo(activeIdx - 1);
    }
    resumeTimer.current = setTimeout(() => { isPausedRef.current = false; }, 3000);
  };

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} id="what-i-build" className="py-20 md:py-32 px-5 sm:px-8 lg:px-10 relative overflow-hidden" style={{ background: BG }}>

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
        style={{ background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
        style={{ background: `linear-gradient(to top, ${BG}, transparent)` }} />

      {/* Ambient blobs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: blobY }}>
        {BLOBS.map((b, i) => (
          <div key={i} className="absolute blur-3xl"
            style={{ background: b.color, width: b.w, height: b.w, left: b.x, top: b.y, opacity: b.op, transform: "translate(-50%,-50%)", borderRadius: "50%" }} />
        ))}
      </motion.div>

      {/* Label */}
      <div className="flex items-center gap-5 mb-14 relative z-20">
        <div className="flex items-center gap-2 font-mono text-[9px] text-[#CC1500] uppercase tracking-[0.25em]">
          <span>01</span>
          <span>//</span>
          <span>{lang === "en" ? "WHAT I BUILD" : "LO QUE CONSTRUYO"}</span>
        </div>
        <div className="h-px flex-1 bg-[#0A0A0A]/[0.08]" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0A0A0A]/25"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          {lang === "en" ? "What I build" : "Lo que construyo"}
        </span>
      </div>

      {/* Headline */}
      <div className="mb-14 relative z-20 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block font-black uppercase leading-[0.88]"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)", letterSpacing: "-0.03em" }}
        >
          <span className="mr-3" style={{ WebkitTextStroke: "1.2px #0A0A0A", WebkitTextFillColor: "transparent", color: "transparent" }}>
            {lang === "en" ? "A SITE" : "UNA WEB"}
          </span>
          <span className="text-[#0A0A0A]">
            {lang === "en" ? "BUILT" : "HECHA"}
          </span>
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-black uppercase leading-[0.88] text-[#0A0A0A]/30"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)", letterSpacing: "-0.03em" }}
        >
          {lang === "en" ? "FOR YOUR BUSINESS." : "PARA TU NEGOCIO."}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-[#0A0A0A]/45 max-w-xl"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(0.85rem, 1.4vw, 1rem)", lineHeight: 1.7 }}
        >
          {lang === "en"
            ? "These are just a few examples of what's possible with code. No templates, no limits — if you can imagine it, it can be built."
            : "Estos son solo algunos ejemplos de lo que se puede hacer con código. Sin plantillas, sin límites — si lo podés imaginar, se puede construir."}
        </motion.p>
      </div>

      {/* ── MOBILE: transform-based swipe carousel ── */}
      <div
        ref={containerRef}
        className="md:hidden relative z-20 overflow-hidden pb-3 -mx-5 px-5"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(-${activeIdx * (cardW + 12)}px)`,
            transition: "transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "transform",
          }}
        >
          {CASES.map((c, i) => {
            const content = lang === "en" ? c.en : c.es;
            return (
              <div
                key={i}
                className="shrink-0 flex flex-col overflow-hidden border border-[#0A0A0A]/8 bg-white"
                style={{ width: cardW || "82vw" }}
              >
                <CardInner c={c} content={content} lang={lang} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators — mobile, synced to activeIdx */}
      <div className="md:hidden relative z-20 flex justify-center gap-1.5 mt-4">
        {CASES.map((c, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300"
            style={{
              width: i === activeIdx ? 18 : 6,
              height: 6,
              borderRadius: 3,
              background: i === activeIdx ? c.accent : "rgba(10,10,10,0.15)",
            }}
          />
        ))}
      </div>

      {/* ── DESKTOP: animated grid ── */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 relative z-20">
        {CASES.map((c, i) => {
          const content = lang === "en" ? c.en : c.es;
          return (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{
                y: -6,
                scale: 1.015,
                boxShadow: `0 24px 60px ${c.accent}28, 0 8px 24px ${c.accent}15`,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
              className="group flex flex-col overflow-hidden border border-[#0A0A0A]/8 bg-white cursor-default relative"
            >
              {/* Hover background glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 90% 90% at 50% 40%, ${c.accent}12 0%, transparent 70%)` }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
              <CardInner c={c} content={content} lang={lang} />
            </motion.div>
          );
        })}
      </div>

      {/* Why code panel — floating dark card within the light section */}
      <div className="relative z-20 mt-12">
        <WhyCodePanel lang={lang} />
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-20 mt-14 text-center"
      >
        <p className="text-[#0A0A0A]/35 text-sm mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
          {lang === "en"
            ? "Don't see your industry? With code, almost anything is possible."
            : "¿No ves tu rubro? Con código, casi todo es posible."}
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-[#0A0A0A]/35 hover:text-[#CC1500] transition-colors duration-300"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {lang === "en" ? "Let's talk" : "Hablemos"} →
        </a>
      </motion.div>
    </section>
  );
};
