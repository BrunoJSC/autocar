"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

interface Car {
  _id: string;
  brandCar: string;
  modelCar: string;
  imageUrl: string;
  location: string;
  km: number;
  motors: number;
  price: number;
  yearModification: number;
}

interface CarListProps {
  cars: Car[];
}

export const ListCar: React.FC<CarListProps> = ({ cars }) => {
  const [displayedCars, setDisplayedCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const carsPerPage = 9;

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("model");

  useEffect(() => {
    loadMoreCars();
  }, [searchQuery]);

  const loadMoreCars = () => {
    setIsLoading(true);
    setTimeout(() => {
      const indexOfLastCar = currentPage * carsPerPage;

      const filteredCars = searchQuery
        ? cars.filter((car) =>
            car.modelCar?.toLowerCase().includes(searchQuery)
          )
        : cars;

      const newCars = filteredCars.slice(0, indexOfLastCar);

      setDisplayedCars(newCars);
      setCurrentPage(currentPage + 1);
      setIsLoading(false);
    }, 1000);
  };

  const CarCard: React.FC<{ car: Car }> = ({ car }) => (
    <Link href={`/carros/${car._id}`}>
      <Card className="w-full h-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
        <div className="overflow-hidden rounded-t-lg">
          {car.imageUrl ? (
            <Image
              src={car.imageUrl}
              alt={`${car.brandCar || "Carro"} - ${car.modelCar || ""}`}
              width={400}
              height={250}
              className="w-full h-60 object-cover object-center"
              quality={70}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              unoptimized
            />
          ) : (
            <div className="w-full h-60 bg-gray-200 flex items-center justify-center">
              <span>Imagem indisponível</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex gap-2 items-center mb-2">
            <h3 className="text-sm font-semibold text-primary">
              {car.brandCar || "Marca desconhecida"}
            </h3>
            <p className="text-sm text-black font-semibold">
              <TruncateText
                text={car.modelCar || "Modelo desconhecido"}
                maxLength={16}
              />
            </p>
          </div>
          <div className="text-gray-600 text-sm mb-4">
            <p>{car.location || "Localização não informada"}</p>
            <p>Ano {car.yearModification || "N/A"}</p>
            <p>Motor {car.motors ? car.motors.toFixed(1) : "N/A"}</p>
          </div>
          <p className="text-xl font-bold text-primary">
            {car.price
              ? Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(car.price)
              : "Preço não disponível"}
          </p>
        </div>
      </Card>
    </Link>
  );

  const SkeletonCard = () => (
    <Card className="w-full h-full shadow-md">
      <Skeleton className="w-full h-60" />
      <div className="p-4">
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
        {isLoading &&
          Array(3)
            .fill(0)
            .map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)}
      </div>
      {displayedCars.length < cars.length && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={loadMoreCars}
            disabled={isLoading}
            className="px-6 py-2"
          >
            {isLoading ? "Carregando..." : "Carregar Mais"}
          </Button>
        </div>
      )}
    </div>
  );
};

const TruncateText = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) => {
  const shouldTruncate = text?.length > maxLength;
  const truncated = shouldTruncate ? `${text.slice(0, maxLength)}...` : text;

  return (
    <span className="text-black" title={shouldTruncate ? text : undefined}>
      {truncated}
    </span>
  );
};
