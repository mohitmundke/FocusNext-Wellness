import { NextResponse } from "next/server";
import { z } from "zod";
import { saveEmailOtp, getUserByEmail } from "@/lib/server-storage";

const sendEmailSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const validation = sendEmailSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message || "Validation failed";
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { email } = validation.data;
    const user = getUserByEmail(email);

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    saveEmailOtp(email, generatedOtp);

    console.log(`\n========================================\n[FOCUSNEXT HEALTH RESEND EMAIL OTP]\nRecipient: ${email}\nPatient: ${user?.name || "Patient"}\nVerification Code: ${generatedOtp}\nValid for: 10 minutes\nTimestamp: ${new Date().toLocaleTimeString('en-IN')}\n========================================\n`);

    return NextResponse.json({
      success: true,
      otp: generatedOtp,
      message: `A fresh 6-digit verification code has been dispatched to ${email}.`,
    });
  } catch (error) {
    console.error("Error in /api/auth/send-email-otp:", error);
    return NextResponse.json(
      { success: false, error: "Failed to dispatch email verification code." },
      { status: 500 }
    );
  }
}
