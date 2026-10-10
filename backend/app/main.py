from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes import f1_routes, cricket_routes, football_routes

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(f1_routes.router, prefix="/api")
app.include_router(cricket_routes.router, prefix="/api")
app.include_router(football_routes.router, prefix="/api") # Added Football!

@app.get("/api/health")
def health():
    return {"status": "operational"}