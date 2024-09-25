"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import dynamic from "next/dynamic";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import CarDetailsCard from "@/components/car-card-details";
import { urlForImage } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
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

const DynamicCarCarousel = dynamic(() => import("@/components/car-carousel"), {
  ssr: false,
  loading: () => <p>Carregando...</p>,
});

interface CarDetailsClientProps {
  car: Car;
  cars: Car[];
  placeholderImage: string;
}

const CarDetailsClient: React.FC<CarDetailsClientProps> = ({
  car,
  cars,
  placeholderImage,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", cpf: "", email: "", phone: "", message: "" },
  });

  const [message, setMessage] = useState("");
  const [downPayment, setDownPayment] = useState("0");
  const [installments, setInstallments] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

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
      Valor da Parcela: R$ ${monthlyPayment.toFixed(2)}`,
    );
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }, [car, downPayment, installments, monthlyPayment]);

  const carImages = useMemo(() => {
    return car && car.images && car.images.length > 0
      ? car.images.map((image, index) => (
          <CarouselItem key={index} className="mx-auto">
            <div>
              <Card className="w-full h-[300px] md:h-[600px] flex justify-center items-center">
                <Button></Button>
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
                  loading="eager"
                />
              </Card>
            </div>
          </CarouselItem>
        ))
      : [];
  }, [car, placeholderImage]);

  return (
    <>
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
          <DynamicCarCarousel
            cars={cars as any}
            placeholderImage={placeholderImage}
          />
        ) : (
          <p>Nenhum carro disponível</p>
        )}
      </section>
    </>
  );
};

export default CarDetailsClient;
