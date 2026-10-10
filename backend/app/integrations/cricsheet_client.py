import os
import json

class CricsheetProcessor:
    def __init__(self):
        self.base_dir = os.path.dirname(os.path.abspath(__file__))
        self.mapping_path = os.path.join(self.base_dir, "..", "data", "player_images.json")

    def get_player_records(self):
        placeholder = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"

        # Load dynamic image mappings if generated
        custom_images = {}
        if os.path.exists(self.mapping_path):
            try:
                with open(self.mapping_path, "r", encoding="utf-8") as f:
                    custom_images = json.load(f)
            except Exception:
                custom_images = {}

        raw_data = [
            # Top Young Talents
            {"id": "yt0_1", "name": "Vaibhav Suryavanshi", "team": "India", "age": 15, "role": "Batsman", "matches": 10, "runs": 550, "batting_avg": 55.0, "strike_rate": 145.2, "recent_scores": [101, 45, 12, 88, 55]},
            {"id": "yt0_2", "name": "Ayush Mhatre", "team": "India", "age": 19, "role": "Batsman", "matches": 15, "runs": 660, "batting_avg": 47.8, "strike_rate": 135.5, "recent_scores": [94, 32, 176, 12, 55]},
            {"id": "yt0_3", "name": "Tilak Varma", "team": "India", "age": 21, "role": "Batsman", "matches": 18, "runs": 520, "batting_avg": 37.5, "strike_rate": 140.2, "recent_scores": [55, 12, 45, 88, 22]},
            
            # Additional Roster Entries
            {"id": "yt1", "name": "Yashasvi Jaiswal", "team": "India", "age": 22, "role": "Batsman", "matches": 14, "runs": 1407, "batting_avg": 64.0, "strike_rate": 82.5, "recent_scores": [80, 57, 10, 179, 72]},
            {"id": "yt2", "name": "Shubman Gill", "team": "India", "age": 24, "role": "Batsman", "matches": 45, "runs": 1492, "batting_avg": 45.5, "strike_rate": 89.1, "recent_scores": [110, 91, 38, 52, 23]},
            {"id": "yt3", "name": "Rachin Ravindra", "team": "New Zealand", "age": 24, "role": "All-Rounder", "matches": 25, "runs": 850, "batting_avg": 40.6, "strike_rate": 108.4, "wickets": 18, "bowling_avg": 35.2, "recent_scores": [134, 39, 45, 68, 12]},
            {"id": "yt4", "name": "Cameron Green", "team": "Australia", "age": 24, "role": "All-Rounder", "matches": 38, "runs": 1150, "batting_avg": 38.2, "strike_rate": 115.6, "wickets": 32, "bowling_avg": 34.1, "recent_scores": [77, 12, 45, 100, 8]},
            {"id": "yt5", "name": "Gerald Coetzee", "team": "South Africa", "age": 23, "role": "Bowler", "matches": 18, "wickets": 35, "bowling_avg": 22.4, "economy": 6.5, "strike_rate": 19.8, "recent_wickets": [3, 2, 4, 1, 2]},
            {"id": "yt9", "name": "Harry Brook", "team": "England", "age": 24, "role": "Batsman", "matches": 30, "runs": 1580, "batting_avg": 52.6, "strike_rate": 95.4, "recent_scores": [89, 12, 105, 45, 77]},
            {"id": "yt16", "name": "Shaheen Afridi", "team": "Pakistan", "age": 24, "role": "Bowler", "matches": 65, "wickets": 115, "bowling_avg": 23.5, "economy": 5.6, "strike_rate": 25.1, "recent_wickets": [3, 2, 5, 1, 1]},
            {"id": "p1", "name": "Virat Kohli", "team": "India", "age": 35, "role": "Batsman", "matches": 295, "runs": 13906, "batting_avg": 58.6, "strike_rate": 93.5, "recent_scores": [117, 54, 88, 12, 76]},
            {"id": "p2", "name": "Rohit Sharma", "team": "India", "age": 36, "role": "Batsman", "matches": 262, "runs": 10709, "batting_avg": 49.1, "strike_rate": 91.9, "recent_scores": [131, 86, 48, 47, 87]},
            {"id": "p3", "name": "Jasprit Bumrah", "team": "India", "age": 30, "role": "Bowler", "matches": 89, "wickets": 149, "bowling_avg": 23.5, "economy": 4.6, "strike_rate": 30.2, "recent_wickets": [2, 4, 1, 3, 2]},
            {"id": "p15", "name": "Pat Cummins", "team": "Australia", "age": 31, "role": "Bowler", "matches": 88, "wickets": 141, "bowling_avg": 28.6, "economy": 5.3, "strike_rate": 32.1, "recent_wickets": [3, 2, 1, 4, 2]},
            {"id": "p46", "name": "Babar Azam", "team": "Pakistan", "age": 29, "role": "Batsman", "matches": 117, "runs": 5729, "batting_avg": 56.7, "strike_rate": 88.7, "recent_scores": [74, 50, 9, 66, 30]},
            {"id": "p60", "name": "Rashid Khan", "team": "Afghanistan", "age": 25, "role": "Bowler", "matches": 103, "wickets": 183, "bowling_avg": 20.5, "economy": 4.2, "strike_rate": 28.5, "recent_wickets": [2, 3, 1, 2, 2]}
        ]

        flags = {
            "India": "🇮🇳", "Australia": "🇦🇺", "New Zealand": "🇳🇿",
            "South Africa": "🇿🇦", "Sri Lanka": "🇱🇰", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
            "Afghanistan": "🇦🇫", "Pakistan": "🇵🇰", "Bangladesh": "🇧🇩",
            "West Indies": "🌴"
        }

        for player in raw_data:
            base_team = player["team"]
            if base_team in flags:
                player["team"] = f"{base_team} {flags[base_team]}"
            
            # Prioritize custom image assignment, then fallback
            player["image"] = custom_images.get(player["id"], placeholder)

        return raw_data

cricsheet_processor = CricsheetProcessor()