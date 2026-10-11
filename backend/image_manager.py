import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MAPPING_FILE = os.path.join(BASE_DIR, "app", "data", "player_images.json")

ENTITIES = {
    "F1 Drivers": [
        ("f1_yt1", "Oscar Piastri"),
        ("f1_yt2", "Lando Norris"),
        ("f1_yt3", "Yuki Tsunoda"),
        ("f1_yt4", "Oliver Bearman"),
        ("f1_yt5", "Liam Lawson"),
        ("f1_yt6", "Franco Colapinto"),
        ("f1_yt7", "Kimi Antonelli"),
        ("f1_p1", "Max Verstappen"),
        ("f1_p2", "Charles Leclerc"),
        ("f1_p3", "Carlos Sainz"),
        ("f1_p4", "Lewis Hamilton"),
        ("f1_p5", "George Russell"),
        ("f1_p6", "Sergio Perez"),
        ("f1_p7", "Fernando Alonso"),
        ("f1_p8", "Alexander Albon"),
        ("f1_p9", "Pierre Gasly"),
        ("f1_p10", "Esteban Ocon"),
    ],
    "F1 Constructors": [
        ("f1_team_ferrari", "Scuderia Ferrari"),
        ("f1_team_redbull", "Red Bull Racing"),
        ("f1_team_mclaren", "McLaren"),
        ("f1_team_mercedes", "Mercedes-AMG"),
        ("f1_team_aston", "Aston Martin"),
        ("f1_team_williams", "Williams Racing"),
        ("f1_team_alpine", "Alpine"),
        ("f1_team_rb", "Visa Cash App RB"),
        ("f1_team_sauber", "Kick Sauber"),
        ("f1_team_haas", "Haas F1 Team"),
    ],
    "Cricket Teams": [
        ("cricket_team_mi", "Mumbai Indians"),
        ("cricket_team_csk", "Chennai Super Kings"),
        ("cricket_team_rcb", "Royal Challengers Bangalore"),
        ("cricket_team_kkr", "Kolkata Knight Riders"),
        ("cricket_team_srh", "Sunrisers Hyderabad"),
        ("cricket_team_dc", "Delhi Capitals"),
        ("cricket_team_rr", "Rajasthan Royals"),
        ("cricket_team_ind", "Team India"),
        ("cricket_team_aus", "Team Australia"),
        ("cricket_team_eng", "Team England"),
    ],
    "Football Clubs": [
        ("football_team_barca", "FC Barcelona"),
        ("football_team_real", "Real Madrid CF"),
        ("football_team_mancity", "Manchester City"),
        ("football_team_arsenal", "Arsenal FC"),
        ("football_team_bayern", "Bayern Munich"),
        ("football_team_psg", "Paris Saint-Germain"),
        ("football_team_liverpool", "Liverpool FC"),
        ("football_team_manutd", "Manchester United"),
        ("football_team_juve", "Juventus FC"),
        ("football_team_inter", "Inter Milan"),
    ],
}

