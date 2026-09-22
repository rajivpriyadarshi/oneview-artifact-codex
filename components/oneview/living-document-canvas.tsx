"use client";

import React from "react";
import { PrototypeStateStep } from "./types";
import { RoughdraftSelectionToolbar } from "./roughdraft-toolbar";
import { State1ThreadFormedDoc } from "./documents/state-1-thread-formed";
import { State2ReviewGeneratingDoc } from "./documents/state-2-review-generating";
import { State3ExposureReviewDoc } from "./documents/state-3-exposure-review";
import { State4ScenarioGeneratingDoc } from "./documents/state-4-scenario-generating";
import { State5ScenarioWorkspaceDoc } from "./documents/state-5-scenario-workspace";
import { State6PlanGeneratingDoc } from "./documents/state-6-plan-generating";
import { State7RefinedPlanDoc } from "./documents/state-7-refined-plan";
import { State8NewSignalDoc } from "./documents/state-8-new-signal";
import { State9UpdatedDirectionDoc } from "./documents/state-9-updated-direction";
import { State10NoteGeneratingDoc } from "./documents/state-10-note-generating";
import { State11ClientNoteDoc } from "./documents/state-11-client-note";

interface LivingDocumentCanvasProps {
  currentStep: PrototypeStateStep;
  onSetStep: (step: PrototypeStateStep) => void;
  subView?: "workspace" | "downside" | "comparison";
  onSelectSubView?: (subView: "workspace" | "downside" | "comparison") => void;
  className?: string;
}

export function LivingDocumentCanvas({
  currentStep,
  onSetStep,
  subView = "workspace",
  onSelectSubView,
  className = "",
}: LivingDocumentCanvasProps) {
  const renderDocument = () => {
    switch (currentStep) {
      case 1:
        return <State1ThreadFormedDoc onNext={() => onSetStep(2)} />;
      case 2:
        return <State2ReviewGeneratingDoc onNext={() => onSetStep(3)} />;
      case 3:
        return <State3ExposureReviewDoc onAddGuidance={() => onSetStep(4)} />;
      case 4:
        return <State4ScenarioGeneratingDoc onNext={() => onSetStep(5)} />;
      case 5:
        return (
          <State5ScenarioWorkspaceDoc
            subView={subView}
            onSelectSubView={onSelectSubView}
            onConsolidatePlan={() => onSetStep(6)}
          />
        );
      case 6:
        return <State6PlanGeneratingDoc onNext={() => onSetStep(7)} />;
      case 7:
        return <State7RefinedPlanDoc onApprovePlan={() => onSetStep(10)} />;
      case 8:
      case 9:
        return <State10NoteGeneratingDoc onNext={() => onSetStep(11)} />;
      case 10:
        return <State10NoteGeneratingDoc onNext={() => onSetStep(11)} />;
      case 11:
        return <State11ClientNoteDoc />;
      default:
        return <State5ScenarioWorkspaceDoc />;
    }
  };

  return (
    <div
      id="living-canvas-scroll"
      className={`flex-1 overflow-y-auto bg-white px-6 sm:px-12 md:px-16 py-8 pb-32 scrollbar-thin relative ${className}`}
    >
      {/* Floating text selection toolbar */}
      <RoughdraftSelectionToolbar />

      {/* Render Document based on active step */}
      <div className="max-w-[760px] mx-auto space-y-8">
        {renderDocument()}
      </div>
    </div>
  );
}
