import useContextCart from "@/data/hooks/useContextCart";
import Products from "@/data/model/Products";
import Image from "next/image";

interface CardProductsProps {
  product: Products;
}

const ProductCardComponent = (props: CardProductsProps) => {
  const { addItems } = useContextCart();
  const { image, name, price, description } = props.product;
  return (
    <div className="flex flex-col w-72 bg-gray-900">
      <div className="relative w-72 h-52">
        <Image src={image} alt={name} fill className="obejct-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-4 p-5">
        <h2 className="text-xl text-white font-bold">{name}</h2>
        <p className="flex-1 text-sm text-white">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-lg text-white font-semibold">${price}</span>
          <button
            onClick={() => addItems(props.product)}
            className="text-xs text-white border rounded-full px-5 py-1 "
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardComponent;
