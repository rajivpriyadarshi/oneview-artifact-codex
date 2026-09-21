"use client";

import React from "react";

export function TechAllocationBarChart() {
  const width = 280;
  const height = 160;
  const padLeft = 32;
  const padBottom = 24;
  const padTop = 16;
  const padRight = 10;
  
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  
  // Fake historical data increasing to 62%
  const data = [
    { label: "Oct 2023", val: 35 },
    { label: "", val: 38 },
    { label: "Jan 2024", val: 42 },
    { label: "", val: 46 },
    { label: "Apr 2024", val: 49 },
    { label: "", val: 54 },
    { label: "Jul 2024", val: 58 },
    { label: "", val: 60 },
    { label: "Oct 2024", val: 62 },
  ];
  
  const maxY = 80;
  const getY = (val: number) => padTop + chartH - (val / maxY) * chartH;
  
  const barW = chartW / data.length - 6;

  return (
    <div className="flex-1 bg-white border border-[#e8e4dc] rounded-xl p-4 flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-3.5 h-3.5 text-[#55544e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <span className="text-[13px] font-sans font-medium text-[#1c1d1a]">Technology allocation trend</span>
      </div>
      
      <div className="relative w-full h-[120px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full text-xs" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 20, 40, 60, 80].map((level) => {
            const y = getY(level);
            return (
              <g key={level}>
                <line x1={padLeft} y1={y} x2={width - padRight} y2={y} stroke="#f0efe9" strokeDasharray="2 2" />
                <text x={padLeft - 6} y={y + 3} textAnchor="end" className="fill-[#88867e] text-[9px] font-sans">
                  {level}%
                </text>
              </g>
            );
          })}
          
          {/* Bars */}
          {data.map((d, i) => {
            const x = padLeft + (i * chartW) / data.length + 3;
            const y = getY(d.val);
            const h = padTop + chartH - y;
            const isLast = i === data.length - 1;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={h}
                  fill={isLast ? "#b58e57" : "#f5ebd9"}
                  rx={2}
                />
                {isLast && (
                  <text x={x + barW/2} y={y - 4} textAnchor="middle" className="fill-[#b58e57] text-[10px] font-bold font-sans">
                    {d.val}%
                  </text>
                )}
                {d.label && (
                  <text x={x + barW/2} y={padTop + chartH + 14} textAnchor="middle" className="fill-[#88867e] text-[9px] font-sans">
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
