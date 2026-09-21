"use client";

import React from "react";


export interface LedgerEvent {
  date: string;
  title: string;
  subtitle?: string;
  amount?: string;
  cashAfter: string;
  techAfter?: string;
  status?: "verified" | "confirmed" | "forecast" | "assumed" | "shortfall" | "trade" | "settle";
  isShortfall?: boolean;
}

export interface TimelineLedgerProps {
  events: LedgerEvent[];
  className?: string;
  onEventClick?: (event: LedgerEvent) => void;
}

export function TimelineLedgerPrimitive({
  events,
  className = "",
  onEventClick,
}: TimelineLedgerProps) {
  const statusBadges = {
    verified: "bg-[#e8f5ec] text-[#246c43]",
    confirmed: "bg-[#edf3f8] text-[#2c6594]",
    forecast: "bg-[#fcf3e8] text-[#9a5b28]",
    assumed: "bg-[#f2efe9] text-[#63645e]",
    shortfall: "bg-[#fbeae6] text-[#b03d2d] font-semibold",
    trade: "bg-[#ece9e2] text-[#4f504b]",
    settle: "bg-[#e4ede7] text-[#335e47]",
  };

  return (
    <div className={`space-y-0.5 ${className}`}>
      {events.map((event, i) => {
        const isLast = i === events.length - 1;
        const isDanger = event.isShortfall || event.status === "shortfall";

        return (
          <div
            key={i}
            onClick={() => onEventClick?.(event)}
            className={`relative flex items-center justify-between p-2.5 rounded-lg transition-all ${
              isDanger
                ? "bg-[#fdf2ef] border border-[#f5cdc5]"
                : "hover:bg-white/80 border border-transparent"
            } ${onEventClick ? "cursor-pointer" : ""}`}
          >
            {/* Timeline connector dot and line */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex flex-col items-center">
                <span
                  className={`w-2.5 h-2.5 rounded-full z-10 ${
                    isDanger
                      ? "bg-[#ba3f2e] ring-4 ring-[#fce4df]"
                      : event.status === "settle"
                      ? "bg-[#3e6b5c]"
                      : "bg-[#8a6838] ring-2 ring-white"
                  }`}
                />
                {!isLast && (
                  <span
                    className={`absolute top-2.5 w-0.5 h-7 ${
                      isDanger ? "bg-[#f0c3b8]" : "bg-[#e6e2d8]"
                    }`}
                  />
                )}
              </div>

              <span className="text-[11px] font-mono text-[#7a7872] w-14 shrink-0">
                {event.date}
              </span>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold truncate ${
                      isDanger ? "text-[#9d3020]" : "text-[#232420]"
                    }`}
                  >
                    {event.title}
                  </span>
                  {event.status && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                        statusBadges[event.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  )}
                </div>
                {event.subtitle && (
                  <p className="text-[10px] text-[#86847d] truncate">{event.subtitle}</p>
                )}
              </div>
            </div>

            {/* Readouts (Cash balance & optional Tech %) */}
            <div className="flex items-center gap-4 shrink-0 text-right">
              {event.amount && (
                <span className="text-[11px] font-mono text-[#78766f]">{event.amount}</span>
              )}
              <div>
                <span
                  className={`font-serif text-sm font-medium ${
                    isDanger ? "text-[#a33222] font-semibold" : "text-[#1d1e1b]"
                  }`}
                >
                  {event.cashAfter}
                </span>
                {event.techAfter && (
                  <span className="block text-[10px] text-[#7d7c75] font-mono">
                    {event.techAfter} tech
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
