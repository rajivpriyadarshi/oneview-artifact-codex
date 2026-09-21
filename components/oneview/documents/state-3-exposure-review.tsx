"use client";

import React, { useState } from "react";
import { SectorDonutEmbed } from "../embeds/sector-donut-embed";
import { HoldingsTableEmbed } from "../embeds/holdings-table-embed";
import { TechExposureTrendEmbed } from "../embeds/tech-exposure-trend";
import { ChevronRight, ChevronDown, Sparkles } from "lucide-react";

export function State3ExposureReviewDoc({ onAddGuidance }: { onAddGuidance?: () => void }) {
  const [expandedPath, setExpandedPath] = useState<string | null>(null);

  const paths = [
    {
      id: "A",
      title: "Preserve NVDA and reduce other technology",
      subtitle: "Move toward 44% over 12 months",
      desc: "Use AAPL, MSFT, AMZN, GOOGL, AVGO and the technology ETF. No preclearance required because NVDA is untouched.",
      sales: "~$1.116M",
      endState: "44%",
      tax: "~$82K",
      timeline: "12 months"
    },
    {
      id: "B",
      title: "Set a tax budget first",
      subtitle: "Cap the federal reserve near $60K",
      desc: "Work only the highest-basis lots and allow the achievable concentration target to float.",
      sales: "~$868K",
      endState: "~48%",
      tax: "~$58K",
      timeline: "Flexible"
    },
    {
      id: "C",
      title: "Reach ~40% faster",
      subtitle: "Allow a modest NVDA reduction",
      desc: "Less of the burden falls on the other technology positions. Requires an open window and a precleared 10b5-1 plan.",
      sales: "~$1.364M (trim ~$112K NVDA)",
      endState: "40%",
      tax: "~$87K",
      timeline: "6-9 months"
    },
    {
      id: "D",
      title: "Extend the glide path",
      subtitle: "Spread the reduction over 18 months",
      desc: "Keep NVDA and split realization across three tax years, accepting higher concentration for longer.",
      sales: "~$992K",
      endState: "~46%",
      tax: "~$66K",
      timeline: "18 months"
    }
  ];

  return (
    <div className="space-y-12 max-w-[840px] mx-auto py-4">
      
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#8b6534]">
            PORTFOLIO DIAGNOSIS & EXPOSURE REVIEW
          </div>
          <span className="text-[10px] font-mono text-[#246e45] bg-[#edf6f0] px-2 py-0.5 rounded-full border border-[#cbe5d4] font-semibold shadow-sm">
            ● Ready for RM Direction
          </span>
        </div>

        <div>
          <h1 className="font-serif text-[34px] sm:text-[38px] font-medium tracking-tight text-[#1a1b18] leading-[1.12]">
            Technology Exposure Review
          </h1>
          <p className="font-sans text-[15px] text-[#4d4e48] leading-[1.55] mt-2">
            Technology allocation has expanded to{" "}
            <span className="bg-[#fcf3e3] text-[#2d2c27] px-1.5 py-0.5 rounded font-medium border border-[#f5ead3]">
              62.0% ($3,844,000)
            </span>
            , well above the 35–45% IPS planning range.
          </p>
        </div>
      </div>

      {/* Constraints & Data Gaps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-white border border-[#e8e4dc] shadow-sm space-y-3">
          <div className="text-[11px] font-mono uppercase font-bold text-[#8b6534]">
            Relevant Constraints
          </div>
          <ul className="text-[14px] space-y-2.5 text-[#55544e] font-sans leading-[1.55]">
            <li><strong>Client:</strong> Keep NVDA as a core holding; prefer staged changes; remain growth-oriented.</li>
            <li><strong>Client:</strong> $300K liquidity reserve sits outside this plan.</li>
            <li><strong>Structural:</strong> NVDA requires preclearance/open window. Other 6 tech holdings are unrestricted.</li>
            <li><strong>Structural:</strong> A $45K capital loss carryforward from 2024 is available once.</li>
          </ul>
        </div>
        <div className="p-5 rounded-xl bg-white border border-[#e8e4dc] shadow-sm space-y-3">
          <div className="text-[11px] font-mono uppercase font-bold text-[#5c6e8a]">
            Data Gaps & Risk
          </div>
          <ul className="text-[14px] space-y-2.5 text-[#55544e] font-sans leading-[1.55]">
            <li><strong>Risk:</strong> 54% of portfolio is held in the five largest tech names.</li>
            <li><strong>Risk:</strong> -12.4% portfolio impact from a uniform -20% technology shock.</li>
            <li><strong>Data Gap:</strong> Cost basis on individual taxable account ($620K). Needs CPA verification before lot selection.</li>
            <li><strong>Data Gap:</strong> Does "keep NVDA" cover the upcoming October vest?</li>
          </ul>
        </div>
      </div>

      {/* Restored Tables & Charts from earlier version */}
      <div className="space-y-4">
        <h3 className="font-sans text-[18px] font-medium text-[#1c1d1a] border-b border-[#eeebe3] pb-2">
          Drivers & Unmanaged Trend
        </h3>
        <p className="font-sans text-[14.5px] text-[#55544e] leading-[1.6]">
          Market appreciation (~$1.19M), equity compensation (~$344K), and deferred rebalancing have driven the weight from 48% to 62%. Without proactive rebalancing, incoming equity vests will maintain technology concentration above 55% throughout the next 12 months.
        </p>
        <TechExposureTrendEmbed currentPct={62} targetPct={44} />
      </div>

      <div className="space-y-4">
        <h3 className="font-sans text-[18px] font-medium text-[#1c1d1a] border-b border-[#eeebe3] pb-2">
          Portfolio Sector Mix
        </h3>
        <SectorDonutEmbed />
      </div>

      <div className="space-y-4">
        <h3 className="font-sans text-[18px] font-medium text-[#1c1d1a] border-b border-[#eeebe3] pb-2">
          Direct Holdings & Basis Status
        </h3>
        <HoldingsTableEmbed />
      </div>

      {/* Expandable Directions / Potential Approaches */}
      <div className="space-y-4">
        <h2 className="font-serif text-[24px] font-medium text-[#1a1b18] leading-[1.2]">
          Potential approaches
        </h2>
        
        <div className="border border-[#e8e4dc] rounded-xl overflow-hidden bg-white shadow-sm">
          {paths.map((path, idx) => {
            const isExpanded = expandedPath === path.id;
            return (
              <div key={path.id} className={`border-b border-[#e8e4dc] last:border-b-0 ${isExpanded ? 'bg-[#faf9f6]' : 'bg-white'}`}>
                <button 
                  onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                  className="w-full text-left flex items-start sm:items-center gap-3 p-4 hover:bg-[#faf9f6] transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-[#8b6534] mt-0.5 sm:mt-0 shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[#8b6534] mt-0.5 sm:mt-0 shrink-0" />
                  )}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 sm:gap-6 items-start sm:items-center">
                    <strong className="text-[14.5px] font-sans text-[#1a1b18]">Path {path.id}: {path.title}</strong>
                    <span className="text-[14px] text-[#6c6b65] leading-[1.5]">{path.subtitle}</span>
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-4 pb-5 pl-[44px] animate-in slide-in-from-top-2 fade-in duration-200">
                    <p className="text-[14px] text-[#4d4e48] leading-[1.55] mb-4">
                      {path.desc}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 p-3.5 bg-white border border-[#e8e4dc] rounded-lg">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono text-[#797871] uppercase mb-0.5">Sales</span>
                        <span className="text-[13.5px] font-medium text-[#1a1b18]">{path.sales}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono text-[#797871] uppercase mb-0.5">End-state</span>
                        <span className="text-[13.5px] font-medium text-[#1a1b18]">{path.endState}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono text-[#797871] uppercase mb-0.5">Fed Tax Reserve</span>
                        <span className="text-[13.5px] font-medium text-[#1a1b18]">{path.tax}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-mono text-[#797871] uppercase mb-0.5">Timeline</span>
                        <span className="text-[13.5px] font-medium text-[#1a1b18]">{path.timeline}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Invisible test trigger */}
      {onAddGuidance && (
        <button onClick={onAddGuidance} className="opacity-0 w-full h-8 mt-8" aria-hidden="true" />
      )}
    </div>
  );
}
