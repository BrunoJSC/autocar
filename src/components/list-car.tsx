import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CarListProps {
  cars: Car[];
}

export const ListCar: React.FC<CarListProps> = ({ cars }) => {
  console.log(JSON.stringify(cars, null, 2));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <Link href={`/carros/${car._id}`} key={car._id}>
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
                <p className="text-sm text-black font-semibold">
                  {car.modelCar}
                </p>
              </div>
              <div className="text-gray-600 text-sm mb-4">
                <p>{car.location}</p>
                <p>KM {Intl.NumberFormat("pt-BR").format(car.km)}</p>
                <p>Motor: {car.motors}</p>
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
      ))}
    </div>
  );
};
