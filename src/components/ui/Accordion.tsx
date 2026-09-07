"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/80 last:border-b-0 py-4 transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-2 gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wellness rounded-md"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
          {question}
        </span>
        <span
          className={cn(
            "w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground-secondary transition-transform duration-200 shrink-0 bg-surface",
            isOpen && "rotate-180 bg-wellness-light border-[#CBD7CE] text-wellness-dark"
          )}
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>

      {isOpen && (
        <div className="pt-2 pb-3 text-sm leading-relaxed text-foreground-secondary animate-in fade-in-50 duration-200">
          {answer}
        </div>
      )}
    </div>
  );
}
