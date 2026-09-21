"use client";

import React, { useState } from "react";
import { RevisedBranchesEmbed } from "../embeds/revised-branches-embed";
import { CalloutCardEmbed } from "../embeds/callout-card-embed";
import { Check, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function State9UpdatedDirectionDoc({ onChooseDirection }: { onChooseDirection?: () => void }) {
  const [selectedBranch, setSelectedBranch] = useState("branch-1");

  return (
    <div className="space-y-8 max-w-[780px] mx-auto py-2">
      {/* Kicker */}
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#8b8a82]">
          ADAPTIVE REVISION REVIEW
        </div>
        <span className="text-[10px] font-mono text-[#8b6534] bg-[#fbf5eb] px-2.5 py-0.5 rounded-full border border-[#ebdcc4] font-semibold">
          ● In-Context Plan Update
        </span>
      </div>

      {/* Main H1 */}
      <div>
        <h1 className="font-serif text-[34px] sm:text-[38px] font-medium tracking-tight text-[#1a1b18] leading-[1.12]">
          Revised Direction: Accommodating the NVDA Vest
        </h1>
        <p className="font-sans text-[14px] text-[#4d4e48] leading-[1.55] mt-2">
          Rather than restarting from scratch, the plan has been adapted in-context. We recommend{" "}
          <span className="bg-[#f4ebd9] text-[#24231f] px-1.5 py-0.5 rounded font-medium">
            revising the terminal target to ~44%
          </span>{" "}
          to absorb the incoming shares without violating Prashanth’s core conviction hold.
        </p>
      </div>

      {/* Delta Narrative */}
      <div className="p-4 rounded-xl bg-white border border-[#e5e0d3] space-y-2">
        <h3 className="font-sans text-base font-semibold text-[#1c1d1a]">
          What Changed & Why We Recommend Option 1
        </h3>
        <p className="font-sans text-[14px] text-[#55544e] leading-[1.55]">
          The incoming +$420k net NVDA vest increases the portfolio to $6.62M and pushes NVDA to 23.2% of total assets, breaching the 20% firm single-position policy. Option 1 absorbs the new shares into the existing 12-month implementation timeline by deepening trims across MSFT and AAPL, while securing a documented IPS-policy exception for NVDA to exceed 20%.
        </p>
      </div>

      {/* 3 Revised Branches Embed */}
      <RevisedBranchesEmbed onSelectBranch={(id) => setSelectedBranch(id)} />

      {/* Note for Client Communication Block matching table specification */}
      <div className="p-4 rounded-xl bg-[#faf9f5] border border-[#e5dfd2] space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8b6534]">
          <MessageSquare className="w-4 h-4 text-[#8b6534]" />
          <span>Note for Client Communication</span>
        </div>
        <p className="font-sans text-[13.5px] text-[#4a4943] leading-[1.55] italic pl-5 border-l-2 border-[#8b6534]/50">
          “Prashanth, your October NVDA vest delivered roughly $420k of shares. If we retain them all, technology finishes near 47.6%. To stay on target, we can absorb the shares but we must widen the trims on Microsoft. Separately, the vest was withheld at a flat 22% federal rate—expect roughly $90K of additional federal tax on your 2026 return.”
        </p>
      </div>

      {/* Callout Card */}
      <CalloutCardEmbed title="Why Option 1 preserves client intent">
        Option 2 would force an unnatural 75% liquidation of Microsoft, creating high tax friction. Option 3 would sell NVDA shares Prashanth expressly requested to hold, triggering 10b5-1 preclearance delays. Option 1 secures a firm-policy exception for the single-stock concentration while avoiding tax drag.
      </CalloutCardEmbed>

      {/* Selection & Proceed CTA */}
      <div className="p-5 rounded-2xl bg-[#faf8f4] border border-[#ded8cb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <strong className="text-sm font-semibold text-[#1c1d1a] block">
            Confirm Updated Direction: Absorb vest & maintain 44% target
          </strong>
          <span className="text-xs text-[#6e6d66] block">
            Will trigger automatic drafting of Prashanth’s meeting memo with supporting charts.
          </span>
        </div>

        {onChooseDirection && (
          <button
            onClick={() => {
              toast.success("Updated direction adopted. Generating client discussion note...");
              onChooseDirection();
            }}
            className="px-5 py-2.5 rounded-lg bg-[#252622] text-white text-xs font-semibold hover:bg-[#121311] transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
          >
            <span>Proceed to Client Memo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
