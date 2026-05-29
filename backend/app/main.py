from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.generate import router as generate_router

app = FastAPI(
    title="AI App Compiler",
    description="AI-powered software blueprint generation system",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://archgen-tau.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(generate_router)

# Root endpoint
@app.get("/")
def root():
    return {
        "message": "AI App Compiler Backend Running 🚀"
    }

# Health endpoint
@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }