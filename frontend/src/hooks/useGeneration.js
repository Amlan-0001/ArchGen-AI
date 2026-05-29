import { useEffect, useRef, useState } from "react";
import { generateArchitecture } from "../services/api.js";
import { GENERATION_STEPS } from "../utils/constants.js";

export function useGeneration() {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    timerRef.current = window.setInterval(() => {
      setActiveStep((step) => Math.min(step + 1, GENERATION_STEPS.length - 2));
    }, 1300);

    return () => window.clearInterval(timerRef.current);
  }, [loading]);

  const submitPrompt = async (prompt) => {
    setError("");
    setResult(null);
    setLoading(true);
    setActiveStep(0);

    try {
      const payload = await generateArchitecture(prompt);
      if (payload.status && payload.status !== "success") {
        throw new Error(payload.message || "Architecture generation failed.");
      }

      setResult(payload.data ?? payload);
    } catch (requestError) {
      const message =
        requestError.response?.data?.detail ??
        requestError.response?.data?.message ??
        requestError.message ??
        "Unable to reach the architecture engine.";
      setError(message);
    } finally {
      setLoading(false);
      window.clearInterval(timerRef.current);
      setActiveStep(GENERATION_STEPS.length - 1);
    }
  };

  return {
    loading,
    activeStep,
    result,
    error,
    submitPrompt,
  };
}
