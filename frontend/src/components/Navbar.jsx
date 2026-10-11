import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isRouteActive = (route) => location.pathname === route;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#080a10]/70 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand Logo - Enhanced Cinematic Glow */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0d111b] border border-white/10 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:border-white/20 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-500">
            <span className="text-2xl font-black bg-gradient-to-tr from-[#e10600] via-[#1d72fe] to-[#00f59b] bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-500">A</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#e10600]/10 to-[#00f59b]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white group-hover:text-gray-200 transition-colors duration-300">
            Athleti<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e10600] to-[#1d72fe]">Q</span>
          </span>
        </Link>

        {/* Central Nav Links - Telemetry Style */}
        <div className="hidden md:flex items-center space-x-1 bg-black/40 p-1.5 rounded-full border border-white/5 shadow-inner">
          <Link 
            to="/" 
            className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${isRouteActive('/') ? 'bg-white/10 text-white shadow-md' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            Home
          </Link>
          <Link 
            to="/f1" 
            className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${isRouteActive('/f1') ? 'bg-[#e10600]/20 text-[#e10600] border border-[#e10600]/30 shadow-[0_0_15px_rgba(225,6,0,0.2)]' : 'text-gray-500 hover:text-[#e10600] hover:bg-[#e10600]/10'}`}
          >
            Formula 1
          </Link>
          <Link 
            to="/cricket" 
            className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${isRouteActive('/cricket') ? 'bg-[#1d72fe]/20 text-[#1d72fe] border border-[#1d72fe]/30 shadow-[0_0_15px_rgba(29,114,254,0.2)]' : 'text-gray-500 hover:text-[#1d72fe] hover:bg-[#1d72fe]/10'}`}
          >
            Cricket
          </Link>
          <Link 
            to="/football" 
            className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${isRouteActive('/football') ? 'bg-[#00f59b]/20 text-[#00f59b] border border-[#00f59b]/30 shadow-[0_0_15px_rgba(0,245,155,0.2)]' : 'text-gray-500 hover:text-[#00f59b] hover:bg-[#00f59b]/10'}`}
          >
            Football
          </Link>
          
          <div className="w-px h-4 bg-white/10 mx-2" /> {/* Divider */}
          
          <Link 
            to="/compare" 
            className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${isRouteActive('/compare') ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
          >
            Engine
          </Link>
        </div>

        {/* Right Side: System Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f59b] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f59b]"></span>
          </span>
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mt-0.5">
            Sys. Online
          </span>
        </div>

      </div>
    </nav>
  );
}