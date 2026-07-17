# Rediseño del Portfolio Freelancer (a partir del Portfolio Profesional) + cambios cruzados

## Contexto

Dos repos Vite/React independientes, sin infraestructura compartida:

- **Freelancer** (`Portfolio_GiulianaDiRocco - Freelancer`): orientado a clientes freelance. Navbar fijo blanco de ancho completo. Secciones: Hero (dark `#0A0A0A`), About/Services/Trust/CTA (ya dark `#0A0A0A`), FAQ/Process/UseCases/WhatIBuild (beige claro `#F8F7F5`), Footer (bloque rojo sólido `#CC1500`).
- **Profesional** (`Portfolio_GiulianaDiRocco - Profesional`): orientado a reclutadores/tech leads. Navbar píldora flotante oscura con blur. Secciones: Hero/Trust/Footer son dark (`#0A0A0A`); About/Experience/Tech/Whatsnext son **beige claro** (`#F5F4F0`), no dark. Este es el sitio de referencia visual — su ritmo real es beige claro + acentos oscuros en Hero/Trust/Footer, NO full-dark.

**Corrección de alcance:** el plan original asumía que el Profesional era full-dark. No lo es — es mayormente beige claro, y el Freelancer ya está sorprendentemente alineado (About/Services/Trust/CTA ya dark, FAQ/Process/UseCases/WhatIBuild ya en un beige casi idéntico `#F8F7F5`≈`#F5F4F0`). "Repintar todo de negro" alejaría al Freelancer del estilo real del Profesional en vez de acercarlo. El alcance real y acotado es:

1. Navbar: fijo blanco → píldora flotante oscura (cambio grande)
2. Footer: bloque rojo sólido → footer oscuro con gradiente mouse-reactive (cambio grande, patrón distinto)
3. Hero: sacar los acentos serif itálicos (Playfair Display) que el Profesional no usa; dejar el mismo tratamiento tipográfico plano (Poppins uppercase, sin itálicas), conservando el copy de freelance existente (no se copia el texto del Profesional)
4. Detalles menores: `body` font-family `Inter`→`Poppins`, alinear el valor exacto del beige (`#F8F7F5`→`#F5F4F0`), revisar paleta de acentos de `ProfileCard.tsx` (hoy naranja `#FF6F00`, aislado del resto de la paleta roja/violeta/cian del sitio)

## Enfoque

**Portar el estilo componente por componente** (no extraer un design system compartido como paquete — sobre-ingeniería para dos sitios de un solo dueño, desplegados por separado). Se toma cada componente del Profesional como referencia y se reescribe el JSX/Tailwind equivalente en el Freelancer, conservando el contenido y la estructura de datos que ya tiene el Freelancer.

## 1. Sistema global (Navbar, Footer, Hero, tokens)

- **`src/index.css`** (Freelancer): `body` font-family `'Inter, sans-serif'` → `'Poppins, sans-serif'` (como Profesional). El resto de `index.css` ya es casi idéntico entre ambos repos (mismas keyframes de blob/ticker/grain); no requiere más cambios.
- **`Navbar.tsx`** (Freelancer): reemplazar el navbar fijo blanco por el navbar píldora flotante oscuro del Profesional (`bg-[#0A0A0A]/85` + `backdrop-blur-md`, línea activa `#CC1500`, mismo comportamiento mobile/scroll). Menú: Home, About, Projects, Services, FAQ, Contact (se conservan Services/FAQ que no existen en Profesional, se sacan Experience/Tech que no existen en Freelancer) + botón "Descargar CV" que hoy solo tiene Profesional.
- **`Footer.tsx`** (Freelancer): portar el patrón oscuro mouse-reactive del Footer del Profesional (mismo patrón que ya usa `CTASection.tsx` del Freelancer — blobs + gradiente que sigue el mouse), conservando los links/contenido propios del Freelancer (WhatsApp, email, redes, copyright). Si CLAUDE.md pendiente pedía agregar LinkedIn, se agrega en este mismo cambio.
- **`Hero.tsx`** (Freelancer): quitar el uso de `'Playfair Display', serif` itálico (en el saludo "Hola, soy —", en el segundo renglón del nombre "Di Rocco", y en el componente `Highlight`) y reemplazar por el tratamiento plano Poppins uppercase que usa el Hero del Profesional. El copy (`WORDS_ES`/`WORDS_EN` del typewriter, texto del párrafo, botones) se mantiene igual — es contenido de freelance, no se reemplaza por el del Profesional. También quitar el `@import` de `Playfair+Display` en `index.css` si queda sin uso en todo el repo (verificar primero que ningún otro componente la use).

