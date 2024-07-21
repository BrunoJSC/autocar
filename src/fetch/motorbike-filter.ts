import { client } from "@/lib/sanity";

interface FilterParams {
  motorbikeBrand?: string;
  motorbikeModel?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  km?: number;
}

export const fetchFilterMotorbike = async ({
  motorbikeBrand,
  motorbikeModel,
  location,
  minPrice,
  maxPrice,
  km,
}: FilterParams) => {
  let query = `*[_type == "motorbike"`;
  const params: any = {};

  if (motorbikeBrand) {
    query += ` && motorbikeBrand == $motorbikeBrand`;
    params.motorbikeBrand = motorbikeBrand;
  }

  if (motorbikeModel) {
    query += ` && motorbikeModel match $motorbikeModel`;
    params.motorbikeModel = `${motorbikeModel}*`;
  }

  if (location) {
    query += ` && location match $location`;
    params.location = `${location}*`;
  }

  if (minPrice !== undefined) {
    query += ` && price >= $minPrice`;
    params.minPrice = minPrice;
  }

  if (maxPrice !== undefined) {
    query += ` && price <= $maxPrice`;
    params.maxPrice = maxPrice;
  }

  if (km !== undefined) {
    query += ` && km == $km`;
    params.km = km;
  }

  query += `]`;

  if (minPrice !== undefined || maxPrice !== undefined) {
    query += ` | order(price asc) {
      _id,
      motorbikeBrand,
      motorbikeModel,
      location,
      "imageUrl": images[0].asset->url,
      price,
      km
    }`;
  } else {
    query += ` {
      _id,
      motorbikeBrand,
      motorbikeModel,
      location,
      "imageUrl": images[0].asset->url,
      price,
      km
    }`;
  }

  const motorbikes = await client.fetch(query, params);
  return motorbikes;
};
