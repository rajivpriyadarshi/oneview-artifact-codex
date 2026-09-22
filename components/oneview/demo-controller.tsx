"use client";

import React, { useState, useEffect } from "react";
import { PrototypeStateStep, PROTOTYPE_STATES } from "./types";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sliders,
  ChevronUp,
  ChevronDown,
  Info,
} from "lucide-react";

interface DemoControllerProps {
  currentStep: PrototypeStateStep;
  onSetStep: (step: PrototypeStateStep) => void;
  onOpenPrimitives?: () => void;
  className?: string;
}

export function DemoController({
  currentStep,
  onSetStep,
  onOpenPrimitives,
  className = "",
}: DemoControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const meta = PROTOTYPE_STATES[currentStep];

  // Auto-play simulation effect
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      const next = currentStep < 11 ? currentStep + 1 : 1;
      const skip = next === 8 || next === 9 ? 10 : next;
      onSetStep(skip as PrototypeStateStep);
    }, 6000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, onSetStep]);

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-5 z-50 select-none flex items-center gap-2">
        {onOpenPrimitives && (
          <button
            onClick={onOpenPrimitives}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#1c1d1a]/95 text-[#d4af37] border border-[#383935] shadow-xl text-xs font-mono backdrop-blur-md hover:bg-[#0c0d0c] hover:border-[#d4af37]/60 transition-all"
          >
            <span>UI Primitives</span>
            <span className="text-[10px]">↗</span>
          </button>
        )}

        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1c1d1a]/95 text-white border border-[#383935] shadow-xl text-xs font-mono backdrop-blur-md hover:bg-[#0c0d0c] transition-all"
        >
          <Sliders className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Demo Controls ({currentStep}/11)</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[700px] max-w-[calc(100vw-32px)] select-none ${className}`}
    >
      <div className="p-2.5 bg-[#181916]/95 border border-[#333430] rounded-2xl shadow-2xl backdrop-blur-md text-white space-y-2">
        {/* Main Toolbar Row: Strict Non-Wrapping Fixed Widths */}
        <div className="flex items-center justify-between gap-2">
          {/* Left: State Indicator (Fixed 180px Width) */}
          <div className="w-[180px] shrink-0 flex items-center gap-2 min-w-0">
            <span className="text-[9.5px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#2a2b27] text-[#d4af37] border border-[#48453b] shrink-0">
              {currentStep}/11
            </span>
            <div className="text-[11.5px] font-medium truncate min-w-0" title={`${currentStep}. ${meta.title}`}>
              <span className="text-[#d4af37] mr-1 font-mono">#{currentStep}</span>
              <span className="text-[#dedad0]">{meta.shortLabel}</span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded text-[#9c9a92] hover:text-white transition-colors shrink-0"
              title={isExpanded ? "Collapse info" : "Expand scenario notes"}
            >
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <Info className="w-3 h-3" />}
            </button>
          </div>

          {/* Center: Step Selector Numbers (Fixed 11 Buttons) */}
          <div className="flex items-center gap-1 shrink-0 py-0.5">
            {(Array.from({ length: 11 }, (_, i) => (i + 1) as PrototypeStateStep)).filter(s => s !== 8 && s !== 9).map((step) => {
              const isCurrent = step === currentStep;
              return (
                <button
                  key={step}
                  data-step={step}
                  onClick={() => {
                    setIsPlaying(false);
                    onSetStep(step);
                  }}
                  className={`w-6 h-6 rounded-md font-mono text-[11px] font-semibold transition-all flex items-center justify-center shrink-0 ${
                    isCurrent
                      ? "bg-[#d4af37] text-[#181916] shadow-xs scale-105"
                      : "bg-[#282925] text-[#9c9a92] hover:bg-[#383935] hover:text-white"
                  }`}
                  title={PROTOTYPE_STATES[step].title}
                >
                  {step}
                </button>
              );
            })}
          </div>

          {/* Right: Controls & Actions (Fixed Width Group) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                setIsPlaying(false);
                if (currentStep > 1) {
                  const prev = currentStep - 1;
                  const skip = prev === 8 || prev === 9 ? 7 : prev;
                  onSetStep(skip as PrototypeStateStep);
                }
              }}
              disabled={currentStep === 1}
              className="p-1.5 rounded-lg bg-[#282925] hover:bg-[#383935] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
              title="Previous state"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-1.5 rounded-lg font-mono text-xs flex items-center gap-1 transition-all ${
                isPlaying
                  ? "bg-[#d4af37] text-[#181916] font-bold"
                  : "bg-[#282925] hover:bg-[#383935] text-white"
              }`}
              title={isPlaying ? "Pause walkthrough" : "Auto-play 6s states"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                if (currentStep < 11) {
                  const next = currentStep + 1;
                  const skip = next === 8 || next === 9 ? 10 : next;
                  onSetStep(skip as PrototypeStateStep);
                }
              }}
              disabled={currentStep === 11}
              className="p-1.5 rounded-lg bg-[#282925] hover:bg-[#383935] disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors"
              title="Next state"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {onOpenPrimitives && (
              <button
                onClick={onOpenPrimitives}
                className="flex items-center gap-1 text-[10.5px] font-mono px-2 py-1 rounded-md bg-[#242521] hover:bg-[#32332d] text-[#d4af37] border border-[#3e3f3a] transition-colors ml-1"
                title="Open Generic UI Primitives Gallery"
              >
                <span>Primitives</span>
                <span className="text-[9px]">↗</span>
              </button>
            )}

            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 text-[#8a8880] hover:text-white transition-colors text-[10px] font-mono ml-0.5"
              title="Minimize controller"
            >
              Hide
            </button>
          </div>
        </div>

        {/* Expandable Scenario Information Card */}
        {isExpanded && (
          <div className="pt-2 border-t border-[#2a2b26] text-xs space-y-1.5 font-sans animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11.5px]">
              <div className="bg-[#22231f] p-2.5 rounded-xl border border-[#333430]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] block font-bold">
                  RM Action at this step
                </span>
                <p className="text-[#d8d6cf] mt-0.5 leading-relaxed">
                  {meta.rmActionHint}
                </p>
              </div>

              <div className="bg-[#22231f] p-2.5 rounded-xl border border-[#333430]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] block font-bold">
                  AI Autonomous Action
                </span>
                <p className="text-[#d8d6cf] mt-0.5 leading-relaxed">
                  {meta.aiActionHint}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
