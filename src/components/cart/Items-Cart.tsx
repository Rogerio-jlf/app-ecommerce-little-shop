import CartItem from "@/data/model/CartItems";
import Image from "next/image";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface ItemsInCartProps {
  items: CartItem;
  increment?: (item: CartItem) => void;
  decrement?: (item: CartItem) => void;
}

const ItemsCartComponent = ({
  items,
  increment,
  decrement,
}: ItemsInCartProps) => {
  const { product } = items;

  return (
    <>
      <div className="flex items-center gap-5 bg-gray-900 rounded-md overflow-hidden">
        <div className="relative w-32 h-32">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <span className="text-xl font-bold text-white">{product.name}</span>
          <span className="text-white">{product.description}</span>
          <div className="flex items-center gap-2 mt-2 text-xl font-bold">
            <span className="text-white">R$ {product.price.toFixed(2)}</span>
            <span className="text-white">x</span>
            <span className="text-white">{items.quantity}</span>
            <span className="text-white">=</span>
            <span className="text-white">
              R$ {(product.price * items.quantity).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex items-center px-5 gap-4">
          <button onClick={() => decrement && decrement(items)}>
            <FaArrowCircleLeft className="text-white w-5 h-5" />
          </button>

          <span className="text-white">{items.quantity}</span>

          <button onClick={() => increment && increment(items)}>
            <FaArrowCircleRight className="text-white w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemsCartComponent;
