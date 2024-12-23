import { client } from "@/lib/sanity";

interface MotorbikeFilterParams {
  motorbikeBrand?: string;
  motorbikeModel?: string;
  location?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  km?: number;
  startYear?: number;
  endYear?: number;
  announce?: string;
  fuel?: string;
  cylinders?: number;
  kmStart?: number;
  kmEnd?: number;
}

export const fetchFilterMotorbikes = async ({
  motorbikeBrand,
  motorbikeModel,
  location,
  color,
  minPrice,
  maxPrice,
  km,
  startYear,
  endYear,
  announce,
  fuel,
  cylinders,
  kmStart,
  kmEnd,
}: MotorbikeFilterParams) => {
  let query = `*[_type == "motorbike"`;
  const params: any = {};

  if (motorbikeBrand) {
    query += ` && motorbikeBrand == $motorbikeBrand`;
    params.motorbikeBrand = motorbikeBrand;
  }
  if (motorbikeModel) {
    query += ` && motorbikeModel match $motorbikeModel`;
    params.motorbikeModel = motorbikeModel; // Removido o `*` desnecessário
  }
  if (location) {
    query += ` && location match $location`;
    params.location = location; // Removido o `*` desnecessário
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
    query += ` && yearModification >= $startYear && yearModification <= $endYear`;
    params.startYear = startYear;
    params.endYear = endYear;
  }

  if (kmStart !== undefined && kmEnd !== undefined) {
    query += ` && km >= $kmStart && km <= $kmEnd`;
    params.kmStart = kmStart;
    params.kmEnd = kmEnd;
  }

  if (km) {
    query += ` && km == $km`;
    params.km = km;
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
    query += ` && cylinders == $cylinders`; // Corrigido o nome do parâmetro
    params.cylinders = cylinders;
  }

  query += `]`;

  if (minPrice !== undefined && maxPrice !== undefined) {
    query += ` | order(price asc)`;
  } else if (startYear !== undefined && endYear !== undefined) {
    query += ` | order(yearModification asc)`;
  }

  query += ` {
    _id,
    motorbikeBrand,
    motorbikeModel,
    images[] {
      "url": asset->url
    },
    location,
    yearModification,
    fuel,
    km,
    cylinders, 
    color,
    description,
    price,
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
