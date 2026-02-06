import { Home, User, Folder, Code, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  const icons = [
    { icon: <Home size={20} />, href: "#home", id: "home" },
    { icon: <User size={20} />, href: "#about", id: "about" },
    { icon: <Folder size={20} />, href: "#projects", id: "projects" },
    { icon: <Code size={20} />, href: "#tech", id: "tech" },
    { icon: <Mail size={20} />, href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        // Obtenemos las secciones visibles
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aCenter = a.boundingClientRect.top + a.boundingClientRect.height / 2;
            const bCenter = b.boundingClientRect.top + b.boundingClientRect.height / 2;
            return Math.abs(aCenter - window.innerHeight / 2) - Math.abs(bCenter - window.innerHeight / 2);
          });

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px", // zona activa centrada
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));

    // Scroll final → Contact
    const handleScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.body.offsetHeight;

      // Si estamos muy cerca del final, activamos contact
      if (scrollBottom >= docHeight - 10) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="
      fixed top-0 left-1/2 z-50 mt-6
      -translate-x-1/2
      bg-white/10 backdrop-blur-xl
      border border-white/25
      shadow-lg
      rounded-full
    ">
      <div className="relative flex items-center gap-6 px-6 py-2">
        {icons.map((item, index) => {
          const isActive = activeSection === item.id;
          return (
            <a key={index} href={item.href} className="relative group">
              {isActive && (
                <span className="
                  absolute inset-0
                  rounded-full
                  bg-white/25
                  blur-md
                  scale-125
                  animate-pulse
                " />
              )}
              <span className={`
                relative z-10 flex items-center justify-center
                w-9 h-9 rounded-full
                transition-all duration-300 ease-out
                ${isActive ? "bg-white/15 backdrop-blur-md scale-110 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}
              `}>
                {item.icon}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
