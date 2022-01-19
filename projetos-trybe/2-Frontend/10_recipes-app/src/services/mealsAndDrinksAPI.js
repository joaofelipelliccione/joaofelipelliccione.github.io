const mealsAndDrinksAPI = async (END_POINT) => {
  const response = await fetch(END_POINT);
  const jsonFormat = await response.json();
  return jsonFormat;
};

export const getCategoriesAPI = async (END_POINT) => {
  const resp = await fetch(END_POINT);
  const jsonFormat = await resp.json();
  return jsonFormat;
};

export default mealsAndDrinksAPI;
