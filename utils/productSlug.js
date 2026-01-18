export function productSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}
