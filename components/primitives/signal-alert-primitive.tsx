"use client";

import React from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, ArrowRight, X } from "lucide-react";

export type SignalSeverity = "warning" | "alert" | "info" | "success";

export interface SignalAlertPrimitiveProps {
  severity?: SignalSeverity;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  timestamp?: string;
  className?: string;
}

export function SignalAlertPrimitive({
  severity = "warning",
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  timestamp,
  className = "",
}: SignalAlertPrimitiveProps) {
  const getStyles = () => {
    switch (severity) {
      case "alert":
        return {
          bg: "bg-[#faeae5]",
          border: "border-[#f2cfc7]",
          text: "text-[#9e331d]",
          icon: <AlertCircle className="w-4 h-4 text-[#b53a22] shrink-0" />,
        };
      case "warning":
        return {
          bg: "bg-[#faf5eb]",
          border: "border-[#eddcc5]",
          text: "text-[#7d5320]",
          icon: <AlertTriangle className="w-4 h-4 text-[#8b6534] shrink-0" />,
        };
      case "success":
        return {
          bg: "bg-[#edf6f0]",
          border: "border-[#c4e3cf]",
          text: "text-[#246e45]",
          icon: <CheckCircle2 className="w-4 h-4 text-[#246e45] shrink-0" />,
        };
      default:
        return {
          bg: "bg-[#f4f3f0]",
          border: "border-[#e2ded5]",
          text: "text-[#4b5563]",
          icon: <Info className="w-4 h-4 text-[#71717a] shrink-0" />,
        };
    }
  };

  const s = getStyles();

  return (
    <div
      className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${s.bg} ${s.border} ${className}`}
    >
      <div className="flex items-start gap-2.5 min-w-0">
        <div className="mt-0.5">{s.icon}</div>
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-sans font-bold ${s.text}`}>
              {title}
            </span>
            {timestamp && (
              <span className="text-[10px] font-mono text-[#71717a]">
                {timestamp}
              </span>
            )}
          </div>
          <p className="text-[12px] font-sans text-[#3f3f46] leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {actionLabel && (
          <button
            onClick={onAction}
            className="flex items-center gap-1 text-xs font-sans font-semibold text-[#18181b] hover:text-[#8b6534] transition-colors"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 text-[#9ca3af] hover:text-[#4b5563] transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
