"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PatientAuthModal } from "@/components/auth/PatientAuthModal";
import { FloatingHealthDock } from "@/components/common/FloatingHealthDock";
import { CommandMenu } from "@/components/common/CommandMenu";
import { MedicalCertificateModal } from "@/components/common/MedicalCertificateModal";
import { useHealth } from "@/lib/health-context";
import {
  Activity,
  Eye,
  FileText,
  Pill,
  Armchair,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function ServicesPage() {
  const router = useRouter();
  const { isAuthenticated } = useHealth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const handleAction = (view?: string) => {
    if (isAuthenticated) {
      router.push(view ? `/app?view=${view}` : "/app");
    } else {
      setAuthModalOpen(true);
    }
  };

  const services = [
    {
      id: "spine",
      icon: Armchair,
      badge: "Ergonomics Protocol",
      title: "Tech Neck & Desk Spine Physical Therapy",
      subtitle: "Spine recovery for Bengaluru & remote IT tech hubs",
      description:
        "Specialized virtual physical therapy and ergonomic posture correction designed for long screen hours, cervical spondylosis, lumbar spasms, and laptop hunching on rental chairs.",
      capabilities: [
        "Virtual spine range-of-motion & postural alignment audit",
        "10-minute daily thoracic & lumbar decompression routines",
        "Workstation ergonomic review (rental chair, laptop stand, wrist angle)",
        "Guided video sessions with CMC Vellore rehabilitation specialists",
      ],
      ctaText: "Start Posture Assessment",
      viewTarget: "posture",
      pricing: "₹499 per consultation",
    },
    {
      id: "eye",
      icon: Eye,
      badge: "Ophthalmology Protocol",
      title: "Digital Eye Strain & 20-20-20 Ophthalmology",
      subtitle: "Relief for 10+ hour code & design screen sessions",
      description:
        "Clinical ophthalmology protocols to treat computer vision syndrome, screen dryness, blurred night vision, and tension headaches caused by continuous display exposure.",
      capabilities: [
        "Dry-eye ciliary muscle strain index assessment",
        "Guided 20-20-20 focal relaxation & tear-film restoration routines",
        "Prescription lubricating eye drops (Carboxymethylcellulose 0.5%)",
        "Night screen blue-light circadian rhythm realignment",
      ],
      ctaText: "Check Digital Eye Strain",
      viewTarget: "eye_health",
      pricing: "₹299 per consultation",
    },
    {
      id: "labs",
      icon: FileText,
      badge: "Doorstep Phlebotomy",
      title: "6:30 AM Doorstep Fasting Blood Draws",
      subtitle: "Dr Lal PathLabs & Tata 1mg across 20,000+ PIN codes",
      description:
        "Certified phlebotomists arrive at your flat or PG before your first standup meeting. Temperature-controlled cold chain logistics and digital reports delivered in 6 hours to your ABHA locker.",
      capabilities: [
        "Fasting blood glucose, HbA1c, Vitamin D3 & B12 profile",
        "NABL-accredited pathology processing within 6 hours",
        "Zero travel or queueing in crowded diagnostic centers",
        "Automatic clinical biomarker telemetry sync in patient portal",
      ],
      ctaText: "Order Diagnostic Blood Test",
      viewTarget: "labs",
      pricing: "From ₹499 (NABL Accredited)",
    },
    {
      id: "prescriptions",
      icon: Pill,
      badge: "Doorstep Express",
      title: "45-Minute Doorstep Medicine Delivery",
      subtitle: "Apollo Pharmacy network with cold-chain assurance",
      description:
        "Digital NMC e-prescriptions transmitted automatically to nearby Apollo Pharmacy fulfillment centers. Genuine Indian Pharmacopoeia medications delivered to your doorstep.",
      capabilities: [
        "Instant transmission from virtual OPD EHR to Apollo Pharmacy",
        "Tamper-proof packaging with verified batch & expiry check",
        "Cold-chain insulin and biologicals delivery guarantee",
        "1-click recurring monthly refills for hypertension & diabetes",
      ],
      ctaText: "View Medicine Delivery",
      viewTarget: "prescriptions",
      pricing: "Free delivery on orders > ₹500",
    },
    {
      id: "intern",
      icon: Sparkles,
      badge: "Subsidized Care",
      title: "Intern & Student Subsidized Health Pass",
      subtitle: "₹199 flat consultations with verified medical leave letters",
      description:
        "Health support tailored for engineering, design, and management interns on stipends. Get genuine medical care without hospital bill shock, plus official leave certificates for HR.",
      capabilities: [
        "Subsidized ₹199 OPD visits with board-certified doctors",
        "Official doctor-signed medical sick leave certificates with QR code",
        "WhatsApp care team triage for urgent symptoms",
        "Late-night virtual OPD availability until 11:30 PM IST",
      ],
      ctaText: "Get Intern Health Pass",
      viewTarget: "telehealth",
      pricing: "₹199 Flat Fee",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#CBD7CE] selection:text-[#171717]">
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCommand={() => setCommandMenuOpen(true)}
      />

      <main className="flex-1 pt-32 pb-24">
        <div className="container max-w-6xl space-y-16">
          {/* Header Banner */}
          <div className="max-w-3xl space-y-4">
            <Badge variant="sage" className="gap-1.5">
              <Activity className="w-3.5 h-3.5 text-wellness" />
              <span>Full-Stack Remote Telehealth & Chronic RPM</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
              Healthcare engineered for the remote working ecosystem.
            </h1>
            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
              From tech neck rehabilitation and digital eye strain relief to 6:30 AM doorstep fasting blood draws and subsidized ₹199 intern OPD visits with verifiable medical leave letters.
            </p>
          </div>

          {/* Services Stack */}
          <div className="space-y-8">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-card hover:border-[#CBD7CE] hover:shadow-elevated transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  {/* Left Column: Info */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="w-10 h-10 rounded-2xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="sage">{svc.badge}</Badge>
                      <span className="text-xs font-mono text-wellness-dark font-semibold bg-wellness-light px-2.5 py-0.5 rounded-full">
                        {svc.pricing}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                        {svc.title}
                      </h2>
                      <p className="text-xs font-semibold text-wellness">
                        {svc.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed max-w-2xl">
                      {svc.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {svc.capabilities.map((cap) => (
                        <div
                          key={cap}
                          className="flex items-start gap-2 text-xs text-foreground font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-wellness shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: CTA & Action Box */}
                  <div className="lg:col-span-4 p-5 rounded-2xl bg-background-subtle border border-border flex flex-col justify-between space-y-4 text-center lg:text-left">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-foreground-muted tracking-wider">
                        Service Availability
                      </span>
                      <div className="text-xs font-bold text-foreground flex items-center justify-center lg:justify-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Instant Online Access Across India</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="sage"
                        size="md"
                        onClick={() => handleAction(svc.viewTarget)}
                        className="w-full justify-center gap-2 font-bold text-xs shadow-subtle h-10"
                      >
                        <span>{svc.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparative Care Matrix */}
          <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
            <div className="max-w-2xl space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                How FocusNext Compares to Traditional Healthcare
              </h3>
              <p className="text-xs text-foreground-secondary">
                Eliminating the 4-hour hospital waiting room penalty for busy Indian software professionals.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-foreground-muted uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Dimension</th>
                    <th className="py-3 px-4 font-bold text-wellness">FocusNext Health India</th>
                    <th className="py-3 px-4">Private Hospital OPD</th>
                    <th className="py-3 px-4">Local Neighborhood Clinic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-foreground">Average Wait Time</td>
                    <td className="py-3.5 px-4 font-bold text-wellness">~4 to 10 minutes (virtual)</td>
                    <td className="py-3.5 px-4 text-foreground-secondary">3 to 4 hours in waiting lobby</td>
                    <td className="py-3.5 px-4 text-foreground-secondary">45 to 90 minutes</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-foreground">Consultation Fee</td>
                    <td className="py-3.5 px-4 font-bold text-wellness">₹199 - ₹499 (80D eligible)</td>
                    <td className="py-3.5 px-4 text-foreground-secondary">₹1,000 - ₹2,500</td>
                    <td className="py-3.5 px-4 text-foreground-secondary">₹500 - ₹800</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-foreground">Doctor Qualification</td>
                    <td className="py-3.5 px-4 font-bold text-wellness">Top AIIMS & CMC Vellore Alums</td>
                    <td className="py-3.5 px-4 text-foreground-secondary">Senior Consultants</td>
                    <td className="py-3.5 px-4 text-foreground-secondary">General MBBS / Variable</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-foreground">Diagnostic Lab Collection</td>
                    <td className="py-3.5 px-4 font-bold text-wellness">6:30 AM Doorstep Fasting Draw</td>
                    <td className="py-3.5 px-4 text-foreground-secondary">Must travel to hospital lab</td>
                    <td className="py-3.5 px-4 text-foreground-secondary">Third-party sample pickup</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-foreground">Medical Leave Certificate</td>
                    <td className="py-3.5 px-4 font-bold text-wellness">Digital NMC PDF with QR Verification</td>
                    <td className="py-3.5 px-4 text-foreground-secondary">Manual paper slip (often delayed)</td>
                    <td className="py-3.5 px-4 text-foreground-secondary">Handwritten slip</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <PatientAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => router.push("/app")}
      />

      <FloatingHealthDock
        onOpenCommand={() => setCommandMenuOpen(true)}
        onOpenConsult={() => handleAction("telehealth")}
      />

      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
        onOpenCertificate={() => setCertModalOpen(true)}
      />

      <MedicalCertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
      />
    </div>
  );
}
