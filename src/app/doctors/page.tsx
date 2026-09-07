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
import { DoctorBookingModal } from "@/components/common/DoctorBookingModal";
import {
  Video,
  ShieldCheck,
  Star,
  Award,
  CheckCircle2,
  Languages,
  Search,
  Stethoscope,
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  category: "all" | "general" | "spine" | "eye" | "metabolic" | "cardio";
  institution: string;
  experience: string;
  regNumber: string;
  fee: number;
  rating: number;
  reviewsCount: number;
  availableSlot: string;
  languages: string[];
  initials: string;
  bio: string;
}

const DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Ananya Iyer, MD",
    title: "Consultant Physician & Cardiometabolic Specialist",
    specialty: "Internal Medicine, Hypertension & Pre-Diabetes",
    category: "general",
    institution: "AIIMS New Delhi (Alumna)",
    experience: "14+ Years Clinical Practice",
    regNumber: "NMC/DMC-48912/2014",
    fee: 199,
    rating: 4.95,
    reviewsCount: 342,
    availableSlot: "Available Now • ~4m wait",
    languages: ["English", "Hindi", "Tamil"],
    initials: "AI",
    bio: "Specializes in virtual primary care, acute fever/viral syndromes, lifestyle chronic disease reversal, and official medical sick leave certification for remote tech professionals.",
  },
  {
    id: "doc-2",
    name: "Dr. Rajesh Kulkarni, MS",
    title: "Senior Consultant Orthopedic Surgeon & Spine Specialist",
    specialty: "Tech Neck, Cervical Spondylosis & Ergonomic PT",
    category: "spine",
    institution: "CMC Vellore (Alumnus)",
    experience: "12+ Years Clinical Practice",
    regNumber: "NMC/KMC-61204/2016",
    fee: 499,
    rating: 4.92,
    reviewsCount: 289,
    availableSlot: "Today, 11:30 AM IST",
    languages: ["English", "Hindi", "Kannada", "Marathi"],
    initials: "RK",
    bio: "Pioneered virtual spine decompression physical therapy and workstation ergonomics audits for remote developers across Bengaluru, Hyderabad, and Pune tech hubs.",
  },
  {
    id: "doc-3",
    name: "Dr. Meenakshi Sundaram, MS, DNB",
    title: "Consultant Ophthalmologist & Screen Fatigue Specialist",
    specialty: "Computer Vision Syndrome & 20-20-20 Eye Strain",
    category: "eye",
    institution: "Sankara Nethralaya Chennai",
    experience: "10+ Years Clinical Practice",
    regNumber: "NMC/TMC-55910/2018",
    fee: 299,
    rating: 4.89,
    reviewsCount: 215,
    availableSlot: "Today, 02:00 PM IST",
    languages: ["English", "Tamil", "Hindi"],
    initials: "MS",
    bio: "Treats digital eye fatigue, dry eyes from continuous monitor staring, blue-light tension headaches, and prescribes lubricating drops via Apollo Pharmacy 45-minute delivery.",
  },
  {
    id: "doc-4",
    name: "Dr. Priya Nair, MD, DM",
    title: "Senior Consultant Endocrinologist",
    specialty: "Type 2 Diabetes Reversal & PCOS Management",
    category: "metabolic",
    institution: "PGIMER Chandigarh",
    experience: "11+ Years Clinical Practice",
    regNumber: "NMC/PMC-77291/2017",
    fee: 499,
    rating: 4.96,
    reviewsCount: 410,
    availableSlot: "Tomorrow, 09:30 AM IST",
    languages: ["English", "Hindi", "Malayalam"],
    initials: "PN",
    bio: "Integrates continuous glucose telemetry (Accu-Chek / CGM) and ICMR metabolic protocols for long-term glycemic recovery without extreme caloric deficits.",
  },
  {
    id: "doc-5",
    name: "Dr. Arvind Swaminathan, MD, DM",
    title: "Consultant Cardiologist & Hypertension Lead",
    specialty: "Essential Hypertension & Preventative Heart Care",
    category: "cardio",
    institution: "AIIMS New Delhi",
    experience: "16+ Years Clinical Practice",
    regNumber: "NMC/DMC-39102/2012",
    fee: 499,
    rating: 4.97,
    reviewsCount: 520,
    availableSlot: "Today, 04:30 PM IST",
    languages: ["English", "Hindi", "Telugu"],
    initials: "AS",
    bio: "Supervises cellular Omron smart blood pressure telemetry data streams, titrating antihypertensive dosages with zero hospital queues.",
  },
  {
    id: "doc-6",
    name: "Dr. Rohan Mehra, MD",
    title: "Consultant Physician & Pulmonologist",
    specialty: "Seasonal Respiratory Illness & Urban Air Smog Care",
    category: "general",
    institution: "KEM Hospital Mumbai",
    experience: "15+ Years Clinical Practice",
    regNumber: "NMC/MMC-43180/2013",
    fee: 299,
    rating: 4.88,
    reviewsCount: 198,
    availableSlot: "Today, 12:15 PM IST",
    languages: ["English", "Hindi", "Gujarati"],
    initials: "RM",
    bio: "Focuses on asthma, smog-induced bronchitis across Delhi NCR and Mumbai, SpO2 monitoring, and fast nebulization prescriptions.",
  },
];

