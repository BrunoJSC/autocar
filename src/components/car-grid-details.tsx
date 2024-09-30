import { Card, CardContent } from "@/components/ui/card";

type Car = {
  yearFabrication: number;
  yearModification: number;
  plate: string;
  km: number;
  brandCar: string;
  color: string;
  doors: number;
  fuel: string;
  exchange: string;
  motors: string;
};

interface CarProps {
  car: Car;
}

const CarDetailsGrid = ({ car }: CarProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Ano</p>
          <p className="text-lg font-semibold text-black mt-1">
            {car.yearFabrication}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Modelo</p>
          <p className="text-lg font-semibold text-black mt-1">
            {car.yearModification}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Placa</p>
          <p className="text-lg font-semibold text-black mt-1">
            {car.plate
              ? car.plate.slice(0, -1).replace(/./g, "*") + car.plate.slice(-1)
              : "0000"}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">KM</p>
          <p className="text-lg font-semibold text-black mt-1">
            {Intl.NumberFormat("pt-BR").format(car.km)}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Cor</p>
          <p className="text-lg font-semibold text-black mt-1">{car.color}</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Marca</p>
          <p className="text-lg font-semibold text-black mt-1">
            {car.brandCar}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Portas</p>
          <p className="text-lg font-semibold text-black mt-1">{car.doors}</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Combustível</p>
          <p className="text-lg font-semibold text-black mt-1">{car.fuel}</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Cambio</p>
          <p className="text-lg font-semibold text-black mt-1">
            {car.exchange}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Motor</p>
          <p className="text-lg font-semibold text-black mt-1">{car.motors}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarDetailsGrid;
