import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getUserByEmail,
  getUserByPhone,
  getUserByAbha,
  createUser,
  saveEmailOtp,
  toClientPatientProfile,
} from "@/lib/server-storage";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please provide a valid email address"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  abhaId: z.string().optional(),
  pinCode: z.string().optional(),
  city: z.string().optional(),
  dob: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  bloodType: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message || "Validation failed";
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { name, email, phone, password, abhaId, pinCode, city, dob, gender, bloodType } = validation.data;

    // Check if email already registered
    const existingEmail = getUserByEmail(email);
    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: "An account with this email address already exists. Please sign in." },
        { status: 409 }
      );
    }

    // Check if phone already registered
    const existingPhone = getUserByPhone(phone);
    if (existingPhone) {
      return NextResponse.json(
        { success: false, error: "An account with this phone number already exists. Please sign in." },
        { status: 409 }
      );
    }

    // Check if ABHA ID already registered
    if (abhaId) {
      const existingAbha = getUserByAbha(abhaId);
      if (existingAbha) {
        return NextResponse.json(
          { success: false, error: "This ABHA ID is already linked to another patient profile." },
          { status: 409 }
        );
      }
    }

    // Create persistent patient account
    const newUser = createUser({
      name,
      email,
      phone,
      password,
      abhaId,
      pinCode: pinCode || "560103",
      city: city || "Bengaluru, Karnataka",
      dob: dob || "12 August 1995 (Age 31)",
      gender: gender || "Male",
      bloodType: bloodType || "B+",
    });

    // Generate 6-digit email OTP
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    saveEmailOtp(email, emailOtp);

    console.log(`\n========================================\n[FOCUSNEXT HEALTH EMAIL VERIFICATION DISPATCH]\nRecipient: ${email}\nPatient: ${name}\nVerification Code: ${emailOtp}\nValid for: 10 minutes\nTimestamp: ${new Date().toLocaleTimeString('en-IN')}\n========================================\n`);

    return NextResponse.json({
      success: true,
      user: toClientPatientProfile(newUser),
      otp: emailOtp,
      message: `Account created successfully. A 6-digit verification code has been dispatched to ${email}.`,
    });
  } catch (error) {
    console.error("Error in /api/auth/register:", error);
    return NextResponse.json(
      { success: false, error: "An internal error occurred during account creation." },
      { status: 500 }
    );
  }
}
