"use client";

import React from "react";
import { ExposureOverTimeChart, ChartPoint } from "./exposure-over-time-chart";
import { ArrowRight, Check } from "lucide-react";

interface ScenarioCardBlockProps {
  id: "A" | "B" | "C";
  title: string;
  description: string;
  points?: ChartPoint[];
  tradeOffs: string[];
  isSelected?: boolean;
  onSelect?: () => void;
  actionChips?: string[];
  onActionChipClick?: (chip: string) => void;
  className?: string;
}

export function ScenarioCardBlock({
  id,
  title,
  description,
  points,
  tradeOffs,
  isSelected = false,
  onSelect,
  className = "",
}: ScenarioCardBlockProps) {
  return (
    <div
      onClick={onSelect}
      className={`space-y-3 cursor-pointer group ${className}`}
    >
      {/* Title & Description matching screenshot */}
      <div>
        <h3 className="font-sans text-[18px] sm:text-[19px] font-semibold text-[#18181b] tracking-tight group-hover:text-[#a98235] transition-colors">
          {id}. {title}
        </h3>
        <p className="font-sans text-[14px] text-[#4b5563] leading-[1.55] mt-1">
          {description}
        </p>
      </div>

      {/* Grid: Left Chart (68%) + Right Key Trade-offs (32%) matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
        {/* Left Column: Line Chart */}
        <div
          className={`md:col-span-8 p-4 sm:p-5 rounded-xl bg-white border transition-all flex flex-col justify-center ${
            isSelected ? "border-[#a98235]/40 shadow-xs" : "border-[#efede8] hover:border-[#dedad0]"
          }`}
        >
          <ExposureOverTimeChart points={points} />
        </div>

        {/* Right Column: Key Trade-offs Card matching screenshot */}
        <div className="md:col-span-4 p-5 rounded-xl bg-[#f9f8f6] border border-[#f2eee7] flex flex-col justify-start">
          <strong className="text-[13px] font-sans font-semibold text-[#18181b] block mb-2.5">
            Key trade-offs
          </strong>
          <ul className="space-y-2 text-[#4b5563] text-[12.5px] leading-[1.55] list-disc list-outside pl-4 font-sans">
            {tradeOffs.map((item, idx) => (
              <li key={idx} className="pl-0.5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
