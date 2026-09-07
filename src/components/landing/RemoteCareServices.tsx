"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Activity,
  Brain,
  Video,
  CheckCircle2,
  Eye,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RemoteCareServicesProps {
  onConsult: () => void;
}

export function RemoteCareServices({ onConsult }: RemoteCareServicesProps) {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: "spine",
      title: "Tech Neck & Ergonomics PT",
      subtitle: "Spine recovery for Bengaluru & remote IT hubs",
      desc: "Specialized virtual physical therapy and ergonomic posture correction designed for long screen hours, cervical spondylosis, lumbar spasms, and laptop hunching.",
      icon: Activity,
      capabilities: [
        "Virtual spine range-of-motion & postural alignment audit",
        "10-minute daily thoracic & lumbar decompression routines",
        "Workstation ergonomic review (rental chair, laptop stand, wrist angle)",
        "Guided video sessions with CMC Vellore rehabilitation specialists",
      ],
      previewHeadline: "Cervical Spine & Ergonomics Physical Therapy",
      previewBadge: "Ergonomics Protocol",
    },
    {
      id: "eye",
      title: "Digital Eye Strain & 20-20-20",
      subtitle: "Relief for 10+ hour code & design screen sessions",
      desc: "Clinical ophthalmology protocols to treat computer vision syndrome, screen dryness, blurred night vision, and tension headaches caused by continuous display exposure.",
      icon: Eye,
      capabilities: [
        "20-20-20 interval guidance & ciliary muscle relaxation exercises",
        "Dry eye tear-film evaluation and prescription lubricating drops",
        "Blue light strain mitigation & ambient display contrast audits",
        "Consultations with PGIMER & AIIMS ophthalmology specialists",
      ],
      previewHeadline: "Computer Vision Syndrome & Screen Fatigue Care",
      previewBadge: "Eye Health Active",
    },
    {
      id: "labs",
      title: "Indoor WFH Vitamin & Metabolic Labs",
      subtitle: "6:30 AM home sample collection before work calls",
      desc: "Specialized diagnostics targeting indoor WFH deficiencies. Over 84% of remote tech workers suffer from Vitamin D3 and B12 depletion, causing chronic lethargy and brain fog.",
      icon: Brain,
      capabilities: [
        "6:30 AM home blood sample pickup before your daily standup",
        "Comprehensive panel: Vitamin D3, Vitamin B12, HbA1c & Lipids",
        "Physician titration for fast replenishment and energy recovery",
        "Tax-deductible under Section 80D of the Indian Income Tax Act",
      ],
      previewHeadline: "Remote Worker Metabolic & Vitamin Panel",
      previewBadge: "ABHA Synced Labs",
    },
    {
      id: "intern",
      title: "Intern & Student Clinic (₹199)",
      subtitle: "Affordable OPD, medical leave notes & PG gut care",
      desc: "Subsidized clinical care tailored for college students, interns, and junior engineers. Includes official doctor-signed medical leave certificates, PG mess acidity relief, and stress counseling.",
      icon: Coffee,
      capabilities: [
        "₹199 subsidized virtual OPD visits with senior Indian MDs",
        "NMC-compliant digital medical leave certificates with QR verification",
        "Late-night consultations till 11:30 PM after sprint crunch",
        "Treatment for PG mess acidity, GERD, and irregular sleep cycles",
      ],
      previewHeadline: "Subsidized Virtual OPD & Medical Certificate",
      previewBadge: "Intern Pass Active",
    },
  ];

  const current = services[activeTab];
  const Icon = current.icon;

  return (
    <section id="services" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Specialized Remote Worker & Intern Care
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Healthcare engineered for remote work realities.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            From reversing tech neck and digital eye strain to 6:30 AM home blood testing and subsidized ₹199 intern visits with official sick leave certificates.
          </p>
        </div>

        {/* 4 Tabs Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-1.5 bg-background-subtle rounded-3xl border border-border mb-12">
          {services.map((svc, idx) => {
            const SvcIcon = svc.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={svc.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "p-4 rounded-2xl text-left transition-all flex flex-col justify-between space-y-3",
                  isSelected
                    ? "bg-surface border border-border text-foreground shadow-card"
                    : "text-foreground-secondary hover:text-foreground hover:bg-surface/50"
                )}
              >
                <div className="w-8 h-8 rounded-xl bg-background-subtle border border-border flex items-center justify-center">
                  <SvcIcon className={cn("w-4 h-4", isSelected ? "text-wellness" : "text-foreground-secondary")} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold leading-tight">{svc.title}</h4>
                  <p className="text-[11px] text-foreground-muted mt-0.5 hidden sm:block truncate">{svc.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Service Editorial Showcase */}
        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left 6 Cols: Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-wellness">
                Specialty Service • 0{activeTab + 1}
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed pt-1">
                {current.desc}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                Program Inclusions
              </div>
              {current.capabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button variant="sage" size="md" onClick={onConsult} className="gap-2 text-xs sm:text-sm font-semibold">
                <Video className="w-4 h-4" />
                <span>Book OPD Consultation (₹499)</span>
              </Button>
            </div>
          </div>

          {/* Right 6 Cols: Interactive Medical Console Visual */}
          <div className="lg:col-span-6 bg-background-subtle rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-wellness-light flex items-center justify-center text-wellness-dark">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-foreground">{current.previewHeadline}</h4>
                  <p className="text-[11px] text-foreground-secondary">Protocol: NMC Telemedicine Guidelines</p>
                </div>
              </div>
              <Badge variant="sage">{current.previewBadge}</Badge>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-foreground-secondary">Doctor Licensure</span>
                  <div className="text-xs font-bold text-foreground mt-0.5">NMC & State Medical Council Verified</div>
                </div>
                <span className="text-xs font-semibold text-wellness">100% Verified</span>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-foreground-secondary">E-Pharmacy & Lab Network</span>
                  <div className="text-xs font-bold text-foreground mt-0.5">Tata 1mg, Apollo 24|7 & Dr Lal PathLabs</div>
                </div>
                <span className="text-xs font-mono text-foreground-muted">Direct Integration</span>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-foreground-secondary">Digital Health Account</span>
                  <div className="text-xs font-bold text-foreground mt-0.5">ABHA (Ayushman Bharat) Auto-Sync</div>
                </div>
                <span className="text-xs font-semibold text-wellness-dark">ABDM Ready</span>
              </div>
            </div>

            <div className="text-[11px] text-foreground-muted text-center pt-2">
              Valid for consultation claims under OPD insurance & Section 80D tax deductions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
