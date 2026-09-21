"use client";

import React from "react";

export interface DiffRow {
  label: string;
  historicalV1: string;
  unrepairedCurrent: string;
  proposedRepair: string;
  highlight?: "danger" | "success" | "neutral";
}

export interface ConsequenceDiffProps {
  rows: DiffRow[];
  repairTitle?: string;
  className?: string;
}

export function ConsequenceDiffPrimitive({
  rows,
  repairTitle = "Proposed Minimum Repair",
  className = "",
}: ConsequenceDiffProps) {
  return (
    <div className={`border border-[rgba(0,0,0,0.06)] rounded-xl bg-white overflow-hidden ${className}`}>
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-[#ece8df] bg-[#fbf9f5] text-[#73716a] text-[10px] uppercase tracking-wider">
            <th className="py-2.5 px-3">Measure</th>
            <th className="py-2.5 px-3">Plan v1 (Unrepaired)</th>
            <th className="py-2.5 px-3 text-[#2d5f47] font-bold bg-[#f3f9f6]">
              {repairTitle}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f2efe9]">
          {rows.map((r, i) => {
            const isDanger = r.highlight === "danger";
            const isSuccess = r.highlight === "success";

            return (
              <tr key={i} className="hover:bg-[#faf7f2] transition-colors">
                <td className="py-2.5 px-3 font-medium text-[#41423e]">{r.label}</td>
                <td
                  className={`py-2.5 px-3 font-mono ${
                    isDanger ? "text-[#b03d2d] bg-[#fdf2ef] font-semibold" : "text-[#585953]"
                  }`}
                >
                  {r.unrepairedCurrent}
                </td>
                <td
                  className={`py-2.5 px-3 font-mono bg-[#f8fbf9] ${
                    isSuccess ? "text-[#227447] font-semibold" : "text-[#1d1e1b]"
                  }`}
                >
                  {r.proposedRepair}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
