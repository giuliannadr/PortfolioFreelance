import { ArrowUpRight, X, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTranslation } from "react-i18next";

type ProjectCategory = "professional" | "academic";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image?: string;
  video?: string;
  githubUrl?: string;
  liveUrl?: string;
  stack: string[];
  type: ProjectCategory;
  process?: string[]; 
}

const ProjectCard = ({ project, onSelect }: { project: Project; onSelect: (id: string) => void }) => {
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => onSelect(project.id)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group cursor-pointer w-full"
    >
      <div className="relative aspect-[16/10] w-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-zinc-900 border border-white/5 mb-8">
        {project.video ? (
          <video 
            src={project.video} muted loop playsInline autoPlay 
            className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-in-out" 
          />
        ) : (
          <img 
            src={project.image} alt="" 
            className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-in-out" 
          />
        )}
        <div className="absolute top-8 right-8 w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ArrowUpRight size={24} />
        </div>
      </div>

      <div className="space-y-4 px-2">
        <div className="flex items-center gap-4">
          <span className="text-[#FF6F00] text-[10px] font-bold uppercase tracking-[0.3em]">{project.category}</span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>
        <h3 className="text-xl md:text-3xl font-bold text-white tracking-tighter italic font-serif leading-none">
          {project.title}
        </h3>
        <p className="text-white/40 text-sm font-light leading-relaxed max-w-xl line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ProjectCategory>("professional");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showProcess, setShowProcess] = useState(false);
  
  // Estado para el carrusel a pantalla completa (Lightbox)
  const [fullscreenImageIdx, setFullscreenImageIdx] = useState<number | null>(null);

  const projectBaseData = [
    { 
      id: "unik", 
      video: "./Unik-web.mp4", 
      liveUrl: "https://unik-kappa.vercel.app/", 
      githubUrl: "https://github.com/giuliannadr/Unik.git", 
      type: "professional", 
      stack: ["Next.js 15", "TypeScript", "Framer Motion"],
      process: ["./antes1.png", "./antes2.png", "./antes3.png", "./despues1.png", "./despues2.png", "./despues3.png"]
    },
    { 
      id: "la-quinta-miri", 
      video: "./LaQuintaMiri.mp4", 
      liveUrl: "https://laquintamiri.vercel.app/", 
      githubUrl: "https://github.com/giuliannadr/LaQuintaMiri.git", 
      type: "professional", 
      stack: ["React.js", "TypeScript", "EmailJS"]
    },
    { id: "trivia", image: "./triviaproject.png", type: "academic", stack: ["Java", "Spring MVC", "WebSockets"] },
    { id: "hardware", image: "./tiendaonline.png", type: "academic", stack: ["Angular", "Node.js", "MySQL"] },
    { id: "nlp", image: "./ExamGenerator.png", githubUrl: "https://github.com/varelafacu/NLPExamGenerator.git", type: "academic", stack: [".NET 9", "C#", "NLP"] }
  ];

  const projects: Project[] = projectBaseData.map(p => {
    const translationKey = p.id === 'la-quinta-miri' ? 'miri' : p.id;
    return {
      ...p,
      title: t(`projects.items.${translationKey}.title`),
      category: t(`projects.items.${translationKey}.category`),
      description: t(`projects.items.${translationKey}.description`),
      longDescription: t(`projects.items.${translationKey}.longDescription`),
      stack: p.stack as string[],
      type: p.type as ProjectCategory,
    } as Project;
  });

  const filtered = projects.filter((p) => p.type === activeTab);
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  // Funciones de navegación del Lightbox
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject?.process && fullscreenImageIdx !== null) {
      setFullscreenImageIdx((fullscreenImageIdx + 1) % selectedProject.process.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject?.process && fullscreenImageIdx !== null) {
      setFullscreenImageIdx((fullscreenImageIdx - 1 + selectedProject.process.length) % selectedProject.process.length);
    }
  };
