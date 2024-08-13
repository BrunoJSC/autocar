import { client } from "@/lib/sanity";

interface Vehicle {
  _id: string;
  name: string;
  category: "car" | "motorbike";
}

export const getVehiclesData = async () => {
  try {
    const query = `
      *[_type == "car"] {
        _id,
        "name": modelCar,
        "category": "car"
      } | 
      *[_type == "motorbike"] {
        _id,
        "name": motorbikeModel,
        "category": "motorbike"
      }
    `;

    const data: Vehicle[] = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return [];
  }
};
