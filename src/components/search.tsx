"use client";

import { useState, useEffect } from "react";
import { Search as SearchComponent } from "lucide-react";
import { Input } from "@/components/ui/input"; // Componente Shadcn
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { fetchFilterCars } from "@/fetch/car-filter";
import { fetchFilterMotorbike } from "@/fetch/motorbike-filter";

interface SearchProps {
  search?: string;
  setSearch?: Dispatch<SetStateAction<string>>;
}

interface Vehicle {
  _id: string;
  brandCar?: string;
  modelCar?: string;
  motorbikeBrand?: string;
  motorbikeModel?: string;
  category: "carros" | "motos"; // Mantendo a distinção clara
}

export function Search() {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (search.length > 2) {
        const data = await getVehiclesData(search);
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    };

    fetchData();
  }, [search]);

  async function getVehiclesData(search: string) {
    const cars = await fetchFilterCars({ modelCar: search });
    const motorbikes = await fetchFilterMotorbike({ motorbikeModel: search });

    return [
      ...cars.map((car: any) => ({ ...car, category: "carros" })),
      ...motorbikes.map((bike: any) => ({ ...bike, category: "motos" })),
    ];
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <form className="w-full relative flex md:flex-row p-4  bg-black md:items-center">
      <div className="relative w-full md:w-full">
        <SearchComponent
          size={25}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
        />
        <Input
          placeholder="Pesquisar modelo"
          className="w-full pl-12 rounded-full py-8"
          value={search}
          onChange={handleSearch}
        />

        {suggestions.length > 0 && (
          <ul className="absolute mt-2 bg-white border border-gray-300 rounded-lg w-full z-10">
            {suggestions.map((vehicle) => (
              <li
                key={vehicle._id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                <Link href={`/${vehicle.category}/${vehicle._id}`}>
                  {vehicle.modelCar ?? vehicle.motorbikeModel}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
