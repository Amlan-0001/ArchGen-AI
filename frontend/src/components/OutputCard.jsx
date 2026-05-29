import { useMemo, useState } from "react";
import { Check, ChevronDown, Clipboard, Maximize2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { prettyJson } from "../utils/formatters.js";

function JsonViewer({ value }) {
  const formatted = useMemo(() => prettyJson(value), [value]);

  return (
    <pre className="json-scroll max-h-[32rem] overflow-auto rounded-xl border border-white/10 bg-black/45 p-4 text-xs leading-6 text-slate-200 sm:text-sm">
      <code>{formatted}</code>
    </pre>
  );
}

export default function OutputCard({ title, eyebrow, icon: Icon, data, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prettyJson(data));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="glass-panel neon-border rounded-2xl p-4 transition hover:-translate-y-1 hover:shadow-glow-soft sm:p-5"
    >
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-plasma/35 bg-plasma/10 text-plasma shadow-glow-soft">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-plasma">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-muted transition hover:border-plasma/40 hover:text-plasma"
            aria-label={`Copy ${title} JSON`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-muted transition hover:border-plasma/40 hover:text-plasma"
            aria-label={`${open ? "Collapse" : "Expand"} ${title}`}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between text-xs text-muted">
                <span className="inline-flex items-center gap-2">
                  <Maximize2 className="h-3.5 w-3.5 text-plasma" />
                  Structured JSON
                </span>
                <span>{prettyJson(data).split("\n").length} lines</span>
              </div>
              <JsonViewer value={data} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
