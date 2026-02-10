"use client";

import { useCart } from "@/context/CartContext";
import CheckoutItem from "@/components/CheckoutItem";
import { useMemo, useState } from "react";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();

  const [loading, setLoading] = useState(false);

  // ✅ Full delivery form
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    deliveryDate: "",
    deliveryTime: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const requiredMissing = useMemo(() => {
    const required = [
      "firstName",
      "lastName",
      "phone",
      "address1",
      "city",
      "postcode",
    ];
    return required.filter((k) => !String(form[k] || "").trim());
  }, [form]);

  const isFormValid = requiredMissing.length === 0;

  /* ===============================
     STRIPE CHECKOUT
  =============================== */
  const handleStripeCheckout = async () => {
    if (!isFormValid) {
      alert(
        `Please fill required fields: ${requiredMissing
          .map((x) => x.replace(/([A-Z])/g, " $1"))
          .join(", ")}`
      );
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
          customer: form, // ✅ sent to Stripe metadata
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
        window.location.href = data.url; // ✅ redirect to Stripe Checkout
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
          `${i.name} x${i.qty} = £${(i.price * i.qty).toFixed(2)}`
      )
      .join("%0A");

    const message = `
New Order%0A
Name: ${form.firstName} ${form.lastName}%0A
Phone: ${form.phone}%0A
Email: ${form.email || "-"}%0A
Address: ${form.address1} ${form.address2 || ""}, ${form.city}, ${form.postcode}%0A
Delivery: ${form.deliveryDate || "-"} ${form.deliveryTime || ""}%0A
Instructions: ${form.instructions || "-"}%0A
%0AOrder:%0A${itemsText}%0A
%0ATotal: £${Number(cartTotal).toFixed(2)}
    `;

    window.open(
      `https://wa.me/234XXXXXXXXXX?text=${message}`,
      "_blank"
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      {/* CUSTOMER FORM */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-bold mb-1">Delivery Information</h2>
        <p className="text-sm text-gray-500 mb-5">
          Please enter accurate details so we can deliver your order.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="text"
            name="address1"
            placeholder="Address Line 1 *"
            value={form.address1}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 sm:col-span-2"
          />
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2 (optional)"
            value={form.address2}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 sm:col-span-2"
          />

          <input
            type="text"
            name="city"
            placeholder="City *"
            value={form.city}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
          <input
            type="text"
            name="postcode"
            placeholder="Postcode *"
            value={form.postcode}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="date"
            name="deliveryDate"
            value={form.deliveryDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
          <select
            name="deliveryTime"
            value={form.deliveryTime}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 bg-white"
          >
            <option value="">Preferred Delivery Time (optional)</option>
            <option value="Morning (9am - 12pm)">Morning (9am - 12pm)</option>
            <option value="Afternoon (12pm - 4pm)">Afternoon (12pm - 4pm)</option>
            <option value="Evening (4pm - 8pm)">Evening (4pm - 8pm)</option>
          </select>

          <textarea
            name="instructions"
            placeholder="Delivery Instructions (Gate code, landmark, call on arrival...)"
            value={form.instructions}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-4 py-3 sm:col-span-2"
          />
        </div>

        {!isFormValid && (
          <p className="mt-4 text-xs text-red-600">
            * Required fields missing:{" "}
            {requiredMissing
              .map((x) => x.replace(/([A-Z])/g, " $1"))
              .join(", ")}
          </p>
        )}
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-gray-50 border rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>

        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} item={item} />
          ))}
        </div>

        <div className="flex justify-between font-semibold text-lg mb-2">
          <span>Total</span>
          <span>£{Number(cartTotal).toFixed(2)}</span>
        </div>

        <p className="text-xs text-gray-500 mb-6">
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
  );
}
