import os
import json
import numpy as np
from sklearn.linear_model import LogisticRegression
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv

from app.routes import f1_routes, cricket_routes, football_routes

# Load environment variables from .env file
load_dotenv()

# Configure Gemini using the NEW official SDK
api_key = os.getenv("GEMINI_API_KEY")
ai_client = genai.Client(api_key=api_key) if api_key else None

app = FastAPI(title="AthletiQ Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(f1_routes.router, prefix="/api")
app.include_router(cricket_routes.router, prefix="/api")
app.include_router(football_routes.router, prefix="/api")

MAPPING_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "player_images.json")

class ImageUpdateRequest(BaseModel):
    entity_id: str
    image_url: str

@app.get("/api/images")
def get_all_images():
    if not os.path.exists(MAPPING_PATH):
        return {}
    try:
        with open(MAPPING_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}

@app.post("/api/images/update")
def update_image(payload: ImageUpdateRequest):
    data = {}
    if os.path.exists(MAPPING_PATH):
        try:
            with open(MAPPING_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            data = {}

    data[payload.entity_id] = payload.image_url

    os.makedirs(os.path.dirname(MAPPING_PATH), exist_ok=True)
    with open(MAPPING_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return {"status": "success", "entity_id": payload.entity_id, "image_url": payload.image_url}

# --- ML PREDICTION MODULE ---
class PredictionRequest(BaseModel):
    sport: str
    entity_id: str
    recent_form_score: float
    historical_avg: float

@app.post("/api/predict")
def generate_prediction(payload: PredictionRequest):
    X_train = np.array([[40, 30], [85, 75], [20, 15], [95, 90], [60, 50], [70, 65]])
    y_train = np.array([0, 1, 0, 1, 0, 1])

    model = LogisticRegression()
    model.fit(X_train, y_train)

    X_test = np.array([[payload.recent_form_score, payload.historical_avg]])
    probability = model.predict_proba(X_test)[0][1] * 100

    return {
        "entity_id": payload.entity_id,
        "sport": payload.sport,
        "success_probability": round(probability, 2)
    }

# --- GEMINI AI INSIGHTS MODULE ---
class AIAnalysisRequest(BaseModel):
    name: str
    sport: str
    score: float  # Changed to float to prevent 422 crashes
    val1: float   # Changed to float to prevent 422 crashes
    val2: float   # Changed to float to prevent 422 crashes

@app.post("/api/ai/analyze")
def generate_ai_insight(payload: AIAnalysisRequest):
    if not ai_client:
        return {
            "insight": "Gemini API Key is missing. Please add it to your .env file.",
            "generated_for": payload.name
        }

    try:
        prompt = (
            f"Act as a professional, cinematic sports analyst. "
            f"Write a highly engaging, 3-sentence performance insight for {payload.name} competing in {payload.sport}. "
            f"Their current AthletiQ performance score is {payload.score}/100. "
            f"Their primary telemetry stat is {payload.val1}, and their secondary stat is {payload.val2}. "
            f"Focus on what these numbers mean for their momentum and trajectory. Do not use hashtags."
        )
        
        # Using the new google.genai syntax
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        
        return {
            "insight": response.text.strip(),
            "generated_for": payload.name
        }
    except Exception as e:
        return {
            "insight": f"Analysis failed to generate. Error: {str(e)}",
            "generated_for": payload.name
        }

@app.get("/")
def root():
    return {"message": "AthletiQ API Running"}