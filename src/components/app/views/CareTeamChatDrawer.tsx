"use client";

import React, { useState, useRef, useEffect } from "react";
import { useHealth } from "@/lib/health-context";
import { Button } from "@/components/ui/Button";
import { X, Send, Stethoscope, Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CareTeamChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CareTeamChatDrawer({ isOpen, onClose }: CareTeamChatDrawerProps) {
  const { careMessages, isCareTeamTyping, sendCareMessage } = useHealth();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Review my recent Blood Pressure logs",
    "Request Telmisartan refill via Apollo Pharmacy",
    "Question about tomorrow's telehealth visit",
    "Report mild morning headache",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [careMessages, isCareTeamTyping]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendCareMessage(inputText);
      setInputText("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/35 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Body */}
      <div className="relative z-10 w-full max-w-md bg-surface h-full border-l border-border shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-background-subtle/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-wellness-light flex items-center justify-center text-wellness-dark">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Clinical Care Team Chat</h3>
              <p className="text-[11px] text-wellness-dark font-medium">Dr. Ananya Iyer, MD (AIIMS) & Triage RN</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground-secondary hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {careMessages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 max-w-[88%]",
                msg.sender === "patient" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5",
                  msg.sender === "patient"
                    ? "bg-[#111111] text-white font-bold"
                    : "bg-wellness-light text-wellness-dark border border-[#CBD8CE] font-bold"
                )}
              >
                {msg.sender === "patient" ? "ME" : "MD"}
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-foreground-muted font-semibold px-1">
                  {msg.senderName} {msg.senderTitle && `(${msg.senderTitle})`}
                </div>
                <div
                  className={cn(
                    "p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed",
                    msg.sender === "patient"
                      ? "bg-[#111111] text-white rounded-tr-none"
                      : "bg-background-subtle border border-border text-foreground rounded-tl-none shadow-subtle"
                  )}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] font-mono text-foreground-muted px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isCareTeamTyping && (
            <div className="flex gap-3 mr-auto max-w-[80%]">
              <div className="w-7 h-7 rounded-lg bg-wellness-light text-wellness-dark border border-[#CBD8CE] flex items-center justify-center text-xs shrink-0 mt-0.5">
                <Stethoscope className="w-3.5 h-3.5" />
              </div>
              <div className="p-3 bg-background-subtle border border-border rounded-2xl rounded-tl-none flex items-center gap-1.5 text-xs text-foreground-secondary">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-wellness" />
                <span>Dr. Vance is reviewing your telemetry...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts & Message Input */}
        <div className="p-4 border-t border-border bg-surface space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendCareMessage(prompt)}
                className="whitespace-nowrap text-[11px] font-medium px-2.5 py-1 rounded-full bg-background-subtle border border-border text-foreground-secondary hover:text-foreground transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Message your attending physician..."
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-background-subtle border border-border rounded-xl text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-wellness"
            />
            <Button type="submit" variant="sage" size="sm" className="h-9 w-9 p-0 rounded-xl shrink-0">
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-foreground-muted">
            <ShieldCheck className="w-3 h-3 text-wellness" />
            <span>Encrypted asynchronous clinical care channel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
