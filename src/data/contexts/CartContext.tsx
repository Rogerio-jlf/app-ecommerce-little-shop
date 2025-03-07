"use client";

import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import CartItem from "../model/CartItems";
import Products from "../model/Products";
import useLocalStorage from "../hooks/useLocalStorage";

interface CartContextProps {
  items: CartItem[];
  addItems: (item: Products) => void;
  removeItems: (item: Products) => void;
  quantity: number;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = (props: CartProviderProps) => {
  const [items, setItem] = useState<CartItem[]>([]);
  const { set, get } = useLocalStorage();

  useEffect(() => {
    const cart = get("cart");
    if (cart) {
      setItem(cart);
    }
  }, [get]);

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

  const changeItems = (newItems: CartItem[]) => {
    setItem(newItems);
    set("cart", newItems);
  };

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
      {props.children}
    </CartContext.Provider>
  );
};
