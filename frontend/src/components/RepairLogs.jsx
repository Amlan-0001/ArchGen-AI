import { CheckCircle2, TerminalSquare, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import OutputCard from "./OutputCard.jsx";
import { getRepairState } from "../utils/formatters.js";

export default function RepairLogs({ data }) {
  const repair = getRepairState(data);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel rounded-2xl border border-plasma/20 p-5"
      >
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-plasma/35 bg-plasma/10 text-plasma">
              <Wrench className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-plasma">
                Autonomous Repair Log
              </p>
              <h3 className="text-xl font-semibold text-white">
                Consistency verification passed
              </h3>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-plasma/30 bg-plasma/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-plasma">
            <CheckCircle2 className="h-4 w-4" />
            {repair.status}
          </span>
        </div>

        {repair.systems.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {repair.systems.map((system, index) => (
              <span
                key={`${index}-${JSON.stringify(system)}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted"
              >
                {typeof system === "string" ? system : JSON.stringify(system)}
              </span>
            ))}
          </div>
        )}

        <div className="rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-sm text-slate-200">
          <div className="mb-3 flex items-center gap-2 text-plasma">
            <TerminalSquare className="h-4 w-4" />
            autonomous-repair.log
          </div>
          <div className="space-y-2">
            {repair.logs.map((log, index) => (
              <motion.div
                key={`${index}-${log}`}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-3"
              >
                <span className="text-plasma">[ok]</span>
                <span>{typeof log === "string" ? log : JSON.stringify(log)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <OutputCard
        title="Repair Engine"
        eyebrow="Autonomous correction"
        icon={Wrench}
        data={data}
        defaultOpen={false}
      />
    </div>
  );
}
