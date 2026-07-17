import { Layout }           from "@/components/layout/Layout";
import { Hero }             from "@/components/sections/Hero";
import { UseCasesSection }  from "@/components/sections/UseCasesSection";
import { AboutSection }     from "./components/sections/AboutSection";
import { TrustSection }     from "./components/sections/TrustSection";
import { ProcessSection }   from "./components/sections/ProcessSection";
import { Projects }         from "@/components/sections/Projects";
import { ServicesSection }  from "@/components/sections/ServicesSection";
import { FAQSection }       from "@/components/sections/FAQSection";
import { Footer }           from "@/components/layout/Footer";
import { Loader }           from "@/components/ui/Loader";
import { DeleteReview }     from "@/components/ui/DeleteReview";

// Check if the URL contains a delete token (?borrar=TOKEN)
const deleteToken = new URLSearchParams(window.location.search).get("borrar");

function App() {
  // If Giuliana clicked "Eliminar reseña" in her email, show the delete screen
  if (deleteToken) {
    return <DeleteReview token={deleteToken} />;
  }

  return (
    <>
      <Loader onDone={() => {}} />
      <Layout>
        <Hero />
        <UseCasesSection />
        <AboutSection />
        <ProcessSection />
        <TrustSection />
        <Projects />
        <ServicesSection />
        <FAQSection />
        <Footer />
      </Layout>
    </>
  );
}

export default App;
