"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWellness } from "@/lib/wellness-context";
import { Button } from "@/components/ui/Button";
import {
  LayoutDashboard,
  Brain,
  Activity,
  UserCheck,
  Eye,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
  Volume2,
  VolumeX,
  Globe,
} from "lucide-react";
import { OverviewView } from "./views/OverviewView";
import { FocusTimerView } from "./views/FocusTimerView";
import { ActivityView } from "./views/ActivityView";
import { PostureView } from "./views/PostureView";
import { EyeHealthView } from "./views/EyeHealthView";
import { InsightsView } from "./views/InsightsView";
import { SettingsView } from "./views/SettingsView";
import { AIChatDrawer } from "./views/AIChatDrawer";
import { cn } from "@/lib/utils";

export function AppLayout() {
  const [currentView, setCurrentView] = useState<string>("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const { user, logout, settings, updateSettings } = useWellness();

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "focus", label: "Focus Timer", icon: Brain },
    { id: "activity", label: "Activity Tracker", icon: Activity },
    { id: "posture", label: "Posture Awareness", icon: UserCheck },
    { id: "eye-health", label: "Eye Health (20-20-20)", icon: Eye },
    { id: "insights", label: "Insights & Trends", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderActiveView = () => {
    switch (currentView) {
      case "overview":
        return <OverviewView onNavigate={setCurrentView} />;
      case "focus":
        return <FocusTimerView />;
      case "activity":
        return <ActivityView />;
      case "posture":
        return <PostureView />;
      case "eye-health":
        return <EyeHealthView />;
      case "insights":
        return <InsightsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <OverviewView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* =========================================================================
          DESKTOP SIDEBAR
          ========================================================================= */}
      <aside className="hidden md:flex w-64 border-r border-border bg-surface flex-col justify-between shrink-0 p-5 sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-6">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-[#111111] flex items-center justify-center text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" strokeDasharray="3 2" />
                <circle cx="12" cy="12" r="3.5" fill="#718B78" />
              </svg>
            </div>
            <span className="font-semibold text-lg text-foreground tracking-tight">
              FocusNext
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1" aria-label="Application Navigation">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted px-3 py-1.5">
              Workspace
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentView(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left",
                    isActive
                      ? "bg-background-subtle text-foreground font-semibold border border-border/80 shadow-subtle"
                      : "text-foreground-secondary hover:text-foreground hover:bg-background-subtle"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-wellness" : "text-foreground-secondary")} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: AI Button + User Profile */}
        <div className="space-y-4 pt-4 border-t border-border">
          {/* Launch AI Assistant button */}
          <button
            type="button"
            onClick={() => setAiDrawerOpen(true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-wellness-light border border-[#CAD9CD] text-wellness-dark hover:bg-wellness-light/80 transition-colors shadow-subtle"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-wellness" />
              <span className="text-xs font-bold">FocusNext AI</span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-surface px-2 py-0.5 rounded-full border border-[#CAD9CD]">
              Chat
            </span>
          </button>

          {/* User Profile info */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-background-subtle border border-border flex items-center justify-center font-bold text-xs text-foreground shrink-0">
                {user?.name?.slice(0, 2).toUpperCase() || "AL"}
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-foreground truncate">{user?.name || "Alex Morgan"}</div>
                <div className="text-[10px] text-foreground-secondary truncate">{user?.email || "alex@workspace.co"}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-foreground-secondary hover:text-red-500 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN APPLICATION AREA
          ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="border-b border-border bg-surface/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground"
            >
              <Menu className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold text-foreground capitalize">
              {navItems.find((i) => i.id === currentView)?.label || "Workspace"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio chime toggle */}
            <button
              type="button"
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className={cn(
                "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors",
                settings.soundEnabled
                  ? "bg-wellness-light border-[#D5DFD7] text-wellness-dark"
                  : "bg-surface border-border text-foreground-secondary"
              )}
              title="Toggle interval sound chimes"
            >
              {settings.soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{settings.soundEnabled ? "Audio On" : "Muted"}</span>
            </button>

            {/* AI Assistant Quick Launcher */}
            <Button
              variant="sage"
              size="sm"
              onClick={() => setAiDrawerOpen(true)}
              className="text-xs gap-1.5 h-8"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Assistant</span>
            </Button>

            {/* Back to Home Website Link */}
            <Link href="/">
              <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5 hidden sm:inline-flex">
                <Globe className="w-3.5 h-3.5" />
                <span>Website</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/30" onClick={() => setMobileNavOpen(false)} />
            <div className="relative z-10 w-72 bg-surface h-full border-r border-border p-6 flex flex-col justify-between animate-in slide-in-from-left duration-200">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#111111] flex items-center justify-center text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" strokeDasharray="3 2" />
                        <circle cx="12" cy="12" r="3.5" fill="#718B78" />
                      </svg>
                    </div>
                    <span className="font-semibold text-foreground">FocusNext</span>
                  </div>
                  <button onClick={() => setMobileNavOpen(false)} className="w-7 h-7 flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setCurrentView(item.id);
                          setMobileNavOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left",
                          currentView === item.id
                            ? "bg-background-subtle text-foreground font-semibold border border-border"
                            : "text-foreground-secondary"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{user?.name || "Alex Morgan"}</span>
                <button onClick={logout} className="text-xs text-red-500">Sign out</button>
              </div>
            </div>
          </div>
        )}

        {/* View Content Container */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Slide-out AI Assistant Drawer */}
      <AIChatDrawer isOpen={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} />
    </div>
  );
}
