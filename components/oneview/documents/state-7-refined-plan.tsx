"use client";

import React from "react";
import { ExposureOverTimeChart } from "../embeds/exposure-over-time-chart";
import { PacingTimelineEmbed } from "../embeds/pacing-timeline-embed";
import { CalloutCardEmbed } from "../embeds/callout-card-embed";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export function State7RefinedPlanDoc({ onApprovePlan }: { onApprovePlan?: () => void }) {
  return (
    <div className="space-y-8 max-w-[780px] mx-auto py-2">
      {/* Kicker */}
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#8b8a82]">
          REFINED TRANSITION PLAN
        </div>
        <span className="text-[10px] font-mono text-[#246e45] bg-[#edf6f0] px-2.5 py-0.5 rounded-full border border-[#cbe5d4] font-semibold">
          ● Decision-Ready Proposal
        </span>
      </div>

      {/* Main H1 */}
      <div>
        <h1 className="font-serif text-[34px] sm:text-[38px] font-medium tracking-tight text-[#1a1b18] leading-[1.14]">
          12-Month Technology Glidepath Plan
        </h1>
        <p className="font-sans text-[14px] text-[#4d4e48] leading-[1.55] mt-2">
          Reduce technology exposure from{" "}
          <span className="bg-[#f4ebd9] text-[#24231f] px-1.5 py-0.5 rounded font-medium">
            62.0% to ~44.0%
          </span>{" "}
          over 12 months while preserving NVDA as Prashanth’s core anchor holding.
        </p>
      </div>

      {/* Inline RM Review Proposed Edit */}
      

      {/* Key Takeaways Card */}
      <div className="p-5 rounded-2xl bg-[#faf8f4] border border-[#e5dfd2] space-y-3">
        <strong className="text-xs font-mono uppercase tracking-wider text-[#8b6534] block font-bold">
          Plan Directives & Baseline Guarantees
        </strong>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white border border-[#eee9de]">
            <span className="text-[#888680] block text-[11px]">Terminal Exposure</span>
            <strong className="text-lg font-sans text-[#1c1d1a] block mt-0.5">~44.0% NAV</strong>
            <span className="text-[10px] text-[#246e45] mt-1 block">Within agreed corridor</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#eee9de]">
            <span className="text-[#888680] block text-[11px]">NVDA Conviction</span>
            <strong className="text-lg font-sans text-[#1c1d1a] block mt-0.5">100% Held</strong>
            <span className="text-[10px] text-[#246e45] mt-1 block">0 sales permitted</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#eee9de]">
            <span className="text-[#888680] block text-[11px]">FY2026/27 Tax Budget</span>
            <strong className="text-lg font-sans text-[#1c1d1a] block mt-0.5">~$82k Reserve</strong>
            <span className="text-[10px] text-[#696760] mt-1 block">Post $45k carryforward</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="space-y-3">
        <h2 className="font-sans text-[21px] font-medium text-[#1c1d1a]">
          Projected Exposure Trajectory (Quarterly Glidepath)
        </h2>
        <div className="p-5 rounded-xl bg-white border border-[#e8e4dc]">
          <ExposureOverTimeChart
            points={[
              { label: "Now", value: 62, highlightLabel: "62%" },
              { label: "Q4 '26", value: 54 },
              { label: "Q1 '27", value: 49 },
              { label: "Q2 '27", value: 46 },
              { label: "Q3 '27", value: 44, highlightLabel: "~44%" },
            ]}
          />
        </div>
      </div>

      {/* Execution Table */}
      <div className="space-y-3">
        <h2 className="font-sans text-[21px] font-medium text-[#1c1d1a]">
          Implementation & Position Changes
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[#e8e4da] bg-white shadow-xs">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#e8e4da] bg-[#faf8f4] text-[#71717a] font-mono uppercase text-[10.5px]">
                <th className="p-3.5 font-medium">Holding</th>
                <th className="p-3.5 font-medium">Account</th>
                <th className="p-3.5 font-medium text-right">Current</th>
                <th className="p-3.5 font-medium text-right text-[#a43b27]">Planned Sale</th>
                <th className="p-3.5 font-medium text-right">End Value</th>
                <th className="p-3.5 font-medium text-right">End Wgt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ece3] text-[#27272a]">
              <tr>
                <td className="p-3.5 font-semibold text-[#18181b]">NVDA</td>
                <td className="p-3.5 text-[#55544e]">Equity award</td>
                <td className="p-3.5 font-mono text-right">$1.116M</td>
                <td className="p-3.5 font-mono text-right text-[#71717a]">—</td>
                <td className="p-3.5 font-mono text-right">$1.116M</td>
                <td className="p-3.5 font-mono text-right font-bold text-[#18181b]">18.0%</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[#18181b]">AAPL</td>
                <td className="p-3.5 text-[#55544e]">Joint taxable</td>
                <td className="p-3.5 font-mono text-right">$744K</td>
                <td className="p-3.5 font-mono text-right text-[#a43b27]">-$310K</td>
                <td className="p-3.5 font-mono text-right">$434K</td>
                <td className="p-3.5 font-mono text-right">7.0%</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[#18181b]">MSFT</td>
                <td className="p-3.5 text-[#55544e]">Joint taxable</td>
                <td className="p-3.5 font-mono text-right">$620K</td>
                <td className="p-3.5 font-mono text-right text-[#a43b27]">-$280K</td>
                <td className="p-3.5 font-mono text-right">$340K</td>
                <td className="p-3.5 font-mono text-right">5.5%</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[#18181b]">AMZN</td>
                <td className="p-3.5 text-[#55544e]">Joint taxable</td>
                <td className="p-3.5 font-mono text-right">$496K</td>
                <td className="p-3.5 font-mono text-right text-[#a43b27]">-$210K</td>
                <td className="p-3.5 font-mono text-right">$286K</td>
                <td className="p-3.5 font-mono text-right">4.6%</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[#18181b]">GOOGL</td>
                <td className="p-3.5 text-[#55544e]">Individual taxable</td>
                <td className="p-3.5 font-mono text-right">$372K</td>
                <td className="p-3.5 font-mono text-right text-[#a43b27]">-$160K</td>
                <td className="p-3.5 font-mono text-right">$212K</td>
                <td className="p-3.5 font-mono text-right">3.4%</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[#18181b]">AVGO</td>
                <td className="p-3.5 text-[#55544e]">Individual taxable</td>
                <td className="p-3.5 font-mono text-right">$248K</td>
                <td className="p-3.5 font-mono text-right text-[#a43b27]">-$90K</td>
                <td className="p-3.5 font-mono text-right">$158K</td>
                <td className="p-3.5 font-mono text-right">2.5%</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-[#18181b]">Tech ETF</td>
                <td className="p-3.5 text-[#55544e]">Joint taxable</td>
                <td className="p-3.5 font-mono text-right">$248K</td>
                <td className="p-3.5 font-mono text-right text-[#a43b27]">-$66K</td>
                <td className="p-3.5 font-mono text-right">$182K</td>
                <td className="p-3.5 font-mono text-right">2.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="font-sans text-xs text-[#55544e]">
          * Specific-lot identification is elected on every ticket. Custodian default is FIFO and would raise the realized gain by an estimated $40–55K across the 12-month program.
        </p>
      </div>

      {/* Reinvestment Protocol */}
      <CalloutCardEmbed title="Reinvestment Protocol & Coordination">
        <ul className="list-disc list-outside ml-3 space-y-1 mt-1 text-xs">
          <li><strong>Proceeds Reinvestment:</strong> All $1.116M of generated proceeds are swept directly into screened non-technology equities to maintain the 85-95% overall equity target.</li>
          <li><strong>Tax Reserving:</strong> ~$82K federal reserve requirement is calculated post-carryforward. Tax withholding must be coordinated with the client’s CPA manually prior to April 2027.</li>
          <li><strong>Monitoring:</strong> Plan assumes no new technology inflows. If additional RSU grants vest, the implementation schedule requires an immediate re-evaluation.</li>
        </ul>
      </CalloutCardEmbed>

      {/* Approval CTA */}
      <div className="p-5 rounded-2xl bg-[#faf8f4] border border-[#ded8cb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <strong className="text-sm font-semibold text-[#1c1d1a] block">
            Approve Plan for Implementation
          </strong>
          <span className="text-xs text-[#6e6d66] block">
            Approved plan will be locked in the thread. Background AI monitors continue tracking incoming equity grants.
          </span>
        </div>

        {onApprovePlan && (
          <button
            onClick={() => {
              toast.success("Plan approved by Sarah. Moving forward...");
              onApprovePlan();
            }}
            className="px-5 py-2.5 rounded-lg bg-[#252622] text-white text-xs font-semibold hover:bg-[#121311] transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Approve Direction</span>
          </button>
        )}
      </div>
    </div>
  );
}
