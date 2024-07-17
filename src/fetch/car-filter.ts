import { client } from "@/lib/sanity";

interface FilterParams {
  brandCar?: string;
  modelCar?: string;
  location?: string;
}

export const fetchFilterCars = async ({
  brandCar,
  modelCar,
  location,
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

  query += `] {
    _id,
    brandCar,
    modelCar,
    location,
    "imageUrl": images[0].asset->url,
    price,
    km
  }`;

  const cars = await client.fetch(query, params);
  return cars;
};
