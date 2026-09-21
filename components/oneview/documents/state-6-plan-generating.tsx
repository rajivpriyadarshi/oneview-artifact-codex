"use client";

import React from "react";
import { Loader2, ArrowRight } from "lucide-react";

export function State6PlanGeneratingDoc({ onNext }: { onNext?: () => void }) {
  const [progress, setProgress] = React.useState(40);

  React.useEffect(() => {
    const timer1 = setTimeout(() => setProgress(75), 800);
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
        <span>CONSOLIDATING BRANCH A INTO REFINED PLAN...</span>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <div className="h-9 bg-[#eae6dd] rounded-lg w-3/4 animate-pulse" />
        <p className="font-sans text-[14px] text-[#5a5952] leading-[1.55]">
          Collapsing exploratory branches into a committed 12-month implementation note with 4 quarterly rebalancing tranches.
        </p>
      </div>

      {/* Progress Stage Tracker */}
      <div className="p-4 rounded-xl bg-[#faf8f4] border border-[#e8e2d4] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#6d512a]">Synthesizing Implementation Gates</span>
          <span className="font-mono text-[11px] text-[#8b6534] font-bold">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-[#eae5d8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8b6534] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8a8880]">
          <span className={progress >= 40 ? "text-[#246e45] font-semibold" : "text-[#a4a29a]"}>
            ✓ Locked 0 NVDA sales
          </span>
          <span className={progress >= 75 ? "text-[#246e45] font-semibold" : "text-[#8b6534] font-semibold"}>
            {progress >= 75 ? "✓ Sequenced Microsoft quarterly lots" : "● Sequencing Microsoft quarterly lots"}
          </span>
          <span className={progress >= 100 ? "text-[#246e45] font-semibold" : "text-[#a4a29a]"}>
            {progress >= 100 ? "✓ Ready" : "○ Preparing tax budget"}
          </span>
        </div>
      </div>

      {/* Shimmer Pacing Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-xl bg-white border border-[#eae6dd] space-y-3 animate-pulse">
            <div className="h-4 bg-[#f0ecdf] rounded w-20" />
            <div className="h-6 bg-[#f0ecdf] rounded w-full" />
            <div className="h-3 bg-[#f0ecdf] rounded w-16" />
          </div>
        ))}
      </div>

      {/* Shimmer Trajectory Chart */}
      <div className="p-6 rounded-xl bg-white border border-[#eae6dd] h-44 flex items-center justify-center text-xs text-[#9a9992] gap-2 border-dashed">
        <Loader2 className="w-4 h-4 animate-spin text-[#8b6534]" />
        <span>Finalizing 62% → ~44% exposure glidepath...</span>
      </div>

      {onNext && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onNext}
            className="text-xs text-[#8b6534] hover:text-[#5f4420] font-medium flex items-center gap-1"
          >
            <span>Skip to Refined Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
