"use client";

import React from "react";
import { Sparkles, Check, MessageSquare, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";

export interface RecommendationCardPrimitiveProps {
  author?: string;
  avatarIcon?: React.ReactNode;
  prompt: string;
  rationale?: string;
  onApply?: () => void;
  onModify?: () => void;
  onComment?: () => void;
  onDismiss?: () => void;
  applyLabel?: string;
  className?: string;
}

export function RecommendationCardPrimitive({
  author = "Zinc suggests",
  avatarIcon,
  prompt = "You asked for a slower path. Want me to extend this from 12 to 18 months and recompute the downside?",
  rationale,
  onApply,
  onModify,
  onComment,
  onDismiss,
  applyLabel = "Apply",
  className = "",
}: RecommendationCardPrimitiveProps) {
  return (
    <div
      className={`p-4 rounded-xl bg-[#faf8f4] border border-[#e8e4da] shadow-2xs transition-all ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Sparkle Avatar + Author + Prompt */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="w-6 h-6 rounded-full bg-[#f3ece0] text-[#8b6534] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            {avatarIcon || <Sparkles className="w-3.5 h-3.5" />}
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans font-semibold text-[#18181b]">
                {author}
              </span>
            </div>
            <p className="text-[13px] font-sans text-[#3f3f46] leading-relaxed">
              {prompt}
            </p>
            {rationale && (
              <p className="text-[11.5px] font-sans text-[#71717a] italic">
                {rationale}
              </p>
            )}
          </div>
        </div>

        {/* Right: Actions (Apply, Modify, Comment) */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            onClick={() => {
              if (onApply) onApply();
              else toast.success(`Applied recommendation: "${prompt.slice(0, 40)}..."`);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-[#8b6534] hover:bg-[#785528] text-white text-xs font-sans font-medium transition-colors shadow-xs"
          >
            {applyLabel}
          </button>

          <button
            onClick={() => {
              if (onModify) onModify();
              else toast.info("Opening parameter modifier...");
            }}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#f6f5f1] text-[#374151] border border-[#d8d4ca] text-xs font-sans font-normal transition-colors"
          >
            Modify
          </button>

          <button
            onClick={() => {
              if (onComment) onComment();
              else toast.info("Comment thread opened.");
            }}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#f6f5f1] text-[#374151] border border-[#d8d4ca] text-xs font-sans font-normal transition-colors"
          >
            Comment
          </button>

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1 rounded-md text-[#9ca3af] hover:text-[#4b5563] transition-colors"
              title="Dismiss recommendation"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
