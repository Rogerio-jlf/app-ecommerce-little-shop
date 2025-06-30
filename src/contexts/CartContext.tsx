"use client";

import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import CartItem from "../types/CartItems";
import Products from "../types/Products";
import useLocalStorage from "../hooks/useLocalStorage";

// Interface de um item no carrinho de compras
interface CartContextProps {
  items: CartItem[];
  quantity: number;
  addItems: (item: Products) => void;
  removeItems: (item: Products) => void;
}

// Criação do contexto de carrinho de compras
export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

// Provedor de carrinho de compras
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItem] = useState<CartItem[]>([]);
  const { set, get } = useLocalStorage();

  //
  useEffect(() => {
    const cart = get("cart");
    if (cart) {
      setItem(cart);
    }
  }, [get]);

  // Adiciona um item ao carrinho de compras
  const addItems = (product: Products) => {
    const index = items.findIndex((i) => i.product.id === product.id);
    if (index === -1) {
      changeItems([...items, { product, quantity: 1 }]);
    } else {
      const newItems = items;
      newItems[index].quantity++;
      changeItems([...newItems]);
    }
  };

  // Remove um item do carrinho de compras
  const removeItems = (product: Products) => {
    const newItems = items
      .map((item) => {
        if (item.product.id === product.id) {
          item.quantity--;
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    changeItems(newItems);
  };

  // Atualiza os itens do carrinho de compras
  const changeItems = (newItems: CartItem[]) => {
    setItem(newItems);
    set("cart", newItems);
  };

  // Provedor de carrinho de compras com os valores iniciais
  return (
    <CartContext.Provider
      value={{
        items,
        addItems,
        removeItems,
        get quantity() {
          return items.reduce((acc, item) => acc + item.quantity, 0);
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para acessar o contexto de carrinho de compras
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
