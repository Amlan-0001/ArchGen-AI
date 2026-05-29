import { motion } from "framer-motion";
import { ArrowDown, CircuitBoard, Network } from "lucide-react";
function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full opacity-45" aria-hidden="true">
        <motion.path
          d="M80 420 C260 220 430 520 610 300 S940 240 1160 120"
          fill="none"
          stroke="rgba(0,255,136,0.28)"
          strokeWidth="1"
          strokeDasharray="8 18"
          animate={{ strokeDashoffset: [0, -140] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M120 160 C340 300 500 80 720 230 S1030 470 1240 280"
          fill="none"
          stroke="rgba(0,204,111,0.2)"
          strokeWidth="1"
          strokeDasharray="4 16"
          animate={{ strokeDashoffset: [0, 120] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-plasma/70 shadow-[0_0_18px_rgba(0,255,136,0.95)]"
          style={{
            left: `${8 + ((index * 37) % 86)}%`,
            top: `${12 + ((index * 19) % 72)}%`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.15, 0.9, 0.15],
            scale: [0.7, 1.25, 0.7],
          }}
          transition={{
            duration: 3.5 + (index % 5),
            repeat: Infinity,
            delay: index * 0.16,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] overflow-hidden px-4 pt-32 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 grid-field moving-grid opacity-70" />
      <div className="absolute inset-0 neural-grid architecture-field opacity-35" />
      <div className="signal-wave absolute left-0 right-0 top-1/3 h-40 opacity-45" />
      <div className="absolute left-1/2 top-20 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-plasma/10 blur-3xl" />
      <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-plasma-deep/10 blur-3xl" />
      <div className="absolute bottom-0 left-16 h-96 w-96 rounded-full bg-plasma/5 blur-3xl" />
      <ParticleField />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-plasma/25 bg-plasma/10 px-4 py-2 text-sm text-plasma shadow-glow-soft"
        >
          <CircuitBoard className="h-4 w-4" />
          Autonomous Software Architecture System
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl text-balance text-6xl font-black leading-none text-white sm:text-8xl lg:text-9xl"
        >
          <span className="block bg-gradient-to-br from-white via-white to-muted bg-clip-text text-transparent">
            ArchGen AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7, ease: "easeOut" }}
          className="mt-7 max-w-4xl text-pretty text-3xl font-bold leading-tight text-white sm:text-5xl"
        >
          Transforming Product Intent into Production Systems.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.7, ease: "easeOut" }}
          className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg"
        >
          ArchGen AI autonomously synthesizes software architectures, interface blueprints,
          service contracts, validation layers, and production-ready system designs.
        </motion.p>

        <a
          href="#generate"
          className="mt-12 inline-flex items-center gap-3 rounded-xl border border-plasma/30 bg-plasma/10 px-5 py-3 font-semibold text-plasma shadow-glow-soft transition hover:-translate-y-1 hover:border-plasma"
          aria-label="Go to generator"
        >
          <Network className="h-4 w-4" />
          Start Building
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
