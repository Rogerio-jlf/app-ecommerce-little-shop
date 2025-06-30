"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn } from "../../../auth";

const loginAction = async (_prevState: unknown, formData: FormData) => {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    return { success: true, errors: null };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if ((error as Error & { type?: string }).type === "CredentialsSignin") {
      return { success: false, errors: "Dados para login, incorretos" };
    }

    return { success: false, errors: "Erro ao fazer login" };
  }
};

export default loginAction;
