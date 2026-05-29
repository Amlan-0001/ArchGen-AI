import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import GenerateButton from "../components/GenerateButton.jsx";
import Loader from "../components/Loader.jsx";
import Navbar from "../components/Navbar.jsx";
import PromptBox from "../components/PromptBox.jsx";
import HeroSection from "../sections/HeroSection.jsx";
import OutputDashboard from "../sections/OutputDashboard.jsx";
import { API_ENDPOINTS } from "../config/api.js";
import { useGeneration } from "../hooks/useGeneration.js";
import { EXAMPLE_PROMPT } from "../utils/constants.js";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState(EXAMPLE_PROMPT);
  const { loading, activeStep, result, error, submitPrompt } = useGeneration();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!prompt.trim() || loading) {
      return;
    }
    await submitPrompt(prompt.trim());
  };

  return (
    <main className="min-h-screen overflow-hidden bg-void text-white">
      <Navbar />
      <HeroSection />

      <section id="generate" className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-plasma/5 to-transparent" />
        <div className="relative mx-auto max-w-5xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <PromptBox value={prompt} onChange={setPrompt} disabled={loading} />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-7 text-muted">
                ArchGen AI sends your intent to{" "}
                <span className="font-mono text-plasma">{API_ENDPOINTS.generate}</span>{" "}
                and orchestrates the response through a staged production-blueprint workflow.
              </p>
              <GenerateButton loading={loading} disabled={loading || !prompt.trim()} />
            </div>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mt-6 flex gap-3 rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-red-100"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
                <div>
                  <p className="font-semibold text-white">Generation failed</p>
                  <p className="mt-1 text-red-100/80">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <AnimatePresence>{loading && <Loader activeStep={activeStep} />}</AnimatePresence>
      </div>

      <OutputDashboard result={result} prompt={prompt} />

      <footer className="relative border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-plasma to-transparent shadow-glow" />
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-white">ArchGen AI</span>
          <span>Powered by AI Orchestration</span>
        </div>
      </footer>
    </main>
  );
}
