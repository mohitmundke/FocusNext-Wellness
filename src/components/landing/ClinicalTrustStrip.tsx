import React from "react";
import { ShieldCheck, Clock, Award, Stethoscope } from "lucide-react";

export function ClinicalTrustStrip() {
  const metrics = [
    {
      stat: "10 Min",
      label: "Between Sprints & Standups",
      desc: "Instant video OPD. Zero travel, zero missed sprint hours or leave deductions.",
      icon: Clock,
    },
    {
      stat: "HR & College",
      label: "Official Medical Sick Leave",
      desc: "NMC-compliant digital doctor certificates with QR code verification.",
      icon: ShieldCheck,
    },
    {
      stat: "Till 11:30 PM",
      label: "Late-Night & Weekend OPD",
      desc: "Attending physicians available when tech workers finish standups and US syncs.",
      icon: Stethoscope,
    },
    {
      stat: "From ₹199",
      label: "Intern-Friendly Pricing",
      desc: "Subsidized OPD passes, posture physiotherapy, and home D3/B12 blood tests.",
      icon: Award,
    },
  ];

  return (
    <section className="border-y border-border bg-surface py-12">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-5 rounded-2xl bg-background-subtle border border-border/80 flex flex-col justify-between space-y-3 hover:bg-background-subtle/80 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
                    {item.stat}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-wellness">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-foreground">{item.label}</h4>
                  <p className="text-xs text-foreground-secondary mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
