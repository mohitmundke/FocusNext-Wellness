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
  FileText,
  Printer,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Video,
} from "lucide-react";

export default function SickLeavePage() {
  const router = useRouter();
  const { isAuthenticated, patient } = useHealth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const handleStartConsult = () => {
    if (isAuthenticated) {
      router.push("/app?view=telehealth");
    } else {
      setAuthModalOpen(true);
    }
  };

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
              <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
              <span>NMC Telemedicine Guidelines 2020 Compliant</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
              Official doctor-signed medical sick leave certificates.
            </h1>
            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
              Consult a registered AIIMS medical practitioner online. Receive a legally valid, tamper-proof medical certificate with doctor registration number and QR code verification within 10 minutes.
            </p>
          </div>

          {/* Interactive Certificate Preview & Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Legal & Procedural Guide */}
            <div className="lg:col-span-7 space-y-8">
              {/* How it Works 3 Steps */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                  How Online Medical Leave Certification Works
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-surface border border-border shadow-subtle space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <div className="font-bold text-xs text-foreground">5-Min Virtual OPD</div>
                    <p className="text-[11px] text-foreground-secondary leading-relaxed">
                      Connect with an AIIMS board-certified doctor over encrypted video.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface border border-border shadow-subtle space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <div className="font-bold text-xs text-foreground">Clinical Diagnosis</div>
                    <p className="text-[11px] text-foreground-secondary leading-relaxed">
                      Doctor assesses symptoms, prescribes medicines, and specifies rest days.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface border border-border shadow-subtle space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <div className="font-bold text-xs text-foreground">Instant PDF with QR</div>
                    <p className="text-[11px] text-foreground-secondary leading-relaxed">
                      Tamper-proof verifiable PDF delivered to your email and ABHA health locker.
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal Recognition Points */}
              <div className="p-6 rounded-3xl bg-surface border border-border shadow-card space-y-4">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-wellness" />
                  <span>Full Legal Validity in India</span>
                </h3>
                <div className="space-y-3 text-xs text-foreground-secondary leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">Recognized by the National Medical Commission (NMC):</strong> In accordance with the Telemedicine Practice Guidelines issued on 25 March 2020 by the Ministry of Health and Family Welfare (MoHFW).
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">Accepted by IT Companies & Tech MNCs:</strong> Accepted across top Indian tech employers (TCS, Infosys, Wipro, Google India, Microsoft, startups, and universities).
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-wellness shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">Tamper-Proof QR Code Verification:</strong> Any HR department or supervisor can scan the QR code to verify the authentic doctor signature, issuance date, and clinic registration.
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="sage"
                  size="md"
                  onClick={handleStartConsult}
                  className="gap-2 font-bold text-xs shadow-subtle h-11 px-6"
                >
                  <Video className="w-4 h-4" />
                  <span>Consult Doctor for Leave (₹199)</span>
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setCertModalOpen(true)}
                  className="gap-2 font-semibold text-xs border-border h-11 px-5"
                >
                  <FileText className="w-4 h-4 text-wellness" />
                  <span>Preview Sample Certificate</span>
                </Button>
              </div>
            </div>

            {/* Right 5 Columns: Visual Certificate Specimen */}
            <div className="lg:col-span-5 bg-surface rounded-3xl border border-border p-6 shadow-elevated space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-wellness" />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Certificate Specimen
                  </span>
                </div>
                <Badge variant="sage">Verified RMP</Badge>
              </div>

              {/* Letterhead */}
              <div className="text-center space-y-1 py-2 bg-background-subtle rounded-2xl border border-border p-3">
                <div className="text-xs font-bold text-foreground">
                  FOCUSNEXT VIRTUAL OPD & TELEMEDICINE SERVICES
                </div>
                <div className="text-[10px] text-foreground-secondary">
                  Registered Telehealth Practice • ABDM / NMC Compliant
                </div>
                <div className="text-[10px] font-mono text-wellness-dark font-semibold">
                  Dr. Ananya Iyer, MD • Reg: NMC/DMC-48912/2014
                </div>
              </div>

              {/* Certificate Content Snippet */}
              <div className="p-4 rounded-2xl bg-white border border-border text-xs space-y-3 font-serif">
                <div className="text-center font-bold uppercase tracking-widest text-[11px] pb-2 border-b border-dashed border-border font-sans">
                  Medical Certificate of Illness & Rest
                </div>
                <p className="leading-relaxed text-foreground-secondary text-[11px]">
                  This is to certify that <strong className="text-foreground">{patient?.name || "Aarav Sharma"}</strong>, ABHA ID: <strong className="font-mono text-foreground">{patient?.abhaId || "91-4421-8890-1204"}</strong>, was examined in virtual OPD.
                </p>
                <div className="p-2.5 rounded-xl bg-background-subtle border border-border font-sans text-[11px] space-y-1">
                  <div><strong>Diagnosis:</strong> Acute Cervical Spasm & Viral Asthenia</div>
                  <div><strong>Period of Recommended Rest:</strong> 2 Days</div>
                  <div><strong>Fit to Resume Work On:</strong> Monday</div>
                </div>
              </div>

              {/* QR Verification Bar */}
              <div className="p-3 rounded-2xl bg-background-subtle border border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-wellness">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-foreground">HR QR Verification</div>
                    <div className="text-[10px] text-foreground-secondary font-mono">Scan to verify authentic issuance</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCertModalOpen(true)}
                  className="text-xs text-wellness border-border"
                >
                  <Printer className="w-3.5 h-3.5 mr-1" />
                  <span>Print PDF</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <PatientAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => router.push("/app?view=telehealth")}
      />

      <FloatingHealthDock
        onOpenCommand={() => setCommandMenuOpen(true)}
        onOpenConsult={handleStartConsult}
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
