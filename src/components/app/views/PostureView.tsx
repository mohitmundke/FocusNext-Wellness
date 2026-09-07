"use client";

import React, { useState } from "react";
import { useWellness } from "@/lib/wellness-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  UserCheck,
  RotateCcw,
  Check,
  Monitor,
  Armchair,
  Footprints,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function PostureView() {
  const {
    postureItems,
    togglePostureItem,
    resetPostureCheck,
    postureScore,
    settings,
  } = useWellness();

  const [simulatedReminder, setSimulatedReminder] = useState(false);

  const handleTestReminder = () => {
    setSimulatedReminder(true);
    toast.info("Posture reminder triggered! Check your physical alignment.");
  };

  const handleAcknowledgeReminder = () => {
    setSimulatedReminder(false);
    resetPostureCheck();
    toast.success("Alignment verified! Keep your spine tall and shoulders loose.");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Posture Guidance
          </h1>
          <p className="text-xs sm:text-sm text-foreground-secondary mt-1">
            Build unconscious ergonomic posture awareness during long screen sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="sage">{postureScore}% Compliant</Badge>
        </div>
      </div>

      {/* Simulated Reminder Notification Banner if active */}
      {simulatedReminder && (
        <div className="p-6 rounded-3xl bg-wellness-light border border-[#C6D8CB] shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-wellness text-white flex items-center justify-center shrink-0 shadow-subtle">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Time for a 30-Second Posture Check</h3>
              <p className="text-xs text-foreground-secondary">
                Soften your shoulders, place both feet flat on the floor, and lengthen the back of your neck.
              </p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={handleAcknowledgeReminder} className="shrink-0 text-xs">
            ✓ I&apos;ve adjusted my posture
          </Button>
        </div>
      )}

      {/* Main 4-Point Checklist Card */}
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">5-Point Ergonomic Alignment Check</h3>
            <p className="text-xs text-foreground-secondary">Tap each point to verify your current desk setup</p>
          </div>
          <Button variant="secondary" size="sm" onClick={resetPostureCheck} className="text-xs">
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Reset All</span>
          </Button>
        </div>

        <div className="space-y-3">
          {postureItems.map((item) => (
            <div
              key={item.id}
              onClick={() => togglePostureItem(item.id)}
              className={cn(
                "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 select-none",
                item.checked
                  ? "bg-wellness-light/50 border-[#CBD8CE]"
                  : "bg-background-subtle border-border hover:bg-background-subtle/80"
              )}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={cn(
                    "w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-colors",
                    item.checked
                      ? "bg-wellness text-white"
                      : "border border-border bg-surface text-transparent"
                  )}
                >
                  {item.checked && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <span className={cn("text-xs sm:text-sm font-medium", item.checked ? "text-foreground" : "text-foreground-secondary")}>
                  {item.label}
                </span>
              </div>
              <span className="text-xs text-foreground-muted font-mono">
                {item.checked ? "Verified" : "Tap to verify"}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-foreground-secondary">
            Reminder frequency: Every {settings.postureReminderIntervalMinutes} minutes
          </div>
          <Button variant="outline" size="sm" onClick={handleTestReminder} className="text-xs">
            <span>Test Posture Reminder Prompt</span>
          </Button>
        </div>
      </div>

      {/* Ergonomic Setup Standards Card */}
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">Ergonomic Setup Guidelines</h3>
            <p className="text-xs text-foreground-secondary">Scientific specifications for healthy monitor and chair alignment</p>
          </div>
          <Badge variant="outline">Physiological Reference</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-background-subtle border border-border space-y-2">
            <Monitor className="w-5 h-5 text-wellness" />
            <h4 className="text-xs font-bold text-foreground">Monitor Distance</h4>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              Place monitor at an arm&apos;s length away (50–70 cm). The top line of screen text should align with eye level.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-background-subtle border border-border space-y-2">
            <Armchair className="w-5 h-5 text-wellness" />
            <h4 className="text-xs font-bold text-foreground">Lumbar Arch Support</h4>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              Maintain an active lumbar curve with backrest angled between 95° and 105° to reduce disc pressure.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-background-subtle border border-border space-y-2">
            <Footprints className="w-5 h-5 text-wellness" />
            <h4 className="text-xs font-bold text-foreground">Feet Grounding</h4>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              Keep both feet completely flat on the floor or on a slight footrest. Avoid crossing legs to preserve circulation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
