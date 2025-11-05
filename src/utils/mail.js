import nodemailer from "nodemailer";

export async function forgotPassEmail(email_usuario, senha_usuario) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Sambaware Corp" <${process.env.EMAIL_USER}>`,
    to: email_usuario,
    subject: "Redefinição de Senha.",
    text: `Redefinimos sua senha:  ${senha_usuario}`,
  });

  console.log("Message Sent:", info.messageId);
  console.log("Resposta do servidor:", info.response);
}