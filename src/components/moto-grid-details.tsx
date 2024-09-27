import { Card, CardContent } from "@/components/ui/card";

interface Motorbike {
  motorbikeBrand: string;
  motorbikeModel: string;
  yearFabrication: number;
  yearModification: number;
  fuel: string;
  km: number;
  color: string;
  cylinders: number;
  fairing: string;
  plate: string;
  date: Date;
}

interface MotoProps {
  moto: Motorbike;
}

const MotoDetailsGrid = ({ moto }: MotoProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Ano</p>
          <p className="text-lg font-semibold text-black mt-1">
            {moto.yearFabrication}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Modelo</p>
          <p className="text-lg font-semibold text-black mt-1">
            {moto.yearModification}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Placa</p>
          <p className="text-lg font-semibold text-black mt-1">
            {moto.plate
              ? moto.plate.slice(0, -1).replace(/./g, "*") +
                moto.plate.slice(-1)
              : "0000"}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">KM</p>
          <p className="text-lg font-semibold text-black mt-1">
            {Intl.NumberFormat("pt-BR").format(moto.km)}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Cor</p>
          <p className="text-lg font-semibold text-black mt-1">{moto.color}</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Marca</p>
          <p className="text-lg font-semibold text-black mt-1">
            {moto.motorbikeBrand}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Cilindrada</p>
          <p className="text-lg font-semibold text-black mt-1">
            {moto.cylinders} cc
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Combustível</p>
          <p className="text-lg font-semibold text-black mt-1">{moto.fuel}</p>
        </CardContent>
      </Card>

      {/* <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500">Tipo de Freio</p>
          <p className="text-lg font-semibold text-black mt-1">
            {moto.brakeType}
          </p>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default MotoDetailsGrid;
