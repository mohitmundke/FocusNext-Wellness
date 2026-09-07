"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PatientAuthModal } from "@/components/auth/PatientAuthModal";
import { FloatingHealthDock } from "@/components/common/FloatingHealthDock";
import { CommandMenu } from "@/components/common/CommandMenu";
import { MedicalCertificateModal } from "@/components/common/MedicalCertificateModal";
import { useHealth } from "@/lib/health-context";
import * as z from "zod";
import {
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  AlertCircle,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ─── Contact Form Zod Schema ────────────────────────────────────────────────
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name should only contain letters and spaces"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Enter a valid email address (e.g. name@workspace.in)"),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => {
        if (!val) return true; // Optional
        const clean = val.replace(/[\s-+]/g, "");
        return /^[6-9]\d{9}$/.test(clean) || /^91[6-9]\d{9}$/.test(clean);
      },
      {
        message: "Enter a valid 10-digit Indian mobile number (e.g. 98450 12345)",
      }
    ),
  category: z.string().min(1, "Please select an inquiry topic"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters to provide sufficient context"),
});

export default function ContactPage() {
  const router = useRouter();
  const { triggerEmergencyProtocol } = useHealth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "general",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateField = (field: keyof typeof formData, value: string) => {
    const candidate = { ...formData, [field]: value };
    const res = contactSchema.safeParse(candidate);
    if (res.success) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    } else {
      const issue = res.error.issues.find((i) => i.path[0] === field);
      setErrors((prev) => {
        if (issue) {
          return { ...prev, [field]: issue.message };
        } else {
          const next = { ...prev };
          delete next[field];
          return next;
        }
      });
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      category: true,
      message: true,
    });

    const parseResult = contactSchema.safeParse(formData);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please resolve the validation errors highlighted below.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Namaste! Your message has been validated and received by the FocusNext Care Team.");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-[#CBD7CE] selection:text-[#171717]">
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCommand={() => setCommandMenuOpen(true)}
      />

      <main className="flex-1 pt-32 pb-24">
        <div className="container max-w-6xl space-y-16">
          {/* Header Banner */}
          <div className="max-w-3xl space-y-4">
            <Badge variant="sage" className="gap-1.5">
              <Phone className="w-3.5 h-3.5 text-wellness" />
              <span>24/7 Patient Care & Clinical Logistics Support</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.12]">
              We are here to support your health journey across India.
            </h1>
            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed">
              Have questions regarding doctor consultations, doorstep diagnostic phlebotomy, Apollo medicine deliveries, or corporate wellness plans? Reach our clinical team directly.
            </p>
          </div>

          {/* Emergency Alert Protocol Banner */}
          <div className="p-6 rounded-3xl bg-red-50 border border-red-200 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-red-900">
                  Experiencing a Critical Medical Emergency?
                </h3>
                <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                  If someone is suffering from chest pain, loss of consciousness, stroke symptoms, or severe breathlessness, call National Emergency 112 or State Ambulance 108 immediately.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={triggerEmergencyProtocol}
              className="bg-red-600 hover:bg-red-700 text-white border-red-600 font-bold text-xs shrink-0 shadow-subtle h-9 px-4"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              <span>Launch 112 / 108 SOS Protocol</span>
            </Button>
          </div>

          {/* Grid: Contact Channels & Inquiry Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Columns: Contact Channels */}
            <div className="lg:col-span-5 space-y-6">
              {/* Channel 1: WhatsApp Hotline */}
              <div className="p-6 rounded-3xl bg-surface border border-border shadow-card space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">WhatsApp Clinical Hotline</h3>
                  <p className="text-xs text-foreground-secondary mt-1">
                    Connect directly with our on-duty nursing coordinators for appointment rescheduling or medicine queries.
                  </p>
                  <p className="text-sm font-mono font-bold text-wellness-dark mt-2">
                    +91 98450 11223
                  </p>
                </div>
              </div>

              {/* Channel 2: Phone & Email */}
              <div className="p-6 rounded-3xl bg-surface border border-border shadow-card space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Email Inquiries</h3>
                  <p className="text-xs text-foreground-secondary mt-1">
                    For corporate tech plans, partnership inquiries, and clinical feedback:
                  </p>
                  <p className="text-xs font-mono font-bold text-wellness-dark mt-2">
                    care@focusnexthealth.in
                  </p>
                </div>
              </div>

              {/* Channel 3: Clinical Hubs */}
              <div className="p-6 rounded-3xl bg-surface border border-border shadow-card space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-wellness-light text-wellness-dark flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <h4 className="font-bold text-foreground">Bengaluru Telehealth Engineering Hub</h4>
                    <p className="text-foreground-secondary mt-0.5">
                      Ecospace Business Park, Outer Ring Road, Bellandur, Bengaluru 560103, Karnataka
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <h4 className="font-bold text-foreground">New Delhi Clinical Coordination Center</h4>
                    <p className="text-foreground-secondary mt-0.5">
                      Ansari Nagar West, Near AIIMS Circle, New Delhi 110029
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Interactive Contact Form */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-surface border border-border shadow-card space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-foreground">Send a Clinical Message</h2>
                <p className="text-xs text-foreground-secondary">
                  Our medical coordination team responds within an average of 15 minutes during OPD hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-wellness-light border border-wellness/40 text-center space-y-3 animate-in fade-in-50">
                  <CheckCircle2 className="w-10 h-10 text-wellness mx-auto" />
                  <h3 className="text-base font-bold text-foreground">Message Dispatched Successfully</h3>
                  <p className="text-xs text-foreground-secondary max-w-sm mx-auto">
                    A clinical care coordinator has been notified and will reach out via WhatsApp or email shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", category: "general", message: "" });
                    }}
                    className="text-xs"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="contact-name" className="font-bold text-foreground">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        {touched.name && !errors.name && formData.name && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold animate-in fade-in-50">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Validated</span>
                          </span>
                        )}
                      </div>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        placeholder="e.g. Aarav Sharma"
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-xl border text-foreground text-xs focus:outline-none transition-all shadow-subtle",
                          touched.name && errors.name
                            ? "border-red-500 bg-red-50/20 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                            : touched.name && formData.name
                            ? "border-emerald-500/80 bg-emerald-50/10 focus:border-emerald-600"
                            : "border-border bg-background-subtle focus:border-wellness"
                        )}
                      />
                      {touched.name && errors.name && (
                        <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1 animate-in fade-in-50">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="contact-email" className="font-bold text-foreground">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        {touched.email && !errors.email && formData.email && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold animate-in fade-in-50">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Validated</span>
                          </span>
                        )}
                      </div>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        placeholder="name@workspace.in"
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-xl border text-foreground text-xs focus:outline-none transition-all shadow-subtle",
                          touched.email && errors.email
                            ? "border-red-500 bg-red-50/20 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                            : touched.email && formData.email
                            ? "border-emerald-500/80 bg-emerald-50/10 focus:border-emerald-600"
                            : "border-border bg-background-subtle focus:border-wellness"
                        )}
                      />
                      {touched.email && errors.email && (
                        <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1 animate-in fade-in-50">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="contact-phone" className="font-bold text-foreground">
                          WhatsApp / Mobile Number
                        </label>
                        {touched.phone && !errors.phone && formData.phone && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold animate-in fade-in-50">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Validated</span>
                          </span>
                        )}
                      </div>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="10-digit Indian Mobile"
                        className={cn(
                          "w-full px-3.5 py-2.5 rounded-xl border text-foreground text-xs focus:outline-none transition-all shadow-subtle font-mono",
                          touched.phone && errors.phone
                            ? "border-red-500 bg-red-50/20 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                            : touched.phone && formData.phone
                            ? "border-emerald-500/80 bg-emerald-50/10 focus:border-emerald-600"
                            : "border-border bg-background-subtle focus:border-wellness"
                        )}
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1 animate-in fade-in-50">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-category" className="font-bold text-foreground">
                        Topic of Inquiry
                      </label>
                      <select
                        id="contact-category"
                        value={formData.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background-subtle border border-border text-foreground text-xs focus:outline-none focus:border-wellness shadow-subtle"
                      >
                        <option value="general">Virtual OPD Consultation Query</option>
                        <option value="spine">Desk Spine & Ergonomics PT</option>
                        <option value="leave">Medical Sick Leave Certificate</option>
                        <option value="labs">Doorstep Blood Sample / Reports</option>
                        <option value="corporate">Corporate Tech Team Care Plan</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-message" className="font-bold text-foreground">
                        Message / Clinical Query <span className="text-red-500">*</span>
                      </label>
                      {touched.message && !errors.message && formData.message.trim().length >= 10 && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold animate-in fade-in-50">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Validated ({formData.message.trim().length} chars)</span>
                        </span>
                      )}
                    </div>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      placeholder="Describe your health inquiry or question in at least 10 characters..."
                      className={cn(
                        "w-full px-3.5 py-2.5 rounded-xl border text-foreground text-xs focus:outline-none transition-all shadow-subtle",
                        touched.message && errors.message
                          ? "border-red-500 bg-red-50/20 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                          : touched.message && formData.message.trim().length >= 10
                          ? "border-emerald-500/80 bg-emerald-50/10 focus:border-emerald-600"
                          : "border-border bg-background-subtle focus:border-wellness"
                      )}
                    />
                    {touched.message && errors.message && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1 animate-in fade-in-50">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* DPDP Act 2023 Consent Notice */}
                  <div className="p-3 rounded-xl bg-background-subtle border border-border flex items-start gap-2.5 text-xs text-foreground-secondary">
                    <input
                      type="checkbox"
                      id="contact-consent"
                      defaultChecked
                      required
                      className="mt-0.5 rounded border-border text-wellness focus:ring-wellness h-4 w-4 accent-wellness cursor-pointer"
                    />
                    <label htmlFor="contact-consent" className="cursor-pointer leading-relaxed text-[11px]">
                      I consent to FocusNext processing my information in accordance with the{" "}
                      <Link href="/privacy-policy" className="text-wellness font-semibold underline hover:text-wellness-dark">
                        Privacy Policy
                      </Link>{" "}
                      under the <strong>DPDP Act, 2023</strong> solely to respond to this inquiry.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="sage"
                    size="md"
                    disabled={isSubmitting}
                    className="w-full justify-center gap-2 font-bold text-xs h-11 shadow-subtle"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Validating & Dispatching..." : "Submit Inquiry to Care Team"}</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <PatientAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => router.push("/app")}
      />

      <FloatingHealthDock
        onOpenCommand={() => setCommandMenuOpen(true)}
        onOpenConsult={() => router.push("/app?view=telehealth")}
      />

      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
        onOpenCertificate={() => setCertModalOpen(true)}
      />

      <MedicalCertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
      />
    </div>
  );
}
