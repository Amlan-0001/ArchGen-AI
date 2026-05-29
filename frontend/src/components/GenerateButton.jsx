import { Loader2, WandSparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function GenerateButton({ loading, disabled }) {
  return (
    <motion.button
      type="submit"
      whileHover={!disabled ? { scale: 1.015 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      disabled={disabled}
      className="shine group relative inline-flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-plasma/50 bg-gradient-to-r from-plasma via-plasma-deep to-plasma px-7 py-4 text-base font-bold text-black shadow-[0_0_42px_rgba(0,255,136,0.34)] transition disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.32),transparent)] opacity-0 transition group-hover:opacity-100" />
      {loading ? (
        <Loader2 className="relative h-5 w-5 animate-spin" />
      ) : (
        <WandSparkles className="relative h-5 w-5" />
      )}
      <span className="relative">
        {loading ? "Generating Blueprint..." : "Generate Architecture"}
      </span>
    </motion.button>
  );
}