export default function DoctorsPage() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string | undefined>(undefined);

  const handleConsultDoctor = (doctorId?: string) => {
    setSelectedDoctorForBooking(doctorId);
    setBookingModalOpen(true);
  };

  const categories = [
    { id: "all", label: "All Specialists" },
    { id: "general", label: "General & OPD (₹199)" },
    { id: "spine", label: "Spine & Desk PT" },
    { id: "eye", label: "Digital Eye Strain" },
    { id: "metabolic", label: "Diabetes & PCOS" },
    { id: "cardio", label: "Cardiology & BP" },
  ];

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.institution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#CBD7CE] selection:text-[#171717]">
      {/* Navigation */}
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCommand={() => setCommandMenuOpen(true)}
      />

      <main className="flex-1 pt-32 pb-24">
        <div className="container max-w-6xl">
          {/* Header Banner */}
          <div className="max-w-3xl mb-12 space-y-4">
            <Badge variant="sage" className="gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
              <span>NMC & ABDM Verified Medical Practitioners</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
              Find AIIMS & CMC specialists for 10-minute virtual OPD.
            </h1>
            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
              Consult verified board-certified physicians across India. Get digital prescriptions, lab test orders with Dr Lal PathLabs, and official medical leave certificates—all from your desk.
            </p>
          </div>

          {/* Search & Specialty Filter Controls */}
          <div className="space-y-4 mb-10">
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-foreground-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by physician name, AIIMS/CMC, spine, eyes, or condition..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface border border-border text-foreground text-sm focus:outline-none focus:border-wellness focus:ring-2 focus:ring-wellness/20 shadow-subtle"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-wellness text-white shadow-subtle"
                        : "bg-surface text-foreground-secondary hover:text-foreground border border-border hover:bg-background-subtle"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Doctor Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="p-6 rounded-3xl bg-surface border border-border shadow-card hover:border-[#CBD7CE] hover:shadow-elevated transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Doctor Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-wellness-light text-wellness-dark flex items-center justify-center text-lg font-bold shadow-subtle border border-[#CBD7CE] shrink-0">
                        {doc.initials}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-bold text-foreground">{doc.name}</h2>
                          <span title="Verified Medical License">
                            <CheckCircle2 className="w-4 h-4 text-wellness" />
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-wellness">{doc.institution}</p>
                        <p className="text-xs text-foreground-secondary">{doc.title}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-foreground">₹{doc.fee}</div>
                      <div className="text-[10px] text-foreground-muted">per consultation</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-foreground-secondary leading-relaxed bg-background-subtle p-3 rounded-2xl border border-border">
                    {doc.bio}
                  </p>

                  {/* Badges & Meta */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-foreground-secondary">
                      <Award className="w-3.5 h-3.5 text-wellness" />
                      <span>{doc.experience}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground-secondary font-mono text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
                      <span>{doc.regNumber}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground-secondary">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-foreground">{doc.rating}</span>
                      <span className="text-foreground-muted">({doc.reviewsCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground-secondary">
                      <Languages className="w-3.5 h-3.5 text-wellness" />
                      <span className="truncate">{doc.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold">{doc.availableSlot}</span>
                  </div>

                  <Button
                    variant="sage"
                    size="sm"
                    onClick={() => handleConsultDoctor(doc.id)}
                    className="gap-2 font-semibold text-xs shadow-subtle"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Book Video OPD (₹{doc.fee})</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="p-12 text-center bg-surface rounded-3xl border border-border space-y-3">
              <Stethoscope className="w-8 h-8 text-foreground-muted mx-auto" />
              <h3 className="text-base font-bold text-foreground">No specialists found</h3>
              <p className="text-xs text-foreground-secondary">
                Try searching for a different symptom, AIIMS, or resetting your filter.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Search
              </Button>
            </div>
          )}

          {/* Clinical Assurance Strip */}
          <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-surface border border-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-foreground">
                Need an immediate doctor evaluation right now?
              </h3>
              <p className="text-xs text-foreground-secondary">
                Connect with our on-duty AIIMS general physician in ~4 minutes. Instant digital prescriptions & medical leave letters.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => handleConsultDoctor()}
              className="bg-wellness hover:bg-wellness-hover text-white gap-2 font-bold text-xs shrink-0 px-6 h-11 rounded-2xl shadow-subtle"
            >
              <Video className="w-4 h-4" />
              <span>Connect with On-Duty Doctor</span>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <PatientAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => router.push("/app?view=telehealth")}
      />

      {/* Floating Health Dock */}
      <FloatingHealthDock
        onOpenCommand={() => setCommandMenuOpen(true)}
        onOpenConsult={() => handleConsultDoctor()}
      />

      {/* Command Menu */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
        onOpenCertificate={() => setCertModalOpen(true)}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      {/* Medical Certificate Modal */}
      <MedicalCertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
      />

      {/* Doctor Video OPD Booking Modal */}
      <DoctorBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedDoctorId={selectedDoctorForBooking}
      />
    </div>
  );
}
