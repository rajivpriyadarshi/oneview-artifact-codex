"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface MetricCardItem {
  id: string;
  icon?: LucideIcon | React.ReactNode;
  label: string;
  sublabel?: string;
  value?: string;
  delta?: string;
  isPositiveDelta?: boolean;
}

export interface MetricsStripPrimitiveProps {
  title?: string;
  items: MetricCardItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function MetricsStripPrimitive({
  title,
  items,
  columns = 4,
  className = "",
}: MetricsStripPrimitiveProps) {
  const colClass =
    columns === 4
      ? "grid-cols-2 lg:grid-cols-4"
      : columns === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className={`space-y-2.5 ${className}`}>
      {title && (
        <h4 className="text-[13px] font-sans font-medium text-[#18181b]">
          {title}
        </h4>
      )}

      <div className={`grid ${colClass} gap-3`}>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#ece9e2] hover:border-[#dfdbd1] transition-colors"
          >
            {item.icon && (
              <div className="w-8 h-8 rounded-lg bg-[#f7f5f0] border border-[#e8e4dc] flex items-center justify-center text-[#71717a] shrink-0">
                {React.isValidElement(item.icon) ? (
                  item.icon
                ) : typeof item.icon === "function" ||
                  (typeof item.icon === "object" && item.icon !== null) ? (
                  React.createElement(
                    item.icon as React.ComponentType<{ className?: string }>,
                    {
                      className: "w-4 h-4 text-[#8b6534]",
                    }
                  )
                ) : null}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-[13px] font-sans font-semibold text-[#18181b] truncate">
                  {item.label}
                </span>
                {item.value && (
                  <span className="text-xs font-mono font-bold text-[#18181b]">
                    {item.value}
                  </span>
                )}
              </div>

              {item.sublabel && (
                <p className="text-[11.5px] font-sans text-[#71717a] leading-tight mt-0.5">
                  {item.sublabel}
                </p>
              )}

              {item.delta && (
                <div className="mt-1">
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                      item.isPositiveDelta
                        ? "bg-[#edf6f0] text-[#246e45]"
                        : "bg-[#faeae5] text-[#b53a22]"
                    }`}
                  >
                    {item.delta}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
