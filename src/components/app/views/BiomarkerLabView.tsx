"use client";

import React, { useState } from "react";
import { useHealth } from "@/lib/health-context";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Download,
  FlaskConical,
  Clock,
  Phone,
  ThermometerSnowflake,
  Sparkles,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { LabBookingModal } from "@/components/common/LabBookingModal";

export function BiomarkerLabView() {
  const { labBiomarkers, labBookings, cancelLabBooking } = useHealth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPkgId, setSelectedPkgId] = useState<string | undefined>(undefined);

  const handleDownloadReport = () => {
    toast.success("Downloading Official ABHA EHR Diagnostic Summary (PDF)...");
  };

  const handleOpenBooking = (pkgId?: string) => {
    setSelectedPkgId(pkgId);
    setIsModalOpen(true);
  };

  const activeBookings = labBookings.filter((b) => b.status === "scheduled");

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Diagnostic Biomarkers & Lab Results
            </h1>
            <Badge variant="sage">Dr Lal PathLabs & Tata 1mg</Badge>
          </div>
          <p className="text-xs sm:text-sm text-foreground-secondary">
            Ayushman Bharat Digital Mission (ABDM) diagnostic blood panels with 6:30 AM doorstep phlebotomy.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadReport}
            className="text-xs gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ABHA Report (PDF)</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleOpenBooking()}
            className="text-xs gap-1.5 shadow-sm"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>+ Book 6:30 AM Blood Draw</span>
          </Button>
        </div>
      </div>

      {/* Active Doorstep Phlebotomy Dispatch Card */}
      {activeBookings.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground-secondary uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-wellness" />
              <span>Active Scheduled Doorstep Blood Draws ({activeBookings.length})</span>
            </span>
            <span className="text-[11px] font-semibold text-wellness flex items-center gap-1">
              <ThermometerSnowflake className="w-3.5 h-3.5" />
              Cold Chain Transit (2°C - 8°C)
            </span>
          </div>

          <div className="space-y-3">
            {activeBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-5 sm:p-6 rounded-3xl bg-surface border border-wellness/40 shadow-card flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-base text-foreground">
                      {booking.packageName}
                    </span>
                    <Badge variant="sage">
                      {booking.labPartner}
                    </Badge>
                    <span className="text-[11px] font-mono font-bold text-wellness-dark bg-wellness-light px-2.5 py-0.5 rounded-full border border-wellness/20">
                      Ref: #{booking.id}
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 self-start sm:self-auto">
                    ● Dispatched & Scheduled
                  </Badge>
                </div>

                {/* Phlebotomy Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-background-subtle border border-border text-xs">
                  <div className="space-y-0.5">
                    <span className="text-foreground-secondary text-[11px] block">Scheduled Window:</span>
                    <div className="font-bold text-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-wellness" />
                      <span>{booking.scheduledDate}</span>
                    </div>
                    <p className="text-wellness-dark font-semibold text-[11px]">
                      {booking.scheduledTime}
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-foreground-secondary text-[11px] block">Assigned Technician:</span>
                    <p className="font-bold text-foreground">{booking.phlebotomist.name}</p>
                    <p className="text-foreground-secondary flex items-center gap-1 font-mono text-[11px]">
                      <Phone className="w-3 h-3 text-wellness" />
                      {booking.phlebotomist.phone}
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-foreground-secondary text-[11px] block">Doorstep Address:</span>
                    <p className="font-bold text-foreground line-clamp-1">{booking.address}</p>
                    <p className="text-foreground-muted text-[11px]">PIN: {booking.pinCode} • Sealed Vacutainers</p>
                  </div>
                </div>

                {/* Fasting Tip & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 border-t border-border/60 text-xs">
                  <div className="flex items-center gap-2 text-foreground-secondary text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-wellness shrink-0" />
                    <span>
                      {booking.fastingRequired
                        ? "10-12 hr Fasting Required: Drink plenty of plain water to hydrate veins before phlebotomist arrival."
                        : "Non-Fasting: No dietary restrictions before blood draw."}
                    </span>
                  </div>

                  <button
                    onClick={() => cancelLabBooking(booking.id)}
                    className="text-[11px] text-foreground-muted hover:text-red-600 transition-colors font-semibold self-end sm:self-auto"
                  >
                    Cancel Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Worker Fasting Protocol Banner */}
      <div className="p-5 rounded-3xl bg-wellness-light/30 border border-wellness/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-wellness" />
            <h2 className="text-sm font-bold text-foreground">
              6:30 AM Fasting Draw Protocol for Remote Workers & Tech Interns
            </h2>
          </div>
          <p className="text-xs text-foreground-secondary leading-relaxed">
            Get your fasting blood sample collected at home before your 9:30 AM daily standup. Reports certified by NABL pathologists and synchronized to your ABHA Electronic Health Record within 12–18 hours.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleOpenBooking("pkg-desk-fatigue")}
          className="text-xs shrink-0"
        >
          Book Fatigue Panel (₹699)
        </Button>
      </div>

      {/* Lab Biomarkers Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground-secondary uppercase tracking-wider">
            Verified NABL Biomarkers in ABHA Health Locker
          </span>
          <span className="text-xs text-foreground-secondary font-mono">
            {labBiomarkers.length} Biomarkers Tracked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labBiomarkers.map((biomarker) => (
            <div
              key={biomarker.id}
              className="p-6 sm:p-7 rounded-3xl bg-surface border border-border shadow-card flex flex-col justify-between space-y-6 hover:border-wellness transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-background-subtle border border-border text-foreground">
                    {biomarker.category} • {biomarker.labPartner}
                  </span>
                  <Badge variant="sage">{biomarker.status.toUpperCase()}</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-foreground">{biomarker.name}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-bold font-mono text-foreground">{biomarker.value}</span>
                    <span className="text-xs text-foreground-secondary font-semibold">{biomarker.unit}</span>
                  </div>
                  <p className="text-[11px] text-foreground-muted mt-0.5">
                    Optimal Target: {biomarker.referenceRange.optimal} (Ref: {biomarker.referenceRange.min} - {biomarker.referenceRange.max} {biomarker.unit})
                  </p>
                </div>

                {/* 3-Point Historical Trend Bar */}
                <div className="p-3 rounded-xl bg-background-subtle border border-border space-y-2">
                  <div className="text-[10px] font-semibold text-foreground-secondary uppercase tracking-wider">
                    Biomarker History (Past 6 Months)
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    {biomarker.history.map((hist, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-[10px] text-foreground-muted">{hist.date}</div>
                        <div className="font-bold text-foreground">{hist.value} {biomarker.unit}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-wellness-light/50 border border-[#CBD8CE] text-xs text-foreground leading-relaxed">
                  <span className="font-bold text-wellness-dark">AIIMS Physician Review: </span>
                  {biomarker.clinicalNote}
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-foreground-muted">
                <span>Tested: {biomarker.testedDate} ({biomarker.labPartner})</span>
                <button
                  onClick={() => handleOpenBooking()}
                  className="font-semibold text-wellness-dark hover:underline flex items-center gap-1"
                >
                  Schedule Re-Test →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lab Booking Modal */}
      <LabBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialPackageId={selectedPkgId}
      />
    </div>
  );
}
