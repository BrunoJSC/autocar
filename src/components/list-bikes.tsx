import React, { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

// Interface unificada para Motorbike
interface Motorbike {
  _id: string;
  motorbikeBrand: string;
  motorbikeModel: string;
  images: { url: string }[];
  location: string;
  yearFabrication?: number; // Opcional, se for possível que não esteja disponível
  yearModification: number;
  fuel: string;
  km?: number;
  exchange?: string; // Para compatibilidade com `cylinders` se necessário
  color?: string;
  description?: string;
  accessories?: string[];
  price: number;
  cylinders?: number;
  condition?: string;
  announce?: string;
  fairing?: string;
  plate?: string;
  imageUrl: string;
  date?: Date;
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
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("model");

  // Atualiza a lista de motos com base na busca e paginação
  useEffect(() => {
    const loadMotorbikes = () => {
      const filteredMotorbikes = searchQuery
        ? motorbikes.filter((motorbike) =>
            motorbike.motorbikeModel
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        : motorbikes;

      // Calcula a nova página e as motos a serem exibidas
      const indexOfLastMotorbike = currentPage * motorbikesPerPage;
      const newMotorbikes = filteredMotorbikes.slice(0, indexOfLastMotorbike);
      setDisplayedMotorbikes(newMotorbikes);
    };

    loadMotorbikes();
  }, [motorbikes, currentPage, searchQuery]);

  // Carrega mais motos ao clicar no botão
  const loadMoreMotorbikes = () => {
    if (!isLoading) {
      setIsLoading(true);
      setCurrentPage((prevPage) => prevPage + 1); // Incrementa a página
      setIsLoading(false);
    }
  };

  const MotorbikeCard: React.FC<{ motorbike: Motorbike }> = ({ motorbike }) => (
    <Link href={`/motos/${motorbike._id}`}>
      <Card className="w-full h-full shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
        <div className="overflow-hidden rounded-t-lg">
          {motorbike.imageUrl ? (
            <Image
              src={motorbike.imageUrl}
              alt={`${motorbike.motorbikeBrand || "Marca desconhecida"} - ${
                motorbike.motorbikeModel || "Modelo desconhecido"
              }`}
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
              <span>moto indisponível</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex gap-2 items-center mb-2">
            <h3 className="text-sm font-semibold text-primary">
              {motorbike.motorbikeBrand || "Marca desconhecida"}
            </h3>
            <p className="text-sm text-black font-semibold">
              {motorbike.motorbikeModel || "Modelo desconhecido"}
            </p>
          </div>
          <div className="text-gray-600 text-sm mb-4">
            <p>{motorbike.location || "Localização não informada"}</p>
            <p>Ano: {motorbike.yearModification || "N/A"}</p>
            <p>
              Cilindradas: {motorbike.cylinders ? motorbike.cylinders : "N/A"}
            </p>
          </div>
          <p className="text-xl font-bold text-primary">
            {motorbike.price
              ? Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(motorbike.price)
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
