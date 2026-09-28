import React from 'react';

export default function AthleteCard({ name, team, metricLabel, metricValue, score, sportColor }) {
  return (
    <div className="glass-card rounded-xl p-5 hover:border-gray-500 transition-all">
      <div className="flex justify-between">
        <div>
          <h4 className="font-bold text-white text-base">{name}</h4>
          <p className="text-xs text-gray-400">{team}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Score</div>
          <div className="text-lg font-black" style={{ color: sportColor }}>{score}</div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-white/5 text-xs text-gray-400">
        <span>{metricLabel}: <strong className="text-white">{metricValue}</strong></span>
      </div>
    </div>
  );
}