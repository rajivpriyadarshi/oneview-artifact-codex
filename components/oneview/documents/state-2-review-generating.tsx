"use client";

import React from "react";
import { Loader2, ArrowRight } from "lucide-react";

export function State2ReviewGeneratingDoc({ onNext }: { onNext?: () => void }) {
  const [progress, setProgress] = React.useState(35);

  React.useEffect(() => {
    const timer1 = setTimeout(() => setProgress(70), 800);
    const timer2 = setTimeout(() => setProgress(100), 1800);
    const timer3 = setTimeout(() => {
      onNext?.();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onNext]);

  return (
    <div className="space-y-6 max-w-[780px] mx-auto py-2">
      {/* Category Kicker */}
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-bold tracking-widest text-[#8b6534]">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8b6534]" />
        <span>COMPOSING EXPOSURE REVIEW ARTIFACT LIVE...</span>
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2">
        <div className="h-9 bg-[#eae6dd] rounded-lg w-3/4 animate-pulse" />
        <div className="h-5 bg-[#f0ecdf] rounded w-full animate-pulse" />
        <div className="h-5 bg-[#f0ecdf] rounded w-2/3 animate-pulse" />
      </div>

      {/* Progress Stage Tracker */}
      <div className="p-4 rounded-xl bg-[#faf8f4] border border-[#e8e2d4] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#6d512a]">Live Artifact Compilation</span>
          <span className="font-mono text-[11px] text-[#8b6534] font-bold">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-[#eae5d8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8b6534] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8a8880]">
          <span className={progress >= 35 ? "text-[#246e45] font-semibold" : "text-[#a4a29a]"}>
            ✓ Parsed 5 liquid positions
          </span>
          <span className={progress >= 70 ? "text-[#246e45] font-semibold" : "text-[#8b6534] font-semibold"}>
            {progress >= 70 ? "✓ Checked client directives" : "● Checking client directives"}
          </span>
          <span className={progress >= 100 ? "text-[#246e45] font-semibold" : "text-[#a4a29a]"}>
            {progress >= 100 ? "✓ Ready" : "○ Generating sector donut"}
          </span>
        </div>
      </div>

      {/* Inline Section 1 Placeholder */}
      <div className="space-y-3 pt-2">
        <div className="h-6 bg-[#eae6dd] rounded w-1/3 animate-pulse" />
        <div className="p-6 rounded-xl bg-white border border-[#e8e4dc] space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-[#f2eee6] rounded w-48 animate-pulse" />
            <div className="h-4 bg-[#f2eee6] rounded w-24 animate-pulse" />
          </div>
          {/* Chart Placeholder Box */}
          <div className="h-40 bg-[#f9f8f5] rounded-lg border border-dashed border-[#e2ddd1] flex flex-col items-center justify-center gap-2 text-xs text-[#8c8a82]">
            <Loader2 className="w-5 h-5 animate-spin text-[#8b6534]" />
            <span>Calculating look-through technology glidepath...</span>
          </div>
        </div>
      </div>

      {/* Inline Section 2 Holdings Table Placeholder */}
      <div className="space-y-3">
        <div className="h-6 bg-[#eae6dd] rounded w-1/4 animate-pulse" />
        <div className="p-4 rounded-xl bg-white border border-[#e8e4dc] space-y-2.5">
          <div className="h-4 bg-[#f2eee6] rounded w-full animate-pulse" />
          <div className="h-4 bg-[#f2eee6] rounded w-full animate-pulse" />
          <div className="h-4 bg-[#f2eee6] rounded w-5/6 animate-pulse" />
        </div>
      </div>

      {/* Manual advance if user doesn't want to wait */}
      {onNext && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onNext}
            className="text-xs text-[#8b6534] hover:text-[#5f4420] font-medium flex items-center gap-1"
          >
            <span>Skip generation animation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
