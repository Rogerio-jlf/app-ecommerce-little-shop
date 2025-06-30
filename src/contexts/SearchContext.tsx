"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import Products from "../types/Products";

// interface Product {
//   id: number;
//   category: string;
//   description: string;
//   image: string;
//   price: number;
//   name: string;
// }

interface SearchContextProps {
  search: string;
  setSearch: (query: string) => void;
  products: Products[];
  setProducts: (products: Products[]) => void;
  filteredProducts: Products[];
  setFilteredProducts: (products: Products[]) => void;
  handleSearch: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// Criação do contexto de busca de produtos
export const SearchContext = createContext<SearchContextProps>(
  {} as SearchContextProps
);

// Provedor de busca de produtos
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Função para filtrar produtos
  const handleSearch = () => {
    const trimmedSearch = search.trim();

    if (trimmedSearch === "") {
      setSearchTerm(""); // 🔹 Limpa o termo de busca
      setFilteredProducts(products); // 🔹 Restaura os produtos
      return;
    }

    setSearchTerm(trimmedSearch); // 🔹 Armazena o termo pesquisado

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(trimmedSearch.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Provedor de busca de produtos com os valores iniciais
  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        filteredProducts,
        handleSearch,
        products,
        setProducts,
        setFilteredProducts,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Hook para usar o contexto de busca
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de um SearchProvider");
  }
  return context;
};
