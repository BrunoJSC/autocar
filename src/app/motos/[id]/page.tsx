"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MaxWrapper } from "@/components/max-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { client, urlForImage } from "@/lib/sanity";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
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
import DetailsCard from "@/components/details-card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres",
  }),
  cpf: z.string().min(11, {
    message: "O CPF deve ter pelo menos 11 caracteres",
  }),
  email: z.string().email({ message: "O email deve ser válido" }),
  phone: z.string().min(9, {
    message: "O telefone deve ter pelo menos 9 caracteres",
  }),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres",
  }),
});

const PHONE_NUMBER = "5511940723891";
const INTEREST_RATE = 0.025; // 2.5% de juros mensais

export default function Page() {
  const form = useForm({
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
  const [motorbike, setMotorbike] = useState<Motorbike | null>(null);
  const [message, setMessage] = useState("");
  const [downPayment, setDownPayment] = useState("0");
  const [installments, setInstallments] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const onSubmit = useCallback((values: any) => {
    console.log(values);
  }, []);

  const messageWhatsapp = useCallback(() => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }, [message]);

  useEffect(() => {
    if (id) {
      const fetchMotorbike = async () => {
        const data = await client.fetch(
          `*[_type == "motorbike" && _id == $id][0]`,
          { id }
        );
        setMotorbike(data);
      };

      fetchMotorbike();
    }
  }, [id]);

  useEffect(() => {
    if (motorbike) {
      const initialMessage = `Tenho interesse neste veículo ${motorbike.motorbikeBrand} - ${motorbike.motorbikeModel} - ${motorbike.yearFabrication} `;
      setMessage(initialMessage);
      form.setValue("message", initialMessage);
    }
  }, [motorbike, form]);

  useEffect(() => {
    if (motorbike) {
      const downPaymentNumber =
        parseFloat(downPayment.replace(/[^\d.-]/g, "")) || 0;
      const financedAmount = motorbike.price - downPaymentNumber;
      const monthlyRate = INTEREST_RATE;
      const n = installments;
      const payment =
        (financedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
      setMonthlyPayment(payment);
    }
  }, [motorbike, downPayment, installments]);

  const sendSimulator = useCallback(() => {
    const downPaymentNumber =
      parseFloat(downPayment.replace(/[^\d.-]/g, "")) || 0;
    const financedAmount = motorbike ? motorbike.price - downPaymentNumber : 0;
    const encodedMessage = encodeURIComponent(
      `Simulação de Financiamento:\n\nVeículo: ${motorbike?.motorbikeBrand} - ${motorbike?.motorbikeModel}\nValor da Entrada: R$ ${downPayment}\nValor Financiado: R$ ${financedAmount.toFixed(2)}\nNúmero de Parcelas: ${installments}\nValor da Parcela: R$ ${monthlyPayment.toFixed(2)}`
    );
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }, [downPayment, installments, monthlyPayment, motorbike]);

  if (!motorbike)
    return (
      <MaxWrapper>
        <Skeleton className="w-full h-[300px]" />
      </MaxWrapper>
    );

  return (
    <MaxWrapper>
      <section className="p-8 mt-5">
        <div className="h-[600px] flex flex-col md:flex-row gap-4">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {motorbike.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div>
                    <Card>
                      <Image
                        src={urlForImage(image).width(600).height(400).url()}
                        alt={motorbike.motorbikeBrand}
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

          <Card className="flex-grow overflow-y-auto bg-black">
            <CardHeader>
              <CardTitle className="text-primary">
                Entre em contato com nossa equipe!
              </CardTitle>
              <CardDescription className="text-white">
                Veja condições de financiamento.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 text-white"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="">Nome</FormLabel>
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
                        <FormLabel className="">CPF</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu CPF" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="">Email</FormLabel>
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
                        <FormLabel className="">Telefone</FormLabel>
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
                        <FormLabel className="">Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Deixe sua mensagem"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
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

        <DetailsCard
          vehicleType="motorbike"
          vehicle={motorbike}
          downPayment={downPayment}
          setDownPayment={setDownPayment}
          installments={installments}
          setInstallments={setInstallments}
          monthlyPayment={monthlyPayment}
          sendSimulator={sendSimulator}
          i18nIsDynamicList
        />
      </section>
    </MaxWrapper>
  );
}

type Motorbike = {
  motorbikeBrand: string;
  motorbikeModel: string;
  yearFabrication: string;
  mileage: number;
  color: string;
  fuel: string;
  displacement: string;
  transmission: string;
  location: string;
  condition: string;
  fairing: string;
  licensePlate: string;
  accessories: string[];
  description: string;
  images: any[];
  price: number;
};
