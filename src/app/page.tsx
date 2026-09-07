"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { HealthHeroSection } from "@/components/landing/HealthHeroSection";
import { ClinicalTrustStrip } from "@/components/landing/ClinicalTrustStrip";
import { IndianHealthcareCrisisSection } from "@/components/landing/IndianHealthcareCrisisSection";
import { RemoteCareServices } from "@/components/landing/RemoteCareServices";
import { ABHACardGeneratorSection } from "@/components/landing/ABHACardGeneratorSection";
import { ConnectedDevicesSection } from "@/components/landing/ConnectedDevicesSection";
import { RPMHardwareKitSection } from "@/components/landing/RPMHardwareKitSection";
import { MetabolicRiskCalculator } from "@/components/landing/MetabolicRiskCalculator";
import { GeriatricCareSection } from "@/components/landing/GeriatricCareSection";
import { PCOSHealthSection } from "@/components/landing/PCOSHealthSection";
import { ClinicalTriageSection } from "@/components/landing/ClinicalTriageSection";
import { TelehealthExperienceSection } from "@/components/landing/TelehealthExperienceSection";
import { CityNetworkMapSection } from "@/components/landing/CityNetworkMapSection";
import { ClinicalCaseStudiesSection } from "@/components/landing/ClinicalCaseStudiesSection";
import { PhysiciansSection } from "@/components/landing/PhysiciansSection";
import { PricingCarePlans } from "@/components/landing/PricingCarePlans";
import { ClinicalFAQ } from "@/components/landing/ClinicalFAQ";
import { HealthFinalCTA } from "@/components/landing/HealthFinalCTA";
import { Footer } from "@/components/layout/Footer";
import { PatientAuthModal } from "@/components/auth/PatientAuthModal";
import { FloatingHealthDock } from "@/components/common/FloatingHealthDock";
import { CommandMenu } from "@/components/common/CommandMenu";
import { MedicalCertificateModal } from "@/components/common/MedicalCertificateModal";
import { DoctorBookingModal } from "@/components/common/DoctorBookingModal";

export default function HomePage() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string | undefined>(undefined);

  const handleConsultDoctor = (doctorId?: string) => {
    setSelectedDoctorForBooking(doctorId);
    setBookingModalOpen(true);
  };

  const handleExplore = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#CBD7CE] selection:text-[#171717]">
      {/* Navigation */}
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCommand={() => setCommandMenuOpen(true)}
      />

      {/* Main Landing Flow with Deep Buildup */}
      <main className="flex-1">
        {/* 1. Hero */}
        <HealthHeroSection
          onConsultDoctor={handleConsultDoctor}
          onExplore={handleExplore}
        />

        {/* 2. Trust Strip */}
        <ClinicalTrustStrip />

        {/* 3. The Indian Healthcare Crisis & Editorial Comparison */}
        <IndianHealthcareCrisisSection />

        {/* 4. Core Clinical Specialties */}
        <RemoteCareServices onConsult={handleConsultDoctor} />

        {/* 5. Interactive ABHA Digital Health Card Generator */}
        <ABHACardGeneratorSection />

        {/* 6. Medical IoT Hardware & Cellular Unboxing Kit */}
        <ConnectedDevicesSection />
        <RPMHardwareKitSection />

        {/* 7. ICMR Indian Cardiometabolic Risk Score Engine */}
        <MetabolicRiskCalculator onConsult={handleConsultDoctor} />

        {/* 8. Geriatric Care for Aging Parents Across India & NRIs */}
        <GeriatricCareSection onExplore={handleConsultDoctor} />

        {/* 9. Women's PCOS & Hormonal Health */}
        <PCOSHealthSection onConsult={handleConsultDoctor} />

        {/* 10. AI Clinical Symptom Navigator */}
        <ClinicalTriageSection onConsult={handleConsultDoctor} />

        {/* 11. Virtual OPD Video Studio Showcase */}
        <TelehealthExperienceSection onStartCall={handleConsultDoctor} />

        {/* 12. Pan-India 45-Min Logistics & City Network */}
        <CityNetworkMapSection />

        {/* 13. Verified Clinical Reversal Case Studies */}
        <ClinicalCaseStudiesSection />

        {/* 14. Top AIIMS & CMC Physicians Board */}
        <PhysiciansSection />

        {/* 15. Transparent INR (₹) Care Plans */}
        <PricingCarePlans onSelectPlan={handleConsultDoctor} />

        {/* 16. Indian Medical FAQs & 80D Tax Regulations */}
        <ClinicalFAQ />

        {/* 17. Final Conversion CTA */}
        <HealthFinalCTA
          onConsult={handleConsultDoctor}
          onExplore={handleExplore}
        />
      </main>

      {/* Footer with Indian 112 & 108 Legal Notice */}
      <Footer />

      {/* Patient Auth Modal */}
      <PatientAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => router.push("/app")}
      />

      {/* Floating Health & Desk Break Dock */}
      <FloatingHealthDock
        onOpenCommand={() => setCommandMenuOpen(true)}
        onOpenConsult={handleConsultDoctor}
      />

      {/* Global Command Palette */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
        onOpenCertificate={() => setCertModalOpen(true)}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      {/* Official Doctor-Signed Medical Sick Leave Certificate Modal */}
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
