"use client";

import React from "react";
import { ArrowLeft, Share, MoreHorizontal, ChevronDown } from "lucide-react";
import { PrototypeStateStep, PROTOTYPE_STATES } from "./types";
import { toast } from "sonner";

interface CanvasHeaderProps {
  currentStep: PrototypeStateStep;
  onPrev?: () => void;
  className?: string;
}

export function CanvasHeader({
  currentStep,
  onPrev,
  className = "",
}: CanvasHeaderProps) {
  const meta = PROTOTYPE_STATES[currentStep];

  const getDocTitle = () => {
    switch (meta.category) {
      case "detection":
        return "Autonomous Signal Detection";
      case "review":
        return "Exposure review";
      case "scenario":
        return "Scenario workspace";
      case "plan":
        return "Refined plan";
      case "signal":
        return "New signal received";
      case "direction":
        return "Updated direction";
      case "memo":
        return "Client discussion note";
      default:
        return "Living Artifact";
    }
  };

  const getBadgeLabel = () => {
    if (meta.isGenerating) return "Generating...";
    if (currentStep === 11) return "Final";
    if (currentStep === 7) return "Approved";
    return "Draft";
  };

  return (
    <header
      className={`h-14 border-b border-[#eeebe3] bg-white px-7 flex items-center justify-between shrink-0 select-none z-20 ${className}`}
    >
      {/* Left side matching screenshot: Arrow, Title, Draft badge, Timestamp */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onPrev}
          disabled={currentStep === 1}
          className="p-1 -ml-1 rounded-md text-[#52525b] hover:text-[#18181b] hover:bg-[#f6f5f1] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Previous artifact"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <span className="font-sans text-[14px] font-medium text-[#18181b] truncate">
          {getDocTitle()}
        </span>

        <span
          className={`px-2 py-0.5 rounded-full text-[11px] font-sans font-medium ${
            meta.isGenerating
              ? "bg-[#faf5eb] text-[#8b6534] animate-pulse"
              : currentStep === 11
              ? "bg-[#edf6f0] text-[#246e45]"
              : "bg-[#e7ebf0] text-[#4d5c70]"
          }`}
        >
          {getBadgeLabel()}
        </span>

        <span className="text-[12px] text-[#71717a] ml-0.5 hidden sm:inline-block">
          Last updated 10:28 AM
        </span>
      </div>

      {/* Right side matching media_1789981405045.png: Pill Share button and More options */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => toast.success("Share menu opened.")}
          className="px-4 py-1.5 rounded-full border border-[#d8d4cb] text-[13px] font-sans text-[#18181b] hover:bg-[#f6f5f1] font-normal transition-colors"
        >
          Share
        </button>

        <button
          onClick={() => toast.info("More artifact actions")}
          className="p-1.5 rounded-lg text-[#71717a] hover:text-[#18181b] hover:bg-[#f6f5f1] transition-colors"
          title="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
