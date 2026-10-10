from fastapi import APIRouter
from app.integrations.f1_client import f1_client
from app.services.analytics_service import calculate_young_talent_score

router = APIRouter(prefix="/f1", tags=["F1"])

@router.get("/drivers")
async def list_f1_drivers():
    raw_drivers = f1_client.get_drivers()
    results = []
    
    for d in raw_drivers:
        # Calculate a 0-100 performance score based on F1 points
        perf_score = round(min(99.0, max(45.0, 45.0 + (d["points"] / 6))), 1)
        
        # Calculate Young Talent Score
        yt_score, yt_reason = calculate_young_talent_score(d["age"], perf_score, 88.0)

        results.append({
            **d,
            "performance_score": perf_score,
            "is_young_talent": d["age"] <= 24,
            "young_talent_score": yt_score,
            "young_talent_reason": yt_reason
        })
        
    return results

@router.get("/young-talent")
async def f1_young_talent():
    drivers = await list_f1_drivers()
    # Filter for youth and sort by potential
    yt = [d for d in drivers if d["is_young_talent"]]
    return sorted(yt, key=lambda x: x["young_talent_score"], reverse=True)