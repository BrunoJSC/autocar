"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { headerLinks } from "@/constants/headerLink";
import { MaxWrapper } from "./max-wrapper";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <MaxWrapper>
      <header className="flex items-center justify-between p-4 md:p-8 border-b border-gray-300 bg-white">
        <Link href="/">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={100}
            height={32}
            className="cursor-pointer"
            priority
          />
        </Link>

        <nav className="gap-4 items-center hidden md:flex">
          {headerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-bold text-secondary-foreground hover:text-primary",
                {
                  "text-primary": pathname === link.href,
                }
              )}
            >
              {link.label}
            </Link>
          ))}

          <Separator orientation="vertical" className="h-7 w-px" />
          <Button className="text-sm font-bold" asChild>
            <Link href="/anunciar">Anunciar</Link>
          </Button>
        </nav>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className="md:hidden" asChild>
            <Button variant="ghost">
              <MenuIcon className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 p-4">
              {headerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "block text-sm font-bold text-secondary-foreground hover:text-primary",
                    {
                      "text-primary": pathname === link.href,
                    }
                  )}
                  onClick={closeSheet}
                >
                  {link.label}
                </Link>
              ))}

              <Separator />

              <Button className="text-sm font-bold" asChild>
                <Link href="/anunciar" onClick={closeSheet}>
                  Anunciar
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </MaxWrapper>
  );
}
