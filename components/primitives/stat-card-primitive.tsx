"use client";

import React from "react";

export interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  delta?: {
    text: string;
    tone?: "positive" | "negative" | "neutral" | "warning";
  };
  sparkline?: number[];
  sparklineColor?: string;
  className?: string;
  onClick?: () => void;
}

export function StatCardPrimitive({
  label,
  value,
  subtitle,
  delta,
  sparkline,
  sparklineColor = "#936d38",
  className = "",
  onClick,
}: StatCardProps) {
  const toneClasses = {
    positive: "bg-[#e8f5ec] text-[#227447] border-[#c8e8d2]",
    negative: "bg-[#faebe6] text-[#a84435] border-[#f2ccc4]",
    neutral: "bg-[#efede8] text-[#555651] border-[#dedad1]",
    warning: "bg-[#fbf2e3] text-[#8e6128] border-[#ebd4b4]",
  };

  const currentTone = delta?.tone ? toneClasses[delta.tone] : toneClasses.neutral;

  // Compute smooth SVG sparkline path with fill
  const svgContent = React.useMemo(() => {
    if (!sparkline || sparkline.length < 2) return null;
    const width = 220;
    const height = 48;
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = Math.max(1, max - min);

    const points = sparkline.map((v, i) => {
      const x = 4 + (i * (width - 8)) / (sparkline.length - 1);
      const y = height - 4 - ((v - min) / range) * (height - 8);
      return { x, y };
    });

    const pathData = points.reduce((acc, p, i) => {
      if (i === 0) return `M ${p.x},${p.y}`;
      const prev = points[i - 1];
      const cx1 = prev.x + (p.x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (p.x - prev.x) / 2;
      const cy2 = p.y;
      return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${p.x},${p.y}`;
    }, "");

    const fillData = `${pathData} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-12 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`grad-${label.replace(/[^a-zA-Z0-9]/g, "-")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sparklineColor} stopOpacity="0.22" />
            <stop offset="100%" stopColor={sparklineColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={fillData} fill={`url(#grad-${label.replace(/[^a-zA-Z0-9]/g, "-")})`} />
        <path
          d={pathData}
          fill="none"
          stroke={sparklineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }, [sparkline, sparklineColor, label]);

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white/95 shadow-xs transition-all duration-200 hover:shadow-sm hover:border-[rgba(0,0,0,0.12)] ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#76756e]">
          {label}
        </span>
        {delta && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${currentTone}`}
          >
            {delta.text}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-serif text-2xl font-medium tracking-tight text-[#1a1b18]">
          {value}
        </span>
        {subtitle && <span className="text-[11px] text-[#86857e]">{subtitle}</span>}
      </div>

      {svgContent && <div className="mt-2 -mb-1">{svgContent}</div>}
    </div>
  );
}
