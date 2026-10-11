import React, { useState } from 'react';

export default function AthleteCard({ name, team, metricLabel, metricValue, score, sportColor, imageSrc, badge, description }) {
  const [expanded, setExpanded] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80";

  return (
    <>
      <div 
        className="relative group cursor-pointer"
        onClick={() => setExpanded(true)}
      >
        {/* Ambient Hover Glow behind the card */}
        <div 
          className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{ backgroundColor: sportColor }}
        />

        {/* Main Card */}
        <div 
          className="relative glass-card rounded-2xl p-5 bg-[#0d111b]/80 backdrop-blur-md border border-white/5 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
          style={{ '--hover-border': sportColor }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = sportColor + '50'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
        >
          {/* Subtle background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full overflow-hidden bg-black/80 border border-white/10 flex-shrink-0 shadow-lg group-hover:border-transparent transition-colors duration-500"
                style={{ boxShadow: `0 0 0 0 ${sportColor}`, transition: 'box-shadow 0.3s ease-in-out' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 15px ${sportColor}80`}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0 0 ${sportColor}`}
              >
                <img 
                  src={imageSrc || fallbackImage} 
                  alt={name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" 
                  onError={(e) => { e.currentTarget.src = fallbackImage; }} 
                />
              </div>
              <div>
                <h4 className="font-black text-white text-lg tracking-tight leading-tight transition-colors duration-300 group-hover:text-white">
                  {name}
                </h4>
                <p className="text-xs text-gray-500 font-mono tracking-wider mt-1 group-hover:text-gray-300 transition-colors">{team}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">Score</div>
              <div 
                className="text-2xl font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-transform duration-500 origin-right group-hover:scale-110" 
                style={{ color: sportColor }}
              >
                {score}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-0.5">{metricLabel}</span>
              <strong className="text-white text-sm font-bold">{metricValue}</strong>
            </div>
            {badge && (
              <span 
                className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border bg-black/40 shadow-inner" 
                style={{ color: sportColor, borderColor: sportColor + '40' }}
              >
                {badge}
              </span>
            )}
          </div>

          {description && (
            <div className="relative z-10 mt-4 p-3 bg-black/50 rounded-xl border border-white/5 text-[11px] font-mono text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
              {description}
            </div>
          )}
        </div>
      </div>

      {/* Expanded Modal (Profile Scan) */}
      {expanded && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080a10]/90 backdrop-blur-xl p-4 animate-in fade-in duration-300"
          onClick={() => setExpanded(false)}
        >
          <div 
            className="glass-card w-full max-w-md rounded-3xl p-1 border border-white/10 shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: `0 0 50px ${sportColor}20` }}
          >
            {/* Top color bar */}
            <div className="h-2 w-full absolute top-0 left-0" style={{ backgroundColor: sportColor }} />
            
            <div className="bg-[#0d111b] rounded-[22px] p-8 relative h-full w-full">
              
              <button 
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => setExpanded(false)}
              >
                ✕
              </button>
              
              <div className="flex flex-col items-center text-center mt-2">
                <div 
                  className="w-32 h-32 rounded-full overflow-hidden bg-black/80 border-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-6 relative group/img" 
                  style={{ borderColor: sportColor }}
                >
                  <div className="absolute inset-0 border-[4px] border-transparent rounded-full animate-spin-slow pointer-events-none" style={{ borderTopColor: sportColor }} />
                  <img 
                    src={imageSrc || fallbackImage} 
                    alt={name} 
                    className="w-full h-full object-cover grayscale-[10%]" 
                    onError={(e) => { e.currentTarget.src = fallbackImage; }} 
                  />
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest uppercase mb-4 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: sportColor }} />
                  Profile Telemetry
                </div>

                <h2 className="text-3xl font-black text-white tracking-tight mb-1">{name}</h2>
                <p className="text-sm font-mono text-gray-500 tracking-wider mb-8">{team}</p>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-black/60 p-5 rounded-2xl border border-white/5 text-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 opacity-20" style={{ backgroundColor: sportColor }} />
                    <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-widest font-bold">AthletiQ Score</div>
                    <div className="text-5xl font-black" style={{ color: sportColor }}>{score}</div>
                  </div>
                  
                  <div className="bg-black/60 p-5 rounded-2xl border border-white/5 text-center flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 opacity-20 bg-white" />
                    <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-widest font-bold">{metricLabel}</div>
                    <div className="text-3xl font-black text-white">{metricValue}</div>
                    {badge && <div className="text-[9px] mt-3 text-gray-400 font-mono tracking-widest uppercase bg-white/5 py-1 rounded mx-2">{badge}</div>}
                  </div>
                </div>

                {description && (
                  <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10 text-xs font-mono text-gray-300 w-full leading-relaxed text-left">
                    <span className="text-gray-500 block mb-2 text-[9px] uppercase tracking-widest">Analyst Note</span>
                    {description}
                  </div>
                )}

                {/* --- COPYRIGHT FOOTER ON MODAL --- */}
                <div className="mt-8 pt-4 border-t border-white/5 w-full text-center">
                  <p className="text-[9px] text-gray-600 font-mono tracking-[0.2em] uppercase">
                    &copy; 2026 Aryan Kshirsagar.<br/>All rights reserved.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}