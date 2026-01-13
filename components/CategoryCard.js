export default function CategoryCard({ title }) {
  return (
    <div className="border rounded-xl p-6 text-center hover:shadow-md transition">
      <h3 className="font-semibold text-primary">{title}</h3>
    </div>
  );
}
