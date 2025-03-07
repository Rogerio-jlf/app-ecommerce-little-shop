import { MdRemoveShoppingCart } from "react-icons/md";
import Link from "next/link";

const EmptyCartComponent = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-zinc-500 min-w-7xl mx-auto">
      <MdRemoveShoppingCart size={150} />
      <div>
        <h2 className="text-3xl ">Seu carrinho está vazio</h2>
        <p>Adicione produtos clicando no botão abaixo</p>
      </div>
      <Link href="/" className="bg-green-500 text-white rounded-sm px-4 py-2">
        Ver produtos
      </Link>
    </div>
  );
};

export default EmptyCartComponent;
