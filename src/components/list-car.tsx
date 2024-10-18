"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import debounce from "lodash/debounce";

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

const useCarList = (initialCars: Car[], searchQuery: string | null) => {
  const [displayedCars, setDisplayedCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const carsPerPage = 9;

  const loadMoreCars = useCallback(() => {
    setIsLoading(true);
    setError(null);

    try {
      const indexOfLastCar = currentPage * carsPerPage;
      const filteredCars = searchQuery
        ? initialCars.filter((car) =>
            car.modelCar?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : initialCars;

      const newCars = filteredCars.slice(0, indexOfLastCar);
      setDisplayedCars(newCars);
      setCurrentPage(currentPage + 1);
    } catch (err) {
      setError("Erro ao carregar os carros. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, initialCars, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
    setDisplayedCars([]);
    loadMoreCars();
  }, [searchQuery]);

  return { displayedCars, isLoading, error, loadMoreCars };
};

const CarCard: React.FC<{ car: Car }> = React.memo(({ car }) => (
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
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
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
            {car.modelCar || "Modelo desconhecido"}
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
));

CarCard.displayName = "CarCard";

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

export const ListCar: React.FC<CarListProps> = ({ cars }) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("model");

  const { displayedCars, isLoading, error, loadMoreCars } = useCarList(
    cars,
    searchQuery
  );

  const debouncedLoadMore = debounce(loadMoreCars, 300);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div style={style}>
      <CarCard car={displayedCars[index]} />
    </div>
  );

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={displayedCars.length}
            itemSize={350}
            width={width}
            onItemsRendered={({ visibleStopIndex }) => {
              if (visibleStopIndex === displayedCars.length - 1) {
                debouncedLoadMore();
              }
            }}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
      {isLoading &&
        Array(3)
          .fill(0)
          .map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)}
      {displayedCars.length < cars.length && !isLoading && (
        <div className="flex justify-center mt-6">
          <Button onClick={loadMoreCars} className="px-6 py-2">
            Carregar Mais
          </Button>
        </div>
      )}
    </div>
  );
};
