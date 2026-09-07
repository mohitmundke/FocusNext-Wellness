"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, ShieldCheck, Box } from "lucide-react";
import { cn } from "@/lib/utils";

export function RPMHardwareKitSection() {
  const [selectedDevice, setSelectedDevice] = useState(0);

  const kitItems = [
    {
      title: "Omron Smart BP Monitor",
      model: "HEM-7156T Bluetooth",
      badge: "Clinical Standard",
      desc: "Pre-calibrated 360° accuracy IntelliWrap cuff. Streams systolic, diastolic, and pulse measurements automatically to your AIIMS doctor.",
      specs: ["360° Accuracy Cuff", "Hypertension Indicator", "Bluetooth Sync", "Dual User Memory"],
    },
    {
      title: "Accu-Chek Guide Wireless Sensor",
      model: "Continuous Glycemic Sensor",
      badge: "Diabetes Reversal",
      desc: "Spill-resistant test strip design with 0.6 micro-liter blood sample size. Instant cloud syncing to the ABHA portal.",
      specs: ["4-Second Result", "Pre & Post Meal Markers", "ABHA Auto-Upload", "Zero Calibration"],
    },
    {
      title: "Nonin Pulse Oximeter",
      model: "Medical Wireless SpO2",
      badge: "Cardiopulmonary",
      desc: "PureSAT technology for accurate oxygen saturation and pulse rate readings across all skin pigmentation and perfusion levels.",
      specs: ["Arterial Oxygen (SpO2)", "Perfusion Index", "Drop-Tested Durability", "Instant Cloud Log"],
    },
    {
      title: "FocusNext Cellular Hub",
      model: "Plug & Play Cellular Gateway",
      badge: "For Senior Parents",
      desc: "Pre-installed Airtel / Jio 4G M2M SIM card. Elderly parents simply plug it in — zero Wi-Fi passwords, Bluetooth pairing, or smartphone app required.",
      specs: ["Pre-Activated 4G SIM", "Zero Wi-Fi Needed", "99.9% Cloud Uptime", "Backup Battery"],
    },
  ];

  const current = kitItems[selectedDevice];

  return (
    <section className="py-24 md:py-32 bg-background-subtle border-t border-border">
      <div className="container">
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            FocusNext Medical Device Kit
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Clinical-grade hardware. Pre-configured for your home.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Included with our Chronic Care RPM plans. Delivered to your doorstep in India, pre-paired with your ABHA ID for instant out-of-the-box measuring.
          </p>
        </div>

        {/* 4 Items Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-1.5 bg-surface rounded-3xl border border-border mb-12 shadow-card">
          {kitItems.map((item, idx) => {
            const isSelected = selectedDevice === idx;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setSelectedDevice(idx)}
                className={cn(
                  "p-4 rounded-2xl text-left transition-all flex flex-col justify-between space-y-2",
                  isSelected
                    ? "bg-wellness-light/60 border border-[#CBD7CE] text-foreground font-semibold shadow-subtle"
                    : "text-foreground-secondary hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-wellness font-bold">0{idx + 1}</span>
                  <span className="text-[10px] font-semibold text-wellness-dark">{item.badge}</span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold">{item.title}</h4>
                  <p className="text-[11px] text-foreground-muted truncate">{item.model}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Hardware Showcase */}
        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left 6 Cols */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-wellness">
                Medical Device Inclusions
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                {current.title}
              </h3>
              <p className="text-xs font-semibold text-foreground-muted">{current.model}</p>
              <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed pt-1">
                {current.desc}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                Key Clinical Specifications
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-foreground">
                {current.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-background-subtle border border-border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-wellness shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Hardware Graphic & Status */}
          <div className="lg:col-span-6 bg-background-subtle rounded-2xl border border-border p-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 rounded-3xl bg-wellness-light border-2 border-[#CBD7CE] flex items-center justify-center text-wellness-dark shadow-glow">
              <Box className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-foreground">{current.title}</h4>
              <p className="text-xs text-foreground-secondary">NMC Telemedicine Guidelines Approved Hardware</p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-border w-full max-w-sm flex items-center justify-between text-xs">
              <span className="text-foreground-secondary">Delivery across India:</span>
              <span className="font-bold text-wellness-dark">Free 48-Hour Courier</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-foreground-muted">
              <ShieldCheck className="w-4 h-4 text-wellness" />
              <span>Includes 2-Year Full Replacement Warranty & Calibration Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
