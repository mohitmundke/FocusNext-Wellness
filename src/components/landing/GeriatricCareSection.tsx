"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Phone, CheckCircle2, Users } from "lucide-react";

interface GeriatricCareSectionProps {
  onExplore: () => void;
}

export function GeriatricCareSection({ onExplore }: GeriatricCareSectionProps) {
  const [activeProfile, setActiveProfile] = React.useState<"parent" | "self">("parent");

  const telemetryData = {
    parent: {
      initials: "RS",
      name: "Ramesh Sharma (Father, Age 68)",
      location: "Pune, Maharashtra • Cellular Hub Synced",
      status: "Telemetry Healthy",
      bp: "122 / 78",
      bpUnit: "mmHg",
      bpStatus: "● Normal Control (Omron 4G)",
      glucose: "104",
      glucoseUnit: "mg/dL",
      glucoseStatus: "● Stable (Accu-Chek Cellular)",
      doctorCall: "Next Doctor Call: Friday 10:00 AM IST",
      doctorName: "Dr. Ananya Iyer, MD (AIIMS)",
      alertNotice: "Cellular 4G Hub: Online • No home Wi-Fi needed",
    },
    self: {
      initials: "AS",
      name: "Aarav Sharma (Self, Age 36)",
      location: "Bengaluru, Karnataka • Bluetooth Synced",
      status: "Active Monitoring",
      bp: "118 / 76",
      bpUnit: "mmHg",
      bpStatus: "● Optimal Range (Omron BLE)",
      glucose: "96",
      glucoseUnit: "mg/dL",
      glucoseStatus: "● Fasting Target (Accu-Chek)",
      doctorCall: "Bi-weekly Review: Next Wednesday 6:30 PM",
      doctorName: "Dr. Ananya Iyer, MD (AIIMS)",
      alertNotice: "Smart Sync: Active • 14-day logs up to date",
    },
  };

  const current = telemetryData[activeProfile];

  return (
    <section className="py-24 md:py-32 bg-background-subtle border-t border-border">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Geriatric Care & NRI Family Health
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Care for your aging parents in India. From anywhere in the world.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Whether you work in Bengaluru or live abroad in the US, UK, or UAE — keep your elderly parents healthy with continuous remote monitoring, dedicated doctors, and 24-hour emergency response.
          </p>
        </div>

        {/* 2-Column Feature Showcase */}
        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left 6 Cols: Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-wellness">
                Family Caregiver Telemetry
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Zero Tech Hassle for Elderly Parents. Complete Peace of Mind for You.
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                Parents simply measure their blood pressure or sugar on their Omron device. The cellular gateway streams readings automatically to your smartphone and our medical triage team.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-foreground">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                <span>
                  <strong>Cellular Pre-Paired Hardware:</strong> No Wi-Fi setup or pairing required by parents.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                <span>
                  <strong>Weekly Dedicated Doctor Calls:</strong> Attending physician reviews health trends with parents.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                <span>
                  <strong>112 / 108 Emergency Ambulance Escalation:</strong> Immediate ambulance dispatch if vitals cross critical limits.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                <span>
                  <strong>Automated Doorstep Medicines:</strong> Monthly refills delivered via Apollo Pharmacy to parents&apos; doorstep.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="sage" size="md" onClick={onExplore} className="gap-2 text-xs sm:text-sm font-semibold">
                <Users className="w-4 h-4" />
                <span>Enroll Parents in Senior Care Plan</span>
              </Button>
            </div>
          </div>

          {/* Right 6 Cols: Dual-Telemetry Showcase with Toggle */}
          <div className="lg:col-span-6 bg-background-subtle rounded-2xl border border-border p-6 sm:p-8 space-y-5">
            {/* Live Dual-Telemetry Toggle Switch */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Live Telemetry View:
              </span>
              <div className="inline-flex p-1 bg-surface border border-border rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveProfile("parent")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeProfile === "parent"
                      ? "bg-wellness text-white shadow-subtle"
                      : "text-foreground-secondary hover:text-foreground"
                  }`}
                >
                  Senior Parent (Pune)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveProfile("self")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeProfile === "self"
                      ? "bg-wellness text-white shadow-subtle"
                      : "text-foreground-secondary hover:text-foreground"
                  }`}
                >
                  Self (Bengaluru)
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold text-sm">
                  {current.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{current.name}</h4>
                  <p className="text-xs text-foreground-secondary">{current.location}</p>
                </div>
              </div>
              <Badge variant="sage">{current.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-surface border border-border space-y-1">
                <span className="text-[11px] text-foreground-secondary">Today&apos;s Morning BP</span>
                <div className="text-xl font-bold font-mono text-foreground">{current.bp} <span className="text-xs font-normal">{current.bpUnit}</span></div>
                <div className="text-[10px] text-wellness">{current.bpStatus}</div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border space-y-1">
                <span className="text-[11px] text-foreground-secondary">Fasting Glucose</span>
                <div className="text-xl font-bold font-mono text-foreground">{current.glucose} <span className="text-xs font-normal">{current.glucoseUnit}</span></div>
                <div className="text-[10px] text-wellness">{current.glucoseStatus}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-wellness" />
                <span className="font-semibold text-foreground">{current.doctorCall}</span>
              </div>
              <span className="font-mono text-foreground-muted">{current.doctorName}</span>
            </div>

            <div className="text-[11px] text-wellness-dark bg-wellness-light/60 p-2 rounded-lg text-center font-medium border border-[#D5DFD7]">
              {current.alertNotice}
            </div>

            <div className="text-[11px] text-foreground-muted text-center pt-1">
              Supports NRI family payments in USD, GBP, AED, EUR & SGD with Section 80D tax receipt
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
