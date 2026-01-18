export const metadata = {
  title: "FAQ",
};

export default function FAQPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>

      <div>
        <h3 className="font-semibold">Do you deliver?</h3>
        <p>Yes, we offer delivery depending on your location.</p>
      </div>

      <div>
        <h3 className="font-semibold">How do I place an order?</h3>
        <p>You can add items to cart and checkout via WhatsApp.</p>
      </div>

      <div>
        <h3 className="font-semibold">Are your products frozen?</h3>
        <p>Yes, frozen items are handled with proper storage.</p>
      </div>
    </main>
  );
}
