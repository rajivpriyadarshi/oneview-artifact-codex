"use client";

import React, { useState } from "react";

export interface DonutSlice {
  id: string;
  label: string;
  value: number; // raw value or percentage
  color: string;
  secondaryLabel?: string;
  tag?: string;
}

export interface DonutChartProps {
  slices: DonutSlice[];
  totalLabel?: string;
  totalValue?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  hideLegend?: boolean;
  onSliceClick?: (slice: DonutSlice) => void;
}

export function DonutChartPrimitive({
  slices,
  totalLabel = "Total Tech",
  totalValue = "41%",
  size = 180,
  strokeWidth = 26,
  className = "",
  hideLegend = false,
  onSliceClick,
}: DonutChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const total = React.useMemo(() => slices.reduce((acc, s) => acc + s.value, 0), [slices]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate slice stroke dash offsets immutably
  const sliceArcs = React.useMemo(() => {
    return slices.reduce((acc, slice) => {
      const prevCumulative = acc.length > 0 ? acc[acc.length - 1].cumulativePercent : 0;
      const percent = total > 0 ? slice.value / total : 0;
      const strokeDasharray = `${percent * circumference} ${circumference}`;
      const strokeDashoffset = -prevCumulative * circumference;
      const cumulativePercent = prevCumulative + percent;

      return [
        ...acc,
        {
          ...slice,
          percent,
          cumulativePercent,
          strokeDasharray,
          strokeDashoffset,
        },
      ];
    }, [] as Array<DonutSlice & { percent: number; cumulativePercent: number; strokeDasharray: string; strokeDashoffset: number }>);
  }, [slices, total, circumference]);

  const activeSlice = slices.find((s) => s.id === hoveredId);

  return (
    <div className={`flex ${hideLegend ? "justify-center" : "flex-col sm:flex-row items-center gap-6"} ${className}`}>
      {/* SVG Donut */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f1ede6"
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
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={slice.strokeDasharray}
                strokeDashoffset={slice.strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredId(slice.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSliceClick?.(slice)}
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#79776f]">
            {activeSlice ? activeSlice.label : totalLabel}
          </span>
          <span className="font-serif text-2xl font-medium text-[#1c1d19]">
            {activeSlice ? `$${activeSlice.value}k` : totalValue}
          </span>
          {activeSlice?.secondaryLabel && (
            <span className="text-[9px] text-[#8a8880] mt-0.5">{activeSlice.secondaryLabel}</span>
          )}
        </div>
      </div>

      {/* Legend list */}
      {!hideLegend && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full text-xs">
          {slices.map((slice) => {
            const isHovered = hoveredId === slice.id;
            const percentage = total > 0 ? ((slice.value / total) * 100).toFixed(0) : "0";
            return (
              <button
                key={slice.id}
                className={`flex items-center justify-between p-2 rounded-lg text-left transition-all border ${
                  isHovered
                    ? "bg-white border-[#d2ccc0] shadow-xs"
                    : "bg-transparent border-transparent hover:bg-white/60"
                }`}
                onMouseEnter={() => setHoveredId(slice.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSliceClick?.(slice)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span className="font-medium text-[#2b2c28] truncate">{slice.label}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-[#84827a] font-mono text-[11px]">{percentage}%</span>
                  {slice.tag && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#ece9e2] text-[#63645e]">
                      {slice.tag}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
