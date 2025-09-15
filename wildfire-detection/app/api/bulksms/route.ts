import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { phone, message } = await request.json();

  try {
    const twilio = (await import("twilio")).default;

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    const sms = await client.messages.create({
      body: message,
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    return NextResponse.json({ success: true, sid: sms.sid });
  } catch (err: any) {
    console.error("Twilio error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
