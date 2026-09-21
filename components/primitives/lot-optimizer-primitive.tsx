"use client";

import React, { useState, useMemo } from "react";
import { Sliders, Check, AlertTriangle, ShieldCheck } from "lucide-react";

export interface TaxLot {
  id: string;
  security: string;
  account: string;
  totalShares: number;
  pricePerShare: number;
  costBasisPerShare: number;
  eligibleWindow: string;
  taxTerm: string;
  defaultSellShares: number;
  clientRestricted?: boolean;
}

export interface LotOptimizerPrimitiveProps {
  onApplyPlan?: (result: {
    totalProceeds: number;
    totalGains: number;
    terminalTechPercent: number;
    allocations: Record<string, number>;
  }) => void;
  gainLimit?: number;
  exposureGoal?: number;
  vestDeliveryShares?: number;
  totalLiquidNav?: number;
  initialDirectTech?: number;
  lookthroughTech?: number;
}

export function LotOptimizerPrimitive({
  onApplyPlan,
  gainLimit = 100000,
  exposureGoal = 40.0,
  vestDeliveryShares = 1000,
  totalLiquidNav = 5000000,
  initialDirectTech = 1850000,
  lookthroughTech = 200000,
}: LotOptimizerPrimitiveProps) {
  // Canonical tax lots from fixture
  const lots: TaxLot[] = useMemo(
    () => [
      {
        id: "ETF-A",
        security: "Tech ETF (Broader)",
        account: "Brokerage · Custody A",
        totalShares: 2500,
        pricePerShare: 100,
        costBasisPerShare: 80,
        eligibleWindow: "Immediate (Liquid)",
        taxTerm: "Long-term",
        defaultSellShares: 2000,
      },
      {
        id: "MS-A",
        security: "Microsoft Corp (MSFT)",
        account: "Equity Incentive · Custody B",
        totalShares: 250,
        pricePerShare: 400,
        costBasisPerShare: 360,
        eligibleWindow: "5 Oct Window",
        taxTerm: "Short-term (High basis)",
        defaultSellShares: 250,
      },
      {
        id: "MS-B",
        security: "Microsoft Corp (MSFT)",
        account: "Equity Incentive · Custody B",
        totalShares: 500,
        pricePerShare: 400,
        costBasisPerShare: 260,
        eligibleWindow: "5 Oct Window",
        taxTerm: "Long-term",
        defaultSellShares: 0,
      },
      {
        id: "MS-C",
        security: "Microsoft Corp (MSFT)",
        account: "Equity Incentive · Custody B",
        totalShares: 750,
        pricePerShare: 400,
        costBasisPerShare: 80,
        eligibleWindow: "5 Oct Window",
        taxTerm: "Long-term (Low basis)",
        defaultSellShares: 0,
      },
    ],
    []
  );

  // State: shares sold per lot ID
  const [sharesSold, setSharesSold] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    lots.forEach((lot) => {
      initial[lot.id] = lot.defaultSellShares;
    });
    return initial;
  });

  const [modelVestSale, setModelVestSale] = useState(true);

  // Calculations
  const metrics = useMemo(() => {
    let totalProceeds = 0;
    let totalGains = 0;

    lots.forEach((lot) => {
      const sold = sharesSold[lot.id] || 0;
      const proceeds = sold * lot.pricePerShare;
      const gainPerShare = Math.max(0, lot.pricePerShare - lot.costBasisPerShare);
      const lotGain = sold * gainPerShare;

      totalProceeds += proceeds;
      totalGains += lotGain;
    });

    // Model vest: 1,000 shares @ $400 = $400k
    const vestValue = vestDeliveryShares * 400; // $400,000
    const netDirectTech = initialDirectTech - totalProceeds + (modelVestSale ? 0 : vestValue);
    const totalTechAtHorizon = netDirectTech + lookthroughTech;

    // Terminal liquid portfolio NAV
    const terminalNav = totalLiquidNav - 650000 + 400000; // $4.75m
    const terminalTechPercent = (totalTechAtHorizon / terminalNav) * 100;

    const gainUtilization = (totalGains / gainLimit) * 100;
    const isGainBreached = totalGains > gainLimit;
    const isExposureMet = terminalTechPercent <= exposureGoal;

    return {
      totalProceeds,
      totalGains,
      gainUtilization,
      isGainBreached,
      gainHeadroom: gainLimit - totalGains,
      totalTechAtHorizon,
      terminalNav,
      terminalTechPercent,
      isExposureMet,
    };
  }, [lots, sharesSold, modelVestSale, vestDeliveryShares, initialDirectTech, lookthroughTech, totalLiquidNav, gainLimit, exposureGoal]);

  // Preset Handlers
  const applyPreset = (preset: "planV1" | "minTax" | "capGain" | "aggressive") => {
    if (preset === "planV1") {
      setSharesSold({
        "ETF-A": 2000, // $200k (gain $40k)
        "MS-A": 250,   // $100k (gain $10k) -> total gain $50k
        "MS-B": 0,
        "MS-C": 0,
      });
      setModelVestSale(true);
    } else if (preset === "minTax") {
      setSharesSold({
        "ETF-A": 2500, // $250k (gain $50k)
        "MS-A": 250,   // $100k (gain $10k) -> total gain $60k
        "MS-B": 0,
        "MS-C": 0,
      });
      setModelVestSale(true);
    } else if (preset === "capGain") {
      setSharesSold({
        "ETF-A": 2500, // $250k (gain $50k)
        "MS-A": 250,   // $100k (gain $10k)
        "MS-B": 285,   // $114k (gain $40k) -> total gain $100k
        "MS-C": 0,
      });
      setModelVestSale(true);
    } else if (preset === "aggressive") {
      setSharesSold({
        "ETF-A": 2500, // $250k (gain $50k)
        "MS-A": 250,   // $100k (gain $10k)
        "MS-B": 500,   // $200k (gain $70k) -> total gain $130k
        "MS-C": 0,
      });
      setModelVestSale(true);
    }
  };

  const updateLotShares = (id: string, count: number, max: number) => {
    const clamped = Math.max(0, Math.min(count, max));
    setSharesSold((prev) => ({ ...prev, [id]: clamped }));
  };

  return (
    <div className="space-y-6">
      {/* Header & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#faf8f4] border border-[#e8e2d5]">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#8e6e3c]" />
            <h3 className="font-serif text-base font-semibold text-[#1f201c]">
              Interactive Tax-Lot Simulator
            </h3>
          </div>
          <p className="text-xs text-[#6e6d66] mt-0.5">
            Adjust sold share quantities to observe real-time tax drag, proceeds, and concentration effects.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => applyPreset("planV1")}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white border border-[#dedad0] hover:border-[#8e6e3c] text-[#2c2d28] transition-all shadow-2xs"
          >
            Plan v1 ($50k gain)
          </button>
          <button
            onClick={() => applyPreset("minTax")}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white border border-[#dedad0] hover:border-[#8e6e3c] text-[#2c2d28] transition-all shadow-2xs"
          >
            Full ETF Shield ($60k gain)
          </button>
          <button
            onClick={() => applyPreset("capGain")}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white border border-[#dedad0] hover:border-[#8e6e3c] text-[#2c2d28] transition-all shadow-2xs"
          >
            Exact $100k Limit
          </button>
          <button
            onClick={() => applyPreset("aggressive")}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white border border-[#dedad0] hover:border-[#8e6e3c] text-[#2c2d28] transition-all shadow-2xs"
          >
            Aggressive Trim ($130k gain)
          </button>
        </div>
      </div>

      {/* Live Financial Gauge Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Realized Capital Gains */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            metrics.isGainBreached
              ? "bg-[#fdf2ef] border-[#f5cdc5]"
              : metrics.totalGains >= 90000
              ? "bg-[#fcf7ec] border-[#fae2be]"
              : "bg-white border-[#e6e1d6]"
          }`}
        >
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#6a6862]">
            <span>Realized Gains</span>
            <span className="font-mono">{metrics.gainUtilization.toFixed(0)}%</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span
              className={`font-mono text-2xl font-bold ${
                metrics.isGainBreached
                  ? "text-[#b23927]"
                  : metrics.totalGains >= 90000
                  ? "text-[#9e6c27]"
                  : "text-[#1e6f47]"
              }`}
            >
              ${(metrics.totalGains / 1000).toFixed(1)}k
            </span>
            <span className="text-xs text-[#8c8a82]">/ ${gainLimit / 1000}k ceiling</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-[#e8e4db] rounded-full mt-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                metrics.isGainBreached
                  ? "bg-[#b23927]"
                  : metrics.totalGains >= 90000
                  ? "bg-[#d98b2b]"
                  : "bg-[#25784f]"
              }`}
              style={{ width: `${Math.min(100, metrics.gainUtilization)}%` }}
            />
          </div>
          <div className="mt-2 text-[10px] font-medium">
            {metrics.isGainBreached ? (
              <span className="text-[#a83321] flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Exceeds limit by ${( (metrics.totalGains - gainLimit) / 1000 ).toFixed(1)}k
              </span>
            ) : (
              <span className="text-[#25784f] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> ${( metrics.gainHeadroom / 1000 ).toFixed(1)}k headroom remaining
              </span>
            )}
          </div>
        </div>

        {/* Total Cash Proceeds */}
        <div className="p-4 rounded-xl bg-white border border-[#e6e1d6]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6a6862] block">
            Net Sale Proceeds
          </span>
          <div className="mt-1 font-mono text-2xl font-bold text-[#1a1b18]">
            ${(metrics.totalProceeds / 1000).toFixed(0)}k
          </div>
          <p className="mt-2 text-[10px] text-[#78766f]">
            Generates liquidity for 28 Sep property ($400k) & 30 Sep call ($250k).
          </p>
        </div>

        {/* Terminal Tech Exposure % */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            metrics.isExposureMet
              ? "bg-[#f2f8f4] border-[#c9e8d5]"
              : "bg-[#fdf7ee] border-[#fae2be]"
          }`}
        >
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#6a6862]">
            <span>Horizon Tech %</span>
            <span className="font-mono">Target ≤{exposureGoal}%</span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span
              className={`font-mono text-2xl font-bold ${
                metrics.isExposureMet ? "text-[#1e6f47]" : "text-[#b0671f]"
              }`}
            >
              {metrics.terminalTechPercent.toFixed(1)}%
            </span>
            <span className="text-xs text-[#8c8a82]">of $4.75m</span>
          </div>
          <p className="mt-2 text-[10px] font-medium">
            {metrics.isExposureMet ? (
              <span className="text-[#23754b] flex items-center gap-1">
                <Check className="w-3 h-3" /> Achieves concentration target
              </span>
            ) : (
              <span className="text-[#a8651f] flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> {(metrics.terminalTechPercent - exposureGoal).toFixed(1)}% above target
              </span>
            )}
          </p>
        </div>

        {/* Vest Sale Assumption Toggle */}
        <div className="p-4 rounded-xl bg-white border border-[#e6e1d6] flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6a6862] block">
              2 Nov Vest Policy
            </span>
            <div className="font-mono text-sm font-semibold text-[#181916] mt-1">
              1,000 MSFT Shares ($400k)
            </div>
          </div>
          <button
            onClick={() => setModelVestSale(!modelVestSale)}
            className={`mt-2 w-full py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all border ${
              modelVestSale
                ? "bg-[#e8f5ec] text-[#206941] border-[#c0e4ce]"
                : "bg-[#faece7] text-[#a13524] border-[#f0c2b7]"
            }`}
          >
            {modelVestSale ? "✓ Modeled Sell at Vest" : "✗ Retained (Permission Denied)"}
          </button>
        </div>
      </div>

      {/* Tax Lots List with Tactile Sliders */}
      <div className="bg-white rounded-2xl border border-[#e6e1d6] overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 bg-[#faf8f4] border-b border-[#eee9df] flex items-center justify-between">
          <span className="text-xs font-serif font-semibold text-[#1f201c]">
            Eligible Portfolio Tax Lots (NVIDIA excluded per mandate)
          </span>
          <span className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">
            All prices normalized to 21 Sep close ($400 MSFT / $100 ETF)
          </span>
        </div>

        <div className="divide-y divide-[#f2efe9]">
          {lots.map((lot) => {
            const sold = sharesSold[lot.id] || 0;
            const proceeds = sold * lot.pricePerShare;
            const gainPerShare = Math.max(0, lot.pricePerShare - lot.costBasisPerShare);
            const lotGain = sold * gainPerShare;
            const percentSold = (sold / lot.totalShares) * 100;

            return (
              <div key={lot.id} className="p-5 hover:bg-[#fffdfa] transition-colors space-y-3">
                {/* Lot Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#f0ecdf] text-[#4d4a42] border border-[#ded8cb]">
                      {lot.id}
                    </span>
                    <div>
                      <div className="font-serif text-sm font-semibold text-[#1a1b18]">
                        {lot.security}
                      </div>
                      <div className="text-[11px] text-[#7c7a72]">{lot.account}</div>
                    </div>
                  </div>

                  {/* Lot Metadata Badges */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#f5f3ec] text-[#636158]">
                      {lot.taxTerm}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#eef5f0] text-[#2b6d49] border border-[#cde4d5]">
                      {lot.eligibleWindow}
                    </span>
                    <div className="text-right pl-2 border-l border-[#e8e4db]">
                      <div className="text-[10px] text-[#8c8a82]">Cost Basis / Sh</div>
                      <div className="font-mono font-semibold text-xs text-[#20211d]">
                        ${lot.costBasisPerShare}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tactile Slider Control Row */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-12 items-center gap-4">
                  {/* Slider & Quick Steps */}
                  <div className="sm:col-span-7 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#716f67]">Shares to Liquidate:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#1e1f1c]">
                          {sold.toLocaleString()} / {lot.totalShares.toLocaleString()} shares
                        </span>
                        <span className="text-[10px] font-mono text-[#8a8880]">
                          ({percentSold.toFixed(0)}%)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={lot.totalShares}
                        step={lot.totalShares > 500 ? 50 : 25}
                        value={sold}
                        onChange={(e) => updateLotShares(lot.id, Number(e.target.value), lot.totalShares)}
                        className="w-full accent-[#8e6e3c] h-1.5 bg-[#e8e4db] rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateLotShares(lot.id, 0, lot.totalShares)}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#f4f1ea] hover:bg-[#e8e4db] text-[#5b5952]"
                        >
                          0
                        </button>
                        <button
                          onClick={() => updateLotShares(lot.id, Math.round(lot.totalShares / 2), lot.totalShares)}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#f4f1ea] hover:bg-[#e8e4db] text-[#5b5952]"
                        >
                          50%
                        </button>
                        <button
                          onClick={() => updateLotShares(lot.id, lot.totalShares, lot.totalShares)}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#f4f1ea] hover:bg-[#e8e4db] text-[#5b5952]"
                        >
                          Max
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Calculated Lot Proceeds & Gain */}
                  <div className="sm:col-span-5 grid grid-cols-2 gap-3 p-2.5 rounded-xl bg-[#faf7f2] border border-[#e8e3d8]">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#828078] block">Proceeds</span>
                      <div className="font-mono text-sm font-bold text-[#1f201c]">
                        ${proceeds.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#828078] block">Taxable Gain</span>
                      <div
                        className={`font-mono text-sm font-bold ${
                          lotGain > 0 ? "text-[#286f4a]" : "text-[#7d7b74]"
                        }`}
                      >
                        ${lotGain.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Bottom Bar */}
        <div className="p-4 bg-[#f8f6f0] border-t border-[#eee9df] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-[#6e6c64]">
            <span className="font-semibold text-[#20211d]">RM Verification:</span> All sales modeled for execution in accordance with client restriction guidelines.
          </div>
          <button
            onClick={() => {
              if (onApplyPlan) {
                onApplyPlan({
                  totalProceeds: metrics.totalProceeds,
                  totalGains: metrics.totalGains,
                  terminalTechPercent: metrics.terminalTechPercent,
                  allocations: sharesSold,
                });
              }
            }}
            className="cta-button-primary text-xs"
          >
            <Check className="w-3.5 h-3.5 mr-1" />
            Apply Custom Lot Mix to Active Plan
          </button>
        </div>
      </div>
    </div>
  );
}
