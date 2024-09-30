export const minPrice = Array.from({ length: 181 }, (_, index) => {
  const value = index * 5000;
  return { id: index + 1, title: `R$ ${value.toLocaleString()}`, value };
});

export const maxPrice = Array.from({ length: 181 }, (_, index) => {
  const value = index * 5000;
  return { id: index + 1, title: `R$ ${value.toLocaleString()}`, value };
});
