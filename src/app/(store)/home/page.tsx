"use client";
import FooterComponent from "@/components/Footer";
import ProductCardComponent from "@/components/product/Product-Card";
import { useSearchContext } from "@/contexts/SearchContext";
import { Gift, MoveRight, ShoppingBag, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  GiCheckMark,
  GiLifeInTheBalance,
  GiLightningTrio,
  GiPadlock,
} from "react-icons/gi";

export default function Home() {
  const { filteredProducts, setProducts, products, searchTerm } =
    useSearchContext();
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroImages = [
    "/colections/colecao-roupas1.jpg",
    "/colections/colecao-roupas2.png",
    "/colections/colecao-roupas3.jpg",
  ];

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetch("/api/products").then((res) => res.json());
      setProducts(data);
      setLoading(false);
    };

    loadProducts();

    const interval = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [setProducts, heroImages.length]);

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      title: "Tendências",
      description: "Os produtos mais buscados do momento",
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-blue-600" />,
      title: "Ofertas Exclusivas",
      description: "Preços especiais por tempo limitado",
    },
    {
      icon: <Gift className="w-6 h-6 text-pink-600" />,
      title: "Brindes Especiais",
      description: "Nas compras acima de R$ 200,00",
    },
  ];

  // -------------------------------------------------------------------------------------
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* SEÇÃO HERO */}
        <section className="relative overflow-hidden h-[calc(100vh-9rem)]">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
          <div className="relative transition-all duration-1000 ease-in-out">
            <Image
              src={heroImages[heroIndex]}
              alt="Destaque promocional"
              width={1920}
              height={1080}
              quality={100}
              priority
              className="object-cover w-full h-full"
            />
          </div>

          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container px-6 mx-auto">
              <div className="max-w-lg">
                <h1
                  data-aos="fade-down-right"
                  className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
                >
                  Descubra Produtos Incríveis
                </h1>

                <p data-aos="fade-right" className="mb-8 text-lg text-white/90">
                  As melhores marcas com os preços mais competitivos do mercado
                </p>

                <button
                  data-aos="fade-up-right"
                  className="flex items-center px-8 py-3 font-medium text-white transition-all rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group"
                >
                  Ver Ofertas
                  <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* INDICADORES */}
          <div className="absolute left-0 right-0 z-20 flex justify-center gap-2 bottom-4">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === heroIndex ? "bg-white scale-125" : "bg-white/50"
                }`}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </section>
        {/* ---------- */}

        {/* Features Section */}
        <section className="px-4 py-16 bg-white sm:px-6">
          <div data-aos="zoom-in" className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
              Por que escolher nossa loja?
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 transition-all border border-gray-200 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md"
                >
                  <div className="flex items-center justify-center mb-4 bg-white rounded-full shadow-sm w-14 h-14">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ---------- */}

        {/* Products Section */}
        <section id="products" className="px-4 py-16 sm:px-6">
          <div data-aos="fade-left" className="mx-auto max-w-7xl">
            <header className="mb-12 text-center">
              <div className="inline-block mb-3">
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-1.5 rounded-full">
                  Catálogo Atualizado
                </span>
              </div>
              {searchTerm ? (
                <p className="mx-auto mt-4 text-3xl text-left text-gray-800 max-w-7xl">
                  Resultados para:{" "}
                  <strong className="text-red-500">{searchTerm}</strong>
                </p>
              ) : (
                <div>
                  <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
                    Produtos Em Destaque
                  </h2>
                  <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                    Descubra nossa seleção exclusiva de produtos com os melhores
                    preços e qualidade garantida
                  </p>
                </div>
              )}
            </header>

            {loading ? (
              <div
                role="status"
                aria-label="Carregando produtos"
                className="flex flex-col items-center justify-center h-64"
              >
                <div className="w-16 h-16 mb-4 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
                <p className="font-medium text-gray-600">
                  Carregando produtos...
                </p>
                <span className="sr-only">Carregando...</span>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute z-10 flex items-center justify-center w-24 h-24 bg-yellow-400 rounded-full shadow-lg -top-6 -left-6 rotate-12">
                  <span className="text-sm font-bold leading-tight text-center text-yellow-900">
                    Ofertas Especiais
                  </span>
                </div>
                <ProductCardComponent />
              </div>
            )}

            {!loading &&
              filteredProducts.length === 0 &&
              products.length > 0 && (
                <section className="py-10 mt-8 text-center border border-gray-200 bg-gray-50 rounded-xl">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="mb-4 text-2xl font-semibold text-gray-700">
                    Nenhum produto encontrado
                  </h2>
                  <p className="max-w-md mx-auto text-gray-600">
                    Tente ajustar sua pesquisa ou filtros para encontrar o que
                    você procura.
                  </p>
                  <button className="px-6 py-2 mt-6 font-medium text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Ver todos os produtos
                  </button>
                </section>
              )}
          </div>
        </section>
        {/* ---------- */}

        {/* Newsletter Section */}
        <section className="px-4 py-16 sm:px-6 bg-gradient-to-r from-purple-600 to-blue-600">
          <div data-aos="fade-down" className="mx-auto text-center max-w-7xl">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Receba Ofertas Exclusivas
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Inscreva-se em nossa newsletter para receber promoções exclusivas
              e novidades em primeira mão
            </p>
            <div className="flex max-w-md gap-2 mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none"
              />
              <button className="px-6 py-3 font-medium text-yellow-900 transition-colors bg-yellow-500 rounded-r-lg hover:bg-yellow-600">
                Inscrever
              </button>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="px-4 py-8 bg-white sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div
                data-aos="fade-right"
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-2 bg-blue-100 rounded-full">
                  <GiPadlock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  Pagamento Seguro
                </h3>
              </div>

              <div
                data-aos="fade-right"
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-2 bg-green-100 rounded-full">
                  <GiCheckMark className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  Qualidade Garantida
                </h3>
              </div>

              <div
                data-aos="fade-left"
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-2 bg-red-100 rounded-full">
                  <GiLifeInTheBalance className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  Trocas Facilitadas
                </h3>
              </div>

              <div
                data-aos="fade-left"
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-2 bg-yellow-100 rounded-full">
                  <GiLightningTrio className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  Entrega Rápida
                </h3>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div data-aos="fade-up">
        <FooterComponent />
      </div>
    </>
  );
}
