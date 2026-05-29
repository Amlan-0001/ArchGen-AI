import {
  Blocks,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  LayoutDashboard,
  Network,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export const EXAMPLE_PROMPT =
  "Build a CRM platform with authentication, payments, analytics dashboard, and admin panel.";

export const GENERATION_STEPS = [
  "Intent Analysis",
  "Architecture Generation",
  "Blueprint Synthesis",
  "Validation Engine",
  "Repair Engine",
  "Production Blueprint",
];

export const ORCHESTRATION_STAGES = [
  {
    id: "intent",
    label: "Intent",
    title: "Intent Analysis",
    detail: "Extracting domain signals, actors, product goals, and operating constraints.",
    icon: BrainCircuit,
  },
  {
    id: "architecture",
    label: "Architecture",
    title: "Architecture Generation",
    detail: "Designing system topology, modules, workflows, and service boundaries.",
    icon: Blocks,
  },
  {
    id: "blueprint",
    label: "Blueprint",
    title: "Blueprint Synthesis",
    detail: "Composing interface, service, and data layers into one production workspace.",
    icon: Network,
  },
  {
    id: "validation",
    label: "Validation",
    title: "Validation Engine",
    detail: "Scanning endpoint consistency, schema integrity, roles, and data models.",
    icon: ShieldCheck,
  },
  {
    id: "repair",
    label: "Repair",
    title: "Repair Engine",
    detail: "Checking missing references, route mappings, and schema alignment.",
    icon: Wrench,
  },
  {
    id: "complete",
    label: "Complete",
    title: "Production Blueprint",
    detail: "Finalizing a validated, repaired, production-ready system design.",
    icon: CheckCircle2,
  },
];

export const WORKFLOW_STAGES = [
  {
    id: "product-intent",
    key: "prompt",
    title: "Product Intent",
    eyebrow: "Step 01",
    description: "The originating product brief becomes the seed for autonomous system synthesis.",
    icon: FileText,
  },
  {
    id: "intent-analysis",
    key: "intent",
    title: "Intent Analysis",
    eyebrow: "Step 02",
    description: "ArchGen AI extracts domains, actors, core workflows, and platform constraints.",
    icon: BrainCircuit,
  },
  {
    id: "system-architecture",
    key: "architecture",
    title: "System Architecture",
    eyebrow: "Step 03",
    description: "The system topology is organized into deployable services and operational boundaries.",
    icon: Blocks,
  },
  {
    id: "blueprint-synthesis",
    key: "blueprint",
    title: "Blueprint Synthesis",
    eyebrow: "Step 04",
    description: "Interface, service, data, validation, and repair layers converge into one production workspace.",
    icon: Network,
  },
  {
    id: "validation-engine",
    key: "validation",
    title: "Validation Engine",
    eyebrow: "Step 05",
    description: "The architecture is scanned for consistency, missing contracts, and production readiness.",
    icon: ShieldCheck,
  },
  {
    id: "autonomous-repair",
    key: "repair_result",
    title: "Autonomous Repair",
    eyebrow: "Step 06",
    description: "Repair traces show regenerated systems and corrections applied by the orchestration engine.",
    icon: Wrench,
  },
  {
    id: "production-blueprint",
    key: "final",
    title: "Production Blueprint",
    eyebrow: "Step 07",
    description: "A complete production-system blueprint is ready for review, export, and implementation.",
    icon: CheckCircle2,
  },
];

export const PRODUCT_NAME = "ArchGen AI";

export const BLUEPRINT_LAYERS = [
  {
    key: "ui_schema",
    title: "Interface Layer",
    description: "Screens, components, states, and UX structure synthesized from product intent.",
    icon: LayoutDashboard,
  },
  {
    key: "api_schema",
    title: "Service Layer",
    description: "API contracts, endpoints, payloads, and service interaction boundaries.",
    icon: Code2,
  },
  {
    key: "db_schema",
    title: "Data Layer",
    description: "Entities, relationships, persistence rules, and data ownership models.",
    icon: Database,
  },
  {
    key: "validation",
    title: "Validation Layer",
    description: "Consistency checks and readiness signals across the generated architecture.",
    icon: ShieldCheck,
  },
  {
    key: "repair_result",
    title: "Autonomous Repair Layer",
    description: "Regeneration traces and correction summaries for unresolved architecture gaps.",
    icon: Wrench,
  },
];


