import os
import json

class F1Client:
    def __init__(self):
        self.base_dir = os.path.dirname(os.path.abspath(__file__))
        self.mapping_path = os.path.join(self.base_dir, "..", "data", "player_images.json")

    def get_drivers(self):
        placeholder = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
        
        # Load custom image assignments if they exist
        custom_images = {}
        if os.path.exists(self.mapping_path):
            try:
                with open(self.mapping_path, "r", encoding="utf-8") as f:
                    custom_images = json.load(f)
            except Exception:
                custom_images = {}

        raw_data = [
            # --- ROOKIES & YOUNG TALENTS (Age 24 & Under) ---
            {"id": "f1_yt1", "name": "Oscar Piastri", "team": "McLaren", "age": 23, "points": 212},
            {"id": "f1_yt2", "name": "Lando Norris", "team": "McLaren", "age": 24, "points": 279},
            {"id": "f1_yt3", "name": "Yuki Tsunoda", "team": "RB", "age": 24, "points": 22},
            {"id": "f1_yt4", "name": "Oliver Bearman", "team": "Ferrari", "age": 19, "points": 6},
            {"id": "f1_yt5", "name": "Liam Lawson", "team": "RB", "age": 22, "points": 2},
            {"id": "f1_yt6", "name": "Franco Colapinto", "team": "Williams", "age": 21, "points": 4},
            {"id": "f1_yt7", "name": "Kimi Antonelli", "team": "Mercedes", "age": 18, "points": 0},
            
            # --- ESTABLISHED DRIVERS (Age 25+) ---
            {"id": "f1_p1", "name": "Max Verstappen", "team": "Red Bull Racing", "age": 26, "points": 331},
            {"id": "f1_p2", "name": "Charles Leclerc", "team": "Ferrari", "age": 26, "points": 245},
            {"id": "f1_p3", "name": "Carlos Sainz", "team": "Ferrari", "age": 29, "points": 190},
            {"id": "f1_p4", "name": "Lewis Hamilton", "team": "Mercedes", "age": 39, "points": 166},
            {"id": "f1_p5", "name": "George Russell", "team": "Mercedes", "age": 26, "points": 143},
            {"id": "f1_p6", "name": "Sergio Perez", "team": "Red Bull Racing", "age": 34, "points": 143},
            {"id": "f1_p7", "name": "Fernando Alonso", "team": "Aston Martin", "age": 43, "points": 58},
            {"id": "f1_p8", "name": "Alexander Albon", "team": "Williams", "age": 28, "points": 12},
            {"id": "f1_p9", "name": "Pierre Gasly", "team": "Alpine", "age": 28, "points": 8},
            {"id": "f1_p10", "name": "Esteban Ocon", "team": "Alpine", "age": 27, "points": 5}
        ]

        # Inject Image overrides
        for driver in raw_data:
            driver["image"] = custom_images.get(driver["id"], placeholder)

        return raw_data

f1_client = F1Client()