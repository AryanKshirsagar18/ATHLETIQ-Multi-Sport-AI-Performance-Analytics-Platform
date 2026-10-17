import React, { useEffect, useState } from 'react';
import { fetchF1Drivers, fetchF1YoungTalent } from '../services/api';
import AthleteCard from '../components/AthleteCard';
import TeamCard from '../components/TeamCard';
import { Target, Activity, Shield, Map, Timer, MapPin, Flag } from 'lucide-react';
import f1Banner from '../assets/f1.jpg';

// Complete 2024 F1 Calendar Offline Data
const f1Calendar2024 = [
  { round: 1, country: "BHR", name: "Bahrain Grand Prix", circuit: "Bahrain International Circuit", length: "5.412", laps: 57, record: "1:31.447", s1: "28.451", s2: "39.102", s3: "22.894" },
  { round: 2, country: "KSA", name: "Saudi Arabian Grand Prix", circuit: "Jeddah Corniche Circuit", length: "6.174", laps: 50, record: "1:30.734", s1: "32.112", s2: "29.588", s3: "28.910" },
  { round: 3, country: "AUS", name: "Australian Grand Prix", circuit: "Albert Park Circuit", length: "5.278", laps: 58, record: "1:19.813", s1: "27.201", s2: "22.544", s3: "29.155" },
  { round: 4, country: "JPN", name: "Japanese Grand Prix", circuit: "Suzuka International Racing Course", length: "5.807", laps: 53, record: "1:30.983", s1: "31.222", s2: "40.111", s3: "18.665" },
  { round: 5, country: "CHN", name: "Chinese Grand Prix", circuit: "Shanghai International Circuit", length: "5.451", laps: 56, record: "1:32.238", s1: "25.110", s2: "28.774", s3: "38.102" },
  { round: 6, country: "USA", name: "Miami Grand Prix", circuit: "Miami International Autodrome", length: "5.412", laps: 57, record: "1:29.708", s1: "28.550", s2: "32.140", s3: "28.880" },
  { round: 7, country: "ITA", name: "Emilia Romagna Grand Prix", circuit: "Imola Circuit", length: "4.909", laps: 63, record: "1:15.484", s1: "24.112", s2: "26.885", s3: "24.230" },
  { round: 8, country: "MCO", name: "Monaco Grand Prix", circuit: "Circuit de Monaco", length: "3.337", laps: 78, record: "1:12.909", s1: "18.550", s2: "33.210", s3: "19.650" },
  { round: 9, country: "CAN", name: "Canadian Grand Prix", circuit: "Circuit Gilles Villeneuve", length: "4.361", laps: 70, record: "1:13.078", s1: "20.100", s2: "23.450", s3: "27.500" },
  { round: 10, country: "ESP", name: "Spanish Grand Prix", circuit: "Circuit de Barcelona-Catalunya", length: "4.657", laps: 66, record: "1:16.330", s1: "22.100", s2: "29.500", s3: "23.800" },
  { round: 11, country: "AUT", name: "Austrian Grand Prix", circuit: "Red Bull Ring", length: "4.318", laps: 71, record: "1:05.619", s1: "16.100", s2: "28.400", s3: "20.100" },
  { round: 12, country: "GBR", name: "British Grand Prix", circuit: "Silverstone Circuit", length: "5.891", laps: 52, record: "1:27.097", s1: "27.800", s2: "35.200", s3: "23.500" },
  { round: 13, country: "HUN", name: "Hungarian Grand Prix", circuit: "Hungaroring", length: "4.381", laps: 70, record: "1:16.627", s1: "28.100", s2: "27.300", s3: "20.800" },
  { round: 14, country: "BEL", name: "Belgian Grand Prix", circuit: "Circuit de Spa-Francorchamps", length: "7.004", laps: 44, record: "1:46.286", s1: "30.100", s2: "45.200", s3: "29.800" },
  { round: 15, country: "NLD", name: "Dutch Grand Prix", circuit: "Circuit Zandvoort", length: "4.259", laps: 72, record: "1:11.097", s1: "24.100", s2: "25.300", s3: "21.500" },
  { round: 16, country: "ITA", name: "Italian Grand Prix", circuit: "Monza Circuit", length: "5.793", laps: 53, record: "1:21.046", s1: "26.100", s2: "28.400", s3: "26.100" },
  { round: 17, country: "AZE", name: "Azerbaijan Grand Prix", circuit: "Baku City Circuit", length: "6.003", laps: 51, record: "1:43.009", s1: "35.100", s2: "41.200", s3: "25.800" },
  { round: 18, country: "SGP", name: "Singapore Grand Prix", circuit: "Marina Bay Street Circuit", length: "4.940", laps: 62, record: "1:35.867", s1: "27.100", s2: "38.200", s3: "29.800" },
  { round: 19, country: "USA", name: "United States Grand Prix", circuit: "Circuit of the Americas", length: "5.513", laps: 56, record: "1:36.169", s1: "25.100", s2: "38.200", s3: "31.800" },
  { round: 20, country: "MEX", name: "Mexico City Grand Prix", circuit: "Autódromo Hermanos Rodríguez", length: "4.304", laps: 71, record: "1:17.774", s1: "27.100", s2: "29.400", s3: "20.800" },
  { round: 21, country: "BRA", name: "São Paulo Grand Prix", circuit: "Interlagos Circuit", length: "4.309", laps: 71, record: "1:10.540", s1: "18.100", s2: "35.400", s3: "16.800" },
  { round: 22, country: "USA", name: "Las Vegas Grand Prix", circuit: "Las Vegas Strip Circuit", length: "6.201", laps: 50, record: "1:32.960", s1: "26.100", s2: "32.400", s3: "33.800" },
  { round: 23, country: "QAT", name: "Qatar Grand Prix", circuit: "Lusail International Circuit", length: "5.419", laps: 57, record: "1:24.319", s1: "24.100", s2: "29.400", s3: "29.800" },
  { round: 24, country: "UAE", name: "Abu Dhabi Grand Prix", circuit: "Yas Marina Circuit", length: "5.281", laps: 58, record: "1:26.103", s1: "17.100", s2: "37.400", s3: "30.800" }
];

