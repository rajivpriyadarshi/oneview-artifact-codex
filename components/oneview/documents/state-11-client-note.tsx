"use client";

import React from "react";
import { ExposurePathChart } from "../embeds/exposure-path-chart";

export function State11ClientNoteDoc() {
  return (
    <div className="max-w-[700px] mx-auto pb-20 pt-4">
      {/* Hero */}
      <header className="mb-12">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-[#8b6534] uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b6534]"></span>
          Client discussion note · Draft
        </div>
        <h1 className="font-serif text-[42px] font-medium text-[#1a1b18] leading-[1.1] mb-5">
          Reducing technology concentration while keeping the NVDA core
        </h1>
        <p className="font-sans text-[19px] text-[#4d4e48] leading-[1.5] mb-8">
          Technology has grown to 62% of the portfolio. The proposed approach reduces that concentration gradually while keeping the existing NVDA core intact and using part of the next vest to diversify.
        </p>
        
        {/* Meta */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-[#e8e4dc] text-[13.5px] font-sans text-[#55544e]">
          <span><strong className="text-[#1a1b18]">Prepared for</strong> Prashanth Ranganathan</span>
          <span><strong className="text-[#1a1b18]">Current technology</strong> 62%</span>
          <span><strong className="text-[#1a1b18]">Proposed range</strong> ~44%</span>
          <span><strong className="text-[#1a1b18]">Timeframe</strong> 12 months</span>
          <span><strong className="text-[#1a1b18]">For discussion</strong> Oct 2, 2026</span>
        </div>
      </header>

      {/* Sections */}
      <div className="space-y-16">
        
        {/* Current position */}
        <section>
          <h2 className="font-serif text-[28px] font-medium text-[#1a1b18] leading-[1.2] mb-4">
            Current position
          </h2>
          <p className="font-sans text-[16px] text-[#4d4e48] leading-[1.6] mb-5">
            Technology represents <strong className="text-[#1a1b18]">62%</strong> of the portfolio today. The five largest technology holdings account for <strong className="text-[#1a1b18]">54%</strong>, and NVDA alone represents <strong className="text-[#1a1b18]">18%</strong>. Counting the NVDA shares still to vest through 2029, your economic exposure to a single company is closer to <strong className="text-[#1a1b18]">$3.06M</strong> — before considering that your salary depends on the same company.
          </p>
          <div className="bg-[#faf9f6] border border-[#e8e4dc] rounded-xl p-5">
            <p className="font-sans text-[15px] text-[#4d4e48] leading-[1.5] m-0">
              The objective is to reduce dependence on one sector without changing the portfolio's long-term growth orientation.
            </p>
          </div>
        </section>

        {/* What changed */}
        <section>
          <h2 className="font-serif text-[28px] font-medium text-[#1a1b18] leading-[1.2] mb-4">
            What changed
          </h2>
          <p className="font-sans text-[16px] text-[#4d4e48] leading-[1.6] mb-5">
            Your October NVDA vest is now confirmed. A gross tranche of roughly <strong className="text-[#1a1b18]">$600K</strong> settles with about $180K withheld in shares, leaving approximately <strong className="text-[#1a1b18]">$420K</strong> delivered to you. If all of those shares are retained and the prior plan is left unchanged, technology would finish near <strong className="text-[#1a1b18]">47.6%</strong> instead of the ~44% we were targeting, and NVDA on its own would sit at 23.2% of the portfolio.
          </p>
          <p className="font-sans text-[14px] text-[#6c6b65] leading-[1.5]">
            One thing to flag separately: the vest is withheld at a flat 22% federal rate, which is below your marginal rate. We expect roughly <strong className="text-[#1a1b18]">$90K</strong> of additional federal tax on that income with your 2026 return. We would rather cover it in the January estimate than have it appear in April.
          </p>
        </section>

        {/* Proposed approach */}
        <section>
          <h2 className="font-serif text-[28px] font-medium text-[#1a1b18] leading-[1.2] mb-4">
            Proposed approach
          </h2>
          <p className="font-sans text-[16px] text-[#4d4e48] leading-[1.6] mb-6">
            Keep the existing <strong className="text-[#1a1b18]">$1.116M NVDA core</strong> intact. Use approximately <strong className="text-[#1a1b18]">60% of the new vest (~$252K)</strong> for diversification, then continue the staged reductions in the other technology holdings over the next 12 months. Because newly vested shares are valued at the price they vest at, selling them soon after vest costs very little in tax — they are by some distance the cheapest technology in the portfolio to sell.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8">
            <div>
              <div className="text-[11px] font-mono font-bold text-[#8b6534] uppercase tracking-wider mb-4 border-b border-[#e8e4dc] pb-2">
                Technology exposure · proposed path
              </div>
              <ExposurePathChart />
            </div>
            
            <aside className="bg-[#faf9f6] border border-[#e8e4dc] rounded-xl p-5">
              <div className="text-[11px] font-mono font-bold text-[#8b6534] uppercase tracking-wider mb-3">
                Keeps intact
              </div>
              <ul className="list-disc pl-4 space-y-2 text-[14px] font-sans text-[#4d4e48] leading-[1.5]">
                <li>Existing NVDA core, in full.</li>
                <li>Growth-oriented allocation, ~90% of proceeds reinvested in equities.</li>
                <li>Staged implementation with the option to pause.</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* Portfolio impact */}
        <section>
          <h2 className="font-serif text-[28px] font-medium text-[#1a1b18] leading-[1.2] mb-6">
            Portfolio impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border-t-2 border-[#1a1b18] pt-3">
              <div className="font-sans text-[20px] font-bold text-[#1a1b18] mb-1">62% → ~44%</div>
              <div className="font-sans text-[13.5px] text-[#6c6b65] leading-[1.4]">technology exposure</div>
            </div>
            <div className="border-t-2 border-[#1a1b18] pt-3">
              <div className="font-sans text-[20px] font-bold text-[#1a1b18] mb-1">−12.4% → −8.8%</div>
              <div className="font-sans text-[13.5px] text-[#6c6b65] leading-[1.4]">impact from an illustrative −20% technology shock</div>
            </div>
            <div className="border-t-2 border-[#1a1b18] pt-3">
              <div className="font-sans text-[20px] font-bold text-[#1a1b18] mb-1">$1.116M</div>
              <div className="font-sans text-[13.5px] text-[#6c6b65] leading-[1.4]">planned reductions from non-NVDA technology</div>
            </div>
            <div className="border-t-2 border-[#1a1b18] pt-3">
              <div className="font-sans text-[20px] font-bold text-[#1a1b18] mb-1">~$82K</div>
              <div className="font-sans text-[13.5px] text-[#6c6b65] leading-[1.4]">estimated federal tax across 12 months</div>
            </div>
          </div>
        </section>

        {/* Implementation */}
        <section>
          <h2 className="font-serif text-[28px] font-medium text-[#1a1b18] leading-[1.2] mb-6">
            Implementation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#e8e4dc] hidden md:block"></div>
            <div className="pr-0 md:pr-4">
              <h3 className="font-sans text-[18px] font-bold text-[#1a1b18] mb-2">Broaden equity exposure</h3>
              <p className="font-sans text-[14px] text-[#6c6b65] leading-[1.5]">
                Redirect most proceeds into international developed equities, U.S. quality/value and small/mid-cap exposure so the portfolio remains invested for growth. We screen those funds so the money does not quietly find its way back into the same handful of technology names.
              </p>
            </div>
            <div className="pl-0 md:pl-4 border-t border-[#e8e4dc] pt-6 md:border-t-0 md:pt-0">
              <h3 className="font-sans text-[18px] font-bold text-[#1a1b18] mb-2">Work within your trading obligations</h3>
              <p className="font-sans text-[14px] text-[#6c6b65] leading-[1.5]">
                None of the other six holdings is restricted, so those sales can be worked at any time. Sales of NVDA shares would run through a pre-arranged 10b5-1 plan adopted in an open window, which also removes the timing question from every future vest.
              </p>
            </div>
          </div>
        </section>

        {/* Points to discuss */}
        <section>
          <h2 className="font-serif text-[28px] font-medium text-[#1a1b18] leading-[1.2] mb-6">
            Points to discuss
          </h2>
          <ol className="list-decimal pl-5 space-y-5 font-sans">
            <li>
              <strong className="text-[16px] text-[#1a1b18]">Does "keep NVDA" apply to the new vest as well as the existing core?</strong>
              <p className="text-[14px] text-[#6c6b65] mt-1 leading-[1.5]">The proposal protects the existing position and uses part of the new vest for diversification. Retaining the whole tranche puts a single position above 23% of the portfolio, which is a level we would want to document and revisit with you.</p>
            </li>
            <li>
              <strong className="text-[16px] text-[#1a1b18]">Is ~44% an acceptable landing point?</strong>
              <p className="text-[14px] text-[#6c6b65] mt-1 leading-[1.5]">Your policy statement records a 35–45% range. Moving closer to 40% would require more selling or a longer timeline.</p>
            </li>
            <li>
              <strong className="text-[16px] text-[#1a1b18]">Is a 12-month pace comfortable?</strong>
              <p className="text-[14px] text-[#6c6b65] mt-1 leading-[1.5]">The plan can be extended to 18 months if lower annual tax realization matters more than reaching the target sooner.</p>
            </li>
          </ol>
          <div className="mt-8 bg-[#fdfaf5] border border-[#f5ead3] rounded-xl p-5">
            <p className="font-sans text-[14.5px] text-[#1a1b18] leading-[1.5] m-0">
              <strong>What we need from you.</strong> A decision on the vest treatment before the October window closes, and your CPA's contact so we can align the tax estimate. Everything else can be settled at the review.
            </p>
          </div>
        </section>

        {/* Monitoring */}
        <section>
          <h2 className="font-serif text-[28px] font-medium text-[#1a1b18] leading-[1.2] mb-6">
            Monitoring
          </h2>
          <div className="space-y-0">
            <div className="grid grid-cols-[1fr_auto] gap-4 items-start py-3 font-sans border-b border-[#e8e4dc]">
              <div>
                <strong className="text-[14px] text-[#1a1b18]">Technology exposure</strong>
                <div className="text-[13.5px] text-[#6c6b65] mt-0.5">Recalculated after material market movements; we pause the schedule if the market does the work for us.</div>
              </div>
              <div className="text-[13.5px] font-medium text-[#1a1b18]">Target ~44%</div>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-4 items-start py-3 font-sans border-b border-[#e8e4dc]">
              <div>
                <strong className="text-[14px] text-[#1a1b18]">NVDA vesting</strong>
                <div className="text-[13.5px] text-[#6c6b65] mt-0.5">Reviewed with you before each tranche is added to the core.</div>
              </div>
              <div className="text-[13.5px] font-medium text-[#1a1b18]">At each vest</div>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-4 items-start py-3 font-sans">
              <div>
                <strong className="text-[14px] text-[#1a1b18]">Tax impact</strong>
                <div className="text-[13.5px] text-[#6c6b65] mt-0.5">Higher-basis shares used first; estimate refreshed before each window and shared with your CPA.</div>
              </div>
              <div className="text-[13.5px] font-medium text-[#1a1b18]">Quarterly</div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="pt-6 border-t border-[#e8e4dc] mt-12">
          <p className="font-sans text-[11.5px] text-[#969ba3] leading-[1.5]">
            Draft discussion note prepared for the Oct 2, 2026 review. Figures are illustrative, federal only, and should be validated before sharing externally. This note is not tax or legal advice; tax positions should be confirmed with the client's own adviser.
          </p>
        </div>

      </div>
    </div>
  );
}
