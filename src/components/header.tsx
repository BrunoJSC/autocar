"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { headerLinks } from "@/constants/headerLink";
import { MaxWrapper } from "./max-wrapper";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
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

          <Button className="text-sm font-bold" asChild>
            <Link href="/anunciar">Anunciar</Link>
          </Button>
        </nav>

        <Sheet>
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
                >
                  {link.label}
                </Link>
              ))}

              <Button className="text-sm font-bold w-full">Anunciar</Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </MaxWrapper>
  );
}
