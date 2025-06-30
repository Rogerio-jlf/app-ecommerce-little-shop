import { dataBase } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const user = await dataBase.user.findFirst({ where: { resetToken: token } });

  if (
    !user ||
    !user.resetTokenExpiry ||
    new Date(user.resetTokenExpiry) < new Date()
  ) {
    return NextResponse.json(
      { message: "Token inválido ou expirado" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await dataBase.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return NextResponse.json({ message: "Senha redefinida com sucesso" });
}
