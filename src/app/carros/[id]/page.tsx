"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MaxWrapper } from "@/components/max-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { client, urlForImage } from "@/lib/sanity";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  FormDescription,
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres",
  }),
  cpf: z.string().min(11, {
    message: "O cpf deve ter pelo menos 11 caracteres",
  }),
  email: z.string().email({ message: "O email deve ser válido" }),
  phone: z.string().min(9, {
    message: "O telefone deve ter pelo menos 9 caracteres",
  }),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres",
  }),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [message, setMessage] = useState("");
  const [downPayment, setDownPayment] = useState<string>("0");
  const [installments, setInstallments] = useState<number>(12);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const PHONE_NUMBER = "5511940723891";
  const INTEREST_RATE = 0.02; // 2% de juros mensais

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        const data = await client.fetch(`*[_type == "car" && _id == $id][0]`, {
          id,
        });
        setCar(data);
      };

      fetchCar();
    }
  }, [id]);

  useEffect(() => {
    if (car) {
      const initialMessage = `Tenho interesse neste veículo ${car.brandCar} - ${car.modelCar}`;
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function messageWhatsapp() {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }

  function sendSimulator() {
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
  }

  if (!car)
    return (
      <MaxWrapper>
        <Skeleton className="w-full h-[300px]" />
      </MaxWrapper>
    );

  return (
    <MaxWrapper>
      <section className="p-8 mt-5">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {car.images.map((image, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card>
                    <Image
                      src={urlForImage(image).width(600).height(400).url()}
                      alt={car.modelCar}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2" />
          <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2" />
        </Carousel>

        <Card className="mt-5 max-w-4xl mx-auto p-2 grid md:grid-cols-2 gap-8">
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
            <CardDescription className="text-gray-500 mt-2 text-sm leading-normal">
              {car.description}
            </CardDescription>

            <CardContent>
              <div className="mt-4 grid gap-5 grid-cols-2 md:grid-cols-3 items-center">
                <div>
                  <p className="text-gray-500">Ano</p>
                  <p>{car.yearFabrication}</p>
                </div>
                <div>
                  <p className="text-gray-500">Combustível</p>
                  <p>{car.fuel}</p>
                </div>
                <div>
                  <p className="text-gray-500">Km</p>
                  <p>{Intl.NumberFormat("pt-BR").format(car.km)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Cambio</p>
                  <p>{car.exchange}</p>
                </div>
                <div>
                  <p className="text-gray-500">Portas</p>
                  <p>{car.doors}</p>
                </div>
                <div>
                  <p className="text-gray-500">Cor</p>
                  <p>{car.color}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-500">Acessórios</p>
                <div className="mt-4 grid gap-5 grid-cols-2 md:grid-cols-2 items-center">
                  {car.accessories.map((accessory) => (
                    <div key={accessory}>
                      <p className="text-black">{accessory}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </div>

          <Card className="p-4 max-w-sm bg-black ml-4 md:h-[780px] h-auto">
            <CardHeader>
              <CardTitle className="text-primary">
                Entre em contato com nossa equipe!
              </CardTitle>
              <CardDescription className="text-primary-foreground">
                Veja condições de financiamento.
              </CardDescription>
            </CardHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">
                        CPF
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu CPF" {...field} />
                      </FormControl>
                      <FormDescription>
                        Uso somente para fins de identificação
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">
                        Telefone
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu telefone" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">
                        Mensagem
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="message"
                          rows={4}
                          placeholder="Escreva uma mensagem..."
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

                <Button type="submit" className="w-full">
                  Enviar
                </Button>
              </form>

              <Button
                variant="secondary"
                className="w-full mt-2"
                onClick={messageWhatsapp}
              >
                Enviar via WhatsApp
              </Button>
            </Form>
          </Card>
        </Card>

        <Card className="mt-5 max-w-4xl mx-auto p-2 grid md:grid-cols-2 gap-8">
          <CardHeader>
            <CardTitle>Simule seu financiamento agora</CardTitle>
            <CardDescription>
              Faça um teste e veja condições de financiamento
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <div>
                <Label>Valor de entrada</Label>
                <Input
                  type="text"
                  placeholder="R$ 0,00"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                />
              </div>
              <div>
                <Label>Valor da parcela</Label>
                <Input
                  type="text"
                  placeholder="R$ 0,00"
                  value={monthlyPayment.toFixed(2)}
                  readOnly
                />
              </div>

              <div>
                <Label>Número de parcelamento</Label>
                <Select
                  onValueChange={(value) => setInstallments(Number(value))}
                  defaultValue="12"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12X</SelectItem>
                    <SelectItem value="24">24X</SelectItem>
                    <SelectItem value="36">36X</SelectItem>
                    <SelectItem value="48">48X</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="secondary"
                className="w-full mt-2"
                onClick={sendSimulator}
              >
                Enviar Simulação via WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </MaxWrapper>
  );
}
