import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[850px]" />
        <Skeleton className="h-4 w-[800px]" />
      </div>
    </div>
  );
}
