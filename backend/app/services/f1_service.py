import httpx

async def get_f1_roster():
    # Fetches real Jolpica F1 data
    async with httpx.AsyncClient(timeout=10.0) as client:
        res = await client.get("https://api.jolpi.ca/ergast/f1/current/driverStandings.json")
        data = res.json()
        standings = data["MRData"]["StandingsTable"]["StandingsLists"][0]["DriverStandings"]
        
        roster = []
        for item in standings:
            driver = item.get("Driver", {})
            roster.append({
                "id": driver.get("driverId"),
                "name": f"{driver.get('givenName')} {driver.get('familyName')}",
                "nationality": driver.get("nationality"),
                "team": item.get("Constructors", [{}])[0].get("name", "N/A"),
                "points": float(item.get("points", 0)),
                "position": int(item.get("position", 20)),
                "performance_score": round(max(40.0, 95.0 - (int(item.get("position", 20)) * 2)), 1)
            })
        return roster