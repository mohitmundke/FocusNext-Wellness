# BRAIN.md — FocusNext Health India: Knowledge Base & Architecture Ledger

> **FocusNext Health India** is an advanced **Indian Remote Healthcare, Virtual OPD & Chronic Care Remote Patient Monitoring (RPM)** platform engineered for the Indian medical ecosystem, adhering to the **Ayushman Bharat Digital Mission (ABDM)**, **National Medical Commission (NMC) Telemedicine Practice Guidelines**, and **ICMR-INDIAB** cardiometabolic protocols.

---

## 1. Project Soul & Core Identity

### Brand & Purpose
* **Product Name**: FocusNext Health India (FocusNext Swasthya)
* **Domain**: Remote Healthcare, Virtual OPD Consultations, Chronic Disease Remote Patient Monitoring (RPM), Preventive Diagnostics & Doorstep Pharmacy Fulfillment across India.
* **Core Value Proposition**: Delivering clinical hospital-grade healthcare to Indian households — transforming 4-hour overcrowded OPD hospital queues and metro traffic into 10-minute on-demand virtual consultations with AIIMS/CMC specialists, continuous biometric telemetry (Omron BP, Accu-Chek Glucose), and 45-minute doorstep medicine delivery across 20,000+ Indian PIN codes.

### Personality & Design Principles (Strict Light-Only Theme)
* **Visual Aesthetic**: Refined Swiss-clinical minimalist aesthetic (`#F8FAF9` background, `#FFFFFF` card surfaces, `#0F172A` deep charcoal typography, `#475569` slate secondary text, `#E2E8E4` subtle borders, and `#1E5E4B` / `#164738` / `#E8F3EE` botanical medical sage accent).
* **Strict Design Directives**:
  - **Light Mode Only**: No dark-mode styles, no `dark:` Tailwind variants, no theme toggles.
  - **One Accent Color Used Sparingly**: Medical sage green (`#1E5E4B`) for trust, calm, and clinical focus.
  - **Typography**: Crisp, high-contrast sans-serif with monospace accents for biometric data (BP, Heart Rate, Glucose, ABHA ID).
  - **Pure Audio Feedback**: Subtle Web Audio API acoustic feedback (chimes, clicks, focus start) with zero external asset dependencies.

---

## 2. Authentication & Device OTP Delivery Architecture

### 2.1 Multi-Channel Device Delivery
1. **WhatsApp Delivery**: Opens WhatsApp with official verification payload for `+91 9767969701`.
2. **Audio IVR Voice Call (`window.speechSynthesis`)**: Spoken readout of the 6 digits in hospital voice.
3. **Native OS Push Notification (`Notification API`)**: Pushed to system tray / notification center.
4. **Cellular Indian Carrier SMS**: `/api/send-otp` integrates with Fast2SMS India and Twilio for real SIM SMS delivery.

### 2.2 Client-Side Interactive Verification (`PatientAuthModal` & `/login`)
* **Responsive 6-Box Input**: Auto-advance, backspace jump, and clipboard paste support.
* **Verification**: Checks code, plays acoustic confirmation chime, displays success toast, and transitions to `/app`.

---

## 3. Medical Board & Clinician Roster

| Specialist | Qualifications & Institution | Primary Focus Area |
| :--- | :--- | :--- |
| **Dr. Ananya Iyer, MD** | AIIMS New Delhi (Alumna) | Consultant Internal Medicine & Preventive Cardiology |
| **Dr. Rajesh Kulkarni, MS** | CMC Vellore (Alumnus) | Consultant Orthopedics & IT Spine Physical Therapy |
| **Dr. Priya Nair, MD, DM** | PGIMER Chandigarh | Consultant Endocrinology & Diabetes Reversal |
| **Dr. Rohan Mehra, MD** | KEM Hospital Mumbai | Consultant Physician & Pulmonology |

---

## 4. Verification & Quality Assurance Protocols

To maintain absolute integrity across all changes, every modification must pass:
1. **TypeScript Strict Typecheck**: `.\node_modules\.bin\tsc.cmd --noEmit` (Code 0, zero errors).
2. **ESLint Validation**: `.\node_modules\.bin\next.cmd lint` (`✔ No ESLint warnings or errors`).
3. **Production Next.js Build**: `.\node_modules\.bin\next.cmd build` (All routes statically prerendered).
4. **Live Verification**: Active production server on port 3002.

---

*Last Updated: 2026-09-03 | FocusNext Health India Engineering Team*
