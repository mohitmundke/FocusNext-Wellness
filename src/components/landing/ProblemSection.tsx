"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Eye, Armchair, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProblemSection() {
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(2);

  const timelineSteps = [
    { time: "09:00", label: "Focus", desc: "50-minute deep block: clear objectives, notification guard.", type: "focus" },
    { time: "10:15", label: "Break", desc: "5-minute recovery: 20-20-20 eye rest & hydration reset.", type: "break" },
    { time: "11:30", label: "Focus", desc: "Second cognitive session: strategic tasks & flow state.", type: "focus" },
    { time: "13:00", label: "Move", desc: "Post-lunch 10-minute light walk & spine elongation.", type: "move" },
    { time: "15:20", label: "Reset", desc: "Mid-afternoon stretch & posture alignment verification.", type: "reset" },
    { time: "17:30", label: "Done", desc: "Daily wrap-up, score compilation, clean shutdown.", type: "done" },
  ];

  const problemPoints = [
    {
      title: "Prolonged Screen Strain",
      desc: "Hours of continuous monitor gaze without visual depth resets cause chronic eye fatigue and headaches.",
      icon: Eye,
    },
    {
      title: "Static Posture Degradation",
      desc: "Sitting locked in one position for 6+ hours compresses the lumbar spine and locks shoulder muscles.",
      icon: Armchair,
    },
    {
      title: "Compounding Mental Depletion",
      desc: "Skipping recovery breaks decreases cognitive velocity by up to 40% before mid-afternoon.",
      icon: Coffee,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative">
      <div className="container">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4">
            The Workday Reality
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Modern work wasn&apos;t designed for humans.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-5 leading-relaxed">
            Continuous notifications, sedentary desk hours, skipped pauses, and unrelenting screen exposure drain our energy before the workday even ends.
          </p>
        </div>

        {/* 2-Column Split: Problems on Left vs FocusNext Timeline on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: The Problem Cards + Intro */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              {problemPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className="p-5 rounded-2xl bg-surface border border-border shadow-subtle flex items-start gap-4 hover:border-[#D0D0C8] transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-background-subtle border border-border flex items-center justify-center text-foreground shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-foreground-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{point.title}</h3>
                      <p className="text-xs sm:text-sm text-foreground-secondary mt-1 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Transition Quote */}
            <div className="p-6 rounded-2xl bg-wellness-subtle border border-[#D5E1D8] relative">
              <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">
                &ldquo;FocusNext turns everyday work habits into healthier routines — without adding another complicated system to your day.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Workday Rhythm Timeline Visual */}
          <div className="lg:col-span-6">
            <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div>
                  <h4 className="text-base font-semibold text-foreground">The Healthy Workday Timeline</h4>
                  <p className="text-xs text-foreground-secondary">Natural balance between output and physiological recovery</p>
                </div>
                <Badge variant="sage">Balanced Pace</Badge>
              </div>

              {/* Interactive Timeline List */}
              <div className="mt-6 space-y-3">
                {timelineSteps.map((step, idx) => {
                  const isSelected = selectedTimelineIndex === idx;
                  return (
                    <div
                      key={step.time}
                      onClick={() => setSelectedTimelineIndex(idx)}
                      className={cn(
                        "p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4",
                        isSelected
                          ? "bg-wellness-light/60 border-[#C0D2C4] shadow-subtle"
                          : "bg-background-subtle/50 border-border hover:bg-background-subtle"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-surface border border-border rounded-md text-foreground">
                          {step.time}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground">{step.label}</span>
                            {isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-wellness animate-pulse" />
                            )}
                          </div>
                          <p className="text-xs text-foreground-secondary mt-0.5">{step.desc}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            step.type === "focus" && "bg-[#EAEAE5] text-[#333330]",
                            step.type === "break" && "bg-wellness-light text-wellness-dark border border-[#D0DCD2]",
                            step.type === "move" && "bg-wellness-light text-wellness-dark border border-[#D0DCD2]",
                            step.type === "reset" && "bg-[#EAEAE5] text-[#333330]",
                            step.type === "done" && "bg-surface border border-border text-foreground-secondary"
                          )}
                        >
                          {step.type}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-border/80 flex items-center justify-between text-xs text-foreground-muted">
                <span>Adaptive timing based on session duration</span>
                <span className="font-medium text-wellness-dark">Zero intrusive popups</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
