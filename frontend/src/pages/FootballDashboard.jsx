import React, { useEffect, useState } from 'react';
import { fetchFootballScorers, fetchFootballYoungTalent } from '../services/api';
import AthleteCard from '../components/AthleteCard';
import TeamCard from '../components/TeamCard';
import { Target, Zap, Activity, Shield } from 'lucide-react';

// IMPORT THE LOCAL BANNER IMAGE
import footballBanner from '../assets/football.jpg';

export default function FootballDashboard() {
  const [players, setPlayers] = useState([]);
  const [youngTalent, setYoungTalent] = useState([]);
  const [loading, setLoading] = useState(true);

  const footballTeams = [
    { name: "FC Barcelona", history: "A symbol of Catalan culture, famous for the possession-based 'Tiki-Taka' playstyle.", keyPlayers: "Lionel Messi, Xavi, Iniesta, Lamine Yamal", imageSrc: "/src/assets/barcelona.jpg" },
    { name: "Real Madrid CF", history: "The kings of Europe with a record number of Champions League titles. Defined by the 'Galácticos' era.", keyPlayers: "Cristiano Ronaldo, Zinedine Zidane, Jude Bellingham", imageSrc: "/src/assets/realmadrid.jpg" },
    { name: "Manchester City", history: "Transformed into a modern powerhouse under Pep Guardiola, securing a historic treble.", keyPlayers: "Kevin De Bruyne, Erling Haaland, Sergio Agüero", imageSrc: "/src/assets/mancity.jpg" },
    { name: "Arsenal FC", history: "Historic London club known for the 2003-04 'Invincibles' season going unbeaten in the Premier League.", keyPlayers: "Thierry Henry, Dennis Bergkamp, Bukayo Saka", imageSrc: "/src/assets/arsenal.jpg" },
    { name: "Bayern Munich", history: "The undisputed giant of German football, famous for efficiency and relentless attacking.", keyPlayers: "Franz Beckenbauer, Thomas Müller, Jamal Musiala", imageSrc: "/src/assets/bayern.jpg" },
    { name: "Paris Saint-Germain", history: "The dominant force in French football, known for assembling star-studded attacking trios.", keyPlayers: "Kylian Mbappé, Neymar Jr, Ronaldinho", imageSrc: "/src/assets/psg.jpg" },
    { name: "Liverpool FC", history: "Defined by famous European nights at Anfield and the intense 'Gegenpressing' style.", keyPlayers: "Steven Gerrard, Mohamed Salah, Kenny Dalglish", imageSrc: "/src/assets/liverpool.jpg" },
    { name: "Manchester United", history: "The most successful club in English domestic history, built globally under Sir Alex Ferguson.", keyPlayers: "Wayne Rooney, Ryan Giggs, Alejandro Garnacho", imageSrc: "/src/assets/manutd.jpg" },
    { name: "Juventus FC", history: "The most decorated club in Italy, known for tactical defensive mastery and the 'Old Lady' moniker.", keyPlayers: "Alessandro Del Piero, Gianluigi Buffon, Michel Platini", imageSrc: "/src/assets/juventus.jpg" },
    { name: "Inter Milan", history: "Historic Italian club that secured an unprecedented treble in 2010 under Jose Mourinho.", keyPlayers: "Javier Zanetti, Ronaldo (R9), Lautaro Martínez", imageSrc: "/src/assets/inter.jpg" }
  ];

  useEffect(() => {
    Promise.all([fetchFootballScorers(), fetchFootballYoungTalent()])
      .then(([pRes, ytRes]) => {
        setPlayers(pRes.data);
        setYoungTalent(ytRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080a10] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-football animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-emerald-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        <div className="text-football font-mono text-sm tracking-widest uppercase animate-pulse">Initializing Match Data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a10] relative overflow-hidden pb-20">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-football/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Cinematic Hero Banner */}
      <div className="relative w-full h-[45vh] md:h-[55vh] flex flex-col justify-end z-10 group overflow-hidden">
        {/* Banner Image with slow zoom effect */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            src={footballBanner} 
            alt="Football Stadium" 
            className="w-full h-full object-cover opacity-50 transform scale-105 group-hover:scale-110 transition-transform duration-[10000ms]"
          />
        </div>
        
        {/* Deep gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a10]/80 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto w-full px-6 pb-12 animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-football/10 border border-football/30 text-[11px] font-mono tracking-widest text-football uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 bg-football rounded-full animate-pulse" />
            Match Analytics Engine
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl mb-4 leading-tight">
            FOOTBALL <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-football via-emerald-400 to-cyan-300">
              TELEMETRY
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-300 max-w-2xl border-l-2 border-football/50 pl-4 font-light leading-relaxed">
            Goal contributions, chance creation, and scoring telemetry for the world's elite players and clubs.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20 mt-8">
        
        {/* Next-Gen Prospects Radar Section */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-4">
                <div className="p-2.5 bg-[#0d111b] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(0,245,155,0.15)]">
                  <Target className="text-football w-6 h-6 animate-pulse" />
                </div>
                Next-Gen Prospects Radar
              </h2>
              <p className="text-sm text-gray-400 mt-2 ml-14">Tracking high-ceiling prospects and academy graduates</p>
            </div>
            
            <div className="flex gap-4 text-xs font-mono text-gray-500 bg-[#0d111b] px-4 py-2 rounded-lg border border-white/5">
              <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-football" /> Form Evaluated</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-emerald-400" /> Live Data</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youngTalent.slice(0, 6).map((yt, index) => (
              <div key={`yt-${yt.id}`} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                <AthleteCard
                  name={yt.name}
                  team={`${yt.team} • Age ${yt.age}`}
                  metricLabel="Potential Score"
                  metricValue={yt.young_talent_score}
                  score={yt.young_talent_score}
                  sportColor="#00f59b"
                  imageSrc={yt.image}
                  badge="Elite Prospect"
                  description={`Age ${yt.age} elite prospect with ${yt.goals} goals and ${yt.assists} assists in ${yt.playedMatches} matches.`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Global Intelligence Roster Section */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-4">
                <div className="p-2.5 bg-[#0d111b] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(0,245,155,0.15)]">
                  <Shield className="text-football w-6 h-6" />
                </div>
                Global Intelligence Roster
              </h2>
              <p className="text-sm text-gray-400 mt-2 ml-14">Comprehensive performance indexing across top leagues</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((p, index) => (
              <div key={p.id} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${(index % 9) * 50}ms` }}>
                <AthleteCard
                  name={p.name}
                  team={`${p.team} • ${p.nationality}`}
                  metricLabel="Goal Contributions"
                  metricValue={p.goals + p.assists}
                  score={p.performance_score}
                  sportColor="#00f59b"
                  imageSrc={p.image}
                  badge={`${p.playedMatches} Apps`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Football Teams Profile Section */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both pt-8 border-t border-white/10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-4 mb-8">
            <div className="p-2.5 bg-[#0d111b] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(0,245,155,0.15)]">
              <Shield className="text-football w-6 h-6" />
            </div>
            Club Profiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {footballTeams.map((team, idx) => (
              <TeamCard 
                key={idx} 
                name={team.name} 
                history={team.history} 
                keyPlayers={team.keyPlayers} 
                imageSrc={team.imageSrc} 
                themeColor="#00f59b" 
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}