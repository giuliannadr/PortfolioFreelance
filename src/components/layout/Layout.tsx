import { ReactNode, Children } from "react";
import { motion } from "framer-motion";
import { Footer } from "./Footer";
import { TopRightControls } from "./TopRightControls";
import { ProfileCard } from "../ProfileCard";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const arrayChildren = Children.toArray(children);
  const heroSection = arrayChildren[0];
  const otherSections = arrayChildren.slice(1);

  return (
    // Fondo base casi negro, pero con un matiz azulado muy sutil
    <div className="min-h-screen bg-[#020408] text-foreground relative overflow-hidden transition-colors duration-300">
      
      {/* --- ATMÓSFERA DISIMULADA --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        
        {/* LUZ NARANJA: Muy tenue, moviéndose lento en el fondo */}
        <motion.div 
          animate={{ 
            x: [0, 40, 0],
            y: [0, 20, 0],
            opacity: [0.03, 0.07, 0.03] // Bajamos la opacidad al mínimo (3% a 7%)
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-5%] w-[50vw] h-[50vw] bg-[#FF6F00] rounded-full blur-[160px]" 
        />
        
        {/* LUZ COMPLEMENTARIA (ÍNDIGO/AZUL): Para equilibrar el naranja */}
        <motion.div 
          animate={{ 
            x: [0, -30, 0],
            y: [0, -40, 0],
            opacity: [0.05, 0.08, 0.05] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[-5%] w-[60vw] h-[60vw] bg-[#1E3A8A] rounded-full blur-[180px]" 
        />

        {/* Textura de Ruido: Aumentamos un poco el noise para dar sensación de "mate" */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <Navbar />
      <TopRightControls />

      {/* MAIN CONTAINER */}
      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="flex flex-col gap-32 max-w-6xl mx-auto">
          
          {/* FILA SUPERIOR: Hero + ProfileCard */}
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-start">
            <aside className="flex justify-center lg:justify-end">
              <ProfileCard />
            </aside>
            
            <div className="w-full flex justify-center lg:justify-start">
               {heroSection}
            </div>
          </div>

          {/* CONTENIDO INFERIOR */}
          <main className="w-full max-w-4xl mx-auto">
            {otherSections}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};