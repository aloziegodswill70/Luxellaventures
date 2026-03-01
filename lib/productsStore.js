// Temporary in-memory store
// Will reset when server restarts (that is OK for now)

let products = [];

export function getProducts() {
  return products;
}

export function addProduct(product) {
  const newProduct = {
    id: crypto.randomUUID(),
    ...product,
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);
  return newProduct;
}