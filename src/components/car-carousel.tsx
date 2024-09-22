import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, CircleGauge, FuelIcon, MapPinIcon } from "lucide-react";

interface Car {
  _id: string;
  brandCar: string;
  modelCar: string;
  price: number;
  location: string;
  km: number;
  yearFabrication: string;
  fuel: string;
  images: { url: string }[];
}

interface CarCarouselProps {
  cars: Car[];
  placeholderImage: string;
}

const CarCarousel: React.FC<CarCarouselProps> = ({
  cars,
  placeholderImage,
}) => {
  return (
    <Carousel className="w-full md:max-w-6xl mx-auto">
      <CarouselContent className="p-4">
        {cars.map((car, index) => (
          <CarouselItem
            key={index}
            className="flex-none w-full md:w-1/2 lg:w-1/3 px-2"
          >
            <div className="p-1">
              <Link href={`/carros/${car._id}`}>
                <Card className="w-full h-[400px]">
                  <CardHeader className="p-0">
                    {car.images && car.images.length > 0 ? (
                      <Image
                        src={car.images[0].url || placeholderImage}
                        alt={car.modelCar || "Imagem indisponível"}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover rounded-t-lg"
                        priority
                      />
                    ) : (
                      <Image
                        src={placeholderImage}
                        alt="Imagem indisponível"
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover rounded-t-lg"
                        priority
                      />
                    )}
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mt-2">
                      {car.brandCar}{" "}
                      <span className="text-green-500">{car.modelCar}</span>
                    </CardTitle>

                    <CardDescription className="font-bold text-gray-500 mt-5">
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(car.price)}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 w-full border-t p-4 gap-2 text-sm justify-between">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-500">{car.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleGauge className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-500">
                        {Intl.NumberFormat("pt-BR").format(car.km)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-500">{car.yearFabrication}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FuelIcon className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-500">{car.fuel}</p>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2" />
      <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2" />
    </Carousel>
  );
};

export default CarCarousel;
