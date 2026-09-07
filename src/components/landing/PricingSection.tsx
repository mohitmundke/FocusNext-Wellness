"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  onSelectPlan: () => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans = [
    {
      name: "Personal",
      badge: "Free Preview",
      price: "$0",
      cadence: "during public release",
      description: "Complete wellness & focus management suite for individual professionals.",
      features: [
        "Unlimited Pomodoro & Deep Work sessions",
        "Adaptive 5-minute break rhythm notifications",
        "4-point ergonomic posture checklist",
        "20-20-20 eye strain exercise guides",
        "Daily wellness score calculation",
        "Local private storage (zero tracking)",
      ],
      buttonText: "Start for free",
      buttonVariant: "secondary" as const,
      highlight: false,
    },
    {
      name: "Team",
      badge: "Most Popular",
      price: "Coming Soon",
      cadence: "per member / month",
      description: "Synchronized workday pacing and aggregated wellness insights for collaborative teams.",
      features: [
        "All Personal features included",
        "Team-wide synchronized focus hours",
        "Aggregated, anonymized burnout prevention analytics",
        "Shared wellness goals & stretch challenges",
        "Centralized seat administration",
        "Priority product updates",
      ],
      buttonText: "Join Team Waitlist",
      buttonVariant: "primary" as const,
      highlight: true,
    },
    {
      name: "Business",
      badge: "Enterprise",
      price: "Custom",
      cadence: "dedicated enterprise deployment",
      description: "For organizations prioritizing sustainable workforce health, ergonomics, and retention.",
      features: [
        "All Team features included",
        "Dedicated account manager & ergonomic workshop",
        "SAML SSO & custom directory sync",
        "Custom security & compliance reports",
        "Tailored ultradian cadence configurations",
        "Enterprise SLA & dedicated support",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <Badge variant="sage">Transparent Plans</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Simple by design.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
            Choose the tier that matches your workday requirements. Transparent, honest, and free to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-3xl p-8 bg-surface border flex flex-col justify-between space-y-8 transition-all duration-300",
                plan.highlight
                  ? "border-wellness shadow-elevated relative lg:-translate-y-2 ring-1 ring-wellness/30"
                  : "border-border shadow-card hover:border-[#D0D0C8]"
              )}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <Badge variant={plan.highlight ? "sage" : "outline"}>{plan.badge}</Badge>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-foreground">
                    {plan.price}
                  </div>
                  <div className="text-xs text-foreground-secondary">{plan.cadence}</div>
                </div>

                <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-border/80">
                  <div className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                    Included capabilities
                  </div>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <span className="w-4 h-4 rounded-full bg-wellness-light text-wellness-dark flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <Button
                  variant={plan.buttonVariant}
                  onClick={onSelectPlan}
                  className="w-full justify-center"
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
