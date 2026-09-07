"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  PatientProfile,
  VitalRecord,
  ConnectedDevice,
  TelehealthAppointment,
  LabBiomarker,
  Prescription,
  TriageQuestionnaire,
  ClinicalMessage,
  LabBooking,
} from "@/types/health";
import { soundFx } from "./sound";
import { toast } from "sonner";

export const DEMO_PATIENTS: PatientProfile[] = [
  {
    id: "pt-in-99214",
    name: "Aarav Sharma",
    email: "aarav.sharma@workspace.in",
    phone: "+91 98450 12345",
    dob: "August 12, 1996 (Age 29)",
    gender: "Male",
    bloodType: "B+",
    abhaId: "91-4421-8890-1204",
    pinCode: "560103",
    city: "Bengaluru, Karnataka (Remote Dev)",
    primaryPhysician: "Dr. Ananya Iyer, MD (AIIMS New Delhi)",
    allergies: ["Penicillin"],
    chronicConditions: ["Cervical Tech Neck (C5-C6 Posture Strain)", "Severe Vitamin D3 Deficiency (Indoor WFH)", "11-Hour Screen Strain"],
    emergencyContact: {
      name: "Pooja Sharma",
      relationship: "Spouse",
      phone: "+91 98450 54321",
    },
  },
  {
    id: "pt-in-77312",
    name: "Priya Sundaram",
    email: "priya.sundaram@tech.in",
    phone: "+91 97120 44556",
    dob: "March 24, 2003 (Age 23)",
    gender: "Female",
    bloodType: "O+",
    abhaId: "91-6623-1109-8834",
    pinCode: "411014",
    city: "Pune, Maharashtra (WFH Intern)",
    primaryPhysician: "Dr. Priya Nair, MD (PGIMER Chandigarh)",
    allergies: ["Aspirin"],
    chronicConditions: ["UI/UX Design Intern (12h Screen Time)", "Digital Eye Strain & Computer Vision Syndrome", "PG Mess Gastric Acidity (GERD)"],
    emergencyContact: {
      name: "Karthik Sundaram",
      relationship: "Brother",
      phone: "+91 97120 99887",
    },
  },
  {
    id: "pt-in-55109",
    name: "Ramesh Sharma",
    email: "ramesh.sharma@pune.in",
    phone: "+91 98220 77665",
    dob: "November 04, 1958 (Age 68)",
    gender: "Male",
    bloodType: "A+",
    abhaId: "91-1124-9988-3401",
    pinCode: "411038",
    city: "Pune, Maharashtra (Hometown Parent)",
    primaryPhysician: "Dr. Ananya Iyer, MD (AIIMS New Delhi)",
    allergies: ["None known"],
    chronicConditions: ["Essential Hypertension", "Senior Cardiac RPM", "Monitored Remotely by Son (Aarav, Bengaluru)"],
    emergencyContact: {
      name: "Aarav Sharma",
      relationship: "Son (Bengaluru)",
      phone: "+91 98450 12345",
    },
  },
];

interface HealthContextType {
  patient: PatientProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  loginWithProfile: (profile: PatientProfile) => void;
  updatePatientProfile: (updates: Partial<PatientProfile>) => void;
  logout: () => void;

  // Real-time Vitals Telemetry
  vitals: VitalRecord;
  vitalsHistory: VitalRecord[];
  addManualVital: (record: Partial<VitalRecord>) => void;

  // Connected Devices
  connectedDevices: ConnectedDevice[];
  toggleDeviceConnection: (id: string) => void;

  // Telehealth Consultation Suite
  appointments: TelehealthAppointment[];
  activeAppointment: TelehealthAppointment | null;
  isCallActive: boolean;
  isAudioMuted: boolean;
  isVideoOff: boolean;
  startTelehealthCall: (appointmentId: string) => void;
  endTelehealthCall: () => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  bookAppointment: (appointment: Omit<TelehealthAppointment, "id" | "status" | "meetingRoomId">) => TelehealthAppointment;

