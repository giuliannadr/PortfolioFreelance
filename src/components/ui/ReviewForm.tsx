import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Send, Check, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { submitReview } from "@/lib/firebase";

interface ReviewFormProps {
  onClose:    () => void;
  lang:       string;
  onSuccess?: () => void;
}

type Status = "idle" | "sending" | "success" | "error";

const SVC  = import.meta.env.VITE_EMAILJS_SERVICE_ID           ?? "";
const TPL  = import.meta.env.VITE_EMAILJS_TEMPLATE_REVIEWS_ID  ?? "";
const PKEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY            ?? "";

// Same blob gradient as the other CTA buttons
const BLOB_GRAD = [
  "radial-gradient(ellipse 90% 160% at 8% 50%, rgba(204,21,0,0.50), transparent 55%)",
  "radial-gradient(ellipse 80% 140% at 92% 50%, rgba(124,58,237,0.42), transparent 55%)",
  "radial-gradient(ellipse 60% 110% at 50% -15%, rgba(6,182,212,0.30), transparent 50%)",
  "#ffffff",
].join(", ");


export const ReviewForm = ({ onClose, lang, onSuccess }: ReviewFormProps) => {
  const [name,    setName]    = useState("");
  const [empresa, setEmpresa] = useState("");
  const [rol,     setRol]     = useState("");
  const [comment, setComment] = useState("");
  const [rating,  setRating]  = useState(0);
  const [hov,        setHov]        = useState(0);
  const [hovSubmit,  setHovSubmit]  = useState(false);
  const [status,     setStatus]     = useState<Status>("idle");

  const es = lang !== "en";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || rating === 0) return;
    setStatus("sending");

    try {
      // 1 · Save to Firebase (auto-visible)
      const roleFinal = [empresa.trim(), rol.trim()].filter(Boolean).join(" — ");
      const deleteToken = await submitReview({
        name:    name.trim(),
        role:    roleFinal,
        comment: comment.trim(),
        rating,
      });

      // 2 · Send notification email to Giuliana via EmailJS
      const deleteLink = `${window.location.origin}/?borrar=${deleteToken}`;
      if (SVC && TPL && PKEY) {
        await emailjs.send(SVC, TPL, {
          from_name:    name.trim(),
          from_role:    roleFinal || (es ? "Sin especificar" : "Not specified"),
          message:      comment.trim(),
          rating_stars: "★".repeat(rating) + "☆".repeat(5 - rating),
          rating_num:   `${rating} de 5`,
          sent_at:      new Date().toLocaleDateString("es-AR"),
          delete_link:  deleteLink,
        }, PKEY);
      }

      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      key="review-overlay"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[1100] bg-[#0A0A0A] overflow-y-auto scrollbar-hide flex flex-col"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[1110] w-10 h-10 flex items-center justify-center border border-white/10 bg-[#0A0A0A] text-white/40 hover:border-[#CC1500] hover:text-white transition-all"
      >
        <X size={17} />
      </button>

      <div className="flex-1 flex flex-col px-5 sm:px-8 lg:px-10 pt-24 sm:pt-16 pb-20 max-w-2xl mx-auto w-full">

        {/* Header */}
        <div className="flex items-center gap-5 mb-12 border-b border-white/[0.06] pb-7">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20" style={{ fontFamily: "Poppins, sans-serif" }}>✦</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20" style={{ fontFamily: "Poppins, sans-serif" }}>
            {es ? "Tu reseña" : "Your review"}
          </span>
        </div>

        {/* Headline */}
        <div className="mb-10">
          <h2
            className="font-black uppercase leading-[0.88] mb-2"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.5rem, 7vw, 5rem)", letterSpacing: "-0.03em", backgroundImage: "linear-gradient(120deg, #CC1500 0%, #ffffff 40%, #7C3AED 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            {es ? "¿Trabajaste conmigo?" : "Worked with me?"}
          </h2>
          <p className="text-white/35 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
            {es
              ? "Tu opinión importa. ¡Gracias por tomarte el tiempo!"
              : "Your opinion matters. Thanks for taking the time!"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-6 py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
                <Check size={28} className="text-emerald-400" />
              </div>
              <div>
                <p className="font-black uppercase text-white text-lg mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {es ? "¡Gracias, " : "Thanks, "}{name}!
                </p>
                <p className="text-white/40 text-sm max-w-xs">
                  {es
                    ? "Tu reseña ya está publicada en el sitio."
                    : "Your review is now live on the site."}
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 bg-white text-[#0A0A0A] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#CC1500] hover:text-white transition-all"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {es ? "Cerrar" : "Close"}
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Stars */}
              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {es ? "Puntuación *" : "Rating *"}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(n => {
                    const active = (hov || rating) >= n;
                    return (
                      <motion.button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHov(n)}
                        onMouseLeave={() => setHov(0)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Star
                          size={28}
                          fill={active ? "#ffffff" : "none"}
                          className={active ? "text-white" : "text-white/20"}
                          style={{ transition: "all 0.15s" }}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {es ? "Nombre *" : "Name *"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder={es ? "Tu nombre" : "Your name"}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#CC1500]/60 transition-colors"
                />
              </div>

              {/* Empresa — Rol */}
              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {es ? "Empresa & Rol" : "Company & Role"}
                  <span className="ml-2 text-white/15 normal-case tracking-normal font-normal">{es ? "(opcional)" : "(optional)"}</span>
                </label>
                <div className="flex items-stretch gap-0">
                  <input
                    type="text"
                    value={empresa}
                    onChange={e => setEmpresa(e.target.value)}
                    placeholder={es ? "Empresa" : "Company"}
                    className="w-1/2 bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#CC1500]/60 transition-colors"
                  />
                  <div className="flex items-center px-3 bg-white/5 border-t border-b border-white/10 text-white/20 text-sm select-none">
                    —
                  </div>
                  <input
                    type="text"
                    value={rol}
                    onChange={e => setRol(e.target.value)}
                    placeholder={es ? "Rol" : "Role"}
                    className="w-1/2 bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#CC1500]/60 transition-colors"
                  />
                </div>
              </div>

              {/* Comment */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/30" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {es ? "Comentario *" : "Comment *"}
                  </label>
                  <span className="text-[9px] font-black tabular-nums" style={{ fontFamily: "Poppins, sans-serif", color: comment.length > 270 ? "#CC1500" : "rgba(255,255,255,0.2)" }}>
                    {comment.length}/300
                  </span>
                </div>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value.slice(0, 300))}
                  required
                  maxLength={300}
                  rows={4}
                  placeholder={es ? "Contá tu experiencia trabajando conmigo..." : "Tell us about your experience working with me..."}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm outline-none focus:border-[#CC1500]/60 transition-colors resize-none"
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <div className="flex items-center gap-3 text-red-400 text-sm border border-red-400/20 px-4 py-3">
                  <AlertCircle size={16} />
                  <span>{es ? "Algo salió mal. Intentá de nuevo." : "Something went wrong. Try again."}</span>
                </div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!name.trim() || !comment.trim() || rating === 0 || status === "sending"}
                onHoverStart={() => setHovSubmit(true)}
                onHoverEnd={() => setHovSubmit(false)}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden flex items-center justify-center gap-3 px-10 py-4 bg-white text-[#0A0A0A] font-black text-[10px] uppercase tracking-[0.3em] disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <span
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{ opacity: hovSubmit ? 1 : 0, background: BLOB_GRAD }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  {status === "sending" ? (
                    <>
                      <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      {es ? "Publicando..." : "Publishing..."}
                    </>
                  ) : (
                    <>
                      {es ? "Publicar reseña" : "Publish review"}
                      <Send size={13} />
                    </>
                  )}
                </span>
              </motion.button>

              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/15 text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
                {es ? "Tu reseña es visible para todos." : "Your review is visible to everyone."}
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
