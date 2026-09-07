import React from "react";
import { Brain, HeartPulse, RotateCcw, Activity } from "lucide-react";

export function TrustStrip() {
  const pillars = [
    {
      title: "Focus",
      desc: "Deep work blocks structured around natural ultradian energy rhythms.",
      icon: Brain,
    },
    {
      title: "Movement",
      desc: "Gentle physical posture resets to counter prolonged sedentary fatigue.",
      icon: Activity,
    },
    {
      title: "Recovery",
      desc: "Meaningful 5-minute cognitive breaks before mental depletion sets in.",
      icon: RotateCcw,
    },
    {
      title: "Wellness",
      desc: "Holistic insights bridging productivity, hydration, and visual health.",
      icon: HeartPulse,
    },
  ];

  return (
    <section className="border-y border-border bg-surface py-12">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-widest font-semibold text-foreground-muted">
            The Workday Wellness Standard
          </p>
          <h2 className="text-lg md:text-xl font-medium text-foreground mt-1">
            Designed for healthier, more sustainable workdays.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-5 rounded-xl bg-background-subtle/60 border border-border/70 flex flex-col justify-between hover:bg-background-subtle transition-colors"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-wellness mb-3 shadow-subtle">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{pillar.title}</h3>
                  <p className="text-xs text-foreground-secondary leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
