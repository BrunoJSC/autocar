import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MotorbikeListProps {
  motorbikes: Motorbike[];
}

export const ListMotorbike: React.FC<MotorbikeListProps> = ({ motorbikes }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {motorbikes.map((motorbike) => (
        <Link href={`/motos/${motorbike._id}`} key={motorbike._id}>
          <Card className="w-full ">
            <div>
              <Image
                src={motorbike.imageUrl}
                alt={motorbike.motorbikeBrand}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                priority
              />
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-primary">
                    {motorbike.motorbikeBrand}
                  </h3>
                  -
                  <p className="text-black font-bold">
                    {motorbike.motorbikeModel}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500">{motorbike.location}</p>-
                  <p className="text-gray-500">
                    KM {Intl.NumberFormat("pt-BR").format(motorbike.km)}
                  </p>
                </div>
                <p className="text-gray-500">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(motorbike.price)}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
