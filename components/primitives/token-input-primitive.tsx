"use client";

import React, { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

export interface TokenInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  prefix?: string;
  scope?: string;
  onChange: (val: number) => void;
  className?: string;
}

export function TokenInputPrimitive({
  label,
  value,
  min,
  max,
  step,
  suffix = "",
  prefix = "",
  scope = "This scenario",
  onChange,
  className = "",
}: TokenInputProps) {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [prevValue, setPrevValue] = useState(value);
  if (prevValue !== value) {
    setPrevValue(value);
    setTempValue(value);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const displayString = `${prefix}${value}${suffix}`;
  const tempDisplay = `${prefix}${tempValue}${suffix}`;

  const handleApply = () => {
    onChange(tempValue);
    setOpen(false);
  };

  return (
    <span className={`relative inline-block font-sans ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline font-medium text-[#7c5e2e] border-b border-dashed border-[#bfa472] hover:border-solid hover:text-[#523d1b] hover:bg-[#faf4e8] px-0.5 rounded-sm transition-colors cursor-pointer"
        aria-expanded={open}
        aria-label={`Edit ${label}`}
      >
        {displayString}
      </button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-72 p-4 rounded-xl bg-white border border-[#d6cfc0] shadow-xl text-left animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#79766e] mb-1">
            <span className="font-semibold">{label}</span>
            <span className="text-[9px] px-1.5 py-0.5 bg-[#f0ede6] rounded text-[#676660]">
              {scope}
            </span>
          </div>

          <div className="font-serif text-2xl font-medium text-[#1e1f1c] my-2">
            {tempDisplay}
          </div>

          <div className="my-4">
            <Slider
              value={[tempValue]}
              min={min}
              max={max}
              step={step}
              onValueChange={(vals) => setTempValue(vals[0])}
            />
            <div className="flex justify-between text-[10px] text-[#8e8c84] mt-1.5 font-mono">
              <span>{prefix}{min}{suffix}</span>
              <span>{prefix}{max}{suffix}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#f0ede6] gap-2">
            <button
              type="button"
              onClick={() => {
                setTempValue(value);
                setOpen(false);
              }}
              className="text-xs text-[#706f69] hover:text-[#232421] px-2 py-1"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="text-xs font-semibold bg-[#262724] text-white px-3 py-1.5 rounded-lg hover:bg-[#111210] transition-colors"
            >
              Apply preview
            </button>
          </div>
        </div>
      )}
    </span>
  );
}
