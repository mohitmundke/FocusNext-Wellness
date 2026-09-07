import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { User, Users, CheckCircle2, ArrowRight } from "lucide-react";

interface SolutionsSectionProps {
  onGetStarted: () => void;
}

export function SolutionsSection({ onGetStarted }: SolutionsSectionProps) {
  const individualBenefits = [
    "Better deep work focus without mental burnout",
    "Healthier 5-minute structured recovery pauses",
    "Ergonomic posture awareness without cameras",
    "Consistent daily hydration and stretch tracking",
    "Balanced work-to-recovery daily stamina",
  ];

  const teamBenefits = [
    "Aggregated team wellness & burnout prevention insights",
    "Synchronized healthy work rhythms & focus hours",
    "Organization-level engagement & satisfaction overview",
    "Enterprise-grade privacy with zero individual surveillance",
    "Opt-in collective wellness challenges & milestones",
  ];

  return (
    <section id="solutions" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container">
        <div className="max-w-2xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Solutions
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Engineered for professionals and modern teams.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Whether you&apos;re an individual knowledge worker or leading a distributed engineering organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: For Individuals */}
          <div className="bg-surface rounded-3xl border border-border p-8 sm:p-10 shadow-card flex flex-col justify-between space-y-8 hover:border-[#D0D0C8] transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-background-subtle border border-border flex items-center justify-center text-foreground">
                  <User className="w-6 h-6" />
                </div>
                <Badge variant="outline">Individual License</Badge>
              </div>

              <div>
                <span className="text-xs font-semibold text-wellness uppercase tracking-wider">For Individuals</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
                  Your workday, your rhythm.
                </h3>
                <p className="text-sm text-foreground-secondary mt-2 leading-relaxed">
                  Tailored specifically for engineers, designers, researchers, and knowledge workers seeking sustainable focus.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {individualBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-wellness shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <Button variant="primary" onClick={onGetStarted} className="w-full sm:w-auto">
                <span>Start for free</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>

          {/* Card 2: For Teams */}
          <div className="bg-surface rounded-3xl border border-border p-8 sm:p-10 shadow-card flex flex-col justify-between space-y-8 hover:border-[#D0D0C8] transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-wellness-light border border-[#D0DED3] flex items-center justify-center text-wellness-dark">
                  <Users className="w-6 h-6" />
                </div>
                <Badge variant="sage">B2B Organization</Badge>
              </div>

              <div>
                <span className="text-xs font-semibold text-wellness uppercase tracking-wider">For Organizations</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
                  Healthier teams work better.
                </h3>
                <p className="text-sm text-foreground-secondary mt-2 leading-relaxed">
                  Give your team the tools to stay energized and prevent burnout with anonymous, aggregated wellness telemetry.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {teamBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-wellness shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <Button variant="sage" onClick={onGetStarted} className="w-full sm:w-auto">
                <span>Explore for teams</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
