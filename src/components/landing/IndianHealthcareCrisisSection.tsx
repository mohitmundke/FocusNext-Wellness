import React from "react";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function IndianHealthcareCrisisSection() {
  const crisisStats = [
    {
      number: "11.4 Hours",
      label: "Average Daily Screen Time",
      desc: "Monitor exposure for Indian remote software engineers, analysts, and design interns.",
    },
    {
      number: "78%",
      label: "Tech Neck & Lumbar Strain",
      desc: "Prevalence of cervical spine stiffness from long hours on rental PG chairs and sofas.",
    },
    {
      number: "84%",
      label: "Indoor Vitamin D3 Deficient",
      desc: "Indoor WFH routines with zero morning sunlight trigger fatigue, brain fog, and muscle aches.",
    },
    {
      number: "₹1,200 vs ₹199",
      label: "Intern Stipend Cost Barrier",
      desc: "Private hospital OPD fees wipe out an intern's weekly budget, causing untreated illness.",
    },
  ];

  return (
    <section id="crisis" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            The Remote Desk Worker & Intern Reality
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Why remote tech workers & interns need specialized healthcare.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Long laptop sprints, non-ergonomic rental chairs, irregular food delivery habits, and late-night deadlines create chronic physical strain that traditional 9-to-5 hospital OPDs fail to serve.
          </p>
        </div>

        {/* 4 Crisis Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {crisisStats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-3xl bg-surface border border-border shadow-card flex flex-col justify-between space-y-4 hover:border-wellness transition-all"
            >
              <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground tracking-tight">
                {stat.number}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-foreground">{stat.label}</h4>
                <p className="text-xs text-foreground-secondary mt-1 leading-relaxed">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison: Traditional Broken OPD vs FocusNext Connected Care */}
        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Traditional Hospital Experience */}
          <div className="p-6 rounded-2xl bg-red-50/50 border border-red-200/80 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-red-200">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-sm sm:text-base font-bold text-red-950">Taking Leave for Traditional Hospital OPD</h3>
              </div>
              <span className="text-xs font-bold text-red-700 font-mono">~ Half-Day Lost</span>
            </div>

            <div className="space-y-3.5 text-xs text-red-950">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="block text-foreground">Traffic & Commute:</strong>
                  1.5 hours stuck in Silk Board / Western Express Highway traffic during sprint hours.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="block text-foreground">Unpaid Leave or Missed Standups:</strong>
                  Forced to apply for sick leave and delay sprint deliverables or intern tasks.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="block text-foreground">Out-of-Pocket Expense:</strong>
                  ₹1,200 to ₹1,500 private OPD consultation fee with no student/intern discount.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="block text-foreground">Generic Advice:</strong>
                  &ldquo;Don&apos;t use computers&rdquo; advice with no practical desk ergonomics or 20-20-20 protocols.
                </div>
              </div>
            </div>
          </div>

          {/* Right: The FocusNext Connected Hospital */}
          <div className="p-6 rounded-2xl bg-wellness-light/40 border border-[#CBD8CE] space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#CBD8CE]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-wellness" />
                <h3 className="text-sm sm:text-base font-bold text-foreground">FocusNext Care for Remote Workers & Interns</h3>
              </div>
              <span className="text-xs font-bold text-wellness-dark font-mono">10 Mins Between Calls</span>
            </div>

            <div className="space-y-3.5 text-xs text-foreground">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-wellness text-white flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="block text-foreground">Zero Missed Work Hours:</strong>
                  Connect with AIIMS & CMC physicians in 10 minutes between your Zoom, Meet, or Slack syncs.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-wellness text-white flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="block text-foreground">Official Doctor Medical Leave Certificate:</strong>
                  Legitimate NMC-compliant digital sick leave certificate with QR code for your HR/College.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-wellness text-white flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="block text-foreground">Affordable Intern Pricing (from ₹199):</strong>
                  Transparent pricing tailored for college students, interns, and early-career engineers.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-wellness text-white flex items-center justify-center font-bold shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="block text-foreground">Doorstep Labs & Medicines:</strong>
                  Home Vitamin D3/B12 sample collection at 6:30 AM before work, and 45-min medicine delivery.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
