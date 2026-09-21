"use client";

import React, { useState } from "react";

export type ChartEmbedType = "trajectory" | "bar" | "donut" | "area";

export interface ChartPoint {
  label: string;
  value: number;
  highlightLabel?: string;
}

export interface ChartEmbedSlice {
  label: string;
  value: number;
  color: string;
  percentage?: number;
  subtitle?: string;
}

export interface BarItem {
  label: string;
  value: number;
  color?: string;
  benchmark?: number;
}

export interface ChartEmbedPrimitiveProps {
  type?: ChartEmbedType;
  title?: string;
  subtitle?: string;
  points?: ChartPoint[];
  donutSlices?: ChartEmbedSlice[];
  barItems?: BarItem[];
  lineColor?: string;
  height?: number;
  yMin?: number;
  yMax?: number;
  targetLine?: { value: number; label: string };
  className?: string;
}

export function ChartEmbedPrimitive({
  type = "trajectory",
  title = "Technology exposure over time",
  subtitle,
  points = [
    { label: "Now", value: 62, highlightLabel: "62%" },
    { label: "3M", value: 54 },
    { label: "6M", value: 49 },
    { label: "9M", value: 46 },
    { label: "12M", value: 44, highlightLabel: "44%" },
  ],
  donutSlices = [
    { label: "Tech (NVDA, MSFT, AAPL)", value: 2480000, color: "#8b6534", subtitle: "62% of portfolio" },
    { label: "Core Fixed Income", value: 800000, color: "#4f7a67", subtitle: "20%" },
    { label: "Diversified Equities", value: 720000, color: "#7a776f", subtitle: "18%" },
  ],
  barItems = [
    { label: "NVDA", value: 34, color: "#8b6534", benchmark: 15 },
    { label: "MSFT", value: 16, color: "#a17e4f", benchmark: 12 },
    { label: "AAPL", value: 12, color: "#bda075", benchmark: 10 },
    { label: "S&P 500 Non-Tech", value: 38, color: "#567769", benchmark: 63 },
  ],
  lineColor = "#a98235",
  height = 145,
  yMin = 30,
  yMax = 70,
  targetLine,
  className = "",
}: ChartEmbedPrimitiveProps) {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  // SVG dimensions
  const width = 460;
  const padLeft = 34;
  const padRight = 36;
  const padTop = 24;
  const padBottom = 26;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const getY = (val: number) => padTop + chartH - ((val - yMin) / (yMax - yMin)) * chartH;
  const getX = (i: number, len: number) => padLeft + (i / (len - 1)) * chartW;

  return (
    <div className={`space-y-2 select-none ${className}`}>
      {title && (
        <div className="flex items-center justify-between">
          <span className="text-[12.5px] font-sans font-normal text-[#4b5563]">
            {title}
          </span>
          {subtitle && (
            <span className="text-[11px] font-sans text-[#71717a]">
              {subtitle}
            </span>
          )}
        </div>
      )}

      {/* Trajectory / Line Chart */}
      {type === "trajectory" && (
        <div className="relative w-full pt-1">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto block select-none"
            style={{ width: "100%", height }}
          >
            {/* Horizontal Grid lines at 70%, 50%, 30% */}
            {[70, 50, 30].map((val) => {
              const y = getY(val);
              return (
                <g key={val}>
                  <line
                    x1={padLeft}
                    y1={y}
                    x2={width - padRight}
                    y2={y}
                    stroke="#eceae3"
                    strokeWidth="1"
                  />
                  <text
                    x={padLeft - 8}
                    y={y + 3.5}
                    textAnchor="end"
                    className="fill-[#9ca3af] text-[9.5px] font-sans"
                  >
                    {val}%
                  </text>
                </g>
              );
            })}

            {/* Target Reference Line if provided */}
            {targetLine && (
              <g>
                <line
                  x1={padLeft}
                  y1={getY(targetLine.value)}
                  x2={width - padRight}
                  y2={getY(targetLine.value)}
                  stroke="#4f7a67"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <text
                  x={width - padRight}
                  y={getY(targetLine.value) - 4}
                  textAnchor="end"
                  className="fill-[#4f7a67] text-[9px] font-sans font-semibold"
                >
                  {targetLine.label}
                </text>
              </g>
            )}

            {/* Connecting Stroke */}
            <path
              d={points.reduce((acc, p, i) => {
                const x = getX(i, points.length);
                const y = getY(p.value);
                return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
              }, "")}
              fill="none"
              stroke={lineColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points */}
            {points.map((p, i) => {
              const x = getX(i, points.length);
              const y = getY(p.value);
              const isFirst = i === 0;
              return (
                <g key={p.label}>
                  {isFirst ? (
                    <circle
                      cx={x}
                      cy={y}
                      r={3.5}
                      fill="#ffffff"
                      stroke="#18181b"
                      strokeWidth="1.8"
                    />
                  ) : (
                    <circle
                      cx={x}
                      cy={y}
                      r={3.2}
                      fill={lineColor}
                    />
                  )}
                  {p.highlightLabel && (
                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="middle"
                      className="fill-[#18181b] font-sans font-bold text-[11px]"
                    >
                      {p.highlightLabel}
                    </text>
                  )}
                  <text
                    x={x}
                    y={padTop + chartH + 16}
                    textAnchor="middle"
                    className="fill-[#71717a] text-[10px] font-sans"
                  >
                    {p.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* Area Chart */}
      {type === "area" && (
        <div className="relative w-full pt-1">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto block select-none"
            style={{ width: "100%", height }}
          >
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor={lineColor} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[70, 50, 30].map((val) => {
              const y = getY(val);
              return (
                <g key={val}>
                  <line x1={padLeft} y1={y} x2={width - padRight} y2={y} stroke="#eceae3" strokeWidth="1" />
                  <text x={padLeft - 8} y={y + 3.5} textAnchor="end" className="fill-[#9ca3af] text-[9.5px] font-sans">
                    {val}%
                  </text>
                </g>
              );
            })}
            {/* Filled Area */}
            <path
              d={`${points.reduce((acc, p, i) => {
                const x = getX(i, points.length);
                const y = getY(p.value);
                return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
              }, "")} L ${getX(points.length - 1, points.length)} ${padTop + chartH} L ${padLeft} ${padTop + chartH} Z`}
              fill="url(#areaGrad)"
            />
            {/* Stroke */}
            <path
              d={points.reduce((acc, p, i) => {
                const x = getX(i, points.length);
                const y = getY(p.value);
                return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
              }, "")}
              fill="none"
              stroke={lineColor}
              strokeWidth="2"
            />
            {points.map((p, i) => (
              <g key={p.label}>
                <circle cx={getX(i, points.length)} cy={getY(p.value)} r={3} fill={lineColor} />
                <text x={getX(i, points.length)} y={padTop + chartH + 16} textAnchor="middle" className="fill-[#71717a] text-[10px] font-sans">
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      )}

      {/* Bar Chart */}
      {type === "bar" && (
        <div className="space-y-2.5 py-1">
          {barItems.map((bar) => (
            <div key={bar.label} className="space-y-1 text-xs">
              <div className="flex justify-between text-[11.5px] font-sans">
                <span className="font-medium text-[#18181b]">{bar.label}</span>
                <span className="text-[#4b5563] font-mono">{bar.value}% {bar.benchmark ? `(Target ${bar.benchmark}%)` : ""}</span>
              </div>
              <div className="w-full h-3 bg-[#f0eee9] rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${bar.value}%`, backgroundColor: bar.color || lineColor }}
                />
                {bar.benchmark && (
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-[#18181b] z-10"
                    style={{ left: `${bar.benchmark}%` }}
                    title={`Benchmark: ${bar.benchmark}%`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Donut / Pie Breakdown */}
      {type === "donut" && (
        <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
          <div className="relative w-[130px] h-[130px] shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {(() => {
                const total = donutSlices.reduce((sum, s) => sum + s.value, 0);
                let cumulative = 0;
                return donutSlices.map((slice, i) => {
                  const percent = slice.value / total;
                  const strokeDash = `${percent * 282.7} 282.7`;
                  const strokeOffset = -cumulative * 282.7;
                  cumulative += percent;
                  return (
                    <circle
                      key={slice.label}
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={slice.color}
                      strokeWidth={activeSegment === i ? "13" : "10"}
                      strokeDasharray={strokeDash}
                      strokeDashoffset={strokeOffset}
                      className="cursor-pointer transition-all hover:opacity-85"
                      onMouseEnter={() => setActiveSegment(i)}
                      onMouseLeave={() => setActiveSegment(null)}
                    />
                  );
                });
              })()}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-serif text-[18px] font-bold text-[#18181b]">62%</span>
              <span className="text-[9px] font-sans uppercase tracking-wider text-[#71717a]">Tech</span>
            </div>
          </div>

          <div className="space-y-2 flex-1 min-w-0">
            {donutSlices.map((slice, i) => (
              <div
                key={slice.label}
                onMouseEnter={() => setActiveSegment(i)}
                onMouseLeave={() => setActiveSegment(null)}
                className={`p-1.5 rounded-lg flex items-center justify-between text-xs transition-colors cursor-pointer ${
                  activeSegment === i ? "bg-[#f5f3ee]" : ""
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                  <span className="font-sans font-medium text-[#18181b] truncate">{slice.label}</span>
                </div>
                <span className="text-[11px] font-mono text-[#71717a] shrink-0 ml-2">
                  ${(slice.value / 1000).toLocaleString()}k
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
