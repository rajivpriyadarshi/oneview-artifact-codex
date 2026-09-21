export type PrototypeStateStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface StateMetadata {
  step: PrototypeStateStep;
  title: string;
  shortLabel: string;
  category: "detection" | "review" | "scenario" | "plan" | "signal" | "direction" | "memo";
  statusBadge: string;
  isGenerating?: boolean;
  description: string;
  rmActionHint: string;
  aiActionHint: string;
}

export const PROTOTYPE_STATES: Record<PrototypeStateStep, StateMetadata> = {
  1: {
    step: 1,
    title: "Thread formed",
    shortLabel: "1. Formed",
    category: "detection",
    statusBadge: "Autonomous Signal",
    description: "Technology exposure has risen to 62%, above Prashanth's preferred range.",
    rmActionHint: "No action required. RM lands on autonomous thread.",
    aiActionHint: "Detect signal, create thread, pull portfolio + client context, start first artifact.",
  },
  2: {
    step: 2,
    title: "Exposure review — generating",
    shortLabel: "2. Review Gen",
    category: "review",
    statusBadge: "Composing Review",
    isGenerating: true,
    description: "Assembling working note: Parsing holdings → Checking context → Structuring review.",
    rmActionHint: "RM observes real-time composition.",
    aiActionHint: "Build first review artifact live using primitives.",
  },
  3: {
    step: 3,
    title: "Exposure review — ready",
    shortLabel: "3. Review Ready",
    category: "review",
    statusBadge: "Review Ready",
    description: "Working document ready: 62% tech exposure diagnosis with trend, donut, and holdings.",
    rmActionHint: "Sarah adds guidance: 'Keep NVDA. Show a slower reduction and compare downside if tech falls 20%.'",
    aiActionHint: "Incorporate RM guidance into structured assumptions for scenario branching.",
  },
  4: {
    step: 4,
    title: "Scenario workspace — generating",
    shortLabel: "4. Scenario Gen",
    category: "scenario",
    statusBadge: "Forming Scenarios",
    isGenerating: true,
    description: "Generating 3 scenario branches based on RM guidance and client constraints.",
    rmActionHint: "RM observes dynamic scenario formation.",
    aiActionHint: "Convert RM guidance into assumptions/constraints and construct candidate paths.",
  },
  5: {
    step: 5,
    title: "Scenario workspace — interactive",
    shortLabel: "5. Scenario Active",
    category: "scenario",
    statusBadge: "3 Scenarios Built",
    description: "Living scenario workspace: 3 candidate branches, projected path, and downside -20% stress test.",
    rmActionHint: "Sarah selects Branch A: Target 44%, keep NVDA, 12-month pacing.",
    aiActionHint: "Recompose selected scenario into a committed draft plan.",
  },
  6: {
    step: 6,
    title: "Refined plan — generating",
    shortLabel: "6. Plan Gen",
    category: "plan",
    statusBadge: "Consolidating Plan",
    isGenerating: true,
    description: "Rewriting exploratory branches into a decisive 12-month implementation plan.",
    rmActionHint: "RM observes plan consolidation.",
    aiActionHint: "Collapse scenario exploration into one proposed plan with quarterly pacing.",
  },
  7: {
    step: 7,
    title: "Refined plan — ready",
    shortLabel: "7. Plan Ready",
    category: "plan",
    statusBadge: "Plan Approved",
    description: "Single-column decision-ready plan: 62% → ~44% exposure over 4 quarters, protecting NVDA.",
    rmActionHint: "Sarah approves direction or adds final refinement note.",
    aiActionHint: "Finalize recommended direction based on constraints.",
  },
  8: {
    step: 8,
    title: "New signal received / re-evaluating",
    shortLabel: "8. New Signal",
    category: "signal",
    statusBadge: "Signal Detected",
    isGenerating: true,
    description: "Confirmed NVDA RSU vest of ~$420K detected. Exposure rebounds to 51%; re-evaluating feasibility.",
    rmActionHint: "Sarah reviews signal impact: 'Keep NVDA constraint if possible.'",
    aiActionHint: "Ingest signal, recompute exposure, test feasibility, generate revised paths.",
  },
  9: {
    step: 9,
    title: "Updated direction review",
    shortLabel: "9. Direction Review",
    category: "direction",
    statusBadge: "Revised Paths",
    description: "Adaptive plan revision: Comparing 3 revised branches in-context. Recommended: Relax target to 44%.",
    rmActionHint: "Sarah selects revised direction: 'Relax target to 44%'.",
    aiActionHint: "Update plan and prepare client-facing communication.",
  },
  10: {
    step: 10,
    title: "Client discussion note — generating",
    shortLabel: "10. Memo Gen",
    category: "memo",
    statusBadge: "Drafting Memo",
    isGenerating: true,
    description: "Transforming internal plan into a client-ready discussion note across communication modes.",
    rmActionHint: "RM selects output tone and format.",
    aiActionHint: "Convert accepted direction + prior context into a client-ready note.",
  },
  11: {
    step: 11,
    title: "Client discussion note — ready",
    shortLabel: "11. Memo Ready",
    category: "memo",
    statusBadge: "Memo Ready",
    description: "Polished executive client memo ready for Prashanth: Situation, Recommended path, Discussion points.",
    rmActionHint: "Sarah reviews, edits inline, or marks ready to share with Prashanth.",
    aiActionHint: "Produce final client-ready memo from thread history and accepted plan.",
  },
};

