import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { cartItems, customer } = body;

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    /* ---------------- HARD DEBUG LOGS ---------------- */
    console.log("🔎 BASE URL:", baseUrl);
    console.log("🛒 CART ITEMS:", cartItems);

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("Cart is empty or invalid");
    }

    /* ---------------- LINE ITEMS (GBP) ---------------- */
    const line_items = cartItems.map((item) => {
      const unitAmount = Math.round(item.price * 100); // £ → pence

      // Stripe minimum safety (30p)
      if (unitAmount < 30) {
        throw new Error(
          `Stripe minimum violated: ${item.name} price too low (£${item.price})`
        );
      }

      return {
        price_data: {
          currency: "gbp", // ✅ POUNDS
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: unitAmount,
        },
        quantity: item.qty,
      };
    });

    /* ---------------- STRIPE SESSION ---------------- */
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,

      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/checkout`,

      // Optional metadata (safe even without DB)
      metadata: {
        name: customer?.name || "",
        phone: customer?.phone || "",
        address: customer?.address || "",
        note: customer?.note || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ STRIPE CHECKOUT ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
