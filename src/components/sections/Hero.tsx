import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="scroll-mt-32 flex flex-col items-start justify-start pt-10 pb-8 px-6 relative overflow-hidden">

      <div className="container mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center lg:text-left max-w-2xl"
        >

          {/* Badge */}
          <div className="mb-6 inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/80 mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for new projects
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold tracking-tighter text-white mb-6 leading-tight">
            FULL-STACK
            <br />
            <span className="text-white/40 hover:text-[#FF6F00] transition-colors duration-500 cursor-default">DEVELOPER.</span>
          </h1>

          {/* Description */}
          <p className="max-w-xl text-lg text-white/60 mb-10 leading-relaxed mx-auto lg:mx-0">
          I build precise, logical, and high-quality web applications, crafting seamless front-end experiences and robust back-end solutions. 
          Passionate about clean, scalable, and performant code.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#projects"
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              View Work <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-center"
            >
              Contact Me
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
