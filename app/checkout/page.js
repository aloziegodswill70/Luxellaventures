"use client";

import { useCart } from "@/context/CartContext";
import { useMemo, useState, useEffect } from "react";

/* ---------------- HELPERS ---------------- */

function getItemWeightKg(item) {
  const text = `${item?.unit || ""} ${item?.name || ""}`.toLowerCase();

  const kgMatch = text.match(/(\d+(\.\d+)?)\s*kg/);
  if (kgMatch?.[1]) return Number(kgMatch[1]);

  const gMatch = text.match(/(\d+(\.\d+)?)\s*g/);
  if (gMatch?.[1]) return Number(gMatch[1]) / 1000;

  return 0.5;
}

function formatGBP(amount) {
  return `£${Number(amount || 0).toFixed(2)}`;
}

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const [isHydrated, setIsHydrated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");
  const [isEnglandVerified, setIsEnglandVerified] = useState(false);

  const [contact, setContact] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const [shipping, setShipping] = useState({
    address: "",
    postalCode: "",
    cityTown: "",
    state: "",
    country: "England",
    agree: false,
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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

  /* ===============================
     DELIVERY + ENGLAND VALIDATION
  =============================== */

  useEffect(() => {
    if (!isHydrated) return;

    const fetchDelivery = async () => {
      if (!shipping.postalCode.trim()) {
        setDeliveryFee(0);
        setDeliveryError("");
        setIsEnglandVerified(false);
        return;
      }

      try {
        setDeliveryLoading(true);
        setDeliveryError("");
        setIsEnglandVerified(false);

        const res = await fetch("/api/calculate-delivery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postcode: shipping.postalCode }),
        });

        const data = await res.json();

        if (!res.ok) {
          setDeliveryFee(0);
          setDeliveryError(data.error || "Delivery unavailable");
          setIsEnglandVerified(false);
        } else {
          setDeliveryFee(Number(data.deliveryFee || 0));
          setIsEnglandVerified(true);
        }
      } catch {
        setDeliveryFee(0);
        setDeliveryError("Delivery calculation failed");
        setIsEnglandVerified(false);
      } finally {
        setDeliveryLoading(false);
      }
    };

    fetchDelivery();
  }, [shipping.postalCode, isHydrated]);

  /* ---------------- VALIDATION ---------------- */

  const requiredMissing = useMemo(() => {
    const missing = [];

    if (!contact.fullName.trim()) missing.push("Full Name");
    if (!contact.phone.trim()) missing.push("Phone Number");
    if (!shipping.address.trim()) missing.push("Address");
    if (!shipping.postalCode.trim()) missing.push("Postal Code");
    if (!shipping.cityTown.trim()) missing.push("City/Town");
    if (!shipping.state.trim()) missing.push("State");
    if (!shipping.agree) missing.push("Terms Agreement");

    return missing;
  }, [contact, shipping]);

  const isFormValid =
    requiredMissing.length === 0 && isEnglandVerified;

  /* ---------------- SUMMARY ---------------- */

  const summary = useMemo(() => {
    const lines = cartItems.map((item) => {
      const qty = Number(item.qty || 0);
      const price = Number(item.price || 0);
      const unitWeightKg = getItemWeightKg(item);

      return {
        id: item.id,
        name: item.name,
        qty,
        subTotal: price * qty,
        subWeightKg: unitWeightKg * qty,
      };
    });

    const subtotal = lines.reduce((acc, l) => acc + l.subTotal, 0);
    const totalWeightKg = lines.reduce((acc, l) => acc + l.subWeightKg, 0);
    const total = subtotal + deliveryFee;

    return { lines, subtotal, totalWeightKg, total };
  }, [cartItems, deliveryFee]);

  const handleStripeCheckout = async () => {
    if (!isFormValid) return;

    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          customer: { contact, shipping },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Payment failed");
        setLoading(false);
        return;
      }

      if (data?.url) window.location.href = data.url;
    } catch {
      alert("Something went wrong");
      setLoading(false);
    }
  };

  if (!isHydrated) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8">

      <div className="lg:col-span-2 bg-green-100 border border-green-300 text-green-800 p-4 rounded text-sm font-medium text-center">
        🇬🇧 Delivery Available in England Only
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 w-full">
          Your cart is empty.
        </div>
      ) : (
        <>
          {/* LEFT SIDE (UNCHANGED) */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Contact Information</h2>

            <input type="text" name="fullName" placeholder="Full Name"
              value={contact.fullName} onChange={handleContactChange}
              className="w-full border p-3 rounded" />

            <input type="text" name="phone" placeholder="Phone Number"
              value={contact.phone} onChange={handleContactChange}
              className="w-full border p-3 rounded" />

            <input type="email" name="email" placeholder="Email (optional)"
              value={contact.email} onChange={handleContactChange}
              className="w-full border p-3 rounded" />

            <h2 className="text-xl font-bold pt-6">Shipping Address</h2>

            <input type="text" name="address" placeholder="Street Address"
              value={shipping.address} onChange={handleShippingChange}
              className="w-full border p-3 rounded" />

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shipping.postalCode}
              onChange={handleShippingChange}
              className={`w-full border p-3 rounded ${
                deliveryError ? "border-red-500 bg-red-50" : ""
              }`}
            />

            {deliveryLoading && (
              <p className="text-sm text-gray-500">Checking England delivery...</p>
            )}

            {isEnglandVerified && (
              <p className="text-sm text-green-600">
                ✓ England delivery confirmed
              </p>
            )}

            {deliveryError && (
              <p className="text-sm text-red-500">{deliveryError}</p>
            )}

            <input type="text" name="cityTown" placeholder="City / Town"
              value={shipping.cityTown} onChange={handleShippingChange}
              className="w-full border p-3 rounded" />

            <input type="text" name="state" placeholder="State"
              value={shipping.state} onChange={handleShippingChange}
              className="w-full border p-3 rounded" />

            <div className="bg-gray-100 p-3 rounded text-sm text-gray-700">
              <span className="font-semibold">Delivery Region:</span> England 🇬🇧
            </div>

            <label className="flex items-center gap-2 pt-4">
              <input type="checkbox" name="agree"
                checked={shipping.agree}
                onChange={handleShippingChange} />
              I agree to the Terms & Conditions
            </label>
          </div>

          {/* RIGHT SIDE */}
          <div className="border rounded-lg p-6 space-y-4 h-fit">
            <h2 className="text-xl font-bold">Order Summary</h2>

            {summary.lines.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <span>{item.name} x{item.qty}</span>
                  <div className="text-xs text-gray-500">
                    {item.subWeightKg.toFixed(2)} kg
                  </div>
                </div>
                <span>{formatGBP(item.subTotal)}</span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatGBP(summary.subtotal)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Total Weight</span>
              <span>{summary.totalWeightKg.toFixed(2)} kg</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {deliveryLoading ? "Checking..." : formatGBP(deliveryFee)}
              </span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatGBP(summary.total)}</span>
            </div>

            <button
              onClick={handleStripeCheckout}
              disabled={loading || !isFormValid}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                isFormValid
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Processing..." : "Pay with Stripe"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}