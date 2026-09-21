"use client";

import React from "react";

export interface ScenarioRowData {
  id: string;
  name: string;
  note: string;
  nav: string;
  tech: string;
  techPercentNum: number; // for micro-bar
  cash: string;
  gains: string;
  status: string;
  tone: "good" | "warn" | "bad";
  interpretation?: string;
}

export interface MatrixComparisonProps {
  scenarios: ScenarioRowData[];
  selectedId?: string;
  onSelectScenario?: (scenario: ScenarioRowData) => void;
  className?: string;
}

export function MatrixComparisonPrimitive({
  scenarios,
  selectedId,
  onSelectScenario,
  className = "",
}: MatrixComparisonProps) {
  const tonePills = {
    good: "bg-[#e8f5ec] text-[#227447] border-[#c4e6ce]",
    warn: "bg-[#fbf3e6] text-[#8e5c26] border-[#f0d4b0]",
    bad: "bg-[#fbeae6] text-[#a63c2c] border-[#f2c6bc]",
  };

  return (
    <div className={`border border-[rgba(0,0,0,0.06)] rounded-xl bg-white overflow-hidden ${className}`}>
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-[#ece8df] bg-[#fbf9f5] text-[#73716a] text-[10px] uppercase tracking-wider">
            <th className="py-2.5 px-3">Scenario / Path</th>
            <th className="py-2.5 px-3">Terminal NAV</th>
            <th className="py-2.5 px-3">Tech Exposure</th>
            <th className="py-2.5 px-3">Lowest Cash</th>
            <th className="py-2.5 px-3">Modeled Gains</th>
            <th className="py-2.5 px-3 text-right">Result</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f2efe9]">
          {scenarios.map((s) => {
            const isSelected = selectedId === s.id;
            return (
              <tr
                key={s.id}
                onClick={() => onSelectScenario?.(s)}
                className={`transition-colors cursor-pointer hover:bg-[#faf7f2] ${
                  isSelected ? "bg-[#f7f2e8]" : ""
                }`}
              >
                <td className="py-3 px-3">
                  <div className="font-medium text-[#22231f]">{s.name}</div>
                  <div className="text-[10px] text-[#84827b]">{s.note}</div>
                </td>
                <td className="py-3 px-3 font-serif font-medium text-[#292a26]">{s.nav}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-semibold text-[#1e1f1c]">{s.tech}</span>
                    <div className="w-16 h-1.5 bg-[#ebe7df] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8c6b38] rounded-full"
                        style={{ width: `${Math.min(100, Math.max(0, s.techPercentNum * 2))}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 font-mono text-[#32332f]">{s.cash}</td>
                <td className="py-3 px-3 font-mono text-[#32332f]">{s.gains}</td>
                <td className="py-3 px-3 text-right">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      tonePills[s.tone]
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
