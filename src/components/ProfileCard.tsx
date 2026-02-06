import { motion } from "framer-motion";
import { FaWhatsapp, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

interface ProfileCardProps {
  name?: string;
  role?: string;
  image?: string;
}

export const ProfileCard = ({
  name = "Giuliana Di Rocco",
  role = "A Web Developer who enjoys solving problems and creating clean experiences",
  image = "/profile.png",
}: ProfileCardProps) => {

  // Esta función fuerza la redirección a Gmail en el navegador
  const handleEmailClick = () => {
    const email = "giulianadiroccodev@gmail.com";
    const subject = encodeURIComponent("Contacto desde tu Portfolio");
    const body = encodeURIComponent("Hola Giuliana,\n\nMe gustaría contactarte para...");
    
    // URL de Gmail para redactar directamente
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    
    window.open(gmailUrl, "_blank");
  };

  return (
    <motion.div
      className="flex justify-center cursor-pointer"
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
      <div className="relative w-[320px] sm:w-[360px] bg-white rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-gray-200/70 p-5 sm:p-7 overflow-visible">
        {/* Decoración Naranja */}
        <div className="flex items-center gap-2 mb-3 sm:mb-5">
          <span className="w-3 h-3 bg-orange-500 rounded-full" />
          <span className="w-8 h-[3px] bg-orange-500 rounded-full" />
        </div>

        {/* Imagen */}
        <img
          src={image}
          alt={name}
          className="w-full h-[240px] sm:h-[340px] rounded-2xl object-cover border border-gray-100"
        />

        {/* Información */}
        <div className="mt-3 sm:mt-5 text-center text-gray-900">
          <h3
            className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] font-extrabold leading-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <div>Giuliana</div>
            <div>Di Rocco</div>
          </h3>

          <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 mt-6 leading-tight">
            {role}
          </p>

          {/* Iconos Sociales */}
          <div className="flex justify-center gap-5 mt-6">
            {/* WhatsApp */}
            <a href="https://wa.me/5491128341223" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-orange-500 w-6 h-6 hover:scale-125 transition-transform duration-300" />
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com/in/giulianadirocco" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="text-orange-500 w-6 h-6 hover:scale-125 transition-transform duration-300" />
            </a>

            {/* GitHub */}
            <a href="https://github.com/giuliannadr" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-orange-500 w-6 h-6 hover:scale-125 transition-transform duration-300" />
            </a>

            {/* Email - Redirección Directa */}
            <button 
              onClick={handleEmailClick}
              className="cursor-pointer focus:outline-none"
              title="Redactar Email en Gmail"
            >
              <HiOutlineMail className="text-orange-500 w-6 h-6 hover:scale-125 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};