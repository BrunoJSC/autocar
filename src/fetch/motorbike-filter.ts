import { client } from "@/lib/sanity";

interface FilterParams {
  motorbikeBrand?: string;
  motorbikeModel?: string;
  location?: string;
}

export const fetchFilterMotorbike = async ({
  motorbikeBrand,
  motorbikeModel,
  location,
}: FilterParams) => {
  let query = `*[_type == "motorbike"`;
  const params: any = {};

  if (motorbikeBrand) {
    query += ` && brandCar == $brandCar`;
    params.brandCar = motorbikeBrand;
  }

  if (motorbikeModel) {
    query += ` && modelCar match $modelCar`;
    params.modelCar = `${motorbikeModel}*`;
  }

  if (location) {
    query += ` && location match $location`;
    params.location = `${location}*`;
  }

  query += `] {
    _id,
    motorbikeBrand,
    motorbikeModel,
    location,
    "imageUrl": images[0].asset->url,
    price,
    km
  }`;

  const cars = await client.fetch(query, params);
  return cars;
};
