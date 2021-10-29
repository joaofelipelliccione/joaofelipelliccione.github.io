export async function getCategories() { // Pega a lista de categorias oferecidas pelo MELI.
  const END_POINT_CATEGORIES = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(END_POINT_CATEGORIES);
  const data = await response.json();

  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) { // Realiza a busca por produtos, cruzando categoria e termo pesquisado.
  const END_POINT_ITEM = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(END_POINT_ITEM);
  const data = await response.json();

  return data;
}
