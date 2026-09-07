"use client";

import React, { useState } from "react";
import { useWellness } from "@/lib/wellness-context";
import { Button } from "@/components/ui/Button";
import { Trash2, Download, Save, Clock } from "lucide-react";
import { toast } from "sonner";

export function SettingsView() {
  const { user, settings, updateSettings } = useWellness();

  const [formSettings, setFormSettings] = useState({
    workStart: settings.workStart,
    workEnd: settings.workEnd,
    pomodoroMinutes: settings.pomodoroMinutes,
    deepWorkMinutes: settings.deepWorkMinutes,
    shortBreakMinutes: settings.shortBreakMinutes,
    longBreakMinutes: settings.longBreakMinutes,
    postureReminderIntervalMinutes: settings.postureReminderIntervalMinutes,
    soundEnabled: settings.soundEnabled,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    toast.success("Settings updated successfully");
  };

  const handleExport = () => {
    const data = {
      user,
      settings,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `focusnext-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    toast.success("Wellness data exported");
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset your local wellness telemetry?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-foreground-secondary mt-1">
            Configure your focus intervals, audio prompts, and workday schedule.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleSave} className="gap-1.5">
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Workday Rhythm & Intervals */}
        <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-border">
            <Clock className="w-4 h-4 text-wellness" />
            <h3 className="text-base font-bold text-foreground">Workday & Session Durations</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Workday Start Time</label>
              <input
                type="time"
                value={formSettings.workStart}
                onChange={(e) => setFormSettings({ ...formSettings, workStart: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-background-subtle border border-border rounded-xl text-foreground focus:outline-none focus:border-wellness font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Workday End Time</label>
              <input
                type="time"
                value={formSettings.workEnd}
                onChange={(e) => setFormSettings({ ...formSettings, workEnd: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-background-subtle border border-border rounded-xl text-foreground focus:outline-none focus:border-wellness font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Pomodoro Interval (minutes)</label>
              <input
                type="number"
                min="5"
                max="60"
                value={formSettings.pomodoroMinutes}
                onChange={(e) =>
                  setFormSettings({ ...formSettings, pomodoroMinutes: parseInt(e.target.value) || 25 })
                }
                className="w-full px-3.5 py-2 text-sm bg-background-subtle border border-border rounded-xl text-foreground focus:outline-none focus:border-wellness font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Deep Work Interval (minutes)</label>
              <input
                type="number"
                min="10"
                max="120"
                value={formSettings.deepWorkMinutes}
                onChange={(e) =>
                  setFormSettings({ ...formSettings, deepWorkMinutes: parseInt(e.target.value) || 50 })
                }
                className="w-full px-3.5 py-2 text-sm bg-background-subtle border border-border rounded-xl text-foreground focus:outline-none focus:border-wellness font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Short Break (minutes)</label>
              <input
                type="number"
                min="1"
                max="20"
                value={formSettings.shortBreakMinutes}
                onChange={(e) =>
                  setFormSettings({ ...formSettings, shortBreakMinutes: parseInt(e.target.value) || 5 })
                }
                className="w-full px-3.5 py-2 text-sm bg-background-subtle border border-border rounded-xl text-foreground focus:outline-none focus:border-wellness font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Posture Reminder Frequency</label>
              <select
                value={formSettings.postureReminderIntervalMinutes}
                onChange={(e) =>
                  setFormSettings({
                    ...formSettings,
                    postureReminderIntervalMinutes: parseInt(e.target.value) || 30,
                  })
                }
                className="w-full px-3.5 py-2 text-sm bg-background-subtle border border-border rounded-xl text-foreground focus:outline-none focus:border-wellness"
              >
                <option value={20}>Every 20 minutes (High frequency)</option>
                <option value={30}>Every 30 minutes (Recommended)</option>
                <option value={45}>Every 45 minutes (Light cadence)</option>
                <option value={60}>Every 60 minutes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audio & Feedback Preferences */}
        <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">Harmonic Sound Chimes</h3>
              <p className="text-xs text-foreground-secondary">
                Synthesized pure browser audio for interval start and completion chimes
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormSettings({ ...formSettings, soundEnabled: !formSettings.soundEnabled })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                formSettings.soundEnabled ? "bg-wellness" : "bg-[#D8D8D4]"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  formSettings.soundEnabled ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Data Management & Privacy */}
        <div className="bg-surface rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-4">
          <div className="pb-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground">Privacy & Local Storage</h3>
            <p className="text-xs text-foreground-secondary">
              All your focus and posture data is kept strictly inside your browser storage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="outline" size="sm" onClick={handleExport} className="text-xs">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>Export Telemetry JSON</span>
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={handleResetData} className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50">
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              <span>Reset Local Telemetry</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
