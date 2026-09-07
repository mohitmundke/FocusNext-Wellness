"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Download, ShieldCheck, QrCode, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { soundFx } from "@/lib/sound";
import { cn } from "@/lib/utils";

export function ABHACardGeneratorSection() {
  const [formData, setFormData] = useState({
    name: "Aarav Sharma",
    phone: "+91 98450 12345",
    dob: "12-08-1990",
    gender: "Male",
    bloodGroup: "B+",
    state: "Karnataka",
    abhaNumber: "91-4421-8890-1204",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    // 1. Legal Name
    const nameTrimmed = formData.name.trim();
    if (!nameTrimmed || nameTrimmed.length < 2) {
      errs.name = "Legal name must be at least 2 characters.";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(nameTrimmed)) {
      errs.name = "Name can only contain alphabetic letters and spaces.";
    }

    // 2. Phone (Indian Mobile 10 digits starting 6-9)
    const digitsOnly = formData.phone.replace(/\D/g, "");
    let candidate = digitsOnly;
    if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
      candidate = digitsOnly.slice(2);
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
      candidate = digitsOnly.slice(1);
    }

    if (!candidate) {
      errs.phone = "Mobile number is required.";
    } else if (candidate.length !== 10 || !/^[6-9]\d{9}$/.test(candidate)) {
      errs.phone = "Must be a 10-digit Indian mobile number (starts with 6-9).";
    }

    // 3. Date of Birth
    const dobTrimmed = formData.dob.trim();
    if (!dobTrimmed) {
      errs.dob = "Date of birth is required.";
    } else if (!/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$|^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(dobTrimmed)) {
      errs.dob = "Enter valid date (e.g. 12-08-1990).";
    }

    // 4. State
    const stateTrimmed = formData.state.trim();
    if (!stateTrimmed || stateTrimmed.length < 2) {
      errs.state = "State or Union Territory is required.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGenerateNew = () => {
    if (!validateForm()) {
      soundFx.playAlert(true);
      toast.error("Please provide valid patient details before generating a new ABHA number.");
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setFormData((prev) => ({
      ...prev,
      abhaNumber: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${randomSuffix}`,
    }));
    soundFx.playChime(true);
    toast.success("Generated new 14-digit ABHA Health ID");
  };

  const handleDownload = () => {
    if (!validateForm()) {
      soundFx.playAlert(true);
      toast.error("Please fix form errors before downloading your ABHA Health Card.");
      return;
    }

    soundFx.playFocusStart(true);
    toast.success("Downloading official ABHA Health Card (PDF) to device...");
  };

  return (
    <section className="py-24 md:py-32 bg-background-subtle border-t border-border">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Ayushman Bharat Digital Mission (ABDM)
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Generate your digital ABHA health card.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Create and link your 14-digit Ayushman Bharat Health Account (ABHA). Unify your consultation summaries, diagnostic lab reports, and doctor prescriptions into one secure national health locker.
          </p>
        </div>

        {/* 2-Column Layout: Left Form + Right Live ABHA Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Form (5 Cols) */}
          <div className="lg:col-span-5 bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-card space-y-4">
            <div className="pb-3 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">ABHA Card Customizer</h3>
              <button
                type="button"
                onClick={handleGenerateNew}
                className="text-xs text-wellness hover:underline flex items-center gap-1 font-medium"
              >
                <RefreshCw className="w-3 h-3" />
                <span>New Number</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Legal Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  className={cn(
                    "w-full px-3 py-2 text-xs sm:text-sm bg-background-subtle border rounded-xl text-foreground focus:outline-none transition-colors",
                    errors.name ? "border-red-400 bg-red-50/20 focus:border-red-500" : "border-border focus:border-wellness"
                  )}
                />
                {errors.name && (
                  <div className="flex items-center gap-1.5 text-xs text-red-600 mt-0.5">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Mobile (+91)</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-xs sm:text-sm bg-background-subtle border rounded-xl text-foreground font-mono focus:outline-none transition-colors",
                      errors.phone ? "border-red-400 bg-red-50/20 focus:border-red-500" : "border-border focus:border-wellness"
                    )}
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Date of Birth</label>
                  <input
                    type="text"
                    value={formData.dob}
                    onChange={(e) => {
                      setFormData({ ...formData, dob: e.target.value });
                      if (errors.dob) setErrors((prev) => ({ ...prev, dob: "" }));
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-xs sm:text-sm bg-background-subtle border rounded-xl text-foreground focus:outline-none transition-colors",
                      errors.dob ? "border-red-400 bg-red-50/20 focus:border-red-500" : "border-border focus:border-wellness"
                    )}
                  />
                  {errors.dob && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.dob}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-background-subtle border border-border rounded-xl text-foreground"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => {
                      setFormData({ ...formData, state: e.target.value });
                      if (errors.state) setErrors((prev) => ({ ...prev, state: "" }));
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-xs sm:text-sm bg-background-subtle border rounded-xl text-foreground focus:outline-none transition-colors",
                      errors.state ? "border-red-400 bg-red-50/20 focus:border-red-500" : "border-border focus:border-wellness"
                    )}
                  />
                  {errors.state && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.state}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <Button
                variant="sage"
                size="sm"
                onClick={handleDownload}
                className="w-full justify-center text-xs gap-1.5 font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ABHA Health Card (PDF)</span>
              </Button>
            </div>
          </div>

          {/* Right Live ABHA Card Preview (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            {/* Official Looking ABHA Card */}
            <div className="w-full max-w-md bg-surface rounded-3xl border-2 border-[#CBD8CE] p-6 shadow-elevated space-y-6 relative overflow-hidden">
              {/* National Emblem & ABDM Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                    IN
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground tracking-tight">National Health Authority</h4>
                    <p className="text-[9px] text-foreground-secondary uppercase tracking-wider">Ayushman Bharat Digital Mission (ABDM)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-wellness font-mono bg-wellness-light px-2 py-0.5 rounded-full">
                  ABHA ID
                </span>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Photo Avatar */}
                <div className="col-span-4 flex flex-col items-center space-y-2">
                  <div className="w-20 h-24 rounded-xl bg-background-subtle border border-border flex items-center justify-center text-foreground font-bold text-xl shadow-subtle">
                    {formData.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-red-100 text-red-700">
                    {formData.bloodGroup}
                  </span>
                </div>

                {/* Patient Information */}
                <div className="col-span-8 space-y-1.5 text-xs">
                  <div>
                    <span className="text-[10px] text-foreground-secondary uppercase">Name</span>
                    <div className="font-bold text-foreground text-sm">{formData.name}</div>
                  </div>

                  <div>
                    <span className="text-[10px] text-foreground-secondary uppercase">ABHA Number</span>
                    <div className="font-mono font-bold text-wellness-dark text-sm">{formData.abhaNumber}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 text-foreground">
                    <div>
                      <span className="text-[9px] text-foreground-secondary uppercase">DOB</span>
                      <div className="font-semibold">{formData.dob}</div>
                    </div>
                    <div>
                      <span className="text-[9px] text-foreground-secondary uppercase">Gender</span>
                      <div className="font-semibold">{formData.gender}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code & Barcode Footer */}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-foreground font-semibold">
                    ABHA Address: {formData.name.toLowerCase().replace(/\s+/g, "")}@abdm
                  </div>
                  <div className="text-[9px] text-foreground-muted">
                    Government of India • Ministry of Health and Family Welfare
                  </div>
                </div>

                {/* Simulated QR Code Graphic */}
                <div className="w-12 h-12 bg-background-subtle border border-border rounded-lg p-1 flex items-center justify-center text-foreground">
                  <QrCode className="w-9 h-9 text-foreground" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-foreground-muted">
              <ShieldCheck className="w-4 h-4 text-wellness" />
              <span>Compliant with National Digital Health Blueprint (NDHB) standards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
