import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/lib/sanity";
import { MaxWrapper } from "@/components/max-wrapper";
import { getData } from "@/fetch/fetch-car";
import dynamic from "next/dynamic";

export const runtime = "edge";

const CarDetailsClient = dynamic(
  () => import("@/components/car-details-client"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px]" />,
  }
);

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const car = await client.fetch(`*[_type == "car" && _id == $id][0]`, { id });
  const cars = await getData();

  const placeholderImage = "/icons/logo.svg";

  if (!car) {
    return (
      <MaxWrapper className="min-h-screen">
        <Skeleton className="w-full h-[300px]" />
      </MaxWrapper>
    );
  }

  return (
    <MaxWrapper>
      <CarDetailsClient
        car={car}
        cars={cars}
        placeholderImage={placeholderImage}
      />
    </MaxWrapper>
  );
};

export default Page;
