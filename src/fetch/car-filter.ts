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
  let query = `*[_type == "car"`;
  const params: any = {};

  // Condições de filtragem
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

  if (exchange) {
    query += ` && exchange match $exchange`;
    params.exchange = exchange;
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

  if (minPrice !== undefined && maxPrice !== undefined) {
    query += ` && price >= $minPrice && price <= $maxPrice`;
    params.minPrice = minPrice;
    params.maxPrice = maxPrice;
  }

  // Filtrando pelo intervalo de anos (YearModification)
  if (startYear !== undefined && endYear !== undefined) {
    query += ` && yearModification >= $startYear && yearModification <= $endYear`;
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

  // Ordenar por YearModification e preço (múltiplos critérios de ordenação)
  query += `] | order(yearModification asc, price asc) {
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
  }`;

  console.log("Query gerada:", query);
  console.log("Parâmetros usados:", params);

  try {
    const cars = await client.fetch(query, params);
    return cars;
  } catch (error) {
    console.error("Erro ao buscar os carros:", error);
    return [];
  }
};
