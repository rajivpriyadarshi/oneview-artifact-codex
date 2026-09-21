"use client";

import React from "react";
import { Home, Users, Terminal, Bell } from "lucide-react";

interface BrandSideNavProps {
  onOpenPrimitives?: () => void;
  className?: string;
}

export function BrandSideNav({
  onOpenPrimitives,
  className = "",
}: BrandSideNavProps) {
  return (
    <nav
      className={`w-[72px] sm:w-[80px] shrink-0 h-screen bg-white border-r border-[#e8e4db] flex flex-col items-center justify-between py-6 select-none z-20 ${className}`}
    >
      {/* Top: Oneview Geometric Logo Mark (Figma Group 25) */}
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="w-10 h-10 flex items-center justify-center cursor-pointer hover:opacity-85 transition-opacity">
          <svg
            viewBox="0 0 38 43"
            className="w-[34px] h-[38px] fill-[#050505]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Geometric Oneview Logomark matching Figma 5771:29394 */}
            <path
              d="M19 0L37.1865 10.5V31.5L19 42L0.813477 31.5V10.5L19 0Z"
              fill="#050505"
            />
            <path
              d="M19 6L32 13.5V28.5L19 36L6 28.5V13.5L19 6Z"
              fill="#ffffff"
            />
            <path
              d="M19 12L27 16.5V25.5L19 30L11 25.5V16.5L19 12Z"
              fill="#050505"
            />
          </svg>
        </div>

        {/* Navigation Icon Group matching Figma node 5771:29394 */}
        <div className="flex flex-col items-center gap-3 w-full px-2">
          {/* 1. Home (Active) */}
          <button
            title="Overview & Threads"
            className="w-11 h-11 rounded-[12px] bg-[#f1ece1] text-[#1c1d1a] flex items-center justify-center transition-all hover:bg-[#e9e3d5]"
          >
            <Home className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* 2. Clients / Portfolios */}
          <button
            title="Clients & Mandates"
            className="w-11 h-11 rounded-[12px] text-[#71717a] hover:text-[#18181b] hover:bg-[#f6f5f1] flex items-center justify-center transition-all"
          >
            <Users className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* 3. Primitives Gallery / Components */}
          <button
            onClick={onOpenPrimitives}
            title="Generic UI Primitives Gallery (Click to inspect)"
            className="group relative w-11 h-11 rounded-[12px] text-[#71717a] hover:text-[#8b6534] hover:bg-[#faf5ec] flex items-center justify-center transition-all"
          >
            <Terminal className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#8b6534] ring-2 ring-white" />
          </button>

          {/* 4. Notifications / Alerts */}
          <button
            title="Notifications & Signals"
            className="w-11 h-11 rounded-[12px] text-[#71717a] hover:text-[#18181b] hover:bg-[#f6f5f1] flex items-center justify-center transition-all"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
          </button>
        </div>
      </div>

      {/* Bottom: Sarah Profile Avatar */}
      <div className="flex flex-col items-center gap-2">
        <div
          title="Sarah (Lead Wealth Advisor)"
          className="w-10 h-10 rounded-full bg-[#dfd7c8] text-[#332f27] flex items-center justify-center text-sm font-sans font-semibold border border-[#d2c9b8] cursor-pointer hover:ring-2 hover:ring-[#8b6534]/40 transition-all"
        >
          S
        </div>
      </div>
    </nav>
  );
}
