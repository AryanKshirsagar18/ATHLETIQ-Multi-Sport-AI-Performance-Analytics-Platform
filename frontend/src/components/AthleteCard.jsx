import React, { useState } from 'react';

export default function AthleteCard({ name, team, metricLabel, metricValue, score, sportColor, imageSrc, badge, description }) {
  const [expanded, setExpanded] = useState(false);
  const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  return (
    <>
      <div className="relative group">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 shadow-lg">
          Click to expand profile
        </div>

        <div 
          className="glass-card rounded-xl p-5 border border-white/5 cursor-pointer transition-all duration-300 hover:border-gray-400 hover:bg-white/5"
          onClick={() => setExpanded(true)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-black/60 border border-white/10 flex-shrink-0">
                <img 
                  src={imageSrc || fallbackImage} 
                  alt={name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125" 
                  onError={(e) => { e.target.src = fallbackImage; }} 
                />
              </div>
              <div>
                <h4 className="font-bold text-white text-base leading-tight transition-transform duration-300 origin-left group-hover:scale-105">
                  {name}
                </h4>
                <p className="text-xs text-gray-400 mt-1">{team}</p>
              </div>
            </div>
            
            <div className="text-right transition-transform duration-300 origin-right group-hover:scale-110">
              <div className="text-xs text-gray-400">Score</div>
              <div className="text-lg font-black drop-shadow-md" style={{ color: sportColor }}>{score}</div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 transition-transform duration-300 group-hover:scale-105">
            <span>{metricLabel}: <strong className="text-white">{metricValue}</strong></span>
            {badge && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border border-current bg-black/20" style={{ color: sportColor }}>
                {badge}
              </span>
            )}
          </div>

          {/* New Description Section for Young Talents */}
          {description && (
            <div className="mt-4 p-3 bg-black/40 rounded-lg border border-white/5 text-xs text-gray-300 leading-relaxed transition-transform duration-300 group-hover:scale-105">
              {description}
            </div>
          )}
        </div>
      </div>

      {expanded && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setExpanded(false)}
        >
          <div 
            className="glass-card w-full max-w-md rounded-2xl p-8 border border-white/20 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={() => setExpanded(false)}
            >
              ✕
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-black/60 border-4 shadow-lg mb-4" style={{ borderColor: sportColor }}>
                <img 
                  src={imageSrc || fallbackImage} 
                  alt={name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.src = fallbackImage; }} 
                />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-1">{name}</h2>
              <p className="text-md text-gray-400 mb-8">{team}</p>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-black/40 p-5 rounded-xl border border-white/10 text-center">
                  <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-bold">AthletiQ Score</div>
                  <div className="text-5xl font-black drop-shadow-md" style={{ color: sportColor }}>{score}</div>
                </div>
                
                <div className="bg-black/40 p-5 rounded-xl border border-white/10 text-center flex flex-col justify-center">
                  <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-bold">{metricLabel}</div>
                  <div className="text-3xl font-bold text-white mt-1">{metricValue}</div>
                  {badge && <div className="text-xs mt-2 text-gray-500 font-mono">{badge}</div>}
                </div>
              </div>

              {description && (
                <div className="mt-6 p-4 bg-black/40 rounded-xl border border-white/10 text-sm text-gray-300 w-full">
                  {description}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}