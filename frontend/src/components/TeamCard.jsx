import React, { useState } from 'react';

export default function TeamCard({ name, history, keyPlayers, imageSrc, themeColor, stats }) {
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
          style={{ backgroundColor: themeColor }}
        />

        {/* Main Card */}
        <div 
          className="relative glass-card rounded-2xl p-5 bg-[#0d111b]/80 backdrop-blur-md border border-white/5 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden flex flex-col justify-between h-full"
          onMouseEnter={(e) => e.currentTarget.style.borderColor = themeColor + '50'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
        >
          {/* Subtle background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex items-start gap-5 mb-5">
            <div 
              className="w-16 h-16 rounded-xl overflow-hidden bg-black/80 border border-white/10 flex-shrink-0 shadow-lg transition-all duration-500 group-hover:border-transparent"
              style={{ boxShadow: `0 0 0 0 ${themeColor}` }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 15px ${themeColor}80`}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0 0 ${themeColor}`}
            >
              <img 
                src={imageSrc || fallbackImage} 
                alt={name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" 
                onError={(e) => { e.currentTarget.src = fallbackImage; }} 
              />
            </div>
            <div>
              <h3 className="font-black text-white text-lg tracking-tight leading-tight transition-colors duration-300 group-hover:text-white">
                {name}
              </h3>
              <p className="text-[11px] text-gray-500 font-mono tracking-wide mt-1.5 line-clamp-2 leading-relaxed group-hover:text-gray-400 transition-colors">
                {history}
              </p>
            </div>
          </div>

          {/* Inline Telemetry Stats */}
          {stats && (
            <div className="relative z-10 flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
              {Object.entries(stats).map(([label, value]) => (
                <div key={label} className="flex-1 bg-black/40 rounded-xl p-2.5 text-center border border-white/5 group-hover:bg-black/60 transition-colors">
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">{label}</div>
                  <div className="text-sm font-black drop-shadow-md transition-transform duration-300 group-hover:scale-110" style={{ color: themeColor }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expanded Modal (Franchise Scan) */}
      {expanded && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080a10]/90 backdrop-blur-xl p-4 animate-in fade-in duration-300"
          onClick={() => setExpanded(false)}
        >
          <div 
            className="glass-card w-full max-w-2xl rounded-3xl p-1 border border-white/10 shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: `0 0 50px ${themeColor}20` }}
          >
            {/* Top color bar */}
            <div className="h-2 w-full absolute top-0 left-0 z-20" style={{ backgroundColor: themeColor }} />
            
            <div className="bg-[#0d111b] rounded-[22px] p-8 relative flex-1 overflow-y-auto scrollbar-hide">
              
              <button 
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all z-20"
                onClick={() => setExpanded(false)}
              >
                ✕
              </button>
              
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                <div 
                  className="w-28 h-28 rounded-2xl overflow-hidden bg-black/80 border-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex-shrink-0 relative group/img"
                  style={{ borderColor: themeColor }}
                >
                  <div className="absolute inset-0 border-[4px] border-transparent rounded-2xl animate-spin-slow pointer-events-none" style={{ borderTopColor: themeColor }} />
                  <img src={imageSrc || fallbackImage} alt={name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = fallbackImage; }} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest uppercase mb-3 text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
                    Franchise Telemetry
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tight">{name}</h2>
                </div>
              </div>

              <div className="space-y-6">
                {stats && (
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Core Performance Metrics</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(stats).map(([label, value]) => (
                        <div key={label} className="bg-black/60 p-5 rounded-2xl border border-white/5 text-center shadow-inner relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-1 opacity-20" style={{ backgroundColor: themeColor }} />
                          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">{label}</div>
                          <div className="text-3xl font-black" style={{ color: themeColor }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-1 h-3 rounded-full" style={{ backgroundColor: themeColor }} />
                      Franchise History
                    </h4>
                    <p className="text-xs text-gray-300 font-mono leading-relaxed">{history}</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-1 h-3 rounded-full" style={{ backgroundColor: themeColor }} />
                      Key Roster / Legends
                    </h4>
                    <p className="text-xs text-gray-300 font-mono leading-relaxed">{keyPlayers}</p>
                  </div>
                </div>
              </div>

              {/* --- COPYRIGHT FOOTER ON MODAL --- */}
              <div className="mt-8 pt-6 border-t border-white/5 w-full text-center">
                <p className="text-[9px] text-gray-600 font-mono tracking-[0.2em] uppercase">
                  &copy; 2026 Aryan Kshirsagar. All rights reserved.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}