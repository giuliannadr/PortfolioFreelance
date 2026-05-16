/**
 * Text-lighting gradients — replicates the hero "GIULIANA" effect:
 * multiple radial color spots layered over a solid base, clipped to text.
 *
 * SPOTS_DARK  → base blanca  → para secciones con fondo oscuro (#0A0A0A)
 * SPOTS_LIGHT → base oscura  → para secciones con fondo claro  (#F8F7F5 / white)
 */

const SPOTS = [
  "radial-gradient(ellipse 55% 90% at 10% 50%, rgba(124,58,237,0.95) 0%, transparent 52%)",
  "radial-gradient(ellipse 60% 80% at 78% 38%, rgba(204,21,0,0.95)   0%, transparent 52%)",
  "radial-gradient(ellipse 50% 70% at 50% 2%,  rgba(6,182,212,0.85)  0%, transparent 45%)",
  "radial-gradient(ellipse 40% 55% at 38% 90%, rgba(217,119,6,0.80)   0%, transparent 42%)",
  "radial-gradient(ellipse 35% 50% at 15% 12%, rgba(236,72,153,0.75)  0%, transparent 38%)",
];

export const SPOTS_DARK  = [...SPOTS, "linear-gradient(rgba(255,255,255,1), rgba(255,255,255,1))"].join(", ");
export const SPOTS_LIGHT = [...SPOTS, "linear-gradient(rgba(10,10,10,1),    rgba(10,10,10,1))"].join(", ");
