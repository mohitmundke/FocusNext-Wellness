"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { AccordionItem } from "@/components/ui/Accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "What is FocusNext?",
      answer:
        "FocusNext is workplace wellness technology designed to help knowledge workers and teams maintain healthy, sustainable focus rhythms. It brings together focus session management, smart break pacing, posture guidance, hydration tracking, and cognitive stamina insights into one calm workspace.",
      defaultOpen: true,
    },
    {
      question: "How does FocusNext help with focus?",
      answer:
        "FocusNext utilizes proven ultradian rhythm pacing (50-minute deep concentration blocks paired with 5-minute restorative recovery intervals) or traditional 25-minute Pomodoro intervals. By encouraging scheduled pauses before cognitive exhaustion sets in, overall daily mental stamina remains steady.",
    },
    {
      question: "How do wellness reminders work?",
      answer:
        "Reminders in FocusNext are deliberately gentle and non-intrusive. Instead of aggressive modal alerts, the system uses subtle visual status indicators and harmonic audio chimes synthesized directly in your browser.",
    },
    {
      question: "Can teams use FocusNext?",
      answer:
        "Yes. FocusNext offers team workspace capabilities allowing remote and hybrid organizations to synchronize focus periods, schedule shared wellness pauses, and view aggregated, anonymized stamina trends across teams.",
    },
    {
      question: "Is my data private?",
      answer:
        "Completely. FocusNext stores your session telemetry and posture check marks locally in your browser. We never track keystrokes, browser tabs, or webcam feeds, and we never sell user data.",
    },
    {
      question: "Does FocusNext replace medical advice?",
      answer:
        "No. FocusNext is a productivity and workplace wellness habits companion. It does not provide medical diagnosis, clinical treatment, or replace professional physical therapy or ergonomics evaluations.",
    },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-background-subtle border-t border-border">
      <div className="container max-w-4xl">
        <div className="max-w-2xl mb-14 md:mb-18">
          <Badge variant="sage" className="mb-4">
            Answers & Clarity
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Frequently asked questions.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Everything you need to know about the platform, privacy, and scientific habit architecture.
          </p>
        </div>

        <div className="bg-surface rounded-3xl border border-border p-6 sm:p-10 shadow-card">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={faq.defaultOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
