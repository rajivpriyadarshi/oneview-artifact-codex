"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Sparkles, MessageSquare, Wand2, Check, X, CheckCheck } from "lucide-react";
import { toast } from "sonner";

/**
 * Contextual floating selection toolbar that appears ONLY when text is highlighted by the user.
 */
export function RoughdraftSelectionToolbar() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        setPosition(null);
        setSelectedText("");
        return;
      }

      const text = selection.toString().trim();
      if (text.length < 3) {
        setPosition(null);
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Only show if selection is within the visible document area
      if (rect.top > 0 && rect.left > 0) {
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
        });
        setSelectedText(text);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  if (!position) return null;

  return (
    <div
      className="fixed z-50 -translate-x-1/2 -translate-y-full flex items-center gap-1 p-1 bg-white border border-[#dedad0] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] animate-in fade-in zoom-in-95 duration-150 text-xs select-none"
      style={{ left: position.x, top: position.y }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <button
        onClick={() => {
          toast.success(`Editing: "${selectedText.slice(0, 24)}..."`);
          setPosition(null);
        }}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#3f403b] hover:bg-[#f5f3ee] hover:text-[#181916] transition-colors font-medium"
      >
        <Pencil className="w-3.5 h-3.5 text-[#7a7972]" />
        <span>Edit</span>
      </button>

      <button
        onClick={() => {
          toast.info(`Suggesting improvement for: "${selectedText.slice(0, 24)}..."`);
          setPosition(null);
        }}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#3f403b] hover:bg-[#f5f3ee] hover:text-[#181916] transition-colors font-medium"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#8b6534]" />
        <span>Suggest</span>
      </button>

      <button
        onClick={() => {
          toast.success(`Comment anchored to selection.`);
          setPosition(null);
        }}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#3f403b] hover:bg-[#f5f3ee] hover:text-[#181916] transition-colors font-medium"
      >
        <MessageSquare className="w-3.5 h-3.5 text-[#7a7972]" />
        <span>Comment</span>
      </button>

      <div className="w-[1px] h-4 bg-[#e5e1d8] mx-0.5" />

      <button
        onClick={() => {
          toast.success(`Rewriting in client-friendly tone...`);
          setPosition(null);
        }}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#8b6534] bg-[#faf6ee] hover:bg-[#f3ede1] transition-colors font-semibold"
      >
        <Wand2 className="w-3.5 h-3.5" />
        <span>Make client-friendly</span>
      </button>

      <button
        onClick={() => setPosition(null)}
        className="p-1 rounded-md text-[#9ca3af] hover:text-[#4b5563] transition-colors ml-0.5"
        title="Dismiss toolbar"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export interface SuggestionBlockProps {
  id?: string;
  author?: "RM" | "Zinc";
  authorName?: string;
  badgeLabel?: string;
  title: string;
  contextNote?: string;
  originalSnippet?: string;
  proposedSnippet?: string;
  onApply?: () => void;
  onDismiss?: () => void;
  className?: string;
}

/**
 * RM Review & Proposed Edit Card (Roughdraft CriticMarkup)
 * AI presents the artifact; the RM reviews, adds comments, and suggests edits.
 */
export function RoughdraftSuggestionCard({
  title,
  author = "RM",
  authorName = "Sarah",
  badgeLabel = "RM Proposed Edit",
  contextNote,
  originalSnippet,
  proposedSnippet,
  onApply,
  onDismiss,
  className = "",
}: SuggestionBlockProps) {
  const [dismissed, setDismissed] = useState(false);
  const [applied, setApplied] = useState(false);

  if (dismissed) return null;

  const isRM = author === "RM";

  return (
    <div
      className={`my-3.5 p-4 rounded-xl border bg-[#fffdfa] shadow-xs text-xs space-y-3 transition-all ${
        applied
          ? "border-[#cce3d4] bg-[#f9fdfa]"
          : isRM
          ? "border-[#e5dfd2]"
          : "border-[#eddcc5] bg-[#fdfaf5]"
      } ${className}`}
    >
      {/* Top Header: Author + Role + Badge + Dismiss */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          {isRM ? (
            <div className="w-6 h-6 rounded-full bg-[#828c94] text-white flex items-center justify-center font-sans text-[11px] font-bold shrink-0 shadow-2xs">
              S
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-[#f4ece1] border border-[#e8dcc9] text-[#8b6534] flex items-center justify-center shrink-0 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          )}

          <div className="flex items-center gap-2 truncate">
            <span className="font-sans font-semibold text-[#18181b] text-xs">
              {isRM ? `${authorName} (Lead Advisor)` : "Zinc (AI Co-pilot)"}
            </span>
            <span
              className={`text-[9.5px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                applied
                  ? "bg-[#edf6f0] text-[#246e45] border border-[#c4e3cf]"
                  : isRM
                  ? "bg-[#faf4e8] text-[#8b6534] border border-[#e8dfcf]"
                  : "bg-[#f4efe5] text-[#716f67] border border-[#ded8cb]"
              }`}
            >
              {applied ? "Applied to Document" : badgeLabel}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
          className="p-1 rounded text-[#9ca3af] hover:text-[#2d2e2a] hover:bg-[#f4f1ea] transition-colors"
          title="Dismiss note"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Reviewer Note / Directive */}
      <div className="font-serif text-[14px] text-[#242521] leading-snug">
        {title}
      </div>

      {contextNote && (
        <p className="font-sans text-[12px] text-[#52525b] leading-relaxed">
          {contextNote}
        </p>
      )}

      {/* Roughdraft CriticMarkup Diff: Strikethrough Deletion + Green Insertion */}
      {originalSnippet && proposedSnippet && (
        <div className="space-y-1.5 p-3 rounded-lg bg-[#f8f7f3] border border-[#eee9de] font-mono text-[11px] leading-relaxed">
          <div className="text-[#a43b27] line-through opacity-85">
            {originalSnippet}
          </div>
          <div className="text-[#246e45] font-semibold">
            {proposedSnippet}
          </div>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-[#f0ece3]">
        <span className="text-[10.5px] font-sans text-[#71717a]">
          {applied ? "Edits reflected in document" : "Roughdraft review suggestion"}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setApplied(true);
              toast.success("Accepted RM edit into document.");
              onApply?.();
            }}
            disabled={applied}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
              applied
                ? "bg-[#edf6f0] text-[#246e45] cursor-default"
                : "bg-[#252622] text-white hover:bg-black"
            }`}
          >
            {applied ? <CheckCheck className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
            <span>{applied ? "Applied" : "Apply Edit"}</span>
          </button>

          <button
            onClick={() => toast.info("Opening inline edit editor...")}
            className="px-2.5 py-1.5 rounded-lg text-[11px] text-[#55544d] hover:bg-[#f2efe8] font-medium transition-colors"
          >
            Modify
          </button>

          <button
            onClick={() => toast.success("Added reply to RM note.")}
            className="px-2.5 py-1.5 rounded-lg text-[11px] text-[#55544d] hover:bg-[#f2efe8] font-medium transition-colors"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
