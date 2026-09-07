"use client";

import React, { useState, useEffect } from "react";
import * as z from "zod";
import { useHealth } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  User,
  Download,
  Save,
  Watch,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ─── Profile Zod Validation Schema ──────────────────────────────────────────
const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full legal name must be at least 2 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name should only contain letters and spaces"),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => {
        const clean = val.replace(/[\s-+]/g, "");
        return /^[6-9]\d{9}$/.test(clean) || /^91[6-9]\d{9}$/.test(clean);
      },
      {
        message: "Enter a valid 10-digit Indian mobile number (e.g. +91 98450 12345)",
      }
    ),
  dob: z.string().trim().min(3, "Date of birth is required"),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    errorMap: () => ({ message: "Select a valid blood group" }),
  }),
  city: z.string().trim().min(3, "City & State must be at least 3 characters"),
  pinCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Must be a 6-digit Indian postal PIN code"),
  allergies: z.string().optional(),
  chronicConditions: z.string().optional(),
  emergencyName: z
    .string()
    .trim()
    .min(2, "Emergency contact name must be at least 2 characters"),
  emergencyRelationship: z
    .string()
    .trim()
    .min(2, "Relationship is required (e.g. Spouse, Parent, Sibling)"),
  emergencyPhone: z
    .string()
    .trim()
    .refine(
      (val) => {
        const clean = val.replace(/[\s-+]/g, "");
        return /^[6-9]\d{9}$/.test(clean) || /^91[6-9]\d{9}$/.test(clean);
      },
      {
        message: "Enter a valid 10-digit Indian emergency phone number",
      }
    ),
});

