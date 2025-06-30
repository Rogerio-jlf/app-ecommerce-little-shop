import { dataBase } from "@/lib/prisma";
import crypto from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await dataBase.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { message: "E-mail não encontrado" },
      { status: 400 }
    );
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

  await dataBase.user.update({
    where: { email },
    data: { resetToken, resetTokenExpiry },
  });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: `Rogério Ferreira <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔑 Redefinição de Senha",
    text: `Clique no link para redefinir sua senha: ${resetLink}`, // Texto puro (opcional)
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #2d89ef;">Redefinição de Senha</h2>
        <p>Olá,</p>
        <p>Recebemos uma solicitação para redefinir sua senha. Para continuar, clique no botão abaixo:</p>
        <a href="${resetLink}" 
          style="display: inline-block; background-color: #2d89ef; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          🔑 Redefinir Senha
        </a>
        <p>Se você não solicitou esta alteração, ignore este e-mail. O link expirará em 1 hora.</p>
        <hr style="border: none; border-top: 1px solid #ddd;" />
        <p style="font-size: 12px; color: #777;">Atenciosamente,<br>Equipe de Suporte</p>
      </div>
    `,
  });

  return NextResponse.json({
    message: "Verifique seu e-mail para redefinir a senha",
  });
}
