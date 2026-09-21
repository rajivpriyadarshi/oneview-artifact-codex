"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export interface AIGenerationAuraProps {
  statusText: string;
  stepNumber: number;
  totalSteps: number;
  className?: string;
}

export function AIGenerationAura({
  statusText,
  stepNumber,
  totalSteps,
  className = "",
}: AIGenerationAuraProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#faf8f5] via-[#f7f3ec] to-[#f4eee4] border border-[#e4dfd5] shadow-sm ${className}`}>
      {/* Organic floating gradient bubbles (ChatGPT canvas style) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-gradient-to-tr from-[#edd6b6] via-[#f5e3cd] to-transparent opacity-60 blur-2xl animate-pulse" />
        <div className="absolute -bottom-16 right-10 w-56 h-56 rounded-full bg-gradient-to-br from-[#dfd6f7] via-[#f1e8e0] to-transparent opacity-50 blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/3 right-1/4 w-36 h-36 rounded-full bg-gradient-to-r from-[#fae2dc] via-[#fcefdc] to-transparent opacity-40 blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md mx-auto py-8">
        <div className="w-12 h-12 rounded-2xl bg-white/90 border border-[#e2ddd4] shadow-md flex items-center justify-center mb-4 text-[#8a6635]">
          <Sparkles className="w-6 h-6 animate-spin duration-3000 text-[#b58c4f]" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#e4ded5] text-[11px] font-mono text-[#6f6d66] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#8b6534] animate-ping" />
          <span>AUTONOMOUS SYNTHESIS</span>
          <span className="text-[#a09e96]">·</span>
          <span>{stepNumber}/{totalSteps}</span>
        </div>

        <h3 className="font-serif text-2xl font-medium text-[#1d1e1a] mb-2">
          {statusText}
        </h3>

        <p className="text-xs text-[#7c7b74] max-w-xs leading-relaxed">
          Oneview is assembling portfolio holdings, committed cash outflows, and eligible lots using deterministic primitives.
        </p>

        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-[#e8e4db] rounded-full overflow-hidden mt-6">
          <div
            className="h-full bg-gradient-to-r from-[#8b6534] via-[#c69a58] to-[#8b6534] rounded-full transition-all duration-300"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
