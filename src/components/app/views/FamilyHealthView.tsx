"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heart, Activity, Phone, AlertTriangle, Truck, Video, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function FamilyHealthView() {
  const [selectedMember, setSelectedMember] = useState(0);

  const familyMembers = [
    {
      id: "fam-1",
      name: "Ramesh Sharma (Father)",
      age: 68,
      location: "Kothrud, Pune (PIN: 411038)",
      relation: "Father",
      doctor: "Dr. Ananya Iyer, MD (AIIMS)",
      abhaId: "91-1124-9988-3401",
      bp: "122 / 78",
      glucose: 104,
      spO2: 98,
      status: "Telemetry Healthy",
      device: "Omron Cellular Gateway (HEM-7156T)",
      prescriptions: ["Amlodipine 5mg", "Metformin 500mg SR"],
      nextCall: "Friday at 10:00 AM IST",
    },
    {
      id: "fam-2",
      name: "Sunita Sharma (Mother)",
      age: 64,
      location: "Kothrud, Pune (PIN: 411038)",
      relation: "Mother",
      doctor: "Dr. Priya Nair, MD (PGIMER)",
      abhaId: "91-8833-2211-5509",
      bp: "116 / 74",
      glucose: 98,
      spO2: 99,
      status: "Optimal Range",
      device: "Accu-Chek Guide Wireless",
      prescriptions: ["Thyronorm 50mcg", "Calcium + D3"],
      nextCall: "Monday at 11:30 AM IST",
    },
  ];

  const current = familyMembers[selectedMember];

  const handleOrderRefill = (med: string) => {
    toast.success(`Refill for ${med} ordered to parents' address in Pune (PIN: 411038) via Apollo Pharmacy.`);
  };

  const handleSOS = () => {
    toast.error("Alerting Pune local emergency dispatch (112 & 108) and nearby family contact.");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Aging Parents & Family Health Telemetry
            </h1>
            <Badge variant="sage">2 Family Profiles Linked</Badge>
          </div>
          <p className="text-xs sm:text-sm text-foreground-secondary">
            Continuous remote vital monitoring for parents living in Pune, managed from your Bengaluru portal.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast.info("Opening New Family Member ABHA Link Modal...")}
          className="text-xs gap-1.5"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add Family Member</span>
        </Button>
      </div>

      {/* Member Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {familyMembers.map((member, idx) => (
          <button
            key={member.id}
            type="button"
            onClick={() => setSelectedMember(idx)}
            className={cn(
              "p-5 rounded-3xl border text-left transition-all flex items-center justify-between",
              selectedMember === idx
                ? "bg-wellness-light/50 border-[#CBD7CE] shadow-card"
                : "bg-surface border-border hover:bg-background-subtle"
            )}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center font-bold text-sm text-foreground shadow-subtle">
                {member.name.split(" ")[0][0]}S
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">{member.name}</h3>
                <p className="text-xs text-foreground-secondary">{member.location}</p>
                <span className="text-[10px] font-mono text-wellness font-semibold">ABHA: {member.abhaId}</span>
              </div>
            </div>
            <Badge variant="sage">{member.status}</Badge>
          </button>
        ))}
      </div>

      {/* Selected Member Telemetry Showcase */}
      <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">{current.name}</h3>
            <p className="text-xs text-foreground-secondary">
              Doctor: {current.doctor} • Hardware: {current.device}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSOS}
              className="text-red-600 border-red-200 hover:bg-red-50 text-xs gap-1.5 h-8 font-bold"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Pune 112 SOS</span>
            </Button>
            <Button
              variant="sage"
              size="sm"
              onClick={() => toast.success(`Connecting to Dr. ${current.doctor.split(",")[0]}...`)}
              className="text-xs gap-1.5 h-8 font-semibold"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Join Family OPD</span>
            </Button>
          </div>
        </div>

        {/* 3 Vital Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-1">
            <div className="flex items-center justify-between text-xs text-foreground-secondary">
              <span>Blood Pressure (Omron)</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            </div>
            <div className="text-2xl font-bold font-mono text-foreground">{current.bp} <span className="text-xs font-normal">mmHg</span></div>
            <div className="text-[10px] text-wellness">● Normal Range (Morning Log)</div>
          </div>

          <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-1">
            <div className="flex items-center justify-between text-xs text-foreground-secondary">
              <span>Fasting Glucose</span>
              <Activity className="w-3.5 h-3.5 text-wellness" />
            </div>
            <div className="text-2xl font-bold font-mono text-foreground">{current.glucose} <span className="text-xs font-normal">mg/dL</span></div>
            <div className="text-[10px] text-wellness">● Non-Diabetic Target</div>
          </div>

          <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-1">
            <div className="flex items-center justify-between text-xs text-foreground-secondary">
              <span>SpO2 Oxygen</span>
              <span className="w-2 h-2 rounded-full bg-wellness" />
            </div>
            <div className="text-2xl font-bold font-mono text-foreground">{current.spO2}%</div>
            <div className="text-[10px] text-wellness">● Excellent Saturation</div>
          </div>
        </div>

        {/* Doctor Check-In Call Schedule */}
        <div className="p-4 rounded-2xl bg-background-subtle border border-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-wellness" />
            <div>
              <span className="font-bold text-foreground">Scheduled Family Doctor Review: </span>
              <span className="text-foreground-secondary">{current.nextCall}</span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-wellness-dark">AIIMS Review Active</span>
        </div>

        {/* Medicines & Doorstep Delivery to Parents */}
        <div className="space-y-3 pt-2 border-t border-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Current Prescriptions (Delivered to Pune)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {current.prescriptions.map((med) => (
              <div
                key={med}
                className="p-3.5 rounded-xl bg-background-subtle border border-border flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-foreground">{med}</div>
                  <div className="text-[10px] text-foreground-muted">Monthly Automated Refill</div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleOrderRefill(med)}
                  className="text-xs gap-1 h-7"
                >
                  <Truck className="w-3 h-3" />
                  <span>Order Refill</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
