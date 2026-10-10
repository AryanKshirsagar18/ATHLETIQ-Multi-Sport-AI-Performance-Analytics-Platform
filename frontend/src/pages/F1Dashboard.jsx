import React, { useEffect, useState } from 'react';
import { fetchF1Drivers, fetchF1YoungTalent } from '../services/api';
import AthleteCard from '../components/AthleteCard';
import TeamCard from '../components/TeamCard';
import { Target, Zap, Activity, Shield } from 'lucide-react';
import f1Banner from '../assets/f1.jpg';

export default function F1Dashboard() {
  const [drivers, setDrivers] = useState([]);
  const [youngTalent, setYoungTalent] = useState([]);
  const [loading, setLoading] = useState(true);

  const f1Teams = [
    { name: "Scuderia Ferrari", history: "The oldest and most successful Formula 1 team, competing in every world championship since 1950.", keyPlayers: "Charles Leclerc, Carlos Sainz (Current) | Michael Schumacher, Niki Lauda (Legends)", imageSrc: "/src/assets/ferrari.jpg" },
    { name: "Red Bull Racing", history: "Founded in 2005, known for aerodynamic dominance and winning multiple consecutive championships with Vettel and Verstappen.", keyPlayers: "Max Verstappen, Sergio Perez (Current) | Sebastian Vettel, Mark Webber (Legends)", imageSrc: "/src/assets/redbull.jpg" },
    { name: "McLaren", history: "Founded by Bruce McLaren in 1963. The second oldest active team with a rich history of legendary rivalries.", keyPlayers: "Lando Norris, Oscar Piastri (Current) | Ayrton Senna, Alain Prost, Lewis Hamilton (Legends)", imageSrc: "/src/assets/mclaren.jpg" },
    { name: "Mercedes-AMG Petronas", history: "Dominated the turbo-hybrid era from 2014-2021, securing 8 consecutive Constructors' Championships.", keyPlayers: "Lewis Hamilton, George Russell, Kimi Antonelli (Current/Future) | Nico Rosberg, Juan Manuel Fangio (Legends)", imageSrc: "/src/assets/mercedes.jpg" },
    { name: "Aston Martin", history: "Rebranded from Racing Point in 2021, heavily investing in infrastructure to challenge the top grid.", keyPlayers: "Fernando Alonso, Lance Stroll", imageSrc: "/src/assets/aston-martin.jpg" },
    { name: "Williams Racing", history: "A legendary independent British team with 9 Constructors' Championships, currently in a rebuilding phase.", keyPlayers: "Alex Albon, Franco Colapinto (Current) | Nigel Mansell, Damon Hill (Legends)", imageSrc: "/src/assets/williams.jpg" },
    { name: "Alpine", history: "The Renault works team rebranded in 2021. Known for producing both engine and chassis in-house.", keyPlayers: "Pierre Gasly, Esteban Ocon", imageSrc: "/src/assets/alpine.jpg" },
    { name: "Visa Cash App RB", history: "The sister team to Red Bull Racing, historically serving as a junior team to develop young talent.", keyPlayers: "Yuki Tsunoda, Liam Lawson", imageSrc: "/src/assets/rb.jpg" },
    { name: "Stake F1 Team Kick Sauber", history: "A historic Swiss independent team transitioning into the Audi works team for 2026.", keyPlayers: "Valtteri Bottas, Zhou Guanyu", imageSrc: "/src/assets/sauber.jpg" },
    { name: "Haas F1 Team", history: "The only American team on the grid, known for their unique Ferrari-aligned technical partnership.", keyPlayers: "Nico Hulkenberg, Kevin Magnussen", imageSrc: "/src/assets/haas.jpg" }
  ];

  useEffect(() => {
    Promise.all([fetchF1Drivers(), fetchF1YoungTalent()])
      .then(([dRes, ytRes]) => {
        setDrivers(dRes.data);
        setYoungTalent(ytRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080a10] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-f1 animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-orange-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        <div className="text-f1 font-mono text-sm tracking-widest uppercase animate-pulse">Initializing Grid...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a10] relative overflow-hidden pb-20">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-f1/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full h-[45vh] md:h-[55vh] flex flex-col justify-end z-10 group overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img src={f1Banner} alt="Formula 1 Track" className="w-full h-full object-cover opacity-50 transform scale-105 group-hover:scale-110 transition-transform duration-[10000ms]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a10]/80 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto w-full px-6 pb-12 animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-f1/10 border border-f1/30 text-[11px] font-mono tracking-widest text-f1 uppercase mb-6 backdrop-blur-md">
            <span className="w-2 h-2 bg-f1 rounded-full animate-pulse" />
            Grid Analytics Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl mb-4 leading-tight">
            FORMULA 1 <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-f1 via-orange-500 to-yellow-400">TELEMETRY</span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl border-l-2 border-f1/50 pl-4 font-light leading-relaxed">
            Advanced sector analysis, pace telemetry, and predictive podium routing for the grid's fastest drivers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20 mt-8">
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-4">
                <div className="p-2.5 bg-[#0d111b] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(225,6,0,0.15)]"><Target className="text-f1 w-6 h-6 animate-pulse" /></div>
                Rookie & Prospect Radar
              </h2>
              <p className="text-sm text-gray-400 mt-2 ml-14">Tracking high-ceiling drivers and academy prospects</p>
            </div>
            <div className="flex gap-4 text-xs font-mono text-gray-500 bg-[#0d111b] px-4 py-2 rounded-lg border border-white/5">
              <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-f1" /> Pace Evaluated</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-orange-500" /> Live Data</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youngTalent.slice(0, 6).map((yt, index) => (
              <div key={`yt-${yt.id}`} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                <AthleteCard name={yt.name} team={`${yt.team} • Age ${yt.age}`} metricLabel="Potential Score" metricValue={yt.young_talent_score} score={yt.young_talent_score} sportColor="#e10600" imageSrc={yt.image} badge="Academy Prospect" description={yt.young_talent_reason || `Future star to watch from ${yt.team}.`} />
              </div>
            ))}
          </div>
        </section>

        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-both">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-4">
                <div className="p-2.5 bg-[#0d111b] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(225,6,0,0.15)]"><Shield className="text-f1 w-6 h-6" /></div>
                Driver Intelligence Roster
              </h2>
              <p className="text-sm text-gray-400 mt-2 ml-14">Comprehensive grid performance indexing</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map((d, index) => (
              <div key={d.id} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${(index % 9) * 50}ms` }}>
                <AthleteCard name={d.name} team={d.team} metricLabel="Points" metricValue={d.points} score={d.performance_score} sportColor="#e10600" imageSrc={d.image} badge="Grid Roster" />
              </div>
            ))}
          </div>
        </section>

        {/* F1 Teams Profile Section */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both pt-8 border-t border-white/10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-4 mb-8">
            <div className="p-2.5 bg-[#0d111b] rounded-xl border border-white/10 shadow-[0_0_15px_rgba(225,6,0,0.15)]"><Shield className="text-f1 w-6 h-6" /></div>
            Constructor Profiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {f1Teams.map((team, idx) => (
              <TeamCard key={idx} name={team.name} history={team.history} keyPlayers={team.keyPlayers} imageSrc={team.imageSrc} themeColor="#e10600" />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}