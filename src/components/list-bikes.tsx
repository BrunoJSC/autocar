import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Motorbike {
  _id: string;
  motorbikeBrand: string;
  motorbikeModel: string;
  imageUrl: string;
  location: string;
  km: number;
  price: number;
}

interface MotorbikeListProps {
  motorbikes: Motorbike[];
}

export const ListMotorbike: React.FC<MotorbikeListProps> = ({ motorbikes }) => {
  const [displayedMotorbikes, setDisplayedMotorbikes] = useState<Motorbike[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const motorbikesPerPage = 9;

  useEffect(() => {
    loadMoreMotorbikes();
  }, []);

  const loadMoreMotorbikes = () => {
    setIsLoading(true);
    setTimeout(() => {
      const indexOfLastMotorbike = currentPage * motorbikesPerPage;
      const newMotorbikes = motorbikes.slice(0, indexOfLastMotorbike);
      setDisplayedMotorbikes(newMotorbikes);
      setCurrentPage(currentPage + 1);
      setIsLoading(false);
    }, 1000); // Simula um delay de carregamento
  };

  const MotorbikeCard: React.FC<{ motorbike: Motorbike }> = ({ motorbike }) => (
    <Link href={`/motos/${motorbike._id}`}>
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
  );

  const SkeletonCard = () => (
    <Card className="w-full h-full shadow-md">
      <Skeleton className="w-full h-60" />
      <div className="p-4">
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedMotorbikes.map((motorbike) => (
          <MotorbikeCard key={motorbike._id} motorbike={motorbike} />
        ))}
        {isLoading &&
          Array(3)
            .fill(0)
            .map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)}
      </div>
      {displayedMotorbikes.length < motorbikes.length && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={loadMoreMotorbikes}
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
