"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export interface ReasoningStep {
  id: string;
  number: number;
  title: string;
  category: string;
  sourceTag: string;
  summary: string;
  details: string[];
  metrics?: { label: string; value: string; badge?: string }[];
}

const defaultSteps: ReasoningStep[] = [
  {
    id: "step-1",
    number: 1,
    title: "Scope & Denominator Reconciliation",
    category: "Portfolio Audit",
    sourceTag: "S1 Verified",
    summary:
      "Isolated $5.0m liquid investment accounts from total family wealth. Excluded unvested equity awards and real estate to prevent denominator skew.",
    details: [
      "Total liquid portfolio verified at exactly $5,000,000 across advisory accounts.",
      "Direct equities: NVIDIA ($1.0m, 20.0%), Microsoft ($600k, 12.0%), Tech ETF ($250k, 5.0%).",
      "Fund look-through: Broad Equity Fund ($1.0m) contains 20% underlying tech ($200k, 4.0%).",
      "Calculated True Tech Exposure: $2,050,000 / $5,000,000 = 41.0%.",
    ],
    metrics: [
      { label: "Liquid Scope", value: "$5,000,000" },
      { label: "Direct Tech", value: "37.0% ($1.85m)" },
      { label: "Fund Look-through", value: "+4.0% ($200k)" },
      { label: "True Baseline", value: "41.0% Tech", badge: "Mandate Trigger" },
    ],
  },
  {
    id: "step-2",
    number: 2,
    title: "Liquidity Drain & Reserve Runway Mapping",
    category: "Cashflow Simulation",
    sourceTag: "S3 & S4 Schedule",
    summary:
      "Mapped $650k committed outflows against $750k opening cash. Without planned sales, available cash falls to $100k, violating the $250k reserve by $150k.",
    details: [
      "21 Sep opening cash: $750,000 available liquidity.",
      "28 Sep property payment: $400,000 confirmed outflow draws balance to $350,000.",
      "26 Oct forecast capital call: $250,000 private fund draw leaves $100,000 cash.",
      "Finding: Minimum $150,000 sale proceeds must settle before commitments to preserve the $250,000 cash floor.",
    ],
    metrics: [
      { label: "Opening Cash", value: "$750k" },
      { label: "Property Outflow", value: "$400k (28 Sep)" },
      { label: "Capital Call", value: "$250k (26 Oct)" },
      { label: "Minimum Floor", value: "$250k", badge: "$150k Gap without trades" },
    ],
  },
  {
    id: "step-3",
    number: 3,
    title: "Tax-Lot Cost Basis & Gain Optimization",
    category: "Tax Efficiency",
    sourceTag: "S1 Tax Lots",
    summary:
      "Audited specific tax lots to identify lowest tax drag. Prioritized highest-basis lot MS-A ($360/sh basis, $10k gain) over low-basis MS-C ($80/sh basis, $240k gain).",
    details: [
      "MS-A (250 shares @ $400): $100k value, $90k basis, only $10k gain (10% gain ratio). Priority 1 sale.",
      "MS-B (500 shares @ $400): $200k value, $130k basis, $70k gain (35% gain ratio). Secondary sale lot.",
      "MS-C (750 shares @ $400): $300k value, $60k basis, $240k gain (80% gain ratio). Preserved to prevent tax drag.",
      "ETF-A (2,500 units @ $100): $250k value, $200k basis, $50k gain (20% gain ratio). Immediately liquid without company trading blackout.",
    ],
    metrics: [
      { label: "MS-A Gain", value: "$10k (10% drag)" },
      { label: "ETF-A Gain", value: "$50k (20% drag)" },
      { label: "MS-C Protected", value: "$240k untaxed" },
      { label: "Proposed Gains", value: "$50k", badge: "Within $100k Ceiling" },
    ],
  },
  {
    id: "step-4",
    number: 4,
    title: "Forward Award Delivery & Vesting Dynamics",
    category: "Exposure Horizon",
    sourceTag: "S6 Expected",
    summary:
      "Discovered that a single October trim fails over time: 1,000 net Microsoft shares vest on 2 Nov ($400k), causing concentration to rebound right back to 48%.",
    details: [
      "1,000 net shares scheduled for delivery on 2 Nov after tax withholding.",
      "Reference valuation at unchanged price: $400,000 added directly into tech exposure.",
      "Core Finding: Any plan that does not address the vest will rebound to 48.4% tech even if $150k is trimmed in October.",
      "Proposed Staged Solution: Pair initial 5 Oct sales ($300k) with conditional model sale of the 2 Nov vest shares ($400k) upon delivery.",
    ],
    metrics: [
      { label: "Incoming Shares", value: "1,000 MSFT" },
      { label: "Vest Delivery", value: "$400k (2 Nov)" },
      { label: "Unaddressed Impact", value: "48.4% Tech", badge: "Target Missed" },
      { label: "Staged Outcome", value: "36.8% Tech", badge: "Meets ≤40% Target" },
    ],
  },
  {
    id: "step-5",
    number: 5,
    title: "Downside Stress & Scenario Mark-to-Market",
    category: "Risk Sensitivity",
    sourceTag: "Stress Matrix",
    summary:
      "Simulated a -20% tech market shock. Highlighted that apparent concentration drops can be caused by price loss rather than de-risking, and uncovered liquidity timing risk.",
    details: [
      "A -20% tech shock causes an immediate $410k mark-to-market loss across existing tech assets.",
      "While headline exposure drops to 32.9%, this is a portfolio loss rather than successful diversification.",
      "Under early capital call timing (30 Sep), an early sale of 1,500 ETF units raises only $120k (leaving a $30k reserve shortfall).",
      "Recommendation: Highlighted the 2,000-unit early buffer option to ensure reserve safety even under tech market stress.",
    ],
    metrics: [
      { label: "-20% Tech Shock", value: "$410k Loss" },
      { label: "Lowest Cash (-20% Stress)", value: "$220k" },
      { label: "Buffer Alternative", value: "$260k Safe" },
    ],
  },
];

