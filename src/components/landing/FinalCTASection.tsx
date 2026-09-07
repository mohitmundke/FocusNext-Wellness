import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface FinalCTASectionProps {
  onGetStarted: () => void;
  onExplore: () => void;
}

export function FinalCTASection({ onGetStarted, onExplore }: FinalCTASectionProps) {
  return (
    <section className="py-24 md:py-32 bg-[#111111] text-white relative overflow-hidden">
      {/* Subtle Animated Wellness Pulse Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-wellness/15 blur-[120px] pointer-events-none animate-pulse-subtle -z-0" />

      {/* Decorative Circular Line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] border border-white/5 rounded-full pointer-events-none -z-0" />

      <div className="container relative z-10 text-center max-w-3xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white/90 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-wellness animate-pulse" />
          <span>Start your new routine today</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          Build a healthier way to work.
        </h2>

        <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
          Small changes can create better workdays. Join thousands of knowledge workers reclaiming their focus and physiological stamina.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            variant="sage"
            size="lg"
            onClick={onGetStarted}
            className="w-full sm:w-auto shadow-lg"
          >
            <span>Get started free</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onExplore}
            className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 hover:text-white"
          >
            <span>Explore FocusNext</span>
          </Button>
        </div>

        <div className="pt-8 text-xs text-white/40 flex items-center justify-center gap-6">
          <span>● Instant browser access</span>
          <span>● Zero configuration required</span>
          <span>● 100% private</span>
        </div>
      </div>
    </section>
  );
}
