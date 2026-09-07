"use client";

import React, { useState, useEffect } from "react";
import { useHealth } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  X,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Bike,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { soundFx } from "@/lib/sound";

export interface PharmacyItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
  partner: "Apollo Pharmacy" | "Tata 1mg";
  price: number;
  originalPrice: number;
  pills: number;
  popular?: boolean;
  tags: string[];
}

export const PHARMACY_ITEMS: PharmacyItem[] = [
  {
    id: "item-tech-neck-kit",
    name: "WFH Cervical Neck & Lumbar Relief Kit",
    dosage: "Volini Active Gel 75g + Ortho Hot/Cold Gel Pack",
    frequency: "Apply topically twice daily after long desk work",
    instructions: "Apply to trapezius and cervical spine. Follow with 10 min warm compress.",
    partner: "Apollo Pharmacy",
    price: 249,
    originalPrice: 499,
    pills: 2,
    popular: true,
    tags: ["Tech Neck", "Desk Pain", "Fast Relief"],
  },
  {
    id: "item-eye-strain-drops",
    name: "Computer Vision Syndrome Lubricant Eye Drops",
    dosage: "Refresh Tears (Carboxymethylcellulose 0.5% w/v, 10ml)",
    frequency: "1-2 drops in each eye 3-4 times daily while working",
    instructions: "Lubricating tear formula for soothing screen-induced dryness and burning.",
    partner: "Tata 1mg",
    price: 189,
    originalPrice: 349,
    pills: 1,
    popular: true,
    tags: ["10h+ Screens", "Dry Eyes", "Sterile"],
  },
  {
    id: "item-vitality-pack",
    name: "High-Strength Ergonomic Vitality & Bone Support",
    dosage: "Calcirol Vitamin D3 60K IU + Neurobion Forte B12",
    frequency: "Vitamin D3 once weekly; Neurobion daily after lunch",
    instructions: "Counteracts sedentary indoor sunlight deficiency and peripheral nerve strain.",
    partner: "Apollo Pharmacy",
    price: 299,
    originalPrice: 599,
    pills: 34,
    popular: false,
    tags: ["Sunlight Deficit", "Immunity", "Nerve Health"],
  },
  {
    id: "item-sleep-recovery",
    name: "On-Call Night Shift Sleep & Stress Support",
    dosage: "Melatonin 3mg Fast-Dissolve Strips + Ashwagandha 500mg",
    frequency: "1 strip 30 mins before target sleep time",
    instructions: "Facilitates circadian rhythm regulation for night shifts and on-call engineering rotations.",
    partner: "Tata 1mg",
    price: 349,
    originalPrice: 699,
    pills: 30,
    popular: false,
    tags: ["Circadian Reset", "Sleep Quality", "Zero Grogginess"],
  },
  {
    id: "item-fever-sos",
    name: "Emergency Acute Viral & Headache SOS Kit",
    dosage: "Dolo 650mg Paracetamol (15 Tabs) + Prolyte Apple ORS",
    frequency: "1 tab SOS every 6-8 hours for fever/headache with water",
    instructions: "Acute antipyretic for sudden fever or migraine during work hours. Mix ORS in 1L water.",
    partner: "Apollo Pharmacy",
    price: 99,
    originalPrice: 189,
    pills: 17,
    popular: true,
    tags: ["Fever SOS", "Headache", "ORS Hydration"],
  },
];

interface PharmacyOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItemId?: string;
}

