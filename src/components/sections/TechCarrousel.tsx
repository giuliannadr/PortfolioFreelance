

const technologies = [
  // Frontend
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
{
  name: "Tailwind",
  logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
},
 { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },

  // Backend
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },

  // Databases
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "SQL Server", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },

  // ORMs
  { name: "Sequelize", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" },
  { name: "Hibernate", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg" },

  // APIs / Realtime
  { name: "REST API", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "WebSockets", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    white: true
   },



  // Tools
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
   { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    white:true
    },


 { name: "Maven", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg" },
  { name: "NPM", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
];


export const TechCarrousel = () => {
  const repeatedTechs = [...technologies, ...technologies, ...technologies]; // 3x para loop suave

  return (
    <div className="relative w-full flex justify-center py-4 overflow-hidden">
      {/* Contenedor principal con “masking” en los extremos */}
      <div
        className="relative overflow-hidden py-6"
        style={{
          width: "750px",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
        }}
      >
       <div className="flex animate-marquee whitespace-nowrap gap-[30px] hover:[animation-play-state:paused]">

          {repeatedTechs.map((tech, idx) => (
            <div
  key={idx}
 className="group flex flex-col items-center justify-center min-w-[60px] cursor-pointer"

>

           <img
  src={tech.logo}
  alt={tech.name}
  className={`w-[35px] h-auto transition-all duration-300 ease-out transform-gpu
    group-hover:scale-125
    ${
      tech.white
        ? "filter brightness-0 invert group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
        : "group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
    }
  `}
/>


             <span className="mt-1 text-white/70 font-semibold text-sm transition-all duration-300 group-hover:text-white group-hover:scale-105">
  {tech.name}
</span>

            </div>
          ))}
        </div>
      </div>

      {/* Animación */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 55s linear infinite;
        }
      `}</style>
    </div>
  );
};