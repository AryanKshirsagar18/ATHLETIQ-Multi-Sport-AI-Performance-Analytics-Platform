import React, { useEffect, useState } from 'react';
import { fetchF1Drivers, fetchF1YoungTalent } from '../services/api';
import AthleteCard from '../components/AthleteCard';
import TeamCard from '../components/TeamCard';
import { Target, Activity, Shield, Map, Timer, Navigation } from 'lucide-react';
import f1Banner from '../assets/f1.jpg';

export default function F1Dashboard() {
  const [drivers, setDrivers] = useState([]);
  const [youngTalent, setYoungTalent] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const [loading, setLoading] = useState(true);

  const f1Teams = [
    { id: "f1_team_ferrari", name: "Scuderia Ferrari", history: "The oldest and most successful Formula 1 team, competing in every world championship since 1950.", keyPlayers: "Charles Leclerc, Carlos Sainz | Michael Schumacher", stats: { Titles: 16, Wins: 243, Podiums: 807 } },
    { id: "f1_team_redbull", name: "Red Bull Racing", history: "Founded in 2005, known for aerodynamic dominance.", keyPlayers: "Max Verstappen, Sergio Perez | Sebastian Vettel", stats: { Titles: 6, Wins: 113, Podiums: 264 } },
    { id: "f1_team_mclaren", name: "McLaren", history: "Founded by Bruce McLaren in 1963. The second oldest active team.", keyPlayers: "Lando Norris, Oscar Piastri | Ayrton Senna", stats: { Titles: 8, Wins: 183, Podiums: 501 } },
    { id: "f1_team_mercedes", name: "Mercedes-AMG", history: "Dominated the turbo-hybrid era from 2014-2021.", keyPlayers: "Lewis Hamilton, George Russell | Nico Rosberg", stats: { Titles: 8, Wins: 125, Podiums: 289 } },
    { id: "f1_team_aston", name: "Aston Martin", history: "Heavily investing in infrastructure to challenge the top grid.", keyPlayers: "Fernando Alonso, Lance Stroll", stats: { Titles: 0, Wins: 0, Podiums: 9 } },
    { id: "f1_team_williams", name: "Williams Racing", history: "A legendary independent British team currently rebuilding.", keyPlayers: "Alex Albon, Franco Colapinto | Nigel Mansell", stats: { Titles: 9, Wins: 114, Podiums: 313 } },
    { id: "f1_team_alpine", name: "Alpine", history: "The Renault works team rebranded in 2021.", keyPlayers: "Pierre Gasly, Esteban Ocon | Fernando Alonso", stats: { Titles: 2, Wins: 36, Podiums: 106 } },
    { id: "f1_team_rb", name: "Visa Cash App RB", history: "Historically serving as a junior squad to develop young talent.", keyPlayers: "Yuki Tsunoda, Liam Lawson", stats: { Titles: 0, Wins: 2, Podiums: 5 } },
    { id: "f1_team_sauber", name: "Kick Sauber", history: "A historic Swiss independent team transitioning into Audi.", keyPlayers: "Valtteri Bottas, Zhou Guanyu", stats: { Titles: 0, Wins: 1, Podiums: 27 } },
    { id: "f1_team_haas", name: "Haas F1 Team", history: "The only American team on the grid.", keyPlayers: "Nico Hulkenberg, Kevin Magnussen", stats: { Titles: 0, Wins: 0, Podiums: 0 } }
  ];

  useEffect(() => {
    Promise.all([
      fetchF1Drivers(), 
      fetchF1YoungTalent(),
      fetch("https://athletiq-multi-sport-ai-performance-t4h1.onrender.com/api/images").then(res => res.json()).catch(() => ({}))
    ])
      .then(([dRes, ytRes, imgData]) => {
        setDrivers(dRes.data);
        setYoungTalent(ytRes.data);
        setImageMap(imgData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-73px)] bg-[#080a10] flex flex-col items-center justify-center space-y-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-t-2 border-[#e10600] animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-orange-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="absolute inset-4 rounded-full border-b-2 border-white/20 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div className="text-[#e10600] font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">
          Initializing Grid Telemetry...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a10] relative overflow-hidden pb-12 font-sans flex flex-col">
      
      {/* 1. IMMERSIVE AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
        
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#e10600]/10 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-600/5 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Hero Banner Section */}
      <div className="relative w-full h-[45vh] md:h-[55vh] flex flex-col justify-end z-10 group overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img src={f1Banner} alt="Formula 1 Track" className="w-full h-full object-cover opacity-40 transform scale-105 group-hover:scale-110 transition-transform duration-[10000ms] grayscale-[30%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a10]/80 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto w-full px-6 pb-16 animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden mb-6">
            <div className="absolute inset-0 bg-[#e10600]/20 opacity-50" />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e10600] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e10600]"></span>
            </span>
            <span className="text-xs font-mono tracking-[0.2em] text-gray-300 uppercase relative z-10">
              Grid Analytics Engine
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-800 drop-shadow-2xl uppercase">
            FORMULA 1
            <br />
            <span className="text-5xl md:text-7xl bg-clip-text tracking-tight" style={{ backgroundImage: `linear-gradient(to right, #e10600, #ff8c00)` }}>
              TELEMETRY
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24 mt-12 flex-1 w-full">
        
        {/* Rookie & Prospect Radar */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                <div className="p-3 bg-[#0d111b] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(225,6,0,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#e10600]/10" />
                  <Target className="text-[#e10600] w-6 h-6 animate-pulse relative z-10" />
                </div>
                Academy Prospect Radar
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
                  sportColor="#e10600" 
                  imageSrc={imageMap[yt.id] || yt.image} 
                  badge="Elite Prospect" 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Driver Intelligence Roster */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                <div className="p-3 bg-[#0d111b] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(225,6,0,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#e10600]/10" />
                  <Activity className="text-[#e10600] w-6 h-6 relative z-10" />
                </div>
                Driver Intelligence Roster
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map((d, index) => (
              <div key={d.id} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${(index % 9) * 50}ms` }}>
                <AthleteCard 
                  name={d.name} 
                  team={d.team} 
                  metricLabel="Championship Points" 
                  metricValue={d.points} 
                  score={d.performance_score} 
                  sportColor="#e10600" 
                  imageSrc={imageMap[d.id] || d.image} 
                  badge="Grid Roster" 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Live Race Control & Circuit Telemetry */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                <div className="p-3 bg-[#0d111b] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(225,6,0,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#e10600]/10" />
                  <Map className="text-[#e10600] w-6 h-6 relative z-10" />
                </div>
                Circuit Telemetry & Sector Data
              </h2>
              <p className="text-gray-500 text-xs font-mono tracking-widest uppercase mt-3 ml-2">Live Race Control Dashboard</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Circuit Map Display */}
            <div className="lg:col-span-2 glass-card bg-black/60 border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-inner flex flex-col justify-center items-center min-h-[300px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#e10600]/10 via-transparent to-transparent opacity-50" />
              <Navigation className="w-16 h-16 text-white/20 mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-white mb-2">Track Visualization Offline</h3>
              <p className="text-gray-500 text-sm font-mono text-center max-w-md">GPS routing and sector telemetry models are currently awaiting live session data.</p>
            </div>

            {/* Live Timing Tower */}
            <div className="glass-card bg-black/60 border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-inner">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <Timer className="w-5 h-5 text-[#e10600]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Sector Times</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { sector: "Sector 1", time: "28.451", status: "purple" },
                  { sector: "Sector 2", time: "39.102", status: "green" },
                  { sector: "Sector 3", time: "22.894", status: "yellow" }
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-400 font-mono">{s.sector}</span>
                    <span className={`text-sm font-bold font-mono ${s.status === 'purple' ? 'text-purple-400' : s.status === 'green' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {s.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Constructor Profiles Section */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-1000 fill-mode-both pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                <div className="p-3 bg-[#0d111b] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(225,6,0,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#e10600]/10" />
                  <Shield className="text-[#e10600] w-6 h-6 relative z-10" />
                </div>
                Constructor Profiles
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {f1Teams.map((team, index) => (
              <div key={team.id} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${(index % 4) * 100}ms` }}>
                <TeamCard 
                  name={team.name} 
                  history={team.history} 
                  keyPlayers={team.keyPlayers} 
                  imageSrc={imageMap[team.id]} 
                  themeColor="#e10600" 
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