import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Sparkles } from "lucide-react";

export function AISection() {
  const recommendations = [
    {
      context: "After 90m deep focus block",
      nudge: "You've had a highly focused morning. Consider a short movement break before your next session to preserve executive function.",
      metric: "Energy retention +22%",
    },
    {
      context: "Late afternoon screen session",
      nudge: "Shoulder checks dropped slightly in the last hour. Roll shoulders backward 5 times to release trapezius tension.",
      metric: "Ergonomic alignment restored",
    },
    {
      context: "Hydration interval notification",
      nudge: "Time for a glass of water. Pacing hydration with your breaks helps avoid the 3 PM cognitive slump.",
      metric: "Hydration pace: 6/8 glasses",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Adaptive Intelligence
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Wellness that adapts to you.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            FocusNext quietly learns your daily work rhythms and offers calm, personalized recommendations to help you maintain stamina without breaking your flow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-surface border border-border shadow-card flex flex-col justify-between space-y-6 hover:border-[#D0D0C8] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-wellness-light flex items-center justify-center text-wellness-dark">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-foreground tracking-tight">FocusNext Intelligence</span>
                  </div>
                  <span className="text-[10px] font-mono text-foreground-muted">Live</span>
                </div>

                <div className="text-xs text-foreground-muted font-medium">
                  Trigger: {item.context}
                </div>

                <p className="text-sm text-foreground leading-relaxed">
                  &ldquo;{item.nudge}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="font-medium text-wellness-dark">{item.metric}</span>
                <span className="text-foreground-muted text-[11px]">Private on-device</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
