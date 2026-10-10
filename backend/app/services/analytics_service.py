def compute_cricket_performance_score(avg: float, sr: float, consistency: float = 80.0) -> float:
    """Calculates a 0-100 score based on batting/bowling average and strike rate."""
    score = (avg * 0.7) + (sr * 0.3) * (consistency / 100)
    return round(min(98.8, max(45.0, score)), 1)

def compute_football_performance_score(goals: int, assists: int, matches: int) -> float:
    """Calculates a 0-100 score based on goal contributions per match."""
    if matches <= 0:
        return 50.0
    contributions_per_match = (goals + assists) / matches
    # Baseline benchmark: ~1.0 contribution/match yields an elite ~92+ score
    raw_score = 45.0 + (contributions_per_match * 48.0)
    return round(min(99.0, max(50.0, raw_score)), 1)

def calculate_young_talent_score(age: int, base_perf: float, form_index: float) -> tuple[float, str]:
    """Calculates potential for athletes 25 and under."""
    if age > 25:
        return 0.0, "Athlete is above eligibility cutoff age (25)."
    
    age_potential = (26 - age) * 4.0
    yt_score = round(min(98.5, (base_perf * 0.5) + (age_potential * 0.3) + (form_index * 0.2)), 1)
    rationale = f"Age {age} with demonstrated baseline rating of {base_perf} and high upward potential."
    
    return yt_score, rationale