"use client";

import React, { useState } from "react";
import {
  Sparkles, X, ArrowRight, CheckCircle2, Send, Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AskAIDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (actionId: string) => void;
}

interface PresetQuery {
  id: string;
  question: string;
  category: "Strategy" | "Credit & Liquidity" | "Tax Optimization" | "Risk Stress";
  answer: string;
  sources: string[];
  actionLabel?: string;
  actionPayload?: string;
}

const presetQueries: PresetQuery[] = [
  {
    id: "no-msft-sale",
    category: "Strategy",
    question: "What if Prashanth refuses to sell any Microsoft shares?",
    answer:
      "If Microsoft sales are omitted entirely, we can only liquidate the $250k Tech ETF. After meeting the $400k property and $250k capital call outflows, terminal tech concentration remains at 42.1% (or 47.4% if the 2 Nov vest is retained). This fails Prashanth's <40% concentration objective and leaves the portfolio overly sensitive to tech sector drawdowns.",
    sources: ["S1 Portfolio NAV ($5.0m)", "S2 Tax Lots", "S4 Cash Commitments"],
    actionLabel: "Test Vest Retained in A3",
    actionPayload: "view_staged_retained",
  },
  {
    id: "lombard-loan",
    category: "Credit & Liquidity",
    question: "Can we use a Lombard loan / credit facility to bridge the $250k capital call?",
    answer:
      "Yes. A revolving credit line against Prashanth's $1.0m unencumbered NVIDIA position can bridge the $250k call on 30 Sep without forcing sales before the 5 Oct trading window. However, borrowing incurs SOFR+140bps (~6.75% annualized, ~$1,400/month interest) and leaves the underlying 41% tech concentration unhedged. Our recommendation remains Plan v2 (pulling forward $150k ETF sale to 24 Sep) to permanently de-risk without borrowing costs.",
    sources: ["S1 Custody Holdings", "S8 Capital Call Notice", "S6 Cash Reserve Floor"],
    actionLabel: "Compare in Change Review (A6)",
    actionPayload: "view_change",
  },
  {
    id: "tax-drag-lots",
    category: "Tax Optimization",
    question: "What is the exact tax drag difference between selling MS-A vs MS-C?",
    answer:
      "Lot MS-A (250 sh) has a cost basis of $360/sh, realizing only $10,000 in capital gains per $100,000 proceeds. In contrast, Lot MS-C (750 sh) has an early cost basis of $80/sh, triggering $80,000 in capital gains for the same $100k proceeds. Selling MS-C instead of MS-A would consume 80% of the entire $100k annual gain budget in a single trade and generate ~$15,000–$26,000 in immediate tax liability. Plan v1 strictly targets Lot MS-A first.",
    sources: ["S2 Tax Lots", "S3 Gain Limit ($100k)"],
    actionLabel: "Inspect Tax Lots in A4",
    actionPayload: "view_lots",
  },
  {
    id: "downside-shock",
    category: "Risk Stress",
    question: "How does a -20% tech crash affect our minimum cash reserve buffer?",
    answer:
      "Under Plan v1, planned sales occur on 5 Oct. If tech falls -20% before 5 Oct, the $300k planned sales yield only $240k proceeds ($60k shortfall). Coupled with the 30 Sep early call, spendable cash falls to $40k—severely violating the $250k reserve policy. In contrast, Plan v2 (Option 2 Larger Buffer) liquidates $200k ETF on 24 Sep at today's prices, locking in cash and ensuring minimum cash never dips below $260k even under a severe shock.",
    sources: ["S5 Price Shocks", "S6 Cash Reserve Floor", "S8 Capital Call Notice"],
    actionLabel: "Inspect Downside in A5",
    actionPayload: "view_scenarios",
  },
  {
    id: "nvda-mandate",
    category: "Strategy",
    question: "Why is NVIDIA excluded from the liquidation candidates?",
    answer:
      "Per client mandate (Source S7), Prashanth maintains strong high-conviction hold on his $1,000,000 direct NVIDIA holding. To respect client sentiment while achieving concentration reduction, the AI model sources all liquidity exclusively from Microsoft (eligible 5 Oct window) and Tech ETF (immediately liquid).",
    sources: ["S7 Client Directive (NVIDIA Conviction)", "S1 Direct Holdings"],
    actionLabel: "View Concentration Breakdown (A1)",
    actionPayload: "view_brief",
  },
];

