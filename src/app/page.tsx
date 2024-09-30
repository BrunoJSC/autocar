"use client";

import { useState, useEffect, useCallback, memo } from "react";

import { MaxWrapper } from "@/components/max-wrapper";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client, urlForImage } from "@/lib/sanity";
import { CircleMessage } from "@/components/circleMessage";
import Image from "next/image";
import { CalendarIcon, CircleGauge, FuelIcon, MapPinIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "@/components/search";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";



export interface Announcement {
  title: string;
  imageUrl: string;
  link: string;
  location: string;
  brand: string;
  model: string;
  price: number;
  fuel: string;
  yearModification: number;
  km: number;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [blog, setBlog] = useState<Blog[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [announcementData, blogData] = await Promise.all([
          client.fetch<Announcement[]>(
            `*[_type == "announcement"]{title, "imageUrl": image.asset->url, link, brand, model, price, fuel, yearModification, km, location}`
          ),
          fetchBlogData(),
        ]);
        setAnnouncements(announcementData);
        setBlog(blogData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const MemoizedAnnouncementCard = memo(AnnouncementCard);

  function AnnouncementCard({ announcement }: { announcement: Announcement }) {
    return (
      <div>
        <Link href={announcement.link} className="w-full">
          <Card className="w-full h-full md:max-w-2xl">
            <CardHeader className="w-full h-64 overflow-hidden p-0 ">
              <Image
                src={announcement.imageUrl}
                alt={announcement.title}
                className="w-full h-full object-cover object-center rounded-t-lg"
                width={500}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
                loading="lazy"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                {announcement.brand}{" "}
                <span className="text-black">
                  {announcement.model.slice(
                    0,
                    announcement.model.length > 8
                      ? 6
                      : announcement.model.length
                  ) + "..."}
                </span>
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
                <p className="text-gray-500">{announcement.yearModification}</p>
              </div>
              <div className="flex items-center gap-2">
                <FuelIcon className="h-4 w-4 text-gray-500" />
                <p className="text-gray-500">{announcement.fuel}</p>
              </div>
            </CardFooter>
          </Card>
        </Link>
      </div>
    );
  }

  function AnnouncementCardSkeleton() {
    return (
      <Card className="w-full h-full md:max-w-xs">
        <CardHeader className="w-full h-60 overflow-hidden p-0">
          <Skeleton className="w-full h-full rounded-t-lg" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2" />
        </CardContent>
        <CardFooter className="grid grid-cols-2 w-full border-t p-4 gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardFooter>
      </Card>
    );
  }

  function BlogCardSkeleton() {
    return (
      <Card className="w-full md:h-[400px] mx-auto shadow-lg rounded-lg overflow-hidden">
        <Skeleton className="w-full h-64" />
        <CardHeader className="p-4 space-y-2 text-center bg-white">
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </CardHeader>
      </Card>
    );
  }

  return (
    <main className="min-h-screen">
      <MaxWrapper className="relative">
        <Search />
        <CircleMessage message="Vamos conversar?" setMessage={setMessage} />

        <div className="w-full p-4 mt-8 md:px-16">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-[80%]">
              <h2 className="text-2xl font-bold mb-4 text-center">Destaques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading
                  ? Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <AnnouncementCardSkeleton key={index} />
                    ))
                  : announcements.map((announcement, index) => (
                    <MemoizedAnnouncementCard
                      key={index}
                      announcement={announcement}
                    />
                  ))}
              </div>

              <div className="w-full flex align-center justify-center">
                <Button className="text-center mt-4" asChild>
                  <Link href="/carros">Ver mais</Link>
                </Button>
              </div>
            </div>

            <Separator
              orientation="vertical"
              className="md:h-[520px] mx-auto md:mr-4"
            />

            <Separator
              orientation="horizontal"
              className="w-full md:hidden block"
            />

            <div className="w-full md:w-[20%] ">
              <h2 className="text-2xl font-bold mb-4 text-center">Artigos</h2>
              <Carousel
                autoplay
                autoplayInterval={3000}
                className="w-full mx-auto"
              >
                <CarouselContent>
                  {isLoading
                    ? Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <CarouselItem key={index} className="w-full">
                          <BlogCardSkeleton />
                        </CarouselItem>
                      ))
                    : blog.map((item) => (
                      <CarouselItem key={item.title} className="w-full">
                        <Link href={`/oficina/${item._id}`}>
                          <Card className="w-full md:h-[400px] mx-auto shadow-lg rounded-lg overflow-hidden">
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
                              <CardTitle className="text-xl font-semibold text-gray-800">
                                {item.title}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        </Link>
                      </CarouselItem>
                    ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>

        <PriceRangeSection />
      </MaxWrapper>

      <MaxWrapper className="py-8 p-8">
        <PlatformDescription />
        <Separator className="my-24" orientation="horizontal" />
        <FaqSection />
      </MaxWrapper>
    </main>
  );
}

const PriceRangeSection = memo(function PriceRangeSection() {
  return (
    <section className="p-4">
      <div className="flex flex-col space-y-4 items-center">
        <h1 className="text-3xl text-center font-bold">
          Explore por Faixa de Preço
        </h1>
        <p className="text-lg mt-4 text-center text-gray-700">
          Selecione uma faixa de preço para visualizar os veículos disponíveis.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-2">
        {[
          { maxPrice: 20000, label: "Carros até 15 Mil" },
          { maxPrice: 25000, label: "Carros até 25 Mil" },
          { maxPrice: 30000, label: "Carros até 30 Mil" },
          { maxPrice: 40000, label: "Carros até 40 Mil" },
          { maxPrice: 50000, label: "Carros até 50 Mil" },
          { maxPrice: 60000, label: "Carros até 60 Mil" },
          { maxPrice: 70000, label: "Carros até 70 Mil" },
          { maxPrice: 80000, label: "Carros até 80 Mil" },
          { maxPrice: 90000, label: "Carros até 90 Mil" },
          { maxPrice: 100000, label: "Carros até 100 Mil" },
        ].map(({ maxPrice, label }) => (
          <Link
            key={maxPrice}
            href={{ pathname: "/carros", query: { maxPrice } }}
            className={cn(buttonVariants(), "w-48")}
          >
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
});

const PlatformDescription = memo(function PlatformDescription() {
  return (
    <section>
      <div className="flex flex-col space-y-4 items-center">
        <h1 className="text-3xl font-bold">
          A melhor plataforma de negociação de veículos
        </h1>
        <p className="text-lg mt-4 text-center text-gray-700">
          A AutoNegocie revolucionou a maneira como as pessoas compram e vendem
          veículos. Como uma plataforma inovadora, ela se destaca por sua
          abordagem eficiente e segura de conectar compradores e vendedores.
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
  );
});

const FaqSection = memo(function FaqSection() {
  return (
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
  );
});