export default function F1Dashboard() {
  const [drivers, setDrivers] = useState([]);
  const [youngTalent, setYoungTalent] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const [loading, setLoading] = useState(true);
  
  // State for the 2024 calendar selection
  const [selectedRound, setSelectedRound] = useState(0); 
  const currentTrack = f1Calendar2024[selectedRound];

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
        setDrivers(dRes?.data || dRes || []);
        setYoungTalent(ytRes?.data || ytRes || []);
        setImageMap(imgData || {});
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
              <div key={`yt-${yt.id || index}`} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
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
              <div key={d.id || index} className="animate-in zoom-in-95 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${(index % 9) * 50}ms` }}>
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

        {/* === UPDATED: 2024 Live Race Control & Circuit Telemetry === */}
        <section className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/5 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                <div className="p-3 bg-[#0d111b] rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(225,6,0,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#e10600]/10" />
                  <Map className="text-[#e10600] w-6 h-6 relative z-10" />
                </div>
                2024 Circuit Telemetry & Sector Data
              </h2>
              <p className="text-gray-500 text-xs font-mono tracking-widest uppercase mt-3 ml-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00f59b] rounded-full animate-pulse" /> Offline 2024 Calendar Loaded
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Circuit Selector & Display (Left Side) */}
            <div className="lg:col-span-2 glass-card bg-black/60 border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-inner flex flex-col min-h-[400px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#e10600]/10 blur-[100px] pointer-events-none" />
              
              {/* Scrollable Calendar Selector */}
              <div className="flex overflow-x-auto gap-2 pb-4 mb-6 border-b border-white/10 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full relative z-10">
                {f1Calendar2024.map((track, i) => (
                  <button 
                    key={track.round}
                    onClick={() => setSelectedRound(i)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase transition-all duration-300 border ${selectedRound === i ? 'bg-[#e10600] text-white border-[#e10600] shadow-[0_0_15px_rgba(225,6,0,0.4)]' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'}`}
                  >
                    R{track.round}: {track.country}
                  </button>
                ))}
              </div>

              {/* Selected Track Details HUD */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10 flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Flag className="w-4 h-4 text-[#e10600]" />
                    <span className="text-[#e10600] text-xs font-mono font-bold tracking-[0.2em] uppercase">Round {currentTrack.round}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">{currentTrack.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-mono tracking-wide">
                    <MapPin className="w-4 h-4" />
                    {currentTrack.circuit}
                  </div>
                </div>

                {/* Technical Specs Grid */}
                <div className="grid grid-cols-2 gap-4 w-full md:w-auto bg-black/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest mb-1">Circuit Length</span>
                    <span className="text-lg font-bold text-white">{currentTrack.length} <span className="text-xs text-gray-400">km</span></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest mb-1">Race Distance</span>
                    <span className="text-lg font-bold text-white">{currentTrack.laps} <span className="text-xs text-gray-400">Laps</span></span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-white/10 flex flex-col">
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest mb-1">Official Lap Record</span>
                    <span className="text-sm font-mono text-purple-400">{currentTrack.record}</span>
                  </div>
                </div>
              </div>

              {/* Abstract Telemetry Trace Visualization */}
              <div className="w-full h-24 mt-8 flex items-end gap-1 opacity-60">
                {Array.from({ length: 40 }).map((_, i) => {
                  // Generate a pseudo-random wave based on the track name length to make it unique per track
                  const seed = currentTrack.name.length;
                  const height = 20 + Math.abs(Math.sin((i + seed) * 0.3) * 60) + Math.abs(Math.cos(i * 0.1) * 20);
                  const isBraking = height < 40;
                  return (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-t-sm transition-all duration-700`}
                      style={{ 
                        height: `${height}%`, 
                        backgroundColor: isBraking ? '#e10600' : '#ffffff',
                        opacity: isBraking ? 0.8 : 0.2
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Live Timing Tower (Right Side) */}
            <div className="glass-card bg-black/60 border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-inner flex flex-col">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <Timer className="w-5 h-5 text-[#e10600]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Target Sector Times</h3>
              </div>
              
              <div className="space-y-4 flex-1">
                {[
                  { sector: "Sector 1", time: currentTrack.s1, status: "purple" },
                  { sector: "Sector 2", time: currentTrack.s2, status: "green" },
                  { sector: "Sector 3", time: currentTrack.s3, status: "yellow" }
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 transition-all duration-300 hover:bg-white/10">
                    <span className="text-xs text-gray-400 font-mono tracking-widest">{s.sector}</span>
                    <span className={`text-lg font-bold font-mono ${s.status === 'purple' ? 'text-purple-400' : s.status === 'green' ? 'text-[#00f59b]' : 'text-yellow-400'}`}>
                      {s.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                  Live Timing Status: <span className="text-[#00f59b]">Simulated</span>
                </span>
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
