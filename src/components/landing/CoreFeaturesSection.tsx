"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Clock, Brain, UserCheck, BarChart3, Play, Pause, RotateCcw, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function CoreFeaturesSection() {
  // Feature 03: Posture checklist
  const [postureState, setPostureState] = useState([
    { id: 1, text: "Feet flat on the floor", checked: true },
    { id: 2, text: "Lower back supported by lumbar arch", checked: true },
    { id: 3, text: "Shoulders dropped and loose", checked: false },
    { id: 4, text: "Eyes aligned with top 1/3 of monitor", checked: true },
  ]);

  const togglePosture = (id: number) => {
    setPostureState((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const postureScore = Math.round(
    (postureState.filter((p) => p.checked).length / postureState.length) * 100
  );

  return (
    <section id="features" className="py-24 md:py-32 bg-background-subtle border-t border-border">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <Badge variant="sage" className="mb-4">
            Core Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            One system for your whole workday.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Four interconnected pillars engineered to protect your focus, physiology, and mental clarity without disrupting your workflow.
          </p>
        </div>

        {/* 4 Large Editorial Feature Showcases */}
        <div className="space-y-24 md:space-y-32">
          {/* =========================================================================
              FEATURE 01: SMART BREAKS
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-5 space-y-5">
              <span className="font-mono text-xs font-semibold tracking-wider text-wellness uppercase">
                Feature 01 — Smart Breaks
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Know when to pause.
              </h3>
              <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
                FocusNext helps you take meaningful breaks at the right moments instead of waiting until you&apos;re already exhausted.
              </p>
              <ul className="space-y-2.5 pt-2 text-sm text-foreground">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>Ultradian rhythm pacing (50m focus + 5m recovery)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>Non-intrusive sensory reminders & gentle acoustic chimes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>Micro-activities: guided eye resting and spinal resets</span>
                </li>
              </ul>
            </div>

            {/* Right: Interactive Smart Break Widget */}
            <div className="lg:col-span-7">
              <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-wellness-light text-wellness-dark flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Adaptive Break System</h4>
                      <p className="text-xs text-foreground-secondary">Recommended pause in 8 minutes</p>
                    </div>
                  </div>
                  <Badge variant="sage">5m Recovery</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  {/* Mini Break Timer */}
                  <div className="p-5 rounded-2xl bg-background-subtle border border-border text-center space-y-3">
                    <div className="text-xs font-medium text-foreground-secondary">Break Countdown</div>
                    <div className="text-4xl font-bold font-mono text-foreground">
                      04:45
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <Button variant="sage" size="sm" className="rounded-lg">
                        <Play className="w-3 h-3 fill-current mr-1" />
                        <span>Take 5m Pause</span>
                      </Button>
                    </div>
                  </div>

                  {/* Contextual Nudge */}
                  <div className="p-5 rounded-2xl bg-wellness-subtle border border-[#D5E2D8] space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-wellness-dark">
                      <Sparkles className="w-3.5 h-3.5 text-wellness" />
                      <span>Break Activity: 20-20-20 Rule</span>
                    </div>
                    <p className="text-xs text-foreground-secondary leading-relaxed">
                      Look at an object 20 feet away for 20 seconds. Blink rapidly 5 times to replenish your corneal tear film.
                    </p>
                    <div className="text-[11px] font-medium text-wellness-dark pt-1">
                      ● Restores cognitive stamina by 28%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              FEATURE 02: FOCUS SESSIONS
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Interactive Focus Studio (Alternated on Desktop) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground">
                      <Brain className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Focus Studio</h4>
                      <p className="text-xs text-foreground-secondary">Deep work block in progress</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-foreground-secondary">
                    <span className="w-2 h-2 rounded-full bg-wellness animate-pulse" />
                    <span>Deep Work 50m</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-background-subtle border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left space-y-1">
                    <div className="text-xs text-foreground-secondary uppercase tracking-wider font-semibold">Active Session</div>
                    <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-foreground">
                      38:14
                    </div>
                    <div className="text-xs text-wellness font-medium">Distraction Shield: Active</div>
                  </div>

                  <div className="w-full sm:w-auto flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Button variant="primary" size="sm" className="w-full justify-center">
                        <Pause className="w-3.5 h-3.5 mr-1" />
                        <span>Pause Session</span>
                      </Button>
                      <Button variant="secondary" size="sm">
                        <RotateCcw className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="text-[11px] text-foreground-muted text-center">
                      Target: Strategic Spec Writing
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-wellness uppercase">
                Feature 02 — Focus
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Deep work, without the burnout.
              </h3>
              <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
                Create focused work sessions while maintaining healthier rhythms throughout the day.
              </p>
              <ul className="space-y-2.5 pt-2 text-sm text-foreground">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>Distraction-free timer modes (25m Pomodoro & 50m Deep Work)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>Automatic transition to restorative recovery cycles</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>Harmonic sound chimes using pure browser audio synthesis</span>
                </li>
              </ul>
            </div>
          </div>

          {/* =========================================================================
              FEATURE 03: POSTURE AWARENESS
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-5 space-y-5">
              <span className="font-mono text-xs font-semibold tracking-wider text-wellness uppercase">
                Feature 03 — Posture
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                A healthier way to sit.
              </h3>
              <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
                Build better posture awareness during long screen sessions with fast 4-point alignment check-ins.
              </p>
              <ul className="space-y-2.5 pt-2 text-sm text-foreground">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>Ergonomic 4-point alignment validation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>Calm 30-minute posture awareness nudges</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>Zero webcam surveillance — 100% private self-check</span>
                </li>
              </ul>
            </div>

            {/* Right: Interactive Posture Alignment Checklist */}
            <div className="lg:col-span-7">
              <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-wellness-light text-wellness-dark flex items-center justify-center">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Posture Alignment System</h4>
                      <p className="text-xs text-foreground-secondary">Quick 4-point ergonomic check</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-wellness-dark">{postureScore}% Compliant</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {postureState.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => togglePosture(item.id)}
                      className={cn(
                        "p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none",
                        item.checked
                          ? "bg-wellness-light/50 border-[#CBD8CE]"
                          : "bg-background-subtle border-border hover:bg-background-subtle/80"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-md flex items-center justify-center text-xs transition-colors",
                            item.checked
                              ? "bg-wellness text-white"
                              : "border border-border bg-surface"
                          )}
                        >
                          {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className={cn("text-xs sm:text-sm font-medium", item.checked ? "text-foreground" : "text-foreground-secondary")}>
                          {item.text}
                        </span>
                      </div>
                      <span className="text-[11px] text-foreground-muted">
                        {item.checked ? "Checked" : "Tap to verify"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              FEATURE 04: WELLNESS INSIGHTS
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Interactive Analytics Visual (Alternated on Desktop) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Weekly Rhythm Analytics</h4>
                      <p className="text-xs text-foreground-secondary">Mon – Fri Workday Trends</p>
                    </div>
                  </div>
                  <Badge variant="sage">94% Healthy Rhythms</Badge>
                </div>

                {/* Minimalist Bar Chart */}
                <div className="space-y-4">
                  <div className="h-32 flex items-end justify-between gap-3 pt-4 px-2">
                    {[
                      { day: "Mon", focus: 85, breaks: 90 },
                      { day: "Tue", focus: 92, breaks: 85 },
                      { day: "Wed", focus: 78, breaks: 70 },
                      { day: "Thu", focus: 95, breaks: 95 },
                      { day: "Fri", focus: 88, breaks: 80 },
                    ].map((item) => (
                      <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex items-end justify-center gap-1.5 h-24">
                          <div
                            className="w-3 sm:w-4 bg-[#111111] rounded-t-sm transition-all"
                            style={{ height: `${item.focus}%` }}
                            title={`Focus: ${item.focus}%`}
                          />
                          <div
                            className="w-3 sm:w-4 bg-wellness rounded-t-sm transition-all"
                            style={{ height: `${item.breaks}%` }}
                            title={`Breaks: ${item.breaks}%`}
                          />
                        </div>
                        <span className="text-[11px] font-medium text-foreground-secondary">{item.day}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-6 text-xs text-foreground-secondary pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-[#111111] rounded-sm" />
                      <span>Deep Focus Sessions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-wellness rounded-sm" />
                      <span>Recovery Adherence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-wellness uppercase">
                Feature 04 — Wellness Insights
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Understand your work patterns.
              </h3>
              <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
                Turn daily activity into simple insights that help you make better decisions about when to push and when to recover.
              </p>
              <ul className="space-y-2.5 pt-2 text-sm text-foreground">
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>Daily Wellness Score calculated from four physiological markers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>Personalized recommendations to optimize cognitive peak hours</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center text-xs">✓</span>
                  <span>No data selling or privacy compromises</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
