import { client } from "@/lib/sanity";

interface MotorbikeFilterParams {
  motorbikeBrand?: string;
  motorbikeModel?: string;
  location?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  bodyType?: string;
  km?: number;
  startYear?: number;
  endYear?: number;
  motors?: number;
  condition?: string;
  announce?: string;
  fuel?: string;
  cylinders?: string;
}

export const fetchFilterMotorbikes = async ({
  motorbikeBrand,
  motorbikeModel,
  location,
  color,
  minPrice,
  maxPrice,
  bodyType,
  km,
  startYear,
  endYear,
  motors,
  condition,
  announce,
  fuel,
  cylinders,
}: MotorbikeFilterParams) => {
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
  if (condition) {
    query += ` && condition == $condition`;
    params.condition = condition;
  }
  if (announce) {
    query += ` && announce == $announce`;
    params.announce = announce;
  }
  if (fuel) {
    query += ` && fuel == $fuel`;
    params.fuel = fuel;
  }
  if (cylinders) {
    query += ` && cylinders == $cylinders`;
    params.exchange = cylinders;
  }

  query += `]`;

  if (minPrice !== undefined && maxPrice !== undefined) {
    query += ` | order(price asc)`;
  } else if (startYear !== undefined && endYear !== undefined) {
    query += ` | order(yearFabrication desc)`;
  }

  query += ` {
    _id,
    motorbikeBrand,
    motorbikeModel,
    images[] {
      "url": asset->url
    },
    location,
    yearFabrication,
    fuel,
    km,
    exchange,
    color,
    description,
    price,
    bodyType,
    motors,
    condition,
    announce,
    plate,
    "imageUrl": images[0].asset->url
  }`;

  try {
    const motorbikes = await client.fetch(query, params);
    return motorbikes;
  } catch (error) {
    console.error("Error fetching motorbikes:", error);
    return [];
  }
};
