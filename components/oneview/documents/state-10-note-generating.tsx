"use client";

import React, { useState } from "react";
import { Loader2, ArrowRight, FileText, Mail, Presentation } from "lucide-react";

export function State10NoteGeneratingDoc({ onNext }: { onNext?: () => void }) {
  const [activeTab, setActiveTab] = useState<"memo" | "email" | "brief">("memo");
  const [progress, setProgress] = React.useState(45);

  React.useEffect(() => {
    const timer1 = setTimeout(() => setProgress(80), 800);
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
        <span>TRANSFORMING ARTIFACT: COMPOSING CLIENT-READY MEMO...</span>
      </div>

      {/* Output Format Switcher Tabs matching specification */}
      <div className="flex items-center gap-2 p-1 bg-[#f4f2ec] rounded-xl border border-[#e5e1d7] w-fit text-xs">
        <button
          onClick={() => setActiveTab("memo")}
          className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
            activeTab === "memo" ? "bg-white text-[#1c1d1a] shadow-2xs font-semibold" : "text-[#75746e] hover:text-[#2d2e2a]"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Discussion Note</span>
        </button>
        <button
          onClick={() => setActiveTab("email")}
          className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
            activeTab === "email" ? "bg-white text-[#1c1d1a] shadow-2xs font-semibold" : "text-[#75746e] hover:text-[#2d2e2a]"
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Executive Email</span>
        </button>
        <button
          onClick={() => setActiveTab("brief")}
          className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
            activeTab === "brief" ? "bg-white text-[#1c1d1a] shadow-2xs font-semibold" : "text-[#75746e] hover:text-[#2d2e2a]"
          }`}
        >
          <Presentation className="w-3.5 h-3.5" />
          <span>Meeting Brief</span>
        </button>
      </div>

      {/* Progress Status Bar */}
      <div className="p-4 rounded-xl bg-[#faf8f4] border border-[#e8e2d4] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#6d512a]">Applying Client-Friendly Tone & Visuals</span>
          <span className="font-mono text-[11px] text-[#8b6534]">Step 4 of 4</span>
        </div>
        <div className="w-full h-1.5 bg-[#eae5d8] rounded-full overflow-hidden">
          <div className="w-4/5 h-full bg-[#8b6534] rounded-full animate-pulse" />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8a8880]">
          <span className="text-[#246e45] font-semibold">✓ Pulled accepted ~44% plan</span>
          <span className="text-[#8b6534] font-semibold">● Formatting discussion points</span>
          <span className="text-[#a4a29a]">○ Embedding trajectory chart</span>
        </div>
      </div>

      {/* Skeleton Document Body */}
      <div className="space-y-4 pt-2">
        <div className="h-9 bg-[#eae6dd] rounded-lg w-2/3 animate-pulse" />
        <div className="h-4 bg-[#f0ecdf] rounded w-full animate-pulse" />
        <div className="h-4 bg-[#f0ecdf] rounded w-5/6 animate-pulse" />

        <div className="p-6 rounded-xl bg-white border border-[#eae6dd] space-y-3">
          <div className="h-5 bg-[#f0ecdf] rounded w-40 animate-pulse" />
          <div className="h-4 bg-[#f0ecdf] rounded w-full animate-pulse" />
          <div className="h-4 bg-[#f0ecdf] rounded w-3/4 animate-pulse" />
          <div className="h-32 bg-[#faf9f6] rounded-lg border border-dashed border-[#e4dfd4] flex items-center justify-center text-xs text-[#9a9890] gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#8b6534]" />
            <span>Rendering high-resolution glidepath chart...</span>
          </div>
        </div>
      </div>

      {onNext && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onNext}
            className="text-xs text-[#8b6534] hover:text-[#5f4420] font-medium flex items-center gap-1"
          >
            <span>Skip to Client Memo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
