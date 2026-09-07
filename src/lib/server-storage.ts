import fs from "fs";
import path from "path";
import crypto from "crypto";
import { PatientProfile } from "@/types/health";

export interface StoredUser extends Omit<PatientProfile, "gender"> {
  passwordHash: string;
  gender: "Male" | "Female" | "Other";
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

// In-memory OTP Cache with 10-minute TTL
interface OtpEntry {
  code: string;
  expiresAt: number;
}
const otpStore = new Map<string, OtpEntry>();

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

// Initial seed data
const SEED_USERS: StoredUser[] = [
  {
    id: "pt-in-99214",
    name: "Aarav Sharma",
    email: "aarav.sharma@workspace.in",
    phone: "+91 98450 12345",
    passwordHash: hashPassword("password123"),
    dob: "August 12, 1996 (Age 29)",
    gender: "Male",
    bloodType: "B+",
    abhaId: "91-4421-8890-1204",
    pinCode: "560103",
    city: "Bengaluru, Karnataka (Remote Dev)",
    primaryPhysician: "Dr. Ananya Iyer, MD (AIIMS New Delhi)",
    allergies: ["Penicillin"],
    chronicConditions: ["Cervical Tech Neck (C5-C6 Posture Strain)", "Severe Vitamin D3 Deficiency (Indoor WFH)", "11-Hour Screen Strain"],
    emailVerified: true,
    phoneVerified: true,
    createdAt: new Date("2026-01-15T10:00:00Z").toISOString(),
    updatedAt: new Date().toISOString(),
    emergencyContact: {
      name: "Pooja Sharma",
      relationship: "Spouse",
      phone: "+91 98450 54321",
    },
  },
  {
    id: "pt-in-77312",
    name: "Priya Sundaram",
    email: "priya.sundaram@tech.in",
    phone: "+91 97120 44556",
    passwordHash: hashPassword("password123"),
    dob: "March 24, 2003 (Age 23)",
    gender: "Female",
    bloodType: "O+",
    abhaId: "91-6623-1109-8834",
    pinCode: "411014",
    city: "Pune, Maharashtra (WFH Intern)",
    primaryPhysician: "Dr. Priya Nair, MD (PGIMER Chandigarh)",
    allergies: ["Aspirin"],
    chronicConditions: ["UI/UX Design Intern (12h Screen Time)", "Digital Eye Strain & Computer Vision Syndrome", "PG Mess Gastric Acidity (GERD)"],
    emailVerified: true,
    phoneVerified: true,
    createdAt: new Date("2026-02-10T14:30:00Z").toISOString(),
    updatedAt: new Date().toISOString(),
    emergencyContact: {
      name: "Karthik Sundaram",
      relationship: "Brother",
      phone: "+91 97120 99887",
    },
  },
  {
    id: "pt-in-55109",
    name: "Ramesh Sharma",
    email: "ramesh.sharma@familycare.in",
    phone: "+91 98220 77112",
    passwordHash: hashPassword("password123"),
    dob: "October 05, 1958 (Age 68)",
    gender: "Male",
    bloodType: "B+",
    abhaId: "91-1124-9988-3401",
    pinCode: "411004",
    city: "Pune, Maharashtra (Hometown Parent)",
    primaryPhysician: "Dr. Rajesh Kulkarni, MS (CMC Vellore)",
    allergies: ["None Reported"],
    chronicConditions: ["Essential Hypertension", "Senior Cardiac RPM", "Monitored Remotely by Son (Aarav, Bengaluru)"],
    emailVerified: true,
    phoneVerified: true,
    createdAt: new Date("2026-01-20T08:15:00Z").toISOString(),
    updatedAt: new Date().toISOString(),
    emergencyContact: {
      name: "Aarav Sharma",
      relationship: "Son (Bengaluru)",
      phone: "+91 98450 12345",
    },
  },
];

function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(SEED_USERS, null, 2), "utf-8");
  }
}

export function getAllUsers(): StoredUser[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("[server-storage] Failed to read users file:", err);
    return SEED_USERS;
  }
}

export function saveAllUsers(users: StoredUser[]): void {
  ensureDataFile();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export function getUserByEmail(email: string): StoredUser | null {
  const users = getAllUsers();
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === normalized) || null;
}

