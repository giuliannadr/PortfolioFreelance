import { ArrowUpRight, X, Github } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const projects = [
  {
    id: "trivia",
    title: "Distributed Trivia Engine",
    category: "Java / Spring MVC / WebSockets / MySQL",

    description: "Collaborative multiplayer trivia platform with real-time game modes and synchronized player sessions.",
    longDescription:
      "Team-based project focused on building a real-time multiplayer trivia system using Spring MVC. I was mainly responsible for designing and implementing the survival and competitive game modes, including WebSocket-based synchronization and match progression logic. I also developed the authentication system and password recovery flow with email integration. The project emphasized concurrency handling, session management, and reliable state persistence using MySQL, providing hands-on experience with scalable backend architecture.",
    image: "./triviaproject.png",
    githubUrl: "https://github.com/Chouny1109/TP-TALLER-WEB-I.git",
  },
  {
    id: "hardware-hub",
    title: "Enterprise Inventory Hub",
   category: "Angular / Node.js / REST API / Sequelize / MySQL",

    description: "Team-developed inventory and e-commerce platform with role-based access control and administrative tools.",
    longDescription:
      "Collaborative project focused on developing a full-stack inventory management and e-commerce system using Angular and Node.js. I contributed to backend APIs, database integration, and frontend components for administrative and user workflows. The platform includes role-based access control, product management, and purchase tracking, strengthening my experience in building structured and maintainable web applications.",
    image: "./tiendaonline.png",
    githubUrl: "https://github.com/AngelDNK/TP-TW2-Grupo7.git",
  },
  {
    id: "nlp-exam-gen",
    title: "AI Semantic Engine",
  category: ".NET 9 / C# / NLP / Entity Framework / SQL Server",
    description: "Collaborative assessment platform that generates and evaluates exams using NLP techniques.",
    longDescription:
      "Team project aimed at building an automated exam generation and evaluation system using .NET and NLP techniques. I worked on data processing, application logic, and report generation features, including automated PDF outputs. The project provided practical experience in handling unstructured data, implementing evaluation pipelines, and developing maintainable backend services with Entity Framework.",
    image: "./ExamGenerator.png",
    githubUrl: "https://github.com/varelafacu/NLPExamGenerator.git",
  },
];

