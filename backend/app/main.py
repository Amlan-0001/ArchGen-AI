from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.generate import router as generate_router
from app.config import ALLOWED_ORIGINS

app = FastAPI(
    title="AI App Compiler",
    description="AI-powered software blueprint generation system",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
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
        "message": "AI App Compiler Backend Running ðŸš€"
    }


# Health endpoint
@app.get("/health")
def health_check():

    return {
        "status": "healthy"
    }

