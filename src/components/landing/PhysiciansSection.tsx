import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Award, ShieldCheck } from "lucide-react";

export function PhysiciansSection() {
  const physicians = [
    {
      name: "Dr. Ananya Iyer, MD",
      title: "Consultant Internal Medicine & Cardiology",
      subspecialty: "Preventive Cardiology & Diabetes RPM",
      institution: "AIIMS New Delhi (Alumna)",
      experience: "14+ Years Clinical Practice",
      avatarInitials: "AI",
    },
    {
      name: "Dr. Rajesh Kulkarni, MS",
      title: "Consultant Orthopedics & Spine",
      subspecialty: "IT Workstation Ergonomics & Physical Therapy",
      institution: "CMC Vellore (Alumnus)",
      experience: "12+ Years Clinical Practice",
      avatarInitials: "RK",
    },
    {
      name: "Dr. Priya Nair, MD, DM",
      title: "Consultant Endocrinology",
      subspecialty: "Continuous Glucose & Metabolic Reversal",
      institution: "PGIMER Chandigarh",
      experience: "11+ Years Clinical Practice",
      avatarInitials: "PN",
    },
    {
      name: "Dr. Rohan Mehra, MD",
      title: "Consultant Physician & Pulmonology",
      subspecialty: "Seasonal Respiratory & Preventative OPD",
      institution: "KEM Hospital Mumbai",
      experience: "15+ Years Clinical Practice",
      avatarInitials: "RM",
    },
  ];

  return (
    <section id="physicians" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Indian Medical Board
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Treated by top 1% Indian doctors from AIIMS & CMC.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Our clinical network consists exclusively of verified MBBS and MD/MS/DM specialists from premier Indian medical institutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {physicians.map((doc) => (
            <div
              key={doc.name}
              className="p-6 rounded-3xl bg-surface border border-border shadow-card flex flex-col justify-between space-y-6 hover:border-wellness hover:shadow-elevated transition-all"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-wellness-light border border-[#CBD7CE] flex items-center justify-center text-wellness-dark font-bold text-lg shadow-subtle">
                  {doc.avatarInitials}
                </div>

                <div>
                  <h3 className="text-base font-bold text-foreground">{doc.name}</h3>
                  <p className="text-xs font-semibold text-wellness mt-0.5">{doc.title}</p>
                  <p className="text-xs text-foreground-secondary mt-1">{doc.subspecialty}</p>
                </div>

                <div className="pt-3 border-t border-border space-y-1.5 text-xs text-foreground-muted">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-wellness shrink-0" />
                    <span>{doc.institution}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-wellness shrink-0" />
                    <span>{doc.experience}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-[11px]">
                <span className="text-wellness-dark font-semibold">● Online OPD Available</span>
                <span className="text-foreground-muted font-mono">NMC Registered</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
