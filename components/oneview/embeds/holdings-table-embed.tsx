"use client";

import React from "react";
import { PRASHANTH_HOLDINGS } from "../types";

export function HoldingsTableEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-white border border-[#e8e4dc] ${className}`}>
      <div className="p-3.5 pb-2.5 border-b border-[#eeebe3] flex items-center justify-between">
        <span className="text-xs font-medium text-[#797871]">
          Current holdings & account registration
        </span>
        <span className="text-[11px] font-mono text-[#8a8982]">
          Total Portfolio: <strong>$6.20M</strong>
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#eeebe3] bg-[#faf9f6] text-[10px] font-mono uppercase tracking-wider text-[#8a8880]">
              <th className="py-2.5 px-3.5 font-semibold">Position</th>
              <th className="py-2.5 px-3 font-semibold">Account</th>
              <th className="py-2.5 px-3 font-semibold text-right">Value</th>
              <th className="py-2.5 px-3 font-semibold">Weight</th>
              <th className="py-2.5 px-3 font-semibold text-right">Gain</th>
              <th className="py-2.5 px-3.5 font-semibold">Basis Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f2efe9]">
            {PRASHANTH_HOLDINGS.map((h) => (
              <tr key={h.symbol} className="hover:bg-[#fbfaf6] transition-colors">
                <td className="py-2.5 px-3.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${
                        h.isTech
                          ? "bg-[#faf4e8] text-[#8b6534] border border-[#f0e2cb]"
                          : "bg-[#f2efe9] text-[#555650]"
                      }`}
                    >
                      {h.symbol}
                    </span>
                    <span className="font-medium text-[#1c1d1a] truncate">
                      {h.name}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-[#55544e]">
                  {h.account}
                </td>
                <td className="py-2.5 px-3 font-mono text-right text-[#2d2e29]">
                  ${(h.marketValue / 1000).toFixed(0)}k
                </td>
                <td className="py-2.5 px-3 font-mono font-semibold text-[#1c1d1a]">
                  {h.allocationPct.toFixed(1)}%
                </td>
                <td className="py-2.5 px-3 font-mono text-right text-[#246e45]">
                  +${(h.unrealizedGain / 1000).toFixed(0)}k
                </td>
                <td className="py-2.5 px-3.5 text-[11px] font-mono text-[#5a5953]">
                  {h.basisStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
