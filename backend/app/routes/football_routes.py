from fastapi import APIRouter
from app.integrations.football_data_client import football_client
from app.services.analytics_service import compute_football_performance_score, calculate_young_talent_score

router = APIRouter(prefix="/football", tags=["Football"])

@router.get("/scorers")
async def list_football_scorers():
    raw_scorers = football_client.get_top_scorers()
    results = []
    
    for player in raw_scorers:
        # Calculate Performance Score
        perf_score = compute_football_performance_score(
            goals=player["goals"], 
            assists=player["assists"], 
            matches=player["playedMatches"]
        )
        
        # Calculate Young Talent Score
        yt_score, yt_reason = calculate_young_talent_score(player["age"], perf_score, 82.0)

        results.append({
            **player,
            "performance_score": perf_score,
            "is_young_talent": player["age"] <= 24,
            "young_talent_score": yt_score,
            "young_talent_reason": yt_reason
        })
        
    return results

@router.get("/young-talent")
async def football_young_talent():
    scorers = await list_football_scorers()
    # Sort by Young Talent Score (highest first)
    yt = [p for p in scorers if p["is_young_talent"]]
    return sorted(yt, key=lambda x: x["young_talent_score"], reverse=True)