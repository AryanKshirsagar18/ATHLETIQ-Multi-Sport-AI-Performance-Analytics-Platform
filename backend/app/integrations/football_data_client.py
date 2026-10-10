import os
import json

class FootballDataClient:
    def __init__(self):
        self.base_dir = os.path.dirname(os.path.abspath(__file__))
        self.mapping_path = os.path.join(self.base_dir, "..", "data", "player_images.json")

    def get_top_scorers(self):
        placeholder = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
        
        # Try to load saved assignments
        custom_images = {}
        if os.path.exists(self.mapping_path):
            try:
                with open(self.mapping_path, "r", encoding="utf-8") as f:
                    custom_images = json.load(f)
            except Exception:
                custom_images = {}

        raw_data = [
            # Young Talents (Age 24 & Under)
            {"id": "fb_yt1", "name": "Lamine Yamal", "team": "FC Barcelona", "nationality": "Spain", "age": 19, "role": "Winger", "playedMatches": 38, "goals": 14, "assists": 18},
            {"id": "fb_yt2", "name": "Jude Bellingham", "team": "Real Madrid", "nationality": "England", "age": 23, "role": "Midfielder", "playedMatches": 42, "goals": 24, "assists": 15},
            {"id": "fb_yt3", "name": "Jamal Musiala", "team": "Bayern Munich", "nationality": "Germany", "age": 23, "role": "Attacking Midfielder", "playedMatches": 40, "goals": 18, "assists": 14},
            {"id": "fb_yt4", "name": "Endrick", "team": "Real Madrid", "nationality": "Brazil", "age": 20, "role": "Striker", "playedMatches": 28, "goals": 12, "assists": 4},
            {"id": "fb_yt5", "name": "Bukayo Saka", "team": "Arsenal", "nationality": "England", "age": 24, "role": "Winger", "playedMatches": 45, "goals": 21, "assists": 16},
            {"id": "fb_yt6", "name": "Arda Güler", "team": "Real Madrid", "nationality": "Turkey", "age": 21, "role": "Midfielder", "playedMatches": 25, "goals": 9, "assists": 7},
            {"id": "fb_yt7", "name": "Florian Wirtz", "team": "Bayer Leverkusen", "nationality": "Germany", "age": 23, "role": "Midfielder", "playedMatches": 43, "goals": 19, "assists": 22},
            {"id": "fb_yt8", "name": "Pedri", "team": "FC Barcelona", "nationality": "Spain", "age": 23, "role": "Midfielder", "playedMatches": 35, "goals": 6, "assists": 12},
            {"id": "fb_yt9", "name": "Alejandro Garnacho", "team": "Manchester United", "nationality": "Argentina", "age": 22, "role": "Winger", "playedMatches": 41, "goals": 15, "assists": 9},
            {"id": "fb_yt10", "name": "Gavi", "team": "FC Barcelona", "nationality": "Spain", "age": 21, "role": "Midfielder", "playedMatches": 32, "goals": 5, "assists": 8},

            # Established Superstars (Age 25+)
            {"id": "fb_p1", "name": "Lionel Messi", "team": "Inter Miami", "nationality": "Argentina", "age": 39, "role": "Forward", "playedMatches": 30, "goals": 22, "assists": 19},
            {"id": "fb_p2", "name": "Cristiano Ronaldo", "team": "Al Nassr", "nationality": "Portugal", "age": 41, "role": "Striker", "playedMatches": 38, "goals": 35, "assists": 10},
            {"id": "fb_p3", "name": "Kylian Mbappé", "team": "Real Madrid", "nationality": "France", "age": 27, "role": "Forward", "playedMatches": 45, "goals": 41, "assists": 15},
            {"id": "fb_p4", "name": "Erling Haaland", "team": "Manchester City", "nationality": "Norway", "age": 26, "role": "Striker", "playedMatches": 42, "goals": 38, "assists": 8},
            {"id": "fb_p5", "name": "Vinícius Júnior", "team": "Real Madrid", "nationality": "Brazil", "age": 25, "role": "Winger", "playedMatches": 44, "goals": 26, "assists": 18},
            {"id": "fb_p6", "name": "Kevin De Bruyne", "team": "Manchester City", "nationality": "Belgium", "age": 35, "role": "Midfielder", "playedMatches": 36, "goals": 8, "assists": 22},
            {"id": "fb_p7", "name": "Mohamed Salah", "team": "Liverpool", "nationality": "Egypt", "age": 34, "role": "Winger", "playedMatches": 43, "goals": 25, "assists": 14},
            {"id": "fb_p8", "name": "Harry Kane", "team": "Bayern Munich", "nationality": "England", "age": 32, "role": "Striker", "playedMatches": 45, "goals": 40, "assists": 12},
            {"id": "fb_p9", "name": "Robert Lewandowski", "team": "FC Barcelona", "nationality": "Poland", "age": 37, "role": "Striker", "playedMatches": 40, "goals": 24, "assists": 7},
            {"id": "fb_p10", "name": "Phil Foden", "team": "Manchester City", "nationality": "England", "age": 26, "role": "Midfielder", "playedMatches": 46, "goals": 22, "assists": 14}
        ]

        flags = {
            "Spain": "🇪🇸", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Germany": "🇩🇪", "Brazil": "🇧🇷",
            "Turkey": "🇹🇷", "Argentina": "🇦🇷", "Portugal": "🇵🇹", "France": "🇫🇷",
            "Norway": "🇳🇴", "Belgium": "🇧🇪", "Egypt": "🇪🇬", "Poland": "🇵🇱"
        }

        # Inject Flags & Image overrides
        for player in raw_data:
            nat = player["nationality"]
            if nat in flags:
                player["nationality"] = f"{nat} {flags[nat]}"
            
            # Link image overrides or keep default placeholders
            player["image"] = custom_images.get(player["id"], placeholder)

        return raw_data

football_client = FootballDataClient()