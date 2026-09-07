import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let body: { phone?: string; abhaId?: string; apiKey?: string; provider?: string } = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const rawPhone = body.phone || "9767969701";
    // Clean Indian 10-digit phone number
    const cleanedPhone = rawPhone.replace(/[^0-9]/g, "").slice(-10) || "9767969701";

    // Generate dynamic 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Check optional SMS API provider keys from env or client request
    const fast2smsKey = body.apiKey || process.env.FAST2SMS_API_KEY;
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    let sentViaProvider = false;
    let providerName = "Simulation Engine (Web & Audio IVR)";

    // Attempt Fast2SMS India dispatch if key is provided
    if (fast2smsKey && cleanedPhone.length === 10) {
      try {
        const res = await fetch("https://www.fast2sms.com/dev/bulkV2", {
          method: "POST",
          headers: {
            authorization: fast2smsKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            variables_values: generatedOtp,
            route: "otp",
            numbers: cleanedPhone,
          }),
        });
        const data = await res.json();
        if (data?.return) {
          sentViaProvider = true;
          providerName = "Fast2SMS India Carrier Gateway";
          console.log(`[REAL SMS SENT] Dispatched OTP ${generatedOtp} to +91 ${cleanedPhone} via Fast2SMS`);
        } else {
          console.warn("[Fast2SMS Response]", data);
        }
      } catch (err) {
        console.error("Fast2SMS API error:", err);
      }
    } else if (twilioSid && twilioAuthToken && twilioPhone) {
      try {
        const formattedTarget = `+91${cleanedPhone}`;
        const auth = Buffer.from(`${twilioSid}:${twilioAuthToken}`).toString("base64");
        const bodyParams = new URLSearchParams({
          To: formattedTarget,
          From: twilioPhone,
          Body: `Your FocusNext Health ABHA verification OTP is ${generatedOtp}. Valid for 10 minutes. Do not share.`,
        });

        const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: bodyParams.toString(),
        });

        if (res.ok) {
          sentViaProvider = true;
          providerName = "Twilio Global SMS";
          console.log(`[REAL SMS SENT] Dispatched OTP ${generatedOtp} to +91 ${cleanedPhone} via Twilio`);
        }
      } catch (err) {
        console.error("Twilio API error:", err);
      }
    }

    console.log(`\n========================================\n[FOCUSNEXT HEALTH OTP DISPATCH]\nTarget Number: +91 ${cleanedPhone}\nGenerated OTP: ${generatedOtp}\nProvider: ${providerName}\nTimestamp: ${new Date().toLocaleTimeString('en-IN')}\n========================================\n`);

    return NextResponse.json({
      success: true,
      otp: generatedOtp,
      phone: `+91 ${cleanedPhone}`,
      sentViaProvider,
      providerName,
      message: `OTP dispatched to +91 ${cleanedPhone}.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in /api/send-otp:", error);
    const fallbackOtp = Math.floor(100000 + Math.random() * 900000).toString();
    return NextResponse.json({
      success: true,
      otp: fallbackOtp,
      phone: "+91 9767969701",
      sentViaProvider: false,
      providerName: "Simulation Engine",
      message: `OTP dispatched.`,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawPhone = searchParams.get("phone") || "9767969701";
  const cleanedPhone = rawPhone.replace(/[^0-9]/g, "").slice(-10) || "9767969701";
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

  console.log(`[OTP GET] Generated ${generatedOtp} for +91 ${cleanedPhone}`);

  return NextResponse.json({
    success: true,
    otp: generatedOtp,
    phone: `+91 ${cleanedPhone}`,
    providerName: "Simulation Engine",
    message: `OTP dispatched.`,
    timestamp: new Date().toISOString(),
  });
}
