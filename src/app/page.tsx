"use client";

import { MaxWrapper } from "@/components/max-wrapper";
import { Button } from "@/components/ui/button";

import { services } from "@/constants/services";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/faqs";
import { Separator } from "@/components/ui/separator";
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
import { useState, useEffect, useRef } from "react";
import { client } from "@/lib/sanity";
import Autoplay from "embla-carousel-autoplay";
import { CircleMessage } from "@/components/circleMessage";

export interface Announcement {
  title: string;
  imageUrl: string;
  link: string;
  brand: string;
  model: string;
  price: number;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    client
      .fetch<Announcement[]>(
        `*[_type == "announcement"]{title, "imageUrl": image.asset->url, link, brand, model, price}`
      )
      .then((data: any) => setAnnouncements(data))
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen">
      <MaxWrapper className="relative">
        <CircleMessage message="Vamos conversar?" setMessage={setMessage} />
        <div className="w-full">
          <Carousel
            className="w-full"
            opts={{
              loop: true,
            }}
            autoplay={true}
            autoplayInterval={4000}
          >
            <CarouselContent className="h-[600px]">
              {announcements.map((announcement, index) => (
                <CarouselItem key={index} className="w-full h-full">
                  <div className="w-full h-full p-1">
                    <div className="w-full h-full relative">
                      <img
                        src={announcement.imageUrl}
                        alt={announcement.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                        <h2 className="text-2xl font-bold">
                          {announcement.title}
                        </h2>
                        <p className="text-lg">
                          {announcement.brand} - {announcement.model}
                        </p>
                        <p className="text-lg font-semibold">
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(announcement.price)}
                        </p>
                        <Link href={announcement.link}>
                          <Button variant="link" className="mt-4 text-white">
                            Ver mais
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </MaxWrapper>

      <MaxWrapper className="py-8 p-8">
        <section>
          <div className="flex flex-col space-y-4 items-center">
            <h1 className="text-3xl font-bold">
              A melhor plataforma de negociação de veículos
            </h1>
            <p className="text-lg mt-4 text-center text-gray-700">
              A AutoNegocie revolucionou a maneira como as pessoas compram e
              vendem veículos. Como uma plataforma inovadora, ela se destaca por
              sua abordagem eficiente e segura de conectar compradores e
              vendedores.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-8 grid-cols-1">
            {services.map((service) => (
              <Card key={service.title} className="w-full p-4 space-y-4">
                <CardHeader>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                    {service.icon}
                  </div>
                </CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-24" orientation="horizontal" />

        <section className="p-8">
          <div className="flex flex-col space-y-4 items-center">
            <h1 className="text-3xl font-bold">
              Perguntas frequentes sobre a plataforma
            </h1>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem value={faq.id} key={faq.id}>
                <AccordionTrigger>{faq.title}</AccordionTrigger>
                <AccordionContent>{faq.text}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </MaxWrapper>
    </main>
  );
}
