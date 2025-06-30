import { useSearchContext } from "@/contexts/SearchContext";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBarComponent = () => {
  const {
    search,
    setSearch,
    handleSearch,
    setFilteredProducts,
    products,
    setSearchTerm,
  } = useSearchContext();
  const router = useRouter();

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts(products);
    }
  }, [search, setFilteredProducts, products]);

  const handleSearchWithRedirect = () => {
    handleSearch();
    router.push("/");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
      handleSearchWithRedirect();
      handleSearchAndScroll();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setSearchTerm(""); // 🔹 Atualiza `searchTerm` para restaurar o header
      setFilteredProducts(products); // 🔹 Garante que os produtos voltem ao normal
    }
  };

  const handleSearchAndScroll = () => {
    handleSearch();

    setTimeout(() => {
      const section = document.getElementById("products");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Pequeno delay para garantir que os produtos tenham sido filtrados
  };

  return (
    <>
      <div className="flex-1 max-w-2xl mx-6">
        <div className="backdrop-blur-sm bg-white/10 flex items-center relative rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
          {/* Category Select */}
          <div className="flex-shrink-0 border-r border-gray-500">
            <Select>
              <SelectTrigger className="border-none text-gray-200 rounded-l-xl rounded-r-none h-full min-w-36">
                <SelectValue
                  placeholder="Categorias"
                  className="text-gray-500"
                />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border border-gray-700 shadow-lg rounded-lg">
                {[...new Set(products.map((product) => product.category))].map(
                  (category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      onClick={() => setSearch(category)}
                      className="text-gray-200 hover:bg-blue-900/30 focus:bg-blue-900/30"
                    >
                      {category}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Pesquisar produto..."
            className="flex-grow py-3 pl-4 pr-12 bg-transparent text-white border-0 focus:ring-1 focus:ring-blue-500 outline-none placeholder-gray-400"
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            aria-label="Campo de pesquisa"
          />

          {/* Search Button */}
          <button
            onClick={() => {
              handleSearch();
              handleSearchWithRedirect();
              handleSearchAndScroll();
            }}
            className="absolute right-0 top-0 h-full bg-gradient-to-br from-blue-600 to-purple-700 text-white px-4 flex items-center justify-center transition-colors hover:from-blue-700 hover:to-purple-800"
            aria-label="Botão de pesquisa"
          >
            <FaSearch className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBarComponent;
