"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useHealth, DEMO_PATIENTS } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import {
  Activity,
  Video,
  Sparkles,
  FileText,
  Pill,
  Settings,
  MessageSquare,
  AlertTriangle,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Heart,
  Users,
  ChevronDown,
  Armchair,
  Eye,
  Search,
  Globe,
  ArrowLeft,
  ArrowRight,
  Lock,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { VitalsDashboardView } from "./views/VitalsDashboardView";
import { PostureView } from "./views/PostureView";
import { EyeHealthView } from "./views/EyeHealthView";
import { TelehealthRoomView } from "./views/TelehealthRoomView";
import { ClinicalTriageView } from "./views/ClinicalTriageView";
import { BiomarkerLabView } from "./views/BiomarkerLabView";
import { PrescriptionsView } from "./views/PrescriptionsView";
import { MedicalSettingsView } from "./views/MedicalSettingsView";
import { FamilyHealthView } from "./views/FamilyHealthView";
import { CareTeamChatDrawer } from "./views/CareTeamChatDrawer";
import { EmergencyProtocolModal } from "./views/EmergencyProtocolModal";
import { CommandMenu } from "@/components/common/CommandMenu";
import { FloatingHealthDock } from "@/components/common/FloatingHealthDock";
import { MedicalCertificateModal } from "@/components/common/MedicalCertificateModal";
import { cn } from "@/lib/utils";

