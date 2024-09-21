import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MotorbikeListProps {
  motorbikes: Motorbike[];
}

export const ListMotorbike: React.FC<MotorbikeListProps> = ({ motorbikes }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {motorbikes.map((motorbike) => (
        <Link href={`/motos/${motorbike._id}`} key={motorbike._id}>
          <Card className="w-full h-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="overflow-hidden rounded-t-lg">
              <Image
                src={motorbike.imageUrl}
                alt={`${motorbike.motorbikeBrand} - ${motorbike.motorbikeModel}`}
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
                  {motorbike.motorbikeBrand}
                </h3>
                <p className="text-sm text-black font-semibold">
                  {motorbike.motorbikeModel}
                </p>
              </div>
              <div className="text-gray-600 text-sm mb-4">
                <p>{motorbike.location}</p>
                <p>KM {Intl.NumberFormat("pt-BR").format(motorbike.km)}</p>
              </div>
              <p className="text-xl font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(motorbike.price)}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
