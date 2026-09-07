"use client";

import React, { useState } from "react";
import { useHealth } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  CheckCircle2,
  FileText,
  Clock,
  Monitor,
  Plus,
} from "lucide-react";
import { MedicalCertificateModal } from "@/components/common/MedicalCertificateModal";
import { DoctorBookingModal } from "@/components/common/DoctorBookingModal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function TelehealthRoomView() {
  const {
    appointments,
    isCallActive,
    isAudioMuted,
    isVideoOff,
    startTelehealthCall,
    endTelehealthCall,
    toggleAudio,
    toggleVideo,
    vitals,
  } = useHealth();

  const [prescriptionSent, setPrescriptionSent] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleGenerateRx = () => {
    setPrescriptionSent(true);
    toast.success("NMC e-Prescription for Telmisartan 40mg generated & transmitted to Apollo Pharmacy.");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Virtual OPD Consultation Room
            </h1>
            <Badge variant="sage">ABDM & NMC Compliant</Badge>
          </div>
          <p className="text-xs sm:text-sm text-foreground-secondary">
            High-definition, encrypted video OPD with AIIMS & CMC board-certified doctors.
          </p>
        </div>

        {!isCallActive ? (
          <Button
            variant="sage"
            size="md"
            onClick={() => startTelehealthCall(appointments[0].id)}
            className="gap-2 font-semibold shadow-subtle text-xs sm:text-sm"
          >
            <Video className="w-4 h-4" />
            <span>Enter Virtual OPD Room</span>
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={endTelehealthCall}
            className="bg-red-600 hover:bg-red-700 text-white gap-2 font-semibold"
          >
            <PhoneOff className="w-4 h-4" />
            <span>Conclude Consultation</span>
          </Button>
        )}
      </div>

      {/* Main Consultation Stage */}
      {isCallActive ? (
        <div className="bg-surface rounded-3xl border border-border shadow-elevated overflow-hidden">
          {/* Active Call Header */}
          <div className="px-6 py-3.5 bg-background-subtle border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-foreground">
                In OPD Session: Dr. Ananya Iyer, MD (AIIMS New Delhi)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-foreground-secondary">
              <Clock className="w-3.5 h-3.5 text-wellness" />
              <span>OPD Session: 09:24 IST</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* Doctor Video Main Feed */}
            <div className="lg:col-span-8 bg-background-subtle p-6 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r border-border">
              {isScreenSharing && (
                <div className="mb-4 px-3.5 py-2 rounded-xl bg-wellness-light border border-wellness/40 text-wellness-dark text-xs flex items-center justify-between font-medium animate-in fade-in-50">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-wellness" />
                    <span>Live Screen Share Active: Dr. Ananya Iyer is viewing your lab trends</span>
                  </div>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-wellness/20 font-semibold">1080p Encrypted</span>
                </div>
              )}

              {/* Doctor Avatar Presentation */}
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 my-auto">
                <div className="w-24 h-24 rounded-full bg-wellness-light border-2 border-wellness flex items-center justify-center text-wellness-dark text-3xl font-bold shadow-subtle">
                  AI
                </div>
                <div className="space-y-1">
                  <h3 className="text-foreground font-bold text-base">Dr. Ananya Iyer, MD</h3>
                  <p className="text-foreground-secondary text-xs">Consultant Physician • AIIMS New Delhi Alumna</p>
                </div>
                <div className="p-4 bg-surface rounded-2xl max-w-md text-foreground-secondary text-xs sm:text-sm leading-relaxed border border-border shadow-subtle">
                  &ldquo;Namaste Aarav. Your Omron blood pressure is stable at 118/76 mmHg. Your HbA1c of 5.4% from Dr Lal PathLabs confirms excellent pre-diabetes reversal. I am renewing your Telmisartan 40mg prescription on Apollo Pharmacy.&rdquo;
                </div>
              </div>

              {/* Patient Self-View (PiP) */}
              <div className="absolute top-6 right-6 w-36 h-24 bg-surface rounded-xl border border-border p-2.5 flex flex-col justify-between shadow-card">
                <div className="flex items-center justify-between text-[10px] text-foreground-secondary font-mono font-medium">
                  <span>You (Aarav, BLR)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[10px] text-wellness-dark font-mono font-bold">
                  HR: {vitals.heartRate} bpm | SpO2: {vitals.spO2}%
                </div>
              </div>

              {/* Call Controls Floating Bar */}
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center transition-colors border",
                    isAudioMuted ? "bg-red-50 text-red-600 border-red-200" : "bg-surface text-foreground border-border hover:bg-background-subtle shadow-subtle"
                  )}
                  title={isAudioMuted ? "Unmute Mic" : "Mute Mic"}
                >
                  {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={toggleVideo}
                  className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center transition-colors border",
                    isVideoOff ? "bg-red-50 text-red-600 border-red-200" : "bg-surface text-foreground border-border hover:bg-background-subtle shadow-subtle"
                  )}
                  title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
                >
                  {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsScreenSharing(!isScreenSharing);
                    toast.info(!isScreenSharing ? "Screen sharing started with Dr. Iyer." : "Screen sharing ended.");
                  }}
                  className={cn(
                    "w-11 h-11 rounded-2xl flex items-center justify-center transition-colors border",
                    isScreenSharing ? "bg-wellness-light text-wellness-dark border-wellness shadow-sm" : "bg-surface text-foreground border-border hover:bg-background-subtle shadow-subtle"
                  )}
                  title={isScreenSharing ? "Stop Screen Share" : "Share Screen with Doctor"}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={endTelehealthCall}
                  className="px-5 h-11 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-subtle"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End OPD Visit</span>
                </button>
              </div>
            </div>

            {/* In-Call Live Electronic Health Record (4 Cols) */}
            <div className="lg:col-span-4 p-6 border-t lg:border-t-0 lg:border-l border-border bg-surface flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-wellness" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      ABHA OPD Clinical Summary
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-wellness font-semibold">● ABDM Synced</span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="font-semibold text-foreground-secondary">Clinical Diagnosis:</span>
                    <p className="font-medium text-foreground mt-0.5">
                      Controlled Essential Hypertension & Normal Glycemic Recovery.
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-foreground-secondary">NMC Digital e-Prescription:</span>
                    <div className="p-3 rounded-xl bg-background-subtle border border-border mt-1 space-y-1">
                      <div className="font-bold text-foreground">Telmisartan 40 mg Oral Tablet (IP)</div>
                      <div className="text-foreground-secondary text-[11px]">#30 Tablets • 3 Refills Authorized</div>
                      <div className="text-[10px] text-wellness-dark font-medium pt-1">
                        Pharmacy: Apollo Pharmacy Express (Bengaluru 560103)
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-foreground-secondary">Lifestyle & Dietary Directives:</span>
                    <ul className="space-y-1 text-foreground mt-1">
                      <li>• 30-minute brisk morning walk</li>
                      <li>• 2.5L daily hydration</li>
                      <li>• Continue Omron weekly BP log</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="sage"
                  size="sm"
                  onClick={handleGenerateRx}
                  disabled={prescriptionSent}
                  className="w-full justify-center text-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  <span>{prescriptionSent ? "e-Rx Sent to Apollo Pharmacy" : "Generate NMC e-Prescription"}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCertModalOpen(true)}
                  className="w-full justify-center text-xs border-border hover:bg-background-subtle text-foreground font-medium"
                >
                  <FileText className="w-3.5 h-3.5 mr-1.5 text-wellness" />
                  <span>Issue Medical Leave Certificate</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Upcoming Virtual Consultations Schedule Card */
        <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div>
              <h3 className="text-base font-bold text-foreground">Scheduled Virtual OPD Appointments</h3>
              <p className="text-xs text-foreground-secondary">Direct video consultations with AIIMS & CMC medical specialists</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="sage">{appointments.length} Scheduled</Badge>
              <Button
                variant="sage"
                size="sm"
                onClick={() => setBookingModalOpen(true)}
                className="text-xs gap-1.5 font-semibold shadow-subtle"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Book New OPD</span>
              </Button>
            </div>
          </div>

          {appointments.length === 0 ? (
            <div className="p-10 text-center bg-background-subtle rounded-2xl border border-dashed border-border space-y-3">
              <Video className="w-8 h-8 text-foreground-muted mx-auto" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">No Upcoming OPD Appointments</h4>
                <p className="text-xs text-foreground-secondary max-w-sm mx-auto">
                  Schedule a 10-minute video OPD consultation with an AIIMS or CMC specialist today.
                </p>
              </div>
              <Button
                variant="sage"
                size="sm"
                onClick={() => setBookingModalOpen(true)}
                className="text-xs gap-1.5 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Book OPD Consultation</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-5 rounded-2xl bg-background-subtle border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-wellness transition-all shadow-subtle"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold text-sm shrink-0">
                      {apt.doctorName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-foreground">{apt.doctorName}</h4>
                      <p className="text-xs text-wellness font-semibold">{apt.institution} • {apt.specialty}</p>
                      <p className="text-xs text-foreground-secondary mt-1">{apt.clinicalNotes}</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-surface border border-border rounded-lg text-foreground">
                      {apt.date} • {apt.time}
                    </span>
                    <Button
                      variant="sage"
                      size="sm"
                      onClick={() => startTelehealthCall(apt.id)}
                      className="text-xs gap-1.5 font-semibold shadow-subtle"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join OPD</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Doctor-Signed Medical Sick Leave Certificate Modal */}
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
