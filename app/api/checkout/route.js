import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  try {
    const body = await req.json();

    const { cartItems = [], customer = {} } = body;

    if (!cartItems.length) {
      return Response.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    /* ---------------- STRIPE SESSION ---------------- */

    const totalWeightKg = cartItems.reduce((acc, item) => {
      const text = `${item?.unit || ""} ${item?.name || ""}`.toLowerCase();

      const kgMatch = text.match(/(\d+(\.\d+)?)\s*kg/);
      const gMatch = text.match(/(\d+(\.\d+)?)\s*g/);

      let unitWeight = 0.5;

      if (kgMatch?.[1]) unitWeight = Number(kgMatch[1]);
      if (gMatch?.[1]) unitWeight = Number(gMatch[1]) / 1000;

      return acc + unitWeight * (Number(item?.qty) || 1);
    }, 0);

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: Number(item.qty) || 1,
    }));

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    const postalCode = customer?.shipping?.postalCode || "";

    const safeEmail =
      typeof customer?.contact?.email === "string" &&
      customer.contact.email.includes("@")
        ? customer.contact.email
        : undefined;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      line_items,

      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,

      billing_address_collection: "required",

      phone_number_collection: {
        enabled: true,
      },

      shipping_address_collection: {
        allowed_countries: ["GB"],
      },

      customer_email: safeEmail,

      metadata: {
        fullName: customer?.contact?.fullName || "",
        phone: customer?.contact?.phone || "",
        email: customer?.contact?.email || "",
        address: customer?.shipping?.address || "",
        cityTown: customer?.shipping?.cityTown || "",
        state: customer?.shipping?.state || "",
        country: customer?.shipping?.country || "",
        postalCode: postalCode,
        totalWeightKg: totalWeightKg.toFixed(2),
      },
    });

    return Response.json({ url: session.url });

  } catch (error) {
    console.error("Checkout Error:", error);
    return Response.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}