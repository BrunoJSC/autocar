import { client } from "@/lib/sanity";

export const getData = async () => {
  try {
    const query = `*[_type == "car"] {
       _id,
      brandCar,
      modelCar,
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
      accessories,
      price,
      bodyType,
      motors,
      condition,
      announce,
      doors,
      plate,
      "imageUrl": images[0].asset->url
    }`;

    const data: Car[] = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return [];
  }
};
