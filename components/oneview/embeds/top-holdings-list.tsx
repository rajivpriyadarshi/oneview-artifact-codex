"use client";

import React from "react";

const HOLDINGS = [
  { id: "nvda", name: "NVDA", pct: 28.4 },
  { id: "aapl", name: "AAPL", pct: 12.1 },
  { id: "msft", name: "MSFT", pct: 11.6 },
  { id: "amzn", name: "AMZN", pct: 6.8 },
  { id: "googl", name: "GOOGL", pct: 4.9 },
];

export function TopHoldingsList() {
  return (
    <div className="flex-1 bg-white border border-[#e8e4dc] rounded-xl p-4 flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-3.5 h-3.5 text-[#55544e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-[13px] font-sans font-medium text-[#1c1d1a]">Top holdings</span>
      </div>

      <div className="text-[11px] font-sans text-[#79776f] flex justify-between border-b border-[#f0efe9] pb-2 mb-2">
        <span>Company</span>
        <span>Portfolio weight</span>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {HOLDINGS.map((h, i) => (
          <div key={h.id} className="flex justify-between items-center relative">
            {/* Very faint background bar to indicate weight relative to 30% max */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-[#faf8f4] -z-10 rounded-sm" 
              style={{ width: `${(h.pct / 30) * 100}%` }}
            />
            <span className="text-[12px] font-medium text-[#1c1d1a] px-1">{h.name}</span>
            <span className="text-[12px] text-[#55544e]">{h.pct.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
