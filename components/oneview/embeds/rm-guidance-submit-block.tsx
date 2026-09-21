"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function RMGuidanceSubmitBlock({ onSubmit }: { onSubmit?: () => void }) {
  const [guidanceText, setGuidanceText] = useState(
    "Keep NVDA. Show a slower reduction and compare downside if tech falls 20%."
  );

  return (
    <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#fffcf8] border border-[#e8dcc7] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#1c1d1a] text-white flex items-center justify-center font-sans text-xs font-semibold">
            S
          </div>
          <strong className="text-[13px] font-semibold text-[#1c1d1a] font-sans">
            Sarah (Lead RM) · Provide Guidance to Build Scenarios
          </strong>
        </div>
        <span className="text-[10px] font-mono text-[#8b6534] uppercase tracking-wider font-semibold hidden sm:inline-block">
          Interactive Direction
        </span>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={guidanceText}
          onChange={(e) => setGuidanceText(e.target.value)}
          rows={3}
          className="w-full p-4 rounded-xl border border-[#e0d6c3] bg-white text-[14px] font-sans text-[#292a26] leading-[1.55] focus:outline-none focus:ring-1 focus:ring-[#8b6534] resize-none"
        />
        {/* Resize handle detail */}
        <div className="absolute bottom-2 right-2 pointer-events-none opacity-40">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1L1 7" stroke="#8b6534" strokeLinecap="round"/>
            <path d="M7 4L4 7" stroke="#8b6534" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2 text-[11.5px] text-[#79776f] font-sans">
          <Sparkles className="w-3.5 h-3.5 text-[#b58e57]" />
          <span>AI will convert this into dynamic assumptions & 3 scenario branches</span>
        </div>

        <button
          onClick={() => {
            toast.success("RM guidance submitted. Assembling scenario branches...");
            onSubmit?.();
          }}
          className="px-5 py-2.5 rounded-xl bg-[#252622] text-white text-[13px] font-medium hover:bg-[#121311] transition-all flex items-center gap-2 shadow-sm"
        >
          <span>Submit Guidance & Generate Scenarios</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
