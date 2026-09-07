"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PatientAuthModal } from "@/components/auth/PatientAuthModal";
import { CommandMenu } from "@/components/common/CommandMenu";
import {
  Cookie,
  ShieldCheck,
  Calendar,
  Lock,
  Trash2,
  Sliders,
} from "lucide-react";
import { toast } from "sonner";

export default function CookiesPolicyPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  const handleClearPreferences = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("focusnext_in_cookie_consent");
      toast.success("Cookie preferences reset. The consent banner will reappear on your next visit.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#CBD7CE] selection:text-[#171717]">
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCommand={() => setCommandMenuOpen(true)}
      />

      <main className="flex-1 pt-32 pb-24">
        <div className="container max-w-4xl space-y-12">
          {/* Header */}
          <div className="space-y-4 border-b border-border pb-8">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="sage" className="gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
                <span>Zero Third-Party Ad Trackers</span>
              </Badge>
              <Badge variant="outline">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Last Updated: September 2026</span>
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Cookies &amp; Local Storage Policy
            </h1>

            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
              We respect your digital privacy. FocusNext Health India does not use intrusive tracking cookies, third-party advertising pixels, or cross-site data brokers.
            </p>
          </div>

          {/* Core Stance Banner */}
          <div className="p-6 rounded-3xl bg-wellness-light/50 border border-wellness/30 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <Lock className="w-5 h-5 text-wellness" />
                <span>Strict Healthcare Privacy Standard</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                Under the Indian DPDP Act 2023 and medical confidentiality codes, sensitive medical telemetry and clinical data are never shared with advertising networks or social platforms.
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleClearPreferences}
              className="text-xs gap-1.5 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Cookie Preferences</span>
            </Button>
          </div>

          {/* Details */}
          <div className="space-y-10 text-sm leading-relaxed text-foreground-secondary">
            {/* 1. What We Use */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Cookie className="w-5 h-5 text-wellness shrink-0" />
                <span>1. Essential Cookies &amp; Local Storage Keys</span>
              </h2>
              <p>
                Our platform uses minimal, first-party browser storage exclusively to maintain your authenticated patient session and portal clinical state:
              </p>

              <div className="border border-border rounded-2xl overflow-hidden bg-surface">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-background-subtle border-b border-border text-foreground-secondary uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Key / Cookie Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Lifespan</th>
                      <th className="p-3">Clinical Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-foreground">
                    <tr>
                      <td className="p-3 font-mono font-bold">focusnext_in_patient</td>
                      <td className="p-3"><Badge variant="sage">Strictly Necessary</Badge></td>
                      <td className="p-3">Persistent until Sign-out</td>
                      <td className="p-3 text-foreground-secondary">Stores validated ABHA ID, patient profile, and e-KYC status.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold">focusnext_in_appointments</td>
                      <td className="p-3"><Badge variant="sage">Strictly Necessary</Badge></td>
                      <td className="p-3">Session</td>
                      <td className="p-3 text-foreground-secondary">Retains booked virtual OPD slots and meeting room IDs.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold">focusnext_in_cookie_consent</td>
                      <td className="p-3"><Badge variant="outline">Preferences</Badge></td>
                      <td className="p-3">180 Days</td>
                      <td className="p-3 text-foreground-secondary">Stores your privacy and cookie choice (accept / custom).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 2. What We Explicitly Do NOT Use */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-wellness shrink-0" />
                <span>2. What We Strictly Reject</span>
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-foreground-secondary">
                <li><strong>No Third-Party Advertising Pixels:</strong> We do NOT embed Meta Pixel, TikTok Pixel, Google Ads remarketing, or third-party retargeting scripts.</li>
                <li><strong>No Fingerprinting:</strong> We do not track cross-site browsing habits or canvas fingerprints.</li>
                <li><strong>No Data Brokering:</strong> Your vitals, diagnostic blood test choices, and prescription refills remain strictly confined to your encrypted health locker.</li>
              </ul>
            </section>

            {/* 3. Managing Your Browser Settings */}
            <section className="space-y-3 pt-4 border-t border-border">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sliders className="w-5 h-5 text-wellness shrink-0" />
                <span>3. Managing Your Browser Preferences</span>
              </h2>
              <p>
                You can block or clear local storage and cookies at any time via your browser settings (Chrome, Safari, Firefox, Edge, Brave). Please note that clearing strictly necessary patient storage will sign you out of your active ABHA patient session and require re-authentication.
              </p>
            </section>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-foreground-secondary">
            <Link href="/privacy-policy" className="hover:text-wellness font-semibold transition-colors">
              ← View Privacy Policy (DPDP Act)
            </Link>
            <Link href="/terms" className="hover:text-wellness font-semibold transition-colors">
              Terms &amp; Conditions →
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <PatientAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
      />
    </div>
  );
}
