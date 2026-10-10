import React from 'react';
import { Link } from 'react-router-dom';

// IMPORT YOUR LOCAL IMAGE HERE
import f1CarImg from '../assets/f1-car.jpg';

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-73px)] bg-[#080a10] text-white flex flex-col justify-center overflow-hidden">
      
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-f1/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cricket/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 py-12 md:py-20 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Call to Action Panel */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">
              UNLEASH YOUR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-f1 via-cricket to-football font-black">
                SPORTS INSIGHTS
              </span>
            </h1>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              “Elevate your performance. Dive into deep analytics across F1, Cricket, and Football with AthletiQ.”
            </p>
          </div>

          {/* Redesigned Hover-Activated Buttons (Subtle Tint) */}
          <div className="space-y-4 max-w-md pt-4">
            
            {/* F1 Button - Subtle Red Tint */}
            <Link 
              to="/f1" 
              className="group flex items-center gap-6 p-4 rounded-xl bg-[#0d111b] border border-white/10 hover:bg-[#e10600]/10 hover:border-[#e10600]/50 hover:shadow-[0_0_20px_rgba(225,6,0,0.15)] transition-all duration-300 transform hover:scale-[1.02]"
            >
              <span className="text-white font-bold text-2xl pl-2">🏎️</span>
              <h3 className="font-bold text-white text-[15px] uppercase tracking-wider transition-colors">Explore Formula 1</h3>
            </Link>

            {/* Cricket Button - Subtle Blue Tint */}
            <Link 
              to="/cricket" 
              className="group flex items-center gap-6 p-4 rounded-xl bg-[#0d111b] border border-white/10 hover:bg-[#1d72fe]/10 hover:border-[#1d72fe]/50 hover:shadow-[0_0_20px_rgba(29,114,254,0.15)] transition-all duration-300 transform hover:scale-[1.02]"
            >
              <span className="text-white font-bold text-2xl pl-2">🏏</span>
              <h3 className="font-bold text-white text-[15px] uppercase tracking-wider transition-colors">Explore Cricket</h3>
            </Link>

            {/* Football Button - Subtle Green Tint */}
            <Link 
              to="/football" 
              className="group flex items-center gap-6 p-4 rounded-xl bg-[#0d111b] border border-white/10 hover:bg-[#00f59b]/10 hover:border-[#00f59b]/50 hover:shadow-[0_0_20px_rgba(0,245,155,0.15)] transition-all duration-300 transform hover:scale-[1.02]"
            >
              <span className="text-white font-bold text-2xl pl-2">⚽</span>
              <h3 className="font-bold text-white text-[15px] uppercase tracking-wider transition-colors">Explore Football</h3>
            </Link>

          </div>
        </div>

        {/* Right Side: Sport Images Collage */}
        <div className="lg:col-span-7 flex justify-center relative group">
          <div className="relative w-full aspect-[4/3] max-w-2xl rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-b from-[#0d111b] to-black shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            <div className="absolute inset-0 grid grid-rows-2 h-full w-full">
              
              {/* Upper Section — LOCAL F1 CAR IMAGE */}
              <div className="overflow-hidden relative border-b border-white/5">
                <img 
                  src={f1CarImg} 
                  alt="Formula 1 Car" 
                  className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080a10]/80 to-transparent" />
              </div>

              {/* Lower Section */}
              <div className="grid grid-cols-2 h-full">
                <div className="overflow-hidden relative border-r border-white/5">
                  <img 
                    src="https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Cricket Player" 
                    className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-110 opacity-75 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080a10]/90 to-transparent" />
                </div>

                <div className="overflow-hidden relative">
                  <img 
                    src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Football Action" 
                    className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-110 opacity-75 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080a10]/90 to-transparent" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  );
}