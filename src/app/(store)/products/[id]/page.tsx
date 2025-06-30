"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaSearch,
  FaShippingFast,
  FaTiktok,
  FaTimes,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

import Header from "@/components/Header";
import { useCartContext } from "@/contexts/CartContext";
import { IAddress } from "@/types/CEP";
import Products from "@/types/Products";
import {
  availableColors,
  availableSizes,
  imagesShirts,
} from "@/utils/constants";

export default function ProductDetails() {
  const { id } = useParams();
  const { addItems } = useCartContext();

  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<IAddress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch product by ID
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        console.error("ID do produto não encontrado nos parâmetros da URL.");
        return notFound();
      }

      setLoading(true);
      const productId = Array.isArray(id) ? id[0] : id;

      try {
        const data = await fetch(`/api/products/${productId}`).then((res) =>
          res.json()
        );

        if (!data) {
          console.error("Nenhum produto encontrado com o ID:", productId);
          return notFound();
        }

        setProduct(data);
        setSelectedImage(data.image);
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
        return notFound();
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Toast notification effect
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Handlers
  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleColorClick = (color: (typeof availableColors)[0]) => {
    setSelectedColor(color);
    setSelectedImage(color.image);

    showNotification(`Cor ${color.name} selecionada`);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    showNotification(`Tamanho ${size} selecionado`);
  };

  // Função para formatar o CEP (adiciona a máscara 00000-000)
  const formatarCep = (value: string) => {
    const cepNumerico = value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cepNumerico.length > 5) {
      return `${cepNumerico.slice(0, 5)}-${cepNumerico.slice(5, 8)}`;
    }
    return cepNumerico;
  };

  // Função para consultar o CEP na API do ViaCEP
  const consultarCep = async () => {
    if (!cep || cep.length !== 9) {
      setError("CEP inválido. O CEP deve ter 8 dígitos.");
      setEndereco(null);
      return;
    }

    setLoading(true);
    setError(null);
    setEndereco(null);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado.");
      } else {
        setEndereco(data);
        showNotification("Frete calculado com sucesso!");
      }
    } catch {
      setError("Erro ao consultar o CEP. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Função para limpar o campo de CEP e os dados exibidos
  const limparCampo = () => {
    setCep("");
    setEndereco(null);
    setError(null);
  };

  // Função para adicionar ao carrinho com animação
  const handleAddToCart = () => {
    if (!selectedSize) {
      showNotification("Por favor, selecione um tamanho", "error");
      return;
    }

    addItems(product!);
    setAddedToCart(true);
    showNotification("Produto adicionado ao carrinho!", "success");

    // Reset animation state after delay
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };

  // Função para buscar produtos
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      consultarCep();
    }
  };

  // Função para adicionar/remover dos favoritos
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showNotification(
      isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      isFavorite ? "info" : "success"
    );
  };

  // Exibe notificações toast
  const showNotification = (
    message: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type: "success" | "error" | "info" = "info"
  ) => {
    setToastMessage(message);
    setShowToast(true);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
        <p className="mt-4 font-medium text-purple-700">
          Carregando produto...
        </p>
      </div>
    );
  }

  // Not found state
  if (!product) {
    return notFound();
  }

  //--------------------------------------------------------------------------------

  return (
    <>
      <Header />
      <main className="min-h-screen px-6 py-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed z-50 flex items-center px-4 py-3 bg-white rounded-lg shadow-lg top-6 right-6 animate-fade-in-down">
            <span className="mr-2 text-purple-600">•</span>
            <p>{toastMessage}</p>
            <button
              onClick={() => setShowToast(false)}
              className="ml-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={16} />
            </button>
          </div>
        )}

        <section className="max-w-6xl mx-auto overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Image Gallery with Gradient Background */}
            <div className="relative p-8 md:w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
              {/* Favorite Button */}
              <button
                onClick={toggleFavorite}
                className={`absolute top-4 right-4 z-10 bg-white rounded-full p-3 shadow-md transition-transform hover:scale-110 ${
                  isFavorite ? "text-red-500" : "text-gray-400"
                }`}
                aria-label={
                  isFavorite
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
              >
                <FaHeart size={20} />
              </button>

              {/* Main Image */}
              <div className="relative w-full p-4 mb-4 overflow-hidden transition-transform transform bg-white shadow-lg h-80 md:h-96 rounded-xl hover:scale-105">
                <Image
                  src={selectedImage || product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-contain w-full h-full rounded-lg"
                  priority
                />
              </div>

              {/* Image Carousel */}
              <div className="relative w-full p-4 overflow-hidden bg-white/20 backdrop-blur-sm rounded-xl">
                <Carousel
                  className="flex items-center h-full"
                  opts={{
                    align: "start",
                    slidesToScroll: 3,
                  }}
                >
                  <CarouselPrevious className="absolute left-0 z-10 p-2 transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 hover:bg-gray-100" />
                  <CarouselContent className="flex gap-2 px-4">
                    {imagesShirts.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-1/4 md:basis-1/3"
                      >
                        <button
                          onClick={() => handleImageClick(image.src)}
                          className="relative w-full aspect-square group"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={100}
                            height={100}
                            className={`rounded-md object-cover w-full h-full transition-all duration-300 ${
                              selectedImage === image.src
                                ? "border-2 border-white ring-2 ring-purple-500 scale-95"
                                : "border-2 border-transparent group-hover:border-white"
                            }`}
                          />
                          <div
                            className={`absolute inset-0 bg-purple-500 opacity-0 transition-opacity duration-300 rounded-md ${
                              selectedImage === image.src
                                ? "opacity-10"
                                : "group-hover:opacity-20"
                            }`}
                          />
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNext className="absolute right-0 z-10 p-2 transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 hover:bg-gray-100" />
                </Carousel>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6 p-8 md:w-1/2">
              {/* Product Meta */}
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold tracking-wider text-purple-600 uppercase">
                  <span>Nova Coleção</span>
                  <span>•</span>
                  <span className="text-green-600">Em estoque</span>
                </div>

                <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 text-xs italic font-semibold text-gray-500">
                  <p>{product.category}</p>
                  <p>•</p>
                  <p>Código: {product.id}</p>
                </div>
              </div>
              {/* ---------- */}

              {/* Price */}
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                  R$ {product.price.toFixed(2)}
                </p>

                <p className="text-sm text-gray-500 line-through">
                  R$ {(product.price * 1.2).toFixed(2)}
                </p>

                <span className="px-2 py-1 ml-2 text-xs font-semibold text-green-800 bg-green-100 rounded">
                  20% OFF
                </span>
              </div>
              {/* ---------- */}

              <div>
                <p className="text-sm text-gray-500">
                  ou 3x de{" "}
                  <span className="text-lg font-semibold text-gray-800">
                    R$ {(Number(product.price.toFixed(2)) / 3).toFixed(2)}
                  </span>
                  <span> sem juros, no cartão de crédito</span>
                </p>
              </div>

              {/* Divider */}
              <div className="h-px my-2 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
              {/* ---------- */}

              {/* SELECIONAR COR */}
              <div className="flex flex-col gap-3 space-y-1">
                <h3 className="flex items-center font-semibold text-gray-800 text-md">
                  <span className="w-2 h-5 mr-2 bg-purple-600 rounded-full"></span>
                  Escolha a cor
                </h3>

                <div className="flex flex-wrap gap-3">
                  {availableColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorClick(color)}
                      className={`w-8 h-8 rounded-full transition-all duration-300 transform hover:scale-110 ${
                        selectedColor.name === color.name
                          ? "ring-2 ring-offset-2 ring-purple-600 scale-110"
                          : ""
                      }`}
                      style={{ background: color.value }}
                      title={color.name}
                      aria-label={`Cor ${color.name}`}
                    >
                      {selectedColor.name === color.name && (
                        <span className="flex items-center justify-center text-xl text-white">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <p className="text-xs italic font-semibold text-gray-800">
                  Cor selecionada: <span>{selectedColor.name}</span>
                </p>
              </div>
              {/* ---------- */}

              {/* SELECIONAR TAMANHO */}
              <div className="flex flex-col gap-3 space-y-1">
                <h3 className="flex items-center font-semibold text-gray-800 text-md">
                  <span className="w-2 h-5 mr-2 bg-purple-600 rounded-full"></span>
                  Escolha o tamanho
                </h3>

                <div className="flex flex-wrap gap-3">
                  {availableSizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => handleSizeClick(size)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg border-2 transition-all duration-300 ${
                        selectedSize === size
                          ? "border-purple-500 bg-purple-500 text-white shadow-lg shadow-purple-200 font-bold"
                          : "border-gray-300 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                      aria-label={`Tamanho ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {!selectedSize && (
                  <p className="text-xs italic font-semibold text-red-500">
                    Por favor, selecione um tamanho
                  </p>
                )}
              </div>
              {/* ---------- */}

              {/* ADICIONAR AO CARRINHO */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleAddToCart}
                  className={`grow bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-purple-200 transition-all flex items-center justify-center gap-2 ${
                    addedToCart ? "animate-pulse" : ""
                  }`}
                  disabled={addedToCart}
                >
                  Adicionar ao carrinho
                  <FaArrowRight
                    className={`transition-transform ${
                      addedToCart ? "translate-x-2" : ""
                    }`}
                  />
                </button>

                <button
                  onClick={toggleFavorite}
                  className={`p-4 rounded-xl border-2 ${
                    isFavorite
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-500"
                  } transition-colors`}
                  aria-label={
                    isFavorite
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                >
                  <FaHeart size={20} />
                </button>
              </div>
              {/* ---------- */}

              {/* Divider */}
              <div className="h-px my-4 bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
              {/* ---------- */}

              {/* CALCULAR FRETE */}
              <div className="p-5 bg-gray-100 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <FaShippingFast className="text-purple-600" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Calcular Frete
                  </h3>
                </div>

                <div className="relative">
                  <div className="flex gap-2">
                    <div className="relative grow">
                      <input
                        type="text"
                        placeholder="00000-000"
                        value={cep}
                        onChange={(e) => setCep(formatarCep(e.target.value))}
                        onKeyDown={handleKeyPress}
                        className="w-full p-3 pl-10 transition-colors border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        maxLength={9}
                      />
                      <FaSearch
                        className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                        size={16}
                      />
                      {cep && (
                        <button
                          onClick={limparCampo}
                          className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                        >
                          <FaTimes size={16} />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={consultarCep}
                      disabled={loading || cep.length !== 9}
                      className="px-4 py-3 font-medium text-white transition-all rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-md disabled:opacity-50 whitespace-nowrap"
                    >
                      {loading ? "..." : "Calcular"}
                    </button>
                  </div>
                </div>

                {/* Exibe o endereço ou mensagem de erro */}
                {endereco && (
                  <div className="p-4 mt-4 text-green-800 border border-green-100 rounded-lg bg-green-50 animate-fade-in">
                    <p className="flex items-start">
                      <span className="mr-1 font-semibold">Endereço:</span>
                      <span>
                        {endereco.logradouro}, {endereco.bairro},{" "}
                        {endereco.localidade} - {endereco.uf}
                      </span>
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <p className="text-sm font-medium">
                          Prazo de entrega:{" "}
                          <span className="text-purple-700">
                            3-5 dias úteis
                          </span>
                        </p>
                        <p className="text-sm font-medium">
                          Frete:{" "}
                          <span className="text-purple-700">R$ 15,90</span>
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-bold text-green-800 bg-green-200 rounded-full">
                        Disponível
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 mt-4 border border-red-100 rounded-lg bg-red-50">
                    <p className="flex items-center gap-2 text-red-600">
                      <span>⚠️</span>
                      <span>{error}</span>
                    </p>
                  </div>
                )}

                <div className="flex justify-center mt-4">
                  <Link
                    href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                    className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Não sabe o seu CEP?</span>
                    <FaSearch size={12} />
                  </Link>
                </div>
              </div>
              {/* ---------- */}

              {/* MÍDEAS SOCIAIS */}
              <div className="flex flex-col items-center gap-2 mt-2">
                <p className="text-sm font-medium text-gray-600">
                  Compartilhar este produto:
                </p>
                <div className="flex gap-3">
                  {[
                    { Icon: FaFacebook, label: "Facebook", color: "#1877F2" },
                    { Icon: FaInstagram, label: "Instagram", color: "#E4405F" },
                    { Icon: FaTiktok, label: "TikTok", color: "#000000" },
                    { Icon: FaTwitter, label: "Twitter", color: "#1DA1F2" },
                    { Icon: FaWhatsapp, label: "WhatsApp", color: "#25D366" },
                  ].map(({ Icon, label, color }) => (
                    <button
                      key={label}
                      className="flex items-center justify-center w-10 h-10 transition-transform rounded-full hover:scale-110"
                      style={{ backgroundColor: color, color: "white" }}
                      aria-label={`Compartilhar no ${label}`}
                    >
                      <Icon size={18} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
