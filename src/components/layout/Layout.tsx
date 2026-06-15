import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#0A0A0A] overflow-x-hidden">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};
