"use client";

import React, { useState, useRef, useEffect } from "react";
import { useWellness } from "@/lib/wellness-context";
import { Button } from "@/components/ui/Button";
import { X, Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChatDrawer({ isOpen, onClose }: AIChatDrawerProps) {
  const { aiMessages, isAITyping, sendAIMessage } = useWellness();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptChips = [
    "How do I relieve neck tension at my desk?",
    "Recommend an afternoon break routine",
    "How to structure 50-minute deep focus?",
    "Best posture checklist for laptop users",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages, isAITyping]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendAIMessage(inputText);
      setInputText("");
    }
  };

  const handleChipClick = (prompt: string) => {
    sendAIMessage(prompt);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div className="relative z-10 w-full max-w-md bg-surface h-full border-l border-border shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-background-subtle/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-wellness-light flex items-center justify-center text-wellness-dark">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">FocusNext AI Assistant</h3>
              <p className="text-[11px] text-wellness-dark font-medium">Workplace ergonomics & habit guidance</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground-secondary hover:text-foreground hover:bg-background-subtle transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {aiMessages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 max-w-[88%]",
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5",
                  msg.sender === "user"
                    ? "bg-[#111111] text-white"
                    : "bg-wellness-light text-wellness-dark border border-[#CBD8CE]"
                )}
              >
                {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className="space-y-1">
                <div
                  className={cn(
                    "p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed",
                    msg.sender === "user"
                      ? "bg-[#111111] text-white rounded-tr-none"
                      : "bg-background-subtle border border-border text-foreground rounded-tl-none shadow-subtle"
                  )}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] font-mono text-foreground-muted px-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isAITyping && (
            <div className="flex gap-3 mr-auto max-w-[80%]">
              <div className="w-7 h-7 rounded-lg bg-wellness-light text-wellness-dark border border-[#CBD8CE] flex items-center justify-center text-xs shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="p-3 bg-background-subtle border border-border rounded-2xl rounded-tl-none flex items-center gap-1.5 text-xs text-foreground-secondary">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-wellness" />
                <span>FocusNext AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Chips & Input Bar */}
        <div className="p-4 border-t border-border bg-surface space-y-3">
          {/* Quick chips */}
          <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="whitespace-nowrap text-[11px] font-medium px-2.5 py-1 rounded-full bg-background-subtle border border-border text-foreground-secondary hover:text-foreground hover:bg-[#EBEBE5] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about posture, focus, or breaks..."
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-background-subtle border border-border rounded-xl text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-wellness"
            />
            <Button type="submit" variant="sage" size="sm" className="h-9 w-9 p-0 rounded-xl shrink-0">
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>

          <p className="text-[10px] text-foreground-muted text-center">
            Non-medical companion • Private on-device guidance
          </p>
        </div>
      </div>
    </div>
  );
}
