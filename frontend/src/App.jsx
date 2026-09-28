import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import F1Dashboard from './pages/F1Dashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/f1" element={<F1Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}