export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Successful 🎉</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We’ll contact you shortly.
        </p>
        <a
          href="/"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
