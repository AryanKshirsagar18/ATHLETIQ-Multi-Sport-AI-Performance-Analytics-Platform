import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl font-black mb-6">See the signal <br /><span className="text-gray-500">behind the score.</span></h1>
      <p className="text-lg text-gray-400 mb-10">Unified AI-powered performance analytics for Formula 1, Cricket and Football.</p>
      <Link to="/f1" className="px-7 py-3 rounded-full font-bold bg-f1 text-white hover:opacity-90 transition">
        Explore Formula 1
      </Link>
    </div>
  );
}