## 2. Ajustes menores de paleta (Freelancer)

- Reemplazar el valor de beige `#F8F7F5` por `#F5F4F0` (Profesional) en `FAQSection.tsx`, `ProcessSection.tsx`, `UseCasesSection.tsx`, `WhatIBuild.tsx` — cambio de valor de color puntual, sin tocar estructura ni layout.
- `ProfileCard.tsx`: cambiar el acento naranja `#FF6F00` por uno de la paleta compartida del sitio (`#CC1500` rojo, consistente con el resto de acentos primarios en ambos portfolios). No se toca estructura ni contenido.

No se toca la estructura, contenido ni layout de `ServicesSection.tsx`, `FAQSection.tsx`, `ProcessSection.tsx`, `TrustSection.tsx`, `UseCasesSection.tsx`, `WhatIBuild.tsx`, `WhyCodeSection.tsx`, `CTASection.tsx`, `AboutSection.tsx` — ya están alineadas en paleta/tipografía con el Profesional real.

## 3. Proyecto Nido (ambos portfolios)

**Fuente:** app de gestión del hogar, proyecto final de carrera (TPI), equipo de 8 personas, desarrollada en ~2 meses. Rol de Giuliana: Backend + Marketing. Live: `https://nidoapp.online`. Repos: `https://github.com/nicolassbon/nido-frontend.git`, `https://github.com/nicolassbon/nido-backend.git`. Stack real: Angular (standalone, signals) en frontend; según la propuesta de tema, backend en .NET/C# con Clean Architecture y PostgreSQL; incluye OCR para tickets e IA para recetas. Estado: **terminado** (sin badge in-progress).

Asset de imagen: `MVP4 - PresentaciónComercial.png` (mockup tablet + 2 celulares, fondo verde marca) → copiar a `public/nido-mockup.png` en ambos repos.

### Profesional
- Agregar a `src/data/projectsData.ts` como 4to proyecto académico:
  ```
  { id: "nido", image: "./nido-mockup.png", liveUrl: "https://nidoapp.online",
    githubUrl: "https://github.com/nicolassbon/nido-frontend.git",
    githubBackendUrl: "https://github.com/nicolassbon/nido-backend.git",
    type: "academic", stack: ["Angular", ".NET 9", "C#", "PostgreSQL", "Clean Architecture", "OCR", "IA"] }
  ```
- Agregar entradas i18n ES/EN (`nido: { title, category, description, longDescription }`) siguiendo el mismo formato que `trivia`/`hardware`/`nlp`. `longDescription` menciona: plataforma de gestión del hogar (alacena, recetas con IA, finanzas compartidas, escaneo OCR de tickets), proyecto final de carrera en equipo de 8 desarrollado en ~2 meses, rol de Giuliana (Backend + Marketing).
- **Fix de datos:** quitar `inProgress: true` de `pulseguard` (ya está terminado).

### Freelancer
- `Projects.tsx` no tiene archivo de datos separado: el array `rawData` está definido inline en `Projects.tsx:246-256`, y se mergea con las traducciones de `i18n.ts` (`projects.items.<id>.{title,category,description,longDescription}`) en `Projects.tsx:258-270`. Agregar ahí:
  ```ts
  { id: "nido", image: "./nido-mockup.png", liveUrl: "https://nidoapp.online", stack: ["Angular", ".NET 9", "C#", "PostgreSQL", "Clean Architecture", "OCR", "IA"] }
  ```
  y el bloque `projects.items.nido` correspondiente en `i18n.ts` (ES y EN), con `category` que la distinga como proyecto académico (ej. `"Proyecto final de carrera"` / `"Final degree project"`) ya que no existe un campo `type` en la interfaz `Project` del Freelancer — la distinción es solo textual vía `category`, sin alterar la interfaz.

