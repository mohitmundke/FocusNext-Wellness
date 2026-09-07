"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Video } from "lucide-react";

interface PCOSHealthSectionProps {
  onConsult: () => void;
}

export function PCOSHealthSection({ onConsult }: PCOSHealthSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Women&apos;s Metabolic & Hormonal Health
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Evidence-based PCOS & metabolic care for Indian women.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            1 in 5 Indian women suffers from PCOS and insulin resistance. Our clinical protocol combines endocrinology, continuous glycemic monitoring, and cycle optimization.
          </p>
        </div>

        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left 6 Cols */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-wellness">
                Hormonal Balance & Insulin Sensitivity
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Targeting the Root Cause: Insulin Resistance & Hormonal Rhythm.
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                Rather than prescribing temporary symptom suppressants, our team uses continuous glucose biosensors and comprehensive hormone panels to restore ovulatory regularity.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-foreground">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                <span>
                  <strong>Consultations with Female Endocrinologists:</strong> Specialists from AIIMS & PGIMER.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                <span>
                  <strong>Continuous Glucose Sensor Integration:</strong> Track post-meal glucose spikes from Indian meals.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                <span>
                  <strong>Comprehensive 12-Parameter Hormone Panel:</strong> LH, FSH, AMH, DHEAS, Free Testosterone, Thyroid & Fasting Insulin.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                <span>
                  <strong>Indian Anti-Inflammatory Nutrition:</strong> Customized meal plans tailored to regional Indian diets.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="sage" size="md" onClick={onConsult} className="gap-2 text-xs sm:text-sm font-semibold">
                <Video className="w-4 h-4" />
                <span>Book PCOS Clinical Consultation (₹499)</span>
              </Button>
            </div>
          </div>

          {/* Right 6 Cols */}
          <div className="lg:col-span-6 bg-background-subtle rounded-2xl border border-border p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Clinical PCOS Reversal Protocol
              </h4>
              <Badge variant="sage">Active Protocol</Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between">
                <div>
                  <span className="text-foreground-secondary">Insulin Resistance Index (HOMA-IR)</span>
                  <div className="font-bold text-foreground text-sm mt-0.5">Reduced from 3.8 to 1.9</div>
                </div>
                <span className="text-xs font-semibold text-wellness">Optimal Range</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between">
                <div>
                  <span className="text-foreground-secondary">Cycle Regularity Indicator</span>
                  <div className="font-bold text-foreground text-sm mt-0.5">28-31 Day Natural Rhythm</div>
                </div>
                <span className="text-xs font-semibold text-wellness">Restored</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between">
                <div>
                  <span className="text-foreground-secondary">Attending Clinical Specialist</span>
                  <div className="font-bold text-foreground text-sm mt-0.5">Dr. Priya Nair, MD, DM (Endocrinology)</div>
                </div>
                <span className="text-xs font-mono text-foreground-muted">PGIMER</span>
              </div>
            </div>

            <div className="text-[11px] text-foreground-muted text-center pt-2">
              Confidential, non-judgmental, evidence-based telemedicine
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
