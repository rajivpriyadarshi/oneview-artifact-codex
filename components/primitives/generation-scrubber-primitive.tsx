"use client";

import React from "react";
import { Play, Pause } from "lucide-react";

export interface GenerationScrubberProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
  isPlaying?: boolean;
  onStepChange: (step: number) => void;
  onTogglePlay?: () => void;
  className?: string;
}

export function GenerationScrubberPrimitive({
  currentStep,
  totalSteps,
  label = "LOCAL",
  isPlaying = false,
  onStepChange,
  onTogglePlay,
  className = "",
}: GenerationScrubberProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/90 border border-[#dedad0] shadow-sm backdrop-blur-md text-xs font-mono text-[#555651] ${className}`}
    >
      <div className="flex items-center gap-1.5 font-bold tracking-wider text-[10px] text-[#78766f]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8b6534] animate-pulse" />
        <span>{label}</span>
      </div>

      <span className="text-[11px] font-semibold text-[#22231f]">
        {currentStep}/{totalSteps}
      </span>

      <input
        type="range"
        min={1}
        max={totalSteps}
        value={currentStep}
        onChange={(e) => onStepChange(Number(e.target.value))}
        className="w-24 sm:w-32 h-1.5 accent-[#8b6534] bg-[#eae6dc] rounded-lg cursor-pointer transition-all"
        aria-label="Generation history scrubber"
      />

      {onTogglePlay && (
        <button
          type="button"
          onClick={onTogglePlay}
          className="p-1 rounded-full hover:bg-[#f0ece3] text-[#4d4e48] transition-colors"
          title={isPlaying ? "Pause replay" : "Replay autonomous generation"}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
      )}
    </div>
  );
}
