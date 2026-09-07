"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  LayoutDashboard,
  Brain,
  Activity,
  HeartPulse,
  BarChart3,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Droplet,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { useWellness } from "@/lib/wellness-context";
import { cn } from "@/lib/utils";

interface ProductExperienceSectionProps {
  onOpenApp?: () => void;
}

export function ProductExperienceSection({ onOpenApp }: ProductExperienceSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const {
    wellnessScore,
    stats,
    postureScore,
    isTimerRunning,
    timeLeft,
    startTimer,
    pauseTimer,
    resetTimer,
    incrementWater,
  } = useWellness();

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "focus", label: "Focus", icon: Brain },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "wellness", label: "Wellness", icon: HeartPulse },
    { id: "insights", label: "Insights", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const timerMins = Math.floor(timeLeft / 60);
  const timerSecs = timeLeft % 60;

  return (
    <section id="product" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 md:mb-18">
          <Badge variant="sage">Interactive SaaS Simulation</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Your entire workday. At a glance.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary max-w-xl mx-auto leading-relaxed">
            Experience the calm, intuitive FocusNext dashboard built to keep you centered, hydrated, and energized throughout your workday.
          </p>
        </div>

        {/* Realistic FocusNext SaaS Dashboard Frame */}
        <div className="max-w-5xl mx-auto bg-surface rounded-3xl border border-border shadow-elevated overflow-hidden">
          {/* Top Frame Bar */}
          <div className="px-6 py-4 border-b border-border bg-background-subtle/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E0E0DA]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E0E0DA]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E0E0DA]" />
              </div>
              <span className="text-xs font-semibold text-foreground tracking-tight ml-2">
                FocusNext Workspace — Live Preview
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-wellness-dark flex items-center gap-1.5 bg-wellness-light px-2.5 py-1 rounded-full border border-[#D2DFD5]">
                <span className="w-1.5 h-1.5 rounded-full bg-wellness animate-pulse" />
                Live Session Active
              </span>
              {onOpenApp && (
                <Button variant="primary" size="sm" onClick={onOpenApp} className="hidden sm:inline-flex text-xs">
                  <span>Launch Full App</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              )}
            </div>
          </div>

          {/* Dashboard Layout: Sidebar + Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[560px]">
            {/* Sidebar */}
            <div className="md:col-span-3 border-r border-border bg-background-subtle/50 p-4 sm:p-5 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted px-3 py-2">
                  Navigation
                </div>
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left",
                        isActive
                          ? "bg-surface text-foreground shadow-subtle border border-border"
                          : "text-foreground-secondary hover:text-foreground hover:bg-background-subtle"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", isActive ? "text-wellness" : "text-foreground-secondary")} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Footer Card */}
              <div className="mt-6 p-3.5 rounded-xl bg-surface border border-border shadow-subtle space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">Daily Rhythm</span>
                  <span className="text-wellness font-semibold">{wellnessScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-background-subtle rounded-full overflow-hidden">
                  <div className="h-full bg-wellness rounded-full" style={{ width: `${wellnessScore}%` }} />
                </div>
                <div className="text-[10px] text-foreground-muted">Goal: 6 breaks & 8 glasses</div>
              </div>
            </div>

            {/* Main Area */}
            <div className="md:col-span-9 p-6 sm:p-8 space-y-6">
              {/* Header Greeting */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/80">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    Good morning, Alex
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-secondary">
                    Here&apos;s your wellness overview for today.
                  </p>
                </div>
                <div className="text-xs font-mono text-foreground-muted">
                  Thursday • Week 36
                </div>
              </div>

              {/* 4 Core Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-background-subtle border border-border/80 space-y-1">
                  <div className="text-xs text-foreground-secondary font-medium">Wellness Score</div>
                  <div className="text-2xl font-bold text-foreground">{wellnessScore} <span className="text-xs text-wellness font-semibold">/100</span></div>
                  <div className="text-[10px] text-wellness font-medium">● +4 pts from yesterday</div>
                </div>

                <div className="p-4 rounded-2xl bg-background-subtle border border-border/80 space-y-1">
                  <div className="text-xs text-foreground-secondary font-medium">Focus Time</div>
                  <div className="text-2xl font-bold text-foreground">3h 42m</div>
                  <div className="text-[10px] text-foreground-secondary">3 completed blocks</div>
                </div>

                <div className="p-4 rounded-2xl bg-background-subtle border border-border/80 space-y-1">
                  <div className="text-xs text-foreground-secondary font-medium">Breaks</div>
                  <div className="text-2xl font-bold text-foreground">{stats.breaksTaken} <span className="text-xs text-foreground-secondary">/ {stats.breaksGoal}</span></div>
                  <div className="text-[10px] text-foreground-secondary">Paced every 50 mins</div>
                </div>

                <div className="p-4 rounded-2xl bg-background-subtle border border-border/80 space-y-1">
                  <div className="text-xs text-foreground-secondary font-medium">Activity</div>
                  <div className="text-2xl font-bold text-wellness">Good</div>
                  <div className="text-[10px] text-foreground-secondary">{stats.waterGlasses} glasses logged</div>
                </div>
              </div>

              {/* Today's Focus Timer + Trend Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                {/* Large Focus Timer Widget */}
                <div className="sm:col-span-7 p-5 rounded-2xl bg-background-subtle border border-border flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Today&apos;s Focus Session</h4>
                      <p className="text-xs text-foreground-secondary">Pomodoro 25m interval</p>
                    </div>
                    <Badge variant="sage">Active</Badge>
                  </div>

                  <div className="text-center py-3">
                    <div className="text-5xl font-bold font-mono tracking-tight text-foreground">
                      {String(timerMins).padStart(2, "0")}:{String(timerSecs).padStart(2, "0")}
                    </div>
                    <div className="text-xs text-wellness font-medium mt-1">Deep concentration mode</div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    {isTimerRunning ? (
                      <Button variant="primary" size="sm" onClick={pauseTimer} className="px-5">
                        <Pause className="w-3.5 h-3.5 mr-1" /> Pause
                      </Button>
                    ) : (
                      <Button variant="primary" size="sm" onClick={startTimer} className="px-5">
                        <Play className="w-3.5 h-3.5 fill-current mr-1" /> Start Timer
                      </Button>
                    )}
                    <Button variant="secondary" size="sm" onClick={resetTimer}>
                      <RotateCcw className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Wellness Trend & Posture Quick Indicators */}
                <div className="sm:col-span-5 space-y-4 flex flex-col justify-between">
                  {/* Hydration quick tap */}
                  <div className="p-4 rounded-2xl bg-background-subtle border border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-wellness">
                        <Droplet className="w-4 h-4 text-wellness" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">Hydration Intake</div>
                        <div className="text-xs text-foreground-secondary">{stats.waterGlasses} / 8 glasses</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={incrementWater} className="text-xs h-7 px-2">
                      + Drink
                    </Button>
                  </div>

                  {/* Posture status */}
                  <div className="p-4 rounded-2xl bg-background-subtle border border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">Posture Alignment</div>
                        <div className="text-xs text-wellness font-medium">{postureScore}% Compliant</div>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-wellness" />
                  </div>
                </div>
              </div>

              {/* Intelligent Recommendation Bar */}
              <div className="p-4 rounded-2xl bg-wellness-subtle border border-[#D5E3D8] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface border border-[#D5E3D8] flex items-center justify-center text-wellness shrink-0">
                  <Sparkles className="w-4 h-4 text-wellness" />
                </div>
                <div className="text-xs sm:text-sm text-foreground">
                  <span className="font-semibold text-wellness-dark">FocusNext AI Insight: </span>
                  &ldquo;You&apos;ve been focused for 74 minutes. A 5-minute movement break may help sustain afternoon alertness.&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
