"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MaxWrapper } from "@/components/max-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { client, urlForImage } from "@/lib/sanity";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

interface Car {
  _id: string;
  name: string;
  description: string;
  price: number;
  yearFabrication: number;
  yearModification: number;
  km: number;
  color: string;
  location: string;
  exchange: string;
  brandCar: string;
  modelCar: string;
  bodyType: string;
  fuel: string;
  announce: string;
  document: string;
  doors: number;
  mechanic: string;
  plate: string;
  accessories: string[];
  images: string[];
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  cpf: z
    .string()
    .min(11, { message: "O CPF deve ter pelo menos 11 caracteres" }),
  email: z.string().email({ message: "O email deve ser válido" }),
  phone: z
    .string()
    .min(9, { message: "O telefone deve ter pelo menos 9 caracteres" }),
  message: z
    .string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
});

const PHONE_NUMBER = "5511940723891";
const INTEREST_RATE = 0.025; // 2.5% de juros mensais

const Page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", cpf: "", email: "", phone: "", message: "" },
  });

  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [message, setMessage] = useState("");
  const [downPayment, setDownPayment] = useState("0");
  const [installments, setInstallments] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const fetchCar = useCallback(async () => {
    if (id) {
      const data = await client.fetch(`*[_type == "car" && _id == $id][0]`, {
        id,
      });
      setCar(data);
    }
  }, [id]);

  useEffect(() => {
    fetchCar();
  }, [fetchCar]);

  useEffect(() => {
    if (car) {
      const initialMessage = `Tenho interesse neste veículo ${car.brandCar} - ${car.modelCar} - ${car.yearFabrication}`;
      setMessage(initialMessage);
      form.setValue("message", initialMessage);
    }
  }, [car, form]);

  useEffect(() => {
    if (car) {
      const downPaymentNumber =
        parseFloat(downPayment.replace(/[^\d.-]/g, "")) || 0;
      const financedAmount = car.price - downPaymentNumber;
      const monthlyRate = INTEREST_RATE;
      const n = installments;
      const payment =
        (financedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
      setMonthlyPayment(payment);
    }
  }, [car, downPayment, installments]);

  const onSubmit = useCallback((values: any) => {
    console.log(values);
  }, []);

  const messageWhatsapp = useCallback(() => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }, [message]);

  const sendSimulator = useCallback(() => {
    const downPaymentNumber =
      parseFloat(downPayment.replace(/[^\d.-]/g, "")) || 0;
    const financedAmount = car ? car.price - downPaymentNumber : 0;
    const encodedMessage = encodeURIComponent(
      `Simulação de Financiamento:
      
      Veículo: ${car?.brandCar} - ${car?.modelCar}
      Valor da Entrada: R$ ${downPayment}
      Valor Financiado: R$ ${financedAmount.toFixed(2)}
      Número de Parcelas: ${installments}
      Valor da Parcela: R$ ${monthlyPayment.toFixed(2)}`
    );
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }, [car, downPayment, installments, monthlyPayment]);

  const carImages = useMemo(
    () =>
      car?.images.map((image, index) => (
        <CarouselItem key={index}>
          <div>
            <Card>
              <Image
                src={urlForImage(image).width(600).height(400).url()}
                alt={car.modelCar}
                width={600}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </Card>
          </div>
        </CarouselItem>
      )),
    [car]
  );

  if (!car)
    return (
      <MaxWrapper className="min-h-screen">
        <Skeleton className="w-full h-[300px]" />
      </MaxWrapper>
    );

  return (
    <MaxWrapper>
      <section className="p-8 mt-5">
        <div className="h-[600px] flex flex-col md:flex-row gap-4">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>{carImages}</CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2" />
            <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2" />
          </Carousel>

          <Card className="flex-grow overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-primary">
                Entre em contato com nossa equipe!
              </CardTitle>
              <CardDescription className="text-black">
                Veja condições de financiamento.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input placeholder="CPF" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="Telefone" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Mensagem"
                            {...field}
                            value={message}
                            onChange={(e) => {
                              field.onChange(e);
                              setMessage(e.target.value);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full mt-4">
                    Enviar
                  </Button>
                  <Button
                    type="button"
                    className="w-full mt-4"
                    onClick={messageWhatsapp}
                  >
                    Enviar Whatsapp
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-5 max-w-7xl mx-auto p-2 gap-4 items-center ">
          <div>
            <CardHeader>
              <CardTitle>
                <span className="text-primary">{car.brandCar}</span>{" "}
                {car.modelCar}
              </CardTitle>
              <h3 className="font-bold text-3xl">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(car.price)}
              </h3>
            </CardHeader>

            <CardContent className="mt-4 grid grid-cols-1 md:grid-cols-2 ">
              <div>
                <p className="text-gray-500">Acessórios</p>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
                  {car.accessories.map((accessory) => (
                    <div key={accessory} className="text-black">
                      {accessory}
                    </div>
                  ))}
                </div>

                <CardDescription className="text-gray-500 mt-4 text-sm leading-normal max-w-md">
                  {car.description}
                </CardDescription>
              </div>

              <Card className="mt-5 max-w-5xl h-auto w-full p-2 flex flex-col md:flex-row items-center justify-between gap-8">
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
                      onValueChange={(value) =>
                        setInstallments(parseInt(value))
                      }
                      defaultValue="12"
                    >
                      <SelectTrigger className="bg-background border-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 48 }, (_, i) => i + 1).map(
                          (i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-4">
                    <Button className="w-full" onClick={sendSimulator}>
                      Simular
                    </Button>
                  </div>
                </div>

                <Card className="p-4 max-w-sm bg-black ml-4 w-full md:mr-0">
                  <CardHeader>
                    <CardTitle className="text-primary">
                      O que achou da simulação?
                    </CardTitle>
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
            </CardContent>
          </div>
        </Card>
      </section>
    </MaxWrapper>
  );
};

export default Page;
