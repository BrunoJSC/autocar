import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CarListProps {
  cars: Car[];
}

export const ListCar: React.FC<CarListProps> = ({ cars }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
      {cars.map((car) => (
        <Link href={`/carros/${car._id}`} key={car._id}>
          <Card className="w-full ">
            <div>
              <Image
                src={car.imageUrl}
                alt={car.brandCar}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
                priority
              />
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-primary">
                    {car.brandCar}
                  </h3>
                  -<p className="text-black font-bold">{car.modelCar}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500">{car.location}</p>-
                  <p className="text-gray-500">
                    KM {Intl.NumberFormat("pt-BR").format(car.km)}
                  </p>
                </div>
                <p className="text-gray-500">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(car.price)}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
