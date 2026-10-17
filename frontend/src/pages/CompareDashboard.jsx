import React, { useState, useEffect, useMemo } from 'react';
import { fetchF1Drivers, fetchCricketPlayers, fetchFootballScorers } from '../services/api';
import PerformanceChart from '../components/PerformanceChart';
import { Swords, Activity, Users, User, Zap, ChevronDown } from 'lucide-react';

// --- CUSTOM CINEMATIC DROPDOWN COMPONENT ---
const CinematicDropdown = ({ value, onChange, options, themeColor, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(p => String(p.id || p.driver_id || p._id) === String(value));

  return (
    <div className="relative w-full z-50">
      {/* Invisible overlay to close dropdown when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
      
      {/* Dropdown Trigger Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 flex justify-between items-center cursor-pointer transition-all duration-300 relative z-50 group"
        style={{ boxShadow: isOpen ? `0 0 20px ${themeColor}20` : 'none', borderColor: isOpen ? themeColor + '50' : '' }}
      >
        {align === 'right' && <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
        
        <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
          <span className="text-white text-sm font-bold tracking-wide group-hover:text-gray-200 transition-colors">
            {selectedOption ? selectedOption.name : 'Select Profile...'}
          </span>
          {selectedOption && (
            <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest mt-0.5" style={{ color: isOpen ? themeColor : '' }}>
              {selectedOption.team}
            </span>
          )}
        </div>

        {align === 'left' && <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
      </div>

      {/* Expanded Menu Options */}
      {isOpen && (
        <div className="absolute top-full mt-3 w-full max-h-72 overflow-y-auto z-50 bg-[#0d111b]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt) => {
            const optId = String(opt.id || opt.driver_id || opt._id);
            const isSelected = optId === String(value);
            return (
              <div
                key={optId}
                onClick={() => { onChange(optId); setIsOpen(false); }}
                className={`p-4 cursor-pointer transition-all duration-200 flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} ${isSelected ? 'bg-white/5' : 'hover:bg-white/5'}`}
                style={isSelected ? { 
                  borderLeft: align === 'left' ? `2px solid ${themeColor}` : 'none', 
                  borderRight: align === 'right' ? `2px solid ${themeColor}` : 'none',
                  backgroundColor: themeColor + '10'
                } : {}}
              >
                <span className={`text-sm font-bold tracking-wide ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                  {opt.name}
                </span>
                <span className="text-[9px] text-gray-600 font-mono uppercase tracking-widest mt-1">
                  {opt.team}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function CompareDashboard() {
  const [sport, setSport] = useState('f1');
  const [mode, setMode] = useState('athletes'); 
  const [entities, setEntities] = useState([]);
  const [imageMap, setImageMap] = useState({});
  const [entityAId, setEntityAId] = useState('');
  const [entityBId, setEntityBId] = useState('');
  const [aiInsight, setAiInsight] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Built-in Team Data 
  const teamDataStore = {
    f1: [
      { id: "f1_team_ferrari", name: "Scuderia Ferrari", team: "F1", score: 16, val1: 243, val2: 807 },
      { id: "f1_team_redbull", name: "Red Bull Racing", team: "F1", score: 6, val1: 113, val2: 264 },
      { id: "f1_team_mclaren", name: "McLaren", team: "F1", score: 8, val1: 183, val2: 501 },
      { id: "f1_team_mercedes", name: "Mercedes-AMG", team: "F1", score: 8, val1: 125, val2: 289 },
      { id: "f1_team_aston", name: "Aston Martin", team: "F1", score: 0, val1: 0, val2: 9 },
      { id: "f1_team_williams", name: "Williams Racing", team: "F1", score: 9, val1: 114, val2: 313 },
      { id: "f1_team_alpine", name: "Alpine", team: "F1", score: 2, val1: 36, val2: 106 },
      { id: "f1_team_rb", name: "Visa Cash App RB", team: "F1", score: 0, val1: 2, val2: 5 },
      { id: "f1_team_sauber", name: "Kick Sauber", team: "F1", score: 0, val1: 1, val2: 27 },
      { id: "f1_team_haas", name: "Haas F1 Team", team: "F1", score: 0, val1: 0, val2: 0 }
    ],
    cricket: [
      { id: "cricket_team_mi", name: "Mumbai Indians", team: "IPL", score: 5, val1: 55, val2: 247 },
      { id: "cricket_team_csk", name: "Chennai Super Kings", team: "IPL", score: 5, val1: 59, val2: 225 },
      { id: "cricket_team_rcb", name: "RC Bangalore", team: "IPL", score: 0, val1: 48, val2: 241 },
      { id: "cricket_team_kkr", name: "Kolkata Knight Riders", team: "IPL", score: 2, val1: 52, val2: 236 },
      { id: "cricket_team_srh", name: "Sunrisers Hyderabad", team: "IPL", score: 1, val1: 48, val2: 166 },
      { id: "cricket_team_dc", name: "Delhi Capitals", team: "IPL", score: 0, val1: 45, val2: 238 },
      { id: "cricket_team_rr", name: "Rajasthan Royals", team: "IPL", score: 1, val1: 50, val2: 206 },
      { id: "cricket_team_ind", name: "Team India", team: "INT", score: 4, val1: 63, val2: 1045 },
      { id: "cricket_team_aus", name: "Team Australia", team: "INT", score: 6, val1: 60, val2: 978 },
      { id: "cricket_team_eng", name: "Team England", team: "INT", score: 2, val1: 51, val2: 785 }
    ],
    football: [
      { id: "football_team_barca", name: "FC Barcelona", team: "La Liga", score: 5, val1: 27, val2: 59 },
      { id: "football_team_real", name: "Real Madrid CF", team: "La Liga", score: 14, val1: 35, val2: 62 },
      { id: "football_team_mancity", name: "Manchester City", team: "EPL", score: 1, val1: 9, val2: 55 },
      { id: "football_team_arsenal", name: "Arsenal FC", team: "EPL", score: 0, val1: 13, val2: 47 },
      { id: "football_team_bayern", name: "Bayern Munich", team: "Bundesliga", score: 6, val1: 33, val2: 61 },
      { id: "football_team_psg", name: "Paris Saint-Germain", team: "Ligue 1", score: 0, val1: 11, val2: 58 },
      { id: "football_team_liverpool", name: "Liverpool FC", team: "EPL", score: 6, val1: 19, val2: 51 },
      { id: "football_team_manutd", name: "Manchester United", team: "EPL", score: 3, val1: 20, val2: 52 },
      { id: "football_team_juve", name: "Juventus FC", team: "Serie A", score: 2, val1: 36, val2: 55 },
      { id: "football_team_inter", name: "Inter Milan", team: "Serie A", score: 3, val1: 19, val2: 50 }
    ]
  };

  const themes = {
    f1: { color: '#e10600', name: 'Formula 1', ath: { val1: 'Points', val2: 'Age', score: 'Performance' }, team: { val1: 'Total Wins', val2: 'Podiums', score: 'Titles' } },
    cricket: { color: '#1d72fe', name: 'Cricket', ath: { val1: 'Runs/Wkts', val2: 'Average', score: 'Performance' }, team: { val1: 'Win %', val2: 'Matches', score: 'Titles' } },
    football: { color: '#00f59b', name: 'Football', ath: { val1: 'Goals', val2: 'Assists', score: 'Performance' }, team: { val1: 'League Titles', val2: 'Win %', score: 'UCL Titles' } }
  };
  
  const activeTheme = themes[sport];
  const activeLabels = mode === 'athletes' ? activeTheme.ath : activeTheme.team;

  useEffect(() => {
    const loadData = async () => {
      let data = [];
      try {
        if (mode === 'athletes') {
          if (sport === 'f1') {
            const res = await fetchF1Drivers();
            data = res?.data || res || [];
          }
          if (sport === 'cricket') {
            const res = await fetchCricketPlayers();
            data = res?.data || res || [];
          }
          if (sport === 'football') {
            const res = await fetchFootballScorers();
            data = res?.data || res || [];
          }
        } else {
          data = teamDataStore[sport] || [];
        }
        
        // UPDATED: Production Render URL
        const images = await fetch("https://athletiq-multi-sport-ai-performance-t4h1.onrender.com/api/images").then(res => res.json()).catch(() => ({}));
        setEntities(data);
        setImageMap(images);
        
        if (data && data.length >= 2) {
          setEntityAId(String(data[0].id || data[0].driver_id || data[0]._id));
          setEntityBId(String(data[1].id || data[1].driver_id || data[1]._id));
        }
      } catch (error) {
        console.error("Data load failed:", error);
      }
    };
    loadData();
    setAiInsight('');
  }, [sport, mode]);

  // Robust string-based ID matching to prevent undefined crashes
  const entityA = entities.find(p => String(p.id || p.driver_id || p._id) === String(entityAId));
  const entityB = entities.find(p => String(p.id || p.driver_id || p._id) === String(entityBId));
  const fallbackImage = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80";

  const getStats = (p) => {
    if (!p) return { val1: 0, val2: 0, score: 0 };
    if (mode === 'teams') return { val1: p.val1, val2: p.val2, score: p.score };
    if (sport === 'f1') return { val1: p.points, val2: p.age, score: p.performance_score };
    if (sport === 'cricket') return { val1: p.runs || p.wickets, val2: p.batting_avg || p.bowling_avg, score: p.performance_score };
    if (sport === 'football') return { val1: p.goals, val2: p.assists, score: p.performance_score };
  };

  const statsA = getStats(entityA);
  const statsB = getStats(entityB);

  const generateChartData = () => {
    if (!entityA || !entityB) return [];
    return ['2022', '2023', '2024', '2025', '2026'].map((year, index) => {
      const progress = index / 4;
      const startA = Math.max(0, statsA.score - 40);
      const startB = Math.max(0, statsB.score - 40);
      const fluctuationA = index < 4 ? Math.sin((index + 1) * entityA.name.length) * 15 : 0;
      const fluctuationB = index < 4 ? Math.cos((index + 1) * entityB.name.length) * 15 : 0;
      return {
        year,
        [entityA.name]: Math.max(0, Math.round(startA + (statsA.score - startA) * progress + fluctuationA)),
        [entityB.name]: Math.max(0, Math.round(startB + (statsB.score - startB) * progress + fluctuationB)),
      };
    });
  };

  const chartData = useMemo(() => generateChartData(), [entityAId, entityBId, mode, sport]);

  const generateInsight = async () => {
    if (!entityA) return;
    setIsAnalyzing(true);
    setAiInsight(''); 

    try {
      const payload = { 
        name: String(entityA.name), 
        sport: String(themes[sport].name), 
        score: Number(statsA.score) || 0, 
        val1: Number(statsA.val1) || 0, 
        val2: Number(statsA.val2) || 0 
      };

      // UPDATED: Production Render URL
      const res = await fetch("https://athletiq-multi-sport-ai-performance-t4h1.onrender.com/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error(`Backend crashed with status: ${res.status}`);

      const data = await res.json();
      setAiInsight(data.insight);
    } catch (err) {
      setAiInsight(`ENGINE ERROR: ${err.message}. Please verify backend connection.`);
    }
    
    setIsAnalyzing(false);
  };

  const StatBar = ({ label, valA, valB, maxVal }) => {
    const pctA = Math.min(100, (valA / maxVal) * 100) || 0;
    const pctB = Math.min(100, (valB / maxVal) * 100) || 0;
    const isAWinner = valA >= valB;
    return (
      <div className="mb-6 group/stat">
        <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">
          <span className={`transition-colors ${isAWinner ? "text-white" : "text-gray-600"}`}>{valA}</span>
          <span className="group-hover/stat:text-gray-300 transition-colors">{label}</span>
          <span className={`transition-colors ${!isAWinner ? "text-white" : "text-gray-600"}`}>{valB}</span>
        </div>
        <div className="flex h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5 relative">
          <div className="h-full transition-all duration-1000 ease-out" style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
            <div className="h-full relative" style={{ width: `${pctA}%`, backgroundColor: isAWinner ? activeTheme.color : '#333' }}>
              {isAWinner && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
            </div>
          </div>
          <div className="w-0.5 bg-white/20 h-full z-10" />
          <div className="h-full transition-all duration-1000 ease-out" style={{ width: '50%' }}>
            <div className="h-full relative" style={{ width: `${pctB}%`, backgroundColor: !isAWinner ? activeTheme.color : '#333' }}>
              {!isAWinner && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#080a10] text-white flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* 1. IMMERSIVE AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
        <div 
          className="absolute top-[10%] left-[25%] w-[50vw] h-[50vw] rounded-full blur-[150px] animate-pulse opacity-20 transition-colors duration-1000" 
          style={{ backgroundColor: activeTheme.color, animationDuration: '8s' }} 
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10 w-full px-6 py-12 flex-1 flex flex-col justify-center">
        
        {/* Cinematic Header */}
        <div className="text-center mb-12 animate-in slide-in-from-bottom-10 fade-in duration-1000">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden mb-6">
            <div className="absolute inset-0 opacity-20" style={{ backgroundColor: activeTheme.color }} />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="text-xs font-mono tracking-[0.2em] text-gray-300 uppercase relative z-10">
              Telemetric Head-to-Head Engine
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-800 drop-shadow-2xl mb-8 uppercase">
            {mode === 'athletes' ? 'Athlete' : 'Franchise'}
            <br />
            <span className="text-4xl md:text-6xl bg-clip-text tracking-tight" style={{ backgroundImage: `linear-gradient(to right, ${activeTheme.color}, #ffffff)` }}>
              Comparison
            </span>
          </h1>

          {/* Futuristic Controls */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-4 relative z-40">
            <div className="flex bg-black/40 p-1.5 rounded-full border border-white/5 shadow-inner backdrop-blur-md">
              <button onClick={() => setMode('athletes')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${mode === 'athletes' ? 'bg-white/10 text-white shadow-md' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><User className="w-4 h-4"/> Athletes</button>
              <button onClick={() => setMode('teams')} className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${mode === 'teams' ? 'bg-white/10 text-white shadow-md' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}><Users className="w-4 h-4"/> Teams</button>
            </div>
            
            <div className="w-px h-8 bg-white/10 hidden md:block"></div>
            
            <div className="flex gap-2">
              {['f1', 'cricket', 'football'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setSport(s)} 
                  className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${sport === s ? 'text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-black/40 text-gray-500 border-white/5 hover:border-white/20 hover:text-white'}`}
                  style={sport === s ? { backgroundColor: themes[s].color, borderColor: themes[s].color } : {}}
                >
                  {themes[s].name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Arena */}
        <div className="glass-card bg-[#0d111b]/80 border border-white/5 rounded-[2rem] p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl animate-in zoom-in-95 duration-1000 delay-300 relative overflow-visible">
          
          <div className="absolute top-0 left-0 w-full h-1 opacity-50" style={{ backgroundColor: activeTheme.color }} />

          {/* CINEMATIC CUSTOM SELECTORS */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 relative z-50">
            <div className="w-full md:w-1/3">
              <CinematicDropdown 
                value={entityAId} 
                onChange={setEntityAId} 
                options={entities} 
                themeColor={activeTheme.color}
                align="left"
              />
            </div>
            
            <div className="w-14 h-14 rounded-full bg-black/80 border border-white/10 flex items-center justify-center font-black text-xl text-gray-600 shadow-inner relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full animate-ping opacity-10" style={{ backgroundColor: activeTheme.color }} />
              VS
            </div>

            <div className="w-full md:w-1/3">
              <CinematicDropdown 
                value={entityBId} 
                onChange={setEntityBId} 
                options={entities} 
                themeColor={activeTheme.color}
                align="right"
              />
            </div>
          </div>

          {entityA && entityB && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center relative z-10">
              
              {/* Profile A */}
              <div className="text-center animate-in slide-in-from-left-8 duration-700">
                <div 
                  className="w-36 h-36 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-[3px] shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-6 relative group" 
                  style={{ borderColor: statsA.score >= statsB.score ? activeTheme.color : '#333' }}
                >
                  <div className="absolute inset-0 border-[4px] border-transparent rounded-full animate-spin-slow pointer-events-none" style={{ borderTopColor: statsA.score >= statsB.score ? activeTheme.color : 'transparent' }} />
                  <img src={imageMap[entityA.id || entityA.driver_id || entityA._id] || fallbackImage} alt={entityA.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">{entityA.name}</h2>
                <p className="text-gray-500 text-[11px] font-mono tracking-widest mt-1 uppercase">{entityA.team}</p>
                <div className="mt-4 inline-flex flex-col items-center">
                  <span className="text-[9px] text-gray-600 font-mono tracking-widest uppercase mb-1">Score</span>
                  <span className="text-3xl font-black" style={{ color: statsA.score >= statsB.score ? activeTheme.color : 'white' }}>{statsA.score}</span>
                </div>
              </div>

              {/* Differential Bars */}
              <div className="bg-black/60 border border-white/5 rounded-3xl p-8 shadow-inner animate-in zoom-in-95 duration-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 opacity-20" style={{ backgroundColor: activeTheme.color }} />
                <div className="flex items-center justify-center gap-2 mb-8 text-gray-500 font-mono text-[10px] tracking-[0.2em] uppercase">
                  <Activity className="w-3 h-3" />
                  Telemetry Differential
                </div>
                <StatBar label={activeLabels.score} valA={statsA.score} valB={statsB.score} maxVal={Math.max(statsA.score, statsB.score, 10)} />
                <StatBar label={activeLabels.val1} valA={statsA.val1} valB={statsB.val1} maxVal={Math.max(statsA.val1, statsB.val1, 1)} />
                <StatBar label={activeLabels.val2} valA={statsA.val2} valB={statsB.val2} maxVal={Math.max(statsA.val2, statsB.val2, 1)} />
              </div>

              {/* Profile B */}
              <div className="text-center animate-in slide-in-from-right-8 duration-700">
                <div 
                  className="w-36 h-36 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-[3px] shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-6 relative group" 
                  style={{ borderColor: statsB.score >= statsA.score ? activeTheme.color : '#333' }}
                >
                  <div className="absolute inset-0 border-[4px] border-transparent rounded-full animate-spin-slow pointer-events-none" style={{ borderTopColor: statsB.score >= statsA.score ? activeTheme.color : 'transparent' }} />
                  <img src={imageMap[entityB.id || entityB.driver_id || entityB._id] || fallbackImage} alt={entityB.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">{entityB.name}</h2>
                <p className="text-gray-500 text-[11px] font-mono tracking-widest mt-1 uppercase">{entityB.team}</p>
                <div className="mt-4 inline-flex flex-col items-center">
                  <span className="text-[9px] text-gray-600 font-mono tracking-widest uppercase mb-1">Score</span>
                  <span className="text-3xl font-black" style={{ color: statsB.score >= statsA.score ? activeTheme.color : 'white' }}>{statsB.score}</span>
                </div>
              </div>

              {/* Historical Chart & AI Generation Section */}
              <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 animate-in fade-in duration-1000 delay-300">
                <PerformanceChart 
                  data={chartData} 
                  entityAName={entityA.name} 
                  entityBName={entityB.name} 
                  themeColor={activeTheme.color} 
                />
                
                <div className="glass-card bg-black/60 rounded-3xl p-8 border border-white/5 flex flex-col justify-center items-center text-center shadow-inner relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <Zap className="w-8 h-8 mb-4 animate-pulse" style={{ color: activeTheme.color }} />
                  <h3 className="text-lg font-black text-white mb-2 tracking-tight">AI Predictive Insight</h3>
                  <p className="text-[11px] text-gray-400 font-mono leading-relaxed mb-6 max-w-sm">
                    Initialize Gemini ML models to generate a cinematic, natural-language performance trajectory based on live telemetry.
                  </p>
                  
                  {aiInsight ? (
                    <div className="w-full bg-[#080a10] border border-white/5 rounded-2xl p-6 text-xs text-gray-300 font-mono leading-relaxed text-left animate-in fade-in shadow-inner relative">
                      <span className="absolute top-0 left-6 -translate-y-1/2 bg-[#080a10] px-2 text-[8px] text-gray-500 tracking-widest uppercase">System Output</span>
                      {aiInsight}
                    </div>
                  ) : (
                    <button 
                      onClick={generateInsight}
                      disabled={isAnalyzing}
                      className="relative z-50 px-8 py-3 rounded-full text-xs font-bold text-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:hover:scale-100 cursor-pointer pointer-events-auto"
                      style={{ backgroundColor: activeTheme.color }}
                    >
                      {isAnalyzing ? "Processing..." : "Initialize Engine"}
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* 4. COPYRIGHT FOOTER */}
      <div className="w-full text-center pb-6 pt-12 relative z-10 pointer-events-none">
        <p className="text-[9px] text-gray-600 font-mono tracking-[0.2em] uppercase">
          &copy; 2026 Aryan Kshirsagar. All rights reserved.
        </p>
      </div>

    </div>
  );
}
