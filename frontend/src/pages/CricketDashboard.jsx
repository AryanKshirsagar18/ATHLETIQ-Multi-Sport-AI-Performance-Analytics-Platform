import React, { useEffect, useState } from 'react';
import { fetchCricketPlayers, fetchCricketYoungTalent } from '../services/api';
import AthleteCard from '../components/AthleteCard';
import TeamCard from '../components/TeamCard';
import { Target, Zap, Activity, Shield } from 'lucide-react';
import cricketBanner from '../assets/cricket.jpg';

export default function CricketDashboard() {
  const [players, setPlayers] = useState([]);
  const [youngTalent, setYoungTalent] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const [loading, setLoading] = useState(true);

  const cricketTeams = [
    { id: "cricket_team_mi", name: "Mumbai Indians", history: "The most successful IPL franchise known for aggressive play.", keyPlayers: "Rohit Sharma, Jasprit Bumrah", stats: { Titles: 5, "Win %": "55.4%", Matches: 247 } },
    { id: "cricket_team_csk", name: "Chennai Super Kings", history: "Known for absolute consistency and reaching the most playoffs.", keyPlayers: "MS Dhoni, Ravindra Jadeja", stats: { Titles: 5, "Win %": "58.9%", Matches: 225 } },
    { id: "cricket_team_rcb", name: "Royal Challengers Bangalore", history: "Known for star-studded batting lineups and passionate fans.", keyPlayers: "Virat Kohli, AB de Villiers", stats: { Titles: 0, "Win %": "47.6%", Matches: 241 } },
    { id: "cricket_team_kkr", name: "Kolkata Knight Riders", history: "Two-time champions known for mystery spinners.", keyPlayers: "Sunil Narine, Andre Russell", stats: { Titles: 2, "Win %": "51.5%", Matches: 236 } },
    { id: "cricket_team_srh", name: "Sunrisers Hyderabad", history: "2016 Champions defending low totals with elite bowling.", keyPlayers: "Pat Cummins, Bhuvneshwar Kumar", stats: { Titles: 1, "Win %": "48.3%", Matches: 166 } },
    { id: "cricket_team_dc", name: "Delhi Capitals", history: "An aggressive young squad searching for their first title.", keyPlayers: "Rishabh Pant, Axar Patel", stats: { Titles: 0, "Win %": "44.5%", Matches: 238 } },
    { id: "cricket_team_rr", name: "Rajasthan Royals", history: "The inaugural champions utilizing analytical Moneyball.", keyPlayers: "Sanju Samson, Jos Buttler", stats: { Titles: 1, "Win %": "50.2%", Matches: 206 } },
    { id: "cricket_team_ind", name: "Team India", history: "The financial powerhouse of world cricket.", keyPlayers: "Sachin Tendulkar, Virat Kohli", stats: { "WC Titles": 4, "Win %": "62.5%", Matches: 1045 } },
    { id: "cricket_team_aus", name: "Team Australia", history: "The most dominant international team in history.", keyPlayers: "Ricky Ponting, Shane Warne", stats: { "WC Titles": 6, "Win %": "60.1%", Matches: 978 } },
    { id: "cricket_team_eng", name: "Team England", history: "Inventors of the game. Revolutionized white-ball cricket.", keyPlayers: "Joe Root, Ben Stokes", stats: { "WC Titles": 2, "Win %": "50.8%", Matches: 785 } }
  ];

  useEffect(() => {
    Promise.all([
      fetchCricketPlayers(), 
      fetchCricketYoungTalent(),
      fetch("http://localhost:8000/api/images").then(res => res.json()).catch(() => ({}))
    ])
      .then(([pRes, ytRes, imgData]) => {
        setPlayers(pRes.data);
        setYoungTalent(ytRes.data);
        setImageMap(imgData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-73px)] bg-[#080a10] flex flex-col items-center justify-center space-y-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-t-2 border-[#1d72fe] animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-cyan-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="absolute inset-4 rounded-full border-b-2 border-white/20 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div className="text-[#1d72fe] font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">
          Initializing Cricket Telemetry...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a10] relative overflow-hidden pb-12 font-sans flex flex-col">
      
      {/* 1. IMMERSIVE AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
        
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#1d72fe]/10 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/5 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Hero Banner Section */}
      <div className="relative w-full h-[45vh] md:h-[55vh] flex flex-col justify-end z-10 group overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img src={cricketBanner} alt="Cricket Stadium" className="w-full h-full object-cover opacity-40 transform scale-105 group-hover:scale-110 transition-transform duration-[10000ms] grayscale-[40%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a10]/80 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto w-full px-6 pb-16 animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden mb-6">
            <div className="absolute inset-0 bg-[#1d72fe]/20 opacity-50" />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1d72fe] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1d72fe]"></span>
            </span>
            <span className="text-xs font-mono tracking-[0.2em] text-gray-300 uppercase relative z-10">
              Cricsheet Analytics Engine
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-800 drop-shadow-2xl uppercase">
            CRICKET
            <br />
            <span className="text-5xl md:text-7xl bg-clip-text tracking-tight" style={{ backgroundImage: `linear-gradient(to right, #1d72fe, #00f59b)` }}>
              TELEMETRY
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24 mt-12 flex-1 w-full">
        
        {/* Young Talent Section */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                <div className="p-3 bg-[#0d111b] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(29,114,254,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#1d72fe]/10" />
                  <Target className="text-[#1d72fe] w-6 h-6 animate-pulse relative z-10" />
                </div>
                Elite Young Talent Radar
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youngTalent.slice(0, 6).map((yt, index) => (
              <div key={`yt-${yt.id}`} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                <AthleteCard 
                  name={yt.name} 
                  team={`${yt.team} | Age ${yt.age}`} 
                  metricLabel="Potential Score" 
                  metricValue={yt.young_talent_score} 
                  score={yt.young_talent_score} 
                  sportColor="#1d72fe" 
                  imageSrc={imageMap[yt.id] || yt.image} 
                  badge="Elite Prospect" 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence Roster Section */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                <div className="p-3 bg-[#0d111b] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(29,114,254,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#1d72fe]/10" />
                  <Activity className="text-[#1d72fe] w-6 h-6 relative z-10" />
                </div>
                Intelligence Roster
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((p, index) => (
              <div key={p.id} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${(index % 9) * 50}ms` }}>
                <AthleteCard 
                  name={p.name} 
                  team={p.team} 
                  metricLabel={p.role === 'Bowler' ? 'Bowling Avg' : 'Batting Avg'} 
                  metricValue={p.role === 'Bowler' ? p.bowling_avg : p.batting_avg} 
                  score={p.performance_score} 
                  sportColor="#1d72fe" 
                  imageSrc={imageMap[p.id] || p.image} 
                  badge={p.role === 'Bowler' ? `${p.wickets} Wkts` : `${p.runs} Runs`} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Team Profiles Section */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                <div className="p-3 bg-[#0d111b] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(29,114,254,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#1d72fe]/10" />
                  <Shield className="text-[#1d72fe] w-6 h-6 relative z-10" />
                </div>
                Franchise Telemetry
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cricketTeams.map((team, index) => (
              <div key={team.id} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${(index % 4) * 100}ms` }}>
                <TeamCard 
                  name={team.name} 
                  history={team.history} 
                  keyPlayers={team.keyPlayers} 
                  imageSrc={imageMap[team.id]} 
                  themeColor="#1d72fe" 
                  stats={team.stats}
                />
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* COPYRIGHT FOOTER */}
      <div className="w-full text-center pb-6 pt-24 relative z-10 mt-auto">
        <p className="text-[9px] text-gray-600 font-mono tracking-[0.2em] uppercase">
          &copy; 2026 Aryan Kshirsagar. All rights reserved.
        </p>
      </div>

    </div>
  );
}