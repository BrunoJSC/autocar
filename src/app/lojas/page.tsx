"use client";

import { MaxWrapper } from "@/components/max-wrapper";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client, urlForImage } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Store {
  _id: string;
  title: string;
  slug: string;
  mainImageUrl: string; // Ajustado para receber o objeto da imagem
  locationUrl: string;
  phone?: string; // Supondo que o campo phone seja opcional
}

export default function Page() {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data: Store[] = await client.fetch(`*[_type == "store"] {
        _id,
        title,
        slug,
        "mainImageUrl": mainImage.asset->url,
        locationUrl,
        phone
      }`);

      setStores(data);
    }

    fetchData();
  }, []);

  return (
    <MaxWrapper>
      <section className="p-8 min-h-screen flex flex-col space-y-4 items-center">
        <h1 className="text-3xl font-bold">Lojas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <Link key={store._id} href={store.locationUrl}>
              <Card className="w-80 h-96 flex flex-col">
                {store.mainImageUrl ? (
                  <Image
                    src={store.mainImageUrl}
                    alt={store.title}
                    width={320}
                    height={240}
                    className="object-cover h-48 w-full"
                    priority
                  />
                ) : (
                  <div className="h-48 w-full flex items-center justify-center bg-gray-200">
                    <p>Image not available</p>
                  </div>
                )}
                <CardHeader className="flex-grow flex flex-col justify-between p-4">
                  <div>
                    <CardTitle>{store.title}</CardTitle>
                  </div>
                  <div>
                    <CardDescription>
                      {store.phone || "Phone not available"}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </MaxWrapper>
  );
}
