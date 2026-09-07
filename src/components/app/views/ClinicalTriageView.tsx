"use client";

import React, { useState } from "react";
import { useHealth } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TriageQuestionnaire } from "@/types/health";
import {
  Sparkles,
  CheckCircle2,
  Stethoscope,
  Video,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { soundFx } from "@/lib/sound";

interface ClinicalTriageViewProps {
  onNavigateToTelehealth: () => void;
}

export function ClinicalTriageView({ onNavigateToTelehealth }: ClinicalTriageViewProps) {
  const { evaluateTriage } = useHealth();

  const [chiefComplaint, setChiefComplaint] = useState("Cervical neck stiffness and frontal tension headache");
  const [complaintError, setComplaintError] = useState<string | null>(null);
  const [duration, setDuration] = useState("3 days");
  const [painLevel, setPainLevel] = useState<number>(4);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    "Screen glare sensitivity",
    "Shoulder muscular tension",
  ]);
  const [currentResult, setCurrentResult] = useState<TriageQuestionnaire | null>(null);

  const symptomOptions = [
    "Screen glare sensitivity",
    "Shoulder muscular tension",
    "Mild nausea",
    "Elevated blood pressure (>130 mmHg)",
    "Sleep onset difficulty",
    "Dizziness upon standing",
  ];

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = chiefComplaint.trim();
    if (!trimmed || trimmed.length < 4) {
      setComplaintError("Please describe your symptoms in at least 4 characters.");
      soundFx.playAlert(true);
      toast.error("Please describe your primary symptom or chief complaint.");
      return;
    }
    setComplaintError(null);
    soundFx.playFocusStart(true);
    const result = evaluateTriage(chiefComplaint, duration, painLevel, selectedSymptoms);
    setCurrentResult(result);
    toast.success("Clinical triage assessment computed.");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              AI Symptom Navigator & Clinical Triage
            </h1>
            <Badge variant="sage">Clinical Decision Protocol</Badge>
          </div>
          <p className="text-xs sm:text-sm text-foreground-secondary">
            Evidence-based symptom analysis to determine appropriate remote clinical care.
          </p>
        </div>
      </div>

      {/* Triage Questionnaire Input Card */}
      <form onSubmit={handleEvaluate} className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
        <div className="pb-4 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Patient Symptom Assessment</h3>
          <p className="text-xs text-foreground-secondary">Provide details regarding your current physiological symptoms</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Primary Chief Complaint</label>
            <input
              type="text"
              value={chiefComplaint}
              onChange={(e) => {
                setChiefComplaint(e.target.value);
                if (complaintError) setComplaintError(null);
              }}
              placeholder="e.g. Neck stiffness, elevated blood pressure, acute fatigue"
              className={cn(
                "w-full px-3.5 py-2.5 text-sm bg-background-subtle border rounded-xl text-foreground focus:outline-none transition-colors",
                complaintError
                  ? "border-red-400 bg-red-50/20 focus:border-red-500"
                  : "border-border focus:border-wellness"
              )}
            />
            {complaintError && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{complaintError}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Symptom Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-background-subtle border border-border rounded-xl text-foreground focus:outline-none focus:border-wellness"
              >
                <option value="Less than 24 hours">Less than 24 hours</option>
                <option value="1 to 3 days">1 to 3 days</option>
                <option value="1 to 2 weeks">1 to 2 weeks</option>
                <option value="Chronic (> 1 month)">Chronic (Over 1 month)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                <span>Pain / Severity Scale (1 - 10)</span>
                <span className="font-mono text-wellness">{painLevel} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(parseInt(e.target.value))}
                className="w-full accent-wellness py-2 cursor-pointer"
              />
            </div>
          </div>

          {/* Associated Symptoms Multi-select */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-foreground">Associated Secondary Symptoms</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {symptomOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => toggleSymptom(opt)}
                  className={cn(
                    "p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between",
                    selectedSymptoms.includes(opt)
                      ? "bg-wellness-light border-[#CBD7CE] text-foreground font-semibold"
                      : "bg-background-subtle border-border text-foreground-secondary"
                  )}
                >
                  <span>{opt}</span>
                  {selectedSymptoms.includes(opt) && <CheckCircle2 className="w-3.5 h-3.5 text-wellness" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between">
          <span className="text-[11px] text-foreground-muted">Evaluated using AIIMS & ICMR Clinical Telemedicine Protocols</span>
          <Button type="submit" variant="sage" size="md" className="font-semibold gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Analyze Symptoms</span>
          </Button>
        </div>
      </form>

      {/* Triage Assessment Results Banner */}
      {currentResult && (
        <div className="bg-surface rounded-3xl border border-wellness shadow-elevated p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-wellness-light text-wellness-dark flex items-center justify-center">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Clinical Triage Determination</h3>
                <p className="text-xs text-foreground-secondary">Protocol: {currentResult.severity.replace("_", " ").toUpperCase()}</p>
              </div>
            </div>
            <Badge variant="sage">{currentResult.severity.toUpperCase()}</Badge>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-foreground-secondary">Clinical Reasoning:</span>
              <p className="text-sm text-foreground mt-0.5 leading-relaxed">
                {currentResult.clinicalReasoning}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-background-subtle border border-border">
              <span className="text-xs font-semibold text-wellness-dark">Recommended Next Step:</span>
              <p className="text-sm font-bold text-foreground mt-0.5">
                {currentResult.recommendedAction}
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="sage"
              size="sm"
              onClick={onNavigateToTelehealth}
              className="gap-1.5 text-xs font-semibold"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Connect with Virtual Physician</span>
            </Button>
            <span className="text-[11px] text-foreground-muted">
              Non-emergency triage guidance • If critical, call 112 or 108 immediately
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
