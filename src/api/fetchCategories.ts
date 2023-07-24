export const fetchCategories = async () => {
  const response = await fetch('https://6389fa094eccb986e89fec00.mockapi.io/categories');
  const categories: string[] = await response.json();
  return categories;
};
