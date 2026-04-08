import { motion } from "framer-motion";
import { FaWhatsapp, FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useTranslation } from "react-i18next";

interface ProfileCardProps {
  name?: string;
  role?: string;
  image?: string;
}

export const ProfileCard = ({
  name = "Giuliana Di Rocco",
  role,
  image = "/profile2.jpeg",
}: ProfileCardProps) => {
  const { t } = useTranslation();
  
  const displayRole = role || t('profileCard.role');

  const handleEmailClick = () => {
    const email = "giulianadiroccodev@gmail.com";
    const subject = encodeURIComponent("Contacto desde tu Portfolio");
    const body = encodeURIComponent("Hola Giuliana,\n\nMe gustaría contactarte para...");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <motion.div
      className="flex justify-center cursor-pointer px-4 sm:px-0 rounded-[28px]"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 60px -15px rgba(0,0,0,0.35)",
        transition: { type: "spring", stiffness: 60, damping: 20 },
      }}
    >
      <div className="relative w-[320px] sm:w-[360px] md:w-[380px] lg:w-[400px] bg-white text-gray-900 rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-black/10 dark:border-white/10 p-5 sm:p-6 md:p-7 max-h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-black/10 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        
        {/* Decoración Naranja */}
        <div className="flex items-center gap-2 mb-3 sm:mb-5">
          <span className="w-3 h-3 bg-[#FF6F00] rounded-full" />
          <span className="w-8 h-[3px] bg-[#FF6F00] rounded-full" />
        </div>

        {/* Imagen */}
        <img
          src={image}
          alt={name}
          className="w-full h-[240px] sm:h-[340px] rounded-2xl object-cover border border-black/5 dark:border-white/5"
        />

        {/* Información */}
        <div className="mt-5 sm:mt-6 text-center px-2">
          {/* Nombre: Una sola línea, Poppins Black */}
          <h3
            className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-black tracking-tight leading-none text-gray-900 whitespace-nowrap"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {name}
          </h3>

          {/* Frase: Más grande, más legible y con más peso */}
          <p 
            className="text-[17px] sm:text-[18px] md:text-[19px] text-zinc-700 mt-6 leading-relaxed italic font-medium"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "{displayRole}"
          </p>

          {/* Iconos Sociales: Color de marca uniforme */}
          <div className="flex justify-center gap-5 mt-8 mb-2">
            <a href="https://wa.me/5491128341223" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform duration-300" />
            </a>
            <a href="https://linkedin.com/in/giulianadirocco" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform duration-300" />
            </a>
            <a href="https://github.com/giuliannadr" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform duration-300" />
            </a>
            <a href="https://instagram.com/giulianna.dev" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform duration-300" />
            </a>
            <button 
              onClick={handleEmailClick}
              className="cursor-pointer focus:outline-none"
              title="Redactar Email en Gmail"
            >
              <HiOutlineMail className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};