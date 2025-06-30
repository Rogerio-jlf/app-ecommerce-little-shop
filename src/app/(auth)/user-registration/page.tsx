import HeaderComponent from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { HeartIcon, PercentIcon, ShoppingBag, Truck } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import UserRegistrationForm from "./user-registration-form";

const UserRegistrationPage = async () => {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <>
      <HeaderComponent />
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-[#233d4d]">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Coluna do formulário */}
            <div className="w-full md:w-1/2">
              <Card className="w-full h-full overflow-hidden bg-[#FFFFFF] border-0 shadow-xl rounded-2xl">
                <CardHeader className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Crie sua conta
                  </h2>
                  <CardDescription className="mt-1 text-gray-600">
                    Faça seu cadastro gratuitamente e comece a usar nossa
                    plataforma.
                  </CardDescription>
                  <div className="h-px mt-2 mb-2 bg-gradient-to-r from-red-500 via-gray-500 to-red-500"></div>
                </CardHeader>
                <CardContent className="p-6">
                  <UserRegistrationForm />
                </CardContent>
              </Card>
            </div>

            {/* Coluna lateral para e-commerce */}
            <div className="w-full md:w-1/2">
              <Card className="w-full h-full overflow-hidden text-white border-0 shadow-xl rounded-2xl bg-[#fe7f2d]">
                <CardContent className="flex flex-col justify-between h-full p-8">
                  <div>
                    <h2 className="mb-6 text-3xl font-bold">
                      Bem-vindo à nossa loja!
                    </h2>
                    <p className="mb-8 text-lg text-blue-100">
                      Cadastre-se hoje e descubra milhares de produtos com os
                      melhores preços do mercado.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-white/20">
                          <ShoppingBag size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="mb-1 text-xl font-medium">
                            Compras rápidas
                          </h3>
                          <p className="text-blue-100">
                            Salve seus dados para checkout em um clique
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-white/20">
                          <Truck size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="mb-1 text-xl font-medium">
                            Rastreamento fácil
                          </h3>
                          <p className="text-blue-100">
                            Acompanhe seus pedidos em tempo real
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-white/20">
                          <PercentIcon size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="mb-1 text-xl font-medium">
                            Ofertas exclusivas
                          </h3>
                          <p className="text-blue-100">
                            Receba descontos especiais para membros
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-white/20">
                          <HeartIcon size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="mb-1 text-xl font-medium">
                            Lista de desejos
                          </h3>
                          <p className="text-blue-100">
                            Salve produtos para comprar depois
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-8 border-t border-white/20">
                    <p className="font-medium">
                      &quot;Oferta especial para novos clientes: ganhe 15% de
                      desconto na primeira compra!&quot;
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegistrationPage;