export interface ThreadSubArtifact {
  id: string;
  title: string;
  status: "pending" | "ready" | "active";
}

export interface ThreadMilestone {
  id: string;
  title: string;
  timestamp: string;
  speaker: "ai" | "rm" | "signal";
  speakerName: string;
  speakerRole: string;
  summary: string;
  stepTrigger: PrototypeStateStep;
  activeInSteps: PrototypeStateStep[];
  selectedArtifactTitle?: string;
  subArtifacts?: ThreadSubArtifact[];
  userMessage?: string;
}

export interface HoldingPosition {
  symbol: string;
  name: string;
  account: string;
  allocationPct: number;
  marketValue: number;
  unrealizedGain: number;
  basisStatus: string;
  isTech: boolean;
}

export const PRASHANTH_HOLDINGS: HoldingPosition[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    account: "Equity award (taxable)",
    allocationPct: 18.0,
    marketValue: 1116000,
    unrealizedGain: 696000,
    basisStatus: "Verified",
    isTech: true,
  },
  {
    symbol: "AAPL",
    name: "Apple Inc",
    account: "Joint taxable",
    allocationPct: 12.0,
    marketValue: 744000,
    unrealizedGain: 434000,
    basisStatus: "Verified",
    isTech: true,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp",
    account: "Joint taxable",
    allocationPct: 10.0,
    marketValue: 620000,
    unrealizedGain: 340000,
    basisStatus: "Verified",
    isTech: true,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc",
    account: "Joint taxable",
    allocationPct: 8.0,
    marketValue: 496000,
    unrealizedGain: 272000,
    basisStatus: "Verified",
    isTech: true,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc",
    account: "Individual taxable",
    allocationPct: 6.0,
    marketValue: 372000,
    unrealizedGain: 204000,
    basisStatus: "Unverified",
    isTech: true,
  },
  {
    symbol: "AVGO",
    name: "Broadcom Inc",
    account: "Individual taxable",
    allocationPct: 4.0,
    marketValue: 248000,
    unrealizedGain: 136000,
    basisStatus: "Unverified",
    isTech: true,
  },
  {
    symbol: "XLK",
    name: "Tech ETF",
    account: "Joint taxable",
    allocationPct: 4.0,
    marketValue: 248000,
    unrealizedGain: 136000,
    basisStatus: "Unverified",
    isTech: true,
  },
  {
    symbol: "OTHER",
    name: "Diversified & Fixed Income",
    account: "Tax-deferred & Taxable",
    allocationPct: 38.0,
    marketValue: 2356000,
    unrealizedGain: 255000,
    basisStatus: "Verified",
    isTech: false,
  },
];
