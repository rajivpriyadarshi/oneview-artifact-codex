"use client";

import React from "react";
import { Image as ImageIcon, ExternalLink } from "lucide-react";

export interface MediaEmbedPrimitiveProps {
  src?: string;
  alt?: string;
  caption?: string;
  badge?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9";
  className?: string;
}

export function MediaEmbedPrimitive({
  src,
  alt = "Artifact media embed",
  caption,
  badge = "Verified Document",
  aspectRatio = "16/9",
  className = "",
}: MediaEmbedPrimitiveProps) {
  return (
    <div className={`space-y-2 rounded-xl border border-[#ece9e2] bg-white p-3 shadow-2xs ${className}`}>
      <div
        className="w-full bg-[#f6f5f1] rounded-lg flex items-center justify-center overflow-hidden relative"
        style={{ aspectRatio: aspectRatio.replace("/", " / ") }}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-[#9ca3af]">
            <ImageIcon className="w-8 h-8 text-[#b8b5ad]" />
            <span className="text-xs font-sans text-[#71717a]">Media attachment preview</span>
          </div>
        )}

        {badge && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-xs text-white text-[10px] font-sans font-medium flex items-center gap-1">
            <span>{badge}</span>
          </div>
        )}
      </div>

      {caption && (
        <div className="flex items-center justify-between text-xs text-[#71717a] px-1">
          <span className="truncate">{caption}</span>
          <ExternalLink className="w-3 h-3 text-[#9ca3af] shrink-0 ml-2" />
        </div>
      )}
    </div>
  );
}
