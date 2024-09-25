"use client";

import { useState, useEffect, useCallback } from "react";
import { Search as SearchComponent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { fetchFilterCars } from "@/fetch/car-filter";
import { fetchFilterMotorbike } from "@/fetch/motorbike-filter";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";

interface Vehicle {
  _id: string;
  brandCar?: string;
  modelCar?: string;
  motorbikeBrand?: string;
  motorbikeModel?: string;
  category: "carros" | "motos";
}

export function Search() {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchVehiclesData = useCallback(async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const [cars, motorbikes] = await Promise.all([
        fetchFilterCars({ modelCar: searchTerm }),
        fetchFilterMotorbike({ motorbikeModel: searchTerm }),
      ]);

      const combinedResults = [
        ...cars.map((car: any) => ({ ...car, category: "carros" })),
        ...motorbikes.map((bike: any) => ({ ...bike, category: "motos" })),
      ];

      setSuggestions(combinedResults);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.length > 2) {
        fetchVehiclesData(searchTerm);
      } else {
        setSuggestions([]);
      }
    }, 300),
    [fetchVehiclesData]
  );

  useEffect(() => {
    debouncedFetch(search);

    return () => {
      debouncedFetch.cancel();
    };
  }, [search, debouncedFetch]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <div className="w-full relative flex md:flex-row p-4 bg-black md:items-center">
      <div className="relative w-full md:w-full">
        <SearchComponent
          size={25}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
        />
        <Input
          placeholder="Pesquisar modelo"
          className="w-full pl-12 rounded-full py-5"
          value={search}
          onChange={handleSearch}
        />

        {isLoading && (
          <div className="absolute mt-2 p-2 bg-white border border-gray-300 rounded-lg w-full text-center">
            Carregando...
          </div>
        )}

        {!isLoading && suggestions.length > 0 && (
          <ul className="absolute mt-2 bg-white border border-gray-300 rounded-lg w-full z-10 max-h-60 overflow-y-auto">
            {suggestions.map((vehicle) => (
              <li
                key={vehicle._id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                <Link
                  href={{
                    pathname: `/${vehicle.category}`,
                    query: {
                      model:
                        vehicle.modelCar?.toLowerCase() ||
                        vehicle.motorbikeModel?.toLowerCase() ||
                        "",
                    },
                  }}
                >
                  {vehicle.modelCar ?? vehicle.motorbikeModel}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
