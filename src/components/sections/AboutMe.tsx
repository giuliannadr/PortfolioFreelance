import { AnimatedSection } from "@/components/ui/AnimatedSection";

const stats = [
  {
    label: "Web Development Degree",
    value: "90%",
    color: "bg-[#FF6F00]", // El naranja de tu hero
    description:
      "18 of 20 subjects completed with a focus on software architecture.",
  },
 { 
  label: "Rapid Learning",
  value: "Execution",
  color: "bg-[#1A1A1A]",
  description: "Quickly masters new tools and workflows."
}

];

export const AboutMe = () => {
  return (
    <section id="about" className="scroll-mt-32 py-12 border-t rounded-[2rem] border-white/5 bg-black">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Título y Texto Personal */}
        <AnimatedSection>
          <div className="mb-16">
            {/* Título de sección más grande y visible */}
            <h2 className="text-base md:text-lg uppercase tracking-[0.4em] text-[#FF6F00] font-bold mb-8">
              About Me
            </h2>
            <p className="text-3xl md:text-5xl font-medium text-white leading-tight max-w-4xl tracking-tight">
              Hi! I'm Giuliana. <br />
            <span className="text-white/50">
  A Full-Stack Developer crafting clean, scalable, and maintainable web applications.
</span>

            </p>
          </div>
        </AnimatedSection>
        {/* Las Dos Tarjetas */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
  {stats.map((stat, index) => (
    <AnimatedSection key={index} delay={index * 0.2}>
      <div
        className={`flex flex-col justify-between transition-all duration-500 group ${stat.color}
          /* Estética Mobile: Compacta y equilibrada */
          p-6 rounded-[1.5rem] border border-white/10
          /* Estética Desktop: EXACTAMENTE TU CÓDIGO */
          md:p-10 md:rounded-3xl md:border-white/5 md:hover:border-white/10`}
      >
        <div className="flex flex-col">
          <span className="block font-bold text-white tracking-tighter 
            /* Mobile */
            text-4xl mb-1
            /* Desktop Original */
            md:text-6xl md:mb-4">
            {stat.value}
          </span>
          <span className="font-semibold text-white/90 uppercase tracking-[0.2em]
            /* Mobile */
            text-[10px]
            /* Desktop Original */
            md:text-sm">
            {stat.label}
          </span>
        </div>

        <p className="text-white/70 leading-snug
          /* Mobile: Texto más fluido y menos margen */
          mt-6 text-[15px] max-w-[90%]
          /* Desktop Original */
          md:mt-8 md:text-lg md:max-w-full">
          {stat.description}
        </p>
      </div>
    </AnimatedSection>
  ))}
</div>

        {/* Frase de cierre opcional */}
        <AnimatedSection delay={0.4}>
          <p className="mt-12 text-white/40 italic font-light">
            Focusing on quality over quantity, I curate every project to ensure
            technical excellence.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};
