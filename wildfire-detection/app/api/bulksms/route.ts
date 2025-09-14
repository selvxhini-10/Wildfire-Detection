import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID; 
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  try {
    const { phone, message } = await request.json();

    if (!phone || !message) {
      return NextResponse.json({ error: "Phone and message required" }, { status: 400 });
    }

    const sms = await client.messages.create({
      body: message,
      to: phone,
      ...(messagingServiceSid
        ? { messagingServiceSid }
        : { from: fromNumber }) // fallback to phone number if no MessagingServiceSid
    });

    return NextResponse.json({ success: true, sid: sms.sid });
  } catch (err: any) {
    console.error("Twilio Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
