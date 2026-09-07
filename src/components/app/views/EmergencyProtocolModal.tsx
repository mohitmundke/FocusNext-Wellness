"use client";

import React from "react";
import { useHealth } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, Phone, X } from "lucide-react";

export function EmergencyProtocolModal() {
  const { emergencyActive, dismissEmergencyProtocol, patient, vitals } = useHealth();

  if (!emergencyActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div className="bg-surface rounded-3xl border-2 border-red-500 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header Alert */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 animate-bounce">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-600">National Emergency SOS Protocol (India)</h2>
              <p className="text-xs text-foreground-secondary">Emergency Medical Telemetry Broadcast Active</p>
            </div>
          </div>
          <button
            type="button"
            onClick={dismissEmergencyProtocol}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground-secondary hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Action: 112 & 108 */}
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-3 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-red-700">Immediate Action Required</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href="tel:112"
              className="inline-flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call 112 (National Helpline)</span>
            </a>
            <a
              href="tel:108"
              className="inline-flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call 108 (Ambulance)</span>
            </a>
          </div>
          <p className="text-[11px] text-red-600">If you are experiencing acute chest pain, shortness of breath, or stroke symptoms.</p>
        </div>

        {/* Patient Medical ID Data Card */}
        <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="font-bold text-foreground">ABHA Emergency Patient ID</span>
            <span className="font-mono text-red-600 font-bold">Blood Group: {patient?.bloodType || "B+"}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-foreground">
            <div>
              <span className="text-foreground-secondary text-[11px]">Patient:</span>
              <div className="font-semibold">{patient?.name || "Aarav Sharma"}</div>
            </div>
            <div>
              <span className="text-foreground-secondary text-[11px]">ABHA ID:</span>
              <div className="font-mono font-semibold">{patient?.abhaId || "91-4421-8890-1204"}</div>
            </div>
            <div>
              <span className="text-foreground-secondary text-[11px]">Location:</span>
              <div className="font-semibold">{patient?.city || "Bengaluru"} (PIN: {patient?.pinCode || "560103"})</div>
            </div>
            <div>
              <span className="text-foreground-secondary text-[11px]">Allergies:</span>
              <div className="font-semibold text-red-600">{patient?.allergies.join(", ") || "Penicillin"}</div>
            </div>
            <div className="col-span-2">
              <span className="text-foreground-secondary text-[11px]">Current Telemetry:</span>
              <div className="font-mono font-bold text-foreground">
                BP: {vitals.systolicBP}/{vitals.diastolicBP} mmHg • HR: {vitals.heartRate} bpm • SpO2: {vitals.spO2}%
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between text-xs">
          <div>
            <span className="text-foreground-secondary">Emergency Contact:</span>
            <div className="font-bold text-foreground">
              {patient?.emergencyContact.name} ({patient?.emergencyContact.relationship})
            </div>
          </div>
          <a
            href={`tel:${patient?.emergencyContact.phone}`}
            className="px-3 py-1.5 bg-background-subtle hover:bg-surface border border-border rounded-lg text-xs font-semibold text-foreground flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Contact</span>
          </a>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={dismissEmergencyProtocol}
          className="w-full justify-center text-xs"
        >
          <span>Cancel & Return to Normal Workspace</span>
        </Button>
      </div>
    </div>
  );
}
