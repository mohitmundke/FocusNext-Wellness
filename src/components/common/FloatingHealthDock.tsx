"use client";

import React, { useState, useEffect } from "react";
import {
  Video,
  Armchair,
  Eye,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { soundFx } from "@/lib/sound";
import { toast } from "sonner";

interface FloatingHealthDockProps {
  onOpenCommand: () => void;
  onOpenConsult: () => void;
  onNavigateView?: (viewId: string) => void;
}

export function FloatingHealthDock({
  onOpenCommand,
  onOpenConsult,
  onNavigateView,
}: FloatingHealthDockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [eyeCountdown, setEyeCountdown] = useState<number | null>(null);
  const [postureChecked, setPostureChecked] = useState(false);

  // 20-20-20 countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (eyeCountdown !== null && eyeCountdown > 0) {
      timer = setInterval(() => {
        setEyeCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (eyeCountdown === 0) {
      soundFx.playChime(true);
      toast.success("20-20-20 eye reset complete! Ciliary muscles relaxed.");
      setEyeCountdown(null);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [eyeCountdown]);

  const handleStartEyeReset = () => {
    setEyeCountdown(20);
    soundFx.playSoftClick(true);
    toast.info("Look 20 feet away at a distant object for 20 seconds...", {
      duration: 4000,
    });
  };

  const handlePostureCheck = () => {
    setPostureChecked(true);
    soundFx.playSoftClick(true);
    toast.success("Spine upright, shoulders dropped, elbows 90°! Posture verified.");
    setTimeout(() => setPostureChecked(false), 4000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2.5 pointer-events-auto select-none print:hidden">
      {/* Eye Countdown Active Bubble */}
      {eyeCountdown !== null && (
        <div className="p-4 rounded-2xl bg-surface border border-wellness shadow-elevated text-xs flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200">
          <div className="w-9 h-9 rounded-xl bg-wellness text-white flex items-center justify-center font-mono font-bold text-sm">
            {eyeCountdown}s
          </div>
          <div>
            <div className="font-bold text-foreground">20-20-20 Screen Reset</div>
            <div className="text-[11px] text-foreground-secondary">Focus on a distant object across the room</div>
          </div>
          <button
            type="button"
            onClick={() => setEyeCountdown(null)}
            className="text-[11px] text-foreground-muted hover:text-foreground font-semibold ml-2"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Expanded Quick Actions Panel */}
      {isExpanded && (
        <div className="p-3 bg-surface rounded-2xl border border-border shadow-elevated space-y-2 w-64 animate-in slide-in-from-bottom-2 duration-150">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground-muted flex items-center justify-between">
            <span>Remote Desk Health Hub</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-1 text-xs">
            {/* 20-20-20 Eye Break */}
            <button
              type="button"
              onClick={handleStartEyeReset}
              className="w-full p-2 rounded-xl flex items-center justify-between hover:bg-background-subtle text-foreground text-left font-medium transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                  <Eye className="w-3.5 h-3.5" />
                </div>
                <span>Start 20-20-20 Eye Break</span>
              </div>
              <span className="text-[10px] font-mono text-foreground-muted">20s</span>
            </button>

            {/* Posture Check */}
            <button
              type="button"
              onClick={handlePostureCheck}
              className="w-full p-2 rounded-xl flex items-center justify-between hover:bg-background-subtle text-foreground text-left font-medium transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                  <Armchair className="w-3.5 h-3.5" />
                </div>
                <span>Quick Posture Alignment</span>
              </div>
              {postureChecked ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <span className="text-[10px] font-mono text-foreground-muted">Check</span>
              )}
            </button>

            {/* Open Command Menu */}
            <button
              type="button"
              onClick={onOpenCommand}
              className="w-full p-2 rounded-xl flex items-center justify-between hover:bg-background-subtle text-foreground text-left font-medium transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-background-subtle text-foreground-secondary border border-border flex items-center justify-center">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <span>Quick Search Actions</span>
              </div>
              <kbd className="text-[10px] font-mono bg-background-subtle px-1.5 py-0.5 rounded border border-border">
                ⌘K
              </kbd>
            </button>

            {/* Instant OPD */}
            <button
              type="button"
              onClick={onOpenConsult}
              className="w-full p-2 rounded-xl flex items-center justify-between bg-wellness-light border border-[#CBD7CE] text-wellness-dark text-left font-bold transition-all shadow-subtle hover:bg-wellness/15"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-wellness text-white flex items-center justify-center">
                  <Video className="w-3.5 h-3.5" />
                </div>
                <span>Instant OPD (from ₹199)</span>
              </div>
              <span className="text-[10px] font-mono font-semibold">~4m</span>
            </button>

            {onNavigateView && (
              <button
                type="button"
                onClick={() => onNavigateView("posture")}
                className="w-full pt-1 text-center text-[11px] text-wellness hover:text-wellness-dark font-medium hover:underline block"
              >
                Open Full Desk Ergonomics Hub →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Pill Trigger Button */}
      <div className="flex items-center gap-1.5 bg-surface/95 backdrop-blur-md p-1.5 rounded-full border border-border shadow-dropdown hover:border-[#CBD7CE] transition-all">
        {/* Doctor Status Micro Pill */}
        <button
          type="button"
          onClick={onOpenConsult}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-subtle text-xs text-foreground font-semibold hover:bg-background-subtle/80 transition-colors"
          title="Instant Doctor Consultation"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline text-foreground-secondary font-medium">Doctor Online:</span>
          <span className="text-wellness-dark font-bold">AIIMS OPD</span>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">
            ~4m wait
          </span>
        </button>

        {/* 20-20-20 Eye Quick Trigger */}
        <button
          type="button"
          onClick={handleStartEyeReset}
          className="w-8 h-8 rounded-full flex items-center justify-center text-foreground-secondary hover:text-wellness hover:bg-background-subtle transition-colors"
          title="Start 20-20-20 Eye Strain Break"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Toggle Expand Details */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-foreground-secondary hover:text-foreground hover:bg-background-subtle transition-colors"
          title={isExpanded ? "Collapse Dock" : "Expand Health Tools"}
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
