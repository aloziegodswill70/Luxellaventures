"use client";

import { useCart } from "@/context/CartContext";
import CheckoutItem from "@/components/CheckoutItem";
import { useMemo, useState } from "react";

/**
 * Extract weight in KG from:
 * - unit (recommended)
 * - name (fallback)
 *
 * Supports: 10kg, 3.5kg, 1kg, 500g, etc.
 * If nothing found => default 0.5kg
 */
function getItemWeightKg(item) {
  const text = `${item?.unit || ""} ${item?.name || ""}`.toLowerCase();

  // Match kg like: 10kg, 3.5kg, 1 kg
  const kgMatch = text.match(/(\d+(\.\d+)?)\s*kg/);
  if (kgMatch?.[1]) return Number(kgMatch[1]);

  // Match grams like: 500g, 100 g
  const gMatch = text.match(/(\d+(\.\d+)?)\s*g/);
  if (gMatch?.[1]) return Number(gMatch[1]) / 1000;

  // Default (your rule)
  return 0.5;
}

function formatEUR(amount) {
  // Avoid Intl locale mismatch issues: keep formatting simple
  return `€${Number(amount || 0).toFixed(2)}`;
}

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);

  // ✅ FORM 1: Contact Information
  const [contact, setContact] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  // ✅ FORM 2: Shipping Address + Terms
  const [shipping, setShipping] = useState({
    address: "",
    postalCode: "",
    cityTown: "",
    state: "",
    country: "",
    agree: false,
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShipping((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Required checks
  const requiredMissing = useMemo(() => {
    const missing = [];

    if (!String(contact.fullName || "").trim()) missing.push("Full Name");
    if (!String(contact.phone || "").trim()) missing.push("Phone Number");
    // email optional (as you requested)

    if (!String(shipping.address || "").trim()) missing.push("Address");
    if (!String(shipping.postalCode || "").trim()) missing.push("Postal Code");
    if (!String(shipping.cityTown || "").trim()) missing.push("City/Town");
    if (!String(shipping.state || "").trim()) missing.push("State");
    if (!String(shipping.country || "").trim()) missing.push("Country");

    if (!shipping.agree) missing.push("Terms & Conditions Agreement");

    return missing;
  }, [contact, shipping]);

  const isFormValid = requiredMissing.length === 0;

  // ✅ Stripe summary calculations
  const summary = useMemo(() => {
    const lines = cartItems.map((item) => {
      const unitWeightKg = getItemWeightKg(item);
      const subWeightKg = unitWeightKg * (item.qty || 0);
      const subTotal = Number(item.price || 0) * (item.qty || 0);

      return {
        id: item.id,
        name: item.name,
        qty: item.qty || 0,
        unit: item.unit || "",
        unitWeightKg,
        subWeightKg,
        subTotal,
      };
    });

    const totalWeightKg = lines.reduce((acc, l) => acc + l.subWeightKg, 0);
    const subtotal = lines.reduce((acc, l) => acc + l.subTotal, 0);

    // cartTotal should already match subtotal; but we’ll keep cartTotal as source of truth
    const total = Number(cartTotal || subtotal);

    return { lines, subtotal, total, totalWeightKg };
  }, [cartItems, cartTotal]);

  /* ===============================
     STRIPE CHECKOUT
  =============================== */
  const handleStripeCheckout = async () => {
    if (!isFormValid) {
      alert(`Please complete: ${requiredMissing.join(", ")}`);
      return;
    }

    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          customer: {
            contact,
            shipping,
            summary: {
              subtotal: summary.subtotal,
              total: summary.total,
              totalWeightKg: summary.totalWeightKg,
            },
          }, // ✅ sent to Stripe metadata
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Checkout API error:", data);
        alert(data?.error || "Payment initialization failed");
        setLoading(false);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Payment initialization failed");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  /* ===============================
     WHATSAPP FALLBACK
  =============================== */
  const whatsappOrder = () => {
    const itemsText = cartItems
      .map(
        (i) =>
          `${i.name} x${i.qty} = ${formatEUR(
            Number(i.price || 0) * Number(i.qty || 0)
          )}`
      )
      .join("%0A");

    const message = `
New Order%0A
Name: ${contact.fullName}%0A
Phone: ${contact.phone}%0A
Email: ${contact.email || "-"}%0A
Address: ${shipping.address}, ${shipping.cityTown}, ${shipping.state}, ${
      shipping.postalCode
    }, ${shipping.country}%0A
%0AOrder:%0A${itemsText}%0A
%0ASubtotal: ${formatEUR(summary.subtotal)}%0A
Total Weight: ${Number(summary.totalWeightKg).toFixed(2)}kg%0A
%0ATotal: ${formatEUR(summary.total)}
    `;

    window.open(`https://wa.me/234XXXXXXXXXX?text=${message}`, "_blank");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">Your cart is empty.</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8">
      {/* LEFT SIDE: FORMS */}
      <div className="space-y-6">
        {/* FORM 1: CONTACT */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-bold mb-1">Contact Information</h2>
          <p className="text-sm text-gray-500 mb-5">
            Please enter your details so we can reach you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={contact.fullName}
              onChange={handleContactChange}
              className="w-full border rounded-lg px-4 py-3 sm:col-span-2"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={contact.phone}
              onChange={handleContactChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email (optional)"
              value={contact.email}
              onChange={handleContactChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        </div>

        {/* FORM 2: SHIPPING */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-bold mb-1">Shipping Address</h2>
          <p className="text-sm text-gray-500 mb-5">
            Enter the address you want your items delivered to.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="address"
              placeholder="Address *"
              value={shipping.address}
              onChange={handleShippingChange}
              className="w-full border rounded-lg px-4 py-3 sm:col-span-2"
            />

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code *"
              value={shipping.postalCode}
              onChange={handleShippingChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              name="cityTown"
              placeholder="City/Town *"
              value={shipping.cityTown}
              onChange={handleShippingChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              name="state"
              placeholder="State *"
              value={shipping.state}
              onChange={handleShippingChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              name="country"
              placeholder="Country *"
              value={shipping.country}
              onChange={handleShippingChange}
              className="w-full border rounded-lg px-4 py-3 sm:col-span-2"
            />

            <label className="sm:col-span-2 flex items-start gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                name="agree"
                checked={shipping.agree}
                onChange={handleShippingChange}
                className="mt-1"
              />
              <span>
                I agree to the <span className="font-semibold">Terms &amp; Conditions</span>
              </span>
            </label>
          </div>

          {!isFormValid && (
            <p className="mt-4 text-xs text-red-600">
              * Missing: {requiredMissing.join(", ")}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: STRIPE SUMMARY */}
      <div className="bg-gray-50 border rounded-xl p-6 h-fit">
        <h2 className="text-lg font-bold mb-4">Stripe Checkout</h2>

        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} item={item} />
          ))}
        </div>

        {/* ✅ Weight + Subtotal breakdown */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-sm font-semibold">
            <span>Subtotal</span>
            <span>{formatEUR(summary.subtotal)}</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-semibold">
              Weight Breakdown (Sub-weight per item)
            </p>

            <div className="space-y-2">
              {summary.lines.map((l) => (
                <div
                  key={l.id}
                  className="flex items-start justify-between text-xs text-gray-700"
                >
                  <div className="pr-4">
                    <p className="font-medium leading-snug">
                      {l.name} <span className="text-gray-500">x{l.qty}</span>
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Unit weight: {l.unitWeightKg.toFixed(2)}kg{" "}
                      {l.unit ? `• (${l.unit})` : ""}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{l.subWeightKg.toFixed(2)}kg</p>
                    <p className="text-[11px] text-gray-500">{formatEUR(l.subTotal)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-sm font-semibold pt-2">
            <span>Total Weight</span>
            <span>{summary.totalWeightKg.toFixed(2)}kg</span>
          </div>

          <div className="flex justify-between text-lg font-bold pt-2">
            <span>Total</span>
            <span>{formatEUR(summary.total)}</span>
          </div>

          <p className="text-xs text-gray-500">
            You’ll be redirected to Stripe to complete payment securely.
          </p>

          {/* STRIPE PAYMENT */}
          <button
            onClick={handleStripeCheckout}
            disabled={loading || !isFormValid}
            className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-semibold mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Redirecting..." : "Pay with Card (Stripe)"}
          </button>

          {/* WHATSAPP FALLBACK */}
          <button
            onClick={whatsappOrder}
            className="w-full border border-green-500 text-green-600 py-3 rounded-lg font-semibold"
          >
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
