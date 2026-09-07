"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useHealth } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  X,
  Clock,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  FlaskConical,
  Sparkles,
  Phone,
  ThermometerSnowflake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { soundFx } from "@/lib/sound";

export interface LabPackage {
  id: string;
  name: string;
  testsIncluded: string;
  testsCount: number;
  labPartner: "Dr Lal PathLabs" | "Tata 1mg";
  price: number;
  originalPrice: number;
  fastingRequired: boolean;
  fastingHours: string;
  turnaround: string;
  popular?: boolean;
  tags: string[];
}

export const LAB_PACKAGES: LabPackage[] = [
  {
    id: "pkg-desk-fatigue",
    name: "WFH Desk Ergonomics & Fatigue Panel",
    testsIncluded: "Vit D3 (25-OH), Vit B12 (Cyanocobalamin), Serum Calcium, Serum Ferritin & Magnesium",
    testsCount: 5,
    labPartner: "Dr Lal PathLabs",
    price: 699,
    originalPrice: 1499,
    fastingRequired: true,
    fastingHours: "8-10 Hours Fasting",
    turnaround: "Within 18 Hours",
    popular: true,
    tags: ["WFH Fatigue", "Muscle Spasms", "Brain Fog"],
  },
  {
    id: "pkg-metabolic",
    name: "Metabolic & Pre-Diabetes Screen (IT Work Life)",
    testsIncluded: "HbA1c (Glycated Hemoglobin), Fasting Blood Sugar (FBS), Serum Insulin & Average Blood Glucose",
    testsCount: 4,
    labPartner: "Tata 1mg",
    price: 499,
    originalPrice: 1199,
    fastingRequired: true,
    fastingHours: "10-12 Hours Overnight Fasting",
    turnaround: "Within 12 Hours",
    popular: true,
    tags: ["Sedentary Desk", "Late Dinners", "Energy Crashes"],
  },
  {
    id: "pkg-executive-annual",
    name: "Executive Annual Full Body Comprehensive Panel",
    testsIncluded: "CBC (24 Parameters), Lipid Profile, Liver Function (LFT), Kidney Function (KFT), TSH & Uric Acid",
    testsCount: 64,
    labPartner: "Dr Lal PathLabs",
    price: 999,
    originalPrice: 2799,
    fastingRequired: true,
    fastingHours: "10-12 Hours Overnight Fasting",
    turnaround: "Within 24 Hours",
    popular: false,
    tags: ["Annual Check", "Comprehensive", "NABL / CAP Certified"],
  },
  {
    id: "pkg-eye-nutrition",
    name: "Screen Time & Digital Eye Strain Panel",
    testsIncluded: "Vitamin A (Serum Retinol), Vitamin E, Serum Zinc & High-Sensitivity CRP",
    testsCount: 4,
    labPartner: "Tata 1mg",
    price: 549,
    originalPrice: 1299,
    fastingRequired: false,
    fastingHours: "Non-Fasting (Anytime Draw)",
    turnaround: "Within 24 Hours",
    popular: false,
    tags: ["Dry Eyes", "10h+ Screens", "Nutritional Defense"],
  },
  {
    id: "pkg-senior-parents",
    name: "Senior Parent Cardiac & Renal Health Panel",
    testsIncluded: "Hs-CRP, Serum Creatinine, eGFR, Sodium/Potassium Electrolytes & Urine Microalbumin",
    testsCount: 8,
    labPartner: "Dr Lal PathLabs",
    price: 899,
    originalPrice: 2199,
    fastingRequired: true,
    fastingHours: "10 Hours Fasting",
    turnaround: "Within 24 Hours",
    popular: false,
    tags: ["Parent Care", "Cardiovascular", "Kidney Health"],
  },
];

const MORNING_SLOTS = [
  { time: "06:30 AM - 07:00 AM", note: "Early Bird • Before 9:30 AM Standup" },
  { time: "07:00 AM - 07:30 AM", note: "Most Popular for Fasting" },
  { time: "07:30 AM - 08:00 AM", note: "Standard Morning Slot" },
  { time: "08:00 AM - 08:30 AM", note: "Fasting Blood Sample" },
  { time: "08:30 AM - 09:00 AM", note: "Morning Window" },
  { time: "09:00 AM - 09:30 AM", note: "Pre-Work Collection" },
];

