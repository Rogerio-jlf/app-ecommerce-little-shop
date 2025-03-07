"use client";

import CardProducts from "@/components/product/Product-Card";
import products from "@/data/constants/products";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <CardProducts key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
