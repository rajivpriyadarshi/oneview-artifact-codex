"use client";

import React, { useState } from "react";
import {
  ChartEmbedPrimitive,
  MetricsStripPrimitive,
  ScenarioExplorerPrimitive,
  RecommendationCardPrimitive,
} from "../../primitives";
import { DownsideMatrixEmbed } from "../embeds/downside-matrix-embed";
import {
  ArrowRight,
  Shield,
  Settings,
  Calendar,
  TrendingDown,
  Layers,
  Gauge,
  Scale,
  Sparkles,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export interface State5ScenarioWorkspaceDocProps {
  onConsolidatePlan?: () => void;
  subView?: "workspace" | "downside" | "comparison";
  onSelectSubView?: (subView: "workspace" | "downside" | "comparison") => void;
}

export function State5ScenarioWorkspaceDoc({
  onConsolidatePlan,
  subView = "workspace",
  onSelectSubView,
}: State5ScenarioWorkspaceDocProps) {
  const [activeSubView, setActiveSubView] = useState<"workspace" | "downside" | "comparison">(subView);
  const [selectedBranch, setSelectedBranch] = useState<"A" | "B" | "C">("A");

  // Dynamic parameters held constant
  const [timeframe, setTimeframe] = useState<"12 months" | "18 months">("12 months");
  const [stressLevel, setStressLevel] = useState<"-20%" | "-30%">("-20%");
  const [nvdaPolicy, setNvdaPolicy] = useState<"Keep 100%" | "Allow small trim">("Keep 100%");

  // Sync internal state if prop changes
  React.useEffect(() => {
    if (subView) setActiveSubView(subView);
  }, [subView]);

  const handleSwitchSubView = (v: "workspace" | "downside" | "comparison") => {
    setActiveSubView(v);
    onSelectSubView?.(v);
  };

  const branchData = {
    A: {
      title: "A. Preserve NVDA and reduce other tech",
      description: `Reduce technology exposure to 44% over ${timeframe} by trimming $1.116M in unrestricted tech names, while keeping NVDA untouched.`,
      terminalTech: "44.0%",
      timeframeLabel: timeframe,
      points: timeframe === "12 months"
        ? [
            { label: "Now", value: 62, highlightLabel: "62%" },
            { label: "3M", value: 55 },
            { label: "6M", value: 50 },
            { label: "9M", value: 46 },
            { label: "12M", value: 44, highlightLabel: "44%" },
          ]
        : [
            { label: "Now", value: 62, highlightLabel: "62%" },
            { label: "4M", value: 57 },
            { label: "8M", value: 52 },
            { label: "12M", value: 48 },
            { label: "18M", value: 44, highlightLabel: "44%" },
          ],
      preserves: [
        "NVDA remains 100% untouched",
        "All targets are unrestricted names (no preclearance required)",
        "Specific-Lot ID elected (vs FIFO which would raise gain by $40k-$55k)",
      ],
      givesUp: [
        "Concentration stays elevated above 40% floor longer",
        `More downside risk in near term during ${stressLevel} correction`,
      ],
      taxEst: "Gain ~$392K, less $45K carryforward, at 23.8% rate → ~$82K federal reserve. ~$6K in 2026, $76K in 2027.",
      drawdownAtStress: stressLevel === "-20%" ? "-$545,600 (-8.8%)" : "-$818,400 (-13.2%)",
    },
    B: {
      title: "B. Relax the target to 46%",
      description: "Adjust the target corridor to 46% and pace dispositions over 18 months, lowering annual tax drag while preserving NVDA.",
      terminalTech: "46.0%",
      timeframeLabel: "18 months",
      points: [
        { label: "Now", value: 62, highlightLabel: "62%" },
        { label: "4M", value: 58 },
        { label: "8M", value: 54 },
        { label: "12M", value: 50 },
        { label: "18M", value: 46, highlightLabel: "46%" },
      ],
      preserves: [
        "NVDA position completely intact",
        "Lowest annual tax realization across 2 calendar years",
        "Minimum portfolio turnover (< 16% annualized)",
      ],
      givesUp: [
        "Tech concentration remains slightly above IPS ceiling (46% vs 45%)",
        "Higher residual equity volatility",
      ],
      taxEst: "Gain ~$290K, less $45K carryforward, at 23.8% rate → ~$58K federal reserve.",
      drawdownAtStress: stressLevel === "-20%" ? "-$570,400 (-9.2%)" : "-$855,600 (-13.8%)",
    },
    C: {
      title: "C. Allow a small NVDA trim",
      description: "Consider a modest 150-share trim in NVDA alongside non-core tech to reach 40% target quickly within 9 months.",
      terminalTech: "40.0%",
      timeframeLabel: "9 months",
      points: [
        { label: "Now", value: 62, highlightLabel: "62%" },
        { label: "3M", value: 52 },
        { label: "6M", value: 45 },
        { label: "9M", value: 40, highlightLabel: "40%" },
      ],
      preserves: [
        "Fastest path to comprehensive risk reduction",
        "Brings overall equity beta below 1.08",
        "Lowest downside risk in market correction",
      ],
      givesUp: [
        "Trims 150 shares of high-conviction NVDA position",
        "NVDA sale requires 10b5-1 preclearance execution window",
      ],
      taxEst: "Highest upfront gain ~$480K, less $45K carryforward, at 23.8% rate → ~$103K federal reserve.",
      drawdownAtStress: stressLevel === "-20%" ? "-$496,000 (-8.0%)" : "-$744,000 (-12.0%)",
    },
  };

  const currentBranch = branchData[selectedBranch];

  return (
    <div className="space-y-7 max-w-[820px] mx-auto py-2">
      {/* Sub-Artifact Tab Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-[#f4f2ec] rounded-xl border border-[#e5e1d7] w-fit text-xs font-sans">
        <button
          onClick={() => handleSwitchSubView("workspace")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeSubView === "workspace"
              ? "bg-white text-[#18181b] font-semibold shadow-2xs"
              : "text-[#71717a] hover:text-[#18181b]"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Scenario Workspace</span>
        </button>

        <button
          onClick={() => handleSwitchSubView("downside")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeSubView === "downside"
              ? "bg-white text-[#18181b] font-semibold shadow-2xs"
              : "text-[#71717a] hover:text-[#18181b]"
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>Downside Impact</span>
        </button>

        <button
          onClick={() => handleSwitchSubView("comparison")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeSubView === "comparison"
              ? "bg-white text-[#18181b] font-semibold shadow-2xs"
              : "text-[#71717a] hover:text-[#18181b]"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Scenario Comparison</span>
        </button>
      </div>

      {/* VIEW 1: DOWNSIDE IMPACT ARTIFACT */}
      {activeSubView === "downside" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#8b6534] font-bold block mb-1">
              STRESS TESTING ARTIFACT · DOWNSIDE RESILIENCE
            </span>
            <h1 className="font-serif text-[32px] sm:text-[36px] font-semibold tracking-tight text-[#18181b] leading-[1.14]">
              Downside Impact Simulation
            </h1>
            <p className="font-sans text-[14px] text-[#4b5563] leading-[1.55] mt-1.5">
              Evaluating how each candidate branch insulates Prashanth’s $6.20M portfolio against an immediate tech market correction.
            </p>
          </div>

          {/* Interactive Stress Level Toggle */}
          <div className="p-4 rounded-xl bg-[#faf8f4] border border-[#e8e2d4] flex flex-wrap items-center justify-between gap-3">
            <div>
              <strong className="text-xs font-sans font-semibold text-[#18181b] block">
                Simulated Market Shock
              </strong>
              <span className="text-[11.5px] font-sans text-[#71717a]">
                Select magnitude of technology equity drawdown:
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-[#e0dad0]">
              {(["-10%", "-20%", "-30%", "-40%"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setStressLevel(lvl === "-30%" || lvl === "-40%" ? "-30%" : "-20%");
                    toast.info(`Simulating market correction: ${lvl}`);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                    (stressLevel === "-20%" && (lvl === "-20%" || lvl === "-10%")) ||
                    (stressLevel === "-30%" && (lvl === "-30%" || lvl === "-40%"))
                      ? "bg-[#252622] text-white shadow-2xs"
                      : "text-[#52525b] hover:bg-[#f4f2ee]"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Full Downside Matrix Embed */}
          <div className="p-5 rounded-2xl bg-white border border-[#e8e4da] shadow-xs">
            <DownsideMatrixEmbed />
          </div>

          <div className="p-4 rounded-xl bg-[#edf6f0] border border-[#c4e3cf] flex items-center justify-between gap-3">
            <div className="text-xs font-sans text-[#246e45] leading-[1.55]">
              <strong>Key Finding:</strong> Branch A trims tech beta from 1.34 to 1.18, preserving $223,200 in NAV under a -20% correction while retaining 100% of NVDA upside.
            </div>
            <button
              onClick={() => handleSwitchSubView("workspace")}
              className="px-3.5 py-1.5 rounded-lg bg-[#246e45] text-white text-xs font-semibold hover:bg-[#1b5535] shrink-0"
            >
              Return to Workspace
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: SCENARIO COMPARISON MATRIX ARTIFACT */}
      {activeSubView === "comparison" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#8b6534] font-bold block mb-1">
              DECISION MATRIX · KEY TRADE-OFFS
            </span>
            <h1 className="font-serif text-[32px] sm:text-[36px] font-semibold tracking-tight text-[#18181b] leading-[1.14]">
              Scenario Comparison Matrix
            </h1>
            <p className="font-sans text-[14px] text-[#4b5563] leading-[1.55] mt-1.5">
              Side-by-side evaluation of the 3 candidate paths across terminal concentration, tax realization, and client alignment.
            </p>
          </div>

          {/* 4-Column Decision Matrix */}
          <div className="overflow-x-auto rounded-xl border border-[#e8e4da] bg-white shadow-xs">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#e8e4da] bg-[#faf8f4] text-[#71717a] font-mono uppercase text-[10.5px]">
                  <th className="p-3.5 font-medium">Dimension</th>
                  <th className="p-3.5 font-medium">Branch A (Recommended)</th>
                  <th className="p-3.5 font-medium">Branch B (Relax to 46%)</th>
                  <th className="p-3.5 font-medium">Branch C (Small NVDA Trim)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ece3] text-[#27272a]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#18181b]">Terminal Tech Weight</td>
                  <td className="p-3.5 font-mono text-[#246e45] font-bold">~44.0% NAV</td>
                  <td className="p-3.5 font-mono text-[#b58b4b] font-semibold">46.0% NAV</td>
                  <td className="p-3.5 font-mono text-[#246e45] font-bold">40.0% NAV</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#18181b]">NVDA Position</td>
                  <td className="p-3.5 text-[#246e45]">100% Retained (0 sales)</td>
                  <td className="p-3.5 text-[#246e45]">100% Retained (0 sales)</td>
                  <td className="p-3.5 text-[#a43b27]">Trim 150 shares (~$180k)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#18181b]">Pacing & Timeframe</td>
                  <td className="p-3.5 font-mono">{timeframe} (4 tranches)</td>
                  <td className="p-3.5 font-mono">18 months (6 tranches)</td>
                  <td className="p-3.5 font-mono">9 months (3 tranches)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#18181b]">Est. Realized Gains & Tax</td>
                  <td className="p-3.5 text-xs text-[#18181b]">{branchData.A.taxEst}</td>
                  <td className="p-3.5 text-xs text-[#246e45]">{branchData.B.taxEst}</td>
                  <td className="p-3.5 text-xs text-[#a43b27]">{branchData.C.taxEst}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#18181b]">Downside (-20% Tech)</td>
                  <td className="p-3.5 font-mono text-[#246e45]">-$352,000 (-8.8%)</td>
                  <td className="p-3.5 font-mono">-$368,000 (-9.2%)</td>
                  <td className="p-3.5 font-mono text-[#246e45] font-bold">-$320,000 (-8.0%)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#18181b]">Action</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => {
                        setSelectedBranch("A");
                        handleSwitchSubView("workspace");
                        toast.success("Selected Branch A.");
                      }}
                      className="px-3 py-1 rounded bg-[#252622] text-white font-semibold hover:bg-black"
                    >
                      Select Branch A
                    </button>
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => {
                        setSelectedBranch("B");
                        handleSwitchSubView("workspace");
                        toast.success("Selected Branch B.");
                      }}
                      className="px-3 py-1 rounded border border-[#d4cdbf] text-[#18181b] hover:bg-[#faf8f4]"
                    >
                      Select Branch B
                    </button>
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => {
                        setSelectedBranch("C");
                        handleSwitchSubView("workspace");
                        toast.success("Selected Branch C.");
                      }}
                      className="px-3 py-1 rounded border border-[#d4cdbf] text-[#18181b] hover:bg-[#faf8f4]"
                    >
                      Select Branch C
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: MAIN SCENARIO WORKSPACE (Default) */}
      {activeSubView === "workspace" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Title & Introductory Subhead */}
          <div className="space-y-3">
            <h1 className="font-serif text-[34px] sm:text-[38px] font-semibold tracking-tight text-[#18181b] leading-[1.14]">
              Exploring potential paths
            </h1>

            <p className="font-sans text-[13.5px] text-[#4b5563] leading-[1.55] pt-1">
              Based on your guidance and Prashanth’s preferences, I’ve explored{" "}
              <span className="bg-[#f5eedd] text-[#18181b] px-1 py-0.5 rounded font-medium">
                a few ways to reduce technology exposure while keeping NVDA as a core position.
              </span>
            </p>
          </div>

          {/* Section: What we're holding constant (4 Interactive Metric Cards) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[13px] font-sans font-medium text-[#18181b]">
                What we&apos;re holding constant
              </h4>
              <span className="text-[11px] font-mono text-[#8b6534]">
                Click card to adjust parameters
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Card 1: NVDA Policy */}
              <div
                onClick={() => {
                  const next = nvdaPolicy === "Keep 100%" ? "Allow small trim" : "Keep 100%";
                  setNvdaPolicy(next);
                  if (next === "Allow small trim") setSelectedBranch("C");
                  else setSelectedBranch("A");
                  toast.info(`NVDA Policy: ${next}`);
                }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#ece9e2] hover:border-[#dfdbd1] transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#f7f5f0] border border-[#e8e4dc] flex items-center justify-center text-[#8b6534] shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[13px] font-sans font-semibold text-[#18181b] block truncate">
                    {nvdaPolicy === "Keep 100%" ? "Keep NVDA" : "Trim NVDA"}
                  </span>
                  <p className="text-[11.5px] font-sans text-[#71717a] leading-tight mt-0.5">
                    {nvdaPolicy === "Keep 100%" ? "No change to position" : "Modest trim allowed"}
                  </p>
                </div>
              </div>

              {/* Card 2: Gradual change */}
              <div
                onClick={() => toast.info("Gradual change: executing across multiple quarterly tranches.")}
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#ece9e2] hover:border-[#dfdbd1] transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#f7f5f0] border border-[#e8e4dc] flex items-center justify-center text-[#8b6534] shrink-0">
                  <Settings className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[13px] font-sans font-semibold text-[#18181b] block truncate">
                    Gradual change
                  </span>
                  <p className="text-[11.5px] font-sans text-[#71717a] leading-tight mt-0.5">
                    Avoid large one-time moves
                  </p>
                </div>
              </div>

              {/* Card 3: Horizon */}
              <div
                onClick={() => {
                  const next = timeframe === "12 months" ? "18 months" : "12 months";
                  setTimeframe(next);
                  toast.info(`Timeframe toggled to: ${next}`);
                }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#ece9e2] hover:border-[#dfdbd1] transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#f7f5f0] border border-[#e8e4dc] flex items-center justify-center text-[#8b6534] shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-sans font-semibold text-[#18181b] truncate">
                      {timeframe}
                    </span>
                    <span className="text-[9.5px] font-mono text-[#8b6534] font-bold">Toggle</span>
                  </div>
                  <p className="text-[11.5px] font-sans text-[#71717a] leading-tight mt-0.5">
                    Target timeframe
                  </p>
                </div>
              </div>

              {/* Card 4: Stress test */}
              <div
                onClick={() => {
                  const next = stressLevel === "-20%" ? "-30%" : "-20%";
                  setStressLevel(next);
                  toast.info(`Stress scenario toggled to: ${next}`);
                }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#ece9e2] hover:border-[#dfdbd1] transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#f7f5f0] border border-[#e8e4dc] flex items-center justify-center text-[#8b6534] shrink-0">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-sans font-semibold text-[#18181b] truncate">
                      Stress {stressLevel}
                    </span>
                    <span className="text-[9.5px] font-mono text-[#8b6534] font-bold">Toggle</span>
                  </div>
                  <p className="text-[11.5px] font-sans text-[#71717a] leading-tight mt-0.5">
                    Assess downside impact
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Active Selected Scenario Explorer Card */}
          <div className="space-y-4 pt-1">
            <ScenarioExplorerPrimitive
              id={selectedBranch}
              title={currentBranch.title}
              description={currentBranch.description}
              isSelected={true}
              onSelect={() => {}}
              points={currentBranch.points}
              preserves={currentBranch.preserves}
              givesUp={currentBranch.givesUp}
            />

            {/* AI Proactive Recommendation Card */}
            <RecommendationCardPrimitive
              author="Zinc suggests"
              prompt={
                selectedBranch === "A"
                  ? "You asked for a slower path. Want me to extend this from 12 to 18 months and recompute the downside?"
                  : selectedBranch === "B"
                  ? "Branch B reduces annual capital gains by 40%. Ready to lock in this 18-month pacing schedule?"
                  : "Branch C achieves target exposure by Q2 '27. Want me to simulate lot selection for 150 NVDA shares?"
              }
              onApply={() => {
                if (selectedBranch === "A") {
                  setSelectedBranch("B");
                  setTimeframe("18 months");
                  toast.success("Extended to 18 months (Branch B applied).");
                } else {
                  toast.success("Applied recommendation to active branch.");
                }
              }}
              onModify={() => toast.info("Opening custom parameters slider...")}
              onComment={() => toast.info("Added note to advisor thread.")}
            />
          </div>

          {/* Section: Other Alternative Scenarios */}
          <div className="space-y-3 pt-2">
            <h2 className="font-sans text-[22px] font-semibold text-[#18181b]">
              Alternative scenarios worth comparing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Alternative 1 */}
              <div
                onClick={() => {
                  setSelectedBranch(selectedBranch === "A" ? "B" : "A");
                  toast.success(`Switched to Branch ${selectedBranch === "A" ? "B" : "A"}.`);
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  selectedBranch === "B"
                    ? "bg-[#faf8f4] border-[#8b6534] shadow-xs"
                    : "bg-white border-[#ece9e2] hover:border-[#dfdbd1]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-[18px] font-semibold text-[#18181b] tracking-tight">
                    {selectedBranch === "A" ? "B. Relax the target to 46%" : "A. Reduce other tech first"}
                  </h3>
                  {selectedBranch === "B" && (
                    <span className="w-5 h-5 rounded-full bg-[#8b6534] text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="font-sans text-[13.5px] text-[#4b5563] leading-[1.55] mt-2">
                  {selectedBranch === "A"
                    ? "Adjust the target range to 46% and reduce exposure more gradually over 12–18 months."
                    : "Target ~44% over 12 months by trimming other tech holdings, keeping NVDA untouched."}
                </p>
                <div className="mt-3 text-xs font-mono text-[#71717a]">
                  Terminal: {selectedBranch === "A" ? "46% NAV · 18m" : "44% NAV · 12m"}
                </div>
              </div>

              {/* Alternative 2 */}
              <div
                onClick={() => {
                  setSelectedBranch("C");
                  toast.success("Switched to Branch C.");
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  selectedBranch === "C"
                    ? "bg-[#faf8f4] border-[#8b6534] shadow-xs"
                    : "bg-white border-[#ece9e2] hover:border-[#dfdbd1]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-[18px] font-semibold text-[#18181b] tracking-tight">
                    C. Allow a small NVDA trim
                  </h3>
                  {selectedBranch === "C" && (
                    <span className="w-5 h-5 rounded-full bg-[#8b6534] text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="font-sans text-[13.5px] text-[#4b5563] leading-[1.55] mt-2">
                  Consider a modest reduction in NVDA alongside other tech holdings to reach closer to 40%, with fewer sales elsewhere.
                </p>
                <div className="mt-3 text-xs font-mono text-[#71717a]">
                  Terminal: 40% NAV · 9m
                </div>
              </div>
            </div>
          </div>

          {/* Downside Stress Test Resilience Analysis */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-[20px] font-semibold text-[#18181b]">
                Downside Resilience Analysis ({stressLevel} Tech Correction)
              </h3>
              <button
                onClick={() => handleSwitchSubView("downside")}
                className="text-xs font-sans text-[#8b6534] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Full Downside Model</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="font-sans text-[13.5px] text-[#4b5563] leading-[1.55]">
              Under a {stressLevel} market drawdown, {currentBranch.title} protects NAV to {currentBranch.drawdownAtStress} vs -$496,000 in unmanaged status quo:
            </p>
            <DownsideMatrixEmbed />
          </div>

          {/* Recommendation & Consolidation CTA */}
          <div className="p-5 rounded-2xl bg-[#faf8f4] border border-[#ded8cb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <strong className="text-sm font-sans font-semibold text-[#18181b] block">
                Selected Direction: {currentBranch.title}
              </strong>
              <span className="text-xs font-sans text-[#71717a] block">
                Ready to compile into a formal 12-month Refined Plan with quarterly execution milestones.
              </span>
            </div>

            {onConsolidatePlan && (
              <button
                onClick={() => {
                  toast.success(`Consolidating ${currentBranch.title} into Refined Plan...`);
                  onConsolidatePlan();
                }}
                className="px-5 py-2.5 rounded-lg bg-[#18181b] text-white text-xs font-sans font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
              >
                <span>Consolidate into Refined Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