const ProjectCard = ({ project, index, total, onSelect }: any) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"] 
  });

  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.95]);

  return (
    <div 
      ref={cardRef} 
      // h-[85vh] mantiene el espacio de scroll que pediste
      className="h-[85vh] md:h-[100vh] w-full flex items-start justify-center sticky"
    style={{ 
    top: typeof window !== 'undefined' && window.innerWidth < 768 
      ? `${80 + (index * 25)}px`  // Mobile: un poco más arriba que antes, pero con aire
      : `${110 + (index * 40)}px`, // Desktop: 110px del borde, separación de 40px entre ellas
    marginBottom: isLast ? "0" : "80px"
  }}
    >
      <motion.div
        layoutId={`card-${project.id}`}
        style={{ scale }}
        onClick={() => onSelect(project)}
        // w-full asegura el ancho máximo dentro del px-2 del padre
        className="relative w-full rounded-[2.5rem] overflow-hidden bg-[#111111]  shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.9)] group cursor-pointer"
      >
        {/* Imagen */}
        <div className="relative aspect-[16/9] md:aspect-[16/7] w-full overflow-hidden bg-[#111111]">
          <motion.img
            layoutId={`image-${project.id}`}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-60 grayscale-[20%] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        </div>

        {/* Contenido: p-6 en mobile para que el texto aproveche el nuevo ancho */}
        <div className="p-6 md:p-12 bg-[#111111]">
          <div className="flex justify-between items-start md:items-end gap-4">
            <div className="flex-1">
              <span className="text-[#FF6F00] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block mb-2 md:mb-3">
                {project.category}
              </span>
              <motion.h3 
                layoutId={`title-${project.id}`} 
                className="text-2xl md:text-4xl font-bold text-white tracking-tighter italic leading-tight"
              >
                {project.title}
              </motion.h3>
            </div>
            
            <div className="flex-shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#FF6F00] group-hover:border-[#FF6F00] group-hover:scale-110">
              <ArrowUpRight size={22} />
            </div>
          </div>
          
          <motion.p 
            layoutId={`desc-${project.id}`} 
            className="mt-4 md:mt-8 text-white/50 text-sm md:text-xl leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none"
          >
            {project.description}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const nav = document.querySelector('nav') || document.querySelector('header');
    
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      if (nav) {
        (nav as HTMLElement).style.transition = "opacity 0.3s ease";
        (nav as HTMLElement).style.opacity = "0";
        (nav as HTMLElement).style.pointerEvents = "none";
      }
    } else {
      document.body.style.overflow = "unset";
      if (nav) {
        (nav as HTMLElement).style.opacity = "1";
        (nav as HTMLElement).style.pointerEvents = "auto";
      }
    }

    return () => {
      document.body.style.overflow = "unset";
      if (nav) {
        (nav as HTMLElement).style.opacity = "1";
        (nav as HTMLElement).style.pointerEvents = "auto";
      }
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="relative mb-20">
      <div className="container mx-auto px-6 max-w-5xl">
       <AnimatedSection>
  <div className="pt-12 mb-10 text-white">
    <h2 className="text-base uppercase tracking-[0.4em] text-[#FF6F00] font-bold mb-8">
      Selected Works
    </h2>

    <p className="text-4xl md:text-6xl font-medium leading-[1.1] tracking-tight">
      Quality over quantity. <br />
      <span className="text-white/40">
        A selection of technical challenges.
      </span>
    </p>
  </div>
</AnimatedSection>


        <div className="relative pb-0">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />

            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="relative w-full max-w-5xl max-h-[85vh] bg-[#111111] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl z-[1001]"
            >
             <button 
  onClick={() => setSelectedProject(null)}
  className="absolute top-6 right-6 md:top-8 md:right-8 z-[1010] w-12 h-12 bg-black/40 backdrop-blur-xl hover:bg-[#FF6F00] rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 group/close active:scale-90"
>
  <X 
    size={24} 
    className="text-white group-hover/close:scale-110 transition-transform" 
    strokeWidth={2.5} 
  />
</button>

              <div className="overflow-y-auto h-full max-h-[85vh] scrollbar-hide">
                <style>{`
                  .scrollbar-hide::-webkit-scrollbar { display: none; }
                  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
                
                <motion.img
                  layoutId={`image-${selectedProject.id}`}
                  src={selectedProject.image}
                  className="w-full h-[35vh] object-cover"
                />
                
                <div className="p-8  md:p-16 pt-12">
                  <span className="text-[#FF6F00] text-sm font-bold uppercase tracking-widest">{selectedProject.category}</span>
                <motion.h2 
  layoutId={`title-${selectedProject.id}`} 
  className="text-3xl md:text-8xl font-bold italic text-white mt-4 mb-4 md:mb-8 tracking-tighter leading-tight"
>
  {selectedProject.title}
</motion.h2>
                  <motion.p 
                    layoutId={`desc-${selectedProject.id}`} 
                    className="text-xl md:text-3xl text-white/90 leading-relaxed mb-12 font-light"
                  >
                    {selectedProject.description}
                  </motion.p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/10 pt-12">
                    <div>
                      <h4 className="text-[#FF6F00] font-bold text-xs uppercase tracking-[0.3em] mb-6">Technical Challenge</h4>
                      <p className="text-white/60 text-lg leading-relaxed">{selectedProject.longDescription}</p>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-[#FF6F00] font-bold text-xs uppercase tracking-[0.3em] mb-6">Core Stack</h4>
                       <div className="flex flex-wrap gap-3">
  {(selectedProject.id === 'nlp-exam-gen' 
    ? [".NET 9", "C#", "EF Core", "NLP", "SQL Server", "LINQ", "Clean Architecture"]
    : selectedProject.id === 'hardware-hub' 
    ? ["Angular", "Node.js", "REST API", "Sequelize", "MySQL", "RxJS", "Tailwind"] 
    : ["Java", "Spring mvc", "Redis", "WebSockets", "MySQL"]
  ).map(tech => (
    <span 
      key={tech} 
      className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 italic hover:border-[#FF6F00]/50 transition-colors"
    >
      {tech}
    </span>
  ))}
</div>
                      </div>
                      <a
  href={selectedProject.githubUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:bg-[#FF6F00] hover:text-white transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-4"
>
  <Github size={22} />
  <span>View on GitHub</span>
</a>

                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};