import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  },
  experimental: {
    serverComponentsExternalPackages: ["twilio"],
  },
};

export default nextConfig;
