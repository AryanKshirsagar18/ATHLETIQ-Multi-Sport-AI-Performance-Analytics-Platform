import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function PerformanceChart({ data, entityAName, entityBName, themeColor }) {
  if (!data || data.length === 0) return null;

  return (
    <div 
      className="relative glass-card bg-[#0d111b]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 transition-all duration-500 hover:border-white/10 w-full flex flex-col group"
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 30px ${themeColor}10`}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = `none`}
    >
      {/* Cinematic Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: themeColor }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: themeColor }}></span>
          </div>
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] group-hover:text-gray-300 transition-colors">
            Historical Trajectory
          </h4>
        </div>
        <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[8px] font-mono text-gray-500 uppercase tracking-widest">
          Telemetry Linked
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
            <XAxis 
              dataKey="year" 
              stroke="#ffffff40" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              tickMargin={10}
            />
            <YAxis 
              stroke="#ffffff40" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              tickMargin={10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#080a10', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
              itemStyle={{ fontWeight: '900', fontSize: '14px', fontFamily: 'sans-serif' }}
              labelStyle={{ color: '#888', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '10px', paddingTop: '15px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }} 
              iconType="circle" 
            />
            
            {/* Entity A Line (Colored) */}
            <Line 
              type="monotone" 
              dataKey={entityAName} 
              name={entityAName}
              stroke={themeColor} 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#0d111b', stroke: themeColor, strokeWidth: 2 }} 
              activeDot={{ r: 6, fill: themeColor, stroke: '#fff', strokeWidth: 2 }}
              animationDuration={1500}
            />
            
            {/* Entity B Line (White) */}
            <Line 
              type="monotone" 
              dataKey={entityBName} 
              name={entityBName}
              stroke="#ffffff" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#0d111b', stroke: "#ffffff", strokeWidth: 2 }} 
              activeDot={{ r: 6, fill: "#ffffff", stroke: themeColor, strokeWidth: 2 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* COPYRIGHT WATERMARK */}
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2">
        <span className="text-[8px] text-gray-600 font-mono uppercase tracking-[0.2em]">Data Source: AthletiQ Engine</span>
        <span className="text-[8px] text-gray-600 font-mono uppercase tracking-[0.2em]">
          &copy; 2026 Aryan Kshirsagar. All rights reserved.
        </span>
      </div>
    </div>
  );
}