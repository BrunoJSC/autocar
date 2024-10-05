import { client } from "@/lib/sanity";

export const getData = async () => {
  try {
    const query = `*[_type == "motorbike"] {
       _id,
      motorbikeBrand,
      motorbikeModel,
      images[] {
       "url": asset->url
      },
      location,
      yearModificatio,
      fuel,
      km,
      
      color,
      description,
      price,
     
      motors,
      condition,
      announce,
      plate,
      "imageUrl": images[0].asset->url
    }`;

    const data: Motorbike[] = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return [];
  }
};
