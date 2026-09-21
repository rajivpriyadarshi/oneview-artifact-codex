"use client";

import React from "react";
import { AlertCircle, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { TechExposureTrendEmbed } from "../embeds/tech-exposure-trend";

export function State8NewSignalDoc({ onReevaluate }: { onReevaluate?: () => void }) {
  return (
    <div className="space-y-7 max-w-[780px] mx-auto py-2">
      {/* Kicker */}
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-widest text-[#a43825]">
        <span className="w-2 h-2 rounded-full bg-[#a43825] animate-ping" />
        <span>AUTONOMOUS SIGNAL DETECTED · PERSISTENT MONITORING</span>
      </div>

      {/* Main Title */}
      <div>
        <h1 className="font-serif text-[34px] sm:text-[38px] font-medium tracking-tight text-[#1a1b18] leading-[1.12]">
          NVDA Vest Requires Plan Revision
        </h1>
        <p className="font-sans text-[14px] text-[#4d4e48] leading-[1.55] mt-2">
          A confirmed October NVDA RSU vest of{" "}
          <span className="bg-[#faeae5] text-[#9c3a25] px-1.5 py-0.5 rounded font-semibold border border-[#f2cfc7]">
            +$420,000 net
          </span>{" "}
          invalidates the accepted trade schedule. NVDA crosses the 20% single-position threshold if the tranche is retained in full.
        </p>
      </div>

      {/* Signal Alert Banner */}
      <div className="p-5 rounded-2xl bg-[#fdf4f2] border border-[#f5cdc4] space-y-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#b53a22] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <strong className="text-sm font-semibold text-[#1e1f1c] block">
              Vest Confirmation & Tax Shortfall
            </strong>
            <p className="text-[#5f514d] leading-[1.55] font-sans text-[13.5px]">
              A ~$600K gross tranche settled with ~$180K withheld in shares. The federal portion is withheld at the flat 22% supplemental rate, under-withholding by roughly <strong>$90K</strong> — an ordinary-income liability on the 2026 return separate from the plan's capital gains reserve.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/90 border border-[#edd2ca] grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div>
            <span className="text-[#8e827f] text-[10px] uppercase">New Portfolio NAV</span>
            <div className="text-sm font-bold text-[#2d2e2a]">$6.62M</div>
          </div>
          <div>
            <span className="text-[#8e827f] text-[10px] uppercase">Net Vest</span>
            <div className="text-sm font-bold text-[#b53a22]">+$420K</div>
          </div>
          <div>
            <span className="text-[#8e827f] text-[10px] uppercase">Tech End-State</span>
            <div className="text-sm font-bold text-[#b53a22]">47.6%</div>
          </div>
          <div>
            <span className="text-[#8e827f] text-[10px] uppercase">NVDA if Retained</span>
            <div className="text-sm font-bold text-[#b53a22]">23.2%</div>
          </div>
        </div>
      </div>

      {/* Trajectory with Vesting Bump */}
      <div className="space-y-3">
        <h2 className="font-sans text-xl font-medium text-[#1c1d1a]">
          Effect of Incoming Shares on Exposure
        </h2>
        <TechExposureTrendEmbed currentPct={62} targetPct={44} showPostVestBump={true} />
      </div>

      {/* AI Feasibility Diagnostic */}
      <div className="p-4 rounded-xl bg-[#faf8f4] border border-[#e5dfd2] space-y-2.5 text-xs">
        <div className="flex items-center gap-2 text-[#7e6032] font-semibold">
          <Loader2 className="w-4 h-4 animate-spin text-[#8b6534]" />
          <span>Feasibility Diagnostic in Progress</span>
        </div>
        <p className="text-[#55544d] font-sans text-[13px] leading-[1.55]">
          The AI is calculating 3 adaptive routes to resolve the $420k vest: (1) relaxing target to 44%, (2) deep-trimming Microsoft and Apple, or (3) permitting a calibrated $120k NVDA trim.
        </p>
      </div>

      {/* Action to proceed */}
      <div className="pt-2 flex items-center justify-between border-t border-[#ede9df]">
        <span className="text-xs text-[#75746e]">
          Sarah’s instruction: <em>“Keep NVDA constraint if possible.”</em>
        </span>
        {onReevaluate && (
          <button
            onClick={onReevaluate}
            className="px-4 py-2 rounded-lg bg-[#252622] text-white text-xs font-semibold hover:bg-[#121311] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Review Revised Direction</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
