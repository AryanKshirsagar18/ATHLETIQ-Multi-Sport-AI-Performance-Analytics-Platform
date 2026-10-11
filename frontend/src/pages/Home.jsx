import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Zap, Target, ChevronRight } from 'lucide-react';

// IMPORT YOUR LOCAL IMAGES HERE
import f1CarImg from '../assets/f1-car.jpg';
import footballImg from '../assets/football.jpg';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#080a10] text-white selection:bg-white/20 overflow-hidden font-sans flex flex-col justify-between">
      
      {/* 1. IMMERSIVE AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dynamic Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
        
        {/* Breathing Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#e10600]/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#1d72fe]/10 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-[#00f59b]/5 blur-[150px] animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-24 pb-8 px-6 w-full max-w-7xl mx-auto flex-1 justify-center">
        
        <div className="w-full flex-1 flex flex-col justify-center">
          {/* 2. CINEMATIC HERO SECTION */}
          <div className="text-center space-y-6 mb-20 animate-in slide-in-from-bottom-10 fade-in duration-1000">
            
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden relative group cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-[#e10600]/20 via-[#1d72fe]/20 to-[#00f59b]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
              <span className="text-xs font-mono tracking-[0.2em] text-gray-300 uppercase relative z-10">
                AthletiQ Intelligence Engine Online
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-800 drop-shadow-2xl">
              DOMINATE
              <br />
              <span className="text-5xl md:text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r from-[#e10600] via-[#1d72fe] to-[#00f59b] tracking-tight">
                THE DATA.
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-sm md:text-lg text-gray-400 font-light tracking-wide leading-relaxed mt-8 border-l-2 border-white/20 pl-6 text-left">
              Experience the apex of multi-sport telemetry. Advanced AI insights, 
              head-to-head performance scaling, and predictive analysis across the world's most elite sports.
            </p>
          </div>

          {/* 3. INTERACTIVE SPORT PORTALS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full group/board animate-in zoom-in-95 fade-in duration-1000 delay-300 fill-mode-both">
            
            {/* F1 PORTAL */}
            <Link to="/f1" className="group relative h-[450px] rounded-3xl overflow-hidden bg-[#0d111b] border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:z-20 hover:border-[#e10600]/50 hover:shadow-[0_0_50px_rgba(225,6,0,0.2)] group-hover/board:opacity-40 hover:!opacity-100">
              <div className="absolute inset-0">
                <img src={f1CarImg} alt="Formula 1" className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110 opacity-60 group-hover:opacity-90 grayscale-[30%] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-12 rounded-full border border-[#e10600]/30 bg-[#e10600]/10 flex items-center justify-center backdrop-blur-md mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(225,6,0,0.5)]">
                    <Activity className="text-[#e10600] w-5 h-5" />
                  </div>
                  <h2 className="text-4xl font-black text-white mb-2 tracking-tight">FORMULA 1</h2>
                  <p className="text-sm text-gray-400 font-mono mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Sector telemetry, pace analysis & prospect radar.
                  </p>
                  <div className="flex items-center gap-2 text-[#e10600] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Initialize Engine <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* CRICKET PORTAL */}
            <Link to="/cricket" className="group relative h-[450px] rounded-3xl overflow-hidden bg-[#0d111b] border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:z-20 hover:border-[#1d72fe]/50 hover:shadow-[0_0_50px_rgba(29,114,254,0.2)] group-hover/board:opacity-40 hover:!opacity-100">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80" alt="Cricket" className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110 opacity-50 group-hover:opacity-80 grayscale-[30%] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-12 rounded-full border border-[#1d72fe]/30 bg-[#1d72fe]/10 flex items-center justify-center backdrop-blur-md mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(29,114,254,0.5)]">
                    <Target className="text-[#1d72fe] w-5 h-5" />
                  </div>
                  <h2 className="text-4xl font-black text-white mb-2 tracking-tight">CRICKET</h2>
                  <p className="text-sm text-gray-400 font-mono mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Ball-by-ball analysis, strike rates & team intel.
                  </p>
                  <div className="flex items-center gap-2 text-[#1d72fe] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Initialize Engine <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* FOOTBALL PORTAL */}
            <Link to="/football" className="group relative h-[450px] rounded-3xl overflow-hidden bg-[#0d111b] border border-white/10 transition-all duration-500 hover:scale-[1.03] hover:z-20 hover:border-[#00f59b]/50 hover:shadow-[0_0_50px_rgba(0,245,155,0.2)] group-hover/board:opacity-40 hover:!opacity-100">
              <div className="absolute inset-0">
                <img src={footballImg} alt="Football" className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110 opacity-50 group-hover:opacity-80 grayscale-[30%] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-12 rounded-full border border-[#00f59b]/30 bg-[#00f59b]/10 flex items-center justify-center backdrop-blur-md mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,245,155,0.5)]">
                    <Zap className="text-[#00f59b] w-5 h-5" />
                  </div>
                  <h2 className="text-4xl font-black text-white mb-2 tracking-tight">FOOTBALL</h2>
                  <p className="text-sm text-gray-400 font-mono mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Goal contributions, elite prospects & club data.
                  </p>
                  <div className="flex items-center gap-2 text-[#00f59b] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Initialize Engine <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>

        {/* 4. COPYRIGHT FOOTER */}
        <div className="w-full text-center mt-16 pb-4 animate-in fade-in duration-1000 delay-700 relative z-10">
          <p className="text-[10px] text-gray-600 font-mono tracking-[0.2em] uppercase">
            &copy; 2026 Aryan Kshirsagar. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}