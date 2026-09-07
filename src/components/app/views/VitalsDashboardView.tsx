"use client";

import React, { useState } from "react";
import { useHealth } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Heart,
  Activity,
  Sparkles,
  Thermometer,
  Wind,
  Plus,
  Video,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { soundFx } from "@/lib/sound";
import { cn } from "@/lib/utils";

interface VitalsDashboardViewProps {
  onNavigate: (view: string) => void;
}

export function VitalsDashboardView({ onNavigate }: VitalsDashboardViewProps) {
  const { vitals, addManualVital, connectedDevices } = useHealth();
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    systolicBP: 118,
    diastolicBP: 76,
    heartRate: 68,
    spO2: 99,
    bloodGlucose: 96,
    temperature: 98.4,
  });
  const [vitalsErrors, setVitalsErrors] = useState<Record<string, string>>({});

  const validateVitals = (): boolean => {
    const errs: Record<string, string> = {};

    if (isNaN(manualForm.systolicBP) || manualForm.systolicBP < 70 || manualForm.systolicBP > 240) {
      errs.systolicBP = "Range: 70 – 240 mmHg";
    }

    if (isNaN(manualForm.diastolicBP) || manualForm.diastolicBP < 40 || manualForm.diastolicBP > 140) {
      errs.diastolicBP = "Range: 40 – 140 mmHg";
    } else if (!isNaN(manualForm.systolicBP) && manualForm.diastolicBP >= manualForm.systolicBP) {
      errs.diastolicBP = "Must be less than Systolic BP";
    }

    if (isNaN(manualForm.heartRate) || manualForm.heartRate < 35 || manualForm.heartRate > 220) {
      errs.heartRate = "Range: 35 – 220 bpm";
    }

    if (isNaN(manualForm.spO2) || manualForm.spO2 < 70 || manualForm.spO2 > 100) {
      errs.spO2 = "Range: 70% – 100%";
    }

    if (isNaN(manualForm.bloodGlucose) || manualForm.bloodGlucose < 30 || manualForm.bloodGlucose > 500) {
      errs.bloodGlucose = "Range: 30 – 500 mg/dL";
    }

    if (isNaN(manualForm.temperature) || manualForm.temperature < 95.0 || manualForm.temperature > 105.0) {
      errs.temperature = "Range: 95.0 – 105.0 °F";
    }

    setVitalsErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateVitals()) {
      soundFx.playAlert(true);
      toast.error("Vitals reading outside physiological human limits. Please review values.");
      return;
    }
    addManualVital(manualForm);
    soundFx.playFocusStart(true);
    setShowManualModal(false);
    setVitalsErrors({});
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Top Patient Telemetry Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Vitals & Biometric Telemetry (India)
            </h1>
            <Badge variant="sage">ABHA Auto-Sync Active</Badge>
          </div>
          <p className="text-xs sm:text-sm text-foreground-secondary">
            Continuous remote telemetry from Omron BP and Accu-Chek devices streamed to Dr. Ananya Iyer (AIIMS New Delhi).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowManualModal(true)}
            className="text-xs gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manual Vitals Entry</span>
          </Button>
          <Button
            variant="sage"
            size="sm"
            onClick={() => onNavigate("telehealth")}
            className="text-xs gap-1.5 font-semibold"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Consult AIIMS MD</span>
          </Button>
        </div>
      </div>

      {/* Primary Biometrics 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Blood Pressure Card */}
        <div className="p-6 rounded-3xl bg-surface border border-border shadow-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-secondary">Blood Pressure</span>
            <span className="w-2 h-2 rounded-full bg-wellness animate-pulse" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground">
              {vitals.systolicBP} / {vitals.diastolicBP}
            </div>
            <div className="text-xs text-foreground-secondary mt-0.5">mmHg (Systolic / Diastolic)</div>
          </div>
          <div className="pt-3 border-t border-border flex items-center justify-between text-[11px]">
            <span className="text-wellness-dark font-semibold">● Normal Range</span>
            <span className="text-foreground-muted font-mono">Omron Connect</span>
          </div>
        </div>

        {/* 2. Heart Rate with Live ECG */}
        <div className="p-6 rounded-3xl bg-surface border border-border shadow-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-secondary">Resting Heart Rate</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground">
              {vitals.heartRate} <span className="text-sm font-normal text-foreground-secondary">bpm</span>
            </div>
            {/* Live ECG Waveform */}
            <div className="h-6 w-full mt-1">
              <svg className="w-full h-full text-wellness" viewBox="0 0 160 25" fill="none">
                <path
                  d="M0 12 H40 L44 4 L48 20 L52 8 L56 16 L60 12 H100 L104 4 L108 20 L112 8 L116 16 L120 12 H160"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="pt-3 border-t border-border flex items-center justify-between text-[11px]">
            <span className="text-wellness-dark font-semibold">● Sinus Rhythm</span>
            <span className="text-foreground-muted font-mono">HRV: {vitals.hrv}ms</span>
          </div>
        </div>

        {/* 3. Blood Oxygen SpO2 */}
        <div className="p-6 rounded-3xl bg-surface border border-border shadow-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-secondary">SpO2 Oxygen</span>
            <Activity className="w-4 h-4 text-wellness" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground">
              {vitals.spO2}%
            </div>
            <div className="text-xs text-foreground-secondary mt-0.5">Arterial Oxygen Saturation</div>
          </div>
          <div className="pt-3 border-t border-border flex items-center justify-between text-[11px]">
            <span className="text-wellness-dark font-semibold">● Optimal Saturation</span>
            <span className="text-foreground-muted font-mono">Nonin Wireless</span>
          </div>
        </div>

        {/* 4. Continuous Glucose Monitor (CGM) */}
        <div className="p-6 rounded-3xl bg-surface border border-border shadow-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-secondary">Fasting Blood Sugar</span>
            <Sparkles className="w-4 h-4 text-wellness" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold font-mono text-foreground">
              {vitals.bloodGlucose} <span className="text-sm font-normal text-foreground-secondary">mg/dL</span>
            </div>
            <div className="text-xs text-foreground-secondary mt-0.5">Pre-Prandial / Fasting</div>
          </div>
          <div className="pt-3 border-t border-border flex items-center justify-between text-[11px]">
            <span className="text-wellness-dark font-semibold">● In Target Range</span>
            <span className="text-foreground-muted font-mono">Accu-Chek Guide</span>
          </div>
        </div>
      </div>

      {/* Secondary Biometrics Row: Temp & Respiratory Rate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-surface border border-border shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-wellness-light flex items-center justify-center text-wellness-dark">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-secondary">Body Temperature</div>
              <div className="text-xl font-bold font-mono text-foreground">{vitals.temperature}°F (Normal)</div>
            </div>
          </div>
          <Badge variant="sage">Afebrile</Badge>
        </div>

        <div className="p-5 rounded-2xl bg-surface border border-border shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-background-subtle border border-border flex items-center justify-center text-foreground">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground-secondary">Respiratory Rate</div>
              <div className="text-xl font-bold font-mono text-foreground">{vitals.respiratoryRate} breaths/min</div>
            </div>
          </div>
          <Badge variant="sage">Normal</Badge>
        </div>
      </div>

      {/* Connected Medical Devices Strip */}
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">Connected Remote Patient Monitoring (RPM) Hardware</h3>
            <p className="text-xs text-foreground-secondary">Medical devices linked to ABHA ID: 91-4421-8890-1204</p>
          </div>
          <Badge variant="outline">4 Devices Paired</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {connectedDevices.map((dev) => (
            <div key={dev.id} className="p-4 rounded-2xl bg-background-subtle border border-border flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">{dev.name}</span>
                  <span className="w-2 h-2 rounded-full bg-wellness" />
                </div>
                <p className="text-[11px] text-foreground-secondary mt-0.5">{dev.brand}</p>
              </div>
              <div className="flex items-center justify-between text-[11px] text-foreground-muted pt-2 border-t border-border/60">
                <span>Battery: {dev.batteryLevel}%</span>
                <span className="text-wellness-dark font-medium">{dev.lastSynced}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Entry Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-dropdown max-w-md w-full space-y-6 animate-in zoom-in-95 duration-200">
            <div>
              <h3 className="text-lg font-bold text-foreground">Manual Vital Signs Log</h3>
              <p className="text-xs text-foreground-secondary mt-1">
                Enter your physical clinical measurements to update your ABHA Electronic Health Record.
              </p>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Systolic BP (mmHg)</label>
                  <input
                    type="number"
                    value={manualForm.systolicBP}
                    onChange={(e) => {
                      setManualForm({ ...manualForm, systolicBP: parseInt(e.target.value) || 0 });
                      if (vitalsErrors.systolicBP) setVitalsErrors((prev) => ({ ...prev, systolicBP: "" }));
                    }}
                    placeholder="118"
                    className={cn(
                      "w-full px-3 py-2 text-sm bg-background-subtle border rounded-xl text-foreground font-mono focus:outline-none transition-colors",
                      vitalsErrors.systolicBP ? "border-red-400 bg-red-50/20 focus:border-red-500" : "border-border focus:border-wellness"
                    )}
                  />
                  {vitalsErrors.systolicBP && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{vitalsErrors.systolicBP}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Diastolic BP (mmHg)</label>
                  <input
                    type="number"
                    value={manualForm.diastolicBP}
                    onChange={(e) => {
                      setManualForm({ ...manualForm, diastolicBP: parseInt(e.target.value) || 0 });
                      if (vitalsErrors.diastolicBP) setVitalsErrors((prev) => ({ ...prev, diastolicBP: "" }));
                    }}
                    placeholder="76"
                    className={cn(
                      "w-full px-3 py-2 text-sm bg-background-subtle border rounded-xl text-foreground font-mono focus:outline-none transition-colors",
                      vitalsErrors.diastolicBP ? "border-red-400 bg-red-50/20 focus:border-red-500" : "border-border focus:border-wellness"
                    )}
                  />
                  {vitalsErrors.diastolicBP && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{vitalsErrors.diastolicBP}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={manualForm.heartRate}
                    onChange={(e) => {
                      setManualForm({ ...manualForm, heartRate: parseInt(e.target.value) || 0 });
                      if (vitalsErrors.heartRate) setVitalsErrors((prev) => ({ ...prev, heartRate: "" }));
                    }}
                    placeholder="68"
                    className={cn(
                      "w-full px-3 py-2 text-sm bg-background-subtle border rounded-xl text-foreground font-mono focus:outline-none transition-colors",
                      vitalsErrors.heartRate ? "border-red-400 bg-red-50/20 focus:border-red-500" : "border-border focus:border-wellness"
                    )}
                  />
                  {vitalsErrors.heartRate && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{vitalsErrors.heartRate}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">SpO2 Oxygen (%)</label>
                  <input
                    type="number"
                    value={manualForm.spO2}
                    onChange={(e) => {
                      setManualForm({ ...manualForm, spO2: parseInt(e.target.value) || 0 });
                      if (vitalsErrors.spO2) setVitalsErrors((prev) => ({ ...prev, spO2: "" }));
                    }}
                    placeholder="99"
                    className={cn(
                      "w-full px-3 py-2 text-sm bg-background-subtle border rounded-xl text-foreground font-mono focus:outline-none transition-colors",
                      vitalsErrors.spO2 ? "border-red-400 bg-red-50/20 focus:border-red-500" : "border-border focus:border-wellness"
                    )}
                  />
                  {vitalsErrors.spO2 && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{vitalsErrors.spO2}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Blood Glucose (mg/dL)</label>
                  <input
                    type="number"
                    value={manualForm.bloodGlucose}
                    onChange={(e) => {
                      setManualForm({ ...manualForm, bloodGlucose: parseInt(e.target.value) || 0 });
                      if (vitalsErrors.bloodGlucose) setVitalsErrors((prev) => ({ ...prev, bloodGlucose: "" }));
                    }}
                    placeholder="96"
                    className={cn(
                      "w-full px-3 py-2 text-sm bg-background-subtle border rounded-xl text-foreground font-mono focus:outline-none transition-colors",
                      vitalsErrors.bloodGlucose ? "border-red-400 bg-red-50/20 focus:border-red-500" : "border-border focus:border-wellness"
                    )}
                  />
                  {vitalsErrors.bloodGlucose && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{vitalsErrors.bloodGlucose}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Body Temp (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={manualForm.temperature}
                    onChange={(e) => {
                      setManualForm({ ...manualForm, temperature: parseFloat(e.target.value) || 0 });
                      if (vitalsErrors.temperature) setVitalsErrors((prev) => ({ ...prev, temperature: "" }));
                    }}
                    placeholder="98.4"
                    className={cn(
                      "w-full px-3 py-2 text-sm bg-background-subtle border rounded-xl text-foreground font-mono focus:outline-none transition-colors",
                      vitalsErrors.temperature ? "border-red-400 bg-red-50/20 focus:border-red-500" : "border-border focus:border-wellness"
                    )}
                  />
                  {vitalsErrors.temperature && (
                    <div className="flex items-center gap-1 text-[11px] text-red-600 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{vitalsErrors.temperature}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowManualModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="sage" size="sm" className="font-semibold">
                  Save to ABHA Health Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
