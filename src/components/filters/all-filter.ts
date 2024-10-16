type FiltersCar = {
  brandCar: string;
  modelCar: string;
  location: string;
  fuel: string;
  exchange: string;
  doors: number;
  color: string;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  announce: string;
  km?: number;
  bodyType?: string;
  accessories?: string[];
  startYear?: number;
  endYear?: number;
  motors?: number;
  mechanic?: string;
};
