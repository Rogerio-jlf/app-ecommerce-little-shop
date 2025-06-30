"use client";

import { SpinnerDefaultComponent } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import loginAction from "./login-action";

const LoginForm = () => {
  const router = useRouter();
  const { update } = useSession();
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.success) {
      update();
      setLoginSuccess(true);
    }
  }, [state, update]);

  useEffect(() => {
    if (loginSuccess) {
      router.replace("/");
    }
  }, [loginSuccess, router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ------------------------------------------------------------------------------------------
  return (
    <div className="w-full max-w-md p-8 mx-auto mt-8 bg-white shadow-lg rounded-xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Bem-vindo de volta
      </h2>

      {state?.errors && (
        <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
          <p className="flex items-center">
            <span className="mr-2">⚠️</span>
            {state.errors}
          </p>
        </div>
      )}

      <Form action={formAction}>
        <div className="space-y-5">
          {/* Input email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                <MailIcon size={18} />
              </div>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="nome@email.com"
                className="w-full py-2 pl-10 pr-4 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          {/*  */}

          {/* Input password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-blue-600 transition-colors hover:text-blue-800 hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                <LockIcon size={18} />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                className="w-full py-2 pl-10 pr-10 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>
          </div>
          {/*  */}

          {/* Botão entrar */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-3 mt-6 font-medium text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <SpinnerDefaultComponent />
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </Button>
          {/*  */}

          {/* Link registre-se */}
          <div className="mt-6 text-sm text-center text-gray-600">
            Não tem uma conta?{" "}
            <Link
              href="/user-registration"
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Registre-se
            </Link>
          </div>
          {/*  */}
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
