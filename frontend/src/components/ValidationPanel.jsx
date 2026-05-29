import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import OutputCard from "./OutputCard.jsx";
import { getValidationState } from "../utils/formatters.js";

const PASSED_CHECKS = [
  "Endpoint Consistency",
  "Schema Integrity",
  "Role Validation",
  "Data Model Verification",
];

export default function ValidationPanel({ data }) {
  const state = getValidationState(data);
  const StatusIcon = state.passed ? CheckCircle2 : AlertTriangle;

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`rounded-2xl border p-5 ${
          state.passed
            ? "border-plasma/35 bg-plasma/10 shadow-glow-soft"
            : "border-danger/35 bg-danger/10 shadow-[0_0_60px_rgba(255,77,79,0.12)]"
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span
              className={`grid h-12 w-12 place-items-center rounded-xl border ${
                state.passed
                  ? "border-plasma/40 bg-plasma/10 text-plasma"
                  : "border-danger/40 bg-danger/10 text-danger"
              }`}
            >
              <StatusIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                Validation Engine
              </p>
              <h3 className="text-xl font-semibold text-white">
                {state.passed ? "Architecture Scan Complete" : state.label}
              </h3>
            </div>
          </div>
          <span
            className={`w-fit rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] ${
              state.passed ? "bg-plasma text-black" : "bg-danger text-white"
            }`}
          >
            {state.passed ? "Passed" : "Review"}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {PASSED_CHECKS.map((check, index) => (
            <motion.div
              key={check}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3"
            >
              <CheckCircle2 className="h-5 w-5 text-plasma" />
              <span className="text-sm font-medium text-slate-100">{check}</span>
            </motion.div>
          ))}
        </div>

        {!state.passed && state.issues.length > 0 && (
          <div className="mt-5 grid gap-2">
            {state.issues.map((issue, index) => (
              <div
                key={`${index}-${JSON.stringify(issue)}`}
                className="rounded-lg border border-danger/20 bg-black/25 px-4 py-3 text-sm text-slate-200"
              >
                {typeof issue === "string" ? issue : JSON.stringify(issue)}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <OutputCard
        title="Validation Engine"
        eyebrow="Architecture checks"
        icon={ShieldCheck}
        data={data}
        defaultOpen={false}
      />
    </div>
  );
}
