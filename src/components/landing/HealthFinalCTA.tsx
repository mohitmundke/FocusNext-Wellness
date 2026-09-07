"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Video } from "lucide-react";

interface HealthFinalCTAProps {
  onConsult: () => void;
  onExplore: () => void;
}

export function HealthFinalCTA({ onConsult, onExplore }: HealthFinalCTAProps) {
  return (
    <section className="py-24 md:py-32 bg-[#111111] text-white relative overflow-hidden">
      {/* Subtle Animated Medical Pulse Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-wellness/15 blur-[120px] pointer-events-none animate-pulse-subtle -z-0" />

      {/* Circular Decorative Line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] border border-white/10 rounded-full pointer-events-none -z-0" />

      <div className="container relative z-10 text-center max-w-3xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white/90 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-wellness animate-pulse" />
          <span>Top AIIMS & CMC Doctors Available Online Across All Indian States</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          World-class healthcare. <br />
          <span className="text-wellness">Delivered to your home in India.</span>
        </h2>

        <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
          Book online OPD visits, track blood pressure and glucose continuously, and get medicines delivered in hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            variant="sage"
            size="lg"
            onClick={onConsult}
            className="w-full sm:w-auto shadow-lg text-sm sm:text-base gap-2 font-semibold"
          >
            <Video className="w-4 h-4" />
            <span>Consult Doctor Now (₹499)</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onExplore}
            className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 hover:text-white text-sm sm:text-base font-medium"
          >
            <span>Explore Chronic RPM</span>
          </Button>
        </div>

        <div className="pt-8 text-xs text-white/40 flex flex-wrap items-center justify-center gap-6">
          <span>● ABHA & ABDM Compliant</span>
          <span>● NMC Telemedicine Guidelines</span>
          <span>● 10 Min Average OPD Wait</span>
        </div>
      </div>
    </section>
  );
}
