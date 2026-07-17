import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const italicGrad = "linear-gradient(110deg, #CC1500 0%, #b01000 55%, #ff5533 100%)";

interface FAQItem {
  es: { q: string; a: string };
  en: { q: string; a: string };
}

const FAQ_ITEMS: FAQItem[] = [
  {
    es: {
      q: "¿Cuánto tiempo tarda un proyecto?",
      a: "Depende de la complejidad. Una landing page puede estar lista en 5-7 días hábiles, un sitio multi-sección en 10-15 días, y una tienda online entre 20-30 días. Siempre acordamos plazos antes de arrancar.",
    },
    en: {
      q: "How long does a project take?",
      a: "It depends on complexity. A landing page can be ready in 5-7 business days, a multi-section site in 10-15 days, and an online store in 20-30 days. We always agree on timelines before starting.",
    },
  },
  {
    es: {
      q: "¿Qué necesito para empezar?",
      a: "Solo necesitás tener una idea clara de lo que querés transmitir. Yo me encargo del diseño, desarrollo y deploy. Si tenés logo, textos o imágenes, ¡mejor! Si no, te asesoro en el proceso.",
    },
    en: {
      q: "What do I need to get started?",
      a: "You just need a clear idea of what you want to communicate. I handle the design, development, and deployment. If you have a logo, copy, or images, great! If not, I'll guide you through the process.",
    },
  },
  {
    es: {
      q: "¿Cómo es la forma de pago?",
      a: "Se abona un 50% al iniciar el proyecto y el 50% restante al finalizar, antes del deploy. Acepto transferencia bancaria y pagos en dólares para clientes internacionales.",
    },
    en: {
      q: "What are the payment terms?",
      a: "50% upfront to start the project and the remaining 50% upon completion, before deployment. I accept bank transfers and USD payments for international clients.",
    },
  },
  {
    es: {
      q: "¿Incluye hosting y dominio?",
      a: "El deploy está incluido en Vercel (hosting gratuito de alto rendimiento). El dominio personalizado (.com, .com.ar, etc.) se paga aparte de forma anual y te ayudo a configurarlo.",
    },
    en: {
      q: "Does it include hosting and domain?",
      a: "Deployment is included on Vercel (free, high-performance hosting). The custom domain (.com, etc.) is paid separately on an annual basis, and I'll help you set it up.",
    },
  },
  {
    es: {
      q: "¿Puedo pedir cambios después de la entrega?",
      a: "¡Sí! Durante el desarrollo hay instancias de revisión incluidas. Después de la entrega, podés contratar el plan de mantenimiento mensual para cambios continuos, o pedirme ajustes puntuales.",
    },
    en: {
      q: "Can I request changes after delivery?",
      a: "Yes! During development, there are review rounds included. After delivery, you can subscribe to the monthly maintenance plan for ongoing changes, or request specific adjustments.",
    },
  },
  {
    es: {
      q: "¿Trabajás con clientes de otros países?",
      a: "¡Sí! Trabajo con clientes de todo el mundo. La comunicación es por WhatsApp, email o videollamada. Los precios pueden cotizarse en dólares según la cotización del dólar blue.",
    },
    en: {
      q: "Do you work with international clients?",
      a: "Yes! I work with clients worldwide. Communication is via WhatsApp, email, or video call. Prices can be quoted in USD based on the current Blue Dollar exchange rate.",
    },
  },
  {
    es: {
      q: "Si ya tengo Instagram para mi negocio, ¿para qué necesito una web?",
      a: "Instagram es genial para interactuar, pero el algoritmo cambia constantemente y no sos dueño de tu cuenta. Una web propia te da profesionalismo, te permite aparecer en Google cuando la gente busca tu servicio, y organiza tu información de forma clara para que no tengas que responder las mismas preguntas 20 veces por mensaje privado.",
    },
    en: {
      q: "If I already have Instagram for my business, why do I need a website?",
      a: "Instagram is great for interaction, but the algorithm changes constantly and you don't own your account. A website gives you professional credibility, lets you appear on Google when people search for your services, and organizes your information clearly so you don't have to answer the same questions 20 times over DM.",
    },
  },
  {
    es: {
      q: "¿Por qué me conviene una tienda online propia y no Tiendanube o Shopify?",
      a: "Las plataformas como Tiendanube o Shopify te cobran un alquiler mensual obligatorio (que aumenta con la inflación) y se quedan con una comisión de cada venta que hacés. Con una tienda desarrollada a medida por mí, el hosting es gratuito, no pagás comisiones por venta (el 100% de la ganancia es tuya) y tenés un diseño exclusivo que te hace destacar de la competencia.",
    },
    en: {
      q: "Why choose a custom online store over Tiendanube or Shopify?",
      a: "Platforms like Shopify or Tiendanube charge a mandatory monthly subscription (which goes up with inflation) and keep a commission fee on every sale you make. With a custom store built by me, hosting is free, you pay 0% sales commission (100% of the profit is yours), and you get a unique design that makes you stand out from the competition.",
    },
  },
];

