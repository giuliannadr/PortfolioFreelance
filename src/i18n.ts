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
  "badge": "Real experiences",
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
      "title": "Initial Chat",
      "description": "I listen and understand your business before anything else. No generic templates — everything starts from your vision and your goals.",
      "tags": ["Discovery"]
    },
    "step2": {
      "title": "Design & Development",
      "description": "I design and build your web with constant feedback. You follow every step through a live preview link — no surprises, no waiting in the dark.",
      "tags": ["Live preview"]
    },
    "step3": {
      "title": "Launch & Support",
      "description": "We go live and I stay available. I hand off the keys so you can manage your content independently — and I respond within 24 hours whenever you need me.",
      "tags": ["Always available"]
    }
  }
},
    projects: {
      subtitle: "Selected Works",
      title: "The value of detail.",
      titleFaded: "Projects designed and developed to measure.",
     
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
        nido: {
        "title": "Nido",
        "category": "Final Degree Project",
        "description": "A home management platform with AI-powered recipes, shared finances and OCR receipt scanning — built as a final degree project.",
        "longDescription": "Nido centralizes a shared household's pantry, recipes, chores and finances in one place. I worked on the backend and the go-to-market communication strategy as part of an 8-person team, shipping the MVP in about 2 months. It features AI recipe recommendations, an in-recipe cooking assistant chat, automatic receipt scanning via OCR, price comparison across supermarkets, and a Telegram bot for notifications."
      },
      hidrorescate: {
        "title": "Hidrorescate",
        "category": "Design & Development",
        "description": "A technical service site for water pump installation and repair that turns visitors into WhatsApp leads.",
        "longDescription": "Hidrorescate needed a professional presence to match the multi-brand technical service they offer across Buenos Aires and AMBA. I designed a dark, trust-focused site built around clear proof points — written warranty, real photos, licensed technicians — with a WhatsApp-first flow and a Pre-Diagnóstico form that qualifies leads before the first call."
      },
      magicalduo: {
        "title": "The Magical Duo",
        "category": "Design & Development",
        "description": "A travel agency site for Disney, Universal and Caribbean vacations built around pre-designed, bookable packages.",
        "longDescription": "The Magical Duo needed a site that felt as magical as the trips they sell, while making it easy for clients to browse and request pre-designed Disney, Universal, cruise and Caribbean packages. I designed a warm, editorial site organized by destination and package type, built to turn browsing into a direct quote request."
      },
      pulseguard: {
        "title": "PulseGuard",
        "category": "Technical Challenge",
        "description": "A full-stack uptime monitoring platform with AI-powered security audits for GitHub repos, built for a technical challenge.",
        "longDescription": "PulseGuard is a SaaS platform for real-time uptime and performance monitoring, paired with an AI-powered static security scanner for GitHub repositories using Google Gemini. It includes an interactive dashboard with a 12-week status history, AI-driven commit audits that flag risks like SQL injection and exposed credentials, and configurable email and Discord/Slack webhook alerts. Built as a technical challenge for a job application, not a client project."
      },
        unik: {
        "title": "Unik",
        "category": "Design & Development",
        "description": "From a Canva PDF portfolio to a professional website that converts clients.",
        "longDescription": "The team sent their work via a Canva link that looked unprofessional and felt slow. I designed a fast and interactive website that elevates their agency's perceived value and helps them close higher-paying client projects."
      },
      muda: {
        "title": "MUDA",
        "category": "Design & Development",
        "description": "Full digital presence for a creative fashion studio in Buenos Aires — public site + custom admin panel.",
        "longDescription": "Complete end-to-end digital solution for MUDA, a creative production studio in Buenos Aires. Multi-section SPA with editorial aesthetics covering productions, art direction, social content, talent agency, events and studio rental. Includes an interactive talent database where models, photographers and makeup artists apply to join the agency. The custom admin panel manages talents, productions and applications in real time. Full technical SEO: local business structured data, sitemap, Open Graph and Google Search Console."
      },
      emme: {
        "title": "EMME Digital",
        "category": "Design & Development",
        "description": "A bold digital identity for a creative agency built to stand out from the crowd.",
        "longDescription": "EMME needed a web presence that matched the ambition behind the brand — sharp, modern, and impossible to ignore. I designed and developed a custom site that communicates their value instantly, with a visual language that commands attention and drives action from the first scroll."
      },
      miri: {
        "title": "La Quinta Miri",
        "category": "Design & Development",
        "description": "A website that handles booking inquiries automatically without social media fatigue.",
        "longDescription": "Miriam had no digital footprint and wanted to attract clients without the pressure of managing social media accounts. Along with positioning her spot on Google Maps, I built this warm landing page to highlight the venue and handle booking inquiries directly."
      },
      invXv: {
        "title": "Mis XV · Valentina",
        "category": "Digital Invitation",
        "description": "Dark, dramatic editorial invitation with real-time countdown and a full event program for a quinceañera in Buenos Aires.",
        "longDescription": "Valentina's quinceañera invitation was designed to be as unforgettable as the night itself. A full-screen black-and-white hero photo with a fuchsia color splash, animated real-time countdown (days, hours, minutes, seconds), a detailed event timeline with timed entries — Recepción, Cena, Show Sorpresa, La Tanda — and one-tap access to the venue on Google Maps. Every detail crafted to build anticipation from the first click."
      },
      invBoda: {
        "title": "Wedding Invitation",
        "category": "Digital Invitation",
        "description": "Elegant digital wedding invitation: countdown, photo gallery and RSVP — all in one link.",
        "longDescription": "A digital wedding invitation designed to replace the traditional paper card. Real-time countdown to the big day, photo gallery, venue details with direct Google Maps access, and an RSVP section so the couple knows who's attending. Designed to be shared in a single link — elegant, fully personalized and always up to date."
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
  description: "I design the ideal structure for your goal: from a high-impact Landing Page for quick conversions, to a multi-section site for a complete brand narrative.",
  details: [
    "Landing Page or Multi-section",
    "Exclusive UI/UX design",
    "SEO & Performance optimization",
    "100% Mobile responsive"
  ]
},
    store: {
      title: "E-commerce",
      subtitle: "24/7 Sales",
      description: "I turn your catalog into an easy-to-use online sales machine that works for you around the clock.",
      details: ["Payment gateways", "Stock management", "Easy admin panel", "Monthly sales reports"]
    },
    systems: {
      title: "Custom Systems",
      subtitle: "Intelligent Management",
      description: "I automate your business processes with personalized tools built exactly for how you work.",
      details: ["Relational databases", "Report automation", "Internal control panels", "Advanced data security"]
    },
    maintenance: {
      title: "Maintenance & Optimization",
      subtitle: "Technical Support",
      description: "I keep your web safe, fast, and running correctly — so you can focus on what you do best.",
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
  "badge": "Experiencias reales",
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
      "title": "Charla inicial",
      "description": "Escucho y entiendo tu negocio antes de arrancar. Sin plantillas genéricas — todo parte de tu visión y tus objetivos reales.",
      "tags": ["Descubrimiento"]
    },
    "step2": {
      "title": "Diseño & Desarrollo",
      "description": "Diseño y construyo tu web con feedback constante. Seguís cada paso a través de un link en vivo — sin sorpresas ni esperas a ciegas.",
      "tags": ["Preview en vivo"]
    },
    "step3": {
      "title": "Lanzamiento & Soporte",
      "description": "Salimos al aire y quedo disponible. Te entrego las riendas para que puedas manejar tu contenido con autonomía — y respondo en menos de 24 hs cuando me necesitás.",
      "tags": ["Siempre disponible"]
    }
  }
},
    projects: {
      subtitle: "Trabajos Seleccionados",
     title: "El valor del detalle.",
     titleFaded: "Proyectos pensados y desarrollados a medida.",
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
       nido: {
        "title": "Nido",
        "category": "Proyecto Final de Carrera",
        "description": "Plataforma de gestión del hogar con recetas asistidas por IA, finanzas compartidas y escaneo OCR de tickets — desarrollada como proyecto final de carrera.",
        "longDescription": "Nido centraliza la alacena, las recetas, las tareas y las finanzas de un hogar compartido en un solo lugar. Trabajé en el backend y en la estrategia de comunicación del lanzamiento como parte de un equipo de 8 personas, entregando el MVP en aproximadamente 2 meses. Incluye recomendación de recetas con IA, un chat asistente de cocina dentro de cada receta, escaneo automático de tickets por OCR, comparación de precios entre supermercados y un bot de Telegram para notificaciones."
      },
       hidrorescate: {
        "title": "Hidrorescate",
        "category": "Diseño & Desarrollo",
        "description": "Un sitio de servicio técnico de bombas de agua que convierte visitas en consultas por WhatsApp.",
        "longDescription": "Hidrorescate necesitaba una presencia profesional acorde al servicio técnico multimarca que ofrecen en Buenos Aires y AMBA. Diseñé un sitio oscuro enfocado en generar confianza — garantía por escrito, fotos reales, técnicos matriculados — con un flujo WhatsApp-first y un formulario de Pre-Diagnóstico que califica los leads antes de la primera llamada."
      },
      magicalduo: {
        "title": "The Magical Duo",
        "category": "Diseño & Desarrollo",
        "description": "Sitio para una agencia de viajes especializada en Disney, Universal y Caribe, organizado en paquetes prediseñados y listos para reservar.",
        "longDescription": "The Magical Duo necesitaba un sitio tan mágico como los viajes que venden, que además facilitara a sus clientes explorar y cotizar paquetes prediseñados de Disney, Universal, cruceros y Caribe. Diseñé un sitio cálido y editorial organizado por destino y tipo de paquete, pensado para convertir la navegación en una cotización directa."
      },
      pulseguard: {
        "title": "PulseGuard",
        "category": "Challenge Técnico",
        "description": "Plataforma full-stack de monitoreo de uptime con auditoría de seguridad por IA sobre repos de GitHub, desarrollada para un desafío técnico.",
        "longDescription": "PulseGuard es una plataforma SaaS para monitorear uptime y rendimiento en tiempo real, junto con un motor de auditoría de seguridad estático para repositorios de GitHub potenciado por Google Gemini. Incluye un dashboard interactivo con historial de 12 semanas, auditoría de commits por IA que detecta riesgos como inyecciones SQL y credenciales expuestas, y alertas configurables por email y webhooks a Discord/Slack. Desarrollado como challenge técnico para un proceso de selección laboral, no para un cliente."
      },
       unik: {
        "title": "Unik",
        "category": "Diseño & Desarrollo",
        "description": "De un PDF de Canva incómodo, a una web interactiva que genera confianza al instante.",
        "longDescription": "Las chicas presentaban su trabajo mediante un enlace de Canva que se veía poco profesional y lento. Diseñé una web rápida e interactiva que eleva el valor percibido de sus servicios y las ayuda a cerrar proyectos con clientes de mayor presupuesto."
      },
      muda: {
        "title": "MUDA",
        "category": "Diseño & Desarrollo",
        "description": "Presencia digital completa para una productora creativa de moda en Buenos Aires — sitio público + panel admin.",
        "longDescription": "Diseñé y desarrollé de cero la presencia digital completa de MUDA, productora creativa de Buenos Aires. SPA multisección con identidad editorial que cubre producciones, dirección artística, contenido para redes, agencia de talentos, eventos y alquiler de estudio. Incluye una base de talentos interactiva donde modelos, fotógrafxs y maquilladorxs postulan para entrar a la agencia. El panel admin gestiona talentos, producciones y postulaciones en tiempo real. SEO técnico integral: datos estructurados, sitemap, Open Graph y verificación en Google Search Console."
      },
      emme: {
        "title": "EMME Digital",
        "category": "Diseño & Desarrollo",
        "description": "Una identidad digital potente para una agencia creativa hecha para destacar.",
        "longDescription": "EMME necesitaba una presencia web que estuviera a la altura de la ambición de la marca: afilada, moderna e imposible de ignorar. Diseñé y desarrollé un sitio a medida que comunica su valor desde el primer segundo, con un lenguaje visual que genera impacto y convierte desde el primer scroll."
      },
      miri: {
        "title": "La Quinta Miri",
        "category": "Diseño & Desarrollo",
        "description": "Una web que responde consultas y recibe reservas en piloto automático, sin depender de Instagram.",
        "longDescription": "Miriam no tenía presencia digital y buscaba atraer clientes sin la presión constante de crear contenido para redes sociales. Además de posicionar su quinta en Google Maps, creé esta landing page cálida y llamativa para capturar la esencia del lugar y canalizar consultas directo a su WhatsApp."
      },
      invXv: {
        "title": "Mis XV · Valentina",
        "category": "Invitación Digital",
        "description": "Invitación editorial oscura y dramática con cuenta regresiva en tiempo real y programa completo para una quinceañera en Buenos Aires.",
        "longDescription": "La invitación de los XV de Valentina fue diseñada para estar a la altura de la noche. Foto hero en blanco y negro con splash de fucsia, cuenta regresiva animada en tiempo real (días, horas, minutos, segundos), programa de eventos detallado con horarios — Recepción, Cena, Show Sorpresa y La Tanda — y acceso al salón directo desde Google Maps. Cada detalle pensado para generar anticipación desde el primer click."
      },
      invBoda: {
        "title": "Invitación de Boda",
        "category": "Invitación Digital",
        "description": "Invitación digital elegante que reemplaza la tarjeta física: cuenta regresiva, galería y confirmación de asistencia en un solo link.",
        "longDescription": "Una invitación de boda digital que reemplaza la tarjeta física tradicional. Cuenta regresiva en tiempo real hasta el gran día, galería de fotos, información del venue con acceso directo en Google Maps, y confirmación de asistencia para que los novios sepan quiénes van. Diseñada para compartir en un solo link — elegante, completamente personalizada y siempre al día."
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
  description: "Creo la estructura ideal según tu objetivo: desde una Landing Page de alto impacto para conversiones rápidas, hasta sitios Multi-sección para una narrativa de marca completa.",
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
      description: "Convierto tu catálogo en una máquina de ventas online fácil de usar que trabaja por vos las 24 horas.",
      details: ["Pasarelas de pago", "Gestión de stock e inventario", "Panel de administración fácil", "Reportes de ventas mensuales"]
    },
    systems: {
      title: "Sistemas a Medida",
      subtitle: "Gestión Inteligente",
      description: "Automatizo los procesos de tu empresa con herramientas personalizadas, construidas exactamente para como vos trabajás.",
      details: ["Bases de datos relacionales", "Automatización de reportes", "Paneles de control internos", "Seguridad de datos avanzada"]
    },
    maintenance: {
      title: "Mantenimiento & Optimización",
      subtitle: "Soporte Técnico",
      description: "Me encargo de que tu web esté siempre segura, rápida y funcionando correctamente — para que vos puedas enfocarte en lo tuyo.",
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