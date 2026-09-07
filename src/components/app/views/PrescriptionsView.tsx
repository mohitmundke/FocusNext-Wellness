"use client";

import React, { useState } from "react";
import { useHealth } from "@/lib/health-context";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Pill,
  RefreshCw,
  CheckCircle2,
  FileText,
  Printer,
  Zap,
  Clock,
  Bike,
  ShieldCheck,
} from "lucide-react";
import { MedicalCertificateModal } from "@/components/common/MedicalCertificateModal";
import { DigitalPrescriptionModal } from "@/components/common/DigitalPrescriptionModal";
import { PharmacyOrderModal } from "@/components/common/PharmacyOrderModal";

export function PrescriptionsView() {
  const { prescriptions, takeMedication, requestRefill } = useHealth();
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [rxModalOpen, setRxModalOpen] = useState(false);
  const [selectedRxId, setSelectedRxId] = useState<string | undefined>(undefined);
  const [pharmacyModalOpen, setPharmacyModalOpen] = useState(false);

  const handleOpenRxModal = (rxId?: string) => {
    setSelectedRxId(rxId);
    setRxModalOpen(true);
  };

  // Find any active processing delivery
  const activeDeliveries = prescriptions.filter(
    (rx) => rx.pharmacy.deliveryStatus === "Processing" || rx.pharmacy.deliveryStatus === "Out for Delivery"
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Prescriptions & Doorstep Medicine Delivery
            </h1>
            <Badge variant="sage">Apollo & Tata 1mg</Badge>
          </div>
          <p className="text-xs sm:text-sm text-foreground-secondary">
            Manage daily medication schedules, dosage compliance, and automated 45-min express delivery.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleOpenRxModal()}
            className="text-xs gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>NMC e-Prescription (PDF)</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setPharmacyModalOpen(true)}
            className="text-xs gap-1.5 shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>+ Order 45-Min Express</span>
          </Button>
        </div>
      </div>

      {/* Active Express Delivery Status Tracker */}
      {activeDeliveries.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-secondary uppercase tracking-wider flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5 text-wellness" />
              <span>Active 45-Minute Doorstep Pharmacy Deliveries ({activeDeliveries.length})</span>
            </span>
            <span className="text-[11px] font-semibold text-wellness flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Express Dispatch Active
            </span>
          </div>

          <div className="space-y-3">
            {activeDeliveries.map((rx) => (
              <div
                key={rx.id}
                className="p-5 sm:p-6 rounded-3xl bg-surface border border-wellness/40 shadow-card flex flex-col justify-between space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-base text-foreground">
                      {rx.medicationName}
                    </span>
                    <Badge variant="sage">
                      {rx.pharmacy.partner}
                    </Badge>
                    <span className="text-[11px] font-mono font-bold text-wellness-dark bg-wellness-light px-2.5 py-0.5 rounded-full border border-wellness/20">
                      Ref: #{rx.id}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200">
                    ● Dispatched & In Transit
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-background-subtle border border-border text-xs">
                  <div>
                    <span className="text-foreground-secondary text-[11px] block">Estimated Arrival:</span>
                    <p className="font-bold text-wellness-dark">{rx.pharmacy.estimatedArrival}</p>
                    <span className="text-[10px] text-foreground-muted">Verified by Licensed Pharmacist</span>
                  </div>

                  <div>
                    <span className="text-foreground-secondary text-[11px] block">Fulfillment Hub:</span>
                    <p className="font-bold text-foreground">{rx.pharmacy.name}</p>
                    <span className="text-[10px] text-foreground-muted">Cold-chain insulated packing</span>
                  </div>

                  <div>
                    <span className="text-foreground-secondary text-[11px] block">Security Protocol:</span>
                    <p className="font-bold text-foreground flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
                      Tamper-Evident Hologram Seal
                    </p>
                    <span className="text-[10px] text-foreground-muted">Delivery OTP sent via SMS</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Official Medical Sick Leave Certificate Banner */}
      <div className="p-6 rounded-3xl bg-wellness-light/60 border border-[#CBD7CE] shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-surface border border-[#CBD7CE] text-wellness-dark flex items-center justify-center shrink-0 shadow-subtle">
            <FileText className="w-6 h-6 text-wellness" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-foreground text-sm sm:text-base">
                Official Doctor-Signed Medical Sick Leave Certificate
              </h3>
              <Badge variant="sage">NMC Verified</Badge>
            </div>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              Attending: Dr. Ananya Iyer, MD (AIIMS New Delhi) • Reg: DMC-48912/2014 • Valid with QR authentication for Darwinbox, Keka, Zoho People, and University leave.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="sage"
            size="sm"
            onClick={() => setCertModalOpen(true)}
            className="text-xs font-semibold gap-1.5 shadow-subtle"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>View & Print Certificate</span>
          </Button>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
            Active Prescriptions & Refill Compliance
          </span>
          <span className="text-xs text-foreground-secondary font-mono">
            {prescriptions.length} Medications Tracked
          </span>
        </div>

        <div className="space-y-6">
          {prescriptions.map((rx) => {
            const pillPercentage = Math.round((rx.pillsRemaining / rx.totalPills) * 100);
            return (
              <div
                key={rx.id}
                className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6 hover:border-wellness transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-wellness-light text-wellness-dark flex items-center justify-center shrink-0">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{rx.medicationName}</h3>
                      <p className="text-xs font-semibold text-wellness mt-0.5">{rx.dosage}</p>
                      <p className="text-xs text-foreground-secondary mt-1">{rx.frequency}</p>
                    </div>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-xs font-semibold text-foreground">
                      {rx.pillsRemaining} of {rx.totalPills} Units Left
                    </span>
                    <div className="w-36 h-2 bg-background-subtle rounded-full overflow-hidden mt-1.5">
                      <div
                        className="h-full bg-wellness rounded-full transition-all duration-300"
                        style={{ width: `${pillPercentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-foreground-muted font-mono">{rx.refillsLeft} refills remaining</span>
                  </div>
                </div>

                {/* Instructions & Pharmacy Delivery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-1">
                    <span className="font-semibold text-foreground-secondary">Instructions:</span>
                    <p className="text-foreground font-medium">{rx.instructions}</p>
                    <p className="text-[10px] text-foreground-muted pt-1">Prescribed by {rx.prescribedBy} on {rx.prescribedDate}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-1.5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground-secondary">Delivery Status:</span>
                      <Badge variant={rx.pharmacy.deliveryStatus === "Delivered" ? "sage" : "neutral"}>
                        {rx.pharmacy.deliveryStatus}
                      </Badge>
                    </div>
                    <p className="text-foreground font-medium">{rx.pharmacy.name}</p>
                    <p className="text-[10px] text-wellness-dark font-medium">{rx.pharmacy.estimatedArrival}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => takeMedication(rx.id)}
                      disabled={rx.pillsRemaining === 0}
                      className="text-xs gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-wellness" />
                      <span>Log Dose Taken</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenRxModal(rx.id)}
                      className="text-xs gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View NMC e-Rx</span>
                    </Button>
                  </div>

                  <Button
                    variant="sage"
                    size="sm"
                    onClick={() => requestRefill(rx.id)}
                    disabled={rx.refillsLeft === 0}
                    className="text-xs gap-1.5 font-semibold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Request Refill ({rx.pharmacy.partner} • {rx.refillsLeft} Left)</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <MedicalCertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
      />

      <DigitalPrescriptionModal
        isOpen={rxModalOpen}
        onClose={() => setRxModalOpen(false)}
        prescriptionId={selectedRxId}
      />

      <PharmacyOrderModal
        isOpen={pharmacyModalOpen}
        onClose={() => setPharmacyModalOpen(false)}
      />
    </div>
  );
}
