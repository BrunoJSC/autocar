"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MaxWrapper } from "@/components/max-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { client, urlForImage } from "@/lib/sanity";
import { useParams, useRouter } from "next/navigation";
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres",
  }),
  cpf: z.string().min(11, {
    message: "O cpf deve ter pelo menos 11 caracteres",
  }),
  email: z.string().email({ message: "O email deve ser válido" }),
  phone: z.string().min(9, {
    message: "O telefone deve ter pelo menos 9 caracteres",
  }),
  message: z.string().min(10, {
    message: "O nome deve ter pelo menos 10 caracteres",
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
  const [motorbike, setMotorbike] = useState<Motorbike | null>(null);
  const [message, setMessage] = useState("");
  const PHONE_NUMBER = "5511940723891";

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function messageWhatsapp() {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        const data = await client.fetch(
          `*[_type == "motorbike" && _id == $id][0]`,
          {
            id,
          }
        );
        setMotorbike(data);
      };

      fetchCar();
    }
  }, [id]);

  useEffect(() => {
    if (motorbike) {
      const initialMessage = `Tenho interesse neste veículo ${motorbike.motorbikeBrand} - ${motorbike.motorbikeModel}`;
      setMessage(initialMessage);
      form.setValue("message", initialMessage);
    }
  }, [motorbike, form]);

  if (!motorbike)
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

        <Card className="mt-5 max-w-4xl mx-auto p-2 grid md:grid-cols-2 gap-8">
          <div>
            <CardHeader>
              <CardTitle>
                <span className="text-primary">{motorbike.motorbikeBrand}</span>{" "}
                {motorbike.motorbikeModel}
              </CardTitle>
              <h3 className="font-bold text-3xl">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(motorbike.price)}
              </h3>
            </CardHeader>
            <CardDescription className="text-gray-500 mt-2 text-sm leading-normal">
              {motorbike.description}
            </CardDescription>
          </div>

          {/* Seção de Formulário de Contato */}
          <Card className="p-4 max-w-sm bg-black ml-4">
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
                Whatsapp
              </Button>
            </Form>
          </Card>
        </Card>
      </section>
    </MaxWrapper>
  );
}
