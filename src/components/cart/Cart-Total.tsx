import CartItem from "@/types/CartItems";

export interface TotalCartProps {
  items: CartItem[];
}

const CartTotalComponent = ({ items }: TotalCartProps) => {
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discount = 0; // Você pode calcular descontos aqui, se necessário

  return (
    <section className="max-w-7xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-zinc-800 mt-20">
      {/* Cabeçalho */}
      <header className="bg-indigo-600 p-5">
        <h2 className="text-xl font-bold text-white">Resumo do Pedido</h2>
      </header>

      {/* Resumo do Pedido */}
      <article className="p-6 space-y-4">
        <dl className="space-y-3">
          <div className="flex items-center justify-between text-gray-700 dark:text-gray-200">
            <dt className="font-medium">Subtotal</dt>
            <dd className="font-semibold">R$ {subtotal.toFixed(2)}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-gray-700 dark:text-gray-200 font-medium">
              Desconto
            </dt>
            <dd className="text-indigo-600 dark:text-indigo-400 font-semibold">
              - R$ {discount.toFixed(2)}
            </dd>
          </div>

          <div className="h-px bg-gray-200 dark:bg-zinc-700 my-3"></div>

          {items.length > 0 && (
            <div className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg">
              <div className="flex items-center">
                <span className="h-8 w-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {items.length} {items.length === 1 ? "item" : "itens"} no
                  carrinho
                </span>
              </div>
              <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-800 dark:hover:text-indigo-300">
                Ver detalhes
              </button>
            </div>
          )}
        </dl>
      </article>

      {/* Total e Botão de Finalizar Compra */}
      <footer className="bg-gray-50 dark:bg-zinc-800 p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total
              </span>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                R$ {total.toFixed(2)}
              </span>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                Frete grátis
              </span>
            </div>
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 rounded-lg transition-all duration-200 flex items-center justify-center">
            <span>Finalizar Compra</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex items-center justify-center space-x-2 mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pagamentos processados com segurança
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default CartTotalComponent;
