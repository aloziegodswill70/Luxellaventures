import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

function isValidUKPostcode(postcode) {
  const regex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
  return regex.test(postcode);
}

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

    const postalCode =
      customer?.shipping?.postalCode?.trim().toUpperCase();

    if (!postalCode || !isValidUKPostcode(postalCode)) {
      return Response.json(
        { error: "Valid UK postcode required" },
        { status: 400 }
      );
    }

    /* =========================================
       🔒 ENGLAND VALIDATION VIA POSTCODES.IO
    ========================================== */

    const formattedPostcode = postalCode.replace(/\s+/g, "");

    const postcodeRes = await fetch(
      `https://api.postcodes.io/postcodes/${formattedPostcode}`,
      { cache: "no-store" }
    );

    if (!postcodeRes.ok) {
      return Response.json(
        { error: "Postcode lookup failed" },
        { status: 400 }
      );
    }

    const postcodeData = await postcodeRes.json();

    if (
      postcodeData.status !== 200 ||
      !postcodeData.result
    ) {
      return Response.json(
        { error: "Postcode not found" },
        { status: 400 }
      );
    }

    const { country } = postcodeData.result;

    if (country !== "England") {
      return Response.json(
        { error: "We currently deliver within England only." },
        { status: 403 }
      );
    }

    /* =========================================
       STRIPE LINE ITEMS (SAFE FIX HERE)
    ========================================== */

    const line_items = cartItems.map((item) => {
      const text = `${item?.unit || ""} ${item?.name || ""}`.toLowerCase();

      const kgMatch = text.match(/(\d+(\.\d+)?)\s*kg/);
      const gMatch = text.match(/(\d+(\.\d+)?)\s*g/);

      let unitWeight = 0.5; // default weight

      if (kgMatch?.[1]) unitWeight = Number(kgMatch[1]);
      if (gMatch?.[1]) unitWeight = Number(gMatch[1]) / 1000;

      return {
        price_data: {
          currency: "gbp",
          product_data: {
            // ✅ Weight now appears in Stripe Checkout
            name: `${item.name} (${unitWeight}kg each)`,
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: Number(item.qty) || 1,
      };
    });

    /* =========================================
       TOTAL WEIGHT CALCULATION
    ========================================== */

    const totalWeightKg = cartItems.reduce((acc, item) => {
      const text = `${item?.unit || ""} ${item?.name || ""}`.toLowerCase();

      const kgMatch = text.match(/(\d+(\.\d+)?)\s*kg/);
      const gMatch = text.match(/(\d+(\.\d+)?)\s*g/);

      let unitWeight = 0.5;

      if (kgMatch?.[1]) unitWeight = Number(kgMatch[1]);
      if (gMatch?.[1]) unitWeight = Number(gMatch[1]) / 1000;

      return acc + unitWeight * (Number(item?.qty) || 1);
    }, 0);

    /* =========================================
       STRIPE SESSION
    ========================================== */

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

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