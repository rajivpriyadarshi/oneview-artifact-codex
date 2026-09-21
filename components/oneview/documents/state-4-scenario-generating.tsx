"use client";

import React from "react";
import { Sparkles, BarChart2, Target, Scale } from "lucide-react";

export function State4ScenarioGeneratingDoc({ onNext }: { onNext?: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onNext?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="max-w-[1000px] mx-auto py-8">
      {/* Title block */}
      <div className="mb-6">
        <h1 className="font-sans text-[22px] font-bold text-[#1c1d19] tracking-tight">
          Creating your path previews
        </h1>
        <p className="font-sans text-[14px] text-[#797871] mt-1">
          Each path is being generated with its own assumptions, analysis and projected outcomes.
        </p>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Card 1 */}
        <div className="rounded-2xl border border-[#f0ece3] bg-white overflow-hidden flex flex-col h-[220px]">
          <div className="p-5 flex-1">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#f2f8f4] flex items-center justify-center shrink-0">
                <BarChart2 className="w-6 h-6 text-[#456e58]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-sans text-[15px] font-bold text-[#1c1d19] mb-1">Hold & monitor</h3>
                <p className="font-sans text-[13px] text-[#797871] leading-[1.4]">
                  Maintain current position and monitor for changes.
                </p>
              </div>
            </div>
            
            {/* Skeleton text */}
            <div className="flex gap-2 mb-2">
              <div className="h-2.5 bg-[#f0efe9] rounded-full w-[45%]" />
              <div className="h-2.5 bg-[#f0efe9] rounded-full w-[35%]" />
            </div>
            <div className="h-2.5 bg-[#f0efe9] rounded-full w-[65%]" />
          </div>
          
          {/* Skeleton Chart Wave */}
          <div className="h-[60px] w-full relative">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full text-[#f2f8f4]">
              <path d="M0,30 Q25,10 50,25 T100,15 L100,40 L0,40 Z" fill="currentColor" opacity="0.6" />
              <path d="M0,30 Q25,10 50,25 T100,15" fill="none" stroke="#d5ebd9" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#f0ece3] bg-white overflow-hidden flex flex-col h-[220px]">
          <div className="p-5 flex-1">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#fdf5ea] flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-[#9a783e]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-sans text-[15px] font-bold text-[#1c1d19] mb-1">Selective reduction</h3>
                <p className="font-sans text-[13px] text-[#797871] leading-[1.4]">
                  Consider a slower, staged reduction while keeping NVDA.
                </p>
              </div>
            </div>
            
            {/* Skeleton text */}
            <div className="flex gap-2 mb-2">
              <div className="h-2.5 bg-[#f0efe9] rounded-full w-[35%]" />
              <div className="h-2.5 bg-[#f0efe9] rounded-full w-[40%]" />
            </div>
            <div className="h-2.5 bg-[#f0efe9] rounded-full w-[55%]" />
          </div>
          
          {/* Skeleton Chart Wave */}
          <div className="h-[60px] w-full relative">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full text-[#e8f1f8]">
              <path d="M0,35 Q30,35 50,20 T100,10 L100,40 L0,40 Z" fill="currentColor" opacity="0.5" />
              <path d="M0,35 Q30,35 50,20 T100,10" fill="none" stroke="#c9deef" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#f0ece3] bg-white overflow-hidden flex flex-col h-[220px]">
          <div className="p-5 flex-1">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#f0f2fa] flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6 text-[#4a5f9e]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-sans text-[15px] font-bold text-[#1c1d19] mb-1">Broader rebalance</h3>
                <p className="font-sans text-[13px] text-[#797871] leading-[1.4]">
                  Diversify across sectors while managing concentration risk.
                </p>
              </div>
            </div>
            
            {/* Skeleton text */}
            <div className="flex gap-2 mb-2">
              <div className="h-2.5 bg-[#f0efe9] rounded-full w-[40%]" />
              <div className="h-2.5 bg-[#f0efe9] rounded-full w-[45%]" />
            </div>
            <div className="h-2.5 bg-[#f0efe9] rounded-full w-[50%]" />
          </div>
          
          {/* Skeleton Chart Wave */}
          <div className="h-[60px] w-full relative">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full text-[#f2eef8]">
              <path d="M0,30 Q40,40 60,25 T100,15 L100,40 L0,40 Z" fill="currentColor" opacity="0.6" />
              <path d="M0,30 Q40,40 60,25 T100,15" fill="none" stroke="#e0d6f0" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* AI Note */}
      <div className="bg-[#fffbf5] border border-[#f5ebd6] rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-[#faebd7] flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-[#b58e57]" />
        </div>
        <div>
          <h3 className="font-sans text-[15px] font-bold text-[#1c1d19] mb-1">AI note</h3>
          <p className="font-sans text-[13px] text-[#55544e] leading-[1.5]">
            Each path gets a different surface because each requires different reasoning — from monitoring and risk thresholds, to staged reductions, to broader diversification. I'll share the full comparison once generation is complete.
          </p>
        </div>
      </div>
      
      {/* Hidden button for testing manual progression */}
      {onNext && (
        <button onClick={onNext} className="mt-8 opacity-0 w-full h-8" aria-hidden="true" />
      )}
    </div>
  );
}
