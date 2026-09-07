"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sparkles, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetabolicRiskCalculatorProps {
  onConsult: () => void;
}

export function MetabolicRiskCalculator({ onConsult }: MetabolicRiskCalculatorProps) {
  const [screenHours, setScreenHours] = useState<number>(1); // 0: <7h, 1: 8-11h, 2: 12h+
  const [seatingSetup, setSeatingSetup] = useState<number>(2); // 0: Ergonomic, 1: Standard Chair, 2: Bed/Sofa/PG
  const [sunlight, setSunlight] = useState<number>(2); // 0: >30m, 1: 10-15m, 2: <5m (Indoor)
  const [sleepSchedule, setSleepSchedule] = useState<number>(1); // 0: Normal, 1: 1-2 AM, 2: US Shift/Irregular

  // Compute Desk Worker Health Risk Score (0 to 100)
  const calculateScore = () => {
    let score = 20;
    if (screenHours === 1) score += 20;
    if (screenHours === 2) score += 35;

    if (seatingSetup === 1) score += 15;
    if (seatingSetup === 2) score += 25;

    if (sunlight === 1) score += 10;
    if (sunlight === 2) score += 20;

    if (sleepSchedule === 1) score += 10;
    if (sleepSchedule === 2) score += 20;

    return Math.min(100, Math.max(15, score));
  };

  const score = calculateScore();
  const isHighRisk = score >= 65;
  const isModerateRisk = score >= 40 && score < 65;

  return (
    <section id="risk-calculator" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Remote Worker & Intern Health Index
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Calculate your desk strain & ergonomic risk score.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Evaluate your tech neck vulnerability, screen eye fatigue, and indoor Vitamin D3 depletion based on your daily coding, design, and remote sprint habits.
          </p>
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Inputs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Screen Hours */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
                1. Daily Screen & Laptop Hours (Work + Leisure)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {["Under 7 Hours", "8 to 11 Hours (Standard)", "12+ Hours (Sprint Crunch)"].map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setScreenHours(idx)}
                    className={cn(
                      "py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all",
                      screenHours === idx
                        ? "bg-wellness-light border-[#CBD7CE] text-foreground"
                        : "bg-background-subtle border-border text-foreground-secondary hover:text-foreground"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Seating Setup */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
                2. Workstation & Seating Setup
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {["Ergonomic Chair + Stand", "Wooden / Dining Chair", "Bed / Sofa / PG Hostel"].map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setSeatingSetup(idx)}
                    className={cn(
                      "py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all",
                      seatingSetup === idx
                        ? "bg-wellness-light border-[#CBD7CE] text-foreground"
                        : "bg-background-subtle border-border text-foreground-secondary hover:text-foreground"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Sunlight Exposure */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
                3. Direct Sunlight Exposure (Vitamin D3)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {["> 30 Mins Daily", "10-15 Mins Balcony", "< 5 Mins (100% Indoor WFH)"].map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setSunlight(idx)}
                    className={cn(
                      "py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all",
                      sunlight === idx
                        ? "bg-wellness-light border-[#CBD7CE] text-foreground"
                        : "bg-background-subtle border-border text-foreground-secondary hover:text-foreground"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Sleep & Sprints */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
                4. Sleep Timing & Late-Night Sprints
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {["Before 12:00 AM", "Night Owl (1:00 - 2:30 AM)", "US Shift / Irregular Sprints"].map((label, idx) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setSleepSchedule(idx)}
                    className={cn(
                      "py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all",
                      sleepSchedule === idx
                        ? "bg-wellness-light border-[#CBD7CE] text-foreground"
                        : "bg-background-subtle border-border text-foreground-secondary hover:text-foreground"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Computed Result (5 Cols) */}
          <div className="lg:col-span-5 bg-background-subtle p-6 sm:p-8 rounded-2xl border border-border flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
                  Desk Strain Risk Index
                </span>
                <Badge variant={isHighRisk ? "neutral" : "sage"}>
                  {isHighRisk ? "High Strain Alert" : isModerateRisk ? "Moderate Strain" : "Ergonomic Balance"}
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-bold font-mono text-foreground">{score}</span>
                  <span className="text-xs font-semibold text-foreground-secondary">/ 100 Strain Score</span>
                </div>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  {isHighRisk
                    ? "Severe tech neck risk and acute Vitamin D3 depletion likely. Working from bed/couch with 11+ screen hours elevates cervical C5-C7 compression and digital eye fatigue."
                    : isModerateRisk
                    ? "Moderate ergonomic strain. We recommend setting a 20-20-20 screen break timer and scheduling a home Vitamin D3 & B12 lab panel."
                    : "Low strain profile! Maintain your ergonomic seating posture and keep taking daily natural sunlight breaks."}
                </p>
              </div>

              {/* Action Plan */}
              <div className="p-4 rounded-xl bg-surface border border-border space-y-2 text-xs">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-wellness" />
                  <span>Remote Care Recommendations:</span>
                </div>
                <ul className="space-y-1 text-foreground-secondary">
                  <li>• 10-Min Thoracic Decompression & Posture routine</li>
                  <li>• 20-20-20 Digital Eye Strain & tear-film drops</li>
                  <li>• 6:30 AM home blood collection: Vitamin D3 & B12</li>
                  <li>• Official medical certificate if sick leave is required</li>
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="sage" size="md" onClick={onConsult} className="w-full justify-center text-xs gap-1.5 font-semibold">
                <Video className="w-4 h-4" />
                <span>Discuss Score with Doctor (from ₹199)</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
