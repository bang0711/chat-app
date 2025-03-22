import { betterAuth } from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma";

import { createAuthClient } from "better-auth/react";

import { emailOTP } from "better-auth/plugins";
import { emailOTPClient } from "better-auth/client/plugins";

import { prisma } from "./prisma";

import { sendEmail } from "@/actions/email-send";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  advanced: {
    cookiePrefix: "chat-app",
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          await sendEmail({ email, verificationCode: otp });
        }
      },
      expiresIn: 60, // 1 minute
    }),
  ],
});

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL!,
  plugins: [emailOTPClient()],
});
