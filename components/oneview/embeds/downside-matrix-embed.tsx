"use client";

import React from "react";

export function DownsideMatrixEmbed({ className = "" }: { className?: string }) {
  const rows = [
    {
      label: "Current Portfolio (62% Tech)",
      baseVal: "$6,200,000",
      stressVal: "$5,431,200",
      drawdown: "-$768,800 (-12.4% NAV)",
      severity: "critical",
    },
    {
      label: "Branch A: Protect NVDA, Target ~44%",
      baseVal: "$6,200,000",
      stressVal: "$5,654,400",
      drawdown: "-$545,600 (-8.8% NAV)",
      severity: "moderate",
    },
    {
      label: "Branch B: Relax target to 46% (Gradual)",
      baseVal: "$6,200,000",
      stressVal: "$5,629,600",
      drawdown: "-$570,400 (-9.2% NAV)",
      severity: "moderate",
    },
    {
      label: "Branch C: Small NVDA trim to 40%",
      baseVal: "$6,200,000",
      stressVal: "$5,704,000",
      drawdown: "-$496,000 (-8.0% NAV)",
      severity: "minimal",
    },
  ];

  return (
    <div className={`overflow-hidden rounded-xl bg-white border border-[#e8e4dc] ${className}`}>
      <div className="p-3.5 pb-2.5 border-b border-[#eeebe3] flex items-center justify-between">
        <span className="text-xs font-medium text-[#797871]">
          Downside Stress Test: Impact of -20% Tech Correction
        </span>
        <span className="text-[10px] font-mono uppercase font-bold text-[#b54a32] bg-[#fbf3f0] px-2 py-0.5 rounded border border-[#f5d7cf]">
          Downside Simulation
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#eeebe3] bg-[#faf9f6] text-[10px] font-mono uppercase tracking-wider text-[#8a8880]">
              <th className="py-2.5 px-3.5 font-semibold">Scenario Path</th>
              <th className="py-2.5 px-3 font-semibold text-right">Base NAV</th>
              <th className="py-2.5 px-3 font-semibold text-right">Stressed NAV</th>
              <th className="py-2.5 px-3.5 font-semibold text-right">Portfolio Drawdown</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f2efe9]">
            {rows.map((r, idx) => (
              <tr key={idx} className="hover:bg-[#fbfaf6] transition-colors">
                <td className="py-2.5 px-3.5 font-medium text-[#1c1d1a]">
                  {r.label}
                </td>
                <td className="py-2.5 px-3 font-mono text-right text-[#5f5e58]">
                  {r.baseVal}
                </td>
                <td className="py-2.5 px-3 font-mono text-right text-[#1c1d1a] font-semibold">
                  {r.stressVal}
                </td>
                <td className="py-2.5 px-3.5 font-mono text-right">
                  <span
                    className={`font-semibold ${
                      r.severity === "critical"
                        ? "text-[#a43825]"
                        : r.severity === "moderate"
                        ? "text-[#8b6534]"
                        : "text-[#246e45]"
                    }`}
                  >
                    {r.drawdown}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
