"use client";

import { MaxWrapper } from "@/components/max-wrapper";
import { Blog } from "@/interface/blog";
import { client, urlForImage } from "@/lib/sanity";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await client.fetch(`*[_type == "blog" && _id == $id][0]`, {
          id,
        });
        if (data) {
          setBlog(data);
        } else {
          setError("Blog not found.");
        }
      } catch (err) {
        console.error("Error fetching the blog:", err);
        setError("Error fetching the blog.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    } else {
      setError("ID not provided.");
    }
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-3">
        <Skeleton className="h-4 w-[850px]" />
        <Skeleton className="h-4 w-[800px]" />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <MaxWrapper>
      <section className="p-8 min-h-screen flex flex-col space-y-4 items-center">
        <div className="flex flex-col space-y-2 items-end">
          <h1 className="text-3xl font-bold">{blog?.title}</h1>
          <p className="text-sm text-muted-foreground">
            {new Date(blog?.publishedAt || "").toLocaleDateString()}
          </p>
        </div>
        {blog?.mainImageUrl && (
          <Image
            src={urlForImage(blog?.mainImageUrl).url()}
            alt={blog.title}
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <div className="w-full max-w-5xl rounded-lg my-6 mx-auto p-4 gap-4 space-y-4">
          <PortableText value={blog?.body as any} />
        </div>
      </section>
    </MaxWrapper>
  );
}
