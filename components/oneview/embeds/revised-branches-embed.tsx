"use client";

import React, { useState } from "react";
import { Check, Star, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface RevisedBranchesEmbedProps {
  onSelectBranch?: (branchId: string) => void;
  className?: string;
}

export function RevisedBranchesEmbed({
  onSelectBranch,
  className = "",
}: RevisedBranchesEmbedProps) {
  const [selectedId, setSelectedId] = useState<string>("branch-1");

  const branches = [
    {
      id: "branch-1",
      title: "Absorb vest & maintain 44% target (Recommended)",
      badge: "Requires Exception",
      isRecommended: true,
      exposurePath: "47.6% (Post-Vest) → 44.0%",
      pace: "12–15 months",
      nvdaAction: "Retain 100% position (23.2% NAV)",
      otherTechTrim: "Widen MSFT & AAPL trims",
      rationale:
        "Accommodates the incoming $420k vest naturally without forcing a sale of Prashanth's highest-conviction asset. Requires a documented exception for single-position >20%.",
    },
    {
      id: "branch-2",
      title: "Reach strict 44% by deep trim of other tech",
      badge: "Aggressive Ex-NVDA Trim",
      isRecommended: false,
      exposurePath: "47.6% (Post-Vest) → 44.0%",
      pace: "9–12 months",
      nvdaAction: "Retain 100% position (23.2% NAV)",
      otherTechTrim: "$520k across MSFT & AAPL",
      rationale:
        "Preserves NVDA conviction hold, but requires almost completely liquidating Microsoft and Apple holdings, generating an additional $84k in taxable gains.",
    },
    {
      id: "branch-3",
      title: "Sell new vest immediately to hit 44%",
      badge: "Breaches Conviction Directive",
      isRecommended: false,
      exposurePath: "47.6% (Post-Vest) → 44.0%",
      pace: "Immediate",
      nvdaAction: "Sell the $420k net vested shares",
      otherTechTrim: "Original plan trims",
      rationale:
        "Fastest glidepath back to original plan, but directly contradicts Prashanth's express preference to retain NVDA as an untouched long-term conviction holding.",
    },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between pb-2 border-b border-[#eee9de]">
        <span className="text-xs font-medium text-[#797871]">
          Evaluated adaptive paths following $420k NVDA vest
        </span>
        <span className="text-[11px] font-mono text-[#8b6534]">
          Projected Post-Vest Tech: <strong>47.6%</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {branches.map((b) => {
          const isSelected = selectedId === b.id;
          return (
            <div
              key={b.id}
              onClick={() => {
                setSelectedId(b.id);
                onSelectBranch?.(b.id);
                toast.success(`Selected: ${b.title}`);
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-xs ${
                isSelected
                  ? "bg-[#fffdfa] border-[#b88c49] shadow-sm ring-1 ring-[#b88c49]/40"
                  : "bg-white border-[#e5e1d7] hover:border-[#cfc9bb] hover:bg-[#faf9f6]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`text-[9.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      b.isRecommended
                        ? "bg-[#f5ede0] text-[#8b6534] border border-[#e8d7be]"
                        : "bg-[#f2efe8] text-[#6b6a63]"
                    }`}
                  >
                    {b.isRecommended && <Star className="w-2.5 h-2.5 fill-[#8b6534]" />}
                    <span>{b.badge}</span>
                  </span>

                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "border-[#8b6534] bg-[#8b6534] text-white"
                        : "border-[#cfcbbf] bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5" />}
                  </div>
                </div>

                <h4 className="font-sans text-[14px] font-semibold text-[#1c1d1a] leading-snug">
                  {b.title}
                </h4>

                <div className="mt-3 space-y-1.5 font-mono text-[11px] text-[#4d4e48] bg-[#fbfaf6] p-2.5 rounded-lg border border-[#eeebe3]">
                  <div className="flex justify-between">
                    <span className="text-[#888680]">Target Path:</span>
                    <strong className="text-[#1c1d1a]">{b.exposurePath}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#888680]">Pacing:</span>
                    <span>{b.pace}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#888680]">NVDA Action:</span>
                    <span className={b.nvdaAction.includes("0 NVDA") ? "text-[#246e45] font-semibold" : "text-[#b54a32]"}>
                      {b.nvdaAction}
                    </span>
                  </div>
                </div>

                <p className="mt-3 font-sans text-[12.5px] text-[#55544e] leading-[1.55]">
                  {b.rationale}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#f0ece3] flex items-center justify-between">
                <span className="text-[10px] text-[#88867f]">
                  {isSelected ? "Active selection" : "Click to adopt path"}
                </span>
                <span className="text-[11px] font-semibold text-[#8b6534] flex items-center gap-0.5">
                  <span>Select</span> <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
