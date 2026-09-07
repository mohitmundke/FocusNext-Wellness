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
  Lock,
  Database,
  UserCheck,
  Building,
  Mail,
  Scale,
  Calendar,
} from "lucide-react";

export default function PrivacyPolicyPage() {
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
                <span>DPDP Act 2023 Compliant</span>
              </Badge>
              <Badge variant="outline">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Last Updated: September 2026</span>
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Privacy & Health Data Protection Policy
            </h1>

            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
              FocusNext Health Technologies Private Limited is committed to the highest standards of digital health privacy, strict data minimization, and patient sovereignty under Indian law.
            </p>
          </div>

          {/* Statutory Reference Notice */}
          <div className="p-5 rounded-2xl bg-wellness-light/40 border border-wellness/30 text-xs sm:text-sm text-foreground-secondary space-y-2">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <Scale className="w-4 h-4 text-wellness shrink-0" />
              <span>Governing Legal Frameworks (India)</span>
            </div>
            <p className="leading-relaxed">
              This Privacy Policy is issued in strict accordance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the <strong>Information Technology Act, 2000</strong> read with the <strong>SPDI Rules, 2011</strong>, the <strong>National Medical Commission (NMC) Telemedicine Practice Guidelines (2020)</strong>, and the <strong>Ayushman Bharat Digital Mission (ABDM) Data Privacy Framework</strong>.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-10 text-sm leading-relaxed text-foreground-secondary">
            {/* Section 1: Entity & Fiduciary Identity */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Building className="w-5 h-5 text-wellness shrink-0" />
                <span>1. Data Fiduciary Identity & Corporate Details</span>
              </h2>
              <p>
                Under the DPDP Act 2023, the designated Data Fiduciary responsible for your personal and health data is:
              </p>
              <div className="p-4 rounded-xl bg-background-subtle border border-border text-xs sm:text-sm space-y-1 font-mono text-foreground">
                <p><strong>Entity:</strong> FocusNext Health Technologies Private Limited</p>
                <p><strong>Corporate Identification Number (CIN):</strong> U72900KA2024PTC189421</p>
                <p><strong>Registered Office:</strong> 4th Floor, Salarpuria Hallmark, Outer Ring Road, Kadubeesanahalli, Bellandur, Bengaluru, Karnataka 560103</p>
                <p><strong>Official Email:</strong> privacy@focusnexthealth.in • <strong>Helpline:</strong> 1800-889-2040</p>
              </div>
            </section>

            {/* Section 2: Data Minimization */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Database className="w-5 h-5 text-wellness shrink-0" />
                <span>2. Principle of Data Minimization (What We Collect)</span>
              </h2>
              <p>
                We adhere strictly to the principle of purpose specification and data minimization. We collect only the data necessary to provide clinical consultations, diagnostic phlebotomy, and pharmacy fulfillment:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-foreground-secondary">
                <li><strong>Patient Identity Data:</strong> Full legal name, mobile number, email address, age/DOB, and gender.</li>
                <li><strong>ABHA Digital Health Identifiers:</strong> 14-digit Ayushman Bharat Health Account (ABHA) number (e.g., 91-4421-8890-1204) and ABHA address for National Health Authority EHR linking.</li>
                <li><strong>Clinical Telemetry & Vitals:</strong> Blood pressure, blood glucose, heart rate, and SpO2 synced voluntarily from paired devices (e.g. Omron, Accu-Chek).</li>
                <li><strong>Diagnostic & Delivery Meta:</strong> Postal PIN code and doorstep address strictly for phlebotomy sample collection (Dr Lal PathLabs/Tata 1mg) and 45-min pharmacy dispatch (Apollo Pharmacy).</li>
              </ul>
              <p className="font-semibold text-foreground">
                We NEVER sell, monetize, rent, or trade your personal or health data to commercial third parties or data brokers.
              </p>
            </section>

            {/* Section 3: Data Storage & Sovereignty */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Lock className="w-5 h-5 text-wellness shrink-0" />
                <span>3. Data Sovereignty & Encryption Standards</span>
              </h2>
              <p>
                All personal and digital health records are stored strictly within the sovereign territory of the Republic of India:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-foreground-secondary">
                <li><strong>Data Center Locations:</strong> MeitY-empanelled and ISO/IEC 27001 certified cloud data facilities in Mumbai (West) and Bengaluru (South).</li>
                <li><strong>Encryption at Rest & in Transit:</strong> AES-256 military-grade encryption for all database records at rest, and TLS 1.3 encryption for all data in transit.</li>
                <li><strong>Zero Cross-Border Transfers:</strong> Your sensitive personal data and electronic medical records are never transferred outside India without explicit statutory authority.</li>
              </ul>
            </section>

            {/* Section 4: Patient Rights under DPDP Act */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-wellness shrink-0" />
                <span>4. Your Statutory Rights as a Data Principal</span>
              </h2>
              <p>Under Chapter III of the DPDP Act 2023, you hold full autonomy over your data:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl border border-border bg-surface space-y-1">
                  <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">Right to Access</h3>
                  <p className="text-xs text-foreground-secondary">
                    Request a full summary of your personal and clinical data being processed and the identities of data processors (e.g. labs).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-border bg-surface space-y-1">
                  <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">Right to Correction & Erasure</h3>
                  <p className="text-xs text-foreground-secondary">
                    Correct outdated information or request data erasure (subject to mandatory 3-year medical record retention under NMC rules).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-border bg-surface space-y-1">
                  <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">Right of Grievance Redressal</h3>
                  <p className="text-xs text-foreground-secondary">
                    Register complaints with our Data Protection Officer, with guaranteed escalation to the Data Protection Board of India.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-border bg-surface space-y-1">
                  <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">Right to Nominate</h3>
                  <p className="text-xs text-foreground-secondary">
                    Designate an individual who shall, in the event of death or incapacity, exercise your health data rights.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Grievance Officer & Contact */}
            <section className="space-y-3 pt-4 border-t border-border">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Mail className="w-5 h-5 text-wellness shrink-0" />
                <span>5. Data Protection Officer & Grievance Redressal</span>
              </h2>
              <p>
                If you have questions, require data access/deletion, or wish to file a grievance under Section 13 of the DPDP Act 2023, please contact our designated Grievance Officer:
              </p>
              <div className="p-5 rounded-2xl bg-surface border border-border shadow-card space-y-2 text-xs sm:text-sm">
                <p className="font-bold text-foreground text-base">Mr. Advaith Nambiar</p>
                <p className="text-wellness-dark font-semibold">Data Protection Officer & Head of Regulatory Compliance</p>
                <p>FocusNext Health Technologies Private Limited</p>
                <p>4th Floor, Salarpuria Hallmark, Outer Ring Road, Bellandur, Bengaluru 560103, Karnataka, India</p>
                <p className="pt-2">
                  <strong>Direct Grievance Email:</strong>{" "}
                  <a href="mailto:grievance@focusnexthealth.in" className="text-wellness font-semibold hover:underline">
                    grievance@focusnexthealth.in
                  </a>
                </p>
                <p className="text-[11px] text-foreground-muted">
                  Statutory SLA: Formal acknowledgement within 48 hours; full resolution within 15 calendar days.
                </p>
              </div>
            </section>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-foreground-secondary">
            <Link href="/terms" className="hover:text-wellness font-semibold transition-colors">
              ← View Terms & Conditions
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
