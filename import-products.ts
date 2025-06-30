import { dataBase } from "@/lib/prisma";

const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  await dataBase.product.createMany({
    data: products.map(
      (product: {
        id: number;
        title: string;
        category: string;
        description: string;
        price: number;
        image: string;
      }) => ({
        id: product.id,
        name: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        image: product.image, // Ajuste conforme a API
      })
    ),
  });

  console.log("Produtos importados com sucesso!");
};

fetchProducts()
  .catch(console.error)
  .finally(() => dataBase.$disconnect());

// npx tsx import-products.ts
