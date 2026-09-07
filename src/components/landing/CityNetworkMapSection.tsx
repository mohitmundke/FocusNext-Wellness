"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Clock, Truck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function CityNetworkMapSection() {
  const [activeCity, setActiveCity] = useState(0);

  const cities = [
    {
      name: "Bengaluru",
      state: "Karnataka",
      hubs: "Whitefield, Electronic City, Koramangala, HSR Layout, Indiranagar, Bellandur",
      medicineDelivery: "45-Minute Express",
      labPickup: "Home sample collection from 6:00 AM",
      activeDoctors: "24/7 Virtual OPD",
    },
    {
      name: "Mumbai & MMR",
      state: "Maharashtra",
      hubs: "Bandra, Andheri, Powai, South Mumbai, Thane, Navi Mumbai",
      medicineDelivery: "60-Minute Express",
      labPickup: "Dr Lal PathLabs & Tata 1mg home collection",
      activeDoctors: "24/7 Virtual OPD",
    },
    {
      name: "Delhi NCR",
      state: "Delhi / Haryana / UP",
      hubs: "Gurgaon Cyber City, Noida, South Delhi, Dwarka, Connaught Place",
      medicineDelivery: "45-Minute Express",
      labPickup: "Dr Lal PathLabs Central Lab Home Collection",
      activeDoctors: "24/7 Virtual OPD (AIIMS Doctors)",
    },
    {
      name: "Hyderabad",
      state: "Telangana",
      hubs: "Hitec City, Gachibowli, Banjara Hills, Jubilee Hills, Madhapur",
      medicineDelivery: "45-Minute Express",
      labPickup: "Apollo 24|7 & Tata 1mg home collection",
      activeDoctors: "24/7 Virtual OPD",
    },
    {
      name: "Pune",
      state: "Maharashtra",
      hubs: "Hinjewadi, Baner, Wakad, Viman Nagar, Kothrud, Koregaon Park",
      medicineDelivery: "60-Minute Express",
      labPickup: "Metropolis & Tata 1mg home collection",
      activeDoctors: "24/7 Virtual OPD",
    },
    {
      name: "Chennai",
      state: "Tamil Nadu",
      hubs: "OMR Tech Corridor, Adyar, Anna Nagar, Velachery, T Nagar",
      medicineDelivery: "60-Minute Express",
      labPickup: "Apollo Diagnostics home collection",
      activeDoctors: "24/7 Virtual OPD",
    },
  ];

  const current = cities[activeCity];

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Pan-India Healthcare Logistics
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Active across 20,000+ PIN codes in India.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            From the tech corridors of Bengaluru and Hyderabad to Tier-2 and Tier-3 cities — get express medicine delivery, home blood sample pickup, and on-demand doctor visits.
          </p>
        </div>

        {/* City Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {cities.map((city, idx) => (
            <button
              key={city.name}
              type="button"
              onClick={() => setActiveCity(idx)}
              className={cn(
                "p-3.5 rounded-2xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center space-y-1",
                activeCity === idx
                  ? "bg-wellness-light border-[#CBD7CE] text-foreground shadow-subtle"
                  : "bg-surface border-border text-foreground-secondary hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-wellness" />
                <span>{city.name}</span>
              </div>
              <span className="text-[10px] text-foreground-muted font-normal">{city.state}</span>
            </button>
          ))}
        </div>

        {/* City Info Card */}
        <div className="bg-surface rounded-3xl border border-border p-8 sm:p-10 shadow-card grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-background-subtle border border-border space-y-2">
            <div className="flex items-center gap-2 text-wellness-dark font-bold text-xs">
              <Truck className="w-4 h-4 text-wellness" />
              <span>Pharmacy Doorstep Delivery</span>
            </div>
            <div className="text-xl font-bold font-mono text-foreground">{current.medicineDelivery}</div>
            <p className="text-xs text-foreground-secondary">
              Fulfilled by Apollo Pharmacy & Tata 1mg across {current.name}.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-background-subtle border border-border space-y-2">
            <div className="flex items-center gap-2 text-wellness-dark font-bold text-xs">
              <Clock className="w-4 h-4 text-wellness" />
              <span>Diagnostic Sample Collection</span>
            </div>
            <div className="text-base font-bold text-foreground">{current.labPickup}</div>
            <p className="text-xs text-foreground-secondary">
              Phlebotomist home arrival with temperature-controlled vacutainers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-background-subtle border border-border space-y-2">
            <div className="flex items-center gap-2 text-wellness-dark font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-wellness" />
              <span>Key Tech Hubs Covered</span>
            </div>
            <div className="text-xs font-medium text-foreground leading-relaxed">
              {current.hubs}
            </div>
            <p className="text-[10px] text-wellness-dark font-semibold">
              ● All residential & IT corridor PIN codes active
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
