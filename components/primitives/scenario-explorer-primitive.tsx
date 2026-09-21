"use client";

import React from "react";
import { ChartEmbedPrimitive, ChartPoint } from "./chart-embed-primitive";

export interface ScenarioExplorerPrimitiveProps {
  id: string; // "A", "B", "C"
  title: string;
  description: string;
  points?: ChartPoint[];
  preserves?: string[];
  givesUp?: string[];
  tradeOffs?: string[];
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function ScenarioExplorerPrimitive({
  id,
  title,
  description,
  points = [
    { label: "Now", value: 62, highlightLabel: "62%" },
    { label: "3M", value: 54 },
    { label: "6M", value: 49 },
    { label: "9M", value: 46 },
    { label: "12M", value: 44, highlightLabel: "44%" },
  ],
  preserves = [
    "NVDA remains untouched",
    "Slower realization of gains",
    "Less disruption to the portfolio",
  ],
  givesUp = [
    "Concentration stays elevated longer",
    "More downside exposure in the near term",
  ],
  tradeOffs,
  isSelected = false,
  onSelect,
  className = "",
}: ScenarioExplorerPrimitiveProps) {
  return (
    <div
      onClick={onSelect}
      className={`space-y-3 cursor-pointer group select-none ${className}`}
    >
      {/* Title & Description matching screenshot */}
      <div>
        <h3 className="font-serif text-[19px] sm:text-[20px] font-semibold text-[#18181b] tracking-tight group-hover:text-[#8b6534] transition-colors">
          {id ? `${id}. ` : ""}{title}
        </h3>
        <p className="font-serif text-[15px] text-[#4b5563] leading-relaxed mt-1">
          {description}
        </p>
      </div>

      {/* 2-Column Grid: Left Chart + Right Key Trade-offs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
        {/* Left Column: Line Chart */}
        <div
          className={`md:col-span-8 p-4 sm:p-5 rounded-xl bg-white border transition-all flex flex-col justify-center ${
            isSelected
              ? "border-[#8b6534]/50 shadow-xs ring-1 ring-[#8b6534]/30"
              : "border-[#ece9e2] hover:border-[#dfdbd1]"
          }`}
        >
          <ChartEmbedPrimitive
            type="trajectory"
            title="Technology exposure over time"
            points={points}
          />
        </div>

        {/* Right Column: Preserves & Gives Up Cards */}
        <div className="md:col-span-4 p-5 rounded-xl bg-[#faf8f5] border border-[#eeebe3] flex flex-col justify-between space-y-4">
          {preserves && preserves.length > 0 ? (
            <>
              {/* What this preserves */}
              <div className="space-y-1.5">
                <strong className="text-[12.5px] font-sans font-semibold text-[#18181b] block">
                  What this preserves
                </strong>
                <ul className="space-y-1.5 text-[#4b5563] text-[12px] leading-relaxed list-disc list-outside pl-3.5 font-sans">
                  {preserves.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* What it gives up */}
              <div className="space-y-1.5 pt-2 border-t border-[#e8e4da]">
                <strong className="text-[12.5px] font-sans font-semibold text-[#18181b] block">
                  What it gives up
                </strong>
                <ul className="space-y-1.5 text-[#4b5563] text-[12px] leading-relaxed list-disc list-outside pl-3.5 font-sans">
                  {givesUp.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <strong className="text-[13px] font-sans font-semibold text-[#18181b] block">
                Key trade-offs
              </strong>
              <ul className="space-y-2 text-[#4b5563] text-[12px] leading-relaxed list-disc list-outside pl-3.5 font-sans">
                {(tradeOffs || []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
