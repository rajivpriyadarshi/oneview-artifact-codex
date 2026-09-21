"use client";

import React from "react";
import { PrototypeStateStep } from "./types";
import {
  ArrowLeft,
  ArrowUp,
  Check,
  ChevronDown,
  AlertCircle,
  FileText,
  Target,
  PlusCircle,
} from "lucide-react";

interface ThreadRailProps {
  currentStep: PrototypeStateStep;
  onSelectStep: (step: PrototypeStateStep) => void;
  className?: string;
}

export function ThreadRail({
  currentStep,
  onSelectStep,
  className = "",
}: ThreadRailProps) {
  return (
    <aside
      className={`w-[320px] sm:w-[340px] shrink-0 h-screen bg-[#f7f6f4] border-r border-[#e8e5dc] flex flex-col justify-between overflow-hidden select-none ${className}`}
    >
      {/* Top Header & Thread Title */}
      <div className="p-6 pb-2 shrink-0">
        {/* Brand Emblem matching reference screenshot */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-6 h-6 flex items-center justify-center text-[#9a783e]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" />
            </svg>
          </div>
        </div>

        {/* Navigation Link matching screenshot */}
        <button
          onClick={() => onSelectStep(1)}
          className="inline-flex items-center gap-1.5 text-[13px] text-[#4b5563] hover:text-[#18181b] transition-colors mb-4 font-normal"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#52525b]" />
          <span>All threads</span>
        </button>

        {/* Thread Title & Client Name */}
        <div>
          <h2 className="font-serif text-[21px] font-semibold text-[#18181b] tracking-tight leading-snug">
            Manage tech concentration
          </h2>
          <div className="text-[13px] text-[#71717a] mt-0.5 font-sans">
            Prashanth Ranganathan
          </div>
        </div>
      </div>

      {/* Timeline Scroll Area matching screenshot */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 scrollbar-thin relative">
        {/* Node 1: Thread started */}
        <div
          onClick={() => onSelectStep(1)}
          className="relative flex items-start gap-3 cursor-pointer group"
        >
          {/* Vertical Connecting Line */}
          <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-[1px] bg-[#e5e2da] z-0" />

          {/* Node Icon */}
          <div className="relative z-10 w-6 h-6 rounded-full bg-[#3d7a5a] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
              <path d="M12 3v18M12 8l4-4M12 13l5-4M12 18l4-3M12 8l-4-4M12 13l-5-4M12 18l-4-3" />
            </svg>
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[13px] font-semibold text-[#18181b] group-hover:text-[#9a783e] transition-colors">
              Thread started
            </div>
            <div className="text-[12px] text-[#71717a] leading-tight mt-0.5">
              Detected elevated technology exposure
            </div>
            <div className="text-[11px] text-[#a1a1aa] mt-0.5">
              Today, 9:12 AM
            </div>
          </div>
        </div>

        {/* Node 2: Exposure review */}
        <div
          onClick={() => onSelectStep(currentStep <= 2 ? 2 : 3)}
          className="relative flex items-start gap-3 cursor-pointer group"
        >
          <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-[1px] bg-[#e5e2da] z-0" />

          <div className="relative z-10 w-6 h-6 rounded-full border border-[#4e8b6b] bg-transparent text-[#3d7a5a] flex items-center justify-center shrink-0 shadow-2xs">
            <Target className="w-3.5 h-3.5" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[13px] font-semibold text-[#18181b] group-hover:text-[#9a783e] transition-colors">
              Exposure review
            </div>
            <div className="text-[12px] text-[#71717a] mt-0.5">
              Completed
            </div>
          </div>
        </div>

        {/* Node 3: Sarah (You) RM Guidance */}
        <div
          onClick={() => onSelectStep(3)}
          className="relative flex items-start gap-3 cursor-pointer group"
        >
          <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-[1px] bg-[#e5e2da] z-0" />

          {/* Dark Avatar matching screenshot */}
          <div className="relative z-10 w-6 h-6 rounded-full bg-[#24353f] text-[#ded6c7] flex items-center justify-center font-serif text-xs font-semibold shrink-0 shadow-2xs">
            S
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[13px] font-semibold text-[#18181b]">
              Sarah (You)
            </div>
            <div className="text-[12px] text-[#4b5563] font-serif leading-relaxed mt-1">
              “Keep NVDA. Show a slower reduction and compare downside if tech falls 20%.”
            </div>
            <div className="text-[11px] text-[#a1a1aa] mt-1">
              Today, 10:24 AM
            </div>
          </div>
        </div>

        {/* Node 4: Exploring options (Steps 4 & 5) matching screenshot */}
        <div
          onClick={() => onSelectStep(currentStep <= 4 ? 4 : 5)}
          className="relative flex items-start gap-3 cursor-pointer group"
        >
          <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-[1px] bg-[#e5e2da] z-0" />

          <div className="relative z-10 w-6 h-6 rounded-full bg-[#826a3c] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[13px] font-semibold text-[#18181b] group-hover:text-[#9a783e] transition-colors">
              Exploring options
            </div>

            {/* Sub-artifacts under Exploring Options matching screenshot exactly */}
            <div className="mt-2 space-y-1">
              {/* Scenario workspace selected pill with bullseye icon */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectStep(5);
                }}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-[12.5px] transition-colors cursor-pointer ${
                  currentStep === 4 || currentStep === 5
                    ? "bg-[#ede7db] text-[#18181b] font-medium"
                    : "text-[#52525b] hover:bg-[#ede7db]/50"
                }`}
              >
                <Target className="w-3.5 h-3.5 text-[#52525b] shrink-0" />
                <span className="truncate">Scenario workspace</span>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectStep(5);
                }}
                className="flex items-center gap-2.5 px-3 py-1.5 text-[12.5px] text-[#52525b] hover:text-[#18181b] cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#71717a] shrink-0" />
                <span className="truncate">Downside impact</span>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectStep(5);
                }}
                className="flex items-center gap-2.5 px-3 py-1.5 text-[12.5px] text-[#52525b] hover:text-[#18181b] cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#71717a] shrink-0" />
                <span className="truncate">Scenario comparison</span>
              </div>
            </div>
          </div>
        </div>

        {/* Node 5: Refined plan */}
        <div
          onClick={() => onSelectStep(currentStep <= 6 ? 6 : 7)}
          className="relative flex items-start gap-3 cursor-pointer group"
        >
          <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-[1px] bg-[#e5e2da] z-0" />

          <div className="relative z-10 w-6 h-6 rounded-full border border-[#d4d1c8] text-[#8c8b85] flex items-center justify-center shrink-0 shadow-2xs">
            <ChevronDown className="w-3 h-3 text-[#9ca3af]" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[13px] font-normal text-[#71717a] group-hover:text-[#18181b] transition-colors">
              Refined plan
            </div>
          </div>
        </div>

        {/* Node 6: New signal received */}
        <div
          onClick={() => onSelectStep(8)}
          className="relative flex items-start gap-3 cursor-pointer group"
        >
          <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-[1px] bg-[#e5e2da] z-0" />

          <div className="relative z-10 w-6 h-6 rounded-full border border-[#d4d1c8] text-[#8c8b85] flex items-center justify-center shrink-0 shadow-2xs">
            <AlertCircle className="w-3 h-3 text-[#9ca3af]" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[13px] font-normal text-[#71717a] group-hover:text-[#18181b] transition-colors">
              New signal received
            </div>
          </div>
        </div>

        {/* Node 7: Updated direction */}
        <div
          onClick={() => onSelectStep(9)}
          className="relative flex items-start gap-3 cursor-pointer group"
        >
          <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-[1px] bg-[#e5e2da] z-0" />

          <div className="relative z-10 w-6 h-6 rounded-full border border-[#d4d1c8] text-[#8c8b85] flex items-center justify-center shrink-0 shadow-2xs">
            <Check className="w-3 h-3 text-[#9ca3af]" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[13px] font-normal text-[#71717a] group-hover:text-[#18181b] transition-colors">
              Updated direction
            </div>
          </div>
        </div>

        {/* Node 8: Client note */}
        <div
          onClick={() => onSelectStep(currentStep <= 10 ? 10 : 11)}
          className="relative flex items-start gap-3 cursor-pointer group"
        >
          <div className="relative z-10 w-6 h-6 rounded-full border border-[#d4d1c8] text-[#8c8b85] flex items-center justify-center shrink-0 shadow-2xs">
            <Check className="w-3 h-3 text-[#9ca3af]" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[13px] font-normal text-[#71717a] group-hover:text-[#18181b] transition-colors">
              Client note
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Composer Input matching screenshot */}
      <div className="p-4 bg-transparent shrink-0">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-[#e5e2da] shadow-2xs">
          <PlusCircle className="w-4 h-4 text-[#71717a] shrink-0 cursor-pointer hover:text-[#18181b] transition-colors" />
          <input
            type="text"
            placeholder="Add a note or ask anything..."
            className="w-full bg-transparent text-[12.5px] text-[#18181b] outline-none placeholder:text-[#9ca3af]"
          />
          <button className="w-7 h-7 rounded-full bg-[#eceae4] text-[#52525b] hover:bg-[#dedcd6] flex items-center justify-center shrink-0 transition-colors">
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
