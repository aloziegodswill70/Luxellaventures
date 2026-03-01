import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function GET() {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 20,
      expand: ["data.customer"],
    });

    return Response.json({
      orders: sessions.data,
    });

  } catch (error) {
    console.error("Admin Orders Error:", error);
    return Response.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}