export async function getCategories() {
  const resultAPI = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const result = await resultAPI.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}
