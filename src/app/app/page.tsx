import { Suspense } from "react";
import { PatientPortalLayout } from "@/components/app/PatientPortalLayout";

export const metadata = {
  title: "Patient Portal — FocusNext Health",
  description:
    "Secure Electronic Health Record (EHR), continuous remote vitals telemetry, telehealth consultations, and active prescription tracking.",
};

export default function AppPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-xs text-foreground-muted">Loading Patient Portal...</div>}>
      <PatientPortalLayout />
    </Suspense>
  );
}
