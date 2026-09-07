"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, Cookie, X } from "lucide-react";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("focusnext_in_cookie_consent");
      if (!saved) {
        timer = setTimeout(() => setIsVisible(true), 800);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleAcceptAll = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "focusnext_in_cookie_consent",
        JSON.stringify({ essential: true, telemetry: true, date: new Date().toISOString() })
      );
    }
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "focusnext_in_cookie_consent",
        JSON.stringify({ essential: true, telemetry: false, date: new Date().toISOString() })
      );
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xl z-50 bg-surface rounded-3xl border border-border shadow-elevated p-5 sm:p-6 animate-in slide-in-from-bottom-5 duration-300 text-foreground"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-wellness-light text-wellness-dark flex items-center justify-center shrink-0">
            <Cookie className="w-4 h-4 text-wellness" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground flex items-center gap-1.5">
              <span>Patient Privacy &amp; Health Data Consent</span>
              <Badge variant="sage">DPDP Act 2023</Badge>
            </h2>
          </div>
        </div>

        <button
          onClick={handleEssentialOnly}
          className="w-7 h-7 rounded-full flex items-center justify-center text-foreground-secondary hover:text-foreground hover:bg-background-subtle transition-colors"
          aria-label="Dismiss cookie notice with essential cookies only"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-xs text-foreground-secondary leading-relaxed mt-2.5">
        We use essential cookies strictly to maintain your authenticated ABHA session and encrypted clinical telemetry. We <strong>never</strong> use third-party advertising cookies or track cross-site browsing. Read our{" "}
        <Link href="/cookies-policy" className="text-wellness font-semibold underline hover:text-wellness-dark">
          Cookies Policy
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-wellness font-semibold underline hover:text-wellness-dark">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-4 border-t border-border mt-3.5">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleEssentialOnly}
          className="text-xs"
        >
          Essential Only
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAcceptAll}
          className="text-xs gap-1.5 font-semibold"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Accept &amp; Continue</span>
        </Button>
      </div>
    </div>
  );
}
