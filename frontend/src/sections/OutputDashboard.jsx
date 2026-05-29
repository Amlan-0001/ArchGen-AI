import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Database,
  Download,
  Eye,
  FileJson,
  Layers3,
  LayoutDashboard,
  Loader2,
  Rocket,
  ServerCog,
  Sparkles,
} from "lucide-react";
import RepairLogs from "../components/RepairLogs.jsx";
import ValidationPanel from "../components/ValidationPanel.jsx";
import { BLUEPRINT_LAYERS, ORCHESTRATION_STAGES } from "../utils/constants.js";
import { getRepairState, getValidationState, prettyJson } from "../utils/formatters.js";

const SUMMARY_KEYS = {
  modules: ["modules", "systems", "services", "features"],
  pages: ["pages", "screens", "routes", "views"],
  roles: ["roles", "actors", "users", "personas"],
  entities: ["entities", "tables", "models", "collections"],
  features: ["features", "capabilities", "workflows"],
  endpoints: ["endpoints", "routes", "apis"],
  tables: ["tables", "entities", "models"],
};

function normalizeLabel(value) {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return value.name ?? value.title ?? value.id ?? JSON.stringify(value);
}

function collectMatches(value, keys, limit = 8, found = []) {
  if (!value || found.length >= limit) return found;

  if (Array.isArray(value)) {
    value.forEach((item) => collectMatches(item, keys, limit, found));
    return found;
  }

  if (typeof value !== "object") return found;

  Object.entries(value).forEach(([key, child]) => {
    if (found.length >= limit) return;
    if (keys.includes(key.toLowerCase())) {
      if (Array.isArray(child)) {
        child.slice(0, limit - found.length).forEach((item) => found.push(normalizeLabel(item)));
      } else if (child && typeof child === "object") {
        Object.keys(child)
          .slice(0, limit - found.length)
          .forEach((item) => found.push(item));
      } else {
        found.push(normalizeLabel(child));
      }
    }
    collectMatches(child, keys, limit, found);
  });

  return [...new Set(found.filter(Boolean))].slice(0, limit);
}

function countMatches(value, keys) {
  const matches = collectMatches(value, keys, 99);
  return matches.length;
}

function getApplicationType(result) {
  const candidates = collectMatches(result, ["application_type", "app_type", "type", "category"], 1);
  return candidates[0] || "Production Software System";
}

function getSummary(result) {
  return {
    applicationType: getApplicationType(result),
    modules: collectMatches(result.architecture ?? result.intent ?? result, SUMMARY_KEYS.modules, 7),
    pages: collectMatches(result.ui_schema ?? result, SUMMARY_KEYS.pages, 7),
    roles: collectMatches(result.intent ?? result.architecture ?? result, SUMMARY_KEYS.roles, 7),
    entities: collectMatches(result.db_schema ?? result, SUMMARY_KEYS.entities, 7),
    features: collectMatches(result.intent ?? result.architecture ?? result, SUMMARY_KEYS.features, 8),
    counts: {
      modules: countMatches(result.architecture ?? result, SUMMARY_KEYS.modules),
      pages: countMatches(result.ui_schema ?? result, SUMMARY_KEYS.pages),
      endpoints: countMatches(result.api_schema ?? result, SUMMARY_KEYS.endpoints),
      tables: countMatches(result.db_schema ?? result, SUMMARY_KEYS.tables),
    },
  };
}

function getCompactSummary(value) {
  if (!value) return "No generated details were returned for this layer.";
  if (typeof value === "string") return value.length > 150 ? `${value.slice(0, 150)}...` : value;
  if (Array.isArray(value)) return `${value.length} generated item${value.length === 1 ? "" : "s"}.`;
  const keys = Object.keys(value);
  if (!keys.length) return "Generated output is available.";
  return `${keys.slice(0, 5).join(", ")}${keys.length > 5 ? " and more" : ""}`;
}

function DetailDrawer({ value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prettyJson(value));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="mt-4 rounded-xl border border-white/10 bg-black/45 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-plasma">
            <FileJson className="h-4 w-4" />
            Schema Details
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-muted transition hover:border-plasma/40 hover:text-plasma"
          >
            <Clipboard className="h-3.5 w-3.5" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="json-scroll max-h-72 overflow-auto rounded-lg bg-black/45 p-4 text-xs leading-6 text-slate-200">
          <code>{prettyJson(value)}</code>
        </pre>
      </div>
    </motion.div>
  );
}

