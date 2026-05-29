# ArchGen AI Deployment

## Backend Deployment (Render)

Root Directory:

```text
backend
```

Build Command:

```bash
pip install -r requirements.txt
```

Start Command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Environment Variables:

```text
OPENROUTER_API_KEY
OPENROUTER_MODEL=qwen/qwen3-32b:free
ALLOWED_ORIGINS=https://your-vercel-frontend-url.vercel.app
```

## Frontend Deployment (Vercel)

Root Directory:

```text
frontend
```

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

Environment Variables:

```text
VITE_API_URL=https://REPLACE_WITH_RENDER_BACKEND_URL
```
