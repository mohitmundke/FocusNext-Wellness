import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Sliders, Coffee, LineChart } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Set your rhythm",
      desc: "Define your ideal work hours, preferred focus intervals (25m or 50m), and reminder frequencies.",
      icon: Sliders,
    },
    {
      step: "02",
      title: "Work naturally",
      desc: "FocusNext runs calmly in the background, offering gentle acoustic chimes and posture prompts when needed.",
      icon: Coffee,
    },
    {
      step: "03",
      title: "Build better habits",
      desc: "Track your daily wellness score and review habit insights to refine your daily stamina and cognitive health.",
      icon: LineChart,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background-subtle border-t border-border">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 md:mb-24">
          <Badge variant="sage">Simple 3-Step Process</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            How FocusNext works.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
            No complex onboarding or invasive tracking. Just simple, scientific habit architecture.
          </p>
        </div>

        {/* 3 Steps with Horizontal Connecting Line on Desktop */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-16 right-16 h-[2px] bg-border -translate-y-12 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative z-10">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-surface rounded-3xl border border-border p-8 shadow-card flex flex-col justify-between space-y-6 hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-foreground">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-wellness-light text-wellness-dark flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/70 flex items-center text-xs font-medium text-wellness-dark">
                    <span>Frictionless implementation</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
