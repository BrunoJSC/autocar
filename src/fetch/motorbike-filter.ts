import { client } from "@/lib/sanity";

interface FilterParams {
  motorbikeBrand?: string;
  motorbikeModel?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  km?: number;
  cylinders?: number;
  announce?: string;
  accessories?: string[];
  startYear?: number;
  endYear?: number;
}

export const fetchFilterMotorbike = async ({
  motorbikeBrand,
  motorbikeModel,
  location,
  minPrice,
  maxPrice,
  km,
  cylinders,
  announce,
  accessories,
  startYear,
  endYear,
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

  if (announce) {
    query += ` && announce == $announce`;
    params.announce = announce;
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

  if (cylinders !== undefined) {
    query += ` && cylinders == $cylinders`;
    params.cylinders = cylinders;
  }

  if (km !== undefined) {
    query += ` && km == $km`;
    params.km = km;
  }

  if (accessories) {
    query += ` && accessories match $accessories`;
    params.accessories = accessories;
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
      km,
      cylinders
    }`;
  } else {
    query += ` {
      _id,
      motorbikeBrand,
      motorbikeModel,
      location,
      "imageUrl": images[0].asset->url,
      price,
      km,
      cylinders,
      motors,
      yearFabrication
    }`;
  }

  const motorbikes = await client.fetch(query, params);
  return motorbikes;
};