  // Lab Biomarkers & Doorstep Phlebotomy (EHR)
  labBiomarkers: LabBiomarker[];
  labBookings: LabBooking[];
  bookLabTest: (booking: Omit<LabBooking, "id" | "status" | "phlebotomist">) => LabBooking;
  cancelLabBooking: (id: string) => void;

  // Prescriptions & Pharmacy Delivery
  prescriptions: Prescription[];
  takeMedication: (id: string) => void;
  requestRefill: (id: string) => void;
  orderPrescription: (order: Omit<Prescription, "id">) => Prescription;

  // AI Clinical Triage
  triageHistory: TriageQuestionnaire[];
  evaluateTriage: (
    chiefComplaint: string,
    duration: string,
    painLevel: number,
    associatedSymptoms: string[]
  ) => TriageQuestionnaire;

  // 24/7 Care Team Messaging
  careMessages: ClinicalMessage[];
  isCareTeamTyping: boolean;
  sendCareMessage: (text: string) => Promise<void>;

  // Emergency SOS Protocol (112 & 108 Helpline)
  emergencyActive: boolean;
  triggerEmergencyProtocol: () => void;
  dismissEmergencyProtocol: () => void;
}

const INITIAL_VITALS: VitalRecord = {
  timestamp: "Just now",
  heartRate: 68,
  systolicBP: 118,
  diastolicBP: 76,
  spO2: 99,
  bloodGlucose: 96,
  temperature: 98.4,
  respiratoryRate: 14,
  hrv: 56,
};

const INITIAL_DEVICES: ConnectedDevice[] = [
  {
    id: "dev-1",
    name: "Smart Blood Pressure Monitor",
    brand: "Omron Connect (HEM-7156T)",
    type: "bp",
    batteryLevel: 94,
    lastSynced: "3 mins ago",
    connected: true,
  },
  {
    id: "dev-2",
    name: "Continuous Glucose Monitor",
    brand: "Accu-Chek Guide / Dexcom Sensor",
    type: "cgm",
    batteryLevel: 89,
    lastSynced: "Live streaming",
    connected: true,
  },
  {
    id: "dev-3",
    name: "Wireless Pulse Oximeter (SpO2)",
    brand: "Nonin Medical Wireless (India)",
    type: "oximeter",
    batteryLevel: 82,
    lastSynced: "10 mins ago",
    connected: true,
  },
  {
    id: "dev-4",
    name: "Clinical Biometric Watch",
    brand: "Apple Watch Series 10 (ECG)",
    type: "watch",
    batteryLevel: 87,
    lastSynced: "Just now",
    connected: true,
  },
];

const INITIAL_APPOINTMENTS: TelehealthAppointment[] = [
  {
    id: "apt-1",
    doctorName: "Dr. Ananya Iyer, MD",
    doctorTitle: "Consultant Internal Medicine & Cardiology",
    institution: "AIIMS New Delhi (Alumna)",
    specialty: "Preventive Cardiology & Diabetes Management",
    date: "Today",
    time: "03:30 PM IST",
    status: "upcoming",
    meetingRoomId: "room-aiims-iyer-804",
    clinicalNotes: "Monthly review of Omron BP logs (avg 118/76 mmHg) and HbA1c 5.4% glycemic progress.",
    diagnosis: "Optimal blood pressure control with Telmisartan 40mg and lifestyle modifications.",
    prescriptionsGenerated: ["Telmisartan 40mg", "Metformin 500mg SR"],
  },
  {
    id: "apt-2",
    doctorName: "Dr. Rajesh Kulkarni, MS",
    doctorTitle: "Consultant Orthopedics & Spine Rehabilitation",
    institution: "CMC Vellore (Alumnus)",
    specialty: "Digital Spine Ergonomics & Physical Therapy",
    date: "Tomorrow",
    time: "11:00 AM IST",
    status: "upcoming",
    meetingRoomId: "room-cmc-kulkarni-219",
    clinicalNotes: "Post-workday thoracic alignment review and cervical spine decompression exercises.",
  },
];

