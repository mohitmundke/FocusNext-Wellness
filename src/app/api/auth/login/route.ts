import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateUser, toClientPatientProfile } from "@/lib/server-storage";

const loginSchema = z.object({
  email: z.string().trim().optional(),
  loginId: z.string().trim().optional(),
  identifier: z.string().trim().optional(),
  password: z.string().min(1, "Password is required"),
}).refine((d) => Boolean(d.email || d.loginId || d.identifier), {
  message: "Email, phone number, or ABHA ID is required",
  path: ["email"],
});

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
    }

    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message || "Validation failed";
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const identifier = validation.data.email || validation.data.loginId || validation.data.identifier || "";
    const { password } = validation.data;
    const authResult = authenticateUser(identifier, password);

    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { success: false, error: authResult.error || "Invalid credentials." },
        { status: 401 }
      );
    }

    console.log(`[FOCUSNEXT AUTH] Patient ${authResult.user.name} (${authResult.user.email}) authenticated successfully.`);

    return NextResponse.json({
      success: true,
      user: toClientPatientProfile(authResult.user),
      message: "Signed in successfully to ABHA Health Portal.",
    });
  } catch (error) {
    console.error("Error in /api/auth/login:", error);
    return NextResponse.json(
      { success: false, error: "An internal error occurred during authentication." },
      { status: 500 }
    );
  }
}
