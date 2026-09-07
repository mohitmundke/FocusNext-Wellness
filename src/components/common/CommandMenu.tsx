"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useHealth, DEMO_PATIENTS } from "@/lib/health-context";
import {
  Search,
  Video,
  Armchair,
  Eye,
  FileText,
  Pill,
  Sparkles,
  AlertTriangle,
  User,
  Activity,
  Calendar,
  X,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { soundFx } from "@/lib/sound";
import { toast } from "sonner";

interface CommandItem {
  id: string;
  category: "Clinical & OPD" | "Desk Ergonomics" | "Pharmacy & Labs" | "Clinical Personas" | "Website Pages" | "Emergency";
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  badge?: string;
  shortcut?: string;
}

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCertificate?: () => void;
  onOpenBooking?: () => void;
  onNavigateView?: (viewId: string) => void;
}

export function CommandMenu({
  isOpen,
  onClose,
  onOpenCertificate,
  onOpenBooking,
  onNavigateView,
}: CommandMenuProps) {
  const router = useRouter();
  const { triggerEmergencyProtocol, loginWithProfile } = useHealth();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleRouteOrView = (viewId: string, anchorHref?: string) => {
    onClose();
    if (onNavigateView) {
      onNavigateView(viewId);
    } else {
      if (anchorHref && window.location.pathname === "/") {
        const el = document.querySelector(anchorHref);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/app`);
      }
    }
    soundFx.playSoftClick(true);
  };

  const commands: CommandItem[] = [
    // Clinical & OPD
    {
      id: "book-specialist",
      category: "Clinical & OPD",
      title: "Book Video OPD Specialist Slot",
      subtitle: "Choose AIIMS/CMC specialist, date & evening slots till 11:30 PM",
      icon: Calendar,
      badge: "Evening Slots",
      shortcut: "B",
      action: () => {
        onClose();
        if (onOpenBooking) {
          onOpenBooking();
        } else {
          router.push("/doctors");
        }
      },
    },
    {
      id: "opd-instant",
      category: "Clinical & OPD",
      title: "Instant Virtual OPD Consultation",
      subtitle: "10-minute video visit with AIIMS & CMC doctors (from ₹199)",
      icon: Video,
      badge: "₹199 Intern / ₹499 Pro",
      shortcut: "O",
      action: () => handleRouteOrView("telehealth", "#telehealth"),
    },
    {
      id: "ai-triage",
      category: "Clinical & OPD",
      title: "AI Clinical Symptom Triage",
      subtitle: "Evaluate fever, headache, back strain & acute symptoms",
      icon: Sparkles,
      badge: "Instant",
      shortcut: "T",
      action: () => handleRouteOrView("triage", "#triage"),
    },
    {
      id: "vitals-telemetry",
      category: "Clinical & OPD",
      title: "Vitals & Telemetry Monitor",
      subtitle: "Continuous Omron BP, Accu-Chek Glucose & heart rate logs",
      icon: Activity,
      action: () => handleRouteOrView("vitals"),
    },

    // Desk Ergonomics
    {
      id: "desk-posture",
      category: "Desk Ergonomics",
      title: "Desk Ergonomics & Posture Alignment",
      subtitle: "Guided thoracic decompression & screen posture audit",
      icon: Armchair,
      badge: "Tech Neck",
      shortcut: "P",
      action: () => handleRouteOrView("posture", "#services"),
    },
    {
      id: "eye-strain",
      category: "Desk Ergonomics",
      title: "20-20-20 Digital Eye Strain Reset",
      subtitle: "Screen fatigue timer, tear-film exercise & ciliary muscle relief",
      icon: Eye,
      badge: "20-20-20",
      shortcut: "E",
      action: () => handleRouteOrView("eye_health", "#services"),
    },
    {
      id: "desk-risk-calc",
      category: "Desk Ergonomics",
      title: "Desk Strain & Tech Neck Risk Score",
      subtitle: "Calculate ergonomic score based on daily screen hours and chair",
      icon: Calendar,
      action: () => {
        onClose();
        if (window.location.pathname === "/") {
          document.querySelector("#risk-calculator")?.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push("/#risk-calculator");
        }
      },
    },

    // Pharmacy & Labs
    {
      id: "medical-cert",
      category: "Pharmacy & Labs",
      title: "Official Medical Sick Leave Certificate",
      subtitle: "Doctor-signed NMC certificate with QR code for HR / College",
      icon: FileText,
      badge: "Official NMC",
      shortcut: "M",
      action: () => {
        onClose();
        if (onOpenCertificate) {
          onOpenCertificate();
        } else {
          router.push("/app");
          toast.info("Please open Prescriptions in the portal to view certificate.");
        }
      },
    },
    {
      id: "medicines-delivery",
      category: "Pharmacy & Labs",
      title: "Order Prescriptions & Medicines",
      subtitle: "45-minute doorstep delivery via Apollo Pharmacy & Tata 1mg",
      icon: Pill,
      badge: "45-Min Express",
      action: () => handleRouteOrView("prescriptions"),
    },
    {
      id: "lab-tests",
      category: "Pharmacy & Labs",
      title: "Book 6:30 AM Home Sample Collection",
      subtitle: "Vitamin D3, B12, HbA1c & Lipids via Dr Lal PathLabs & 1mg",
      icon: ShieldCheck,
      badge: "80D Deductible",
      action: () => handleRouteOrView("labs"),
    },

    // Clinical Personas
    {
      id: "persona-aarav",
      category: "Clinical Personas",
      title: "Switch to Aarav Sharma (Senior Remote React Dev)",
      subtitle: "Bengaluru • 11h screen time • Tech neck & Vitamin D3 deficiency",
      icon: User,
      action: () => {
        loginWithProfile(DEMO_PATIENTS[0]);
        onClose();
        toast.success("Switched to Aarav Sharma (Senior Remote React Dev)");
      },
    },
    {
      id: "persona-priya",
      category: "Clinical Personas",
      title: "Switch to Priya Sundaram (UI/UX Design Intern)",
      subtitle: "Pune WFH • 12h screen time • Digital eye strain & PG acidity",
      icon: User,
      action: () => {
        loginWithProfile(DEMO_PATIENTS[1]);
        onClose();
        toast.success("Switched to Priya Sundaram (UI/UX Design Intern)");
      },
    },
    {
      id: "persona-ramesh",
      category: "Clinical Personas",
      title: "Switch to Ramesh Sharma (Hometown Senior Parent)",
      subtitle: "Pune • Senior Cardiac RPM • Monitored remotely by son Aarav",
      icon: User,
      action: () => {
        loginWithProfile(DEMO_PATIENTS[2]);
        onClose();
        toast.success("Switched to Ramesh Sharma (Hometown Senior Parent)");
      },
    },

    // Website Pages
    {
      id: "page-doctors",
      category: "Website Pages",
      title: "Find AIIMS & CMC Doctors & Specialists",
      subtitle: "Browse physician directory, experience, fees & reviews (/doctors)",
      icon: Stethoscope,
      badge: "Page",
      action: () => {
        onClose();
        router.push("/doctors");
      },
    },
    {
      id: "page-services",
      category: "Website Pages",
      title: "Desk Health & Clinical Services Hub",
      subtitle: "Explore Tech Neck PT, 20-20-20 Eye Strain & Labs (/services)",
      icon: Armchair,
      badge: "Page",
      action: () => {
        onClose();
        router.push("/services");
      },
    },
    {
      id: "page-pricing",
      category: "Website Pages",
      title: "Transparent Pricing & Care Plans",
      subtitle: "₹199 OPD, ₹499 Spine PT, ₹999/mo Chronic Care & 80D receipts (/pricing)",
      icon: FileText,
      badge: "Page",
      action: () => {
        onClose();
        router.push("/pricing");
      },
    },
    {
      id: "page-sick-leave",
      category: "Website Pages",
      title: "Doctor Sick Leave Certificate & NMC Guidelines",
      subtitle: "Legal telemedicine compliance, HR acceptance & sample specimen (/sick-leave)",
      icon: FileText,
      badge: "Page",
      action: () => {
        onClose();
        router.push("/sick-leave");
      },
    },
    {
      id: "page-contact",
      category: "Website Pages",
      title: "Contact & 24/7 Clinical Support",
      subtitle: "112/108 SOS emergency protocol & WhatsApp doctor helpline (/contact)",
      icon: ShieldCheck,
      badge: "Page",
      action: () => {
        onClose();
        router.push("/contact");
      },
    },

    // Emergency
    {
      id: "emergency-sos",
      category: "Emergency",
      title: "Trigger National Helpline 112 / 108 Ambulance SOS",
      subtitle: "Immediate emergency protocol & live dispatch coordinates",
      icon: AlertTriangle,
      badge: "EMERGENCY 112",
      action: () => {
        onClose();
        triggerEmergencyProtocol();
      },
    },
  ];

  // Filter commands by query
  const filtered = commands.filter((c) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    );
  });

  // Keyboard navigation inside modal
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/40 backdrop-blur-xs animate-in fade-in-50 duration-150">
      <div className="bg-surface rounded-3xl border border-border shadow-dropdown w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="px-5 py-4 border-b border-border flex items-center gap-3 bg-background-subtle">
          <Search className="w-5 h-5 text-foreground-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search health actions, ergonomics, doctor consults, or personas..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground-muted outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-foreground-muted hover:text-foreground rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1 flex-1" ref={listRef}>
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-foreground-secondary space-y-1">
              <p className="font-semibold text-foreground">No health commands found</p>
              <p>Try searching for &quot;posture&quot;, &quot;eye strain&quot;, &quot;doctor&quot;, or &quot;leave certificate&quot;</p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "w-full px-4 py-3 text-left rounded-2xl transition-all flex items-center justify-between gap-3 text-xs",
                    isSelected
                      ? "bg-wellness-light border border-[#CBD7CE] text-foreground shadow-subtle"
                      : "hover:bg-background-subtle text-foreground border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors",
                        item.category === "Emergency"
                          ? "bg-red-50 text-red-600 border-red-200"
                          : isSelected
                          ? "bg-surface text-wellness-dark border-[#CBD7CE]"
                          : "bg-background-subtle text-foreground-secondary border-border"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.badge && (
                          <span
                            className={cn(
                              "text-[10px] px-2 py-0.5 rounded-md font-mono font-bold tracking-tight",
                              item.category === "Emergency"
                                ? "bg-red-100 text-red-700"
                                : "bg-surface border border-border text-wellness-dark"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-foreground-secondary truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.shortcut && (
                      <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-surface border border-border text-[10px] font-mono text-foreground-muted">
                        {item.shortcut}
                      </kbd>
                    )}
                    <ChevronRight className="w-4 h-4 text-foreground-muted" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-5 py-2.5 bg-background-subtle border-t border-border flex items-center justify-between text-[11px] text-foreground-muted">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-surface border border-border px-1 py-0.5 rounded">↑</kbd>{" "}
              <kbd className="font-mono bg-surface border border-border px-1 py-0.5 rounded">↓</kbd> navigate
            </span>
            <span>
              <kbd className="font-mono bg-surface border border-border px-1.5 py-0.5 rounded">↵</kbd> select
            </span>
            <span>
              <kbd className="font-mono bg-surface border border-border px-1.5 py-0.5 rounded">esc</kbd> close
            </span>
          </div>
          <span className="font-mono">FocusNext Health Cmd</span>
        </div>
      </div>
    </div>
  );
}
