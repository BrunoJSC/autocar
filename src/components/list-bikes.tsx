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

interface Motorbike {
  _id: string;
  motorbikeBrand: string;
  motorbikeModel: string;
  images: { url: string }[];
  location: string;
  yearFabrication?: number;
  yearModification: number;
  fuel: string;
  km?: number;
  exchange?: string;
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

const useMotorbikeList = (
  initialMotorbikes: Motorbike[],
  searchQuery: string | null
) => {
  const [displayedMotorbikes, setDisplayedMotorbikes] = useState<Motorbike[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const motorbikesPerPage = 9;

  const loadMoreMotorbikes = useCallback(() => {
    setIsLoading(true);
    setError(null);

    try {
      const indexOfLastMotorbike = currentPage * motorbikesPerPage;
      const filteredMotorbikes = searchQuery
        ? initialMotorbikes.filter((motorbike) =>
            motorbike.motorbikeModel
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        : initialMotorbikes;

      const newMotorbikes = filteredMotorbikes.slice(0, indexOfLastMotorbike);
      setDisplayedMotorbikes(newMotorbikes);
      setCurrentPage(currentPage + 1);
    } catch (err) {
      setError("Erro ao carregar as motos. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, initialMotorbikes, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
    setDisplayedMotorbikes([]);
    loadMoreMotorbikes();
  }, [searchQuery]);

  return { displayedMotorbikes, isLoading, error, loadMoreMotorbikes };
};

const MotorbikeCard: React.FC<{ motorbike: Motorbike }> = React.memo(
  ({ motorbike }) => (
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
  )
);

MotorbikeCard.displayName = "MotorbikeCard";

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

export const ListMotorbike: React.FC<MotorbikeListProps> = ({ motorbikes }) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("model");

  const { displayedMotorbikes, isLoading, error, loadMoreMotorbikes } =
    useMotorbikeList(motorbikes, searchQuery);

  const debouncedLoadMore = debounce(loadMoreMotorbikes, 300);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div style={style}>
      <MotorbikeCard motorbike={displayedMotorbikes[index]} />
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
            itemCount={displayedMotorbikes.length}
            itemSize={350}
            width={width}
            onItemsRendered={({ visibleStopIndex }) => {
              if (visibleStopIndex === displayedMotorbikes.length - 1) {
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
      {displayedMotorbikes.length < motorbikes.length && !isLoading && (
        <div className="flex justify-center mt-6">
          <Button onClick={loadMoreMotorbikes} className="px-6 py-2">
            Carregar Mais
          </Button>
        </div>
      )}
    </div>
  );
};
