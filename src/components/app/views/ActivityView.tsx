"use client";

import React, { useState } from "react";
import { useWellness } from "@/lib/wellness-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Droplet,
  Footprints,
  CheckCircle2,
  Plus,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ActivityView() {
  const {
    stats,
    incrementWater,
    decrementWater,
    addSteps,
    completeStretch,
  } = useWellness();

  const [guidedStretches, setGuidedStretches] = useState([
    {
      id: "s1",
      title: "Chest & Shoulder Opener",
      duration: "30 seconds",
      instructions: "Interlace your fingers behind your lower back, gently straighten your arms, and open your chest upward.",
      done: false,
    },
    {
      id: "s2",
      title: "Seated Spinal Twist",
      duration: "45 seconds",
      instructions: "Place your right hand on the left knee, gently rotate your torso to the left, and breathe deeply. Repeat on other side.",
      done: false,
    },
    {
      id: "s3",
      title: "Trapezius & Neck Release",
      duration: "30 seconds",
      instructions: "Tilt your right ear toward your right shoulder without lifting the left shoulder. Hold and repeat on opposite side.",
      done: true,
    },
    {
      id: "s4",
      title: "Wrist & Forearm Extensor Stretch",
      duration: "30 seconds",
      instructions: "Extend one arm forward with palm facing up. Use the other hand to gently pull fingers back toward your body.",
      done: false,
    },
  ]);

  const toggleStretch = (id: string) => {
    setGuidedStretches((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          if (!s.done) completeStretch();
          return { ...s, done: !s.done };
        }
        return s;
      })
    );
  };

  const waterPercent = Math.min(100, Math.round((stats.waterGlasses / stats.waterGoal) * 100));
  const stepsPercent = Math.min(100, Math.round((stats.stepsCount / stats.stepsGoal) * 100));

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Activity & Movement
          </h1>
          <p className="text-xs sm:text-sm text-foreground-secondary mt-1">
            Track daily hydration, step goals, and restorative desk stretches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="sage">Daily Activity Target: Good</Badge>
        </div>
      </div>

      {/* 2-Column Grid: Water Tracker & Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Interactive Water Tracker */}
        <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-wellness-light text-wellness-dark flex items-center justify-center">
                <Droplet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Hydration Log</h3>
                <p className="text-xs text-foreground-secondary">Goal: 8 glasses (2.0L)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-mono text-foreground">{stats.waterGlasses}</span>
              <span className="text-xs text-foreground-secondary font-semibold"> / {stats.waterGoal}</span>
            </div>
          </div>

          {/* 8 Interactive Glass Buttons Grid */}
          <div className="grid grid-cols-4 gap-3 py-2">
            {Array.from({ length: 8 }).map((_, idx) => {
              const isFilled = idx < stats.waterGlasses;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={isFilled && idx === stats.waterGlasses - 1 ? decrementWater : incrementWater}
                  className={cn(
                    "p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all",
                    isFilled
                      ? "bg-wellness-light border-[#CBD7CE] text-wellness-dark shadow-subtle"
                      : "bg-background-subtle border-border text-foreground-muted hover:border-[#D0D0C8]"
                  )}
                  title={isFilled ? `Glass ${idx + 1} logged` : `Log glass ${idx + 1}`}
                >
                  <Droplet className={cn("w-5 h-5", isFilled ? "fill-wellness text-wellness" : "text-foreground-muted")} />
                  <span className="text-[10px] font-mono font-medium">250ml</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-xs text-foreground-secondary">{waterPercent}% completed</span>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={decrementWater} disabled={stats.waterGlasses === 0}>
                <Minus className="w-3.5 h-3.5" />
              </Button>
              <Button variant="sage" size="sm" onClick={incrementWater}>
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Log Glass</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Card 2: Steps & Movement Tracker */}
        <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Desk Movement</h3>
                <p className="text-xs text-foreground-secondary">Goal: 5,000 steps</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-mono text-foreground">{stats.stepsCount.toLocaleString()}</span>
              <span className="text-xs text-foreground-secondary font-semibold"> / {stats.stepsGoal.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2 py-4">
            <div className="w-full h-3 bg-background-subtle rounded-full overflow-hidden">
              <div className="h-full bg-wellness transition-all duration-500 rounded-full" style={{ width: `${stepsPercent}%` }} />
            </div>
            <div className="flex items-center justify-between text-xs text-foreground-secondary">
              <span>{stepsPercent}% of daily movement target</span>
              <span className="font-semibold text-wellness-dark">
                {stats.stepsCount >= stats.stepsGoal ? "Goal reached!" : `${(stats.stepsGoal - stats.stepsCount).toLocaleString()} steps left`}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-xs text-foreground-muted">Quick step increment</span>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => addSteps(250)} className="text-xs">
                +250 Steps
              </Button>
              <Button variant="secondary" size="sm" onClick={() => addSteps(500)} className="text-xs">
                +500 Steps
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Guided Desk Stretches */}
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">Guided Desk Stretches</h3>
            <p className="text-xs text-foreground-secondary">30-second ergonomic physical releases to eliminate muscular tension</p>
          </div>
          <Badge variant="sage">{guidedStretches.filter((s) => s.done).length} / {guidedStretches.length} Done</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {guidedStretches.map((stretch) => (
            <div
              key={stretch.id}
              onClick={() => toggleStretch(stretch.id)}
              className={cn(
                "p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 select-none",
                stretch.done
                  ? "bg-wellness-light/50 border-[#CBD8CE]"
                  : "bg-background-subtle border-border hover:bg-background-subtle/80"
              )}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-surface border border-border rounded-md text-foreground">
                    {stretch.duration}
                  </span>
                  <div
                    className={cn(
                      "w-5 h-5 rounded-md flex items-center justify-center text-xs",
                      stretch.done ? "bg-wellness text-white" : "border border-border bg-surface"
                    )}
                  >
                    {stretch.done && <CheckCircle2 className="w-4 h-4 fill-wellness text-white" />}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-foreground">{stretch.title}</h4>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  {stretch.instructions}
                </p>
              </div>

              <div className="text-[11px] font-medium text-wellness-dark pt-2 border-t border-border/40">
                {stretch.done ? "✓ Completed today" : "Tap to complete"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
