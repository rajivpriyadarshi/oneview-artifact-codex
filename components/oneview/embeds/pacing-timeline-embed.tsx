"use client";

import React from "react";

interface PacingQuarter {
  quarter: string;
  dateRange: string;
  action: string;
  trimValue: string;
  projectedExposure: string;
  taxImpact: string;
}

const QUARTERS: PacingQuarter[] = [
  {
    quarter: "Q4 2026",
    dateRange: "Oct – Dec 2026",
    action: "Trim $220k MSFT (liquid window) + $60k AAPL",
    trimValue: "$280,000",
    projectedExposure: "54.0%",
    taxImpact: "$38,000 realized gain",
  },
  {
    quarter: "Q1 2027",
    dateRange: "Jan – Mar 2027",
    action: "Trim $200k MSFT across high-cost lots",
    trimValue: "$200,000",
    projectedExposure: "49.0%",
    taxImpact: "$26,000 realized gain",
  },
  {
    quarter: "Q2 2027",
    dateRange: "Apr – Jun 2027",
    action: "Trim $120k AAPL + allocate to VEA/VWO",
    trimValue: "$120,000",
    projectedExposure: "46.0%",
    taxImpact: "$18,000 realized gain",
  },
  {
    quarter: "Q3 2027",
    dateRange: "Jul – Sep 2027",
    action: "Final rebalance into BND short duration",
    trimValue: "$120,000",
    projectedExposure: "~44.0%",
    taxImpact: "$14,000 realized gain",
  },
];

export function PacingTimelineEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="text-xs font-medium text-[#797871]">
        12-Month Quarterly Pacing & Rebalancing Schedule
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {QUARTERS.map((q, idx) => (
          <div
            key={q.quarter}
            className="p-3.5 rounded-xl bg-white border border-[#e5e1d7] shadow-2xs space-y-2 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8b6534]">
                  Phase {idx + 1} · {q.quarter}
                </span>
                <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#f6f3ec] text-[#6b6962]">
                  {q.projectedExposure}
                </span>
              </div>
              <div className="text-[11px] text-[#8e8d86] mt-0.5">{q.dateRange}</div>
              <div className="font-medium text-xs text-[#22231f] mt-2 leading-snug">
                {q.action}
              </div>
            </div>

            <div className="pt-2 border-t border-[#f0ece4] text-[11px] font-mono flex items-center justify-between text-[#5f5e58]">
              <span>Trim: <strong>{q.trimValue}</strong></span>
              <span className="text-[10px] text-[#246e45]">{q.taxImpact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
