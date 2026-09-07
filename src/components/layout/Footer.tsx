import React from "react";
import Link from "next/link";
import { ShieldCheck, AlertCircle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: "Telehealth & OPD",
      links: [
        { label: "AIIMS & CMC Specialists", href: "/doctors" },
        { label: "Virtual OPD Consultation", href: "/doctors" },
        { label: "Desk Spine Physical Therapy", href: "/services" },
        { label: "Digital Eye Strain (20-20-20)", href: "/services" },
        { label: "Doctor Sick Leave Certificate", href: "/sick-leave" },
      ],
    },
    {
      title: "Diagnostics & Pharmacy",
      links: [
        { label: "Doorstep Labs (Dr Lal & 1mg)", href: "/services" },
        { label: "Omron Cellular BP Telemetry", href: "/services" },
        { label: "Accu-Chek Glucose Monitoring", href: "/services" },
        { label: "45-Min Apollo Delivery", href: "/services" },
        { label: "ABHA Health Account Link", href: "/login" },
      ],
    },
    {
      title: "Legal & Compliance",
      links: [
        { label: "Privacy Policy (DPDP Act)", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Refund & Cancellation", href: "/refund-policy" },
        { label: "Cookies & Storage Policy", href: "/cookies-policy" },
        { label: "NMC Telemedicine Compliance", href: "/sick-leave" },
      ],
    },
    {
      title: "Corporate & Support",
      links: [
        { label: "Care Plans & Pricing", href: "/pricing" },
        { label: "Section 80D Tax Exemption", href: "/pricing" },
        { label: "24/7 Helpline & Emergency SOS", href: "/contact" },
        { label: "Grievance Officer Redressal", href: "/privacy-policy#grievance" },
        { label: "Patient Portal Login", href: "/login" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-surface pt-16 pb-12 text-sm text-foreground-secondary">
      <div className="container">
        {/* Emergency Medical Notice Box (Indian 112 & 108) */}
        <div className="mb-12 p-4 rounded-2xl bg-background-subtle border border-border flex items-start gap-3 text-xs text-foreground-secondary">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-foreground">Medical Emergency Helpline Notice (India): </span>
            FocusNext Health India is an outpatient telemedicine provider. If you are experiencing sudden chest pain, difficulty breathing, stroke symptoms, or severe medical trauma, please call <span className="font-bold text-red-600">112 (National Emergency)</span> or <span className="font-bold text-red-600">108 (State Ambulance Helpline)</span> immediately or visit the nearest hospital casualty emergency ward.
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#111111] flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-foreground tracking-tight text-base">
                  FocusNext
                </span>
                <span className="text-[10px] font-semibold text-wellness uppercase tracking-wider">
                  Health India
                </span>
              </div>
            </div>
            <p className="text-sm text-foreground-secondary max-w-sm leading-relaxed">
              Virtual hospital OPD, continuous remote patient monitoring (RPM), ABHA digital health records, and doorstep diagnostics across India.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-wellness-light border border-[#D5DFD7] text-xs font-semibold text-wellness-dark">
              <ShieldCheck className="w-3.5 h-3.5 text-wellness" />
              <span>Ayushman Bharat (ABDM) & NMC Compliant</span>
            </div>
          </div>

          {/* Links Columns */}
          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-foreground transition-colors text-xs sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Corporate Statutory Details Box */}
        <div className="mb-8 p-4 rounded-2xl bg-background-subtle/80 border border-border text-[11px] text-foreground-secondary space-y-1.5 leading-relaxed">
          <div className="flex items-center justify-between flex-wrap gap-2 font-bold text-foreground">
            <span>FocusNext Health Technologies Private Limited</span>
            <span className="font-mono text-wellness-dark">CIN: U72900KA2024PTC189421</span>
          </div>
          <p>
            <strong>Registered Office:</strong> 4th Floor, Salarpuria Hallmark, Outer Ring Road, Kadubeesanahalli, Bellandur, Bengaluru, Karnataka 560103, India.
          </p>
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-border/60 text-[10px] text-foreground-muted">
            <span>Grievance Officer (DPDP Act 2023): Mr. Advaith Nambiar (grievance@focusnexthealth.in)</span>
            <span>All telemedicine provided in compliance with NMC Telemedicine Practice Guidelines (2020)</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-muted">
          <p>© {currentYear} FocusNext Health Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/privacy-policy" className="hover:text-foreground underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground underline">Terms</Link>
            <Link href="/refund-policy" className="hover:text-foreground underline">Refunds</Link>
            <Link href="/cookies-policy" className="hover:text-foreground underline">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
