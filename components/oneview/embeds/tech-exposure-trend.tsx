"use client";

import React from "react";

interface TechExposureTrendProps {
  currentPct?: number;
  targetPct?: number;
  showPostVestBump?: boolean;
  className?: string;
}

export function TechExposureTrendEmbed({
  currentPct = 62,
  targetPct = 44,
  showPostVestBump = false, // If true, bump the Q4 value slightly
  className = "",
}: TechExposureTrendProps) {
  const width = 800;
  const height = 240;
  const padLeft = 80;
  const padRight = 60;
  const padTop = 60;
  const padBottom = 40;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const minY = 30;
  const maxY = 70;
  const getY = (val: number) => padTop + chartH - ((val - minY) / (maxY - minY)) * chartH;

  const drop = currentPct - targetPct; // 18 pts over 4 steps
  const points = [
    { label: "Today", x: padLeft, yVal: currentPct },
    { label: "Q4 '26", x: padLeft + chartW * 0.25, yVal: showPostVestBump ? currentPct - drop * 0.15 + 4 : Math.round(currentPct - drop * 0.25) },
    { label: "Q1 '27", x: padLeft + chartW * 0.5, yVal: Math.round(currentPct - drop * 0.5) },
    { label: "Q2 '27", x: padLeft + chartW * 0.75, yVal: Math.round(currentPct - drop * 0.75) },
    { label: "Q3 '27", x: padLeft + chartW, yVal: targetPct },
  ];

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${getY(p.yVal)}` : `${acc} L ${p.x} ${getY(p.yVal)}`;
  }, "");

  return (
    <div className={`p-6 rounded-2xl bg-white border border-[#f0ece3] ${className}`}>
      <div className="mb-2">
        <span className="text-[15px] font-sans text-[#5c6e8a]">
          Technology exposure over time
        </span>
      </div>

      <div className="relative w-full overflow-hidden mt-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto text-xs select-none block"
        >
          {/* Grid lines */}
          {[30, 40, 50, 60, 70].map((level) => {
            const y = getY(level);
            return (
              <g key={level}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#f0efe9"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 16}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-[#a3a19a] text-[13px] font-sans"
                >
                  {level}%
                </text>
              </g>
            );
          })}

          {/* Main Trajectory Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#b58e57"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((p, i) => {
            const y = getY(p.yVal);
            const isFirst = i === 0;
            const isLast = i === points.length - 1;
            const isQ4 = i === 1;
            const showLabel = isFirst || isLast || isQ4;
            
            return (
              <g key={p.label}>
                {isFirst ? (
                  <circle cx={p.x} cy={y} r={4.5} fill="#ffffff" stroke="#1c1d1a" strokeWidth="2.5" />
                ) : (
                  <circle cx={p.x} cy={y} r={4} fill="#b58e57" />
                )}
                
                {/* Data label */}
                {showLabel && (
                  <text
                    x={p.x}
                    y={y - 12}
                    textAnchor="middle"
                    className="fill-[#1c1d1a] font-sans text-[14px] font-bold"
                  >
                    {p.yVal}%
                  </text>
                )}
                
                {/* X-axis label */}
                <text
                  x={p.x}
                  y={padTop + chartH + 24}
                  textAnchor="middle"
                  className="fill-[#6c6b65] font-sans text-[13px]"
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      {showPostVestBump && (
        <div className="mt-4 text-[13px] text-[#934534] bg-[#fbf2ef] p-3 rounded-xl border border-[#f2d3cb] flex items-center gap-2">
          <span className="font-bold">Notice:</span> A confirmed NVDA RSU vest of ~$420K creates an intermediate bump in Q4 '26 before planned dispositions execute.
        </div>
      )}
    </div>
  );
}