export function PharmacyOrderModal({
  isOpen,
  onClose,
  initialItemId,
}: PharmacyOrderModalProps) {
  const { patient, orderPrescription } = useHealth();

  const [selectedItemId, setSelectedItemId] = useState<string>(
    initialItemId || PHARMACY_ITEMS[0].id
  );
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [pinCode, setPinCode] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderId: string;
    item: PharmacyItem;
    riderName: string;
    riderPhone: string;
    estimatedMins: number;
    otp: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialItemId) {
        setSelectedItemId(initialItemId);
      }
      const defaultAddr = patient
        ? [patient.address, patient.city, patient.state].filter(Boolean).join(", ")
        : "Flat 402, Green Glen Layout, Bellandur, Bengaluru, Karnataka";
      setDeliveryAddress(defaultAddr || "Flat 402, Green Glen Layout, Bellandur, Bengaluru, Karnataka");
      setPinCode(patient?.pinCode || "560103");
      setOrderSuccess(null);
    }
  }, [isOpen, initialItemId, patient]);

  if (!isOpen) return null;

  const activeItem = PHARMACY_ITEMS.find((item) => item.id === selectedItemId) || PHARMACY_ITEMS[0];
  const isPinValid = /^\d{6}$/.test(pinCode.trim());
  const isAddressValid = deliveryAddress.trim().length >= 8;

  const handlePlaceOrder = () => {
    if (!isAddressValid) {
      toast.error("Please enter a valid doorstep delivery address.");
      return;
    }
    if (!isPinValid) {
      toast.error("Please enter a valid 6-digit PIN code.");
      return;
    }

    setIsSubmitting(true);
    soundFx.playSoftClick(true);

    setTimeout(() => {
      orderPrescription({
        medicationName: activeItem.name,
        dosage: activeItem.dosage,
        frequency: activeItem.frequency,
        instructions: activeItem.instructions,
        pillsRemaining: activeItem.pills,
        totalPills: activeItem.pills,
        refillsLeft: 3,
        prescribedBy: "Dr. Ananya Iyer, MD (AIIMS Online Telehealth)",
        prescribedDate: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        pharmacy: {
          name: `${activeItem.partner} Express (Hub: ${patient?.city || "Bengaluru"})`,
          partner: activeItem.partner,
          deliveryStatus: "Processing",
          estimatedArrival: "Express 45-Min doorstep delivery",
        },
      });

      setIsSubmitting(false);
      const isApollo = activeItem.partner === "Apollo Pharmacy";
      setOrderSuccess({
        orderId: (isApollo ? "APL-" : "1MG-") + Math.floor(10000 + Math.random() * 90000),
        item: activeItem,
        riderName: isApollo ? "Naveen Kumar (Apollo Express Rider)" : "Rajesh Gowda (1mg Express)",
        riderPhone: "+91 98452 " + Math.floor(10000 + Math.random() * 90000),
        estimatedMins: 38,
        otp: String(Math.floor(1000 + Math.random() * 9000)),
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] bg-surface rounded-3xl border border-border shadow-2xl flex flex-col overflow-hidden text-foreground"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pharmacy-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 text-wellness" />
            </div>
            <div>
              <h2 id="pharmacy-modal-title" className="text-base font-bold text-foreground flex items-center gap-2">
                45-Minute Doorstep Express Pharmacy
                <Badge variant="sage">Apollo & 1mg</Badge>
              </h2>
              <p className="text-xs text-foreground-secondary">
                Ergonomic & acute relief tech wellness kits delivered to your desk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-foreground-secondary hover:text-foreground hover:bg-background-subtle transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {orderSuccess ? (
            /* Order Success State */
            <div className="space-y-6 py-2 animate-in fade-in-50 duration-300">
              <div className="p-6 rounded-2xl bg-wellness-light/60 border border-wellness/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-wellness text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Order Dispatched for 45-Min Delivery!
                </h3>
                <p className="text-xs text-foreground-secondary max-w-md mx-auto">
                  Your package has been verified by a licensed pharmacist at {orderSuccess.item.partner} and handed to our express delivery rider.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-wellness/40 text-xs font-mono font-bold text-wellness-dark">
                  Order Ref: #{orderSuccess.orderId}
                </div>
              </div>

              {/* Rider Tracking Card */}
              <div className="p-4 rounded-2xl bg-background-subtle border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Bike className="w-4 h-4 text-wellness" />
                    <span>Assigned Express Delivery Rider</span>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200">
                    ● On the Way (~{orderSuccess.estimatedMins} mins)
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-foreground-secondary block text-[11px]">Rider Name:</span>
                    <p className="font-bold text-foreground">{orderSuccess.riderName}</p>
                  </div>
                  <div>
                    <span className="text-foreground-secondary block text-[11px]">Direct Mobile:</span>
                    <p className="font-bold text-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3 text-wellness" />
                      {orderSuccess.riderPhone}
                    </p>
                  </div>
                  <div>
                    <span className="text-foreground-secondary block text-[11px]">Item Dispatched:</span>
                    <p className="font-bold text-foreground line-clamp-1">{orderSuccess.item.name}</p>
                  </div>
                  <div>
                    <span className="text-foreground-secondary block text-[11px]">Delivery OTP:</span>
                    <p className="font-mono font-bold text-wellness-dark text-sm">{orderSuccess.otp}</p>
                  </div>
                </div>
              </div>

              {/* Security & Cold Chain Note */}
              <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs space-y-1 text-[#166534]">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Tamper-Evident Safety Protocol</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Your medicine box is sealed with a holographic security strip. Share the 4-digit OTP only after verifying the unbroken tamper seal upon delivery.
                </p>
              </div>

              <div className="pt-2">
                <Button variant="primary" className="w-full" onClick={onClose}>
                  Done & View in Prescriptions
                </Button>
              </div>
            </div>
          ) : (
            /* Order Form */
            <>
              {/* Step 1: Select Item */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-foreground-secondary uppercase tracking-wider block">
                  1. Select Ergonomic & Acute Relief Tech Wellness Pack
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {PHARMACY_ITEMS.map((item) => {
                    const isSelected = item.id === selectedItemId;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItemId(item.id)}
                        className={cn(
                          "p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                          isSelected
                            ? "bg-wellness-light/40 border-wellness shadow-sm ring-1 ring-wellness/20"
                            : "bg-surface border-border hover:border-wellness/40 hover:bg-background-subtle/50"
                        )}
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-foreground text-sm">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-background-subtle border border-border text-foreground-secondary">
                              {item.partner}
                            </span>
                            {item.popular && (
                              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-foreground-secondary">
                            {item.dosage}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-foreground-muted">
                            <Clock className="w-3 h-3 text-wellness" />
                            <span>45-Min Express Delivery</span>
                            <span>•</span>
                            <span>100% Genuine Pharmacy Stock</span>
                          </div>
                        </div>

                        <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-border">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-bold text-foreground font-mono">
                              ₹{item.price}
                            </span>
                            <span className="text-xs text-foreground-muted line-through">
                              ₹{item.originalPrice}
                            </span>
                          </div>
                          <span className="text-[10px] text-wellness font-semibold">
                            Free Express Delivery
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Delivery Address & PIN Code */}
              <div className="space-y-3 p-4 rounded-2xl bg-background-subtle border border-border">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-wellness" />
                    <span>2. Doorstep Delivery Address (Bengaluru, Hyd, Pune, NCR)</span>
                  </label>
                  {isPinValid && (
                    <span className="text-[10px] font-semibold text-wellness flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      45-Min Rider Active
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Apartment, Flat No, Office Desk or Society Address"
                      className="w-full px-3.5 py-2.5 text-xs bg-surface border border-border rounded-xl focus:outline-none focus:border-wellness focus:ring-1 focus:ring-wellness text-foreground"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-36">
                      <input
                        type="text"
                        maxLength={6}
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="PIN (e.g. 560103)"
                        className="w-full px-3.5 py-2 text-xs font-mono bg-surface border border-border rounded-xl focus:outline-none focus:border-wellness focus:ring-1 focus:ring-wellness text-foreground"
                      />
                    </div>
                    <p className="text-[11px] text-foreground-secondary">
                      {isPinValid
                        ? "Apollo 24|7 & Tata 1mg delivery riders active in your area."
                        : "Enter 6-digit postal PIN code to verify 45-min delivery."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-border gap-3">
                <div>
                  <div className="text-xs text-foreground-secondary">Total Payable:</div>
                  <div className="text-lg font-bold text-foreground font-mono">
                    ₹{activeItem.price}{" "}
                    <span className="text-[11px] font-normal text-wellness">
                      (Free 45-Min Rider Delivery)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" onClick={onClose} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Rider...</span>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Place 45-Min Order</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
