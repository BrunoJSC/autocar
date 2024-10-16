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
  yearModification?: number;
  exchange?: string;
  limit?: number;
  offset?: number;
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
  yearModification,
  exchange,
  limit = 10,
  offset = 0,
}: FilterParams) => {
  // Start of the query string for fetching cars
  let query = `*[_type == "car" && defined(yearModification) && defined(price)`;
  const params: Record<string, any> = {};

  // Helper to add conditionally
  const addCondition = (condition: string, paramName: string, value: any) => {
    query += ` && ${condition}`;
    params[paramName] = value;
  };

  // Check if any filters are applied
  const isAnyFilterApplied =
    brandCar ||
    modelCar ||
    location ||
    color ||
    doors ||
    announce ||
    minPrice !== undefined ||
    maxPrice !== undefined ||
    bodyType ||
    km ||
    accessories?.length ||
    startYear !== undefined ||
    endYear !== undefined ||
    motors ||
    exchange;

  if (isAnyFilterApplied) {
    // Conditionally add filters to the query only if they are present
    if (brandCar) addCondition(`brandCar == $brandCar`, "brandCar", brandCar);
    if (modelCar)
      addCondition(`modelCar match $modelCar`, "modelCar", `${modelCar}*`);
    if (location)
      addCondition(`location match $location`, "location", `${location}*`);
    if (doors) addCondition(`doors == $doors`, "doors", doors);
    if (announce) addCondition(`announce == $announce`, "announce", announce);
    if (color) addCondition(`color == $color`, "color", color);
    if (exchange) addCondition(`exchange == $exchange`, "exchange", exchange);

    // Price and year filters
    if (minPrice !== undefined)
      addCondition(`price >= $minPrice`, "minPrice", minPrice);
    if (maxPrice !== undefined)
      addCondition(`price <= $maxPrice`, "maxPrice", maxPrice);
    if (startYear !== undefined && endYear !== undefined) {
      addCondition(
        `yearModification >= $startYear && yearModification <= $endYear`,
        "startYear",
        startYear
      );
      params.endYear = endYear;
    }
    if (motors) addCondition(`motors == $motors`, "motors", motors);
    if (bodyType) addCondition(`bodyType == $bodyType`, "bodyType", bodyType);
    if (km) addCondition(`km == $km`, "km", km);

    // Accessories filter (joins array into a space-separated string)
    if (accessories && accessories.length > 0) {
      addCondition(
        `accessories[] match $accessories`,
        "accessories",
        accessories.join(" ")
      );
    }

    // Close query filtering
    query += `]`;

    // Determine sorting logic
    if (minPrice !== undefined || maxPrice !== undefined) {
      // If price filter is present, prioritize sorting by price
      query += ` | order(price asc)`;
    } else if (startYear !== undefined || endYear !== undefined) {
      // If year filter is present, prioritize sorting by yearModification
      query += ` | order(yearModification desc)`;
    } else {
      // Default sorting by yearModification and then by price
      query += ` | order(yearModification desc, price asc)`;
    }
  } else {
    // Default query without filters: Fetch all cars ordered by yearModification and price
    query += `] | order(yearModification desc, price asc)`;
  }

  // Pagination
  query += `[${offset}...${offset + limit}]`;

  // Field projection
  query += `{
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
    yearModification, 
    description,
    fuel,
    exchange,
    motors,
    doors,
  }`;

  try {
    // Execute the query with the constructed parameters
    const cars = await client.fetch(query, params);
    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};
