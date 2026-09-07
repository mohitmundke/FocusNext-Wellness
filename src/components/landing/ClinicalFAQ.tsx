"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { AccordionItem } from "@/components/ui/Accordion";

export function ClinicalFAQ() {
  const faqs = [
    {
      question: "Can I get an official doctor-signed medical sick leave certificate for HR or college?",
      answer:
        "Yes. Under the National Medical Commission (NMC) Telemedicine Practice Guidelines (2020), our licensed physicians issue legally valid, digitally signed medical sick certificates with QR code verification accepted by IT company HR portals (Darwinbox, Keka, Zoho) and Indian university faculties.",
      defaultOpen: true,
    },
    {
      question: "Are doctors available during late evenings after my sprint standups and client calls?",
      answer:
        "Yes! We operate an active Evening and Late-Night Virtual OPD from 6:00 PM to 11:30 PM (including weekends) tailored specifically for software engineers, designers, and remote workers who cannot take time off during daytime standups.",
    },
    {
      question: "How does the subsidized Intern & Student Pass (from ₹199) work?",
      answer:
        "Interns and university students on modest stipends get subsidized access to top AIIMS & CMC doctors at ₹199 per single visit or ₹299/month. This includes consultation, official medical leave notes, 20-20-20 screen fatigue guidance, PG mess acidity relief, and free medicine delivery.",
    },
    {
      question: "Can I claim consultations and checkups under Section 80D or company wellness stipends?",
      answer:
        "Yes. Under Section 80D of the Indian Income Tax Act, payments made towards preventive health checkups are tax-deductible up to ₹5,000 per financial year. We also provide itemized GST invoices for corporate wellness and employee health reimbursement.",
    },
    {
      question: "How does the ABHA (Ayushman Bharat Health Account) integration work?",
      answer:
        "FocusNext Health is fully compliant with the Ayushman Bharat Digital Mission (ABDM). When you sign in with your 14-digit ABHA ID, your consultation summaries, diagnostic lab reports, and doctor prescriptions are automatically linked to your encrypted national health locker.",
    },
    {
      question: "What should I do during a severe medical emergency?",
      answer:
        "For acute life-threatening symptoms such as sudden chest pain, severe breathlessness, stroke symptoms, or severe trauma, please dial 112 (National Emergency Helpline) or 108 (State Ambulance Dispatch) immediately. FocusNext Health is intended for virtual consultations and non-emergency telemedicine.",
    },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container max-w-4xl">
        <div className="max-w-2xl mb-14 md:mb-18">
          <Badge variant="sage" className="mb-4">
            Indian Medical FAQs & Regulations
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            Frequently asked questions.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Everything you need to know about ABHA integration, NMC guidelines, doorstep medicine delivery, and tax deductions.
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
