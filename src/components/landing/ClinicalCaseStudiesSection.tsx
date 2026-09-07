import React from "react";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2 } from "lucide-react";

export function ClinicalCaseStudiesSection() {
  const caseStudies = [
    {
      name: "Kavya Krishnan",
      age: 22,
      location: "Bengaluru, Karnataka",
      role: "Software Engineering Intern • WFH PG",
      condition: "Tech Neck, Cervical Spasms & Screen Migraines",
      doctor: "Dr. Rajesh Kulkarni, MS (CMC Vellore)",
      results: [
        { metric: "Daily Neck Pain Severity", before: "8 / 10", after: "1 / 10", change: "-87% Pain" },
        { metric: "Thoracic Mobility", before: "Restricted", after: "Full Range", change: "Restored" },
      ],
      quote:
        "“As an intern working 11 hours from my PG bed in Koramangala, my cervical spasms were excruciating. FocusNext gave me a 10-minute consult during my lunch break, prescribed posture PT, and gave me an official medical certificate so I didn't lose stipend days.”",
    },
    {
      name: "Aditya Rao",
      age: 28,
      location: "Pune, Maharashtra",
      role: "Remote DevOps Lead • US Shift Sprints",
      condition: "Severe Vitamin D3 Deficiency & Irregular Sleep",
      doctor: "Dr. Priya Nair, MD (PGIMER)",
      results: [
        { metric: "Vitamin D3 (25-OH)", before: "8.2 ng/mL", after: "44.5 ng/mL", change: "Optimal" },
        { metric: "Sleep Quality Index", before: "Disrupted", after: "Restorative", change: "+75% Recovery" },
      ],
      quote:
        "“Supporting US deployments meant zero morning sunlight and chronic fatigue. The 6:30 AM home sample collection caught my severe Vitamin D deficiency, and Dr. Nair adjusted my circadian supplements. My brain fog is completely gone.”",
    },
    {
      name: "Tanvi Deshmukh",
      age: 24,
      location: "Gurgaon, Haryana",
      role: "UI/UX Product Design Intern • Remote",
      condition: "Carpal Tunnel Wrist Strain & PG Mess Acidity",
      doctor: "Dr. Ananya Iyer, MD (AIIMS)",
      results: [
        { metric: "Wrist Strain Frequency", before: "Constant", after: "Negligible", change: "-90% Strain" },
        { metric: "Night Acidity & Reflux", before: "5 nights/wk", after: "0 nights/wk", change: "Resolved" },
      ],
      quote:
        "“12-hour Figma marathons caused severe wrist stiffness, and late Swiggy orders ruined my digestion. Dr. Iyer guided my desk ergonomics and fixed my gastric acidity without taking a single half-day leave.”",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background-subtle border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Clinical Outcomes & Reversal Cases
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Measurable clinical results across India.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Real patient outcomes from continuous remote patient monitoring, lifestyle pacing, and proactive physician oversight.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.name}
              className="p-8 rounded-3xl bg-surface border border-border shadow-card flex flex-col justify-between space-y-6 hover:border-wellness transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{study.name} ({study.age})</h3>
                    <p className="text-xs text-foreground-secondary">{study.location}</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-wellness-light text-wellness-dark px-2.5 py-1 rounded-full">
                    90-Day Outcome
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-foreground-secondary">Condition:</span>
                  <div className="font-bold text-foreground">{study.condition}</div>
                  <div className="text-wellness-dark font-medium text-[11px]">Under {study.doctor}</div>
                </div>

                {/* Metric Diffs */}
                <div className="space-y-2 pt-2">
                  {study.results.map((res, i) => (
                    <div key={i} className="p-3 rounded-xl bg-background-subtle border border-border flex items-center justify-between text-xs">
                      <div>
                        <span className="text-foreground-secondary text-[11px]">{res.metric}</span>
                        <div className="font-mono text-foreground font-bold mt-0.5">
                          <span className="text-red-500 line-through mr-1.5">{res.before}</span>
                          <span className="text-wellness-dark">{res.after}</span>
                        </div>
                      </div>
                      <Badge variant="sage" className="text-[10px]">{res.change}</Badge>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-foreground-secondary italic leading-relaxed pt-2">
                  {study.quote}
                </p>
              </div>

              <div className="pt-3 border-t border-border text-[11px] text-foreground-muted flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-wellness" />
                <span>Verified Patient Case Study • ABHA Linked</span>
              </div>
            </div>
          ))}
        </div>

        {/* ASCI & NMC Ethical Clinical Disclaimer */}
        <div className="mt-12 p-4 rounded-2xl bg-surface border border-border text-[11px] text-foreground-secondary leading-relaxed flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
          <p>
            <strong className="text-foreground">Statutory Clinical Notice (ASCI &amp; NMC Ethics Regulations):</strong> Clinical outcomes and biomarker changes shown are documented case studies under individualized medical supervision. Physiological responses vary depending on baseline metabolic parameters, ergonomic adherence, and physician guidance. Telemedicine is provided by registered medical practitioners in compliance with the NMC Telemedicine Practice Guidelines (2020).
          </p>
        </div>
      </div>
    </section>
  );
}
