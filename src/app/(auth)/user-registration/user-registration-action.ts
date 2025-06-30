"use server";

import { dataBase } from "@/lib/prisma";
import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

const userRegistrationAction = async (
  _prevState: unknown,
  formData: FormData
) => {
  const createUser = Array.from(formData.entries());
  const data = Object.fromEntries(createUser);
  const { name, email, password } = data as {
    name: string;
    email: string;
    password: string;
  };

  // Se os campos não estiverem preenchidos, retorna erro
  if (!name || !email || !password) {
    return {
      message: "Preencha todos os campos",
      success: false,
    };
  }

  // Valídação do formato do email
  const validateEmailFormat = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com(\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  };

  if (!validateEmailFormat(email)) {
    return {
      message: 'Email inválido! O email deve conter um "@" e um ".com"',
      success: false,
    };
  }
  // ----------

  // Validação do formato da senha
  const validatePasswordFormat = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  if (!validatePasswordFormat(password)) {
    return {
      message:
        "Senha inválida! A senha deve conter pelo menos 8 caracteres. Deve conter pelo menos uma letra maiúscula e um caractere especial",
      success: false,
    };
  }
  // ----------

  // Verifica se o usuário já existe
  const user = await dataBase.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return {
      message: "Usuário já cadastrado!",
      success: false,
    };
  }
  // ----------

  // Cria o usuário
  await dataBase.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password),
    },
  });

  return redirect("/");
};

export default userRegistrationAction;
