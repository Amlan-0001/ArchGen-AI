import { motion } from "framer-motion";
import { EXAMPLE_PROMPT } from "../utils/constants.js";

export default function PromptBox({ value, onChange, disabled }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="glass-panel neon-border rounded-2xl p-4 sm:p-6"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-plasma">
            Architecture Prompt
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Describe the system you want to generate
          </h2>
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange(EXAMPLE_PROMPT)}
          className="w-fit rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted transition hover:border-plasma/40 hover:text-plasma disabled:cursor-not-allowed disabled:opacity-50"
        >
          Use Example
        </button>
      </div>

      <textarea
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Describe the software application you want to build..."
        className="min-h-52 w-full resize-y rounded-xl border border-white/10 bg-black/35 p-5 text-base leading-7 text-white outline-none transition focus:border-plasma/70 focus:shadow-[0_0_0_4px_rgba(0,255,136,0.12),0_0_52px_rgba(0,255,136,0.12)] disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg"
      />

      <p className="mt-3 text-sm text-muted">
        Example: {EXAMPLE_PROMPT}
      </p>
    </motion.div>
  );
}
