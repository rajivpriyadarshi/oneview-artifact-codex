"use client";

import React from "react";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";

export function State1ThreadFormedDoc({ onNext }: { onNext?: () => void }) {
  return (
    <div className="space-y-6 max-w-[780px] mx-auto py-2">
      {/* Category Kicker */}
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-widest text-[#8b6534]">
        <span className="w-2 h-2 rounded-full bg-[#8b6534] animate-pulse" />
        <span>AUTONOMOUS SIGNAL DETECTION</span>
      </div>

      {/* Main Title */}
      <div>
        <h1 className="font-serif text-[34px] sm:text-[38px] font-medium tracking-tight text-[#1a1b18] leading-[1.12]">
          Manage tech concentration
        </h1>
        <p className="font-sans text-[14px] text-[#5a5952] leading-[1.55] mt-2">
          Autonomous monitor detected Prashanth’s portfolio technology weighting has increased to 62%, exceeding the agreed 40–44% mandate preference.
        </p>
      </div>

      {/* Assembling Status Strip */}
      <div className="p-4 rounded-xl bg-[#faf8f4] border border-[#e8e2d4] space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#795d33] font-semibold">
            <Loader2 className="w-4 h-4 animate-spin text-[#8b6534]" />
            <span>AI Background Workflow Active</span>
          </div>
          <span className="text-[11px] font-mono text-[#88867f]">Triggered Today, 9:12 AM</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-white border border-[#eae6dd] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#246e45]" />
            <span className="text-[#3c3d38]">Signal detected: <strong>62% Tech</strong></span>
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-[#eae6dd] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b6534] animate-ping" />
            <span className="text-[#3c3d38]">Gathering holdings & tax lots</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-[#eae6dd] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a8a69d]" />
            <span className="text-[#888680]">Assembling working note...</span>
          </div>
        </div>
      </div>

      {/* Initial Context Summary */}
      <div className="space-y-4 pt-2">
        <h2 className="font-sans text-xl font-medium text-[#1c1d1a]">
          Context & Trigger Origin
        </h2>
        <p className="font-sans text-[14px] text-[#4d4e48] leading-[1.55]">
          Over the past 60 days, outsized capital appreciation in NVIDIA (NVDA +38%) and Microsoft (MSFT +14%) combined with unvested equity award schedules has driven effective technology exposure to $3,844,000 out of a $6,200,000 investable portfolio across 6 accounts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#ded9ce] shadow-2xs space-y-2">
            <div className="text-[11px] font-mono uppercase font-bold text-[#8b6534]">
              Client Profile Directives
            </div>
            <ul className="text-xs space-y-2 text-[#55544e] font-sans leading-[1.55]">
              <li><strong>IPS Signed (Mar 14, 2025):</strong> Technology target range 35%–45%, total equity 85%–95%.</li>
              <li><strong>Client Preference:</strong> Prefers gradual rebalancing; averse to large front-loaded tax realizations.</li>
              <li><strong>Conviction Asset:</strong> Express mandate to maintain NVDA as a long-term core technology conviction.</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-xl bg-[#faf8f4] border border-[#e8e2d4] shadow-2xs space-y-2">
            <div className="text-[11px] font-mono uppercase font-bold text-[#b43f32]">
              Firm Policy Constraints
            </div>
            <ul className="text-xs space-y-2 text-[#55544e] font-sans leading-[1.55]">
              <li><strong>Sector Concentration:</strong> &gt;50% requires a documented plan. (Currently 62.0%)</li>
              <li><strong>Single Position:</strong> &gt;20% requires supervisory review and documented exception. (NVDA currently 18.0%, approaching threshold)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Prompt for RM */}
      <div className="pt-4 flex items-center justify-between border-t border-[#ede9df]">
        <span className="text-xs text-[#787670]">
          System is ready to generate the comprehensive Exposure Review document.
        </span>
        {onNext && (
          <button
            onClick={onNext}
            className="px-4 py-2 rounded-lg bg-[#252622] text-white text-xs font-semibold hover:bg-[#121311] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Generate Exposure Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
