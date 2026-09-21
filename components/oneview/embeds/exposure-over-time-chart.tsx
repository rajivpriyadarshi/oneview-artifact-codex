"use client";

import React from "react";

export interface ChartPoint {
  label: string;
  value: number; // e.g. 62, 54, 49, 46, 44
  highlightLabel?: string; // e.g. "62%", "~44%"
}

interface ExposureOverTimeChartProps {
  points?: ChartPoint[];
  lineColor?: string;
  className?: string;
}

const DEFAULT_POINTS: ChartPoint[] = [
  { label: "Today", value: 62, highlightLabel: "62%" },
  { label: "3M", value: 54 },
  { label: "6M", value: 49 },
  { label: "9M", value: 46 },
  { label: "12M", value: 44, highlightLabel: "~44%" },
];

export function ExposureOverTimeChart({
  points = DEFAULT_POINTS,
  lineColor = "#a68047", // Matches reference screenshot gold
  className = "",
}: ExposureOverTimeChartProps) {
  // Use a larger viewBox to ensure crisp rendering when scaled
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
  const getX = (index: number) => padLeft + (index / (points.length - 1)) * chartW;

  const pathD = points.reduce((acc, p, i) => {
    const x = getX(i);
    const y = getY(p.value);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  return (
    <div className={`p-6 sm:p-8 rounded-2xl bg-[#ffffff] border border-[#f0ece3] ${className}`}>
      <div className="mb-6">
        <span className="text-[16px] font-sans text-[#5c6e8a]">
          Technology exposure over time
        </span>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto text-xs select-none block"
        >
          {/* Grid lines */}
          {[30, 50, 70].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#f0efe9"
                  strokeWidth="1.5"
                />
                <text
                  x={padLeft - 16}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-[#a3a19a] text-[13px] font-sans"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Main Trajectory Line */}
          <path
            d={pathD}
            fill="none"
            stroke={lineColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((p, i) => {
            const x = getX(i);
            const y = getY(p.value);
            const isFirst = i === 0;
            
            return (
              <g key={p.label}>
                {isFirst ? (
                  <circle cx={x} cy={y} r={6} fill="#ffffff" stroke="#1c1d1a" strokeWidth="2.5" />
                ) : (
                  <circle cx={x} cy={y} r={5} fill={lineColor} />
                )}
                
                {/* Data label */}
                {p.highlightLabel && (
                  <text
                    x={x}
                    y={y - 12}
                    textAnchor="middle"
                    className="fill-[#1c1d1a] font-sans text-[15px] font-bold"
                  >
                    {p.highlightLabel}
                  </text>
                )}
                
                {/* X-axis label */}
                <text
                  x={x}
                  y={padTop + chartH + 28}
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
    </div>
  );
}
