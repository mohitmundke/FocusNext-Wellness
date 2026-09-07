"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCarePlansProps {
  onSelectPlan: () => void;
}

export function PricingCarePlans({ onSelectPlan }: PricingCarePlansProps) {
  const plans = [
    {
      name: "Intern & Student Pass",
      badge: "Stipend & Student Budget",
      price: "₹299",
      cadence: "per month (or ₹199 per single visit)",
      description: "Subsidized clinical OPD for interns, college students & early engineers on stipends.",
      features: [
        "2 Virtual OPD visits with senior AIIMS/CMC MDs per month",
        "Valid doctor-signed medical sick leave certificate (with QR code)",
        "NMC digital e-prescription valid at all pharmacy stores",
        "PG mess gastric acidity & GERD relief consultation",
        "20-20-20 Digital eye strain exercises & tear drops guidance",
        "Free medicine delivery via Tata 1mg / Apollo Pharmacy",
      ],
      ctaText: "Get Intern Pass (₹199 / Visit)",
      ctaVariant: "secondary" as const,
      highlight: false,
    },
    {
      name: "Remote Professional Pro",
      badge: "Most Popular for Techies",
      price: "₹799",
      cadence: "per month (reimbursable via wellness stipend)",
      description: "Comprehensive care for full-time remote developers, designers & freelancers.",
      features: [
        "Unlimited Virtual OPD doctor visits (includes evening till 11:30 PM)",
        "Desk Ergonomics & Cervical Spine physical therapy sessions",
        "6:30 AM home blood collection: Vitamin D3 + Vitamin B12 included",
        "Late-night priority queue between sprints & US shifts",
        "24/7 care team chat with attending physicians",
        "ABHA Health ID syncing & tax deductible under Section 80D",
      ],
      ctaText: "Join Remote Pro (₹799/mo)",
      ctaVariant: "primary" as const,
      highlight: true,
    },
    {
      name: "Remote Worker + Parents Care",
      badge: "Dual Dev + Hometown Parents",
      price: "₹1,499",
      cadence: "per month (covers dev + 2 senior parents)",
      description: "Care for remote tech workers in metro hubs + senior parents living back home in Tier 2/3 hometowns.",
      features: [
        "All Remote Professional Pro features included",
        "Omron Bluetooth Smart BP Monitor sent to parents' hometown",
        "Continuous remote vitals monitoring for aging parents in Tier 2/3",
        "Monthly proactive cardiology & diabetes review for parents",
        "Emergency 112 / 108 SOS dispatch coordination",
        "Section 80D tax deductions up to ₹75,000 for senior parents",
      ],
      ctaText: "Protect Remote Family (₹1,499)",
      ctaVariant: "outline" as const,
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-background-subtle border-t border-border">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-20">
          <Badge variant="sage">Transparent Plans for Remote Work</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Affordable clinical care for every stipend & salary.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed max-w-2xl mx-auto">
            Subsidized intern passes, full-time remote engineer wellness, and dual plans for your parents back home in your hometown. Eligible for corporate wellness reimbursement and Section 80D tax benefits.
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
                  : "border-border shadow-card hover:border-[#CBD7CE]"
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

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-wellness-light border border-[#CBD7CE] text-[11px] font-semibold text-wellness-dark">
                  <span>₹5,000 Sec 80D Tax Deduction Eligible</span>
                </div>

                <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-border/80">
                  <div className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                    Clinical Inclusions
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
                  variant={plan.ctaVariant}
                  onClick={onSelectPlan}
                  className="w-full justify-center text-xs sm:text-sm font-semibold gap-2"
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
