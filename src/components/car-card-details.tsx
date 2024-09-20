"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Car {
  yearModification: number;
  brandCar: string;
  modelCar: string;
  location: string;
  yearFabrication: number;
  fuel: string;
  km: number;
  exchange: string;
  color: string;
  description: string;
  accessories: string[];
  price: number;
  bodyType: string;
  motors: string;
  condition: string;
  announce: string;
  doors: number;
  plate: string;
  date: Date;
  isSold: boolean;
}

interface CarDetailsCardProps {
  car: Car;
  downPayment: string;
  setDownPayment: (value: string) => void;
  installments: number;
  setInstallments: (value: number) => void;
  monthlyPayment: number;
  sendSimulator: () => void;
}

const CarDetailsCard: React.FC<CarDetailsCardProps> = ({
  car,
  downPayment,
  setDownPayment,
  installments,
  setInstallments,
  monthlyPayment,
  sendSimulator,
}) => {
  return (
    <Card className="mt-5 w-full md:max-w-7xl mx-auto p-2 gap-4 items-center">
      <div>
        <CardHeader>
          <CardTitle>
            <span className="text-primary">{car.brandCar}</span> {car.modelCar}
          </CardTitle>
          <h3 className="font-bold text-3xl">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(car.price)}
          </h3>

          <div>
            <h2 className="text-gray-500">
              <span className="text-black">Anúncio criado em </span>
              {car.date
                ? format(new Date(car.date), "dd/MM/yyyy", { locale: ptBR })
                : ""}
            </h2>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 grid-cols-1">
            <div className="w-[100px] h-[100px]">
              <p className="text-gray-500">Ano</p>
              <p className="text-black">{car.yearFabrication}</p>
            </div>
            <div>
              <p className="text-gray-500">Modelo</p>
              <p className="text-black">{car.yearModification}</p>
            </div>

            <div>
              <p className="text-gray-500">Placa</p>
              <p className="text-black">
                {car.plate
                  ? car.plate.slice(0, -1).replace(/./g, "*") +
                    car.plate.slice(-1)
                  : "0000"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">KM</p>
              <p className="text-black">
                {Intl.NumberFormat("pt-BR").format(car.km)}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Cor</p>
              <p className="text-black">{car.color}</p>
            </div>

            <div>
              <p className="text-gray-500">Marca</p>
              <p className="text-black">{car.brandCar}</p>
            </div>

            <div>
              <p className="text-gray-500">Portas</p>
              <p className="text-black">{car.doors}</p>
            </div>

            <div>
              <p className="text-gray-500">Combustível</p>
              <p className="text-black">{car.fuel}</p>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <p className="text-gray-500">Acessórios</p>
              <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
                {car.accessories.map((accessory) => (
                  <div key={accessory} className="text-black">
                    {accessory}
                  </div>
                ))}
              </div>

              <CardDescription className="text-gray-500  mt-4 text-sm leading-normal md:max-w-md">
                {car.description}
              </CardDescription>
            </div>

            {/* Financiamento */}
            <Card className="mt-5 max-w-5xl md:h-[420px] h-auto w-full p-2 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <CardHeader>
                  <CardTitle className="text-primary">
                    Simule seu Financiamento
                  </CardTitle>
                  <CardDescription className="text-black">
                    Preencha os campos abaixo para simular.
                  </CardDescription>
                </CardHeader>

                <div className="space-y-2">
                  <Label className="text-black">Valor de entrada</Label>
                  <Input
                    placeholder="R$ 0,00"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                  />
                </div>

                <div className="space-y-2 mt-2">
                  <Label className="text-black">Número de parcelas</Label>
                  <Select
                    onValueChange={(value) => setInstallments(parseInt(value))}
                    defaultValue="12"
                  >
                    <SelectTrigger className="bg-background border-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 48 }, (_, i) => i + 1).map((i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4">
                  <Button className="w-full" onClick={sendSimulator}>
                    Simular
                  </Button>
                </div>
              </div>

              <Card className="p-4 max-w-sm bg-black w-full md:mr-0">
                <CardHeader>
                  <CardTitle className="text-primary">
                    O que achou da simulação?
                  </CardTitle>
                  <CardDescription>
                    Sujeito a análise de crédito*
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-primary-foreground space-y-2">
                    <div className="flex justify-between">
                      <span>Valor do veículo:</span>
                      <span>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(car.price)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entrada:</span>
                      <span>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          parseFloat(downPayment.replace(/[^\d.-]/g, ""))
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valor financiado:</span>
                      <span>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          car.price -
                            parseFloat(downPayment.replace(/[^\d.-]/g, ""))
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Número de parcelas:</span>
                      <span>{installments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valor da parcela:</span>
                      <span>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(monthlyPayment)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Card>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default CarDetailsCard;
