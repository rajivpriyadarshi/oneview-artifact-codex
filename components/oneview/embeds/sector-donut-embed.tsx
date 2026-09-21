"use client";

import React, { useState } from "react";

interface DonutSlice {
  id: string;
  label: string;
  pct: number;
  valueDollars: string;
  color: string;
  isTech: boolean;
}

const SLICES: DonutSlice[] = [
  { id: "nvda", label: "NVIDIA Corp (NVDA)", pct: 18.0, valueDollars: "$1.116M", color: "#8b6534", isTech: true },
  { id: "aapl", label: "Apple Inc (AAPL)", pct: 12.0, valueDollars: "$744k", color: "#b58a4c", isTech: true },
  { id: "msft", label: "Microsoft Corp (MSFT)", pct: 10.0, valueDollars: "$620k", color: "#d9b67a", isTech: true },
  { id: "amzn", label: "Amazon (AMZN)", pct: 8.0, valueDollars: "$496k", color: "#e3c898", isTech: true },
  { id: "other_tech", label: "Other Tech", pct: 14.0, valueDollars: "$868k", color: "#eedbb6", isTech: true },
  { id: "other", label: "Diversified & Fixed Income", pct: 38.0, valueDollars: "$2.35M", color: "#929d96", isTech: false },
];

export function SectorDonutEmbed({ className = "" }: { className?: string }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate cumulative offsets
  let cumulative = 0;
  const sliceArcs = SLICES.map((slice) => {
    const strokeDasharray = `${(slice.pct / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -cumulative * circumference;
    cumulative += slice.pct / 100;
    return { ...slice, strokeDasharray, strokeDashoffset };
  });

  const activeSlice = SLICES.find((s) => s.id === hoveredId);

  return (
    <div className={`p-4 rounded-xl bg-white border border-[#e8e4dc] ${className}`}>
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#eeebe3]">
        <span className="text-xs font-medium text-[#797871]">
          Sector allocation & tech look-through
        </span>
        <span className="text-[11px] font-mono text-[#8b6534] bg-[#fbf6ee] px-2 py-0.5 rounded border border-[#fae5c3]">
          Total Tech: <strong>62.0% ($3,844,000)</strong>
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* SVG Donut */}
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90"
          >
            {/* Background Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#f2efe9"
              strokeWidth={strokeWidth}
            />

            {/* Slices */}
            {sliceArcs.map((slice) => {
              const isHovered = hoveredId === slice.id;
              return (
                <circle
                  key={slice.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredId(slice.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              );
            })}
          </svg>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-[#79776f]">
              {activeSlice ? activeSlice.label.split(" ")[0] : "Tech Weight"}
            </span>
            <span className="font-sans text-xl font-bold text-[#1c1d19]">
              {activeSlice ? `${activeSlice.pct}%` : "62.0%"}
            </span>
            <span className="text-[9.5px] font-mono text-[#8a8880]">
              {activeSlice ? activeSlice.valueDollars : "$2.48m"}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 w-full text-xs">
          {SLICES.map((s) => {
            const isHovered = hoveredId === s.id;
            return (
              <div
                key={s.id}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`flex items-center justify-between p-1.5 rounded-lg transition-colors cursor-default ${
                  isHovered ? "bg-[#f8f6f0]" : "hover:bg-[#faf8f4]"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="font-sans font-medium text-[#2d2e29] truncate">
                    {s.label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2 font-mono text-[11px]">
                  <span className="font-bold text-[#1f201c]">{s.pct}%</span>
                  <span className="text-[#88867e]">({s.valueDollars})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
