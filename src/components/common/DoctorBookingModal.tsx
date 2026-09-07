"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHealth } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  X,
  Video,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface DoctorOption {
  id: string;
  name: string;
  title: string;
  specialty: string;
  institution: string;
  fee: number;
  initials: string;
  availableSlot: string;
}

export const CLINICAL_DOCTORS: DoctorOption[] = [
  {
    id: "doc-1",
    name: "Dr. Ananya Iyer, MD",
    title: "Consultant Physician & Cardiometabolic Specialist",
    specialty: "Internal Medicine & Lifestyle Health",
    institution: "AIIMS New Delhi",
    fee: 199,
    initials: "AI",
    availableSlot: "Available Now • ~4m wait",
  },
  {
    id: "doc-2",
    name: "Dr. Rajesh Kulkarni, MS",
    title: "Senior Orthopedic Surgeon & Spine Rehabilitation",
    specialty: "Cervical Tech Neck & Desk Ergonomics PT",
    institution: "CMC Vellore",
    fee: 499,
    initials: "RK",
    availableSlot: "Today, 07:30 PM IST",
  },
  {
    id: "doc-3",
    name: "Dr. Meenakshi Sundaram, MS, DNB",
    title: "Consultant Ophthalmologist & Ocular Ergonomics",
    specialty: "Digital Eye Strain & Computer Vision Syndrome",
    institution: "Aravind Eye Hospital",
    fee: 249,
    initials: "MS",
    availableSlot: "Today, 05:00 PM IST",
  },
  {
    id: "doc-4",
    name: "Dr. Sneha Roy, MD, DM",
    title: "Consultant Endocrinologist",
    specialty: "PCOS, Thyroid & Pre-Diabetes Glycemic Control",
    institution: "PGIMER Chandigarh",
    fee: 399,
    initials: "SR",
    availableSlot: "Tomorrow, 11:30 AM IST",
  },
  {
    id: "doc-5",
    name: "Dr. Rohan Mehra, MD",
    title: "Consultant Physician & Pulmonologist",
    specialty: "Smog Cough & Seasonal Bronchitis",
    institution: "KEM Hospital Mumbai",
    fee: 299,
    initials: "RM",
    availableSlot: "Today, 08:30 PM IST",
  },
];

const COMPLAINT_PRESETS = [
  "Cervical Tech Neck / Desk Shoulder Pain",
  "Digital Eye Strain & Burning Dry Eyes (10h+ Screens)",
  "Acute Viral Fever, Sore Throat & Cough",
  "Official Medical Sick Leave Certificate (NMC Compliant)",
  "Review Fasting Blood Lab Biomarkers (Dr Lal/1mg)",
  "Pre-Diabetes / Blood Glucose Telemetry Review",
  "WFH Ergonomic Consultation & Posture Assessment",
];

const TIME_SLOTS = [
  { time: "10:30 AM IST", period: "Morning" },
  { time: "12:00 PM IST", period: "Afternoon" },
  { time: "03:30 PM IST", period: "Afternoon" },
  { time: "05:00 PM IST", period: "Evening" },
  { time: "07:30 PM IST", period: "Evening (WFH Friendly)" },
  { time: "09:15 PM IST", period: "Night (Late Shift)" },
  { time: "10:45 PM IST", period: "Night (Late Shift)" },
];

interface DoctorBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctorId?: string;
  onSuccess?: (aptId: string) => void;
}

