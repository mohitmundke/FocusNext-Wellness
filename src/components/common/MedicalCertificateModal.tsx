"use client";

import React, { useRef } from "react";
import { useHealth } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  X,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface MedicalCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  customDiagnosis?: string;
  customDays?: number;
}

export function MedicalCertificateModal({
  isOpen,
  onClose,
  customDiagnosis,
  customDays = 2,
}: MedicalCertificateModalProps) {
  const { patient } = useHealth();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const today = new Date();
  const returnDate = new Date(today);
  returnDate.setDate(today.getDate() + customDays);

  const formattedToday = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedReturn = returnDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const diagnosis =
    customDiagnosis ||
    (patient?.chronicConditions?.[0]
      ? `${patient.chronicConditions[0]} & Workstation Physical Strain`
      : "Acute Cervical Spine Posture Strain (Tech Neck) & Screen Migraine");

  const handlePrint = () => {
    window.print();
    toast.success("Opening print / PDF export dialog.");
  };

  const handleDownload = () => {
    toast.success("Medical Certificate downloaded as official PDF.");
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in-50 duration-200">
      <div className="bg-surface rounded-3xl border border-border shadow-elevated w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-background-subtle">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-wellness" />
            <h3 className="font-bold text-foreground text-sm sm:text-base">
              Official Medical Sick Leave Certificate
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border border-border text-foreground-secondary hover:text-foreground hover:bg-surface transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Certificate Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6" ref={printRef}>
          {/* Certificate Header / Letterhead */}
          <div className="border-b-2 border-wellness/40 pb-5 text-center space-y-1 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wellness-light text-wellness-dark font-bold text-[10px] tracking-wider uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NMC Telemedicine Practice Guidelines (2020) Compliant</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-serif">
              FocusNext Health — Virtual OPD Clinic
            </h2>
            <p className="text-xs text-foreground-secondary font-sans">
              Ayushman Bharat Digital Mission (ABDM) Registered Healthcare Provider
            </p>
            <p className="text-[11px] text-foreground-muted font-mono">
              National Medical Facility Code: IN-DL-AIIMS-VOPD-88219 • PAN-India Tele-OPD
            </p>
          </div>

          {/* Attending Doctor Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-background-subtle border border-border text-xs">
            <div>
              <div className="font-bold text-foreground text-sm">
                Dr. Ananya Iyer, MD (Internal Medicine)
              </div>
              <div className="text-foreground-secondary">
                Alumna, All India Institute of Medical Sciences (AIIMS New Delhi)
              </div>
              <div className="text-[11px] font-mono text-wellness-dark font-semibold mt-0.5">
                NMC Registration No: DMC-48912/2014 • Active Telemedicine License
              </div>
            </div>
            <Badge variant="sage" className="shrink-0 self-start sm:self-auto">
              Verified Practitioner
            </Badge>
          </div>

          {/* Certificate Body Paragraph */}
          <div className="space-y-4 text-xs sm:text-sm text-foreground leading-relaxed">
            <div className="text-right text-xs text-foreground-secondary font-mono">
              Date of Issue: <strong>{formattedToday}</strong>
            </div>

            <p>
              This is to certify that{" "}
              <strong className="text-foreground underline decoration-wellness/50 underline-offset-4">
                {patient?.name || "Aarav Sharma"}
              </strong>
              , aged <strong>{patient?.dob?.match(/\d+/)?.[0] || "29"} years</strong>, bearing
              National ABHA ID{" "}
              <strong className="font-mono text-wellness-dark">
                {patient?.abhaId || "91-4421-8890-1204"}
              </strong>
              , was clinically examined via high-definition Virtual OPD video consultation on{" "}
              <strong>{formattedToday}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-surface border border-border shadow-subtle space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-foreground-secondary">
                Clinical Diagnosis & Observations:
              </div>
              <div className="text-sm font-semibold text-foreground">
                {diagnosis}
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Patient presented with symptomatic postural spinal strain, severe cervical muscle tightness, and secondary screen-induced headache resulting from prolonged sedentary desk hours.
              </p>
            </div>

            <p>
              In my clinical opinion, the patient is currently unfit to continue normal screen and desk work duties. I advise complete medical rest for a duration of{" "}
              <strong className="text-wellness-dark font-bold">{customDays} Days</strong>, from{" "}
              <strong>{formattedToday}</strong> to <strong>{formattedReturn}</strong> (inclusive).
            </p>

            <p className="text-xs text-foreground-secondary">
              Expected date of resumption of duties: <strong>{formattedReturn}</strong>, subject to ergonomic physical therapy compliance and resolution of acute symptoms.
            </p>
          </div>

          {/* Footer with Verification QR Code & Digital Signature */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Simulated QR Code for HR Verification */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-background-subtle border border-border">
              <div className="w-14 h-14 bg-white border border-border rounded-xl p-1 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-full h-full text-foreground" fill="currentColor">
                  <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-5 0h2v3h-2v-3zm3 3h2v2h-2v-2zm-3 2h3v3h-3v-3zm5 0h3v3h-3v-3z" />
                </svg>
              </div>
              <div className="text-[11px] leading-tight text-foreground-secondary">
                <div className="font-bold text-foreground">Scan to Verify</div>
                <div>NMC QR Authentication</div>
                <div className="text-[9px] font-mono text-wellness-dark">cert.focusnext.health/v/{patient?.abhaId?.slice(-4) || "1204"}</div>
              </div>
            </div>

            {/* Doctor Signature Stamp */}
            <div className="text-center sm:text-right space-y-1">
              <div className="inline-block border-b border-dashed border-foreground-muted pb-1 px-4">
                <span className="font-serif italic text-base font-bold text-wellness-dark">
                  Dr. Ananya Iyer, MD
                </span>
              </div>
              <div className="text-[10px] text-foreground-muted">
                Digitally Signed with Aadhar / ABHA e-Sign
              </div>
              <div className="text-[9px] font-mono text-foreground-muted">
                Timestamp: {formattedToday} 11:24 IST
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-background-subtle border-t border-border flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-foreground-secondary">
            <CheckCircle2 className="w-4 h-4 text-wellness" />
            <span>Valid for Darwinbox, Keka, Zoho People & College Leave</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              className="gap-1.5 text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </Button>
            <Button
              variant="sage"
              size="sm"
              onClick={handleDownload}
              className="gap-1.5 text-xs font-semibold shadow-subtle"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
