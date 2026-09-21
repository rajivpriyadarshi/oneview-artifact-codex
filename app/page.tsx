"use client";

import React, { useState } from "react";
import { PrototypeStateStep } from "@/components/oneview/types";
import { BrandSideNav } from "@/components/oneview/brand-side-nav";
import { ConversationThreadStream } from "@/components/oneview/conversation-thread-stream";
import { CanvasHeader } from "@/components/oneview/canvas-header";
import { LivingDocumentCanvas } from "@/components/oneview/living-document-canvas";
import { DemoController } from "@/components/oneview/demo-controller";
import { PrimitivesGalleryModal } from "@/components/oneview/primitives-gallery-modal";

export default function HomePage() {
  // Default to State 1
  const [currentStep, setCurrentStep] = useState<PrototypeStateStep>(1);
  const [subView, setSubView] = useState<"workspace" | "downside" | "comparison">("workspace");
  const [showPrimitives, setShowPrimitives] = useState(false);

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as PrototypeStateStep);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f4f2ef] text-[#18181b] font-sans">
      {/* 1. Leftmost 80px Brand Rail (Figma side_nav node 5771:29394) */}
      <BrandSideNav onOpenPrimitives={() => setShowPrimitives(true)} />

      {/* 2. Persistent Conversation / Thread Stream (420px, Figma thread_chat node 5771:29159) */}
      <ConversationThreadStream
        currentStep={currentStep}
        onSelectStep={(step) => setCurrentStep(step)}
        subView={subView}
        onSelectSubView={(view) => {
          setSubView(view);
          setCurrentStep(5);
        }}
      />

      {/* 3. Main Living Document Canvas (Figma artifact_canvas node 5771:29371) */}
      <main className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden bg-white">
        {/* Canvas Header */}
        <CanvasHeader
          currentStep={currentStep}
          onPrev={handlePrev}
        />

        {/* Living Document Content */}
        <LivingDocumentCanvas
          currentStep={currentStep}
          onSetStep={(step) => setCurrentStep(step)}
          subView={subView}
          onSelectSubView={(view) => setSubView(view)}
        />
      </main>

      {/* 4. Generic UI Primitives Gallery Modal */}
      <PrimitivesGalleryModal
        isOpen={showPrimitives}
        onClose={() => setShowPrimitives(false)}
      />

      {/* 5. Floating Admin Demo Simulation Controller */}
      <DemoController
        currentStep={currentStep}
        onSetStep={(step) => setCurrentStep(step)}
        onOpenPrimitives={() => setShowPrimitives(true)}
      />
    </div>
  );
}
