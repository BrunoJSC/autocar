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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getData } from "@/fetch/fetch-car";
import { CalendarIcon, CircleGauge, FuelIcon, MapPinIcon } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import CarDetailsCard from "@/components/car-card-details";

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
  const [cars, setCars] = useState<Car[]>([]);

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

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getData();
        setCars(data as Car[]);
      } catch (error) {
        console.error("Error fetching cars data:", error);
      }
    };
    fetchCars();
  }, []);

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

  const placeholderImage = "/path/to/placeholder.jpg";

  const carImages = useMemo(() => {
    return car && car.images && car.images.length > 0
      ? car.images.map((image, index) => (
          <CarouselItem key={index} className="mx-auto">
            <div>
              <Card className="w-full h-[300px] md:h-[600px] flex justify-center items-center">
                <Image
                  src={
                    urlForImage(image).width(600).height(400).url() ||
                    placeholderImage
                  }
                  alt={car.modelCar || "Imagem indisponível"}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover object-center"
                  quality={100}
                  loading="lazy"
                />
              </Card>
            </div>
          </CarouselItem>
        ))
      : [];
  }, [car]);

  if (!car)
    return (
      <MaxWrapper className="min-h-screen">
        <Skeleton className="w-full h-[300px]" />
      </MaxWrapper>
    );

  return (
    <MaxWrapper>
      <section className="p-8 mt-5">
        <div className="md:h-[600px] flex flex-col md:flex-row gap-4">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>{carImages}</CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2" />
            <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2" />
          </Carousel>

          <Card className="flex-grow md:overflow-y-auto h-[720px] md:h-auto bg-black">
            <CardHeader>
              <CardTitle className="text-primary">
                Entre em contato com nossa equipe!
              </CardTitle>
              <CardDescription className="text-white">
                Veja condições de financiamento.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ContactForm
                onSubmit={onSubmit}
                defaultValues={form.getValues()}
                initialMessage={message}
              />
            </CardContent>
          </Card>
        </div>

        <CarDetailsCard
          car={car}
          key={car._id}
          downPayment={downPayment}
          installments={installments}
          monthlyPayment={monthlyPayment}
          sendSimulator={sendSimulator}
          setDownPayment={setDownPayment}
          setInstallments={setInstallments}
          i18nIsDynamicList
        />
      </section>

      <section className="p-8 mt-5 h-[600px] flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-bold">Outras opções</h2>
        </div>
        {cars && cars.length > 0 ? (
          <Carousel
            className="w-full md:max-w-6xl mx-auto"
            suppressHydrationWarning
          >
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
                            <span className="text-green-500">
                              {car.modelCar}
                            </span>
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
                            <p className="text-gray-500">
                              {car.yearFabrication}
                            </p>
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
        ) : (
          <p>Nenhum carro disponível</p>
        )}
      </section>
    </MaxWrapper>
  );
};

export default Page;
