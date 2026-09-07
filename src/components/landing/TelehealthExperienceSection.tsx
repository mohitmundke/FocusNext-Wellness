"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TelehealthExperienceSectionProps {
  onStartCall: () => void;
}

export function TelehealthExperienceSection({ onStartCall }: TelehealthExperienceSectionProps) {
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  return (
    <section id="telehealth" className="py-24 md:py-32 bg-background-subtle border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Virtual Consultation Studio
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Clinical visits, reimagined for the home.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            High-definition, encrypted video consultations with integrated real-time vitals telemetry, shared clinical visit notes, and instant digital prescription fulfillment.
          </p>
        </div>

        {/* Telehealth Room Mockup */}
        <div className="max-w-5xl mx-auto bg-surface rounded-3xl border border-border shadow-elevated overflow-hidden">
          {/* Top Room Bar */}
          <div className="px-6 py-4 border-b border-border bg-background-subtle/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-foreground">
                Live OPD Consultation: Dr. Ananya Iyer, MD (AIIMS) & Aarav Sharma
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-foreground-secondary">
              <ShieldCheck className="w-4 h-4 text-wellness" />
              <span>ABDM & NMC Encrypted</span>
            </div>
          </div>

          {/* Virtual Clinic Main Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Video Main Stage (8 Cols) */}
            <div className="lg:col-span-8 bg-background-subtle p-6 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-border">
              {/* Doctor Main Video */}
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 my-auto">
                <div className="w-20 h-20 rounded-full bg-wellness-light border-2 border-wellness flex items-center justify-center text-wellness-dark text-2xl font-bold shadow-subtle">
                  AI
                </div>
                <div className="space-y-1">
                  <h4 className="text-foreground text-sm font-bold">Dr. Ananya Iyer, MD</h4>
                  <p className="text-foreground-secondary text-xs">Consultant Physician • AIIMS New Delhi Alumna</p>
                </div>
                <div className="p-3.5 bg-surface rounded-xl max-w-sm text-foreground-secondary text-xs leading-relaxed border border-border shadow-subtle">
                  &ldquo;Namaste Aarav. Your Omron blood pressure and fasting glucose trends are optimal. I have generated your NMC e-prescription for Telmisartan 40mg and sent it to Apollo Pharmacy.&rdquo;
                </div>
              </div>

              {/* Patient Self-View (PiP) */}
              <div className="absolute top-6 right-6 w-36 h-24 bg-surface rounded-xl border border-border p-2.5 flex flex-col justify-between shadow-card">
                <span className="text-[10px] text-foreground-secondary font-mono font-medium">You (Aarav, BLR)</span>
                <div className="flex items-center justify-between text-[9px] text-wellness-dark font-mono font-bold">
                  <span>SpO2: 99%</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              {/* Video Controls Bar */}
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setMuted(!muted)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors border",
                    muted ? "bg-red-50 text-red-600 border-red-200" : "bg-surface text-foreground border-border hover:bg-background-subtle shadow-subtle"
                  )}
                  title={muted ? "Unmute Mic" : "Mute Mic"}
                >
                  {muted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setVideoOff(!videoOff)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors border",
                    videoOff ? "bg-red-50 text-red-600 border-red-200" : "bg-surface text-foreground border-border hover:bg-background-subtle shadow-subtle"
                  )}
                  title={videoOff ? "Turn Video On" : "Turn Video Off"}
                >
                  {videoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                </button>
                <Button
                  variant="sage"
                  size="sm"
                  onClick={onStartCall}
                  className="rounded-xl text-xs gap-1.5 font-semibold"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Live OPD Room</span>
                </Button>
              </div>
            </div>

            {/* In-Call Shared Clinical Notes (4 Cols) */}
            <div className="lg:col-span-4 p-6 border-t lg:border-t-0 lg:border-l border-border bg-surface flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-wellness" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      ABHA OPD Visit Record
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-wellness">Synced</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-foreground-secondary">Diagnosis / Assessment:</span>
                    <p className="font-medium text-foreground mt-0.5">
                      Controlled Essential Hypertension & Normal Glycemic Recovery.
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-foreground-secondary">NMC Digital e-Prescription:</span>
                    <div className="p-2.5 rounded-lg bg-background-subtle border border-border font-mono text-[11px] text-foreground mt-1">
                      Telmisartan 40mg Tab #30 (Apollo Pharmacy)
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-foreground-secondary">Care Plan Directives:</span>
                    <ul className="space-y-1 text-foreground mt-1">
                      <li>• 30-min morning brisk walk</li>
                      <li>• 2.5L daily hydration goal</li>
                      <li>• Weekly Omron Bluetooth BP sync</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border text-[11px] text-foreground-muted">
                Sent to Apollo Pharmacy & Tata 1mg network with ABHA health record synchronization.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
