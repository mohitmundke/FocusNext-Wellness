"use client";

import React from "react";
import { useWellness } from "@/lib/wellness-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Brain,
  Clock,
  Activity,
  UserCheck,
  Droplet,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Flame,
} from "lucide-react";

interface OverviewViewProps {
  onNavigate: (view: string) => void;
}

export function OverviewView({ onNavigate }: OverviewViewProps) {
  const {
    user,
    wellnessScore,
    focusMinutesToday,
    stats,
    postureScore,
    isTimerRunning,
    timeLeft,
    startTimer,
    pauseTimer,
    resetTimer,
    incrementWater,
    insights,
  } = useWellness();

  const hours = Math.floor(focusMinutesToday / 60);
  const mins = focusMinutesToday % 60;
  const focusTimeString = `${hours}h ${mins}m`;

  const timerMins = Math.floor(timeLeft / 60);
  const timerSecs = timeLeft % 60;

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Top Greeting & Status Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Good morning, {user?.name || "Alex"}
          </h1>
          <p className="text-xs sm:text-sm text-foreground-secondary mt-1">
            Let&apos;s make today a healthier, more balanced workday.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border text-xs font-semibold text-foreground shadow-subtle">
            <Flame className="w-4 h-4 text-wellness fill-wellness" />
            <span>5 Day Habit Streak</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-wellness-light border border-[#D5DFD7] text-xs font-semibold text-wellness-dark">
            <span className="w-2 h-2 rounded-full bg-wellness animate-pulse" />
            <span>Rhythm: Active</span>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Wellness Score Card */}
        <div
          onClick={() => onNavigate("insights")}
          className="p-5 rounded-2xl bg-surface border border-border shadow-card hover:border-[#D0D0C8] hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground-secondary">Wellness Score</span>
            <Sparkles className="w-4 h-4 text-wellness" />
          </div>
          <div className="my-2">
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground">{wellnessScore}</div>
            <div className="text-[11px] text-wellness font-semibold mt-0.5">● Optimum Stamina</div>
          </div>
          <div className="w-full h-1.5 bg-background-subtle rounded-full overflow-hidden">
            <div className="h-full bg-wellness rounded-full" style={{ width: `${wellnessScore}%` }} />
          </div>
        </div>

        {/* Focus Hours Card */}
        <div
          onClick={() => onNavigate("focus")}
          className="p-5 rounded-2xl bg-surface border border-border shadow-card hover:border-[#D0D0C8] hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground-secondary">Focus Time</span>
            <Brain className="w-4 h-4 text-foreground" />
          </div>
          <div className="my-2">
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground">{focusTimeString}</div>
            <div className="text-[11px] text-foreground-secondary mt-0.5">3 sessions completed</div>
          </div>
          <div className="text-[11px] text-foreground-muted">Goal: 4h deep focus</div>
        </div>

        {/* Breaks Card */}
        <div
          onClick={() => onNavigate("focus")}
          className="p-5 rounded-2xl bg-surface border border-border shadow-card hover:border-[#D0D0C8] hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground-secondary">Recovery Breaks</span>
            <Clock className="w-4 h-4 text-wellness" />
          </div>
          <div className="my-2">
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground">
              {stats.breaksTaken} <span className="text-base text-foreground-secondary font-normal">/ {stats.breaksGoal}</span>
            </div>
            <div className="text-[11px] text-foreground-secondary mt-0.5">Paced every 50m</div>
          </div>
          <div className="w-full h-1.5 bg-background-subtle rounded-full overflow-hidden">
            <div className="h-full bg-wellness rounded-full" style={{ width: `${(stats.breaksTaken / stats.breaksGoal) * 100}%` }} />
          </div>
        </div>

        {/* Posture Score Card */}
        <div
          onClick={() => onNavigate("posture")}
          className="p-5 rounded-2xl bg-surface border border-border shadow-card hover:border-[#D0D0C8] hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground-secondary">Posture Score</span>
            <UserCheck className="w-4 h-4 text-foreground" />
          </div>
          <div className="my-2">
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground">{postureScore}%</div>
            <div className="text-[11px] text-wellness font-semibold mt-0.5">● Aligned & relaxed</div>
          </div>
          <div className="text-[11px] text-foreground-muted">Next check in 18m</div>
        </div>
      </div>

      {/* Main Two-Column Hub: Live Timer & Daily Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Quick Focus Timer Controller */}
        <div className="lg:col-span-7 bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">Active Focus Block</h3>
              <p className="text-xs text-foreground-secondary">25-minute Pomodoro cycle</p>
            </div>
            <Badge variant="sage">Focus Studio</Badge>
          </div>

          {/* Large Timer Display */}
          <div className="text-center py-6 bg-background-subtle rounded-2xl border border-border">
            <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-foreground">
              {String(timerMins).padStart(2, "0")}:{String(timerSecs).padStart(2, "0")}
            </div>
            <p className="text-xs text-wellness font-medium mt-2">
              {isTimerRunning ? "Deep focus interval in progress" : "Session paused — ready when you are"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              {isTimerRunning ? (
                <Button variant="primary" size="md" onClick={pauseTimer} className="px-6">
                  <Pause className="w-4 h-4 mr-1.5" />
                  <span>Pause</span>
                </Button>
              ) : (
                <Button variant="primary" size="md" onClick={startTimer} className="px-6">
                  <Play className="w-4 h-4 fill-current mr-1.5" />
                  <span>Start Focus</span>
                </Button>
              )}
              <Button variant="secondary" size="md" onClick={resetTimer}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("focus")}
              className="text-xs"
            >
              <span>Full Focus Studio</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Right Column: Daily Habits & Hydration Widget */}
        <div className="lg:col-span-5 bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">Daily Health Targets</h3>
              <span className="text-xs font-mono text-foreground-secondary">Today</span>
            </div>

            <div className="space-y-3.5">
              {/* Water */}
              <div className="p-3.5 rounded-xl bg-background-subtle border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-wellness">
                    <Droplet className="w-4 h-4 text-wellness" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">Hydration</div>
                    <div className="text-xs text-foreground-secondary">{stats.waterGlasses} of 8 glasses</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={incrementWater} className="text-xs h-7 px-2.5">
                  + Drink
                </Button>
              </div>

              {/* Movement */}
              <div className="p-3.5 rounded-xl bg-background-subtle border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-foreground">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">Desk Movement</div>
                    <div className="text-xs text-foreground-secondary">{stats.stepsCount.toLocaleString()} steps logged</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => onNavigate("activity")} className="text-xs h-7 px-2.5">
                  Log
                </Button>
              </div>

              {/* Eye exercises */}
              <div className="p-3.5 rounded-xl bg-background-subtle border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-wellness-dark">
                    <Clock className="w-4 h-4 text-wellness" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">20-20-20 Eye Rest</div>
                    <div className="text-xs text-foreground-secondary">Ready for next rest</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => onNavigate("eye-health")} className="text-xs h-7 px-2.5">
                  Start
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-foreground-secondary">
            <span>Overall completion: 76%</span>
            <span className="font-semibold text-wellness-dark">Great pace</span>
          </div>
        </div>
      </div>

      {/* AI Contextual Insights Card */}
      <div className="bg-wellness-subtle border border-[#D5E3D8] rounded-3xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-surface border border-[#D0DDD3] flex items-center justify-center text-wellness shrink-0 mt-0.5 shadow-subtle">
            <Sparkles className="w-5 h-5 text-wellness" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground">
              FocusNext AI Recommendation
            </h4>
            <p className="text-xs sm:text-sm text-foreground-secondary max-w-2xl leading-relaxed">
              &ldquo;{insights[0]?.message || "You've had a strong focus session. Take a 5-minute movement break before starting your next deep block."}&rdquo;
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onNavigate("insights")}
          className="shrink-0 text-xs self-start sm:self-auto"
        >
          <span>View all insights</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
