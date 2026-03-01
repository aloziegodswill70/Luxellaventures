// app/api/calculate-delivery/route.js

/* =========================================
   🇬🇧 ENGLAND NATIONWIDE DELIVERY SYSTEM
========================================= */

/* ---------------- DELIVERY SETTINGS ---------------- */

const FLAT_DELIVERY_FEE = 4.99; // Nationwide England delivery fee

/* ---------------- VALIDATION ---------------- */

function isValidUKPostcode(postcode) {
  const regex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
  return regex.test(postcode);
}

/* ---------------- API HANDLER ---------------- */

export async function POST(req) {
  try {
    const body = await req.json();
    const { postcode } = body;

    if (!postcode || typeof postcode !== "string") {
      return Response.json(
        { error: "Postcode is required" },
        { status: 400 }
      );
    }

    const cleanPostcode = postcode.trim().toUpperCase();

    if (!isValidUKPostcode(cleanPostcode)) {
      return Response.json(
        { error: "Invalid UK postcode format" },
        { status: 400 }
      );
    }

    /* ---------------- POSTCODES.IO LOOKUP ---------------- */

    const formattedPostcode = cleanPostcode.replace(/\s+/g, "");

    const res = await fetch(
      `https://api.postcodes.io/postcodes/${formattedPostcode}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return Response.json(
        { error: "Postcode lookup failed" },
        { status: 400 }
      );
    }

    const data = await res.json();

    if (data.status !== 200 || !data.result) {
      return Response.json(
        { error: "Postcode not found" },
        { status: 400 }
      );
    }

    const { country } = data.result;

    /* ===============================
       🔒 ENGLAND-ONLY RESTRICTION
    =============================== */

    if (country !== "England") {
      return Response.json(
        { error: "We currently deliver within England only." },
        { status: 403 }
      );
    }

    /* ---------------- SUCCESS ---------------- */

    return Response.json({
      deliveryFee: FLAT_DELIVERY_FEE,
    });

  } catch (error) {
    console.error("Delivery calculation error:", error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}