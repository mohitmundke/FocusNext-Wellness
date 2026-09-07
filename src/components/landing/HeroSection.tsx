"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Play, Pause, Activity, Brain, Clock, Sparkles } from "lucide-react";
import { useWellness } from "@/lib/wellness-context";

interface HeroSectionProps {
  onGetStarted: () => void;
  onExplore: () => void;
}

export function HeroSection({ onGetStarted, onExplore }: HeroSectionProps) {
  const {
    wellnessScore,
    focusMinutesToday,
    stats,
    postureScore,
    isTimerRunning,
    timeLeft,
    startTimer,
    pauseTimer,
  } = useWellness();

  const hours = Math.floor(focusMinutesToday / 60);
  const mins = focusMinutesToday % 60;
  const focusTimeString = `${hours}h ${mins}m`;

  const timerMins = Math.floor(timeLeft / 60);
  const timerSecs = timeLeft % 60;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Soft Geometry */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-wellness-light/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container">
        {/* Top Text Content */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2">
            <Badge variant="sage" className="tracking-wide uppercase font-semibold text-[11px] py-1 px-3">
              Workplace Wellness Technology
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.08]">
            Work better. <br />
            <span className="text-foreground">Feel better.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-foreground-secondary text-balance max-w-2xl mx-auto leading-relaxed">
            Smart breaks, focus sessions, activity awareness, posture guidance, and wellness insights — brought together in one calm, intelligent workspace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={onGetStarted}
              className="w-full sm:w-auto shadow-subtle text-sm md:text-base font-medium"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={onExplore}
              className="w-full sm:w-auto text-sm md:text-base"
            >
              <span>See how it works</span>
            </Button>
          </div>
        </div>

        {/* Hero Visual — Original Floating Product Visualization */}
        <div className="relative max-w-4xl mx-auto">
          {/* Subtle Abstract Wellness System Behind Dashboard: Focus → Break → Move → Recover */}
          <div className="absolute -inset-6 sm:-inset-10 flex items-center justify-center pointer-events-none -z-10 opacity-70">
            <div className="w-full h-full max-w-[850px] max-h-[850px] border border-wellness/20 rounded-full animate-spin-slow flex items-center justify-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-surface px-3 py-1 rounded-full border border-border text-[11px] font-medium text-wellness-dark flex items-center gap-1.5 shadow-subtle">
                <Brain className="w-3 h-3 text-wellness" />
                <span>Focus</span>
              </div>
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 bg-surface px-3 py-1 rounded-full border border-border text-[11px] font-medium text-wellness-dark flex items-center gap-1.5 shadow-subtle">
                <Clock className="w-3 h-3 text-wellness" />
                <span>Break</span>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-surface px-3 py-1 rounded-full border border-border text-[11px] font-medium text-wellness-dark flex items-center gap-1.5 shadow-subtle">
                <Activity className="w-3 h-3 text-wellness" />
                <span>Move</span>
              </div>
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 bg-surface px-3 py-1 rounded-full border border-border text-[11px] font-medium text-wellness-dark flex items-center gap-1.5 shadow-subtle">
                <Sparkles className="w-3 h-3 text-wellness" />
                <span>Recover</span>
              </div>
            </div>
          </div>

          {/* Floating FocusNext Dashboard Window */}
          <div className="bg-surface rounded-2xl md:rounded-3xl border border-border shadow-elevated overflow-hidden transition-all duration-300">
            {/* Window Top Bar */}
            <div className="px-5 py-3.5 border-b border-border/80 bg-background-subtle/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E3E3DE]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E3E3DE]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E3E3DE]" />
                <span className="text-xs font-medium text-foreground-secondary ml-2">FocusNext Workday Studio</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface border border-border px-2.5 py-0.5 rounded-full text-[11px] text-foreground-secondary font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-wellness animate-pulse" />
                <span>Active Rhythm</span>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-5 md:p-8 space-y-6">
              {/* Top Row: Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
                {/* Metric 1: Wellness Score */}
                <div className="bg-background-subtle rounded-xl p-3.5 border border-border/60">
                  <div className="text-[11px] font-medium text-foreground-secondary mb-1">Wellness Score</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-bold text-foreground">{wellnessScore}</span>
                    <span className="text-xs text-wellness font-semibold">/100</span>
                  </div>
                  <div className="text-[10px] text-wellness-dark mt-0.5">● Balanced Rhythm</div>
                </div>

                {/* Metric 2: Focus Time */}
                <div className="bg-background-subtle rounded-xl p-3.5 border border-border/60">
                  <div className="text-[11px] font-medium text-foreground-secondary mb-1">Focus Time</div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{focusTimeString}</div>
                  <div className="text-[10px] text-foreground-secondary mt-0.5">3 deep blocks</div>
                </div>

                {/* Metric 3: Breaks */}
                <div className="bg-background-subtle rounded-xl p-3.5 border border-border/60">
                  <div className="text-[11px] font-medium text-foreground-secondary mb-1">Breaks</div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">
                    {stats.breaksTaken} <span className="text-sm font-normal text-foreground-secondary">/ {stats.breaksGoal}</span>
                  </div>
                  <div className="text-[10px] text-foreground-secondary mt-0.5">Paced every 50m</div>
                </div>

                {/* Metric 4: Activity */}
                <div className="bg-background-subtle rounded-xl p-3.5 border border-border/60">
                  <div className="text-[11px] font-medium text-foreground-secondary mb-1">Activity</div>
                  <div className="text-2xl sm:text-3xl font-bold text-wellness">Good</div>
                  <div className="text-[10px] text-foreground-secondary mt-0.5">{stats.waterGlasses} glasses • {stats.stretchesDone} stretches</div>
                </div>

                {/* Metric 5: Posture */}
                <div className="col-span-2 sm:col-span-1 bg-background-subtle rounded-xl p-3.5 border border-border/60">
                  <div className="text-[11px] font-medium text-foreground-secondary mb-1">Posture</div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{postureScore}%</div>
                  <div className="text-[10px] text-wellness-dark mt-0.5">Aligned & relaxed</div>
                </div>
              </div>

              {/* Bottom Interactive Preview: Focus & Break Rhythm */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* Live Focus Session Box */}
                <div className="md:col-span-2 bg-background-subtle rounded-xl p-5 border border-border/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Current Work Block</h4>
                      <p className="text-xs text-foreground-secondary">Pomodoro 25-minute focus session</p>
                    </div>
                    <span className="text-xs font-mono font-medium px-2.5 py-1 bg-surface border border-border rounded-md text-foreground">
                      {String(timerMins).padStart(2, "0")}:{String(timerSecs).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-[#E5E5DF] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-wellness transition-all duration-1000"
                        style={{ width: `${Math.max(8, ((25 * 60 - timeLeft) / (25 * 60)) * 100)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-foreground-secondary pt-1">
                      <span>Next: 5-minute movement break</span>
                      <div className="flex items-center gap-2">
                        {isTimerRunning ? (
                          <button
                            onClick={pauseTimer}
                            className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary transition-colors"
                          >
                            <Pause className="w-3.5 h-3.5" /> Pause
                          </button>
                        ) : (
                          <button
                            onClick={startTimer}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-wellness hover:text-wellness-hover transition-colors"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" /> Start Session
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Adaptive Nudge Box */}
                <div className="bg-wellness-light/50 border border-[#D0DCD2] rounded-xl p-5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-wellness-dark">
                      <Sparkles className="w-3.5 h-3.5 text-wellness" />
                      <span>FocusNext AI Observation</span>
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">
                      &ldquo;You&apos;ve had a highly focused morning. Consider a short 3-minute posture stretch before your next session.&rdquo;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#D0DCD2]/60 flex items-center justify-between text-[11px] text-foreground-secondary">
                    <span>Posture score: 85%</span>
                    <span className="font-medium text-wellness-dark">Hydration on track</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
