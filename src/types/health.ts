export interface PatientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender?: "Male" | "Female" | "Other";
  bloodType: string;
  abhaId: string; // 14-digit Ayushman Bharat Health Account ID (e.g. 91-4421-8890-1204)
  pinCode: string; // Indian Postal Code (e.g. 560103)
  city: string;
  state?: string;
  address?: string;
  primaryPhysician: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface VitalRecord {
  timestamp: string;
  heartRate: number;        // bpm (e.g. 68)
  systolicBP: number;       // mmHg (e.g. 118)
  diastolicBP: number;      // mmHg (e.g. 76)
  spO2: number;             // % (e.g. 99)
  bloodGlucose: number;     // mg/dL (e.g. 96)
  temperature: number;      // °F (e.g. 98.4)
  respiratoryRate: number;  // breaths/min (e.g. 14)
  hrv: number;              // ms (e.g. 56)
}

export interface ConnectedDevice {
  id: string;
  name: string;
  brand: string;
  type: "bp" | "cgm" | "oximeter" | "scale" | "watch" | "ring";
  batteryLevel: number;
  lastSynced: string;
  connected: boolean;
}

export interface TelehealthAppointment {
  id: string;
  doctorName: string;
  doctorTitle: string;
  institution: string; // e.g. AIIMS New Delhi, CMC Vellore
  specialty: string;
  doctorAvatarUrl?: string;
  date: string;
  time: string;
  status: "upcoming" | "in_progress" | "completed" | "cancelled";
  meetingRoomId: string;
  clinicalNotes?: string;
  diagnosis?: string;
  prescriptionsGenerated?: string[];
}

export interface LabBiomarker {
  id: string;
  name: string;
  labPartner: string; // e.g. Dr Lal PathLabs, Tata 1mg, Apollo Diagnostics
  category: "Lipid Profile" | "Metabolic" | "Glycemic Control" | "Inflammatory" | "Vitamins";
  value: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
    optimal: string;
  };
  status: "optimal" | "normal" | "elevated" | "low";
  testedDate: string;
  clinicalNote: string;
  history: { date: string; value: number }[];
}

export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  instructions: string;
  pillsRemaining: number;
  totalPills: number;
  refillsLeft: number;
  prescribedBy: string;
  prescribedDate: string;
  pharmacy: {
    name: string;
    partner: "Apollo Pharmacy" | "Tata 1mg" | "PharmEasy" | "Netmeds";
    deliveryStatus: "Processing" | "Out for Delivery" | "Delivered";
    estimatedArrival: string;
  };
}

export type TriageSeverity = "self_care" | "routine_virtual" | "urgent_telehealth" | "emergency_er";

export interface TriageQuestionnaire {
  chiefComplaint: string;
  duration: string;
  painLevel: number; // 1 to 10
  associatedSymptoms: string[];
  severity: TriageSeverity;
  recommendedAction: string;
  clinicalReasoning: string;
}

export interface ClinicalMessage {
  id: string;
  sender: "patient" | "doctor" | "nurse" | "system";
  senderName: string;
  senderTitle?: string;
  text: string;
  timestamp: string;
  attachmentName?: string;
}

export interface LabBooking {
  id: string;
  packageName: string;
  labPartner: string;
  price: number;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  pinCode: string;
  fastingRequired: boolean;
  status: "scheduled" | "sample_collected" | "processing" | "report_ready" | "cancelled";
  phlebotomist: {
    name: string;
    phone: string;
  };
}