## 4. Copy — título académico (ambos portfolios)

Reemplazar toda mención a "estudiante avanzada / 18-20 materias / egreso estimado julio 2026" por: título de **Técnica Universitaria en Desarrollo Web (UNLaM) ya finalizado** + **Licenciatura en Inteligencia Artificial (UBP) que comienza en agosto de 2026** (todavía no empezada — redactar en futuro: "Comienza en agosto 2026", nunca "desde agosto 2026" ni "cursando").

**Freelancer** — únicas dos apariciones, ambas en `src/components/sections/AboutSection.tsx`:
- Línea 15 (STATS array): `{ es: "UNLAM · Egreso jul. 2026", en: "UNLAM · Graduating Jul. 2026", color: "#06B6D4" }` → ES: `"Técnica en Desarrollo Web · UNLaM"`, EN: `"Web Dev Technician · UNLaM"` (título ya obtenido, no "egreso").
- Línea 130: `` {lang === "en" ? "Web Developer · UNLAM · Jul. 2026" : "Desarrolladora Web · UNLAM · Jul. 2026"} `` → ES: `"Técnica en Desarrollo Web · UNLaM"`, EN: `"Web Dev Technician · UNLaM"`.

**Profesional** — reemplazar en cada uno de estos puntos (ES y EN en paralelo):
- `src/components/sections/AboutSection.tsx:19-20` (`principles[0].body`): reescribir para reflejar título finalizado + inicio de Lic. en IA (UBP) en agosto 2026, en vez de "18 out of 20 subjects... Graduating in July 2026".
- `src/components/sections/AboutSection.tsx:41` (`{ label: "GPA"/"Promedio", value: "8.72 / 10" }`): se mantiene igual (corresponde a la tecnicatura ya finalizada).
- `src/components/sections/AboutSection.tsx:43` (`{ label: "Degree"/"Carrera", value: "Web Development (UNLaM)" }`): value → `"Web Dev Technician (UNLaM) — finished"` / `"Técnica en Desarrollo Web (UNLaM) — finalizada"`.
- `src/components/sections/ExperienceSection.tsx:26` (`ctx: "Particular · UNLaM"`): se mantiene (es contexto de mentorías, no del título).
- `src/components/sections/ExperienceSection.tsx:39` (`ctx: "UNLaM · 18/20 materias"`): → `"UNLaM · Técnica finalizada"` / `"UNLaM · Technician degree finished"`.
- `src/components/sections/Whatsnext.tsx:18-21` (`ctx: "UNLaM"` + body sobre 18/20 materias y egreso julio 2026): reescribir la estación del roadmap para reflejar título finalizado, y agregar/ajustar la siguiente estación para la Lic. en IA (UBP) que arranca agosto 2026 — este archivo ya modela un roadmap de 3 estaciones (título completado / fase actual / próximo posgrado), así que es el lugar natural para la Lic. en IA.
- `src/i18n.ts` líneas 16, 22, 25-26, 48-49, 301, 307, 310-311, 333-335: mismo reemplazo en cada bloque (badge del hero, quote de about, stat de "8.72/GPA" se mantiene con label pero el texto que dice "graduate"/"me gradué... con un promedio de 8.72" pasa a reflejar título ya finalizado + iniciando Lic. en IA en agosto 2026; el tooltip de línea 333-335 que dice "egreso julio 2026" se actualiza).
- `src/components/ui/Marquee.tsx:5,10` (`"UNLAM"` en palabra del marquee): se mantiene sin cambios (es solo el nombre de la universidad, no una fecha).
- `CLAUDE.md` (raíz del repo Profesional): actualizar el perfil ("Estudiante avanzada UNLaM...") con el mismo texto corregido, para que quede como fuente de verdad actualizada.

Regla existente a respetar (ya documentada en `CLAUDE.md` del Profesional): modificar ES y EN siempre en paralelo, no agregar keys nuevas de i18n sin necesidad, mantener estructura de componentes existente.

## Verificación

Levantar ambos proyectos en local (`npm run dev`) y revisar visualmente: navbar, cada sección reskineada, la card de Nido en ambos sitios, y el copy de título/carrera en ambos idiomas.
