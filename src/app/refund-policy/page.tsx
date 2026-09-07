"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { PatientAuthModal } from "@/components/auth/PatientAuthModal";
import { CommandMenu } from "@/components/common/CommandMenu";
import {
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  CreditCard,
  Building,
} from "lucide-react";

export default function RefundPolicyPage() {
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
                <span>Consumer Protection (E-Commerce) Rules 2020</span>
              </Badge>
              <Badge variant="outline">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Last Revised: September 2026</span>
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Refund & Cancellation Policy
            </h1>

            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
              Transparent, patient-first refund timelines for doctor video consultations, doorstep diagnostic lab collections, and express pharmacy deliveries across India.
            </p>
          </div>

          {/* Refund Guarantee Callout */}
          <div className="p-6 rounded-3xl bg-wellness-light/50 border border-wellness/30 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <CheckCircle2 className="w-5 h-5 text-wellness" />
                <span>100% Money-Back Satisfaction Commitment</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                If a doctor does not join the video OPD, or if an appointment is cancelled with notice, your payment is automatically refunded to your original payment method.
              </p>
            </div>
            <Badge variant="sage" className="shrink-0 font-mono">
              5-7 Business Days SLA
            </Badge>
          </div>

          {/* Policy Breakdown */}
          <div className="space-y-10 text-sm leading-relaxed text-foreground-secondary">
            {/* 1. Doctor Video OPD Consultations */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-wellness shrink-0" />
                <span>1. Doctor Video OPD Consultations</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-surface border border-border space-y-1.5">
                  <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">
                    Cancellation &gt; 1 Hour in Advance
                  </h3>
                  <p className="text-xs text-foreground-secondary">
                    <strong>100% Full Refund:</strong> If you cancel more than 60 minutes prior to your scheduled consultation slot, you receive an immediate, full refund.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-border space-y-1.5">
                  <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">
                    Doctor Non-Attendance / Tech Disruption
                  </h3>
                  <p className="text-xs text-foreground-secondary">
                    <strong>100% Refund or Instant Rebook:</strong> If the attending specialist is unavailable due to medical emergency or network failure, you can choose an instant full refund or immediate re-assignment.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-border space-y-1.5">
                  <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">
                    Cancellation &lt; 1 Hour in Advance
                  </h3>
                  <p className="text-xs text-foreground-secondary">
                    <strong>Free Reschedule:</strong> Cancellations made within 60 minutes of the slot qualify for one free rescheduling within 7 calendar days.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-border space-y-1.5">
                  <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">
                    Completed Consultations
                  </h3>
                  <p className="text-xs text-foreground-secondary">
                    Once the medical consultation has taken place and a clinical prescription/summary has been issued by the doctor, consultation fees are non-refundable.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. 6:30 AM Doorstep Blood Draw */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-wellness shrink-0" />
                <span>2. Doorstep Diagnostic Sample Collection (Dr Lal &amp; 1mg)</span>
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-foreground-secondary">
                <li><strong>Prior to Phlebotomist Dispatch:</strong> 100% full refund if cancelled via the patient portal before the technician departs for your address.</li>
                <li><strong>Sample Inviability / Vein Access Difficulties:</strong> If a phlebotomist is unable to obtain a sample due to physiological difficulty, we offer a complimentary secondary attempt by a senior phlebotomist or a 100% complete refund.</li>
                <li><strong>Processed Lab Tests:</strong> Once blood samples are deposited at the NABL central testing laboratory and processed, laboratory costs are non-refundable.</li>
              </ul>
            </section>

            {/* 3. Pharmacy & Medicine Orders */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-wellness shrink-0" />
                <span>3. 45-Minute Pharmacy Delivery &amp; OTC Supplies</span>
              </h2>
              <p>
                Under the Drugs and Cosmetics Rules, 1945, pharmaceutical products cannot be returned once delivered and unsealed, for public health and hygienic reasons. However:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-foreground-secondary">
                <li><strong>Damaged / Broken Hologram Seal:</strong> If the packaging seal is broken or tampered with upon delivery, refuse the parcel. An instant free replacement or 100% refund will be issued immediately.</li>
                <li><strong>Incorrect Item Dispensed:</strong> If a dispensed drug differs from the doctor&apos;s digital e-prescription, we dispatch the correct medication within 30 minutes at zero additional charge or issue a full refund.</li>
              </ul>
            </section>

            {/* 4. Refund Processing Windows */}
            <section className="space-y-3 pt-4 border-t border-border">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Building className="w-5 h-5 text-wellness shrink-0" />
                <span>4. Refund Timelines &amp; Methods</span>
              </h2>
              <p>Refunds are credited directly to the original source payment method in adherence to Reserve Bank of India (RBI) turnaround regulations:</p>
              <div className="p-4 rounded-xl bg-background-subtle border border-border space-y-1 font-mono text-xs sm:text-sm text-foreground">
                <p>• <strong>UPI (GPay / PhonePe / Paytm):</strong> 24 to 48 banking hours</p>
                <p>• <strong>Debit / Credit Cards (RuPay, Visa, Mastercard):</strong> 3 to 5 business days</p>
                <p>• <strong>Net Banking (SBI, HDFC, ICICI, Axis):</strong> 5 to 7 business days</p>
              </div>
              <p className="text-xs text-foreground-secondary pt-2">
                For refund tracking or payment discrepancies, email our finance desk at{" "}
                <a href="mailto:billing@focusnexthealth.in" className="text-wellness font-semibold hover:underline">
                  billing@focusnexthealth.in
                </a>{" "}
                with your Booking Reference ID (DLPL-XXXXX or APL-XXXXX).
              </p>
            </section>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-foreground-secondary">
            <Link href="/privacy-policy" className="hover:text-wellness font-semibold transition-colors">
              ← View Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-wellness font-semibold transition-colors">
              Terms &amp; Conditions →
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
