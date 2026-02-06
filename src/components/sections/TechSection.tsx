import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const categories = [
  {
    id: "01",
    title: "Frontend Development",
    skills:
      "React / Angular / TypeScript / JavaScript / HTML5 / CSS3 / Tailwind / Bootstrap",
    details:
      "Building responsive and accessible user interfaces, focusing on clean design, usability, and continuous learning.",
  },
  {
    id: "02",
    title: "Backend & APIs",
    skills:
      "Java / Spring / Node.js / C# / .NET / REST APIs / WebSockets / Sequelize / Hibernate",
    details:
      "Developing backend systems and APIs with attention to structure, maintainability, and good development practices.",
  },
  {
    id: "03",
    title: "Databases & Tools",
    skills: "MySQL / SQL Server / Git / GitHub / Maven / NPM",
    details:
      "Managing data and projects using professional tools, version control, and collaborative workflows.",
  },
];

export const TechSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isInside, setIsInside] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-120px" });

  /* Detect mobile + mouse */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  return (
    <section
      ref={ref}
      id="tech"
      onMouseEnter={() => !isMobile && setIsInside(true)}
      onMouseLeave={() => {
        !isMobile && setIsInside(false);
        !isMobile && setHoveredIndex(null);
      }}
     className={`scroll-mt-32 relative -mt-80 md:-mt-60 pt-0 pb-26 select-none overflow-hidden transition-all duration-300 ${
  isInside && !isMobile ? "cursor-none" : "cursor-default"
}`}

    >
      {/* CURSOR PERSONALIZADO EN DESKTOP */}
      <AnimatePresence>
        {isInside && !isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: hoveredIndex !== null ? 2.5 : 2,
            }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
            style={{
              x: mousePos.x,
              y: mousePos.y,
              translateX: "-50%",
              translateY: "-50%",
              width: "11px",
              height: "11px",
              backgroundColor: "#FF6F00",
              mixBlendMode: "difference",
            }}
            transition={{ type: "spring", damping: 35, stiffness: 300, mass: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="mb-20 px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-[#FF6F00] text-xs font-bold uppercase tracking-[0.5em] block mb-4"
        >
          Technical Core
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-none"
        >
          Crafting solutions with <br />
          <span className="text-white/30 italic font-light text-3xl md:text-4xl">
            modern precision.
          </span>
        </motion.h2>
      </div>

      {/* LISTADO DE CATEGORÍAS */}
      <div className="flex flex-col border-t border-white/5">
        {categories.map((cat, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              onClick={() =>
                isMobile
                  ? setHoveredIndex((prev) => (prev === index ? null : index))
                  : undefined
              }
              className={`group relative py-12 px-10 border-b border-white/5 ${
                isMobile ? "cursor-pointer" : ""
              }`}
            >
              {/* Hover / Glow background */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : -10,
                }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-white/[0.04] to-transparent pointer-events-none"
                style={{
                  borderLeft: isHovered
                    ? "2px solid #FF6F00"
                    : "2px solid transparent",
                }}
              />

              <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-baseline gap-4">
                  <span
                    className={`text-[10px] font-mono transition-colors duration-500 ${
                      isHovered ? "text-[#FF6F00]" : "text-white/20"
                    }`}
                  >
                    {cat.id}
                  </span>
                  <h3
                    className={`text-2xl md:text-3xl font-bold transition-all duration-500 ease-out ${
                      isHovered ? "text-white md:translate-x-4" : "text-white/40"
                    }`}
                  >
                    {cat.title}
                  </h3>
                </div>

                {/* DETALLES */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isHovered ? "auto" : 0,
                    opacity: isHovered ? 1 : 0,
                    marginTop: isHovered ? 16 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-[#FF6F00] text-sm font-medium tracking-wide mb-2 uppercase">
                    {cat.skills}
                  </p>
                  <p className="text-white/50 text-xs max-w-sm leading-relaxed">
                    {cat.details}
                  </p>
                </motion.div>
              </div>

              {/* Glow general */}
              <motion.div
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 -z-10 bg-[#FF6F00]/5 blur-3xl pointer-events-none"
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
