import CartItem from "@/types/CartItems";
import Image from "next/image";
import { FaArrowCircleLeft, FaArrowCircleRight, FaTrash } from "react-icons/fa";

interface ItemsInCartProps {
  items: CartItem;
  increment?: (item: CartItem) => void;
  decrement?: (item: CartItem) => void;
  removeItem?: (item: CartItem) => void;
}

const ItemsCartComponent = ({
  items,
  increment,
  decrement,
  removeItem,
}: ItemsInCartProps) => {
  const { product } = items;
  const totalPrice = (product.price * items.quantity).toFixed(2);

  return (
    <article className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center gap-6 bg-white rounded-xl shadow-lg overflow-hidden p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 mt-6 relative h-auto sm:h-64">
      {/* Badge for discounts or special tags */}
      {product.discount && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          {product.discount}% OFF
        </div>
      )}

      {/* Product Image with overlay - Fixed size */}
      <div className="relative group w-full sm:w-40 h-40 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <section className="flex flex-col flex-1 justify-between py-3 w-full sm:w-auto h-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 line-clamp-1 mb-1">
              {product.title}
            </h2>
            <div className="flex items-center mb-2">
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full mr-2">
                {product.category}
              </span>
              {product.inStock ? (
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  Em estoque
                </span>
              ) : (
                <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-700 rounded-full">
                  Fora de estoque
                </span>
              )}
            </div>
          </div>

          {/* Price info */}
          <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0">
            <div className="flex items-center gap-2">
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              <span className="text-lg font-bold text-gray-900">
                R$ {product.price.toFixed(2)}
              </span>
            </div>
            <span className="text-sm text-gray-500">por unidade</span>
          </div>
        </div>

        {/* Description with fixed height */}
        <div className="h-12 overflow-hidden mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Quantity and subtotal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => decrement && decrement(items)}
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors p-1 disabled:opacity-50"
                aria-label="Diminuir quantidade"
                // disabled={items.quantity <= 1}
              >
                <FaArrowCircleLeft className="w-5 h-5" />
                <span className="sr-only">Diminuir</span>
              </button>

              <output
                className="text-gray-800 mx-2 min-w-6 text-center font-bold"
                aria-live="polite"
              >
                {items.quantity}
              </output>

              <button
                onClick={() => increment && increment(items)}
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors p-1"
                aria-label="Aumentar quantidade"
              >
                <FaArrowCircleRight className="w-5 h-5" />
                <span className="sr-only">Aumentar</span>
              </button>
            </div>

            {removeItem && (
              <button
                onClick={() => removeItem(items)}
                className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors px-2 py-1 hover:bg-red-50 rounded-md ml-2"
                aria-label="Remover item do carrinho"
              >
                <FaTrash className="w-3 h-3" />
                <span className="text-xs font-medium hidden sm:inline">
                  Remover
                </span>
              </button>
            )}
          </div>

          <div className="mt-3 sm:mt-0 flex items-center">
            <span className="text-sm text-gray-500 mr-2">Subtotal:</span>
            <span className="text-xl font-bold text-blue-600">
              R$ {totalPrice}
            </span>
          </div>
        </div>
      </section>
    </article>
  );
};

export default ItemsCartComponent;
