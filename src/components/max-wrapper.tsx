import { cn } from "@/lib/utils";

export function MaxWrapper({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <div className={cn("mx-auto max-w-7xl", className)}>{children}</div>;
}
