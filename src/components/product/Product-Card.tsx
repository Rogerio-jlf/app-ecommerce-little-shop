import Image from "next/image";
// import { useCartContext } from "@/contexts/CartContext";
import { useSearchContext } from "@/contexts/SearchContext";
import Link from "next/link";

const ProductCardComponent = () => {
  const { filteredProducts, products } = useSearchContext();
  // const { addItems } = useCartContext();
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {(filteredProducts.length > 0 ? filteredProducts : products).map(
          (product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <article className="overflow-hidden transition-all duration-300 transform bg-white border border-gray-100 shadow-md group rounded-2xl hover:shadow-xl hover:-translate-y-2">
                <figure className="relative overflow-hidden bg-gray-100 h-60">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    quality={100}
                    priority
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </figure>

                <div className="p-6">
                  <header>
                    <h2 className="mb-2 text-lg font-bold text-gray-800 line-clamp-2 h-14">
                      {product.name}
                    </h2>
                  </header>

                  <footer className="flex items-center justify-between mt-6">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-gray-500 line-through">
                        R$ {(product.price * 1.2).toFixed(2)}
                      </p>
                      <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
                        R$ {product.price.toFixed(2)}
                      </p>
                      <p className="text-sm font-semibold text-gray-500">
                        3x de {(product.price / 3).toFixed(2)}
                      </p>
                    </div>
                    {/* <button
                      onClick={() => addItems(product)}
                      className="bg-gradient-to-r from-blue-600 to-purple-700 text-white font-medium px-5 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-800 flex items-center justify-center"
                      aria-label={`Adicionar ${product.title} ao carrinho`}
                    >
                      Comprar
                    </button> */}
                  </footer>
                </div>
              </article>
            </Link>
          )
        )}
      </div>
    </>
  );
};

export default ProductCardComponent;