export interface AgentReasoningProps {
  steps?: ReasoningStep[];
  className?: string;
  defaultExpanded?: boolean;
}

export function AgentReasoningPrimitive({
  steps = defaultSteps,
  className = "",
  defaultExpanded = false,
}: AgentReasoningProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const [activeStepId, setActiveStepId] = useState<string>(steps[0]?.id || "");

  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  return (
    <div
      className={`rounded-2xl border border-[#dedad0] bg-[#faf8f4] overflow-hidden transition-all shadow-xs ${className}`}
    >
      {/* Header bar with toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#f5f1e8] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#242521] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#e2cfb2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.14em] text-[#8b6534]">
                Agent Audit & Reasoning Trace
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#e8f5ec] text-[#227248] font-bold">
                5 Analysis Modules Verified
              </span>
            </div>
            <h3 className="font-serif text-base font-medium text-[#1c1d19]">
              How the AI Synthesized Portfolio Scope, Liquidity & Tax Lots
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#8b6534]">
          <span>{isOpen ? "Hide Analysis Trace" : "Explore Agent Reasoning"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Interactive Trace View */}
      {isOpen && (
        <div className="p-6 border-t border-[#dedad0] bg-white space-y-6">
          <p className="text-xs text-[#6e6d66] leading-relaxed">
            Prior to proposing action sequences, the Oneview AI agent audited client holdings against verified tax lots, scheduled cash outflows, and award delivery dates. Click each analysis step below to inspect calculations and sources.
          </p>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {steps.map((step) => {
              const isSelected = activeStepId === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    isSelected
                      ? "border-[#8b6534] bg-[#faf6ef] shadow-xs ring-1 ring-[#8b6534]/30"
                      : "border-[#e6e2d8] bg-white hover:border-[#cfc8b8] hover:bg-[#fbf9f5]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`w-5 h-5 rounded-md font-bold text-[10px] flex items-center justify-center ${
                        isSelected
                          ? "bg-[#8b6534] text-white"
                          : "bg-[#eeeae2] text-[#717069]"
                      }`}
                    >
                      {step.number}
                    </span>
                    <span className="text-[8.5px] font-mono text-[#8a8880] truncate ml-1">
                      {step.sourceTag}
                    </span>
                  </div>
                  <strong className="block text-xs font-medium text-[#1c1d19] truncate">
                    {step.category}
                  </strong>
                  <span className="text-[10px] text-[#78776f] line-clamp-1 mt-0.5">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Step Detail Card */}
          {activeStep && (
            <div className="p-5 rounded-xl border border-[#dedad0] bg-[#faf8f4] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e8e4dc] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8b6534]">
                      Step {activeStep.number} · {activeStep.category}
                    </span>
                    <span className="text-[9.5px] px-2 py-0.5 rounded bg-white border border-[#dedad0] font-mono text-[#63645e]">
                      Source: {activeStep.sourceTag}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#1c1d19] mt-0.5">
                    {activeStep.title}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#227248] font-medium bg-[#eaf4ee] px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Audited & Reconciled</span>
                </div>
              </div>

              {/* Summary quote */}
              <div className="p-3.5 rounded-lg bg-white border border-[#e4ded4] text-xs font-serif text-[#3f413d] leading-relaxed">
                “{activeStep.summary}”
              </div>

              {/* Detailed Points */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#79776f] block">
                  Agent Findings & Verification Checks:
                </span>
                <ul className="space-y-1.5 text-xs text-[#4f504a]">
                  {activeStep.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8b6534] mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metric Chips */}
              {activeStep.metrics && activeStep.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#e8e4dc]">
                  {activeStep.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white border border-[#e2ddd3] text-center"
                    >
                      <span className="text-[10px] text-[#7a7871] block truncate">
                        {m.label}
                      </span>
                      <strong className="text-xs font-mono font-bold text-[#1c1d19] block mt-0.5">
                        {m.value}
                      </strong>
                      {m.badge && (
                        <span className="inline-block mt-1 text-[8.5px] px-1.5 py-0.2 rounded bg-[#f2ede4] text-[#69532d] font-semibold">
                          {m.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
