import React, { useEffect, useState } from 'react';
import { fetchFootballScorers, fetchFootballYoungTalent } from '../services/api';
import AthleteCard from '../components/AthleteCard';
import TeamCard from '../components/TeamCard';
import { Target, Activity, Shield } from 'lucide-react';
import footballBanner from '../assets/football1.jpg';

export default function FootballDashboard() {
  const [players, setPlayers] = useState([]);
  const [youngTalent, setYoungTalent] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const [loading, setLoading] = useState(true);

  const footballTeams = [
    { id: "football_team_barca", name: "FC Barcelona", history: "Famous for the possession-based 'Tiki-Taka' playstyle.", keyPlayers: "Lionel Messi, Xavi, Iniesta", stats: { "UCL Titles": 5, League: 27, "Win %": "59%" } },
    { id: "football_team_real", name: "Real Madrid CF", history: "The kings of Europe with a record number of titles.", keyPlayers: "Cristiano Ronaldo, Zinedine Zidane", stats: { "UCL Titles": 14, League: 35, "Win %": "62%" } },
    { id: "football_team_mancity", name: "Manchester City", history: "Transformed into a modern powerhouse under Guardiola.", keyPlayers: "Kevin De Bruyne, Erling Haaland", stats: { "UCL Titles": 1, League: 9, "Win %": "55%" } },
    { id: "football_team_arsenal", name: "Arsenal FC", history: "Known for the 'Invincibles' season going unbeaten.", keyPlayers: "Thierry Henry, Bukayo Saka", stats: { "UCL Titles": 0, League: 13, "Win %": "47%" } },
    { id: "football_team_bayern", name: "Bayern Munich", history: "The undisputed giant of German football.", keyPlayers: "Thomas Müller, Franz Beckenbauer", stats: { "UCL Titles": 6, League: 33, "Win %": "61%" } },
    { id: "football_team_psg", name: "Paris Saint-Germain", history: "The dominant force in French football.", keyPlayers: "Kylian Mbappé, Neymar Jr", stats: { "UCL Titles": 0, League: 11, "Win %": "58%" } },
    { id: "football_team_liverpool", name: "Liverpool FC", history: "Defined by European nights and 'Gegenpressing'.", keyPlayers: "Steven Gerrard, Mohamed Salah", stats: { "UCL Titles": 6, League: 19, "Win %": "51%" } },
    { id: "football_team_manutd", name: "Manchester United", history: "The most successful club in English history.", keyPlayers: "Wayne Rooney, Ryan Giggs", stats: { "UCL Titles": 3, League: 20, "Win %": "52%" } },
    { id: "football_team_juve", name: "Juventus FC", history: "Known for tactical defensive mastery.", keyPlayers: "Alessandro Del Piero, Buffon", stats: { "UCL Titles": 2, League: 36, "Win %": "55%" } },
    { id: "football_team_inter", name: "Inter Milan", history: "Secured an unprecedented treble in 2010.", keyPlayers: "Javier Zanetti, Ronaldo (R9)", stats: { "UCL Titles": 3, League: 19, "Win %": "50%" } }
  ];

  useEffect(() => {
    Promise.all([
      fetchFootballScorers(), 
      fetchFootballYoungTalent(),
      fetch("https://athletiq-multi-sport-ai-performance-t4h1.onrender.com/api/images").then(res => res.json()).catch(() => ({}))
    ])
      .then(([pRes, ytRes, imgData]) => {
        setPlayers(pRes?.data || pRes || []);
        setYoungTalent(ytRes?.data || ytRes || []);
        setImageMap(imgData || {});
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-73px)] bg-[#080a10] flex flex-col items-center justify-center space-y-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-t-2 border-[#00f59b] animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-emerald-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="absolute inset-4 rounded-full border-b-2 border-white/20 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div className="text-[#00f59b] font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">
          Initializing Match Telemetry...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a10] relative overflow-hidden pb-12 font-sans flex flex-col">
      
      {/* 1. IMMERSIVE AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
        
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00f59b]/10 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Hero Banner Section */}
      <div className="relative w-full h-[45vh] md:h-[55vh] flex flex-col justify-end z-10 group overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img src={footballBanner} alt="Football Stadium" className="w-full h-full object-cover opacity-40 transform scale-105 group-hover:scale-110 transition-transform duration-[10000ms] grayscale-[40%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a10]/80 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto w-full px-6 pb-16 animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden mb-6">
            <div className="absolute inset-0 bg-[#00f59b]/20 opacity-50" />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f59b] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f59b]"></span>
            </span>
            <span className="text-xs font-mono tracking-[0.2em] text-gray-300 uppercase relative z-10">
              Match Analytics Engine
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-800 drop-shadow-2xl uppercase">
            FOOTBALL
            <br />
            <span className="text-5xl md:text-7xl bg-clip-text tracking-tight" style={{ backgroundImage: `linear-gradient(to right, #00f59b, #1d72fe)` }}>
              TELEMETRY
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24 mt-12 flex-1 w-full">
        
        {/* Next-Gen Prospects Radar */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                <div className="p-3 bg-[#0d111b] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,245,155,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#00f59b]/10" />
                  <Target className="text-[#00f59b] w-6 h-6 animate-pulse relative z-10" />
                </div>
                Next-Gen Prospects Radar
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youngTalent.slice(0, 6).map((yt, index) => (
              <div key={`yt-${yt.id || index}`} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                <AthleteCard 
                  name={yt.name} 
                  team={`${yt.team} | Age ${yt.age}`} 
                  metricLabel="Potential Score" 
                  metricValue={yt.young_talent_score} 
                  score={yt.young_talent_score} 
                  sportColor="#00f59b" 
                  imageSrc={imageMap[yt.id] || yt.image} 
                  badge="Elite Prospect" 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Global Intelligence Roster */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                <div className="p-3 bg-[#0d111b] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,245,155,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#00f59b]/10" />
                  <Activity className="text-[#00f59b] w-6 h-6 relative z-10" />
                </div>
                Global Intelligence Roster
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((p, index) => (
              <div key={p.id || index} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${(index % 9) * 50}ms` }}>
                <AthleteCard 
                  name={p.name} 
                  team={`${p.team} | ${p.nationality}`} 
                  metricLabel="Goal Contributions" 
                  metricValue={p.goals + p.assists} 
                  score={p.performance_score} 
                  sportColor="#00f59b" 
                  imageSrc={imageMap[p.id] || p.image} 
                  badge={`${p.playedMatches} Apps`} 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Club Profiles Section */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                <div className="p-3 bg-[#0d111b] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,245,155,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#00f59b]/10" />
                  <Shield className="text-[#00f59b] w-6 h-6 relative z-10" />
                </div>
                Club Profiles
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {footballTeams.map((team, index) => (
              <div key={team.id} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${(index % 4) * 100}ms` }}>
                <TeamCard 
                  name={team.name} 
                  history={team.history} 
                  keyPlayers={team.keyPlayers} 
                  imageSrc={imageMap[team.id]} 
                  themeColor="#00f59b" 
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
