import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyEmailOtp, toClientPatientProfile } from "@/lib/server-storage";

const verifyEmailSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  otp: z.string().trim().length(6, "Verification code must be 6 digits"),
});

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const validation = verifyEmailSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message || "Invalid payload";
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { email, otp } = validation.data;
    const result = verifyEmailOtp(email, otp);

    if (!result.success || !result.user) {
      return NextResponse.json(
        { success: false, error: result.error || "Verification failed." },
        { status: 400 }
      );
    }

    console.log(`[FOCUSNEXT AUTH] Email ${email} verified for patient ${result.user.name}.`);

    return NextResponse.json({
      success: true,
      user: toClientPatientProfile(result.user),
      message: "Email address verified successfully. ABHA Electronic Health Record unlocked.",
    });
  } catch (error) {
    console.error("Error in /api/auth/verify-email:", error);
    return NextResponse.json(
      { success: false, error: "Internal error occurred during email verification." },
      { status: 500 }
    );
  }
}
