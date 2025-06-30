import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { MdRemoveShoppingCart } from "react-icons/md";

const EmptyCartComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16 px-4 text-center min-h-[60vh] max-w-7xl mx-auto">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-zinc-100 dark:bg-zinc-800/50 blur-xl opacity-70"></div>
        <div className="relative bg-white dark:bg-zinc-900 rounded-full p-6 shadow-xl">
          <MdRemoveShoppingCart
            size={150}
            className="text-zinc-400 dark:text-zinc-500"
          />
        </div>
      </div>

      <div className="space-y-3 max-w-md">
        <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
          Seu carrinho está vazio
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          Adicione produtos à sua lista de compras para continuar
        </p>
      </div>

      <Link
        href="/"
        className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium rounded-lg px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 transform hover:translate-y-[-2px]"
      >
        <FaArrowCircleLeft />
        Ver produtos
      </Link>

      <div className="text-zinc-400 dark:text-zinc-500 mt-4 text-sm flex items-center gap-2">
        <GiPadlock className="w-4 h-4" />
        Compras 100% seguras
      </div>
    </div>
  );
};

export default EmptyCartComponent;
