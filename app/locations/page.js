export const metadata = {
  title: "Our Locations",
};

export default function LocationsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-2xl font-bold">Our Locations</h1>

      <p>
        Luxella Ventures currently serves selected locations with plans to
        expand.
      </p>

      <ul className="list-disc pl-5">
        <li>United Kingdom</li>
        <li>Nigeria (Coming Soon)</li>
      </ul>
    </main>
  );
}
