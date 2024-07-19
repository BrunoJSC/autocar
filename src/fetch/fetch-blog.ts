import { Blog } from "@/interface/blog";
import { client } from "@/lib/sanity";

export const fetchBlogData = async (): Promise<Blog[]> => {
  try {
    const query = `*[_type == "blog"] {
      _id,
      "currentSlug": slug.current,
      title,
      body,
      "mainImageUrl": mainImage.asset->url,
      publishedAt
    }`;

    const data: Blog[] = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return [];
  }
};
