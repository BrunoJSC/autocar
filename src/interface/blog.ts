export interface Blog {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  mainImageUrl?: string;
  body: string | string[];
  publishedAt: string;
}
