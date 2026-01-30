"use client";

import { useCart } from "@/context/CartContext";
import CheckoutItem from "@/components/CheckoutItem";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const whatsappOrder = () => {
    const itemsText = cartItems
      .map(
        (i) =>
          `${i.name} x${i.qty} = ₦${(
            i.price * i.qty
          ).toLocaleString()}`
      )
      .join("%0A");

    const message = `
New Order%0A
Name: ${form.name}%0A
Phone: ${form.phone}%0A
Address: ${form.address}%0A
%0AOrder:%0A${itemsText}%0A
%0ATotal: ₦${cartTotal.toLocaleString()}
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
        <h2 className="text-lg font-bold mb-4">
          Delivery Information
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <textarea
            name="note"
            placeholder="Order Note (Optional)"
            value={form.note}
            onChange={handleChange}
            rows={2}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-gray-50 border rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">
          Order Summary
        </h2>

        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} item={item} />
          ))}
        </div>

        <div className="flex justify-between font-semibold text-lg mb-6">
          <span>Total</span>
          <span>₦{cartTotal.toLocaleString()}</span>
        </div>

        {/* PAYSTACK PLACEHOLDER */}
        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold mb-3"
        >
          Pay Now
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
