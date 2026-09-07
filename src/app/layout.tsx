import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HealthProvider } from "@/lib/health-context";
import { WellnessProvider } from "@/lib/wellness-context";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "FocusNext Health — Remote Healthcare & Telehealth Platform",
  description:
    "Clinical-grade remote healthcare, virtual physician consultations, continuous remote patient monitoring (RPM), biometric vitals telemetry, and digital therapeutics.",
  keywords: [
    "telehealth",
    "remote patient monitoring",
    "RPM",
    "virtual doctor",
    "blood pressure monitoring",
    "continuous glucose monitoring",
    "digital clinic",
    "online prescriptions",
    "biomarker lab testing",
  ],
  authors: [{ name: "FocusNext Health, Inc." }],
};

import { CookieConsentBanner } from "@/components/common/CookieConsentBanner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-[#CBD7CE] selection:text-[#171717]">
        <HealthProvider>
          <WellnessProvider>
            {children}
            <CookieConsentBanner />
            <Toaster
              position="bottom-right"
              theme="light"
              toastOptions={{
                className: "bg-surface text-foreground border border-border rounded-xl shadow-dropdown text-xs",
              }}
            />
          </WellnessProvider>
        </HealthProvider>
      </body>
    </html>
  );
}
