"use client";

import React, { useState } from "react";
import {
  X,
  Layers,
  LineChart,
  BarChart3,
  CheckSquare,
  AlertCircle,
  Table,
  Sliders,
  FileCode,
  Sparkles,
  PieChart,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import {
  ChartEmbedPrimitive,
  MetricsStripPrimitive,
  ScenarioExplorerPrimitive,
  RecommendationCardPrimitive,
  SignalAlertPrimitive,
  MediaEmbedPrimitive,
  CriticMarkupPrimitive,
} from "../primitives";
import { HoldingsTableEmbed } from "./embeds/holdings-table-embed";
import { DownsideMatrixEmbed } from "./embeds/downside-matrix-embed";
import { PacingTimelineEmbed } from "./embeds/pacing-timeline-embed";

interface PrimitivesGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PrimitiveCategory =
  | "charts"
  | "metrics"
  | "scenarios"
  | "recommendations"
  | "breakdown"
  | "matrix"
  | "checklist"
  | "alerts"
  | "criticmarkup"
  | "media";

export function PrimitivesGalleryModal({
  isOpen,
  onClose,
}: PrimitivesGalleryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<PrimitiveCategory>("charts");
  const [chartSubtype, setChartSubtype] = useState<"trajectory" | "bar" | "donut" | "area">("trajectory");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-[1100px] h-[85vh] bg-[#fbfaf8] border border-[#d8d4ca] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 px-6 border-b border-[#e5e1d7] bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#252622] text-white flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-[18px] font-semibold text-[#18181b]">
                Oneview Generic UI Primitives System
              </h2>
              <p className="text-[12px] font-sans text-[#71717a]">
                Generalised, reusable components for living financial reports and client artifacts.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#71717a] hover:text-[#18181b] hover:bg-[#f5f3ee] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: Left Nav + Right Preview Canvas */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Left Category Selector */}
          <div className="w-[240px] shrink-0 border-r border-[#e8e4da] bg-[#f8f7f4] p-3 overflow-y-auto space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8e8d85] px-2.5 py-1 block">
              Component Primitives
            </span>

            {[
              { id: "charts", label: "Chart Embed", icon: LineChart },
              { id: "metrics", label: "Metrics & KPI Strip", icon: Sliders },
              { id: "scenarios", label: "Scenario Explorer", icon: Layers },
              { id: "recommendations", label: "AI Recommendations", icon: Sparkles },
              { id: "breakdown", label: "Breakdown Data Table", icon: Table },
              { id: "matrix", label: "Comparison Matrix", icon: BarChart3 },
              { id: "checklist", label: "Execution Checklist", icon: CheckSquare },
              { id: "alerts", label: "Signal Alerts & Banners", icon: AlertCircle },
              { id: "criticmarkup", label: "CriticMarkup & Review", icon: FileCode },
              { id: "media", label: "Media & Document Embed", icon: ImageIcon },
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as PrimitiveCategory)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-sans transition-colors ${
                    isActive
                      ? "bg-[#252622] text-white font-medium shadow-xs"
                      : "text-[#52525b] hover:bg-[#eae6dc] hover:text-[#18181b]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Live Component Canvas */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* 1. Charts */}
            {selectedCategory === "charts" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-[20px] font-semibold text-[#18181b]">
                      ChartEmbedPrimitive
                    </h3>
                    <p className="text-xs font-sans text-[#71717a]">
                      A generalised chart embed supporting trajectory glidepaths, area fills, bar allocations, and proportional rings.
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-[#ede9df] p-1 rounded-xl text-xs">
                    {(["trajectory", "area", "bar", "donut"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setChartSubtype(t)}
                        className={`px-3 py-1 rounded-lg capitalize font-sans transition-colors ${
                          chartSubtype === t
                            ? "bg-white text-[#18181b] font-medium shadow-2xs"
                            : "text-[#52525b] hover:text-[#18181b]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e8e4da] shadow-xs">
                  <ChartEmbedPrimitive
                    type={chartSubtype}
                    title={
                      chartSubtype === "trajectory"
                        ? "Technology exposure glidepath (% of portfolio)"
                        : chartSubtype === "donut"
                        ? "Asset class concentration breakdown"
                        : chartSubtype === "bar"
                        ? "Single-stock allocation vs S&P 500 benchmarks"
                        : "Drawdown tolerance band over 18 months"
                    }
                  />
                </div>
              </div>
            )}

            {/* 2. Metrics Strip */}
            {selectedCategory === "metrics" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-[#18181b]">
                    MetricsStripPrimitive
                  </h3>
                  <p className="text-xs font-sans text-[#71717a]">
                    Generalised KPI cards for parameters held constant, portfolio benchmarks, and delta indicators.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e8e4da] shadow-xs space-y-6">
                  <MetricsStripPrimitive
                    title="What we're holding constant"
                    items={[
                      { id: "1", label: "Keep NVDA", sublabel: "No change to core position" },
                      { id: "2", label: "Gradual change", sublabel: "Avoid large one-time moves" },
                      { id: "3", label: "12 months", sublabel: "Target timeframe" },
                      { id: "4", label: "Stress test -20%", sublabel: "Assess downside impact" },
                    ]}
                  />

                  <MetricsStripPrimitive
                    title="Portfolio Health Metrics (With Delta Indicators)"
                    columns={3}
                    items={[
                      { id: "m1", label: "Beta vs S&P 500", value: "1.34", delta: "+0.18", isPositiveDelta: false, sublabel: "High equity sensitivity" },
                      { id: "m2", label: "Liquid Reserves", value: "$1.52M", delta: "+$320k", isPositiveDelta: true, sublabel: "38% non-tech coverage" },
                      { id: "m3", label: "Realized Tax Est.", value: "$64k", delta: "-$32k", isPositiveDelta: true, sublabel: "Offset by loss harvest" },
                    ]}
                  />
                </div>
              </div>
            )}

            {/* 3. Scenario Explorer */}
            {selectedCategory === "scenarios" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-[#18181b]">
                    ScenarioExplorerPrimitive
                  </h3>
                  <p className="text-xs font-sans text-[#71717a]">
                    Generalised multi-path scenario branch comparing glidepath charts with preserves vs gives up trade-offs.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e8e4da] shadow-xs">
                  <ScenarioExplorerPrimitive
                    id="A"
                    title="Reduce other tech first"
                    description="Reduce technology exposure to ~44% over 12 months by trimming other technology holdings, while maintaining the current NVDA position."
                    preserves={[
                      "NVDA remains untouched",
                      "Slower realization of gains",
                      "Less disruption to the portfolio",
                    ]}
                    givesUp={[
                      "Concentration stays elevated longer",
                      "More downside exposure in the near term",
                    ]}
                  />
                </div>
              </div>
            )}

            {/* 4. Recommendations */}
            {selectedCategory === "recommendations" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-[#18181b]">
                    RecommendationCardPrimitive
                  </h3>
                  <p className="text-xs font-sans text-[#71717a]">
                    Inline AI recommendation cards with contextual rationale and direct action hooks (Apply, Modify, Comment).
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e8e4da] shadow-xs space-y-4">
                  <RecommendationCardPrimitive
                    author="Zinc suggests"
                    prompt="You asked for a slower path. Want me to extend this from 12 to 18 months and recompute the downside?"
                    rationale="Extending to 18 months reduces annual realized capital gains by 38% while keeping NVDA intact."
                  />

                  <RecommendationCardPrimitive
                    author="Tax Optimization Engine"
                    prompt="Harvest $45,000 in long-term capital losses from legacy international ETF lots before Q4 close."
                    applyLabel="Execute Harvest"
                  />
                </div>
              </div>
            )}

            {/* 5. Breakdown Table */}
            {selectedCategory === "breakdown" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-[#18181b]">
                    BreakdownTablePrimitive
                  </h3>
                  <p className="text-xs font-sans text-[#71717a]">
                    Structured asset and position breakdown table with interactive row inspection and directives.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e8e4da] shadow-xs">
                  <HoldingsTableEmbed />
                </div>
              </div>
            )}

            {/* 6. Comparison Matrix */}
            {selectedCategory === "matrix" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-[#18181b]">
                    MatrixComparisonPrimitive
                  </h3>
                  <p className="text-xs font-sans text-[#71717a]">
                    Side-by-side scenario stress testing matrix under simulated market conditions.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e8e4da] shadow-xs">
                  <DownsideMatrixEmbed />
                </div>
              </div>
            )}

            {/* 7. Checklist */}
            {selectedCategory === "checklist" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-[#18181b]">
                    TimelineLedgerPrimitive
                  </h3>
                  <p className="text-xs font-sans text-[#71717a]">
                    Multi-quarter operational execution checklist with status badges and milestone monitoring.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e8e4da] shadow-xs">
                  <PacingTimelineEmbed />
                </div>
              </div>
            )}

            {/* 8. Alerts */}
            {selectedCategory === "alerts" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-[#18181b]">
                    SignalAlertPrimitive
                  </h3>
                  <p className="text-xs font-sans text-[#71717a]">
                    System notifications and real-time market/vesting signal banners.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e8e4da] shadow-xs space-y-3">
                  <SignalAlertPrimitive
                    severity="alert"
                    title="New Vesting Signal Received"
                    description="Northern Trust confirmed Prashanth's NVDA RSU grant of $420,000 vested into Account *4920 today."
                    timestamp="Today, 11:04 AM"
                    actionLabel="Re-evaluate Feasibility"
                  />

                  <SignalAlertPrimitive
                    severity="warning"
                    title="Policy Threshold Breach"
                    description="Portfolio technology concentration (62%) exceeds mandate threshold by +18%."
                    actionLabel="View Drivers"
                  />

                  <SignalAlertPrimitive
                    severity="success"
                    title="Quarterly Milestone Complete"
                    description="Q4 tranche execution of $180k Microsoft completed within 0.12% slippage benchmark."
                  />
                </div>
              </div>
            )}

            {/* 9. CriticMarkup */}
            {selectedCategory === "criticmarkup" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-[#18181b]">
                    CriticMarkupPrimitive
                  </h3>
                  <p className="text-xs font-sans text-[#71717a]">
                    Roughdraft inline insertions, deletions, substitutions, and anchored comments.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e8e4da] shadow-xs space-y-4">
                  <CriticMarkupPrimitive
                    activeSuggestions={[
                      {
                        id: "s1",
                        type: "suggestion",
                        author: "AI Recommendation",
                        at: "10:28 AM",
                        anchorText: "reduce technology exposure to ~44% over 12 months",
                        suggestedText: "phase the reduction over 18 months to absorb market fluctuation",
                        status: "open",
                      },
                      {
                        id: "c1",
                        type: "comment",
                        author: "Sarah",
                        at: "10:24 AM",
                        anchorText: "NVDA remains untouched",
                        commentBody: "Prashanth expressed strong conviction to hold NVDA through next earnings call.",
                        status: "open",
                      },
                    ]}
                  >
                    <p className="text-sm font-serif text-[#374151] leading-relaxed p-3 bg-[#faf8f4] rounded-xl border border-[#ede9df]">
                      Based on your guidance and Prashanth’s preferences, we plan to reduce technology exposure to ~44% over 12 months. NVDA remains untouched as a long-term compounder.
                    </p>
                  </CriticMarkupPrimitive>
                </div>
              </div>
            )}

            {/* 10. Media Embed */}
            {selectedCategory === "media" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-[#18181b]">
                    MediaEmbedPrimitive
                  </h3>
                  <p className="text-xs font-sans text-[#71717a]">
                    Generalised image, visual memo, and document attachment embed with metadata badges.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e8e4da] shadow-xs">
                  <MediaEmbedPrimitive
                    caption="Northern Trust Custody Confirmation Statement (October 2026)"
                    badge="Verified Custodian Record"
                    aspectRatio="16/9"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
