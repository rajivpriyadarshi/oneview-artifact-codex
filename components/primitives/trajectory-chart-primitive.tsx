"use client";

import React, { useState } from "react";

export interface TrajectoryPoint {
  date: string;
  label: string;
  cash: number; // in $k
  exposure: number; // percentage
  status?: "trade" | "settle" | "commitment" | "normal";
}

export interface TrajectoryChartProps {
  data: TrajectoryPoint[];
  reserveFloor?: number; // e.g. 250
  height?: number;
  className?: string;
  onPointHover?: (point: TrajectoryPoint | null) => void;
}

export function TrajectoryChartPrimitive({
  data,
  reserveFloor = 250,
  height = 140,
  className = "",
  onPointHover,
}: TrajectoryChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = 500;
  const paddingX = 24;
  const paddingY = 16;

  // Scales for Cash ($k)
  const cashValues = data.map((d) => d.cash);
  const minCash = Math.min(0, ...cashValues, reserveFloor);
  const maxCash = Math.max(900, ...cashValues);
  const cashRange = Math.max(1, maxCash - minCash);

  // Scales for Exposure (%)
  const expValues = data.map((d) => d.exposure);
  const minExp = Math.min(30, ...expValues);
  const maxExp = Math.max(55, ...expValues);
  const expRange = Math.max(1, maxExp - minExp);

  const points = data.map((d, i) => {
    const x = paddingX + (i * (width - 2 * paddingX)) / (data.length - 1);
    const yCash = height - paddingY - ((d.cash - minCash) / cashRange) * (height - 2 * paddingY);
    const yExp = height - paddingY - ((d.exposure - minExp) / expRange) * (height - 2 * paddingY);
    return { ...d, x, yCash, yExp };
  });

  const cashPath = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.yCash}`;
    const prev = points[i - 1];
    const cx1 = prev.x + (p.x - prev.x) / 2;
    const cy1 = prev.yCash;
    const cx2 = prev.x + (p.x - prev.x) / 2;
    const cy2 = p.yCash;
    return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${p.x},${p.yCash}`;
  }, "");

  const expPath = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.yExp}`;
    const prev = points[i - 1];
    const cx1 = prev.x + (p.x - prev.x) / 2;
    const cy1 = prev.yExp;
    const cx2 = prev.x + (p.x - prev.x) / 2;
    const cy2 = p.yExp;
    return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${p.x},${p.yExp}`;
  }, "");

  const reserveY =
    height - paddingY - ((reserveFloor - minCash) / cashRange) * (height - 2 * paddingY);

  const activePoint = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className={`relative flex flex-col ${className}`}>
      {/* Legend & Active readout */}
      <div className="flex items-center justify-between text-xs mb-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#8b6534] rounded-full" />
            <span className="text-[11px] font-medium text-[#64635e]">Available Cash</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#3e6b5c] rounded-full" />
            <span className="text-[11px] font-medium text-[#64635e]">Tech Exposure %</span>
          </div>
        </div>

        {activePoint ? (
          <div className="text-[11px] font-mono text-[#252623] bg-[#f2eee7] px-2 py-0.5 rounded">
            <strong>{activePoint.date}</strong>: ${activePoint.cash}k cash · {activePoint.exposure}%
            tech
          </div>
        ) : (
          <span className="text-[10px] text-[#93918a]">Hover points to inspect trajectory</span>
        )}
      </div>

      <div className="relative border border-[rgba(0,0,0,0.06)] rounded-xl bg-white p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full overflow-visible"
          style={{ height }}
          onMouseLeave={() => {
            setHoverIndex(null);
            onPointHover?.(null);
          }}
        >
          {/* Horizontal grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#f0ede6"
            strokeWidth="1"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#f0ede6"
            strokeWidth="1"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#f0ede6"
            strokeWidth="1"
          />

          {/* Reserve floor reference line */}
          <line
            x1={paddingX}
            y1={reserveY}
            x2={width - paddingX}
            y2={reserveY}
            stroke="#c88275"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <text
            x={width - paddingX - 4}
            y={reserveY - 4}
            textAnchor="end"
            fontSize="8"
            fill="#a64f40"
            fontWeight="bold"
            fontFamily="monospace"
          >
            Reserve Floor ${reserveFloor}k
          </text>

          {/* Paths */}
          <path
            d={cashPath}
            fill="none"
            stroke="#8b6534"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={expPath}
            fill="none"
            stroke="#3e6b5c"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hover indicator line */}
          {activePoint && (
            <line
              x1={activePoint.x}
              y1={paddingY}
              x2={activePoint.x}
              y2={height - paddingY}
              stroke="#b5aba0"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          )}

          {/* Data Points */}
          {points.map((p, i) => (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => {
                setHoverIndex(i);
                onPointHover?.(p);
              }}
            >
              <circle
                cx={p.x}
                cy={p.yCash}
                r={hoverIndex === i ? 5 : 3.5}
                fill="white"
                stroke="#8b6534"
                strokeWidth="2"
                className="transition-all"
              />
              <circle
                cx={p.x}
                cy={p.yExp}
                r={hoverIndex === i ? 5 : 3.5}
                fill="white"
                stroke="#3e6b5c"
                strokeWidth="2"
                className="transition-all"
              />
            </g>
          ))}
        </svg>

        {/* X-axis date labels */}
        <div className="flex justify-between px-6 pt-1 text-[9px] font-mono text-[#8a8880]">
          {data.map((d, i) => (
            <span key={i}>{d.date}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
