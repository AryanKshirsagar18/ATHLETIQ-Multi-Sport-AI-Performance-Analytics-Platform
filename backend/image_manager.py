import os
import json
import shutil
import tkinter as tk
from tkinter import ttk, filedialog, messagebox

# Paths setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_JSON = os.path.join(BASE_DIR, "app", "data", "player_images.json")
ASSETS_DIR = os.path.join(BASE_DIR, "..", "frontend", "src", "assets", "images")

os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
os.makedirs(ASSETS_DIR, exist_ok=True)

# Default placeholder
FALLBACK = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"

# Import players from existing processors
from app.integrations.cricsheet_client import cricsheet_processor
from app.integrations.football_data_client import football_client

cricket_players = cricsheet_processor.get_player_records()
football_players = football_client.get_top_scorers()

# Load existing assignments if present
if os.path.exists(OUTPUT_JSON):
    try:
        with open(OUTPUT_JSON, "r", encoding="utf-8") as f:
            image_mapping = json.load(f)
    except Exception:
        image_mapping = {}
else:
    image_mapping = {}

class ImageAssignerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("AthletiQ — Player Image Assigner")
        self.root.geometry("680x620")
        self.root.configure(bg="#0f111a")

        self.sport_mode = "Cricket"  # Default mode
        self.players = cricket_players
        self.index = 0

        # Header Title
        title = tk.Label(root, text="ATHLETIQ IMAGE ASSIGNER", font=("Helvetica", 16, "bold"), fg="#1d72fe", bg="#0f111a")
        title.pack(pady=12)

        # Sport Mode Toggle Selector
        toggle_frame = tk.Frame(root, bg="#0f111a")
        toggle_frame.pack(pady=5)
        
        mode_label = tk.Label(toggle_frame, text="Select Sport:", font=("Helvetica", 10, "bold"), fg="#9ca3af", bg="#0f111a")
        mode_label.grid(row=0, column=0, padx=6)

        self.sport_var = tk.StringVar(value="Cricket")
        self.sport_combo = ttk.Combobox(toggle_frame, textvariable=self.sport_var, values=["Cricket", "Football"], state="readonly", width=15)
        self.sport_combo.grid(row=0, column=1, padx=6)
        self.sport_combo.bind("<<ComboboxSelected>>", self.on_sport_change)

        # Player Details Card
        self.card = tk.Frame(root, bg="#1a1d29", padx=20, pady=16, relief="ridge", bd=1)
        self.card.pack(fill="x", padx=30, pady=10)

        self.name_label = tk.Label(self.card, text="", font=("Helvetica", 14, "bold"), fg="#ffffff", bg="#1a1d29")
        self.name_label.pack(anchor="w")

        self.meta_label = tk.Label(self.card, text="", font=("Helvetica", 10), fg="#9ca3af", bg="#1a1d29")
        self.meta_label.pack(anchor="w", pady=4)

        # Input Option 1: Direct Web Link
        input_frame = tk.Frame(root, bg="#0f111a")
        input_frame.pack(fill="x", padx=30, pady=12)

        url_title = tk.Label(input_frame, text="Option 1: Paste Direct Web Image URL", font=("Helvetica", 10, "bold"), fg="#e5e7eb", bg="#0f111a")
        url_title.pack(anchor="w", pady=(0, 4))

        self.url_entry = tk.Entry(input_frame, font=("Helvetica", 10), bg="#1f2433", fg="#ffffff", insertbackground="white", bd=1)
        self.url_entry.pack(fill="x", ipady=6)

        # Input Option 2: Local File Selector
        local_frame = tk.Frame(root, bg="#0f111a")
        local_frame.pack(fill="x", padx=30, pady=6)

        local_title = tk.Label(local_frame, text="Option 2: Pick Local Image from Computer", font=("Helvetica", 10, "bold"), fg="#e5e7eb", bg="#0f111a")
        local_title.pack(anchor="w", pady=(0, 4))

        browse_btn = tk.Button(local_frame, text="📁 Choose Local File...", command=self.browse_local_file, bg="#374151", fg="#ffffff", relief="flat", padx=10, pady=5)
        browse_btn.pack(anchor="w")

        # Current Link Display
        self.status_label = tk.Label(root, text="", font=("Helvetica", 9, "italic"), fg="#60a5fa", bg="#0f111a", wraplength=600)
        self.status_label.pack(pady=8)

        # Actions Panel
        action_frame = tk.Frame(root, bg="#0f111a")
        action_frame.pack(pady=15)

        save_btn = tk.Button(action_frame, text="✔ Save Image Link", font=("Helvetica", 10, "bold"), bg="#1d72fe", fg="white", relief="flat", padx=16, pady=6, command=self.save_current)
        save_btn.grid(row=0, column=0, padx=6)

        reset_btn = tk.Button(action_frame, text="✖ Reset to Placeholder", font=("Helvetica", 10), bg="#4b5563", fg="white", relief="flat", padx=12, pady=6, command=self.reset_placeholder)
        reset_btn.grid(row=0, column=1, padx=6)

        # Navigation Panel
        nav_frame = tk.Frame(root, bg="#0f111a")
        nav_frame.pack(side="bottom", pady=20)

        prev_btn = tk.Button(nav_frame, text="◀ Previous", width=12, command=self.prev_player, bg="#1f2433", fg="white", relief="flat", pady=4)
        prev_btn.grid(row=0, column=0, padx=8)

        self.progress_label = tk.Label(nav_frame, text="", font=("Helvetica", 10), fg="#9ca3af", bg="#0f111a")
        self.progress_label.grid(row=0, column=1, padx=12)

        next_btn = tk.Button(nav_frame, text="Next ▶", width=12, command=self.next_player, bg="#1f2433", fg="white", relief="flat", pady=4)
        next_btn.grid(row=0, column=2, padx=8)

        self.update_display()

    def on_sport_change(self, event):
        self.sport_mode = self.sport_var.get()
        if self.sport_mode == "Cricket":
            self.players = cricket_players
        else:
            self.players = football_players
        self.index = 0
        self.update_display()

    def current_player(self):
        return self.players[self.index]

    def update_display(self):
        p = self.current_player()
        self.name_label.config(text=p["name"])
        
        # Display team & role, adapting meta strings based on sport
        team_display = p["team"]
        role_display = p.get("role", "N/A")
        self.meta_label.config(text=f"Team: {team_display}  |  Role: {role_display}  |  Age: {p.get('age', 'N/A')}")
        
        assigned = image_mapping.get(p["id"], p.get("image", FALLBACK))
        self.url_entry.delete(0, tk.END)
        self.url_entry.insert(0, assigned)
        self.status_label.config(text=f"Current Assigned Image: {assigned}")
        self.progress_label.config(text=f"{self.index + 1} / {len(self.players)}")

    def browse_local_file(self):
        file_path = filedialog.askopenfilename(
            filetypes=[("Image Files", "*.png;*.jpg;*.jpeg;*.webp")]
        )
        if file_path:
            p = self.current_player()
            ext = os.path.splitext(file_path)[1]
            dest_name = f"{p['id']}{ext}"
            dest_path = os.path.join(ASSETS_DIR, dest_name)
            
            # Copy file to React assets
            shutil.copyfile(file_path, dest_path)
            
            # Relative path format for Vite/React
            asset_ref = f"/src/assets/images/{dest_name}"
            self.url_entry.delete(0, tk.END)
            self.url_entry.insert(0, asset_ref)
            self.save_current()

    def save_current(self):
        p = self.current_player()
        new_url = self.url_entry.get().strip()
        if not new_url:
            new_url = FALLBACK
        image_mapping[p["id"]] = new_url
        with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
            json.dump(image_mapping, f, indent=2)
        self.update_display()

    def reset_placeholder(self):
        self.url_entry.delete(0, tk.END)
        self.url_entry.insert(0, FALLBACK)
        self.save_current()

    def next_player(self):
        if self.index < len(self.players) - 1:
            self.index += 1
            self.update_display()

    def prev_player(self):
        if self.index > 0:
            self.index -= 1
            self.update_display()

if __name__ == "__main__":
    root = tk.Tk()
    app = ImageAssignerApp(root)
    root.mainloop()