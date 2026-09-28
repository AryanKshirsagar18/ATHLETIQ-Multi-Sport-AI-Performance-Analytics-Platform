import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wider text-white">ATHLETIQ</Link>
        <div className="flex space-x-6 text-sm">
          <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
          <Link to="/f1" className="text-gray-400 hover:text-f1">Formula 1</Link>
        </div>
      </div>
    </nav>
  );
}