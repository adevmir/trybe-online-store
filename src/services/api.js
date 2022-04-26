export async function getCategories() {
  const resultAPI = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const result = await resultAPI.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId = '', query = '') {
  const resultAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const result = await resultAPI.json();
  return result;
}
