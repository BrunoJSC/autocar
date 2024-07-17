import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: "production",
  apiVersion: "2021-08-31",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
