import { useTranslation } from "react-i18next";

const ITEMS_ES = [
  "LANDING PAGES", "TIENDAS ONLINE", "WEB APPS", "PANELES A MEDIDA",
  "DISEÑO QUE CONVIERTE", "RESULTADOS REALES", "ENTREGA EN TIEMPO",
  "SISTEMAS PROPIOS", "ATENCIÓN 1 A 1", "REDISEÑOS", "BUENOS AIRES",
];

const ITEMS_EN = [
  "LANDING PAGES", "ONLINE STORES", "WEB APPS", "CUSTOM PANELS",
  "DESIGN THAT CONVERTS", "REAL RESULTS", "ON-TIME DELIVERY",
  "CUSTOM SYSTEMS", "1 TO 1 ATTENTION", "REDESIGNS", "BUENOS AIRES",
];

const SEP = <span className="mx-5 text-white/25 font-black text-[10px]">✦</span>;

export const Marquee = () => {
  const { i18n } = useTranslation();
  const items = i18n.language === "en" ? ITEMS_EN : ITEMS_ES;

  const content = (
    <span className="flex items-center whitespace-nowrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className="font-black uppercase tracking-[0.25em] text-white text-[10px]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {item}
          </span>
          {SEP}
        </span>
      ))}
    </span>
  );

  return (
    <div className="bg-[#CC1500] py-3.5 overflow-hidden" aria-hidden>
      <div className="ticker-track flex">
        {content}{content}{content}{content}
      </div>
    </div>
  );
};
