"use client";

import React, { useState } from "react";
import { PrototypeStateStep } from "./types";
import {
  ChevronDown,
  Plus,
  MoreHorizontal,
  Sparkles,
  BarChart3,
  FileText,
  ArrowRight,
  Send,
  CheckCircle2,
  AlertCircle,
  Gauge,
  Scale,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface ConversationThreadStreamProps {
  currentStep: PrototypeStateStep;
  onSelectStep: (step: PrototypeStateStep) => void;
  subView?: "workspace" | "downside" | "comparison";
  onSelectSubView?: (subView: "workspace" | "downside" | "comparison") => void;
  className?: string;
}

export function ConversationThreadStream({
  currentStep,
  onSelectStep,
  subView = "workspace",
  onSelectSubView,
  className = "",
}: ConversationThreadStreamProps) {
  const [composerText, setComposerText] = useState("");

  // Contextual quick prompt depending on active state
  const getContextualQuickPrompt = () => {
    switch (currentStep) {
      case 1:
        return "Run exposure review";
      case 3:
        return "Keep NVDA. Show a slower reduction and compare downside if tech falls 20%.";
      case 5:
        return "Proceed with Branch A: Protect NVDA, Target ~44%.";
      case 7:
        return "Prepare client discussion note.";
      default:
        return null;
    }
  };

  const quickPrompt = getContextualQuickPrompt();

  const handleSendPrompt = (textToSend?: string) => {
    const text = textToSend || composerText;
    if (!text.trim()) return;

    toast.success(`Sarah sent guidance: "${text.slice(0, 32)}..."`);
    setComposerText("");

    // Advance to the corresponding next state
    if (currentStep === 1) onSelectStep(2);
    else if (currentStep === 3) onSelectStep(4);
    else if (currentStep === 5) onSelectStep(6);
    else if (currentStep === 7) onSelectStep(10);
  };

  return (
    <div
      className={`w-[380px] lg:w-[420px] shrink-0 h-screen bg-white border-r border-[#e8e4db] flex flex-col justify-between overflow-hidden select-none z-10 ${className}`}
    >
      {/* Top Header matching Figma node 5771:29159 */}
      <div className="p-5 pb-3 border-b border-[#eeebe3] flex items-center justify-between shrink-0">
        <div>
          <button className="flex items-center gap-1.5 text-left group">
            <h2 className="font-serif text-[19px] font-semibold text-[#18181b] tracking-tight group-hover:text-[#8b6534] transition-colors">
              Manage tech concentration
            </h2>
            <ChevronDown className="w-4 h-4 text-[#71717a] group-hover:text-[#18181b]" />
          </button>
          <div className="text-[13px] font-sans text-[#71717a] mt-0.5">
            Prashanth Ranganathan
          </div>
        </div>

        <button
          title="New thread or note"
          onClick={() => toast.info("New thread session created.")}
          className="w-8 h-8 rounded-lg text-[#52525b] hover:text-[#18181b] hover:bg-[#f6f5f1] flex items-center justify-center transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Conversation Thread Stream: Shows Past & Current States ONLY */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin relative">
        {/* Continuous Connecting Thread Line behind all avatars */}
        <div className="absolute left-[33px] top-[26px] bottom-[26px] w-[1px] bg-[#e6e2d8] z-0" />

        {/* 1. Zinc - Thread started (9:12 AM) — ALWAYS VISIBLE (Step >= 1) */}
        <div className="relative flex items-start gap-3.5 z-10 group animate-in fade-in duration-200">
          <div className="w-7 h-7 rounded-full bg-[#f4ece1] border border-[#e8dcc9] text-[#8b6534] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-sans font-bold text-[#18181b]">
                  Zinc
                </span>
                <span className="text-[11px] font-sans text-[#71717a]">
                  9:12 AM
                </span>
              </div>
              <button className="text-[#9ca3af] hover:text-[#52525b] p-0.5">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[13px] font-sans font-semibold text-[#18181b]">
              Thread started
            </div>
            <p className="text-[12.5px] font-sans text-[#52525b] leading-relaxed">
              Detected elevated technology exposure (62.0%) in Prashanth&apos;s portfolio vs his preferred 40–44% corridor.
            </p>
          </div>
        </div>

        {/* Step 2 Generating Indicator in Thread */}
        {currentStep === 2 && (
          <div className="relative flex items-start gap-3.5 z-10 animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full bg-[#fcf8ef] border border-[#ebdcc2] text-[#8b6534] flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8b6534]" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-sans font-bold text-[#18181b]">Zinc</span>
                <span className="text-[11px] font-sans text-[#8b6534] font-medium">Composing review...</span>
              </div>
              <p className="text-[12px] font-sans text-[#71717a] italic">
                Parsing 5 liquid holdings & look-through sector breakdown...
              </p>
            </div>
          </div>
        )}

        {/* 2. Zinc - Exposure review ready (9:18 AM) — VISIBLE FOR Step >= 3 */}
        {currentStep >= 3 && (
          <div className="relative flex items-start gap-3.5 z-10 group animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full bg-[#f4ece1] border border-[#e8dcc9] text-[#8b6534] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-sans font-bold text-[#18181b]">
                    Zinc
                  </span>
                  <span className="text-[11px] font-sans text-[#71717a]">
                    9:18 AM
                  </span>
                </div>
                <button className="text-[#9ca3af] hover:text-[#52525b] p-0.5">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[13px] font-sans font-semibold text-[#18181b]">
                Exposure review ready
              </div>
              <p className="text-[12.5px] font-sans text-[#52525b] leading-relaxed">
                Technology exposure is 62%, above his preferred range (40–44%). NVDA remains a key holding.
              </p>

              {/* Attached Artifact Card: Exposure review */}
              <div
                onClick={() => onSelectStep(3)}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  currentStep === 3
                    ? "bg-[#fcf8ef] border-[#ebdcc2] shadow-xs ring-1 ring-[#8b6534]/20"
                    : "bg-white border-[#e5e1d7] hover:border-[#d2cdbf]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    currentStep === 3
                      ? "bg-[#f7f3ea] border border-[#ebdcc2] text-[#8b6534]"
                      : "bg-[#f6f5f1] border border-[#e8e4dc] text-[#71717a]"
                  }`}>
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-sans font-semibold text-[#18181b] truncate">
                      Exposure review
                    </div>
                    <div className="text-[11px] font-sans text-[#71717a]">
                      Portfolio analysis · 4 min
                    </div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 ml-2 ${currentStep === 3 ? "text-[#8b6534]" : "text-[#9ca3af]"}`} />
              </div>
            </div>
          </div>
        )}

        {/* 3. Sarah - RM Guidance (10:24 AM) — VISIBLE FOR Step >= 4 */}
        {currentStep >= 4 && (
          <div className="relative flex items-start gap-3.5 z-10 group animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full bg-[#828c94] text-white flex items-center justify-center font-sans text-xs font-bold shrink-0 shadow-2xs mt-0.5">
              S
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-sans font-bold text-[#18181b]">
                    Sarah
                  </span>
                  <span className="text-[11px] font-sans text-[#71717a]">
                    10:24 AM
                  </span>
                </div>
                <button className="text-[#9ca3af] hover:text-[#52525b] p-0.5">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[12.5px] font-sans text-[#18181b] leading-relaxed">
                Keep NVDA. Show a slower reduction and compare downside if tech falls 20%.
              </p>
            </div>
          </div>
        )}

        {/* Step 4 Generating Indicator in Thread */}
        {currentStep === 4 && (
          <div className="relative flex items-start gap-3.5 z-10 animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full bg-[#fcf8ef] border border-[#ebdcc2] text-[#8b6534] flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8b6534]" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-sans font-bold text-[#18181b]">Zinc</span>
                <span className="text-[11px] font-sans text-[#8b6534] font-medium">Generating 3 scenarios...</span>
              </div>
              <p className="text-[12px] font-sans text-[#71717a] italic">
                Converting guidance into assumptions & testing downside sensitivity...
              </p>
            </div>
          </div>
        )}

        {/* 4. Zinc - Exploring options (10:28 AM) — VISIBLE FOR Step >= 5 */}
        {currentStep >= 5 && (
          <div className="relative flex items-start gap-3.5 z-10 group animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full bg-[#f4ece1] border border-[#e8dcc9] text-[#8b6534] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-sans font-bold text-[#18181b]">
                    Zinc
                  </span>
                  <span className="text-[11px] font-sans text-[#71717a]">
                    10:28 AM
                  </span>
                </div>
                <button className="text-[#9ca3af] hover:text-[#52525b] p-0.5">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[13px] font-sans font-semibold text-[#18181b]">
                Exploring options
              </div>
              <p className="text-[12.5px] font-sans text-[#52525b] leading-relaxed">
                Based on your guidance and Prashanth&apos;s preferences, I&apos;ve explored a few ways to reduce technology exposure while keeping NVDA as a core position.
              </p>

              {/* Attached Artifacts List (3 Sub-Cards) */}
              <div className="space-y-1.5 pt-1">
                {/* Card 1: Scenario workspace */}
                <div
                  onClick={() => {
                    onSelectStep(5);
                    onSelectSubView?.("workspace");
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    currentStep === 5 && subView === "workspace"
                      ? "bg-[#fcf8ef] border-[#ebdcc2] shadow-xs ring-1 ring-[#8b6534]/20"
                      : "bg-white border-[#e5e1d7] hover:border-[#d2cdbf]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      currentStep === 5 && subView === "workspace"
                        ? "bg-[#f7f3ea] border border-[#ebdcc2] text-[#8b6534]"
                        : "bg-[#f6f5f1] border border-[#e8e4dc] text-[#71717a]"
                    }`}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-sans font-semibold text-[#18181b] truncate">
                        Scenario workspace
                      </div>
                      <div className="text-[11px] font-sans text-[#71717a]">
                        3 scenarios · 10 min
                      </div>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 ml-2 ${currentStep === 5 && subView === "workspace" ? "text-[#8b6534]" : "text-[#9ca3af]"}`} />
                </div>

                {/* Card 2: Downside impact */}
                <div
                  onClick={() => {
                    onSelectStep(5);
                    onSelectSubView?.("downside");
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    currentStep === 5 && subView === "downside"
                      ? "bg-[#fcf8ef] border-[#ebdcc2] shadow-xs ring-1 ring-[#8b6534]/20"
                      : "bg-white border-[#e5e1d7] hover:border-[#d2cdbf]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      currentStep === 5 && subView === "downside"
                        ? "bg-[#f7f3ea] border border-[#ebdcc2] text-[#8b6534]"
                        : "bg-[#f6f5f1] border border-[#e8e4dc] text-[#71717a]"
                    }`}>
                      <Gauge className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-sans font-semibold text-[#18181b] truncate">
                        Downside impact
                      </div>
                      <div className="text-[11px] font-sans text-[#71717a]">
                        Stress test · 3 min
                      </div>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 ml-2 ${currentStep === 5 && subView === "downside" ? "text-[#8b6534]" : "text-[#9ca3af]"}`} />
                </div>

                {/* Card 3: Scenario comparison */}
                <div
                  onClick={() => {
                    onSelectStep(5);
                    onSelectSubView?.("comparison");
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    currentStep === 5 && subView === "comparison"
                      ? "bg-[#fcf8ef] border-[#ebdcc2] shadow-xs ring-1 ring-[#8b6534]/20"
                      : "bg-white border-[#e5e1d7] hover:border-[#d2cdbf]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      currentStep === 5 && subView === "comparison"
                        ? "bg-[#f7f3ea] border border-[#ebdcc2] text-[#8b6534]"
                        : "bg-[#f6f5f1] border border-[#e8e4dc] text-[#71717a]"
                    }`}>
                      <Scale className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-sans font-semibold text-[#18181b] truncate">
                        Scenario comparison
                      </div>
                      <div className="text-[11px] font-sans text-[#71717a]">
                        Key trade-offs · 4 min
                      </div>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 ml-2 ${currentStep === 5 && subView === "comparison" ? "text-[#8b6534]" : "text-[#9ca3af]"}`} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. Sarah - Proceed with Branch A (10:35 AM) — VISIBLE FOR Step >= 6 */}
        {currentStep >= 6 && (
          <div className="relative flex items-start gap-3.5 z-10 group animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full bg-[#828c94] text-white flex items-center justify-center font-sans text-xs font-bold shrink-0 shadow-2xs mt-0.5">
              S
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-sans font-bold text-[#18181b]">Sarah</span>
                <span className="text-[11px] font-sans text-[#71717a]">10:35 AM</span>
              </div>
              <p className="text-[12.5px] font-sans text-[#18181b] leading-relaxed">
                Proceed with Branch A: Protect NVDA, trim other positions to ~44%.
              </p>
            </div>
          </div>
        )}

        {/* Step 6 Generating Indicator in Thread */}
        {currentStep === 6 && (
          <div className="relative flex items-start gap-3.5 z-10 animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full bg-[#fcf8ef] border border-[#ebdcc2] text-[#8b6534] flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8b6534]" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-sans font-bold text-[#18181b]">Zinc</span>
                <span className="text-[11px] font-sans text-[#8b6534] font-medium">Consolidating plan...</span>
              </div>
              <p className="text-[12px] font-sans text-[#71717a] italic">
                Structuring 4 quarterly pacing tranches & tax budget...
              </p>
            </div>
          </div>
        )}

        {/* 6. Zinc - Refined plan ready (10:38 AM) — VISIBLE FOR Step >= 7 */}
        {currentStep >= 7 && (
          <div className="relative flex items-start gap-3.5 z-10 group animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full bg-[#f4ece1] border border-[#e8dcc9] text-[#8b6534] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-sans font-bold text-[#18181b]">Zinc</span>
                <span className="text-[11px] font-sans text-[#71717a]">10:38 AM</span>
              </div>
              <div className="text-[13px] font-sans font-semibold text-[#18181b]">
                Refined plan ready
              </div>
              <p className="text-[12.5px] font-sans text-[#52525b] leading-relaxed">
                Consolidated 12-month glidepath trimming other tech across 4 quarterly phases.
              </p>

              <div
                onClick={() => onSelectStep(7)}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  currentStep === 7
                    ? "bg-[#fcf8ef] border-[#ebdcc2] shadow-xs ring-1 ring-[#8b6534]/20"
                    : "bg-white border-[#e5e1d7] hover:border-[#d2cdbf]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    currentStep === 7
                      ? "bg-[#f7f3ea] border border-[#ebdcc2] text-[#8b6534]"
                      : "bg-[#f6f5f1] border border-[#e8e4dc] text-[#71717a]"
                  }`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-sans font-semibold text-[#18181b] truncate">
                      Refined 12-Month Plan
                    </div>
                    <div className="text-[11px] font-sans text-[#71717a]">
                      Implementation plan · 6 min
                    </div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 ml-2 ${currentStep === 7 ? "text-[#8b6534]" : "text-[#9ca3af]"}`} />
              </div>
            </div>
          </div>
        )}

        {/* Step 10 Generating Indicator in Thread */}
        {currentStep === 10 && (
          <div className="relative flex items-start gap-3.5 z-10 animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full bg-[#edf6f0] border border-[#c4e3cf] text-[#246e45] flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#246e45]" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-sans font-bold text-[#18181b]">Zinc</span>
                <span className="text-[11px] font-sans text-[#246e45] font-medium">Drafting client note...</span>
              </div>
              <p className="text-[12px] font-sans text-[#71717a] italic">
                Formulating executive summary & downside protection highlights...
              </p>
            </div>
          </div>
        )}

        {/* 10. Zinc - Client note ready (11:20 AM) — VISIBLE FOR Step >= 11 */}
        {currentStep >= 11 && (
          <div className="relative flex items-start gap-3.5 z-10 group animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-full bg-[#edf6f0] border border-[#c4e3cf] text-[#246e45] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-sans font-bold text-[#18181b]">Zinc</span>
                <span className="text-[11px] font-sans text-[#71717a]">11:20 AM</span>
              </div>
              <div className="text-[13px] font-sans font-semibold text-[#18181b]">
                Client discussion note ready
              </div>
              <p className="text-[12.5px] font-sans text-[#52525b] leading-relaxed">
                Briefing memo ready for Prashanth&apos;s review before next rebalance window.
              </p>

              <div
                onClick={() => onSelectStep(11)}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  currentStep === 11
                    ? "bg-[#edf6f0] border-[#c4e3cf] shadow-xs ring-1 ring-[#246e45]/20"
                    : "bg-white border-[#e5e1d7] hover:border-[#d2cdbf]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#e4f4ea] border border-[#c4e3cf] flex items-center justify-center text-[#246e45] shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-sans font-semibold text-[#18181b] truncate">
                      Client Discussion Note
                    </div>
                    <div className="text-[11px] font-sans text-[#71717a]">
                      Discussion memo · 3 min
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#246e45] shrink-0 ml-2" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Composer Input with Contextual Prompt Chips */}
      <div className="p-3 border-t border-[#eeebe3] bg-white space-y-2">
        {/* Quick Suggestion Prompt Chip */}
        {quickPrompt && (
          <div
            onClick={() => handleSendPrompt(quickPrompt)}
            className="group flex items-center gap-1.5 p-2 rounded-xl bg-[#faf8f4] border border-[#ede7dc] hover:border-[#8b6534]/40 transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#8b6534] shrink-0" />
            <span className="text-[11px] font-sans text-[#6e6c64] group-hover:text-[#18181b] truncate flex-1">
              {currentStep === 3 ? `Path A: ${quickPrompt}` : quickPrompt}
            </span>
            <span className="text-[9.5px] font-mono font-bold text-[#8b6534] uppercase tracking-wider shrink-0">
              Send →
            </span>
          </div>
        )}

        {/* Input Pill */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt();
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#f7f5f0] border border-[#e5e1d7] shadow-2xs focus-within:border-[#8b6534] transition-colors"
        >
          <input
            type="text"
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            placeholder="Add guidance or ask Zinc anything..."
            className="w-full bg-transparent text-xs text-[#18181b] outline-none placeholder:text-[#9ca3af] font-sans"
          />
          <button
            type="submit"
            className="w-7 h-7 rounded-full bg-[#18181b] text-white flex items-center justify-center shrink-0 hover:bg-black transition-colors disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
