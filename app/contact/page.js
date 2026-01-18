export const metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-2xl font-bold">Contact Us</h1>

      <p>
        Have questions or need support? Reach out to us anytime.
      </p>

      <ul className="space-y-2">
        <li>Email: support@luxellaventures.com</li>
        <li>WhatsApp: +44 700 000 0000</li>
      </ul>
    </main>
  );
}