export function PatientPortalLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = useState<string>("vitals");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const { patient, isAuthenticated, logout, vitals, triggerEmergencyProtocol, loginWithProfile } = useHealth();
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync view from URL search param if present (?view=telehealth)
  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (viewParam) {
      setCurrentView(viewParam);
    }
  }, [searchParams]);

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { id: "vitals", label: "Vitals & Telemetry", icon: Activity },
    { id: "posture", label: "Desk Ergonomics & Posture", icon: Armchair },
    { id: "eye_health", label: "Digital Eye Strain (20-20-20)", icon: Eye },
    { id: "telehealth", label: "Virtual OPD (Telehealth)", icon: Video },
    { id: "family", label: "Family & Senior Parents", icon: Users },
    { id: "triage", label: "AI Symptom Triage", icon: Sparkles },
    { id: "labs", label: "Diagnostic Labs (Dr Lal/1mg)", icon: FileText },
    { id: "prescriptions", label: "Medicines & Delivery", icon: Pill },
    { id: "settings", label: "ABHA Health Profile", icon: Settings },
  ];

  const activeNav = navItems.find((n) => n.id === currentView) || navItems[0];
  const ActiveIcon = activeNav.icon;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // SSR loading skeleton
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-wellness-light text-wellness flex items-center justify-center animate-pulse">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-foreground-secondary">Verifying ABDM Patient Session...</span>
        </div>
      </div>
    );
  }

  // Mandatory ABHA Patient Identity Validation Gate
  if (!patient || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between selection:bg-[#CBD7CE] selection:text-[#171717]">
        {/* Top Minimal Navigation Bar */}
        <header className="w-full bg-surface/90 backdrop-blur-sm border-b border-border py-3.5 px-6 sm:px-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-wellness flex items-center justify-center text-white shadow-subtle transition-transform group-hover:scale-105">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5 leading-none">
                  <span className="font-bold text-foreground text-sm tracking-tight">FocusNext</span>
                  <span className="text-[10px] font-bold text-wellness uppercase tracking-wider">Swasthya</span>
                </div>
                <span className="text-[9px] text-foreground-muted font-medium">Virtual OPD & RPM Platform</span>
              </div>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background-subtle border border-border text-foreground-secondary hover:text-foreground hover:bg-wellness-light text-xs font-semibold transition-all shadow-subtle"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-wellness" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </header>

        {/* Identity Validation Gate Body */}
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10 sm:py-14 flex flex-col items-center justify-center">
          <div className="w-full bg-surface rounded-3xl border border-border p-6 sm:p-10 shadow-elevated space-y-8">
            {/* Header Badge & Title */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-wellness-light border border-[#CBD7CE] text-wellness-dark text-xs font-bold shadow-subtle">
                <ShieldCheck className="w-4 h-4 text-wellness" />
                <span>ABHA Patient Identity Validation Gate</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Identity Verification Required to Access Patient Portal
              </h1>

              <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                In compliance with the <strong className="text-foreground">National Medical Commission (NMC) Telemedicine Practice Guidelines</strong> and <strong className="text-foreground">ABDM (Ayushman Bharat Digital Mission)</strong> statutory framework, patient identity verification is mandatory prior to accessing confidential electronic health records, continuous biometric telemetry, and clinical OPD rooms.
              </p>
            </div>

            {/* Two Primary Action Routes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/login?redirect=/app"
                className="p-5 rounded-2xl border border-wellness/40 bg-wellness-light/40 hover:bg-wellness-light transition-all flex flex-col justify-between group shadow-subtle"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-wellness text-white flex items-center justify-center shadow-subtle">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-wellness-dark transition-colors">
                    Sign In with ABHA Account
                  </h3>
                  <p className="text-xs text-foreground-secondary leading-relaxed">
                    Already registered? Sign in with your 14-digit ABHA ID or email to securely unlock your active biometric telemetry, lab biomarkers, and assigned doctor.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-wellness-dark">
                  <span>Sign In Now</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              <Link
                href="/login?mode=signup&redirect=/app"
                className="p-5 rounded-2xl border border-border bg-background-subtle hover:bg-surface transition-all flex flex-col justify-between group shadow-subtle"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-background-subtle border border-border text-foreground flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-wellness" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-wellness-dark transition-colors">
                    Create New ABHA Account
                  </h3>
                  <p className="text-xs text-foreground-secondary leading-relaxed">
                    New to FocusNext Swasthya? Register in 60 seconds with instant 14-digit ABHA ID generation, Aadhaar e-KYC, and email verification.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>

            {/* Quick 1-Click Persona Validation Section */}
            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Instant 1-Click Persona Validation (Clinical Demonstration & Testing)
                  </h4>
                  <p className="text-[11px] text-foreground-secondary">
                    Select a pre-validated test persona to immediately evaluate all virtual OPD, posture telemetry, and diagnostic features:
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold shrink-0 self-start sm:self-auto">
                  Instant Access
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {DEMO_PATIENTS.map((demo) => (
                  <button
                    key={demo.id}
                    type="button"
                    onClick={() => loginWithProfile(demo)}
                    className="p-3.5 rounded-xl border border-border bg-background-subtle hover:bg-wellness-light hover:border-[#CBD7CE] text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-foreground group-hover:text-wellness-dark">
                          {demo.name}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-foreground-secondary bg-surface px-1.5 py-0.5 rounded border border-border">
                          {demo.bloodType}
                        </span>
                      </div>
                      <p className="text-[10px] text-foreground-secondary line-clamp-1">
                        {demo.city}
                      </p>
                      <p className="text-[10px] font-mono text-foreground-muted mt-1">
                        ABHA: {demo.abhaId}
                      </p>
                      <p className="text-[10px] text-wellness-dark font-medium mt-1 line-clamp-1">
                        {demo.chronicConditions[0]}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-[11px] font-bold text-wellness">
                      <span>Validate & Enter</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust and Compliance Badges */}
            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-[11px] text-foreground-muted font-medium">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
                  ABDM M1, M2 & M3 Certified
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-wellness" />
                  256-Bit AES Encryption
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  DISHA & HIPAA Standards
                </span>
              </div>

              <Link href="/" className="text-wellness hover:underline text-xs font-semibold">
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="w-full border-t border-border py-4 px-6 text-center text-[11px] text-foreground-muted">
          FocusNext Health India • ABDM Unified Health Interface (UHI) Node • 24/7 National Emergency: 112 / 108
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Clinical Header */}
      <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-border py-2.5 px-4 sm:px-6 shadow-subtle">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Mobile Trigger + Brand + Active View Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-xl border border-border text-foreground hover:bg-background-subtle"
            >
              {mobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-wellness flex items-center justify-center text-white shadow-subtle transition-transform group-hover:scale-105">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5 leading-none">
                  <span className="font-bold text-foreground text-sm tracking-tight">FocusNext</span>
                  <span className="text-[10px] font-bold text-wellness uppercase tracking-wider">Swasthya</span>
                </div>
                <span className="text-[9px] text-foreground-muted font-medium">OPD & RPM Portal</span>
              </div>
            </Link>

            {/* Return to Public Website Button */}
            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-background-subtle border border-border text-foreground-secondary hover:text-foreground hover:bg-wellness-light text-xs font-semibold transition-all shadow-subtle"
              title="Return to Public Website Homepage"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-wellness" />
              <span>Public Website</span>
            </Link>

            {/* Breadcrumb Pill (Desktop) */}
            <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-border text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-wellness-light text-wellness-dark font-semibold">
                <ActiveIcon className="w-3.5 h-3.5" />
                <span>{activeNav.label}</span>
              </div>
              <span className="text-[11px] text-foreground-muted font-mono">
                {patient?.city}
              </span>
            </div>

            {/* Live ABDM Validated Badge */}
            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ABDM Identity Validated (e-KYC Active)</span>
            </div>
          </div>

          {/* Center: Live Vitals Telemetry Monitor Dock (Desktop) */}
          <div className="hidden md:flex items-center gap-3.5 px-4 py-1.5 rounded-full bg-background-subtle border border-border text-xs font-mono shadow-subtle">
            <div className="flex items-center gap-1.5 text-foreground font-semibold">
              <span className="w-2 h-2 rounded-full bg-wellness animate-pulse" />
              <span className="text-[11px] text-foreground-muted font-sans font-medium uppercase tracking-wider">BP</span>
              <span>{vitals.systolicBP}/{vitals.diastolicBP}</span>
              <span className="text-[10px] text-foreground-muted font-sans">mmHg</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1 text-foreground font-semibold">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              <span>{vitals.heartRate}</span>
              <span className="text-[10px] text-foreground-muted font-sans">bpm</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1 text-foreground font-semibold">
              <span className="text-[11px] text-foreground-muted font-sans font-medium uppercase tracking-wider">SpO2</span>
              <span>{vitals.spO2}%</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1 text-foreground font-semibold">
              <span className="text-[11px] text-foreground-muted font-sans font-medium uppercase tracking-wider">Sugar</span>
              <span>{vitals.bloodGlucose}</span>
              <span className="text-[10px] text-foreground-muted font-sans">mg/dL</span>
            </div>
          </div>

          {/* Right: Actions + Persona Switcher */}
          <div className="flex items-center gap-2">
            {/* Quick Command Palette Button */}
            <button
              type="button"
              onClick={() => setCommandMenuOpen(true)}
              className="hidden sm:flex items-center gap-2 h-8 px-2.5 rounded-xl border border-border bg-background-subtle hover:bg-wellness-light hover:border-wellness/30 text-xs text-foreground-secondary hover:text-foreground transition-all shadow-subtle"
              title="Open Command Palette (Ctrl+K or ⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-wellness" />
              <span className="font-medium hidden md:inline">Quick Actions</span>
              <kbd className="text-[10px] font-mono bg-surface px-1.5 py-0.5 rounded border border-border text-foreground-muted font-semibold">
                ⌘K
              </kbd>
            </button>

            {/* 112 / 108 SOS Emergency Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={triggerEmergencyProtocol}
              className="text-red-600 border-red-200 hover:bg-red-50 text-xs gap-1.5 h-8 px-2.5 font-bold rounded-xl shadow-subtle"
              title="112 National Helpline & 108 State Ambulance SOS"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden sm:inline">112 / 108 SOS</span>
            </Button>

            {/* Care Team Chat Drawer Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setChatDrawerOpen(true)}
              className="text-xs gap-1.5 h-8 px-3 rounded-xl relative border-border"
            >
              <MessageSquare className="w-3.5 h-3.5 text-wellness" />
              <span className="hidden sm:inline">Doctor Chat</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 ring-2 ring-surface" />
            </Button>

            {/* Patient Persona Switcher Dropdown */}
            <div className="relative pl-1 border-l border-border">
              <button
                type="button"
                onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-background-subtle transition-colors border border-transparent hover:border-border"
                title="Switch Patient Persona"
              >
                <div className="w-8 h-8 rounded-xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold text-xs shadow-subtle border border-[#CBD7CE]">
                  {patient?.name?.split(" ").map((n) => n[0]).join("") || "AS"}
                </div>
                <div className="hidden lg:flex flex-col text-left leading-none">
                  <span className="text-xs font-bold text-foreground truncate max-w-[110px]">
                    {patient?.name}
                  </span>
                  <span className="text-[10px] text-foreground-muted font-mono">
                    ABHA: {patient?.abhaId ? patient.abhaId.slice(-4) : "1204"}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-foreground-muted" />
              </button>

              {/* Persona Selector Menu */}
              {personaDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-surface rounded-2xl border border-border shadow-elevated p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-border text-[11px] font-bold text-foreground-secondary uppercase tracking-wider">
                    Switch Clinical Persona
                  </div>
                  <div className="py-1 space-y-1">
                    {DEMO_PATIENTS.map((demo) => {
                      const isSelected = patient?.id === demo.id;
                      return (
                        <button
                          key={demo.id}
                          type="button"
                          onClick={() => {
                            loginWithProfile(demo);
                            setPersonaDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full px-3 py-2 text-left rounded-xl text-xs transition-all flex items-center justify-between",
                            isSelected
                              ? "bg-wellness-light text-wellness-dark font-bold"
                              : "text-foreground hover:bg-background-subtle font-medium"
                          )}
                        >
                          <div>
                            <div className="font-semibold">{demo.name}</div>
                            <div className="text-[10px] text-foreground-secondary">{demo.city} • {demo.bloodType}</div>
                          </div>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-wellness" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="pt-2 border-t border-border flex items-center justify-between px-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPersonaDropdownOpen(false);
                        handleLogout();
                      }}
                      className="text-xs text-red-600 hover:underline flex items-center gap-1.5 font-medium py-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out of ABHA</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 border-r border-border bg-surface p-6 space-y-6">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-foreground-muted px-3">
              ABHA Patient Portal
            </div>
            <nav className="space-y-1 pt-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentView(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all",
                      isActive
                        ? "bg-wellness-light border border-[#CBD8CE] text-foreground shadow-subtle"
                        : "text-foreground-secondary hover:text-foreground hover:bg-background-subtle"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-wellness" : "text-foreground-secondary")} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-border space-y-3 text-xs text-foreground-secondary">
            <div className="p-3.5 rounded-2xl bg-background-subtle border border-border space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-wellness-dark font-bold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
                  <span>ABHA ID Validated</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[10px] font-mono text-foreground font-semibold">
                {patient?.abhaId || "91-4421-8890-1204"}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>e-KYC Verified (ABDM Active)</span>
              </div>
              <p className="text-[11px] text-foreground-muted leading-relaxed pt-0.5">
                Assigned MD: {patient?.primaryPhysician || "Dr. Ananya Iyer (AIIMS New Delhi)"}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl border border-border bg-background-subtle hover:bg-wellness-light hover:border-[#CBD7CE] text-xs font-semibold text-foreground transition-all shadow-subtle"
              >
                <Globe className="w-3.5 h-3.5 text-wellness" />
                <span>Return to Public Website</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs flex">
            <div className="w-72 bg-surface h-full p-6 space-y-6 border-r border-border flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-sm font-bold text-foreground">Patient Navigation</span>
                  <button
                    type="button"
                    onClick={() => setMobileNavOpen(false)}
                    className="p-1 rounded-md text-foreground-secondary"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setCurrentView(item.id);
                          setMobileNavOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all",
                          isActive
                            ? "bg-wellness-light text-foreground"
                            : "text-foreground-secondary hover:text-foreground"
                        )}
                      >
                        <Icon className="w-4 h-4 text-wellness" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-border">
                <Link
                  href="/"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl border border-border bg-background-subtle hover:bg-wellness-light text-xs font-semibold text-foreground transition-all"
                >
                  <Globe className="w-4 h-4 text-wellness" />
                  <span>Return to Public Website</span>
                </Link>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileNavOpen(false)} />
          </div>
        )}

        {/* Center Content View Area */}
        <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto max-w-6xl mx-auto w-full">
          {currentView === "vitals" && <VitalsDashboardView onNavigate={(view) => setCurrentView(view)} />}
          {currentView === "posture" && <PostureView />}
          {currentView === "eye_health" && <EyeHealthView />}
          {currentView === "telehealth" && <TelehealthRoomView />}
          {currentView === "family" && <FamilyHealthView />}
          {currentView === "triage" && <ClinicalTriageView onNavigateToTelehealth={() => setCurrentView("telehealth")} />}
          {currentView === "labs" && <BiomarkerLabView />}
          {currentView === "prescriptions" && <PrescriptionsView />}
          {currentView === "settings" && <MedicalSettingsView />}
        </main>
      </div>

      {/* Embedded Floating Utilities */}
      <CareTeamChatDrawer isOpen={chatDrawerOpen} onClose={() => setChatDrawerOpen(false)} />
      <EmergencyProtocolModal />

      {/* Floating Health & Desk Break Dock */}
      <FloatingHealthDock
        onOpenCommand={() => setCommandMenuOpen(true)}
        onOpenConsult={() => setCurrentView("telehealth")}
        onNavigateView={(viewId) => setCurrentView(viewId)}
      />

      {/* Global Command Menu */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
        onOpenCertificate={() => setCertModalOpen(true)}
        onNavigateView={(viewId) => setCurrentView(viewId)}
      />

      {/* Official Doctor-Signed Medical Sick Leave Certificate Modal */}
      <MedicalCertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
      />
    </div>
  );
}