export function AskAIDrawer({ isOpen, onClose, onSelectAction }: AskAIDrawerProps) {
  const [selectedQueryId, setSelectedQueryId] = useState<string>("tax-drag-lots");
  const [customInput, setCustomInput] = useState("");
  const [customResponses, setCustomResponses] = useState<
    { question: string; answer: string; sources: string[] }[]
  >([]);
  const [isAnswering, setIsAnswering] = useState(false);

  if (!isOpen) return null;

  const activeQuery = presetQueries.find((q) => q.id === selectedQueryId) || presetQueries[0];

  const handleSendCustom = () => {
    if (!customInput.trim()) return;
    const queryText = customInput;
    setCustomInput("");
    setIsAnswering(true);

    setTimeout(() => {
      let mockReply = "";
      let mockSources = ["S1 Liquid Portfolio ($5.0m)", "S4 Outflows"];

      if (queryText.toLowerCase().includes("cash") || queryText.toLowerCase().includes("reserve")) {
        mockReply =
          "Cash reserves are currently $750k. After the $400k property payment (28 Sep) and early $250k capital call (30 Sep), cash dips to $100k without trade execution. Plan v2 restores the $250k cash floor on 25 Sep by executing a $150k ETF sale on 24 Sep.";
        mockSources = ["S4 Cash Commitments", "S6 Cash Reserve Floor", "S8 Notice"];
      } else if (queryText.toLowerCase().includes("vest") || queryText.toLowerCase().includes("nov")) {
        mockReply =
          "The upcoming vest delivers 1,000 net Microsoft shares (~$400k) on 2 November. If Prashanth retains these shares, tech exposure climbs back up to 45.3%. Selling at vest holds terminal tech exposure to 36.8%, well within the 40% mandate.";
        mockSources = ["S1 Direct Holdings", "S4 Vest Delivery Schedule"];
      } else {
        mockReply =
          `Based on Prashanth's $5.0m liquid portfolio and $100k annual gain ceiling, any reallocation must balance the 5 Oct Microsoft window, the 28 Sep property wire ($400k), and the 30 Sep early capital call ($250k). Plan v2 provides the optimal compromise between liquidity safety and tax drag.`;
      }

      setCustomResponses((prev) => [
        { question: queryText, answer: mockReply, sources: mockSources },
        ...prev,
      ]);
      setIsAnswering(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-full bg-[#fcfbf9] border-l border-[#dedad0] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <header className="p-5 bg-white border-b border-[#eee9df] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#f5efe4] border border-[#e3d5be] flex items-center justify-center text-[#8e6e3c]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base font-semibold text-[#181916]">
                  Ask Wealth Advisor AI
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e8f5ec] text-[#246e45] border border-[#c5e6d3]">
                  Live Context
                </span>
              </div>
              <p className="text-[11px] text-[#76746c]">
                Prashanth Ranganathan · $5.0m Liquid Portfolio · 8 Sources Grounded
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7c7a72] hover:text-[#1e1f1c] hover:bg-[#f2efe9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Drawer Body Scroll */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Preset Inquiries Bar */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#8b6534] block">
              Suggested RM Inquiries
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presetQueries.map((q) => {
                const isSelected = selectedQueryId === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQueryId(q.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs text-left transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? "bg-[#282924] text-white border-[#282924] shadow-xs"
                        : "bg-white text-[#41423c] border-[#dedad0] hover:border-[#8e6e3c] hover:bg-[#faf8f4]"
                    }`}
                  >
                    <Lightbulb className={`w-3 h-3 ${isSelected ? "text-[#d8b87a]" : "text-[#8e6e3c]"}`} />
                    <span>{q.question}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Preset Answer Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#e6e1d6] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#f0ece3] pb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#f5f1e8] text-[#7e6238]">
                {activeQuery.category}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-[#2c6e49] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Deterministic Calculation</span>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-base font-semibold text-[#1a1b18]">
                “{activeQuery.question}”
              </h4>
              <p className="mt-2 text-xs text-[#4b4c46] leading-relaxed">
                {activeQuery.answer}
              </p>
            </div>

            {/* Sources */}
            <div className="pt-2 border-t border-[#f2eee6] flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider mr-1">
                Grounded Sources:
              </span>
              {activeQuery.sources.map((src, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#f4f2ec] text-[#55534b] border border-[#e4e0d5]"
                >
                  {src}
                </span>
              ))}
            </div>

            {/* Action dispatch button */}
            {activeQuery.actionLabel && (
              <div className="pt-2">
                <Button
                  size="sm"
                  className="w-full text-xs font-medium justify-between"
                  onClick={() => {
                    if (onSelectAction && activeQuery.actionPayload) {
                      onSelectAction(activeQuery.actionPayload);
                      onClose();
                    }
                  }}
                >
                  <span>{activeQuery.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Custom Inquiries History */}
          {customResponses.length > 0 && (
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#8b6534] block">
                Session Inquiries
              </span>
              {customResponses.map((res, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-[#e6e1d6] space-y-2">
                  <div className="text-xs font-serif font-bold text-[#1e1f1c]">
                    Q: {res.question}
                  </div>
                  <p className="text-xs text-[#52544d] leading-relaxed">
                    {res.answer}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {res.sources.map((s, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#f4f2ea] text-[#636159]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isAnswering && (
            <div className="p-4 rounded-xl bg-white border border-[#e6e1d6] flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-[#8e6e3c] border-t-transparent animate-spin" />
              <span className="text-xs text-[#6a6861] font-mono">
                Consulting portfolio fixtures & risk engines...
              </span>
            </div>
          )}
        </div>

        {/* Drawer Input Footer */}
        <footer className="p-4 bg-white border-t border-[#eee9df]">
          <div className="flex items-center gap-2 bg-[#f8f6f0] p-1.5 rounded-xl border border-[#dedad0] focus-within:border-[#8e6e3c] transition-colors">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendCustom();
              }}
              placeholder="Ask anything about Prashanth's portfolio, lots, or liquidity..."
              className="flex-1 bg-transparent px-3 py-1 text-xs text-[#1e1f1c] placeholder:text-[#99978f] focus:outline-none"
            />
            <button
              onClick={handleSendCustom}
              disabled={!customInput.trim()}
              className="p-2 rounded-lg bg-[#282924] text-white disabled:opacity-40 hover:bg-[#1a1b17] transition-all"
              aria-label="Submit inquiry"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
