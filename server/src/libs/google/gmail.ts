import { createTransport } from "nodemailer";

type MailType = {
  to: string;
  subject: string;
  html: string;
};

export async function sendMail({ to, subject, html }: MailType) {
  const gmailUsername = process.env.GMAIL_USERNAME as string;
  const gmailPassword = process.env.GMAIL_PASSWORD as string;

  const transport = createTransport({
    service: "gmail",
    auth: {
      user: gmailUsername,
      pass: gmailPassword,
    },
  });
  const from = gmailUsername;

  const { messageId } = await transport.sendMail({ from, to, subject, html });
  return messageId;
}
