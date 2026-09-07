"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Video,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClinicalTriageSectionProps {
  onConsult: () => void;
}

export function ClinicalTriageSection({ onConsult }: ClinicalTriageSectionProps) {
  const [selectedSymptom, setSelectedSymptom] = useState(0);

  const symptomScenarios = [
    {
      label: "Cervical Spine & Shoulder Strain",
      duration: "3 weeks of continuous desk work",
      severity: "Conservative Physical Therapy",
      severityLevel: "Low / Moderate",
      badgeColor: "sage",
      recommendation: "Book a Virtual Physical Therapy appointment. Begin 5-minute thoracic extension exercises and adjust monitor height to eye level.",
      triageRoute: "Virtual Physical Therapy",
    },
    {
      label: "Elevated Blood Pressure Spike (> 138/88)",
      duration: "Recorded on 3 consecutive days",
      severity: "Primary Physician Telehealth",
      severityLevel: "Moderate Attention",
      badgeColor: "neutral",
      recommendation: "Schedule a Virtual Primary Care consultation today. Review sodium intake, sleep deficit, and medication adherence with Dr. Sarah Vance.",
      triageRoute: "Urgent Primary Care",
    },
    {
      label: "Digital Eye Fatigue & Tension Headaches",
      duration: "Occurring daily after 3:00 PM",
      severity: "Behavioral Protocol & Ergonomics",
      severityLevel: "Self-Care & Prevention",
      badgeColor: "sage",
      recommendation: "Implement 20-20-20 vision pauses, increase daily hydration to 2.0L, and take a 10-minute movement walk after lunch.",
      triageRoute: "Ergonomics Suite",
    },
    {
      label: "Acute Migraine with Photophobia",
      duration: "Onset 2 hours ago",
      severity: "Same-Day Urgent Telehealth",
      severityLevel: "Urgent Virtual Visit",
      badgeColor: "outline",
      recommendation: "Immediate physician consultation required for acute triptan prescription evaluation and dark room neurological rest.",
      triageRoute: "Urgent Telehealth MD",
    },
  ];

  const current = symptomScenarios[selectedSymptom];

  return (
    <section id="triage" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            AI-Assisted Symptom Navigator
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Smart clinical triage before your visit.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Our protocol-driven symptom navigator evaluates your biometrics and symptoms to route you to the exact clinical care you need in minutes.
          </p>
        </div>

        {/* 2-Column Interactive Triage Solver */}
        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left 5 Cols: Symptom Selection */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
              Select Sample Symptom Scenario
            </h3>
            <div className="space-y-2.5">
              {symptomScenarios.map((symptom, idx) => (
                <button
                  key={symptom.label}
                  type="button"
                  onClick={() => setSelectedSymptom(idx)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm font-medium",
                    selectedSymptom === idx
                      ? "bg-wellness-light/60 border-[#CBD8CE] text-foreground font-semibold shadow-subtle"
                      : "bg-background-subtle border-border text-foreground-secondary hover:text-foreground"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{symptom.label}</span>
                    {selectedSymptom === idx && (
                      <span className="w-2 h-2 rounded-full bg-wellness" />
                    )}
                  </div>
                  <div className="text-[11px] text-foreground-muted font-normal mt-1">
                    Timeline: {symptom.duration}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right 7 Cols: Triage Decision Card */}
          <div className="lg:col-span-7 bg-background-subtle rounded-2xl border border-border p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-wellness">
                  <Sparkles className="w-4 h-4 text-wellness" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Clinical Triage Evaluation</h4>
                  <p className="text-xs text-foreground-secondary">Evidence-Based Clinical Decision Engine</p>
                </div>
              </div>
              <Badge variant="sage">{current.severityLevel}</Badge>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-foreground-secondary">Recommended Care Protocol</span>
                <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed mt-1">
                  {current.recommendation}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-foreground-secondary">Care Destination</span>
                  <div className="text-xs font-bold text-foreground mt-0.5">{current.triageRoute}</div>
                </div>
                <Button variant="sage" size="sm" onClick={onConsult} className="text-xs gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  <span>Start Consultation</span>
                </Button>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-foreground-muted flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
              <span>Protocol reviewed by Clinical Quality Board • Non-emergency triage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