function DetailExpander({ label, value }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-2 rounded-lg border border-plasma/25 bg-plasma/10 px-4 py-2 text-sm font-semibold text-plasma transition hover:border-plasma/60 hover:shadow-glow-soft"
      >
        <Eye className="h-4 w-4" />
        {label}
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>{open && <DetailDrawer value={value} />}</AnimatePresence>
    </div>
  );
}

function OrchestrationTracker({ activeIndex = ORCHESTRATION_STAGES.length - 1 }) {
  return (
    <div className="sticky top-20 z-20 mb-6 overflow-x-auto rounded-2xl border border-white/10 bg-void/85 p-3 shadow-panel backdrop-blur-2xl">
      <div className="flex min-w-[760px] items-center">
        {ORCHESTRATION_STAGES.map((stage, index) => {
          const completed = index < activeIndex;
          const processing = index === activeIndex;
          const Icon = stage.icon;

          return (
            <div key={stage.id} className="flex flex-1 items-center">
              <div className="flex min-w-0 flex-col items-center gap-2 text-center">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full border ${
                    completed || activeIndex === ORCHESTRATION_STAGES.length - 1
                      ? "border-plasma bg-plasma text-black"
                      : processing
                        ? "border-plasma/50 bg-plasma/10 text-plasma shadow-glow-soft"
                        : "border-white/10 bg-white/[0.03] text-muted"
                  }`}
                >
                  {completed || activeIndex === ORCHESTRATION_STAGES.length - 1 ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : processing ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </span>
                <span className="text-xs font-semibold text-white">{stage.label}</span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-muted">
                  {completed || activeIndex === ORCHESTRATION_STAGES.length - 1
                    ? "Completed"
                    : processing
                      ? "Processing"
                      : "Waiting"}
                </span>
              </div>
              {index < ORCHESTRATION_STAGES.length - 1 && (
                <span className="mx-2 h-px flex-1 bg-white/10">
                  <span
                    className={`block h-full ${
                      completed || activeIndex === ORCHESTRATION_STAGES.length - 1
                        ? "bg-plasma"
                        : "bg-transparent"
                    }`}
                  />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TagGroup({ title, values, fallback }) {
  const list = values.length ? values : [fallback];

  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">{title}</p>
      <div className="flex flex-wrap gap-2">
        {list.map((item) => (
          <span
            key={`${title}-${item}`}
            className="rounded-full border border-plasma/20 bg-plasma/10 px-3 py-1 text-xs font-medium text-slate-100"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ArchitectureSummary({ summary }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel neon-border relative overflow-hidden rounded-3xl p-5 sm:p-7"
    >
      <div className="absolute inset-0 neural-grid opacity-20" />
      <div className="relative">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-plasma">
              Architecture Summary
            </p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              {summary.applicationType}
            </h2>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-plasma/30 bg-plasma/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-plasma">
            <Sparkles className="h-4 w-4" />
            AI Architecture Operating System
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <TagGroup title="Modules" values={summary.modules} fallback="Core Platform" />
          <TagGroup title="Pages" values={summary.pages} fallback="Primary Workspace" />
          <TagGroup title="Roles" values={summary.roles} fallback="Authenticated User" />
          <TagGroup title="Entities" values={summary.entities} fallback="System Records" />
          <TagGroup title="Features" values={summary.features} fallback="Production Workflows" />
          <div className="rounded-2xl border border-plasma/20 bg-plasma/10 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-plasma">
              System Signal
            </p>
            <p className="text-sm leading-7 text-slate-200">
              Interface, service, data, validation, and repair outputs have been composed into a
              single production blueprint.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function BlueprintLayer({ layer, value, index }) {
  const [open, setOpen] = useState(index === 0);
  const Icon = layer.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-plasma/35"
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center gap-4 text-left"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-plasma/30 bg-plasma/10 text-plasma">
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold text-white">{layer.title}</span>
          <span className="mt-1 block text-sm leading-6 text-muted">{layer.description}</span>
        </span>
        <ChevronDown className={`h-5 w-5 text-muted transition ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="mb-4 text-sm leading-7 text-slate-300">{getCompactSummary(value)}</p>
              <DetailExpander label={`View ${layer.title} Schema`} value={value} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProductionBlueprint({ result }) {
  const visibleLayers = BLUEPRINT_LAYERS.filter((layer) =>
    ["ui_schema", "api_schema", "db_schema"].includes(layer.key),
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl border border-plasma/25 bg-[rgba(15,17,21,0.76)] p-5 shadow-glow backdrop-blur-2xl sm:p-7"
    >
      <div className="absolute inset-0 neural-grid opacity-20" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-plasma/10 blur-3xl" />
      <div className="relative">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-plasma">
              Production Blueprint
            </p>
            <h3 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              One connected system workspace
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
              UI Schema, API Schema, and DB Schema are organized as operating layers of the
              same production system.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              [LayoutDashboard, "Interface"],
              [ServerCog, "Service"],
              [Database, "Data"],
            ].map(([Icon, label]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-black/30 p-3">
                <Icon className="mx-auto h-5 w-5 text-plasma" />
                <p className="mt-2 text-xs font-semibold text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {visibleLayers.map((layer, index) => (
            <BlueprintLayer key={layer.key} layer={layer} value={result[layer.key]} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function CompletionState({ result, summary }) {
  const validation = getValidationState(result.validation);
  const repair = getRepairState(result.repair_result);

  const exportBlueprint = () => {
    const blob = new Blob([prettyJson(result)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "archgen-production-blueprint.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl border border-plasma/35 bg-plasma/10 p-6 shadow-glow-soft"
    >
      <motion.div
        className="absolute right-8 top-8 h-20 w-20 rounded-full border border-plasma/30"
        animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0.08, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-plasma px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-black">
            <CheckCircle2 className="h-4 w-4" />
            Production Ready
          </div>
          <h3 className="text-4xl font-black leading-tight text-white">
            Production Blueprint Generated
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            The generated architecture has passed through synthesis, verification, autonomous
            repair, and final production assembly.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={exportBlueprint}
              className="shine inline-flex items-center justify-center gap-2 rounded-xl bg-plasma px-5 py-3 font-bold text-black shadow-glow transition hover:scale-[1.01]"
            >
              <Download className="h-5 w-5" />
              Export Blueprint
            </button>
            <a
              href="#generate"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 font-semibold text-white transition hover:border-plasma/40 hover:text-plasma"
            >
              <Rocket className="h-5 w-5" />
              Create Another
            </a>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Modules", summary.counts.modules || summary.modules.length],
            ["Pages", summary.counts.pages || summary.pages.length],
            ["Endpoints", summary.counts.endpoints],
            ["Database Tables", summary.counts.tables || summary.entities.length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
              <p className="mt-2 text-3xl font-black text-white">{value}</p>
            </div>
          ))}
          {[
            validation.passed ? "Validated" : "Validation Review",
            repair.success ? "Repaired" : "Repair Reviewed",
            "Production Ready",
          ].map((status) => (
            <div
              key={status}
              className="flex items-center gap-3 rounded-2xl border border-plasma/20 bg-plasma/10 p-4 sm:col-span-2"
            >
              <CheckCircle2 className="h-5 w-5 text-plasma" />
              <span className="font-semibold text-white">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function OutputDashboard({ result }) {
  const summary = useMemo(() => (result ? getSummary(result) : null), [result]);

  if (!result || !summary) return null;

  return (
    <section className="relative mx-auto w-full max-w-7xl space-y-6 px-4 pb-24 sm:px-6 lg:px-8">
      <OrchestrationTracker />
      <ArchitectureSummary summary={summary} />
      <ProductionBlueprint result={result} />

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-[rgba(15,17,21,0.72)] p-5 backdrop-blur-2xl sm:p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-plasma/30 bg-plasma/10 text-plasma">
              <Layers3 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-plasma">
                Validation Experience
              </p>
              <h3 className="text-xl font-semibold text-white">Architecture Scan Complete</h3>
            </div>
          </div>
          <ValidationPanel data={result.validation} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="rounded-3xl border border-white/10 bg-[rgba(15,17,21,0.72)] p-5 backdrop-blur-2xl sm:p-6"
        >
          <RepairLogs data={result.repair_result} />
        </motion.div>
      </div>

      <CompletionState result={result} summary={summary} />
    </section>
  );
}
