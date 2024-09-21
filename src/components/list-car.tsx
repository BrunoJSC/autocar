import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Car {
  _id: string;
  brandCar: string;
  modelCar: string;
  imageUrl: string;
  location: string;
  km: number;
  motors: number;
  price: number;
}

interface CarListProps {
  cars: Car[];
}

export const ListCar: React.FC<CarListProps> = ({ cars }) => {
  const [displayedCars, setDisplayedCars] = useState<Car[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const carsPerPage = 9;

  useEffect(() => {
    loadMoreCars();
  }, []);

  const loadMoreCars = () => {
    setIsLoading(true);
    setTimeout(() => {
      const indexOfLastCar = currentPage * carsPerPage;
      const newCars = cars.slice(0, indexOfLastCar);
      setDisplayedCars(newCars);
      setCurrentPage(currentPage + 1);
      setIsLoading(false);
    }, 1000);
  };

  const CarCard: React.FC<{ car: Car }> = ({ car }) => (
    <Link href={`/carros/${car._id}`}>
      <Card className="w-full h-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
        <div className="overflow-hidden rounded-t-lg">
          <Image
            src={car.imageUrl}
            alt={`${car.brandCar} - ${car.modelCar}`}
            width={400}
            height={250}
            className="w-full h-60 object-cover object-center"
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="flex gap-2 items-center mb-2">
            <h3 className="text-sm font-semibold text-primary">
              {car.brandCar}
            </h3>
            <p className="text-sm text-black font-semibold">{car.modelCar}</p>
          </div>
          <div className="text-gray-600 text-sm mb-4">
            <p>{car.location}</p>
            <p>KM {Intl.NumberFormat("pt-BR").format(car.km)}</p>
            <p>Motor: {car.motors ? car.motors.toFixed(1) : "N/A"}</p>
          </div>
          <p className="text-xl font-bold text-primary">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(car.price)}
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
