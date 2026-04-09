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
  image = "/giuliprofile.jpeg",
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
      className="flex justify-center items-center px-4 sm:px-0 h-full"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      whileHover={{
        y: -4,
        scale: 1.01,
        boxShadow: "0 25px 60px -15px rgba(0,0,0,0.35)",
        transition: { type: "spring", stiffness: 60, damping: 20 },
      }}
    >
      <div className="relative flex flex-col w-[320px] sm:w-[360px] md:w-[380px] lg:w-[400px] bg-white text-gray-900 rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-black/10 p-5 sm:p-6 max-h-[90vh] overflow-hidden">
        
        {/* Decoración Naranja - Fijo */}
        <div className="flex-none flex items-center gap-2 mb-3 sm:mb-4">
          <span className="w-3 h-3 bg-[#FF6F00] rounded-full" />
          <span className="w-8 h-[3px] bg-[#FF6F00] rounded-full" />
        </div>

        {/* Imagen Flexible: flex-1 permite que se achique, max-h mantiene tu alto original */}
        <div className="flex-1 min-h-0 w-full overflow-hidden rounded-2xl border border-black/5">
          <img
            src={image}
            alt={name}
            className="w-full h-full max-h-[340px] object-cover"
          />
        </div>

        {/* Información - Fijo para que no se corte el texto */}
        <div className="flex-none mt-4 sm:mt-6 text-center px-2">
          <h3
            className="text-[1.2rem] sm:text-[1.5rem] font-black tracking-tight leading-none text-gray-900 whitespace-nowrap"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {name}
          </h3>

          <p 
            className="text-[0.9rem] sm:text-[1.1rem] text-zinc-700 mt-4 leading-relaxed italic font-medium"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "{displayRole}"
          </p>

          <div className="flex justify-center gap-5 mt-6 mb-1">
            <a href="https://wa.me/5491128341223" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform" />
            </a>
            <a href="https://linkedin.com/in/giulianadirocco" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform" />
            </a>
            <a href="https://github.com/giuliannadr" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform" />
            </a>
            <a href="https://instagram.com/giulianna.dev" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform" />
            </a>
            <button 
              onClick={handleEmailClick}
              className="cursor-pointer focus:outline-none"
            >
              <HiOutlineMail className="text-[#FF6F00] w-6 h-6 hover:scale-125 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};