"use client";

import { useCart } from "@/context/CartContext";
import CheckoutItem from "@/components/CheckoutItem";
import { useMemo, useState } from "react";

function getItemWeightKg(item) {
  const text = `${item?.unit || ""} ${item?.name || ""}`.toLowerCase();
  const kgMatch = text.match(/(\d+(\.\d+)?)\s*kg/);
  if (kgMatch?.[1]) return Number(kgMatch[1]);
  const gMatch = text.match(/(\d+(\.\d+)?)\s*g/);
  if (gMatch?.[1]) return Number(gMatch[1]) / 1000;
  return 0.5;
}

function formatEUR(amount) {
  return `€${Number(amount || 0).toFixed(2)}`;
}

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);

  const [contact, setContact] = useState({ fullName: "", phone: "", email: "" });
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
    setShipping((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const requiredMissing = useMemo(() => {
    const missing = [];
    if (!String(contact.fullName || "").trim()) missing.push("Full Name");
    if (!String(contact.phone || "").trim()) missing.push("Phone Number");
    if (!String(shipping.address || "").trim()) missing.push("Address");
    if (!String(shipping.postalCode || "").trim()) missing.push("Postal Code");
    if (!String(shipping.cityTown || "").trim()) missing.push("City/Town");
    if (!String(shipping.state || "").trim()) missing.push("State");
    if (!String(shipping.country || "").trim()) missing.push("Country");
    if (!shipping.agree) missing.push("Terms & Conditions Agreement");
    return missing;
  }, [contact, shipping]);

  const isFormValid = requiredMissing.length === 0;

  // ------------------- Stripe summary + delivery fee -------------------
  const summary = useMemo(() => {
    const lines = cartItems.map((item) => {
      const unitWeightKg = getItemWeightKg(item);
      const subWeightKg = unitWeightKg * (item.qty || 0);
      const subTotal = Number(item.price || 0) * (item.qty || 0);
      return { id: item.id, name: item.name, qty: item.qty || 0, unit: item.unit || "", unitWeightKg, subWeightKg, subTotal };
    });

    const totalWeightKg = lines.reduce((acc, l) => acc + l.subWeightKg, 0);
    const subtotal = lines.reduce((acc, l) => acc + l.subTotal, 0);

    // Delivery fee logic: only London addresses get extra fee
    const deliveryFee =
      shipping.cityTown?.toLowerCase().includes("london") && subtotal > 0
        ? 5.0 // e.g., €5 delivery
        : 0;

    const total = Number(cartTotal || subtotal) + deliveryFee;

    return { lines, subtotal, total, totalWeightKg, deliveryFee };
  }, [cartItems, cartTotal, shipping.cityTown]);

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
          customer: { contact, shipping, summary },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Checkout API error:", data);
        alert(data?.error || "Payment initialization failed");
        setLoading(false);
        return;
      }
      if (data?.url) window.location.href = data.url;
      else {
        alert("Payment initialization failed");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  const whatsappOrder = () => {
    const itemsText = cartItems
      .map((i) => `${i.name} x${i.qty} = ${formatEUR(Number(i.price || 0) * Number(i.qty || 0))}`)
      .join("%0A");

    const message = `New Order%0A
Name: ${contact.fullName}%0A
Phone: ${contact.phone}%0A
Email: ${contact.email || "-"}%0A
Address: ${shipping.address}, ${shipping.cityTown}, ${shipping.state}, ${shipping.postalCode}, ${shipping.country}%0A
%0AOrder:%0A${itemsText}%0A
%0ASubtotal: ${formatEUR(summary.subtotal)}%0A
Delivery Fee: ${formatEUR(summary.deliveryFee)}%0A
Total Weight: ${Number(summary.totalWeightKg).toFixed(2)}kg%0A
%0ATotal: ${formatEUR(summary.total)}`;

    window.open(`https://wa.me/447344447897?text=${message}`, "_blank");
  };

  if (cartItems.length === 0) return <div className="text-center py-20 text-gray-500">Your cart is empty.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8">
      {/* LEFT: Forms */}
      <div className="space-y-6">
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-bold mb-1">Delivery Notice</h2>
          <p className="text-sm text-gray-500 mb-2">
            Deliveries are <span className="font-semibold">only done in London</span>. Please take care of your delivery logistics outside London.
          </p>
          {summary.deliveryFee > 0 && (
            <p className="text-sm text-orange-600 font-semibold">
              Extra delivery price for London addresses: {formatEUR(summary.deliveryFee)}
            </p>
          )}
        </div>

        {/* Contact + Shipping forms remain unchanged */}
        {/* ... existing code for contact and shipping forms ... */}
      </div>

      {/* RIGHT: Stripe summary */}
      <div className="bg-gray-50 border rounded-xl p-6 h-fit">
        <h2 className="text-lg font-bold mb-4">Stripe Checkout</h2>

        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} item={item} />
          ))}
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-sm font-semibold">
            <span>Subtotal</span>
            <span>{formatEUR(summary.subtotal)}</span>
          </div>
          {summary.deliveryFee > 0 && (
            <div className="flex justify-between text-sm font-semibold">
              <span>Delivery Fee (London)</span>
              <span>{formatEUR(summary.deliveryFee)}</span>
            </div>
          )}

          <div className="flex justify-between text-lg font-bold pt-2">
            <span>Total</span>
            <span>{formatEUR(summary.total)}</span>
          </div>

          <p className="text-xs text-gray-500">
            You’ll be redirected to Stripe to complete payment securely.
          </p>

          <button
            onClick={handleStripeCheckout}
            disabled={loading || !isFormValid}
            className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg font-semibold mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Redirecting..." : "Pay with Card (Stripe)"}
          </button>

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