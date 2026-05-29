import { motion } from "framer-motion";
import { CheckCircle2, Cpu, Loader2, RadioTower } from "lucide-react";
import { ORCHESTRATION_STAGES } from "../utils/constants.js";

export default function Loader({ activeStep }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel neon-border relative overflow-hidden rounded-2xl p-5 sm:p-8"
    >
      <div className="absolute inset-0 bg-radial-green opacity-60" />
      <div className="absolute inset-0 grid-field opacity-40" />

      <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="mx-auto grid h-64 w-64 place-items-center rounded-full border border-plasma/20 bg-black/30 shadow-glow sm:h-80 sm:w-80">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute h-56 w-56 rounded-full border border-dashed border-plasma/50 sm:h-72 sm:w-72"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute h-40 w-40 rounded-full border border-plasma/30 sm:h-52 sm:w-52"
          />
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-24 w-24 place-items-center rounded-2xl border border-plasma/50 bg-plasma/10 shadow-glow"
          >
            <Cpu className="h-10 w-10 text-plasma" />
          </motion.div>
        </div>

        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg border border-plasma/30 bg-plasma/10">
              <RadioTower className="h-5 w-5 text-plasma" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-plasma">
                AI Processing
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Synthesizing production architecture
              </h2>
            </div>
          </div>

          <div className="mb-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/25 p-3">
            <div className="flex min-w-[720px] items-center">
              {ORCHESTRATION_STAGES.map((stage, index) => {
                const isActive = index === activeStep;
                const isDone = index < activeStep;

                return (
                  <div key={stage.id} className="flex flex-1 items-center">
                    <motion.div
                      animate={{
                        opacity: isActive || isDone ? 1 : 0.48,
                        y: isActive ? -2 : 0,
                      }}
                      className="flex min-w-0 flex-col items-center gap-2 text-center"
                    >
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full border ${
                          isDone
                            ? "border-plasma bg-plasma text-black"
                            : isActive
                              ? "border-plasma/50 bg-plasma/10 text-plasma shadow-glow-soft"
                              : "border-white/10 bg-white/[0.03] text-muted"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : isActive ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <span className="h-2.5 w-2.5 rounded-full border border-current" />
                        )}
                      </span>
                      <span className="text-xs font-semibold text-white">{stage.label}</span>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-muted">
                        {isDone ? "Completed" : isActive ? "Processing" : "Waiting"}
                      </span>
                    </motion.div>
                    {index < ORCHESTRATION_STAGES.length - 1 && (
                      <span className="mx-2 h-px flex-1 bg-white/10">
                        <motion.span
                          className="block h-full bg-plasma"
                          animate={{ width: isDone ? "100%" : isActive ? ["0%", "72%"] : "0%" }}
                          transition={{ duration: 1.1, repeat: isActive ? Infinity : 0 }}
                        />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {ORCHESTRATION_STAGES.map((stage, index) => {
              const isActive = index === activeStep;
              const isDone = index < activeStep;
              const Icon = stage.icon;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: isActive || isDone ? 1 : 0.45,
                    x: isActive ? 8 : 0,
                    y: 0,
                  }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 p-3"
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-lg border ${
                      isActive || isDone
                        ? "border-plasma/40 bg-plasma/10 text-plasma"
                        : "border-white/10 bg-white/[0.03] text-muted"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : isActive ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-white">{stage.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted">{stage.detail}</span>
                  </span>
                  <span className="ml-auto h-2 w-16 overflow-hidden rounded-full bg-white/10">
                    <motion.span
                      animate={{ x: isActive ? ["-100%", "100%"] : isDone ? "0%" : "-100%" }}
                      transition={{ duration: 1.15, repeat: isActive ? Infinity : 0 }}
                      className="block h-full w-full rounded-full bg-plasma"
                    />
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
