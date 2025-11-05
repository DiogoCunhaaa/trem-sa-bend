import nodemailer from "nodemailer";

export async function forgotPassEmail(email_usuario, nome_usuario, senha_usuario) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailBody = `
    <!doctype html>
  <html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Redefinição de Senha</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
      <tr>
        <td style="padding:24px;">
          <h2 style="color:#1e293b;">Redefinição de Senha</h2>
          <p style="font-size:15px;color:#334155;line-height:1.5;">
            Olá, ${nome_usuario}<br><br>
            Recebemos uma solicitação de redefinição de senha para sua conta. 
            Foi gerada uma nova senha para você:
          </p>
          <div style="margin:20px 0;padding:12px 16px;background:#f1f5f9;border-radius:6px;font-size:16px;font-weight:bold;color:#0f172a;text-align:center;">
            ${senha_usuario}
          </div>
          <p style="font-size:13px;color:#94a3b8;margin-top:30px;border-top:1px solid #e2e8f0;padding-top:16px;">
            Se você não solicitou essa redefinição, ignore este e-mail.<br>
            Atenciosamente,<br>
            <strong>Sambaware Corp</strong>
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  const info = await transporter.sendMail({
    from: `"Sambaware Corp" <${process.env.EMAIL_USER}>`,
    to: email_usuario,
    subject: "Redefinição de Senha.",
    html: emailBody,
  });

  console.log("Message Sent:", info.messageId);
  console.log("Resposta do servidor:", info.response);
}
