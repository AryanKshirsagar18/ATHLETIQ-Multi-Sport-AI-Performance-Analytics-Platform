import React, { useState } from 'react';

export default function TeamCard({ name, history, keyPlayers, imageSrc, themeColor }) {
  const [expanded, setExpanded] = useState(false);
  const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";

  return (
    <>
      <div 
        className="glass-card group relative rounded-xl p-5 border border-white/5 cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/5"
        onClick={() => setExpanded(true)}
      >
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-black/60 border border-white/10 flex-shrink-0">
            <img 
              src={imageSrc || fallbackImage} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              onError={(e) => { e.target.src = fallbackImage; }} 
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white group-hover:text-[var(--theme-color)] transition-colors" style={{ '--theme-color': themeColor }}>
              {name}
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 pr-4">{history}</p>
          </div>
        </div>
      </div>

      {expanded && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setExpanded(false)}
        >
          <div 
            className="glass-card w-full max-w-2xl rounded-2xl p-8 border border-white/20 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setExpanded(false)}>✕</button>
            
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/10">
              <div className="w-24 h-24 rounded-xl overflow-hidden border-2 shadow-lg" style={{ borderColor: themeColor }}>
                <img 
                  src={imageSrc || fallbackImage} 
                  alt={name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.src = fallbackImage; }}
                />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-white">{name}</h2>
                <div className="mt-2 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-black/40 border" style={{ color: themeColor, borderColor: themeColor }}>
                  Team Profile
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Franchise / Constructor History</h4>
                <p className="text-sm text-gray-400 leading-relaxed bg-black/30 p-4 rounded-lg border border-white/5">{history}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Key Roster / Legends</h4>
                <p className="text-sm text-gray-400 leading-relaxed bg-black/30 p-4 rounded-lg border border-white/5">{keyPlayers}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}