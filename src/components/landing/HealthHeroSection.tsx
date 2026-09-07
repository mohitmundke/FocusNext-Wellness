"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useHealth } from "@/lib/health-context";
import {
  Video,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Stethoscope,
  Activity,
  ArrowRight,
  Droplets,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthHeroSectionProps {
  onConsultDoctor: () => void;
  onExplore: () => void;
}

const SPECIALTIES = [
  { id: "spine", label: "Tech Neck & Spine PT", wait: "4 min wait", doc: "Dr. Rajesh Kulkarni, MS (CMC Vellore)", icon: Activity },
  { id: "eye", label: "Digital Eye Strain (20-20-20)", wait: "5 min wait", doc: "Dr. Priya Nair, MD (PGIMER)", icon: Zap },
  { id: "burnout", label: "Night Shift, Sleep & Burnout", wait: "7 min wait", doc: "Dr. Ananya Iyer, MD (AIIMS)", icon: Heart },
  { id: "intern", label: "Intern OPD & Sick Certificate", wait: "3 min wait", doc: "Dr. Sandeep Rao, MD (KMC Manipal)", icon: Stethoscope },
];

export function HealthHeroSection({ onConsultDoctor, onExplore }: HealthHeroSectionProps) {
  const { vitals } = useHealth();
  const [selectedSpecialty, setSelectedSpecialty] = useState("spine");

  const activeSpecialtyData = SPECIALTIES.find((s) => s.id === selectedSpecialty) || SPECIALTIES[0];

  return (
    <section id="remote-workers" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-background">
      {/* Background Soft Medical Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-wellness-light/60 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container">
        {/* Top Text Content */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border shadow-subtle">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-foreground tracking-wide">
              Ayushman Bharat (ABDM) & NMC Telemedicine Certified • For India&apos;s 18M+ Remote Workers & Interns
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.08]">
            Healthcare Built for <br />
            <span className="text-wellness">Remote Workers & Interns.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-foreground-secondary text-balance max-w-2xl mx-auto leading-relaxed">
            10-minute on-demand virtual OPD between your Zoom & Slack calls. Tech neck & lumbar ergonomics, 20-20-20 digital eye strain relief, Vitamin D3/B12 doorstep labs, and late-night consultations till 11:30 PM across 20,000+ PIN codes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="sage"
              size="lg"
              onClick={onConsultDoctor}
              className="w-full sm:w-auto shadow-subtle text-sm md:text-base font-semibold gap-2 py-3 px-6"
            >
              <Video className="w-4 h-4" />
              <span>Instant Doctor OPD (₹199 Intern / ₹499 Pro)</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={onExplore}
              className="w-full sm:w-auto text-sm md:text-base font-medium py-3 px-6 border border-border bg-surface hover:bg-background-subtle"
            >
              <span>Explore Desk Ergonomics & Plans</span>
            </Button>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-foreground-secondary">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-wellness" />
              <span>Valid Doctor Medical Leave Certificate (HR & College)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-wellness" />
              <span>Late-Night Virtual OPD (6:00 PM – 11:30 PM)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-wellness" />
              <span>45-Min Doorstep Medicine Delivery (Apollo/1mg)</span>
            </span>
          </div>
        </div>

        {/* Hero Interactive Console — Live Telehealth & RPM Telemetry Dock */}
        <div className="max-w-5xl mx-auto bg-surface rounded-3xl border border-border shadow-elevated overflow-hidden transition-all duration-300">
          {/* Specialty Selector Strip */}
          <div className="px-6 py-3.5 border-b border-border bg-background-subtle/80 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-foreground mr-1 whitespace-nowrap">Instant OPD:</span>
              {SPECIALTIES.map((spec) => {
                const Icon = spec.icon;
                const isSelected = selectedSpecialty === spec.id;
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => setSelectedSpecialty(spec.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap",
                      isSelected
                        ? "bg-surface border border-wellness text-wellness-dark shadow-subtle"
                        : "bg-transparent text-foreground-secondary hover:text-foreground hover:bg-surface/60"
                    )}
                  >
                    <Icon className={cn("w-3.5 h-3.5", isSelected ? "text-wellness" : "text-foreground-muted")} />
                    <span>{spec.label}</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md font-mono">
                      {spec.wait}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs text-foreground-secondary font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live ABDM Interoperability</span>
            </div>
          </div>

          {/* Console Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
            {/* Left 7 Cols: Video Consultation Preview */}
            <div className="lg:col-span-7 bg-background-subtle rounded-2xl border border-border p-5 flex flex-col justify-between space-y-5 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-border/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-wellness-light flex items-center justify-center text-wellness-dark font-bold text-sm">
                    AI
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">
                      {activeSpecialtyData.doc}
                    </div>
                    <div className="text-xs text-foreground-secondary">
                      Available for Instant Video OPD • Room #AIIMS-804
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>On Duty</span>
                </div>
              </div>

              {/* Consultation Quote & Clinical Focus */}
              <div className="bg-surface rounded-xl p-4 border border-border/80 shadow-subtle space-y-2">
                <div className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Current Patient: Aarav Sharma (Age 29) • Remote React Dev</span>
                  <span className="font-mono text-wellness-dark text-[11px]">ABHA: 91-4421-8890-1204</span>
                </div>
                <p className="text-xs text-foreground-secondary leading-relaxed italic">
                  &ldquo;Your 11-hour daily desk screen time is causing cervical C5-C6 posture strain. We&apos;ve initiated the 10-minute thoracic extension protocol, prescribed lubricating eye drops, and sent your NMC medical sick certificate for HR approval.&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-foreground-muted flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-wellness" />
                  <span>Valid NMC Digital e-Prescription Included</span>
                </div>

                <Button
                  variant="sage"
                  size="sm"
                  onClick={onConsultDoctor}
                  className="font-semibold text-xs gap-1.5 shadow-subtle"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Enter Room Now</span>
                </Button>
              </div>
            </div>

            {/* Right 5 Cols: Live Vitals Telemetry */}
            <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1">
                <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Live Patient Telemetry
                </div>
                <div className="text-[11px] font-mono text-wellness-dark flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-wellness animate-pulse" />
                  <span>Streaming</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Blood Pressure */}
                <div className="bg-surface p-4 rounded-2xl border border-border shadow-subtle space-y-1">
                  <div className="flex items-center justify-between text-xs text-foreground-secondary">
                    <span>Blood Pressure</span>
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {vitals.systolicBP}/{vitals.diastolicBP}
                    <span className="text-[10px] font-sans font-normal text-foreground-muted ml-1">mmHg</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Optimal Control (Omron)</div>
                </div>

                {/* Blood Glucose */}
                <div className="bg-surface p-4 rounded-2xl border border-border shadow-subtle space-y-1">
                  <div className="flex items-center justify-between text-xs text-foreground-secondary">
                    <span>Blood Sugar</span>
                    <Droplets className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {vitals.bloodGlucose}
                    <span className="text-[10px] font-sans font-normal text-foreground-muted ml-1">mg/dL</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Fasting Target (Accu-Chek)</div>
                </div>

                {/* Heart Rate */}
                <div className="bg-surface p-4 rounded-2xl border border-border shadow-subtle space-y-1">
                  <div className="flex items-center justify-between text-xs text-foreground-secondary">
                    <span>Heart Rate</span>
                    <Activity className="w-3.5 h-3.5 text-wellness" />
                  </div>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {vitals.heartRate}
                    <span className="text-[10px] font-sans font-normal text-foreground-muted ml-1">bpm</span>
                  </div>
                  <div className="text-[10px] text-foreground-secondary font-medium">Sinus Rhythm (Normal)</div>
                </div>

                {/* SpO2 */}
                <div className="bg-surface p-4 rounded-2xl border border-border shadow-subtle space-y-1">
                  <div className="flex items-center justify-between text-xs text-foreground-secondary">
                    <span>Blood Oxygen</span>
                    <Zap className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <div className="text-xl font-bold font-mono text-foreground">
                    {vitals.spO2}%
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Nonin Oximeter</div>
                </div>
              </div>

              {/* Medicine Delivery Pill */}
              <div className="p-3 bg-wellness-light/40 border border-[#CBD7CE] rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-foreground">Apollo & Tata 1mg Express</div>
                  <div className="text-[11px] text-foreground-secondary">Bengaluru PIN 560103 • 45-Min Delivery</div>
                </div>
                <button
                  type="button"
                  onClick={onConsultDoctor}
                  className="text-wellness-dark hover:underline font-bold text-xs flex items-center gap-1"
                >
                  <span>Order</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
