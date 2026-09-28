import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "AthletiQ"
    CORS_ORIGINS: str = "http://localhost:5173"

settings = Settings()