"use client";

import React from "react";
import { ShieldCheck, Info } from "lucide-react";

export function CalloutCardEmbed({
  title = "Why retain NVDA as a core holding?",
  children,
  className = "",
}: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-4 rounded-xl bg-[#faf8f4] border border-[#e8e2d4] space-y-2 text-xs ${className}`}>
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#8b6534] shrink-0" />
        <strong className="font-sans text-[13.5px] text-[#1e1f1c]">
          {title}
        </strong>
      </div>
      <div className="font-sans text-[13px] text-[#55544d] leading-[1.55] pl-6">
        {children || (
          <>
            Prashanth holds strong long-term conviction in AI enterprise infrastructure tailwinds. Rather than forcing an artificial sale of the highest-conviction asset, our transition strategy achieves the ~44% exposure target by systematically monetizing lower-conviction liquid technology holdings (MSFT and AAPL) and absorbing incoming RSU tranches through calibrated rebalancing into non-correlated asset classes.
          </>
        )}
      </div>
    </div>
  );
}
