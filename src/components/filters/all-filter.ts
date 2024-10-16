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

type FiltersMotorbike = {
  motorbikeBrand: string;
  motorbikeModel: string;
  location: string;
  fuel: string;
  cylinders: number;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  color: string;
  announce: string;
  km?: number;
  accessories?: string[];
  startYear?: number;
  endYear?: number;
};