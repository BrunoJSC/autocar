"use client";

import { useEffect, useState } from "react";

import { MaxWrapper } from "@/components/max-wrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBlogData } from "@/fetch/fetch-blog";
import { Blog } from "@/interface/blog";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchBlogData();
      console.log(data);
      setBlog(data);
    }

    fetchData();
  }, []);

  return (
    <MaxWrapper>
      <section className="p-8 min-h-screen flex flex-col space-y-8 items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Oficina de dicas</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blog.map((item) => (
            <Link key={item._id} href={`/oficina/${item._id}`}>
              <Card
                key={item._id}
                className="w-full max-w-md mx-auto shadow-lg rounded-lg overflow-hidden"
              >
                <div className="relative w-full h-64">
                  {item.mainImageUrl && (
                    <Image
                      src={item.mainImageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
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
          ))}
        </div>
      </section>
    </MaxWrapper>
  );
}
