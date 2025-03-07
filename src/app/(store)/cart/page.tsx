"use client";

import EmptyCart from "@/components/cart/Empty-Cart";
import ItemsInCart from "@/components/cart/Items-Cart";
import TotalCart from "@/components/cart/Cart-Total";
import Header from "@/components/Header";
import useContextCart from "@/data/hooks/useContextCart";

const CartPage = () => {
  const { items, addItems, removeItems } = useContextCart();
  return (
    <>
      <Header />
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="min-w-[1200px] mx-auto flex flex-col gap-5">
            {items.map((item) => (
              <ItemsInCart
                key={item.product.id}
                items={item}
                increment={(item) => addItems(item.product)}
                decrement={(item) => removeItems(item.product)}
              />
            ))}
          </div>
          <TotalCart items={items} />
        </>
      )}
    </>
  );
};

export default CartPage;
