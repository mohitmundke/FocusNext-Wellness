import React from "react";
import { Badge } from "@/components/ui/Badge";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "FocusNext changed how I approach my engineering workday. The subtle posture prompts and structured recovery breaks prevent that 4 PM mental drain completely.",
      author: "Elena Rostova",
      role: "Staff Software Engineer",
      company: "Distributed Systems Lab",
    },
    {
      quote:
        "Finally a wellness tool built for technology workers that doesn't feel like a toy. Clean, minimal, non-intrusive, and genuinely effective.",
      author: "Marcus Chen",
      role: "Product Design Lead",
      company: "Studio Interface",
    },
    {
      quote:
        "Our engineering team saw a noticeable improvement in afternoon focus and energy balance after standardizing on 50-minute ultradian focus sessions.",
      author: "Sarah Lindqvist",
      role: "VP of Engineering",
      company: "CloudScale Systems",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background-subtle border-t border-border">
      <div className="container">
        <div className="max-w-2xl mb-16 md:mb-20">
          <Badge variant="outline" className="mb-4">
            Perspective
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
            What professionals say.
          </h2>
          <p className="text-base sm:text-lg text-foreground-secondary mt-4 leading-relaxed">
            Quiet technology that delivers measurable improvement to everyday workdays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-3xl border border-border p-8 shadow-card flex flex-col justify-between space-y-8 hover:shadow-elevated transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Quotation mark */}
                <span className="text-3xl font-serif text-wellness">“</span>
                <p className="text-sm sm:text-base text-foreground leading-relaxed -mt-2">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-border/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-background-subtle border border-border flex items-center justify-center font-semibold text-xs text-foreground">
                  {item.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{item.author}</h4>
                  <p className="text-[11px] text-foreground-secondary">{item.role} • {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