export function getUserByPhone(phone: string): StoredUser | null {
  const users = getAllUsers();
  const cleanedTarget = phone.replace(/\D/g, "").slice(-10);
  return users.find((u) => u.phone.replace(/\D/g, "").slice(-10) === cleanedTarget) || null;
}

export function getUserByAbha(abhaId: string): StoredUser | null {
  const users = getAllUsers();
  const cleaned = abhaId.replace(/\D/g, "");
  return users.find((u) => u.abhaId.replace(/\D/g, "") === cleaned) || null;
}

export function generateAbhaId(): string {
  const r1 = Math.floor(1000 + Math.random() * 9000);
  const r2 = Math.floor(1000 + Math.random() * 9000);
  const r3 = Math.floor(1000 + Math.random() * 9000);
  return `91-${r1}-${r2}-${r3}`;
}

export function createUser(payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
  abhaId?: string;
  pinCode?: string;
  city?: string;
  dob?: string;
  gender?: "Male" | "Female" | "Other";
  bloodType?: string;
  chronicConditions?: string[];
}): StoredUser {
  const users = getAllUsers();

  const newUser: StoredUser = {
    id: `pt-in-${Math.floor(10000 + Math.random() * 90000)}`,
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    passwordHash: hashPassword(payload.password),
    abhaId: payload.abhaId?.trim() || generateAbhaId(),
    pinCode: payload.pinCode?.trim() || "560103",
    city: payload.city?.trim() || "Bengaluru, Karnataka",
    dob: payload.dob?.trim() || "12 August 1995 (Age 31)",
    gender: payload.gender || "Male",
    bloodType: payload.bloodType || "B+",
    primaryPhysician: "Dr. Ananya Iyer, MD (AIIMS New Delhi)",
    allergies: [],
    chronicConditions: payload.chronicConditions || ["General Wellness Monitoring (ABDM)"],
    emailVerified: false,
    phoneVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    emergencyContact: {
      name: "Emergency Kin",
      relationship: "Family Member",
      phone: payload.phone.trim(),
    },
  };

  users.push(newUser);
  saveAllUsers(users);
  return newUser;
}

export function updateUser(id: string, updates: Partial<StoredUser>): StoredUser | null {
  const users = getAllUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveAllUsers(users);
  return users[index];
}

// ─── Email OTP Verification ──────────────────────────────────────────────────
export function saveEmailOtp(email: string, code: string): void {
  const normalized = email.trim().toLowerCase();
  otpStore.set(normalized, {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  });
}

export function getEmailOtp(email: string): string | null {
  const normalized = email.trim().toLowerCase();
  const entry = otpStore.get(normalized);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    otpStore.delete(normalized);
    return null;
  }
  return entry.code;
}

export function verifyEmailOtp(email: string, enteredCode: string): { success: boolean; user?: StoredUser; error?: string } {
  const normalized = email.trim().toLowerCase();
  const entry = otpStore.get(normalized);

  // Allow standard verification code or fallback simulator code
  const isValid =
    (entry && entry.code === enteredCode && Date.now() <= entry.expiresAt) ||
    enteredCode === "884921" ||
    enteredCode === "123456";

  if (!isValid) {
    return { success: false, error: "Invalid or expired 6-digit email verification code." };
  }

  // Clear OTP
  otpStore.delete(normalized);

  // Mark user as verified
  const user = getUserByEmail(normalized);
  if (!user) {
    return { success: false, error: "Patient account not found." };
  }

  const updated = updateUser(user.id, { emailVerified: true });
  return { success: true, user: updated || user };
}

// ─── Authentication Verification ─────────────────────────────────────────────
export function authenticateUser(emailOrAbha: string, password: string): { success: boolean; user?: StoredUser; error?: string } {
  const target = emailOrAbha.trim();
  let user = getUserByEmail(target);
  if (!user) {
    user = getUserByAbha(target);
  }
  if (!user) {
    user = getUserByPhone(target);
  }

  if (!user) {
    return { success: false, error: "No account found matching this email, phone, or ABHA ID." };
  }

  const isPasswordValid = verifyPassword(password, user.passwordHash);
  if (!isPasswordValid) {
    return { success: false, error: "Incorrect password. Please verify your credentials." };
  }

  return { success: true, user };
}

export function toClientPatientProfile(user: StoredUser) {
  const { passwordHash: _, ...clientSafe } = user;
  return clientSafe;
}
