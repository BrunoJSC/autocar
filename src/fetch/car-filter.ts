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
  exchange?: string;
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
  exchange,
}: FilterParams) => {
  let query = `*[_type == "car" 
    ${brandCar ? `&& brandCar == $brandCar` : ""}
    ${modelCar ? `&& modelCar match $modelCar` : ""}
    ${location ? `&& location match $location` : ""}
    ${color ? `&& color == $color` : ""}
    ${doors ? `&& doors == $doors` : ""}
    ${announce ? `&& announce == $announce` : ""}
    ${minPrice !== undefined ? `&& price >= $minPrice` : ""}
    ${maxPrice !== undefined ? `&& price <= $maxPrice` : ""}
    ${startYear !== undefined ? `&& yearModification >= $startYear` : ""}
    ${endYear !== undefined ? `&& yearModification <= $endYear` : ""}
    ${motors ? `&& motors == $motors` : ""}
    ${bodyType ? `&& bodyType == $bodyType` : ""}
    ${km ? `&& km == $km` : ""}
    ${
      accessories && accessories.length > 0
        ? accessories
            .map(
              (acc, index) => `&& accessories[$index] match $accessory${index}`,
            )
            .join(" ")
        : ""
    }
  ]`;

  // Adicionando a ordenação separada para preço e ano
  query += `{
    _id,
    brandCar,
    modelCar,
    announce,
    location,
    "imageUrl": images[1].asset->url,
    color,
    price,
    km,
    bodyType,
    accessories,
    yearModification,
    motors,
    exchange
  } | order(yearModification asc, price asc)`; // Ordenação correta

  const params: any = {};

  // Passando os parâmetros se eles estiverem definidos
  if (brandCar) params.brandCar = brandCar;
  if (modelCar) params.modelCar = `${modelCar}*`;
  if (location) params.location = `${location}*`;
  if (color) params.color = color;
  if (doors) params.doors = doors;
  if (announce) params.announce = announce;
  if (minPrice !== undefined) params.minPrice = minPrice;
  if (maxPrice !== undefined) params.maxPrice = maxPrice;
  if (startYear !== undefined) params.startYear = startYear;
  if (endYear !== undefined) params.endYear = endYear;
  if (motors) params.motors = motors;
  if (bodyType) params.bodyType = bodyType;
  if (km) params.km = km;

  // Passando os acessórios como parâmetros individuais
  if (accessories && accessories.length > 0) {
    accessories.forEach((accessory, index) => {
      params[`accessory${index}`] = accessory;
    });
  }

  console.log("Generated query:", query);
  console.log("Query parameters:", params);

  try {
    const cars = await client.fetch(query, params);
    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};
