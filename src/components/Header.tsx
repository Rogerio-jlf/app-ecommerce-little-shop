"use client";

import { Badge } from "@/components/ui/badge";
import { useCartContext } from "@/contexts/CartContext";
import { useSearchContext } from "@/contexts/SearchContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CgEnter } from "react-icons/cg";
import { FaAmazon, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import {
  IoHeartOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SearchBarComponent from "./SearchBar";

const HeaderComponent = () => {
  const { quantity } = useCartContext();
  const { search, setFilteredProducts, products } = useSearchContext();
  const { data: session, status } = useSession();

  console.log("Sessão:", session); // Verifique no console se está vindo null

  const isLoggedIn = status === "authenticated";
  const router = useRouter();

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts(products);
    }
  }, [search, setFilteredProducts, products]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isLoggedIn
          ? "bg-zinc-900 shadow-xl py-2"
          : "bg-gradient-to-br from-blue-900 via-zinc-900 to-purple-900 py-4"
      }`}
    >
      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="p-2 transition-transform transform rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 group-hover:rotate-12 group-hover:scale-110">
                <FaAmazon className="w-8 h-8 text-white" />
              </div>
              <span className="hidden ml-3 text-xl font-extrabold text-white sm:block">
                Amazon<span className="text-blue-400">Shop</span>
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <SearchBarComponent />

          {/* User and Cart Section */}
          <div className="flex items-center space-x-4">
            {/* User Profile Section */}
            <div className="relative">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="relative inline-block p-2 group"
                      aria-label="Sua conta"
                    >
                      <div className="p-3 transition-transform duration-300 transform border border-gray-700 rounded-full bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/20">
                        <FaUserCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-zinc-800 border border-gray-700 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                        Sua conta
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-2 text-white border border-gray-700 shadow-xl bg-zinc-800">
                    <DropdownMenuLabel className="flex flex-col py-3">
                      <span className="font-medium">
                        Olá, {session?.user?.name || "Usuário"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {session?.user?.email}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-700" />

                    <DropdownMenuItem
                      className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-white/10"
                      onClick={() => router.push("/profile")}
                    >
                      <FaUserCircle className="w-4 h-4 mr-2 text-blue-400" />
                      <span>Meu Perfil</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-white/10"
                      onClick={() => router.push("/favorites")}
                    >
                      <IoHeartOutline className="w-4 h-4 mr-2 text-red-400" />
                      <span>Favoritos</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-white/10"
                      onClick={() => router.push("/favorites")}
                    >
                      <MdDashboard className="w-4 h-4 mr-2 text-red-400" />
                      <span>Meus pedidos</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="flex items-center px-2 py-2 text-sm cursor-pointer hover:bg-white/10"
                      onClick={() => router.push("/settings")}
                    >
                      <IoSettingsOutline className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Configurações</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem
                      className="flex items-center px-2 py-2 text-sm text-red-400 cursor-pointer hover:bg-white/10"
                      onClick={handleSignOut}
                    >
                      <IoLogOutOutline className="w-4 h-4 mr-2" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login" className="relative inline-block p-2 group">
                  <div className="flex items-center gap-2 px-4 py-3 space-x-2 text-white rounded-lg bg-white/10">
                    Entrar
                    <CgEnter className="w-5 h-5 text-white" />
                  </div>
                </Link>
              )}
            </div>
            {/* ---------- */}

            {/* Cart Section */}
            <div className="flex-shrink-0">
              <Link href="/cart" className="relative inline-block p-2 group">
                <div
                  className="p-3 transition-transform duration-300 transform border border-gray-700 rounded-full bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/20"
                  aria-label="Seu carrinho"
                >
                  <FaShoppingCart className="w-5 h-5 text-white" />
                  <Badge className="absolute flex items-center justify-center w-6 h-6 p-0 text-xs font-bold text-white border border-gray-800 rounded-full shadow-lg -top-2 -right-2 bg-gradient-to-br from-blue-500 to-purple-600 group-hover:animate-pulse">
                    {quantity}
                  </Badge>
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-zinc-800 border border-gray-700 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  Seu carrinho
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
