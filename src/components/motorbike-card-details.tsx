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
import MotoDetailsGrid from "./moto-grid-details";

interface Motorbike {
  motorbikeBrand: string;
  motorbikeModel: string;
  location: string;
  yearFabrication: number;
  yearModification: number;
  fuel: string;
  km: number;
  exchange: string;
  color: string;
  description: string;
  accessories: string[];
  price: number;
  cylinders: number;
  condition: string;
  announce: string;
  fairing: string;
  plate: string;
  date: Date;
}

interface MotoDetailsCardProps {
  moto: Motorbike;
  downPayment: string;
  setDownPayment: (value: string) => void;
  installments: number;
  setInstallments: (value: number) => void;
  monthlyPayment: number;
  sendSimulator: () => void;
}

const MotoDetailsCard: React.FC<MotoDetailsCardProps> = ({
  moto,
  downPayment,
  setDownPayment,
  installments,
  setInstallments,
  monthlyPayment,
  sendSimulator,
}) => {
  const {
    motorbikeBrand = "Marca Desconhecida",
    motorbikeModel = "Modelo Desconhecido",
    price = 0,
    date = null,
    description = "Nenhuma descrição disponível",
    accessories = [],
  } = moto || {};

  const formattedDate = date
    ? format(new Date(date), "dd/MM/yyyy", { locale: ptBR })
    : "Data indisponível";

  const formattedPrice = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  const formattedDownPayment = parseFloat(
    downPayment.replace(/[^\d.-]/g, "") || "0"
  );

  return (
    <Card className="mt-5 w-full md:max-w-7xl mx-auto p-2 gap-4 items-center">
      <div>
        <CardHeader>
          <CardTitle>
            <span className="text-primary">{motorbikeBrand}</span>{" "}
            {motorbikeModel}
          </CardTitle>
          <h3 className="font-bold text-3xl">{formattedPrice}</h3>

          <div>
            <h2 className="text-gray-500">
              <span className="text-black">Anúncio criado em </span>
              {formattedDate}
            </h2>
          </div>
        </CardHeader>

        <CardContent>
          <MotoDetailsGrid moto={moto as any} /> <Separator className="my-8" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <p className="text-gray-500">Acessórios</p>
              <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
                {accessories.length > 0 ? (
                  accessories.map((accessory) => (
                    <div key={accessory} className="text-black">
                      {accessory}
                    </div>
                  ))
                ) : (
                  <div className="text-black">Nenhum acessório informado</div>
                )}
              </div>

              <CardDescription className="text-gray-500  mt-4 text-sm leading-normal md:max-w-md">
                {description}
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
                      <span>Valor da moto:</span>
                      <span>{formattedPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entrada:</span>
                      <span>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(formattedDownPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valor financiado:</span>
                      <span>
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(price - formattedDownPayment)}
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

export default MotoDetailsCard;
