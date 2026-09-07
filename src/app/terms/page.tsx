"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { PatientAuthModal } from "@/components/auth/PatientAuthModal";
import { CommandMenu } from "@/components/common/CommandMenu";
import {
  ShieldCheck,
  AlertTriangle,
  Scale,
  Calendar,
  Building,
  CheckCircle2,
  Stethoscope,
} from "lucide-react";

export default function TermsPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#CBD7CE] selection:text-[#171717]">
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCommand={() => setCommandMenuOpen(true)}
      />

      <main className="flex-1 pt-32 pb-24">
        <div className="container max-w-4xl space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-border pb-8">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="sage" className="gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
                <span>NMC Telemedicine Guidelines 2020</span>
              </Badge>
              <Badge variant="outline">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Effective Date: September 2026</span>
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Terms & Conditions of Service
            </h1>

            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
              These terms govern your access to virtual OPD consultations, remote patient telemetry, diagnostic blood sample draws, and 45-minute pharmacy fulfillment provided by FocusNext Health Technologies Private Limited.
            </p>
          </div>

          {/* Critical Emergency Disclaimer Box */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>STATUTORY NOTICE: Non-Emergency Outpatient Telehealth Service</span>
            </div>
            <p className="leading-relaxed">
              FocusNext Health India is an outpatient digital clinic. It is <strong>NOT</strong> an emergency medical facility. If you or someone you know is experiencing acute chest pain, sudden breathlessness, loss of consciousness, stroke-like symptoms, or severe trauma, you must call <strong className="text-red-700">112 (National Emergency)</strong> or <strong className="text-red-700">108 (State Ambulance)</strong> immediately or report to the nearest hospital casualty emergency ward.
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-10 text-sm leading-relaxed text-foreground-secondary">
            {/* Section 1: Agreement to Terms */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Scale className="w-5 h-5 text-wellness shrink-0" />
                <span>1. Legal Agreement & Eligibility</span>
              </h2>
              <p>
                By registering an account, booking an OPD consultation, or accessing the portal, you confirm that you are at least 18 years of age, a resident of India, and legally capable of entering into binding contracts under the Indian Contract Act, 1872. If accessing services on behalf of a minor or dependent parent, you represent that you are their lawful guardian.
              </p>
            </section>

            {/* Section 2: Telemedicine Practice Guidelines */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-wellness shrink-0" />
                <span>2. Medical Scope & Physician Discretion (NMC 2020)</span>
              </h2>
              <p>
                All telemedicine consultations on FocusNext are conducted exclusively by Registered Medical Practitioners (RMPs) licensed by State Medical Councils or the National Medical Commission (NMC):
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-foreground-secondary">
                <li><strong>Clinical Judgment:</strong> The attending physician exercises independent clinical judgment. If the doctor determines that your symptoms require physical palpation, emergency auscultation, or in-person evaluation, they reserve the right to decline online treatment and refer you to an in-person hospital.</li>
                <li><strong>Prescription Limitations:</strong> In compliance with the Drugs and Cosmetics Act, 1940 and NMC Guidelines, our physicians will NOT prescribe Schedule X drugs (e.g. narcotics, habit-forming psychotropics) via telemedicine.</li>
                <li><strong>Medical Records:</strong> Digital consultation summaries and valid e-prescriptions with the doctor&apos;s registration number are permanently accessible in your ABHA Patient Portal.</li>
              </ul>
            </section>

            {/* Section 3: Diagnostic Lab & Doorstep Phlebotomy */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Building className="w-5 h-5 text-wellness shrink-0" />
                <span>3. Doorstep Diagnostic Blood Sample Collection</span>
              </h2>
              <p>
                Home sample collection is fulfilled in partnership with NABL and CAP-accredited diagnostic laboratories, including <strong>Dr Lal PathLabs</strong> and <strong>Tata 1mg</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-foreground-secondary">
                <li>Patients must observe fasting instructions (typically 10-12 hours for lipid/sugar profiles) as displayed during booking.</li>
                <li>Certified phlebotomists adhere to strict cold-chain protocols (2°C - 8°C) using single-use, sterile BD Vacutainer® needle seals.</li>
                <li>Diagnostic reports are digital documents certified by qualified pathologists and synchronized with your ABHA ID under the ABDM framework.</li>
              </ul>
            </section>

            {/* Section 4: 45-Min Pharmacy Delivery */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-wellness shrink-0" />
                <span>4. Express Pharmacy Orders & OTC Wellness Supplies</span>
              </h2>
              <p>
                Express medicine and ergonomics delivery is operated through licensed retail pharmacies (including Apollo Pharmacy and Tata 1mg):
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-foreground-secondary">
                <li>Prescription drugs are dispensed solely upon verification of a valid doctor&apos;s prescription by a licensed pharmacist.</li>
                <li>Delivery times (approx. 45 mins) are subject to local traffic and weather conditions in serviceable tech corridors.</li>
                <li>Delivery confirmation requires verification of the 4-digit SMS OTP and unbroken holographic security seals.</li>
              </ul>
            </section>

            {/* Section 5: Governing Law & Jurisdiction */}
            <section className="space-y-3 pt-4 border-t border-border">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Scale className="w-5 h-5 text-wellness shrink-0" />
                <span>5. Governing Law & Dispute Resolution</span>
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the substantive laws of India. Any legal dispute, controversy, or claim arising out of or relating to your use of FocusNext services shall be subject to the exclusive territorial jurisdiction of the competent civil courts at <strong>Bengaluru, Karnataka, India</strong>.
              </p>
            </section>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-foreground-secondary">
            <Link href="/privacy-policy" className="hover:text-wellness font-semibold transition-colors">
              ← View Privacy Policy (DPDP Act)
            </Link>
            <Link href="/refund-policy" className="hover:text-wellness font-semibold transition-colors">
              Refund & Cancellation Policy →
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <PatientAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
      />
    </div>
  );
}
