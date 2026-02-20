const normalize = (str = "") =>
  str.toString().toLowerCase().trim();

export const searchProducts = (products, query) => {
  const q = normalize(query);

  if (!q) return [];

  return products.filter((p) => {
    const name = normalize(p.name);
    const category = normalize(p.category);
    const unit = normalize(p.unit);
    const id = normalize(p.id);

    return (
      name.includes(q) ||
      category.includes(q) ||
      unit.includes(q) ||
      id.includes(q)
    );
  });
};