import { getProducts, addProduct } from "@/lib/productsStore";

export async function GET() {
  return Response.json({ products: getProducts() });
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { title, description, price } = body;

    if (!title || !price) {
      return Response.json(
        { error: "Title and price required" },
        { status: 400 }
      );
    }

    const product = addProduct({
      title,
      description,
      price: Number(price),
    });

    return Response.json({ product });

  } catch (error) {
    return Response.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}