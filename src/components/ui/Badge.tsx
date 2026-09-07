import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "sage" | "neutral" | "outline" | "pill";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center text-xs font-medium transition-colors select-none";

  const variantStyles = {
    default: "bg-surface border border-border text-foreground px-2.5 py-0.5 rounded-full shadow-subtle",
    sage: "bg-wellness-light text-wellness-dark border border-[#D5DFD7] px-2.5 py-0.5 rounded-full",
    neutral: "bg-[#EFEFEA] text-[#4A4A45] px-2.5 py-0.5 rounded-md",
    outline: "border border-border text-foreground-secondary px-2 py-0.5 rounded-full",
    pill: "bg-surface text-foreground-secondary border border-border/80 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold",
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
}
