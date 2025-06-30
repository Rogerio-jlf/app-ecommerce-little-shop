import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { CreditCard, Gift, ShoppingBag, Tag, TruckIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaAmazon } from "react-icons/fa";
import { auth } from "../../../auth";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    return redirect("/dashboard");
  }

  // --------------------------------------------------------------------------------------
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Coluna lateral e-commerce */}
      <div className="relative hidden overflow-hidden bg-blue-700 md:block md:w-1/2">
        {/* Padrão de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)",
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>
        {/*  */}

        {/* Elementos decorativos */}
        <div className="absolute bg-blue-600 rounded-full -bottom-24 -left-24 w-96 h-96 opacity-40"></div>
        <div className="absolute w-64 h-64 bg-indigo-500 rounded-full -top-12 -right-12 opacity-30"></div>

        {/* Conteúdo da coluna lateral */}
        <div className="relative z-10 flex flex-col justify-center h-full px-12 py-16">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-10 h-10 mr-4 text-xl font-bold text-blue-700 bg-white rounded-full">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white">MegaStore</h3>
            </div>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl">
              Sua loja online com tudo o que você precisa
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              Entre na sua conta para acessar ofertas exclusivas, acompanhar
              seus pedidos e descobrir novidades.
            </p>
          </div>
          {/*  */}

          {/* Benefícios de compra */}
          <div className="mb-10 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 bg-blue-500 rounded-full">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-white">
                  Ofertas Exclusivas
                </h4>
                <p className="text-sm text-blue-200">
                  Descontos especiais para clientes cadastrados em toda loja.
                </p>
              </div>
            </div>
            {/*  */}

            <div className="flex items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 bg-blue-500 rounded-full">
                <TruckIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-white">Frete Grátis</h4>
                <p className="text-sm text-blue-200">
                  Em compras acima de R$199 para todo o Brasil.
                </p>
              </div>
            </div>
            {/*  */}

            <div className="flex items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 bg-blue-500 rounded-full">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-white">
                  Pagamento Facilitado
                </h4>
                <p className="text-sm text-blue-200">
                  Parcele em até 12x ou ganhe 10% de desconto no PIX.
                </p>
              </div>
            </div>
            {/*  */}
          </div>
          {/*  */}

          {/* Promoção em destaque */}
          <div className="p-6 border rounded-lg bg-white/10 backdrop-blur-sm border-white/20">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 mr-4 text-white bg-blue-800 rounded-full">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Promoção Especial</h4>
                <p className="text-sm text-blue-200">
                  Válida por tempo limitado
                </p>
              </div>
            </div>
            {/*  */}
            <p className="text-lg font-bold text-blue-50">
              Ganhe 15% OFF na primeira compra após o login!
            </p>

            <p className="mt-2 text-sm text-blue-200">
              Use o cupom{" "}
              <span className="px-2 py-1 font-mono text-white bg-blue-800 rounded">
                BEMVINDO15
              </span>{" "}
              no carrinho.
            </p>
          </div>
          {/*  */}
        </div>
        {/*  */}
      </div>
      {/*  */}

      {/* -------------------------------------------------------------------------------- */}

      {/* Coluna lateral da direita - Login */}
      <div className="flex items-center justify-center w-full p-4 md:w-1/2 md:p-12">
        <div className="w-full max-w-md">
          {/* Título */}
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center group">
              <div className="p-2 transition-transform transform rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 group-hover:rotate-12 group-hover:scale-125">
                <FaAmazon className="w-8 h-8 text-white" />
              </div>

              <span className="hidden ml-3 text-3xl font-extrabold text-black sm:block">
                Amazon<span className="text-blue-500">Shop</span>
              </span>
            </Link>
          </div>
          {/*  */}

          {/* Card do formulário de login */}
          <Card className="w-full overflow-hidden border-0 shadow-xl rounded-xl">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <CardHeader className="pt-6 pb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Acesse sua conta
              </h2>
              <CardDescription className="text-gray-600">
                Entre para ver seus pedidos e aproveitar nossas ofertas.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <LoginForm />
            </CardContent>
          </Card>
          {/*  */}

          {/* Rodapé */}
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} MegaStore. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
        {/*  */}
      </div>
      {/*  */}
    </div>
  );
}
