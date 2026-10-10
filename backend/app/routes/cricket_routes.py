from fastapi import APIRouter
from app.integrations.cricsheet_client import cricsheet_processor
from app.services.analytics_service import compute_cricket_performance_score, calculate_young_talent_score

router = APIRouter(prefix="/cricket", tags=["Cricket"])

@router.get("/players")
async def list_cricket_players():
    records = cricsheet_processor.get_player_records()
    processed = []
    
    for r in records:
        # Determine base performance using batting or bowling averages
        if r["role"] == "Bowler":
            base_perf = compute_cricket_performance_score(30.0 + (30.0 - r.get("bowling_avg", 30.0)), r.get("strike_rate", 50.0))
        else:
            base_perf = compute_cricket_performance_score(r.get("batting_avg", 30.0), r.get("strike_rate", 80.0))
            
        yt_score, yt_reason = calculate_young_talent_score(r["age"], base_perf, 88.0)
        
        processed.append({
            **r,
            "performance_score": base_perf,
            "is_young_talent": r["age"] <= 24,
            "young_talent_score": yt_score,
            "young_talent_reason": yt_reason
        })
    return processed

@router.get("/young-talent")
async def cricket_young_talent():
    players = await list_cricket_players()
    return [p for p in players if p["is_young_talent"]]