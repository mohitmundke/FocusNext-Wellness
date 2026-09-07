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
import { DoctorBookingModal } from "@/components/common/DoctorBookingModal";
import {
  Check,
  Receipt,
  FileCheck,
} from "lucide-react";

export default function PricingPage() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const handleSelectPlan = (planId: string) => {
    if (planId === "opd-payg") {
      setBookingModalOpen(true);
      return;
    }

    if (planId === "desk-ergo") {
      router.push("/app?view=posture");
      return;
    }

    if (planId === "chronic-rpm") {
      router.push("/app?view=vitals");
      return;
    }

    if (planId === "family-senior") {
      router.push("/app?view=family");
      return;
    }

    router.push("/app");
  };

  const plans = [
    {
      id: "opd-payg",
      name: "Instant Virtual OPD",
      badge: "Most Popular for Acute Care",
      popular: false,
      priceMonthly: 199,
      priceAnnual: 199,
      period: "per consultation",
      description: "Fast on-demand consultation with board-certified AIIMS doctors for acute illness, fever, and medical sick leave.",
      features: [
        "10-minute HD video consultation with AIIMS/CMC physician",
        "NMC digital e-prescription transmitted to Apollo Pharmacy",
        "Official doctor-signed medical sick leave certificate with QR code",
        "ABDM health locker automatic sync",
        "24-hour follow-up chat with care team",
      ],
      cta: "Book Instant OPD (₹199)",
      variant: "outline" as const,
    },
    {
      id: "desk-ergo",
      name: "Desk Spine & Ergonomics PT",
      badge: "Remote Tech Special",
      popular: true,
      priceMonthly: 499,
      priceAnnual: 499,
      period: "per 30-min evaluation",
      description: "Dedicated workstation ergonomics audit and virtual physical therapy session for chronic neck, shoulder, and back strain.",
      features: [
        "30-minute virtual 1-on-1 with CMC Vellore rehabilitation doctor",
        "Cervical spine & thoracic mobility audit",
        "Custom 10-minute daily desk exercise protocol",
        "Rental chair & monitor workstation ergonomic assessment",
        "20-20-20 ophthalmology eye strain recovery plan",
      ],
      cta: "Book Spine Physical Therapy",
      variant: "sage" as const,
    },
    {
      id: "chronic-rpm",
      name: "Chronic Care RPM",
      badge: "Hypertension & Diabetes",
      popular: false,
      priceMonthly: 999,
      priceAnnual: 799,
      period: "per month",
      description: "Continuous remote monitoring with cellular Omron BP or Accu-Chek hardware, proactive physician reviews, and lab sync.",
      features: [
        "Cellular Omron BP or Accu-Chek hardware kit delivered",
        "Daily telemetry vitals streaming with AI anomaly detection",
        "Unlimited virtual follow-ups with assigned physician",
        "Quarterly doorstep fasting blood profile (Dr Lal PathLabs)",
        "Automated Apollo Pharmacy monthly medication refills",
      ],
      cta: "Start Chronic Care RPM",
      variant: "outline" as const,
    },
    {
      id: "geriatric-rpm",
      name: "Senior Parents RPM",
      badge: "Elderly Care Across India",
      popular: false,
      priceMonthly: 1999,
      priceAnnual: 1599,
      period: "per month",
      description: "Comprehensive geriatric remote care for aging parents living independently in Indian tier-1/2/3 cities.",
      features: [
        "Dedicated senior geriatric care manager & assigned AIIMS physician",
        "Connected cellular hardware kit (BP, Glucose, Pulse Oximeter)",
        "24/7 National Emergency 112 & 108 SOS dispatch integration",
        "Weekly parent wellness check-in call with child briefing",
        "Doorstep medication reconciliation & delivery management",
      ],
      cta: "Protect Aging Parents",
      variant: "outline" as const,
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
          <div className="max-w-3xl space-y-4 text-center mx-auto">
            <Badge variant="sage" className="gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-wellness" />
              <span>Transparent INR (₹) Pricing • Zero Hidden Fees</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
              Clinical-grade healthcare priced fairly for every Indian.
            </h1>
            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
              No expensive hospital registration fees or unexpected charges. Pay per consultation or subscribe to full-stack remote monitoring with doorstep lab collections.
            </p>

            {/* Monthly vs Annual Toggle */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-semibold ${billingCycle === "monthly" ? "text-foreground" : "text-foreground-muted"}`}>
                Monthly Billing
              </span>
              <button
                type="button"
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                className="w-12 h-6 rounded-full bg-wellness-light border border-wellness/40 p-0.5 transition-colors relative"
                aria-label="Toggle billing cycle"
              >
                <div
                  className={`w-5 h-5 rounded-full bg-wellness transition-transform ${
                    billingCycle === "annual" ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-semibold ${billingCycle === "annual" ? "text-foreground" : "text-foreground-muted"}`}>
                  Annual Billing
                </span>
                <span className="text-[10px] font-bold text-wellness-dark bg-wellness-light border border-wellness/30 px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {plans.map((plan) => {
              const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;
              return (
                <div
                  key={plan.id}
                  className={`p-6 rounded-3xl bg-surface border shadow-card flex flex-col justify-between space-y-6 transition-all relative ${
                    plan.popular
                      ? "border-wellness ring-2 ring-wellness/20 shadow-elevated"
                      : "border-border hover:border-[#CBD7CE]"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-wellness text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-subtle">
                      Recommended
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Badge variant="sage">{plan.badge}</Badge>
                      <h2 className="text-lg font-bold text-foreground">{plan.name}</h2>
                      <p className="text-xs text-foreground-secondary leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-foreground">₹{price}</span>
                        <span className="text-xs text-foreground-muted font-medium">/{plan.period}</span>
                      </div>
                      <span className="text-[10px] text-foreground-muted">All taxes included • 80D eligible</span>
                    </div>

                    <ul className="space-y-2.5 pt-2 text-xs text-foreground font-medium">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-wellness shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button
                      variant={plan.variant}
                      size="md"
                      onClick={() => handleSelectPlan(plan.id)}
                      className="w-full justify-center text-xs font-bold shadow-subtle h-10"
                    >
                      <span>{plan.cta}</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section 80D Tax Benefit Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-card grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-wellness" />
                <span className="text-xs font-bold uppercase tracking-wider text-wellness-dark">
                  Indian Income Tax Act (Section 80D)
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                Save up to ₹5,000 in Income Tax on Preventive Health Checkups
              </h3>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Under Section 80D of the Indian Income Tax Act, payments made for preventive health checkups, diagnostic labs, and remote physician consultations qualify for annual deductions up to ₹5,000 for yourself and up to ₹7,000 for senior citizen parents. We generate compliant GST invoices with doctor registration numbers automatically.
              </p>
            </div>
            <div className="md:col-span-4 p-4 rounded-2xl bg-background-subtle border border-border space-y-2 text-xs">
              <div className="font-bold text-foreground">Instant Tax Invoices:</div>
              <div className="flex items-center gap-2 text-foreground-secondary">
                <Check className="w-3.5 h-3.5 text-wellness" />
                <span>GST Tax compliant receipts</span>
              </div>
              <div className="flex items-center gap-2 text-foreground-secondary">
                <Check className="w-3.5 h-3.5 text-wellness" />
                <span>Verified Doctor Registration numbers</span>
              </div>
              <div className="flex items-center gap-2 text-foreground-secondary">
                <Check className="w-3.5 h-3.5 text-wellness" />
                <span>Downloadable PDF from ABHA locker</span>
              </div>
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
        onOpenConsult={() => handleSelectPlan("opd-payg")}
      />

      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
        onOpenCertificate={() => setCertModalOpen(true)}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      <MedicalCertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
      />

      {/* Doctor Video OPD Booking Modal */}
      <DoctorBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