// Busca este useEffect en tu componente Projects y déjalo así:
useEffect(() => {
  if (selectedProjectId || fullscreenImageIdx !== null) {
    document.body.style.overflow = 'hidden';
    // ESTO ES LO NUEVO:
    if (fullscreenImageIdx !== null) {
      document.body.classList.add("lightbox-open");
    }
  } else {
    document.body.style.overflow = 'unset';
    // ESTO ES LO NUEVO:
    document.body.classList.remove("lightbox-open");
  }
}, [selectedProjectId, fullscreenImageIdx]);

  useEffect(() => {
    if (!selectedProjectId) {
      setShowProcess(false);
      setFullscreenImageIdx(null);
    }
  }, [selectedProjectId]);

  useEffect(() => {
    const nav = document.querySelector('nav') as HTMLElement | null;
    if (selectedProjectId || fullscreenImageIdx !== null) {
      document.body.style.overflow = 'hidden';
      if (nav) nav.style.opacity = '0';
    } else {
      document.body.style.overflow = 'unset';
      if (nav) nav.style.opacity = '1';
    }
  }, [selectedProjectId, fullscreenImageIdx]);

  return (
    <section id="projects" className="py-32 bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* CABECERA */}
        <div className="mb-24 space-y-12">
          <AnimatedSection>
            <div className="space-y-4"> {/* Reduje el espacio entre el span y el h2 */}
      
      <span className="text-[#FF6F00] text-[9px] font-bold uppercase tracking-[0.4em] block">
        {t('projects.subtitle')}
      </span>

      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-[0.9] mb-4 uppercase">
        {t('projects.title')} <br />
        <span className="text-white/20 italic font-serif font-light">
          {t('projects.titleFaded')}
        </span>
      </h2>
      
    </div>
          </AnimatedSection>

          {/* TABS */}
          <div className="flex gap-12 border-b border-white/5">
            {(["professional", "academic"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-8 text-[11px] font-bold uppercase tracking-[0.3em] transition-all relative ${
                  activeTab === tab ? "text-white" : "text-white/20 hover:text-white/40"
                }`}
              >
                {t(`projects.tabs.${tab}`)}
                {activeTab === tab && (
                  <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6F00]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLA DE PROYECTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={setSelectedProjectId} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* MODAL DETALLE DE PROYECTO */}
      <AnimatePresence>
        {selectedProjectId && selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProjectId(null)}
              className="absolute inset-0 bg-zinc-950/98 backdrop-blur-xl"
            />
            
            <motion.div 
              layoutId={`card-${selectedProject.id}`}
              className="relative w-full max-w-7xl bg-[#080808] rounded-[3rem] md:rounded-[4.5rem] overflow-hidden border border-white/10 z-[1001] max-h-[85vh] overflow-y-auto scrollbar-hide"
            >
              {/* ACCIONES SUPERIORES */}
              <div className="absolute top-10 right-10 z-[1010] flex items-center gap-4">
                <AnimatePresence>
                  {showProcess && (
                    <motion.button 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                      onClick={() => setShowProcess(false)}
                      className="px-6 py-3 border border-white/10 bg-white/5 text-white/70 rounded-full font-bold text-[10px] uppercase tracking-widest hover:border-[#FF6F00] hover:text-white transition-all backdrop-blur-md"
                    >
                      {t('projects.labels.viewWork')}
                    </motion.button>
                  )}
                </AnimatePresence>
                
                <button 
                  onClick={() => setSelectedProjectId(null)} 
                  className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5 text-white/40 rounded-full hover:border-[#FF6F00] hover:text-white transition-all backdrop-blur-md"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row h-full min-h-[650px]">
                {/* SECCIÓN MEDIA O PROCESO */}
                <motion.div 
                  animate={{ width: showProcess ? "100%" : "50%" }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className={`relative min-h-[500px] bg-[#0c0c0c] overflow-hidden ${showProcess ? 'w-full' : 'w-1/2 hidden lg:block'}`}
                >
                  <AnimatePresence mode="wait">
                    {!showProcess ? (
                      <motion.div 
                        key="main-media" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="w-full h-full"
                      >
                        {selectedProject.video ? (
                          <video src={selectedProject.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                        ) : (
                          <img src={selectedProject.image} className="w-full h-full object-cover" alt="" />
                        )}
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="process-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="w-full h-full p-12 md:p-32 bg-zinc-950"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                          {selectedProject.process?.map((img, index) => (
                            <motion.div 
                              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              key={index} 
                              onClick={() => setFullscreenImageIdx(index)}
                              className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl cursor-zoom-in"
                            >
                              <img src={img} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt="" />
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                              
                              <div className="absolute top-4 left-4 z-[1002]">
                                {index < 3 ? (
                                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/50 text-[9px] uppercase tracking-widest rounded-full font-bold backdrop-blur-sm">
                                    Antes
                                  </span>
                                ) : (
                                  <span className="px-3 py-1 bg-[#FF6F00] text-white text-[9px] uppercase tracking-widest rounded-full font-bold">
                                    Después
                                  </span>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* SECCIÓN INFO */}
                {!showProcess && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
                    className="lg:w-1/2 p-10 md:p-20 flex flex-col justify-center bg-[#080808]"
                  >
                    <div className="mb-12 max-w-xl">
                      <div className="flex items-center gap-4 mb-8">
                        <span className="text-[#FF6F00] font-bold uppercase tracking-[0.4em] text-[10px]">
                          {t('projects.labels.challenge')}
                        </span>
                        {selectedProject.process && (
                          <button 
                            onClick={() => setShowProcess(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border border-[#FF6F00]/30 text-[#FF6F00] hover:bg-[#FF6F00] hover:text-white"
                          >
                            <Eye size={14} /> {t('projects.labels.viewProcess')}
                          </button>
                        )}
                      </div>
                      <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter italic font-serif leading-[0.85]">
                        {selectedProject.title}
                      </h2>
                    </div>

                    <p className="text-white/50 text-xl font-light leading-relaxed mb-16 max-w-md">
                      {selectedProject.longDescription}
                    </p>

                    <div className="space-y-12">
                      <div className="space-y-6">
                        <h4 className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">Stack</h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.stack.map(tech => (
                            <span key={tech} className="px-6 py-2.5 bg-white/5 rounded-full text-[10px] text-white/40 font-bold uppercase border border-white/5 flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-[#FF6F00]" /> {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-5 pt-4">
                        {selectedProject.liveUrl && (
                          <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-6 bg-white text-black rounded-2xl font-bold text-[11px] uppercase tracking-widest text-center hover:bg-[#FF6F00] hover:text-white transition-all">
                            {t('projects.labels.live')}
                          </a>
                        )}
                        {selectedProject.githubUrl && (
                          <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex-1 py-6 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-[11px] uppercase tracking-widest text-center hover:bg-white/10 transition-all">
                            {t('projects.labels.github')}
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX / CARRUSEL FULLSCREEN */}
      <AnimatePresence>
        {fullscreenImageIdx !== null && selectedProject?.process && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-20"
            onClick={() => setFullscreenImageIdx(null)}
          >
            {/* Cerrar Lightbox */}
            <button className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5 text-white rounded-full hover:bg-white/10 transition-all">
              <X size={24} />
            </button>

            {/* Navegación */}
            <button onClick={prevImage} className="absolute left-6 md:left-10 w-14 h-14 flex items-center justify-center rounded-full border border-white/5 hover:bg-white/10 text-white transition-all z-[2001]">
              <ChevronLeft size={32} />
            </button>
            <button onClick={nextImage} className="absolute right-6 md:right-10 w-14 h-14 flex items-center justify-center rounded-full border border-white/5 hover:bg-white/10 text-white transition-all z-[2001]">
              <ChevronRight size={32} />
            </button>

            {/* Imagen Principal del Lightbox */}
            <motion.div 
              key={fullscreenImageIdx}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-[4/3] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedProject.process[fullscreenImageIdx]} 
                className="w-full h-full object-contain"
                alt="Process view"
              />
              <div className="absolute bottom-10 left-10">
                <span className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] rounded-full font-bold border ${fullscreenImageIdx < 3 ? 'bg-white/5 border-white/10 text-white/50' : 'bg-[#FF6F00] border-[#FF6F00] text-white'}`}>
                  {fullscreenImageIdx < 3 ? "Diseño Previo" : "Resultado Final"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};