"use client";

import { SpinnerDefaultComponent } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useActionState, useState } from "react";
import userRegistrationAction from "./user-registration-action";

const UserRegistrationForm = () => {
  const [state, formAction, isPending] = useActionState(
    userRegistrationAction,
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkPasswordStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "bg-gray-200";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return "";
      case 1:
        return "Fraca";
      case 2:
        return "Média";
      case 3:
        return "Boa";
      case 4:
        return "Forte";
      default:
        return "";
    }
  };

  // Torna a primeira letra de cada palavra maiúscula
  const firstLetterEachWordCapitalize = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const words = e.target.value.split(" ");
    const lowerCaseWords = [
      "da",
      "das",
      "de",
      "des",
      "di",
      "dis",
      "do",
      "dos",
      "du",
      "dus",
    ];

    for (let i = 0; i < words.length; i++) {
      if (lowerCaseWords.includes(words[i].toLowerCase())) {
        words[i] = words[i].toLowerCase();
      } else {
        words[i] =
          words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
      }
    }

    e.target.value = words.join(" ");
  };

  return (
    <>
      {state?.success === false && (
        <div className="p-4 mb-5 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
          <p className="flex items-center">
            <span className="mr-2">⚠️</span>
            {state.message}
          </p>
        </div>
      )}

      <Form action={formAction}>
        <div className="space-y-5">
          {/* Nome completo */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome completo
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                <UserIcon size={18} />
              </div>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Fulano de Tal"
                onChange={firstLetterEachWordCapitalize}
                className="w-full py-2 pl-10 pr-4 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                <MailIcon size={18} />
              </div>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="eu@exemplo.com"
                className="w-full py-2 pl-10 pr-4 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </Label>

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
                onChange={checkPasswordStrength}
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

            {passwordStrength > 0 && (
              <div className="mt-2">
                <div className="flex w-full h-1 mt-1 overflow-hidden bg-gray-200 rounded-full">
                  <div
                    className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${passwordStrength * 25}%` }}
                  ></div>
                </div>
                <p className="flex justify-between mt-1 text-xs text-gray-600">
                  <span>
                    Força da senha:{" "}
                    <span className="font-medium">{getStrengthText()}</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    Mín. 8 caracteres
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Input confirmar senha */}
          <div className="space-y-2">
            <Label
              htmlFor="passwordConfirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar senha
            </Label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                <LockIcon size={18} />
              </div>
              <Input
                id="passwordConfirmation"
                type={showPassword ? "text" : "password"}
                name="passwordConfirmation"
                placeholder="********"
                className="w-full py-2 pl-10 pr-4 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          {/* ---------- */}

          {/* Checkbox de termos */}
          <div className="flex items-start mt-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>

            <Label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              Concordo com os{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Política de Privacidade
              </Link>
            </Label>
          </div>
          {/* ---------- */}

          {/* Botão de submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-3 mt-6 font-medium text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <SpinnerDefaultComponent />
                Processando...
              </span>
            ) : (
              "Criar conta"
            )}
          </Button>
          {/* ---------- */}

          {/* Link para login */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Já possui cadastro?{" "}
            <Link
              className="font-medium text-blue-600 transition-colors hover:text-blue-500"
              href="/login"
            >
              Faça o login
            </Link>
          </p>
          {/* ---------- */}
        </div>
      </Form>
    </>
  );
};

export default UserRegistrationForm;