const INITIAL_LABS: LabBiomarker[] = [
  {
    id: "lab-1",
    name: "Glycated Hemoglobin (HbA1c)",
    labPartner: "Dr Lal PathLabs",
    category: "Glycemic Control",
    value: 5.4,
    unit: "%",
    referenceRange: { min: 4.0, max: 5.6, optimal: "< 5.5%" },
    status: "optimal",
    testedDate: "28 Aug 2026",
    clinicalNote: "Excellent 90-day glycemic control. Fasting blood sugar well within non-diabetic target.",
    history: [
      { date: "Feb 2026", value: 5.8 },
      { date: "May 2026", value: 5.6 },
      { date: "Aug 2026", value: 5.4 },
    ],
  },
  {
    id: "lab-2",
    name: "High-Sensitivity CRP (hs-CRP)",
    labPartner: "Tata 1mg Labs",
    category: "Inflammatory",
    value: 0.7,
    unit: "mg/L",
    referenceRange: { min: 0.0, max: 1.0, optimal: "< 0.8 mg/L" },
    status: "optimal",
    testedDate: "28 Aug 2026",
    clinicalNote: "Low vascular inflammatory score. Low cardiovascular risk index.",
    history: [
      { date: "Feb 2026", value: 0.9 },
      { date: "May 2026", value: 0.8 },
      { date: "Aug 2026", value: 0.7 },
    ],
  },
  {
    id: "lab-3",
    name: "Total Cholesterol",
    labPartner: "Dr Lal PathLabs",
    category: "Lipid Profile",
    value: 176,
    unit: "mg/dL",
    referenceRange: { min: 125, max: 200, optimal: "< 180 mg/dL" },
    status: "normal",
    testedDate: "28 Aug 2026",
    clinicalNote: "Healthy lipid ratio. HDL is robust at 58 mg/dL with low triglycerides.",
    history: [
      { date: "Feb 2026", value: 192 },
      { date: "May 2026", value: 184 },
      { date: "Aug 2026", value: 176 },
    ],
  },
  {
    id: "lab-4",
    name: "Vitamin D3 (25-OH Cholecalciferol)",
    labPartner: "Apollo Diagnostics",
    category: "Vitamins",
    value: 52,
    unit: "ng/mL",
    referenceRange: { min: 30, max: 100, optimal: "40 - 70 ng/mL" },
    status: "optimal",
    testedDate: "28 Aug 2026",
    clinicalNote: "Adequate immunity and bone density levels after weekly sachet supplementation.",
    history: [
      { date: "Feb 2026", value: 24 },
      { date: "May 2026", value: 38 },
      { date: "Aug 2026", value: 52 },
    ],
  },
];

