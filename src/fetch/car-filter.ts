import { client } from "@/lib/sanity";

interface FilterParams {
  brandCar?: string;
  modelCar?: string;
  location?: string;
  color?: string;
  doors?: number;
  announce?: string;
  minPrice?: number;
  maxPrice?: number;
  bodyType?: string;
  km?: number;
  accessories?: string[];
  startYear?: number;
  endYear?: number;
  motors?: number;
}

export const fetchFilterCars = async ({
  brandCar,
  modelCar,
  location,
  color,
  doors,
  minPrice,
  maxPrice,
  announce,
  bodyType,
  km,
  accessories,
  startYear,
  endYear,
  motors,
}: FilterParams) => {
  let query = `*[_type == "car"`;
  const params: any = {};

  if (brandCar) {
    query += ` && brandCar == $brandCar`;
    params.brandCar = brandCar;
  }

  if (modelCar) {
    query += ` && modelCar match $modelCar`;
    params.modelCar = `${modelCar}*`;
  }

  if (location) {
    query += ` && location match $location`;
    params.location = `${location}*`;
  }

  if (doors) {
    query += ` && doors == $doors`;
    params.doors = doors;
  }

  if (announce) {
    query += ` && announce == $announce`;
    params.announce = announce;
  }

  if (color) {
    query += ` && color == $color`;
    params.color = color;
  }

  if (minPrice !== undefined) {
    query += ` && price >= $minPrice`;
    params.minPrice = minPrice;
  }

  if (maxPrice !== undefined) {
    query += ` && price <= $maxPrice`;
    params.maxPrice = maxPrice;
  }

  if (startYear !== undefined && endYear !== undefined) {
    query += ` && yearFabrication >= $startYear && yearFabrication <= $endYear`;
    params.startYear = startYear;
    params.endYear = endYear;
  }

  if (motors) {
    query += ` && motors == $motors`;
    params.motors = motors;
  }

  if (bodyType) {
    query += ` && bodyType == $bodyType`;
    params.bodyType = bodyType;
  }

  if (km) {
    query += ` && km == $km`;
    params.km = km;
  }

  if (accessories) {
    query += ` && accessories match $accessories`;
    params.accessories = accessories;
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    query += `] | order(price asc) {
      _id,
      brandCar,
      modelCar,
      announce,
      location,
      "imageUrl": images[0].asset->url,
      color,
      price,
      km,
      bodyType,
      accessories,
      yearFabrication
    }`;
  } else {
    query += `] {
      _id,
      brandCar,
      modelCar,
      location,
      announce,
      "imageUrl": images[0].asset->url,
      price,
      color,
      km,
      bodyType,
      accessories,
      yearFabrication
    }`;
  }

  const cars = await client.fetch(query, params);
  return cars;
};