def load_data():
    if os.path.exists(MAPPING_FILE):
        try:
            with open(MAPPING_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_data(data):
    os.makedirs(os.path.dirname(MAPPING_FILE), exist_ok=True)
    with open(MAPPING_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

class ImageManagerApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("AthletiQ - Multi-Sport Image Manager")
        self.geometry("720x520")
        self.configure(bg="#080a10")

        self.data = load_data()

        style = ttk.Style(self)
        style.theme_use("clam")
        style.configure("TLabel", background="#080a10", foreground="#ffffff", font=("Segoe UI", 10))
        style.configure("TCombobox", fieldbackground="#0d111b", background="#0d111b", foreground="#ffffff")
        style.configure("TEntry", fieldbackground="#0d111b", foreground="#ffffff")
        style.configure("TButton", font=("Segoe UI", 9, "bold"))

        header = tk.Label(self, text="AthletiQ Image Mapping Center", font=("Segoe UI", 16, "bold"), fg="#ffffff", bg="#080a10")
        header.pack(pady=14)

        frame = tk.Frame(self, bg="#0d111b", bd=1, relief="solid", padx=20, pady=20)
        frame.pack(fill="x", padx=30, pady=10)

        tk.Label(frame, text="Sport Category:", fg="#a0aec0", bg="#0d111b").grid(row=0, column=0, sticky="w", pady=6)
        self.category_var = tk.StringVar(value="F1 Drivers")
        self.cat_box = ttk.Combobox(frame, textvariable=self.category_var, values=list(ENTITIES.keys()), state="readonly", width=30)
        self.cat_box.grid(row=0, column=1, sticky="w", pady=6)
        self.cat_box.bind("<<ComboboxSelected>>", self.on_category_change)

        tk.Label(frame, text="Select Driver / Team:", fg="#a0aec0", bg="#0d111b").grid(row=1, column=0, sticky="w", pady=6)
        self.entity_var = tk.StringVar()
        self.entity_box = ttk.Combobox(frame, textvariable=self.entity_var, state="readonly", width=30)
        self.entity_box.grid(row=1, column=1, sticky="w", pady=6)
        self.entity_box.bind("<<ComboboxSelected>>", self.on_entity_select)

        tk.Label(frame, text="Image Path or Web URL:", fg="#a0aec0", bg="#0d111b").grid(row=2, column=0, sticky="w", pady=6)
        self.path_var = tk.StringVar()
        self.path_entry = tk.Entry(frame, textvariable=self.path_var, width=38, bg="#161b26", fg="#ffffff", insertbackground="#ffffff")
        self.path_entry.grid(row=2, column=1, sticky="w", pady=6)

        browse_btn = tk.Button(frame, text="Browse Local File", command=self.browse_file, bg="#1d72fe", fg="white", relief="flat", padx=8)
        browse_btn.grid(row=2, column=2, padx=10)

        save_btn = tk.Button(self, text="Save Image Mapping", command=self.save_mapping, bg="#00f59b", fg="#080a10", font=("Segoe UI", 11, "bold"), relief="flat", padx=16, pady=6)
        save_btn.pack(pady=12)

        tk.Label(self, text="Active Mappings (Stored in player_images.json):", font=("Segoe UI", 10, "bold"), fg="#ffffff", bg="#080a10").pack(anchor="w", padx=30, pady=(10, 4))
        self.listbox = tk.Listbox(self, bg="#0d111b", fg="#cbd5e1", selectbackground="#1d72fe", font=("Consolas", 9), height=10)
        self.listbox.pack(fill="both", expand=True, padx=30, pady=(0, 20))

        self.on_category_change()
        self.refresh_listbox()

    def on_category_change(self, event=None):
        cat = self.category_var.get()
        names = [f"{eid} - {name}" for eid, name in ENTITIES[cat]]
        self.entity_box["values"] = names
        if names:
            self.entity_box.current(0)
            self.on_entity_select()

    def on_entity_select(self, event=None):
        val = self.entity_var.get()
        if not val:
            return
        eid = val.split(" - ")[0]
        self.path_var.set(self.data.get(eid, ""))

    def browse_file(self):
        f = filedialog.askopenfilename(filetypes=[("Images", "*.jpg *.jpeg *.png *.webp *.svg")])
        if f:
            if "assets" in f:
                rel = "/src/assets/" + os.path.basename(f)
                self.path_var.set(rel)
            else:
                self.path_var.set(f)

    def save_mapping(self):
        val = self.entity_var.get()
        if not val:
            return
        eid = val.split(" - ")[0]
        path = self.path_var.get().strip()

        if path:
            self.data[eid] = path
        elif eid in self.data:
            del self.data[eid]

        save_data(self.data)
        self.refresh_listbox()
        messagebox.showinfo("Saved", f"Updated photo mapping for {eid}!")

    def refresh_listbox(self):
        self.listbox.delete(0, tk.END)
        for k, v in self.data.items():
            self.listbox.insert(tk.END, f"{k.ljust(22)} -> {v}")

if __name__ == "__main__":
    app = ImageManagerApp()
    app.mainloop()