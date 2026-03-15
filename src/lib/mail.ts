import { Resend } from "resend";

let resend: Resend;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  if (resend) {
    await resend.emails.send({
      from: "AyurAdda <onboarding@ayuradda.com>", // Update with verified domain
      to: email,
      subject: "Confirm your email - AyurAdda",
      html: `<p>Namaste! Please click <a href="${confirmLink}">here</a> to confirm your email.</p>`
    });
  } else {
    console.log(`Mock Email sent to ${email}: Verification Token -> ${confirmLink}`);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  if (resend) {
    await resend.emails.send({
      from: "AyurAdda <security@ayuradda.com>",
      to: email,
      subject: "Reset your password - AyurAdda",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });
  } else {
    console.log(`Mock Email sent to ${email}: Password Reset Token -> ${resetLink}`);
  }
};
