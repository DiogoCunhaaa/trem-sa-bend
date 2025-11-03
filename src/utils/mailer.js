import nodemailer from "nodemailer";

// Cria e retorna um transporter do nodemailer.
async function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT ? Number(SMTP_PORT) : 587,
      secure: SMTP_SECURE ? SMTP_SECURE === "true" : false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  // Fallback para ambiente de desenvolvimento sem configuração SMTP
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export async function sendMail({ to, subject, text, html }) {
  const transporter = await createTransporter();
  const from = process.env.SMTP_FROM || "no-reply@trem.local";

  const info = await transporter.sendMail({ from, to, subject, text, html });

  // Se estiver usando Ethereal, retorna URL de preview para facilitar debug
  const previewUrl = nodemailer.getTestMessageUrl(info);
  return { messageId: info.messageId, previewUrl };
}