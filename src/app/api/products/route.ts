import { dataBase } from "@/lib/prisma"; // Certifique-se de importar corretamente o cliente Prisma
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await dataBase.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

export async function GET_id({ params }: { params: { id: string } }) {
  try {
    const product = await dataBase.product.findUnique({
      where: { id: Number(params.id) },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produto" },
      { status: 500 }
    );
  }
}
