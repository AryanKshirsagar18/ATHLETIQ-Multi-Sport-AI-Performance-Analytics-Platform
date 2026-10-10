import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isRouteActive = (route) => location.pathname === route;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#080a10]/80 backdrop-blur-md px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Glowing Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#0d111b] border border-white/10 overflow-hidden shadow-[0_0_15px_rgba(225,6,0,0.15)] group-hover:border-white/20 transition-all">
            <span className="text-2xl font-black bg-gradient-to-tr from-f1 via-cricket to-football bg-clip-text text-transparent">A</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-f1/10 to-football/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-gray-100 transition-colors">
            Athleti<span className="text-f1">Q</span>
          </span>
        </Link>

        {/* Central Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-[13px] font-bold tracking-wider uppercase">
          <Link 
            to="/" 
            className={`transition ${isRouteActive('/') ? 'text-white border-b-2 border-f1 pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            to="/f1" 
            className={`transition ${isRouteActive('/f1') ? 'text-f1 border-b-2 border-f1 pb-1' : 'text-gray-400 hover:text-f1'}`}
          >
            Formula 1
          </Link>
          <Link 
            to="/cricket" 
            className={`transition ${isRouteActive('/cricket') ? 'text-cricket border-b-2 border-cricket pb-1' : 'text-gray-400 hover:text-cricket'}`}
          >
            Cricket
          </Link>
          <Link 
            to="/football" 
            className={`transition ${isRouteActive('/football') ? 'text-football border-b-2 border-football pb-1' : 'text-gray-400 hover:text-football'}`}
          >
            Football
          </Link>
        </div>

        {/* Empty div to perfectly center the nav links since right-side buttons are removed */}
        <div className="w-[120px] hidden md:block"></div>

      </div>
    </nav>
  );
}