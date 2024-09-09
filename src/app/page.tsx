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
import { useState, useEffect, useCallback, memo } from "react";
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
    async function fetchData() {
      try {
        const [announcementData, blogData] = await Promise.all([
          client.fetch<Announcement[]>(
            `*[_type == "announcement"]{title, "imageUrl": image.asset->url, link, brand, model, price, fuel, year, km, location}`
          ),
          fetchBlogData(),
        ]);
        setAnnouncements(announcementData);
        setBlog(blogData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const MemoizedAnnouncementCard = memo(AnnouncementCard);

  function AnnouncementCard({ announcement }: { announcement: Announcement }) {
    return (
      <div>
        <Link href={announcement.link} className="w-full">
          <Card className="w-full h-full md:max-w-xs">
            <CardHeader className="w-full h-60 overflow-hidden p-0 ">
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
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <MaxWrapper className="relative">
        <Search />
        <CircleMessage message="Vamos conversar?" setMessage={setMessage} />

        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 h-auto bg-red-500">
            <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-green-500">
              {announcements.map((announcement, index) => (
                <MemoizedAnnouncementCard
                  key={index}
                  announcement={announcement}
                />
              ))}
            </div>

            <div className=" bg-blue-500">
              {/* Carousel do Blog ajustado para ocupar a mesma altura dos cards */}
              <Carousel autoplay autoplayInterval={3000}>
                <CarouselContent>
                  {blog.map((item) => (
                    <CarouselItem key={item.title} className="w-full">
                      <Link href={`/oficina/${item._id}`}>
                        <Card className="w-full md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
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
        <h1 className="text-3xl font-bold">Explore por Faixa de Preço</h1>
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
