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
      km
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
      km
    }`;
  }

  const cars = await client.fetch(query, params);
  return cars;
};
