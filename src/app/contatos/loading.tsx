import { MaxWrapper } from "@/components/max-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <MaxWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center space-x-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[850px]" />
          <Skeleton className="h-4 w-[800px]" />
        </div>
      </div>
    </MaxWrapper>
  );
}
