import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ProfileCard } from "@/components/ProfileCard";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20 relative">

      {/* BACKGROUND HERO detrás del hero y la tarjeta */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-white/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <div
        className="
          container mx-auto
          grid
          grid-cols-1
          lg:grid-cols-[580px_1fr]  /* columna izquierda más ancha */
          gap-8                     /* menos separación entre columnas */
          px-6
          py-24
          relative
          z-10
          mt-5
        "
      >
   
{/* LEFT STICKY CARD (DESKTOP) */}
<aside className="hidden lg:flex justify-center sticky top-28 h-fit ml-28 z-10">
  <ProfileCard />
</aside>




        {/* RIGHT SCROLL CONTENT */}
        <main className="flex flex-col gap-8">

          {/* ProfileCard para MOBILE (arriba del Hero) */}
          <div className="block lg:hidden -mb-8">
            <ProfileCard />
          </div>

          
          {children}

        </main>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};
