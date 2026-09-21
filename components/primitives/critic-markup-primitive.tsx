"use client";

import React, { useState } from "react";
import { MessageSquare, PenLine, Search, Check, Sparkles } from "lucide-react";

export interface ReviewItem {
  id: string;
  type: "comment" | "suggestion";
  author: string;
  at: string;
  anchorText: string;
  originalText?: string;
  suggestedText?: string;
  commentBody?: string;
  affectedSummary?: string;
  status: "open" | "applied" | "dismissed";
}

export interface CriticMarkupProps {
  children: React.ReactNode;
  onSuggest?: () => void;
  onComment?: () => void;
  onInspect?: () => void;
  activeSuggestions?: ReviewItem[];
  onApplySuggestion?: (id: string) => void;
  onDismissSuggestion?: (id: string) => void;
  className?: string;
}

export function CriticMarkupPrimitive({
  children,
  onSuggest,
  onComment,
  onInspect,
  activeSuggestions = [],
  onApplySuggestion,
  onDismissSuggestion,
  className = "",
}: CriticMarkupProps) {
  const [showToolbar, setShowToolbar] = useState(false);

  return (
    <div
      className={`group relative p-3 rounded-xl transition-all ${
        showToolbar ? "bg-[#fdfcf9] ring-1 ring-[#e0dacf]" : "hover:bg-[#fcfbfa]/80"
      } ${className}`}
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => setShowToolbar(false)}
    >
      {/* Floating Action Toolbar */}
      <div
        className={`absolute -top-3 right-4 z-20 flex items-center gap-1 p-1 rounded-lg bg-white border border-[#d6cfc2] shadow-md transition-all duration-150 ${
          showToolbar ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={onComment}
          className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-[#686761] hover:text-[#1a1b18] hover:bg-[#f3f0e8] transition-colors"
          title="Add inline comment"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#886a3d]" />
          <span>Comment</span>
        </button>
        <button
          type="button"
          onClick={onSuggest}
          className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-[#686761] hover:text-[#1a1b18] hover:bg-[#f3f0e8] transition-colors"
          title="Suggest edit"
        >
          <PenLine className="w-3.5 h-3.5 text-[#2b7055]" />
          <span>Suggest</span>
        </button>
        <button
          type="button"
          onClick={onInspect}
          className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium text-[#686761] hover:text-[#1a1b18] hover:bg-[#f3f0e8] transition-colors"
          title="Inspect calculation lineage"
        >
          <Search className="w-3.5 h-3.5 text-[#6c708a]" />
          <span>Inspect</span>
        </button>
      </div>

      {/* Main content body */}
      <div className="relative">{children}</div>

      {/* Active inline suggestions / CriticMarkup diff banners */}
      {activeSuggestions.length > 0 && (
        <div className="mt-3 space-y-2 border-t border-[#eeeae2] pt-2">
          {activeSuggestions.map((s) => (
            <div
              key={s.id}
              className="p-2.5 rounded-lg bg-[#fcf9f2] border border-[#ebdcc4] text-xs space-y-1.5 animate-in fade-in duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#8b6534]">
                  <Sparkles className="w-3 h-3 text-[#b38640]" />
                  <span>Proposed Change · {s.author}</span>
                </div>
                <span className="text-[10px] font-mono text-[#8a8780]">{s.at}</span>
              </div>

              {s.originalText && s.suggestedText && (
                <div className="font-mono text-[11px] space-y-1">
                  <div className="p-1 rounded bg-[#faece7] text-[#a13b2d] line-through">
                    {`{--${s.originalText}--}`}
                  </div>
                  <div className="p-1 rounded bg-[#e7f5ed] text-[#227246] font-semibold">
                    {`{++${s.suggestedText}++}`}
                  </div>
                </div>
              )}

              {s.commentBody && (
                <p className="text-[#555651] italic text-[11px]">{s.commentBody}</p>
              )}

              {s.affectedSummary && (
                <div className="text-[10px] text-[#78766f] bg-white/70 p-1 rounded border border-[#e4ded5]">
                  <span className="font-semibold text-[#545550]">Impact: </span>
                  {s.affectedSummary}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onDismissSuggestion?.(s.id)}
                  className="px-2 py-0.5 rounded text-[11px] text-[#6e6d67] hover:bg-[#eae5db]"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={() => onApplySuggestion?.(s.id)}
                  className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#262723] text-white hover:bg-[#111210] flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Apply to scenario</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
