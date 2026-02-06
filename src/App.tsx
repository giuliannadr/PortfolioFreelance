import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { AboutMe } from "@/components/sections/AboutMe";
import { Projects } from "@/components/sections/Projects";

import { TechCarrousel } from "@/components/sections/TechCarrousel";
import { TechSection } from "./components/sections/TechSection";

function App() {
  return (
    <Layout>
      <Hero />
      <TechCarrousel />
      <AboutMe />
      <Projects />
      <TechSection />
     
    </Layout>
  );
}

export default App;