const INITIAL_PRESCRIPTIONS: Prescription[] = [
  {
    id: "rx-1",
    medicationName: "Telmisartan",
    dosage: "40 mg Oral Tablet (IP)",
    frequency: "Once daily in the morning after breakfast",
    instructions: "Take with plain water. Monitor blood pressure using your Omron device.",
    pillsRemaining: 26,
    totalPills: 30,
    refillsLeft: 3,
    prescribedBy: "Dr. Ananya Iyer, MD (AIIMS)",
    prescribedDate: "15 Aug 2026",
    pharmacy: {
      name: "Apollo Pharmacy & Tata 1mg",
      partner: "Apollo Pharmacy",
      deliveryStatus: "Delivered",
      estimatedArrival: "Delivered to Bengaluru 560103",
    },
  },
  {
    id: "rx-2",
    medicationName: "Metformin Hydrochloride",
    dosage: "500 mg Sustained Release (SR)",
    frequency: "Once daily with dinner",
    instructions: "For glycemic regulation and insulin sensitivity optimization.",
    pillsRemaining: 22,
    totalPills: 30,
    refillsLeft: 4,
    prescribedBy: "Dr. Ananya Iyer, MD (AIIMS)",
    prescribedDate: "15 Aug 2026",
    pharmacy: {
      name: "Tata 1mg Express Pharmacy",
      partner: "Tata 1mg",
      deliveryStatus: "Processing",
      estimatedArrival: "Express delivery by tomorrow evening",
    },
  },
  {
    id: "rx-3",
    medicationName: "Vitamin D3 (Cholecalciferol)",
    dosage: "60,000 IU Oral Sachet",
    frequency: "Once a week with warm milk",
    instructions: "Maintenance dose for bone mineralization and immune strength.",
    pillsRemaining: 6,
    totalPills: 8,
    refillsLeft: 2,
    prescribedBy: "Dr. Ananya Iyer, MD (AIIMS)",
    prescribedDate: "10 July 2026",
    pharmacy: {
      name: "Apollo Pharmacy Express",
      partner: "Apollo Pharmacy",
      deliveryStatus: "Delivered",
      estimatedArrival: "Delivered on 12 July",
    },
  },
];

const INITIAL_MESSAGES: ClinicalMessage[] = [
  {
    id: "msg-1",
    sender: "doctor",
    senderName: "Dr. Ananya Iyer, MD",
    senderTitle: "Consultant Physician (AIIMS)",
    text: "Namaste Aarav. I reviewed your 14-day Omron BP logs. Your average is 118/76 mmHg which is textbook normal. How is your morning walking routine progressing in Bengaluru?",
    timestamp: "10:15 AM",
  },
  {
    id: "msg-2",
    sender: "nurse",
    senderName: "Sister Kavitha Nair",
    senderTitle: "Clinical Triage Nurse",
    text: "Your Accu-Chek continuous glucose telemetry sync is verified and linked to your ABHA ID (91-4421-8890-1204). Virtual OPD room will open at 03:30 PM today.",
    timestamp: "10:45 AM",
  },
];

