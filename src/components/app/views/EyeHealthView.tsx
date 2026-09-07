"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Play } from "lucide-react";
import { soundFx } from "@/lib/sound";

export function EyeHealthView() {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const exercises = [
    {
      title: "20-20-20 Rule",
      duration: 20,
      description: "Shift your gaze from the monitor and look at an object at least 20 feet away for 20 seconds.",
      instructions: "Relaxes the ciliary muscle in the eye, preventing digital eye strain and accommodation spasm.",
      category: "Focus Reset",
    },
    {
      title: "Circular Eye Rolling",
      duration: 30,
      description: "Slowly rotate your eyes in a wide, gentle clockwise circle 5 times, then reverse counter-clockwise.",
      instructions: "Improves blood circulation in extraocular muscles and reduces focal tension.",
      category: "Mobility",
    },
    {
      title: "Warm Palming Relaxation",
      duration: 60,
      description: "Rub your palms together until warm, gently cup your closed eyes with hands, and breathe deeply.",
      instructions: "Deeply soothes the optic nerve through complete darkness and gentle ambient warmth.",
      category: "Deep Recovery",
    },
    {
      title: "Rapid Tear-Film Blinking",
      duration: 15,
      description: "Blink rapidly and softly 10 to 15 times in a row, then close eyes gently for 5 seconds.",
      instructions: "Replenishes the essential lipid and water layer of your tear film against screen dryness.",
      category: "Hydration",
    },
  ];

  const startExercise = (index: number) => {
    setActiveExerciseIndex(index);
    setCountdown(exercises[index].duration);
    setIsRunning(true);
    soundFx.playFocusStart(true);
  };

  const cancelExercise = () => {
    setIsRunning(false);
    setActiveExerciseIndex(null);
    setCountdown(0);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && countdown === 0) {
      soundFx.playChime(true);
      setIsRunning(false);
      setActiveExerciseIndex(null);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, countdown]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Eye Health & 20-20-20
          </h1>
          <p className="text-xs sm:text-sm text-foreground-secondary mt-1">
            Reduce digital eye fatigue and replenish corneal hydration with guided micro-exercises.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="sage">Vision Protection: Active</Badge>
        </div>
      </div>

      {/* Active Exercise Full Banner if Running */}
      {isRunning && activeExerciseIndex !== null && (
        <div className="p-8 rounded-3xl bg-surface border border-wellness shadow-elevated text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wellness-light text-wellness-dark text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-wellness animate-pulse" />
            <span>Exercise in Progress</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {exercises[activeExerciseIndex].title}
            </h2>
            <p className="text-sm text-foreground-secondary mt-1 max-w-md mx-auto">
              {exercises[activeExerciseIndex].description}
            </p>
          </div>

          <div className="text-6xl font-bold font-mono text-wellness">
            {countdown}s
          </div>

          <div className="w-full max-w-md mx-auto h-2 bg-background-subtle rounded-full overflow-hidden">
            <div
              className="h-full bg-wellness transition-all duration-1000 rounded-full"
              style={{
                width: `${((exercises[activeExerciseIndex].duration - countdown) / exercises[activeExerciseIndex].duration) * 100}%`,
              }}
            />
          </div>

          <Button variant="secondary" size="sm" onClick={cancelExercise} className="text-xs">
            <span>Stop Exercise</span>
          </Button>
        </div>
      )}

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {exercises.map((item, idx) => (
          <div
            key={item.title}
            className="p-6 sm:p-7 rounded-3xl bg-surface border border-border shadow-card flex flex-col justify-between space-y-6 hover:border-[#D0D0C8] hover:shadow-elevated transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-wellness-light text-wellness-dark border border-[#CBD8CE]">
                  {item.category}
                </span>
                <span className="text-xs font-mono font-medium text-foreground-secondary">
                  {item.duration} seconds
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-foreground-secondary mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-background-subtle border border-border text-[11px] text-foreground-secondary leading-relaxed">
                <span className="font-semibold text-foreground">Benefit: </span>
                {item.instructions}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-[11px] text-foreground-muted">Quick 1-tap guide</span>
              <Button
                variant="sage"
                size="sm"
                onClick={() => startExercise(idx)}
                disabled={isRunning}
                className="text-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current mr-1" />
                <span>Start ({item.duration}s)</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