export function DoctorBookingModal({
  isOpen,
  onClose,
  preselectedDoctorId,
  onSuccess,
}: DoctorBookingModalProps) {
  const router = useRouter();
  const { bookAppointment, patient } = useHealth();

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    preselectedDoctorId || CLINICAL_DOCTORS[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>("Today");
  const [selectedTime, setSelectedTime] = useState<string>("Today, 07:30 PM IST");
  const [chiefComplaint, setChiefComplaint] = useState<string>(COMPLAINT_PRESETS[0]);
  const [customNotes, setCustomNotes] = useState<string>("");
  const [consentAbdm, setConsentAbdm] = useState<boolean>(true);
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [bookedAppointmentId, setBookedAppointmentId] = useState<string | null>(null);

  // Sync selected doctor if preselectedDoctorId prop changes
  useEffect(() => {
    if (preselectedDoctorId) {
      setSelectedDoctorId(preselectedDoctorId);
    }
  }, [preselectedDoctorId]);

  if (!isOpen) return null;

  const doctor =
    CLINICAL_DOCTORS.find((d) => d.id === selectedDoctorId) || CLINICAL_DOCTORS[0];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentAbdm) {
      toast.error("Please provide ABDM telemedicine consent to proceed.");
      return;
    }

    setIsBooking(true);

    setTimeout(() => {
      const fullNotes = customNotes.trim()
        ? `${chiefComplaint} — ${customNotes.trim()}`
        : `${chiefComplaint}. Patient biometric vitals pre-synced for consultation.`;

      const newApt = bookAppointment({
        doctorName: doctor.name,
        doctorTitle: doctor.title,
        institution: doctor.institution,
        specialty: doctor.specialty,
        date: selectedDate,
        time: selectedTime,
        clinicalNotes: fullNotes,
      });

      setIsBooking(false);
      setBookedAppointmentId(newApt.id);

      if (onSuccess) {
        onSuccess(newApt.id);
      }
    }, 600);
  };

  const handleResetAndClose = () => {
    setBookedAppointmentId(null);
    setIsBooking(false);
    onClose();
  };

  const handleJoinConsultationNow = () => {
    handleResetAndClose();
    router.push("/app?view=telehealth");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in-50">
      <div
        className="bg-surface rounded-3xl border border-border shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-surface/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground">
                  Book Virtual OPD Video Consultation
                </h3>
                <Badge variant="sage" className="text-[10px] py-0 px-2">
                  NMC 2020 Compliant
                </Badge>
              </div>
              <p className="text-xs text-foreground-secondary">
                10-Minute HD Video Consultation with Board-Certified Indian Specialists
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 rounded-xl border border-border text-foreground-secondary hover:text-foreground hover:bg-background-subtle transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {bookedAppointmentId ? (
            /* Booking Success State */
            <div className="text-center py-6 space-y-6 animate-in fade-in-50">
              <div className="w-16 h-16 rounded-3xl bg-wellness-light text-wellness-dark flex items-center justify-center mx-auto shadow-subtle border border-[#CBD7CE]">
                <CheckCircle2 className="w-8 h-8 text-wellness" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="text-xl font-bold text-foreground">
                  OPD Appointment Confirmed!
                </h2>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  Your telemedicine slot with <strong className="text-foreground">{doctor.name}</strong> ({doctor.institution}) has been registered and synced with your ABHA ID.
                </p>
              </div>

              {/* Appointment Card Specimen */}
              <div className="p-5 rounded-2xl bg-background-subtle border border-border max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div>
                    <div className="text-xs font-bold text-foreground">{doctor.name}</div>
                    <div className="text-[11px] text-wellness-dark font-medium">{doctor.specialty}</div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Paid: ₹{doctor.fee}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-foreground-secondary uppercase font-semibold">Date</span>
                    <p className="font-bold text-foreground">{selectedDate}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-foreground-secondary uppercase font-semibold">Time Slot</span>
                    <p className="font-bold text-foreground">{selectedTime}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border text-[11px] text-foreground-secondary flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
                  <span>ABDM Secure Meeting Link Dispatched via SMS & WhatsApp</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleJoinConsultationNow}
                  className="bg-wellness hover:bg-wellness-hover text-white gap-2 font-bold text-xs h-11 px-6 rounded-2xl shadow-subtle w-full sm:w-auto"
                >
                  <Video className="w-4 h-4" />
                  <span>Enter Virtual OPD Room Now</span>
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleResetAndClose}
                  className="text-xs font-semibold h-11 px-6 rounded-2xl w-full sm:w-auto"
                >
                  <span>Done</span>
                </Button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleConfirmBooking} className="space-y-6 text-xs">
              {/* Step 1: Select Specialist */}
              <div className="space-y-2">
                <label className="font-bold text-foreground flex items-center justify-between">
                  <span>1. Select Specialist & Specialty</span>
                  <span className="text-[11px] font-normal text-foreground-secondary">
                    AIIMS & CMC Board Specialists
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CLINICAL_DOCTORS.map((doc) => {
                    const isSelected = selectedDoctorId === doc.id;
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={cn(
                          "p-3 rounded-2xl border text-left transition-all flex items-start justify-between gap-2 shadow-subtle",
                          isSelected
                            ? "border-wellness bg-wellness-light text-foreground"
                            : "border-border bg-background-subtle hover:bg-surface text-foreground"
                        )}
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-xs flex items-center gap-1.5">
                            <span>{doc.name}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-wellness" />}
                          </div>
                          <div className="text-[10px] text-foreground-secondary line-clamp-1">
                            {doc.institution} • {doc.specialty}
                          </div>
                          <div className="text-[10px] font-semibold text-wellness-dark">
                            ₹{doc.fee} Consultation Fee
                          </div>
                        </div>
                        <span className="text-[9px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0 font-medium">
                          Active
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date & Time Slot */}
              <div className="space-y-3 pt-2 border-t border-border">
                <label className="font-bold text-foreground flex items-center justify-between">
                  <span>2. Choose Appointment Date & Time Slot</span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                    Evening Slots till 11:30 PM
                  </span>
                </label>

                {/* Day selector */}
                <div className="flex items-center gap-2">
                  {["Today", "Tomorrow", "Day After Tomorrow"].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all shadow-subtle",
                        selectedDate === day
                          ? "bg-wellness text-white border-wellness"
                          : "bg-background-subtle border-border text-foreground hover:bg-surface"
                      )}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                {/* Time slot grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime.includes(slot.time);
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(`${selectedDate}, ${slot.time}`)}
                        className={cn(
                          "p-2.5 rounded-xl border text-center transition-all shadow-subtle flex flex-col items-center justify-center",
                          isSelected
                            ? "bg-wellness-light border-wellness text-wellness-dark font-bold"
                            : "bg-background-subtle border-border text-foreground hover:bg-surface font-medium"
                        )}
                      >
                        <span className="text-xs font-mono">{slot.time}</span>
                        <span className="text-[9px] text-foreground-muted">{slot.period}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Chief Complaint & Clinical Notes */}
              <div className="space-y-3 pt-2 border-t border-border">
                <label className="font-bold text-foreground">
                  3. Reason for OPD Consultation (Chief Complaint)
                </label>

                <div className="flex flex-wrap gap-1.5">
                  {COMPLAINT_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setChiefComplaint(preset)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-lg border text-[11px] transition-all text-left",
                        chiefComplaint === preset
                          ? "bg-wellness-light border-wellness text-wellness-dark font-bold"
                          : "bg-background-subtle border-border text-foreground-secondary hover:text-foreground"
                      )}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-foreground-secondary">
                    Optional Clinical Details / Onset / Medical History
                  </label>
                  <textarea
                    rows={2}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="e.g. Experiencing neck pain since 3 days after long coding sprints. BP currently 120/80..."
                    className="w-full px-3.5 py-2 rounded-xl bg-background-subtle border border-border text-foreground text-xs focus:outline-none focus:border-wellness shadow-subtle"
                  />
                </div>
              </div>

              {/* Step 4: Patient ABHA Linking & Consent */}
              <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-wellness" />
                    <span className="font-bold text-foreground text-xs">
                      ABDM Ayushman Bharat Patient Identity
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-foreground-secondary">
                    ABHA: {patient?.abhaId || "91-4421-8890-1204"}
                  </span>
                </div>

                <label className="flex items-start gap-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentAbdm}
                    onChange={(e) => setConsentAbdm(e.target.checked)}
                    className="mt-0.5 rounded border-border text-wellness focus:ring-wellness"
                  />
                  <span className="text-[11px] text-foreground-secondary leading-relaxed">
                    I consent to virtual telemedicine evaluation under the <strong className="text-foreground">National Medical Commission (NMC) Telemedicine Practice Guidelines 2020</strong> and authorize sharing my real-time vitals telemetry with {doctor.name}.
                  </span>
                </label>
              </div>

              {/* Consultation Fee & Submit */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-foreground-secondary uppercase tracking-wider font-semibold">Total Consultation Fee</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">₹{doctor.fee}</span>
                    <span className="text-xs text-foreground-muted line-through">₹999</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                      70% Off Remote Care
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="sage"
                  size="md"
                  disabled={isBooking || !consentAbdm}
                  className="font-bold text-xs h-11 px-6 shadow-subtle gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>{isBooking ? "Confirming Slot..." : `Confirm & Book Video OPD (₹${doctor.fee})`}</span>
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
