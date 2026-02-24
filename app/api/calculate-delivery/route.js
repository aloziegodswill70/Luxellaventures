// app/api/calculate-delivery/route.js

/* ---------------- STORE LOCATION (SA2 0RB - Swansea) ---------------- */

const STORE_LAT = 51.6208;
const STORE_LNG = -3.9436;

/* ---------------- DELIVERY SETTINGS ---------------- */

const BASE_FEE = 3; // £3 base delivery
const PER_KM_RATE = 1; // £1 per km
const MAX_DISTANCE_KM = 25; // Max delivery radius

/* ---------------- VALIDATION ---------------- */

function isValidUKPostcode(postcode) {
  const regex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
  return regex.test(postcode);
}

/* ---------------- DISTANCE CALCULATION ---------------- */

function calculateDistance(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
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

    const { latitude, longitude } = data.result;

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return Response.json(
        { error: "Invalid postcode coordinates" },
        { status: 400 }
      );
    }

    /* ---------------- DISTANCE CHECK ---------------- */

    const distance = calculateDistance(
      STORE_LAT,
      STORE_LNG,
      latitude,
      longitude
    );

    if (distance > MAX_DISTANCE_KM) {
      return Response.json(
        { error: "Delivery not available in your area" },
        { status: 403 }
      );
    }

    /* ---------------- FEE CALCULATION ---------------- */

    const deliveryFee =
      BASE_FEE + distance * PER_KM_RATE;

    return Response.json({
      distance: Number(distance.toFixed(2)),
      deliveryFee: Number(deliveryFee.toFixed(2)),
    });

  } catch (error) {
    console.error("Delivery calculation error:", error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}