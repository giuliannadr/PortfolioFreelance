import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Check, AlertCircle, Loader2 } from "lucide-react";
import { deleteReviewByToken } from "@/lib/firebase";

interface Props {
  token: string;
}

type Status = "confirm" | "deleting" | "deleted" | "error" | "notfound";

export const DeleteReview = ({ token }: Props) => {
  const [status, setStatus] = useState<Status>("confirm");

  // Clean the ?borrar= param from the URL without reloading
  useEffect(() => {
    const clean = new URL(window.location.href);
    clean.searchParams.delete("borrar");
    window.history.replaceState({}, "", clean.toString());
  }, []);

  const handleDelete = async () => {
    setStatus("deleting");
    const ok = await deleteReviewByToken(token);
    setStatus(ok ? "deleted" : "notfound");
  };

  const handleCancel = () => {
    window.location.href = "/";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[2000] bg-[#0A0A0A] flex items-center justify-center px-5"
    >
      <div className="max-w-md w-full text-center">

        {/* Logo / brand */}
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 mb-12" style={{ fontFamily: "Poppins, sans-serif" }}>
          Giuliana Di Rocco
        </p>

        {status === "confirm" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-full bg-[#CC1500]/10 border border-[#CC1500]/30 flex items-center justify-center mx-auto mb-8">
              <Trash2 size={24} className="text-[#CC1500]" />
            </div>
            <h1 className="font-black uppercase text-white mb-3" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}>
              Eliminar reseña
            </h1>
            <p className="text-white/40 text-sm mb-10">
              ¿Segura que querés eliminar esta reseña del sitio?<br />Esta acción no se puede deshacer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleDelete}
                className="px-8 py-4 bg-[#CC1500] text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#aa1100] transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Sí, eliminar
              </button>
              <button
                onClick={handleCancel}
                className="px-8 py-4 border border-white/10 text-white/40 font-black text-[10px] uppercase tracking-[0.3em] hover:border-white/30 hover:text-white/70 transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}

        {status === "deleting" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
            <Loader2 size={32} className="text-[#CC1500] animate-spin" />
            <p className="text-white/40 text-sm">Eliminando...</p>
          </motion.div>
        )}

        {status === "deleted" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
              <Check size={28} className="text-emerald-400" />
            </div>
            <div>
              <p className="font-black uppercase text-white text-lg mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Listo</p>
              <p className="text-white/40 text-sm">La reseña fue eliminada del sitio.</p>
            </div>
            <a href="/" className="mt-2 px-8 py-3 bg-white text-[#0A0A0A] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#CC1500] hover:text-white transition-all" style={{ fontFamily: "Poppins, sans-serif" }}>
              Volver al sitio
            </a>
          </motion.div>
        )}

        {(status === "notfound" || status === "error") && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center">
              <AlertCircle size={28} className="text-red-400" />
            </div>
            <div>
              <p className="font-black uppercase text-white text-lg mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                {status === "notfound" ? "Reseña no encontrada" : "Error"}
              </p>
              <p className="text-white/40 text-sm">
                {status === "notfound"
                  ? "Es posible que ya haya sido eliminada anteriormente."
                  : "Hubo un problema. Intentá de nuevo."}
              </p>
            </div>
            <a href="/" className="mt-2 px-8 py-3 border border-white/10 text-white/40 font-black text-[10px] uppercase tracking-[0.3em] hover:border-white/30 hover:text-white/70 transition-all" style={{ fontFamily: "Poppins, sans-serif" }}>
              Volver al sitio
            </a>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};
