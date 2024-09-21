import { Card, CardContent } from "@/components/ui/card";

const CarDetailsGrid = ({ car }: any) => {
  const details = [
    { label: "Ano", value: car.yearFabrication },
    { label: "Modelo", value: car.yearModification },
    {
      label: "Placa",
      value: car.plate
        ? car.plate.slice(0, -1).replace(/./g, "*") + car.plate.slice(-1)
        : "0000",
    },
    { label: "KM", value: Intl.NumberFormat("pt-BR").format(car.km) },
    { label: "Cor", value: car.color },
    { label: "Marca", value: car.brandCar },
    { label: "Portas", value: car.doors },
    { label: "Combustível", value: car.fuel },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {details.map((detail, index) => (
        <Card
          key={index}
          className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <CardContent className="p-4">
            <p className="text-sm font-medium text-gray-500">{detail.label}</p>
            <p className="text-lg font-semibold text-black mt-1">
              {detail.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CarDetailsGrid;