const BG_BLOBS = [
  { color: "#7C3AED", w: 380, x: "85%", y: "25%", op: 0.07, cls: "blob-2" },
  { color: "#CC1500", w: 300, x: "10%", y: "70%", op: 0.06, cls: "blob-1" },
];

export const FAQSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const ref = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      ref={ref}
      id="faq"
      className="bg-[#F5F4F0] text-[#0A0A0A] py-20 md:py-32 px-5 sm:px-8 lg:px-10 relative"
    >
      {/* Edge fades */}
      <div
        className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #F5F4F0, transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #F5F4F0, transparent)" }}
      />

      {/* Blobs */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ y: blobY }}>
        {BG_BLOBS.map((b, i) => (
          <div
            key={i}
            className={`${b.cls} absolute blur-3xl`}
            style={{
              background: b.color,
              width: b.w,
              height: b.w,
              left: b.x,
              top: b.y,
              opacity: b.op,
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}
      </motion.div>

      {/* Label */}
      <div className="flex items-center gap-5 mb-14 relative z-20">
        <span
          className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0A0A0A]/25"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          07
        </span>
        <div className="h-px flex-1 bg-[#0A0A0A]/[0.06]" />
        <span
          className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0A0A0A]/25"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          FAQ
        </span>
      </div>

      {/* Headline */}
      <div className="mb-16 relative z-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block font-black uppercase leading-[0.85]"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
            letterSpacing: "-0.03em",
            color: "#0A0A0A",
          }}
        >
          {lang === "en" ? "FAQ" : "Preguntas"}
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-serif italic font-light leading-[1.05]"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
            backgroundImage: italicGrad,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {lang === "en" ? "got questions?" : "frecuentes."}
        </motion.h2>
      </div>

      {/* FAQ items */}
      <div className="relative z-20 max-w-3xl mx-auto">
        {FAQ_ITEMS.map((item, i) => {
          const faq = lang === "en" ? item.en : item.es;
          const isOpen = openIndex === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="border-b"
              style={{ borderColor: "rgba(10,10,10,0.07)" }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-4 py-5 md:py-6 text-left group"
              >
                {/* Number */}
                <span
                  className="text-[9px] font-black tracking-[0.15em] shrink-0 w-5 text-[#0A0A0A]/15"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Question */}
                <span
                  className="flex-1 font-bold text-sm md:text-base transition-colors duration-300"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    color: isOpen ? "#0A0A0A" : "rgba(10,10,10,0.45)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {faq.q}
                </span>

                {/* Icon */}
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 w-7 h-7 flex items-center justify-center"
                  style={{
                    background: isOpen ? "rgba(10,10,10,0.07)" : "rgba(10,10,10,0.03)",
                    border: `1px solid ${isOpen ? "rgba(10,10,10,0.12)" : "rgba(10,10,10,0.06)"}`,
                    transition: "background 0.3s, border-color 0.3s",
                  }}
                >
                  <Plus
                    size={12}
                    strokeWidth={2.5}
                    style={{ color: isOpen ? "#0A0A0A" : "rgba(10,10,10,0.3)" }}
                  />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-9 pr-4">
                      <p
                        className="text-[13px] md:text-sm leading-relaxed text-[#0A0A0A]/40"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
