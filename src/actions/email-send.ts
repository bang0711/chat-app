"use server";

import EmailTemplate from "@/components/email-template";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailProps = {
  email: string;
  verificationCode: string;
};

export const sendEmail = async ({
  email,
  verificationCode,
}: SendEmailProps) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "HDD <onboarding@resend.dev>",
      to: [email],
      subject: "Verify Your Identity",
      react: EmailTemplate({ verificationCode }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
