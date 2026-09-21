"use client";

import React from "react";

export function ExposurePathChart() {
  const width = 360;
  const height = 180;
  const padLeft = 40;
  const padRight = 30;
  const padTop = 20;
  const padBottom = 26;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const minY = 0;
  const maxY = 80;
  const getY = (val: number) => padTop + chartH - (val / maxY) * chartH;

  // X points: Oct 2023, Jan 2024, Apr 2024, Jul 2024, Oct 2024
  const points = [
    { label: "Oct 2023", value: 38 },
    { label: "Jan 2024", value: 43 },
    { label: "Apr 2024", value: 46 },
    { label: "Jul 2024", value: 52 },
    { label: "Oct 2024", value: 62 },
  ];

  const getX = (index: number) => padLeft + (index / (points.length - 1)) * chartW;

  const pathD = points.reduce((acc, p, i) => {
    const x = getX(i);
    const y = getY(p.value);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  return (
    <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#f0ece3]">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-[#55544e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="text-[14px] font-sans font-semibold text-[#1c1d1a]">
          Technology exposure path
        </span>
      </div>

      <div className="flex items-center gap-4 mb-4 text-[11px] font-sans text-[#5c6e8a]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-[#a68047]" />
          <span>Actual</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 border-t border-dashed border-[#4477c7]" />
          <span>Original target (40%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 border-t border-dashed border-[#348a52]" />
          <span>Revised target (~44%)</span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-xs select-none block">
          {/* Grid lines */}
          {[0, 20, 40, 60, 80].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line x1={padLeft} y1={y} x2={width - padRight} y2={y} stroke="#f0efe9" strokeWidth="1" strokeDasharray="2 2" />
                <text x={padLeft - 8} y={y + 3.5} textAnchor="end" className="fill-[#9ca3af] text-[10px] font-sans">
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Original Target (40%) */}
          <line
            x1={padLeft}
            y1={getY(40)}
            x2={width - padRight}
            y2={getY(40)}
            stroke="#4477c7"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x={width - padRight + 4} y={getY(40) + 3} className="fill-[#4477c7] text-[10px] font-sans font-semibold">
            40%
          </text>

          {/* Revised Target (44%) */}
          <line
            x1={padLeft}
            y1={getY(44)}
            x2={width - padRight}
            y2={getY(44)}
            stroke="#348a52"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x={width - padRight + 4} y={getY(44) + 3} className="fill-[#348a52] text-[10px] font-sans font-semibold">
            ~44%
          </text>

          {/* Main Trajectory Line */}
          <path d={pathD} fill="none" stroke="#a68047" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Points */}
          {points.map((p, i) => {
            const x = getX(i);
            const y = getY(p.value);
            const isLast = i === points.length - 1;
            
            return (
              <g key={p.label}>
                <circle cx={x} cy={y} r={isLast ? 4.5 : 3.5} fill={isLast ? "#a68047" : "#fff"} stroke="#a68047" strokeWidth={isLast ? 0 : 1.5} />
                
                {isLast && (
                  <text x={x + 10} y={y - 8} className="fill-[#a68047] font-sans text-[12px] font-bold">
                    {p.value}%
                  </text>
                )}
                
                {(i === 0 || i === 1 || i === 2 || i === 3 || i === 4) && (
                  <text x={x} y={padTop + chartH + 16} textAnchor="middle" className="fill-[#88867e] font-sans text-[10px]">
                    {p.label}
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
