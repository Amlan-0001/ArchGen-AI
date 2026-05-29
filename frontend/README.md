# ArchGen AI Frontend

Premium React + Vite frontend for the ArchGen AI software architecture generation platform.

## Run

```bash
npm install
npm run dev
```

Configure the backend URL with:

```txt
VITE_API_URL=http://127.0.0.1:8000
```

The app calls:

```txt
POST ${VITE_API_URL}/generate
```
