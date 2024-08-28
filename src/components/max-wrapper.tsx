import { cn } from "@/lib/utils";

export function MaxWrapper({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "mx-auto md:max-w-screen-xl lg:max-w-screen-2xl w-full",
        className
      )}
    >
      {children}
    </div>
  );
}
