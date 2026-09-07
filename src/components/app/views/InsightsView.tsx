"use client";

import React from "react";
import { useWellness } from "@/lib/wellness-context";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Brain, Clock, Activity, UserCheck } from "lucide-react";

export function InsightsView() {
  const { wellnessScore, insights } = useWellness();

  const weeklyData = [
    { day: "Monday", score: 84, focusHours: 3.8, breaks: 5, posture: 85 },
    { day: "Tuesday", score: 89, focusHours: 4.2, breaks: 6, posture: 90 },
    { day: "Wednesday", score: 79, focusHours: 3.2, breaks: 4, posture: 75 },
    { day: "Thursday (Today)", score: wellnessScore, focusHours: 3.7, breaks: 5, posture: 88 },
    { day: "Friday", score: 86, focusHours: 4.0, breaks: 6, posture: 85 },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Wellness Insights & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-foreground-secondary mt-1">
            Understand your focus rhythms, posture trends, and physiological recovery patterns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="sage">Weekly Stamina Index: 87%</Badge>
        </div>
      </div>

      {/* Wellness Score Decomposition Card */}
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">Daily Wellness Score Calculation</h3>
            <p className="text-xs text-foreground-secondary">Derived from four balanced physiological and focus metrics</p>
          </div>
          <span className="text-3xl font-bold font-mono text-foreground">
            {wellnessScore} <span className="text-sm font-normal text-wellness font-sans">/ 100</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-2">
            <div className="flex items-center justify-between text-xs text-foreground-secondary font-medium">
              <span>Focus Pacing</span>
              <Brain className="w-3.5 h-3.5" />
            </div>
            <div className="text-xl font-bold text-foreground">25 / 30</div>
            <div className="w-full h-1 bg-[#E0E0DA] rounded-full overflow-hidden">
              <div className="h-full bg-foreground rounded-full" style={{ width: "83%" }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-2">
            <div className="flex items-center justify-between text-xs text-foreground-secondary font-medium">
              <span>Break Recovery</span>
              <Clock className="w-3.5 h-3.5 text-wellness" />
            </div>
            <div className="text-xl font-bold text-wellness">26 / 30</div>
            <div className="w-full h-1 bg-[#E0E0DA] rounded-full overflow-hidden">
              <div className="h-full bg-wellness rounded-full" style={{ width: "86%" }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-2">
            <div className="flex items-center justify-between text-xs text-foreground-secondary font-medium">
              <span>Posture Checks</span>
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-xl font-bold text-foreground">18 / 20</div>
            <div className="w-full h-1 bg-[#E0E0DA] rounded-full overflow-hidden">
              <div className="h-full bg-wellness rounded-full" style={{ width: "90%" }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-2">
            <div className="flex items-center justify-between text-xs text-foreground-secondary font-medium">
              <span>Hydration Goal</span>
              <Activity className="w-3.5 h-3.5 text-wellness" />
            </div>
            <div className="text-xl font-bold text-wellness">18 / 20</div>
            <div className="w-full h-1 bg-[#E0E0DA] rounded-full overflow-hidden">
              <div className="h-full bg-wellness rounded-full" style={{ width: "90%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly History Table */}
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">Weekly Performance History</h3>
            <p className="text-xs text-foreground-secondary">Mon – Fri Stamina & Compliance Overview</p>
          </div>
          <Badge variant="outline">Past 5 Days</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border text-foreground-muted uppercase text-[11px] tracking-wider">
                <th className="py-3 px-3">Day</th>
                <th className="py-3 px-3">Wellness Score</th>
                <th className="py-3 px-3">Focus Hours</th>
                <th className="py-3 px-3">Breaks Taken</th>
                <th className="py-3 px-3">Posture Adherence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {weeklyData.map((row) => (
                <tr key={row.day} className="hover:bg-background-subtle/50 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-foreground">{row.day}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-wellness">{row.score}</td>
                  <td className="py-3.5 px-3">{row.focusHours}h</td>
                  <td className="py-3.5 px-3">{row.breaks} / 6</td>
                  <td className="py-3.5 px-3">{row.posture}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Observations Feed */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-foreground">AI Habit Observations</h3>
        <div className="space-y-3">
          {insights.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-surface border border-border shadow-subtle flex items-start gap-4 hover:border-[#D0D0C8] transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-wellness-light flex items-center justify-center text-wellness-dark shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-foreground">{item.title}</h4>
                  <span className="text-[11px] font-mono text-foreground-muted">{item.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
