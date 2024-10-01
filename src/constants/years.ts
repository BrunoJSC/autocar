const currentYear = new Date().getFullYear();

export const years = Array.from({ length: currentYear - 1990 + 1 }, (v, i) => {
  const year = 1990 + i;
  return { id: i + 1, title: year.toString(), value: year };
});
