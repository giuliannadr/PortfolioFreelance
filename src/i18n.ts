import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = {
  translation: {
  hero: {
  badge: "Available for new ideas",
  title1: "CRAFTING YOUR",
  title2: "DIGITAL ESSENCE.",
  description: "I design and develop custom web experiences where aesthetics and technology meet. My approach is simple: walking alongside you to create a site that truly reflects the heart of your project.",
  viewWork: "View my work",
  contact: "Let's talk"
},
  profileCard: {
  role: "Hi! I'm Giuli, and I'm ready to work together to transform your business."
},
  about:  {
    "badge": "About my approach",
    "title": "Design with purpose,",
    "titleItalic": "code with precision.",
    "p1": "Hi! I'm <0>Giuliana</0>. I'm very close to graduating as a Web Developer, a journey where I discovered that my true passion is <1>bridging worlds</1>.",
    "p2": "I believe that behind every click there's a person looking for a solution or an emotion. That's why I use my technical foundation to give you security and my visual sensitivity so that your clients don't just visit your site, but <1>feel at home</1> while discovering what you have to offer.",
    "stats": {
      "exp": "2+",
      "expLabel": "Years Exp.",
      "dedication": "100%",
      "dedicationLabel": "Dedication"
    }
  
},
trust: {
  "badge": "Made with dedication",
  "title": "Your idea,",
  "titleFaded": "in good hands.",
  "description": "I get involved in every detail to ensure your web is exactly what you need.",
  "metrics": {
    "speed": { "label": "Fast Load", "value": "Excellent", "tooltip": "Your page opens instantly. This prevents customers from getting tired of waiting." },
    "direct": { "label": "Direct Attention", "value": "1 to 1", "tooltip": "You always talk to me. No agencies, so your ideas are understood the first time." },
    "modern": { "label": "Modern Web", "value": "Guaranteed", "tooltip": "I use technology that doesn't go obsolete. Your site will be secure today and for many years." }
  },
  "testimonials": {
    "miri": { "role": "La Quinta Miri — Owner", "text": "Giuliana immediately understood the warmth I wanted to convey. Since we launched the web, inquiries have become more professional and the booking process is much smoother." },
    "camila": { "role": "Unik — Creative Director", "text": "Moving from a Canva PDF to a professional website totally changed how clients see us. Giuliana achieved a digital identity with animations that really breaks the mold." },
    "iara": { "role": "Unik — Business Strategy", "text": "We wanted access to our work and WhatsApp contact to be direct and professional. Giuliana gave us a flawless solution that simplified the arrival of new clients." }
  }
},
process: {
  "badge": "How I work",
  "title": "Let's make it",
  "titleItalic": "happen together.",
  "quote": "\"My process is designed so you enjoy the journey as much as the final result.\"",
  "steps": {
    "step1": {
      "title": "Chat & Strategy",
      "description": "We take a moment to understand your business. I don't design just for the sake of it; I design so your project grows and you feel at ease.",
      "tags": ["Active listening", "Your vision", "Action plan"]
    },
    "step2": {
      "title": "Team Sketching",
      "description": "I present the visual idea and we polish it together. I want you to feel that the web has your essence in every corner before coding.",
      "tags": ["Real feedback", "Back and forth", "Your brand"]
    },
    "step3": {
      "title": "Magic & Development",
      "description": "I bring the design to code with animations that guide your customers. You'll have a link to see your web come to life step by step.",
      "tags": ["Transparency", "Zero surprises", "Quality"]
    },
    "step4": {
      "title": "Flight & Company",
      "description": "We launch your web, but I won't let go of your hand. I'll teach you how to manage everything so you're free to update content whenever you want.",
      "tags": ["Autonomy", "Support", "Shared success"]
    }
  }
},
    projects: {
      subtitle: "Selected Works",
      title: "Quality over quantity.",
      titleFaded: "A selection of technical challenges.",
     
      tabs: {
        professional: "Professional",
        academic: "Academic"
      },
      labels: {
        challenge: "Technical Challenge",
        stack: "Core Stack",
        github: "View on GitHub",
        live: "Live Site",
        viewProcess: "View Process",
      viewWork: "View Final Web"
       
      },
      items: {
        unik: {
        "title": "Unik",
        "category": "Design & Development",
        "description": "From a static Canva presentation to a high-performance web platform.",
        "longDescription": "The team had a portfolio designed in Canva that didn't achieve the fluidity or technical professionalism their work deserved. Staying true to the essence of the original design, I created this high-performance landing page, bringing their identity into a robust, sophisticated, and fully functional web environment."
      },
      miri: {
        "title": "La Quinta Miri",
        "category": "Design & Development",
        "description": "Warm digital presence for a vacation spot, without the social media pressure.",
        "longDescription": "Miriam had no social media presence and wanted to highlight her space without the extreme exposure of constantly managing notifications. Besides positioning her place on Google Maps, I created this landing page to be as warm and eye-catching as possible, capturing the essence of the spot and facilitating direct contact."
      },
        trivia: {
          title: "Distributed Trivia Engine",
          category: "Java / Spring MVC / WebSockets / MySQL",
          description: "Collaborative multiplayer trivia platform with real-time game modes and synchronized player sessions.",
          longDescription: "Team-based project focused on building a real-time multiplayer trivia system using Spring MVC. I was responsible for designing game modes, WebSocket-based synchronization, and match progression logic."
        },
        hardware: {
          title: "Enterprise Inventory Hub",
          category: "Angular / Node.js / REST API / Sequelize / MySQL",
          description: "Team-developed inventory and e-commerce platform with role-based access control and administrative tools.",
          longDescription: "Collaborative project focused on developing a full-stack inventory management system. I contributed to backend APIs, database integration, and frontend components for administrative workflows."
        },
        nlp: {
          title: "AI Semantic Engine",
          category: ".NET 9 / C# / NLP / Entity Framework / SQL Server",
          description: "Collaborative assessment platform that generates and evaluates exams using NLP techniques.",
          longDescription: "Team project aimed at building an automated exam generation system using .NET and NLP. I worked on data processing, application logic, and report generation features."
        }
      }
    },
    services: {
  badge: "Proposition",
  title: "Strategic",
  titleItalic: "Services",
  cta: {
    badge: "Have a project in mind?",
    title: "Request a quote",
    faded: "— now"
  },
  items: {
web: {
  title: "Web Design & Development",
  subtitle: "Your professional presence",
  description: "Diseñamos la estructura ideal según tu objetivo: desde una Landing Page de alto impacto para conversiones rápidas, hasta sitios Multi-sección para una narrativa de marca completa.",
  details: [
    "One-page (Landing) o Multi-sección",
    "Diseño UI/UX exclusivo",
    "Optimización SEO & Performance",
    "Adaptabilidad 100% Mobile"
  ]
},
    store: {
      title: "E-commerce",
      subtitle: "24/7 Sales",
      description: "We turn your catalog into an easy-to-use online sales machine.",
      details: ["Payment gateways", "Stock management", "Easy admin panel", "Monthly sales reports"]
    },
    systems: {
      title: "Custom Systems",
      subtitle: "Intelligent Management",
      description: "We automate your company processes with personalized tools.",
      details: ["Relational databases", "Report automation", "Internal control panels", "Advanced data security"]
    },
    maintenance: {
      title: "Maintenance",
      subtitle: "Technical Support",
      description: "We take care of keeping your web safe, fast, and working correctly.",
      details: ["Daily backups", "Security patches", "Priority support", "Uptime monitoring"]
    }
  },
  modal: {
    includes: "What's included?",
    button: "Request a quote"
  }
},
   
   footer: {
  "status": "Available for new projects",
  "titleLine1": "Let's work",
  "titleLine2": "together.",
  "location": "Buenos Aires, Argentina",
  "backToTop": "Back to top",
  "emailSubject": "Contact from your Portfolio"
}
  }
};

