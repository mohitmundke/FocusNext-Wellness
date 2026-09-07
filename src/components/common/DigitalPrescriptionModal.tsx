"use client";

import React, { useRef } from "react";
import { useHealth } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  QrCode,
  Pill,
} from "lucide-react";
import { toast } from "sonner";
import { soundFx } from "@/lib/sound";

interface DigitalPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescriptionId?: string;
}

export function DigitalPrescriptionModal({
  isOpen,
  onClose,
  prescriptionId,
}: DigitalPrescriptionModalProps) {
  const { patient, prescriptions } = useHealth();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentPatient = patient || {
    name: "Aarav Sharma",
    age: 29,
    gender: "Male",
    abhaId: "91-4421-8890-1204",
    phone: "+91 98765 43210",
    city: "Bengaluru",
    pinCode: "560103",
  };

  const selectedRx = prescriptionId
    ? prescriptions.find((p) => p.id === prescriptionId)
    : null;

  const rxList = selectedRx ? [selectedRx] : prescriptions;

  const handlePrint = () => {
    soundFx.playSoftClick(true);
    window.print();
  };

  const handleDownloadPdf = () => {
    soundFx.playChime(true);
    toast.success("Downloading Official NMC e-Prescription (PDF)...");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-surface rounded-3xl border border-border shadow-2xl flex flex-col overflow-hidden text-foreground"
        role="dialog"
        aria-modal="true"
        aria-labelledby="prescription-modal-title"
      >
        {/* Modal Action Header (Excluded from Print) */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h2 id="prescription-modal-title" className="text-base font-bold text-foreground flex items-center gap-2">
                Official NMC e-Prescription
                <Badge variant="sage">ABDM Verified</Badge>
              </h2>
              <p className="text-xs text-foreground-secondary">
                National Medical Commission (NMC) Telemedicine Practice Guidelines 2020 Compliant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              className="text-xs gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownloadPdf}
              className="text-xs gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </Button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-foreground-secondary hover:text-foreground hover:bg-background-subtle transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Prescription Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-foreground print:p-0 print:overflow-visible" ref={printRef}>
          {/* Clinic & Doctor Letterhead */}
          <div className="border-b-2 border-wellness/40 pb-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-wellness-dark font-extrabold text-xl tracking-tight">
                  <span className="w-3 h-3 rounded-full bg-wellness inline-block" />
                  <span>FOCUSNEXT HEALTH TELEMEDICINE CENTRE</span>
                </div>
                <p className="text-xs text-foreground-secondary mt-0.5">
                  Ayushman Bharat Digital Mission (ABDM) Health Facility Registry ID: HFR-KA-BLR-09412
                </p>
                <p className="text-xs text-foreground-muted">
                  Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103 • Tel: 1800-889-2040
                </p>
              </div>

              <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-border">
                <h3 className="text-sm font-bold text-foreground">Dr. Ananya Iyer, MD (Internal Medicine)</h3>
                <p className="text-xs text-wellness-dark font-semibold">AIIMS New Delhi Alumna</p>
                <p className="text-xs font-mono text-foreground-secondary">NMC / DMC Reg No: DMC-48912/2014</p>
                <p className="text-[11px] text-foreground-muted">Consultant Physician & Cardiometabolic Lead</p>
              </div>
            </div>
          </div>

          {/* Patient Demographics & Telehealth Visit Meta */}
          <div className="p-4 rounded-2xl bg-background-subtle border border-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-foreground-secondary block text-[11px]">Patient Legal Name:</span>
              <strong className="text-foreground text-sm">{currentPatient.name}</strong>
            </div>
            <div>
              <span className="text-foreground-secondary block text-[11px]">ABHA Health ID:</span>
              <span className="font-mono font-bold text-foreground">{currentPatient.abhaId}</span>
            </div>
            <div>
              <span className="text-foreground-secondary block text-[11px]">Date & Time:</span>
              <span className="font-semibold text-foreground">15 Aug 2026 • 03:30 PM IST</span>
            </div>
            <div>
              <span className="text-foreground-secondary block text-[11px]">Consultation Mode:</span>
              <span className="text-wellness-dark font-semibold">Encrypted Video OPD (ABDM M2)</span>
            </div>
          </div>

          {/* Clinical Telemetry & Examination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-border space-y-1 bg-surface">
              <span className="text-[11px] font-bold text-foreground-secondary uppercase tracking-wider block">
                Recorded Vitals (Omron / Accu-Chek)
              </span>
              <p className="text-foreground">
                <strong>Blood Pressure:</strong> 118/76 mmHg • <strong>Pulse:</strong> 68 bpm
              </p>
              <p className="text-foreground">
                <strong>Blood Glucose:</strong> 96 mg/dL (Fasting) • <strong>SpO2:</strong> 99%
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-border space-y-1 bg-surface">
              <span className="text-[11px] font-bold text-foreground-secondary uppercase tracking-wider block">
                Clinical Diagnosis / Impression
              </span>
              <p className="text-foreground font-semibold">
                Essential Hypertension (Stage 1 Controlled) & Postural Cervical Strain
              </p>
              <p className="text-foreground-secondary text-[11px]">
                ICD-10 Code: I10, M54.2 • Occupational ergonomic screen fatigue
              </p>
            </div>
          </div>

          {/* Rx Medication Table */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-wellness-dark font-extrabold text-base">
              <span className="text-xl font-serif">℞</span>
              <span>Prescribed Medications (Generic & Pharmacopeial)</span>
            </div>

            <div className="border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-background-subtle border-b border-border text-foreground-secondary uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Medication & Form</th>
                    <th className="p-3">Dosage</th>
                    <th className="p-3">Frequency & Timing</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Special Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rxList.map((rx, idx) => (
                    <tr key={rx.id} className="hover:bg-background-subtle/40">
                      <td className="p-3 font-mono text-foreground-muted">{idx + 1}</td>
                      <td className="p-3 font-bold text-foreground">{rx.medicationName}</td>
                      <td className="p-3 font-mono text-wellness-dark font-semibold">{rx.dosage}</td>
                      <td className="p-3 text-foreground">{rx.frequency}</td>
                      <td className="p-3 text-foreground font-semibold">30 Days</td>
                      <td className="p-3 text-foreground-secondary">{rx.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dietary & Lifestyle Advice */}
          <div className="p-4 rounded-2xl bg-wellness-light/30 border border-wellness/20 text-xs space-y-1.5">
            <span className="font-bold text-wellness-dark text-xs block">
              Ergonomic & Lifestyle Advice for Remote Workers:
            </span>
            <ul className="list-disc pl-4 space-y-1 text-foreground-secondary">
              <li>Adhere to 20-20-20 rule: Every 20 mins, look at an object 20 feet away for 20 seconds.</li>
              <li>Maintain monitor eye line level to alleviate C5-C6 cervical spine compressive load.</li>
              <li>Keep daily sodium intake below 2,000 mg (avoid packaged desk snacks and instant noodles).</li>
              <li>Hydrate with minimum 2.5L water daily; schedule morning brisk walk before 8:30 AM.</li>
            </ul>
          </div>

          {/* Doctor Signature Seal & Insurance QR Code */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 p-1.5 rounded-xl border border-border bg-surface flex items-center justify-center shadow-subtle shrink-0">
                <QrCode className="w-12 h-12 text-foreground" />
              </div>
              <div className="space-y-0.5 text-[11px] text-foreground-secondary">
                <span className="font-bold text-foreground flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
                  NMC Verified Digital Prescripton
                </span>
                <p>Scan to verify authenticity via ABDM National Health Authority.</p>
                <p>Eligible for Corporate Health Insurance (Plum, MediBuddy, Medi Assist).</p>
              </div>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <div className="font-serif italic text-lg text-wellness-dark font-bold tracking-wide">
                Dr. Ananya Iyer
              </div>
              <div className="h-0.5 w-40 bg-wellness/40 ml-auto" />
              <p className="text-[11px] font-bold text-foreground">Digitally Signed & Certified</p>
              <p className="text-[10px] text-foreground-muted font-mono">DMC-48912/2014 • Valid Across India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
