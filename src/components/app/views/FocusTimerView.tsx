"use client";

import React, { useState } from "react";
import { useWellness } from "@/lib/wellness-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FocusMode } from "@/types/wellness";
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX, Brain, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export function FocusTimerView() {
  const {
    timerMode,
    timeLeft,
    totalDuration,
    isTimerRunning,
    setTimerMode,
    startTimer,
    pauseTimer,
    resetTimer,
    setCustomTimerMinutes,
    settings,
    updateSettings,
    focusHistory,
  } = useWellness();

  const [sessionLabel, setSessionLabel] = useState("Product Strategy Spec");
  const [customInput, setCustomInput] = useState("30");
  const [showCustomModal, setShowCustomModal] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = Math.max(0, Math.min(100, ((totalDuration - timeLeft) / totalDuration) * 100));

  const modes: { id: FocusMode; label: string; time: string }[] = [
    { id: "pomodoro", label: "Pomodoro", time: `${settings.pomodoroMinutes}m` },
    { id: "deep", label: "Deep Work", time: `${settings.deepWorkMinutes}m` },
    { id: "shortBreak", label: "Short Break", time: `${settings.shortBreakMinutes}m` },
    { id: "longBreak", label: "Long Break", time: `${settings.longBreakMinutes}m` },
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(customInput, 10);
    if (!isNaN(num) && num > 0) {
      setCustomTimerMinutes(num);
      setShowCustomModal(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Focus Studio
          </h1>
          <p className="text-xs sm:text-sm text-foreground-secondary mt-1">
            Structured concentration blocks and restorative recovery intervals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors",
              settings.soundEnabled
                ? "bg-wellness-light border-[#D5DFD7] text-wellness-dark"
                : "bg-surface border-border text-foreground-secondary"
            )}
          >
            {settings.soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{settings.soundEnabled ? "Chimes On" : "Muted"}</span>
          </button>
        </div>
      </div>

      {/* Main Focus Machine Card */}
      <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 shadow-card flex flex-col items-center space-y-8">
        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-background-subtle rounded-2xl border border-border">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setTimerMode(mode.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all select-none flex items-center gap-1.5",
                timerMode === mode.id
                  ? "bg-surface text-foreground shadow-subtle border border-border"
                  : "text-foreground-secondary hover:text-foreground"
              )}
            >
              <span>{mode.label}</span>
              <span className="text-[11px] font-normal text-foreground-muted font-mono">({mode.time})</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustomModal(true)}
            className={cn(
              "px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all select-none text-foreground-secondary hover:text-foreground",
              timerMode === "custom" && "bg-surface text-foreground shadow-subtle border border-border"
            )}
          >
            <span>Custom</span>
          </button>
        </div>

        {/* Custom Timer Input Dialog if active */}
        {showCustomModal && (
          <form onSubmit={handleCustomSubmit} className="flex items-center gap-2 p-3 bg-background-subtle rounded-xl border border-border">
            <span className="text-xs font-medium text-foreground">Duration (mins):</span>
            <input
              type="number"
              min="1"
              max="180"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-16 px-2 py-1 text-sm bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:border-wellness text-center font-mono"
            />
            <Button type="submit" variant="primary" size="sm" className="h-8 text-xs">
              Set
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowCustomModal(false)} className="h-8 text-xs">
              Cancel
            </Button>
          </form>
        )}

        {/* Circular Progress Display */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
            {/* Background Track */}
            <circle
              cx="120"
              cy="120"
              r="105"
              stroke="#EBEBE5"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Animated Fill Circle */}
            <circle
              cx="120"
              cy="120"
              r="105"
              stroke="#718B78"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 105}
              strokeDashoffset={2 * Math.PI * 105 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          {/* Center Digital Digits */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-foreground">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <div className="text-xs font-semibold text-wellness uppercase tracking-wider mt-2">
              {timerMode.includes("Break") ? "Rest & Recharge" : "Deep Work Focus"}
            </div>
          </div>
        </div>

        {/* Task Focus Input */}
        <div className="w-full max-w-sm flex items-center gap-2 px-3.5 py-2 bg-background-subtle border border-border rounded-xl">
          <Tag className="w-4 h-4 text-foreground-muted" />
          <input
            type="text"
            value={sessionLabel}
            onChange={(e) => setSessionLabel(e.target.value)}
            placeholder="What are you working on?"
            className="w-full text-xs sm:text-sm bg-transparent border-none text-foreground placeholder:text-foreground-muted focus:outline-none"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={resetTimer}
            className="w-12 h-12 p-0 rounded-2xl"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          {isTimerRunning ? (
            <Button
              variant="primary"
              size="lg"
              onClick={pauseTimer}
              className="px-8 rounded-2xl gap-2 text-base font-semibold shadow-subtle"
            >
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={startTimer}
              className="px-8 rounded-2xl gap-2 text-base font-semibold shadow-subtle"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Start Session</span>
            </Button>
          )}

          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              resetTimer();
              if (timerMode === "pomodoro" || timerMode === "deep") {
                setTimerMode("shortBreak");
              } else {
                setTimerMode("pomodoro");
              }
            }}
            className="w-12 h-12 p-0 rounded-2xl"
            title="Skip to next interval"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Completed Sessions Log */}
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">Today&apos;s Completed Sessions</h3>
            <p className="text-xs text-foreground-secondary">Automatic log of completed concentration blocks</p>
          </div>
          <Badge variant="sage">{focusHistory.length} Sessions Logged</Badge>
        </div>

        <div className="space-y-2.5">
          {focusHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-background-subtle border border-border flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-wellness">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground">{item.label || "Focus Session"}</h4>
                  <span className="text-[11px] text-foreground-secondary">
                    {item.mode === "pomodoro" ? "Pomodoro" : "Deep Work"} • {item.durationMinutes} minutes
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-foreground-muted">{item.completedAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