const es = {
  translation: {
   hero: {
  badge: "Disponible para nuevas ideas",
  title1: "CREANDO TU",
  title2: "ESENCIA DIGITAL.", // Esta palabra cambiará lentamente a naranja
  description: "Diseño y desarrollo experiencias web a medida donde la estética y la técnica se encuentran. Mi enfoque es simple: acompañarte en el proceso para crear un sitio que refleje la esencia de tu proyecto.",
  viewWork: "Ver mis trabajos",
  contact: "Hablemos de tu idea"
},
    profileCard: {
  role: "¡Hola! Soy Giuli, y estoy lista para que trabajemos juntos en transformar tu negocio."
},
  
  about: {
    "badge": "Sobre mi enfoque",
    "title": "Diseño con propósito,",
    "titleItalic": "programo con precisión.",
    "p1": "¡Hola! Soy <0>Giuliana</0>. Estoy a muy poquito de recibirme como Desarrolladora Web, un camino donde descubrí que mi verdadera pasión es <1>unir mundos</1>.",
    "p2": "Siento que detrás de cada clic hay una persona buscando una solución o una emoción. Por eso, uso mi base técnica para darte seguridad y mi sensibilidad visual para que tus clientes no solo visiten tu web, sino que <1>se sientan como en casa</1> mientras descubren lo que tenés para ofrecer.",
    "stats": {
      "exp": "2+",
      "expLabel": "Años Exp.",
      "dedication": "100%",
      "dedicationLabel": "Dedicación"
    
  }
},
trust: {
  "badge": "Hecho con dedicación",
  "title": "Tu idea,",
  "titleFaded": "en buenas manos.",
  "description": "Me involucro en cada detalle para que tu web sea exactamente lo que necesitás.",
  "metrics": {
    "speed": { "label": "Carga Rápida", "value": "Excelente", "tooltip": "Tu página abre al instante. Esto evita que los clientes se cansen de esperar." },
    "direct": { "label": "Atención Directa", "value": "1 a 1", "tooltip": "Hablás siempre conmigo. Sin agencias, para que tus ideas se entiendan a la primera." },
    "modern": { "label": "Web Moderna", "value": "Garantizada", "tooltip": "Uso tecnología que no queda vieja. Tu sitio será seguro hoy y por muchos años." }
  },
  "testimonials": {
    "miri": { "role": "La Quinta Miri — Propietaria", "text": "Giuliana entendió enseguida la calidez que quería transmitir. Desde que lanzamos la web, las consultas se profesionalizaron y el proceso de reserva es mucho más fluido." },
    "camila": { "role": "Unik — Directora Creativa", "text": "Pasar de un PDF en Canva a una web profesional cambió totalmente cómo nos ven los clientes. Giuliana logró una identidad digital con animaciones que realmente rompe lo convencional." },
    "iara": { "role": "Unik — Business Strategy", "text": "Buscábamos que el acceso a nuestro trabajo y el contacto por WhatsApp fuera directo y profesional. Giuliana nos dio una solución impecable que simplificó la llegada de nuevos clientes." }
  }
},
process: {
  "badge": "Cómo trabajo",
  "title": "Hagámoslo",
  "titleItalic": "realidad juntos.",
  "quote": "\"Mi proceso está diseñado para que disfrutes el camino tanto como el resultado final.\"",
  "steps": {
    "step1": {
      "title": "Charla & Estrategia",
      "description": "Nos tomamos un momento para entender tu negocio. No diseño por diseñar; diseño para que tu proyecto crezca y vos estés tranquila.",
      "tags": ["Escucha activa", "Tu visión", "Plan de acción"]
    },
    "step2": {
      "title": "Boceto en Equipo",
      "description": "Te presento la idea visual y la pulimos juntos. Quiero que sientas que la web tiene tu esencia en cada rincón antes de programar.",
      "tags": ["Feedback real", "Idas y vueltas", "Tu marca"]
    },
    "step3": {
      "title": "Magia & Desarrollo",
      "description": "Llevo el diseño al código con animaciones que guían a tus clientes. Vas a tener un link para ver cómo tu web cobra vida paso a paso.",
      "tags": ["Transparencia", "Cero sorpresas", "Calidad"]
    },
    "step4": {
      "title": "Vuelo & Compañía",
      "description": "Lanzamos tu web, pero no te suelto la mano. Te enseño a manejar todo para que seas libre de actualizar tu contenido cuando quieras.",
      "tags": ["Autonomía", "Soporte", "Éxito compartido"]
    }
  }
},
    projects: {
      subtitle: "Trabajos Seleccionados",
      title: "Calidad sobre cantidad.",
      titleFaded: "Una selección de desafíos técnicos.",
      tabs: {
        professional: "Profesionales",
        academic: "Académicos"
      },
      labels: {
        challenge: "Desafío Técnico",
        stack: "Stack Principal",
        github: "Ver en GitHub",
        live: "Sitio en Vivo",
        viewProcess: "Ver Proceso",
        viewWork: "Ver Web Final"
      },
      items: {
       unik: {
        "title": "Unik",
        "category": "Diseño & Desarrollo",
        "description": "De una presentación estática en Canva a una plataforma web de alto rendimiento.",
        "longDescription": "Las chicas tenían un portfolio diseñado en Canva que no lograba la fluidez ni el profesionalismo técnico que su trabajo merecía. Siendo fiel a la esencia del diseño original, creé esta landing page de alto rendimiento, llevando su identidad a un entorno web robusto, sofisticado y totalmente funcional."
      },
      miri: {
        "title": "La Quinta Miri",
        "category": "Diseño & Desarrollo",
        "description": "Presencia digital cálida para un espacio de descanso, sin la presión de las redes sociales.",
        "longDescription": "Miriam no tenía presencia en las redes y buscaba destacar su espacio sin la exposición extrema de estar siempre pendiente de las notificaciones. Aparte de posicionar su quinta en Google Maps, creé esta landing para que sea lo más cálida y llamativa posible, capturando la esencia del lugar y facilitando el contacto directo."
      },
        trivia: {
          title: "Motor de Trivia Distribuido",
          category: "Java / Spring MVC / WebSockets / MySQL",
          description: "Plataforma de trivia multijugador colaborativa con modos de juego en tiempo real.",
          longDescription: "Proyecto grupal centrado en un sistema multijugador real-time. Implementé los modos supervivencia y competitivo usando WebSockets para la sincronización."
        },
        hardware: {
          title: "Hub de Inventario Empresarial",
          category: "Angular / Node.js / REST API / Sequelize / MySQL",
          description: "Plataforma de e-commerce e inventario con control de acceso basado en roles.",
          longDescription: "Contribuí al desarrollo de APIs, integración de base de datos y componentes administrativos para flujos de usuario y gestión de productos."
        },
        nlp: {
          title: "Motor Semántico de IA",
          category: ".NET 9 / C# / NLP / Entity Framework / SQL Server",
          description: "Plataforma que genera y evalúa exámenes automáticamente usando técnicas de NLP.",
          longDescription: "Trabajé en el procesamiento de datos y la lógica de aplicación para la generación de reportes automáticos en PDF y flujos de evaluación backend."
        }
      }
    },
    services: {
  badge: "Propuesta",
  title: "Servicios",
  titleItalic: "Estratégicos",
  cta: {
    badge: "¿Tenés un proyecto en mente?",
    title: "Solicitar presupuesto",
    faded: "— ahora"
  },
  items: {
    web: {
  title: "Diseño & Desarrollo Web",
  subtitle: "Tu presencia profesional",
  description: "Creamos la estructura ideal según tu objetivo: desde una Landing Page de alto impacto para conversiones rápidas, hasta sitios Multi-sección para una narrativa de marca completa.",
  details: [
    "Landing Page o Sitios Multi-sección",
    "Diseño UI/UX exclusivo",
    "Optimización SEO & Performance",
    "Adaptabilidad 100% Mobile"
  ]
},
    store: {
      title: "Tienda Online",
      subtitle: "Ventas 24/7",
      description: "Convertimos tu catálogo en una máquina de ventas online fácil de usar.",
      details: ["Pasarelas de pago", "Gestión de stock e inventario", "Panel de administración fácil", "Reportes de ventas mensuales"]
    },
    systems: {
      title: "Sistemas a Medida",
      subtitle: "Gestión Inteligente",
      description: "Automatizamos procesos de tu empresa con herramientas personalizadas.",
      details: ["Bases de datos relacionales", "Automatización de reportes", "Paneles de control internos", "Seguridad de datos avanzada"]
    },
    maintenance: {
      title: "Mantenimiento",
      subtitle: "Soporte Técnico",
      description: "Nos ocupamos de que tu web esté siempre segura, rápida y funcionando correctamente.",
      details: ["Backups diarios preventivos", "Parches de seguridad", "Soporte técnico prioritario", "Monitoreo de tiempo en línea"]
    }
  },
  modal: {
    includes: "¿Qué incluye?",
    button: "Solicitar presupuesto"
  }
},
   footer: {
  "status": "Disponible para nuevos proyectos",
  "titleLine1": "Trabajemos",
  "titleLine2": "juntos.",
  "location": "Buenos Aires, Argentina",
  "backToTop": "Volver arriba",
  "emailSubject": "Contacto desde tu Portfolio"
}
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      es
    },
    lng: "es", 
    fallbackLng: "es",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;