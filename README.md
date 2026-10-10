# AthletiQ 🏆
**"From Raw Data to Actionable Insights."**

AthletiQ is a web-based, multi-sport AI performance analytics platform that combines data from Formula 1, Cricket, and Football into one unified system. Developed as a TYCS SEM V academic project, AthletiQ goes beyond basic scoreboards by transforming raw sports data into actionable statistics, historical trends, performance scores, machine-learning predictions, and AI-based insights[cite: 1].

## 👥 Project Team
*   **Aryan Rajesh Kshirsagar** (Roll No: 50, Batch B2)[cite: 1]
*   **Yash Prakash Kalamkar** (Roll No: 39, Batch B2)[cite: 1]

---

## 🚀 Features
*   **Multi-Sport Dashboards:** Dedicated, interactive analytics environments for Formula 1, Cricket, and Football[cite: 1].
*   **AthletiQ Performance Score:** A custom 0–100 weighted metric analyzing consistency, recent form, and event impact across sports[cite: 1].
*   **Athlete Comparison:** Visual comparative analysis using relevant statistics[cite: 1].
*   **Young Talent Radar:** Data-driven discovery algorithm highlighting high-potential athletes under the age of 25.
*   **Predictive ML Layer:** Integrated Scikit-Learn pipelines to evaluate probability-based predictions (e.g., Top-5 finishes, 50+ runs, goal probabilities)[cite: 1].
*   **AI Insights:** Natural language generation module explaining complex analytical results in simple language[cite: 1].

---

## 💻 Technology Stack
**Frontend:**
*   React.js, Vite, JavaScript, HTML5, CSS3[cite: 1]
*   Tailwind CSS, DaisyUI (Dark theme UI components)[cite: 1]
*   Recharts / Plotly (Data visualization)[cite: 1]

**Backend & Database:**
*   Python, FastAPI (REST APIs)[cite: 1]
*   MongoDB Atlas[cite: 1]
*   Pandas (Data Processing)[cite: 1]
*   Scikit-learn (Machine Learning)[cite: 1]

---

## 📡 Data Sources
*   **Formula 1:** [Jolpica F1 API](https://github.com/jolpica/jolpica-f1) (Standings, drivers, race results, lap data)
*   **Football:** [Football-data.org API](https://www.football-data.org/) (Competitions, scorers, match stats)
*   **Cricket:** [Cricsheet](https://cricsheet.org/) (Structured JSON datasets for historical match analysis)

---

## ⚙️ Local Setup & Installation

### Prerequisites
*   Node.js (v18+)
*   Python (3.10+)
*   MongoDB Atlas account

### 1. Clone & Configure Environment
```bash
git clone <your-repo-url>
cd AthletiQ
