import React, { useEffect, useState } from 'react';
import { fetchF1Drivers } from '../services/api';
import AthleteCard from '../components/AthleteCard';

export default function F1Dashboard() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchF1Drivers().then(res => setDrivers(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-white mb-8">Formula 1 Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map(d => (
          <AthleteCard key={d.id} name={d.name} team={d.team} metricLabel="Points" metricValue={d.points} score={d.performance_score} sportColor="#ff1801" />
        ))}
      </div>
    </div>
  );
}