"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));

    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, price }),
    });

    const data = await res.json();

    if (data.product) {
      setProducts((prev) => [...prev, data.product]);
      setTitle("");
      setDescription("");
      setPrice("");
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* PRODUCT SECTION */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <form onSubmit={handleCreateProduct} className="space-y-3 max-w-md">
          <input
            className="border p-2 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border p-2 w-full"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="border p-2 w-full"
            placeholder="Price (£)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            className="bg-black text-white px-4 py-2 rounded"
            type="submit"
          >
            Create Product
          </button>
        </form>
      </div>

      {/* PRODUCT LIST */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Products</h2>

        {products.length === 0 && <p>No products yet.</p>}

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <p><strong>{product.title}</strong></p>
              <p>{product.description}</p>
              <p>£{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ORDERS SECTION */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        {orders.length === 0 && <p>No orders yet.</p>}

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow">
              <p><strong>Name:</strong> {order.metadata?.fullName}</p>
              <p><strong>Email:</strong> {order.metadata?.email}</p>
              <p><strong>Amount:</strong> £{order.amount_total / 100}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}