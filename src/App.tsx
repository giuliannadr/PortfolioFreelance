import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
// Forma correcta para export const
// Reemplazá el import de AboutSection por este:
import { AboutSection } from './components/sections/AboutSection';
import { Projects } from "@/components/sections/Projects";


import { TrustSection } from "./components/sections/TrustSection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { ServicesSection } from "./components/sections/ServicesSection";

function App() {
  return (
    <Layout>
      <Hero />
       <AboutSection />
      <TrustSection />
      <ProcessSection />
     
      <Projects />
      <ServicesSection />
     
    </Layout>
  );
}

export default App;
