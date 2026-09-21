"use client";

import React from "react";

const SLICES = [
  { id: "tech", label: "Technology", pct: 62, color: "#b58e57" },
  { id: "cons", label: "Consumer", pct: 12, color: "#e8cfab" },
  { id: "health", label: "Healthcare", pct: 8, color: "#ecd9bd" },
  { id: "fin", label: "Financials", pct: 7, color: "#efe2cc" },
  { id: "ind", label: "Industrials", pct: 6, color: "#f2e9db" },
  { id: "oth", label: "Other", pct: 5, color: "#e6e5e0" },
];

export function SectorMixDonut() {
  const size = 110;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;
  const sliceArcs = SLICES.map((slice) => {
    const strokeDasharray = `${(slice.pct / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -cumulative * circumference;
    cumulative += slice.pct / 100;
    return { ...slice, strokeDasharray, strokeDashoffset };
  });

  return (
    <div className="flex-1 bg-white border border-[#e8e4dc] rounded-xl p-4 flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-3.5 h-3.5 text-[#55544e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        <span className="text-[13px] font-sans font-medium text-[#1c1d1a]">Portfolio sector mix</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            {sliceArcs.map((slice) => (
              <circle
                key={slice.id}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth={strokeWidth}
                strokeDasharray={slice.strokeDasharray}
                strokeDashoffset={slice.strokeDashoffset}
                strokeLinecap="butt"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-sans text-[18px] font-bold text-[#1c1d19] leading-tight">62%</span>
            <span className="text-[9px] font-medium text-[#79776f]">Technology</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 text-xs">
          {SLICES.map((s) => (
            <div key={s.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="font-sans text-[11px] text-[#55544e]">{s.label}</span>
              </div>
              <span className="font-mono text-[11px] font-medium text-[#1c1d1a]">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