const INITIAL_LAB_BOOKINGS: LabBooking[] = [
  {
    id: "DLPL-98214",
    packageName: "WFH Desk Ergonomics & Fatigue Panel (Vit D3 + B12)",
    labPartner: "Dr Lal PathLabs",
    price: 699,
    scheduledDate: "Tomorrow",
    scheduledTime: "06:30 AM IST (Fasting)",
    address: "Bellandur / Outer Ring Road, Bengaluru",
    pinCode: "560103",
    fastingRequired: true,
    status: "scheduled",
    phlebotomist: {
      name: "Ramesh Kumar (Certified Phlebotomist)",
      phone: "+91 98450 77112",
    },
  },
];

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export function HealthProvider({ children }: { children: React.ReactNode }) {
  // ─── Patient Authentication & Profile Persistence ──────────────────────────
  const [patient, setPatient] = useState<PatientProfile | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("focusnext_in_patient");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = useMemo(() => !!patient, [patient]);

  const login = useCallback((email: string, name?: string) => {
    soundFx.playFocusStart(true);
    // If it matches one of the demo patients, use that profile
    const matched = DEMO_PATIENTS.find(
      (p) => p.email.toLowerCase() === email.toLowerCase() || p.name.toLowerCase() === (name || "").toLowerCase()
    );

    const updated: PatientProfile = matched || {
      ...DEMO_PATIENTS[0],
      email,
      name: name || "Aarav Sharma",
    };

    setPatient(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("focusnext_in_patient", JSON.stringify(updated));
    }
  }, []);

  const loginWithProfile = useCallback((profile: PatientProfile) => {
    soundFx.playFocusStart(true);
    setPatient(profile);
    if (typeof window !== "undefined") {
      localStorage.setItem("focusnext_in_patient", JSON.stringify(profile));
    }
    toast.success(`Active Patient: ${profile.name} (ABHA: ${profile.abhaId})`);
  }, []);

  const updatePatientProfile = useCallback((updates: Partial<PatientProfile>) => {
    setPatient((prev) => {
      if (!prev) return null;
      const updated: PatientProfile = { ...prev, ...updates };
      if (typeof window !== "undefined") {
        localStorage.setItem("focusnext_in_patient", JSON.stringify(updated));
      }
      return updated;
    });
    soundFx.playChime(true);
    toast.success("Patient ABHA profile validated & updated.");
  }, []);

  const logout = useCallback(() => {
    soundFx.playSoftClick(true);
    setPatient(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("focusnext_in_patient");
    }
    toast.info("Signed out of ABHA Patient Portal");
  }, []);

  // ─── Live Vitals Telemetry with Micro-Fluctuation ───────────────────────────
  const [vitals, setVitals] = useState<VitalRecord>(INITIAL_VITALS);
  const [vitalsHistory, setVitalsHistory] = useState<VitalRecord[]>([INITIAL_VITALS]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals((prev) => {
        const hrDelta = Math.floor(Math.random() * 3) - 1;
        const bpSysDelta = Math.floor(Math.random() * 3) - 1;
        const glucoseDelta = Math.floor(Math.random() * 3) - 1;

        const updated: VitalRecord = {
          ...prev,
          timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          heartRate: Math.max(62, Math.min(76, prev.heartRate + hrDelta)),
          systolicBP: Math.max(114, Math.min(122, prev.systolicBP + bpSysDelta)),
          bloodGlucose: Math.max(92, Math.min(102, prev.bloodGlucose + glucoseDelta)),
        };
        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const addManualVital = useCallback((record: Partial<VitalRecord>) => {
    soundFx.playSoftClick(true);
    setVitals((prev) => {
      const updated: VitalRecord = {
        ...prev,
        ...record,
        timestamp: "Just now",
      };
      setVitalsHistory((hist) => [updated, ...hist]);
      return updated;
    });
    toast.success("Vital sign recorded in ABHA Electronic Health Record (EHR)");
  }, []);

  // ─── Connected Devices ─────────────────────────────────────────────────────
  const [connectedDevices, setConnectedDevices] = useState<ConnectedDevice[]>(INITIAL_DEVICES);

  const toggleDeviceConnection = useCallback((id: string) => {
    soundFx.playSoftClick(true);
    setConnectedDevices((prev) =>
      prev.map((dev) =>
        dev.id === id
          ? { ...dev, connected: !dev.connected, lastSynced: !dev.connected ? "Just now" : dev.lastSynced }
          : dev
      )
    );
  }, []);

  // ─── Telehealth Virtual OPD Studio ─────────────────────────────────────────
  const [appointments, setAppointments] = useState<TelehealthAppointment[]>(() => {
    if (typeof window === "undefined") return INITIAL_APPOINTMENTS;
    try {
      const saved = localStorage.getItem("focusnext_in_appointments");
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });
  const [activeAppointment, setActiveAppointment] = useState<TelehealthAppointment | null>(null);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);

  const bookAppointment = useCallback(
    (newApt: Omit<TelehealthAppointment, "id" | "status" | "meetingRoomId">) => {
      const id = `apt-${Date.now()}`;
      const meetingRoomId = `room-${newApt.doctorName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Math.floor(100 + Math.random() * 900)}`;
      const fullApt: TelehealthAppointment = {
        ...newApt,
        id,
        status: "upcoming",
        meetingRoomId,
      };

      setAppointments((prev) => {
        const updated = [fullApt, ...prev];
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("focusnext_in_appointments", JSON.stringify(updated));
          } catch {}
        }
        return updated;
      });

      soundFx.playChime(true);
      toast.success(`Booked OPD with ${fullApt.doctorName} (${fullApt.date} • ${fullApt.time})`);
      return fullApt;
    },
    []
  );

  const startTelehealthCall = useCallback((appointmentId: string) => {
    const apt = appointments.find((a) => a.id === appointmentId) || appointments[0];
    setActiveAppointment(apt);
    setIsCallActive(true);
    soundFx.playFocusStart(true);
    toast.info(`Connecting to secure virtual OPD with ${apt.doctorName} (${apt.institution})...`);
  }, [appointments]);

  const endTelehealthCall = useCallback(() => {
    soundFx.playChime(true);
    setIsCallActive(false);
    toast.success("Consultation concluded. NMC e-Prescription & visit summary generated.");
  }, []);

  const toggleAudio = useCallback(() => {
    setIsAudioMuted((prev) => !prev);
    soundFx.playSoftClick(true);
  }, []);

  const toggleVideo = useCallback(() => {
    setIsVideoOff((prev) => !prev);
    soundFx.playSoftClick(true);
  }, []);

  // ─── Lab Biomarkers & Doorstep Phlebotomy (EHR) ─────────────────────────────
  const [labBiomarkers] = useState<LabBiomarker[]>(INITIAL_LABS);
  const [labBookings, setLabBookings] = useState<LabBooking[]>(() => {
    if (typeof window === "undefined") return INITIAL_LAB_BOOKINGS;
    try {
      const saved = localStorage.getItem("focusnext_in_lab_bookings");
      return saved ? JSON.parse(saved) : INITIAL_LAB_BOOKINGS;
    } catch {
      return INITIAL_LAB_BOOKINGS;
    }
  });

  const bookLabTest = useCallback(
    (booking: Omit<LabBooking, "id" | "status" | "phlebotomist">): LabBooking => {
      soundFx.playChime(true);
      const isDLPL = booking.labPartner === "Dr Lal PathLabs";
      const newBooking: LabBooking = {
        ...booking,
        id: (isDLPL ? "DLPL-" : "1MG-") + Math.floor(10000 + Math.random() * 90000),
        status: "scheduled",
        phlebotomist: {
          name: isDLPL ? "Suresh Rathod (Certified Phlebotomist)" : "Vikram Das (NABL Certified Tech)",
          phone: "+91 98451 " + Math.floor(10000 + Math.random() * 90000),
        },
      };

      setLabBookings((prev) => {
        const updated = [newBooking, ...prev];
        if (typeof window !== "undefined") {
          localStorage.setItem("focusnext_in_lab_bookings", JSON.stringify(updated));
        }
        return updated;
      });

      toast.success(
        `Slot Confirmed: ${newBooking.scheduledTime} with ${newBooking.labPartner}! Phlebotomist assigned.`
      );
      return newBooking;
    },
    []
  );

  const cancelLabBooking = useCallback((id: string) => {
    soundFx.playSoftClick(true);
    setLabBookings((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b));
      if (typeof window !== "undefined") {
        localStorage.setItem("focusnext_in_lab_bookings", JSON.stringify(updated));
      }
      return updated;
    });
    toast.info("Lab appointment cancelled. Refund initiated to source method.");
  }, []);

  // ─── Prescriptions & Doorstep Delivery ──────────────────────────────────────
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    if (typeof window === "undefined") return INITIAL_PRESCRIPTIONS;
    try {
      const saved = localStorage.getItem("focusnext_in_prescriptions");
      return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
    } catch {
      return INITIAL_PRESCRIPTIONS;
    }
  });

  const takeMedication = useCallback((id: string) => {
    soundFx.playSoftClick(true);
    setPrescriptions((prev) => {
      const updated = prev.map((rx) =>
        rx.id === id
          ? { ...rx, pillsRemaining: Math.max(0, rx.pillsRemaining - 1) }
          : rx
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("focusnext_in_prescriptions", JSON.stringify(updated));
      }
      return updated;
    });
    toast.success("Dose recorded in daily medication compliance schedule.");
  }, []);

  const requestRefill = useCallback((id: string) => {
    soundFx.playChime(true);
    setPrescriptions((prev) => {
      const updated = prev.map((rx) =>
        rx.id === id
          ? {
              ...rx,
              refillsLeft: Math.max(0, rx.refillsLeft - 1),
              pillsRemaining: rx.totalPills,
              pharmacy: {
                ...rx.pharmacy,
                deliveryStatus: "Processing" as const,
                estimatedArrival: "Express 45-min delivery to your PIN code",
              },
            }
          : rx
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("focusnext_in_prescriptions", JSON.stringify(updated));
      }
      return updated;
    });
    toast.success("Refill order placed with Tata 1mg / Apollo Pharmacy.");
  }, []);

  const orderPrescription = useCallback((order: Omit<Prescription, "id">): Prescription => {
    soundFx.playChime(true);
    const newRx: Prescription = {
      ...order,
      id: "rx-" + Date.now(),
    };
    setPrescriptions((prev) => {
      const updated = [newRx, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem("focusnext_in_prescriptions", JSON.stringify(updated));
      }
      return updated;
    });
    toast.success(`Express Order Placed: ${newRx.medicationName} via ${newRx.pharmacy.partner}!`);
    return newRx;
  }, []);

  // ─── AI Symptom Triage Engine (Indian Clinical Protocols) ───────────────────
  const [triageHistory, setTriageHistory] = useState<TriageQuestionnaire[]>([]);

  const evaluateTriage = useCallback(
    (
      chiefComplaint: string,
      duration: string,
      painLevel: number,
      associatedSymptoms: string[]
    ): TriageQuestionnaire => {
      const lower = chiefComplaint.toLowerCase();
      let severity: "self_care" | "routine_virtual" | "urgent_telehealth" | "emergency_er" = "routine_virtual";
      let recommendedAction = "Schedule a virtual OPD consultation with Dr. Ananya Iyer (AIIMS).";
      let clinicalReasoning = "Symptoms indicate mild to moderate physiological discomfort requiring standard clinical review.";

      if (
        lower.includes("chest pain") ||
        lower.includes("shortness of breath") ||
        lower.includes("sudden numbness") ||
        painLevel >= 9
      ) {
        severity = "emergency_er";
        recommendedAction = "Immediate Emergency Protocol Required. Call 112 / 108 for instant ambulance dispatch.";
        clinicalReasoning = "Potential acute cardiovascular or neurological event. High emergency triage urgency under NMC guidelines.";
      } else if (
        painLevel >= 6 ||
        lower.includes("fever") ||
        lower.includes("migraine") ||
        lower.includes("acute back pain") ||
        lower.includes("high bp")
      ) {
        severity = "urgent_telehealth";
        recommendedAction = "Connect with On-Demand Virtual OPD Doctor within 10 minutes.";
        clinicalReasoning = "Moderate symptom severity suitable for immediate physician evaluation and digital e-prescription.";
      } else if (lower.includes("fatigue") || lower.includes("stiff neck") || lower.includes("eye strain") || lower.includes("desk pain")) {
        severity = "self_care";
        recommendedAction = "Initiate ergonomic 20-20-20 eye pause, hydration, and cervical spine relaxation exercises.";
        clinicalReasoning = "Classic IT desk fatigue markers responsive to conservative behavioral and ergonomic therapy.";
      }

      const assessment: TriageQuestionnaire = {
        chiefComplaint,
        duration,
        painLevel,
        associatedSymptoms,
        severity,
        recommendedAction,
        clinicalReasoning,
      };

      setTriageHistory((prev) => [assessment, ...prev]);
      return assessment;
    },
    []
  );

  // ─── 24/7 Care Team Messaging ──────────────────────────────────────────────
  const [careMessages, setCareMessages] = useState<ClinicalMessage[]>(INITIAL_MESSAGES);
  const [isCareTeamTyping, setIsCareTeamTyping] = useState(false);

  const sendCareMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    const patientMsg: ClinicalMessage = {
      id: "msg-" + Date.now(),
      sender: "patient",
      senderName: patient?.name || "Aarav Sharma",
      text,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };

    setCareMessages((prev) => [...prev, patientMsg]);
    setIsCareTeamTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = `Namaste ${patient?.name?.split(" ")[0] || "Aarav"}. I have reviewed your latest Omron BP and glucose telemetry. Please continue your morning walk routine and let us know if any new symptoms arise.`;

      if (lower.includes("bp") || lower.includes("blood pressure")) {
        reply = "Your blood pressure telemetry looks very stable today (118/76 mmHg). Continue taking Telmisartan 40mg after breakfast and maintain moderate sodium intake.";
      } else if (lower.includes("prescription") || lower.includes("refill") || lower.includes("medicine") || lower.includes("1mg")) {
        reply = "I've authorized your 30-day medication refill on Tata 1mg / Apollo Pharmacy. Express delivery will reach your address shortly.";
      } else if (lower.includes("appointment") || lower.includes("doctor") || lower.includes("aiims")) {
        reply = "Dr. Ananya Iyer is available in the Virtual OPD room. You can launch your video consultation directly from the Telehealth tab.";
      }

      const docMsg: ClinicalMessage = {
        id: "msg-" + (Date.now() + 1),
        sender: "doctor",
        senderName: "Dr. Ananya Iyer, MD",
        senderTitle: "Consultant Physician (AIIMS)",
        text: reply,
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      };

      setCareMessages((prev) => [...prev, docMsg]);
      setIsCareTeamTyping(false);
      soundFx.playChime(true);
    }, 900);
  }, [patient]);

  // ─── Emergency SOS Protocol (112 & 108 Ambulance Dispatch) ─────────────────
  const [emergencyActive, setEmergencyActive] = useState(false);

  const triggerEmergencyProtocol = useCallback(() => {
    setEmergencyActive(true);
    soundFx.playAlert(true);
    toast.error("Emergency SOS Activated. Alerting family contact and dispatching 112 / 108 medical summary.");
  }, []);

  const dismissEmergencyProtocol = useCallback(() => {
    setEmergencyActive(false);
    toast.info("Emergency protocol dismissed.");
  }, []);

  const value = useMemo(
    () => ({
      patient,
      isAuthenticated,
      login,
      loginWithProfile,
      updatePatientProfile,
      logout,
      vitals,
      vitalsHistory,
      addManualVital,
      connectedDevices,
      toggleDeviceConnection,
      appointments,
      activeAppointment,
      isCallActive,
      isAudioMuted,
      isVideoOff,
      startTelehealthCall,
      endTelehealthCall,
      toggleAudio,
      toggleVideo,
      bookAppointment,
      labBiomarkers,
      labBookings,
      bookLabTest,
      cancelLabBooking,
      prescriptions,
      takeMedication,
      requestRefill,
      orderPrescription,
      triageHistory,
      evaluateTriage,
      careMessages,
      isCareTeamTyping,
      sendCareMessage,
      emergencyActive,
      triggerEmergencyProtocol,
      dismissEmergencyProtocol,
    }),
    [
      patient,
      isAuthenticated,
      login,
      loginWithProfile,
      updatePatientProfile,
      logout,
      vitals,
      vitalsHistory,
      addManualVital,
      connectedDevices,
      toggleDeviceConnection,
      appointments,
      activeAppointment,
      isCallActive,
      isAudioMuted,
      isVideoOff,
      startTelehealthCall,
      endTelehealthCall,
      toggleAudio,
      toggleVideo,
      bookAppointment,
      labBiomarkers,
      labBookings,
      bookLabTest,
      cancelLabBooking,
      prescriptions,
      takeMedication,
      requestRefill,
      orderPrescription,
      triageHistory,
      evaluateTriage,
      careMessages,
      isCareTeamTyping,
      sendCareMessage,
      emergencyActive,
      triggerEmergencyProtocol,
      dismissEmergencyProtocol,
    ]
  );

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error("useHealth must be used within a HealthProvider");
  }
  return context;
}
