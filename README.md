# 🚀 ArchGen AI

> Transforming Product Intent into Production Systems

ArchGen AI is an AI-powered Software Architecture Orchestration Platform that converts natural language product ideas into structured, production-ready application blueprints.

Instead of manually designing architecture, APIs, databases, authentication systems, and UI structures, developers simply describe what they want to build.

ArchGen AI then generates the complete system blueprint through a multi-stage compiler-inspired pipeline.

---

# 🌐 Live Demo

Frontend:
[ADD YOUR VERCEL URL]

Backend:
https://archgen-ai-backend.onrender.com

Repository:
https://github.com/Amlan-0001/ArchGen-AI

---

# 🎯 Problem Statement

Modern software development starts with a large amount of planning:

- Requirement analysis
- Architecture design
- UI planning
- API design
- Database modeling
- Validation
- Consistency checks

This process is slow, repetitive, and error-prone.

ArchGen AI aims to automate the planning phase of software development by converting natural language requirements into structured engineering artifacts.

---

# 🧠 Inspiration

This project was built as part of an AI Engineering Systems Design challenge.

The challenge required building a system that behaves like a compiler:

Natural Language
↓
Structured Representation
↓
Validation
↓
Repair
↓
Executable Blueprint

Unlike simple prompt engineering systems, the goal was to create a reliable, modular, and production-aware pipeline.

---

# 🏗️ System Architecture

```text
User Prompt
     │
     ▼
Intent Extraction Layer
     │
     ▼
Architecture Generation Layer
     │
     ▼
Schema Generation Layer
 ┌───────────────┐
 │ UI Schema     │
 │ API Schema    │
 │ DB Schema     │
 └───────────────┘
     │
     ▼
Validation Engine
     │
     ▼
Repair Engine
     │
     ▼
Final Production Blueprint
```

---

# ⚙️ Pipeline Stages

## 1. Intent Extraction

Converts raw user prompts into structured product requirements.

Example:

Input:

```text
Build a CRM with authentication, payments and analytics dashboard.
```

Output:

```json
{
  "application_type": "CRM",
  "features": [
    "authentication",
    "payments",
    "analytics"
  ]
}
```

---

## 2. Architecture Generation

Generates:

- Entities
- User Roles
- System Modules
- Application Flows
- Service Boundaries

Example:

```json
{
  "roles": [
    "Admin",
    "User"
  ],
  "modules": [
    "Authentication",
    "Payments",
    "Analytics"
  ]
}
```

---

## 3. UI Schema Generation

Generates structured frontend configuration.

Includes:

- Pages
- Components
- Forms
- Tables
- Dashboards
- Navigation

---

## 4. API Schema Generation

Generates service contracts.

Example:

```json
{
  "route": "/users",
  "method": "POST"
}
```

Includes:

- CRUD operations
- Validation rules
- Request contracts

---

## 5. Database Schema Generation

Generates:

- Tables
- Relationships
- Primary Keys
- Foreign Keys

Example:

```json
{
  "table": "users",
  "fields": [
    "id",
    "email",
    "password"
  ]
}
```

---

## 6. Validation Engine

Ensures consistency across generated layers.

Checks:

- Missing fields
- Invalid structures
- Schema mismatches
- Cross-layer inconsistencies

Examples:

✓ API fields exist in DB schema

✓ UI forms map to API endpoints

✓ Role permissions are valid

---

## 7. Repair Engine

Automatically resolves detected issues.

Capabilities:

- Missing key repair
- Invalid schema repair
- Consistency repair
- Regeneration of failed sections

Instead of blindly regenerating the entire output, ArchGen AI repairs only the affected layer.

---

# 🔍 Reliability Features

## Deterministic Generation

The system follows a structured multi-stage process rather than relying on a single prompt.

Benefits:

- More predictable outputs
- Better consistency
- Reduced hallucinations

---

## Schema Enforcement

All outputs follow strict JSON structures.

Guarantees:

- Valid JSON
- Required fields
- Structured outputs
- Type-safe schemas

---

## Failure Handling

The system handles:

- Ambiguous prompts
- Missing requirements
- Incomplete specifications
- Conflicting requests

Through:

- Assumption generation
- Validation
- Repair

---

# 🛠️ Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS

## Backend

- FastAPI
- Python
- Pydantic

## AI Layer

- Groq API
- Llama Models

## Deployment

- Vercel
- Render

---

# 📂 Project Structure

```text
ArchGen-AI
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── pipeline
│   │   ├── schemas
│   │   ├── services
│   │   ├── validators
│   │   └── repair
│   │
│   └── tests
│
├── frontend
│   ├── src
│   ├── public
│   └── assets
│
└── docs
```

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/Amlan-0001/ArchGen-AI.git
cd ArchGen-AI
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create:

```env
GROQ_API_KEY=your_api_key
```

Run:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 📊 Key Design Decisions

### Why Multi-Stage Pipeline?

A single prompt approach is unreliable.

Breaking generation into stages provides:

- Better control
- Easier debugging
- Improved consistency
- Repairability

---

### Why Validation Layer?

LLMs can hallucinate.

Validation ensures:

- Structural correctness
- Schema consistency
- Runtime readiness

---

### Why Repair Engine?

Regenerating everything is expensive.

Repairing only failed components:

- Reduces cost
- Reduces latency
- Improves reliability

---

# 🔮 Future Roadmap

## Phase 2

- Architecture Visualization
- Interactive Graphs
- Export JSON

## Phase 3

- Full Code Generation
- Multi-Agent Orchestration
- Repository Generation

## Phase 4

- One-Click Deployment
- No-Code Platform
- Enterprise Architecture Studio

---

# 👨‍💻 Author

N. M. Amlan

B.Tech
IIIT Bhubaneswar

Interests:

- Agentic AI
- Software Architecture
- LLM Systems
- AI Engineering
- Future Technologies

---

# ⭐ Support

If you found this project interesting:

⭐ Star the repository

🍴 Fork the repository

🚀 Follow the development journey of ArchGen AI
