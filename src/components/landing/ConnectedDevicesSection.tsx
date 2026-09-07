"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useHealth } from "@/lib/health-context";
import {
  Activity,
  Heart,
  Watch,
  Wifi,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ConnectedDevicesSection() {
  const { connectedDevices, toggleDeviceConnection } = useHealth();
  const [syncing, setSyncing] = useState(false);

  const handleSyncAll = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1200);
  };

  return (
    <section id="devices" className="py-24 md:py-32 bg-background-subtle border-t border-border">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <Badge variant="sage" className="mb-4">
            Medical IoT Ecosystem
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Connect your medical devices in seconds.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Zero manual logging. FocusNext Health continuously synchronizes clinical-grade blood pressure monitors, continuous glucose sensors, pulse oximeters, and wearables.
          </p>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {connectedDevices.map((device) => (
            <div
              key={device.id}
              className={cn(
                "p-6 rounded-3xl bg-surface border transition-all duration-300 flex flex-col justify-between space-y-6 shadow-card",
                device.connected
                  ? "border-border hover:border-wellness"
                  : "border-border/60 opacity-70"
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-background-subtle border border-border flex items-center justify-center text-foreground">
                    {device.type === "watch" ? (
                      <Watch className="w-5 h-5 text-wellness" />
                    ) : device.type === "bp" ? (
                      <Activity className="w-5 h-5 text-wellness" />
                    ) : device.type === "cgm" ? (
                      <Sparkles className="w-5 h-5 text-wellness" />
                    ) : (
                      <Heart className="w-5 h-5 text-wellness" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleDeviceConnection(device.id)}
                    className={cn(
                      "text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors",
                      device.connected
                        ? "bg-wellness-light border-[#CBD7CE] text-wellness-dark"
                        : "bg-background-subtle border-border text-foreground-muted hover:text-foreground"
                    )}
                  >
                    {device.connected ? "Connected" : "Disconnected"}
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground">{device.name}</h3>
                  <p className="text-xs text-foreground-secondary mt-0.5">{device.brand}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-foreground-secondary">
                <span className="font-mono text-[11px]">Battery: {device.batteryLevel}%</span>
                <span className="text-[11px] text-wellness-dark font-medium">{device.lastSynced}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 p-6 rounded-3xl bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-wellness-light flex items-center justify-center text-wellness-dark">
              <Wifi className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-foreground">Continuous Clinical Telemetry Sync</h4>
              <p className="text-xs text-foreground-secondary">Encrypted direct transmission to your attending physician EHR</p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleSyncAll}
            disabled={syncing}
            className="text-xs gap-1.5"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", syncing && "animate-spin text-wellness")} />
            <span>{syncing ? "Syncing devices..." : "Sync All Devices"}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