function getUpcomingDates() {
  const dates = [];
  const today = new Date();

  // Tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  dates.push({
    label: `Tomorrow (${tomorrow.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })})`,
    value: tomorrow.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
  });

  // Day after tomorrow
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  dates.push({
    label: `Day After (${dayAfter.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })})`,
    value: dayAfter.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
  });

  // Next Weekend / Day 3
  const dayThree = new Date(today);
  dayThree.setDate(dayThree.getDate() + 3);
  dates.push({
    label: `${dayThree.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}`,
    value: dayThree.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
  });

  return dates;
}

interface LabBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
}

export function LabBookingModal({ isOpen, onClose, initialPackageId }: LabBookingModalProps) {
  const router = useRouter();
  const { patient, bookLabTest } = useHealth();

  const [selectedPkgId, setSelectedPkgId] = useState<string>(
    initialPackageId || LAB_PACKAGES[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>(MORNING_SLOTS[0].time);
  const [doorstepAddress, setDoorstepAddress] = useState<string>("");
  const [pinCode, setPinCode] = useState<string>("");
  const [abdmConsent, setAbdmConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{
    id: string;
    packageName: string;
    labPartner: string;
    slot: string;
    date: string;
    phlebotomistName: string;
    phlebotomistPhone: string;
    fastingRequired: boolean;
  } | null>(null);

  const upcomingDates = useMemo(() => getUpcomingDates(), []);

  useEffect(() => {
    if (isOpen) {
      if (initialPackageId) {
        setSelectedPkgId(initialPackageId);
      }
      setSelectedDate(upcomingDates[0].value);
      const defaultAddr = patient
        ? [patient.address, patient.city, patient.state].filter(Boolean).join(", ")
        : "Flat 402, Green Glen Layout, Bellandur, Bengaluru, Karnataka";
      setDoorstepAddress(defaultAddr || "Flat 402, Green Glen Layout, Bellandur, Bengaluru, Karnataka");
      setPinCode(patient?.pinCode || "560103");
      setBookingSuccess(null);
    }
  }, [isOpen, initialPackageId, patient, upcomingDates]);

  if (!isOpen) return null;

  const activePkg = LAB_PACKAGES.find((p) => p.id === selectedPkgId) || LAB_PACKAGES[0];

  const isPinValid = /^\d{6}$/.test(pinCode.trim());
  const isAddressValid = doorstepAddress.trim().length >= 10;

  const handleConfirmBooking = () => {
    if (!isAddressValid) {
      toast.error("Please enter a complete doorstep delivery address for phlebotomist.");
      return;
    }
    if (!isPinValid) {
      toast.error("Please enter a valid 6-digit postal PIN code.");
      return;
    }
    if (!abdmConsent) {
      toast.error("ABDM EHR sync consent is required under National Health Authority guidelines.");
      return;
    }

    setIsSubmitting(true);
    soundFx.playSoftClick(true);

    setTimeout(() => {
      const scheduledTime = `${selectedSlot} IST (${activePkg.fastingRequired ? "Fasting" : "Standard"})`;
      const created = bookLabTest({
        packageName: activePkg.name,
        labPartner: activePkg.labPartner,
        price: activePkg.price,
        scheduledDate: selectedDate,
        scheduledTime,
        address: doorstepAddress,
        pinCode: pinCode.trim(),
        fastingRequired: activePkg.fastingRequired,
      });

      setIsSubmitting(false);
      setBookingSuccess({
        id: created.id,
        packageName: activePkg.name,
        labPartner: activePkg.labPartner,
        slot: scheduledTime,
        date: selectedDate,
        phlebotomistName: created.phlebotomist.name,
        phlebotomistPhone: created.phlebotomist.phone,
        fastingRequired: activePkg.fastingRequired,
      });
    }, 650);
  };

  const handleViewInLabs = () => {
    onClose();
    router.push("/app?view=labs");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] bg-surface rounded-3xl border border-border shadow-2xl flex flex-col overflow-hidden text-foreground"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lab-booking-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 id="lab-booking-title" className="text-base font-bold text-foreground flex items-center gap-2">
                Book 6:30 AM Doorstep Blood Draw
                <Badge variant="sage">NABL Certified</Badge>
              </h2>
              <p className="text-xs text-foreground-secondary">
                Dr Lal PathLabs & Tata 1mg • Cold-chain phlebotomy to your home
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-foreground-secondary hover:text-foreground hover:bg-background-subtle transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {bookingSuccess ? (
            /* Confirmation Screen */
            <div className="space-y-6 py-2 animate-in fade-in-50 duration-300">
              <div className="p-6 rounded-2xl bg-wellness-light/60 border border-wellness/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-wellness text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Phlebotomist Dispatched & Slot Confirmed!
                </h3>
                <p className="text-xs text-foreground-secondary max-w-md mx-auto">
                  Your doorstep sample collection has been reserved with {bookingSuccess.labPartner}. Results will be certified by clinical pathologists and linked to your ABHA account.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-wellness/40 text-xs font-mono font-bold text-wellness-dark">
                  Booking Ref: #{bookingSuccess.id}
                </div>
              </div>

              {/* Phlebotomist Details Card */}
              <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <ThermometerSnowflake className="w-4 h-4 text-wellness" />
                    <span>Assigned Phlebotomist & Cold-Chain Kit</span>
                  </div>
                  <Badge variant="outline">Vaccinated & Certified</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-foreground-secondary">Technician:</span>
                    <p className="font-bold text-foreground">{bookingSuccess.phlebotomistName}</p>
                  </div>
                  <div>
                    <span className="text-foreground-secondary">Direct Mobile:</span>
                    <p className="font-bold text-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3 text-wellness" />
                      {bookingSuccess.phlebotomistPhone}
                    </p>
                  </div>
                  <div>
                    <span className="text-foreground-secondary">Scheduled Time:</span>
                    <p className="font-bold text-foreground">{bookingSuccess.date} • {bookingSuccess.slot}</p>
                  </div>
                  <div>
                    <span className="text-foreground-secondary">Collection Kit:</span>
                    <p className="font-bold text-foreground">BD Vacutainer® Barcode-Sealed (2°C - 8°C)</p>
                  </div>
                </div>
              </div>

              {/* Fasting & Preparation Instructions */}
              <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#166534]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Doorstep Blood Draw Preparation Checklist</span>
                </div>
                <ul className="text-xs text-[#166534]/90 space-y-1.5 list-disc pl-4">
                  {bookingSuccess.fastingRequired ? (
                    <li><strong>10-12 hr Fasting:</strong> Maintain water-only fasting. Plain water is strongly recommended to hydrate veins.</li>
                  ) : (
                    <li><strong>Non-Fasting:</strong> No dietary restrictions required prior to sample collection.</li>
                  )}
                  <li>Avoid morning tea, coffee, energy drinks, or heavy exercise before the draw.</li>
                  <li>Technician will open fresh, sterile vacutainer needle seals right in front of you.</li>
                  <li>Digital NABL report auto-syncs to your ABHA Electronic Health Record within 12-24 hours.</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={handleViewInLabs}
                >
                  Go to Biomarker Lab EHR
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={onClose}
                >
                  Done
                </Button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <>
              {/* Step 1: Select Diagnostic Panel */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-foreground-secondary uppercase tracking-wider block">
                  1. Select Diagnostic Health Panel (India Tech Edition)
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {LAB_PACKAGES.map((pkg) => {
                    const isSelected = pkg.id === selectedPkgId;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPkgId(pkg.id)}
                        className={cn(
                          "p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                          isSelected
                            ? "bg-wellness-light/40 border-wellness shadow-sm ring-1 ring-wellness/20"
                            : "bg-surface border-border hover:border-wellness/40 hover:bg-background-subtle/50"
                        )}
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-foreground text-sm">
                              {pkg.name}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-background-subtle border border-border text-foreground-secondary">
                              {pkg.labPartner}
                            </span>
                            {pkg.fastingRequired && (
                              <Badge variant="sage">
                                {pkg.fastingHours}
                              </Badge>
                            )}
                            {pkg.popular && (
                              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                                Most Booked
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-foreground-secondary line-clamp-1">
                            {pkg.testsIncluded} ({pkg.testsCount} Biomarkers)
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-foreground-muted">
                            <span>Turnaround: {pkg.turnaround}</span>
                            <span>•</span>
                            <span>NABL / CAP Accredited</span>
                          </div>
                        </div>

                        <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-border">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-bold text-foreground font-mono">
                              ₹{pkg.price}
                            </span>
                            <span className="text-xs text-foreground-muted line-through">
                              ₹{pkg.originalPrice}
                            </span>
                          </div>
                          <span className="text-[10px] text-wellness font-semibold">
                            Home collection included
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date & 06:30 AM Fasting Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground-secondary uppercase tracking-wider block">
                    2. Select Sample Collection Date
                  </label>
                  <div className="space-y-1.5">
                    {upcomingDates.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setSelectedDate(d.value)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-xl text-xs font-medium border flex items-center justify-between transition-colors",
                          selectedDate === d.value
                            ? "bg-wellness-light border-wellness text-wellness-dark font-bold"
                            : "bg-surface border-border text-foreground hover:bg-background-subtle"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-wellness" />
                          <span>{d.label}</span>
                        </div>
                        {selectedDate === d.value && <CheckCircle2 className="w-3.5 h-3.5 text-wellness" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground-secondary uppercase tracking-wider block">
                    3. Morning Fasting Slot (Pre-Standup)
                  </label>
                  <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {MORNING_SLOTS.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedSlot(slot.time)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-xl text-xs font-medium border flex items-center justify-between transition-colors",
                          selectedSlot === slot.time
                            ? "bg-wellness-light border-wellness text-wellness-dark font-bold"
                            : "bg-surface border-border text-foreground hover:bg-background-subtle"
                        )}
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-wellness" />
                            <span>{slot.time}</span>
                          </div>
                          <span className="text-[10px] text-foreground-secondary block mt-0.5 font-normal">
                            {slot.note}
                          </span>
                        </div>
                        {selectedSlot === slot.time && <CheckCircle2 className="w-3.5 h-3.5 text-wellness" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Doorstep Address & PIN Code */}
              <div className="space-y-3 p-4 rounded-2xl bg-background-subtle border border-border">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-wellness" />
                    <span>4. Home Phlebotomy Address (Bengaluru, Hyd, NCR & Tech Corridors)</span>
                  </label>
                  {isPinValid && (
                    <span className="text-[10px] font-semibold text-wellness flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      6:30 AM Serviceable
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <input
                      type="text"
                      value={doorstepAddress}
                      onChange={(e) => setDoorstepAddress(e.target.value)}
                      placeholder="Apartment, Flat No, Tech Corridor / Society Address"
                      className="w-full px-3.5 py-2.5 text-xs bg-surface border border-border rounded-xl focus:outline-none focus:border-wellness focus:ring-1 focus:ring-wellness text-foreground"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-36">
                      <input
                        type="text"
                        maxLength={6}
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="PIN (e.g. 560103)"
                        className="w-full px-3.5 py-2 text-xs font-mono bg-surface border border-border rounded-xl focus:outline-none focus:border-wellness focus:ring-1 focus:ring-wellness text-foreground"
                      />
                    </div>
                    <p className="text-[11px] text-foreground-secondary">
                      {isPinValid
                        ? "Dr Lal PathLabs & Tata 1mg cold-chain phlebotomist ready for morning dispatch."
                        : "Enter 6-digit postal PIN code to confirm technician dispatch."}
                    </p>
                  </div>
                </div>
              </div>

              {/* ABDM Telehealth Consent */}
              <div className="p-3.5 rounded-2xl bg-wellness-light/30 border border-wellness/20 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="abdm-consent"
                  checked={abdmConsent}
                  onChange={(e) => setAbdmConsent(e.target.checked)}
                  className="mt-0.5 rounded border-border text-wellness focus:ring-wellness h-4 w-4 accent-wellness cursor-pointer"
                />
                <label htmlFor="abdm-consent" className="text-xs text-foreground cursor-pointer leading-relaxed">
                  <span className="font-bold text-wellness-dark">ABDM Digital EHR Sync Consent: </span>
                  I authorize Dr Lal PathLabs / Tata 1mg to link digital diagnostic test results to my ABHA Health ID ({patient?.abhaId || "91-4421-8890-1204"}) under National Health Authority M2/M3 framework.
                </label>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-border gap-3">
                <div>
                  <div className="text-xs text-foreground-secondary">Total Payable:</div>
                  <div className="text-lg font-bold text-foreground font-mono">
                    ₹{activePkg.price}{" "}
                    <span className="text-[11px] font-normal text-wellness">
                      (Includes Doorstep Phlebotomy)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" onClick={onClose} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleConfirmBooking}
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Technician...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm 6:30 AM Booking</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
