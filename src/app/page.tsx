"use client";

import { MaxWrapper } from "@/components/max-wrapper";
import { services } from "@/constants/services";
import { useRouter } from "next/navigation";

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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { client, urlForImage } from "@/lib/sanity";
import { CircleMessage } from "@/components/circleMessage";
import Image from "next/image";
import { CalendarIcon, CircleGauge, FuelIcon, MapPinIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "@/components/search";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchBlogData } from "@/fetch/fetch-blog";
import { Blog } from "@/interface/blog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface Announcement {
  title: string;
  imageUrl: string;
  link: string;
  location: string;
  brand: string;
  model: string;
  price: number;
  fuel: string;
  year: number;
  km: number;
}

export default function Home() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [blog, setBlog] = useState<Blog[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    client
      .fetch<Announcement[]>(
        `*[_type == "announcement"]{title, "imageUrl": image.asset->url, link, brand, model, price, fuel, year, km, location}`
      )
      .then((data: any) => setAnnouncements(data))
      .catch(console.error);

    async function fetchData() {
      const data = await fetchBlogData();
      setBlog(data);
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen">
      <MaxWrapper className="relative">
        <Search />
        <CircleMessage message="Vamos conversar?" setMessage={setMessage} />

        <div className="w-full">
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold mt-9">Destaque</h1>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between ">
            <div className="grid md:grid-cols-3 lg:grid-cols-3  grid-cols-1 md:gap-8 gap-4 p-4">
              {announcements.map((announcement, index) => (
                <Link key={index} href={announcement.link}>
                  <Card className="w-full h-full max-w-xs">
                    <CardHeader className="w-full h-60 overflow-hidden p-0">
                      <Image
                        src={announcement.imageUrl}
                        alt={announcement.title}
                        className="w-full h-full object-cover object-center rounded-t-lg"
                        width={500}
                        height={300}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-lg">
                        {announcement.brand} - {announcement.model}
                      </CardTitle>
                      <p className="text-lg font-normal">
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(announcement.price)}
                      </p>
                    </CardContent>
                    <CardFooter className="grid grid-cols-2 w-full border-t p-4 gap-2 text-sm justify-between">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-500">{announcement.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleGauge className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-500">
                          {Intl.NumberFormat("pt-BR").format(announcement.km)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-500">{announcement.year}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <FuelIcon className="h-4 w-4 text-gray-500" />
                        <p className="text-gray-500">{announcement.fuel}</p>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="w-full lg:w-1/3 p-4">
              <div className="flex justify-center mb-5 md:hidden">
                <h1 className="text-3xl font-bold mt-9">Blog</h1>
              </div>
              <Carousel autoplay autoplayInterval={3000}>
                <CarouselContent>
                  {blog.map((item) => (
                    <CarouselItem key={item.title} className="w-full ">
                      <Link href={`/oficina/${item._id}`}>
                        <Card className="w-full max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
                          <div className="relative w-full h-64">
                            {item.mainImageUrl && (
                              <Image
                                src={item.mainImageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <CardHeader className="p-4 space-y-2 text-center bg-white">
                            <CardTitle className="text-2xl font-semibold text-gray-800">
                              {item.title}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                  <CarouselNext />
                  <CarouselPrevious />
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>

        <section className="p-4">
          <div className="flex flex-col space-y-4 items-center">
            <h1 className="text-3xl font-bold">Explore por Faixa de Preço</h1>
            <p className="text-lg mt-4 text-center text-gray-700">
              Selecione uma faixa de preço para visualizar os veículos
              disponíveis.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href={{
                pathname: "/carros",
                query: { maxPrice: 20000 },
              }}
              className={cn(buttonVariants(), "w-48")}
            >
              Carros até 15 Mil
            </Link>
            <Link
              href={{
                pathname: "/carros",
                query: { maxPrice: 25000 },
              }}
              className={cn(buttonVariants(), "w-48")}
            >
              Carros até 25 Mil
            </Link>
            <Link
              href={{
                pathname: "/carros",
                query: { maxPrice: 30000 },
              }}
              className={cn(buttonVariants(), "w-48")}
            >
              Carros até 30 Mil
            </Link>

            <Link
              href={{
                pathname: "/carros",
                query: { maxPrice: 40000 },
              }}
              className={cn(buttonVariants(), "w-48")}
            >
              Carros até 40 Mil
            </Link>

            <Link
              href={{
                pathname: "/carros",
                query: { maxPrice: 50000 },
              }}
              className={cn(buttonVariants(), "w-48")}
            >
              Carros até 50 Mil
            </Link>

            <Link
              href={{
                pathname: "/carros",
                query: { maxPrice: 60000 },
              }}
              className={cn(buttonVariants(), "w-48")}
            >
              Carros até 60 Mil
            </Link>

            <Link
              href={{
                pathname: "/carros",
                query: { maxPrice: 70000 },
              }}
              className={cn(buttonVariants(), "w-48")}
            >
              Carros até 70 Mil
            </Link>

            <Link
              href={{
                pathname: "/carros",
                query: { maxPrice: 80000 },
              }}
              className={cn(buttonVariants(), "w-48")}
            >
              Carros até 80 Mil
            </Link>

            <Link
              href={{
                pathname: "/carros",
                query: { maxPrice: 90000 },
              }}
              className={cn(buttonVariants(), "w-48")}
            >
              Carros até 90 Mil
            </Link>

            <Link
              href={{
                pathname: "/carros",
                query: { maxPrice: 100000 },
              }}
              className={cn(buttonVariants(), "w-48")}
            >
              Carros até 100 Mil
            </Link>
          </div>
        </section>
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
