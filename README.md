# FocusNext Health — Remote Healthcare & Telehealth Platform

> **FocusNext Health** delivers clinical-grade remote healthcare combining on-demand virtual doctor consultations, continuous remote patient monitoring (RPM), protocol-driven AI clinical triage, and comprehensive Electronic Health Records (EHR) into one unified, calm medical interface.

---

## 🌟 Philosophy & Clinical Identity

> **"Modern Medicine. Delivered Anywhere."**

- **Clinical Excellence + Connected Devices + AI Triage + Human-Centered Design**
- Strict Light-Only Clinical Theme: `#F7F8F7` clean background, `#FFFFFF` surfaces, `#141619` charcoal typography, `#61666F` secondary text, `#E4E7E5` borders, and `#2E6B56` / `#718B78` calm medical sage accent.
- HIPAA & SOC2 Compliant 256-bit encrypted telemetry.

---

## 🚀 Key Features & Architecture

### 1. Public Platform Experience (`/`)
- **Clinical Navbar**: Telehealth, Remote Monitoring, Devices, Clinical Triage, Specialists, Care Plans.
- **Hero Section**: Live Telehealth & Biometric Telemetry Hub with real-time animated ECG waveform and instant doctor call launcher.
- **Clinical Trust Strip**: 15m average wait time, 50+ board-certified MDs, HIPAA & SOC2, 99.4% satisfaction.
- **Remote Care Services**: Virtual Urgent & Primary Care, Chronic Disease RPM, Digital Physical Therapy, Tele-Mental Health.
- **Connected Devices Ecosystem**: Withings BPM Connect, Dexcom G7 CGM, Nonin Oximeter, Apple Watch Series 10.
- **AI Symptom Navigator**: Protocol-based clinical triage simulator.
- **Virtual Consultation Studio**: Real-time video consultation room mockup.
- **Verified Physicians Directory**: Board-certified doctors from Johns Hopkins, Harvard, and Stanford.
- **Transparent Care Plans**: Virtual Primary Care ($49/mo), Comprehensive Chronic RPM ($149/mo), Enterprise.
- **Clinical FAQs & Legal Notices**: Medical disclaimers, e-prescribing rules, and emergency protocols.

### 2. Patient Authentication (`/login` & PatientAuthModal)
- React Hook Form + Zod validation.
- 1-click **Instant Demo Patient Login** (`Alex Morgan, DOB: 1988-04-12, O+`).

### 3. Full Virtual Patient Portal Workspace (`/app`)
- **Vitals & Telemetry**: Real-time BP (118/76 mmHg), Heart Rate (64 bpm with live ECG), SpO2 (99%), Glucose (94 mg/dL), and manual log entry dialog.
- **Virtual Clinic (Telehealth)**: Video consultation with Dr. Sarah Vance, MD, self-view PiP, live in-call visit notes, and instant digital prescription generator (`Lisinopril 10mg`).
- **AI Symptom Triage**: Interactive questionnaire with pain scale slider and clinical triage recommendations.
- **Diagnostic Biomarkers (EHR)**: Quest & Labcorp blood panels (HbA1c, hs-CRP, Lipid Profile, Vitamin D) with historical trend charts and normal ranges.
- **Prescriptions & Delivery**: Active medications, pill count progress bars, dosage logger, and 90-day refill requests.
- **24/7 Care Team Messaging**: Asynchronous chat with attending physician and clinical nurse.
- **Emergency SOS Protocol**: One-touch 911 dispatch guidance and emergency contact broadcast.
- **Medical Settings**: Personal health record, allergies, conditions, device manager, and JSON data export.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode — 0 `any`)
- **Styling:** Tailwind CSS + Radix UI Primitives + Lucide Icons
- **State Management:** React Context + Custom Hook `useWellness()` with localStorage persistence
- **Audio Engine:** Pure Browser Web Audio API Synthesizer (Zero external audio files required)
- **Validation:** React Hook Form + Zod (`@hookform/resolvers/zod`)
- **Notifications:** Sonner Toast Engine (Light theme)

---

## 📦 Getting Started

### 1. Installation
```bash
# Install dependencies
pnpm install
# or
npm install
```

### 2. Development
```bash
# Start development server
npm run dev
```

### 3. Verification & Build
```bash
# Typecheck
npm run typecheck

# Lint
npm run lint

# Production Build
npm run build

# Start Production Server
npm run start
```

---

## ⚖️ License
© 2026 FocusNext Wellness. Built with precision and care. All rights reserved to Mohit Mundke.
