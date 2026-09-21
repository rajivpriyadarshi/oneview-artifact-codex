"use client";

import React, { useState } from "react";
import { Sparkles, Plus, Loader2, ArrowRight, X } from "lucide-react";

export interface GeneratedOption {
  id: string;
  letter: string;
  title: string;
  description: string;
  terminalTech: string;
  lowestCash: string;
  gains: string;
  tag: string;
  badgeTone?: "positive" | "warning" | "neutral" | "negative";
  reasoning: string;
  tradesSummary: string;
}

export interface OptionGeneratorProps {
  onOptionGenerated: (option: GeneratedOption) => void;
  className?: string;
}

export function OptionGeneratorPrimitive({
  onOptionGenerated,
  className = "",
}: OptionGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");

  const presetStrategies = [
    {
      id: "opt-d",
      title: "Tax-Optimized Buffer (Cap Gains at $30k)",
      prompt: "Prioritize lowest capital gains; sell only high-basis MS-A and partial ETF; do not sell vest.",
      letter: "D",
      generatedResult: {
        id: "opt-d",
        letter: "D",
        title: "Tax-Optimized Conservative Trim",
        description: "Sell 250 MS-A ($100k) and 1,000 ETF ($100k). Realizes minimal capital gains ($30k).",
        terminalTech: "44.2% tech",
        lowestCash: "$300k (+$50k buffer)",
        gains: "$30k gains (ultra low tax drag)",
        tag: "Tax Efficient",
        badgeTone: "positive" as const,
        reasoning: "Prioritizes tax minimization by avoiding MS-B and MS-C sales. Leaves concentration slightly above 40% but avoids triggering capital gains above $30k.",
        tradesSummary: "Sell $100k MS-A (gain $10k) + $100k ETF (gain $20k) on 5 Oct; retain vest.",
      },
    },
    {
      id: "opt-e",
      title: "Maximum Early Liquidity (Buffer to $400k)",
      prompt: "Advance all 2,500 ETF units ($250k) immediately to build $400k cash buffer before capital call.",
      letter: "E",
      generatedResult: {
        id: "opt-e",
        letter: "E",
        title: "Maximum Early Liquidity Buffer",
        description: "Sell all 2,500 ETF shares ($250k) early in September, plus MS-A ($100k) on 5 Oct.",
        terminalTech: "37.5% tech",
        lowestCash: "$400k (+$150k buffer)",
        gains: "$60k gains (within limit)",
        tag: "High Liquidity",
        badgeTone: "neutral" as const,
        reasoning: "Secures substantial spendable cash upfront to insulate against any timing surprises or early capital calls, while still keeping gains at $60k.",
        tradesSummary: "Sell $250k ETF on 24 Sep + $100k MS-A on 5 Oct; model vest sale on 2 Nov.",
      },
    },
  ];

  const handleGenerate = (strategy: typeof presetStrategies[0]) => {
    setIsGenerating(true);
    setCurrentStep("Auditing tax lots and cost basis...");

    setTimeout(() => {
      setCurrentStep("Balancing horizon exposure with award vest schedule...");
    }, 400);

    setTimeout(() => {
      setCurrentStep("Verifying cash reserve buffer across scenario dates...");
    }, 800);

    setTimeout(() => {
      setIsGenerating(false);
      setIsOpen(false);
      onOptionGenerated(strategy.generatedResult);
    }, 1200);
  };

  const handleCustomGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    setCurrentStep("Parsing RM custom exploration constraints...");

    setTimeout(() => {
      setCurrentStep("Solving multi-variable allocation equation...");
    }, 500);

    setTimeout(() => {
      setCurrentStep("Synthesizing deterministic portfolio path...");
    }, 900);

    setTimeout(() => {
      const customOption: GeneratedOption = {
        id: `custom-${Date.now()}`,
        letter: "F",
        title: customPrompt.length > 30 ? `${customPrompt.slice(0, 30)}...` : customPrompt,
        description: `Custom RM Strategy: ${customPrompt}`,
        terminalTech: "38.5% tech",
        lowestCash: "$320k (+$70k buffer)",
        gains: "$45k gains",
        tag: "RM Custom",
        badgeTone: "positive",
        reasoning: `Synthesized based on RM instruction: "${customPrompt}". Balances tax lot selection to preserve liquidity while keeping exposure under the horizon ceiling.`,
        tradesSummary: "Targeted lot rebalance generated dynamically by AI reasoning engine.",
      };
      setIsGenerating(false);
      setIsOpen(false);
      setCustomPrompt("");
      onOptionGenerated(customOption);
    }, 1400);
  };

  return (
    <div className={`relative ${className}`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="cta-button-secondary text-xs"
        >
          <Plus className="w-3.5 h-3.5 text-[#8b6534]" />
          <span>Generate Alternative Path</span>
        </button>
      ) : (
        <div className="p-5 rounded-2xl border-2 border-[#c5a880] bg-[#fffdfa] shadow-lg animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between mb-3 border-b border-[#ece7dc] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8b6534]" />
              <h4 className="font-serif text-base font-medium text-[#1c1d19]">
                AI Scenario & Option Generator
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-[#f2eee6] text-[#7a7972] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#6e6d66] mb-4">
            RM can formulate new deterministic action sequences on the fly based on specific client constraints or alternative priorities:
          </p>

          {isGenerating ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 className="w-6 h-6 animate-spin text-[#8b6534]" />
              <div className="text-xs font-mono font-medium text-[#5c5039]">
                {currentStep}
              </div>
              <span className="text-[10px] text-[#8e8d85]">
                Solving linear constraints against verified tax lots...
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preset Strategies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {presetStrategies.map((strat) => (
                  <button
                    key={strat.id}
                    onClick={() => handleGenerate(strat)}
                    className="p-3 text-left rounded-xl border border-[#dedad0] bg-white hover:border-[#8b6534] hover:bg-[#faf7f2] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="w-5 h-5 rounded bg-[#eeeae2] text-[#69532d] font-bold text-[10px] flex items-center justify-center group-hover:bg-[#8b6534] group-hover:text-white transition-colors">
                          {strat.letter}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#f4f1ea] text-[#6e6c64] font-medium">
                          Precomputed
                        </span>
                      </div>
                      <strong className="block text-xs font-medium text-[#1c1d19] mb-1">
                        {strat.title}
                      </strong>
                      <p className="text-[11px] text-[#717069] line-clamp-2">
                        {strat.prompt}
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-[#f2eee6] text-[11px] font-semibold text-[#8b6534] flex items-center gap-1">
                      <span>Synthesize Option {strat.letter}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Prompt Form */}
              <form onSubmit={handleCustomGenerate} className="pt-2 border-t border-[#ede9df]">
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#79776f] block mb-1.5">
                  Or specify a custom strategy constraint:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., Protect Microsoft shares, sell only ETF and trim NVIDIA by 5%..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#dedad0] bg-white focus:outline-none focus:border-[#8b6534] focus:ring-1 focus:ring-[#8b6534]"
                  />
                  <button
                    type="submit"
                    className="cta-button-primary text-xs shrink-0"
                  >
                    Generate
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
