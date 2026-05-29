import { Github, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-void/70 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center rounded-lg border border-plasma/40 bg-plasma/10 shadow-glow">
            <span className="absolute inset-0 rounded-lg bg-plasma/20 blur-xl" />
            <Sparkles className="relative h-5 w-5 text-plasma" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold uppercase tracking-[0.26em] text-white">
              ArchGen AI
            </span>
            <span className="hidden text-xs text-muted sm:block">
              Prompt to Production Architecture
            </span>
          </span>
        </a>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-plasma/25 bg-plasma/10 px-4 py-2 text-xs font-medium text-plasma shadow-glow-soft md:inline-flex">
            AI Blueprint Engine
          </span>
          <a
            href="https://github.com/Amlan-0001/ArchGen-AI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View ArchGen AI GitHub Repository"
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-muted transition hover:border-plasma/45 hover:text-plasma hover:shadow-glow cursor-pointer"
          >
            <Github className="h-4 w-4" />
          </a>
          <span className="hidden h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs text-muted sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-plasma shadow-[0_0_14px_rgba(0,255,136,0.9)]" />
            Online
          </span>
        </div>
      </nav>
    </motion.header>
  );
}