export function MedicalSettingsView() {
  const { patient, updatePatientProfile, connectedDevices, toggleDeviceConnection } = useHealth();

  const [formData, setFormData] = useState({
    name: patient?.name || "Aarav Sharma",
    phone: patient?.phone || "+91 98450 12345",
    dob: patient?.dob || "August 12, 1996 (Age 29)",
    bloodType: (patient?.bloodType || "B+") as "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-",
    city: patient?.city || "Bengaluru, Karnataka",
    pinCode: patient?.pinCode || "560103",
    allergies: patient?.allergies ? patient.allergies.join(", ") : "Penicillin",
    chronicConditions: patient?.chronicConditions ? patient.chronicConditions.join(", ") : "Cervical Tech Neck",
    emergencyName: patient?.emergencyContact?.name || "Pooja Sharma",
    emergencyRelationship: patient?.emergencyContact?.relationship || "Spouse",
    emergencyPhone: patient?.emergencyContact?.phone || "+91 98450 54321",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Sync state when active patient profile changes
  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || "",
        phone: patient.phone || "",
        dob: patient.dob || "",
        bloodType: (patient.bloodType || "B+") as any,
        city: patient.city || "",
        pinCode: patient.pinCode || "",
        allergies: patient.allergies ? patient.allergies.join(", ") : "",
        chronicConditions: patient.chronicConditions ? patient.chronicConditions.join(", ") : "",
        emergencyName: patient.emergencyContact?.name || "",
        emergencyRelationship: patient.emergencyContact?.relationship || "",
        emergencyPhone: patient.emergencyContact?.phone || "",
      });
      setErrors({});
      setTouched({});
    }
  }, [patient]);

  const validateField = (field: keyof typeof formData, value: string) => {
    const candidate = { ...formData, [field]: value };
    const res = profileSchema.safeParse(candidate);
    if (res.success) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    } else {
      const issue = res.error.issues.find((i) => i.path[0] === field);
      setErrors((prev) => {
        if (issue) {
          return { ...prev, [field]: issue.message };
        } else {
          const next = { ...prev };
          delete next[field];
          return next;
        }
      });
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    const parseResult = profileSchema.safeParse(formData);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please resolve the validation errors in your ABHA profile.");
      return;
    }

    setErrors({});
    setIsSaving(true);

    setTimeout(() => {
      updatePatientProfile({
        name: formData.name,
        phone: formData.phone,
        dob: formData.dob,
        bloodType: formData.bloodType,
        city: formData.city,
        pinCode: formData.pinCode,
        allergies: formData.allergies
          ? formData.allergies.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        chronicConditions: formData.chronicConditions
          ? formData.chronicConditions.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        emergencyContact: {
          name: formData.emergencyName,
          relationship: formData.emergencyRelationship,
          phone: formData.emergencyPhone,
        },
      });
      setIsSaving(false);
    }, 400);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(patient, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `FocusNext-ABHA-Record-${patient?.name || "Patient"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("ABHA EHR Health Record exported as JSON.");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              ABHA Profile & Indian Medical Settings
            </h1>
            <Badge variant="sage">ABDM Verified</Badge>
          </div>
          <p className="text-xs sm:text-sm text-foreground-secondary">
            Manage your Ayushman Bharat Health Account (ABHA), paired Omron/Accu-Chek devices, and Indian emergency contact.
          </p>
        </div>
      </div>

      {/* Patient Profile Details Card */}
      <form onSubmit={handleSave} noValidate className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
        <div className="pb-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-wellness-light text-wellness-dark flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground">Patient ABHA Identity</h3>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  e-KYC Validated
                </span>
              </div>
              <p className="text-xs text-foreground-secondary">Official ABDM national digital health identification</p>
            </div>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            ABHA: {patient?.abhaId || "91-4421-8890-1204"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Legal Full Name */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-foreground">
                Legal Full Name (Aadhaar / ABHA) <span className="text-red-500">*</span>
              </label>
              {touched.name && !errors.name && formData.name && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Validated</span>
                </span>
              )}
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="e.g. Aarav Sharma"
              className={cn(
                "w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all shadow-subtle focus:outline-none",
                touched.name && errors.name
                  ? "border-red-500 bg-red-50/20 focus:border-red-600"
                  : touched.name && formData.name
                  ? "border-emerald-500/80 bg-emerald-50/10 focus:border-emerald-600"
                  : "border-border bg-background-subtle focus:border-wellness"
              )}
            />
            {touched.name && errors.name && (
              <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Mobile Phone */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-foreground">
                Mobile Phone (+91) <span className="text-red-500">*</span>
              </label>
              {touched.phone && !errors.phone && formData.phone && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Validated</span>
                </span>
              )}
            </div>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              placeholder="+91 98450 12345"
              className={cn(
                "w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all shadow-subtle focus:outline-none font-mono",
                touched.phone && errors.phone
                  ? "border-red-500 bg-red-50/20 focus:border-red-600"
                  : touched.phone && formData.phone
                  ? "border-emerald-500/80 bg-emerald-50/10 focus:border-emerald-600"
                  : "border-border bg-background-subtle focus:border-wellness"
              )}
            />
            {touched.phone && errors.phone && (
              <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-foreground">
                Date of Birth & Age <span className="text-red-500">*</span>
              </label>
              {touched.dob && !errors.dob && formData.dob && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Validated</span>
                </span>
              )}
            </div>
            <input
              type="text"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              onBlur={() => handleBlur("dob")}
              placeholder="e.g. August 12, 1996 (Age 29)"
              className={cn(
                "w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all shadow-subtle focus:outline-none",
                touched.dob && errors.dob
                  ? "border-red-500 bg-red-50/20 focus:border-red-600"
                  : touched.dob && formData.dob
                  ? "border-emerald-500/80 bg-emerald-50/10 focus:border-emerald-600"
                  : "border-border bg-background-subtle focus:border-wellness"
              )}
            />
            {touched.dob && errors.dob && (
              <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.dob}</span>
              </p>
            )}
          </div>

          {/* Blood Group */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-foreground">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Clinical Record</span>
              </span>
            </div>
            <select
              value={formData.bloodType}
              onChange={(e) => handleChange("bloodType", e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-background-subtle border border-border rounded-xl text-foreground focus:outline-none focus:border-wellness font-mono shadow-subtle"
            >
              <option value="A+">A+ (A Positive)</option>
              <option value="A-">A- (A Negative)</option>
              <option value="B+">B+ (B Positive)</option>
              <option value="B-">B- (B Negative)</option>
              <option value="AB+">AB+ (AB Positive)</option>
              <option value="AB-">AB- (AB Negative)</option>
              <option value="O+">O+ (O Positive)</option>
              <option value="O-">O- (O Negative)</option>
            </select>
          </div>

          {/* City & State */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-foreground">
                City & State <span className="text-red-500">*</span>
              </label>
              {touched.city && !errors.city && formData.city && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Validated</span>
                </span>
              )}
            </div>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              onBlur={() => handleBlur("city")}
              placeholder="e.g. Bengaluru, Karnataka"
              className={cn(
                "w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all shadow-subtle focus:outline-none",
                touched.city && errors.city
                  ? "border-red-500 bg-red-50/20 focus:border-red-600"
                  : touched.city && formData.city
                  ? "border-emerald-500/80 bg-emerald-50/10 focus:border-emerald-600"
                  : "border-border bg-background-subtle focus:border-wellness"
              )}
            />
            {touched.city && errors.city && (
              <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>

          {/* Postal PIN Code */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-foreground">
                Postal PIN Code <span className="text-red-500">*</span>
              </label>
              {touched.pinCode && !errors.pinCode && formData.pinCode && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Validated (Apollo Serviceable)</span>
                </span>
              )}
            </div>
            <input
              type="text"
              value={formData.pinCode}
              onChange={(e) => handleChange("pinCode", e.target.value)}
              onBlur={() => handleBlur("pinCode")}
              placeholder="6-Digit Indian PIN (e.g. 560103)"
              className={cn(
                "w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all shadow-subtle focus:outline-none font-mono",
                touched.pinCode && errors.pinCode
                  ? "border-red-500 bg-red-50/20 focus:border-red-600"
                  : touched.pinCode && formData.pinCode
                  ? "border-emerald-500/80 bg-emerald-50/10 focus:border-emerald-600"
                  : "border-border bg-background-subtle focus:border-wellness"
              )}
            />
            {touched.pinCode && errors.pinCode && (
              <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.pinCode}</span>
              </p>
            )}
          </div>
        </div>

        {/* Medical History & Chronic Conditions */}
        <div className="space-y-3 pt-2 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Known Medical Allergies (Comma-separated)</label>
            <input
              type="text"
              value={formData.allergies}
              onChange={(e) => handleChange("allergies", e.target.value)}
              placeholder="e.g. Penicillin, Sulfa Drugs"
              className="w-full px-3.5 py-2.5 text-sm bg-background-subtle border border-border rounded-xl text-foreground focus:outline-none focus:border-wellness shadow-subtle"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Chronic Conditions & Telemetry Goals</label>
            <input
              type="text"
              value={formData.chronicConditions}
              onChange={(e) => handleChange("chronicConditions", e.target.value)}
              placeholder="e.g. Cervical Tech Neck, Desk Eye Strain"
              className="w-full px-3.5 py-2.5 text-sm bg-background-subtle border border-border rounded-xl text-foreground focus:outline-none focus:border-wellness shadow-subtle"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="pt-4 border-t border-border space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold uppercase tracking-wider text-foreground">
              Indian Emergency Contact <span className="text-red-500">*</span>
            </h4>
            <span className="text-[10px] text-foreground-muted font-medium">112 SOS Dispatch Notification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Emergency Name */}
            <div className="space-y-1">
              <input
                type="text"
                value={formData.emergencyName}
                onChange={(e) => handleChange("emergencyName", e.target.value)}
                onBlur={() => handleBlur("emergencyName")}
                placeholder="Contact Name *"
                className={cn(
                  "w-full px-3.5 py-2 text-sm rounded-xl border focus:outline-none transition-all shadow-subtle",
                  touched.emergencyName && errors.emergencyName
                    ? "border-red-500 bg-red-50/20"
                    : "border-border bg-background-subtle focus:border-wellness"
                )}
              />
              {touched.emergencyName && errors.emergencyName && (
                <p className="text-[10px] text-red-600 mt-0.5">{errors.emergencyName}</p>
              )}
            </div>

            {/* Emergency Relationship */}
            <div className="space-y-1">
              <input
                type="text"
                value={formData.emergencyRelationship}
                onChange={(e) => handleChange("emergencyRelationship", e.target.value)}
                onBlur={() => handleBlur("emergencyRelationship")}
                placeholder="Relationship (e.g. Spouse) *"
                className={cn(
                  "w-full px-3.5 py-2 text-sm rounded-xl border focus:outline-none transition-all shadow-subtle",
                  touched.emergencyRelationship && errors.emergencyRelationship
                    ? "border-red-500 bg-red-50/20"
                    : "border-border bg-background-subtle focus:border-wellness"
                )}
              />
              {touched.emergencyRelationship && errors.emergencyRelationship && (
                <p className="text-[10px] text-red-600 mt-0.5">{errors.emergencyRelationship}</p>
              )}
            </div>

            {/* Emergency Phone */}
            <div className="space-y-1">
              <input
                type="text"
                value={formData.emergencyPhone}
                onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                onBlur={() => handleBlur("emergencyPhone")}
                placeholder="Emergency Phone (+91) *"
                className={cn(
                  "w-full px-3.5 py-2 text-sm rounded-xl border focus:outline-none transition-all shadow-subtle font-mono",
                  touched.emergencyPhone && errors.emergencyPhone
                    ? "border-red-500 bg-red-50/20"
                    : "border-border bg-background-subtle focus:border-wellness"
                )}
              />
              {touched.emergencyPhone && errors.emergencyPhone && (
                <p className="text-[10px] text-red-600 mt-0.5">{errors.emergencyPhone}</p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-foreground-secondary">
            <ShieldCheck className="w-4 h-4 text-wellness" />
            <span className="text-[11px]">Synced with ABDM Ayushman Bharat Health Records</span>
          </div>

          <Button
            type="submit"
            variant="sage"
            size="md"
            disabled={isSaving}
            className="font-semibold gap-1.5 shadow-subtle"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Validating & Saving..." : "Save ABHA Profile"}</span>
          </Button>
        </div>
      </form>

      {/* Connected Medical Devices Section */}
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-background-subtle border border-border flex items-center justify-center text-foreground">
              <Watch className="w-5 h-5 text-wellness" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Connected Biometric Hardware</h3>
              <p className="text-xs text-foreground-secondary">Bluetooth & Cellular devices paired with ABHA EHR</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {connectedDevices.map((dev) => (
            <div
              key={dev.id}
              className="p-4 rounded-2xl bg-background-subtle border border-border flex items-center justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-foreground">{dev.name}</h4>
                <p className="text-xs text-foreground-secondary">{dev.brand} • Battery: {dev.batteryLevel}%</p>
              </div>
              <Button
                variant={dev.connected ? "outline" : "sage"}
                size="sm"
                onClick={() => toggleDeviceConnection(dev.id)}
                className="text-xs"
              >
                {dev.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Export & Privacy */}
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-foreground">Export ABHA Health Record</h4>
          <p className="text-xs text-foreground-secondary mt-0.5">
            Download your full Indian clinical summary, Dr Lal PathLabs reports, and prescription history in standard JSON format.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={handleExportData} className="text-xs gap-1.5 shrink-0">
          <Download className="w-3.5 h-3.5" />
          <span>Export ABHA (JSON)</span>
        </Button>
      </div>
    </div>
  );
}
