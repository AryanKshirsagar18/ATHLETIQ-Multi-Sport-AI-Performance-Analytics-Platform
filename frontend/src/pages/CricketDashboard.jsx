import React, { useEffect, useState } from 'react';
import { fetchCricketPlayers, fetchCricketYoungTalent } from '../services/api';
import AthleteCard from '../components/AthleteCard';
import TeamCard from '../components/TeamCard';
import { Target, Zap, Activity, Shield } from 'lucide-react';
import cricketBanner from '../assets/cricket.jpg';

export default function CricketDashboard() {
  const [players, setPlayers] = useState([]);
  const [youngTalent, setYoungTalent] = useState([]);
  const [loading, setLoading] = useState(true);

  const cricketTeams = [
    { name: "Mumbai Indians", history: "The most successful IPL franchise with 5 titles. Known for scouting and aggressive play.", keyPlayers: "Rohit Sharma, Jasprit Bumrah, Suryakumar Yadav", imageSrc: "/src/assets/mi.jpg" },
    { name: "Chennai Super Kings", history: "Known for absolute consistency, reaching the most playoffs under MS Dhoni's captaincy.", keyPlayers: "MS Dhoni, Ravindra Jadeja, Ruturaj Gaikwad", imageSrc: "/src/assets/csk.jpg" },
    { name: "Royal Challengers Bangalore", history: "A highly popular franchise known for star-studded batting lineups and passionate fans.", keyPlayers: "Virat Kohli, AB de Villiers, Chris Gayle, Faf du Plessis", imageSrc: "/src/assets/rcb.jpg" },
    { name: "Kolkata Knight Riders", history: "Two-time champions known for their mystery spinners and aggressive top-order.", keyPlayers: "Sunil Narine, Andre Russell, Shreyas Iyer", imageSrc: "/src/assets/kkr.jpg" },
    { name: "Sunrisers Hyderabad", history: "2016 Champions traditionally known for defending low totals with elite bowling.", keyPlayers: "Pat Cummins, Travis Head, Bhuvneshwar Kumar", imageSrc: "/src/assets/srh.jpg" },
    { name: "Delhi Capitals", history: "Rebranded from Daredevils, an aggressive young squad searching for their first title.", keyPlayers: "Rishabh Pant, Axar Patel, David Warner", imageSrc: "/src/assets/dc.jpg" },
    { name: "Rajasthan Royals", history: "The inaugural 2008 champions, utilizing a highly analytical Moneyball approach.", keyPlayers: "Sanju Samson, Jos Buttler, Yashasvi Jaiswal", imageSrc: "/src/assets/rr.jpg" },
    { name: "Team India", history: "2-time ODI World Cup and 2-time T20 World Cup champions. The financial powerhouse of world cricket.", keyPlayers: "Sachin Tendulkar, Virat Kohli, MS Dhoni", imageSrc: "/src/assets/india.jpg" },
    { name: "Team Australia", history: "The most dominant international team in history with 6 ODI World Cup titles.", keyPlayers: "Ricky Ponting, Shane Warne, Pat Cummins", imageSrc: "/src/assets/aus.jpg" },
    { name: "Team England", history: "Inventors of the game. Revolutionized white-ball cricket post-2015 to win the 2019 World Cup.", keyPlayers: "Joe Root, Ben Stokes, Jos Buttler", imageSrc: "/src/assets/eng.jpg" }
  ];

  useEffect(() => {
    Promise.all([fetchCricketPlayers(), fetchCricketYoungTalent()])
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
          <div className="absolute inset-0 rounded-full border-t-2 border-cricket animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-blue-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        <div className="text-cricket font-mono text-sm tracking-widest uppercase animate-pulse">Initializing Telemetry...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a10] relative overflow-hidden pb-20">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-cricket/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full h-[45vh] md:h-[55vh] flex flex-col justify-end z-10 group overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img src={cricketBanner} alt="Cricket Stadium" className="w-full h-full object-cover opacity-50 transform scale-105 group-hover:scale-110 transition-transform duration-[10000ms]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a10]/80 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto w-full px-6 pb-12 animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cricket/10 border border-cricket/30 text-[11px] font-mono tracking-widest text-cricket uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 bg-cricket rounded-full animate-pulse" />
            Cricsheet Analytics Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl mb-4 leading-tight">
            CRICKET <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cricket via-blue-400 to-cyan-300">TELEMETRY</span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl border-l-2 border-cricket/50 pl-4 font-light leading-relaxed">
            Advanced ball-by-ball analysis, historical form evaluation, and predictive performance routing for the global elite.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20 mt-8">
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-4">
                <div className="p-2.5 bg-[#0d111b] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(29,114,254,0.15)]"><Target className="text-cricket w-6 h-6 animate-pulse" /></div>
                Elite Young Talent Radar
              </h2>
              <p className="text-sm text-gray-400 mt-2 ml-14">Tracking high-ceiling prospects under 25</p>
            </div>
            <div className="flex gap-4 text-xs font-mono text-gray-500 bg-[#0d111b] px-4 py-2 rounded-lg border border-white/5">
              <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-cricket" /> Form Evaluated</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-blue-400" /> Live Data</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youngTalent.slice(0, 6).map((yt, index) => (
              <div key={`yt-${yt.id}`} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                <AthleteCard name={yt.name} team={`${yt.team} • Age ${yt.age}`} metricLabel="Potential Score" metricValue={yt.young_talent_score} score={yt.young_talent_score} sportColor="#1d72fe" imageSrc={yt.image} badge="Elite Prospect" description={yt.young_talent_reason} />
              </div>
            ))}
          </div>
        </section>

        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-4">
                <div className="p-2.5 bg-[#0d111b] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(29,114,254,0.15)]"><Shield className="text-cricket w-6 h-6" /></div>
                Intelligence Roster
              </h2>
              <p className="text-sm text-gray-400 mt-2 ml-14">Comprehensive performance indexing across the global pool</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((p, index) => (
              <div key={p.id} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${(index % 9) * 50}ms` }}>
                <AthleteCard name={p.name} team={p.team} metricLabel={p.role === 'Bowler' ? 'Bowling Avg' : 'Batting Avg'} metricValue={p.role === 'Bowler' ? p.bowling_avg : p.batting_avg} score={p.performance_score} sportColor="#1d72fe" imageSrc={p.image} badge={p.role === 'Bowler' ? `${p.wickets} Wkts` : `${p.runs} Runs`} />
              </div>
            ))}
          </div>
        </section>

        {/* Cricket Teams Profile Section */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both pt-8 border-t border-white/10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-4 mb-8">
            <div className="p-2.5 bg-[#0d111b] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(29,114,254,0.15)]"><Shield className="text-cricket w-6 h-6" /></div>
            Team Profiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cricketTeams.map((team, idx) => (
              <TeamCard key={idx} name={team.name} history={team.history} keyPlayers={team.keyPlayers} imageSrc={team.imageSrc} themeColor="#1d72fe" />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}